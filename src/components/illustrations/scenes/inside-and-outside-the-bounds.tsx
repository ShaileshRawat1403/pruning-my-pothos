import React from "react";
import { D } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Bounded autonomy as a fenced field. Inside: a small robot with three
 * possible paths, its own choice. On the fence: four signs the robot cannot
 * move (ACTIONS, SCOPE, BUDGET, ASK A PERSON). Last: the fence line itself.
 */
const SIGNS = [
  { x: 120, w: 112, t: "ACTIONS" },
  { x: 246, w: 100, t: "SCOPE" },
  { x: 370, w: 112, t: "BUDGET" },
  { x: 512, w: 152, t: "ASK A PERSON" },
];
const SAYS = ["picks its own next step.", "the limits sit outside it.", "it cannot talk past the fence."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The field and the agent's own choices. */}
      <Lit on={s !== 1} off={0.4}>
        <path d="M320 300 C 260 260, 220 230, 170 210" fill="none" stroke={D.greyLight} strokeWidth={4} strokeDasharray="8 8" />
        <path d="M320 300 C 320 250, 330 220, 340 190" fill="none" stroke={D.teal} strokeWidth={5} />
        <path d="M320 300 C 380 270, 420 240, 470 220" fill="none" stroke={D.greyLight} strokeWidth={4} strokeDasharray="8 8" />
        <path d="M330 196 L340 184 L350 198" fill="none" stroke={D.teal} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
        {/* The robot. */}
        <rect x={296} y={292} width={48} height={40} rx={8} fill="#fff" stroke={D.ink} strokeWidth={4} />
        <circle cx={310} cy={310} r={5} fill={D.ink} />
        <circle cx={330} cy={310} r={5} fill={D.ink} />
        <path d="M310 322 H330" stroke={D.ink} strokeWidth={3} strokeLinecap="round" />
        <path d="M320 292 V278" stroke={D.ink} strokeWidth={3} />
        <circle cx={320} cy={274} r={5} fill={D.accent} stroke={D.ink} strokeWidth={2} />
        <path d="M304 332 V352 M336 332 V352" stroke={D.ink} strokeWidth={4} strokeLinecap="round" />
      </Lit>

      {/* The fence and its signs. */}
      <Lit on={s !== 0} off={0.4}>
        {/* A fence all the way round the field: rails, and posts on the line only. */}
        <rect x={60} y={150} width={520} height={222} fill="none" stroke={D.ink} strokeWidth={5} />
        <rect x={60} y={166} width={520} height={190} fill="none" stroke={D.ink} strokeWidth={3} opacity={0.6} />
        {Array.from({ length: 11 }, (_, i) => (
          <path key={`t${i}`} d={`M${60 + i * 52} 140 V176`} stroke={D.ink} strokeWidth={5} strokeLinecap="round" />
        ))}
        {[200, 260, 320].map((y) => (
          <g key={`s${y}`}>
            <path d={`M50 ${y} H70`} stroke={D.ink} strokeWidth={5} strokeLinecap="round" />
            <path d={`M570 ${y} H590`} stroke={D.ink} strokeWidth={5} strokeLinecap="round" />
          </g>
        ))}
        {SIGNS.map((sg) => (
          <g key={sg.t}>
            <rect x={sg.x - sg.w / 2} y={96} width={sg.w} height={36} fill="#F6E7A8" stroke={D.ink} strokeWidth={3.5} />
            <path d={`M${sg.x} 132 V146`} stroke={D.ink} strokeWidth={3} />
            {mono(sg.x, 120, sg.t, 18, D.ink)}
          </g>
        ))}
      </Lit>

      <Show on={s === 2}>
        <rect x={56} y={146} width={528} height={230} fill="none" stroke={D.accent} strokeWidth={5} strokeDasharray="12 8" />
      </Show>

      {hand(320, 60, SAYS[s], 26, s === 2 ? D.accent : D.grey)}
      {mono(320, 404, ["THE AGENT DECIDES", "THE SYSTEM DECIDES", "ENFORCED OUTSIDE THE MODEL"][s], 18, D.accent)}
    </Plate>
  );
}
