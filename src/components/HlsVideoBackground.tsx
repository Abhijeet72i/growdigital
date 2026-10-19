import React, { useEffect, useRef, useState, useCallback } from 'react';
import { StreamSource, StreamTelemetry } from '../types/video';

interface HlsVideoBackgroundProps {
  stream: StreamSource;
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  selectedLevelIndex: number;
  onTelemetryUpdate: (telemetry: StreamTelemetry) => void;
  onTimeUpdate: (currentTime: number, duration: number) => void;
  onVideoEnd?: () => void;
  customVideoFileUrl?: string | null;
}

export const HlsVideoBackground: React.FC<HlsVideoBackgroundProps> = ({
  stream,
  isPlaying,
  isMuted,
  volume,
  selectedLevelIndex,
  onTelemetryUpdate,
  onTimeUpdate,
  onVideoEnd,
  customVideoFileUrl,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);

  // Determine active video source URL
  const activeVideoUrl =
    customVideoFileUrl ||
    (stream.fallbackMp4 ? stream.fallbackMp4 : '/videos/hero-background.mp4');

  // Attempt to play video reliably across all browsers (handling browser autoplay policies)
  const attemptPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;
    video.volume = volume;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsVideoPlaying(true);
        })
        .catch((err) => {
          console.log('Autoplay deferred until user interaction:', err);
          // If unmuted autoplay failed, mute and retry immediately
          if (!video.muted) {
            video.muted = true;
            video.play().catch(() => {});
          }
        });
    }
  }, [isMuted, volume]);

  // Initial load and playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.src = activeVideoUrl;
    video.load();
    attemptPlay();

    const handleLoadedMetadata = () => {
      onTelemetryUpdate({
        bitrate: 3200000,
        resolution: {
          width: video.videoWidth || 1920,
          height: video.videoHeight || 1080,
        },
        bufferLength: 10,
        droppedFrames: 0,
        currentLevelIndex: -1,
        levels: [{ id: -1, height: video.videoHeight || 1080, bitrate: 3200000, label: '1080p Master' }],
        isLive: false,
        hlsSupported: true,
        usingNativeHls: false,
        networkState: 'Master Video Active',
      });
      attemptPlay();
    };

    const handlePlay = () => setIsVideoPlaying(true);
    const handlePause = () => setIsVideoPlaying(false);

    // When returning to the tab, ensure playback continues with the active custom video
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && video) {
        if (!video.src.includes(activeVideoUrl) && video.src !== activeVideoUrl) {
          video.src = activeVideoUrl;
          video.load();
        }
        if (isPlaying) {
          attemptPlay();
        }
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Global listener for first click if browser blocked initial autoplay
    const handleFirstUserInteraction = () => {
      if (video && video.paused) {
        attemptPlay();
      }
    };
    window.addEventListener('click', handleFirstUserInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstUserInteraction, { once: true });

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('click', handleFirstUserInteraction);
      window.removeEventListener('touchstart', handleFirstUserInteraction);
    };
  }, [activeVideoUrl, attemptPlay, onTelemetryUpdate, isPlaying]);

  // Sync play/pause prop
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      if (video.paused) {
        attemptPlay();
      }
    } else {
      if (!video.paused) {
        video.pause();
      }
    }
  }, [isPlaying, attemptPlay]);

  // Sync volume / muted prop
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = isMuted;
    video.volume = volume;
  }, [isMuted, volume]);

  return (
    <div
      className="absolute inset-0 w-full h-full min-h-screen overflow-hidden z-0 pointer-events-none select-none bg-[#030206]"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    >
      {/* 
        [VIDEO BACKGROUND]
        HTML5 <video> element
        autoplay, muted, loop, playsInline, object-fit: cover, position: absolute, width: 100%, height: 100%
        z-index behind the hero content
      */}
      <video
        key={activeVideoUrl}
        ref={videoRef}
        src={activeVideoUrl}
        autoPlay
        muted={isMuted}
        loop
        playsInline
        webkit-playsinline="true"
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
        onTimeUpdate={(e) => {
          const target = e.currentTarget;
          onTimeUpdate(target.currentTime, target.duration || 0);
        }}
        onEnded={() => {
          if (customVideoFileUrl) {
            const video = videoRef.current;
            if (video) {
              video.currentTime = 0;
              video.play().catch(() => {});
            }
          } else if (onVideoEnd) {
            onVideoEnd();
          }
        }}
      />

      {/* 
        [Dark transparent overlay & cinematic gradient]
        Overlay 1: dark semi-transparent tint
        Overlay 2: subtle dark gradient overlay:
        top: rgba(0,0,0,0.25)
        middle: rgba(0,0,0,0.35)
        bottom: rgba(0,0,0,0.65)
        Creates a cinematic fade toward the bottom of the hero while keeping the video clearly visible.
      */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.35) 45%, rgba(0, 0, 0, 0.65) 100%)',
          zIndex: 2,
        }}
      />

      {/* Directed bottom-left soft contrast scrim to guarantee white typography legibility */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 12% 88%, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0) 65%)',
          zIndex: 3,
        }}
      />
    </div>
  );
};
