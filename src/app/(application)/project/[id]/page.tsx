import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import ProjectInterface from '@/components/project/ProjectInterface'; 

const prisma = new PrismaClient();

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectResultPage({ params }: PageProps) {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const resolvedParams = await params;
  const projectId = resolvedParams.id;

  // Fetch Data: Luam tot proiectul cu toate camerele si TOATE design-urile (imaginile)
  const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        rooms: {
          include: {
            designs: {
              // 👇 Asigură-te că ai asta inclusă 👇
              include: {
                 furnitureItems: true 
              },
              orderBy: { createdAt: 'desc' }
            }
          },
          orderBy: { createdAt: 'asc' }
        }
      }
    });

  if (!project) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        Project not found.
      </div>
    );
  }

  // Convertim datele pentru a fi serializabile și compatibile cu interfața
  const serializableRooms = project.rooms.map(room => ({
      id: room.id,
      name: room.name,
      type: room.type,
      originalImage: room.originalImage || null,
      designs: room.designs.map(d => ({
        id: d.id,
        style: d.style,
        resultImageMain: d.resultImageMain || "",
        baseImageUrl: d.baseImageUrl || null,
        promptUsed: d.promptUsed,
        createdAt: d.createdAt,
        
        // 👇 Pasează mobila în Frontend 👇
        furnitureItems: d.furnitureItems.map(item => ({
            id: item.id,
            name: item.name,
            category: item.category,
            estimatedPrice: item.estimatedPrice ? Number(item.estimatedPrice) : null,
            shopLink: item.shopLink
        }))

      }))
    }));

  return (
    <ProjectInterface
      projectId={project.id} 
      projectName={project.name}
      rooms={serializableRooms}
    />
  );
}