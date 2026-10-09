import React from "react";
import { D } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * The candidate and the rest. In the middle, a stamping press marked MODEL,
 * stamping CANDIDATE on whatever comes through. Around it, the stations the
 * surrounding system may run: context fed in, a contract gauge, an effects
 * lever with a lock, a filing cabinet and a camera for state and record.
 * Last, three questions pinned to the stamped sheet that the press never
 * answers.
 */
const STATIONS = [
  { x: 110, y: 110, t: "CONTEXT" },
  { x: 530, y: 110, t: "CONTRACT" },
  { x: 110, y: 300, t: "EFFECTS" },
  { x: 530, y: 300, t: "STATE, RECORD" },
];
const SAYS = ["stamps. that's it.", "everything else, if the job needs it.", "true? permitted? done? not stamped."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The press. */}
      <Lit on={s !== 1} off={0.45}>
        <rect x={250} y={120} width={140} height={60} fill={D.grey} stroke={D.ink} strokeWidth={4.5} />
        {mono(320, 157, "MODEL", 20, "#fff")}
        <rect x={300} y={180} width={40} height={36} fill={D.grey} stroke={D.ink} strokeWidth={4} />
        <rect x={240} y={240} width={160} height={90} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
        <g transform="rotate(-6 320 286)">
          <rect x={258} y={268} width={124} height={34} fill="none" stroke={D.accent} strokeWidth={3.5} />
          {mono(320, 292, "CANDIDATE", 18, D.accent)}
        </g>
      </Lit>

      {/* The stations around it. */}
      {STATIONS.map((st) => (
        <Lit key={st.t} on={s === 1} off={0.3}>
          <rect x={st.x - 80} y={st.y - 26} width={160} height={50} rx={6} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
          {mono(st.x, st.y + 6, st.t, 18)}
          <path d={`M${st.x < 320 ? st.x + 80 : st.x - 80} ${st.y} L${st.x < 320 ? 240 : 400} ${st.y < 200 ? 160 : 290}`} stroke={D.greyLight} strokeWidth={3} strokeDasharray="6 6" />
        </Lit>
      ))}

      <Show on={s === 2}>
        {["TRUE?", "PERMITTED?", "DONE?"].map((q, i) => (
          <g key={q} transform={`rotate(${(i - 1) * 6} ${210 + i * 110} 66)`}>
            <rect x={155 + i * 110} y={50} width={110} height={32} fill="#F6E7A8" stroke={D.ink} strokeWidth={2.5} />
            {mono(210 + i * 110, 72, q, 18, D.ink)}
          </g>
        ))}
      </Show>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i && i !== 2}>
          {hand(320, i === 0 ? 60 : 360, t, 24, D.greyLight)}
        </Show>
      ))}
      <Show on={s === 2}>{hand(320, 360, SAYS[2], 24, D.accent)}</Show>
      {mono(320, 404, ["WHAT THE MODEL CONTRIBUTES", "WHAT THE SURROUNDING SYSTEM MAY DO", "GENERATION ESTABLISHES A CANDIDATE"][s], 18, D.accent)}
    </Plate>
  );
}
