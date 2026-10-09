import React from "react";
import { D, Head, Torso, Limb } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Influence or enforce. A polite sign on the wall: PLEASE DO NOT DELETE
 * FILES. Someone reaches for the delete button anyway, persuaded by
 * something they read. Then the same button inside a locked case: the hand
 * stops at the glass. Last, the sign and the case side by side: one asks,
 * one holds.
 */
const SAYS = ["a very sincere sign.", "the case doesn't care what it read.", "one asks. one holds."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />
      <path d="M320 40 V340" stroke={D.greyLight} strokeWidth={3} strokeDasharray="6 10" />

      {/* The sign, and a hand reaching past it. */}
      <Lit on={s !== 1} off={0.4}>
        <rect x={40} y={70} width={240} height={70} rx={4} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
        {mono(160, 98, "PLEASE DO NOT", 18)}
        {mono(160, 124, "DELETE FILES", 18, D.accent)}
        <rect x={170} y={250} width={90} height={40} rx={8} fill={D.accent} stroke={D.ink} strokeWidth={3.5} />
        {mono(215, 276, "DELETE", 18, "#fff")}
        <Torso x={80} y={250} w={70} h={122} fill={D.teal} />
        <Head x={80} y={214} r={28} eyes="sleepy" look={1} mouth="flat" hair="curly" />
        <Limb d="M114 280 C 140 276, 160 272, 176 268" fill={D.teal} w={12} />
      </Lit>

      {/* The locked case. */}
      <Lit on={s !== 0} off={0.4}>
        <rect x={470} y={250} width={90} height={40} rx={8} fill={D.accent} stroke={D.ink} strokeWidth={3.5} />
        {mono(515, 276, "DELETE", 18, "#fff")}
        <rect x={450} y={210} width={130} height={100} rx={6} fill="#DCE8E3" fillOpacity={0.5} stroke={D.ink} strokeWidth={4} />
        <rect x={500} y={300} width={30} height={26} rx={4} fill={D.grey} stroke={D.ink} strokeWidth={3} />
        {mono(515, 190, "RUNTIME CHECK", 18, D.teal)}
        <Torso x={380} y={250} w={70} h={122} fill={D.teal} />
        <Head x={380} y={214} r={28} eyes="tt" look={1} mouth="flat" hair="curly" />
        <Limb d="M414 280 C 430 276, 440 272, 448 268" fill={D.teal} w={12} />
      </Lit>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 0 ? 160 : i === 1 ? 480 : 320, i === 2 ? 360 : 50, t, 22, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["INFLUENCE", "ENFORCEMENT", "ONLY ONE IS A CONSTRAINT"][s], 18, D.accent)}
    </Plate>
  );
}
