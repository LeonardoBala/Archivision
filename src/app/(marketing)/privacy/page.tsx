'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/homeComponents/Navbar';
import Footer from '@/components/homeComponents/Footer2';
import { Shield, Database, Cpu, Share2, Lock, UserCheck, Mail } from 'lucide-react';

const SECTION_IDS = [
  'introduction',
  'information-we-collect',
  'personal-data',
  'ai-inputs',
  'how-we-use',
  'sharing',
  'data-security',
  'your-rights',
  'contact',
];

const TOC_LABELS: Record<string, string> = {
  'introduction': '1. Introduction',
  'information-we-collect': '2. Collection',
  'how-we-use': '3. Use of Data',
  'sharing': '4. Sharing',
  'data-security': '5. Security',
  'your-rights': '6. Rights',
  'contact': '7. Contact',
};

const leftMenu = [
  {
    title: 'General',
    items: [
      { id: 'introduction', icon: <Shield className="w-4 h-4" strokeWidth={1.5} />, label: '1. Introduction' },
      { id: 'information-we-collect', icon: <Database className="w-4 h-4" strokeWidth={1.5} />, label: '2. Data Collection' },
    ],
  },
  {
    title: 'Processing',
    items: [
      { id: 'how-we-use', icon: <Cpu className="w-4 h-4" strokeWidth={1.5} />, label: '3. How We Use Data' },
      { id: 'sharing', icon: <Share2 className="w-4 h-4" strokeWidth={1.5} />, label: '4. Sharing Data' },
    ],
  },
  {
    title: 'Security & Rights',
    items: [
      { id: 'data-security', icon: <Lock className="w-4 h-4" strokeWidth={1.5} />, label: '5. Security' },
      { id: 'your-rights', icon: <UserCheck className="w-4 h-4" strokeWidth={1.5} />, label: '6. Your Rights' },
      { id: 'contact', icon: <Mail className="w-4 h-4" strokeWidth={1.5} />, label: '7. Contact Us' },
    ],
  },
];

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState('introduction');

  useEffect(() => {
    const handleScroll = () => {
      let current = 'introduction';
      for (const id of SECTION_IDS) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const isSubSection = (id: string) => id === 'personal-data' || id === 'ai-inputs';
  const collectionActive = isSubSection(activeSection);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-400 font-sans selection:bg-white/20">
      <Navbar />

      <div className="fixed -bottom-64 -right-64 w-[1000px] h-[1000px] bg-white/[0.02] rounded-full blur-[200px] pointer-events-none -z-10 hidden md:block" />

      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 md:pt-40 pb-32">
      <div className="flex flex-row items-start gap-12 relative">

        {/* Left Sidebar */}
        <aside className="hidden md:block w-48 lg:w-56 shrink-0 sticky top-32 h-fit">
          <div className="max-h-[calc(100vh-12rem)] overflow-y-auto pr-4 no-scrollbar">
            {leftMenu.map((group, idx) => (
              <div key={idx} className="mb-10">
                <h4 className="text-white font-medium text-[10px] uppercase tracking-[0.2em] mb-4 opacity-40">
                  {group.title}
                </h4>
                <ul className="space-y-1">
                  {group.items.map((item) => {
                    const isActive =
                      activeSection === item.id ||
                      (item.id === 'information-we-collect' && collectionActive);
                    return (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          onClick={(e) => scrollToSection(e, item.id)}
                          className={`flex items-center gap-2.5 py-2 px-3 -mx-3 rounded-lg text-[13px] transition-all duration-200 ${
                            isActive
                              ? 'text-white bg-white/[0.06] font-medium shadow-sm'
                              : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02]'
                          }`}
                        >
                          {item.icon} <span> {item.label}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        {/* Center Content */}
        <main className="flex-1 min-w-0 max-w-2xl shrink-0">
          <div className="mb-14">
            <h1 className="text-4xl lg:text-5xl font-medium tracking-tight text-white mb-6 leading-tight">
              Privacy Policy
            </h1>
            <div className="flex items-center gap-3 text-zinc-500 text-[13px] font-light mb-8">
              <span>Latest update: March 10, 2026</span>
              <span className="w-1 h-1 rounded-full bg-zinc-800" />
              <span>v2.1.0</span>
            </div>
          </div>

          <article className="space-y-0">
            <p className="text-[16px] leading-relaxed text-zinc-400 mb-12 font-light">
              At ArchiVision AI, we believe that privacy is a fundamental right, especially in the
              creative and architectural fields. Your designs, sketches, and project specifications
              represent years of expertise. Our mission is to provide you with powerful AI rendering
              tools while ensuring your intellectual property remains exclusively yours.
            </p>

            <section id="introduction" className="scroll-mt-32">
              <h2 className="text-xl lg:text-2xl font-medium text-white mt-12 mb-4 tracking-tight">
                1. Introduction
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-8 text-[15px] font-light">
                This policy governs all data interactions on archivision.ai. By using our platform,
                you agree to the collection and use of information in accordance with this policy.
                We are committed to transparency regarding how our generative AI engines interact
                with your data.
              </p>
            </section>

            <section id="information-we-collect" className="scroll-mt-32 border-t border-white/5 pt-10">
              <h2 className="text-xl lg:text-2xl font-medium text-white mb-6 tracking-tight">
                2. Information We Collect
              </h2>

              <div id="personal-data" className="scroll-mt-32 mb-10">
                <h3 className="text-lg font-medium text-zinc-200 mb-3">2.1. Personal Identification Data</h3>
                <p className="text-zinc-400 leading-relaxed text-[15px] font-light">
                  When you register, we collect information such as your name, professional email
                  address, and firm name. This allows us to personalize your workspace and provide
                  high-priority support for Pro users.
                </p>
              </div>

              <div id="ai-inputs" className="scroll-mt-32">
                <h3 className="text-lg font-medium text-zinc-200 mb-3">2.2. Architectural Inputs &amp; Assets</h3>
                <p className="text-zinc-400 leading-relaxed text-[15px] font-light">
                  Our service processes text prompts, sketches, and 3D models to generate
                  visualizations.{' '}
                  <strong className="text-white font-medium underline underline-offset-4 decoration-white/20">
                    We do not use your private architectural uploads to train our public AI models.
                  </strong>{' '}
                  Your data is used only for the generation of your specific request.
                </p>
              </div>
            </section>

            <section id="how-we-use" className="scroll-mt-32 border-t border-white/5 pt-10">
              <h2 className="text-xl lg:text-2xl font-medium text-white mb-4 tracking-tight">
                3. How We Use Your Data
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-8 text-[15px] font-light">
                ArchiVision utilizes the collected information for specific, legitimate business purposes:
              </p>
              <ul className="list-none p-0 m-0 space-y-5 text-[15px] text-zinc-400 mb-10">
                <li className="flex gap-4 items-start">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
                  <span>
                    <strong className="text-white font-medium">Real-time Rendering:</strong> We
                    transmit data to our secure GPU cloud to process your architectural
                    visualizations through Vertex AI.
                  </span>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
                  <span>
                    <strong className="text-white font-medium">Quality Assurance:</strong> Technical
                    metadata is analyzed to improve the accuracy of lighting, texture, and geometry
                    in AI outputs.
                  </span>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
                  <span>
                    <strong className="text-white font-medium">Infrastructure Maintenance:</strong>{' '}
                    Monitoring server loads and preventing API abuse to ensure 99.9% uptime for Pro
                    subscribers.
                  </span>
                </li>
              </ul>
            </section>

            <section id="sharing" className="scroll-mt-32 border-t border-white/5 pt-10">
              <h2 className="text-xl lg:text-2xl font-medium text-white mb-4 tracking-tight">
                4. Data Sharing &amp; Third Parties
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-8 text-[15px] font-light">
                We do not sell your data. We only disclose data to third-party service providers
                (Google Cloud, Stripe) who are essential to our operations. These providers are
                strictly prohibited from using your data for their own marketing or training
                purposes and must comply with our strict data protection standards.
              </p>
            </section>

            <section id="data-security" className="scroll-mt-32 border-t border-white/5 pt-10">
              <h2 className="text-xl lg:text-2xl font-medium text-white mb-4 tracking-tight">
                5. Enterprise-Grade Security
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-8 text-[15px] font-light">
                All data is protected with{' '}
                <span className="text-white">AES-256 encryption</span> at rest and{' '}
                <span className="text-white">TLS 1.3</span> for data in transit. We conduct
                bi-annual security audits to ensure that your architectural IP is protected against
                unauthorized access.
              </p>
            </section>

            <section id="your-rights" className="scroll-mt-32 border-t border-white/5 pt-10">
              <h2 className="text-xl lg:text-2xl font-medium text-white mb-4 tracking-tight">
                6. Your Rights
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-8 text-[15px] font-light">
                You have the right to request a copy of your data, correct inaccuracies, or request
                the total deletion of your account. All requests can be managed directly through
                the &quot;Settings&quot; panel in your ArchiVision account or by contacting our legal team.
              </p>
            </section>

            <section id="contact" className="scroll-mt-32 border-t border-white/5 pt-10">
              <h2 className="text-xl lg:text-2xl font-medium text-white mb-4 tracking-tight">
                7. Contact Us
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-8 text-[15px] font-light">
                For any inquiries regarding this policy or our data practices, please reach out to
                our legal department:
              </p>
              <div className="bg-white/[0.03] border border-white/10 p-8 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <p className="text-white font-medium text-lg mb-1">Legal Department</p>
                  <p className="text-zinc-500 text-sm">ArchiVision AI Global Support</p>
                </div>
                <a
                  href="mailto:privacy@archivision.ai"
                  className="px-6 py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-zinc-200 transition-colors inline-block text-center"
                >
                  privacy@archivision.ai
                </a>
              </div>
            </section>
          </article>
        </main>

        {/* Right TOC Sidebar */}
        <aside className="hidden md:block w-44 lg:w-48 shrink-0 sticky top-32 h-fit">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600 mb-6">
            On this page
          </h4>
          <div className="border-l border-white/5 pl-5">
            <ul className="space-y-4">
              {Object.entries(TOC_LABELS).map(([id, label]) => {
                const isActive =
                  activeSection === id ||
                  (id === 'information-we-collect' && collectionActive);
                return (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      onClick={(e) => scrollToSection(e, id)}
                      className={`transition-all duration-300 text-[13px] block ${
                        isActive
                          ? 'text-white font-medium translate-x-1.5'
                          : 'text-zinc-500 hover:text-zinc-300 font-light hover:translate-x-1'
                      }`}
                    >
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </div>
      </main>

      <Footer />
    </div>
  );
}
