import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { FolderOpen, Plus, Calendar, Layers, Image as ImageIcon } from 'lucide-react';
import DeleteProjectButton from '@/components/project/DeleteProjectButton';
import Sidebar from '@/components/dashboard/Sidebar'; // <-- Import corretto del tuo Sidebar

const prisma = new PrismaClient();

export default async function MyProjectsPage() {
  const { userId: clerkUserId } = await auth();
  if (!clerkUserId) redirect('/sign-in');

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: clerkUserId },
    select: { id: true }
  });

  if (!dbUser) {
    redirect('/dashboard');
  }

  const projects = await prisma.project.findMany({
    where: { userId: dbUser.id },
    orderBy: { createdAt: 'desc' },
    include: {
      rooms: {
        include: {
          designs: {
            orderBy: { createdAt: 'desc' },
            take: 1 
          }
        }
      }
    }
  });

  return (
    // Container principal Flex (Stessa struttura della Dashboard)
    <div className="flex min-h-screen bg-zinc-950 text-white">
      
      {/* Sidebar — renders hamburger on mobile, fixed panel on desktop */}
      <Sidebar />

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 md:ml-64 px-4 pt-20 pb-8 md:p-8 min-h-screen">
        
        {/* Container centrato che crea lo spazio equo ai lati */}
        <div className="max-w-7xl mx-auto space-y-12 pb-20">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white mb-2">My Projects</h1>
              <p className="text-zinc-400">View and manage all your generated interior designs.</p>
            </div>
            <Link 
              href="/create/type" 
              className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full font-medium hover:bg-zinc-200 transition-colors shadow-lg"
            >
              <Plus className="w-5 h-5" />
              New Project
            </Link>
          </div>

          {/* Empty State (Dacă nu are niciun proiect) */}
          {projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-4 border-2 border-dashed border-zinc-800 rounded-3xl bg-zinc-900/30 text-center">
              <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-4 border border-zinc-800">
                <FolderOpen className="w-8 h-8 text-zinc-500" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">No projects yet</h2>
              <p className="text-zinc-400 mb-6 max-w-sm">
                You haven't created any interior designs yet. Start a new project to see the magic happen!
              </p>
              <Link 
                href="/create/type" 
                className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-zinc-200 transition-all shadow-lg hover:scale-105"
              >
                Start Creation
              </Link>
            </div>
          ) : (
            /* Projects Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {projects.map((project) => {
                const firstRoom = project.rooms[0];
                const coverImage = 
                  firstRoom?.designs[0]?.resultImageMain || 
                  firstRoom?.originalImage || 
                  null;

                return (
                  <div 
                    key={project.id}
                    className="group relative flex flex-col bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-600 transition-all shadow-lg hover:shadow-2xl hover:shadow-white/5"
                  >
                    {/* Butonul de ștergere */}
                    <DeleteProjectButton projectId={project.id} />

                    {/* Restul cardului este clickabil */}
                    <Link href={`/project/${project.id}?from=my-projects`} className="flex flex-col flex-grow hover:-translate-y-1 transition-transform">
                      
                      {/* Thumbnail Area */}
                      <div className="aspect-video w-full bg-zinc-950 relative overflow-hidden border-b border-zinc-800">
                        {coverImage ? (
                          <img 
                            src={coverImage} 
                            alt={project.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-zinc-600">
                            <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                            <span className="text-xs font-medium">Processing / No Image</span>
                          </div>
                        )}
                        
                        {/* Status/Privacy Badge */}
                        <div className="absolute top-3 right-3 z-10 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider">
                          {project.visibility}
                        </div>
                      </div>

                      {/* Project Details */}
                      <div className="p-5 flex flex-col flex-grow">
                        <h3 className="text-lg font-bold text-white truncate mb-1 group-hover:text-blue-400 transition-colors">
                          {project.name}
                        </h3>
                        
                        <div className="flex items-center gap-4 mt-auto pt-4 text-xs font-medium text-zinc-500">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(project.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5" />
                            {project.rooms.length} {project.rooms.length === 1 ? 'Room' : 'Rooms'}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}