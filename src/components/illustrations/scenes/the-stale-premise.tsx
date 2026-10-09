import React from "react";
import { D } from "../deadpan";
import { At, Lit, Plate, SceneProps, Show, Tick, hand, mono } from "./kit";

/**
 * The stale premise. A document tagged SIX MONTHS OLD rides a conveyor
 * through a row of checkpoints: the model (fluent), the schema (right
 * shape), the policy (permitted), the tool and the store (succeeded). Each
 * lights a green tick as it passes. At the end, the effect: wrong. None of
 * the gates was looking at the date.
 */
const GATES = ["MODEL", "SCHEMA", "POLICY", "TOOL, STATE"];
const SAYS = ["six months old. nobody asked.", "fluent.", "right shape.", "permitted.", "succeeded. logged.", "wrong."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 5);
  const gx = (i: number) => 150 + i * 110;
  const docX = s === 0 ? 50 : s >= 5 ? gx(3) : gx(s - 1);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The conveyor. */}
      <rect x={20} y={270} width={600} height={20} rx={10} fill={D.greyLight} stroke={D.ink} strokeWidth={3.5} />
      {Array.from({ length: 12 }, (_, i) => (
        <circle key={i} cx={40 + i * 50} cy={280} r={5} fill={D.ink} />
      ))}

      {/* The gates. */}
      {GATES.map((g, i) => (
        <Lit key={g} on={s === i + 1} off={s > i + 1 ? 0.7 : 0.3}>
          <path d={`M${gx(i) - 44} 270 V150 H${gx(i) + 44} V270`} fill="none" stroke={D.ink} strokeWidth={5} />
          {mono(gx(i), 140, g, 18)}
          <Tick x={gx(i)} y={120} on={s > i} />
        </Lit>
      ))}

      {/* The end: the effect. */}
      <Lit on={s === 5} off={0.3}>
        <rect x={510} y={160} width={100} height={100} rx={6} fill="#fff" stroke={s === 5 ? D.accent : D.ink} strokeWidth={4} />
        {mono(560, 200, "EFFECT", 18)}
        <Show on={s === 5}>{mono(560, 240, "✗", 32, D.accent)}</Show>
      </Lit>

      {/* The document, riding through. */}
      <At x={docX - 50}>
        <rect x={30} y={200} width={50} height={64} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
        <path d="M38 216 H72 M38 230 H66 M38 244 H72" stroke={D.greyLight} strokeWidth={3} strokeLinecap="round" />
        <g transform="rotate(-10 55 196)">
          <rect x={14} y={184} width={86} height={24} fill="#F6E7A8" stroke={D.accent} strokeWidth={2.5} />
          {mono(57, 202, "6 MO OLD", 18, D.accent)}
        </g>
      </At>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(320, 70, t, 28, i === 0 || i === 5 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["STALE CONTEXT, RETRIEVED", "A FLUENT ANSWER", "SCHEMA PASSES", "POLICY PASSES", "TOOL AND STORE SUCCEED", "THE EFFECT IS WRONG"][s], 18, D.accent)}
    </Plate>
  );
}
