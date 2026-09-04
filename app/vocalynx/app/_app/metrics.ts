import type { SessionRecord, TakeMetrics } from "./types";
import { freqToMidi } from "./theory";

// Turns the raw stream of per-frame samples captured during a run into the
// handful of numbers clinicians and singers actually care about, then rolls
// those up into a single vocal-health score and longer-term trends.

export type FrameSample = {
  t: number; // ms since take start
  level: number; // RMS 0..1
  pitch: number | null; // Hz, null when unvoiced
};

const VOICED_LEVEL = 0.02; // RMS above which we treat a frame as voiced

export function computeMetrics(samples: FrameSample[]): TakeMetrics {
  const voiced = samples.filter((s) => s.pitch && s.level > VOICED_LEVEL);
  const voicedRatio = samples.length ? voiced.length / samples.length : 0;

  // Median pitch (robust to octave-jump glitches).
  const pitches = voiced.map((s) => s.pitch as number).sort((a, b) => a - b);
  const avgPitchHz = pitches.length ? pitches[Math.floor(pitches.length / 2)] : null;

  // Range in semitones between the 5th and 95th percentile note (trims spikes).
  let rangeSemitones = 0;
  if (pitches.length > 4) {
    const midis = pitches.map(freqToMidi).sort((a, b) => a - b);
    const lo = midis[Math.floor(midis.length * 0.05)];
    const hi = midis[Math.floor(midis.length * 0.95)];
    rangeSemitones = Math.max(0, Math.round((hi - lo) * 10) / 10);
  }

  // Steadiness: inverse of frame-to-frame pitch jitter (in cents) on voiced runs.
  let steadiness = 0;
  if (voiced.length > 3) {
    let jitterSum = 0;
    let n = 0;
    for (let i = 1; i < voiced.length; i++) {
      const a = voiced[i - 1].pitch as number;
      const b = voiced[i].pitch as number;
      const cents = Math.abs(1200 * Math.log2(b / a));
      if (cents < 400) {
        jitterSum += cents;
        n++;
      }
    }
    const avgJitter = n ? jitterSum / n : 200;
    // 0 cents → 100, ~35 cents → ~0. Musical vibrato lands mid-scale.
    steadiness = Math.round(Math.max(0, Math.min(100, 100 - avgJitter * 2.8)));
  }

  // Maximum phonation time: longest unbroken voiced stretch.
  let mpt = 0;
  let runStart: number | null = null;
  for (let i = 0; i < samples.length; i++) {
    const on = samples[i].pitch && samples[i].level > VOICED_LEVEL;
    if (on && runStart === null) runStart = samples[i].t;
    if ((!on || i === samples.length - 1) && runStart !== null) {
      const end = samples[i].t;
      mpt = Math.max(mpt, (end - runStart) / 1000);
      runStart = null;
    }
  }
  mpt = Math.round(mpt * 10) / 10;

  // Loudness: peak RMS mapped to a dBFS-ish figure.
  const peak = samples.reduce((m, s) => Math.max(m, s.level), 0);
  const loudnessDb = peak > 0 ? Math.round(20 * Math.log10(peak)) : -60;

  return {
    steadiness,
    avgPitchHz: avgPitchHz ? Math.round(avgPitchHz) : null,
    rangeSemitones,
    mpt,
    loudnessDb,
    voicedRatio: Math.round(voicedRatio * 100) / 100,
  };
}

/**
 * Composite 0..100 vocal-health score. Weighted so steadiness and stamina —
 * the two things recovery is really about — count most, with a nod to how much
 * of the take was actually voiced (did they engage).
 */
export function healthScore(m: TakeMetrics): number {
  const steady = m.steadiness; // 0..100
  const stamina = Math.min(100, (m.mpt / 15) * 100); // 15s+ is excellent
  const engagement = m.voicedRatio * 100;
  const score = steady * 0.5 + stamina * 0.35 + engagement * 0.15;
  return Math.round(Math.max(0, Math.min(100, score)));
}

// ---------------------------------------------------------------------------
// Longer-term rollups used by the Progress screen.
// ---------------------------------------------------------------------------

export function startOfDay(d: Date): number {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

/** Current consecutive-day practice streak, counting back from today. */
export function computeStreak(sessions: SessionRecord[]): number {
  if (!sessions.length) return 0;
  const days = new Set(sessions.map((s) => startOfDay(new Date(s.at))));
  let streak = 0;
  const cursor = new Date();
  // Allow "today not yet done" to still show yesterday's streak.
  if (!days.has(startOfDay(cursor))) cursor.setDate(cursor.getDate() - 1);
  while (days.has(startOfDay(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export type DayBucket = {
  day: number; // startOfDay ms
  label: string; // "Mon"
  sessions: SessionRecord[];
  avgScore: number | null;
};

/** Buckets sessions into the last `n` days (oldest → newest). */
export function dailyBuckets(sessions: SessionRecord[], n = 14): DayBucket[] {
  const out: DayBucket[] = [];
  const today = startOfDay(new Date());
  for (let i = n - 1; i >= 0; i--) {
    const day = today - i * 86_400_000;
    const inDay = sessions.filter((s) => startOfDay(new Date(s.at)) === day);
    const avgScore = inDay.length
      ? Math.round(inDay.reduce((a, s) => a + s.healthScore, 0) / inDay.length)
      : null;
    out.push({
      day,
      label: new Date(day).toLocaleDateString(undefined, { weekday: "short" }),
      sessions: inDay,
      avgScore,
    });
  }
  return out;
}

export function averageOf(nums: number[]): number {
  return nums.length ? Math.round(nums.reduce((a, b) => a + b, 0) / nums.length) : 0;
}
