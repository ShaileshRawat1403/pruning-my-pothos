import React from "react";
import { D, Head, Torso } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * The quiet contradiction. A long scroll with two highlighted lines far
 * apart: BE BRIEF and ALWAYS EXPLAIN FULLY, initialled by two different
 * people. The model reads both, shrugs, picks one. No alarm goes off. A
 * colleague blames randomness. Last, the two rules as two labelled boxes,
 * side by side, plainly disagreeing.
 */
const SAYS = ["written weeks apart.", "picks one. no error.", "'it's just random.'", "now you can see it."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 3);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The long scroll. */}
      <Lit on={s < 3} off={0.3}>
        <rect x={50} y={40} width={210} height={320} fill="#fff" stroke={D.ink} strokeWidth={4} />
        {Array.from({ length: 13 }, (_, i) => (
          <path key={i} d={`M66 ${66 + i * 22} H${240 - (i % 3) * 30}`} stroke={D.greyLight} strokeWidth={3} strokeLinecap="round" />
        ))}
        <rect x={62} y={78} width={186} height={24} fill="#F6E7A8" />
        {mono(70, 96, "BE BRIEF", 18, D.ink, "start")}
        <rect x={62} y={298} width={186} height={24} fill="#F1D9CC" />
        {mono(70, 316, "EXPLAIN FULLY", 18, D.ink, "start")}
      </Lit>

      {/* The model, quietly choosing. */}
      <Lit on={s === 1 || s === 2} off={0.35}>
        <Torso x={380} y={260} w={84} h={112} fill={D.teal} />
        <Head x={380} y={220} r={32} eyes="sleepy" look={-1} mouth="flat" hair="curly" />
        <rect x={330} y={130} width={100} height={36} rx={4} fill="#fff" stroke={D.ink} strokeWidth={2.5} />
        {mono(380, 154, "BRIEF.", 18)}
        <Show on={s === 2}>
          <Torso x={550} y={290} w={60} h={82} fill={D.grey} />
          <Head x={550} y={262} r={24} eyes="sleepy" look={-1} mouth="smirk" stubble hair="sides" />
        </Show>
      </Lit>

      {/* Two named skills, plainly disagreeing. */}
      <Show on={s === 3}>
        <rect x={300} y={110} width={140} height={60} rx={6} fill="#F6E7A8" stroke={D.ink} strokeWidth={3} />
        {mono(370, 146, "BE BRIEF", 18)}
        <rect x={460} y={110} width={150} height={60} rx={6} fill="#F1D9CC" stroke={D.ink} strokeWidth={3} />
        {mono(535, 146, "EXPLAIN FULLY", 18)}
        {mono(450, 148, "≠", 26, D.accent)}
      </Show>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 2 ? 540 : 430, i === 2 ? 220 : 70, t, 24, i === 3 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["TWO RULES, FAR APART", "NO VISIBLE ERROR", "BLAMED ON NON-DETERMINISM", "AS SKILLS, VISIBLE"][s], 18, D.accent)}
    </Plate>
  );
}
