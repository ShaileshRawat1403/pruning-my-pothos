import React from "react";
import { D, Head, Torso, Limb } from "../deadpan";
import { At, Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * What makes it a handoff. A baton tagged NEXT STEP passes from one person to
 * the other: that is the handoff. Then the things that are not: a copied
 * folder and an FYI slide across too, and the baton does not move. Last, the
 * line between them, and who is holding the baton.
 */
const SAYS = ["yours now.", "fyi.", "who's holding it?"];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The line between them: who is responsible for the next step. */}
      <Lit on={s === 2} off={0.3}>
        <path d="M320 70 V372" stroke={D.accent} strokeWidth={3.5} strokeDasharray="10 10" />
        {mono(320, 58, "RESPONSIBLE FOR NEXT STEP", 18, D.accent)}
      </Lit>

      {/* Sender, left; receiver, right. */}
      <Torso x={150} y={232} w={100} h={140} fill={D.grey} />
      <Head x={150} y={184} r={40} eyes="sleepy" look={1} mouth="flat" stubble hair="messy" />
      <Torso x={490} y={232} w={100} h={140} fill={D.teal} />
      <Head x={490} y={184} r={40} eyes={s === 1 ? "tt" : "sleepy"} look={-1} mouth="flat" hair="curly" />
      <Limb d="M444 276 C 420 270, 400 266, 380 268" fill={D.teal} />

      {/* The baton: it crosses, and stays crossed. */}
      <At x={s >= 0 ? 0 : -180}>
        <g transform="rotate(-12 372 262)">
          <rect x={330} y={252} width={84} height={20} rx={10} fill={D.accent} stroke={D.ink} strokeWidth={3.5} />
        </g>
        <Lit on={s !== 1} off={0.5}>
          <rect x={318} y={286} width={116} height={30} rx={3} fill="#fff" stroke={D.ink} strokeWidth={3} />
          {mono(376, 307, "NEXT STEP", 18)}
        </Lit>
      </At>

      {/* What is not a handoff: copies and FYIs, which change nothing. */}
      <Show on={s >= 1}>
        <Lit on={s === 1} off={0.4}>
          <At x={s >= 1 ? 0 : -200}>
            <rect x={210} y={120} width={84} height={60} fill="#E8C77A" stroke={D.ink} strokeWidth={3.5} />
            {mono(252, 156, "COPY", 18)}
          </At>
          <At x={s >= 1 ? 0 : -200} delay={0.12}>
            <rect x={216} y={196} width={74} height={46} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
            <path d="M216 196 L253 222 L290 196" fill="none" stroke={D.ink} strokeWidth={3} />
            {mono(253, 260, "FYI", 18, D.greyLight)}
          </At>
        </Lit>
      </Show>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 1 ? 160 : 490, 104, t, 28, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["A HANDOFF", "NOT A HANDOFF", "THE TEST: CAN THEY PROCEED?"][s], 18, D.accent)}
    </Plate>
  );
}
