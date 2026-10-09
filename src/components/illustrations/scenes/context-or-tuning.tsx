import React from "react";
import { D, Head, Torso } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Context or tuning. A manager's sticky note: TRAIN IT ON OUR DOCS. A
 * signpost with two arms. Facts that are private or change: hand it the
 * folder at request time (and edit the folder next week). Output that keeps
 * coming back in the wrong shape: the tattoo parlour. Most requests walk
 * down the first arm.
 */
const SAYS = ["'train it on our docs.'", "facts? hand it the folder.", "the shape keeps breaking? then maybe."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The request. */}
      <Lit on={s === 0} off={0.5}>
        <g transform="rotate(-5 120 120)">
          <rect x={40} y={80} width={170} height={80} fill="#F6E7A8" stroke={D.ink} strokeWidth={3.5} />
          {mono(125, 112, "TRAIN IT ON", 18)}
          {mono(125, 138, "OUR DOCS", 18, D.accent)}
        </g>
        <Torso x={120} y={270} w={80} h={102} fill={D.grey} />
        <Head x={120} y={232} r={32} eyes="sleepy" look={1} mouth="smirk" stubble hair="sides" />
      </Lit>

      {/* The signpost. */}
      <path d="M380 140 V372" stroke={D.ink} strokeWidth={8} strokeLinecap="round" />
      <Lit on={s === 1} off={s === 0 ? 0.7 : 0.35}>
        <path d="M380 150 H590 L612 176 L590 202 H380 Z" fill="#fff" stroke={D.ink} strokeWidth={3.5} strokeLinejoin="round" />
        {mono(486, 182, "PUT IT IN THE INPUT", 18, D.teal)}
        <rect x={470} y={226} width={120} height={78} fill="#E8C77A" stroke={D.ink} strokeWidth={3.5} />
        <path d="M478 226 v-12 h46 l8 12" fill="#E8C77A" stroke={D.ink} strokeWidth={3} strokeLinejoin="round" />
        {mono(530, 272, "THE DOCS", 18)}
      </Lit>
      <Lit on={s === 2} off={s === 0 ? 0.7 : 0.35}>
        <path d="M380 90 H560 L582 116 L560 142 H380 Z" fill="#fff" stroke={D.ink} strokeWidth={3.5} strokeLinejoin="round" />
        {mono(476, 122, "FINE-TUNE", 18, D.accent)}
      </Lit>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 0 ? 125 : i === 1 ? 486 : 476, i === 0 ? 60 : i === 1 ? 336 : 66, t, 22, i === 0 ? D.greyLight : D.accent)}
        </Show>
      ))}
      {mono(320, 404, ["WHAT KIND OF INFORMATION?", "SPECIFIC, PRIVATE, OR CHANGING", "THE WRONG SHAPE, EVERY TIME"][s], 18, D.accent)}
    </Plate>
  );
}
