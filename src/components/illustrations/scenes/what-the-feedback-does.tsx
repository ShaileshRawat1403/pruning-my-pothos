import React from "react";
import { D } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * What the feedback does. A small wobble, the deviation, enters at the
 * left. Branch one: a thermostat loop pulls it back flat. Branch two: a
 * microphone near a speaker, the wobble growing into a howl. Branch three:
 * a wire that ends in mid-air, connected to nothing.
 */
const SAYS = ["a small wobble.", "pulled back. stays small.", "howls. that's the first sign.", "goes nowhere. nobody hears."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 3);
  const b = s - 1;
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The deviation. */}
      <path d="M30 210 H80 Q 90 190 100 210 T 120 210 H150" fill="none" stroke={D.accent} strokeWidth={4} />
      {mono(90, 180, "DEVIATION", 18, D.accent)}
      <path d="M150 210 L190 110 M150 210 L190 210 M150 210 L190 310" stroke={D.greyLight} strokeWidth={3} strokeDasharray="6 6" />

      {/* Reduces. */}
      <Lit on={b === 0} off={s === 0 ? 0.6 : 0.3}>
        <path d="M200 110 Q 220 90 240 110 T 280 110 Q 300 104 320 110 H560" fill="none" stroke={D.teal} strokeWidth={4} />
        <path d="M560 110 C 600 110, 600 70, 560 70 H240 C 200 70, 200 100, 220 104" fill="none" stroke={D.teal} strokeWidth={2.5} strokeDasharray="5 5" />
        {mono(400, 140, "REDUCES", 18, D.teal)}
      </Lit>

      {/* Amplifies. */}
      <Lit on={b === 1} off={s === 0 ? 0.6 : 0.3}>
        <path d="M200 210 Q 215 200 230 210 T 260 210 Q 280 186 300 210 T 340 210 Q 370 166 400 210 T 460 210 Q 500 140 540 210 T 600 210" fill="none" stroke={D.accent} strokeWidth={4} />
        {mono(400, 260, "AMPLIFIES", 18, D.accent)}
      </Lit>

      {/* No loop. */}
      <Lit on={b === 2} off={s === 0 ? 0.6 : 0.3}>
        <path d="M200 310 Q 215 300 230 310 T 260 310 H420" fill="none" stroke={D.grey} strokeWidth={4} />
        <circle cx={424} cy={310} r={6} fill={D.grey} />
        <path d="M430 300 l12 -10 M432 314 l14 4" stroke={D.greyLight} strokeWidth={2.5} strokeLinecap="round" />
        {mono(510, 316, "NO LOOP", 18, D.grey)}
      </Lit>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 0 ? 90 : 400, i === 0 ? 260 : 40, t, 24, i === 0 ? D.greyLight : D.accent)}
        </Show>
      ))}
      {mono(320, 404, ["WHERE DOES A DEVIATION GO?", "IT FEEDS BACK AND REDUCES", "IT FEEDS BACK AND AMPLIFIES", "NOTHING REACHES THE CAUSE"][s], 18, D.accent)}
    </Plate>
  );
}
