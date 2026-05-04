'use client';

import React from 'react';
import { Image as ImageIcon, Video, Box, ShoppingBag, Layers, Lightbulb, MessageSquare, LayoutTemplate } from 'lucide-react';

const featuresList = [
  { icon: ImageIcon, title: "Realistic Imagery with Imagen", desc: "Generate ultra-realistic room visualizations powered by Google's Imagen model. Precise textures and lighting." },
  { icon: Video, title: "High-Res Video with Veo", desc: "Create stunning, high-resolution cinematic video tours of your designs using the power of Veo." },
  { icon: Box, title: "Realistic 3D Vision", desc: "Explore your designed room in immersive 3D. Walk through the space before you build it." },
  { icon: ShoppingBag, title: "Real Furniture Catalogue", desc: "Every item is real. Access a catalogue of purchasable furniture with direct links to vendors." },
  { icon: Layers, title: "Smart Material Selection", desc: "AI suggests materials based on durability, cost, and style compatibility automatically." },
  { icon: Lightbulb, title: "Lighting Simulation", desc: "Simulate natural and artificial lighting at different times of day to set the perfect mood." },
  { icon: MessageSquare, title: "Client Collaboration", desc: "Streamline client interactions with built-in commenting and approval workflows directly on the design." },
  { icon: LayoutTemplate, title: "Project Templates", desc: "Kickstart projects quickly with customizable templates for Residential, Commercial, or Studio spaces." }
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