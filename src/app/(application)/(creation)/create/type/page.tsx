'use client';

import { useCreate } from '@/context/CreateContext';
import { useRouter } from 'next/navigation';
import { ImageIcon, Layout, Loader2, Trash2, Plus } from 'lucide-react';
import { useRef, useState } from 'react';
import CreationStepLayout from '@/components/creation/CreationStepLayout';

export default function InputTypePage() {
  const { formData, updateData } = useCreate();
  const router = useRouter();
  
  const photoInputRef = useRef<HTMLInputElement>(null);
  const blueprintInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // --- FUNCTIE HELPER PENTRU CONVERSIE BASE64 ---
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          // Cream un canvas pentru redimensionare
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Limitam la max 1024px pe latura cea mai mare (suficient pentru AI)
          const MAX_SIZE = 1024;
          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          // Exportam ca JPEG cu calitate 0.8 (reduce drastic marimea fisierului)
          const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
          resolve(dataUrl);
        };
        img.onerror = (err) => reject(err);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  // --- HANDLER PENTRU FOTO (SINGLE) ---
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsProcessing(true);

    try {
        const base64 = await convertFileToBase64(files[0]);

        updateData('inputType', 'photo');
        updateData('uploadedImages', [base64]);

    } catch (error) {
        console.error("Error converting images:", error);
        alert("Failed to process images. Please try again.");
    } finally {
        setIsProcessing(false);
        if (photoInputRef.current) photoInputRef.current.value = '';
    }
  };

  // --- HANDLER PENTRU BLUEPRINT (SINGLE) ---
  const handleBlueprintUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsProcessing(true);

    try {
        const file = files[0];
        const base64 = await convertFileToBase64(file);

        updateData('inputType', 'blueprint');
        updateData('uploadedImages', [base64]); // Blueprint e de obicei una singura

    } catch (error) {
        console.error("Error converting blueprint:", error);
    } finally {
        setIsProcessing(false);
        if (blueprintInputRef.current) blueprintInputRef.current.value = '';
    }
  };

  const removeImage = (idx: number) => {
    const filtered = formData.uploadedImages.filter((_, i) => i !== idx);
    updateData('uploadedImages', filtered);
    if(filtered.length === 0) updateData('inputType', '');
  };

  return (
    <CreationStepLayout
        title="How do you want to start?"
        description="Choose the input for the AI engine. You can upload photos or a blueprint."
        onBack={() => router.push('/dashboard')}
        onNext={() => router.push('/create/details')}
        isNextDisabled={formData.uploadedImages.length === 0 || isProcessing}
        isLoading={isProcessing}
    >
        {/* INPUTS HIDDEN */}
        <input type="file" ref={photoInputRef} className="hidden" accept="image/*" onChange={handlePhotoUpload} />
        <input type="file" ref={blueprintInputRef} className="hidden" accept="image/*" onChange={handleBlueprintUpload} />

        {isProcessing ? (
            <div className="flex flex-col items-center justify-center h-64 border border-zinc-800 rounded-3xl bg-zinc-900/30">
                <Loader2 className="w-10 h-10 text-white animate-spin mb-4" />
                <p className="text-zinc-400">Processing files...</p>
            </div>
        ) : formData.uploadedImages.length > 0 ? (
            // VIEW: PREVIEW GRID
            <div className="grid grid-cols-1 max-w-2xl mx-auto gap-6 w-full">
                {formData.uploadedImages.map((img, idx) => (
                    <div key={idx} className="relative group aspect-video rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl">
                        <img src={img} alt={`Input ${idx + 1}`} className="w-full h-full object-cover" />

                        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/5 text-xs font-bold text-white">
                            {formData.inputType === 'blueprint' ? 'BLUEPRINT' : 'PHOTO'}
                        </div>

                        <button onClick={() => removeImage(idx)} className="absolute top-4 right-4 p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                ))}

                {/* Replace button — lets user swap the photo */}
                {formData.inputType === 'photo' && (
                    <button onClick={() => photoInputRef.current?.click()} className="flex items-center justify-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors py-2">
                        <Plus className="w-4 h-4" />
                        Replace photo
                    </button>
                )}
            </div>
        ) : (
            // VIEW: SELECTION CARDS
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <button onClick={() => photoInputRef.current?.click()} className="p-10 rounded-3xl border-2 border-zinc-800 bg-zinc-900 hover:border-zinc-600 hover:bg-zinc-800 transition-all hover:scale-[1.01] flex flex-col items-center gap-6 text-center group h-80 justify-center">
                    <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center group-hover:bg-zinc-700 transition-colors">
                        <ImageIcon className="w-10 h-10 text-white" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-2 text-white">Upload Photo</h3>
                        <p className="text-zinc-400">Upload a photo of your room.</p>
                    </div>
                </button>
                <button onClick={() => blueprintInputRef.current?.click()} className="p-10 rounded-3xl border-2 border-zinc-800 bg-zinc-900 hover:border-zinc-600 hover:bg-zinc-800 transition-all hover:scale-[1.01] flex flex-col items-center gap-6 text-center group h-80 justify-center">
                    <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center group-hover:bg-zinc-700 transition-colors">
                        <Layout className="w-10 h-10 text-white" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-2 text-white">Upload Blueprint</h3>
                        <p className="text-zinc-400">Generate renders from a 2D plan.</p>
                    </div>
                </button>
            </div>
        )}
    </CreationStepLayout>
  );
}