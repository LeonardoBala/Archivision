'use client';

import React, { useState } from 'react';
import { Check, Minus, HelpCircle, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { subscribeToPlan } from '@/actions/subscriptions';

const comparisonData = [
  {
    category: "Core Features",
    rows: [
      { name: "Render Engine", starter: "Standard", pro: "Ultra-HD", agency: "Ultra-HD + Raytracing" },
      { name: "Monthly Renders", starter: "50", pro: "Unlimited", agency: "Unlimited" },
      { name: "Processing Speed", starter: "Standard", pro: "Fast", agency: "Turbo" },
    ]
  },
  {
    category: "Project Tools",
    rows: [
      { name: "Floor Plan Conversion", starter: false, pro: true, agency: true },
      { name: "3D Walkthrough", starter: false, pro: true, agency: true },
      { name: "Furniture Replacement", starter: true, pro: true, agency: true },
      { name: "Video Export", starter: false, pro: "4K", agency: "8K" },
    ]
  },
  {
    category: "Workflow & Team",
    rows: [
      { name: "Project History", starter: "7 Days", pro: "Unlimited", agency: "Unlimited" },
      { name: "Team Seats", starter: "1", pro: "1", agency: "5+" },
      { name: "API Access", starter: false, pro: false, agency: true },
      { name: "White-label Reports", starter: false, pro: true, agency: true },
    ]
  }
];

const ComparisonTable = () => {
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

    if (currentPlan !== 'FREE') {
      router.push('/profile/settings?tab=billing');
      return;
    }

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
    <>
      <div className="w-full overflow-x-auto mb-16">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10">
              <th className="py-6 px-4 text-sm font-medium text-white min-w-[200px]">Features</th>
              <th className="py-6 px-4 text-sm font-medium text-zinc-400 text-center min-w-[150px]">Starter</th>
              <th className="py-6 px-4 text-sm font-bold text-white text-center min-w-[150px]">Professional</th>
              <th className="py-6 px-4 text-sm font-medium text-zinc-400 text-center min-w-[150px]">Agency</th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((section, idx) => (
              <React.Fragment key={idx}>
                {/* Category Header */}
                <tr>
                  <td colSpan={4} className="py-6 px-4 text-xs font-semibold tracking-wider text-zinc-500 uppercase bg-zinc-900/20">
                    {section.category}
                  </td>
                </tr>
                {/* Rows */}
                {section.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 text-sm text-zinc-300 flex items-center gap-2">
                      {row.name}
                      <HelpCircle className="w-3 h-3 text-zinc-600 cursor-help" />
                    </td>
                    
                    {/* Starter Cell */}
                    <td className="py-4 px-4 text-center">
                      <CellContent value={row.starter} />
                    </td>
                    
                    {/* Pro Cell */}
                    <td className="py-4 px-4 text-center bg-white/[0.02]">
                      <CellContent value={row.pro} highlight />
                    </td>
                    
                    {/* Agency Cell */}
                    <td className="py-4 px-4 text-center">
                      <CellContent value={row.agency} />
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
          {/* Table Footer Buttons (Acum funcționale!) */}
          <tfoot>
              <tr>
                  <td className="py-8"></td>
                  
                  {/* Buton Starter */}
                  <td className="py-8 px-4 text-center">
                      <button 
                        onClick={() => handlePlanAction('FREE')}
                        disabled={currentPlan === 'FREE'}
                        className={`text-sm font-medium transition-colors ${
                          currentPlan === 'FREE' ? 'text-zinc-600 cursor-not-allowed' : 'text-zinc-400 hover:text-white hover:underline'
                        }`}
                      >
                        {currentPlan === 'FREE' ? 'Current Plan' : 'Downgrade'}
                      </button>
                  </td>

                  {/* Buton PRO */}
                  <td className="py-8 px-4 text-center">
                      <button 
                        onClick={() => handlePlanAction('PRO')}
                        disabled={currentPlan === 'PRO'}
                        className={`w-full py-2 rounded-lg text-sm font-bold shadow-lg transition-all ${
                          currentPlan === 'PRO' 
                            ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed shadow-none'
                            : 'bg-white text-zinc-950 hover:bg-zinc-200'
                        }`}
                      >
                        {currentPlan === 'PRO' ? 'Current Plan' : (currentPlan !== 'FREE' ? 'Manage' : 'Upgrade')}
                      </button>
                  </td>

                  {/* Buton Agency */}
                  <td className="py-8 px-4 text-center">
                       <button 
                        onClick={() => handlePlanAction('AGENCY')}
                        disabled={currentPlan === 'AGENCY'}
                        className={`w-full py-2 rounded-lg border text-sm font-medium transition-all ${
                          currentPlan === 'AGENCY'
                            ? 'border-zinc-800 text-zinc-600 cursor-not-allowed'
                            : 'border-white/10 text-white hover:bg-white/5'
                        }`}
                       >
                         {currentPlan === 'AGENCY' ? 'Current Plan' : 'Upgrade'}
                       </button>
                  </td>
              </tr>
          </tfoot>
        </table>
      </div>

      {/* MODALUL DE CONFIRMARE (Exact ca pe PricingCards) */}
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
              <div className="flex justify-between items-center">
                <span className="text-zinc-500 text-sm">Valid Until:</span>
                <span className="text-white text-sm">
                  {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </span>
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
    </>
  );
};

// Helper mic pentru a randa Checkmarks sau Text
const CellContent = ({ value, highlight }: { value: string | boolean; highlight?: boolean }) => {
  if (value === true) {
    return (
      <div className="flex justify-center">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${highlight ? 'bg-white text-black' : 'bg-zinc-800 text-white'}`}>
          <Check className="w-3.5 h-3.5" />
        </div>
      </div>
    );
  }
  if (value === false) {
    return (
      <div className="flex justify-center">
        <Minus className="w-4 h-4 text-zinc-700" />
      </div>
    );
  }
  return <span className={`text-sm ${highlight ? 'text-white font-medium' : 'text-zinc-400'}`}>{value}</span>;
};

export default ComparisonTable;