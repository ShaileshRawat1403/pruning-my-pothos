import React from "react";
import { D, Head, Torso } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Fine-tuning: good and poor. A tattoo parlour for the model. Left: someone
 * asks for this week's price list to be tattooed on (specific, changing
 * facts), and next week it is wrong, and permanent. Right: someone asks for
 * a house style, the same signature on every letter (a consistent format),
 * and it is exactly the right use. Last: the needle is the same either way;
 * it writes to the parameters.
 */
const SAYS = ["this week's prices. forever.", "the same sign-off, every time.", "same needle. it writes to the weights."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />
      <path d="M320 40 V340" stroke={D.greyLight} strokeWidth={3} strokeDasharray="6 10" />

      {/* Poor fit: facts that change. */}
      <Lit on={s !== 1} off={0.4}>
        <Torso x={160} y={220} w={130} h={152} fill={D.teal} />
        <Head x={160} y={168} r={42} eyes={s === 0 ? "tt" : "sleepy"} look={0} mouth="flat" hair="curly" />
        <rect x={112} y={250} width={96} height={70} rx={4} fill="#fff" stroke={D.ink} strokeWidth={2.5} />
        {mono(160, 274, "PRICES", 18)}
        {mono(160, 300, "WK 41", 18, D.accent)}
        <g transform="rotate(-8 60 120)">
          <rect x={14} y={100} width={96} height={34} fill="#fff" stroke={D.accent} strokeWidth={3} />
          {mono(62, 123, "WK 42: ?", 18, D.accent)}
        </g>
      </Lit>

      {/* Good fit: a consistent format. */}
      <Lit on={s !== 0} off={0.4}>
        <Torso x={480} y={220} w={130} h={152} fill={D.teal} />
        <Head x={480} y={168} r={42} eyes="sleepy" look={0} mouth="flat" hair="curly" />
        <rect x={432} y={250} width={96} height={70} rx={4} fill="#fff" stroke={D.ink} strokeWidth={2.5} />
        {mono(480, 276, "Regards,", 20, D.ink)}
        {mono(480, 302, "THE HOUSE", 18, D.leaf)}
      </Lit>

      {/* The needle, the same either way. */}
      <Show on={s === 2}>
        <path d="M320 120 L320 250" stroke={D.grey} strokeWidth={10} strokeLinecap="round" />
        <path d="M314 250 L320 278 L326 250 Z" fill={D.ink} />
        <rect x={290} y={90} width={60} height={36} rx={6} fill={D.grey} stroke={D.ink} strokeWidth={3} />
      </Show>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 0 ? 160 : i === 1 ? 480 : 320, i === 2 ? 64 : 76, t, 22, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["USUALLY A POOR FIT", "OFTEN A GOOD FIT", "IT WRITES TO THE PARAMETERS"][s], 18, D.accent)}
    </Plate>
  );
}
