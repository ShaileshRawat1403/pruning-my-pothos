import React from "react";
import { D, Head, Torso } from "../deadpan";
import { At, Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * The decision expires. The release decision, as a carton of milk: stamped
 * APPROVED, put in the fridge. Then the things it rested on change around it
 * (the model, a tool, the users), and its USE BY line turns out to say "until
 * the assumptions change". Last, someone sniffs it: revisit.
 */
const CHANGES = [
  { x: 420, y: 110, t: "MODEL v2" },
  { x: 540, y: 160, t: "NEW TOOL" },
  { x: 440, y: 220, t: "NEW USERS" },
];
const SAYS = ["approved. filed.", "meanwhile.", "smells like a revisit."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The fridge. */}
      <rect x={60} y={60} width={250} height={312} rx={10} fill="#fff" stroke={D.ink} strokeWidth={5} />
      <path d="M60 170 H310 M284 92 V140 M284 196 V250" stroke={D.ink} strokeWidth={4} strokeLinecap="round" />

      {/* The decision, as a carton. */}
      <Lit on={s !== 1} off={0.6}>
        <path d="M116 240 L116 196 L150 176 L254 176 L254 240 L254 344 L116 344 Z" fill={D.paperDeep} stroke={D.ink} strokeWidth={4} strokeLinejoin="round" />
        <path d="M116 196 H254" stroke={D.ink} strokeWidth={3} />
        {mono(185, 226, "RELEASE", 18)}
        {mono(185, 248, "DECISION", 18)}
        <g transform="rotate(-8 185 280)">
          <rect x={132} y={262} width={106} height={32} fill="#fff" stroke={D.leaf} strokeWidth={3} />
          {mono(185, 285, "APPROVED", 18, D.leaf)}
        </g>
        {mono(185, 326, "USE BY: ?", 18, D.accent)}
      </Lit>

      {/* What it rested on, changing. */}
      {CHANGES.map((c, i) => (
        <At key={c.t} x={s >= 1 ? 0 : 40} o={s >= 1 ? 1 : 0} delay={s === 1 ? i * 0.15 : 0}>
          <Lit on={s === 1} off={0.5}>
            <rect x={c.x - 64} y={c.y - 22} width={128} height={36} rx={4} fill="#F6E7A8" stroke={D.ink} strokeWidth={3} />
            {mono(c.x, c.y + 3, c.t, 18)}
          </Lit>
        </At>
      ))}

      {/* Someone checks it. */}
      <Show on={s === 2}>
        <g transform="rotate(10 185 150)">
          <rect x={120} y={122} width={130} height={40} fill="#fff" stroke={D.accent} strokeWidth={4} />
          {mono(185, 150, "REVISIT", 22, D.accent)}
        </g>
      </Show>
      <Torso x={520} y={300} w={80} h={72} fill={D.grey} />
      <Head x={520} y={266} r={32} eyes={s === 2 ? "tt" : "sleepy"} look={-1} mouth="flat" stubble hair="sides" />

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 0 ? 185 : 480, i === 0 ? 40 : 60, t, 28, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["DECIDED ON WHAT WAS KNOWN", "SOMETHING IT RESTED ON CHANGES", "THE RELEASE BASIS, REVISITED"][s], 18, D.accent)}
    </Plate>
  );
}
