'use client';

import React from 'react';
import { Layers, Twitter, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { SignedIn, SignedOut } from '@clerk/nextjs';

const PRODUCT_LINKS = [
  { label: 'Features', href: '/#features' },
  { label: 'Design Styles', href: '/create' },
  { label: 'Pricing', href: '/pricing' },
];

const COMPANY_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
];

const SOCIAL_LINKS = [
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <>
      {/* CTA Section */}
      <section className="py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 -z-10" />
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-medium text-white tracking-tight mb-6 md:mb-8">
            Ready to transform<br />your home?
          </h2>
          <p className="text-base md:text-xl text-zinc-400 mb-8 md:mb-10 max-w-2xl mx-auto">
            Join thousands of homeowners and designers using ArchiVision AI to visualize the impossible.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 md:gap-4">
            <SignedIn>
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-white text-zinc-950 rounded-full font-medium text-sm md:text-base hover:bg-zinc-200 transition-colors text-center"
              >
                Go to Dashboard
              </Link>
            </SignedIn>
            <SignedOut>
              <Link
                href="/sign-in"
                className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-white text-zinc-950 rounded-full font-medium text-sm md:text-base hover:bg-zinc-200 transition-colors text-center"
              >
                Get Started for Free
              </Link>
            </SignedOut>
            <Link
              href="/pricing"
              className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-transparent border border-zinc-700 text-white rounded-full font-medium text-sm md:text-base hover:bg-zinc-800 transition-colors text-center"
            >
              View Plans
            </Link>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="border-t border-white/10 bg-zinc-950 pt-12 md:pt-16 pb-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 md:mb-16">
            <div>
              <h4 className="text-white font-medium mb-3 md:mb-4 text-sm md:text-base">Product</h4>
              <ul className="space-y-2 text-zinc-500 text-xs md:text-sm">
                {PRODUCT_LINKS.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-medium mb-3 md:mb-4 text-sm md:text-base">Company</h4>
              <ul className="space-y-2 text-zinc-500 text-xs md:text-sm">
                {COMPANY_LINKS.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-medium mb-3 md:mb-4 text-sm md:text-base">Legal</h4>
              <ul className="space-y-2 text-zinc-500 text-xs md:text-sm">
                {LEGAL_LINKS.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-medium mb-3 md:mb-4 text-sm md:text-base">Social</h4>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-8 h-8 md:w-10 md:h-10 bg-zinc-900 rounded flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                  >
                    <Icon className="w-4 h-4 md:w-5 md:h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-6 md:pt-8 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 md:w-6 md:h-6 bg-white text-zinc-950 rounded flex items-center justify-center">
                <Layers className="w-3 h-3" />
              </div>
              <span className="text-zinc-500 text-xs md:text-sm">© 2026 ArchiVision AI. All rights reserved.</span>
            </div>
            <div className="flex gap-4 md:gap-6 text-xs md:text-sm text-zinc-600">
              <Link href="/privacy" className="hover:text-zinc-400 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-zinc-400 transition-colors">Terms of Service</Link>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}