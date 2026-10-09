import React from "react";
import { D, Head, Torso } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * The output hides the run. A polished answer in a glass case, admired. Then
 * the curtain behind it pulled back: two documents (the right one or the
 * plausible one?), a gate marked SKIPPED?, a tool's return box still taped
 * shut. Last, the line around the case: this is all the text shows.
 */
const SAYS = ["lovely answer.", "and how it got there.", "none of that is in the text."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The answer, on display. */}
      <Lit on={s !== 1} off={0.45}>
        <rect x={60} y={260} width={160} height={112} fill={D.paperDeep} stroke={D.ink} strokeWidth={4} />
        <rect x={70} y={110} width={140} height={150} fill="#fff" fillOpacity={0.4} stroke={D.ink} strokeWidth={3.5} />
        <rect x={92} y={140} width={96} height={100} fill="#fff" stroke={D.ink} strokeWidth={3} />
        {mono(140, 166, "ANSWER", 18)}
        <path d="M104 186 H176 M104 202 H170 M104 218 H176" stroke={D.greyLight} strokeWidth={3} strokeLinecap="round" />
        <path d="M80 120 l 14 18 M196 124 l -10 14" stroke="#fff" strokeWidth={3} opacity={0.8} />
      </Lit>

      {/* Behind the curtain: the run. */}
      <Lit on={s === 1} off={0.25}>
        <rect x={270} y={70} width={340} height={260} fill="#3b3a35" stroke={D.ink} strokeWidth={4} />
        <rect x={290} y={100} width={64} height={84} fill="#fff" stroke={D.ink} strokeWidth={3} />
        <rect x={364} y={100} width={64} height={84} fill="#fff" stroke={D.ink} strokeWidth={3} />
        {mono(359, 210, "RIGHT? OR", 18, "#d8d2c4")}
        {mono(359, 232, "PLAUSIBLE?", 18, "#d8d2c4")}
        <path d="M466 120 V184 M530 120 V184 M466 140 H530" stroke="#d8d2c4" strokeWidth={5} />
        {mono(498, 210, "SKIPPED?", 18, "#d8d2c4")}
        <rect x={470} y={250} width={110} height={60} fill="#C9B593" stroke={D.ink} strokeWidth={3} />
        <path d="M470 270 H580 M525 250 V310" stroke={D.accent} strokeWidth={5} />
        {mono(420, 300, "TOOL RESULT:", 18, "#d8d2c4", "end")}
        {mono(420, 320, "UNOPENED", 18, "#d8d2c4", "end")}
      </Lit>
      <Show on={s === 0}>
        <rect x={270} y={70} width={340} height={260} fill={D.accent} opacity={0.85} stroke={D.ink} strokeWidth={4} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={i} d={`M${300 + i * 55} 70 V330`} stroke={D.ink} strokeWidth={2} opacity={0.3} />
        ))}
      </Show>

      <Show on={s === 2}>
        <rect x={54} y={100} width={172} height={280} fill="none" stroke={D.accent} strokeWidth={4} strokeDasharray="10 8" />
        {mono(140, 92, "THE TEXT", 18, D.accent)}
      </Show>

      <Torso x={250} y={330} w={40} h={42} fill={D.grey} />
      <Head x={250} y={312} r={18} eyes={s === 1 ? "tt" : "sleepy"} look={s === 1 ? 1 : -1} mouth="flat" stubble hair="sides" />

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 1 ? 440 : i === 2 ? 400 : 140, i === 1 ? 54 : i === 2 ? 40 : 70, t, 24, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["A FLUENT ANSWER, EITHER WAY", "NOT IN THE TEXT", "KEEP THE SIGNALS, OR LOSE THEM"][s], 18, D.accent)}
    </Plate>
  );
}
