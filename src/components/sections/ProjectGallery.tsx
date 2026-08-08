"use client";

import { useCallback, useRef } from "react";
import { motion } from "motion/react";
import { PROJECTS } from "@/data/portfolio";
import { Reveal, SectionShell } from "@/components/ui-bits";

/**
 * Card motion is hover-scoped on purpose.
 *
 * The scan line and the request-flow pulses are CSS keyframes that stay
 * `paused` until the card is hovered — previously every card ran five infinite
 * JS animations for the whole session, on screen or not.
 */
const SCAN =
  "animate-[edge-scan_1.7s_linear_infinite] [animation-play-state:paused] group-hover:[animation-play-state:running]";
const PULSE =
  "animate-[flow-pulse_2.4s_ease-in-out_infinite] [animation-play-state:paused] group-hover:[animation-play-state:running]";

function ProjectCard({ p, index }: { p: (typeof PROJECTS)[number]; index: number }) {
  const card = useRef<HTMLElement>(null);
  const frame = useRef(0);

  /** Spotlight follows the cursor — only ever on the card being hovered. */
  const onPointerMove = useCallback((event: React.PointerEvent<HTMLElement>) => {
    const el = card.current;
    if (!el || frame.current) return;
    const { clientX, clientY } = event;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${((clientX - rect.left) / rect.width) * 100}%`);
      el.style.setProperty("--my", `${((clientY - rect.top) / rect.height) * 100}%`);
    });
  }, []);

  return (
    <motion.article
      ref={card}
      data-cursor="PROJECT"
      onPointerMove={onPointerMove}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      whileHover={{ y: -8, rotateX: 1.5, rotateY: index % 2 === 0 ? -1.5 : 1.5 }}
      style={{ transformPerspective: 1000 }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      className="surface group hover:border-signal/50 relative min-h-[23rem] overflow-hidden rounded-lg p-6 transition-colors duration-300"
    >
      {/* cursor spotlight */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(18rem 18rem at var(--mx,50%) var(--my,0%), color-mix(in oklab, var(--signal) 9%, transparent), transparent 70%)",
        }}
      />

      <span aria-hidden className="absolute inset-x-0 top-0 h-px overflow-hidden">
        <span
          className={`via-signal block h-px w-full bg-linear-to-r from-transparent to-transparent ${SCAN}`}
        />
      </span>

      <div className="relative flex items-baseline justify-between gap-4">
        <span className="display-lg text-steel group-hover:text-signal text-4xl! transition-colors duration-300">
          {p.index}
        </span>
        <span className="label text-[10px]!">{p.stack[0]}</span>
      </div>

      <h3 className="display-lg relative mt-5 text-2xl! transition-transform duration-300 group-hover:translate-x-1">
        {p.title}
      </h3>
      <p className="text-muted-foreground relative mt-2 text-sm leading-relaxed">{p.subtitle}</p>

      <div className="border-border/80 relative mt-6 rounded-md border p-4">
        <div className="flex items-center gap-2">
          {p.responsibilities.map((item, i) => (
            <span key={item} className="flex min-w-0 flex-1 items-center gap-2">
              <span
                className={`bg-signal/75 size-2 shrink-0 rounded-full ${PULSE}`}
                style={{ animationDelay: `${i * 0.22}s` }}
              />
              {i < p.responsibilities.length - 1 ? (
                <span className="bg-border h-px flex-1" />
              ) : null}
            </span>
          ))}
        </div>
        <p className="text-foreground/80 mt-4 text-xs leading-relaxed">{p.problem}</p>
      </div>

      <ul className="relative mt-6 flex flex-wrap gap-2">
        {p.stack.slice(0, 4).map((s) => (
          <li
            key={s}
            className="label border-border group-hover:border-signal/40 group-hover:text-foreground rounded border px-2 py-1 text-[9px]! transition-colors duration-300"
          >
            {s}
          </li>
        ))}
      </ul>

      <p className="label text-foreground/70 relative mt-6 text-[10px]!">{p.result}</p>
    </motion.article>
  );
}

export function ProjectGallery() {
  return (
    <SectionShell id="projects" num="03" label="Selected projects" className="py-28 sm:py-40">
      <Reveal>
        <h2 className="display-lg max-w-2xl">Animated cards for the systems I build.</h2>
        <p className="text-muted-foreground mt-5 max-w-xl text-sm leading-relaxed">
          Each card gives the idea quickly, with a small motion sketch of how the work connects.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} p={p} index={i} />
        ))}
      </div>
    </SectionShell>
  );
}
