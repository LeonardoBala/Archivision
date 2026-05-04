'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, PlayCircle, GripVertical, ScanEye, Sparkles } from 'lucide-react';
import { SignedIn, SignedOut } from '@clerk/nextjs'; // <-- Importăm utilitarele Clerk
import Link from 'next/link'; // <-- Importăm Link din Next.js

export default function Hero() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    let start = 50;
    let direction = 0.5;
    const interval = setInterval(() => {
      if (isDragging) return;
      start += direction;
      if (start > 55 || start < 45) direction *= -1;
      setSliderPosition(start);
    }, 50);
    return () => clearInterval(interval);
  }, [isDragging]);

  return (
    <header className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6 overflow-hidden bg-zinc-950 min-h-[90vh] flex items-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-white/5 rounded-[100%] blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-zinc-900/50 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center z-10 relative">
        
        <div className="lg:col-span-6 flex flex-col items-start gap-8 relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white tracking-tight leading-[1.1]">
            Design Your <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-300 to-zinc-600">
              Dream Space.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 max-w-xl leading-relaxed font-light">
            Transform your interior with generative AI. Upload a floor plan or photo, define your style, and visualize your future home in seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-2 w-full sm:w-auto">
            
            {/* LOGICA DE RUTARE PENTRU BUTONUL PRINCIPAL */}
            <SignedIn>
              <Link href="/dashboard" className="bg-white text-zinc-950 h-12 sm:h-14 px-8 rounded-full text-sm sm:text-base font-medium hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 group w-full sm:w-auto">
                Go to Dashboard
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </SignedIn>
            
            <SignedOut>
              <Link href="/sign-up" className="bg-white text-zinc-950 h-12 sm:h-14 px-8 rounded-full text-sm sm:text-base font-medium hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 group w-full sm:w-auto">
                Start Designing Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </SignedOut>

            <button 
              onClick={() => document.getElementById('workflow')?.scrollIntoView({ behavior: 'smooth' })}
              className="h-12 sm:h-14 px-8 rounded-full text-sm sm:text-base font-medium text-white border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <PlayCircle className="w-5 h-5" />
              Watch Demo
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-8 border-t border-white/5 w-full max-w-md mt-4">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <img key={i} src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-zinc-950 grayscale" />
              ))}
            </div>
            <div>
               <div className="flex items-center gap-1">
                 {[1,2,3,4,5].map(star => <svg key={star} className="w-3 h-3 sm:w-4 sm:h-4 text-white fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
               </div>
              <div className="text-zinc-400 text-xs sm:text-sm mt-1"><span className="text-white font-medium">4.9/5</span> from 300+ clients</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 relative h-full flex items-center mt-8 lg:mt-0">
          <div 
            ref={containerRef}
            className="relative w-full aspect-[4/5] md:aspect-[3/4] rounded-[2rem] overflow-hidden border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.2)] bg-zinc-900 select-none cursor-ew-resize group"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={onMouseMove}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            onTouchMove={onTouchMove}
          >
            <img 
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop" 
              alt="AI Render" 
              className="absolute inset-0 w-full h-full object-cover grayscale-[20%]"
            />
            <div className="absolute top-4 right-4 px-2 py-1 sm:px-3 sm:py-1.5 bg-black/50 backdrop-blur-md rounded-full text-[10px] sm:text-xs font-medium text-white border border-white/10 flex items-center gap-1 sm:gap-2 pointer-events-none z-30">
               <Sparkles className="w-3 h-3" /> AI Render
            </div>

            <div 
              className="absolute inset-0 overflow-hidden z-20 resize-container transition-[width] duration-75 ease-out" 
              style={{ width: `${sliderPosition}%` }}
            >
              <img 
                src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1992&auto=format&fit=crop" 
                alt="Original Room" 
                className="absolute inset-0 w-full h-full object-cover max-w-none grayscale-[50%]"
                style={{ width: containerRef.current ? containerRef.current.offsetWidth : '100%' }} 
              />
               <div className="absolute top-4 left-4 px-2 py-1 sm:px-3 sm:py-1.5 bg-black/50 backdrop-blur-md rounded-full text-[10px] sm:text-xs font-medium text-white border border-white/10 flex items-center gap-1 sm:gap-2 pointer-events-none">
                  <ScanEye className="w-3 h-3" /> Original
               </div>
            </div>

            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-white z-40 transition-[left] duration-75 ease-out pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)] text-zinc-900 scale-90 group-hover:scale-110 transition-transform">
                <GripVertical className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
             <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-black/20 z-10" />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[90%] bg-zinc-800/30 blur-[80px] -z-10 rounded-full" />
        </div>
      </div>
    </header>
  );
};