'use client';

import { useState } from 'react';
import { useCreate } from '@/context/CreateContext';
import { useRouter } from 'next/navigation';
import { Wand2, Layers, Palette, LayoutDashboard, Image as ImageIcon, Edit3, Loader2 } from 'lucide-react';
import { styleOptions } from '@/lib/styleOptions';
import { moodOptions } from '@/lib/moodOptions';
import { roomOptions } from '@/lib/roomOptions';
import CreationStepLayout from '@/components/creation/CreationStepLayout';
import { generateDesignAction } from '@/actions/generateDesign'; // Assicurati che il percorso sia corretto

export default function ReviewPage() {
  const { formData } = useCreate();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Recupera i dettagli completi basandosi sugli ID salvati nel formData
  const selectedStyle = styleOptions.find(s => s.id === formData.style);
  const selectedMood = moodOptions.find(m => m.id === formData.colorPalette);
  const selectedRoom = roomOptions.find(r => r.id === formData.roomType);


  console.log("Review Page - Form Data:", formData);
  console.log("Selected Style:", selectedStyle);
  console.log("Selected Mood:", selectedMood);
  console.log("Selected Room:", selectedRoom);
  
  const handleGenerate = async () => {
    if (isLoading) return; // Evita doppi click
    setIsLoading(true);

    try {
      // Chiamata alla Server Action (Backend)
      const result = await generateDesignAction({
        projectName: formData.projectName,
        roomName: formData.roomName,
        roomType: formData.roomType,
        // Passiamo anche le etichette descrittive per aiutare l'AI a capire meglio il contesto
        // (Nota: la server action userà formData.roomType per il DB e questi per il prompt se vuoi, 
        // ma per ora passiamo tutto ciò che potrebbe servire)
        style: formData.style, 
        mood: formData.colorPalette,
        uploadedImages: formData.uploadedImages
      });

      if (result.success) {
        // Successo: Reindirizza alla pagina del progetto generato
        router.push(`/project/${result.projectId}`);
      } else {
        // Errore gestito dal backend
        alert("Errore durante la generazione: " + (result.error || "Errore sconosciuto"));
        setIsLoading(false);
      }
    } catch (e) {
      // Errore di rete o imprevisto
      console.error("Errore Frontend:", e);
      alert("Si è verificato un errore imprevisto.");
      setIsLoading(false);
    }
  };

  return (
    <CreationStepLayout
        title="Final Review"
        description="Confirm your choices before generating the design."
        onBack={() => router.back()}
        onNext={handleGenerate}
        // Passiamo isLoading al layout per disabilitare eventualmente il tasto Next standard
        isLoading={isLoading} 
        customAction={
            <button 
                onClick={handleGenerate} 
                disabled={isLoading}
                className="
                    group relative flex items-center gap-3 px-8 py-3.5 rounded-full 
                    bg-white text-black font-bold text-base 
                    hover:bg-zinc-200 transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-white/10
                    disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none
                "
            >
                {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    <Wand2 className="w-5 h-5" />
                )}
                <span>{isLoading ? "Generating..." : "Generate Design"}</span>
            </button>
        }
    >
        {/* Layout a Griglia Compatta (2x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 h-full">
            
            {/* CARD 1: SPECS */}
            <div className="bg-zinc-900/80 border border-white/10 rounded-3xl p-5 relative group flex flex-col h-72">
                <button onClick={() => !isLoading && router.push('/create/details')} className="absolute top-5 right-5 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-all opacity-0 group-hover:opacity-100">
                    <Edit3 className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400"><LayoutDashboard className="w-5 h-5" /></div>
                    <h3 className="text-lg font-bold text-white">Project Specs</h3>
                </div>
                <div className="flex-1 space-y-3">
                    <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                        <p className="text-[10px] text-zinc-500 uppercase font-bold mb-0.5">Project</p>
                        <p className="text-white font-medium truncate text-sm">{formData.projectName || 'Untitled'}</p>
                    </div>
                    <div className="bg-black/40 p-3 rounded-xl border border-white/5 flex items-center gap-3">
                         <div className="p-1.5 bg-zinc-800 rounded-lg text-zinc-300">{selectedRoom?.icon || <Layers className="w-4 h-4" />}</div>
                        <div>
                             <p className="text-[10px] text-zinc-500 uppercase font-bold mb-0.5">Room Type</p>
                             <p className="text-white font-medium text-sm">{selectedRoom?.label || formData.roomType}</p>
                        </div>
                    </div>
                </div>
            </div>

             {/* CARD 2: STYLE */}
             <div className="bg-zinc-900/80 border border-white/10 rounded-3xl overflow-hidden relative group flex flex-col h-72">
                <button onClick={() => !isLoading && router.push('/create/style')} className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all opacity-0 group-hover:opacity-100">
                    <Edit3 className="w-4 h-4" />
                </button>
                <div className="relative h-36 w-full shrink-0">
                    <img src={selectedStyle?.image || ''} alt="Style" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent"></div>
                    <div className="absolute bottom-3 left-5">
                        <p className="text-[10px] font-bold text-pink-400 uppercase mb-0.5">Aesthetic</p>
                        <h3 className="text-xl font-bold text-white">{selectedStyle?.label || formData.style}</h3>
                    </div>
                </div>
                <div className="p-5 flex-1 bg-zinc-900/80 flex items-center">
                    <p className="text-sm text-zinc-300 line-clamp-3 leading-relaxed">
                        {selectedStyle?.description || "Style selected"}
                    </p>
                </div>
            </div>

            {/* CARD 3: INPUT */}
            <div className="bg-zinc-900/80 border border-white/10 rounded-3xl p-5 relative group flex flex-col h-72">
                <button onClick={() => !isLoading && router.push('/create/type')} className="absolute top-5 right-5 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-all opacity-0 group-hover:opacity-100">
                    <Edit3 className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400"><ImageIcon className="w-5 h-5" /></div>
                    <h3 className="text-lg font-bold text-white">Input Source</h3>
                </div>
                <div className="flex-1 bg-black/40 rounded-2xl p-3 border border-white/5">
                    {formData.uploadedImages.length > 0 ? (
                        <div className="grid grid-cols-4 gap-2 h-full items-center">
                            {formData.uploadedImages.map((img, idx) => (
                                <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-white/10 bg-black/50">
                                    <img src={img} alt={`Input ${idx}`} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-zinc-500 text-sm">No images</div>
                    )}
                </div>
            </div>

             {/* CARD 4: MOOD */}
             <div className="bg-zinc-900/80 border border-white/10 rounded-3xl p-5 relative group flex flex-col h-72">
                <button onClick={() => !isLoading && router.push('/create/mood')} className="absolute top-5 right-5 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-all opacity-0 group-hover:opacity-100">
                    <Edit3 className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400"><Palette className="w-5 h-5" /></div>
                    <h3 className="text-lg font-bold text-white">Mood</h3>
                </div>
                <div className="flex-1 flex flex-col justify-center items-center space-y-4 bg-black/40 rounded-2xl p-4 border border-white/5">
                    <div className="flex gap-2">
                        {selectedMood?.colors.map((color, i) => (
                            <div key={i} className={`w-10 h-10 rounded-full ${color} ring-2 ring-zinc-900 shadow-lg`} />
                        ))}
                    </div>
                    <p className="text-sm text-center text-zinc-300 font-medium">"{selectedMood?.label || formData.colorPalette}"</p>
                </div>
            </div>
        </div>
    </CreationStepLayout>
  );
}