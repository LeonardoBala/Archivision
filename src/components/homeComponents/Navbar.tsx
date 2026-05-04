'use client';

import { useState, useRef, useEffect } from 'react';
import { Layers, ArrowUpRight, Menu, X, LogOut, Settings, ChevronDown, User, Folder } from 'lucide-react';
import { SignedIn, SignedOut, useUser, useClerk } from '@clerk/nextjs';
import Link from 'next/link';

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  
  const { user } = useUser();
  const { signOut } = useClerk();

  const linkStyle = "px-4 py-1.5 rounded-full text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-700/50 transition-all";

  // Închide dropdown-ul dacă dai click în afara lui
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileRef]);

  // Extragem planul din metadata (dacă nu există, considerăm că e FREE)
  const userPlan = user?.publicMetadata?.plan as string | undefined;

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center pt-4 md:pt-6 px-4">
      <nav className="relative w-full max-w-5xl bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 shadow-2xl shadow-black/50">
        
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 pl-2 cursor-pointer z-50">
            <div className="w-8 h-8 bg-white text-zinc-950 rounded-full flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <span className="text-white font-medium tracking-tight text-base hidden sm:block">ArchiVision</span>
          </Link>
          
          {/* Meniul de centru */}
          <div className="hidden md:flex items-center gap-1 bg-zinc-800/50 rounded-full p-1 border border-white/5 absolute left-1/2 -translate-x-1/2">
            <SignedIn>
              <Link href="/dashboard" className={linkStyle}>Dashboard</Link>
            </SignedIn>
            <Link href="/about" className={linkStyle}>About</Link>
            <Link href="/pricing" className={linkStyle}>Pricing</Link>
          </div>

          <div className="flex items-center gap-3 pr-1">
            <div className="hidden md:flex items-center gap-3">
              
              {/* Utilizator NElogat */}
              <SignedOut>
                <Link href="/sign-in" className="text-sm font-medium text-zinc-400 hover:text-white px-2 transition-colors">Log in</Link>
                <Link href="/sign-up" className="bg-white text-zinc-950 px-5 py-2 rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors flex items-center gap-2">
                  Try Beta <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </Link>
              </SignedOut>

              {/* Utilizator LOGAT */}
              <SignedIn>
                <div className="relative" ref={profileRef}>
                  {/* Butonul de profil */}
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20">
                      <img src={user?.imageUrl} alt="Profile" className="w-full h-full object-cover"/>
                    </div>
                    <ChevronDown className={`w-3 h-3 text-zinc-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Profil */}
                  {isProfileOpen && (
                    <div className="absolute right-0 top-full mt-3 w-72 bg-zinc-900 border border-white/10 rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      
                      {/* Header Dropdown + BADGE SUBSCRIPȚIE */}
                      <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between gap-2">
                        <div className="overflow-hidden">
                          <p className="text-sm font-medium text-white truncate">{user?.fullName || user?.firstName}</p>
                          <p className="text-xs text-zinc-500 truncate mt-0.5">{user?.primaryEmailAddress?.emailAddress}</p>
                        </div>
                        
                        {/* Aici se afișează badge-ul în funcție de planul din Clerk */}
                        <div className="shrink-0">
                          {userPlan === 'PRO' ? (
                            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                              Pro Plan
                            </span>
                          ) : userPlan === 'AGENCY' ? (
                            <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                              Agency
                            </span>
                          ) : (
                            <span className="bg-zinc-800 text-zinc-400 border border-zinc-700 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                              Free
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Link-uri meniu mic */}
                      <div className="p-2 space-y-1">
                        <Link href="/profile" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                          <User className="w-4 h-4" /> Profile
                        </Link>
                        
                        <Link href="/my-projects" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                          <Folder className="w-4 h-4" /> My Projects
                        </Link>

                        <Link href="/profile/settings" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                          <Settings className="w-4 h-4" /> Settings
                        </Link>
                      </div>

                      <div className="h-px bg-white/5 mx-2 my-1"></div>
                      
                      <div className="p-2">
                        <button onClick={() => signOut()} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors text-left">
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>

                    </div>
                  )}
                </div>
              </SignedIn>
            </div>

            {/* Meniu Mobil Toggle */}
            <button 
              className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Meniu Mobil */}
        {isMobileOpen && (
          <div className="absolute top-full left-0 w-full mt-2 px-2 md:hidden animate-in fade-in slide-in-from-top-5 duration-200">
            <div className="bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col gap-6 shadow-2xl">
              <div className="flex flex-col gap-2">
                <SignedIn>
                  <Link href="/dashboard" onClick={() => setIsMobileOpen(false)} className="text-lg text-zinc-400 hover:text-white font-medium py-2 flex items-center gap-2">
                    Dashboard
                  </Link>
                </SignedIn>
                <Link href="/about" onClick={() => setIsMobileOpen(false)} className="text-lg text-zinc-400 hover:text-white font-medium py-2">About</Link>
                <Link href="/pricing" onClick={() => setIsMobileOpen(false)} className="text-lg text-zinc-400 hover:text-white font-medium py-2">Pricing</Link>
              </div>
              
              <div className="w-full h-px bg-white/10"></div>
              
              <div className="w-full">
                <SignedOut>
                  <div className="flex flex-col gap-3">
                    <Link href="/sign-in" onClick={() => setIsMobileOpen(false)}>
                      <button className="w-full py-3 rounded-xl border border-white/10 bg-white/5 text-white font-medium hover:bg-white/10 transition-all">Log In</button>
                    </Link>
                    <Link href="/sign-up" onClick={() => setIsMobileOpen(false)}>
                      <button className="w-full py-3 rounded-xl bg-white text-zinc-950 font-medium hover:bg-zinc-200 transition-all">Try Beta</button>
                    </Link>
                  </div>
                </SignedOut>
                
                <SignedIn>
                  <div className="flex items-center justify-between w-full bg-white/5 rounded-xl p-2 border border-white/10">
                    <Link href="/profile" onClick={() => setIsMobileOpen(false)} className="flex items-center gap-3 flex-1 px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20">
                         <img src={user?.imageUrl} alt="Profile" className="w-full h-full object-cover"/>
                      </div>
                      <div className="flex flex-col overflow-hidden">
                         <span className="text-sm text-white font-medium leading-none mb-1 truncate">{user?.fullName || user?.firstName || 'User'}</span>
                         
                         {/* Badge și pe mobil */}
                         <span className={`text-[10px] font-bold uppercase tracking-wider mt-1 ${
                           userPlan === 'PRO' ? 'text-emerald-400' : userPlan === 'AGENCY' ? 'text-purple-400' : 'text-zinc-500'
                         }`}>
                           {userPlan === 'PRO' ? 'PRO PLAN' : userPlan === 'AGENCY' ? 'AGENCY' : 'FREE PLAN'}
                         </span>
                         
                      </div>
                    </Link>
                    <div className="w-px h-8 bg-white/10 mx-1"></div>
                    <button onClick={() => signOut(() => setIsMobileOpen(false))} className="p-3 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Sign Out">
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                </SignedIn>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}