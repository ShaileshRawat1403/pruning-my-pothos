import React from "react";
import { D } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * What belongs. The house rules framed by the front door: who you are, what
 * you refuse, how things are written, the tone. Then the things people keep
 * taping to the frame: a recipe card (WHEN ASKED FOR X, DO Y), a step list.
 * Last, the frame: conditions inside, the work outside.
 */
const RULES = ["ACTS AS: SUPPORT", "REFUSES / ESCALATES", "FORMAT, UNITS, CITES", "TONE: PLAIN"];
const SAYS = ["true on every request.", "...and the recipes.", "conditions. not the work."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The framed house rules. */}
      <Lit on={s !== 1} off={0.4}>
        <rect x={60} y={70} width={280} height={250} fill={D.paperDeep} stroke={s === 2 ? D.leaf : D.ink} strokeWidth={8} />
        <rect x={78} y={88} width={244} height={214} fill="#fff" stroke={D.ink} strokeWidth={2} />
        {mono(200, 118, "HOUSE RULES", 20, D.teal)}
        {RULES.map((r, i) => mono(96, 160 + i * 36, r, 18, D.ink, "start"))}
      </Lit>

      {/* Taped on: the task logic. */}
      <Lit on={s === 1} off={0.35}>
        <g transform="rotate(8 470 140)">
          <rect x={390} y={90} width={170} height={100} fill="#F6E7A8" stroke={D.ink} strokeWidth={3} />
          {mono(475, 124, "WHEN ASKED X,", 18, D.accent)}
          {mono(475, 150, "DO Y", 18, D.accent)}
        </g>
        <g transform="rotate(-6 480 270)">
          <rect x={410} y={220} width={150} height={110} fill="#fff" stroke={D.ink} strokeWidth={3} />
          {["1. ...", "2. ...", "3. ...", "4. ..."].map((t, i) => mono(426, 248 + i * 22, t, 18, D.ink, "start"))}
        </g>
        <path d="M350 120 L392 112 M350 270 L410 262" stroke={D.greyLight} strokeWidth={4} strokeLinecap="round" />
      </Lit>

      <Show on={s === 2}>
        <path d="M370 50 V350" stroke={D.accent} strokeWidth={4} strokeDasharray="10 8" />
      </Show>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 1 ? 480 : 200, i === 1 ? 60 : 350, t, 24, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["HOLDS REGARDLESS OF THE REQUEST", "TASK LOGIC, STEPS", "BELONGS / DOES NOT"][s], 18, D.accent)}
    </Plate>
  );
}
