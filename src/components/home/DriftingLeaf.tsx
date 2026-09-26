"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface Path {
  sx: number;
  sy: number;
  ex: number;
  ey: number;
  endScroll: number;
}

/**
 * One pruned leaf that leaves the hero plate as the reader scrolls and lands
 * beside the Systems Map heading. Positions are measured from two markers,
 * #hero-plate and #map-leaf-landing, relative to the home page wrapper, and
 * re-measured on resize. Desktop only, and absent under reduced motion.
 */
export default function DriftingLeaf() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [path, setPath] = useState<Path | null>(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    const measure = () => {
      const host = ref.current?.parentElement;
      const plate = document.getElementById("hero-plate");
      const land = document.getElementById("map-leaf-landing");
      if (!host || !plate || !land) return;
      const o = host.getBoundingClientRect();
      const p = plate.getBoundingClientRect();
      const l = land.getBoundingClientRect();
      setPath({
        sx: p.left - o.left + p.width * 0.72,
        sy: p.top - o.top + p.height * 0.8,
        ex: l.left - o.left,
        ey: l.top - o.top,
        endScroll: Math.max(200, l.top + window.scrollY - window.innerHeight * 0.5),
      });
    };
    measure();
    window.addEventListener("resize", measure);
    const t = window.setTimeout(measure, 800);
    return () => {
      window.removeEventListener("resize", measure);
      window.clearTimeout(t);
    };
  }, []);

  const end = path?.endScroll ?? 1;
  const progress = useTransform(scrollY, [40, end], [0, 1], { clamp: true });
  const x = useTransform(progress, (v) => (path ? path.sx + (path.ex - path.sx) * v + Math.sin(v * Math.PI * 3) * 60 * (1 - v) : 0));
  const y = useTransform(progress, (v) => (path ? path.sy + (path.ey - path.sy) * v : 0));
  const rotate = useTransform(progress, (v) => 150 + v * 420);
  const opacity = useTransform(progress, [0, 0.04, 1], [0, 1, 1]);

  if (reduce) return null;

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 z-30 hidden lg:block"
      style={{ x, y, rotate, opacity, visibility: path ? "visible" : "hidden" }}
    >
      <svg viewBox="-46 -96 92 100" width={44} height={48}>
        <path
          d="M0 -4 C -8 -2, -32 0, -38 -24 C -44 -50, -18 -72, 0 -90 C 18 -72, 44 -50, 38 -24 C 32 0, 8 -2, 0 -4 Z"
          fill="#CFC7B2"
          stroke="#737D86"
          strokeWidth={3.5}
          strokeLinejoin="round"
        />
        <path d="M0 -8 C 1 -30, 1 -58, 0 -80" fill="none" stroke="#737D86" strokeWidth={2.5} strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}
