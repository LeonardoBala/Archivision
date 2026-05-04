'use client';

import { useCreate } from '@/context/CreateContext';
import { useRouter } from 'next/navigation';
import { roomOptions } from '@/lib/roomOptions';
import CreationStepLayout from '@/components/creation/CreationStepLayout';

export default function DetailsPage() {
  const { formData, updateData } = useCreate();
  const router = useRouter();

  return (
    <CreationStepLayout
        title="Project Details"
        description="Define the project structure. Correctly categorizing the room ensures better results."
        onBack={() => router.back()}
        onNext={() => router.push('/create/style')}
        isNextDisabled={!formData.projectName || !formData.roomType}
    >
        <div className="space-y-10">
            {/* ROW 1: Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                    <label className="text-sm font-semibold text-zinc-300 ml-1">Project Name</label>
                    <input 
                        type="text" 
                        placeholder="e.g. Casa Vacanze Roma"
                        value={formData.projectName}
                        onChange={(e) => updateData('projectName', e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                    />
                </div>
                <div className="space-y-3">
                    <label className="text-sm font-semibold text-zinc-300 ml-1">Room Name</label>
                    <input 
                        type="text" 
                        placeholder="e.g. Living Room"
                        value={formData.roomName || ''}
                        onChange={(e) => updateData('roomName', e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                    />
                </div>
            </div>

            {/* ROW 2: Room Grid */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-zinc-300 ml-1">Room Category</label>
                    <span className="text-xs text-zinc-500 bg-zinc-900 px-2 py-1 rounded border border-zinc-800">Required</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {roomOptions.map((room) => {
                        const isSelected = formData.roomType === room.id;
                        return (
                            <button
                                key={room.id}
                                onClick={() => updateData('roomType', room.id)}
                                className={`
                                    flex flex-col items-start gap-3 p-5 rounded-2xl border transition-all text-left group
                                    ${isSelected 
                                        ? 'bg-white text-black border-white shadow-xl shadow-white/5 scale-[1.02]' 
                                        : 'bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900 hover:text-zinc-200'}
                                `}
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
        </div>
    </CreationStepLayout>
  );
}