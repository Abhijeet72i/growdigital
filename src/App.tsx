/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { STREAM_PRESETS } from './data/streams';
import { StreamSource, StreamTelemetry } from './types/video';
import { GlassHeader } from './components/GlassHeader';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { WorkPage } from './pages/WorkPage';
import { ProcessPage } from './pages/ProcessPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { StreamTelemetryHud } from './components/StreamTelemetryHud';
import { ShowcaseModal } from './components/ShowcaseModal';
import { CommissionModal } from './components/CommissionModal';
import { ambientSynth } from './utils/audioSynth';
import { loadPersistedVideo, saveCustomVideoFile, saveCustomVideoUrl, clearPersistedVideo } from './utils/videoPersistence';
import { UploadCloud } from 'lucide-react';

export default function App() {
  // Multipage Router State
  const getPageFromHash = (): string => {
    const hash = window.location.hash.replace('#/', '').replace('#', '').trim();
    if (['services', 'work', 'process', 'about', 'contact'].includes(hash)) {
      return hash;
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<string>(getPageFromHash);

  // Video Background & Stream State (preserved across pages / on home)
  const [currentStream, setCurrentStream] = useState<StreamSource>(STREAM_PRESETS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(0.35);
  const [selectedLevelIndex, setSelectedLevelIndex] = useState<number>(-1);
  const [customVideoFileUrl, setCustomVideoFileUrl] = useState<string | null>(null);
  const [customVideoName, setCustomVideoName] = useState<string | null>(null);
  const [isDraggingFile, setIsDraggingFile] = useState<boolean>(false);

  // Load any previously saved custom video on initial startup
  useEffect(() => {
    loadPersistedVideo().then((saved) => {
      if (saved.url) {
        setCustomVideoFileUrl(saved.url);
        setCustomVideoName(saved.name);
        setIsPlaying(true);
      }
    }).catch((err) => {
      console.warn('Error checking persisted video:', err);
    });
  }, []);

  // Playback timing
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  // Active modals and overlays
  const [isArchiveOpen, setIsArchiveOpen] = useState<boolean>(false);
  const [isCommissionOpen, setIsCommissionOpen] = useState<boolean>(false);
  const [isTelemetryOpen, setIsTelemetryOpen] = useState<boolean>(false);
  const [commissionTopic, setCommissionTopic] = useState<string>('');

  // Video Telemetry
  const [telemetry, setTelemetry] = useState<StreamTelemetry>({
    bitrate: 3200000,
    resolution: { width: 1920, height: 1080 },
    bufferLength: 8,
    droppedFrames: 0,
    currentLevelIndex: -1,
    levels: [{ id: -1, height: 1080, bitrate: 3200000, label: '1080p Master' }],
    isLive: false,
    hlsSupported: true,
    usingNativeHls: false,
    networkState: 'Master Stream Nominal',
  });

  // Navigation Handler with browser history support
  const navigate = useCallback((page: string, topic?: string) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '#/' : `#/${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (topic) {
      setCommissionTopic(topic);
    }
  }, []);

  // Listen to browser forward/back buttons
  useEffect(() => {
    const handleHashChange = () => {
      const page = getPageFromHash();
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Toggle Mute / Soundscape
  const handleToggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (!next) {
        ambientSynth.start(volume).catch(() => {});
      } else {
        ambientSynth.stop();
      }
      return next;
    });
  }, [volume]);

  // Toggle Play / Pause
  const handleTogglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  // Drag and drop video file support with persistent IndexedDB storage
  useEffect(() => {
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      if (e.dataTransfer && e.dataTransfer.types.includes('Files')) {
        setIsDraggingFile(true);
      }
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      if (!e.relatedTarget) {
        setIsDraggingFile(false);
      }
    };

    const handleDrop = async (e: DragEvent) => {
      e.preventDefault();
      setIsDraggingFile(false);
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        if (file.type.startsWith('video/') || file.name.endsWith('.mp4') || file.name.endsWith('.webm')) {
          try {
            const saved = await saveCustomVideoFile(file);
            setCustomVideoFileUrl(saved.url);
            setCustomVideoName(saved.name);
            setIsPlaying(true);
          } catch (err) {
            console.error('Failed to store dropped video file:', err);
            const fallbackUrl = URL.createObjectURL(file);
            setCustomVideoFileUrl(fallbackUrl);
            setCustomVideoName(file.name);
            setIsPlaying(true);
          }
        }
      }
    };

    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('dragleave', handleDragLeave);
    window.addEventListener('drop', handleDrop);

    return () => {
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('dragleave', handleDragLeave);
      window.removeEventListener('drop', handleDrop);
    };
  }, []);

  // Keyboard accessibility shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        handleTogglePlay();
      } else if (e.code === 'KeyM') {
        e.preventDefault();
        handleToggleMute();
      } else if (e.code === 'KeyT') {
        e.preventDefault();
        setIsTelemetryOpen((prev) => !prev);
      } else if (e.code === 'Escape') {
        setIsArchiveOpen(false);
        setIsCommissionOpen(false);
        setIsTelemetryOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleTogglePlay, handleToggleMute]);

  const handleOpenCommissionWithTopic = (topic: string) => {
    setCommissionTopic(topic);
    setIsCommissionOpen(true);
  };

  return (
    <div className="relative min-h-screen w-full select-none overflow-x-hidden bg-black text-neutral-100 font-sans flex flex-col justify-between">
      {/* Multipage Glass Navigation */}
      <GlassHeader
        onOpenCommission={() => {
          setCommissionTopic('');
          setIsCommissionOpen(true);
        }}
        currentPage={currentPage}
        onNavigate={navigate}
      />

      {/* Multipage Main Views */}
      <main className="flex-1 w-full animate-in fade-in duration-300">
        {currentPage === 'home' && (
          <HomePage
            currentStream={currentStream}
            streams={STREAM_PRESETS}
            onSelectStream={(stream) => {
              setCustomVideoFileUrl(null);
              setCurrentStream(stream);
              setSelectedLevelIndex(-1);
              setIsPlaying(true);
            }}
            isPlaying={isPlaying}
            onTogglePlay={handleTogglePlay}
            isMuted={isMuted}
            volume={volume}
            selectedLevelIndex={selectedLevelIndex}
            onTelemetryUpdate={setTelemetry}
            currentTime={currentTime}
            duration={duration}
            onTimeUpdate={(curr, dur) => {
              setCurrentTime(curr);
              setDuration(dur);
            }}
            onVideoEnd={() => {
              if (!customVideoFileUrl) {
                const nextIdx = (STREAM_PRESETS.findIndex((s) => s.id === currentStream.id) + 1) % STREAM_PRESETS.length;
                setCurrentStream(STREAM_PRESETS[nextIdx]);
              }
            }}
            customVideoFileUrl={customVideoFileUrl}
            onOpenArchive={() => navigate('work')}
            onToggleTelemetry={() => setIsTelemetryOpen((prev) => !prev)}
            isTelemetryOpen={isTelemetryOpen}
            onNavigate={navigate}
            onStartProject={(topic) => {
              setCommissionTopic(topic || '');
              setIsCommissionOpen(true);
            }}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            onNavigate={navigate}
            onSelectService={(serviceTitle) => {
              setCommissionTopic(`Service: ${serviceTitle}`);
              setIsCommissionOpen(true);
            }}
          />
        )}

        {currentPage === 'work' && (
          <WorkPage
            onNavigate={navigate}
            onSelectProject={(projectTitle) => {
              setCommissionTopic(`Case Study: ${projectTitle}`);
              setIsCommissionOpen(true);
            }}
          />
        )}

        {currentPage === 'process' && (
          <ProcessPage
            onNavigate={navigate}
            onStartProject={() => {
              setCommissionTopic('5-Phase Web Project');
              setIsCommissionOpen(true);
            }}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onNavigate={navigate}
            onStartProject={() => {
              setCommissionTopic('General Consultation');
              setIsCommissionOpen(true);
            }}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            onNavigate={navigate}
            initialTopic={commissionTopic}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onOpenCommission={() => {
          setCommissionTopic('');
          setIsCommissionOpen(true);
        }}
        onNavigate={navigate}
      />

      {/* Drag & Drop Visual Indicator if user drops a video file */}
      {isDraggingFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md border-4 border-dashed border-amber-400 pointer-events-none animate-in fade-in">
          <div className="flex flex-col items-center gap-3 text-white">
            <UploadCloud className="w-12 h-12 text-amber-400 animate-bounce" />
            <p className="font-display text-xl font-bold">Drop Video File to Set Background</p>
            <p className="text-xs font-mono text-neutral-400">Accepts .mp4, .webm files</p>
          </div>
        </div>
      )}

      {/* Stream Telemetry HUD (Website Preview) */}
      {isTelemetryOpen && (
        <StreamTelemetryHud
          telemetry={telemetry}
          selectedLevelIndex={selectedLevelIndex}
          onSelectLevel={setSelectedLevelIndex}
          onClose={() => setIsTelemetryOpen(false)}
          onLoadCustomStream={async (url) => {
            const saved = await saveCustomVideoUrl(url);
            setCustomVideoFileUrl(saved.url);
            setCustomVideoName(saved.name);
            setIsPlaying(true);
          }}
          onLoadCustomFile={async (file) => {
            const saved = await saveCustomVideoFile(file);
            setCustomVideoFileUrl(saved.url);
            setCustomVideoName(saved.name);
            setIsPlaying(true);
          }}
          onResetToDefault={async () => {
            await clearPersistedVideo();
            setCustomVideoFileUrl(null);
            setCustomVideoName(null);
            setCurrentStream(STREAM_PRESETS[0]);
            setIsPlaying(true);
          }}
          hasCustomVideo={Boolean(customVideoFileUrl)}
          customVideoName={customVideoName}
          currentStream={currentStream}
        />
      )}

      {/* Project Showcase Modal */}
      <ShowcaseModal
        isOpen={isArchiveOpen}
        onClose={() => setIsArchiveOpen(false)}
        onSelectProjectForInquiry={handleOpenCommissionWithTopic}
      />

      {/* Commission / Quote Modal */}
      <CommissionModal
        isOpen={isCommissionOpen}
        onClose={() => setIsCommissionOpen(false)}
        initialTopic={commissionTopic}
      />
    </div>
  );
}
