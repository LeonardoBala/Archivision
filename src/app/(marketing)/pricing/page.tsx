'use client';

const comparisonData = [
  {
    category: "Core Features",
    rows: [
      { name: "Render Engine", starter: "Standard", pro: "Ultra-HD", agency: "Ultra-HD + Raytracing" },
      { name: "Monthly Renders", starter: "50", pro: "Unlimited", agency: "Unlimited" },
      { name: "Processing Speed", starter: "Standard", pro: "Fast", agency: "Turbo" },
    ]
  },
  {
    category: "Project Tools",
    rows: [
      { name: "Floor Plan Conversion", starter: false, pro: true, agency: true },
      { name: "3D Walkthrough", starter: false, pro: true, agency: true },
      { name: "Furniture Replacement", starter: true, pro: true, agency: true },
      { name: "Video Export", starter: false, pro: "4K", agency: "8K" },
    ]
  },
  {
    category: "Workflow & Team",
    rows: [
      { name: "Project History", starter: "7 Days", pro: "Unlimited", agency: "Unlimited" },
      { name: "Team Seats", starter: "1", pro: "1", agency: "5+" },
      { name: "API Access", starter: false, pro: false, agency: true },
      { name: "White-label Reports", starter: false, pro: true, agency: true },
    ]
  }
];

import { useState } from 'react';
import Navbar from '@/components/homeComponents/Navbar';
import Footer from '@/components/homeComponents/Footer2';
import PricingCards from '@/components/pricingComponents/PricingCards';
import ComparisonTable from '@/components/pricingComponents/ComparisonTable';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="min-h-screen bg-zinc-950 pt-32 pb-20 px-6">
        <Navbar />
        <div className="max-w-7xl mx-auto">
            {/* --- HEADER --- */}
            <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-medium text-white tracking-tight mb-6">
                Plans for every stage of design.
            </h1>
            <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
                Whether you're renovating a single room or managing multiple client projects, we have a plan that scales with you.
            </p>

            {/* TOGGLE */}
            <div className="inline-flex items-center p-1 bg-zinc-900 border border-white/10 rounded-full relative">
                <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    billingCycle === 'monthly' ? 'bg-white text-zinc-950 shadow-lg' : 'text-zinc-400 hover:text-white'
                }`}
                >
                Monthly
                </button>
                <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    billingCycle === 'yearly' ? 'bg-white text-zinc-950 shadow-lg' : 'text-zinc-400 hover:text-white'
                }`}
                >
                Yearly
                <span className="text-[10px] font-bold bg-zinc-200 text-zinc-900 px-1.5 py-0.5 rounded-full border border-zinc-300">
                    -20%
                </span>
                </button>
            </div>
            </div>

            {/* --- CARDS SECTION --- */}
            <PricingCards billingCycle={billingCycle} />

            {/* --- TABLE HEADER --- */}
            <div className="mb-12 text-center md:text-left">
            <h2 className="text-3xl font-medium text-white mb-4">Compare Features</h2>
            <p className="text-zinc-400">Deep dive into what is included in each tier.</p>
            </div>

            {/* --- TABLE SECTION --- */}
            <ComparisonTable />
            
            {/* --- FAQ MINI SECTION --- */}
            {/* Am adăugat mb-24 aici pentru a crea spațiul cerut înainte de Footer */}
            <div className="mt-32 mb-24 border-t border-white/5 pt-16 grid md:grid-cols-2 gap-12">
                <div>
                    <h3 className="text-2xl text-white font-medium mb-4">Frequently Asked Questions</h3>
                    <p className="text-zinc-400">Can't find the answer you're looking for? Contact our support team.</p>
                </div>
                <div className="space-y-6">
                    <div>
                        <h4 className="text-white font-medium mb-2">Can I switch plans later?</h4>
                        <p className="text-sm text-zinc-400">Yes, you can upgrade or downgrade at any time. Prorated charges will apply.</p>
                    </div>
                    <div>
                        <h4 className="text-white font-medium mb-2">What happens to my data if I cancel?</h4>
                        <p className="text-sm text-zinc-400">We keep your project data for 30 days after cancellation before permanent deletion.</p>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
  );
}