'use server';

import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function deleteProjectAction(projectId: string) {
  try {
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) throw new Error("Unauthorized");

    // Găsim userul în baza de date
    const user = await prisma.user.findUnique({ 
        where: { clerkId: clerkUserId } 
    });
    if (!user) throw new Error("User not found");

    // Verificăm dacă proiectul îi aparține (măsură de securitate)
    const project = await prisma.project.findUnique({ 
        where: { id: projectId } 
    });
    
    if (!project || project.userId !== user.id) {
        throw new Error("Project not found or unauthorized");
    }

    // Ștergem proiectul (Rooms și Designs se șterg în cascadă)
    await prisma.project.delete({ 
        where: { id: projectId } 
    });

    // Reîmprospătăm pagina pentru a face cardul să dispară instant
    revalidatePath('/my-projects');
    revalidatePath('/dashboard');

    return { success: true };
  } catch (error) {
    console.error("Eroare la ștergere:", error);
    return { success: false, error: "Failed to delete project." };
  }
}