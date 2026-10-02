import React from "react";
import { D, Head, Torso } from "../deadpan";
import { At, Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Lookup or continuation. Left: a filing cabinet. Ask for France, the drawer
 * opens on PARIS; ask about Mars, the drawer is empty and says so. Right: the
 * model, a slot that prints the likeliest next words. France: PARIS. Mars: a
 * name, printed in exactly the same confident way. Last, the two printouts
 * from the slot, side by side and indistinguishable.
 */
const SAYS = ["no row? error.", "no lookup. a name.", "same machine. same tone."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />
      <path d="M320 40 V372" stroke={D.greyLight} strokeWidth={3} strokeDasharray="6 10" />

      {/* The database: a cabinet with rows. */}
      <Lit on={s === 0} off={0.4}>
        <rect x={60} y={120} width={150} height={252} fill="#C9B593" stroke={D.ink} strokeWidth={4.5} />
        <At x={s === 0 ? 34 : 0}>
          <rect x={70} y={136} width={130} height={60} fill={D.paperDeep} stroke={D.ink} strokeWidth={3.5} />
          {mono(135, 172, "FRANCE", 18)}
        </At>
        <rect x={70} y={212} width={130} height={60} fill={D.paperDeep} stroke={D.ink} strokeWidth={3.5} />
        {mono(135, 248, "MARS", 18, D.greyLight)}
        <rect x={70} y={288} width={130} height={60} fill={D.paperDeep} stroke={D.ink} strokeWidth={3.5} />
        <rect x={190} y={80} width={110} height={34} fill="#fff" stroke={D.ink} strokeWidth={3} />
        {mono(245, 104, "PARIS", 18, D.leaf)}
        <rect x={210} y={238} width={100} height={34} fill="#fff" stroke={D.accent} strokeWidth={3} />
        {mono(260, 262, "NO ROW", 18, D.accent)}
      </Lit>

      {/* The model: a slot that prints the likeliest continuation. */}
      <Lit on={s !== 0} off={0.4}>
        <rect x={380} y={180} width={190} height={130} rx={10} fill={D.grey} stroke={D.ink} strokeWidth={4.5} />
        <rect x={400} y={200} width={150} height={10} rx={5} fill={D.ink} />
        {mono(475, 270, "MODEL", 20, "#fff")}
        <At y={s >= 1 ? 0 : 40} o={s >= 1 ? 1 : 0}>
          <rect x={410} y={96} width={130} height={104} fill="#fff" stroke={D.ink} strokeWidth={3} />
          {mono(475, 128, "PARIS.", 18, D.ink)}
          <path d="M424 146 H526" stroke={D.greyLight} strokeWidth={2} strokeDasharray="4 4" />
          {mono(475, 176, "A NAME.", 18, D.ink)}
        </At>
      </Lit>
      <Torso x={600} y={320} w={50} h={52} fill={D.teal} />
      <Head x={600} y={300} r={20} eyes="sleepy" look={-1} mouth="flat" hair="curly" />

      <Show on={s === 2}>
        <path d="M410 150 C 380 150, 360 130, 340 120" fill="none" stroke={D.accent} strokeWidth={3} strokeDasharray="5 6" />
        {mono(475, 340, "SAME FONT", 18, D.accent)}
      </Show>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 0 ? 160 : 475, 56, t, 26, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["A DATABASE LOOKS FOR A ROW", "A MODEL PRODUCES A CONTINUATION", "NOTHING CHECKS WHETHER IT IS TRUE"][s], 18, D.accent)}
    </Plate>
  );
}
