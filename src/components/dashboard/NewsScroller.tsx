'use client';

import { useRef } from 'react';
import { ExternalLink } from 'lucide-react';

interface NewsItem {
  id: number;
  title: string;
  source: string;
  date: string;
  category: string;
  image: string;
}

const NEWS: NewsItem[] = [
  // ... (keep your existing NEWS array items exactly the same)
  {
    id: 1,
    title: 'Living Walls & Biophilic Design Are Reshaping Modern Interiors',
    source: 'Architectural Digest',
    date: 'Apr 14',
    category: 'Trends',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&q=80&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'The Return of Warm Tones: Terracotta & Clay Dominate This Season',
    source: 'Elle Décor',
    date: 'Apr 12',
    category: 'Color',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&q=80&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Japandi Gets a Colorful Update for 2026',
    source: 'Dezeen',
    date: 'Apr 10',
    category: 'Style',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'AI-Powered Interior Design: How Technology Is Changing the Industry',
    source: 'Wired',
    date: 'Apr 8',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500&q=80&auto=format&fit=crop',
  },
];

const ITEMS = [...NEWS, ...NEWS];

const CATEGORY_COLORS: Record<string, string> = {
  Trends:        'bg-violet-500/20 text-violet-300',
  Color:         'bg-orange-500/20 text-orange-300',
  Style:         'bg-sky-500/20 text-sky-300',
  Technology:    'bg-cyan-500/20 text-cyan-300',
  Furniture:     'bg-amber-500/20 text-amber-300',
  Sustainability:'bg-green-500/20 text-green-300',
};

export default function NewsScroller() {
  const trackRef = useRef<HTMLDivElement>(null);

  const pause  = () => { if (trackRef.current) trackRef.current.style.animationPlayState = 'paused'; };
  const resume = () => { if (trackRef.current) trackRef.current.style.animationPlayState = 'running'; };

  return (
    <section>
      <div className="mb-5 md:mb-6">
        <h2 className="text-xl font-bold text-white">Latest in Design</h2>
        <p className="text-zinc-500 text-sm mt-1">What's happening in the world of interior design.</p>
      </div>

      <div
        className="overflow-hidden relative -mx-4 px-4 md:mx-0 md:px-0"
        onMouseEnter={pause}
        onMouseLeave={resume}
        onTouchStart={pause} // Prevents moving under user's thumb
        onTouchEnd={resume}
      >
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-zinc-950 to-transparent z-10" />

        <div
          ref={trackRef}
          className="flex gap-3 md:gap-4"
          style={{
            width: 'max-content',
            animation: 'scroll-news 50s linear infinite',
          }}
        >
          {ITEMS.map((item, i) => (
            <div
              key={`${item.id}-${i}`}
              className="w-64 md:w-72 shrink-0 rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 hover:border-white/15 transition-all duration-300 group cursor-pointer"
            >
              <div className="aspect-[16/9] w-full overflow-hidden bg-zinc-800">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-2.5">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${CATEGORY_COLORS[item.category] ?? 'bg-white/10 text-zinc-300'}`}>
                    {item.category}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                </div>

                <p className="text-white text-sm font-medium leading-snug line-clamp-2 mb-3 group-hover:text-zinc-200 transition-colors">
                  {item.title}
                </p>

                <div className="flex items-center gap-1.5">
                  <span className="text-zinc-500 text-xs font-medium">{item.source}</span>
                  <span className="text-zinc-700 text-xs">·</span>
                  <span className="text-zinc-600 text-xs">{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}