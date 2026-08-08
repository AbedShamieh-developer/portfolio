"use client";

import { useEffect, useRef } from "react";
import { motion, useTransform, type MotionValue } from "motion/react";
import { EASE_NARRATIVE } from "@/components/loading/loader-config";
import type { IntroPhase } from "@/hooks/use-intro-loader";

/**
 * A thin rule with a travelling packet — not a bar.
 *
 * The percentage is written straight to the DOM from the MotionValue, so a
 * 60fps counter costs zero React renders.
 */
export function LoaderProgress({
  progress,
  phase,
  reduced,
}: {
  progress: MotionValue<number>;
  phase: IntroPhase;
  reduced: boolean;
}) {
  const readout = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const write = (value: number) => {
      const node = readout.current;
      if (!node) return;
      node.textContent = `${String(Math.round(value)).padStart(2, "0")}%`;
    };
    write(progress.get());
    return progress.on("change", write);
  }, [progress]);

  const width = useTransform(progress, (value) => `${value}%`);
  const handingOff = phase === "handoff";

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-5 bottom-8 mx-auto max-w-[86rem] sm:bottom-10 sm:inset-x-8"
    >
      <div className="mb-3 flex items-baseline justify-between">
        <span className="label text-[10px]!">
          {phase === "boot" ? "Loading systems" : "System ready"}
        </span>
        <span ref={readout} className="text-signal font-mono text-[10px] tabular-nums">
          00%
        </span>
      </div>

      <div className="relative h-px">
        <div className="bg-border absolute inset-0" />

        {/* filled portion */}
        <motion.div className="bg-signal/70 absolute inset-y-0 left-0" style={{ width }} />

        {/* the packet riding the line; on handoff it shoots off to the right */}
        <motion.span
          className="bg-signal absolute top-1/2 left-0 size-1.5 rounded-full shadow-[0_0_14px_var(--signal)]"
          /* centred with margins so the handoff animation owns `transform` alone */
          style={{ left: width, marginLeft: -3, marginTop: -3 }}
          animate={handingOff && !reduced ? { x: "45vw", opacity: 0 } : { x: 0, opacity: 1 }}
          transition={{ duration: 0.55, ease: EASE_NARRATIVE }}
        />
      </div>
    </div>
  );
}
