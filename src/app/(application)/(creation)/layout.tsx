'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, Check } from 'lucide-react';
import { CreateProvider } from '@/context/CreateContext';

const steps = [
  { num: 1, label: 'Input Type', path: '/create/type' },
  { num: 2, label: 'Details', path: '/create/details' },
  { num: 3, label: 'Style', path: '/create/style' },
  { num: 4, label: 'Mood', path: '/create/mood' },
  { num: 5, label: 'Review', path: '/create/review' },
];

export default function CreationLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentStepIndex = steps.findIndex(s => pathname.includes(s.path));

  return (
    <CreateProvider>
      <div className="flex flex-col md:flex-row h-screen bg-zinc-950 text-white">

        {/* MOBILE: Compact top progress bar */}
        <div className="md:hidden bg-zinc-900 border-b border-white/5 px-4 py-3 shrink-0">
          <div className="flex items-center justify-between mb-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors text-sm"
            >
              <ChevronLeft className="w-4 h-4" /> Exit
            </Link>
            <span className="text-xs font-semibold text-white">
              {steps[currentStepIndex]?.label || 'New Project'}
            </span>
            <span className="text-xs text-zinc-500">{currentStepIndex + 1} / {steps.length}</span>
          </div>
          {/* Progress dots */}
          <div className="flex items-center gap-1.5">
            {steps.map((s, i) => {
              const isActive = i === currentStepIndex;
              const isCompleted = i < currentStepIndex;
              return (
                <div
                  key={s.num}
                  className={`h-1.5 rounded-full transition-all duration-300
                    ${isActive ? 'flex-1 bg-white' : isCompleted ? 'flex-1 bg-green-500' : 'flex-1 bg-zinc-700'}`}
                />
              );
            })}
          </div>
        </div>

        {/* DESKTOP: Left sidebar with full step list */}
        <div className="hidden md:flex w-80 bg-zinc-900 border-r border-white/5 flex-col justify-between p-8 shrink-0">
          <div>
            <Link href="/dashboard" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 text-sm">
              <ChevronLeft className="w-4 h-4" /> Exit to Dashboard
            </Link>

            <h1 className="text-xl font-bold text-white mb-2">New Project</h1>
            <p className="text-zinc-500 text-xs mb-8">Setup your interior design generation.</p>

            <div className="space-y-6 relative">
              <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-zinc-800 -z-10" />
              {steps.map((s) => {
                const isActive = pathname.includes(s.path);
                const isCompleted = currentStepIndex > steps.findIndex(step => step.path === s.path);
                return (
                  <div key={s.num} className={`flex items-center gap-4 ${isActive || isCompleted ? 'opacity-100' : 'opacity-40'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all
                      ${isActive ? 'bg-white text-black border-white' :
                        isCompleted ? 'bg-green-500 text-black border-green-500' : 'bg-zinc-900 border-zinc-700 text-zinc-500'}`}>
                      {isCompleted ? <Check className="w-4 h-4" /> : s.num}
                    </div>
                    <span className="font-medium text-sm">{s.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="text-xs text-zinc-600">ArchiVision AI Workflow</div>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 overflow-y-auto bg-zinc-950 no-scrollbar">
          {children}
        </div>

      </div>
    </CreateProvider>
  );
}
