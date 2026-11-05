"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface SpotlightCardProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  /** accent color for the cursor glow + top rule */
  accent?: string;
  /** true for links that leave the site (e.g. a PyPI project page) - opens in a new tab */
  external?: boolean;
  /** tighter padding, for small tiles such as category links */
  compact?: boolean;
}

/**
 * PMP's one hoverable-card pattern: use it for any card that is a link.
 * A card that lifts on hover, tilts a few degrees toward the cursor, renders a
 * warm glow that follows it, and catches a sheen of light on the way in.
 * Uses CSS custom props (--mx/--my, --rx/--ry) updated on pointer move: cheap,
 * no re-render. Reduced motion keeps the glow and drops the tilt.
 */
export default function SpotlightCard({ href, className = "", children, accent = "var(--accent-purple)", external = false, compact = false }: SpotlightCardProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
    if (reduceMotion) return;
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-ny * 5).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(nx * 6).toFixed(2)}deg`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <motion.div className="h-full" whileHover={reduceMotion ? undefined : { y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 24 }}>
      <Link
        ref={ref}
        href={href}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={`spotlight-card group${compact ? " spotlight-card--compact" : ""}`}
        style={{ ["--spot" as string]: accent }}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        <span className="spotlight-glow" aria-hidden />
        <span className="spotlight-sheen" aria-hidden />
        <span className="spotlight-rule" aria-hidden />
        <span className={`relative z-10 flex flex-col h-full ${className}`}>{children}</span>
      </Link>
    </motion.div>
  );
}
