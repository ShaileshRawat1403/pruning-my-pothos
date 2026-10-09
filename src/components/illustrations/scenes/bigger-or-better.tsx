import React from "react";
import { D, Head, Torso } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Bigger or better. A shopping trolley piled with everything (the long, full
 * input): a heavier till receipt, a longer queue, and one important note
 * somewhere in the middle of the pile. Then a basket with three things in it
 * (the short, relevant input). Last, the receipt is yours to measure.
 */
const SAYS = ["everything. just in case.", "three things. the right three.", "measure your own receipt."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />
      <path d="M330 40 V340" stroke={D.greyLight} strokeWidth={3} strokeDasharray="6 10" />

      {/* The trolley. */}
      <Lit on={s !== 1} off={0.4}>
        <path d="M60 140 H280 L262 280 H86 Z" fill="none" stroke={D.ink} strokeWidth={5} strokeLinejoin="round" />
        <path d="M40 120 H64 L86 280" fill="none" stroke={D.ink} strokeWidth={5} strokeLinecap="round" />
        <circle cx={110} cy={310} r={16} fill="#fff" stroke={D.ink} strokeWidth={4} />
        <circle cx={240} cy={310} r={16} fill="#fff" stroke={D.ink} strokeWidth={4} />
        {Array.from({ length: 14 }, (_, i) => (
          <rect key={i} x={78 + (i % 6) * 32} y={240 - Math.floor(i / 6) * 40} width={28} height={36} fill={i === 8 ? "#F6E7A8" : i % 2 ? "#fff" : D.paperDeep} stroke={i === 8 ? D.accent : D.ink} strokeWidth={i === 8 ? 3 : 2} />
        ))}
        {mono(170, 96, "THE LONG INPUT", 18)}
        <Show on={s === 0}>{mono(180, 260 - 80 + 14, "!", 18, D.accent)}</Show>
      </Lit>

      {/* The basket. */}
      <Lit on={s !== 0} off={0.4}>
        <path d="M400 200 H560 L544 290 H416 Z" fill="#C9B593" stroke={D.ink} strokeWidth={4} strokeLinejoin="round" />
        <path d="M420 200 Q 480 130 540 200" fill="none" stroke={D.ink} strokeWidth={4} />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={426 + i * 40} y={172} width={32} height={40} fill={i === 1 ? "#F6E7A8" : "#fff"} stroke={D.ink} strokeWidth={2.5} />
        ))}
        {mono(480, 96, "THE RELEVANT INPUT", 18, D.teal)}
      </Lit>

      {/* The receipts. */}
      <Show on={s === 2}>
        <rect x={110} y={330} width={130} height={40} fill="#fff" stroke={D.ink} strokeWidth={2.5} />
        {mono(175, 355, "$$$ · SLOW", 18, D.accent)}
        <rect x={420} y={316} width={120} height={40} fill="#fff" stroke={D.ink} strokeWidth={2.5} />
        {mono(480, 341, "$ · QUICK", 18, D.leaf)}
      </Show>

      <Torso x={350} y={330} w={36} h={42} fill={D.grey} />
      <Head x={350} y={312} r={16} eyes="sleepy" look={s === 0 ? -1 : 1} mouth="flat" stubble hair="sides" />

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 0 ? 170 : i === 1 ? 480 : 330, i === 2 ? 60 : 60, t, 24, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["COSTS MORE, TAKES LONGER, BURIES THINGS", "EASIER TO GET RIGHT, CHEAPER", "SELECTION AND PLACEMENT MATTER"][s], 18, D.accent)}
    </Plate>
  );
}
