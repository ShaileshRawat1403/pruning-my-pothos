import React from "react";
import { D, Head, Torso } from "../deadpan";
import { Lit, Plate, SceneProps, Show, Tick, hand, mono } from "./kit";

/**
 * Prompt like code. The prompt, as one file in version control instead of a
 * dozen pasted copies. A sticky note on the change: what it is expected to
 * do. Then the small fixed set of inputs, run after the edit: four ticks and
 * one cross, the case the change broke, caught.
 */
const SAYS = ["one file. not twelve.", "expected: shorter.", "fixed one. broke one. caught it."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The pasted copies, faded; the one file, solid. */}
      <Lit on={s === 0} off={0.5}>
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={40 + i * 14} y={70 + i * 10} width={70} height={90} fill="#fff" stroke={D.greyLight} strokeWidth={2.5} opacity={0.5} />
        ))}
        <path d="M60 230 L150 150" stroke={D.accent} strokeWidth={4} strokeLinecap="round" />
        <rect x={190} y={70} width={150} height={190} fill="#fff" stroke={D.ink} strokeWidth={4.5} />
        {mono(265, 100, "prompt.md", 18)}
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M206 ${126 + i * 22} H${322 - (i % 2) * 24}`} stroke={D.greyLight} strokeWidth={3} strokeLinecap="round" />
        ))}
        {mono(265, 284, "v14", 18, D.teal)}
      </Lit>

      {/* What the change is expected to do. */}
      <Show on={s >= 1}>
        <Lit on={s === 1} off={0.6}>
          <g transform="rotate(5 300 220)">
            <rect x={250} y={196} width={130} height={56} fill="#F6E7A8" stroke={D.ink} strokeWidth={3} />
            {mono(315, 220, "EXPECT:", 18)}
            {mono(315, 242, "SHORTER", 18, D.accent)}
          </g>
        </Lit>
      </Show>

      {/* The fixed set, run after the edit. */}
      <Lit on={s === 2} off={0.3}>
        <rect x={420} y={70} width={180} height={230} fill="#fff" stroke={D.ink} strokeWidth={4.5} />
        {mono(510, 98, "FIXED SET", 18)}
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <path d={`M440 ${130 + i * 34} H540`} stroke={D.greyLight} strokeWidth={3} strokeLinecap="round" />
            <Show on={s === 2} delay={i * 0.12}>
              {i === 3 ? (
                <path d={`M562 ${122 + i * 34} l14 14 m0 -14 l-14 14`} stroke={D.accent} strokeWidth={4} strokeLinecap="round" />
              ) : (
                <Tick x={568} y={132 + i * 34} on size={0.75} />
              )}
            </Show>
          </g>
        ))}
      </Lit>

      <Torso x={330} y={320} w={56} h={52} fill={D.teal} />
      <Head x={330} y={298} r={22} eyes={s === 2 ? "tt" : "sleepy"} look={s === 2 ? 1 : -1} mouth="flat" hair="curly" />

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 2 ? 470 : 265, i === 2 ? 46 : 46, t, 26, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["IN VERSION CONTROL", "WHAT THE CHANGE SHOULD DO", "THE FIXED SET, AFTER EVERY EDIT"][s], 18, D.accent)}
    </Plate>
  );
}
