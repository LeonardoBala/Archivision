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
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white">Your Recent Designs</h2>
          <p className="text-zinc-500 text-sm mt-1">Your generated designs will appear here.</p>
        </div>

        <div className="rounded-2xl border border-dashed border-white/10 bg-zinc-900/50 p-12 flex flex-col items-center justify-center gap-4 text-center">
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Your Recent Designs</h2>
          <p className="text-zinc-500 text-sm mt-1">Continue where you left off.</p>
        </div>
        <Link
          href="/my-projects"
          className="text-sm text-zinc-500 hover:text-white transition-colors flex items-center gap-1.5"
        >
          View all <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {designs.map((design) => (
          <Link
            key={design.id}
            href={`/project/${design.projectId}`}
            className="group flex flex-col rounded-2xl overflow-hidden border border-white/5 bg-zinc-900 hover:border-white/20 transition-all duration-300"
          >
            {/* Image */}
            <div className="aspect-video w-full overflow-hidden bg-zinc-800">
              {design.resultImageMain ? (
                <img
                  src={design.resultImageMain}
                  alt={design.style}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Wand2 className="w-8 h-8 text-zinc-600" />
                </div>
              )}
            </div>

            {/* Text block — solid, always visible */}
            <div className="px-3.5 py-3 border-t border-white/5 bg-zinc-900">
              <p className="text-white font-semibold text-sm leading-tight truncate">
                {design.style}
              </p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="text-zinc-400 text-xs truncate">{design.roomName}</span>
                <span className="text-zinc-700 text-xs">·</span>
                <span className="text-zinc-600 text-xs truncate">{design.projectName}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
