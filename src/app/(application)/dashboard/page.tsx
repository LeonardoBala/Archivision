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
      <Sidebar />

      {/* Main Content - adjusted top padding for mobile top-nav */}
      <main className="flex-1 md:ml-64 px-4 pt-24 pb-12 md:p-8 md:pt-8 min-h-screen w-full max-w-[100vw]">
        <div className="max-w-7xl mx-auto space-y-10 md:space-y-12 pb-20">
          
          {/* Header */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Welcome back, {userName}
            </h1>
            <p className="text-zinc-400 text-sm md:text-base mt-1.5">
              Ready to transform your spaces? Start a new project below.
            </p>
          </div>

          {/* New Project Hero */}
          <div className="rounded-3xl bg-zinc-900 border border-white/10 p-5 md:p-8 relative overflow-hidden">
            {/* Subtle background glow for visual depth on mobile */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            
            <Link
              href="/create"
              className="inline-flex w-12 h-12 md:w-14 md:h-14 bg-white text-black rounded-2xl items-center justify-center mb-5 hover:bg-zinc-200 transition-colors shadow-lg"
            >
              <Plus className="w-6 h-6 md:w-7 md:h-7" />
            </Link>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">New Project</h2>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-6 max-w-md">
              Upload a room photo or start from a blueprint to generate stunning interior variations.
            </p>
            <Link href="/create" className="block">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-black px-6 py-3.5 md:py-3 rounded-xl font-bold hover:bg-zinc-200 transition-colors">
                Start Creation <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          <RecentDesigns designs={designs} />
          <NewsScroller />

        </div>
      </main>
    </div>
  );
}