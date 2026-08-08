import { motion, useInView } from "motion/react";
import { useCallback, useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-motion-prefs";

/**
 * Scroll-in reveal.
 *
 * Deliberately opacity + transform only. The previous version animated
 * `filter: blur()`, which forces a full repaint of the element every frame —
 * with a Reveal on nearly every block that was the single largest scroll cost
 * on the page.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px -12% 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionShell({
  id,
  num,
  label,
  children,
  className = "",
}: {
  id: string;
  num: string;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative mx-auto w-full max-w-[86rem] px-5 sm:px-8 ${className}`}>
      <Reveal className="mb-10 flex items-center gap-4 sm:mb-16">
        <span className="label text-signal">{num}</span>
        <span className="label">{label}</span>
        <span className="hairline flex-1" />
      </Reveal>
      {children}
    </section>
  );
}

const MAGNET_STRENGTH = 0.28;
const MAGNET_MAX = 10;

/**
 * Pull the control a few pixels toward the cursor while it is hovered.
 * Listeners are per-element and only ever active on the hovered control, so
 * this costs one rAF at most regardless of how many are on the page.
 */
function useMagnet(disabled: boolean) {
  const ref = useRef<HTMLElement>(null);
  const frame = useRef(0);

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (disabled || frame.current) return;
      const { clientX, clientY } = event;
      frame.current = requestAnimationFrame(() => {
        frame.current = 0;
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dx = (clientX - (rect.left + rect.width / 2)) * MAGNET_STRENGTH;
        const dy = (clientY - (rect.top + rect.height / 2)) * MAGNET_STRENGTH;
        const clamp = (v: number) => Math.max(-MAGNET_MAX, Math.min(MAGNET_MAX, v));
        el.style.transform = `translate3d(${clamp(dx)}px, ${clamp(dy)}px, 0)`;
      });
    },
    [disabled],
  );

  const onPointerLeave = useCallback(() => {
    if (frame.current) {
      cancelAnimationFrame(frame.current);
      frame.current = 0;
    }
    if (ref.current) ref.current.style.transform = "";
  }, []);

  return { ref, onPointerMove, onPointerLeave };
}

export function MagneticLink({
  href,
  children,
  cursor,
  variant = "primary",
  onClick,
  external,
}: {
  href?: string;
  children: ReactNode;
  cursor?: string;
  variant?: "primary" | "ghost";
  onClick?: () => void;
  external?: boolean;
}) {
  const reduced = useReducedMotion();
  const magnet = useMagnet(reduced);

  const base =
    "group relative inline-flex min-h-11 items-center gap-2 rounded-full px-6 py-3 text-sm tracking-tight transition-[transform,background-color,border-color,box-shadow] duration-300 ease-[var(--ease-narrative)] will-change-transform";
  const styles =
    variant === "primary"
      ? "bg-signal text-primary-foreground hover:shadow-[0_0_40px_-8px_var(--signal)]"
      : "border border-border text-foreground hover:border-signal/60 hover:bg-accent";

  const shared = {
    "data-cursor": cursor,
    "data-magnet": true,
    className: `${base} ${styles}`,
    onPointerMove: magnet.onPointerMove,
    onPointerLeave: magnet.onPointerLeave,
  } as const;

  if (!href) {
    return (
      <button ref={magnet.ref as React.Ref<HTMLButtonElement>} onClick={onClick} {...shared}>
        {children}
      </button>
    );
  }

  const external_props = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <a ref={magnet.ref as React.Ref<HTMLAnchorElement>} href={href} {...shared} {...external_props}>
      {children}
    </a>
  );
}
