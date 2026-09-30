import React from "react";
import { D, LINE } from "../deadpan";
import { At, Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Resident or invoked. The fridge note from the cover is there on every
 * turn. The card in the drawer comes out for one task and goes back.
 */
const TURNS = [0, 1, 2, 3, 4, 5, 6, 7];

export default function Scene({ step, id }: SceneProps) {
  const skill = step >= 1;
  return (
    <Plate id={id}>
      {/* The fridge, and the note that lives on it. */}
      <Lit on={step !== 1} off={0.45}>
        <rect x={40} y={40} width={200} height={270} rx={10} fill="#fff" stroke={D.ink} strokeWidth={4.5} />
        <path d="M40 130 H240" stroke={D.ink} strokeWidth={4} />
        <g transform="rotate(3 140 220)">
          <rect x={82} y={160} width={116} height={116} fill="#F6E7A8" stroke={D.ink} strokeWidth={3.5} />
          <circle cx={140} cy={166} r={8} fill={D.accent} stroke={D.ink} strokeWidth={3} />
          <path d="M98 200 H182 M98 222 H170 M98 244 H182" stroke={D.ink} strokeWidth={3.5} strokeLinecap="round" />
        </g>
      </Lit>

      {/* The drawer, and the card that comes out of it. */}
      <Lit on={skill} off={0.35}>
        <rect x={400} y={210} width={200} height={100} fill={D.paperDeep} stroke={D.ink} strokeWidth={4.5} />
        <path d="M400 260 H600" stroke={D.ink} strokeWidth={4} />
        <path d="M484 236 H516 M484 286 H516" {...LINE} strokeWidth={5} />
        <At x={500} y={skill ? 140 : 236} o={skill ? 1 : 0}>
          <rect x={-60} y={-44} width={120} height={88} fill="#fff" stroke={D.ink} strokeWidth={4} />
          <path d="M-44 -22 H44 M-44 -4 H30 M-44 14 H44" stroke={D.greyLight} strokeWidth={3.5} strokeLinecap="round" />
        </At>
      </Lit>

      {/* The turns of one interaction. */}
      {TURNS.map((t) => {
        const resident = !skill || step === 2;
        const used = step === 2 ? true : skill ? t === 4 : true;
        return (
          <g key={t}>
            <circle cx={96 + t * 64} cy={352} r={13} fill={used ? (skill && t === 4 ? D.teal : resident ? D.accent : D.teal) : "#fff"} stroke={D.ink} strokeWidth={3.5} style={{ transition: "fill .3s" }} />
          </g>
        );
      })}
      <Show on={step === 2}>{hand(320, 120, "range.", 40, D.accent)}</Show>
      {mono(320, 398, ["THERE ON EVERY TURN", "OUT FOR ONE TASK", "A DIFFERENCE OF RANGE"][Math.min(step, 2)], 18, D.accent)}
    </Plate>
  );
}
