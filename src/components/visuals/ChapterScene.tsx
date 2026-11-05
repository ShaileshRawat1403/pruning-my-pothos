"use client";

import React, { useEffect, useRef, useState } from "react";
import type { SceneStep } from "../../lib/scene-steps";
import { SCENES } from "../illustrations/scenes";
import { SW, SH } from "../illustrations/scenes/kit";
import { CHAPTER_FRAMES, type Frame } from "../../lib/content/chapters";
import SceneVisual from "./SceneVisual";
import "./chapter-scene.css";

/**
 * A scene told as a chapter, for the flagship articles. The stage pins and
 * fills the screen, a title card opens it, the step text arrives one card at
 * a time beside it, and a camera moves as the reader scrolls: the paper plate
 * turns and drifts a little in depth, holding each step's pose and then
 * travelling to the next. The plate is never cropped; a hand-set framing
 * (lib/content/chapters.ts) can also zoom inside it.
 * The drawing is the article's own scene, unchanged, and the words are the
 * visual's own steps, so a chapter says nothing the scene does not.
 *
 * Narrow screens, reduced motion and no script get the ordinary scene.
 */

const QUERY = "(min-width: 900px) and (prefers-reduced-motion: no-preference)";
// Scroll per step, and the lead-in that the title card plays over, in viewport heights.
const PER_STEP = 0.75;
const LEAD = 0.45;

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const smooth = (x: number) => x * x * (3 - 2 * x);

const WHOLE: Frame = { x: SW / 2, y: SH / 2, s: 1 };

/** How the plate stands for a step: a few degrees of turn and tilt. */
function pose(i: number) {
  return { yaw: Math.sin(i * 1.7 + 0.6) * 4.5, pitch: Math.cos(i * 1.1) * 2.2 };
}

export default function ChapterScene({ sceneId, alt, steps, title }: { sceneId: string; alt: string; steps: SceneStep[]; title: string }) {
  const [live, setLive] = useState(false);
  const [step, setStep] = useState(0);
  const wrap = useRef<HTMLDivElement>(null);
  const cam = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLSpanElement>(null);
  const Scene = SCENES[sceneId];
  const n = steps.length;

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const on = () => setLive(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    if (!live) return;
    const el = wrap.current;
    if (!el) return;
    const frames = steps.map((_, i) => CHAPTER_FRAMES[sceneId]?.[i] ?? WHOLE);
    let frame = 0;
    let last = -1;

    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const pin = el.firstElementChild as HTMLElement | null;
      const travel = r.height - (pin?.offsetHeight ?? window.innerHeight);
      const p = clamp(-r.top / Math.max(1, travel), 0, 1);
      // f runs from -LEAD (title card) to n (end of the last step).
      const f = p * (n + LEAD / PER_STEP) - LEAD / PER_STEP;
      const i = clamp(Math.floor(f), 0, n - 1);
      if (i !== last) { last = i; setStep(i); }

      // Hold the step's framing, then travel to the next one late in the step.
      const u = clamp(f - i, 0, 1);
      const a = frames[i], b = frames[Math.min(n - 1, i + 1)];
      const k = i < n - 1 ? smooth(clamp((u - 0.6) / 0.4, 0, 1)) : 0;
      const x = a.x + (b.x - a.x) * k, y = a.y + (b.y - a.y) * k;
      const s = a.s + (b.s - a.s) * k;
      if (cam.current) {
        cam.current.style.transform = s === 1 && x === SW / 2 && y === SH / 2 ? "" : `scale(${s.toFixed(4)}) translate(${((SW / 2 - x) / SW * 100).toFixed(3)}%, ${((SH / 2 - y) / SH * 100).toFixed(3)}%)`;
      }
      if (stage.current) {
        // The plate: arrives from a little way back, then turns step to step.
        const pa = pose(i), pb = pose(Math.min(n - 1, i + 1));
        const drift = f < 0 ? 0 : (u - 0.5) * 1.2;
        const yaw = pa.yaw + (pb.yaw - pa.yaw) * k + drift;
        const pitch = pa.pitch + (pb.pitch - pa.pitch) * k;
        const enter = f < 0 ? smooth(clamp(1 + f / (LEAD / PER_STEP), 0, 1)) : 1;
        const z = 0.9 + 0.1 * enter;
        stage.current.style.transform = `perspective(1800px) rotateY(${yaw.toFixed(2)}deg) rotateX(${pitch.toFixed(2)}deg) scale(${z.toFixed(4)})`;
      }
      if (titleRef.current) {
        const o = clamp(-f * 2.2, 0, 1);
        titleRef.current.style.opacity = String(o);
        titleRef.current.style.transform = `translateY(${((1 - o) * -18).toFixed(1)}px)`;
      }
      if (railRef.current) railRef.current.style.transform = `scaleY(${clamp(f / n, 0, 1).toFixed(4)})`;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, [live, n, sceneId, steps]);

  if (!live || !Scene) return <SceneVisual sceneId={sceneId} alt={alt} steps={steps} />;

  const cur = steps[step];
  return (
    <div ref={wrap} className="chapter" style={{ height: `calc(100svh - 81px + ${(n * PER_STEP + LEAD) * 100}vh)` }}>
      <div className="chapter-pin">
        <div ref={stage} className="chapter-stage" role="img" aria-label={alt}>
          <div ref={cam} className="chapter-cam">
            <Scene step={step} steps={steps} id={`ch-${sceneId}`} />
          </div>
        </div>

        <div ref={titleRef} className="chapter-title" aria-hidden="true">
          <span className="chapter-eyebrow">A scene in {n} steps</span>
          <p>{title}</p>
          <span className="chapter-hint">Scroll</span>
        </div>

        <div key={cur.id} className="chapter-card" aria-hidden="true">
          <span className="chapter-count">{String(step + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
          {cur.tag && <span className="scene-tag">{cur.tag}</span>}
          <p className="chapter-card-title">{cur.title}</p>
          {cur.body && <p className="chapter-card-body">{cur.body}</p>}
          {cur.items && (
            <ul className="chapter-card-items">
              {cur.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          )}
          {cur.note && <p className="chapter-card-note">{cur.note}</p>}
        </div>

        <span className="chapter-rail" aria-hidden="true">
          <span ref={railRef} className="chapter-rail-fill" />
          {steps.map((s, i) => (
            <span key={s.id} className={`chapter-tick${i <= step ? " on" : ""}`} style={{ top: `${((i + 0.5) / n) * 100}%` }} />
          ))}
        </span>
      </div>

      {/* The steps in reading order, for screen readers and search. */}
      <ol className="sr-only">
        {steps.map((s) => (
          <li key={s.id}>
            {s.tag && `${s.tag}: `}{s.title}{s.body && ` ${s.body}`}{s.items && ` ${s.items.join("; ")}.`}{s.note && ` ${s.note}`}
          </li>
        ))}
      </ol>
    </div>
  );
}
