'use client';

import { useCreate } from '@/context/CreateContext';
import { useRouter } from 'next/navigation';
import { Check, Info } from 'lucide-react';
import { styleOptions } from '@/lib/styleOptions';
import CreationStepLayout from '@/components/creation/CreationStepLayout';

export default function StylePage() {
  const { formData, updateData } = useCreate();
  const router = useRouter();

  return (
    <CreationStepLayout
        title="Choose the Style"
        description="Select an aesthetic direction. The bigger the image, the more details our AI can understand about your preference."
        onBack={() => router.back()}
        onNext={() => router.push('/create/mood')}
        isNextDisabled={!formData.style}
    >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {styleOptions.map((style) => {
                const isSelected = formData.style === style.id;
                return (
                    <div 
                        key={style.id} 
                        onClick={() => updateData('style', style.id)}
                        className={`
                            group relative aspect-square rounded-3xl overflow-hidden cursor-pointer transition-all duration-500
                            ${isSelected 
                                ? 'ring-[6px] ring-white scale-[0.98] shadow-2xl shadow-white/10' 
                                : 'hover:scale-[1.01] hover:shadow-2xl hover:shadow-black/50'}
                        `}
                    >
                        <img src={style.image} alt={style.label} className={`w-full h-full object-cover transition-transform duration-1000 ease-out ${isSelected ? 'scale-105' : 'group-hover:scale-110'}`} />
                        <div className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 transition-opacity duration-500 ${isSelected ? 'opacity-80' : 'opacity-50 group-hover:opacity-70'}`} />
                        <div className={`absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 z-10 shadow-lg ${isSelected ? 'bg-white scale-100 opacity-100' : 'bg-white/30 backdrop-blur-md scale-75 opacity-0 group-hover:opacity-100'}`}>
                            <Check className={`w-6 h-6 ${isSelected ? 'text-black' : 'text-white'}`} />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                            <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">{style.label}</h3>
                            <div className={`overflow-hidden transition-all duration-500 ${isSelected ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100'}`}>
                                <p className="text-base text-zinc-300 leading-relaxed">{style.description}</p>
                            </div>
                        </div>
                        {isSelected && <div className="absolute inset-0 border-[3px] border-white/30 rounded-3xl pointer-events-none mix-blend-overlay" />}
                    </div>
                );
            })}
        </div>
    </CreationStepLayout>
  );
}