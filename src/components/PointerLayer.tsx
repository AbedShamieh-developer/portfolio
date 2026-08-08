"use client";

import { useEffect, useRef, useState } from "react";
import { useIsTouch, useReducedMotion } from "@/hooks/use-motion-prefs";

/**
 * Custom cursor: an exact dot plus a lagging ring.
 *
 * Sizing lives in CSS custom properties rather than inline width/height so the
 * intro loader can take the ring over via `html[data-intro]` (inline styles
 * would win the cascade and the SYSTEM READY beat would never land).
 */
export function PointerLayer() {
  const touch = useIsTouch();
  const reduced = useReducedMotion();
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (touch || reduced) return;
    document.documentElement.classList.add("no-cursor");
    return () => document.documentElement.classList.remove("no-cursor");
  }, [touch, reduced]);

  useEffect(() => {
    if (touch || reduced) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    let raf = 0;
    let idle = true;

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.22;
      pos.y += (target.y - pos.y) * 0.22;

      if (dot.current) {
        dot.current.style.transform = `translate3d(${target.x}px,${target.y}px,0) translate(-50%,-50%)`;
      }
      if (ring.current) {
        ring.current.style.transform = `translate3d(${pos.x}px,${pos.y}px,0) translate(-50%,-50%)`;
      }

      // Park the loop once the ring has caught up — an idle cursor should not
      // hold a rAF callback open for the life of the page.
      if (Math.abs(target.x - pos.x) < 0.1 && Math.abs(target.y - pos.y) < 0.1) {
        idle = true;
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!idle) return;
      idle = false;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      wake();
    };

    const onOver = (e: Event) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor],a,button,[role='button']",
      );
      const text = el?.getAttribute("data-cursor");
      setLabel(text && text !== "hover" ? text : null);
      setActive(Boolean(el));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, true);
    raf = requestAnimationFrame(tick);
    idle = false;

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver, true);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [touch, reduced]);

  if (touch || reduced) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[120] hidden md:block">
      <div
        ref={dot}
        className="bg-signal fixed top-0 left-0 size-1.5 rounded-full"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ring}
        data-cursor-ring
        className="border-signal/70 fixed top-0 left-0 flex items-center justify-center rounded-full border transition-[width,height,background-color,border-color,opacity] duration-300"
        style={
          {
            willChange: "transform",
            "--ring-w": label ? "116px" : active ? "42px" : "30px",
            "--ring-h": label ? "30px" : active ? "42px" : "30px",
            backgroundColor: label
              ? "color-mix(in oklab, var(--signal) 13%, transparent)"
              : "transparent",
          } as React.CSSProperties
        }
      >
        {label ? (
          <span data-cursor-label className="label text-foreground text-[9px]! whitespace-nowrap">
            {label}
          </span>
        ) : null}
      </div>
    </div>
  );
}
