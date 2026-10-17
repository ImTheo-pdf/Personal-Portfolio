"use client";

import { useMemo, useRef } from "react";

// Soft menu blips made with the Web Audio API (no audio files). Silent unless sound is switched on.
export function useSounds(on: boolean) {
  const ctxRef = useRef<AudioContext | null>(null);
  const onRef = useRef(on);
  onRef.current = on;

  return useMemo(() => {
    const tone = (freqs: number[], length: number, volume: number) => {
      if (!onRef.current) return;
      try {
        ctxRef.current ??= new AudioContext();
        const ctx = ctxRef.current;
        const now = ctx.currentTime;
        freqs.forEach((f, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const t = now + i * 0.07;
          osc.type = "sine";
          osc.frequency.setValueAtTime(f, t);
          gain.gain.setValueAtTime(0, t);
          gain.gain.linearRampToValueAtTime(volume, t + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + length);
          osc.connect(gain).connect(ctx.destination);
          osc.start(t);
          osc.stop(t + length + 0.02);
        });
      } catch {
        // Audio is a nicety; ignore browsers that refuse it.
      }
    };

    return {
      hover: () => tone([1320], 0.06, 0.03),
      select: () => tone([880, 1320], 0.18, 0.05),
      back: () => tone([990, 660], 0.16, 0.04),
    };
  }, []);
}
