"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { EDUCATION, PRINCIPLES } from "@/data/portfolio";
import { Reveal, SectionShell } from "@/components/ui-bits";

export function About() {
  const [open, setOpen] = useState<string>(PRINCIPLES[0]!.name);

  return (
    <SectionShell id="about" num="01" label="Behind the interface" className="py-28 sm:py-40">
      <div className="grid gap-16 lg:grid-cols-[1.15fr_1fr] lg:gap-24">
        <div>
          <Reveal>
            <h2 className="display-lg max-w-2xl">
              I build the systems users never see — but everything depends on.
            </h2>
          </Reveal>
          <Reveal
            delay={0.1}
            className="mt-10 max-w-xl space-y-5 text-base leading-relaxed text-muted-foreground"
          >
            <p>
              I&apos;m a backend-focused software engineer. The work I care about starts before the
              first endpoint exists: taking a set of complex, half-defined requirements and turning
              them into a system that is clean, reliable and maintainable years later.
            </p>
            <p>
              Professionally I work in{" "}
              <span className="text-foreground">TypeScript, Node.js, Express, Python</span> and{" "}
              <span className="text-foreground">AWS</span> — serverless services, REST APIs,
              observability pipelines and deployment automation across multiple accounts and
              regions.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-12">
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {[
                "Computer Science",
                `${EDUCATION.metrics[0]!.value} GPA`,
                "Honor List",
                "Backend & Cloud Engineering",
                "Leadership",
              ].map((item) => (
                <li key={item} className="label border-l border-signal/40 pl-3 !text-[10px]">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Principles */}
        <Reveal delay={0.1}>
          <p className="label mb-6">Engineering principles</p>
          <ul className="divide-y divide-border border-y border-border">
            {PRINCIPLES.map((p) => {
              const on = open === p.name;
              return (
                <li key={p.name}>
                  <button
                    onMouseEnter={() => setOpen(p.name)}
                    onFocus={() => setOpen(p.name)}
                    onClick={() => setOpen(p.name)}
                    aria-expanded={on}
                    data-cursor="hover"
                    className="w-full py-5 text-left"
                  >
                    <span className="flex items-baseline justify-between gap-4">
                      <span
                        className={`display-lg !text-2xl transition-colors duration-500 sm:!text-3xl ${
                          on ? "text-foreground" : "text-steel"
                        }`}
                      >
                        {p.name.toUpperCase()}
                      </span>
                      <span
                        className={`h-px flex-1 transition-colors duration-500 ${on ? "bg-signal/60" : "bg-border"}`}
                      />
                    </span>
                    <motion.span
                      initial={false}
                      animate={{ height: on ? "auto" : 0, opacity: on ? 1 : 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="block overflow-hidden"
                    >
                      <span className="mt-3 block max-w-md text-sm leading-relaxed text-muted-foreground">
                        {p.meaning}
                      </span>
                    </motion.span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </SectionShell>
  );
}
