import React from 'react';
import { growdigital_PROCESS } from '../data/streams';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface ProcessSectionProps {
  onStartProject: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onStartProject }) => {
  return (
    <section id="process" className="relative z-10 w-full scroll-mt-20 py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-neutral-950/95 border-t border-white/10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-400 uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
              <span className="text-sky-400 font-semibold">Tested Execution Framework</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span className="text-orange-400 font-semibold">5-Stage Delivery</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.05]">
              From Idea To{' '}
              <span className="bg-gradient-to-r from-sky-400 via-sky-300 to-orange-400 bg-clip-text text-transparent">
                Launch.
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-300 max-w-md font-normal leading-relaxed">
            A transparent, collaborative workflow engineered to eliminate delays, guarantee design excellence, and get your business online on schedule.
          </p>
        </div>

        {/* 5-Step Process Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {growdigital_PROCESS.map((step, idx) => (
            <div
              key={step.number}
              className="relative bg-neutral-900/60 border border-white/10 hover:border-sky-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xl sm:text-2xl font-bold text-orange-400 group-hover:scale-110 transition-transform block">
                    {step.number}
                  </span>
                  <span className="text-[10px] font-mono text-sky-400 uppercase tracking-widest font-semibold">
                    Step {idx + 1}/5
                  </span>
                </div>

                <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal mb-4">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 text-xs text-slate-400 leading-relaxed font-normal">
                {step.details}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Bar */}
        <div className="mt-14 p-8 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-950 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
              Ready to take your business{' '}
              <span className="bg-gradient-to-r from-sky-400 to-orange-400 bg-clip-text text-transparent">
                from idea to launch?
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 font-normal">
              Get an accurate timeline and proposal customized for your specific business goals.
            </p>
          </div>
          <button
            onClick={onStartProject}
            className="flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-lg shadow-orange-500/25 border border-orange-400/30"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
