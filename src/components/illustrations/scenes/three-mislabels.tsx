import React from "react";
import { D } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Three mislabels. A label maker printing grand names onto plain things. A
 * text file gets SKILL (it declares nothing). A conveyor belt with a few
 * tool hooks gets AGENT (every branch was written in advance). A system
 * prompt with task rules stuffed in the back gets nothing at all, which is
 * the problem: an unnamed skill nobody reviews.
 */
const ITEMS = [
  { x: 120, label: "SKILL", real: "A SAVED PROMPT" },
  { x: 320, label: "AGENT", real: "A WORKFLOW" },
  { x: 520, label: "(SYSTEM PROMPT)", real: "AN UNNAMED SKILL" },
];
const SAYS = ["it declares nothing.", "every branch written in advance.", "nobody reviews it."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {ITEMS.map((it, i) => (
        <Lit key={it.label} on={s === i} off={s > i ? 0.6 : 0.3}>
          {i === 0 && (
            <g>
              <rect x={80} y={180} width={80} height={100} fill="#fff" stroke={D.ink} strokeWidth={3} />
              <path d="M92 204 H148 M92 222 H140 M92 240 H148" stroke={D.greyLight} strokeWidth={3} strokeLinecap="round" />
            </g>
          )}
          {i === 1 && (
            <g>
              <rect x={240} y={240} width={160} height={20} rx={10} fill={D.greyLight} stroke={D.ink} strokeWidth={3} />
              {[0, 1, 2].map((k) => (
                <path key={k} d={`M${270 + k * 50} 240 V200 q 0 -10 10 -10`} fill="none" stroke={D.ink} strokeWidth={3} />
              ))}
            </g>
          )}
          {i === 2 && (
            <g>
              <rect x={470} y={170} width={100} height={110} fill={D.paperDeep} stroke={D.ink} strokeWidth={3} />
              {[0, 1, 2, 3, 4].map((k) => (
                <rect key={k} x={478 + (k % 2) * 8} y={196 + k * 14} width={84} height={12} fill="#fff" stroke={D.ink} strokeWidth={1.5} />
              ))}
            </g>
          )}
          <g transform={`rotate(-6 ${it.x} 140)`}>
            <rect x={it.x - 80} y={122} width={160} height={34} rx={4} fill={i === 2 ? "#fff" : "#F6E7A8"} stroke={D.ink} strokeWidth={3} strokeDasharray={i === 2 ? "6 5" : undefined} />
            {mono(it.x, 145, it.label, 18, i === 2 ? D.greyLight : D.ink)}
          </g>
          {mono(it.x, 312, it.real, 18, D.accent)}
        </Lit>
      ))}

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(ITEMS[i].x, 350, t, 22, D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["A SAVED PROMPT CALLED A SKILL", "A WORKFLOW CALLED AN AGENT", "TASK LOGIC IN THE SYSTEM PROMPT"][s], 18, D.accent)}
    </Plate>
  );
}
