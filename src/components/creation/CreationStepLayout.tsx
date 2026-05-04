'use client';

import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { ReactNode } from 'react';

interface CreationStepLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
  isNextDisabled?: boolean;
  isLoading?: boolean;
  customAction?: ReactNode; // Pentru butonul special "Generate"
}

export default function CreationStepLayout({
  title,
  description,
  children,
  onBack,
  onNext,
  nextLabel = "Next Step",
  isNextDisabled = false,
  isLoading = false,
  customAction
}: CreationStepLayoutProps) {
  return (
    <div className="flex flex-col h-full relative">
      
      {/* 1. SCROLLABLE CONTENT AREA */}
      {/* Folosim max-w-6xl constant si padding egal (px-12) */}
      <div className="flex-1 w-full max-w-6xl mx-auto px-6 md:px-12 pt-10 pb-32 animate-in fade-in slide-in-from-right-4 duration-500">
        
        {/* Header Standardizat */}
        <div className="mb-10 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white tracking-tight">{title}</h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
                {description}
            </p>
        </div>

        {/* Continutul specific Paginii */}
        <div className="w-full">
            {children}
        </div>
      </div>

      {/* 2. FIXED BOTTOM BAR (Sticky Footer) */}
      {/* Fixat jos, dar respectă sidebar-ul din stânga (md:left-80) */}
      <div className="fixed bottom-0 right-0 left-0 md:left-80 bg-zinc-950/80 backdrop-blur-xl border-t border-white/5 p-6 z-50">
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between">
            
            {/* Back Button */}
            <button 
                onClick={onBack} 
                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors px-2 py-2 text-sm font-medium"
            >
                <ArrowLeft className="w-4 h-4" /> Back
            </button>

            {/* Next / Custom Button */}
            {customAction ? (
                customAction
            ) : (
                <button 
                    onClick={onNext} 
                    disabled={isNextDisabled || isLoading}
                    className="
                        bg-white text-black px-8 py-3.5 rounded-full font-bold text-base 
                        hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed 
                        flex items-center gap-2 transition-all shadow-lg shadow-white/5
                    "
                >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                    {nextLabel} <ArrowRight className="w-4 h-4" />
                </button>
            )}
        </div>
      </div>
    </div>
  );
}