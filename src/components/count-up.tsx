"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animates a number from 0 to `to` once the element scrolls into view.
 * Used by the "Our Numbers" band so each stat counts up (e.g. 0 → 72+).
 */
export function CountUp({
  to,
  suffix = "",
  comma = false,
  durationMs = 1600,
}: {
  to: number;
  suffix?: string;
  comma?: boolean;
  durationMs?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      window.requestAnimationFrame(() => setValue(to));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting || started.current) return;
        started.current = true;

        let raf = 0;
        let start: number | null = null;
        const step = (ts: number) => {
          if (start === null) start = ts;
          const progress = Math.min((ts - start) / durationMs, 1);
          // ease-out for a settling feel
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(eased * to));
          if (progress < 1) raf = window.requestAnimationFrame(step);
        };
        raf = window.requestAnimationFrame(step);
        observer.disconnect();
        return () => window.cancelAnimationFrame(raf);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [to, durationMs]);

  const display = comma ? value.toLocaleString("en-IN") : String(value);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
