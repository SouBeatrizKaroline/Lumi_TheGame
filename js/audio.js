/**
 * Lunara: As Estrelas Perdidas
 * Procedural Audio Engine using Web Audio API
 */
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.musicGain = null;
    this.sfxGain = null;
    this.musicVolume = CONFIG.SETTINGS_DEFAULT.musicVolume;
    this.sfxVolume = CONFIG.SETTINGS_DEFAULT.sfxVolume;
    this.isMuted = false;
    this.isPlayingMusic = false;
    this.musicTimer = null;
    this.ambientChords = [
      [155.56, 233.08, 311.13, 466.16], // Eb maj9
      [130.81, 196.00, 261.63, 392.00], // Cm7
      [116.54, 174.61, 233.08, 349.23], // Bb
      [103.83, 155.56, 233.08, 311.13]  // Ab maj7
    ];
    this.currentChordIndex = 0;
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(1.0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(this.musicVolume, this.ctx.currentTime);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(this.sfxVolume, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);

      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(4500, this.ctx.currentTime);
      this.musicGain.connect(this.filter);
      this.filter.connect(this.masterGain);
    } catch (e) {
      console.warn('Web Audio not available:', e);
    }
  }

  unlock() {
    if (!this.ctx) this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMusicVolume(vol) {
    this.musicVolume = Math.max(0, Math.min(1, vol));
    if (this.musicGain && this.ctx) {
      this.musicGain.gain.setTargetAtTime(this.isMuted ? 0 : this.musicVolume, this.ctx.currentTime, 0.05);
    }
  }

  setSfxVolume(vol) {
    this.sfxVolume = Math.max(0, Math.min(1, vol));
    if (this.sfxGain && this.ctx) {
      this.sfxGain.gain.setTargetAtTime(this.isMuted ? 0 : this.sfxVolume, this.ctx.currentTime, 0.05);
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.ctx) {
      const targetMusic = this.isMuted ? 0 : this.musicVolume;
      const targetSfx = this.isMuted ? 0 : this.sfxVolume;
      this.musicGain.gain.setTargetAtTime(targetMusic, this.ctx.currentTime, 0.05);
      this.sfxGain.gain.setTargetAtTime(targetSfx, this.ctx.currentTime, 0.05);
    }
    return this.isMuted;
  }

  startMusic() {
    if (this.isPlayingMusic) return;
    this.unlock();
    this.isPlayingMusic = true;
    this.playAmbientLoop();
  }

  playAmbientLoop() {
    if (!this.isPlayingMusic || !this.ctx) return;
    const chord = this.ambientChords[this.currentChordIndex];
    const now = this.ctx.currentTime;

    chord.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq * 0.5, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.045, now + 1.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

      osc.connect(gain);
      gain.connect(this.musicGain);
      osc.start(now);
      osc.stop(now + 4.0);
    });

    const arpeggioNotes = [chord[0], chord[2], chord[1], chord[3]];
    arpeggioNotes.forEach((freq, i) => {
      const noteTime = now + 0.4 + i * 0.45;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq * 2, noteTime);

      gain.gain.setValueAtTime(0.001, noteTime);
      gain.gain.linearRampToValueAtTime(0.025, noteTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.9);

      osc.connect(gain);
      gain.connect(this.musicGain);
      osc.start(noteTime);
      osc.stop(noteTime + 1.0);
    });

    this.currentChordIndex = (this.currentChordIndex + 1) % this.ambientChords.length;
    this.musicTimer = setTimeout(() => {
      this.playAmbientLoop();
    }, 2800);
  }

  stopMusic() {
    this.isPlayingMusic = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }

  playFootstep() {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const pitch = 90 + Math.random() * 25;
    osc.frequency.setValueAtTime(pitch, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.06);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.07);
  }

  playJump() {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(540, now + 0.15);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.17);
  }

  playLand() {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(110, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.1);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.11);
  }

  playBounce() {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(780, now + 0.22);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.25);
  }

  playCollect(isSecret = false) {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    if (!isSecret) {
      const notes = [622.25, 783.99, 932.33, 1244.50];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const time = now + idx * 0.05;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);

        gain.gain.setValueAtTime(0.15, time);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.45);

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(time);
        osc.stop(time + 0.5);
      });
    } else {
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const time = now + idx * 0.07;

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, time);

        gain.gain.setValueAtTime(0.2, time);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.9);

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(time);
        osc.stop(time + 1.0);
      });
    }
  }

  playCheckpoint() {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    const freqs = [349.23, 698.46, 1047.69];
    freqs.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.14 / (i + 1), now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + 1.3);
    });
  }

  playRespawn() {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.35);

    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.4);
  }

  playVictory() {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    const chordProgression = [
      { delay: 0.0, freqs: [311.13, 466.16, 622.25] },
      { delay: 0.4, freqs: [349.23, 523.25, 698.46] },
      { delay: 0.8, freqs: [392.00, 587.33, 783.99] },
      { delay: 1.2, freqs: [466.16, 622.25, 932.33, 1244.50] }
    ];

    chordProgression.forEach(item => {
      item.freqs.forEach(freq => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const time = now + item.delay;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);

        gain.gain.setValueAtTime(0.18, time);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + 1.8);

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(time);
        osc.stop(time + 2.0);
      });
    });
  }
}

window.soundEngine = new SoundEngine();
