'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, MapPin, Clock } from 'lucide-react';
import Navbar from '@/components/homeComponents/Navbar';
import Footer from '@/components/homeComponents/Footer2';

// --- COMPONENTA DE REVEAL (Animația la scroll) ---
function Reveal({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function CareersPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  // O bază de date cu joburi diversificate pentru a ilustra filtrarea
  const openings = [
    { 
        title: 'Product Designer', 
        desc: "Shape the future of our AI-driven design tools. We're looking for a mid-level product designer.",
        location: '100% remote',
        type: 'Full-time',
        category: 'Design',
        badges: ['Figma', 'UI/UX', 'Prototyping']
    },
    { 
        title: 'Senior Brand Identity Designer', 
        desc: "Define the visual language of ArchiVision globally across digital and physical touchpoints.",
        location: 'New York / Hybrid',
        type: 'Full-time',
        category: 'Design',
        badges: ['Branding', 'Typography', 'Creative Direction']
    },
    { 
        title: 'Engineering Manager', 
        desc: "Lead our core architectural rendering engine team. Deep understanding of ML pipelines required.",
        location: '100% remote',
        type: 'Full-time',
        category: 'Development',
        badges: ['Leadership', 'Python', 'System Architecture']
    },
    { 
        title: 'AI/ML Backend Engineer', 
        desc: "Optimize and scale our integration with Google Vertex AI and Imagen 3 for rapid photorealistic generation.",
        location: 'London / Remote',
        type: 'Full-time',
        category: 'Development',
        badges: ['TensorFlow', 'Node.js', 'GCP']
    },
    { 
        title: 'Front-End React Developer', 
        desc: "Build buttery smooth, interactive user interfaces that architects and designers will love.",
        location: '100% remote',
        type: 'Full-time',
        category: 'Development',
        badges: ['React', 'Next.js', 'Tailwind']
    },
    { 
        title: 'Growth Marketing Specialist', 
        desc: "Drive user acquisition strategies targeting architectural firms and freelance interior designers.",
        location: '100% remote',
        type: 'Full-time',
        category: 'Marketing',
        badges: ['B2B SaaS', 'Analytics', 'Campaigns']
    },
    { 
        title: 'Customer Success Manager', 
        desc: "Ensure our enterprise clients get maximum value from the ArchiVision platform.",
        location: 'Berlin / Hybrid',
        type: 'Full-time',
        category: 'Customer Service',
        badges: ['Account Management', 'SaaS', 'Onboarding']
    },
    { 
        title: 'VP of Finance', 
        desc: "Oversee financial operations, budgeting, and long-term financial strategy as we scale globally.",
        location: '100% remote',
        type: 'Full-time',
        category: 'Finance',
        badges: ['Strategy', 'Modeling', 'Executive']
    }
  ];

  const categories = ['All', 'Development', 'Design', 'Marketing', 'Customer Service', 'Finance'];

  // Logica de filtrare a joburilor
  const filteredOpenings = activeCategory === 'All' 
    ? openings 
    : openings.filter(job => job.category === activeCategory);

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-white/20 overflow-hidden relative">
      
      <Navbar />

      <main className="pt-32 md:pt-40 pb-0 relative z-10">
        
        {/* --- HERO SECTION --- */}
        <section className="px-6 lg:px-8 max-w-4xl mx-auto mb-20 text-center flex flex-col items-center">

            <Reveal delay={100}>
              <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-medium tracking-tight mb-8 text-white leading-tight">
                Be part of our mission
              </h1>
            </Reveal>

            <Reveal delay={200}>
                <p className="text-lg md:text-xl text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
                   We're looking for passionate people to join us on our mission to democratize architectural design. We value flat hierarchies, clear communication, and full ownership.
                </p>
            </Reveal>

            {/* FILTER PILLS */}
            <Reveal delay={300}>
                <div className="mt-12 flex flex-wrap justify-center gap-3">
                    {categories.map((cat) => (
                        <button 
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${
                                activeCategory === cat 
                                ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-105' 
                                : 'bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-500 hover:text-white'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </Reveal>
        </section>

        {/* --- CURRENT OPENINGS SECTION --- */}
        <section className="py-10 relative z-10 min-h-[500px]">
          
          {/* THE GLOWING WHITE LIGHT IN BOTTOM RIGHT */}
          <div className="absolute -bottom-64 -right-64 w-[1000px] h-[1000px] bg-white/5 rounded-full blur-[200px] pointer-events-none -z-10 hidden md:block"></div>

          <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
            {/* JOB LIST CONTAINER */}
            <div className="border border-white/10 rounded-3xl overflow-hidden bg-zinc-950/80 backdrop-blur-xl shadow-2xl relative z-10">
              {filteredOpenings.length > 0 ? (
                filteredOpenings.map((job, idx) => (
                  <Reveal key={job.title} delay={idx * 50}>
                    <div className="group flex flex-col md:flex-row md:items-center justify-between py-8 px-6 md:px-10 border-b border-white/5 last:border-b-0 relative overflow-hidden transition-colors hover:bg-white/[0.03]">
                      
                      {/* Left: Title, Desc, Badges */}
                      <div className="flex flex-col gap-3 max-w-2xl flex-1 relative z-10">
                          <h3 className="text-xl md:text-2xl font-medium text-white transition-transform duration-500 group-hover:translate-x-2">
                              {job.title}
                          </h3>
                          <p className="text-zinc-400 font-light text-sm md:text-base pr-4 leading-relaxed">
                              {job.desc}
                          </p>
                          
                          <div className="flex flex-wrap items-center gap-2 mt-3 relative z-10">
                              <span className="flex items-center gap-1.5 border border-zinc-800 bg-zinc-900/50 rounded-md px-2.5 py-1 text-[11px] uppercase tracking-wider text-zinc-300">
                                  <MapPin className="w-3 h-3" /> {job.location}
                              </span>
                              <span className="flex items-center gap-1.5 border border-zinc-800 bg-zinc-900/50 rounded-md px-2.5 py-1 text-[11px] uppercase tracking-wider text-zinc-300">
                                  <Clock className="w-3 h-3" /> {job.type}
                              </span>
                              
                              {/* Tehnical Badges specifice jobului */}
                              {job.badges.map(badge => (
                                 <span key={badge} className="bg-white/5 rounded-md px-2.5 py-1 text-[11px] uppercase tracking-wider text-zinc-400">
                                     {badge}
                                 </span>
                              ))}
                          </div>
                      </div>
                      
                      {/* Right: Apply Button */}
                      <div className="mt-8 md:mt-0 flex-shrink-0 relative z-10">
                          <button className="bg-white text-black px-6 py-2.5 rounded-full font-medium flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:bg-zinc-200">
                            Apply <ArrowUpRight className="w-4 h-4" />
                          </button>
                      </div>

                    </div>
                  </Reveal>
                ))
              ) : (
                <div className="py-32 text-center text-zinc-500 font-light flex flex-col items-center justify-center relative z-10">
                    <span className="text-4xl mb-4 opacity-20">📭</span>
                    No open positions in this category right now.<br/>Check back later or view all openings.
                </div>
              )}
            </div>

          </div>
        </section>

        {/* --- WORK LIFE BALANCE SECTION --- */}
        <section className="py-32 relative z-10 mt-10">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center relative z-10">
            
            <Reveal>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-light tracking-wide mb-12 text-zinc-400 leading-relaxed max-w-5xl mx-auto relative z-10">
                &quot;ArchiVision is the exact point where the <br className="hidden md:block" />
                <span className="text-white font-medium">cold logic of code</span> seamlessly blends <br className="hidden md:block" />
                with the <span className="text-white font-medium">warmth of spatial design.</span>&quot;
              </h2>
            </Reveal>

            <Reveal delay={200}>
                <div className="flex items-center justify-center gap-4 text-left relative z-10">
                    <div className="w-14 h-14 rounded-full overflow-hidden border border-zinc-700/50 grayscale hover:grayscale-0 transition-all duration-500 relative z-10">
                        <Image 
                            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" 
                            alt="Dornald Smith" 
                            width={56} 
                            height={56} 
                            className="object-cover w-full h-full" 
                        />
                    </div>
                    <div>
                        <p className="font-medium text-white text-base">Dornald Smith</p>
                        <p className="text-zinc-500 text-sm">Lead Software Architect</p>
                    </div>
                </div>
            </Reveal>

          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}