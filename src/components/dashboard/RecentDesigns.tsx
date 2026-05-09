'use client';

import Link from 'next/link';
import { ArrowRight, Wand2, Plus } from 'lucide-react';

interface RecentDesign {
  id: string;
  style: string;
  resultImageMain: string | null;
  roomName: string;
  projectName: string;
  projectId: string;
}

export default function RecentDesigns({ designs }: { designs: RecentDesign[] }) {
  if (designs.length === 0) {
    return (
      <section>
        <div className="mb-5 md:mb-6">
          <h2 className="text-xl font-bold text-white">Your Recent Designs</h2>
          <p className="text-zinc-500 text-sm mt-1">Your generated designs will appear here.</p>
        </div>

        <div className="rounded-3xl border border-dashed border-white/10 bg-zinc-900/50 p-8 md:p-12 flex flex-col items-center justify-center gap-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
            <Wand2 className="w-6 h-6 text-zinc-500" />
          </div>
          <div>
            <p className="text-white font-medium">No designs yet</p>
            <p className="text-zinc-500 text-sm mt-1">Create your first project to see your designs here.</p>
          </div>
          <Link
            href="/create"
            className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-zinc-200 transition-colors mt-2"
          >
            <Plus className="w-4 h-4" /> Start Creating
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="flex items-end justify-between mb-5 md:mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Your Recent Designs</h2>
          <p className="text-zinc-500 text-sm mt-1">Continue where you left off.</p>
        </div>
        <Link
          href="/my-projects"
          className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 pb-0.5"
        >
          View all <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Added touch-pan-x to enforce horizontal swiping logic */}
      <div className="flex items-stretch md:grid md:grid-cols-3 gap-4 overflow-x-auto snap-x snap-mandatory pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] touch-pan-x">
        {designs.map((design) => (
          <Link
            key={design.id}
            href={`/project/${design.projectId}`}
            // Added select-none so text/elements aren't accidentally highlighted while swiping
            className="group flex flex-col rounded-2xl overflow-hidden border border-white/5 bg-zinc-900 hover:border-white/20 transition-all duration-300 w-[280px] md:w-auto shrink-0 snap-center select-none"
          >
            <div className="relative w-full aspect-[4/3] bg-zinc-800 shrink-0 overflow-hidden">
              {design.resultImageMain ? (
                <img
                  src={design.resultImageMain}
                  alt={design.style}
                  draggable={false} // Prevents the "ghost image drag" bug on mobile/emulators
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out pointer-events-none md:pointer-events-auto"
                />
              ) : (
                <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                  <Wand2 className="w-6 h-6 text-zinc-600" />
                </div>
              )}
            </div>

            <div className="px-4 py-3.5 border-t border-white/5 bg-zinc-900 flex-1 flex flex-col justify-center">
              <p className="text-white font-semibold text-sm leading-tight truncate">
                {design.style}
              </p>
              <p className="text-zinc-500 text-xs truncate mt-1">
                {design.roomName} · {design.projectName}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}