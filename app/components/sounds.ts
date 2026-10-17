"use client";

import { useEffect, useMemo, useRef } from "react";

const MUSIC_SRC = "/music/menu.m4a";
const MUSIC_VOLUME = 0.35;

// Soft menu blips made with the Web Audio API, plus looping menu music.
// Silent unless sound is switched on.
export function useSounds(on: boolean) {
  const ctxRef = useRef<AudioContext | null>(null);
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const fadeOutRef = useRef<(() => void) | null>(null);
  const onRef = useRef(on);
  onRef.current = on;

  // The music fades in when sound is switched on, fades out when it's off,
  // and pauses while the tab is hidden. It resumes where it left off.
  useEffect(() => {
    if (!on) return;
    musicRef.current ??= Object.assign(new Audio(MUSIC_SRC), { loop: true, preload: "auto" });
    const music = musicRef.current;
    fadeOutRef.current?.();
    const stopFade = fadeTo(music, MUSIC_VOLUME);
    music.play().catch(() => {});

    const onVisibility = () => {
      if (document.hidden) music.pause();
      else music.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      stopFade();
      fadeOutRef.current = fadeTo(music, 0, () => music.pause());
    };
  }, [on]);

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

// Ramp an audio element's volume over about half a second.
function fadeTo(audio: HTMLAudioElement, target: number, done?: () => void) {
  if (target > 0 && audio.paused) audio.volume = 0;
  const step = (target - audio.volume) / 12;
  const timer = window.setInterval(() => {
    const next = audio.volume + step;
    if (step === 0 || (step > 0 ? next >= target : next <= target)) {
      audio.volume = target;
      window.clearInterval(timer);
      done?.();
    } else {
      audio.volume = next;
    }
  }, 40);
  return () => window.clearInterval(timer);
}
