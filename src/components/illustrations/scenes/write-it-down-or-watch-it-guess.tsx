"use client";

import React from "react";
import { D, LINE, Head, Torso, Limb } from "../deadpan";
import { Lit, Plate, SceneProps, Show, mono, hand } from "./kit";

/**
 * The steps of the Works On My Prompt sheet "Write It Down or Watch It Guess".
 * A note taped to the monitor fills in one section per step while the agent
 * at the desk reads it. The last step dates it.
 */
const SECTIONS = ["WHAT", "NEVER", "DONE WHEN", "WHERE"];

export default function Drawing({ step, id }: SceneProps) {
  return (
    <Plate id={id}>
      <path d="M20 360 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />
      <rect x={250} y={300} width={360} height={20} fill={D.paperDeep} stroke={D.ink} strokeWidth={4.5} />
      <path d="M276 320 V360 M584 320 V360" {...LINE} strokeWidth={6} />

      {/* Monitor, and the note on it. */}
      <rect x={330} y={40} width={250} height={210} rx={6} fill="#fff" stroke={D.ink} strokeWidth={4.5} />
      <path d="M455 250 V300 M415 300 H495" {...LINE} strokeWidth={5} />
      <g transform="rotate(-2 455 145)">
        <rect x={352} y={56} width={206} height={180} fill="#F6E7A8" stroke={D.ink} strokeWidth={3.5} />
        {mono(455, 80, "AGENTS.md", 17)}
        {SECTIONS.map((t, i) => (
          <Lit key={t} on={step === i} off={step > i ? 0.65 : 0.12}>
            {mono(366, 108 + i * 32, t, 13, i === 1 ? D.accent : D.ink, "start")}
            {i === 1 ? (
              <path d={`M${450} ${103 + i * 32} l8 8 m0 -8 l-8 8 M470 ${107 + i * 32} H540`} stroke={D.accent} strokeWidth={3} strokeLinecap="round" />
            ) : (
              <path d={`M${366 + t.length * 9 + 12} ${104 + i * 32} H${540 - (i % 2) * 18}`} stroke={D.greyLight} strokeWidth={3.5} strokeLinecap="round" />
            )}
          </Lit>
        ))}
        <Show on={step >= 4}>
          <g transform="rotate(-8 520 222)">
            <rect x={474} y={208} width={84} height={26} fill="#fff" stroke={D.accent} strokeWidth={3} />
            {mono(516, 227, "UPDATED", 12, D.accent)}
          </g>
        </Show>
      </g>

      {/* The agent: new every session, reading. */}
      <Torso x={150} y={232} w={120} h={128} fill={D.teal} />
      <Head x={150} y={178} r={48} eyes="saucer" look={1} mouth="flat" hair="curly" />
      <rect x={132} y={262} width={40} height={24} rx={3} fill="#fff" stroke={D.ink} strokeWidth={3} />
      {mono(152, 279, "AGENT", 10)}
      <Limb d="M204 270 C 236 280, 262 290, 290 296" />
      <Show on={step === 0}>{hand(150, 84, "day one. again.", 26, D.greyLight)}</Show>
      <Show on={step === 2}>{hand(150, 84, "done?", 28, D.accent)}</Show>
      <Show on={step === 4}>{hand(150, 84, "read it.", 26, D.greyLight)}</Show>
    </Plate>
  );
}
