import React from "react";
import { D, Head, Torso } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Four cases. Four test booths in a row, the same skill (a teal figure with a
 * clipboard) in each. NORMAL: an ordinary input, a tidy result. BORDERLINE:
 * a thin, ambiguous scrap of input, a sensible result. FAILURE: an
 * impossible input, a clear CAN'T. ESCALATION: a request beyond scope, and
 * the figure rings the bell. One booth lights per step.
 */
const BOOTHS = [
  { t: "NORMAL", out: "DONE" },
  { t: "BORDERLINE", out: "SENSIBLE" },
  { t: "FAILURE", out: "CAN'T, BECAUSE" },
  { t: "ESCALATION", out: "STOPS, ASKS" },
];
const SAYS = ["the boring one.", "thin input. no panic.", "fails out loud.", "knows when to stop."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 3);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {BOOTHS.map((b, i) => {
        const x = 90 + i * 150;
        return (
          <Lit key={b.t} on={s === i} off={s > i ? 0.6 : 0.3}>
            <rect x={x - 66} y={90} width={132} height={250} fill="#fff" stroke={D.ink} strokeWidth={4} />
            <rect x={x - 66} y={90} width={132} height={34} fill={D.paperDeep} stroke={D.ink} strokeWidth={4} />
            {mono(x, 114, b.t, 18)}
            <Torso x={x} y={250} w={56} h={90} fill={D.teal} />
            <Head x={x} y={226} r={24} eyes={s === i && i >= 2 ? "tt" : "sleepy"} look={0} mouth="flat" hair="curly" />
            {i === 3 && (
              <g>
                <path d={`M${x + 34} 170 a 14 14 0 0 1 28 0 v8 h-28 Z`} fill="#E8C77A" stroke={D.ink} strokeWidth={2.5} />
                <path d={`M${x + 48} 178 v6`} stroke={D.ink} strokeWidth={3} />
              </g>
            )}
            <rect x={x - 60} y={134} width={120} height={50} rx={4} fill={i === 2 ? "#F1D9CC" : "#DDEFE6"} stroke={D.ink} strokeWidth={2.5} />
            {b.out.split(", ").map((l, k, arr) => mono(x, 164 + k * 20 - (arr.length - 1) * 10, l, 18, i === 2 ? D.accent : D.leaf))}
          </Lit>
        );
      })}

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(320, 60, t, 28, D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["ORDINARY INPUT", "THIN OR AMBIGUOUS INPUT", "IT CANNOT PROCEED", "BEYOND ITS SCOPE"][s], 18, D.accent)}
    </Plate>
  );
}
