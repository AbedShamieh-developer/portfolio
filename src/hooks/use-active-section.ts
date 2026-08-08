import { useEffect, useState } from "react";
import { SECTIONS } from "@/data/portfolio";

export function useActiveSection() {
  const [active, setActive] = useState<string>("hero");

  useEffect(() => {
    const ids = ["hero", ...SECTIONS.map((s) => s.id)];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.01, 0.2, 0.5] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return active;
}
