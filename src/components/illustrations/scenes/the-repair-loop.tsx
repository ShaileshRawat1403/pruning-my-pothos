import React from "react";
import { D, Head, Torso } from "../deadpan";
import { At, Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * The repair loop. The model hands over a candidate. The validator stamps
 * it, and sends back the exact error on a slip: field, rule, value. The model
 * tries again. A counter on the wall ticks up. At the limit, the candidate
 * goes out the side door instead: fall back, stop, or a person.
 */
const SAYS = ["here you go.", "checking.", "amount: 'one hundred'. must be a number.", "fixed. checking again.", "3 of 3. enough."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 4);
  const tries = s >= 4 ? 3 : s >= 3 ? 2 : 1;
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The loop track. */}
      <path d="M150 140 C 250 60, 390 60, 490 140 M490 290 C 390 370, 250 370, 150 290" fill="none" stroke={D.greyLight} strokeWidth={4} strokeDasharray="10 8" />

      {/* The model. */}
      <Torso x={100} y={250} w={84} h={122} fill={D.teal} />
      <Head x={100} y={206} r={34} eyes={s >= 4 ? "tt" : "sleepy"} look={1} mouth="flat" hair="curly" />
      {mono(100, 160, "MODEL", 18)}

      {/* The validator. */}
      <Torso x={540} y={250} w={84} h={122} fill={D.grey} />
      <Head x={540} y={206} r={34} eyes="sleepy" look={-1} mouth="flat" stubble hair="sides" />
      {mono(540, 160, "VALIDATOR", 18)}

      {/* The candidate travelling round. */}
      <At x={s === 0 ? 20 : s === 1 ? 270 : s === 2 ? 20 : s === 3 ? 270 : 150} y={0} o={s === 4 ? 0 : 1}>
        <rect x={150} y={84} width={70} height={52} fill="#fff" stroke={D.ink} strokeWidth={3} />
        {mono(185, 116, "{ }", 18)}
      </At>

      {/* The exact error slip. */}
      <Lit on={s === 2} off={s > 2 ? 0.4 : 0}>
        <rect x={210} y={246} width={220} height={60} rx={4} fill="#F6E7A8" stroke={D.accent} strokeWidth={3} />
        {mono(320, 270, "amount: must be", 18, D.accent)}
        {mono(320, 292, "a number", 18, D.accent)}
      </Lit>

      {/* The counter, and the way out at the limit. */}
      <rect x={278} y={40} width={84} height={36} rx={4} fill="#fff" stroke={D.ink} strokeWidth={3} />
      {mono(320, 65, `${tries} / 3`, 20, s >= 4 ? D.accent : D.ink)}
      <Show on={s === 4}>
        <rect x={200} y={318} width={240} height={34} rx={4} fill="#fff" stroke={D.ink} strokeWidth={3} />
        {mono(320, 341, "FALLBACK · STOP · PERSON", 18, D.teal)}
      </Show>

      {SAYS.map((t, i) => (
        <Show key={i} on={s === i}>
          {hand(320, 214, t, 20, i === 2 || i === 4 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["A CANDIDATE", "VALIDATE IT", "RETURN THE EXACT ERROR", "CORRECT, VALIDATE AGAIN", "AT THE LIMIT YOU SET"][s], 18, D.accent)}
    </Plate>
  );
}
