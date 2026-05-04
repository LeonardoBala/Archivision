'use client';

import { useState, useRef, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ChevronLeft, ImageIcon, Loader2, Trash2, Plus, Check, Wand2
} from 'lucide-react';

// Importa i dati e la TUA azione unica aggiornata
import { roomOptions } from '@/lib/roomOptions';
import { styleOptions } from '@/lib/styleOptions';
import { moodOptions } from '@/lib/moodOptions';
import { generateDesignAction } from '@/actions/generateDesign'; 

interface AddRoomFormData {
  roomName: string;
  roomType: string;
  style: string;
  colorPalette: string;
  inputType: string;
  uploadedImages: string[];
}

export default function AddRoomPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  
  // Estrai il projectId in modo sicuro (Next.js 15+ App Router)
  const resolvedParams = use(params);
  const projectId = resolvedParams.id;

  const photoInputRef = useRef<HTMLInputElement>(null);
  
  const [isProcessingFiles, setIsProcessingFiles] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<AddRoomFormData>({
    roomName: '',
    roomType: '',
    style: '',
    colorPalette: '',
    inputType: '',
    uploadedImages: []
  });

  const isFormValid = formData.roomName && formData.roomType && formData.style && formData.colorPalette && formData.uploadedImages.length > 0;

  // --- HELPER: CONVERSIE BASE64 ---
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const MAX_SIZE = 1024;
          
          if (width > height) {
            if (width > MAX_SIZE) { height *= MAX_SIZE / width; width = MAX_SIZE; }
          } else {
            if (height > MAX_SIZE) { width *= MAX_SIZE / height; height = MAX_SIZE; }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          resolve(canvas.toDataURL('image/jpeg', 0.8));
        };
        img.onerror = (err) => reject(err);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  // --- HANDLER UPLOAD FOTO ---
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setIsProcessingFiles(true);
    
    try {
      const fileArray = Array.from(files).slice(0, 4 - formData.uploadedImages.length); // Max 4 poze
      const base64Promises = fileArray.map(file => convertFileToBase64(file));
      const newImagesBase64 = await Promise.all(base64Promises);

      setFormData(prev => ({
        ...prev,
        inputType: 'photo',
        uploadedImages: [...prev.uploadedImages, ...newImagesBase64]
      }));
    } catch (error) {
      console.error("Error converting images:", error);
      alert("Failed to process images.");
    } finally {
      setIsProcessingFiles(false);
      if (photoInputRef.current) photoInputRef.current.value = '';
    }
  };

  const removeImage = (idx: number) => {
    setFormData(prev => {
      const filtered = prev.uploadedImages.filter((_, i) => i !== idx);
      return { ...prev, uploadedImages: filtered, inputType: filtered.length === 0 ? '' : prev.inputType };
    });
  };

  const updateField = (field: keyof AddRoomFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // --- SUBMIT ---
  const handleSubmit = async () => {
    if (!isFormValid || isSubmitting) return;
    setIsSubmitting(true);

    try {
      const dataToSend = {
         ...formData,
         projectId: projectId 
      };

      // Chiamiamo la Server Action unica
      const result = await generateDesignAction(dataToSend);
      
      if (result.success) {
        router.refresh(); // Curățăm cache-ul local din browser
        
        // Trimitem utilizatorul la proiect, dar îi specificăm ce cameră să deschidă!
        router.push(`/project/${projectId}?newRoom=${result.roomId}`);
        
      } else {
        alert("Generation Error: " + result.error);
        setIsSubmitting(false);
      }
    } catch (e) {
      console.error(e);
      alert("An unexpected error occurred.");
      setIsSubmitting(false); // Resetăm DOAR dacă a eșuat
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-32">
      {/* HEADER FIX */}
      <div className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/project/${projectId}`} className="p-2.5 bg-zinc-900 rounded-full hover:bg-zinc-800 hover:text-white text-zinc-400 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold">Add New Room</h1>
            <p className="text-xs text-zinc-500">Expand your current project</p>
          </div>
        </div>
        <button 
          onClick={handleSubmit} 
          disabled={!isFormValid || isSubmitting}
          className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-full font-bold hover:bg-zinc-200 transition-all shadow-lg shadow-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
          {isSubmitting ? "Generating..." : "Generate Room"}
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-16">
        <input type="file" ref={photoInputRef} className="hidden" accept="image/*" multiple onChange={handlePhotoUpload} />

        {/* 1. UPLOAD SECTION */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-1">Room Photo</h2>
            <p className="text-zinc-400 text-sm">Upload a photo of the room you want to redesign.</p>
          </div>
          
          {isProcessingFiles ? (
            <div className="flex flex-col items-center justify-center h-48 border border-zinc-800 rounded-3xl bg-zinc-900/30">
              <Loader2 className="w-8 h-8 text-white animate-spin mb-4" />
              <p className="text-zinc-400 text-sm">Processing image...</p>
            </div>
          ) : formData.uploadedImages.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.uploadedImages.map((img, idx) => (
                <div key={idx} className="relative group aspect-video rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 shadow-xl">
                  <img src={img} alt={`Input ${idx}`} className="w-full h-full object-cover" />
                  <button onClick={() => removeImage(idx)} className="absolute top-2 right-2 p-1.5 bg-red-500/80 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {formData.uploadedImages.length < 4 && (
                <button onClick={() => photoInputRef.current?.click()} className="aspect-video rounded-2xl border-2 border-dashed border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 flex flex-col items-center justify-center gap-2 transition-all group">
                  <Plus className="w-6 h-6 text-zinc-500 group-hover:text-white" />
                </button>
              )}
            </div>
          ) : (
             <button onClick={() => photoInputRef.current?.click()} className="w-full p-10 rounded-3xl border-2 border-dashed border-zinc-800 bg-zinc-900/30 hover:border-zinc-600 hover:bg-zinc-900/80 transition-all flex flex-col items-center gap-4 text-center group h-48 justify-center">
                <div className="w-14 h-14 bg-zinc-800 rounded-full flex items-center justify-center group-hover:bg-zinc-700 transition-colors">
                  <ImageIcon className="w-6 h-6 text-zinc-400 group-hover:text-white" />
                </div>
                <p className="text-zinc-400 font-medium">Click to upload room photo (Max 4)</p>
            </button>
          )}
        </section>

        {/* 2. DETAILS SECTION */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-1">Room Details</h2>
            <p className="text-zinc-400 text-sm">Name and categorize the space.</p>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2 max-w-md">
              <label className="text-sm font-semibold text-zinc-300 ml-1">Room Name</label>
              <input 
                  type="text" 
                  placeholder="e.g. Master Bedroom"
                  value={formData.roomName}
                  onChange={(e) => updateField('roomName', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {roomOptions.map((room) => {
                  const isSelected = formData.roomType === room.id;
                  return (
                      <button
                          key={room.id}
                          onClick={() => updateField('roomType', room.id)}
                          className={`flex flex-col items-start gap-3 p-4 rounded-2xl border transition-all text-left group
                              ${isSelected ? 'bg-white text-black border-white shadow-xl shadow-white/5 scale-[1.02]' 
                                           : 'bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900 hover:text-zinc-200'}`}
                      >
                          <div className={`p-2 rounded-lg transition-colors ${isSelected ? 'bg-zinc-200 text-black' : 'bg-zinc-950 border border-zinc-800 text-zinc-500 group-hover:text-white'}`}>
                              {room.icon}
                          </div>
                          <span className="font-semibold text-sm leading-tight">{room.label}</span>
                      </button>
                  );
              })}
            </div>
          </div>
        </section>

        {/* 3. STYLE SECTION */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-1">Aesthetic Style</h2>
            <p className="text-zinc-400 text-sm">Select the design direction.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {styleOptions.map((style) => {
                const isSelected = formData.style === style.id;
                return (
                    <div 
                        key={style.id} 
                        onClick={() => updateField('style', style.id)}
                        className={`group relative aspect-square rounded-3xl overflow-hidden cursor-pointer transition-all duration-500
                            ${isSelected ? 'ring-[4px] ring-white scale-[0.98] shadow-2xl shadow-white/10' : 'hover:scale-[1.01] hover:shadow-2xl hover:shadow-black/50'}
                        `}
                    >
                        <img src={style.image} alt={style.label} className={`w-full h-full object-cover transition-transform duration-1000 ease-out ${isSelected ? 'scale-105' : 'group-hover:scale-110'}`} />
                        <div className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 transition-opacity duration-500 ${isSelected ? 'opacity-80' : 'opacity-50 group-hover:opacity-70'}`} />
                        <div className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 z-10 shadow-lg ${isSelected ? 'bg-white scale-100 opacity-100' : 'bg-white/30 backdrop-blur-md scale-75 opacity-0 group-hover:opacity-100'}`}>
                            <Check className={`w-5 h-5 ${isSelected ? 'text-black' : 'text-white'}`} />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
                            <h3 className="text-xl font-bold text-white mb-2">{style.label}</h3>
                            <div className={`overflow-hidden transition-all duration-500 ${isSelected ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100'}`}>
                                <p className="text-xs text-zinc-300 leading-relaxed">{style.description}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
          </div>
        </section>

        {/* 4. MOOD SECTION */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-1">Color Palette</h2>
            <p className="text-zinc-400 text-sm">Set the mood and atmosphere.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             {moodOptions.map((palette) => {
                const isSelected = formData.colorPalette === palette.id;
                return (
                    <button
                        key={palette.id}
                        onClick={() => updateField('colorPalette', palette.id)}
                        className={`relative flex flex-col p-5 rounded-2xl border transition-all text-left group
                            ${isSelected ? 'bg-zinc-900 border-white ring-1 ring-white/50 shadow-lg shadow-white/5' : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900'}
                        `}
                    >
                        <div className="flex justify-between items-start w-full mb-3">
                            <div>
                                <span className={`block font-bold text-base ${isSelected ? 'text-white' : 'text-zinc-200'}`}>{palette.label}</span>
                                <span className="text-[11px] text-zinc-500 font-medium mt-1 block">{palette.description}</span>
                            </div>
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${isSelected ? 'bg-white border-white scale-100' : 'border-zinc-700 bg-transparent scale-90 opacity-0 group-hover:opacity-100'}`}>
                                <Check className={`w-3 h-3 ${isSelected ? 'text-black' : 'text-zinc-500'}`} />
                            </div>
                        </div>
                        <div className="flex items-center gap-[-6px] mt-2">
                            {palette.colors.map((color, i) => (
                                <div key={i} className={`w-8 h-8 rounded-full ${color} shadow-lg ring-2 ring-zinc-950 -ml-2 first:ml-0 transition-transform ${isSelected ? 'scale-105' : 'group-hover:scale-105'}`} />
                            ))}
                        </div>
                    </button>
                );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}