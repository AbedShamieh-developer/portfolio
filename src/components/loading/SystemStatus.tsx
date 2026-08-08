"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  BEATS,
  EASE_NARRATIVE,
  EASE_PRECISE,
  STATUS_LINES,
  scaleBeat,
} from "@/components/loading/loader-config";
import type { IntroPhase } from "@/hooks/use-intro-loader";

/**
 * Secondary system information. Deliberately not a terminal: tiny uppercase
 * mono, wide tracking, generous space, leader dots instead of a console frame.
 */
export function SystemStatus({
  phase,
  reduced,
  mobile,
}: {
  phase: IntroPhase;
  reduced: boolean;
  mobile: boolean;
}) {
  const initDelay = scaleBeat(BEATS.initializing, mobile, reduced);
  const statusDelay = scaleBeat(BEATS.status, mobile, reduced);
  const stagger = scaleBeat(BEATS.statusStagger, mobile, reduced);
  const settled = phase !== "boot";

  return (
    <div aria-hidden className="w-full max-w-md">
      <motion.p
        className="label text-signal/90 text-center"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: initDelay, duration: reduced ? 0.2 : 0.5, ease: EASE_NARRATIVE }}
      >
        Initializing profile
      </motion.p>

      <ul className="mt-7 space-y-2.5">
        {STATUS_LINES.map((line, i) => (
          <motion.li
            key={line}
            className="flex items-baseline gap-2"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: statusDelay + i * stagger,
              duration: reduced ? 0.2 : 0.42,
              ease: EASE_NARRATIVE,
            }}
          >
            <span className="label text-steel-soft/80 shrink-0 text-[9px]!">{line}</span>
            {/* leader dots: a rule, not a row of typed periods */}
            <span
              className="border-steel/50 mb-[3px] min-w-4 flex-1 border-b border-dotted"
              aria-hidden
            />
            <motion.span
              className="label text-signal shrink-0 text-[9px]!"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: statusDelay + i * stagger + (reduced ? 0 : 0.16),
                duration: reduced ? 0.2 : 0.3,
              }}
            >
              Ready
            </motion.span>
          </motion.li>
        ))}
      </ul>

      {/* Signature beat: SYSTEM READY resolves into the role itself. */}
      <div className="relative mt-9 flex h-5 items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {settled ? (
            <motion.span
              key={phase === "handoff" ? "role" : "ready"}
              className="label absolute text-[10px]! whitespace-nowrap"
              initial={{ opacity: 0, y: 4, letterSpacing: "0.34em" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "0.18em" }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: reduced ? 0.15 : 0.34, ease: EASE_PRECISE }}
            >
              {phase === "handoff" ? (
                <span className="text-foreground">Backend Engineer</span>
              ) : (
                <span className="text-signal">System Ready</span>
              )}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
