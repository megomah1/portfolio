"use client";

import { useCallback, useEffect, useState } from "react";
import type {
  Recording,
  SessionRecord,
  Settings,
  TakeMetrics,
  VocalynxData,
} from "./types";
import { healthScore } from "./metrics";

// On-device persistence. Structured data (sessions, recordings metadata,
// settings) lives in localStorage; audio blobs live in IndexedDB, keyed by
// recording id, so we never try to stuff base64 audio into localStorage.

const KEY = "vocalynx.v1";
const DB_NAME = "vocalynx-audio";
const STORE = "clips";

const defaultSettings: Settings = {
  name: "Mona",
  calibrated: false,
  noiseFloor: 0.008,
  inputGain: 1,
  apertureMm: 7,
  deviceConnected: false,
  dailyGoalMin: 12,
  reminders: [
    { id: "r1", time: "09:00", on: true },
    { id: "r2", time: "18:00", on: true },
  ],
};

// --- sample history ---------------------------------------------------------
// Two weeks of gently-improving sessions so the Progress and Record screens
// have something to show immediately. Clearly flagged `sample` so real
// sessions read as the person's own work layered on top.

function makeSampleData(): VocalynxData {
  const exercises: Array<[string, string, SessionRecord["category"]]> = [
    ["straw-warmup", "Straw warm-up", "warmup"],
    ["sustained-vowels", "Sustained vowels", "recovery"],
    ["sirens", "Gentle sirens", "range"],
    ["box-breathing", "Box breathing", "breath"],
  ];
  const sessions: SessionRecord[] = [];
  const now = Date.now();
  for (let d = 13; d >= 1; d--) {
    // Skip a couple of days so the streak/consistency reads like a real person.
    if (d === 9 || d === 4) continue;
    const dayProgress = (13 - d) / 12; // 0 → ~1 over the fortnight
    const [id, name, category] = exercises[d % exercises.length];
    const steadiness = Math.round(58 + dayProgress * 30 + (Math.random() * 8 - 4));
    const mpt = Math.round((7 + dayProgress * 7 + (Math.random() * 2 - 1)) * 10) / 10;
    const metrics: TakeMetrics = {
      steadiness: Math.min(97, steadiness),
      avgPitchHz: 190 + Math.round(Math.random() * 30),
      rangeSemitones: Math.round((6 + dayProgress * 6) * 10) / 10,
      mpt,
      loudnessDb: -18 + Math.round(Math.random() * 4),
      voicedRatio: Math.min(0.95, 0.7 + dayProgress * 0.2),
    };
    const at = new Date(now - d * 86_400_000);
    at.setHours(9 + (d % 2 ? 0 : 9), 20 + (d % 20));
    sessions.push({
      id: `sample-${d}`,
      at: at.toISOString(),
      exerciseId: id,
      exerciseName: name,
      category,
      durationSec: 240 + (d % 4) * 60,
      metrics,
      healthScore: healthScore(metrics),
      sample: true,
    });
  }

  const recordings: Recording[] = [
    {
      id: "sample-rec-1",
      at: new Date(now - 12 * 86_400_000).toISOString(),
      label: "First check-in",
      exerciseId: "sustained-vowels",
      durationSec: 6,
      metrics: sessions[0].metrics,
      note: "Voice felt tight and breathy. Baseline for week one.",
      demo: true,
      sample: true,
    },
    {
      id: "sample-rec-2",
      at: new Date(now - 3 * 86_400_000).toISOString(),
      label: "Feeling clearer",
      exerciseId: "sustained-vowels",
      durationSec: 8,
      metrics: sessions[sessions.length - 1].metrics,
      note: "Much steadier. Held the 'ah' way longer than day one.",
      demo: true,
      sample: true,
    },
  ];

  return {
    version: 1,
    settings: defaultSettings,
    sessions,
    recordings,
    firstRun: new Date(now - 14 * 86_400_000).toISOString(),
  };
}

function load(): VocalynxData {
  if (typeof window === "undefined") return makeSampleData();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      const seeded = makeSampleData();
      localStorage.setItem(KEY, JSON.stringify(seeded));
      return seeded;
    }
    const parsed = JSON.parse(raw) as VocalynxData;
    // Merge settings so new fields get defaults after upgrades.
    parsed.settings = { ...defaultSettings, ...parsed.settings };
    return parsed;
  } catch {
    return makeSampleData();
  }
}

function persist(data: VocalynxData) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* quota or private mode — the app still works for the session */
  }
}

// --- audio blob store (IndexedDB) ------------------------------------------

function openDb(): Promise<IDBDatabase | null> {
  return new Promise((resolve) => {
    if (typeof indexedDB === "undefined") return resolve(null);
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      req.result.createObjectStore(STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => resolve(null);
  });
}

export async function putClip(id: string, blob: Blob): Promise<void> {
  const db = await openDb();
  if (!db) return;
  await new Promise<void>((resolve) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(blob, id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => resolve();
  });
}

export async function getClip(id: string): Promise<Blob | null> {
  const db = await openDb();
  if (!db) return null;
  return new Promise((resolve) => {
    const tx = db.transaction(STORE, "readonly");
    const req = tx.objectStore(STORE).get(id);
    req.onsuccess = () => resolve((req.result as Blob) ?? null);
    req.onerror = () => resolve(null);
  });
}

export async function delClip(id: string): Promise<void> {
  const db = await openDb();
  if (!db) return;
  await new Promise<void>((resolve) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => resolve();
  });
}

// --- React hook -------------------------------------------------------------

export function useVocalynxStore() {
  const [data, setData] = useState<VocalynxData | null>(null);

  useEffect(() => {
    // Client-only hydration: localStorage/IndexedDB aren't available during
    // prerender, so we load after mount. Consumers show a splash until
    // `ready`, so server and first client render match (no hydration mismatch).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setData(load());
  }, []);

  const commit = useCallback((next: VocalynxData) => {
    setData(next);
    persist(next);
  }, []);

  const addSession = useCallback(
    (session: SessionRecord) => {
      setData((prev) => {
        const base = prev ?? load();
        const next = { ...base, sessions: [...base.sessions, session] };
        persist(next);
        return next;
      });
    },
    []
  );

  const addRecording = useCallback(
    async (rec: Recording, blob: Blob | null) => {
      if (blob) await putClip(rec.id, blob);
      setData((prev) => {
        const base = prev ?? load();
        const next = { ...base, recordings: [...base.recordings, rec] };
        persist(next);
        return next;
      });
    },
    []
  );

  const updateRecording = useCallback((id: string, patch: Partial<Recording>) => {
    setData((prev) => {
      if (!prev) return prev;
      const next = {
        ...prev,
        recordings: prev.recordings.map((r) => (r.id === id ? { ...r, ...patch } : r)),
      };
      persist(next);
      return next;
    });
  }, []);

  const deleteRecording = useCallback((id: string) => {
    delClip(id);
    setData((prev) => {
      if (!prev) return prev;
      const next = { ...prev, recordings: prev.recordings.filter((r) => r.id !== id) };
      persist(next);
      return next;
    });
  }, []);

  const updateSettings = useCallback((patch: Partial<Settings>) => {
    setData((prev) => {
      if (!prev) return prev;
      const next = { ...prev, settings: { ...prev.settings, ...patch } };
      persist(next);
      return next;
    });
  }, []);

  const resetAll = useCallback((mode: "empty" | "sample") => {
    const fresh =
      mode === "sample"
        ? makeSampleData()
        : {
            version: 1,
            settings: defaultSettings,
            sessions: [],
            recordings: [],
            firstRun: new Date().toISOString(),
          };
    commit(fresh);
  }, [commit]);

  return {
    data,
    ready: data !== null,
    addSession,
    addRecording,
    updateRecording,
    deleteRecording,
    updateSettings,
    resetAll,
  };
}

export type Store = ReturnType<typeof useVocalynxStore>;
