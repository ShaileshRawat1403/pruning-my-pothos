import React from "react";
import { D, Head, Torso } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Safe ways to stop. A corridor of exits, each a safe alternative: stop,
 * keep the prior state (PRIOR), the manual process, the queue, a person who
 * can judge. Then the two things that only look like exits: a confidence dial,
 * and a queue piling up at a desk nobody sits at. Last, the question.
 */
const DOORS = ["STOP", "PRIOR", "MANUAL", "QUEUE", "PERSON"];
const SAYS = ["plenty of exits.", "decorative exits.", "which one actually exists?"];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The exits. */}
      {DOORS.map((d, i) => {
        const x = 28 + i * 78;
        return (
          <Lit key={d} on={s !== 1} off={0.35}>
            <rect x={x} y={160} width={60} height={110} fill="#C9B593" stroke={D.ink} strokeWidth={4} />
            <circle cx={x + 48} cy={218} r={4} fill={D.ink} />
            <rect x={x - 6} y={128} width={72} height={28} fill={D.leaf} stroke={D.ink} strokeWidth={3} />
            {mono(x + 30, 149, d, 18, "#fff")}
          </Lit>
        );
      })}

      {/* What only looks like an exit. */}
      <Lit on={s === 1} off={0.3}>
        <circle cx={460} cy={210} r={48} fill="#fff" stroke={D.ink} strokeWidth={4} />
        <path d="M424 222 A 40 40 0 0 1 496 222" fill="none" stroke={D.greyLight} strokeWidth={6} />
        <path d="M460 210 L486 184" stroke={D.accent} strokeWidth={5} strokeLinecap="round" />
        {mono(460, 248, "87%", 18)}
        {mono(460, 290, "CONFIDENCE", 18, D.accent)}
        <rect x={530} y={250} width={90} height={20} fill={D.paperDeep} stroke={D.ink} strokeWidth={3} />
        <path d="M540 270 V330 M610 270 V330" stroke={D.ink} strokeWidth={4} />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={540 + (i % 2) * 6} y={238 - i * 12} width={64} height={12} fill="#fff" stroke={D.ink} strokeWidth={2} />
        ))}
        {mono(575, 352, "NOBODY HERE", 18, D.accent)}
      </Lit>

      {/* Someone at the end of the corridor, choosing. */}
      <Torso x={220} y={318} w={60} h={54} fill={D.teal} />
      <Head x={220} y={298} r={22} eyes={s === 1 ? "tt" : "sleepy"} look={s === 1 ? 1 : 0} mouth="flat" hair="curly" />

      <Show on={s === 2}>
        <rect x={150} y={60} width={340} height={44} rx={4} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
        {mono(320, 89, "WHAT SAFE ALTERNATIVE EXISTS?", 18, D.accent)}
      </Show>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i && i !== 2}>
          {hand(i === 0 ? 200 : 500, 90, t, 28, D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["SAFE ALTERNATIVES", "NOT A FALLBACK", "WHEN IT SHOULD NOT CONTINUE NORMALLY"][s], 18, D.accent)}
    </Plate>
  );
}
