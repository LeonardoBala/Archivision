'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/homeComponents/Navbar';
import Footer from '@/components/homeComponents/Footer2';
import Link from 'next/link';

export default function AboutPage() {
  const myProfilePictureUrl = "/Personalimg.png"; 
  const myName = "Leonardo Bala";

  // State și Ref pentru animația liniei la Scroll
  const timelineRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculăm cât a parcurs din secțiune
      const start = rect.top - windowHeight / 2;
      const total = rect.height;
      let currentProgress = -start / total;
      
      // Asigurăm valoarea strict între 0 și 1
      currentProgress = Math.max(0, Math.min(1, currentProgress * 1.2)); 
      setScrollProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const storyPoints = [
    {
        id: '01',
        title: 'The Vision',
        desc: "I realized that the gap between imagining a beautiful home and creating one was massive. I wanted to build a bridge using the most powerful technology available today. Design shouldn't be a luxury reserved for a few; it should be accessible to anyone with an idea.",
        img: "/about1.png", 
        threshold: 0.1, 
    },
    {
        id: '02',
        title: 'Art Meets Code',
        desc: "As someone deeply passionate about both fine arts and software engineering, ArchiVision is my love letter to both worlds. It is the perfect intersection where the cold, logical precision of code meets the warm, subjective beauty of interior design.",
        img: "/about2.png", 
        threshold: 0.35,
    },
    {
        id: '03',
        title: 'The Tech Stack',
        desc: "Integrating Google's latest models—Imagen 3 for photorealistic rendering and Veo for fluid spatial visualization—wasn't just a technical choice; it was an aesthetic one. We needed realism that felt tangible, not just pixels on a screen. Every shadow, texture, and reflection is calculated to mimic physical reality.",
        img: "/about3.png", 
        threshold: 0.6,
    },
    {
        id: '04',
        title: 'The Future',
        desc: "AI will not replace architects or designers; it will give them superpowers. By automating the tedious drafting process, professionals can spend 90% of their time actually designing, rather than rendering. ArchiVision is just the first step towards a democratized, AI-assisted architectural future.",
        img: "/about4.png", 
        threshold: 0.85,
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black overflow-hidden font-sans selection:bg-black/10">
        
        <Navbar />

        <main className="pt-20">
            
            {/* --- SECTION 1: THE HERO --- */}
            <section className="relative px-6 pb-20 min-h-[90vh] flex flex-col items-center justify-start pt-20">
                <div className="absolute top-32 left-1/2 -translate-x-1/2 w-full text-center z-0 select-none pointer-events-none">
                    <h1 className="text-[12vw] leading-none font-bold tracking-tighter text-black uppercase opacity-100">
                        KNOW <span className="text-zinc-400">ARCHI.V</span>
                    </h1>
                </div>

                <div className="relative z-10 mt-12 w-full max-w-3xl h-[380px] md:h-[800px]">
                    <div 
                        className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_0_150px_rgba(0,0,0,0.9)]" 
                        style={{ 
                            maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                            WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)'
                        }}
                    >
                        <Image 
                            src={myProfilePictureUrl}
                            alt={myName}
                            fill
                            className="object-cover object-top grayscale contrast-125 brightness-110"
                            priority
                        />
                    </div>
                </div>

                <div className="absolute top-1/2 right-6 md:right-32 max-w-xs text-right z-20 hidden md:block">
                    <h3 className="text-sm font-bold uppercase tracking-widest mb-4 border-b-2 border-black pb-2 inline-block">
                        Passion Beyond Code
                    </h3>
                    <p className="text-xs font-medium text-zinc-600 leading-relaxed uppercase">
                        Fueled by a deep-rooted passion, {myName}'s journey reflects his fearless ambition to redefine architectural design on a global scale through AI.
                    </p>
                </div>

                <div className="absolute bottom-32 z-20 flex flex-col items-center">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-[1px] w-12 bg-black"></div>
                        <span className="uppercase tracking-[0.2em] text-sm font-bold">The Founder</span>
                        <div className="h-[1px] w-12 bg-black"></div>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-light uppercase tracking-widest">
                        {myName}
                    </h2>
                </div>
            </section>

            {/* --- SECTION 2: THE TIMELINE STORY --- */}
            <section className="bg-zinc-950 text-white px-6 py-32 rounded-t-[3rem] -mt-20 relative z-30 shadow-[0_-50px_100px_rgba(0,0,0,0.5)]">
                <div className="max-w-7xl mx-auto">
                    
                    <div className="text-center mb-40">
                        <p className="text-zinc-500 text-sm tracking-widest uppercase mb-4">Our Journey</p>
                        <h2 className="text-4xl md:text-6xl font-medium tracking-tight">
                            Redefining the <br/> invisible line.
                        </h2>
                    </div>

                    {/* Timeline Container */}
                    <div className="relative w-full" ref={timelineRef}>
                        
                        {/* THE GLOWING CURVED LINE (Desktop Only) */}
                        <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[300px] pointer-events-none hidden md:block z-0">
                            
                            {/* Linia de Fundal (Stinsă) */}
                            <svg className="w-full h-full absolute top-0 left-0" viewBox="0 0 100 1500" preserveAspectRatio="none">
                                <path 
                                    d="M 50 0 C 90 120, 90 250, 50 375 C 10 500, 10 630, 50 750 C 90 870, 90 1000, 50 1125 C 10 1250, 10 1380, 50 1500" 
                                    fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" vectorEffect="non-scaling-stroke" 
                                />
                            </svg>

                            {/* Linia Animată (Aprinsă) - Folosind CLIP-PATH */}
                            <svg 
                                className="w-full h-full absolute top-0 left-0 drop-shadow-[0_0_15px_rgba(255,255,255,1)]" 
                                viewBox="0 0 100 1500" 
                                preserveAspectRatio="none"
                                style={{ clipPath: `inset(0 0 ${100 - scrollProgress * 100}% 0)` }}
                            >
                                <path 
                                    d="M 50 0 C 90 120, 90 250, 50 375 C 10 500, 10 630, 50 750 C 90 870, 90 1000, 50 1125 C 10 1250, 10 1380, 50 1500" 
                                    fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="3" vectorEffect="non-scaling-stroke" 
                                />
                            </svg>

                        </div>

                        {/* Story Items (Zig-Zag) */}
                        <div className="flex flex-col relative z-10 pt-10 md:pt-20">
                            {storyPoints.map((point, index) => {
                                const isEven = index % 2 === 0;
                                const isActive = scrollProgress > point.threshold;
                                const isLast = index === storyPoints.length - 1;

                                return (
                                    <div key={point.id} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24 ${isLast ? 'pb-0' : 'pb-32 md:pb-56'}`}>
                                        
                                        {/* TEXT COLUMN */}
                                        <div className={`flex-1 md:w-1/2 ${isEven ? 'text-left' : 'text-left md:text-right'}`}>
                                            <h3 className="text-3xl md:text-4xl font-light text-white mb-6 flex items-center gap-4 justify-start md:justify-start">
                                                {!isEven && <span className="text-zinc-700 font-mono text-lg hidden md:inline-block">{point.id}</span>}
                                                {point.title}
                                                {isEven && <span className="text-zinc-700 font-mono text-lg">{point.id}</span>}
                                                {!isEven && <span className="text-zinc-700 font-mono text-lg inline-block md:hidden">{point.id}</span>}
                                            </h3>
                                            <p className={`text-zinc-400 text-lg leading-relaxed ${isActive ? 'text-zinc-300' : ''} transition-colors duration-700`}>
                                                {point.desc}
                                            </p>
                                        </div>

                                        {/* IMAGE COLUMN */}
                                        <div className="flex-1 md:w-1/2 w-full">
                                            <div className={`relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 transition-all duration-1000 ${
                                                isActive ? 'scale-100 opacity-100 shadow-[0_0_40px_rgba(255,255,255,0.1)]' : 'scale-95 opacity-50 grayscale'
                                            }`}>
                                                <Image 
                                                    src={point.img}
                                                    alt={point.title}
                                                    fill
                                                    className={`object-cover transition-transform duration-1000 ${isActive ? 'scale-105' : 'scale-100'}`}
                                                />
                                                <div className={`absolute inset-0 bg-black/40 transition-opacity duration-1000 ${isActive ? 'opacity-0' : 'opacity-100'}`}></div>
                                            </div>
                                        </div>

                                    </div>
                                );
                            })}
                        </div>

                    </div>

                    <div className="mt-32 md:mt-48 border-t border-white/10 pt-16 flex flex-col items-center text-center md:flex-row md:items-end md:justify-between md:text-left gap-6">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-2">JOIN US.</h2>
                            <p className="text-zinc-500">Be part of the new design era.</p>
                        </div>
                        <Link href="/careers" className="group inline-flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-medium text-sm hover:bg-zinc-200 transition-colors md:bg-transparent md:text-white md:px-0 md:py-0 md:rounded-none md:font-normal md:text-xl md:hover:bg-transparent md:hover:opacity-70">
                            View open positions <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                </div>
            </section>

        </main>
        
        <Footer />
    </div>
  );
}