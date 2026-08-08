"use client";

import { useEffect, type CSSProperties } from "react";
import { useReducedMotion } from "@/hooks/use-motion-prefs";

/**
 * The page's background field.
 *
 * The drifting nodes are CSS keyframes rather than Motion animations: they run
 * for the entire session, and CSS transform/opacity animations are handed to
 * the compositor instead of costing a JS frame each.
 */
const NODES = [
  { left: "12%", top: "24%", dx: "12px", dy: "-10px", dur: "7s" },
  { left: "32%", top: "68%", dx: "-10px", dy: "12px", dur: "7.7s" },
  { left: "58%", top: "18%", dx: "8px", dy: "14px", dur: "8.4s" },
  { left: "78%", top: "56%", dx: "-14px", dy: "-8px", dur: "9.1s" },
  { left: "88%", top: "82%", dx: "10px", dy: "10px", dur: "9.8s" },
];

export function AmbientMotion() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    // Pointer events fire far faster than the screen refreshes; writing the
    // custom properties on every one of them repaints a full-viewport gradient.
    let raf = 0;
    let x = 0.52;
    let y = 0.35;

    const flush = () => {
      raf = 0;
      document.documentElement.style.setProperty("--px", String(x));
      document.documentElement.style.setProperty("--py", String(y));
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX / window.innerWidth;
      y = e.clientY / window.innerHeight;
      if (!raf) raf = requestAnimationFrame(flush);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="grid-etch absolute inset-0 opacity-[0.14]" />
      <div
        className="absolute inset-0 opacity-55"
        style={{
          background:
            "radial-gradient(34rem 24rem at calc(var(--px,0.52) * 100%) calc(var(--py,0.35) * 100%), color-mix(in oklab, var(--signal) 6%, transparent), transparent 74%)",
        }}
      />

      {NODES.map((node, i) => (
        <span
          key={node.left + node.top}
          className="bg-signal/35 absolute size-1 rounded-full opacity-20"
          style={
            {
              left: node.left,
              top: node.top,
              "--dx": node.dx,
              "--dy": node.dy,
              animation: reduced
                ? undefined
                : `ambient-drift ${node.dur} ease-in-out ${i * 0.35}s infinite`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
