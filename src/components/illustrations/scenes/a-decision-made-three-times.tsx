import React from "react";
import { D, Head, Torso, Limb } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * A decision made three times. One long record unrolls across the desk; a
 * note goes on it for each moment: the choice, its reversal, the new choice.
 * At the end all three sit there in the same ink, and the reader squints.
 */
const NOTES = [
  { x: 108, t: "USE A", r: -4 },
  { x: 252, t: "UNDO A", r: 3 },
  { x: 396, t: "USE B", r: -2 },
];
const SAYS = ["noted.", "also noted.", "which one counts?"];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The record: long, unrolled, in order. */}
      <rect x={36} y={132} width={470} height={150} fill="#fff" stroke={D.ink} strokeWidth={4.5} />
      <path d="M36 132 C 20 132, 20 282, 36 282" fill={D.paperDeep} stroke={D.ink} strokeWidth={4} />
      <path d="M506 132 C 530 140, 530 274, 506 282" fill={D.paperDeep} stroke={D.ink} strokeWidth={4} />
      {Array.from({ length: 6 }, (_, i) => (
        <path key={i} d={`M58 ${240 + (i % 2) * 14} H${470 - (i % 3) * 40}`} stroke={D.greyLight} strokeWidth={3} strokeLinecap="round" opacity={i < 2 ? 1 : 0} />
      ))}
      {mono(271, 120, "THE RECORD", 18, D.greyLight)}

      {/* One note per moment, all in the same ink. */}
      {NOTES.map((n, i) => (
        <Show key={n.t} on={s >= i}>
          <Lit on={s === i || s === 2} off={0.6}>
            <g transform={`rotate(${n.r} ${n.x} 182)`}>
              <rect x={n.x - 62} y={152} width={124} height={62} fill="#F6E7A8" stroke={D.ink} strokeWidth={3.5} />
              {mono(n.x, 190, n.t, 18)}
            </g>
          </Lit>
        </Show>
      ))}
      {/* Arrows of time, so the order is never in doubt. */}
      <Show on={s >= 1}>{mono(180, 186, "→", 24, D.greyLight)}</Show>
      <Show on={s >= 2}>{mono(324, 186, "→", 24, D.greyLight)}</Show>

      {/* The next actor, with a magnifier. */}
      <Torso x={574} y={250} w={92} h={122} fill={D.teal} />
      <Head x={574} y={202} r={40} eyes={s === 2 ? "tt" : "sleepy"} look={-1} mouth="flat" hair="messy" />
      <Limb d="M536 290 C 516 280, 500 262, 492 246" fill={D.teal} />
      <circle cx={484} cy={234} r={18} fill="#fff" fillOpacity={0.4} stroke={D.ink} strokeWidth={4} />
      <path d="M496 248 L506 262" stroke={D.ink} strokeWidth={6} strokeLinecap="round" />

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(280, 64, t, 30, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["MADE", "REVERSED", "MADE DIFFERENTLY"][s], 18, D.accent)}
    </Plate>
  );
}
