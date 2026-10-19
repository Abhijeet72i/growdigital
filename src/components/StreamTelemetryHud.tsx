import React, { useState, useRef } from 'react';
import { X, Activity, ArrowRight, Upload, Video } from 'lucide-react';
import { StreamTelemetry, StreamSource } from '../types/video';

interface StreamTelemetryHudProps {
  telemetry: StreamTelemetry;
  selectedLevelIndex: number;
  onSelectLevel: (index: number) => void;
  onClose: () => void;
  onLoadCustomStream: (url: string) => void;
  onLoadCustomFile?: (file: File) => void;
  onResetToDefault?: () => void;
  customVideoName?: string | null;
  hasCustomVideo?: boolean;
  currentStream: StreamSource;
}

export const StreamTelemetryHud: React.FC<StreamTelemetryHudProps> = ({
  telemetry,
  selectedLevelIndex,
  onSelectLevel,
  onClose,
  onLoadCustomStream,
  onLoadCustomFile,
  onResetToDefault,
  customVideoName,
  hasCustomVideo,
  currentStream,
}) => {
  const [customUrl, setCustomUrl] = useState('');
  const [customError, setCustomError] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const formatBitrate = (bps: number) => {
    if (!bps || bps <= 0) return 'Adaptive';
    return `${(bps / 1000000).toFixed(2)} Mbps`;
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrl.trim()) return;

    if (!customUrl.startsWith('http://') && !customUrl.startsWith('https://') && !customUrl.startsWith('/')) {
      setCustomError('URL must start with https:// or /');
      return;
    }

    setCustomError('');
    onLoadCustomStream(customUrl.trim());
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (onLoadCustomFile) {
        onLoadCustomFile(file);
      } else {
        const blobUrl = URL.createObjectURL(file);
        onLoadCustomStream(blobUrl);
      }
    }
  };

  return (
    <div className="fixed top-22 right-4 sm:right-8 z-30 w-84 sm:w-96 glass-panel rounded-xl p-5 text-white shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
      {/* HUD Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="font-mono text-xs font-semibold tracking-wider uppercase text-neutral-200">
            Website Video Preview &amp; Stream HUD
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-neutral-400 hover:text-white p-1 rounded hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close telemetry HUD"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Stream Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 py-3 font-mono-tabular text-xs">
        <div className="bg-white/5 rounded-lg p-2.5 border border-white/5">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block font-mono">
            Bitrate
          </span>
          <span className="text-sm font-semibold text-emerald-300">
            {formatBitrate(telemetry.bitrate)}
          </span>
        </div>

        <div className="bg-white/5 rounded-lg p-2.5 border border-white/5">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block font-mono">
            Resolution
          </span>
          <span className="text-sm font-semibold text-neutral-200">
            {telemetry.resolution.width} × {telemetry.resolution.height}
          </span>
        </div>

        <div className="bg-white/5 rounded-lg p-2.5 border border-white/5">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block font-mono">
            Buffer State
          </span>
          <span className="text-sm font-semibold text-sky-300">
            {telemetry.bufferLength}s
          </span>
        </div>

        <div className="bg-white/5 rounded-lg p-2.5 border border-white/5">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block font-mono">
            Pipeline
          </span>
          <span className="text-sm font-semibold text-neutral-200 truncate block">
            {telemetry.networkState}
          </span>
        </div>
      </div>

      {/* Active Source Detail */}
      <div className="py-2 border-t border-white/10 text-[11px] font-mono text-neutral-300 flex items-center justify-between">
        <span className="text-neutral-400">Cinematic Engine</span>
        <span className="text-orange-400 font-medium truncate max-w-[180px]">
          {currentStream.title.split('—')[0].trim()}
        </span>
      </div>

      {/* Rendition / Quality Selector */}
      {telemetry.levels.length > 0 && (
        <div className="py-3 border-t border-white/10">
          <label className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block mb-2">
            Rendition Quality
          </label>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => onSelectLevel(-1)}
              className={`px-2.5 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${
                selectedLevelIndex === -1
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                  : 'bg-white/5 text-neutral-400 hover:text-white border border-white/5'
              }`}
            >
              Auto (ABR)
            </button>
            {telemetry.levels.map((lvl) => {
              const isCurrent = selectedLevelIndex === lvl.id;
              return (
                <button
                  key={lvl.id}
                  onClick={() => onSelectLevel(lvl.id)}
                  className={`px-2.5 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${
                    isCurrent
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                      : 'bg-white/5 text-neutral-400 hover:text-white border border-white/5'
                  }`}
                >
                  {lvl.height}p
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Custom Video Active Status Badge */}
      {hasCustomVideo && (
        <div className="py-2.5 px-3 mb-2 rounded-xl bg-sky-500/10 border border-sky-500/25 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shrink-0" />
            <span className="text-[11px] font-mono text-sky-300 truncate">
              {customVideoName || 'Custom Video Active'}
            </span>
          </div>
          {onResetToDefault && (
            <button
              onClick={onResetToDefault}
              className="text-[10px] font-mono text-orange-400 hover:text-white px-2 py-1 rounded bg-white/5 hover:bg-orange-500/20 border border-orange-500/30 transition-colors whitespace-nowrap cursor-pointer"
            >
              Reset to Default
            </button>
          )}
        </div>
      )}

      {/* Select Local Video File */}
      <div className="py-3 border-t border-white/10">
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-white/10 hover:bg-white/15 border border-white/15 rounded-lg text-xs font-medium text-white transition-colors cursor-pointer"
        >
          <Upload className="w-3.5 h-3.5 text-orange-400" />
          <span>Upload / Swap Background Video (.mp4)</span>
        </button>
      </div>

      {/* Custom Stream Input */}
      <div className="pt-2 border-t border-white/10">
        <label className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block mb-1.5">
          Custom Video URL (.mp4 / .m3u8)
        </label>
        <form onSubmit={handleCustomSubmit} className="flex gap-2">
          <input
            type="url"
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            placeholder="https://.../video.mp4"
            className="flex-1 bg-black/40 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/40 font-mono"
          />
          <button
            type="submit"
            className="px-3 py-1.5 bg-white text-black text-xs font-medium rounded-lg hover:bg-neutral-200 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Load</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </form>
        {customError && (
          <p className="text-[11px] text-amber-400 mt-1 font-mono">{customError}</p>
        )}
      </div>
    </div>
  );
};
