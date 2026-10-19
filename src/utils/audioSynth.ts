class AmbientAudio {
  private audio: HTMLAudioElement | null = null;
  private isPlaying = false;

  public init() {
    if (this.audio) return;

    this.audio = new Audio('/audio/growdigital.mp3');
    this.audio.loop = true;
    this.audio.preload = 'auto';
    this.audio.volume = 0.35;
  }

  public async start(volume = 0.35) {
    this.init();

    if (!this.audio) return;

    this.audio.volume = volume;

    try {
      await this.audio.play();
      this.isPlaying = true;
    } catch (error) {
      console.error('Unable to start audio:', error);
    }
  }

  public stop() {
    if (!this.audio) return;

    this.audio.pause();
    this.audio.currentTime = 0;
    this.isPlaying = false;
  }

  public setVolume(volume: number) {
    if (this.audio) {
      this.audio.volume = Math.max(0, Math.min(1, volume));
    }
  }

  public getIsPlaying() {
    return this.isPlaying;
  }
}

export const ambientSynth = new AmbientAudio();