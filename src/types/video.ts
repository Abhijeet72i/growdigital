export interface StreamSource {
  id: string;
  title: string;
  location: string;
  duration: string;
  hlsUrl: string;
  fallbackMp4: string;
  resolution: string;
  aspectRatio: string;
  fps: number;
  description: string;
  palette: string[];
}

export interface StreamTelemetry {
  bitrate: number; // in bps
  resolution: { width: number; height: number };
  bufferLength: number; // in seconds
  droppedFrames: number;
  currentLevelIndex: number;
  levels: { id: number; height: number; bitrate: number; label: string }[];
  isLive: boolean;
  hlsSupported: boolean;
  usingNativeHls: boolean;
  networkState: string;
}

export interface ProjectShowcase {
  id: string;
  title: string;
  client: string;
  category: 'Restaurants' | 'Hotels' | 'Real Estate' | 'E-Commerce' | 'Professional Services' | 'Startups';
  year: string;
  location: string;
  medium: string;
  scale: string;
  outcome: string;
  summary: string;
  accentColor: string;
  deliverables?: string[];
  metrics?: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  features: string[];
  highlight: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  details: string;
}
