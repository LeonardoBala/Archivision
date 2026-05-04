'use server';

import { supabaseAdmin } from "@/lib/supabase";
import { GoogleAuth } from "google-auth-library";
import { v4 as uuidv4 } from 'uuid';

const GOOGLE_AUTH = new GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  keyFilename: 'service-account-key-1.json',
});

const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT_ID || "ai-interior-design-449317";

async function uploadToStorage(base64Data: string, userId: string): Promise<string> {
  const buffer = Buffer.from(base64Data, 'base64');
  const fileName = `${userId}/UserDesign/${uuidv4()}-edit.png`;

  const { error } = await supabaseAdmin.storage
    .from('projects')
    .upload(fileName, buffer, { contentType: 'image/png', upsert: true });

  if (error) throw new Error(`Edit Storage Error: ${error.message}`);

  const { data } = supabaseAdmin.storage.from('projects').getPublicUrl(fileName);
  return data.publicUrl;
}

// Gemini Vision identifies the object under the white mask
async function identifyMaskedObject(
    baseImageBase64: string,
    maskImageBase64: string
): Promise<string> {
  try {
    const client = await GOOGLE_AUTH.getClient();
    const token = (await client.getAccessToken()).token;

    const url = `https://aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/global/publishers/google/models/gemini-2.5-flash:generateContent`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          role: 'user',
          parts: [
            { text: 'Look at this room photo and the mask (WHITE = selected area). In 2-5 words only, name the object under the white mask. Reply with ONLY the object name.' },
            { inlineData: { mimeType: 'image/jpeg', data: baseImageBase64 } },
            { inlineData: { mimeType: 'image/png', data: maskImageBase64 } }
          ]
        }]
      })
    });

    if (!response.ok) return 'selected object';

    const responseData = await response.json();
    const text = responseData.candidates?.[0]?.content?.parts?.[0]?.text || 'selected object';
    return text.trim().replace(/['"*\n]/g, '');
  } catch {
    return 'selected object';
  }
}

export async function editImageVertex(
    prompt: string,
    userId: string,
    baseImageBase64: string,
    maskImageBase64: string
): Promise<{ url: string, base64: string }> {
  try {
    const client = await GOOGLE_AUTH.getClient();
    const token = (await client.getAccessToken()).token!;

    const cleanBaseImage = baseImageBase64.includes("base64,")
      ? baseImageBase64.split("base64,")[1]
      : baseImageBase64;
    const cleanMaskImage = maskImageBase64.includes("base64,")
      ? maskImageBase64.split("base64,")[1]
      : maskImageBase64;

    // Step 1: Identify the masked object
    console.log('🔍 Identifying masked object...');
    const identifiedObject = await identifyMaskedObject(cleanBaseImage, cleanMaskImage);
    console.log(`🔍 Identified: "${identifiedObject}"`);

    // Step 2: Inpaint with gemini-2.5-flash-image (Google's recommended replacement for imagegeneration@006)
    const inpaintInstruction = `You are a professional photo editor. You will receive a room photo and a black-and-white mask image.

TASK: Edit the room photo by replacing ONLY the region covered by WHITE pixels in the mask with: "${prompt}".

STRICT RULES:
- The WHITE area in the mask = the exact region you must edit.
- The BLACK area in the mask = must remain 100% unchanged. Do not touch these pixels.
- Match the lighting, shadows, perspective, and photorealistic style of the surrounding room.
- The result must look like a seamless, professional interior design photo.
- Do NOT add text, watermarks, or any other elements.

Output the complete edited room image.`;

    const url = `https://aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/global/publishers/google/models/gemini-2.5-flash-image:generateContent`;

    console.log(`🪄 Inpainting "${identifiedObject}" → "${prompt}"...`);

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          role: 'user',
          parts: [
            { text: inpaintInstruction },
            { inlineData: { mimeType: 'image/jpeg', data: cleanBaseImage } },
            { inlineData: { mimeType: 'image/png', data: cleanMaskImage } }
          ]
        }],
        generationConfig: {
          responseModalities: ['IMAGE'],
          temperature: 0.05
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini Image Edit Error: ${errorText}`);
    }

    const responseData = await response.json();
    const candidate = responseData.candidates?.[0];
    const imagePart = candidate?.content?.parts?.find(
      (p: any) => p.inlineData || p.inline_data
    );

    if (!imagePart) {
      const textPart = candidate?.content?.parts?.find((p: any) => p.text);
      console.error('Model returned text instead of image:', textPart?.text);
      throw new Error("Model did not return an image. It may have refused the request.");
    }

    const resultBase64 = imagePart.inlineData?.data || imagePart.inline_data?.data;

    const publicUrl = await uploadToStorage(resultBase64, userId);
    return { url: publicUrl, base64: resultBase64 };

  } catch (e: any) {
    console.error("❌ Edit Failed:", e.message);
    throw e;
  }
}
