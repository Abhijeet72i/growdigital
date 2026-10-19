import React from 'react';
import { X, ArrowUpRight, CheckCircle2, Globe, Sparkles } from 'lucide-react';
import { ARCHIVE_PROJECTS } from '../data/streams';
import { ProjectShowcase } from '../types/video';

interface ShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProjectForInquiry: (projectTitle: string) => void;
}

export const ShowcaseModal: React.FC<ShowcaseModalProps> = ({
  isOpen,
  onClose,
  onSelectProjectForInquiry,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-5xl max-h-[92vh] glass-panel rounded-2xl border border-white/15 overflow-hidden flex flex-col shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-400 uppercase">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
              <span className="text-sky-400 font-semibold">GrowDigital Portfolio</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span className="text-orange-400 font-semibold">Selected Client Case Studies</span>
            </div>
            <h2 className="font-display text-2xl font-extrabold text-white mt-1">
              Websites That Make Businesses{' '}
              <span className="bg-gradient-to-r from-sky-400 to-orange-400 bg-clip-text text-transparent">
                Stand Out.
              </span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close portfolio modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Project Grid */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ARCHIVE_PROJECTS.map((project: ProjectShowcase) => (
              <div
                key={project.id}
                className="bg-neutral-900/80 border border-white/10 rounded-xl p-5 flex flex-col justify-between hover:border-sky-500/40 transition-all group relative overflow-hidden"
              >
                {/* Subtle top accent gradient */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 opacity-70"
                  style={{ backgroundColor: project.accentColor }}
                />

                <div>
                  {/* Clean unboxed metadata */}
                  <div className="flex items-center justify-between text-xs text-neutral-400 font-mono mb-2">
                    <span className="text-sky-300 font-semibold">{project.client}</span>
                    <span className="text-slate-400">{project.location}</span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed font-normal">
                    {project.summary}
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/10 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-mono">Platform:</span>
                      <span className="text-slate-200 font-medium truncate max-w-[160px]">{project.medium}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-mono">Key Metric:</span>
                      <span className="text-sky-400 font-semibold">{project.outcome}</span>
                    </div>
                  </div>

                  {project.deliverables && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.deliverables.slice(0, 3).map((d, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10 font-mono">
                          {d}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-sky-300">
                    {project.client}
                  </span>
                  <button
                    onClick={() => {
                      onSelectProjectForInquiry(project.title);
                      onClose();
                    }}
                    className="flex items-center gap-1 text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors cursor-pointer"
                  >
                    <span>Inquire</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Banner */}
          <div className="bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-950 border border-white/10 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
            <div>
              <h4 className="text-sm font-semibold text-white">
                Need a Custom Website Built for Your Industry?
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                We build tailor-made digital experiences for businesses across the USA and Canada.
              </p>
            </div>
            <button
              onClick={() => {
                onSelectProjectForInquiry('Custom Website Inquiry');
                onClose();
              }}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 rounded-xl transition-all whitespace-nowrap cursor-pointer shadow-lg shadow-orange-500/25 border border-orange-400/30"
            >
              Get Free Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
