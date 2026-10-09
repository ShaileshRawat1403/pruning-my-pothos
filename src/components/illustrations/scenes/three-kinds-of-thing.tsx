import React from "react";
import { D } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Three kinds of thing. The window as a lunchbox with three compartments,
 * filled from the bottom up (the layers renderer builds bottom-up): the
 * evidence pack, freshly packed for this step and thrown away after; the task
 * frame, today's note; the persistent core, the same laminated card every
 * day. One compartment lights per step, with its lifetime stamped on it.
 */
const TRAYS = [
  { y: 260, t: "EVIDENCE PACK", life: "REBUILT EACH STEP", c: "#F6E7A8" },
  { y: 170, t: "TASK FRAME", life: "THIS TASK", c: "#DDEFE6" },
  { y: 80, t: "PERSISTENT CORE", life: "EVERY RUN, SAME", c: "#fff" },
];
const SAYS = ["packed fresh.", "today's note.", "laminated. never changes."];

export default function Scene({ step, id }: SceneProps) {
  // Steps arrive bottom-up: evidence (0), frame (1), core (2).
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />
      <rect x={140} y={66} width={360} height={290} rx={14} fill={D.paperDeep} stroke={D.ink} strokeWidth={5} />
      {mono(320, 52, "ONE RUN'S WINDOW", 18)}

      {TRAYS.map((t, i) => (
        <Lit key={t.t} on={s === i} off={s > i ? 0.65 : 0.25}>
          <rect x={158} y={t.y} width={324} height={80} rx={8} fill={t.c} stroke={D.ink} strokeWidth={3.5} />
          {mono(320, t.y + 34, t.t, 20)}
          <g transform={`rotate(-4 560 ${t.y + 40})`}>
            <rect x={508} y={t.y + 22} width={112} height={40} fill="#fff" stroke={i === 0 ? D.accent : D.ink} strokeWidth={2.5} />
            {t.life.split(", ").length > 1
              ? t.life.split(", ").map((l, k) => mono(564, t.y + 40 + k * 18, l, 18, i === 0 ? D.accent : D.ink))
              : t.life.split(" ").reduce<string[]>((acc, w) => {
                  const last = acc[acc.length - 1];
                  if (last && (last + " " + w).length <= 10) acc[acc.length - 1] = last + " " + w;
                  else acc.push(w);
                  return acc;
                }, []).map((l, k) => mono(564, t.y + 40 + k * 18, l, 18, i === 0 ? D.accent : D.ink))}
          </g>
          {i === 0 && (
            <g>
              {[0, 1, 2].map((k) => (
                <rect key={k} x={180 + k * 40} y={t.y + 44} width={30} height={26} fill="#fff" stroke={D.ink} strokeWidth={2} />
              ))}
            </g>
          )}
        </Lit>
      ))}

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(320, TRAYS[i].y + 70, t, 20, D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["ONLY WHAT THIS STEP NEEDS", "THE OBJECTIVE, AND WHAT COUNTS AS DONE", "IDENTITY, POLICY, CONSTRAINTS"][s], 18, D.accent)}
    </Plate>
  );
}
