'use client';

import { useState } from 'react';
import { Sparkles, X, CreditCard } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { subscribeToPlan } from '@/actions/subscriptions';

const PricingCards = ({ billingCycle }: { billingCycle: 'monthly' | 'yearly' }) => {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [selectedPlanToConfirm, setSelectedPlanToConfirm] = useState<string | null>(null);
  
  const router = useRouter();
  const { user } = useUser();

  const currentPlan = (user?.publicMetadata?.plan as string) || 'FREE';

  const handlePlanAction = (planName: string) => {
    if (!user) {
      router.push('/sign-in');
      return;
    }
    
    if (currentPlan === planName) return;

    // Dacă are deja un plan plătit, orice modificare îl trimite DIRECT în tab-ul de Billing
    if (currentPlan !== 'FREE') {
      router.push('/profile/settings?tab=billing');
      return;
    }

    // Dacă e pe FREE și face upgrade, deschidem modalul aici
    setSelectedPlanToConfirm(planName);
  };

  const confirmSubscription = async () => {
    if (!selectedPlanToConfirm) return;
    
    setLoadingPlan(selectedPlanToConfirm);
    
    try {
      const res = await subscribeToPlan(selectedPlanToConfirm);
      
      if (res.success) {
        await user?.reload();
        setSelectedPlanToConfirm(null); 
      } else {
        alert("Eroare la procesarea subscripției: " + res.error);
      }
    } catch (error) {
      console.error("Eroare:", error);
      alert("A apărut o eroare neașteptată.");
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="relative">
      
      {/* --- MANAGMENT BUTTON GLOBAL --- */}
      {currentPlan !== 'FREE' && (
        <div className="flex justify-end mb-4 pr-2">
           <button 
             onClick={() => router.push('/profile/settings?tab=billing')} 
             className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-white/10 rounded-full text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
           >
             <CreditCard className="w-4 h-4" /> Manage Subscription
           </button>
        </div>
      )}

      {/* --- GRIDUL CU CARDURI --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        
        {/* --- STARTER (FREE) --- */}
        <div className="p-8 rounded-3xl border border-white/5 bg-zinc-900/30 flex flex-col hover:border-white/10 transition-all">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-zinc-300 mb-2">Starter</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-medium text-white">$0</span>
              <span className="text-zinc-500">/mo</span>
            </div>
            <p className="text-sm text-zinc-500 mt-4">Perfect for hobbyists.</p>
          </div>
          <button 
            onClick={() => handlePlanAction('FREE')}
            disabled={currentPlan === 'FREE'}
            className={`mt-auto w-full py-3 rounded-xl font-medium transition-colors disabled:opacity-50 ${
              currentPlan === 'FREE' 
                ? 'bg-zinc-800 text-zinc-500 border border-zinc-700 cursor-not-allowed' 
                : 'border border-white/10 text-white hover:bg-white/5'
            }`}
          >
            {currentPlan === 'FREE' ? 'Current Plan' : 'Downgrade to Free'}
          </button>
        </div>

        {/* --- PROFESSIONAL (PRO) --- */}
        <div className="relative p-8 rounded-3xl border border-white/40 bg-zinc-900 flex flex-col shadow-[0_0_60px_rgba(255,255,255,0.08)] transform md:-translate-y-4">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-zinc-950 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-lg shadow-white/20">
            <Sparkles className="w-3 h-3 fill-zinc-950" /> Most Popular
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-medium text-white mb-2">Professional</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-medium text-white">
                  {billingCycle === 'monthly' ? '$29' : '$24'}
              </span>
              <span className="text-zinc-500">/mo</span>
            </div>
            <p className="text-sm text-zinc-400 mt-4">For freelance designers.</p>
          </div>
          <button 
            onClick={() => handlePlanAction('PRO')}
            disabled={currentPlan === 'PRO'}
            className={`mt-auto w-full py-3 rounded-xl font-bold transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:opacity-80 ${
              currentPlan === 'PRO'
                ? 'bg-emerald-500 text-zinc-950 cursor-not-allowed shadow-none'
                : 'bg-white text-zinc-950 hover:bg-zinc-200'
            }`}
          >
            {currentPlan === 'PRO' 
              ? 'Current Plan' 
              : (currentPlan === 'AGENCY' ? 'Downgrade to Pro' : 'Upgrade to Pro')
            }
          </button>
        </div>

        {/* --- AGENCY --- */}
        <div className="p-8 rounded-3xl border border-white/5 bg-zinc-900/30 flex flex-col hover:border-white/10 transition-all">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-zinc-300 mb-2">Agency</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-medium text-white">
                  {billingCycle === 'monthly' ? '$99' : '$79'}
              </span>
              <span className="text-zinc-500">/mo</span>
            </div>
            <p className="text-sm text-zinc-500 mt-4">For firms & teams.</p>
          </div>
          <button 
            onClick={() => handlePlanAction('AGENCY')}
            disabled={currentPlan === 'AGENCY'}
            className={`mt-auto w-full py-3 rounded-xl font-medium transition-colors disabled:opacity-50 ${
              currentPlan === 'AGENCY'
                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50 cursor-not-allowed'
                : 'border border-white/10 text-white hover:bg-white/5'
            }`}
          >
             {currentPlan === 'AGENCY' 
                ? 'Current Plan' 
                : 'Upgrade to Agency'
             }
          </button>
        </div>
      </div>

      {/* MODALUL DE CONFIRMARE */}
      {selectedPlanToConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => loadingPlan ? null : setSelectedPlanToConfirm(null)}
          ></div>
          
          <div className="relative bg-zinc-900 border border-white/10 p-6 md:p-8 rounded-3xl max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setSelectedPlanToConfirm(null)}
              disabled={loadingPlan !== null}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-medium text-white mb-2">Confirm Subscription</h3>
            <p className="text-sm text-zinc-400 mb-6">
              You are about to upgrade your plan to <strong className="text-white">{selectedPlanToConfirm}</strong>. 
            </p>

            <div className="bg-zinc-950 border border-white/5 rounded-2xl p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-zinc-500 text-sm">New Plan:</span>
                <span className={`text-sm font-bold uppercase tracking-wider ${
                  selectedPlanToConfirm === 'PRO' ? 'text-emerald-400' : 'text-purple-400'
                }`}>
                  {selectedPlanToConfirm}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-zinc-500 text-sm">Duration:</span>
                <span className="text-white text-sm">30 Days ({billingCycle})</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setSelectedPlanToConfirm(null)}
                disabled={loadingPlan !== null}
                className="flex-1 py-3 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                onClick={confirmSubscription}
                disabled={loadingPlan !== null}
                className="flex-1 py-3 rounded-xl bg-white text-zinc-950 font-medium hover:bg-zinc-200 transition-colors disabled:opacity-80"
              >
                {loadingPlan ? 'Processing...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingCards;