'use client';

import Link from 'next/link';
import { LayoutTemplate } from 'lucide-react';

const inspiration = [
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?w=600&q=80',
  'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=600&q=80',
  'https://images.unsplash.com/photo-1618221381711-42ca8ab6e908?w=600&q=80',
  'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&q=80',
  'https://images.unsplash.com/photo-1615873968403-89e068629265?w=600&q=80',
  'https://images.unsplash.com/photo-1617103996702-96ff29b1c467?w=600&q=80',
];

export default function InspirationGallery() {
  return (
    <section>
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
                <LayoutTemplate className="w-5 h-5 text-zinc-400" />
                <h2 className="text-xl font-bold text-white">Ideas & Inspirations</h2>
            </div>
            <Link href="/dashboard/projects" className="text-sm text-zinc-500 hover:text-white transition-colors">
                View All Projects
            </Link>
        </div>

        {/* Grid Ordonat: 3 coloane, imagini pătrate sau aspect video fix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inspiration.map((img, idx) => (
                <div key={idx} className="relative group rounded-2xl overflow-hidden border border-white/5 bg-zinc-900 aspect-[4/3]">
                    <img 
                        src={img} 
                        alt="Inspiration" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                        <p className="text-white font-medium text-sm translate-y-2 group-hover:translate-y-0 transition-transform">
                            Modern Design #{idx + 1}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    </section>
  );
}