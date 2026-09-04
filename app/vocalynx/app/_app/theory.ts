// Pitch ↔ note helpers. Kept framework-free so both the live analyser and the
// metrics layer can share them.

const NOTE_NAMES = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];
const A4 = 440;

/** MIDI note number (float) for a frequency. */
export function freqToMidi(hz: number): number {
  return 69 + 12 * Math.log2(hz / A4);
}

export function midiToFreq(midi: number): number {
  return A4 * Math.pow(2, (midi - 69) / 12);
}

export type NoteReading = { name: string; octave: number; cents: number };

/** Nearest note plus how many cents sharp/flat (−50..+50). */
export function freqToNote(hz: number): NoteReading {
  const midi = freqToMidi(hz);
  const rounded = Math.round(midi);
  const cents = Math.round((midi - rounded) * 100);
  const name = NOTE_NAMES[((rounded % 12) + 12) % 12];
  const octave = Math.floor(rounded / 12) - 1;
  return { name, octave, cents };
}

export function noteLabel(hz: number | null): string {
  if (!hz || !isFinite(hz)) return "—";
  const { name, octave } = freqToNote(hz);
  return `${name}${octave}`;
}

/** A comfortable default voice window (E2..C6) for mapping pitch to a 0..1
 *  position on the range visualisers. */
export const PITCH_FLOOR_HZ = midiToFreq(40); // E2
export const PITCH_CEIL_HZ = midiToFreq(84); // C6

export function pitchToUnit(hz: number): number {
  const midi = freqToMidi(hz);
  const lo = 40;
  const hi = 84;
  return Math.min(1, Math.max(0, (midi - lo) / (hi - lo)));
}
