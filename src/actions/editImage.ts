'use server';

import { supabaseAdmin } from "@/lib/supabase";
import { GoogleAuth } from "google-auth-library";
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';

const GOOGLE_AUTH = new GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  ...(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON
    ? { credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) }
    : { keyFilename: 'service-account-key-1.json' }),
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

// Bake the mask as a blue highlight directly onto the base image.
// Sending a visually highlighted image is far more reliable than a separate mask file,
// because the model can spatially see exactly which region to modify.
async function compositeHighlight(
  baseImageBase64: string,
  maskImageBase64: string
): Promise<string> {
  const baseBuffer = Buffer.from(baseImageBase64, 'base64');
  const maskBuffer = Buffer.from(maskImageBase64, 'base64');

  const meta = await sharp(baseBuffer).metadata();
  const width = meta.width!;
  const height = meta.height!;

  const { data: maskData } = await sharp(maskBuffer)
    .resize(width, height)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Build a semi-transparent blue overlay on the drawn region
  const overlayData = Buffer.alloc(width * height * 4, 0);
  for (let i = 0; i < maskData.length; i += 4) {
    const r = maskData[i];
    const a = maskData[i + 3];
    if (r > 128 && a > 128) {
      overlayData[i]     = 59;   // R
      overlayData[i + 1] = 130;  // G
      overlayData[i + 2] = 246;  // B
      overlayData[i + 3] = 170;  // A (semi-transparent so room is still visible underneath)
    }
  }

  const overlayBuffer = await sharp(overlayData, {
    raw: { width, height, channels: 4 },
  }).png().toBuffer();

  const compositeBuffer = await sharp(baseBuffer)
    .composite([{ input: overlayBuffer, blend: 'over' }])
    .jpeg({ quality: 92 })
    .toBuffer();

  return compositeBuffer.toString('base64');
}

// Use the composite (highlighted) image to identify what the user selected.
async function identifyMaskedObject(
  compositeImageBase64: string
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
            { text: 'Look at this room photo. A BLUE HIGHLIGHTED REGION marks a specific area. In 2-5 words only, name the object or area inside the blue highlight. Reply with ONLY the object name.' },
            { inlineData: { mimeType: 'image/jpeg', data: compositeImageBase64 } },
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

    // Step 1: Create a composite image with blue highlight baked in
    console.log('🎨 Compositing highlight onto base image...');
    const compositeBase64 = await compositeHighlight(cleanBaseImage, cleanMaskImage);

    // Step 2: Identify the selected object from the composite
    console.log('🔍 Identifying selected region...');
    const identifiedObject = await identifyMaskedObject(compositeBase64);
    console.log(`🔍 Identified: "${identifiedObject}"`);

    // Step 3: Inpaint — send composite (so model sees the highlight) + original (reference for surroundings)
    const inpaintInstruction = `You are a professional architectural photo editor. You will receive TWO images:
- IMAGE 1: The room photo with a BLUE HIGHLIGHTED REGION marking the exact area the user wants to change.
- IMAGE 2: The original room photo (unchanged reference).

TASK: Apply this change to the blue-highlighted region of IMAGE 1: "${prompt}"
The highlighted object/area is: "${identifiedObject}"

STRICT RULES:
1. Modify ONLY what is inside the BLUE HIGHLIGHTED region.
2. Every pixel OUTSIDE the blue region must remain 100% identical to IMAGE 2.
3. The modified area must blend seamlessly: match the existing lighting direction, shadows, perspective, and photorealistic quality.
4. Do NOT add, remove, or change anything outside the highlighted region — not furniture, walls, windows, floor, ceiling, or any other element.
5. Output the complete room photo with only the highlighted region changed.`;

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
            { text: 'IMAGE 1 — Room with blue-highlighted region (this is where you must apply the change):' },
            { inlineData: { mimeType: 'image/jpeg', data: compositeBase64 } },
            { text: 'IMAGE 2 — Original room (use this as the pixel-perfect reference for everything outside the blue region):' },
            { inlineData: { mimeType: 'image/jpeg', data: cleanBaseImage } },
          ]
        }],
        generationConfig: {
          responseModalities: ['IMAGE'],
          temperature: 0.05,
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
