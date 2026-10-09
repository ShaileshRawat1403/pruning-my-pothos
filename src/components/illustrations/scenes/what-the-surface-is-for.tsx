import React from "react";
import { D, Head, Torso } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * What the surface is for. A little stage: the front, where the audience sees
 * the state, picks, and asks (props reading AVAILABLE, APPROVED, DONE). Then
 * the curtain pulls back on the empty backstage where the permissions,
 * judgment, evidence and checks would be: four empty hooks with labels. Last,
 * the proscenium itself: everything the person touches is the front.
 */
const HOOKS = ["PERMISSION", "JUDGMENT", "EVIDENCE", "ACCEPTABLE?"];
const SAYS = ["a lovely show.", "backstage, the actual work. or not.", "the front is all you touch."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* Backstage: empty hooks for what the front cannot prove. */}
      <Lit on={s === 1} off={0.3}>
        <rect x={330} y={60} width={280} height={260} fill="#3b3a35" stroke={D.ink} strokeWidth={4} />
        {HOOKS.map((h, i) => (
          <g key={h}>
            <path d={`M${370 + (i % 2) * 130} ${100 + Math.floor(i / 2) * 110} v20 q0 14 12 14`} fill="none" stroke="#d8d2c4" strokeWidth={4} strokeLinecap="round" />
            {mono(392 + (i % 2) * 130, 166 + Math.floor(i / 2) * 110, h, 18, "#d8d2c4")}
          </g>
        ))}
      </Lit>

      {/* The stage front: what a person sees and touches. */}
      <Lit on={s !== 1} off={0.45}>
        <rect x={30} y={60} width={290} height={260} fill="#fff" stroke={D.ink} strokeWidth={4} />
        <path d="M30 60 Q 60 100 50 320 M320 60 Q 290 100 300 320" fill={D.accent} stroke={D.ink} strokeWidth={3} opacity={0.85} />
        {["AVAILABLE", "APPROVED", "DONE"].map((t, i) => (
          <g key={t}>
            <rect x={95} y={96 + i * 62} width={160} height={42} rx={21} fill="#DDEFE6" stroke={D.leaf} strokeWidth={3} />
            {mono(175, 124 + i * 62, t, 18, D.leaf)}
          </g>
        ))}
      </Lit>

      <Show on={s === 2}>
        <rect x={24} y={52} width={302} height={276} fill="none" stroke={D.accent} strokeWidth={5} />
        {mono(175, 42, "THE SURFACE", 18, D.accent)}
      </Show>

      <Torso x={175} y={340} w={50} h={32} fill={D.teal} />
      <Head x={175} y={322} r={18} eyes="sleepy" look={0} mouth="flat" hair="curly" />

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(470, 352, t, 22, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["SEE, CHOOSE, REQUEST", "WHAT IT ALONE DOES NOT ESTABLISH", "LABELS ARE NOT PROOF"][s], 18, D.accent)}
    </Plate>
  );
}
