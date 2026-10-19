import React from 'react';
import { WHY_US_HIGHLIGHTS, TARGET_CUSTOMERS } from '../data/streams';
import { Check, ShieldCheck, Zap, Globe, HeartHandshake } from 'lucide-react';

export const WhyUsSection: React.FC = () => {
  return (
    <section id="about" className="relative z-10 w-full scroll-mt-20 py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-400 uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
            <span className="text-sky-400 font-semibold">Why GrowDigital</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="text-orange-400 font-semibold">The Agency Difference</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.05] mb-6">
            More Than Just A Website —{' '}
            <span className="bg-gradient-to-r from-sky-400 via-sky-300 to-orange-400 bg-clip-text text-transparent">
              A Digital Choice.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed">
            Your website is often the first interaction customers have with your business. We create digital experiences that make that first impression count.
          </p>
        </div>

        {/* 6 Key Pillars Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {WHY_US_HIGHLIGHTS.map((item, idx) => (
            <div
              key={idx}
              className="bg-neutral-950 border border-white/10 hover:border-sky-500/30 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 shadow-xl group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[11px] font-mono text-orange-400 font-semibold">
                  {item.stat}
                </span>
                <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Target Customers Sectors Cloud */}
        <div className="p-8 sm:p-10 rounded-2xl bg-neutral-900/60 border border-white/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <div>
              <span className="text-xs font-mono text-sky-400 uppercase tracking-wider block mb-1 font-semibold">
                Our Target Customers
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                Engineered for Ambitious Businesses Across Industries
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-sky-300 bg-sky-500/10 border border-sky-500/25 px-3 py-1.5 rounded-lg whitespace-nowrap font-semibold">
              <Globe className="w-4 h-4 text-orange-400" />
              <span>Serving USA 🇺🇸 &amp; Canada 🇨🇦</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 pt-2">
            {TARGET_CUSTOMERS.map((customer, idx) => (
              <div
                key={idx}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/30 text-xs sm:text-sm font-medium text-slate-200 transition-all flex items-center gap-2"
              >
                <Check className="w-3.5 h-3.5 text-orange-400" />
                <span>{customer}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
            <p>
              "Designed for your brand. Built for your customers. Modern websites built for growth."
            </p>
            <span className="font-mono text-slate-400 shrink-0">
              <span className="text-sky-400 font-semibold">Mentor</span><span className="text-orange-400 font-bold">Ex</span> Digital · Est. 2026
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
