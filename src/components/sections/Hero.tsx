"use client";

import { motion } from "motion/react";
import { PROFILE } from "@/data/portfolio";
import { MagneticLink } from "@/components/ui-bits";

const WORDS = ["ABDULRAHMAN", "SHAMIEH"] as const;

export function Hero({ reveal }: { reveal: boolean }) {
  return (
    <header
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-center px-5 pt-24 pb-16 sm:px-8 lg:pt-0"
    >
      <div className="relative mx-auto w-full max-w-[86rem]">
        <motion.div
          className="hairline mb-10 origin-left"
          initial={{ scaleX: 0 }}
          animate={reveal ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />

        <h1 className="display-xl relative">
          <span className="sr-only">Abdulrahman Shamieh</span>
          {WORDS.map((word, index) => (
            <span key={word} aria-hidden className="block overflow-hidden">
              <motion.span
                className="inline-block"
                initial={{ y: "110%", opacity: 1 }}
                animate={{ y: reveal ? "0%" : "110%", opacity: 1 }}
                transition={{
                  delay: 0.1 + index * 0.12,
                  duration: 0.85,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {index === 1 ? <span className="text-signal-gradient">{word}</span> : word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={reveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ delay: 0.45, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end"
        >
          <div className="max-w-xl">
            <p className="text-foreground/90 text-lg leading-snug sm:text-2xl">{PROFILE.tagline}</p>
            <p className="label mt-4">{PROFILE.domains}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <MagneticLink href="#projects">View projects</MagneticLink>
            <MagneticLink href={`mailto:${PROFILE.email}`} variant="ghost">
              Contact me <span aria-hidden>-&gt;</span>
            </MagneticLink>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={reveal ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="border-border mt-14 inline-flex items-center gap-3 rounded-full border px-4 py-2"
        >
          <span className="bg-signal size-2 rounded-full" />
          <span className="label text-foreground/80 text-[10px]!">{PROFILE.status}</span>
        </motion.div>
      </div>
    </header>
  );
}
