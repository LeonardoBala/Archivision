'use server';

import { PrismaClient } from '@prisma/client';
import { generateImageVertex } from './generateImage';

const prisma = new PrismaClient();

const NIGHT_PROMPT = `
  Transform this interior design image into a nighttime scene.

  =========================================================
  ABSOLUTE CONSTRAINTS — NEVER VIOLATE THESE
  =========================================================

  1. CAMERA ANGLE & PERSPECTIVE:
     - Keep the EXACT same viewpoint, camera angle, and focal length.
     - Do NOT reframe, zoom, rotate, or crop in any way.

  2. FURNITURE & ARCHITECTURE:
     - Keep ALL furniture, decor, plants, and objects exactly as they are.
     - Keep ALL architectural elements unchanged: walls, windows, doors, ceiling height.
     - Do NOT move, add, or remove any item.

  =========================================================
  TRANSFORMATION TASK: DAY → NIGHT
  =========================================================

  A. EXTERIOR (WINDOWS):
     - Show a deep night sky through every window (dark blue-black gradient).
     - No daylight, no outdoor brightness — pure nighttime outside.

  B. ARTIFICIAL LIGHTING — TURN EVERYTHING ON:
     - Ceiling fixtures: emit warm amber/gold light, create a soft halo on ceiling.
     - Pendant lights: fully lit, casting characteristic downward cone of light.
     - Floor lamps and table lamps: glowing with warm 2700K–3000K light.
     - LED strips or cove lighting: subtle ambient glow along edges.
     - Every light source in the room must be visibly ON.

  C. LIGHT PHYSICS:
     - Realistic light pools on floors, walls, and furniture surfaces.
     - Soft warm shadows — no harsh black blobs.
     - Global illumination bounce: warm tones reflecting on nearby surfaces.
     - No ambient daylight fill — all illumination comes from interior sources only.

  D. ATMOSPHERE:
     - Cozy, intimate, warm residential night scene.
     - Slight increase in contrast and depth compared to the daytime version.
     - Cinematic quality — like a real architectural night photography shot.

  =========================================================
  FINAL VALIDATION
  =========================================================

  A person comparing the DAY version and this NIGHT version must conclude:
  "This is clearly the EXACT SAME ROOM with the EXACT SAME FURNITURE —
  just photographed at night with all the interior lights switched on."
`;

export async function generateNightVersionAction(
  designId: string,
  dayImageUrl: string,
  userId: string
) {
  try {
    console.log(`🌙 Starting night version generation for design ${designId}`);

    const imageResponse = await fetch(dayImageUrl);
    const arrayBuffer = await imageResponse.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');

    const result = await generateImageVertex(
      NIGHT_PROMPT,
      userId,
      `data:image/jpeg;base64,${base64}`,
      []
    );

    await prisma.design.update({
      where: { id: designId },
      data: { resultImageNight: result.url },
    });

    console.log(`✅ Night version saved for design ${designId}`);
  } catch (err) {
    console.error(`❌ Night version failed for design ${designId}:`, err);
    throw err;
  }
}
