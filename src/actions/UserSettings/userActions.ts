'use server';

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// 1. SYNC FUNCTION
export async function syncUser() {
  const clerkUser = await currentUser();

  if (!clerkUser) return null;

  const existingUser = await db.user.findUnique({
    where: { clerkId: clerkUser.id },
  });

  if (existingUser) {
    return existingUser;
  }

  const newUser = await db.user.create({
    data: {
      clerkId: clerkUser.id,
      email: clerkUser.emailAddresses[0].emailAddress,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
      avatarUrl: clerkUser.imageUrl,
    },
  });

  return newUser;
}

// 2. UPDATE FUNCTION
export async function updateProfile(formData: {
  firstName: string;
  lastName: string;
  username: string;
  bio: string;
  website: string;
}) {
  const clerkUser = await currentUser();
  if (!clerkUser) throw new Error("Unauthorized");

  try {
    await db.user.update({
      where: { clerkId: clerkUser.id },
      data: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        bio: formData.bio,
        website: formData.website,
      },
    });
    
    revalidatePath("/settings");
    return { success: true };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false };
  }
}

// 3. GET USER INFO FUNCTION
export async function getUserInfo() {
  const clerkUser = await currentUser();

  if (!clerkUser) return null;

  try {
    const user = await db.user.findUnique({
      where: { clerkId: clerkUser.id },
    });

    return user;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
}

// 4. GET USER PROJECTS FUNCTION
export async function getUserProjects() {

    // Getting the user
    const clerkUser = await currentUser();

    // If no user is found, return an empty array
    if(!clerkUser) return [];

    // Finding the user in the database
    const dbUser = await db.user.findUnique({
        where: {
            clerkId: clerkUser.id
        }
    });

    // If no database user is found, return an empty array
    if(!dbUser) return [];

    // 1. Fetch Projetcs with the rooms and designs
    const projects = await db.project.findMany({
        where: {
            userId: dbUser.id
        },
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            rooms: {
                include: {
                    designs: {
                        take: 1,
                        orderBy: { // We get the latest design
                            createdAt: 'desc'
                        }
                    }
                }
            }
        }
    });

    // 2. Trasforming the data for the frontend
    // We need to provide {id, title, imageUrl, likes, views} for each project
    // So we map it here
    return projects.map((project => {

        let coverImage = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80";

        if (project.rooms.length > 0) {
        // Look through rooms to find a design with an image
        for (const room of project.rooms) {
                if (room.designs.length > 0 && room.designs[0].resultImageMain) {
                    coverImage = room.designs[0].resultImageMain;
                     break; // Stop once we find an image
                }
            }
        }

        return {
            id: project.id,
            title: project.name,
            imageUrl: coverImage,
            likes: 0,
            views: 0
        };
    }));
}