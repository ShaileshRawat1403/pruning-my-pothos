"use client";

import { useEffect, useRef } from "react";

// A field of print dots behind a section heading: newsprint halftone, in ink
// on paper and faintly lit in dark mode. The dots breathe slowly and part
// around the cursor like ink pushed by a finger. Decorative only: it sits
// behind content, takes no pointer events, stops off screen, and is a still
// pattern under reduced motion.

export default function HalftoneField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const GAP = 13;
    let W = 0, H = 0, dpr = 1, frame = 0, running = false, visible = false;
    let mx = -9999, my = -9999, push = 0, pushTarget = 0;
    const start = performance.now();

    const resize = () => {
      const r = host.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width; H = r.height;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`; canvas.style.height = `${H}px`;
    };

    const draw = (now: number) => {
      const t = reduce ? 0 : (now - start) / 1000;
      const dark = document.documentElement.getAttribute("data-theme") !== "light";
      push += (pushTarget - push) * 0.08;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = dark ? "rgba(240,232,214,0.22)" : "rgba(43,38,32,0.2)";
      const cols = Math.ceil(W / GAP) + 1, rows = Math.ceil(H / GAP) + 1;
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const x = i * GAP + (j % 2 ? GAP / 2 : 0), y = j * GAP;
          // Fade toward the edges and the bottom so the field never boxes the text.
          const edge = Math.min(1, x / (W * 0.25), (W - x) / (W * 0.25)) * Math.max(0, 1 - y / H);
          if (edge <= 0.02) continue;
          const wave = 0.5 + 0.5 * Math.sin(x * 0.012 + y * 0.018 + t * 0.6) * Math.cos(y * 0.01 - t * 0.4);
          let r = 0.4 + 1.9 * wave * edge;
          let ox = 0, oy = 0;
          if (push > 0.01) {
            const dx = x - mx, dy = y - my, d = Math.hypot(dx, dy);
            if (d < 140) {
              const f = (1 - d / 140) * push;
              ox = (dx / (d || 1)) * f * 10; oy = (dy / (d || 1)) * f * 10;
              r *= 1 - f * 0.6;
            }
          }
          if (r < 0.35) continue;
          ctx.beginPath(); ctx.arc(x + ox, y + oy, r, 0, Math.PI * 2); ctx.fill();
        }
      }
    };

    const loop = (now: number) => { draw(now); frame = running ? requestAnimationFrame(loop) : 0; };
    const play = () => { if (!running && visible && !reduce && !document.hidden) { running = true; frame = requestAnimationFrame(loop); } };
    const pause = () => { running = false; cancelAnimationFrame(frame); frame = 0; };

    resize(); draw(performance.now());
    const ro = new ResizeObserver(() => { resize(); draw(performance.now()); });
    ro.observe(host);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) play(); else pause(); });
    io.observe(host);
    const onVis = () => (document.hidden ? pause() : play());
    document.addEventListener("visibilitychange", onVis);
    const theme = new MutationObserver(() => draw(performance.now()));
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      mx = e.clientX - r.left; my = e.clientY - r.top;
      pushTarget = mx >= 0 && my >= 0 && mx <= W && my <= H ? 1 : 0;
    };
    const onLeave = () => { pushTarget = 0; };
    const zone = host.parentElement ?? host;
    zone.addEventListener("pointermove", onMove);
    zone.addEventListener("pointerleave", onLeave);
    return () => {
      pause(); ro.disconnect(); io.disconnect(); theme.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      zone.removeEventListener("pointermove", onMove);
      zone.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`} />;
}
