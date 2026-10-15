/**
 * Web Audio API Sound Synthesizer
 * Tự động tạo âm thanh hiệu ứng phong cách 8-bit Arcade không cần file mp3 ngoài
 */
class SoundEffects {
  constructor() {
    this.audioCtx = null;
    this.muted = localStorage.getItem('pixel_quiz_muted') === 'true';
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  isMuted() {
    return this.muted;
  }

  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem('pixel_quiz_muted', this.muted);
    return this.muted;
  }

  // Âm thanh khi nhấp nút bấm
  playClick() {
    if (this.muted) return;
    this.init();
    if (!this.audioCtx) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, this.audioCtx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.05);
  }

  // Âm thanh khi trả lời ĐÚNG (chuỗi hợp âm vui tươi C5 - E5 - G5)
  playCorrect() {
    if (this.muted) return;
    this.init();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

    notes.forEach((freq, idx) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.12, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.18);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.2);
    });
  }

  // Âm thanh khi trả lời SAI (âm trầm buzz 8-bit)
  playWrong() {
    if (this.muted) return;
    this.init();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.25);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  // Âm thanh thưởng khi đạt Streak liên tiếp
  playStreak(streakCount) {
    if (this.muted) return;
    this.init();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    const baseFreq = Math.min(800 + streakCount * 120, 2000);

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.15);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.2);
  }

  // Khúc nhạc khải hoàn chiến thắng (Fanfare)
  playVictory() {
    if (this.muted) return;
    this.init();
    if (!this.audioCtx) return;

    const melody = [
      { freq: 523.25, time: 0.00, dur: 0.15 }, // C5
      { freq: 659.25, time: 0.16, dur: 0.15 }, // E5
      { freq: 783.99, time: 0.32, dur: 0.15 }, // G5
      { freq: 1046.50, time: 0.48, dur: 0.35 }, // C6
      { freq: 880.00, time: 0.85, dur: 0.15 }, // A5
      { freq: 1046.50, time: 1.02, dur: 0.50 }  // C6
    ];

    melody.forEach(note => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.freq, this.audioCtx.currentTime + note.time);

      gain.gain.setValueAtTime(0.15, this.audioCtx.currentTime + note.time);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + note.time + note.dur);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(this.audioCtx.currentTime + note.time);
      osc.stop(this.audioCtx.currentTime + note.time + note.dur + 0.05);
    });
  }
}

window.soundEngine = new SoundEffects();
