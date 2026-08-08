"use client";

import { useState } from "react";
import { TECHNOLOGIES, type Technology } from "@/data/portfolio";
import { Reveal, SectionShell } from "@/components/ui-bits";

const GROUPS: Technology["group"][] = [
  "Cloud & DevOps",
  "Backend",
  "Data & AI",
  "Frontend & Tools",
];

export function StackToolbox() {
  const [focus, setFocus] = useState<string | null>(null);
  const related = focus ? (TECHNOLOGIES.find((t) => t.name === focus)?.related ?? []) : [];

  const state = (name: string) => {
    if (!focus) return "idle";
    if (name === focus) return "focus";
    return related.includes(name) ? "related" : "dim";
  };

  return (
    <SectionShell id="stack" num="04" label="Engineering toolbox" className="py-28 sm:py-40">
      <Reveal>
        <h2 className="display-lg max-w-3xl">
          Technologies are tools inside systems — not badges on a wall.
        </h2>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Hover a technology to see what it actually connects to in the systems I&apos;ve built.
        </p>
      </Reveal>

      <div
        className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
        onMouseLeave={() => setFocus(null)}
      >
        {GROUPS.map((g, gi) => (
          <Reveal key={g} delay={gi * 0.06}>
            <p className="label mb-5 border-b border-border pb-3">{g}</p>
            <ul className="space-y-1">
              {TECHNOLOGIES.filter((t) => t.group === g).map((t) => {
                const s = state(t.name);
                return (
                  <li key={t.name}>
                    <button
                      onMouseEnter={() => setFocus(t.name)}
                      onFocus={() => setFocus(t.name)}
                      data-cursor="hover"
                      className={`flex min-h-9 w-full items-center gap-2 rounded px-2 py-1.5 text-left text-sm tracking-tight transition-all duration-400 ${
                        s === "focus"
                          ? "bg-accent text-foreground"
                          : s === "related"
                            ? "text-signal"
                            : s === "dim"
                              ? "text-steel opacity-50"
                              : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <span
                        className={`size-1 shrink-0 rounded-full transition-colors duration-300 ${
                          s === "focus" || s === "related" ? "bg-signal" : "bg-steel"
                        }`}
                      />
                      {t.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        ))}
      </div>

      <p className="label mt-10 h-4 !text-[10px] text-signal">
        {focus ? `${focus} → ${related.join(" · ")}` : ""}
      </p>
    </SectionShell>
  );
}
