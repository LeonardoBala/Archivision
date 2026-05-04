'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  PlusCircle, 
  FolderOpen, 
  LogOut,
  Layers,
  User as UserIcon
} from 'lucide-react';
import { useClerk, useUser } from '@clerk/nextjs';

export default function Sidebar() {
  const pathname = usePathname();
  const { signOut } = useClerk();
  const { user } = useUser(); // Luam datele userului pentru a le afisa jos

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Overview', href: '/dashboard' },
    { icon: <PlusCircle size={20} />, label: 'New Project', href: '/create' },
    { icon: <FolderOpen size={20} />, label: 'My Projects', href: '/my-projects' },
  ];

  return (
    <aside className="w-64 h-screen bg-zinc-950 border-r border-white/10 flex flex-col fixed left-0 top-0 z-40">
      
      {/* Logo Area */}
      <div className="h-20 flex items-center px-6 border-b border-white/5">
        <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white text-zinc-950 rounded-full flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <span className="text-white font-bold tracking-tight text-lg">ArchiVision</span>
        </Link>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        <p className="px-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
            Menu
        </p>
        
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                ${isActive 
                  ? 'bg-white text-black shadow-lg shadow-white/5' 
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }
              `}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* FOOTER: User Profile & Sign Out */}
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-2">
            {/* Profil Link */}
            <Link 
                href="/profile"
                className="flex-1 flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-all group overflow-hidden"
            >
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10 group-hover:border-white/50 transition-colors flex-shrink-0">
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

            {/* Buton Mic de Logout */}
            <button 
                onClick={() => signOut({ redirectUrl: '/' })}
                className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                title="Sign Out"
            >
                <LogOut size={18} />
            </button>
        </div>
      </div>
    </aside>
  );
}