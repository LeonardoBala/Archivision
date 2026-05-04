'use client';

import { useCreate } from '@/context/CreateContext';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';
import { moodOptions } from '@/lib/moodOptions';
import CreationStepLayout from '@/components/creation/CreationStepLayout';

export default function MoodPage() {
  const { formData, updateData } = useCreate();
  const router = useRouter();

  return (
    <CreationStepLayout
        title="Color & Mood"
        description="Select a palette to guide the lighting, materials, and overall atmosphere."
        onBack={() => router.back()}
        onNext={() => router.push('/create/review')}
        isNextDisabled={!formData.colorPalette}
    >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {moodOptions.map((palette) => {
                const isSelected = formData.colorPalette === palette.id;
                return (
                    <button
                        key={palette.id}
                        onClick={() => updateData('colorPalette', palette.id)}
                        className={`
                            relative flex flex-col p-6 rounded-2xl border transition-all text-left group
                            ${isSelected 
                                ? 'bg-zinc-900 border-white ring-1 ring-white/50 shadow-lg shadow-white/5' 
                                : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900'}
                        `}
                    >
                        <div className="flex justify-between items-start w-full mb-3">
                            <div>
                                <span className={`block font-bold text-lg ${isSelected ? 'text-white' : 'text-zinc-200'}`}>{palette.label}</span>
                                <span className="text-xs text-zinc-500 font-medium mt-1 block group-hover:text-zinc-400">{palette.description}</span>
                            </div>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${isSelected ? 'bg-white border-white scale-100' : 'border-zinc-700 bg-transparent scale-90 opacity-0 group-hover:opacity-100'}`}>
                                <Check className={`w-3.5 h-3.5 ${isSelected ? 'text-black' : 'text-zinc-500'}`} />
                            </div>
                        </div>
                        <div className="flex items-center gap-[-8px] mt-4">
                            {palette.colors.map((color, i) => (
                                <div key={i} className={`w-12 h-12 rounded-full ${color} shadow-lg ring-4 ring-zinc-950 -ml-3 first:ml-0 transition-transform ${isSelected ? 'scale-105' : 'group-hover:scale-105'}`} />
                            ))}
                        </div>
                        {isSelected && <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />}
                    </button>
                );
            })}
        </div>
    </CreationStepLayout>
  );
}