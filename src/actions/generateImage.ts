'use server';

import { supabaseAdmin } from "@/lib/supabase";
import { GoogleAuth } from "google-auth-library";
import { v4 as uuidv4 } from 'uuid';

const GOOGLE_AUTH = new GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  keyFilename: 'service-account-key-1.json', 
});

// Using global to get easy acces to the model
const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT_ID || "effective-time-479615-m3"; 
const LOCATION_ID = "global";
const API_ENDPOINT = "aiplatform.googleapis.com";

const MODEL_ID = "gemini-3-pro-image-preview"; 

// Funzione di ritardo per l'auto-retry
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function uploadToStorage(base64Data: string, userId: string): Promise<string> {
  const buffer = Buffer.from(base64Data, 'base64');
  const fileName = `${userId}/UserDesign/${uuidv4()}.png`;
  
  const { error } = await supabaseAdmin.storage
    .from('projects')
    .upload(fileName, buffer, { contentType: 'image/png', upsert: true });

  if (error) throw new Error(`Image Storage Error: ${error.message}`);
  
  const { data } = supabaseAdmin.storage.from('projects').getPublicUrl(fileName);
  return data.publicUrl;
}

export async function generateImageVertex(
    prompt: string, 
    userId: string,
    currentInputImage?: string,      
    referenceImagesBase64: string[] = [] 
): Promise<{ url: string, base64: string }> {
  
  const client = await GOOGLE_AUTH.getClient();
  const token = (await client.getAccessToken()).token;
  
  const url = `https://${API_ENDPOINT}/v1/projects/${PROJECT_ID}/locations/${LOCATION_ID}/publishers/google/models/${MODEL_ID}:generateContent`;

  console.log(`🎨 Preparing Payload for ${MODEL_ID}...`);

  const parts: any[] = [];

  // 1. We put first the prompt, to set the context for the model
  parts.push({ text: prompt });

  // 2. Then we add the input image
  if (currentInputImage) {
      let cleanBase64 = currentInputImage.includes("base64,") ? currentInputImage.split("base64,")[1] : currentInputImage;
      cleanBase64 = cleanBase64.replace(/[\r\n\s]+/g, '');

      parts.push({ text: "IMAGE 1 (TARGET IMAGE): This is the NEW CAMERA ANGLE. Keep the room structure, perspective, windows, and walls exactly like this." });
      parts.push({
          inlineData: {
              mimeType: "image/jpeg",
              data: cleanBase64
          }
      });
  }

  // ✅ 3. LE IMMAGINI DI REFERENZA (I MOBILI DA COPIARE)
  if (referenceImagesBase64.length > 0) {
      console.log(`🔗 Adding ${referenceImagesBase64.length} previous generation(s) as References...`);
      
      parts.push({ 
          text: "REFERENCE IMAGES: Use these strictly to copy the FURNITURE, LIGHTING, and COLOR PALETTE into the TARGET IMAGE." 
      });
      
      for (const refImage of referenceImagesBase64) {
          let cleanRefBase64 = refImage.includes("base64,") ? refImage.split("base64,")[1] : refImage;
          cleanRefBase64 = cleanRefBase64.replace(/[\r\n\s]+/g, '');

          parts.push({
              inlineData: {
                  mimeType: "image/jpeg", 
                  data: cleanRefBase64
              }
          });
      }
  }

  const payload = { 
    contents: [{ role: "user", parts: parts }],
    safetySettings: [
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_ONLY_HIGH" },
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_ONLY_HIGH" },
      { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_ONLY_HIGH" },
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_ONLY_HIGH" }
    ],
    generationConfig: {
        candidateCount: 1,
        temperature: 0.1, // Un po' di flessibilità necessaria per l'adattamento prospettico
    }
  };

  // ✅ SISTEMA AUTO-RETRY PER EVITARE I CRASH DA 429
  const MAX_RETRIES = 3;
  let attempt = 0;

  while (attempt < MAX_RETRIES) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json; charset=utf-8' 
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
          const errorText = await response.text();
          console.error(`❌ Gemini API Error Body (Attempt ${attempt + 1}):`, errorText);
          
          // Se è un errore 429, lanciamo un'eccezione speciale per fare il retry
          if (response.status === 429 || errorText.includes("429") || errorText.includes("RESOURCE_EXHAUSTED")) {
              throw new Error("429_EXHAUSTED");
          }
          
          throw new Error(`Gemini Error: ${errorText}`);
      }

      const data = await response.json();
      const candidate = data.candidates?.[0];
      const imagePart = candidate?.content?.parts?.find((p: any) => p.inlineData || p.inline_data);

      if (!imagePart) {
          throw new Error("Model did not generate an image. It might have refused the prompt.");
      }

      const resultBase64 = imagePart.inlineData?.data || imagePart.inline_data?.data;
      if (!resultBase64) throw new Error("No image data found in Gemini response.");

      // Se ha funzionato, carichiamo su supabase e usciamo dal loop
      const publicUrl = await uploadToStorage(resultBase64, userId);
      return { url: publicUrl, base64: resultBase64 };

    } catch (e: any) {
      if (e.message === "429_EXHAUSTED") {
          attempt++;
          if (attempt >= MAX_RETRIES) {
              throw new Error("Google API Quota limit reached after multiple retries. Please try again later.");
          }
          const waitTime = attempt * 30000; // Aspetta 30s la prima volta, 60s la seconda
          console.log(`⚠️ Quota Exhausted! Waiting ${waitTime / 1000} seconds before retrying...`);
          await delay(waitTime);
      } else {
          // Se l'errore non è 429 (es. token scaduto o errore interno), crasha subito
          throw e;
      }
    }
  }

  throw new Error("Generation failed unexpectedly.");
}