"use client";

import { motion } from "motion/react";
import {
  BEATS,
  EASE_NARRATIVE,
  EASE_PANEL,
  HANDOFF,
  scaleBeat,
} from "@/components/loading/loader-config";
import { LoaderProgress } from "@/components/loading/LoaderProgress";
import { NameReveal } from "@/components/loading/NameReveal";
import { NetworkLoader } from "@/components/loading/NetworkLoader";
import { SystemStatus } from "@/components/loading/SystemStatus";
import { useIntroLoader } from "@/hooks/use-intro-loader";

/**
 * The forced intro.
 *
 * Layering matters for the handoff:
 *   z-0   two obsidian panels that together form a seamless backdrop
 *   z-10  the infrastructure graph
 *   z-20  boot status + progress
 *   z-30  the name
 *
 * On handoff the graph/status/progress dissolve first, *then* the panels part
 * vertically — so what appears behind them is the portfolio, not the loader's
 * own background. The name flies on top of all of it into the hero.
 */
export function PortfolioLoader({
  onReveal,
  onComplete,
}: {
  onReveal: () => void;
  onComplete: () => void;
}) {
  const { mode, phase, progress, reduced, mobile } = useIntroLoader({ onReveal, onComplete });

  if (phase === "done" || mode === "skip") return null;

  /**
   * `mode` is "pending" for the SSR pass and the first client render, before
   * reduced-motion / viewport are known. The opaque shell renders immediately
   * (that is what prevents the flash); the choreography arms one tick later so
   * it never starts with the wrong motion preferences.
   */
  const armed = mode === "full";
  const handingOff = phase === "handoff";
  const panelTransition = {
    delay: reduced ? 0 : HANDOFF.panelDelay,
    duration: reduced ? 0.24 : HANDOFF.panelDuration,
    ease: EASE_PANEL,
  };

  return (
    <motion.div
      id="intro"
      className="fixed inset-0 z-[100] overflow-hidden"
      /* The loader introduces the page; it is not a control surface. */
      aria-busy={phase === "boot"}
      /*
       * Reduced motion suppresses the panel transforms (MotionConfig), so that
       * path hands over with a plain opacity transition instead of a hard cut.
       */
      animate={{ opacity: reduced && handingOff ? 0 : 1 }}
      transition={{ duration: 0.24, ease: EASE_NARRATIVE }}
    >
      {/* Announced once, quietly. Individual status lines are decorative. */}
      <span className="sr-only" role="status" aria-live="polite">
        {phase === "boot" ? "Loading portfolio" : "Portfolio ready"}
      </span>

      {/* ---- masked panels (z-0): the only opaque surface ---- */}
      <motion.div
        aria-hidden
        className="bg-obsidian absolute inset-x-0 top-0 z-0 h-1/2 will-change-transform"
        initial={false}
        animate={handingOff ? { y: "-100.5%" } : { y: "0%" }}
        transition={panelTransition}
      >
        <span className="via-signal/70 absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent to-transparent" />
      </motion.div>
      <motion.div
        aria-hidden
        className="bg-obsidian absolute inset-x-0 bottom-0 z-0 h-1/2 will-change-transform"
        initial={false}
        animate={handingOff ? { y: "100.5%" } : { y: "0%" }}
        transition={panelTransition}
      >
        <span className="via-signal/70 absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent to-transparent" />
      </motion.div>

      {/* ---- infrastructure graph (z-10) ---- */}
      <motion.div
        aria-hidden
        className="absolute inset-0 z-10"
        initial={{ opacity: 0 }}
        animate={handingOff ? { opacity: 0, scale: reduced ? 1 : 1.08 } : { opacity: 1, scale: 1 }}
        transition={
          handingOff
            ? { duration: reduced ? 0.15 : HANDOFF.dissolve, ease: EASE_NARRATIVE }
            : { duration: reduced ? 0.2 : 0.9, ease: EASE_NARRATIVE }
        }
      >
        <div className="grid-etch absolute inset-0 opacity-[0.1]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,color-mix(in_oklab,var(--signal)_7%,transparent),transparent_52%)]" />
        {armed ? <NetworkLoader reduced={reduced} mobile={mobile} running={!handingOff} /> : null}
      </motion.div>

      {/* ---- the seed point: everything starts from one node ---- */}
      {armed && !reduced ? (
        <motion.span
          aria-hidden
          className="bg-signal absolute top-1/2 left-1/2 z-20 size-1 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_20px_var(--signal)]"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 1, 0],
            opacity: [0, 1, 0.9, 0],
          }}
          transition={{
            duration: scaleBeat(BEATS.firstName, mobile, reduced) + 0.2,
            times: [0, 0.12, 0.7, 1],
            ease: EASE_NARRATIVE,
          }}
        />
      ) : null}

      {/* ---- typography (z-30) + boot readout (z-20) ---- */}
      {armed ? (
        <>
          <div className="relative z-20 flex min-h-svh flex-col items-center justify-center gap-10 px-5 py-24 sm:gap-14 sm:px-8">
            <div className="relative z-30 w-full">
              <NameReveal phase={phase} reduced={reduced} mobile={mobile} />
            </div>
            <motion.div
              className="w-full max-w-md"
              animate={handingOff ? { opacity: 0, y: reduced ? 0 : 10 } : { opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0.15 : HANDOFF.dissolve, ease: EASE_NARRATIVE }}
            >
              <SystemStatus phase={phase} reduced={reduced} mobile={mobile} />
            </motion.div>
          </div>

          <motion.div
            className="pointer-events-none absolute inset-0 z-20"
            animate={handingOff ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: reduced ? 0.15 : HANDOFF.dissolve, ease: EASE_NARRATIVE }}
          >
            <LoaderProgress progress={progress} phase={phase} reduced={reduced} />
          </motion.div>
        </>
      ) : null}
    </motion.div>
  );
}
