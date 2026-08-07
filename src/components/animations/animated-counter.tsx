import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

// Detect reduced-motion preference once at module level
const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function AnimatedCounter({
  value,
  duration = 2,
  prefix = "",
  suffix = "",
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  // amount:"some" fires as soon as any pixel of the element is visible
  const isInView = useInView(ref, { once: true, amount: "some" });
  const [displayValue, setDisplayValue] = useState(value);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    // Respect user accessibility preference — show final value immediately
    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplayValue(Math.round(v)),
    });

    return controls.stop;
  }, [isInView, value, duration]);

  // Safety fallback: if IntersectionObserver never fires (hidden tab, old
  // WebView, etc.) ensure the real number is shown after 3 seconds.
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasAnimated.current) {
        hasAnimated.current = true;
        setDisplayValue(value);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [value]);

  const formatted = new Intl.NumberFormat("en-NG").format(displayValue);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
