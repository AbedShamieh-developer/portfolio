"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { animate, useMotionValue } from "motion/react";
import {
  HANDOFF,
  INTRO_KEY,
  MAXIMUM_LOADING_TIME,
  MINIMUM_LOADING_TIME,
  REDUCED_LOADING_TIME,
  SKIP_TRANSITION_TIME,
} from "@/components/loading/loader-config";

/**
 * boot      — network assembling, name revealing, progress climbing
 * ready     — SYSTEM READY / BACKEND ENGINEER beat, cursor ring opens
 * handoff   — panels part, loader dissolves, site becomes visible
 * done      — loader unmounted, portfolio owns the page
 */
export type IntroPhase = "boot" | "ready" | "handoff" | "done";

export type IntroMode = "pending" | "full" | "skip";

type Options = {
  /**
   * Site becomes visible while the cinematic mask opens.
   */
  onReveal: () => void;
  /** Handoff finished; the loader can unmount. */
  onComplete: () => void;
};

function setIntroState(state: "pending" | "ready" | "revealing" | "done" | "skip") {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-intro", state);
}

/** Resolves when the document has parsed, capped so it can never hang. */
function domReady() {
  if (document.readyState !== "loading") return Promise.resolve();
  return new Promise<void>((resolve) => {
    document.addEventListener("DOMContentLoaded", () => resolve(), { once: true });
  });
}

/** Critical display + mono faces used by the first viewport. */
function fontsReady() {
  if (!("fonts" in document)) return Promise.resolve();
  const faces = [
    document.fonts.load('500 8rem "Space Grotesk"'),
    document.fonts.load('400 1rem "JetBrains Mono"'),
  ];
  return Promise.all([...faces, document.fonts.ready]).then(() => undefined);
}

function windowLoaded() {
  if (document.readyState === "complete") return Promise.resolve();
  return new Promise<void>((resolve) => {
    window.addEventListener("load", () => resolve(), { once: true });
  });
}

/** Every signal is best-effort: a rejection still counts as progress. */
const SIGNALS: { weight: number; start: () => Promise<unknown> }[] = [
  { weight: 0.18, start: domReady },
  { weight: 0.46, start: fontsReady },
  { weight: 0.36, start: windowLoaded },
];

export function useIntroLoader({ onReveal, onComplete }: Options) {
  const [mode, setMode] = useState<IntroMode>("pending");
  const [phase, setPhase] = useState<IntroPhase>("boot");
  const [reduced, setReduced] = useState(false);
  const [mobile, setMobile] = useState(false);

  /** 0–100. Driven by rAF; never triggers a React render. */
  const progress = useMotionValue(0);

  const revealRef = useRef(onReveal);
  const completeRef = useRef(onComplete);
  revealRef.current = onReveal;
  completeRef.current = onComplete;

  /* ---- environment (client only, so SSR markup stays stable) ---- */
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sizeQuery = window.matchMedia("(max-width: 767px), (pointer: coarse)");

    setReduced(motionQuery.matches);
    setMobile(sizeQuery.matches);

    const onMotion = () => setReduced(motionQuery.matches);
    const onSize = () => setMobile(sizeQuery.matches);
    motionQuery.addEventListener("change", onMotion);
    sizeQuery.addEventListener("change", onSize);
    return () => {
      motionQuery.removeEventListener("change", onMotion);
      sizeQuery.removeEventListener("change", onSize);
    };
  }, []);

  /* ---- decide: full cinematic intro, or fast return-visit fade ---- */
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(INTRO_KEY) === "true";
    } catch {
      // Private mode / storage disabled — treat as a first visit.
      seen = false;
    }
    setMode(seen ? "skip" : "full");
  }, []);

  const finishHandoff = useCallback(() => {
    setPhase("done");
    setIntroState("done");
    completeRef.current();
  }, []);

  const startHandoff = useCallback(() => {
    setPhase("handoff");
    setIntroState("revealing");
    revealRef.current();
  }, []);

  /* ---- return visit: no boot sequence, just a short fade ---- */
  useEffect(() => {
    if (mode !== "skip") return;
    setIntroState("skip");
    revealRef.current();
    const timer = window.setTimeout(finishHandoff, SKIP_TRANSITION_TIME);
    return () => window.clearTimeout(timer);
  }, [mode, finishHandoff]);

  /* ---- first visit: the full boot sequence ---- */
  useEffect(() => {
    if (mode !== "full") return;

    setIntroState("pending");

    const started = performance.now();
    const minimum = reduced ? REDUCED_LOADING_TIME : MINIMUM_LOADING_TIME;
    const timers: number[] = [];
    let raf = 0;
    let settled = false;
    let assetFraction = 0;
    let cancelled = false;

    // Started exactly once; `run()` below awaits these same promises.
    const signalPromises = SIGNALS.map(({ weight, start }) =>
      start()
        .catch(() => undefined)
        .then(() => {
          assetFraction += weight;
        }),
    );

    /**
     * Displayed progress is an honest interpolation: it tracks whichever is
     * slower — real asset settlement or the minimum-duration clock — and is
     * held below 100 until the loader has actually finished.
     */
    const tick = () => {
      const elapsed = performance.now() - started;
      const byTime = Math.min(1, elapsed / minimum) * 0.94;
      const bySignal = assetFraction * 0.9;
      const target = Math.min(0.96, Math.max(byTime, bySignal)) * 100;
      const current = progress.get();
      if (target > current) progress.set(current + (target - current) * 0.06);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const settle = () => {
      if (settled || cancelled) return;
      settled = true;
      cancelAnimationFrame(raf);
      animate(progress, 100, { duration: reduced ? 0.12 : 0.3, ease: [0.4, 0, 0.2, 1] });

      try {
        sessionStorage.setItem(INTRO_KEY, "true");
      } catch {
        // Non-fatal: the intro simply replays next time.
      }

      setPhase("ready");
      setIntroState("ready");

      // SYSTEM READY → BACKEND ENGINEER beat, then hand the page over.
      timers.push(window.setTimeout(startHandoff, reduced ? 120 : 620));
    };

    const run = async () => {
      await Promise.all([
        Promise.allSettled(signalPromises),
        new Promise<void>((resolve) => {
          timers.push(window.setTimeout(resolve, minimum));
        }),
      ]);
      settle();
    };

    // The safety net: whatever happens upstream, the portfolio continues.
    timers.push(
      window.setTimeout(settle, reduced ? REDUCED_LOADING_TIME + 400 : MAXIMUM_LOADING_TIME),
    );
    void run();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      timers.forEach(window.clearTimeout);
    };
  }, [mode, reduced, progress, startHandoff]);

  /* ---- unmount the loader once the handoff choreography has landed ---- */
  useEffect(() => {
    if (phase !== "handoff") return;
    const wait = reduced ? 260 : (HANDOFF.flightDelay + HANDOFF.flightDuration) * 1000 + 120;
    const timer = window.setTimeout(finishHandoff, wait);
    return () => window.clearTimeout(timer);
  }, [phase, reduced, finishHandoff]);

  /* ---- absolute last resort: never leave the page locked ---- */
  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (document.documentElement.getAttribute("data-intro") !== "done") {
        setPhase("done");
        setIntroState("done");
        completeRef.current();
      }
    }, MAXIMUM_LOADING_TIME + 3000);
    return () => window.clearTimeout(timer);
  }, []);

  return { mode, phase, progress, reduced, mobile };
}
