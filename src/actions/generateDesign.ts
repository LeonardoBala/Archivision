'use server';

import { PrismaClient } from '@prisma/client';
import { currentUser } from "@clerk/nextjs/server";
import { v4 as uuidv4 } from 'uuid';
import { generateImageVertex } from "./generateImage";
import { roomOptions } from "@/lib/roomOptions";
import { styleOptions } from "@/lib/styleOptions";
import { moodOptions } from "@/lib/moodOptions";
import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from "@/lib/supabase";
import { extractFurniture } from "./extractFurniture";

const prisma = new PrismaClient();

// Funzione di utilità per creare pause (previene l'errore 429 Quota Exhausted)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

type GenerateResponse = 
  | { success: true; projectId: string; roomId: string; designIds: string[] }
  | { success: false; error: string };

export async function generateDesignAction(formData: any): Promise<GenerateResponse> {
  console.log("Server: Starting Sequential Design Process...");

  try {
    const user = await currentUser();
    if (!user) throw new Error("Unauthorized");
    
    // 1. RECUPERO DETTAGLI
    const selectedRoom = roomOptions.find(r => r.id === formData.roomType);
    const selectedStyle = styleOptions.find(s => s.id === formData.style);
    const selectedColor = moodOptions.find(c => c.id === formData.colorPalette); 

    const roomLabel = selectedRoom?.label || formData.roomType;
    const roomDesc = selectedRoom?.aiDescription || "A standard room interior.";
    const styleLabel = selectedStyle?.label || formData.style;
    const styleDesc = selectedStyle?.aiPrompt || "Standard interior design style.";
    const colorLabel = selectedColor?.label || "Neutral";
    const colorDesc = selectedColor?.aiPrompt || "Balanced lighting and tones.";

    const clerkUserId = user.id;

    // 2. SYNC USER
    let dbUser = await prisma.user.findUnique({
      where: { clerkId: clerkUserId }
    });

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          clerkId: clerkUserId,
          email: user.emailAddresses[0]?.emailAddress || "",
        }
      });
    }

    const dbUserId = dbUser.id;

    // 3. INPUT IMAGES
    const inputImagesBase64 = formData.uploadedImages || [];
    if (!inputImagesBase64 || inputImagesBase64.length === 0) {
        throw new Error("No input image provided. At least one image is required.");
    }

    // =========================================================
    // 4. DEFINIZIONE DEI DUE PROMPT SNELLITI
    // =========================================================

    const masterPrompt = `
      Edit the provided image directly. Do not generate a new room from scratch.

      =========================================================
      SECTION 1: ABSOLUTE CONSTRAINTS — NEVER VIOLATE THESE
      =========================================================

      1. CAMERA ANGLE & PERSPECTIVE (MOST IMPORTANT RULE):
         - Keep the EXACT same viewpoint, camera angle, and focal length as the input photo.
         - If the photo is shot from a corner, the output must be from the exact same corner.
         - If the photo is a centered frontal shot, keep it centered and frontal.
         - Do NOT reframe, zoom in, zoom out, or rotate the camera in any direction.
         - The vanishing points and perspective lines must be identical to the input.

      2. ARCHITECTURAL SHELL — DO NOT TOUCH:
         - Windows: same count, same position on the wall, same width and height, same shape.
           Do NOT turn a standard window into floor-to-ceiling glass. Do NOT widen or narrow any opening.
         - Doors: same count, same position, same size.
         - Ceiling height: must appear identical to the original photo.
         - Wall lengths and room depth: must remain unchanged.
         - Structural columns, beams, radiators, or pipes: keep them, only repaint/refinish if needed.

      3. NATURAL LIGHT DIRECTION:
         - Sunlight and shadows must come from the same direction as in the input photo.
         - Do NOT invent a light source on a solid wall where there is no window.

      =========================================================
      SECTION 2: TRANSFORMATION TASK
      =========================================================

      You are a Senior Interior Designer performing a full renovation on this specific room.
      
      STYLE TO APPLY: "${styleLabel}"
      Design principles: ${styleDesc}

      MOOD & COLOR PALETTE: "${colorLabel}"
      Atmosphere and tones: ${colorDesc}

      ROOM TYPE: ${roomLabel} — ${roomDesc}

      WHAT TO REPLACE (everything inside the architectural shell):
      
      A. FURNITURE — Complete Replacement:
         - Remove ALL existing furniture mentally before placing new pieces.
         - Do NOT let the shape of existing furniture dictate new furniture shapes.
           (e.g., if there is a bulky L-sofa, do not replace it with another L-sofa — choose freely based on style)
         - Every new furniture piece must match the "${styleLabel}" aesthetic in silhouette, material, and scale.
         - Pull furniture away from walls where possible (floating arrangement = luxury feel).
         - Create a clear focal point (window, feature wall, or media unit) and orient seating toward it.

      B. COLOR & MATERIALS:
         - Apply the "${colorLabel}" palette: ${colorDesc}
         - 60% base palette on walls and large furniture.
         - 30% complementary materials (wood, stone, metal) on tables and flooring accents.
         - 10% accent color on cushions, art, or small decor objects.
         - Replace flooring ONLY if it strongly contradicts the requested style.

      C. LIGHTING:
         - Replace ceiling fixtures with style-appropriate pieces.
         - Add layered lighting: ambient (cove/recessed) + task (floor/table lamps) + accent (plant uplighting, art lighting).
         - The pendant light position on the ceiling must stay in the same spot.

      D. DECOR & STYLING:
         - Remove ALL clutter, clothes, cables, and random objects from the original photo.
         - Add curated decor: indoor plants (Monstera, Olive Tree, Fiddle Leaf Fig) near light sources.
         - Add large-scale wall art that anchors the color palette.
         - Add lived-in micro-details: a book on a side table, a throw on the armrest.

      =========================================================
      SECTION 3: OUTPUT QUALITY REQUIREMENTS
      =========================================================

      - Photorealistic render quality (Unreal Engine 5 / Octane Render standard).
      - No AI plastic gloss — surfaces must have micro-textures: wood grain, fabric weave, glass reflection.
      - Lighting must bounce realistically (global illumination, soft shadows, no harsh black blobs).
      - All vertical lines (walls, door frames, cabinet edges) must be perfectly straight — 2-point perspective.
      - Full room in sharp focus (f/8 equivalent depth of field).
      - Cinematic color grade consistent with "${colorLabel}" mood.

      CAMERA & GEOMETRIC LOCK (CRITICAL):
      - IDENTICAL PERSPECTIVE: The horizon line and all vanishing points must remain at the exact same pixel coordinates as the target photo.
      - VERTICAL ALIGNMENT: All vertical lines (walls, door frames) must be perfectly straight (2-point perspective).
      - ZERO DISTORTION: Keep the exact FOV and focal length. Do not rotate, zoom, or crop the view.
      - SHELL PRESERVATION: Doors, corridors, and windows must stay in their EXACT position and size. Do not modify the architectural shell.

      =========================================================
      FINAL VALIDATION — THE "BEFORE & AFTER" TEST
      =========================================================

      A person comparing the INPUT photo and your OUTPUT must conclude:
      "This is clearly the EXACT SAME ROOM photographed from the EXACT SAME ANGLE — 
      same windows, same ceiling height, same perspective — but a top interior designer 
      completely renovated the furniture and decor."

    `;

    // PROMPT 2: Il "Reference Prompt" rigido (usato per le foto successive)
    const referencePrompt = `
      Edit the provided image. This is a NEW CAMERA ANGLE of a room we are currently designing.
      
      CRITICAL INSTRUCTION FOR CONSISTENCY:
      I am providing a history of previously generated images. You MUST replicate the EXACT SAME furniture, textures, and color palette ("${colorLabel}") from the previous designs into this new camera angle.

      - Do NOT invent new furniture styles.
      - If there was a specific furniture item in the first image, show that EXACT same item from this new angle.
      - Maintain the "${styleLabel}" style strictly.
      - Maintain the exact architectural shell (windows, doors, walls) of the new input photo.
      - Keep photorealistic render quality.
    `;

    // 5. UPLOAD IMMAGINE ORIGINALE SU SUPABASE
    let finalOriginalImageUrl = null;
    try {
        if (inputImagesBase64 && inputImagesBase64.length > 0) {
            const firstInputImage = inputImagesBase64[0];
            const cleanBase64 = firstInputImage.includes("base64,") ? firstInputImage.split("base64,")[1] : firstInputImage;
            const buffer = Buffer.from(cleanBase64, 'base64');
            const originalFileName = `${dbUserId}/InputImages/${uuidv4()}.jpg`; 
            
            const { error: uploadError } = await supabaseAdmin.storage
                .from('projects')
                .upload(originalFileName, buffer, { contentType: 'image/jpeg', upsert: true });

            if (!uploadError) {
                const { data } = supabaseAdmin.storage.from('projects').getPublicUrl(originalFileName);
                finalOriginalImageUrl = data.publicUrl;
            }
        }
    } catch (err) {
        console.error("⚠️ Exception uploading original image:", err);
    }

    // =========================================================
    // 6. GENERAZIONE SEQUENZIALE DELLE IMMAGINI
    // =========================================================
    
    console.log(`Starting Sequential Generation for ${inputImagesBase64.length} images...`);
    
    const generatedHistoryBase64: string[] = [];
    const generatedResults: { url: string, base64: string }[] = [];

    for (let i = 0; i < inputImagesBase64.length; i++) {
        const currentInputImage = inputImagesBase64[i];
        console.log(`Processing image ${i + 1} of ${inputImagesBase64.length}...`);

        // Scegliamo il prompt in base al numero della foto
        const isFirstImage = i === 0;
        const currentPrompt = isFirstImage ? masterPrompt : referencePrompt;

        const imageResult = await generateImageVertex(
            currentPrompt, 
            dbUserId,
            currentInputImage, 
            generatedHistoryBase64 
        );

        generatedHistoryBase64.push(imageResult.base64);
        generatedResults.push(imageResult);

        // Aspettiamo 20 secondi tra una foto e l'altra (tranne dopo l'ultima)
        if (i < inputImagesBase64.length - 1) {
            console.log("⏱️ Cooling down Google API for 20 seconds to prevent Quota limits...");
            await delay(20000); 
        }
    }

    // =========================================================
    // 7. SALVATAGGIO NEL DATABASE
    // =========================================================

    let targetProjectId = formData.projectId; 
    if (!targetProjectId) {
      targetProjectId = uuidv4();
      await prisma.project.create({
        data: {
          id: targetProjectId,
          userId: dbUserId,
          name: formData.projectName || "New Design",
          description: `Redesign ${formData.roomType} - ${formData.style}`,
          visibility: 'PRIVATE',
        }
      });
    }

    const roomId = uuidv4();
    let dbRoomType = formData.roomType.toUpperCase().replace(/\s+/g, '_');
    if (!['LIVING_ROOM', 'MASTER_BEDROOM', 'KITCHEN', 'BATHROOM', 'DINING_ROOM', 'KIDS_ROOM', 'OFFICE'].includes(dbRoomType)) {
        dbRoomType = 'OTHER';
    }

    await prisma.room.create({
      data: {
        id: roomId,
        projectId: targetProjectId,
        name: formData.roomName || roomLabel,
        type: dbRoomType as any,
        originalImage: finalOriginalImageUrl, 
      }
    });

    const createdDesignIds: string[] = [];

    for (let i = 0; i < generatedResults.length; i++) {
        const designId = uuidv4();

        //1. Saving the design
        await prisma.design.create({
            data: {
                id: designId,
                roomId: roomId,
                style: formData.style,
                promptUsed: i === 0 ? "Master Design Generated" : "Angle matched to Master Design",
                resultImageMain: generatedResults[i].url, 
                status: 'COMPLETED',
            }
        });
        createdDesignIds.push(designId);

        // 2. Extracting furniture in the BACKGROUND ✨
        // We remove the 'await' and catch errors so it doesn't crash the main thread
        extractFurniture(designId, generatedResults[i].url, formData.style).catch((err) => {
            console.error(`Background furniture extraction failed for design ${designId}:`, err);
        });
    }

    revalidatePath(`/project/${targetProjectId}`);
    revalidatePath(`/my-projects`);

    return { success: true, projectId: targetProjectId, roomId: roomId, designIds: createdDesignIds };

  } catch (error: any) {
    console.error("❌ Generation Failed:", error);
    return { success: false, error: error.message || "Unknown error occurred" };
  }
}