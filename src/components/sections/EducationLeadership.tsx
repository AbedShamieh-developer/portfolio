"use client";

import { EDUCATION } from "@/data/portfolio";
import { Reveal } from "@/components/ui-bits";

export function EducationLeadership() {
  return (
    <section className="relative mx-auto w-full max-w-[86rem] px-5 py-28 sm:px-8 sm:py-40">
      <div className="grid gap-24 lg:grid-cols-2 lg:gap-16">
        {/* Education */}
        <div>
          <Reveal className="mb-10 flex items-center gap-4">
            <span className="label text-signal">Education</span>
            <span className="hairline flex-1" />
          </Reveal>

          <Reveal>
            <div className="grid-etch relative overflow-hidden rounded-xl border border-border p-8">
              <div className="flex flex-wrap items-end gap-x-10 gap-y-6">
                {EDUCATION.metrics.map((m, i) => (
                  <div key={m.label} className="overflow-hidden">
                    <span
                      className="display-xl block !text-[clamp(3rem,9vw,6rem)] leading-none"
                      style={{
                        color: i === 0 ? "var(--foreground)" : "transparent",
                        WebkitTextStroke:
                          i === 0
                            ? undefined
                            : "1px color-mix(in oklab, var(--signal) 55%, transparent)",
                      }}
                    >
                      {m.value}
                    </span>
                    <span className="label mt-2 block !text-[10px]">{m.label}</span>
                  </div>
                ))}
              </div>
              <p className="mt-10 max-w-md text-sm leading-relaxed text-muted-foreground">
                {EDUCATION.detail}
              </p>
              <p className="mt-6 max-w-md border-l border-signal/50 pl-4 text-base leading-snug text-foreground/90">
                {EDUCATION.note}
              </p>
              <p className="label mt-8 !text-[10px]">
                Certifications · AWS credentials — reserved slot
              </p>
            </div>
          </Reveal>
        </div>

        {/* Leadership */}
        <div>
          <Reveal className="mb-10 flex items-center gap-4">
            <span className="label text-signal">Leadership</span>
            <span className="hairline flex-1" />
          </Reveal>

          <Reveal>
            <h2 className="display-lg">
              Build. <span className="text-steel">Explain.</span>{" "}
              <span className="text-signal-gradient">Lead.</span>
            </h2>

            <div aria-hidden className="mt-8 flex h-10 items-end gap-1">
              {Array.from({ length: 26 }).map((_, i) => (
                <span
                  key={i}
                  className="w-1 rounded-full bg-signal/50"
                  style={{
                    height: `${18 + Math.abs(Math.sin(i * 0.7)) * 80}%`,
                    opacity: 0.35 + Math.abs(Math.cos(i * 0.5)) * 0.5,
                  }}
                />
              ))}
            </div>

            <ul className="mt-10 space-y-6">
              {[
                {
                  t: "Communicating technical ideas",
                  d: "Explaining architecture decisions in language the room actually needs.",
                },
                {
                  t: "Presenting engineering systems",
                  d: "Walking stakeholders through pipelines, trade-offs and failure handling.",
                },
                {
                  t: "Helping others understand complexity",
                  d: "Breaking systems down for peers without diluting the engineering.",
                },
                {
                  t: "Taking ownership",
                  d: "Following work through planning, delivery and the documentation after it.",
                },
              ].map((item, i) => (
                <li key={item.t} className="flex gap-4 border-t border-border pt-5">
                  <span className="label !text-[10px] text-signal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-base tracking-tight text-foreground">{item.t}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
