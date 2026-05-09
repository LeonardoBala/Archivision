'use client';

import { useState, useEffect } from 'react';
import { useUser, useClerk } from '@clerk/nextjs';
import Link from 'next/link';
import { 
  User, 
  Settings, 
  Lock, 
  CreditCard, 
  Bell, 
  Save,
  Loader2,
  ExternalLink,
  AlertTriangle,
  X
} from 'lucide-react';
import Navbar from '@/components/homeComponents/Navbar';
import { syncUser, updateProfile } from '@/actions/UserSettings/userActions';
import { subscribeToPlan } from '@/actions/subscriptions';

export default function SettingsPage() {
  const { user: clerkUser, isLoaded } = useUser();
  const { openUserProfile } = useClerk();
  const [activeTab, setActiveTab] = useState('general');

  // Citim parametrul 'tab' din URL (ex: ?tab=billing) pentru a deschide direct secțiunea corectă
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false); 
  const [showCancelModal, setShowCancelModal] = useState(false); // State nou pentru Modal

  // Extragem planul curent (Dacă nu e, e FREE)
  const currentPlan = (clerkUser?.publicMetadata?.plan as string) || 'FREE';

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    bio: '',
    website: ''
  });

  // 1. Load Data
  useEffect(() => {
    const loadUserData = async () => {
      if (!clerkUser) return;
      
      const dbUser = await syncUser();
      
      if (dbUser) {
        setFormData({
          firstName: dbUser.firstName || '',
          lastName: dbUser.lastName || '',
          username: clerkUser.username || '', 
          email: dbUser.email || '',
          bio: dbUser.bio || '',
          website: dbUser.website || ''
        });
      }
    };

    if (isLoaded) loadUserData();
  }, [isLoaded, clerkUser]);

  // 2. Handle Save Profile
  const handleSave = async () => {
    setIsLoading(true);
    try {
      await updateProfile(formData);
      // Aici poți folosi și un toast notification în loc de alert în viitor
    } catch (error) {
      console.error(error);
      alert("Failed to update profile.");
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Execută anularea subscripției (Apelată din Modal)
  const confirmCancellation = async () => {
    setIsCancelling(true);
    try {
      const res = await subscribeToPlan('FREE'); // Trece pe planul FREE în DB și Clerk
      if (res.success) {
        await clerkUser?.reload(); // Re-citi metadata ca UI-ul să se actualizeze
        setShowCancelModal(false); // Închidem modalul
      } else {
        alert("Error cancelling subscription: " + res.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred.");
    } finally {
      setIsCancelling(false);
    }
  };

  if (!isLoaded) return <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-white/20">
      
      <Navbar />

      <main className="pt-24 md:pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8 md:mb-12 flex items-center gap-4">
            <div className="h-12 w-12 md:h-16 md:w-16 rounded-full overflow-hidden border-2 border-white/10 shadow-2xl flex-shrink-0">
                <img 
                    src={clerkUser?.imageUrl} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                />
            </div>
            <div>
                <h1 className="text-xl md:text-3xl font-bold tracking-tight text-white">
                    {formData.firstName || 'User'} / <span className="text-zinc-500 capitalize">{activeTab}</span>
                </h1>
                <p className="text-zinc-500 mt-1">Manage your account settings and preferences.</p>
            </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-12">

            {/* --- SIDEBAR NAVIGATION --- */}
            <aside className="w-full md:w-64 flex-shrink-0">
                <nav className="flex flex-wrap md:flex-nowrap md:flex-col gap-2 pb-2 md:pb-0">
                    <SidebarItem 
                        icon={<User size={18} />} 
                        label="General" 
                        active={activeTab === 'general'} 
                        onClick={() => setActiveTab('general')}
                    />
                    <SidebarItem 
                        icon={<Lock size={18} />} 
                        label="Password" 
                        active={activeTab === 'password'} 
                        onClick={() => setActiveTab('password')}
                    />
                    <SidebarItem 
                        icon={<CreditCard size={18} />} 
                        label="Billing" 
                        active={activeTab === 'billing'} 
                        onClick={() => setActiveTab('billing')}
                    />
                    <SidebarItem 
                        icon={<Bell size={18} />} 
                        label="Notifications" 
                        active={activeTab === 'notifications'} 
                        onClick={() => setActiveTab('notifications')}
                    />
                    <SidebarItem 
                        icon={<Settings size={18} />} 
                        label="Preferences" 
                        active={activeTab === 'preferences'} 
                        onClick={() => setActiveTab('preferences')}
                    />
                </nav>
            </aside>

            {/* --- DYNAMIC CONTENT AREA --- */}
            <div className="flex-1 max-w-3xl">
                
                {/* 1. GENERAL TAB */}
                {activeTab === 'general' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Profile Picture */}
                        <div className="p-6 rounded-2xl border border-white/5 bg-zinc-900/30">
                            <label className="block text-sm font-medium text-white mb-4">Profile Picture</label>
                            <div className="flex items-center gap-6">
                                <div className="relative w-24 h-24 rounded-full overflow-hidden border border-white/10 group cursor-pointer">
                                    <img src={clerkUser?.imageUrl} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <button 
                                        onClick={() => openUserProfile()} 
                                        className="px-4 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-zinc-200 transition-colors"
                                    >
                                        Change Avatar
                                    </button>
                                    <p className="text-xs text-zinc-500">Managed by Clerk Auth</p>
                                </div>
                            </div>
                        </div>

                        {/* Personal Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputGroup 
                                label="First Name" 
                                value={formData.firstName} 
                                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                            />
                            <InputGroup 
                                label="Last Name" 
                                value={formData.lastName} 
                                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                            />
                        </div>

                        <InputGroup 
                            label="Website / Portfolio" 
                            value={formData.website} 
                            onChange={(e) => setFormData({...formData, website: e.target.value})}
                            prefix="https://"
                        />

                        <InputGroup 
                            label="Account Email" 
                            value={formData.email} 
                            onChange={() => {}} 
                            disabled
                            helperText="Contact support to change your email address."
                        />

                        {/* Bio */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-zinc-300 ml-1">Bio / Description</label>
                            <textarea 
                                rows={5}
                                value={formData.bio}
                                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                                className="w-full bg-zinc-950/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all resize-none"
                                placeholder="Tell us a little bit about yourself..."
                            />
                        </div>

                        {/* Save Button */}
                        <div className="pt-6 border-t border-white/5 flex items-center justify-end">
                            <button 
                                onClick={handleSave}
                                disabled={isLoading}
                                className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-zinc-200 active:scale-95 transition-all disabled:opacity-50"
                            >
                                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                Save Changes
                            </button>
                        </div>
                    </div>
                )}

                {/* 2. PASSWORD TAB */}
                {activeTab === 'password' && (
                     <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="p-8 rounded-3xl border border-white/10 bg-zinc-900/30 text-center">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Lock className="w-8 h-8 text-zinc-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Security & Password</h3>
                            <p className="text-zinc-400 mb-6 max-w-md mx-auto">
                                For your security, we use a secure authentication provider. You can update your password and security settings there.
                            </p>
                            <button 
                                onClick={() => openUserProfile()}
                                className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-zinc-200 transition-colors"
                            >
                                Open Security Settings <ExternalLink className="w-4 h-4" />
                            </button>
                        </div>
                     </div>
                )}

                {/* 3. BILLING TAB */}
                {activeTab === 'billing' && (
                     <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="p-8 rounded-3xl border border-white/10 bg-zinc-900/30">
                            <h3 className="text-xl font-bold mb-4">Current Subscription</h3>
                            
                            {/* Cardul cu Planul Curent */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-zinc-950 rounded-xl border border-white/10 gap-4">
                                <div>
                                    <p className="font-bold text-xl uppercase tracking-wider mb-1">
                                      {currentPlan === 'FREE' ? 'Starter Plan' : `${currentPlan} PLAN`}
                                    </p>
                                    <p className="text-zinc-400 text-sm">
                                      {currentPlan === 'FREE' 
                                        ? '3 Renders per day. Standard resolution.'
                                        : currentPlan === 'PRO'
                                        ? 'Unlimited Renders. 4K Ultra-HD. Commercial License.'
                                        : 'Unlimited everything. Team features. API Access.'
                                      }
                                    </p>
                                </div>
                                <span className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full border ${
                                  currentPlan === 'FREE' ? 'bg-zinc-800 text-zinc-300 border-zinc-700' :
                                  currentPlan === 'PRO' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                  'bg-purple-500/10 text-purple-400 border-purple-500/20'
                                }`}>
                                   {currentPlan === 'FREE' ? 'Basic' : 'Active'}
                                </span>
                            </div>

                            {/* Detalii Adiționale */}
                            {currentPlan !== 'FREE' && (
                                <div className="mt-4 px-2 flex justify-between items-center text-sm text-zinc-400">
                                  <span>Next billing cycle:</span>
                                  <span className="text-white font-medium">
                                    {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                                  </span>
                                </div>
                            )}

                            {/* Acțiuni (Upgrade / Cancel) */}
                            <div className="mt-8 pt-6 border-t border-white/5 space-y-4">
                                
                                {currentPlan === 'FREE' ? (
                                   <>
                                     <p className="text-zinc-400 text-sm mb-4">Want to unlock more features and higher resolutions?</p>
                                     <Link href="/pricing" className="block w-full py-3 rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 transition-all font-bold text-sm text-center shadow-lg shadow-white/5">
                                         Upgrade Plan
                                     </Link>
                                   </>
                                ) : (
                                   <div className="flex flex-col gap-4">
                                      <Link href="/pricing" className="w-full py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-all font-medium text-sm text-center">
                                         Change Plan
                                      </Link>
                                      {/* Aici deschidem Modal-ul custom în loc de alert */}
                                      <button 
                                        onClick={() => setShowCancelModal(true)}
                                        className="flex justify-center items-center gap-2 w-full py-3 rounded-xl bg-transparent border border-white/5 text-zinc-500 hover:text-red-400 hover:border-red-500/20 hover:bg-red-500/10 transition-all font-medium text-sm"
                                      >
                                         <AlertTriangle className="w-4 h-4" />
                                         Cancel Subscription
                                      </button>
                                   </div>
                                )}
                            </div>
                        </div>
                     </div>
                )}

                 {/* 4. OTHER TABS */}
                 {(activeTab === 'notifications' || activeTab === 'preferences') && (
                     <div className="p-12 rounded-3xl border border-dashed border-zinc-800 text-center text-zinc-500 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        Coming soon in the next update.
                     </div>
                )}

            </div>
        </div>
      </main>

      {/* ========================================= */}
      {/* CUSTOM CANCEL CONFIRMATION MODAL */}
      {/* ========================================= */}
      {showCancelModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          
          {/* Overlay Întunecat cu Blur */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => isCancelling ? null : setShowCancelModal(false)}
          ></div>
          
          {/* Fereastra Modal */}
          <div className="relative bg-zinc-900 border border-white/10 p-6 md:p-8 rounded-3xl max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200">
            
            <button 
              onClick={() => setShowCancelModal(false)}
              disabled={isCancelling}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>

            <h3 className="text-xl font-medium text-white mb-2">
              Cancel Subscription?
            </h3>
            
            <p className="text-sm text-zinc-400 mb-6">
              You are about to downgrade to the <strong className="text-white">Free Plan</strong>. You will immediately lose access to 4K renders, unlimited generations, and premium features.
            </p>

            <div className="flex flex-col gap-3">
              <button 
                onClick={confirmCancellation}
                disabled={isCancelling}
                className="w-full py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-medium hover:bg-red-500/20 transition-colors disabled:opacity-50 flex justify-center items-center"
              >
                {isCancelling ? (
                   <span className="flex items-center gap-2">
                     <Loader2 className="w-4 h-4 animate-spin" /> Cancelling...
                   </span>
                ) : 'Yes, Cancel Subscription'}
              </button>
              
              <button 
                onClick={() => setShowCancelModal(false)}
                disabled={isCancelling}
                className="w-full py-3 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-colors disabled:opacity-50"
              >
                Keep my Plan
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

// --- HELPER COMPONENTS ---

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

function SidebarItem({ icon, label, active = false, onClick }: SidebarItemProps) {
    return (
        <button
            onClick={onClick}
            className={`
            flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all w-auto md:w-full flex-shrink-0 whitespace-nowrap text-left
            ${active
                ? 'bg-white text-black shadow-lg shadow-white/5'
                : 'text-zinc-500 hover:text-white hover:bg-white/5'
            }
        `}>
            {icon}
            {label}
        </button>
    )
}

interface InputGroupProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  prefix?: string;
  helperText?: string;
}

function InputGroup({ label, value, onChange, disabled = false, prefix, helperText }: InputGroupProps) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-300 ml-1">{label}</label>
            <div className={`
                flex items-center w-full bg-zinc-950/50 border border-white/10 rounded-xl overflow-hidden transition-all
                ${!disabled && 'focus-within:border-white/20 focus-within:ring-1 focus-within:ring-white/20'}
                ${disabled && 'opacity-60 cursor-not-allowed'}
            `}>
                {prefix && (
                    <div className="pl-4 pr-2 text-zinc-500 text-sm select-none bg-white/5 h-full py-3 border-r border-white/5">
                        {prefix}
                    </div>
                )}
                <input 
                    type="text" 
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className="w-full bg-transparent px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none"
                />
            </div>
            {helperText && <p className="text-xs text-zinc-500 px-1">{helperText}</p>}
        </div>
    )
}