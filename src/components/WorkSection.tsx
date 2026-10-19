import React from 'react';
import { ArrowUpRight, Globe, ExternalLink, Sparkles } from 'lucide-react';
import { ARCHIVE_PROJECTS } from '../data/streams';
import { ProjectShowcase } from '../types/video';

interface WorkSectionProps {
  onSelectProject: (title: string) => void;
  onOpenFullArchive: () => void;
}

export const WorkSection: React.FC<WorkSectionProps> = ({
  onSelectProject,
  onOpenFullArchive,
}) => {
  return (
    <section id="work" className="relative z-10 w-full scroll-mt-20 py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-400 uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
              <span className="text-sky-400 font-semibold">Selected Portfolio</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span className="text-orange-400 font-semibold">USA &amp; Canada Case Studies</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.05]">
              Websites That Make<br />Businesses{' '}
              <span className="bg-gradient-to-r from-sky-400 via-sky-300 to-orange-400 bg-clip-text text-transparent">
                Stand Out.
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-300 max-w-md font-normal leading-relaxed">
            We create digital experiences for businesses across different industries — designed to capture attention, build trust, and drive real business growth.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {ARCHIVE_PROJECTS.map((project: ProjectShowcase) => (
            <div
              key={project.id}
              className="group bg-neutral-950/80 hover:bg-neutral-900/90 border border-white/10 hover:border-white/30 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl hover:-translate-y-1"
            >
              {/* Browser Window Mockup Chrome */}
              <div className="bg-neutral-900/90 px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="px-3 py-0.5 rounded bg-black/50 border border-white/10 text-[10px] font-mono text-neutral-400 truncate max-w-[180px]">
                  https://{project.title.toLowerCase().replace(/[^a-z0-9]/g, '')}.com
                </div>
                <span className="text-[10px] font-mono text-neutral-500">{project.year}</span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-sky-300 font-semibold uppercase tracking-wider">{project.client}</span>
                    <span className="text-slate-400">{project.location.split('·')[0].trim()}</span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-sky-300 transition-colors mb-2">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal mb-5">
                    {project.summary}
                  </p>

                  {/* Highlights & Metrics */}
                  <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 space-y-1 mb-4">
                    <div className="text-[10px] font-mono text-sky-300 uppercase font-semibold">Impact Metric</div>
                    <div className="text-xs font-bold text-sky-400">{project.outcome}</div>
                  </div>

                  {project.deliverables && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.deliverables.map((item, i) => (
                        <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-sky-300">{project.client}</span>
                  <button
                    onClick={() => onSelectProject(project.title)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors cursor-pointer"
                  >
                    <span>Start Similar Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenFullArchive}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 rounded-xl transition-all cursor-pointer shadow-lg shadow-orange-500/25 border border-orange-400/30"
          >
            <span>Explore All Client Work</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
