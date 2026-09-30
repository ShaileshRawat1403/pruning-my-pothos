import React from "react";
import { D } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * A phrase or a package. Two tubs from the fridge on the cover. One has a
 * question mark on it. The other says what it takes, what it returns, what
 * it may touch and when it stops.
 */
const LINES = ["TAKES", "RETURNS", "MAY TOUCH", "STOPS WHEN"];

function Tub({ x, children }: { x: number; children: React.ReactNode }) {
  return (
    <g>
      <rect x={x} y={150} width={220} height={170} rx={10} fill="#E8F0EE" stroke={D.ink} strokeWidth={4.5} />
      <rect x={x - 8} y={128} width={236} height={30} rx={8} fill={D.teal} stroke={D.ink} strokeWidth={4.5} />
      {children}
    </g>
  );
}

export default function Scene({ step, id }: SceneProps) {
  return (
    <Plate id={id}>
      <path d="M20 330 H620" stroke={D.ink} strokeWidth={4} />
      <Lit on={step !== 1} off={0.45}>
        <Tub x={50}>{hand(160, 262, "???", 64, D.greyLight)}</Tub>
      </Lit>
      <Lit on={step >= 1} off={0.3}>
        <Tub x={370}>
          <rect x={386} y={170} width={188} height={134} fill="#fff" stroke={D.ink} strokeWidth={3} />
          {LINES.map((t, i) => (
            <Show key={t} on={step >= 1} delay={i * 0.12}>
              {mono(398, 198 + i * 30, t, 18, D.ink, "start")}
              <path d={`M${404 + t.length * 11} ${192 + i * 30} H560`} stroke={D.greyLight} strokeWidth={3} strokeLinecap="round" />
            </Show>
          ))}
        </Tub>
      </Lit>
      <Show on={step === 2}>{hand(320, 100, "declared.", 34, D.accent)}</Show>
      {mono(160, 376, "A SAVED PROMPT", 18, step === 1 ? D.greyLight : D.accent)}
      {mono(480, 376, "A SKILL", 18, step >= 1 ? D.accent : D.greyLight)}
    </Plate>
  );
}
