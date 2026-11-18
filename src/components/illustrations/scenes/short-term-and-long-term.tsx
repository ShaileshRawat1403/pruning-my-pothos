import React from "react";
import { D } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Short-term and long-term memory. Left: one thread, four speech bubbles in
 * a dashed frame, the oldest one fading out at the top. Right: a filing
 * cabinet with three drawers (facts, past actions, instructions). Last beat:
 * the model sits between them, an empty box: neither one lives in it.
 */
const SAYS = ["the conversation so far.", "kept across sessions.", "neither one lives in the model."];
const TAGS = ["SHORT-TERM: ONE THREAD", "LONG-TERM: ACROSS SESSIONS", "THE MODEL KEEPS NOTHING"];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      {/* One thread. */}
      <Lit on={s !== 1} off={0.35}>
        <rect x={40} y={110} width={200} height={240} fill="none" stroke={D.ink} strokeWidth={3} strokeDasharray="10 8" />
        <g opacity={0.35}>
          <rect x={56} y={126} width={120} height={36} rx={14} fill="#fff" stroke={D.ink} strokeWidth={2.5} />
        </g>
        <rect x={100} y={180} width={124} height={36} rx={14} fill={D.teal} stroke={D.ink} strokeWidth={2.5} />
        <rect x={56} y={234} width={130} height={36} rx={14} fill="#fff" stroke={D.ink} strokeWidth={2.5} />
        <rect x={96} y={288} width={128} height={36} rx={14} fill={D.teal} stroke={D.ink} strokeWidth={2.5} />
        {mono(140, 100, "ONE THREAD", 18, D.ink)}
      </Lit>

      {/* The cabinet. */}
      <Lit on={s !== 0} off={0.35}>
        <rect x={420} y={110} width={180} height={240} fill={D.paperDeep} stroke={D.ink} strokeWidth={3.5} />
        {["FACTS", "PAST ACTIONS", "INSTRUCTIONS"].map((t, i) => (
          <g key={t}>
            <rect x={434} y={124 + i * 74} width={152} height={62} fill={D.face} stroke={D.ink} strokeWidth={3} />
            {mono(510, 162 + i * 74, t, 18, D.ink)}
          </g>
        ))}
      </Lit>

      {/* The model, between them, empty. */}
      <Show on={s === 2}>
        <rect x={276} y={180} width={110} height={100} rx={10} fill="#fff" stroke={D.ink} strokeWidth={4} />
        {mono(331, 236, "MODEL", 18, D.grey)}
        <path d="M244 230 H272 M390 230 H416" stroke={D.accent} strokeWidth={3.5} strokeDasharray="6 6" />
      </Show>

      {hand(320, 64, SAYS[s], 26, s === 2 ? D.accent : D.grey)}
      {mono(320, 404, TAGS[s], 18, D.accent)}
    </Plate>
  );
}
