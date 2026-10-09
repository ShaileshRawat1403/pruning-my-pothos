import React from "react";
import { D, Head, Torso } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * A box is not a service. Left: one file, forty lines, with three
 * responsibilities highlighted inside it. Right: one responsibility smeared
 * across a library, a server and a person with a clipboard, a dotted outline
 * round all three. Last, a diagram box hovering over both, labelled for what
 * it describes: responsibility, not deployment.
 */
const SAYS = ["three jobs, one file.", "one job, three places.", "the box is a job, not a server."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />
      <path d="M300 40 V340" stroke={D.greyLight} strokeWidth={3} strokeDasharray="6 10" />

      {/* One file, several responsibilities. */}
      <Lit on={s !== 1} off={0.4}>
        <rect x={50} y={80} width={210} height={250} fill="#fff" stroke={D.ink} strokeWidth={4} />
        {mono(155, 106, "app.py · 40 LINES", 18)}
        {[
          { y: 126, c: "#DDEFE6", t: "CONTEXT" },
          { y: 194, c: "#F6E7A8", t: "MODEL CALL" },
          { y: 262, c: "#F1D9CC", t: "CHECK" },
        ].map((b) => (
          <g key={b.t}>
            <rect x={62} y={b.y} width={186} height={56} fill={b.c} />
            <path d={`M74 ${b.y + 18} H200 M74 ${b.y + 34} H180`} stroke={D.greyLight} strokeWidth={3} strokeLinecap="round" />
            {mono(240, b.y + 48, b.t, 18, D.ink, "end")}
          </g>
        ))}
      </Lit>

      {/* One responsibility, spread out. */}
      <Lit on={s !== 0} off={0.4}>
        <rect x={330} y={70} width={280} height={270} rx={12} fill="none" stroke={D.accent} strokeWidth={3.5} strokeDasharray="10 8" />
        {mono(470, 62, "RETRIEVAL", 18, D.accent)}
        <rect x={350} y={100} width={100} height={70} fill={D.paperDeep} stroke={D.ink} strokeWidth={3.5} />
        {mono(400, 142, "LIBRARY", 18)}
        <rect x={490} y={96} width={90} height={110} fill={D.grey} stroke={D.ink} strokeWidth={3.5} />
        <path d="M502 120 H568 M502 140 H568 M502 160 H568" stroke="#fff" strokeWidth={3} />
        {mono(535, 228, "SERVICE", 18)}
        <Torso x={410} y={290} w={56} h={48} fill={D.teal} />
        <Head x={410} y={266} r={22} eyes="sleepy" look={1} mouth="flat" hair="curly" />
        <rect x={442} y={266} width={34} height={44} fill="#fff" stroke={D.ink} strokeWidth={2.5} />
        {mono(520, 300, "MANUAL STEP", 18)}
      </Lit>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 0 ? 155 : i === 1 ? 470 : 320, i === 2 ? 364 : 40, t, 24, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["SEVERAL JOBS, ONE FUNCTION", "ONE JOB, SEVERAL PLACES", "RESPONSIBILITY, NOT DEPLOYMENT"][s], 18, D.accent)}
    </Plate>
  );
}
