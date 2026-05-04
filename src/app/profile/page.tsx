'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { 
  Edit3, MapPin, Calendar, Heart, Eye, Plus, Layers, Loader2, Sparkles // Am adăugat Sparkles
} from 'lucide-react';
import Navbar from '@/components/homeComponents/Navbar';
import { getUserInfo, getUserProjects } from '@/actions/UserSettings/userActions'; 

interface Project {
  id: string;
  imageUrl: string;
  title: string;
  likes: number;
  views: number;
}

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const [activeTab, setActiveTab] = useState('work');
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [dbUser, setDbUser] = useState<any>(null);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);

  // Extragem planul curent (Dacă nu e, e FREE)
  const currentPlan = (user?.publicMetadata?.plan as string) || 'FREE';

  useEffect(() => {
    const fetchData = async () => {
      if (!isLoaded || !user) return;

      try {
        const userData = await getUserInfo();
        setDbUser(userData);

        const projectsData = await getUserProjects();
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoadingProjects(false);
      }
    };

    fetchData();
}, [isLoaded, user]);

  if (!isLoaded) return <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-white/20">
      <Navbar />

      <main className="pt-24 md:pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-16">
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full p-1 border-2 border-white/10 mb-5 md:mb-6">
                <img src={user?.imageUrl} alt="Profile" className="w-full h-full object-cover rounded-full" />
                
                {/* MIC BADGE PENTRU PLAN (PRO/AGENCY) Suprapus pe avatar */}
                {currentPlan !== 'FREE' && (
                   <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border shadow-xl ${
                     currentPlan === 'PRO' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                   }`}>
                     <Sparkles className="w-3 h-3" /> {currentPlan}
                   </div>
                )}
            </div>

            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 tracking-tight mt-2">
                {dbUser?.firstName 
                  ? `${dbUser.firstName} ${dbUser.lastName || ''}` 
                  : (user?.fullName || 'Architect')}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-zinc-400 text-sm mb-6 md:mb-8">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Romania</span>
                <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> Joined {user?.createdAt ? new Date(user.createdAt).getFullYear() : '2025'}
                </span>
                {/* AFIȘAREA PLANULUI SUB NUME (Alternativă la cea de pe poză) */}
                <span className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
                   currentPlan === 'PRO' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                   currentPlan === 'AGENCY' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 
                   'bg-zinc-800 text-zinc-400 border-zinc-700'
                }`}>
                   {currentPlan} PLAN
                </span>
            </div>

            <div className="flex gap-4">
                <Link href="/profile/settings">
                    <button className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/20 font-medium hover:bg-white hover:text-black transition-all">
                        <Edit3 className="w-4 h-4" /> Edit Profile
                    </button>
                </Link>
                <Link href="/dashboard/create">
                    <button className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black font-bold hover:bg-zinc-200 transition-all">
                        <Plus className="w-4 h-4" /> New Project
                    </button>
                </Link>
            </div>
        </div>

        {/* RESTUL CODULUI (Tabs, Content, etc) ramane EXACT LA FEL */}
        {/* TABS */}
        <div className="flex items-center justify-center gap-8 border-b border-white/5 mb-12">
            {['work', 'liked', 'about'].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-sm font-medium transition-all relative ${activeTab === tab ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    {activeTab === tab && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white rounded-t-full"></span>}
                </button>
            ))}
        </div>

        {/* CONTENT */}
        <div className="min-h-[400px]">
            {activeTab === 'work' && (
                <>
                    {isLoadingProjects ? (
                        <div className="flex justify-center items-center h-64">
                            <Loader2 className="w-8 h-8 text-white animate-spin" />
                        </div>
                    ) : projects.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.map((project) => (
                                <div key={project.id} className="group cursor-pointer">
                                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 mb-3">
                                        <img 
                                            src={project.imageUrl} 
                                            alt={project.title} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                            <div className="flex items-center gap-1.5 text-white bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-medium">
                                                <Heart className="w-3.5 h-3.5" /> {project.likes}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-white bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-medium">
                                                <Eye className="w-3.5 h-3.5" /> {project.views}
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="text-sm font-semibold text-white group-hover:text-zinc-300 transition-colors">
                                        {project.title}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    ) : (
                        // EMPTY STATE
                        <div className="flex flex-col items-center justify-center py-20 border border-dashed border-zinc-800 rounded-3xl bg-zinc-900/20 animate-in fade-in zoom-in duration-500">
                            <div className="w-16 h-16 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mb-6 ring-1 ring-white/10">
                                <Layers className="w-8 h-8 text-white/80" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Upload your first design</h3>
                            <p className="text-zinc-500 max-w-md text-center mb-8">
                                You don't have any projects yet. Start creating to show off your best interior designs.
                            </p>
                            <Link href="/dashboard/create">
                                <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                                    Create New Project
                                </button>
                            </Link>
                        </div>
                    )}
                </>
            )}
            
            {activeTab === 'liked' && (
                <div className="text-center py-20">
                    <Heart className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p>No liked projects yet.</p>
                </div>
            )}
            
            {activeTab === 'about' && (
                 <div className="max-w-2xl mx-auto text-center py-10">
                    <h3 className="text-lg font-bold text-white mb-4">About Me</h3>
                    <p className="text-zinc-400">
                        {dbUser?.bio}
                    </p>
                    
                    {dbUser?.website && (
                        <a href={dbUser.website} target="_blank" className="block mt-4 text-blue-400 hover:underline">
                            {dbUser.website}
                        </a>
                    )}
                 </div>
            )}
        </div>
      </main>
    </div>
  );
}