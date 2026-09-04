// Shared data model for the Vocalynx companion app. Everything the app knows
// about a person's vocal recovery lives in these shapes and is persisted
// on-device (see store.ts). No server, no account — the browser is the source
// of truth.

// Primary tabs — mirrors the case study's bottom bar.
export type ScreenId = "today" | "practice" | "record" | "profile";

export type ExerciseCategory = "warmup" | "breath" | "recovery" | "range";

/** A single timed step inside a guided exercise. */
export type ExercisePhase = {
  /** Short instruction shown large during the phase, e.g. "Sustain 'ee'". */
  label: string;
  /** Optional sub-instruction / coaching line. */
  hint?: string;
  /** How long this phase lasts, in seconds. */
  seconds: number;
  /**
   * What the live visualiser should show for this phase.
   * - "sustain": hold a steady note, waveform + pitch steadiness
   * - "glide":   siren up/down against a moving pitch target
   * - "breath":  paced breathing orb (inhale / hold / exhale)
   * - "rest":    recover, no capture
   */
  mode: "sustain" | "glide" | "breath" | "rest";
  /** For breath phases: the phase of the breath cycle. */
  breath?: "inhale" | "hold" | "exhale";
  /** For glide phases: relative pitch contour (0..1) sampled across the phase. */
  contour?: number[];
};

export type Exercise = {
  id: string;
  name: string;
  /** e.g. "Straw phonation" */
  family: string;
  category: ExerciseCategory;
  /** One-line description of what it does for the voice. */
  blurb: string;
  /** Total minutes, precomputed for display. */
  minutes: number;
  /** The clinical reason it's prescribed. */
  benefit: string;
  /** Whether the Vocalynx device adds anything (never required). */
  usesDevice: boolean;
  phases: ExercisePhase[];
};

/** Metrics distilled from one captured take. All optional — a rest-only or
 *  device-free run may not produce every field. */
export type TakeMetrics = {
  /** 0..100 — how steady the held pitch was (low jitter = high). */
  steadiness: number;
  /** Median detected pitch across voiced frames, in Hz. */
  avgPitchHz: number | null;
  /** Vocal range covered in the take, in semitones. */
  rangeSemitones: number;
  /** Maximum phonation time — longest unbroken voiced stretch, seconds. */
  mpt: number;
  /** Loudness, dBFS-ish (negative, closer to 0 = louder). */
  loudnessDb: number;
  /** Fraction of the take that was actually voiced, 0..1. */
  voicedRatio: number;
};

export type SessionRecord = {
  id: string;
  /** ISO date-time the session finished. */
  at: string;
  exerciseId: string;
  exerciseName: string;
  category: ExerciseCategory;
  durationSec: number;
  metrics: TakeMetrics;
  /** Composite 0..100 vocal-health score for this session. */
  healthScore: number;
  /** Linked voice recording, if the person kept one. */
  recordingId?: string;
  /** Seeded sample data vs. a real session the person did. */
  sample?: boolean;
  /** Captured with a real mic vs. the simulated fallback. */
  simulated?: boolean;
};

export type Recording = {
  id: string;
  at: string;
  label: string;
  exerciseId?: string;
  durationSec: number;
  metrics: TakeMetrics;
  note?: string;
  /** MIME type of the stored blob (in IndexedDB), if any. */
  mime?: string;
  /** True when there is no real audio blob (simulated / demo). */
  demo?: boolean;
  sample?: boolean;
};

export type Reminder = { id: string; time: string; on: boolean };

export type Settings = {
  name: string;
  /** Whether the person has completed the first-run setup flow. */
  onboarded: boolean;
  /**
   * Whether the person owns a Vocalynx handheld. Set during onboarding.
   * The app is fully usable either way — this only tailors the straw
   * exercises and the aperture guide's wording.
   */
  hasDevice: boolean;
  /** Mic calibration completed at least once. */
  calibrated: boolean;
  /** Noise floor captured during calibration, RMS 0..1. */
  noiseFloor: number;
  /** Input sensitivity multiplier the person set, ~0.5..2. */
  inputGain: number;
  /** Aperture guide target in mm. The Vocalynx is a manual device you twist
   *  to this diameter; owners set their real band, everyone can use it as a
   *  visual target. */
  apertureMm: number;
  reminders: Reminder[];
  /** Prescription: target minutes per day. */
  dailyGoalMin: number;
};

export type VocalynxData = {
  version: number;
  settings: Settings;
  sessions: SessionRecord[];
  recordings: Recording[];
  /** First time the app was opened (for streak / age display). */
  firstRun: string;
};
