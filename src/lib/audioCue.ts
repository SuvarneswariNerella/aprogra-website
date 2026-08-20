// Web Audio API tactile audio cue utility for section snap feedback

let audioCtx: AudioContext | null = null;
let isMuted = false;

if (typeof window !== 'undefined') {
  const savedMute = localStorage.getItem('snap_audio_muted');
  if (savedMute !== null) {
    isMuted = savedMute === 'true';
  }
}

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

// Auto-unlock AudioContext on initial user gesture if suspended
if (typeof window !== 'undefined') {
  const unlockAudio = () => {
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
  };
  window.addEventListener('pointerdown', unlockAudio, { once: true });
  window.addEventListener('keydown', unlockAudio, { once: true });
}

export type SnapAudioCueType = 'both' | 'click' | 'thud';

/**
 * Plays a high-definition, normalized Web Audio API audio cue ('click' + 'thud')
 * when a section snaps into view, ensuring crisp audibility at standard system volume.
 */
export function playSnapAudioCue(type: SnapAudioCueType = 'both') {
  if (isMuted) return;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // 1. Master Gain Node with normalized output volume level
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.85, now);

    // 2. Dynamics Compressor Node to normalize peaks and ensure crispness without distortion
    const compressor = ctx.createDynamicsCompressor();
    compressor.threshold.setValueAtTime(-14, now);
    compressor.knee.setValueAtTime(6, now);
    compressor.ratio.setValueAtTime(5, now);
    compressor.attack.setValueAtTime(0.002, now);
    compressor.release.setValueAtTime(0.04, now);

    masterGain.connect(compressor);
    compressor.connect(ctx.destination);

    // 3. Crisp High-Frequency 'Click' Component
    if (type === 'both' || type === 'click') {
      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      const clickFilter = ctx.createBiquadFilter();

      clickOsc.type = 'triangle';
      // Pitch drop: starts high at 1400Hz and rapidly snaps down to 320Hz in 12ms
      clickOsc.frequency.setValueAtTime(1400, now);
      clickOsc.frequency.exponentialRampToValueAtTime(320, now + 0.012);

      // Bandpass filter centered around 2000Hz to heighten tactile click crispness
      clickFilter.type = 'bandpass';
      clickFilter.frequency.setValueAtTime(2000, now);
      clickFilter.Q.setValueAtTime(1.8, now);

      // Fast transient gain envelope
      clickGain.gain.setValueAtTime(0.0, now);
      clickGain.gain.linearRampToValueAtTime(0.75, now + 0.002);
      clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.022);

      clickOsc.connect(clickFilter);
      clickFilter.connect(clickGain);
      clickGain.connect(masterGain);

      clickOsc.start(now);
      clickOsc.stop(now + 0.025);
    }

    // 4. Punchy Low-Frequency 'Thud' Component
    if (type === 'both' || type === 'thud') {
      const thudOsc = ctx.createOscillator();
      const thudGain = ctx.createGain();

      thudOsc.type = 'sine';
      // Pitch drop: starts at 170Hz and drops exponentially to 48Hz for a warm tactile bass punch
      thudOsc.frequency.setValueAtTime(170, now);
      thudOsc.frequency.exponentialRampToValueAtTime(48, now + 0.055);

      // Sub-frequency gain envelope
      thudGain.gain.setValueAtTime(0.0, now);
      thudGain.gain.linearRampToValueAtTime(0.90, now + 0.004);
      thudGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.065);

      thudOsc.connect(thudGain);
      thudGain.connect(masterGain);

      thudOsc.start(now);
      thudOsc.stop(now + 0.07);
    }
  } catch (err) {
    // Silently catch audio context autoplay restrictions
  }
}

export function setAudioCueMuted(muted: boolean) {
  isMuted = muted;
  if (typeof window !== 'undefined') {
    localStorage.setItem('snap_audio_muted', String(muted));
  }
}

export function getAudioCueMuted(): boolean {
  return isMuted;
}

