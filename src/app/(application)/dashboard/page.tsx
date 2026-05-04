import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Plus, ArrowRight } from 'lucide-react';
import { db } from '@/lib/db';
import Sidebar from '@/components/dashboard/Sidebar';
import RecentDesigns from '@/components/dashboard/RecentDesigns';
import NewsScroller from '@/components/dashboard/NewsScroller';

export default async function DashboardPage() {
  const { userId: clerkUserId } = await auth();
  if (!clerkUserId) redirect('/sign-in');

  const dbUser = await db.user.findUnique({
    where: { clerkId: clerkUserId },
    select: { id: true, firstName: true },
  });

  if (!dbUser) redirect('/sign-in');

  const userName = dbUser.firstName || 'Architect';

  // Fetch the 6 most recent completed designs across all rooms/projects
  const recentDesigns = await db.design.findMany({
    where: {
      room: {
        project: {
          userId: dbUser.id,
        },
      },
      status: 'COMPLETED',
    },
    orderBy: { createdAt: 'desc' },
    take: 6,
    select: {
      id: true,
      style: true,
      resultImageMain: true,
      room: {
        select: {
          name: true,
          projectId: true,
          project: {
            select: { name: true },
          },
        },
      },
    },
  });

  const designs = recentDesigns.map((d) => ({
    id: d.id,
    style: d.style,
    resultImageMain: d.resultImageMain,
    roomName: d.room.name,
    projectId: d.room.projectId,
    projectName: d.room.project.name,
  }));

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">

      {/* Sidebar — renders hamburger on mobile, fixed panel on desktop */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 md:ml-64 px-4 pt-20 pb-8 md:p-8 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-12 pb-20">

          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Welcome back, {userName}
            </h1>
            <p className="text-zinc-400 mt-1">
              Ready to transform your spaces? Start a new project or explore our AI tools below.
            </p>
          </div>

          {/* New Project Hero */}
          <div className="relative group overflow-hidden rounded-2xl md:rounded-3xl bg-zinc-900 border border-white/10 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 md:gap-6 hover:border-white/20 transition-all">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-white/15 transition-all" />

            <div className="relative z-10 max-w-lg">
              <Link
                href="/create"
                className="w-12 h-12 bg-white text-black rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-white/10 group-hover:scale-105 transition-transform hover:bg-zinc-200"
              >
                <Plus className="w-6 h-6" />
              </Link>
              <h2 className="text-2xl font-bold text-white mb-2">New Project</h2>
              <p className="text-zinc-400">
                Ready to design? Upload a room photo or start from a blueprint to generate stunning interior variations.
              </p>
            </div>

            <Link href="/create" className="relative z-10">
              <button className="flex items-center gap-2 bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-zinc-200 transition-colors shadow-xl shadow-white/5">
                Start Creation <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>

          {/* Recent Designs */}
          <RecentDesigns designs={designs} />

          {/* Latest Design News */}
          <NewsScroller />

        </div>
      </main>
    </div>
  );
}
