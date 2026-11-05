"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

// A pothos vine that grows down the margin of an ordered list as the reader
// scrolls, and unfurls a leaf at each item it reaches. The list is the
// content; the vine is decoration (hidden from assistive technology, absent on
// narrow screens, fully grown under reduced motion and in print).

interface Shape { h: number; d: string; leaves: { y: number; side: 1 | -1 }[] }

export default function ScrollVine({ children }: { children: React.ReactNode }) {
  const host = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const [shape, setShape] = useState<Shape | null>(null);
  const [grown, setGrown] = useState(0);
  const [len, setLen] = useState(0);

  // The stem's length is known once its path is drawn.
  useLayoutEffect(() => {
    if (shape && path.current) setLen(path.current.getTotalLength());
  }, [shape]);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const measure = () => {
      const r = el.getBoundingClientRect();
      const items = Array.from(el.querySelectorAll(":scope > ol > li, :scope > ul > li")) as HTMLElement[];
      const h = r.height;
      let d = "M 20 0";
      for (let y = 24; y <= h; y += 24) d += ` L ${(20 + Math.sin(y / 58) * 7).toFixed(1)} ${y}`;
      const leaves = items.map((li, i) => ({ y: li.getBoundingClientRect().top - r.top + 26, side: (i % 2 ? 1 : -1) as 1 | -1 }));
      setShape({ h, d, leaves });
    };

    const update = () => {
      if (reduce) { setGrown(1); return; }
      const r = el.getBoundingClientRect();
      const p = (window.innerHeight * 0.65 - r.top) / Math.max(1, r.height);
      setGrown(Math.max(0, Math.min(1, p)));
    };

    measure(); update();
    const ro = new ResizeObserver(() => { measure(); update(); });
    ro.observe(el);
    window.addEventListener("scroll", update, { passive: true });
    return () => { ro.disconnect(); window.removeEventListener("scroll", update); };
  }, []);

  return (
    <div ref={host} className="scroll-vine relative">
      {shape && (
        <svg
          aria-hidden="true"
          className="scroll-vine-svg pointer-events-none absolute -left-12 top-0 hidden lg:block"
          width={40}
          height={shape.h}
          viewBox={`0 0 40 ${shape.h}`}
          overflow="visible"
        >
          <path
            ref={path}
            d={shape.d}
            fill="none"
            className="scroll-vine-stem"
            strokeDasharray={len || undefined}
            strokeDashoffset={len ? len * (1 - grown) : undefined}
          />
          {shape.leaves.map((leaf, i) => {
            const on = grown * shape.h >= leaf.y;
            const x = 20 + Math.sin(leaf.y / 58) * 7;
            return (
              <g key={i} transform={`translate(${x.toFixed(1)} ${leaf.y.toFixed(1)}) rotate(${leaf.side * 55})`}>
                <g className={`scroll-vine-leaf${on ? " is-on" : ""}`}>
                  <path d="M0 0 C -6 -2, -14 -6, -14 -16 C -14 -26, -4 -32, 0 -38 C 4 -32, 14 -26, 14 -16 C 14 -6, 6 -2, 0 0 Z" className="scroll-vine-leaf-body" />
                  <path d="M0 -3 C 0.6 -14, 0.6 -26, 0 -34" fill="none" className="scroll-vine-leaf-vein" />
                </g>
              </g>
            );
          })}
        </svg>
      )}
      {children}
    </div>
  );
}
