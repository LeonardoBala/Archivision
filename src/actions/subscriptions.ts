'use server';

import { auth, clerkClient } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function subscribeToPlan(planName: string) {
  try {
    // 1. auth() este async în versiunile noi!
    const { userId } = await auth();
    if (!userId) throw new Error("Trebuie să fii logat pentru a te abona.");

    // 2. clerkClient() este async!
    const client = await clerkClient();

    // 3. Extragem datele utilizatorului din Clerk pentru a crea înregistrarea completă
    const clerkUser = await client.users.getUser(userId);
    const email = clerkUser.emailAddresses[0]?.emailAddress;

    if (!email) throw new Error("Utilizatorul nu are un email valid.");

    // 4. Upsert User în baza de date (Folosim clerkId pentru căutare)
    // Astfel respectăm schema ta care cere clerkId și email obligatoriu
    const dbUser = await prisma.user.upsert({
      where: { clerkId: userId },
      update: {}, // Dacă user-ul există deja, nu îi modificăm datele aici
      create: {
        clerkId: userId,
        email: email,
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        avatarUrl: clerkUser.imageUrl,
      }
    });

    // 5. Creăm sau Actualizăm Subscripția în Prisma
    let credits = 5;
    if (planName === 'PRO') credits = 1000;
    if (planName === 'AGENCY') credits = 9999;

    await prisma.subscription.upsert({
      // ATENȚIE: Folosim dbUser.id (CUID-ul din baza ta), nu userId de la Clerk!
      where: { userId: dbUser.id }, 
      update: {
        plan: planName,
        creditsBalance: credits,
        isActive: true,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // Valabil 30 de zile
      },
      create: {
        userId: dbUser.id, 
        plan: planName,
        creditsBalance: credits,
      }
    });

    // 6. Actualizăm Clerk Metadata (Asta citește Navbar-ul ca să arate instant planul)
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        plan: planName
      }
    });

    // 7. Reîmprospătăm paginile afectate pentru a reflecta schimbările
    revalidatePath('/pricing');
    revalidatePath('/profile');
    revalidatePath('/dashboard');

    return { success: true };
  } catch (error) {
    console.error("Eroare la creare subscripție:", error);
    return { success: false, error: "Nu am putut procesa subscripția." };
  }
}