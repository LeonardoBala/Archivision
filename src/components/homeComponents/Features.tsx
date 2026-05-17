'use client';

import React from 'react';
import { Image as ImageIcon, Sparkles, Palette, Sliders, ShoppingBag, FolderOpen, Lightbulb, RefreshCw } from 'lucide-react';

const featuresList = [
  { icon: ImageIcon, title: "Photo & Blueprint Upload", desc: "Start from a room photo or a 2D blueprint. The AI understands both and transforms them into stunning designs." },
  { icon: Sparkles, title: "AI Interior Rendering", desc: "Generate photorealistic redesigns of any room in seconds, powered by cutting-edge generative AI." },
  { icon: Palette, title: "Curated Design Styles", desc: "From Minimalist to Bohemian, explore a library of curated styles and find the perfect aesthetic for your space." },
  { icon: Sliders, title: "Color & Mood Palettes", desc: "Fine-tune the atmosphere of each room by choosing a color palette that guides lighting, materials, and tone." },
  { icon: ShoppingBag, title: "Shoppable Furniture", desc: "Every item in your render is real. Browse the furniture catalogue with prices and direct links to vendors." },
  { icon: FolderOpen, title: "Multi-Room Projects", desc: "Organize your work into projects. Design every room in a space and keep everything neatly in one place." },
  { icon: Lightbulb, title: "Lighting Simulation", desc: "Simulate natural and artificial lighting at different times of day to set the perfect mood." },
  { icon: RefreshCw, title: "Multiple Design Variations", desc: "Generate several design alternatives for the same room and compare them side by side before committing." },
];

export default function Features() {
  return (
    <section className="py-16 md:py-24 bg-zinc-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white tracking-tight mb-4 md:mb-6">
            Redefining Realism in <br className="hidden sm:block" /> Architectural Design.
          </h2>
          <p className="text-base md:text-lg text-zinc-400">
            Streamline your vision with our powerful AI and 3D tools. From concept to catalogue in minutes.
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featuresList.map((feature, idx) => (
            <div 
              key={idx}
              className="p-5 md:p-6 rounded-2xl border border-white/5 bg-zinc-900/40 hover:bg-zinc-900 hover:border-white/10 transition-all duration-300 group"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-zinc-800 border border-white/5 flex items-center justify-center mb-4 md:mb-6 text-white group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-5 h-5 md:w-6 md:h-6 stroke-1" />
              </div>

              <h3 className="text-base md:text-lg font-medium text-white mb-2 md:mb-3">
                {feature.title}
              </h3>
              
              <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}