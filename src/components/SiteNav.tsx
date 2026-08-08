"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SECTIONS } from "@/data/portfolio";

const CHARS = "0123456789";

function ScrambleNum({ value, active }: { value: string; active: boolean }) {
  const [text, setText] = useState(value);
  useEffect(() => {
    if (!active) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      if (i > 4) {
        setText(value);
        window.clearInterval(id);
        return;
      }
      setText(
        value
          .split("")
          .map(() => CHARS[Math.floor(Math.random() * CHARS.length)])
          .join(""),
      );
    }, 45);
    return () => window.clearInterval(id);
  }, [active, value]);
  return <span className="font-mono tabular-nums">{text}</span>;
}

export function SiteNav({ active, onOpenPalette }: { active: string; onOpenPalette: () => void }) {
  const [open, setOpen] = useState(false);

  /*
   * Scroll progress as a MotionValue: it drives the rail dot and the mobile
   * bar straight through style, so scrolling never re-renders this tree.
   */
  const { scrollYProgress } = useScroll();
  const railTop = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Desktop rail */}
      <nav
        aria-label="Sections"
        className="fixed top-1/2 right-6 z-40 hidden -translate-y-1/2 lg:block"
      >
        <div className="relative flex flex-col gap-4 pl-5">
          <div className="absolute top-1 bottom-1 left-1 w-px bg-border" />
          <motion.div
            aria-hidden
            className="bg-signal absolute -left-px size-[3px] rounded-full shadow-[0_0_10px_var(--signal)]"
            style={{ top: railTop }}
          />
          {SECTIONS.map((s) => {
            const on = active === s.id;
            return (
              <button
                key={s.id}
                onClick={() => go(s.id)}
                data-cursor="hover"
                className="group flex items-center gap-3 text-left"
              >
                <span
                  className={`label !text-[10px] transition-colors ${on ? "text-signal" : "text-steel group-hover:text-steel-soft"}`}
                >
                  <ScrambleNum value={s.num} active={on} />
                </span>
                <span
                  className={`text-xs tracking-tight transition-all duration-500 ${
                    on
                      ? "translate-x-0 text-foreground opacity-100"
                      : "-translate-x-1 text-muted-foreground opacity-60 group-hover:opacity-100"
                  }`}
                >
                  {s.label}
                </span>
              </button>
            );
          })}
          <button
            onClick={onOpenPalette}
            data-cursor="hover"
            className="label mt-2 !text-[10px] text-steel transition-colors hover:text-signal"
          >
            Press /
          </button>
        </div>
      </nav>

      {/* Mobile bar */}
      <div className="fixed inset-x-0 top-0 z-40 lg:hidden">
        <div className="flex items-center justify-between border-b border-border bg-background/80 px-5 py-3 backdrop-blur-xl">
          <span className="label text-foreground">A. SHAMIEH</span>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="label flex min-h-11 items-center gap-2 text-signal"
          >
            {open ? "CLOSE" : "MENU"}
            <span className="flex flex-col gap-1">
              <span className="block h-px w-4 bg-signal" />
              <span className="block h-px w-4 bg-signal" />
            </span>
          </button>
        </div>
        <motion.div
          aria-hidden
          className="bg-signal h-px origin-left"
          style={{ scaleX: scrollYProgress }}
        />
        <motion.div
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden border-b border-border bg-background/95 backdrop-blur-xl"
        >
          <ul className="px-5 py-4">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => go(s.id)}
                  className="flex min-h-11 w-full items-baseline gap-3 py-1 text-left"
                >
                  <span className="label !text-[10px] text-signal">{s.num}</span>
                  <span className="display-lg !text-2xl">{s.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </>
  );
}
