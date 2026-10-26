/**
 * Malviya Family Wedding Invitation - Background Music & Audio Engine
 * Features the authentic Rajasthani folk tune "Padharo Mhare Desh" (Instrumental).
 *
 * Mobile & Desktop Compatibility Features:
 * - Robust HTML5 Audio streaming with verified asset paths and direct audio.src binding
 * - Graceful initial autoplay attempt with Promise rejection handling
 * - First-user-interaction fallback specifically tailored for mobile touch (touchend/click)
 * - Synchronous audio.play() execution from user gestures (iOS Safari & Android Chrome requirement)
 * - Single audio instance preserved across client-side view routing (Home, Jaimin & Monika, Gayatri & Aditya)
 * - Explicit user pause tracking (never overrides an explicit user pause on navigation or interaction)
 * - Offline Web Audio API synthesis fallback tuned to Rajasthani Maand Raga
 */

class WeddingAudioManager {
  constructor() {
    this.htmlAudio = null;
    this.audioContext = null;
    this.isPlaying = false;
    this.userExplicitlyPaused = false;
    this.isAutoplayBlocked = false;
    this.firstGestureHandled = false;
    this.onStateChange = null;

    // Web Audio API Synthesizer fallback state
    this.droneGain = null;
    this.melodyGain = null;
    this.melodyInterval = null;
    this.tempoMs = 550;
    this.currentStep = 0;

    // Traditional Rajasthani Maand Raga notes (Sa = 261.63Hz / C4)
    this.ragaNotes = {
      Sa: 261.63,
      Re: 293.66,
      Ga: 329.63,
      Ma: 349.23,
      Pa: 392.00,
      Dha: 440.00,
      Ni: 493.88,
      SaHigh: 523.25,
      ReHigh: 587.33,
      GaHigh: 659.25
    };

    // Iconic "Padharo Mhare Desh" Maand folk melodic phrasing for synth fallback
    this.melodyPattern = [
      "Ma", "Pa", "Dha", "SaHigh", "Dha", "Pa", "Ma", "Ga",
      "Re", "Ga", "Ma", "Pa", "Ma", "Ga", "Re", "Sa",
      "Sa", "Re", "Ga", "Ma", "Pa", "Dha", "Ni", "SaHigh",
      "SaHigh", "Dha", "Pa", "Ma", "Ga", "Re", "Sa", null
    ];

    this._boundFirstInteraction = this.handleFirstInteraction.bind(this);
  }

  /**
   * Initializes audio engine, hooks events, and attempts initial autoplay
   */
  init() {
    this.htmlAudio = document.getElementById("weddingBgAudio");

    if (this.htmlAudio) {
      // Ensure direct src is set for mobile Safari / Chrome compatibility
      const targetSrc = "assets/audio/padharo-mhare-desh.mp3";
      if (!this.htmlAudio.getAttribute("src") || this.htmlAudio.src === "" || this.htmlAudio.src === window.location.href) {
        this.htmlAudio.src = targetSrc;
      }

      this.htmlAudio.loop = true;
      this.htmlAudio.volume = 0.7; // Comfortable background music volume
      this.htmlAudio.playsInline = true;

      try {
        this.htmlAudio.load();
      } catch (e) {}

      // Guarantee loop if browser audio loop event hiccups
      this.htmlAudio.addEventListener("ended", () => {
        if (this.isPlaying && !this.userExplicitlyPaused) {
          this.htmlAudio.currentTime = 0;
          const p = this.htmlAudio.play();
          if (p && typeof p.catch === "function") p.catch(() => {});
        }
      });

      // Synchronize internal state with audio element native events
      this.htmlAudio.addEventListener("play", () => {
        if (!this.userExplicitlyPaused) {
          this.isPlaying = true;
          if (this.onStateChange) this.onStateChange(true);
        } else {
          try { this.htmlAudio.pause(); } catch (e) {}
        }
      });

      this.htmlAudio.addEventListener("pause", () => {
        this.isPlaying = false;
        if (this.onStateChange) this.onStateChange(false);
      });

      this.htmlAudio.addEventListener("error", (e) => {
        console.warn("Background audio element error:", e);
        if (this.isPlaying && !this.userExplicitlyPaused) {
          this.startSynth();
        }
      });
    }

    // Set up global first-interaction listeners in case autoplay is blocked on mobile
    this.setupFirstInteractionListeners();

    // Attempt initial autoplay as required
    this.attemptAutoplay();
  }

  /**
   * Attempts automatic playback on initial page load
   */
  attemptAutoplay() {
    if (this.isPlaying || this.userExplicitlyPaused) return;

    if (this.htmlAudio) {
      const playPromise = this.htmlAudio.play();
      if (playPromise !== undefined && typeof playPromise.then === "function") {
        playPromise
          .then(() => {
            if (this.userExplicitlyPaused) {
              try { this.htmlAudio.pause(); } catch (e) {}
              this.isPlaying = false;
              if (this.onStateChange) this.onStateChange(false);
              return;
            }
            this.isPlaying = true;
            this.isAutoplayBlocked = false;
            this.firstGestureHandled = true;
            this.removeFirstInteractionListeners();
            if (this.onStateChange) this.onStateChange(true);
          })
          .catch(() => {
            // Expected on mobile devices without user activation
            this.isPlaying = false;
            this.isAutoplayBlocked = true;
            if (this.onStateChange) this.onStateChange(false);
          });
      }
    }
  }

  /**
   * Adds one-time window listeners for user gesture (touchend, click, keydown)
   * Note: We avoid 'touchstart' because iOS Safari requires touchend/click for audio activation.
   */
  setupFirstInteractionListeners() {
    const events = ["touchend", "click", "keydown"];
    events.forEach((ev) => {
      window.addEventListener(ev, this._boundFirstInteraction, { capture: true, passive: true });
    });
  }

  /**
   * Removes one-time window listeners
   */
  removeFirstInteractionListeners() {
    const events = ["touchend", "click", "keydown"];
    events.forEach((ev) => {
      window.removeEventListener(ev, this._boundFirstInteraction, { capture: true });
    });
  }

  /**
   * Handles first user gesture on the page
   */
  handleFirstInteraction(event) {
    if (this.firstGestureHandled) return;

    // If target was the explicit audio toggle button, let its dedicated handler execute
    if (event && event.target && event.target.closest && event.target.closest("#audioToggleBtn")) {
      this.firstGestureHandled = true;
      this.removeFirstInteractionListeners();
      return;
    }

    this.triggerFirstInteractionPlayback();
  }

  /**
   * Starts playback on first interaction (e.g., clicking "Open Invitation", wax seal, or tap)
   * Respects explicit user pause action.
   */
  triggerFirstInteractionPlayback() {
    this.firstGestureHandled = true;
    this.removeFirstInteractionListeners();

    // If user explicitly paused previously, DO NOT force playback
    if (this.userExplicitlyPaused || this.isPlaying) {
      return Promise.resolve(false);
    }

    return this.play(true);
  }

  /**
   * Main play method - returns Promise for direct caller handling
   */
  play(fromUserGesture = true) {
    if (fromUserGesture) {
      this.userExplicitlyPaused = false;
    }

    // Unlock Web Audio context synchronously during user gesture
    this.initAudioContext();

    if (this.htmlAudio) {
      // Ensure source is present
      const targetSrc = "assets/audio/padharo-mhare-desh.mp3";
      if (!this.htmlAudio.getAttribute("src") || this.htmlAudio.src === "" || this.htmlAudio.src === window.location.href) {
        this.htmlAudio.src = targetSrc;
        try { this.htmlAudio.load(); } catch (e) {}
      }

      const playPromise = this.htmlAudio.play();
      if (playPromise !== undefined && typeof playPromise.then === "function") {
        return playPromise
          .then(() => {
            if (this.userExplicitlyPaused) {
              try { this.htmlAudio.pause(); } catch (e) {}
              this.isPlaying = false;
              if (this.onStateChange) this.onStateChange(false);
              return false;
            }
            this.isPlaying = true;
            this.stopSynth();
            if (this.onStateChange) this.onStateChange(true);
            return true;
          })
          .catch((err) => {
            if (this.userExplicitlyPaused || (err && err.name === 'AbortError')) {
              this.isPlaying = false;
              if (this.onStateChange) this.onStateChange(false);
              return false;
            }
            console.warn("Audio play() promise rejected, falling back to Web Audio synth:", err);
            this.isPlaying = false;
            if (this.onStateChange) this.onStateChange(false);

            // If triggered by a user gesture, start the Web Audio API synthesized Maand melody
            if (fromUserGesture) {
              this.startSynth();
              this.isPlaying = true;
              if (this.onStateChange) this.onStateChange(true);
            }
            return false;
          });
      } else {
        this.isPlaying = true;
        this.stopSynth();
        if (this.onStateChange) this.onStateChange(true);
        return Promise.resolve(true);
      }
    } else {
      this.startSynth();
      this.isPlaying = true;
      if (this.onStateChange) this.onStateChange(true);
      return Promise.resolve(true);
    }
  }

  /**
   * Main pause method - respects user's explicit action
   */
  pause(isUserExplicit = true) {
    if (isUserExplicit) {
      this.userExplicitlyPaused = true;
    }
    this.isPlaying = false;

    if (this.htmlAudio) {
      try {
        this.htmlAudio.pause();
      } catch (e) {}
    }

    this.stopSynth();

    if (this.onStateChange) {
      this.onStateChange(false);
    }
    return true;
  }

  /**
   * Toggles playback state
   */
  toggle() {
    if (this.isPlaying) {
      this.pause(true);
      return false;
    } else {
      this.play(true);
      return true;
    }
  }

  // --- Web Audio API Synth Fallback (Rajasthani Maand Drone & Folk Motif) ---
  initAudioContext() {
    if (!this.audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioContext = new AudioCtx();
      }
    }
    if (this.audioContext && this.audioContext.state === "suspended") {
      try {
        this.audioContext.resume();
      } catch (e) {}
    }
  }

  startSynth() {
    try {
      this.initAudioContext();
      if (!this.audioContext) return;
      this.startSynthDrone();
      this.startMelodyLoop();
    } catch (e) {
      console.warn("Web Audio API synth could not start:", e);
    }
  }

  stopSynth() {
    if (this.melodyInterval) {
      clearInterval(this.melodyInterval);
      this.melodyInterval = null;
    }
    if (this.droneGain && this.audioContext) {
      try {
        this.droneGain.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime + 0.4);
      } catch (e) {}
    }
  }

  startSynthDrone() {
    if (!this.audioContext) return;

    this.droneGain = this.audioContext.createGain();
    this.droneGain.gain.setValueAtTime(0.001, this.audioContext.currentTime);
    this.droneGain.gain.exponentialRampToValueAtTime(0.07, this.audioContext.currentTime + 2);
    this.droneGain.connect(this.audioContext.destination);

    // Traditional Tanpura Drone: Pa (392Hz), Sa (261.63Hz), Lower Sa (130.81Hz)
    const droneFreqs = [130.81, 261.63, 392.00];
    droneFreqs.forEach((freq) => {
      const osc = this.audioContext.createOscillator();
      const oscGain = this.audioContext.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.audioContext.currentTime);

      const lfo = this.audioContext.createOscillator();
      const lfoGain = this.audioContext.createGain();
      lfo.frequency.setValueAtTime(0.18, this.audioContext.currentTime);
      lfoGain.gain.setValueAtTime(0.6, this.audioContext.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      oscGain.gain.setValueAtTime(0.35, this.audioContext.currentTime);
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
    const osc1 = this.audioContext.createOscillator();
    const osc2 = this.audioContext.createOscillator();
    const noteGain = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();

    osc1.type = "triangle";
    osc2.type = "sawtooth";
    osc1.frequency.setValueAtTime(freq, now);
    osc2.frequency.setValueAtTime(freq * 1.002, now);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1400, now);
    filter.Q.setValueAtTime(3.5, now);

    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.exponentialRampToValueAtTime(0.08, now + 0.07);
    noteGain.gain.exponentialRampToValueAtTime(0.03, now + 0.32);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.audioContext.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.85);
    osc2.stop(now + 0.85);
  }

  startMelodyLoop() {
    this.currentStep = 0;
    if (this.melodyInterval) clearInterval(this.melodyInterval);
    this.melodyInterval = setInterval(() => {
      if (!this.isPlaying) return;
      const note = this.melodyPattern[this.currentStep % this.melodyPattern.length];
      if (note) {
        this.playMelodyNote(note);
      }
      this.currentStep++;
    }, this.tempoMs);
  }
}

// Global instance
window.weddingAudio = new WeddingAudioManager();
