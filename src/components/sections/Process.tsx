"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { PROCESS } from "@/data/portfolio";
import { Reveal, SectionShell } from "@/components/ui-bits";

function Step({
  step,
  title,
  detail,
  i,
}: {
  step: string;
  title: string;
  detail: string;
  i: number;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: false, margin: "-40% 0px -40% 0px" });

  return (
    <li ref={ref} className="relative grid gap-4 py-8 sm:grid-cols-[6rem_1fr] sm:gap-10">
      <span
        className={`display-lg !text-3xl transition-all duration-700 ${
          inView ? "text-signal" : "text-transparent"
        }`}
        style={
          inView
            ? undefined
            : { WebkitTextStroke: "1px color-mix(in oklab, var(--steel-soft) 70%, transparent)" }
        }
      >
        {step}
      </span>
      <div>
        <h3 className="display-lg !text-xl sm:!text-2xl">{title}</h3>
        <motion.p
          initial={{ opacity: 0.3 }}
          animate={{ opacity: inView ? 1 : 0.35 }}
          transition={{ duration: 0.6 }}
          className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground"
        >
          {detail}
        </motion.p>
      </div>
      <span
        aria-hidden
        className={`absolute inset-x-0 bottom-0 h-px origin-left transition-transform duration-700 ${
          inView ? "scale-x-100 bg-signal/40" : "scale-x-100 bg-border"
        }`}
        style={{ transitionDelay: `${i * 40}ms` }}
      />
    </li>
  );
}

export function Process() {
  return (
    <SectionShell id="journey" num="05" label="How I think" className="py-28 sm:py-40">
      <Reveal>
        <h2 className="display-lg max-w-3xl">
          The interesting part isn&apos;t writing the code.
          <br />
          <span className="text-signal-gradient">
            It&apos;s deciding how the system should behave.
          </span>
        </h2>
      </Reveal>
      <ol className="mt-16 border-t border-border">
        {PROCESS.map((p, i) => (
          <Step key={p.step} {...p} i={i} />
        ))}
      </ol>
    </SectionShell>
  );
}
