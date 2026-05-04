'use client';

import React, { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import Link from 'next/link'; // Am importat Link

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <section id="pricing" className="py-16 md:py-24 px-4 sm:px-6 border-t border-white/5 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Toggle */}
        <div className="text-center mb-12 md:mb-16 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white tracking-tight mb-4">
            Simple, transparent pricing.
          </h2>
          <p className="text-base md:text-lg text-zinc-400 mb-8 max-w-xl mx-auto">
            Start designing for free. Upgrade for professional power.
          </p>

          <div className="flex items-center p-1 bg-zinc-900 border border-white/10 rounded-full relative">
            <button 
              onClick={() => setBillingCycle('monthly')} 
              className={`px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${billingCycle === 'monthly' ? 'bg-white text-zinc-950 shadow-lg' : 'text-zinc-400 hover:text-white'}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setBillingCycle('yearly')} 
              className={`px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 flex items-center gap-2 ${billingCycle === 'yearly' ? 'bg-white text-zinc-950 shadow-lg' : 'text-zinc-400 hover:text-white'}`}
            >
              Yearly 
              <span className="text-[9px] md:text-[10px] font-bold bg-zinc-200 text-zinc-900 px-1.5 py-0.5 rounded-full border border-zinc-300">-20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-sm md:max-w-none mx-auto">
          
          {/* Starter */}
          <div className="p-6 md:p-8 rounded-3xl border border-white/5 bg-zinc-900/30 flex flex-col hover:border-white/10 transition-all">
            <div className="mb-6">
              <h3 className="text-base md:text-lg font-medium text-zinc-300 mb-2">Starter</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl md:text-4xl font-medium text-white">$0</span>
                <span className="text-zinc-500">/mo</span>
              </div>
              <p className="text-xs md:text-sm text-zinc-500 mt-2 md:mt-4 h-10">Perfect for hobbyists exploring AI design.</p>
            </div>
            
            <div className="w-full h-px bg-white/5 mb-6"></div>

            <ul className="space-y-3 md:space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-sm text-zinc-300"><Check className="w-4 h-4 text-zinc-500 mt-0.5 shrink-0" /> <span>3 Renders per day</span></li>
              <li className="flex items-start gap-3 text-sm text-zinc-300"><Check className="w-4 h-4 text-zinc-500 mt-0.5 shrink-0" /> <span>Standard Resolution (720p)</span></li>
              <li className="flex items-start gap-3 text-sm text-zinc-300"><Check className="w-4 h-4 text-zinc-500 mt-0.5 shrink-0" /> <span>Public Gallery Only</span></li>
              <li className="flex items-start gap-3 text-sm text-zinc-300"><Check className="w-4 h-4 text-zinc-500 mt-0.5 shrink-0" /> <span>Basic Styles (Modern, Ind.)</span></li>
            </ul>
            
            {/* Buton modificat cu Link spre /pricing */}
            <Link href="/pricing" className="w-full py-3 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-colors text-sm text-center block">
              Get Started
            </Link>
          </div>

          {/* Professional */}
          <div className="relative p-6 md:p-8 rounded-3xl border border-white/40 bg-zinc-900 flex flex-col shadow-[0_0_60px_rgba(255,255,255,0.08)] transform md:-translate-y-4 mt-4 md:mt-0">
            <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 bg-white text-zinc-950 text-[10px] md:text-xs font-bold px-3 py-1 md:px-4 md:py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-lg shadow-white/20 whitespace-nowrap">
              <Sparkles className="w-3 h-3 fill-zinc-950" /> Most Popular
            </div>
            <div className="mb-6">
              <h3 className="text-base md:text-lg font-medium text-white mb-2">Professional</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl md:text-5xl font-medium text-white">{billingCycle === 'monthly' ? '$29' : '$24'}</span>
                <span className="text-zinc-500">/mo</span>
              </div>
              <p className="text-xs md:text-sm text-zinc-400 mt-2 md:mt-4 h-10">For freelance designers & decorators.</p>
            </div>
            
            <div className="w-full h-px bg-white/10 mb-6"></div>

            <ul className="space-y-3 md:space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-sm text-white font-medium"><Check className="w-4 h-4 text-white mt-0.5 shrink-0" /> <span>Unlimited Renders</span></li>
              <li className="flex items-start gap-3 text-sm text-zinc-300"><Check className="w-4 h-4 text-white mt-0.5 shrink-0" /> <span>4K Ultra-HD Exports</span></li>
              <li className="flex items-start gap-3 text-sm text-zinc-300"><Check className="w-4 h-4 text-white mt-0.5 shrink-0" /> <span>Floor Plan to 3D Conversion</span></li>
              <li className="flex items-start gap-3 text-sm text-zinc-300"><Check className="w-4 h-4 text-white mt-0.5 shrink-0" /> <span>Private Projects</span></li>
              <li className="flex items-start gap-3 text-sm text-zinc-300"><Check className="w-4 h-4 text-white mt-0.5 shrink-0" /> <span>Commercial License</span></li>
            </ul>
            
            {/* Buton modificat cu Link spre /pricing */}
            <Link href="/pricing" className="w-full py-3 rounded-xl bg-white text-zinc-950 font-bold hover:bg-zinc-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)] text-sm text-center block">
              Start Free Trial
            </Link>
            <p className="text-[10px] md:text-xs text-center text-zinc-500 mt-3">No credit card required</p>
          </div>

          {/* Agency */}
          <div className="p-6 md:p-8 rounded-3xl border border-white/5 bg-zinc-900/30 flex flex-col hover:border-white/10 transition-all mt-4 md:mt-0">
            <div className="mb-6">
              <h3 className="text-base md:text-lg font-medium text-zinc-300 mb-2">Agency</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl md:text-4xl font-medium text-white">{billingCycle === 'monthly' ? '$99' : '$79'}</span>
                <span className="text-zinc-500">/mo</span>
              </div>
              <p className="text-xs md:text-sm text-zinc-500 mt-2 md:mt-4 h-10">For architecture firms & teams.</p>
            </div>
            
            <div className="w-full h-px bg-white/5 mb-6"></div>

            <ul className="space-y-3 md:space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-sm text-zinc-300"><Check className="w-4 h-4 text-white mt-0.5 shrink-0" /> <span>Everything in Pro</span></li>
              <li className="flex items-start gap-3 text-sm text-zinc-300"><Check className="w-4 h-4 text-white mt-0.5 shrink-0" /> <span>Team Workspace (5 seats)</span></li>
              <li className="flex items-start gap-3 text-sm text-zinc-300"><Check className="w-4 h-4 text-white mt-0.5 shrink-0" /> <span>API Access for integration</span></li>
              <li className="flex items-start gap-3 text-sm text-zinc-300"><Check className="w-4 h-4 text-white mt-0.5 shrink-0" /> <span>Custom Brand Styles</span></li>
              <li className="flex items-start gap-3 text-sm text-zinc-300"><Check className="w-4 h-4 text-white mt-0.5 shrink-0" /> <span>Priority 24/7 Support</span></li>
            </ul>
            
            {/* Buton modificat cu Link spre /pricing */}
            <Link href="/pricing" className="w-full py-3 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-colors text-sm text-center block">
              Contact Sales
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}