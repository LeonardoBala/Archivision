'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, Check } from 'lucide-react';
import { CreateProvider } from '@/context/CreateContext'; // Import the provider

// Define the steps and their paths
const steps = [
  { num: 1, label: 'Input Type', path: '/create/type' },
  { num: 2, label: 'Details', path: '/create/details' },
  { num: 3, label: 'Style', path: '/create/style' },
  { num: 4, label: 'Mood', path: '/create/mood' },
  { num: 5, label: 'Review', path: '/create/review' },
];

export default function CreationLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <CreateProvider>
      <div className="flex h-screen bg-zinc-950 text-white">
        
        {/* LEFT SIDEBAR - PROGRESS ONLY */}
        <div className="w-80 bg-zinc-900 border-r border-white/5 flex flex-col justify-between p-8">
          <div>
            <Link href="/dashboard" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 text-sm">
              <ChevronLeft className="w-4 h-4" /> Exit to Dashboard
            </Link>
            
            <h1 className="text-xl font-bold text-white mb-2">New Project</h1>
            <p className="text-zinc-500 text-xs mb-8">Setup your interior design generation.</p>

            {/* PROGRESS STEPS */}
            <div className="space-y-6 relative">
              <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-zinc-800 -z-10"></div>
              
              {steps.map((s) => {
                // Check if step is active or completed
                const isActive = pathname.includes(s.path);
                // Simple logic: if we are on step 3, step 1 and 2 are "completed"
                const isCompleted = steps.findIndex(step => step.path === pathname) > steps.findIndex(step => step.path === s.path);

                return (
                  <div key={s.num} className={`flex items-center gap-4 ${isActive || isCompleted ? 'opacity-100' : 'opacity-40'}`}>
                    <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all
                        ${isActive ? 'bg-white text-black border-white' : 
                          isCompleted ? 'bg-green-500 text-black border-green-500' : 'bg-zinc-900 border-zinc-700 text-zinc-500'}
                    `}>
                        {isCompleted ? <Check className="w-4 h-4" /> : s.num}
                    </div>
                    <span className="font-medium text-sm">{s.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-xs text-zinc-600">
             ArchiVision AI Workflow
          </div>
        </div>

        {/* MAIN CONTENT AREA (The pages will load here) */}
        <div className="flex-1 overflow-y-auto bg-zinc-950 no-scrollbar">
           {children}
        </div>

      </div>
    </CreateProvider>
  );
}