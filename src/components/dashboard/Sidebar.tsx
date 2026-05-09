'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, PlusCircle, FolderOpen, LogOut,
  Layers, User as UserIcon, Menu, X
} from 'lucide-react';
import { useClerk, useUser } from '@clerk/nextjs';

export default function Sidebar() {
  const pathname = usePathname();
  const { signOut } = useClerk();
  const { user } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Overview', href: '/dashboard' },
    { icon: <PlusCircle size={20} />, label: 'New Project', href: '/create' },
    { icon: <FolderOpen size={20} />, label: 'My Projects', href: '/my-projects' },
  ];

  const NavContent = () => (
    <>
      <div className="h-16 md:h-20 flex items-center px-6 border-b border-white/5">
        <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
          <div className="w-8 h-8 bg-white text-zinc-950 rounded-full flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <span className="text-white font-bold tracking-tight text-lg">ArchiVision</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        <p className="px-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">Menu</p>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-3 md:py-2.5 rounded-xl text-sm font-medium transition-all
                ${isActive
                  ? 'bg-white text-black shadow-lg shadow-white/5'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5 pb-8 md:pb-4">
        <div className="flex items-center gap-2">
          <Link
            href="/profile"
            onClick={() => setMobileOpen(false)}
            className="flex-1 flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-all group overflow-hidden"
          >
            <div className="relative w-9 h-9 md:w-8 md:h-8 rounded-full overflow-hidden border border-white/10 group-hover:border-white/50 transition-colors flex-shrink-0">
              {user?.imageUrl ? (
                <img src={user.imageUrl} alt="User" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                  <UserIcon className="w-4 h-4 text-zinc-400" />
                </div>
              )}
            </div>
            <div className="flex flex-col truncate">
              <span className="text-sm font-medium text-white truncate group-hover:text-zinc-200">
                {user?.firstName || 'User'}
              </span>
              <span className="text-[10px] text-zinc-500 truncate">View Profile</span>
            </div>
          </Link>
          <button
            onClick={() => signOut({ redirectUrl: '/' })}
            className="p-2.5 md:p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
            title="Sign Out"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Top Navigation Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-zinc-950/80 backdrop-blur-md border-b border-white/5 z-40 flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-white text-zinc-950 rounded-full flex items-center justify-center">
            <Layers className="w-3.5 h-3.5" />
          </div>
          <span className="text-white font-bold tracking-tight">ArchiVision</span>
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Backdrop */}
      <div
        className={`md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300
          ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Slide-out Drawer */}
      <div
        className={`md:hidden fixed top-0 left-0 h-full w-[80%] max-w-[300px] bg-zinc-950 border-r border-white/10 z-50 flex flex-col
          transition-transform duration-300 ease-in-out ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors z-50"
          aria-label="Close menu"
        >
          <X className="w-6 h-6" />
        </button>
        <NavContent />
      </div>

      {/* Desktop Fixed Sidebar */}
      <aside className="hidden md:flex w-64 h-screen bg-zinc-950 border-r border-white/10 flex-col fixed left-0 top-0 z-40">
        <NavContent />
      </aside>
    </>
  );
}