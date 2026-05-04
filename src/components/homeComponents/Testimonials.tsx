'use client';

import React from 'react';

const testimonials = [
  { quote: "Working with ArchiVision has completely reshaped how we view interior design. They took the time to understand our personal style.", name: "Samantha L", role: "Homeowner", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1760&auto=format&fit=crop" },
  { quote: "The transformation they delivered goes beyond visual. It reshaped how we utilize our living space and connects perfectly with our lifestyle.", name: "Michael R", role: "Architect", image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop" },
  { quote: "Exceptional attention to detail. The AI guided us with clarity and precision, delivering a renovation plan that exceeded expectations.", name: "Sarah K", role: "Interior Designer", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop" },
  { quote: "Our client satisfaction doubled within weeks of using this tool. The ROI on this design software has been incredible for our firm.", name: "David P", role: "Firm Director", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop" },
  { quote: "A true partnership. It didn't just generate images; it challenged our assumptions and built something better than we imagined.", name: "Elena M", role: "Real Estate Agent", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop" },
];

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-zinc-950 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-12 md:mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-medium text-white tracking-tight mb-4 md:mb-6">
          Loved by designers & homeowners.
        </h2>
        <p className="text-base md:text-lg text-zinc-400 max-w-2xl mx-auto">
          Don't just take our word for it. See how ArchiVision is transforming spaces for thousands of users worldwide.
        </p>
      </div>

      <div className="relative w-full">
        <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none"></div>

        <div className="flex flex-col gap-4 md:gap-6">
          <InfiniteScrollRow items={testimonials} speed={40} />
          <InfiniteScrollRow items={[...testimonials].reverse()} speed={50} />
        </div>
      </div>

      <style jsx global>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll linear infinite;
        }
      `}</style>
    </section>
  );
}

const InfiniteScrollRow = ({ items, speed }: { items: typeof testimonials, speed: number }) => {
  return (
    <div className="flex overflow-hidden w-full">
      <div 
        className="flex gap-4 md:gap-6 animate-scroll min-w-full"
        style={{ animationDuration: `${speed}s` }}
      >
        {[...items, ...items, ...items].map((item, idx) => (
          <div 
            key={idx}
            className="flex-shrink-0 w-[300px] sm:w-[350px] md:w-[400px] bg-zinc-900/40 border border-white/5 p-6 md:p-8 rounded-2xl hover:bg-zinc-900/60 transition-colors duration-300 group"
          >
            <p className="text-zinc-300 text-base md:text-lg leading-relaxed mb-6 md:mb-8 font-light line-clamp-4">
              "{item.quote}"
            </p>
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-800 border border-white/10">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <div>
                <h4 className="text-white font-medium text-sm">{item.name}</h4>
                <p className="text-zinc-500 text-xs">{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};