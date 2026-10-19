import React from 'react';
import { X, ArrowUpRight, CheckCircle2, ShieldCheck, Zap, Globe, Sparkles } from 'lucide-react';
import { growdigital_PROCESS, TARGET_CUSTOMERS, WHY_US_HIGHLIGHTS } from '../data/streams';

interface InfoDrawerProps {
  type: 'studio' | 'journal' | 'about' | 'process' | null;
  onClose: () => void;
  onOpenCommission: () => void;
}

export const InfoDrawer: React.FC<InfoDrawerProps> = ({
  type,
  onClose,
  onOpenCommission,
}) => {
  if (!type) return null;

  const isProcess = type === 'process';

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="w-full max-w-xl h-full glass-panel border-l border-white/15 overflow-y-auto flex flex-col p-6 sm:p-8 animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div>
            <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
              {isProcess ? 'Our Working Methodology' : 'About GrowDigital'}
            </span>
            <h2 className="font-display text-2xl font-bold text-white mt-1">
              {isProcess ? 'From Idea To Launch.' : 'Websites Built For Growth.'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-6 space-y-6 flex-1 text-sm text-neutral-300 leading-relaxed font-normal">
          {isProcess ? (
            <>
              <p className="text-sm text-neutral-300">
                Every project follows a tested, transparent five-phase delivery model engineered to get your business online on schedule without technical friction.
              </p>

              <div className="space-y-4 pt-2">
                {growdigital_PROCESS.map((step) => (
                  <div key={step.number} className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-1.5 hover:border-sky-500/30 transition-all">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-orange-400">{step.number}</span>
                      <h3 className="font-display text-base font-semibold text-white">{step.title}</h3>
                    </div>
                    <p className="text-xs font-medium text-slate-200">{step.description}</p>
                    <p className="text-xs text-slate-400 leading-relaxed pt-1">{step.details}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    onClose();
                    onOpenCommission();
                  }}
                  className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange-500/25 border border-orange-400/30"
                >
                  <span>Start Your Project →</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          ) : (
            <>
              <div>
                <h3 className="font-display text-lg font-bold text-white mb-2">
                  More Than Just A Website —{' '}
                  <span className="bg-gradient-to-r from-sky-400 to-orange-400 bg-clip-text text-transparent">
                    A Digital Choice.
                  </span>
                </h3>
                <p className="text-slate-300">
                  Your website is often the first interaction customers have with your business. We create digital experiences that make that first impression count.
                </p>
                <p className="mt-2 text-xs text-slate-400">
                  <span className="text-sky-400 font-semibold">Mentor</span><span className="text-orange-400 font-bold">Ex</span> Digital designs and develops modern, high-performance websites for businesses across the USA and Canada.
                </p>
              </div>

              <div className="pt-2 border-t border-white/10">
                <h4 className="text-xs font-mono text-sky-400 uppercase tracking-wider mb-3 font-semibold">
                  Who We Build For
                </h4>
                <div className="flex flex-wrap gap-2">
                  {TARGET_CUSTOMERS.map((target, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-white/5 border border-white/10 hover:border-orange-500/30 rounded-md text-xs text-slate-300 font-medium"
                    >
                      {target}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {WHY_US_HIGHLIGHTS.slice(0, 4).map((h, i) => (
                  <div key={i} className="p-3.5 bg-white/5 rounded-xl border border-white/10 hover:border-sky-500/30 transition-all">
                    <span className="text-[10px] font-mono text-orange-400 font-semibold block mb-0.5">{h.stat}</span>
                    <h5 className="font-display text-xs font-semibold text-white">{h.title}</h5>
                    <p className="text-[11px] text-slate-400 mt-1 leading-snug">{h.desc}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-sky-500/10 border border-sky-500/20 rounded-xl space-y-1">
                <div className="flex items-center gap-2 text-sky-300 font-semibold text-xs">
                  <Globe className="w-4 h-4 text-orange-400" />
                  <span>North American Focus</span>
                </div>
                <p className="text-xs text-slate-300">
                  Serving businesses across all 50 US States 🇺🇸 and Canadian Provinces 🇨🇦.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    onClose();
                    onOpenCommission();
                  }}
                  className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange-500/25 border border-orange-400/30"
                >
                  <span>Get A Free Quote →</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
