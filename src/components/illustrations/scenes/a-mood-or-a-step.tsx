import React from "react";
import { D, LINE } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * A mood or a step. The wheel from the cover, twice. On the left it is a
 * closed box and the failure is weather. On the right the steps are
 * numbered, and one of them is marked.
 */
function Wheel({ cx }: { cx: number }) {
  return (
    <g>
      <circle cx={cx} cy={212} r={108} fill="none" stroke={D.ink} strokeWidth={6} />
      <path d={`M${cx} 212 L${cx - 40} 356 M${cx} 212 L${cx + 40} 356`} {...LINE} strokeWidth={6} />
      <circle cx={cx} cy={212} r={9} fill={D.ink} />
    </g>
  );
}

export default function Scene({ step, id }: SceneProps) {
  return (
    <Plate id={id}>
      <path d="M20 358 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      <Lit on={step !== 1} off={0.4}>
        <Wheel cx={160} />
        <circle cx={160} cy={212} r={96} fill={D.grey} />
        {hand(160, 232, "?", 96, D.paper)}
        <path d="M96 84 q 10 -22 34 -16 q 8 -22 34 -12 q 26 -14 40 8 q 26 0 22 24 H92 q -14 -2 4 -4 Z" fill="#fff" stroke={D.ink} strokeWidth={4} strokeLinejoin="round" />
      </Lit>

      <Lit on={step >= 1} off={0.3}>
        <Wheel cx={480} />
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
          const bad = i === 2;
          return (
            <g key={i}>
              <circle cx={480 + Math.cos(a) * 108} cy={212 + Math.sin(a) * 108} r={17} fill={bad ? D.accent : "#fff"} stroke={D.ink} strokeWidth={3.5} />
              {mono(480 + Math.cos(a) * 108, 219 + Math.sin(a) * 108, String(i + 1), 18, bad ? "#fff" : D.ink)}
            </g>
          );
        })}
        <Show on={step >= 1}>{mono(480, 84, "STEP 3: TIMED OUT", 18, D.accent)}</Show>
      </Lit>

      {mono(160, 392, "FAILS AS A MOOD", 18, step === 1 ? D.greyLight : D.accent)}
      {mono(480, 392, "FAILS AS A STEP", 18, step >= 1 ? D.accent : D.greyLight)}
    </Plate>
  );
}
