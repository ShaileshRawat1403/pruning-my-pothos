import React from "react";
import { D, Head, Torso } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * A pocket of freedom. Built from the bottom up, as the layers renderer
 * reads it: first the small choice (four tools on a tray, the model picking
 * one), then the step it lives in (a box with walls), then the lifecycle
 * around it (a conveyor of fixed checkpoints the box rides along).
 */
const SAYS = ["pick one of four.", "inside this one step.", "inside the fixed line."];

export default function Scene({ step, id }: SceneProps) {
  // Steps arrive bottom-up: pocket (0), step (1), lifecycle (2).
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The lifecycle: fixed checkpoints. */}
      <Lit on={s === 2} off={0.25}>
        <rect x={20} y={290} width={600} height={22} rx={11} fill={D.greyLight} stroke={D.ink} strokeWidth={3.5} />
        {["START", "CHECK", "", "CHECK", "DONE"].map((c, i) => (
          <g key={i}>
            {c && <rect x={40 + i * 120} y={240} width={80} height={40} rx={4} fill="#fff" stroke={D.ink} strokeWidth={3} />}
            {c && mono(80 + i * 120, 266, c, 18)}
          </g>
        ))}
      </Lit>

      {/* The step: a box on the line. */}
      <Lit on={s === 1} off={0.3}>
        <rect x={250} y={90} width={140} height={190} rx={6} fill="#fff" stroke={D.ink} strokeWidth={4} />
        {mono(320, 116, "ONE STEP", 18)}
      </Lit>

      {/* The pocket: four tools, one picked. */}
      <Lit on={s === 0} off={0.5}>
        <Torso x={320} y={210} w={50} h={60} fill={D.teal} />
        <Head x={320} y={184} r={20} eyes="sleepy" look={0} mouth="flat" hair="curly" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={262 + i * 30} y={140} width={24} height={20} rx={3} fill={i === 2 ? "#F6E7A8" : "#fff"} stroke={i === 2 ? D.accent : D.ink} strokeWidth={2.5} />
        ))}
      </Lit>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 2 ? 320 : 500, i === 2 ? 350 : 150, t, 24, D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["A FEW ALLOWED OPERATIONS", "ONE STEP", "THE LIFECYCLE, FIXED"][s], 18, D.accent)}
    </Plate>
  );
}
