"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { EXPERIENCE } from "@/data/portfolio";
import { Reveal, SectionShell } from "@/components/ui-bits";

function OutcomeNode({
  title,
  detail,
  tags,
  index,
}: {
  title: string;
  detail: string;
  tags: string[];
  index: number;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: false, margin: "-45% 0px -40% 0px" });

  return (
    <li ref={ref} className="relative pl-10 sm:pl-14">
      {/* pipeline node */}
      <span
        aria-hidden
        className={`absolute top-2 left-0 size-3 rounded-full border transition-all duration-700 ${
          inView
            ? "border-signal bg-signal shadow-[0_0_18px_var(--signal)]"
            : "border-steel bg-background"
        }`}
      />
      <motion.div
        initial={{ opacity: 0.35 }}
        animate={{ opacity: inView ? 1 : 0.4 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="pb-14"
      >
        <div className="flex items-baseline gap-3">
          <span className="label !text-[10px] text-signal">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h4 className="display-lg !text-xl sm:!text-2xl">{title}</h4>
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{detail}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {tags.map((t) => (
            <li key={t} className="label rounded-full border border-border px-3 py-1 !text-[10px]">
              {t}
            </li>
          ))}
        </ul>
      </motion.div>
    </li>
  );
}

export function Experience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const inView = useInView(trackRef, { once: true, margin: "-20% 0px" });

  return (
    <SectionShell id="experience" num="02" label="Experience pipeline" className="py-28 sm:py-40">
      <Reveal>
        <h2 className="display-lg max-w-3xl">
          Engineering work, presented as the pipeline it actually was.
        </h2>
      </Reveal>

      <div ref={trackRef} className="mt-20 space-y-24">
        {EXPERIENCE.map((exp) => (
          <div key={exp.id} className="grid gap-10 lg:grid-cols-[20rem_1fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="label text-signal">{exp.period}</p>
              <h3 className="display-lg mt-3 !text-3xl">{exp.org}</h3>
              <p className="mt-2 text-sm text-foreground/80">{exp.role}</p>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
                {exp.summary}
              </p>
            </div>

            <div className="relative">
              <motion.span
                aria-hidden
                className="absolute top-2 left-[5px] w-px origin-top bg-gradient-to-b from-signal/70 via-steel/40 to-transparent"
                style={{ bottom: "3.5rem" }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: inView ? 1 : 0 }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              />
              <ul>
                {exp.outcomes.map((o, i) => (
                  <OutcomeNode key={o.title} {...o} index={i} />
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
