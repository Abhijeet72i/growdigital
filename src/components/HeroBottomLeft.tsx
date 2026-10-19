import React from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { StreamSource } from '../types/video';

interface HeroBottomLeftProps {
  currentStream: StreamSource;
  streams: StreamSource[];
  onSelectStream: (stream: StreamSource) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onOpenArchive: () => void;
  onToggleTelemetry: () => void;
  isTelemetryOpen: boolean;
  currentTime: number;
  duration: number;
  onStartProject: () => void;
}

export const HeroBottomLeft: React.FC<HeroBottomLeftProps> = ({
  onOpenArchive,
  onStartProject,
}) => {
  const scrollToWork = () => {
    const el = document.getElementById('work');

    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onOpenArchive()
    }
  };

  return (
    <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 lg:bottom-12 lg:left-12 max-w-2xl z-20 pointer-events-auto pr-4 sm:pr-0">
      <div className="flex flex-col gap-4 sm:gap-5">

        {/* Metadata Line */}
        <div className="flex items-center flex-wrap gap-2 text-xs font-mono tracking-widest text-neutral-300 uppercase">
          <span className="flex items-center gap-1.5 text-neutral-200">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse shadow-[0_0_8px_rgba(56,189,248,0.8)]" />

            <span className="font-semibold text-sky-300">
              GrowDigital
            </span>
          </span>

          <span
            aria-hidden="true"
            className="text-neutral-500"
          >
            ·
          </span>

          <span>
            WEB DESIGN &amp; DEVELOPMENT
          </span>

          <span
            aria-hidden="true"
            className="text-neutral-500"
          >
            ·
          </span>

          <span className="text-orange-400 font-semibold tracking-wider">
            USA + CANADA + AUSTRALIA
          </span>
        </div>

        {/* Main Headline */}
        <h1
          className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.02]"
          style={{ textWrap: 'balance' }}
        >
          Websites Built
          <br className="hidden sm:inline" />

          {' '}For Businesses
          <br className="hidden sm:inline" />

          {' '}That{' '}

          <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-orange-400 bg-clip-text text-transparent drop-shadow-[0_4px_16px_rgba(249,115,22,0.3)]">
            Want To Grow.
          </span>
        </h1>

        {/* Value Proposition */}
        <p className="text-sm sm:text-base text-neutral-200 leading-relaxed max-w-xl font-normal">
          <span className="text-sky-300 font-medium">
            Grow
          </span>
          <span className="text-orange-400 font-semibold">
            
          </span>{' '}
          Digital designs and develops modern, responsive websites that help
          businesses build credibility, attract customers and grow online.
        </p>

        {/* Action Buttons */}
        <div className="flex items-center flex-wrap gap-3 pt-1">

          {/* Start Your Project */}
          <button
            onClick={onStartProject}
            className="
              flex items-center gap-2
              px-6 py-3
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
              whitespace-nowrap
              shadow-xl
              shadow-orange-500/25
              border
              border-orange-400/40
              hover:scale-[1.02]
            "
          >
            <span>
              Start Your Project
            </span>

            <ArrowRight className="w-4 h-4" />
          </button>

          {/* View Our Work */}
          <button
            onClick={scrollToWork}
            className="
              flex items-center gap-2
              px-5 py-3
              text-xs sm:text-sm
              font-medium
              rounded-xl
              glass-panel
              text-neutral-200
              hover:text-white
              hover:border-sky-400/40
              transition-all
              cursor-pointer
              whitespace-nowrap
            "
          >
            <span>
              View Our Work
            </span>

            <ChevronRight className="w-4 h-4 text-sky-400" />
          </button>

        </div>

      </div>
    </div>
  );
};