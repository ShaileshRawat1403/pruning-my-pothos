import React from "react";
import { D } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Likely, confident, true. A dashboard with three instruments. The first two
 * work: a likelihood dial, and a megaphone (how sure it sounds, which is just
 * the wording). The third socket, TRUE, has no instrument in it at all, only
 * a cobweb. Last, the panel's label: ordinary generation.
 */
const SAYS = ["two working dials.", "and an empty socket.", "fit your own."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />
      <rect x={40} y={110} width={560} height={210} rx={12} fill={D.paperDeep} stroke={D.ink} strokeWidth={5} />
      <Lit on={s === 2} off={0.4}>
        <rect x={210} y={86} width={220} height={40} rx={4} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
        {mono(320, 112, "ORDINARY GENERATION", 18)}
      </Lit>

      {/* Likely: a dial that reads. */}
      <Lit on={s === 0} off={0.5}>
        <circle cx={140} cy={210} r={58} fill="#fff" stroke={D.ink} strokeWidth={4} />
        <path d="M94 228 A 50 50 0 0 1 186 228" fill="none" stroke={D.greyLight} strokeWidth={6} />
        <path d="M140 214 L170 176" stroke={D.accent} strokeWidth={5} strokeLinecap="round" />
        <circle cx={140} cy={214} r={6} fill={D.ink} />
        {mono(140, 296, "LIKELY", 18)}
      </Lit>

      {/* Confident: a megaphone, which is all tone. */}
      <Lit on={s === 0} off={0.5}>
        <path d="M262 186 L322 162 V262 L262 238 Z" fill={D.accent} stroke={D.ink} strokeWidth={4} strokeLinejoin="round" />
        <rect x={238} y={186} width={26} height={52} fill={D.grey} stroke={D.ink} strokeWidth={4} />
        <path d="M336 188 q 14 24 0 48 M352 176 q 22 36 0 72" fill="none" stroke={D.ink} strokeWidth={3.5} strokeLinecap="round" />
        {mono(300, 296, "SOUNDS SURE", 18)}
      </Lit>

      {/* True: an empty socket. */}
      <Lit on={s === 1} off={0.5}>
        <circle cx={490} cy={210} r={58} fill="#3b3a35" stroke={D.ink} strokeWidth={4} />
        <circle cx={490} cy={210} r={44} fill="none" stroke="#5a5852" strokeWidth={2} strokeDasharray="4 6" />
        <path d="M440 170 L540 250 M540 170 L440 250 M490 152 V268 M432 210 H548" stroke="#d8d2c4" strokeWidth={1.2} opacity={0.6} />
        {mono(490, 296, "TRUE?", 18, D.accent)}
      </Lit>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 0 ? 220 : 490, 60, t, 28, i === 1 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["WHAT IT GIVES YOU", "WHAT IT DOES NOT MEASURE", "A TRUTH CHECK IS SOMETHING ELSE"][s], 18, D.accent)}
    </Plate>
  );
}
