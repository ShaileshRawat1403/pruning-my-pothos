import React from "react";
import { D, Head, Torso } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Read the gap. An output on the bench, marked up. Three repair tools on the
 * wall, each for a different fault: a pen (say the thing you did not say), a
 * magnifier along a pipe (trace the evidence path), a mould with a gauge (a
 * schema, a validator, a plan for the runs that vary). Each step takes one
 * tool down.
 */
const TOOLS = [
  { x: 180, t: "PEN", sub: "REWORD" },
  { x: 320, t: "PIPE", sub: "TRACE IT" },
  { x: 460, t: "MOULD", sub: "VALIDATE" },
];
const SAYS = ["what's wrong with it?", "the tone. say it.", "the facts. follow them.", "now and then. build for it."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 3);
  const b = s - 1;
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The tool wall. */}
      <rect x={100} y={60} width={440} height={150} fill="#C9A77C" stroke={D.ink} strokeWidth={4} />
      {TOOLS.map((t, i) => (
        <Lit key={t.t} on={b === i} off={s === 0 ? 0.8 : 0.35}>
          {i === 0 && <path d={`M${t.x - 8} 90 L${t.x + 8} 90 L${t.x + 6} 150 L${t.x} 166 L${t.x - 6} 150 Z`} fill={D.teal} stroke={D.ink} strokeWidth={3} strokeLinejoin="round" />}
          {i === 1 && (
            <g>
              <path d={`M${t.x - 50} 120 H${t.x + 50}`} stroke={D.grey} strokeWidth={12} strokeLinecap="round" />
              <circle cx={t.x + 6} cy={112} r={20} fill="#fff" fillOpacity={0.3} stroke={D.ink} strokeWidth={4} />
              <path d={`M${t.x + 20} 126 L${t.x + 34} 140`} stroke={D.ink} strokeWidth={6} strokeLinecap="round" />
            </g>
          )}
          {i === 2 && (
            <g>
              <rect x={t.x - 36} y={90} width={72} height={56} fill="none" stroke={D.ink} strokeWidth={4} strokeDasharray="8 5" />
              <rect x={t.x - 24} y={102} width={48} height={32} fill={D.paperDeep} stroke={D.ink} strokeWidth={3} />
            </g>
          )}
          {mono(t.x, 188, t.sub, 18, b === i ? D.accent : D.ink)}
        </Lit>
      ))}

      {/* The output on the bench, marked up. */}
      <rect x={60} y={300} width={520} height={14} fill={D.paperDeep} stroke={D.ink} strokeWidth={4} />
      <rect x={250} y={232} width={140} height={68} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
      <path d="M264 252 H372 M264 268 H352 M264 284 H368" stroke={D.greyLight} strokeWidth={3} strokeLinecap="round" />
      <Show on={s >= 1}>
        <ellipse cx={318} cy={252 + Math.max(b, 0) * 16} rx={62} ry={10} fill="none" stroke={D.accent} strokeWidth={3} />
      </Show>

      <Torso x={560} y={262} w={80} h={110} fill={D.grey} />
      <Head x={560} y={222} r={32} eyes="sleepy" look={-1} mouth="flat" stubble hair="sides" />

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(320, 44, t, 26, i === 0 ? D.greyLight : D.accent)}
        </Show>
      ))}
      {mono(320, 404, ["NAME WHAT IS WRONG", "WRONG TONE, LENGTH, REGISTER", "WRONG FACTS", "WRONG NOW AND THEN, IN WAYS THAT MATTER"][s], 18, D.accent)}
    </Plate>
  );
}
