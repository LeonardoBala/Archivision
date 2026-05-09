'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';

type StyleData = {
  name: string;
  description: string;
  image: string;
};

export default function StyleSelector() {
  const styles: StyleData[] = [
    {
      name: 'Japandi',
      description: 'A harmonious blend of Japanese rustic minimalism and Scandinavian functionality. Features warm woods, neutral tones, and wabi-sabi principles.',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2000&auto=format&fit=crop'
    },
    {
      name: 'Earthy Sage',
      description: 'Biophilic design emphasizing a deep connection to nature. Features sage greens, natural stone, indoor plants, and organic textures.',
      image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2000&auto=format&fit=crop'
    },
    {
      name: 'Industrial Navy',
      description: 'Exposed brick, raw concrete, and visible ductwork combined with deep moody blues, rich leather, and metallic accents.',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2000&auto=format&fit=crop'
    },
    {
      name: 'Minimalist',
      description: 'Clean lines, monochromatic palettes, and open spaces where every object has a purpose. Less is always more.',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop'
    },
    {
      name: 'Luxury Gold',
      description: 'Timeless elegance featuring rich cream upholstery, premium marble surfaces, and sophisticated metallic gold details.',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop'
    },
  ];

  const [activeStyle, setActiveStyle] = useState<StyleData>(styles[0]);

  return (
    <section className="relative py-16 md:py-24 px-4 sm:px-6 bg-zinc-950 border-t border-white/5">
      {/* Background Ambience — clipped in their own layer so section itself isn't overflow-hidden */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-white/5 rounded-[100%] blur-[120px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.05]"></div>
      </div>

      <div className="max-w-7xl mx-auto">

        {/* ── Mobile: pill grid (wraps so all options are always visible) ── */}
        <div className="md:hidden flex flex-wrap gap-2 mb-6">
          {styles.map((style) => {
            const isActive = activeStyle.name === style.name;
            return (
              <button
                key={style.name}
                onClick={() => setActiveStyle(style)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? 'bg-white text-zinc-950 shadow-lg shadow-white/10'
                    : 'bg-white/5 text-zinc-400 border border-white/10 active:bg-white/10'
                }`}
              >
                {style.name}
              </button>
            );
          })}
        </div>

        {/* ── Desktop: large typographic tabs ── */}
        <div className="hidden md:flex items-end justify-between mb-16">
          <div className="flex items-start gap-16 px-4">
            {styles.map((style) => {
              const isActive = activeStyle.name === style.name;
              return (
                <div
                  key={style.name}
                  onClick={() => setActiveStyle(style)}
                  className={`flex flex-col items-center cursor-pointer group transition-all duration-500 ${isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  <span className={`font-medium tracking-tight mb-3 transition-all duration-500 ${isActive ? 'text-3xl' : 'text-lg'}`}>
                    {style.name}
                  </span>
                  <div className="flex flex-col items-center h-12 justify-start">
                    {isActive ? (
                      <>
                        <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]" />
                        <div className="w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                        <div className="w-16 h-0.5 bg-white shadow-[0_0_15px_white]" />
                      </>
                    ) : (
                      <div className="w-1 h-1 bg-zinc-800 rounded-full group-hover:bg-zinc-600 transition-colors mt-1" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-4 text-zinc-600 text-sm ml-12 pb-4 flex-shrink-0">
            <SignedIn>
              <Link href="/dashboard" className="flex items-center gap-2 hover:text-zinc-400 transition-colors">
                <span>Select a style</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in" className="flex items-center gap-2 hover:text-zinc-400 transition-colors">
                <span>Select a style</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </SignedOut>
          </div>
        </div>

        {/* ── Content Card ── */}
        <div className="relative h-[400px] md:h-[600px] w-full rounded-2xl md:rounded-3xl overflow-hidden border border-white/5 bg-zinc-900 shadow-2xl group">

          {/* Background Image */}
          <div key={activeStyle.name} className="absolute inset-0 animate-in fade-in duration-1000">
            <img
              src={activeStyle.image}
              alt={activeStyle.name}
              className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-[3000ms] ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 md:via-zinc-950/60 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
          </div>

          {/* Text Content */}
          <div className="absolute inset-0 flex items-center px-6 md:px-20">
            <div key={activeStyle.name + '-text'} className="max-w-sm md:max-w-xl animate-in slide-in-from-left-8 duration-700 fade-in">

              <h3 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-normal text-white mb-4 md:mb-8 tracking-tighter">
                {activeStyle.name}<span className="text-zinc-700">.</span>
              </h3>

              <div className="flex gap-4 md:gap-6 border-l border-white/20 pl-4 md:pl-6 mb-6 md:mb-12">
                <p className="text-sm md:text-lg text-zinc-300 leading-relaxed font-light">
                  {activeStyle.description}
                </p>
              </div>

              <SignedIn>
                <Link href="/dashboard" className="inline-flex bg-white text-zinc-950 px-5 py-2.5 md:px-8 md:py-4 rounded-full font-medium text-sm hover:bg-zinc-200 transition-colors items-center gap-2">
                  <span className="sm:hidden">Try {activeStyle.name}</span>
                  <span className="hidden sm:inline">Generate {activeStyle.name}</span>
                </Link>
              </SignedIn>
              <SignedOut>
                <Link href="/sign-in" className="inline-flex bg-white text-zinc-950 px-5 py-2.5 md:px-8 md:py-4 rounded-full font-medium text-sm hover:bg-zinc-200 transition-colors items-center gap-2">
                  <span className="sm:hidden">Try {activeStyle.name}</span>
                  <span className="hidden sm:inline">Generate {activeStyle.name}</span>
                </Link>
              </SignedOut>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
