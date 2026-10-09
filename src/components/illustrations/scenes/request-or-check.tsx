import React from "react";
import { D, Head, Torso } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Request or check. A meeting table where the spec is argued over a single
 * sentence, cheaply. Then the billing door later, with that same sentence
 * taped to it as a polite note, and nothing else: no lock. Last: the order
 * the spec should be written in, constraints first.
 */
const SAYS = ["argued in one sentence.", "a note on the door. no lock.", "constraints first."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The table: disagreement in a sentence. */}
      <Lit on={s === 0} off={0.35}>
        <rect x={40} y={250} width={260} height={18} fill={D.paperDeep} stroke={D.ink} strokeWidth={4} />
        <rect x={90} y={210} width={160} height={40} fill="#fff" stroke={D.ink} strokeWidth={2.5} />
        {mono(170, 236, "NOT BILLING?", 18, D.teal)}
        <Torso x={60} y={290} w={50} h={82} fill={D.teal} />
        <Head x={60} y={264} r={22} eyes="sleepy" look={1} mouth="flat" hair="curly" />
        <Torso x={280} y={290} w={50} h={82} fill={D.grey} />
        <Head x={280} y={264} r={22} eyes="sleepy" look={-1} mouth="flat" stubble hair="sides" />
      </Lit>

      {/* The door later: a note, no lock. */}
      <Lit on={s === 1} off={0.35}>
        <rect x={420} y={100} width={130} height={272} fill="#C9B593" stroke={D.ink} strokeWidth={5} />
        {mono(485, 92, "BILLING", 18)}
        <circle cx={530} cy={250} r={7} fill={D.ink} />
        <rect x={432} y={150} width={106} height={60} fill="#F6E7A8" stroke={D.ink} strokeWidth={2.5} transform="rotate(-4 485 180)" />
        {mono(485, 176, "please do", 18)}
        {mono(485, 198, "not modify", 18)}
        {mono(485, 300, "NO LOCK", 18, D.accent)}
      </Lit>

      <Show on={s === 2}>
        <rect x={60} y={60} width={220} height={110} fill="#fff" stroke={D.ink} strokeWidth={3} />
        {mono(76, 92, "1. CONSTRAINTS", 18, D.accent, "start")}
        {mono(76, 120, "2. objective", 18, D.ink, "start")}
        {mono(76, 148, "3. acceptance...", 18, D.ink, "start")}
      </Show>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 1 ? 485 : 170, i === 1 ? 50 : i === 0 ? 180 : 200, t, 22, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["WHAT A SPECIFICATION BUYS", "WHAT IT DOES NOT", "WRITE THE CONSTRAINTS FIRST"][s], 18, D.accent)}
    </Plate>
  );
}
