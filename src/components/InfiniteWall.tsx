"use client";

import { useEffect, useRef } from "react";
import "./infinite-wall.css";

// A wall of covers that keeps going: rows drift in opposite directions, take a
// drag with momentum, slow to a stop under the pointer, and curve away at the
// edges like a cylinder. Each card is a link. The wall is supplementary: the
// grid that follows it is the accessible list, so the repeated copies here
// are hidden from assistive technology. Reduced motion keeps drag, drops drift.

export interface WallItem { src: string; href: string; title: string; kicker: string }

const COPIES = 3;

export default function InfiniteWall({ rows, label }: { rows: WallItem[][]; label: string }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = host.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tracks = Array.from(root.querySelectorAll<HTMLDivElement>(".wall-track"));
    const state = tracks.map((_, i) => ({
      offset: 0, vel: 0, drift: (i % 2 ? -1 : 1) * 22, hover: 0, hoverTarget: 0,
      dragging: false, lastX: 0, moved: 0, setW: 0,
    }));
    let frame = 0, running = false, visible = false, last = performance.now();

    const measure = () => tracks.forEach((t, i) => { state[i].setW = t.scrollWidth / COPIES; });

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const mid = window.innerWidth / 2;
      tracks.forEach((t, i) => {
        const s = state[i];
        s.hover += (s.hoverTarget - s.hover) * 0.08;
        if (!s.dragging) {
          s.offset += (s.vel + (reduce ? 0 : s.drift * (1 - s.hover))) * dt;
          s.vel *= Math.pow(0.04, dt);
        }
        if (s.setW > 0) s.offset = ((s.offset % s.setW) + s.setW) % s.setW;
        t.style.transform = `translate3d(${(-s.offset - s.setW).toFixed(1)}px,0,0)`;
        // Curve: cards turn and shrink away from the middle of the screen.
        for (const card of Array.from(t.children) as HTMLElement[]) {
          const r = card.getBoundingClientRect();
          const d = clamp((r.left + r.width / 2 - mid) / mid, -1.4, 1.4);
          card.style.transform = `perspective(1200px) rotateY(${(-d * 18).toFixed(2)}deg) scale(${(1 - Math.abs(d) * 0.1).toFixed(3)})`;
          card.style.opacity = String(clamp(1.25 - Math.abs(d) * 0.55, 0.25, 1));
        }
      });
      frame = running ? requestAnimationFrame(tick) : 0;
    };
    const play = () => { if (!running && visible && !document.hidden) { running = true; last = performance.now(); frame = requestAnimationFrame(tick); } };
    const pause = () => { running = false; cancelAnimationFrame(frame); frame = 0; };

    const cleanups: (() => void)[] = [];
    tracks.forEach((t, i) => {
      const s = state[i];
      const row = t.parentElement as HTMLElement;
      const down = (e: PointerEvent) => { s.dragging = true; s.lastX = e.clientX; s.moved = 0; s.vel = 0; row.setPointerCapture(e.pointerId); };
      const move = (e: PointerEvent) => {
        if (!s.dragging) return;
        const dx = e.clientX - s.lastX;
        s.lastX = e.clientX; s.moved += Math.abs(dx);
        s.offset -= dx; s.vel = -dx * 60;
      };
      const up = (e: PointerEvent) => { s.dragging = false; if (row.hasPointerCapture(e.pointerId)) row.releasePointerCapture(e.pointerId); };
      const enter = () => { s.hoverTarget = 1; };
      const leave = () => { s.hoverTarget = 0; };
      // A drag is not a click.
      const click = (e: MouseEvent) => { if (s.moved > 6) { e.preventDefault(); e.stopPropagation(); } };
      row.addEventListener("pointerdown", down);
      row.addEventListener("pointermove", move);
      row.addEventListener("pointerup", up);
      row.addEventListener("pointercancel", up);
      row.addEventListener("pointerenter", enter);
      row.addEventListener("pointerleave", leave);
      row.addEventListener("click", click, true);
      cleanups.push(() => {
        row.removeEventListener("pointerdown", down); row.removeEventListener("pointermove", move);
        row.removeEventListener("pointerup", up); row.removeEventListener("pointercancel", up);
        row.removeEventListener("pointerenter", enter); row.removeEventListener("pointerleave", leave);
        row.removeEventListener("click", click, true);
      });
    });

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) play(); else pause(); });
    io.observe(root);
    const onVis = () => (document.hidden ? pause() : play());
    document.addEventListener("visibilitychange", onVis);
    return () => { pause(); ro.disconnect(); io.disconnect(); document.removeEventListener("visibilitychange", onVis); cleanups.forEach((f) => f()); };
  }, []);

  return (
    <div ref={host} className="wall" aria-label={label} role="region">
      {rows.map((items, r) => (
        <div key={r} className="wall-row">
          <div className="wall-track">
            {Array.from({ length: COPIES }, (_, c) =>
              items.map((it) => (
                <a
                  key={`${c}-${it.href}`}
                  href={it.href}
                  className="wall-card"
                  draggable={false}
                  aria-hidden={c !== 1 ? true : undefined}
                  tabIndex={c !== 1 ? -1 : undefined}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={it.src} alt={c === 1 ? it.title : ""} width={480} height={252} loading="lazy" decoding="async" draggable={false} />
                  <span className="wall-caption">
                    <span className="wall-kicker">{it.kicker}</span>
                    <span className="wall-title">{it.title}</span>
                  </span>
                </a>
              )),
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)); }
