import React from "react";
import { D, LINE } from "../deadpan";
import { At, Lit, Plate, SceneProps, hand, mono } from "./kit";

/**
 * What crosses a handoff. On the left, the record: every entry, in order,
 * including three decisions that contradict each other. On the right, a
 * short card of what is true now. The baton sits on the line between them.
 */
const ENTRIES = [0, 1, 2, 3, 4, 5];
const DECISIONS = new Set([1, 3, 4]);

export default function Scene({ step, steps, id }: SceneProps) {
  const afterRows = steps.find((s) => s.id === "after")?.items?.length ?? 2;
  const kept = steps.find((s) => s.id === "preserved")?.items?.length ?? 4;
  const rows = step >= 3 ? kept : step >= 2 ? afterRows : 0;
  const lost = steps[step]?.id === "lost";

  return (
    <Plate id={id}>
      {/* The record of what happened. */}
      <Lit on={step === 0 || lost} off={0.45}>
        <path d="M44 40 H240 V360 Q 191 376 142 360 T 44 360 Z" fill="#fff" stroke={D.ink} strokeWidth={4.5} strokeLinejoin="round" />
        {ENTRIES.map((i) => (
          <g key={i}>
            {mono(68, 86 + i * 46, String(i + 1), 18, D.greyLight)}
            <path d={`M92 ${80 + i * 46} H${DECISIONS.has(i) ? 170 : 214 - (i % 2) * 22}`} stroke={D.greyLight} strokeWidth={4} strokeLinecap="round" />
            {DECISIONS.has(i) && <rect x={182} y={68 + i * 46} width={24} height={24} rx={3} fill={D.accent} stroke={D.ink} strokeWidth={3.5} />}
          </g>
        ))}
      </Lit>
      <g style={{ opacity: lost ? 1 : 0, transition: "opacity .3s" }}>
        {[...DECISIONS].map((i) => (
          <g key={i}>{hand(224, 92 + i * 46, "?", 34, D.accent)}</g>
        ))}
      </g>

      {/* The boundary, and the baton on it. */}
      <Lit on={step === 1} off={0.6}>
        <path d="M320 24 V396" stroke={D.ink} strokeWidth={4} strokeDasharray="4 12" strokeLinecap="round" />
      </Lit>
      <At x={step === 0 ? 262 : step === 1 ? 320 : 378} y={210}>
        <rect x={-30} y={-12} width={60} height={24} rx={11} fill={D.accent} stroke={D.ink} strokeWidth={4} />
      </At>

      {/* What is currently true. */}
      <Lit on={step === 2 || step === 3} off={step < 2 ? 0.2 : 0.5}>
        <rect x={412} y={92} width={188} height={236} rx={4} fill="#fff" stroke={D.ink} strokeWidth={4.5} />
        {mono(506, 128, "NOW", 19)}
        <path d="M428 142 H584" stroke={D.ink} strokeWidth={3} />
        {Array.from({ length: Math.max(afterRows, kept) }, (_, i) => (
          <g key={i} style={{ opacity: i < rows ? 1 : 0, transition: `opacity .3s ${i * 0.08}s` }}>
            <path d={`M432 ${176 + i * 38} l 8 8 l 14 -16`} {...LINE} stroke={D.leaf} strokeWidth={5} />
            <path d={`M470 ${178 + i * 38} H${578 - (i % 2) * 26}`} stroke={D.greyLight} strokeWidth={4} strokeLinecap="round" />
          </g>
        ))}
      </Lit>

      {mono(320, 410, "", 18)}
    </Plate>
  );
}
