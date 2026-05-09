'use client';

import React from 'react';
import { Video, ArrowUpRight, Sparkles, Box, ShoppingBag } from 'lucide-react';

export default function Workflow() {
  const steps = [
    { title: '01. Data Capture', icon: <ArrowUpRight className="w-5 h-5" />, desc: 'Upload your floor plan (2D) or existing photos. Our system automatically detects walls, windows, and spatial context.' },
    { title: '02. Design Generation', icon: <Sparkles className="w-5 h-5" />, desc: 'Select from Industrial, Minimalist, or Boho styles. AI generates 4 distinct variations per room instantly.' },
    { title: '03. 3D Hybrid View', icon: <Box className="w-5 h-5" />, desc: 'Experience a "3D Shell" where walls are raised from your plan and textured with the AI design. Walk through your idea.' },
    { title: '04. Smart Shopping', icon: <ShoppingBag className="w-5 h-5" />, desc: 'Automatic detection of furniture in generated images with direct links to purchase similar items.' },
  ];

  return (
    <section id="workflow" className="py-16 md:py-32 px-4 sm:px-6 border-t border-white/5 bg-zinc-950">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        
        {/* STANGA: Video Container */}
        <div className="relative">
          <div className="relative lg:sticky lg:top-32">
            
            {/* NOUL WRAPPER PENTRU GLOW SI EVIDENTIERE */}
            <div className="relative group">
                {/* EFECTUL DE GLOW ALB 
                  Am înlocuit gradientul colorat cu bg-white/30 și blur-2xl pentru o aură fină, albă.
                */}
                <div className="absolute -inset-1 bg-white/30 rounded-[1.5rem] blur-2xl opacity-40 group-hover:opacity-100 transition duration-700 pointer-events-none"></div>

                {/* BROWSER MOCKUP WRAPPER */}
                <div className="relative w-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/20 bg-zinc-900 z-10">
                  
                  {/* Bara de sus a "Browser-ului" */}
                  <div className="w-full h-8 bg-zinc-900/80 backdrop-blur border-b border-white/5 flex items-center px-4 gap-1.5 absolute top-0 left-0 z-10">
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-600/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-600/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-600/80"></div>
                    {/* Poți folosi culorile clasice (roșu/galben/verde) sau acestea gri (zinc-600) pentru un look super minimalist */}
                  </div>

                  {/* VIDEOCLIPUL */}
                  <video 
                    src="/DemoVideo.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="w-full h-auto block pt-8" 
                  />
                  
                  {/* Badge "Video Demo" */}
                  <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md text-white px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2 z-20">
                    <Video className="w-4 h-4 text-white" />
                    <span className="text-xs font-medium tracking-wide">Live Demo</span>
                  </div>
                </div>
            </div>

            {/* Glow-ul general mai slab in fundal (transformat și el într-o lumină albă subtilă) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-white/5 blur-[60px] -z-10 rounded-full pointer-events-none" />
            
          </div>
        </div>

        {/* DREAPTA: Accordion / Features */}
        <div className="flex flex-col justify-center">
          <div className="mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white tracking-tight mb-4 md:mb-6">
              Workflow built for <br className="hidden sm:block"/>visionaries.
            </h2>
            <p className="text-base md:text-xl text-zinc-400">
              From a simple photo to a fully rendered 3D walkthrough.
            </p>
          </div>

          <div className="divide-y divide-zinc-800 border-y border-zinc-800">
            {steps.map((step, index) => (
              <div key={index} className="group py-6 md:py-8 cursor-pointer">
                <div className="flex justify-between items-center mb-2 md:mb-4">
                  <h3 className="text-xl md:text-2xl font-medium text-white tracking-tight group-hover:text-zinc-300 transition-colors">
                    {step.title}
                  </h3>
                  <div className="text-zinc-500 group-hover:text-white transition-colors">
                    {step.icon}
                  </div>
                </div>
                <p className="text-sm md:text-lg text-zinc-500 max-w-md group-hover:text-zinc-400 transition-colors">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}