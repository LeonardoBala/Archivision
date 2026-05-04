'use server';

import { PrismaClient } from '@prisma/client';
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function deleteRoomAction(roomId: string, projectId: string) {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Unauthorized");

    // Ștergem camera (datorită onDelete: Cascade din Prisma, se vor șterge automat și design-urile ei)
    await prisma.room.delete({
      where: { id: roomId }
    });

    // Revalidăm pagina proiectului ca să se actualizeze UI-ul instant
    revalidatePath(`/project/${projectId}`);
    
    return { success: true };
  } catch (error: any) {
    console.error("❌ Delete Room Failed:", error);
    return { success: false, error: error.message || "Failed to delete room" };
  }
}