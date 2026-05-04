import Link from 'next/link';
import { styleOptions } from '@/lib/styleOptions';
import { ArrowUpRight } from 'lucide-react';

// Accent color per style — each maps to a Tailwind border + glow color
const STYLE_ACCENTS: Record<string, { border: string; glow: string; number: string }> = {
  modern_minimalist: { border: 'border-zinc-400',   glow: 'group-hover:shadow-zinc-400/10',    number: '01' },
  japandi:           { border: 'border-stone-400',   glow: 'group-hover:shadow-stone-400/10',   number: '02' },
  industrial:        { border: 'border-zinc-500',    glow: 'group-hover:shadow-zinc-500/10',    number: '03' },
  mid_century:       { border: 'border-amber-500',   glow: 'group-hover:shadow-amber-500/10',   number: '04' },
  scandinavian:      { border: 'border-slate-400',   glow: 'group-hover:shadow-slate-400/10',   number: '05' },
  luxury_glam:       { border: 'border-violet-400',  glow: 'group-hover:shadow-violet-400/10',  number: '06' },
  bohemian:          { border: 'border-orange-400',  glow: 'group-hover:shadow-orange-400/10',  number: '07' },
  coastal:           { border: 'border-sky-400',     glow: 'group-hover:shadow-sky-400/10',     number: '08' },
  cyberpunk:         { border: 'border-cyan-400',    glow: 'group-hover:shadow-cyan-400/10',    number: '09' },
  art_deco:          { border: 'border-emerald-400', glow: 'group-hover:shadow-emerald-400/10', number: '10' },
  biophilic:         { border: 'border-green-400',   glow: 'group-hover:shadow-green-400/10',   number: '11' },
  transitional:      { border: 'border-stone-300',   glow: 'group-hover:shadow-stone-300/10',   number: '12' },
};

export default function StyleQuickStart() {
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Start by Style</h2>
        <p className="text-zinc-500 text-sm mt-1">
          Pick a design direction and jump straight into creating.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {styleOptions.map((style) => {
          const accent = STYLE_ACCENTS[style.id] ?? {
            border: 'border-zinc-600',
            glow: 'group-hover:shadow-zinc-600/10',
            number: '—',
          };

          return (
            <Link
              key={style.id}
              href="/create"
              className={`group relative flex items-center justify-between gap-4 px-5 py-4 rounded-2xl bg-zinc-900 border border-white/5 hover:bg-zinc-800/60 hover:border-white/10 hover:shadow-lg ${accent.glow} transition-all duration-300`}
            >
              {/* Left accent bar */}
              <div className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-full ${accent.border} opacity-60 group-hover:opacity-100 transition-opacity`} />

              <div className="flex items-center gap-4 min-w-0 pl-3">
                <span className="text-[11px] font-mono text-zinc-600 group-hover:text-zinc-500 transition-colors shrink-0 select-none">
                  {accent.number}
                </span>
                <div className="min-w-0">
                  <p className="text-white font-semibold text-sm leading-tight truncate">
                    {style.label}
                  </p>
                  <p className="text-zinc-500 text-xs mt-0.5 truncate group-hover:text-zinc-400 transition-colors">
                    {style.description}
                  </p>
                </div>
              </div>

              <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-200 shrink-0" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
