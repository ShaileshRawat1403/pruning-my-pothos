"use client";

import React, { type ComponentType, useEffect, useRef, useState } from "react";
import type { SceneStep } from "../../lib/scene-steps";
import { SCENES } from "../illustrations/scenes";
import type { SceneProps } from "../illustrations/scenes/kit";

/**
 * A declared visual, drawn as a scene: the drawing pins while its steps
 * scroll past, and the step at the middle of the screen sets the drawing.
 *
 * Without scripts the drawing shows its first state and every step is plain
 * text beside it. The words are the visual's own (lib/scene-steps.ts).
 */
export default function SceneVisual({ sceneId, alt, steps, drawing }: { sceneId: string; alt: string; steps: SceneStep[]; drawing?: ComponentType<SceneProps> }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const Scene = drawing ?? SCENES[sceneId];

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    el.setAttribute("data-live", "");
    // The step that counts is the one crossing a thin band of the screen: the
    // middle when the drawing sits beside the steps, lower down when it is
    // pinned above them and covers the top of a narrow screen.
    const stacked = window.matchMedia("(max-width: 767px)").matches;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setStep(Number((e.target as HTMLElement).dataset.step));
      },
      { rootMargin: stacked ? "-64% 0px -30% 0px" : "-45% 0px -45% 0px" },
    );
    el.querySelectorAll<HTMLElement>("[data-step]").forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="scene-grid">
      <div className="scene-pin">
        <div className="scene-plate" role="img" aria-label={alt}>
          <Scene step={step} steps={steps} id={`sc-${sceneId}`} />
        </div>
        <p className="scene-count" aria-hidden="true">
          {String(step + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
        </p>
      </div>
      <ol className="scene-steps">
        {steps.map((s, i) => (
          <li key={s.id} data-step={i} className={`scene-step${i === step ? " on" : ""}`}>
            {s.tag && <span className="scene-tag">{s.tag}</span>}
            <p className="scene-title">{s.title}</p>
            {s.body && <p className="scene-body">{s.body}</p>}
            {s.items && (
              <ul className="scene-items">
                {s.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            {s.note && <p className="scene-note">{s.note}</p>}
          </li>
        ))}
      </ol>
    </div>
  );
}
