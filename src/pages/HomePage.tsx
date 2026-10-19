
import React, { useEffect, useState } from 'react';
import { StreamSource, StreamTelemetry } from '../types/video';
import { HlsVideoBackground } from '../components/HlsVideoBackground';
import { HeroBottomLeft } from '../components/HeroBottomLeft';
import {
  ArrowRight,
  ArrowUpRight,
  Palette,
  Code2,
  CheckCircle2,
} from 'lucide-react';

interface HomePageProps {
  currentStream: StreamSource;
  streams: StreamSource[];
  onSelectStream: (stream: StreamSource) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  isMuted: boolean;
  volume: number;
  selectedLevelIndex: number;
  onTelemetryUpdate: (telemetry: StreamTelemetry) => void;
  currentTime: number;
  duration: number;
  onTimeUpdate: (curr: number, dur: number) => void;
  onVideoEnd: () => void;
  customVideoFileUrl: string | null;
  onOpenArchive: () => void;
  onToggleTelemetry: () => void;
  isTelemetryOpen: boolean;
  onNavigate: (page: string) => void;
  onStartProject: (topic?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  currentStream,
  streams,
  onSelectStream,
  isPlaying,
  onTogglePlay,
  isMuted,
  volume,
  selectedLevelIndex,
  onTelemetryUpdate,
  currentTime,
  duration,
  onTimeUpdate,
  onVideoEnd,
  customVideoFileUrl,
  onToggleTelemetry,
  isTelemetryOpen,
  onNavigate,
  onStartProject,
}) => {
  const [featuredVisible, setFeaturedVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setFeaturedVisible(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="w-full">
      {/* CINEMATIC HERO */}
      <section className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden">
        <HlsVideoBackground
          stream={currentStream}
          isPlaying={isPlaying}
          isMuted={isMuted}
          volume={volume}
          selectedLevelIndex={selectedLevelIndex}
          onTelemetryUpdate={onTelemetryUpdate}
          onTimeUpdate={onTimeUpdate}
          onVideoEnd={onVideoEnd}
          customVideoFileUrl={customVideoFileUrl}
        />

        {/* GROW DIGITAL LOGO — SLIGHTLY FURTHER RIGHT */}
        <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
          <img
            src="/images/grow_digital_logo_transparent.png"
            alt="GrowDigital"
            className="
              absolute
              right-12 bottom-16
              w-36 max-w-[32vw]
              object-contain
              drop-shadow-[0_0_12px_rgba(0,0,0,0.8)]
              sm:right-14 sm:bottom-16 sm:w-40
              md:right-16 md:bottom-16 md:w-44
              lg:right-20 lg:bottom-16 lg:w-48
              xl:right-24 xl:bottom-16 xl:w-52
            "
          />
        </div>

        {/* HERO CONTENT */}
        <HeroBottomLeft
          currentStream={currentStream}
          streams={streams}
          onSelectStream={onSelectStream}
          isPlaying={isPlaying}
          onTogglePlay={onTogglePlay}
          onOpenArchive={() => onNavigate('work')}
          onToggleTelemetry={onToggleTelemetry}
          isTelemetryOpen={isTelemetryOpen}
          currentTime={currentTime}
          duration={duration}
          onStartProject={() => onStartProject('New Website Project')}
        />
      </section>

      {/* HOMEPAGE OVERVIEW */}
      <section className="relative z-10 w-full border-t border-white/10 bg-neutral-950 px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {/* STATS */}
          <div className="mb-16 grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-neutral-900/60 p-6 shadow-2xl sm:p-8 md:grid-cols-4">
            <div>
              <span className="mb-1 block font-mono text-xs font-semibold uppercase tracking-widest text-orange-400">
                Client Impact
              </span>
              <div className="font-display text-2xl font-extrabold text-white sm:text-3xl">
                99.8%
              </div>
              <p className="mt-1 text-xs text-slate-300">Client Satisfaction</p>
            </div>

            <div>
              <span className="mb-1 block font-mono text-xs font-semibold uppercase tracking-widest text-sky-400">
                Edge Speed
              </span>
              <div className="font-display text-2xl font-extrabold text-white sm:text-3xl">
                &lt; 0.8s
              </div>
              <p className="mt-1 text-xs text-slate-300">Average Load Speed</p>
            </div>

            <div>
              <span className="mb-1 block font-mono text-xs font-semibold uppercase tracking-widest text-sky-300">
                Territory
              </span>
              <div className="font-display text-2xl font-extrabold text-white sm:text-3xl">
                3 Countries
              </div>
              <p className="mt-1 text-xs text-slate-300">
                USA, Canada &amp; Australia
              </p>
            </div>

            <div>
              <span className="mb-1 block font-mono text-xs font-semibold uppercase tracking-widest text-orange-400">
                Core Vitals
              </span>
              <div className="font-display text-2xl font-extrabold text-white sm:text-3xl">
                100 / 100
              </div>
              <p className="mt-1 text-xs text-slate-300">Performance Target</p>
            </div>
          </div>

          {/* SECTION NAVIGATION */}
          <div className="mb-16">
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <span className="mb-2 block font-mono text-xs font-semibold uppercase tracking-widest text-sky-400">
                  Explore GrowDigital
                </span>
                <h2 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
                  Everything Your Business Needs To{' '}
                  <span className="bg-gradient-to-r from-sky-400 via-sky-300 to-orange-400 bg-clip-text text-transparent">
                    Win Online.
                  </span>
                </h2>
              </div>

              <p className="max-w-md text-sm leading-relaxed text-slate-300">
                Explore our services, see our work, and learn how we can help
                your business build a stronger digital presence.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* SERVICES */}
              <button
                type="button"
                onClick={() => onNavigate('services')}
                className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-neutral-900/50 p-6 text-left shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:bg-neutral-900"
              >
                <div>
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-orange-500/25 bg-orange-500/10 text-orange-400">
                    <Palette className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 font-display text-xl font-bold text-white group-hover:text-orange-400">
                    Our Services
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-300">
                    Website design, custom development, e-commerce,
                    SEO-friendly architecture, and ongoing maintenance.
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-sm font-semibold text-orange-400">
                  <span>Explore Our Services</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </button>

              {/* OUR WORK */}
              <button
                type="button"
                onClick={() => onNavigate('work')}
                className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-neutral-900/50 p-6 text-left shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/40 hover:bg-neutral-900"
              >
                <div>
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-sky-500/25 bg-sky-500/10 text-sky-400">
                    <Code2 className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 font-display text-xl font-bold text-white group-hover:text-sky-300">
                    Client Case Studies
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-300">
                    Explore website concepts and digital experiences for
                    businesses across different industries.
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-sm font-semibold text-sky-400">
                  <span>View Our Work</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </button>

              {/* PROCESS */}
              <button
                type="button"
                onClick={() => onNavigate('process')}
                className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-neutral-900/50 p-6 text-left shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:bg-neutral-900"
              >
                <div>
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-orange-500/25 bg-orange-500/10 text-orange-400">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 font-display text-xl font-bold text-white group-hover:text-orange-400">
                    Our Process
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-300">
                    From discovery and design to development, optimization,
                    and launch, we guide your project through each stage.
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-sm font-semibold text-orange-400">
                  <span>How We Work</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            </div>
          </div>

          {/* FEATURED CASE STUDY */}
          <div className="relative min-h-[540px] overflow-hidden rounded-3xl border border-white/15 bg-neutral-950 shadow-2xl">
            <video
              src="/videos/cloud-technologies-3d.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/20" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/25" />

            <div
              className={`relative z-10 flex min-h-[540px] flex-col items-start justify-between gap-10 p-8 transition-all duration-1000 sm:p-10 lg:flex-row lg:items-center lg:p-12 ${
                featuredVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              }`}
            >
              <div className="max-w-3xl">
                <div className="mb-3 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-orange-400">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-orange-400" />
                  <span>Featured Case Study</span>
                  <span className="text-neutral-600">·</span>
                  <span className="text-sky-300">Cloud &amp; Technology</span>
                </div>

                <h3 className="mb-5 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Cloud Technologies &amp; Digital Solutions
                </h3>

                <p className="max-w-3xl text-sm leading-relaxed text-slate-200 sm:text-base lg:text-lg">
                  Transform your business with secure, scalable, and reliable
                  digital solutions designed for the modern world. From cloud
                  infrastructure and data management to cybersecurity and
                  automation, build a stronger digital foundation for your
                  business.
                </p>

                <p className="mt-4 text-sm text-slate-300 sm:text-base">
                  Cloud-powered. Future-ready. Built for your business.
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs">
                  <span className="font-semibold text-orange-400">
                    Scalable Infrastructure
                  </span>
                  <span className="text-neutral-600">·</span>
                  <span className="font-semibold text-sky-300">
                    Secure Digital Architecture
                  </span>
                </div>
              </div>

              <div className="flex w-full shrink-0 flex-col items-center gap-3 sm:flex-row lg:w-auto">
                <button
                  type="button"
                  onClick={() => onNavigate('work')}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-orange-400/30 bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:from-orange-400 hover:to-orange-500 sm:w-auto"
                >
                  <span>Browse All Work</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="glass-panel flex w-full items-center justify-center gap-2 rounded-xl border border-sky-400/30 px-6 py-3.5 text-sm font-medium text-sky-200 transition-all hover:border-sky-300 hover:bg-sky-500/10 sm:w-auto"
                >
                  Get A Free Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
