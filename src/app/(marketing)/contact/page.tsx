'use client';

import React, { useState } from 'react';
import Navbar from '@/components/homeComponents/Navbar';
import Footer from '@/components/homeComponents/Footer2';
import { Mail, MessageSquare, Zap, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const TOPICS = [
  { id: 'general', label: 'General Inquiry' },
  { id: 'support', label: 'Technical Support' },
  { id: 'billing', label: 'Billing & Plans' },
  { id: 'partnership', label: 'Partnership' },
  { id: 'press', label: 'Press & Media' },
  { id: 'other', label: 'Other' },
];

export default function ContactPage() {
  const [topic, setTopic] = useState('general');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-white/20 overflow-x-hidden">
      <Navbar />

      {/* Background glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-white/[0.025] rounded-full blur-[180px] pointer-events-none -z-10" />

      <main className="pt-40 pb-32 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-zinc-500 text-xs font-light py-3 px-4 bg-white/[0.02] border border-white/5 rounded-full w-fit mb-14">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 opacity-30" />
            <span className="text-zinc-300 font-medium">Contact</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left: Hero copy */}
            <div>
              <h1 className="text-5xl lg:text-6xl font-medium tracking-tight text-white mb-6 leading-[1.05]">
                Let&apos;s talk.
              </h1>
              <p className="text-zinc-400 text-lg font-light leading-relaxed mb-12">
                Have a question, idea, or just want to say hello? We respond to every message
                within 24 hours.
              </p>

              <div className="space-y-5">
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium mb-0.5">Email us directly</p>
                    <a
                      href="mailto:hello@archivision.ai"
                      className="text-zinc-500 text-sm hover:text-white transition-colors"
                    >
                      hello@archivision.ai
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium mb-0.5">Response time</p>
                    <p className="text-zinc-500 text-sm">Under 24 hours on weekdays</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium mb-0.5">Legal inquiries</p>
                    <a
                      href="mailto:legal@archivision.ai"
                      className="text-zinc-500 text-sm hover:text-white transition-colors"
                    >
                      legal@archivision.ai
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-zinc-900/60 border border-white/10 rounded-3xl p-8">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-2">
                    <Mail className="w-8 h-8 text-zinc-300" />
                  </div>
                  <h3 className="text-2xl font-medium text-white">Message sent</h3>
                  <p className="text-zinc-500 max-w-xs">
                    Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-4 px-6 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Topic</label>
                    <div className="flex flex-wrap gap-2">
                      {TOPICS.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setTopic(t.id)}
                          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                            topic === t.id
                              ? 'bg-white text-black border-white'
                              : 'bg-transparent text-zinc-400 border-zinc-700 hover:border-zinc-500 hover:text-white'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2" htmlFor="first-name">
                        First name
                      </label>
                      <input
                        id="first-name"
                        type="text"
                        required
                        placeholder="Leonardo"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2" htmlFor="last-name">
                        Last name
                      </label>
                      <input
                        id="last-name"
                        type="text"
                        required
                        placeholder="Bala"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2" htmlFor="email">
                      Email address
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2" htmlFor="message">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      placeholder="Tell us how we can help..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-white text-black py-3.5 rounded-xl font-medium text-sm hover:bg-zinc-200 transition-colors"
                  >
                    Send message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
