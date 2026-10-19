import React, { useRef, useState } from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { ARCHIVE_PROJECTS } from '../data/streams';
import { ProjectShowcase } from '../types/video';
import { ArrowUpRight } from 'lucide-react';

interface WorkPageProps {
  onNavigate: (page: string) => void;
  onSelectProject: (projectTitle: string) => void;
}

/*
 * Map your actual project demos to videos in /public/videos.
 * Add/change paths here whenever you add new project demos.
 */
const PROJECT_VIDEOS: Record<string, string> = {
  'proj-01': '/videos/t3.mp4',
  'proj-02': '/videos/t2.mp4',
  'proj-03': '/videos/t4.mp4',
  'proj-04': '/videos/t5.mp4',
  'proj-05': '/videos/t6.mp4',
  'proj-06': '/videos/t7.mp4',
};

interface ProjectCardProps {
  project: ProjectShowcase;
  onSelectProject: (projectTitle: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSelectProject,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isActive, setIsActive] = useState(false);

  const videoSrc = PROJECT_VIDEOS[project.id];

  const activatePreview = () => {
    setIsActive(true);

    if (videoRef.current) {
      videoRef.current.currentTime = 0;

      videoRef.current.play().catch(() => {
        // Browser may block playback until user interaction.
      });
    }
  };

  const deactivatePreview = () => {
    setIsActive(false);

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleCardClick = () => {
    /*
     * Mobile devices do not have hover.
     * First tap activates the preview.
     * Second tap can be used for the project action.
     */
    if (!isActive) {
      activatePreview();
    }
  };

  return (
    <article
      className={`
        group relative
        bg-neutral-950/95
        border border-white/10
        rounded-3xl
        overflow-hidden
        flex flex-col
        transition-all duration-500 ease-out
        shadow-2xl
        ${
          isActive
            ? 'border-sky-400/50 shadow-[0_20px_70px_rgba(56,189,248,0.16)]'
            : 'hover:border-sky-500/30'
        }
      `}
      onMouseEnter={activatePreview}
      onMouseLeave={deactivatePreview}
      onClick={handleCardClick}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {/* =========================
          WEBSITE SHOWCASE
      ========================== */}
      <div className="relative h-[260px] sm:h-[285px] overflow-hidden bg-neutral-900">

        {/* Browser Chrome */}
        <div className="absolute top-0 left-0 right-0 z-20 h-11 bg-neutral-900/95 backdrop-blur-md border-b border-white/10 flex items-center px-4">

          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>

          <div className="mx-auto px-4 py-1 rounded-md bg-black/70 border border-white/10 text-[9px] sm:text-[10px] font-mono text-neutral-400 truncate max-w-[190px]">
            {project.title
              .toLowerCase()
              .replace(/[^a-z0-9]/g, '')}
            .com
          </div>

          <span className="text-[9px] font-mono text-neutral-500">
            {project.year}
          </span>

        </div>

        {/* Video */}
        {videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            muted
            loop
            playsInline
            preload="metadata"
            className={`
              absolute inset-0
              w-full h-full
              object-cover
              pt-11
              transition-all duration-700 ease-out
              ${
                isActive
                  ? 'scale-[1.06] opacity-100'
                  : 'scale-100 opacity-35'
              }
            `}
          />
        ) : null}

        {/* Dark cinematic overlay */}
        <div
          className={`
            absolute inset-0 z-10 pointer-events-none
            bg-gradient-to-t
            from-black via-black/25 to-transparent
            transition-opacity duration-500
            ${isActive ? 'opacity-70' : 'opacity-90'}
          `}
        />

        {/* Cyan/orange glow */}
        <div
          className={`
            absolute -inset-10 z-10 pointer-events-none
            bg-[radial-gradient(circle_at_50%_100%,rgba(56,189,248,0.18),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(249,115,22,0.12),transparent_40%)]
            transition-opacity duration-500
            ${isActive ? 'opacity-100' : 'opacity-40'}
          `}
        />

        {/* Live Preview Badge */}
        <div
          className={`
            absolute bottom-4 left-4 z-20
            flex items-center gap-2
            px-3 py-1.5
            rounded-full
            bg-black/65
            backdrop-blur-md
            border border-white/10
            transition-all duration-300
            ${
              isActive
                ? 'opacity-100 translate-y-0'
                : 'opacity-70 translate-y-1'
            }
          `}
        >
          <span
            className={`
              w-1.5 h-1.5 rounded-full
              ${
                isActive
                  ? 'bg-emerald-400 animate-pulse'
                  : 'bg-neutral-500'
              }
            `}
          />

          <span className="text-[9px] font-mono uppercase tracking-wider text-white">
            {isActive ? 'Live Preview' : 'Hover to Preview'}
          </span>
        </div>

      </div>

      {/* =========================
          PROJECT INFORMATION
      ========================== */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col">

        {/* Client / Location */}
        <div className="flex items-start justify-between gap-4 text-[10px] font-mono mb-2">

          <span className="text-sky-300 font-semibold uppercase tracking-wider">
            {project.client}
          </span>

          <span className="text-neutral-500 text-right">
            {project.location}
          </span>

        </div>

        {/* Title */}
        <h2
          className="
            font-display
            text-xl sm:text-2xl
            font-bold
            text-white
            group-hover:text-sky-300
            transition-colors duration-300
            mb-2
          "
        >
          {project.title}
        </h2>

        {/* Category */}
        <div className="flex items-center gap-2 mb-4">

          <span className="text-[9px] font-mono uppercase tracking-widest text-orange-400">
            {project.category}
          </span>

          <span className="text-neutral-700">
            ·
          </span>

          <span className="text-[9px] font-mono text-neutral-500">
            {project.year}
          </span>

        </div>

        {/* Summary */}
        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal mb-5">
          {project.summary}
        </p>

        {/* Impact */}
        <div className="p-3.5 rounded-xl bg-sky-500/10 border border-sky-500/20 space-y-1 mb-4">

          <div className="text-[9px] font-mono text-sky-300 uppercase tracking-wider font-semibold">
            Business Impact
          </div>

          <div className="text-xs sm:text-sm font-bold text-sky-400">
            {project.outcome}
          </div>

        </div>

        {/* Architecture */}
        <div className="space-y-1.5 text-[10px] sm:text-xs text-slate-300 font-mono mb-4">

          <div>
            <span className="text-slate-500">
              Client:
            </span>{' '}
            {project.client}
          </div>

          <div>
            <span className="text-slate-500">
              Architecture:
            </span>{' '}
            {project.medium}
          </div>

        </div>

        {/* Deliverables */}
        {project.deliverables && (
          <div className="flex flex-wrap gap-1.5">

            {project.deliverables.map((item, i) => (
              <span
                key={i}
                className="
                  text-[9px]
                  font-mono
                  px-2 py-1
                  rounded
                  bg-white/5
                  text-slate-300
                  border border-white/10
                  transition-colors
                  group-hover:border-sky-500/20
                "
              >
                {item}
              </span>
            ))}

          </div>
        )}

        {/* Bottom */}
        <div className="mt-7 pt-4 border-t border-white/10 flex items-center justify-between gap-4">

          <span className="text-[10px] sm:text-xs font-mono text-sky-300">
            {project.scale}
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectProject(project.title);
            }}
            className="
              flex items-center gap-1.5
              text-xs
              font-semibold
              text-orange-400
              hover:text-orange-300
              transition-colors
              cursor-pointer
              whitespace-nowrap
            "
          >
            <span>
              Start Similar Project
            </span>

            <ArrowUpRight
              className="
                w-3.5 h-3.5
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
                transition-transform
              "
            />
          </button>

        </div>

      </div>
    </article>
  );
};

export const WorkPage: React.FC<WorkPageProps> = ({
  onNavigate,
  onSelectProject,
}) => {
  return (
    <div className="w-full pt-28 pb-24 px-6 sm:px-10 lg:px-16 bg-black min-h-screen">

      <div className="max-w-7xl mx-auto">

        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Our Work' }]} />

        {/* Page Hero */}
        <div className="max-w-3xl mb-12">

          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-400 uppercase mb-3">

            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.8)]" />

            <span className="text-sky-400 font-semibold">
              Proven Track Record
            </span>

            <span
              aria-hidden="true"
              className="text-neutral-600"
            >
              ·
            </span>

            {/* UPDATED: USA + CANADA + AUSTRALIA */}
            <span className="text-orange-400 font-semibold">
              USA · Canada · Australia Case Studies
            </span>

          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.05] mb-6">

            Websites That Make
            <br />

            Businesses{' '}

            <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-orange-400 bg-clip-text text-transparent">
              Stand Out.
            </span>

          </h1>

          <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed">
            Every business has unique strengths. We build tailor-made digital
            experiences designed to showcase your credibility, maximize
            customer conversion, and drive measurable revenue.
          </p>

        </div>

        {/* =========================
            INTERACTIVE CASE STUDIES
        ========================== */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">

          {ARCHIVE_PROJECTS.map((project: ProjectShowcase) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelectProject={onSelectProject}
            />
          ))}

        </div>

        {/* Client Quote Strip */}

        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900/60 border border-white/10 mb-16">

          <div className="max-w-3xl mx-auto text-center space-y-4">

            <span className="text-orange-400 text-3xl font-serif">
              “
            </span>

            <p className="text-base sm:text-xl text-slate-200 font-medium leading-relaxed italic">

              "

              <span className="text-sky-400 font-semibold">
                Grow
              </span>

              <span className="text-orange-400 font-bold">
                
              </span>{' '}

              Digital transformed our digital presence completely. The site is
              lightning fast, converts visitors effortlessly, and our direct
              bookings increased dramatically right after launch."

            </p>

            <div className="pt-2 text-xs font-mono text-slate-400">

              <span className="text-white font-semibold">
                Ridge Luxury Stays
              </span>{' '}

              ·{' '}

              <span className="text-orange-400">
                Aspen, Colorado 🇺🇸
              </span>

            </div>

          </div>

        </div>

        {/* Bottom Page CTA */}

        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-950 border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">

          <div>

            <h3 className="font-display text-2xl font-bold text-white">

              Ready to create your next{' '}

              <span className="bg-gradient-to-r from-sky-400 to-orange-400 bg-clip-text text-transparent">
                success story?
              </span>

            </h3>

            <p className="text-xs sm:text-sm text-slate-300 mt-1 font-normal">
              Tell us about your company and receive a detailed project
              roadmap tailored to your industry.
            </p>

          </div>

          <button
            onClick={() => onNavigate('contact')}
            className="
              px-6 py-3.5
              text-xs sm:text-sm
              font-semibold
              text-white
              bg-gradient-to-r
              from-orange-500 to-orange-600
              hover:from-orange-400
              hover:to-orange-500
              rounded-xl
              transition-all
              cursor-pointer
              shadow-lg
              shadow-orange-500/25
              border border-orange-400/30
              whitespace-nowrap
            "
          >
            Start Your Project →
          </button>

        </div>

      </div>

    </div>
  );
};