'use server';

import { PrismaClient } from '@prisma/client';
import { currentUser } from "@clerk/nextjs/server";
import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from 'next/cache';
import { editImageVertex } from "./editImage";
import { extractFurniture } from './extractFurniture';
import { generateNightVersionAction } from './generateNightVersion';

const prisma = new PrismaClient();

export async function editDesignAction(
    roomId: string, 
    baseImageUrl: string, 
    maskBase64: string, 
    prompt: string,
    currentStyle: string
) {
    try {
        const user = await currentUser();
        if (!user) throw new Error("Unauthorized");

        const dbUser = await prisma.user.findUnique({ where: { clerkId: user.id } });
        if (!dbUser) throw new Error("User not found in DB");

        console.log(`🪄 Starting Magic Replace for Room: ${roomId}`);

        // 1. Descărcăm imaginea curentă din Supabase și o facem Base64
        const imageResponse = await fetch(baseImageUrl);
        const arrayBuffer = await imageResponse.arrayBuffer();
        const baseImageBase64 = Buffer.from(arrayBuffer).toString('base64');

        // 2. Apelăm AI-ul pentru editare
        const imageResult = await editImageVertex(
            prompt, 
            dbUser.id, 
            baseImageBase64, 
            maskBase64
        );

        // 3. Creăm o nouă intrare în baza de date pentru acest design modificat
        const designId = uuidv4();
        await prisma.design.create({
            data: {
                id: designId,
                roomId: roomId,
                style: currentStyle, 
                promptUsed: `Magic Replace: ${prompt}`, // Semnalăm că e editare
                resultImageMain: imageResult.url,
                baseImageUrl: baseImageUrl, 
                status: 'COMPLETED',
            }
        });

        // 3.5 - Background tasks: furniture + night version
        extractFurniture(designId, imageResult.url, currentStyle).catch((err) => {
            console.error(`Background furniture extraction failed for edited design ${designId}:`, err);
        });

        generateNightVersionAction(designId, imageResult.url, dbUser.id).catch((err) => {
            console.error(`Background night version failed for edited design ${designId}:`, err);
        });

        // 4. Actualizăm interfața (va face poza să apară automat în carusel)
        const room = await prisma.room.findUnique({ where: { id: roomId } });
        if (room) {
            revalidatePath(`/project/${room.projectId}`);
        }

        return { success: true, newImageUrl: imageResult.url };

    } catch (error: any) {
        console.error("❌ Magic Replace Failed:", error);
        return { success: false, error: error.message || "Unknown error occurred" };
    }
}