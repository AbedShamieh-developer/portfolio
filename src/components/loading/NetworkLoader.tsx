"use client";

import { useEffect, useRef } from "react";
import { BEATS } from "@/components/loading/loader-config";

/**
 * The infrastructure graph behind the name.
 *
 * Canvas rather than SVG/Motion elements: ~17 nodes, ~22 edges and a handful of
 * in-flight packets would otherwise be ~40 independently animated DOM nodes.
 * One rAF loop, one composited layer, zero React renders per frame.
 */

type Node = { x: number; y: number; d: number };
type Edge = [number, number];

/**
 * Layout keeps the middle band clear so the typography always sits on
 * uncluttered background. Values are normalized (0–1); `d` is parallax depth.
 */
const DESKTOP_NODES: Node[] = [
  { x: 0.07, y: 0.2, d: 0.5 },
  { x: 0.19, y: 0.11, d: 0.9 },
  { x: 0.31, y: 0.24, d: 0.65 },
  { x: 0.44, y: 0.1, d: 1.0 },
  { x: 0.57, y: 0.22, d: 0.7 },
  { x: 0.7, y: 0.12, d: 0.95 },
  { x: 0.82, y: 0.25, d: 0.6 },
  { x: 0.93, y: 0.14, d: 0.8 },
  { x: 0.04, y: 0.48, d: 0.75 },
  { x: 0.96, y: 0.53, d: 0.75 },
  { x: 0.1, y: 0.79, d: 0.6 },
  { x: 0.23, y: 0.9, d: 0.95 },
  { x: 0.37, y: 0.77, d: 0.7 },
  { x: 0.51, y: 0.91, d: 1.0 },
  { x: 0.65, y: 0.78, d: 0.65 },
  { x: 0.79, y: 0.89, d: 0.9 },
  { x: 0.91, y: 0.76, d: 0.55 },
];

const DESKTOP_EDGES: Edge[] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 7],
  [0, 8],
  [7, 9],
  [8, 10],
  [9, 16],
  [10, 11],
  [11, 12],
  [12, 13],
  [13, 14],
  [14, 15],
  [15, 16],
  [2, 12],
  [4, 14],
  [1, 11],
  [5, 15],
  [3, 13],
];

const MOBILE_NODES: Node[] = [
  { x: 0.1, y: 0.14, d: 0.7 },
  { x: 0.34, y: 0.07, d: 1.0 },
  { x: 0.6, y: 0.16, d: 0.75 },
  { x: 0.88, y: 0.09, d: 0.9 },
  { x: 0.05, y: 0.44, d: 0.6 },
  { x: 0.95, y: 0.5, d: 0.6 },
  { x: 0.14, y: 0.86, d: 0.9 },
  { x: 0.45, y: 0.93, d: 1.0 },
  { x: 0.8, y: 0.84, d: 0.75 },
];

const MOBILE_EDGES: Edge[] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [0, 4],
  [3, 5],
  [4, 6],
  [6, 7],
  [7, 8],
  [8, 5],
  [1, 7],
];

const EDGE_DRAW_DURATION = 0.62;
const EDGE_STAGGER = 0.055;
const PACKET_TRAVEL = 1.5;
const PACKET_CYCLE = 3.6;

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/** Resolve an oklch design token to RGB so we can build alpha variants cheaply. */
function readToken(name: string, fallback: [number, number, number]): [number, number, number] {
  try {
    const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    if (!raw) return fallback;
    const probe = document.createElement("canvas");
    probe.width = 1;
    probe.height = 1;
    const ctx = probe.getContext("2d", { willReadFrequently: true });
    if (!ctx) return fallback;
    ctx.fillStyle = "#000000";
    ctx.fillStyle = raw;
    if (ctx.fillStyle === "#000000") return fallback;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    return [r ?? fallback[0], g ?? fallback[1], b ?? fallback[2]];
  } catch {
    return fallback;
  }
}

/** Pre-rendered glow sprite — far cheaper than per-node shadowBlur. */
function makeGlow(rgb: string) {
  const size = 56;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, `rgba(${rgb},0.5)`);
  gradient.addColorStop(0.3, `rgba(${rgb},0.14)`);
  gradient.addColorStop(1, `rgba(${rgb},0)`);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return canvas;
}

export function NetworkLoader({
  reduced,
  mobile,
  running,
}: {
  reduced: boolean;
  mobile: boolean;
  running: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /*
   * Read through a ref rather than an effect dependency. If `running` tore the
   * effect down and re-ran it, the canvas would be cleared and redrawn at
   * elapsed=0 — the graph would blink out instead of dissolving with its
   * wrapper. Stopping the loop simply leaves the last frame painted.
   */
  const runningRef = useRef(running);
  runningRef.current = running;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const nodes = mobile ? MOBILE_NODES : DESKTOP_NODES;
    const edges = mobile ? MOBILE_EDGES : DESKTOP_EDGES;

    const signal = readToken("--signal", [122, 211, 238]);
    const steel = readToken("--steel-soft", [155, 158, 165]);
    const signalRgb = signal.join(",");
    const steelRgb = steel.join(",");
    const glow = makeGlow(signalRgb);

    // Cap DPR: retina phones gain nothing visible from 3x on a 1px-line graph.
    const maxDpr = mobile ? 1.75 : 2;
    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    /* ---- pointer parallax (desktop only, lerped, never per-event work) ---- */
    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const onPointer = (event: PointerEvent) => {
      pointer.tx = event.clientX / window.innerWidth;
      pointer.ty = event.clientY / window.innerHeight;
    };
    const interactive = !mobile && !reduced;
    if (interactive) window.addEventListener("pointermove", onPointer, { passive: true });

    const parallaxAmp = mobile ? 0 : 16;
    const positions = nodes.map(() => ({ x: 0, y: 0 }));
    const edgeStart = edges.map((_, i) => BEATS.network + i * EDGE_STAGGER);

    const start = performance.now();
    let raf = 0;

    const render = (now: number) => {
      const elapsed = reduced ? 6 : (now - start) / 1000;

      pointer.x += (pointer.tx - pointer.x) * 0.045;
      pointer.y += (pointer.ty - pointer.y) * 0.045;
      const px = (pointer.x - 0.5) * parallaxAmp;
      const py = (pointer.y - 0.5) * parallaxAmp * 0.7;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i]!;
        // A slow drift keeps the graph alive without reading as "floating dust".
        const drift = reduced ? 0 : Math.sin(elapsed * 0.5 + i * 1.7) * 1.6;
        positions[i]!.x = node.x * width + px * node.d;
        positions[i]!.y = node.y * height + py * node.d + drift;
      }

      /* ---- edges assemble ---- */
      ctx.lineCap = "round";
      for (let i = 0; i < edges.length; i += 1) {
        const [a, b] = edges[i]!;
        const t = (elapsed - edgeStart[i]!) / EDGE_DRAW_DURATION;
        if (t <= 0) continue;
        const p = easeOut(Math.min(1, t));
        const from = positions[a]!;
        const to = positions[b]!;
        const isCross = i >= edges.length - (mobile ? 1 : 5);

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(from.x + (to.x - from.x) * p, from.y + (to.y - from.y) * p);
        ctx.strokeStyle = isCross
          ? `rgba(${steelRgb},${0.16 * p})`
          : `rgba(${signalRgb},${0.26 * p})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      /* ---- packets in flight ---- */
      if (!reduced) {
        for (let i = 0; i < edges.length; i += 3) {
          const [a, b] = edges[i]!;
          const since = elapsed - edgeStart[i]! - EDGE_DRAW_DURATION;
          if (since <= 0) continue;
          const cycle = (since + i * 0.4) % PACKET_CYCLE;
          if (cycle > PACKET_TRAVEL) continue;
          const t = cycle / PACKET_TRAVEL;
          const from = positions[a]!;
          const to = positions[b]!;
          const x = from.x + (to.x - from.x) * t;
          const y = from.y + (to.y - from.y) * t;
          const fade = Math.sin(t * Math.PI);

          ctx.globalAlpha = fade;
          ctx.drawImage(glow, x - 14, y - 14, 28, 28);
          ctx.globalAlpha = 1;
          ctx.beginPath();
          ctx.arc(x, y, 1.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${signalRgb},${0.9 * fade})`;
          ctx.fill();
        }
      }

      /* ---- nodes ---- */
      for (let i = 0; i < nodes.length; i += 1) {
        const appear = (elapsed - (BEATS.network - 0.2) - i * 0.045) / 0.5;
        if (appear <= 0) continue;
        const p = easeOut(Math.min(1, appear));
        const { x, y } = positions[i]!;
        const radius = 2.1 * p;

        ctx.globalAlpha = 0.75 * p;
        ctx.drawImage(glow, x - 20, y - 20, 40, 40);
        ctx.globalAlpha = 1;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${signalRgb},${0.85 * p})`;
        ctx.fill();

        // One-shot connection ring as each node joins the graph.
        if (appear < 2.4) {
          const ring = Math.min(1, appear / 1.6);
          ctx.beginPath();
          ctx.arc(x, y, 3 + ring * 13, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${signalRgb},${0.32 * (1 - ring)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      raf = !reduced && runningRef.current ? requestAnimationFrame(render) : 0;
    };

    if (reduced) {
      // Single static frame — the graph is present, nothing moves.
      render(performance.now());
    } else {
      raf = requestAnimationFrame(render);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      observer.disconnect();
      if (interactive) window.removeEventListener("pointermove", onPointer);
    };
  }, [reduced, mobile]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 size-full"
      style={{ willChange: "transform" }}
    />
  );
}
