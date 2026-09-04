import type { Exercise, ExerciseCategory } from "./types";

// A small, clinically-shaped catalogue. Each exercise is a sequence of timed
// phases so the runner can give a clear rhythm to follow — the thing the
// research surfaced as missing when practising alone. Contours drive the
// moving pitch target on glide phases (values 0..1, low pitch → high pitch).

const sirenUp = [0, 0.15, 0.32, 0.5, 0.68, 0.85, 1];
const sirenDown = [1, 0.85, 0.68, 0.5, 0.32, 0.15, 0];
const sirenUpDown = [0, 0.25, 0.5, 0.75, 1, 0.75, 0.5, 0.25, 0];
const wave = [0.2, 0.5, 0.8, 0.5, 0.2, 0.5, 0.8, 0.5, 0.2];

export const exercises: Exercise[] = [
  {
    id: "straw-warmup",
    name: "Straw warm-up",
    family: "Straw phonation",
    category: "warmup",
    blurb: "Gentle semi-occluded hums to wake the voice up without strain.",
    minutes: 5,
    benefit:
      "Semi-occluded vocal tract exercises balance the pressure above and below the vocal folds, easing them back into vibration.",
    usesDevice: true,
    phases: [
      { label: "Settle", hint: "Relax your shoulders and jaw", seconds: 6, mode: "rest" },
      { label: "Breathe in", seconds: 4, mode: "breath", breath: "inhale" },
      { label: "Hum through the straw", hint: "Steady, easy tone", seconds: 10, mode: "sustain" },
      { label: "Rest", seconds: 4, mode: "rest" },
      { label: "Breathe in", seconds: 4, mode: "breath", breath: "inhale" },
      { label: "Hum a little higher", hint: "Keep it gentle", seconds: 10, mode: "sustain" },
      { label: "Rest", seconds: 4, mode: "rest" },
      { label: "Breathe in", seconds: 4, mode: "breath", breath: "inhale" },
      { label: "One long hum", hint: "Hold as long as feels easy", seconds: 12, mode: "sustain" },
      { label: "Well done", hint: "Shake it out", seconds: 5, mode: "rest" },
    ],
  },
  {
    id: "box-breathing",
    name: "Box breathing",
    family: "Breath support",
    category: "breath",
    blurb: "Even four-count breathing to steady airflow before you sing or speak.",
    minutes: 4,
    benefit:
      "Slow, even breathing trains the steady sub-glottal pressure that a healthy, unforced voice sits on top of.",
    usesDevice: false,
    phases: [
      { label: "Get comfortable", hint: "Sit tall, hands soft", seconds: 5, mode: "rest" },
      { label: "Breathe in", seconds: 4, mode: "breath", breath: "inhale" },
      { label: "Hold", seconds: 4, mode: "breath", breath: "hold" },
      { label: "Breathe out", seconds: 4, mode: "breath", breath: "exhale" },
      { label: "Hold", seconds: 4, mode: "breath", breath: "hold" },
      { label: "Breathe in", seconds: 4, mode: "breath", breath: "inhale" },
      { label: "Hold", seconds: 4, mode: "breath", breath: "hold" },
      { label: "Breathe out", seconds: 6, mode: "breath", breath: "exhale" },
      { label: "Hold", seconds: 4, mode: "breath", breath: "hold" },
      { label: "Breathe in", seconds: 4, mode: "breath", breath: "inhale" },
      { label: "Long breathe out", hint: "Let it all go", seconds: 8, mode: "breath", breath: "exhale" },
      { label: "Settled", seconds: 4, mode: "rest" },
    ],
  },
  {
    id: "sirens",
    name: "Gentle sirens",
    family: "Pitch glides",
    category: "range",
    blurb: "Slide smoothly up and down to stretch your range without pushing.",
    minutes: 5,
    benefit:
      "Smooth glides lengthen and shorten the vocal folds through their full travel, restoring flexibility after injury.",
    usesDevice: false,
    phases: [
      { label: "Breathe in", seconds: 4, mode: "breath", breath: "inhale" },
      { label: "Slide up", hint: "Follow the line on an 'oo'", seconds: 8, mode: "glide", contour: sirenUp },
      { label: "Rest", seconds: 3, mode: "rest" },
      { label: "Breathe in", seconds: 4, mode: "breath", breath: "inhale" },
      { label: "Slide down", hint: "Ease back down", seconds: 8, mode: "glide", contour: sirenDown },
      { label: "Rest", seconds: 3, mode: "rest" },
      { label: "Breathe in", seconds: 4, mode: "breath", breath: "inhale" },
      { label: "Up and over", hint: "One smooth arc", seconds: 10, mode: "glide", contour: sirenUpDown },
      { label: "Rest", seconds: 3, mode: "rest" },
      { label: "Gentle waves", hint: "Ride the curve", seconds: 10, mode: "glide", contour: wave },
      { label: "Beautiful", hint: "Relax", seconds: 4, mode: "rest" },
    ],
  },
  {
    id: "sustained-vowels",
    name: "Sustained vowels",
    family: "Phonation",
    category: "recovery",
    blurb: "Hold steady 'ah' and 'ee' tones to rebuild stamina and control.",
    minutes: 6,
    benefit:
      "Sustained tones measure and rebuild maximum phonation time — a core marker clinicians track through recovery.",
    usesDevice: false,
    phases: [
      { label: "Breathe in", seconds: 4, mode: "breath", breath: "inhale" },
      { label: "Hold 'ah'", hint: "Steady and even", seconds: 12, mode: "sustain" },
      { label: "Rest", seconds: 5, mode: "rest" },
      { label: "Breathe in", seconds: 4, mode: "breath", breath: "inhale" },
      { label: "Hold 'ee'", hint: "Bright, easy tone", seconds: 12, mode: "sustain" },
      { label: "Rest", seconds: 5, mode: "rest" },
      { label: "Breathe in", seconds: 4, mode: "breath", breath: "inhale" },
      { label: "Hold 'oo'", hint: "Round and soft", seconds: 12, mode: "sustain" },
      { label: "Rest", seconds: 5, mode: "rest" },
      { label: "Breathe in", seconds: 4, mode: "breath", breath: "inhale" },
      { label: "Longest 'ah'", hint: "Hold as long as you comfortably can", seconds: 15, mode: "sustain" },
      { label: "Done", hint: "Great stamina work", seconds: 5, mode: "rest" },
    ],
  },
];

export const categoryLabels: Record<ExerciseCategory, string> = {
  warmup: "Warm-up",
  breath: "Breathing",
  range: "Range & flexibility",
  recovery: "Strength & recovery",
};

export function getExercise(id: string): Exercise | undefined {
  return exercises.find((e) => e.id === id);
}

/** Total seconds of a run, summed from its phases. */
export function exerciseDuration(ex: Exercise): number {
  return ex.phases.reduce((n, p) => n + p.seconds, 0);
}

/** Rotates the "today's session" suggestion by day so it feels prescribed. */
export function suggestedExercise(date = new Date()): Exercise {
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86_400_000
  );
  return exercises[dayOfYear % exercises.length];
}
