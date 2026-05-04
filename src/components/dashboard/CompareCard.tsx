'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react'; // Am scos MoveHorizontal din importuri

interface ToolProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  before: string;
  after: string;
  link: string;
}

export default function CompareCard({ tool }: { tool: ToolProps }) {
    const [isHovered, setIsHovered] = useState(false);

    // Când e hover, slider-ul se duce la 5%, altfel stă la 50%
    const sliderPosition = isHovered ? 5 : 50; 

    return (
        <Link 
            href={tool.link} 
            className="group relative block rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 hover:border-white/30 transition-all"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            
            {/* INTERACTIVE IMAGE AREA */}
            <div className="relative h-64 w-full overflow-hidden">
                
                {/* 1. AFTER IMAGE (Background - Full) */}
                <img 
                    src={tool.after} 
                    alt="After" 
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* 2. BEFORE IMAGE (Foreground - Clipped) */}
                <div 
                    className="absolute inset-0 w-full h-full overflow-hidden transition-[width] duration-700 ease-in-out"
                    style={{ width: `${sliderPosition}%` }}
                >
                    <img 
                        src={tool.before} 
                        alt="Before" 
                        className="absolute inset-0 w-full h-full object-cover max-w-none"
                        style={{ width: '100%' }} 
                    />
                    
                    {/* Label ORIGINAL */}
                    <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] font-bold text-white border border-white/10 opacity-100 transition-opacity duration-300">
                        ORIGINAL
                    </div>
                </div>

                {/* 3. SLIDER LINE (Am sters cercul din interiorul acestui div) */}
                <div 
                    className="absolute top-0 bottom-0 w-0.5 bg-white/80 shadow-[0_0_10px_rgba(0,0,0,0.3)] z-20 pointer-events-none transition-[left] duration-700 ease-in-out"
                    style={{ left: `${sliderPosition}%` }}
                >
                   {/* AICI ERA CERCUL, L-AM STERS */}
                </div>

                {/* Label AFTER */}
                <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] font-bold text-white border border-white/10 z-10">
                    AI RENDER
                </div>
            </div>

            {/* CONTENT */}
            <div className="p-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-zinc-800 text-white group-hover:bg-white group-hover:text-black transition-colors">
                        {tool.icon}
                    </div>
                    <h3 className="text-lg font-bold text-white">{tool.title}</h3>
                </div>
                <p className="text-sm text-zinc-400 line-clamp-2">
                    {tool.description}
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-white opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    Try now <ArrowRight className="w-4 h-4 ml-1" />
                </div>
            </div>
        </Link>
    );
}