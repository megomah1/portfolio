// The vocal-capture engine. Wraps getUserMedia + Web Audio so the rest of the
// app can just read frames ({ level, pitch, waveform }) and record takes,
// without knowing whether the source is a real microphone or the simulated
// fallback used when a mic isn't available.

export type Frame = {
  /** Smoothed RMS level, 0..1, already noise-gated + gain-adjusted. */
  level: number;
  /** Detected fundamental in Hz, or null when unvoiced. */
  pitch: number | null;
  /** Time-domain waveform, −1..1, for the oscilloscope. */
  waveform: Float32Array;
};

export interface CaptureSource {
  readonly simulated: boolean;
  frame(): Frame;
  /** Begin recording; resolves false if recording isn't possible (e.g. sim). */
  startRecording(): boolean;
  /** Stop and return the recorded blob (null if none / simulated). */
  stopRecording(): Promise<Blob | null>;
  stop(): void;
}

// --- pitch detection -------------------------------------------------------
// Normalised autocorrelation with parabolic interpolation. Returns Hz or null.

function detectPitch(buf: Float32Array, sampleRate: number, floor: number): number | null {
  const SIZE = buf.length;
  let rms = 0;
  for (let i = 0; i < SIZE; i++) rms += buf[i] * buf[i];
  rms = Math.sqrt(rms / SIZE);
  if (rms < Math.max(0.01, floor)) return null; // too quiet to be voiced

  // Trim leading/trailing low-amplitude samples to sharpen the correlation.
  const thres = 0.2;
  let r1 = 0;
  let r2 = SIZE - 1;
  for (let i = 0; i < SIZE / 2; i++) {
    if (Math.abs(buf[i]) < thres) {
      r1 = i;
      break;
    }
  }
  for (let i = 1; i < SIZE / 2; i++) {
    if (Math.abs(buf[SIZE - i]) < thres) {
      r2 = SIZE - i;
      break;
    }
  }
  const trimmed = buf.subarray(r1, r2);
  const n = trimmed.length;
  if (n < 128) return null;

  const c = new Float32Array(n);
  for (let lag = 0; lag < n; lag++) {
    let sum = 0;
    for (let i = 0; i < n - lag; i++) sum += trimmed[i] * trimmed[i + lag];
    c[lag] = sum;
  }

  // Skip the initial downslope, then find the first strong peak.
  let d = 0;
  while (d < n - 1 && c[d] > c[d + 1]) d++;
  let maxPos = -1;
  let maxVal = -1;
  for (let i = d; i < n; i++) {
    if (c[i] > maxVal) {
      maxVal = c[i];
      maxPos = i;
    }
  }
  if (maxPos <= 0) return null;

  // Parabolic interpolation around the peak for sub-sample accuracy.
  let T0 = maxPos;
  const x1 = c[T0 - 1] ?? 0;
  const x2 = c[T0];
  const x3 = c[T0 + 1] ?? 0;
  const a = (x1 + x3 - 2 * x2) / 2;
  const b = (x3 - x1) / 2;
  if (a) T0 = T0 - b / (2 * a);

  const hz = sampleRate / T0;
  if (hz < 60 || hz > 1200) return null; // outside plausible sung/spoken range
  return hz;
}

// --- real microphone -------------------------------------------------------

class MicSource implements CaptureSource {
  readonly simulated = false;
  private ctx: AudioContext;
  private stream: MediaStream;
  private analyser: AnalyserNode;
  private timeBuf: Float32Array<ArrayBuffer>;
  private smoothedLevel = 0;
  private gain: number;
  private floor: number;
  private recorder: MediaRecorder | null = null;
  private chunks: Blob[] = [];

  constructor(ctx: AudioContext, stream: MediaStream, gain: number, floor: number) {
    this.ctx = ctx;
    this.stream = stream;
    this.gain = gain;
    this.floor = floor;
    const src = ctx.createMediaStreamSource(stream);
    this.analyser = ctx.createAnalyser();
    this.analyser.fftSize = 2048;
    this.analyser.smoothingTimeConstant = 0.2;
    src.connect(this.analyser);
    this.timeBuf = new Float32Array(this.analyser.fftSize);
  }

  frame(): Frame {
    this.analyser.getFloatTimeDomainData(this.timeBuf);
    let sum = 0;
    for (let i = 0; i < this.timeBuf.length; i++) sum += this.timeBuf[i] * this.timeBuf[i];
    const rms = Math.sqrt(sum / this.timeBuf.length) * this.gain;
    // Gate + smooth.
    const gated = rms < this.floor ? 0 : rms;
    this.smoothedLevel += (gated - this.smoothedLevel) * 0.35;
    const level = Math.min(1, this.smoothedLevel * 6);

    // Run pitch detection on a 1024-sample slice to keep it cheap.
    const pitch =
      gated > 0
        ? detectPitch(this.timeBuf.subarray(0, 1024), this.ctx.sampleRate, this.floor)
        : null;

    return { level, pitch, waveform: this.timeBuf };
  }

  startRecording(): boolean {
    if (typeof MediaRecorder === "undefined") return false;
    try {
      const mime = MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : MediaRecorder.isTypeSupported("audio/mp4")
          ? "audio/mp4"
          : "";
      this.chunks = [];
      this.recorder = new MediaRecorder(this.stream, mime ? { mimeType: mime } : undefined);
      this.recorder.ondataavailable = (e) => {
        if (e.data.size) this.chunks.push(e.data);
      };
      this.recorder.start();
      return true;
    } catch {
      this.recorder = null;
      return false;
    }
  }

  stopRecording(): Promise<Blob | null> {
    return new Promise((resolve) => {
      const rec = this.recorder;
      if (!rec || rec.state === "inactive") {
        resolve(null);
        return;
      }
      rec.onstop = () => {
        const blob = this.chunks.length
          ? new Blob(this.chunks, { type: rec.mimeType || "audio/webm" })
          : null;
        this.chunks = [];
        this.recorder = null;
        resolve(blob);
      };
      rec.stop();
    });
  }

  stop() {
    try {
      this.stream.getTracks().forEach((t) => t.stop());
      this.ctx.close();
    } catch {
      /* already closed */
    }
  }
}

// --- simulated fallback -----------------------------------------------------
// Produces plausible, gently-varying level + pitch + waveform so every
// visualiser still animates when there's no mic (denied, unsupported, or SSR
// preview). Honest about being a demo via `simulated`.

class SimSource implements CaptureSource {
  readonly simulated = true;
  private t0 = performance.now();
  private wf = new Float32Array(2048);
  /** Optional target pitch the sim drifts around (Hz), set by the runner. */
  target: number | null = 196; // G3-ish

  frame(): Frame {
    const t = (performance.now() - this.t0) / 1000;
    // Breath-like envelope: swells and fades.
    const env = 0.55 + 0.4 * Math.sin(t * 1.1) * Math.sin(t * 0.37 + 1);
    const level = Math.max(0, Math.min(1, env));
    const base = this.target ?? 196;
    // Wander around the target with a slow drift + tiny vibrato.
    const pitch =
      level > 0.12
        ? base * Math.pow(2, (Math.sin(t * 0.6) * 1.5 + Math.sin(t * 5.2) * 0.15) / 12)
        : null;
    // Synthesised waveform at the current pitch for the oscilloscope.
    const hz = pitch ?? base;
    for (let i = 0; i < this.wf.length; i++) {
      const ph = ((i / 44100) * hz + t) * Math.PI * 2;
      this.wf[i] = (Math.sin(ph) * 0.6 + Math.sin(ph * 2) * 0.2) * level;
    }
    return { level, pitch, waveform: this.wf };
  }

  startRecording(): boolean {
    return false;
  }

  async stopRecording(): Promise<Blob | null> {
    return null;
  }

  stop() {
    /* nothing to release */
  }
}

/**
 * Try for a real microphone; fall back to the simulator on any failure so the
 * experience never dead-ends. `gain` and `floor` come from calibration.
 */
export async function createCaptureSource(opts: {
  gain?: number;
  floor?: number;
}): Promise<CaptureSource> {
  const gain = opts.gain ?? 1;
  const floor = opts.floor ?? 0.008;
  try {
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      return new SimSource();
    }
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false,
      },
    });
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    if (ctx.state === "suspended") await ctx.resume();
    return new MicSource(ctx, stream, gain, floor);
  } catch {
    return new SimSource();
  }
}

export { SimSource };
