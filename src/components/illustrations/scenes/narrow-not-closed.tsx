import React from "react";
import { D, Head, Torso } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Narrow, not closed. A field of possible answers, scattered everywhere, for
 * "write about marketing". Then a precise request: a funnel, and most answers
 * gather where you meant. Last, the dots that are still outside the funnel's
 * mouth: narrowed, never closed.
 */
const DOTS: [number, number][] = [
  [90, 90], [160, 140], [240, 80], [320, 120], [410, 90], [500, 130], [560, 80],
  [110, 200], [200, 230], [290, 190], [380, 240], [470, 200], [550, 240],
  [140, 300], [260, 290], [360, 310], [450, 300], [530, 320],
];
const SAYS = ["anything, really.", "much closer.", "and one or two, anyway."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The funnel of a precise request. */}
      <Lit on={s >= 1} off={0}>
        <path d="M120 70 L520 70 L360 250 L280 250 Z" fill="#F6E7A8" fillOpacity={0.5} stroke={D.ink} strokeWidth={4} strokeLinejoin="round" />
        {mono(320, 58, "3 SLOGANS, PLAYFUL, UNDER 5 WORDS", 18, D.teal)}
        <rect x={270} y={270} width={100} height={40} rx={6} fill="#fff" stroke={D.leaf} strokeWidth={3.5} />
        {mono(320, 296, "MEANT", 18, D.leaf)}
      </Lit>

      {/* The answers: everywhere, then mostly where you meant. */}
      {DOTS.map(([x, y], i) => {
        const stray = i === 6 || i === 13;
        const gx = s >= 1 && !stray ? 290 + (i % 5) * 15 : x;
        const gy = s >= 1 && !stray ? 280 + Math.floor(i / 5) * 6 : y;
        return <circle key={i} cx={gx} cy={gy} r={7} fill={stray && s === 2 ? D.accent : D.grey} style={{ transition: `cx .6s ${i * 0.02}s, cy .6s ${i * 0.02}s` }} />;
      })}
      <Show on={s === 0}>{mono(320, 340, "WRITE ABOUT MARKETING", 18, D.grey)}</Show>

      <Torso x={590} y={320} w={50} h={52} fill={D.teal} />
      <Head x={590} y={300} r={20} eyes={s === 2 ? "tt" : "sleepy"} look={-1} mouth="flat" hair="curly" />

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 2 ? 420 : 320, i === 2 ? 350 : 110, t, 26, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["A WIDE FIELD", "NARROWED", "NARROWED, NEVER CLOSED"][s], 18, D.accent)}
    </Plate>
  );
}
