import React from "react";
import { D } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * What validation can reject. A sieve whose holes are the rules you wrote.
 * The things it recognises get caught on top: NOT IN CATALOGUE, NOT A
 * NUMBER. Then the things it cannot recognise fall straight through: the
 * right-looking ID that is the wrong customer's, an invoice that does not
 * exist. Last, the bowl underneath, labelled honestly: no rule applied.
 */
const SAYS = ["caught.", "straight through.", "silence. not approval."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The sieve. */}
      <path d="M140 150 H500 Q 480 230 320 236 Q 160 230 140 150 Z" fill={D.greyLight} fillOpacity={0.35} stroke={D.ink} strokeWidth={5} />
      <path d="M500 150 H600" stroke={D.ink} strokeWidth={8} strokeLinecap="round" />
      {Array.from({ length: 9 }, (_, i) => (
        <circle key={i} cx={190 + i * 32} cy={190 + Math.abs(4 - i) * -4} r={5} fill={D.paper} stroke={D.ink} strokeWidth={2} />
      ))}
      {mono(320, 140, "THE RULES YOU WROTE", 18)}

      {/* Caught on top. */}
      <Lit on={s === 0} off={0.5}>
        <rect x={170} y={62} width={130} height={34} rx={4} fill="#fff" stroke={D.accent} strokeWidth={3} transform="rotate(-6 235 79)" />
        {mono(235, 84, "NOT LISTED", 18, D.accent)}
        <rect x={330} y={60} width={140} height={34} rx={4} fill="#fff" stroke={D.accent} strokeWidth={3} transform="rotate(5 400 77)" />
        {mono(400, 82, "NOT A NUMBER", 18, D.accent)}
      </Lit>

      {/* Falling through. */}
      <Lit on={s === 1} off={0.4}>
        <g transform={`translate(0 ${s >= 1 ? 0 : -150})`} style={{ transition: "transform .6s", opacity: s >= 1 ? 1 : 0 }}>
          <rect x={196} y={262} width={120} height={34} rx={4} fill="#fff" stroke={D.ink} strokeWidth={3} transform="rotate(-8 256 279)" />
          {mono(256, 285, "OTHER'S ID", 18)}
          <rect x={330} y={274} width={120} height={34} rx={4} fill="#fff" stroke={D.ink} strokeWidth={3} transform="rotate(7 390 291)" />
          {mono(390, 297, "FAKE INVOICE", 18)}
        </g>
      </Lit>

      {/* The bowl underneath. */}
      <path d="M170 320 Q 320 380 470 320" fill={D.paperDeep} stroke={D.ink} strokeWidth={4} />
      <Show on={s === 2}>
        <rect x={250} y={316} width={140} height={30} rx={4} fill="#fff" stroke={D.accent} strokeWidth={3} />
        {mono(320, 337, "NO RULE APPLIED", 18, D.accent)}
      </Show>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(540, i === 1 ? 300 : 40, t, 26, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["WHAT IT CAN RECOGNISE", "WHAT PASSES UNTOUCHED", "A PASS MEANS NO RULE FIRED"][s], 18, D.accent)}
    </Plate>
  );
}
