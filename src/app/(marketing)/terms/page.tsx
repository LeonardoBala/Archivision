'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/homeComponents/Navbar';
import Footer from '@/components/homeComponents/Footer2';
import { FileText, CreditCard, AlertTriangle, Ban, Scale, RefreshCw, Mail } from 'lucide-react';
import Link from 'next/link';

const SECTION_IDS = [
  'acceptance',
  'service-description',
  'user-accounts',
  'acceptable-use',
  'intellectual-property',
  'payment',
  'termination',
  'liability',
  'changes',
  'contact',
];

const TOC_LABELS: Record<string, string> = {
  'acceptance': '1. Acceptance',
  'service-description': '2. The Service',
  'user-accounts': '3. Your Account',
  'acceptable-use': '4. Acceptable Use',
  'intellectual-property': '5. Ownership',
  'payment': '6. Payment',
  'termination': '7. Termination',
  'liability': '8. Liability',
  'changes': '9. Changes',
  'contact': '10. Contact',
};

const leftMenu = [
  {
    title: 'Agreement',
    items: [
      { id: 'acceptance', icon: <FileText className="w-4 h-4" strokeWidth={1.5} />, label: '1. Acceptance' },
      { id: 'service-description', icon: <FileText className="w-4 h-4" strokeWidth={1.5} />, label: '2. The Service' },
      { id: 'user-accounts', icon: <FileText className="w-4 h-4" strokeWidth={1.5} />, label: '3. Your Account' },
    ],
  },
  {
    title: 'Rules & Rights',
    items: [
      { id: 'acceptable-use', icon: <Ban className="w-4 h-4" strokeWidth={1.5} />, label: '4. Acceptable Use' },
      { id: 'intellectual-property', icon: <Scale className="w-4 h-4" strokeWidth={1.5} />, label: '5. Ownership' },
      { id: 'payment', icon: <CreditCard className="w-4 h-4" strokeWidth={1.5} />, label: '6. Payment' },
    ],
  },
  {
    title: 'Legal',
    items: [
      { id: 'termination', icon: <AlertTriangle className="w-4 h-4" strokeWidth={1.5} />, label: '7. Termination' },
      { id: 'liability', icon: <Scale className="w-4 h-4" strokeWidth={1.5} />, label: '8. Liability' },
      { id: 'changes', icon: <RefreshCw className="w-4 h-4" strokeWidth={1.5} />, label: '9. Changes' },
      { id: 'contact', icon: <Mail className="w-4 h-4" strokeWidth={1.5} />, label: '10. Contact Us' },
    ],
  },
];

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState('acceptance');

  useEffect(() => {
    const handleScroll = () => {
      let current = 'acceptance';
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
                    const isActive = activeSection === item.id;
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
                          {item.icon} <span>{item.label}</span>
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
              Terms of Service
            </h1>
            <div className="flex items-center gap-3 text-zinc-500 text-[13px] font-light mb-8">
              <span>Effective date: January 1, 2026</span>
              <span className="w-1 h-1 rounded-full bg-zinc-800" />
              <span>v1.0.0</span>
            </div>
          </div>

          <article className="space-y-0">
            <p className="text-[16px] leading-relaxed text-zinc-400 mb-12 font-light">
              Please read these Terms of Service carefully before using the ArchiVision AI platform.
              By accessing or using our service, you agree to be bound by these terms. If you do not
              agree, you may not use the platform.
            </p>

            <section id="acceptance" className="scroll-mt-32">
              <h2 className="text-xl lg:text-2xl font-medium text-white mt-12 mb-4 tracking-tight">
                1. Acceptance of Terms
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-6 text-[15px] font-light">
                By creating an account or using any part of the ArchiVision AI service (&quot;Service&quot;),
                you confirm that you are at least 18 years of age, have read and understood these
                terms, and agree to be legally bound by them. These terms apply to all visitors,
                users, and others who access the Service.
              </p>
            </section>

            <section id="service-description" className="scroll-mt-32 border-t border-white/5 pt-10">
              <h2 className="text-xl lg:text-2xl font-medium text-white mb-4 tracking-tight">
                2. Description of Service
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-6 text-[15px] font-light">
                ArchiVision AI provides an AI-powered interior design platform that allows users to
                generate photorealistic room renders, receive style recommendations, and explore
                design variations using Google&apos;s Vertex AI infrastructure. The Service is provided
                &quot;as is&quot; and subject to the availability of our AI providers.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-6 text-[15px] font-light">
                We reserve the right to modify, suspend, or discontinue any part of the Service at
                any time with or without notice. We shall not be liable to you or any third party
                for any modification, suspension, or discontinuation of the Service.
              </p>
            </section>

            <section id="user-accounts" className="scroll-mt-32 border-t border-white/5 pt-10">
              <h2 className="text-xl lg:text-2xl font-medium text-white mb-4 tracking-tight">
                3. Your Account
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-6 text-[15px] font-light">
                To access certain features you must register for an account. You are responsible for
                maintaining the confidentiality of your account credentials and for all activities
                that occur under your account. You agree to notify us immediately of any
                unauthorized use of your account.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-6 text-[15px] font-light">
                We reserve the right to terminate accounts that violate these terms, engage in
                fraudulent activity, or remain inactive for an extended period without notice.
              </p>
            </section>

            <section id="acceptable-use" className="scroll-mt-32 border-t border-white/5 pt-10">
              <h2 className="text-xl lg:text-2xl font-medium text-white mb-4 tracking-tight">
                4. Acceptable Use
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-6 text-[15px] font-light">
                You agree not to use the Service for any unlawful purpose or in a way that
                violates these terms. Prohibited activities include, but are not limited to:
              </p>
              <ul className="list-none p-0 m-0 space-y-4 text-[15px] text-zinc-400 mb-8">
                {[
                  'Generating content that is illegal, harmful, harassing, or defamatory',
                  'Attempting to reverse-engineer, decompile, or extract the underlying AI models',
                  'Using automated tools to scrape, crawl, or excessively query the platform',
                  'Uploading copyrighted images or content without proper authorization',
                  'Sharing your account credentials with unauthorized third parties',
                  'Using the Service to generate designs that infringe on third-party intellectual property',
                ].map((item) => (
                  <li key={item} className="flex gap-4 items-start">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section id="intellectual-property" className="scroll-mt-32 border-t border-white/5 pt-10">
              <h2 className="text-xl lg:text-2xl font-medium text-white mb-4 tracking-tight">
                5. Intellectual Property &amp; Ownership
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-6 text-[15px] font-light">
                <strong className="text-white font-medium">Your content:</strong> You retain ownership
                of any images, floor plans, or other materials you upload to the Service. By
                uploading content, you grant ArchiVision AI a limited, non-exclusive license to
                process that content solely for the purpose of generating your requested designs.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-6 text-[15px] font-light">
                <strong className="text-white font-medium">Generated designs:</strong> The AI-generated
                design images produced by the Service are provided to you for personal and
                commercial use subject to your subscription plan. We do not claim ownership over
                your generated outputs.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-6 text-[15px] font-light">
                <strong className="text-white font-medium">Platform IP:</strong> The ArchiVision AI
                platform, including its design, code, trademarks, and AI pipeline, remains the
                exclusive property of ArchiVision AI and is protected by applicable intellectual
                property laws.
              </p>
            </section>

            <section id="payment" className="scroll-mt-32 border-t border-white/5 pt-10">
              <h2 className="text-xl lg:text-2xl font-medium text-white mb-4 tracking-tight">
                6. Payment &amp; Billing
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-6 text-[15px] font-light">
                Certain features of the Service require a paid subscription. By subscribing, you
                agree to pay the applicable fees as described on our{' '}
                <Link href="/pricing" className="text-white underline underline-offset-4 decoration-white/20 hover:decoration-white transition-all">
                  Pricing page
                </Link>
                . All fees are non-refundable unless expressly stated otherwise or required by law.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-6 text-[15px] font-light">
                Subscriptions automatically renew at the end of each billing cycle unless you
                cancel before the renewal date. You may cancel your subscription at any time from
                your account settings.
              </p>
            </section>

            <section id="termination" className="scroll-mt-32 border-t border-white/5 pt-10">
              <h2 className="text-xl lg:text-2xl font-medium text-white mb-4 tracking-tight">
                7. Termination
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-6 text-[15px] font-light">
                You may terminate your account at any time by contacting us or using the account
                deletion option in your settings. We may terminate or suspend your access
                immediately, without prior notice, if you breach these Terms. Upon termination,
                your right to use the Service will immediately cease.
              </p>
            </section>

            <section id="liability" className="scroll-mt-32 border-t border-white/5 pt-10">
              <h2 className="text-xl lg:text-2xl font-medium text-white mb-4 tracking-tight">
                8. Limitation of Liability
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-6 text-[15px] font-light">
                To the maximum extent permitted by applicable law, ArchiVision AI shall not be
                liable for any indirect, incidental, special, consequential, or punitive damages,
                including but not limited to loss of profits, data, or goodwill arising out of your
                use of or inability to use the Service.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-6 text-[15px] font-light">
                AI-generated designs are provided for inspirational and visualization purposes only.
                They should not be used as a substitute for professional architectural or structural
                engineering advice.
              </p>
            </section>

            <section id="changes" className="scroll-mt-32 border-t border-white/5 pt-10">
              <h2 className="text-xl lg:text-2xl font-medium text-white mb-4 tracking-tight">
                9. Changes to Terms
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-6 text-[15px] font-light">
                We reserve the right to modify these Terms at any time. When we make changes, we
                will update the effective date at the top of this page and notify users via email
                or an in-app notification. Your continued use of the Service after changes take
                effect constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section id="contact" className="scroll-mt-32 border-t border-white/5 pt-10">
              <h2 className="text-xl lg:text-2xl font-medium text-white mb-4 tracking-tight">
                10. Contact Us
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-8 text-[15px] font-light">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-white/[0.03] border border-white/10 p-8 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <p className="text-white font-medium text-lg mb-1">Legal Department</p>
                  <p className="text-zinc-500 text-sm">ArchiVision AI Global Support</p>
                </div>
                <a
                  href="mailto:legal@archivision.ai"
                  className="px-6 py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-zinc-200 transition-colors inline-block text-center"
                >
                  legal@archivision.ai
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
          <ul className="space-y-4">
              {Object.entries(TOC_LABELS).map(([id, label]) => {
                const isActive = activeSection === id;
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
        </aside>
      </div>
      </main>

      <Footer />
    </div>
  );
}
