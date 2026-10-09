import React from "react";
import { D, Head, Torso } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Measure, not estimate. A luggage scale at the gate reads TOKENS, and the
 * limit sign, the price board and the clock all read in tokens too. Beside
 * it, someone confidently guessing from a ruler (characters) and a word
 * counter. Last: put it on the scale.
 */
const SAYS = ["fits? costs? the scale says.", "the ruler is wrong in some direction.", "tokenize it."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The scale and what reads in tokens. */}
      <Lit on={s !== 1} off={0.4}>
        <rect x={60} y={260} width={200} height={30} fill={D.grey} stroke={D.ink} strokeWidth={4} />
        <rect x={110} y={150} width={100} height={110} fill="#fff" stroke={D.ink} strokeWidth={4} />
        {mono(160, 196, "1,842", 22, D.teal)}
        {mono(160, 226, "TOKENS", 18)}
        {["LIMIT", "COST", "TIME"].map((t, i) => (
          <g key={t}>
            <rect x={40 + i * 90} y={70} width={80} height={36} rx={4} fill="#DDEFE6" stroke={D.leaf} strokeWidth={3} />
            {mono(80 + i * 90, 95, t, 18, D.leaf)}
          </g>
        ))}
      </Lit>

      {/* Estimating instead. */}
      <Lit on={s === 1} off={0.35}>
        <rect x={360} y={180} width={230} height={28} fill="#F6E7A8" stroke={D.ink} strokeWidth={3} />
        {Array.from({ length: 12 }, (_, i) => (
          <path key={i} d={`M${370 + i * 18} 180 V${i % 2 ? 190 : 196}`} stroke={D.ink} strokeWidth={2} />
        ))}
        {mono(475, 236, "CHARACTERS", 18, D.accent)}
        <rect x={400} y={260} width={150} height={40} rx={4} fill="#fff" stroke={D.ink} strokeWidth={3} />
        {mono(475, 287, "WORDS: 900", 18, D.accent)}
        <Torso x={560} y={330} w={44} h={42} fill={D.grey} />
        <Head x={560} y={310} r={18} eyes="sleepy" look={-1} mouth="smirk" stubble hair="sides" />
      </Lit>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 1 ? 475 : 160, i === 1 ? 150 : 140, t, 22, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["COUNTED IN TOKENS", "DRIFTS IF YOU ESTIMATE", "MEASURE, ON YOUR MODEL"][s], 18, D.accent)}
    </Plate>
  );
}
