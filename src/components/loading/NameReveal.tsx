"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  BEATS,
  EASE_NARRATIVE,
  NAME_WORDS,
  SCRAMBLE_DURATION,
  SCRAMBLE_MASKS,
  scaleBeat,
} from "@/components/loading/loader-config";
import type { IntroPhase } from "@/hooks/use-intro-loader";

function useScramble(word: string, delayMs: number, enabled: boolean) {
  const [text, setText] = useState(word);

  useEffect(() => {
    if (!enabled) {
      setText(word);
      return;
    }

    const masks = SCRAMBLE_MASKS[word];
    if (!masks?.length) return;

    let interval = 0;
    const timers: number[] = [];

    timers.push(
      window.setTimeout(() => {
        let step = 0;
        setText(masks[0]!);
        interval = window.setInterval(() => {
          step += 1;
          setText(masks[step % masks.length]!);
        }, 58);

        timers.push(
          window.setTimeout(() => {
            window.clearInterval(interval);
            setText(word);
          }, SCRAMBLE_DURATION),
        );
      }, delayMs),
    );

    return () => {
      window.clearInterval(interval);
      timers.forEach(window.clearTimeout);
      setText(word);
    };
  }, [delayMs, enabled, word]);

  return text;
}

function RevealedWord({
  word,
  index,
  delay,
  reduced,
  accent,
}: {
  word: string;
  index: number;
  delay: number;
  reduced: boolean;
  accent?: boolean;
}) {
  const text = useScramble(word, Math.max(0, delay * 1000 - 120), !reduced);

  return (
    <span className="block overflow-hidden">
      <motion.span
        className={`inline-block ${accent ? "text-signal-gradient" : ""}`}
        initial={reduced ? { opacity: 0 } : { y: "112%", opacity: 0.25, filter: "blur(8px)" }}
        animate={reduced ? { opacity: 1 } : { y: "0%", opacity: 1, filter: "blur(0px)" }}
        transition={{
          delay,
          duration: reduced ? 0.22 : 0.82,
          ease: EASE_NARRATIVE,
        }}
      >
        {text.split("").map((char, charIndex) => (
          <motion.span
            key={`${index}-${charIndex}`}
            className="inline-block"
            initial={
              reduced
                ? false
                : {
                    y: charIndex % 2 === 0 ? "10%" : "-10%",
                    opacity: 0.3,
                  }
            }
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              delay: delay + 0.05 + charIndex * 0.018,
              duration: 0.42,
              ease: EASE_NARRATIVE,
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    </span>
  );
}

export function NameReveal({
  phase,
  reduced,
  mobile,
}: {
  phase: IntroPhase;
  reduced: boolean;
  mobile: boolean;
}) {
  const firstDelay = scaleBeat(BEATS.firstName, mobile, reduced);
  const lastDelay = scaleBeat(BEATS.lastName, mobile, reduced);
  const sweepDelay = scaleBeat(BEATS.sweep, mobile, reduced);
  const handoff = phase === "handoff";

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[86rem] text-center"
      animate={
        handoff
          ? { opacity: 0, scale: reduced ? 1 : 0.985, y: reduced ? 0 : -12 }
          : { opacity: 1, scale: 1, y: 0 }
      }
      transition={{ duration: reduced ? 0.18 : 0.34, ease: EASE_NARRATIVE }}
    >
      {!reduced ? (
        <>
          <motion.span
            aria-hidden
            className="from-signal/0 via-signal/80 to-signal/0 pointer-events-none absolute top-1/2 left-1/2 h-px w-[120vw] -translate-x-1/2 bg-linear-to-r"
            initial={{ scaleX: 0.05, opacity: 0 }}
            animate={
              handoff
                ? { scaleX: 1.45, opacity: 0 }
                : { scaleX: [0.05, 1, 1.08], opacity: [0, 1, 0.24] }
            }
            transition={{
              delay: handoff ? 0 : sweepDelay - 0.42,
              duration: handoff ? 0.26 : 1.05,
              ease: EASE_NARRATIVE,
            }}
          />
          <motion.span
            aria-hidden
            className="from-signal/18 pointer-events-none absolute top-1/2 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial to-transparent blur-3xl"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={handoff ? { opacity: 0, scale: 1.2 } : { opacity: [0, 0.38, 0.16], scale: 1 }}
            transition={{
              delay: sweepDelay - 0.2,
              duration: handoff ? 0.3 : 1.4,
              ease: EASE_NARRATIVE,
            }}
          />
        </>
      ) : null}

      <h1
        className={`display-xl relative ${
          mobile ? "!text-[clamp(2.6rem,15vw,5rem)]" : "!text-[clamp(3rem,11.5vw,9rem)]"
        }`}
      >
        <span className="sr-only">Abdulrahman Shamieh</span>
        <span aria-hidden>
          <RevealedWord word={NAME_WORDS[0]} index={0} delay={firstDelay} reduced={reduced} />
          <RevealedWord word={NAME_WORDS[1]} index={1} delay={lastDelay} reduced={reduced} accent />
        </span>
      </h1>
    </motion.div>
  );
}
