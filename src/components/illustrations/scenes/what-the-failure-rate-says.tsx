import React from "react";
import { D, Head, Torso } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * What the failure rate says. Left: a rejection chart with a spike, and
 * three pins at the spike (model update, prompt edit, new input): something
 * changed. Right: a beautifully flat line, and next to it three gauges with
 * no needles: quality, accuracy, users. A flat line cannot see them.
 */
const SAYS = ["a spike. go and look.", "flat. and blind to these.", "it sees the rules it has."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The spike. */}
      <Lit on={s !== 1} off={0.4}>
        <rect x={40} y={90} width={260} height={200} fill="#fff" stroke={D.ink} strokeWidth={4} />
        <path d="M56 260 L100 258 L140 262 L170 256 L190 150 L210 140 L240 150 L284 148" fill="none" stroke={D.accent} strokeWidth={4} strokeLinejoin="round" />
        {mono(170, 116, "REJECTIONS", 18)}
        <rect x={60} y={300} width={220} height={34} rx={4} fill="#F6E7A8" stroke={D.ink} strokeWidth={2.5} />
        {mono(170, 323, "SOMETHING CHANGED", 18, D.accent)}
      </Lit>

      {/* The flat line, and what it cannot see. */}
      <Lit on={s !== 0} off={0.4}>
        <rect x={340} y={90} width={260} height={110} fill="#fff" stroke={D.ink} strokeWidth={4} />
        <path d="M356 160 H584" stroke={D.leaf} strokeWidth={4} />
        {mono(470, 116, "REJECTIONS", 18)}
        {["QUALITY", "ACCURACY", "USERS"].map((t, i) => (
          <g key={t}>
            <circle cx={380 + i * 90} cy={250} r={30} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
            <path d={`M${356 + i * 90} 258 A 26 26 0 0 1 ${404 + i * 90} 258`} fill="none" stroke={D.greyLight} strokeWidth={4} />
            {mono(380 + i * 90, 300, t, 18, D.accent)}
          </g>
        ))}
      </Lit>

      <Torso x={320} y={340} w={36} h={32} fill={D.grey} />
      <Head x={320} y={324} r={16} eyes="sleepy" look={s === 0 ? -1 : 1} mouth="flat" stubble hair="sides" />

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 0 ? 170 : i === 1 ? 470 : 320, 60, t, 24, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["A RISE: SOMETHING CHANGED", "WHAT IT DOES NOT MEASURE", "VALIDATOR OUTCOMES, ONLY"][s], 18, D.accent)}
    </Plate>
  );
}
