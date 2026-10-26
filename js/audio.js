/**
 * Indian Classical Wedding Music & Synthesizer Engine
 * Provides authentic, soothing Tanpura drone and Shehnai/Santoor melodic notes
 * via Web Audio API, with zero external dependencies and 100% offline reliability.
 * Also supports HTML5 Audio element if an MP3 file is supplied.
 */

class WeddingAudioManager {
  constructor() {
    this.audioContext = null;
    this.isPlaying = false;
    this.droneGain = null;
    this.melodyGain = null;
    this.melodyInterval = null;
    this.tempoMs = 600;
    this.currentStep = 0;
    this.htmlAudio = null;
    this.onStateChange = null;

    // Traditional Indian Raga Yaman / Bilawal frequencies (Sa = C4 ~ 261.63Hz)
    this.rootFreq = 261.63; // C4 (Sa)
    this.ragaNotes = {
      Sa: 261.63,
      Re: 294.33,
      Ga: 329.63,
      Ma: 369.99, // Tivra Ma
      Pa: 392.00,
      Dha: 440.00,
      Ni: 493.88,
      SaHigh: 523.25,
      ReHigh: 588.66,
      GaHigh: 659.25
    };

    // Auspicious Shehnai / Santoor melodic motif for wedding celebrations
    this.melodyPattern = [
      "Sa", "Ga", "Pa", "Ma", "Pa", "Ni", "SaHigh", null,
      "SaHigh", "Ni", "Dha", "Pa", "Ma", "Ga", "Re", "Sa",
      "Pa", "Dha", "Ni", "SaHigh", "GaHigh", "ReHigh", "SaHigh", null,
      "Ni", "Dha", "Pa", "Ga", "Ma", "Ga", "Re", "Sa"
    ];
  }

  initAudioContext() {
    if (!this.audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioContext = new AudioCtx();
      }
    }
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  startSynthDrone() {
    if (!this.audioContext) return;

    this.droneGain = this.audioContext.createGain();
    this.droneGain.gain.setValueAtTime(0.001, this.audioContext.currentTime);
    this.droneGain.gain.exponentialRampToValueAtTime(0.08, this.audioContext.currentTime + 3);
    this.droneGain.connect(this.audioContext.destination);

    // Tanpura Drone: Pa (392Hz), Sa (261.63Hz), Lower Sa (130.81Hz)
    const droneFreqs = [130.81, 261.63, 392.00];
    droneFreqs.forEach(freq => {
      const osc = this.audioContext.createOscillator();
      const oscGain = this.audioContext.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.audioContext.currentTime);

      // Add gentle chorus/beating
      const lfo = this.audioContext.createOscillator();
      const lfoGain = this.audioContext.createGain();
      lfo.frequency.setValueAtTime(0.15, this.audioContext.currentTime);
      lfoGain.gain.setValueAtTime(0.5, this.audioContext.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      oscGain.gain.setValueAtTime(0.4, this.audioContext.currentTime);
      osc.connect(oscGain);
      oscGain.connect(this.droneGain);
      osc.start();
    });
  }

  playMelodyNote(noteName) {
    if (!this.audioContext || !this.isPlaying || !noteName) return;

    const freq = this.ragaNotes[noteName];
    if (!freq) return;

    const now = this.audioContext.currentTime;

    // Shehnai/Santoor dual-oscillator sound with warm resonant filter
    const osc1 = this.audioContext.createOscillator();
    const osc2 = this.audioContext.createOscillator();
    const noteGain = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();

    osc1.type = "triangle";
    osc2.type = "sawtooth";
    osc1.frequency.setValueAtTime(freq, now);
    osc2.frequency.setValueAtTime(freq * 1.002, now); // slight detune for rich resonance

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1400, now);
    filter.Q.setValueAtTime(4, now);

    // Pluck / reed envelope
    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.exponentialRampToValueAtTime(0.09, now + 0.08);
    noteGain.gain.exponentialRampToValueAtTime(0.03, now + 0.35);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.audioContext.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.9);
    osc2.stop(now + 0.9);
  }

  startMelodyLoop() {
    this.currentStep = 0;
    this.melodyInterval = setInterval(() => {
      if (!this.isPlaying) return;
      const note = this.melodyPattern[this.currentStep % this.melodyPattern.length];
      if (note) {
        this.playMelodyNote(note);
      }
      this.currentStep++;
    }, this.tempoMs);
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    this.initAudioContext();
    this.isPlaying = true;

    // Check if HTML5 audio exists with valid source
    const htmlPlayer = document.getElementById("weddingBgAudio");
    if (htmlPlayer && htmlPlayer.src && htmlPlayer.src !== "" && !htmlPlayer.error) {
      htmlPlayer.play().catch(() => {
        // Fallback to web audio synth
        this.startSynthDrone();
        this.startMelodyLoop();
      });
    } else {
      // Direct Web Audio Synth
      this.startSynthDrone();
      this.startMelodyLoop();
    }

    if (this.onStateChange) this.onStateChange(true);
  }

  pause() {
    this.isPlaying = false;
    if (this.melodyInterval) {
      clearInterval(this.melodyInterval);
      this.melodyInterval = null;
    }
    if (this.droneGain && this.audioContext) {
      this.droneGain.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime + 0.5);
    }
    const htmlPlayer = document.getElementById("weddingBgAudio");
    if (htmlPlayer) {
      htmlPlayer.pause();
    }
    if (this.onStateChange) this.onStateChange(false);
  }
}

// Global instance
window.weddingAudio = new WeddingAudioManager();
