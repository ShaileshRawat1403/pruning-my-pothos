import React from "react";
import { D, LINE } from "../deadpan";
import { Lit, Plate, SceneProps, Show, mono } from "./kit";


/**
 * What is in the window. The wall and the slot from the cover. Inside the
 * frame, the five things one run can see. Outside it, what the application
 * keeps, and the dotted line by which some of it gets put back in.
 */
const SHORT = ["INSTRUCTION", "CONVERSATION", "DOCUMENTS", "QUESTION", "RESPONSE"];

export default function Scene({ step, steps, id }: SceneProps) {
  const label = (steps[0]?.tag ?? "").toUpperCase();
  return (
    <Plate id={id}>
      {/* Inside: one run. */}
      <Lit on={step !== 1} off={0.5}>
        <rect x={40} y={56} width={290} height={318} fill="#C9B593" stroke={D.ink} strokeWidth={5} />
        <rect x={64} y={104} width={242} height={250} fill={D.face} stroke={D.ink} strokeWidth={5} />
        {mono(185, 90, label, 18)}
        {SHORT.map((t, i) => (
          <g key={t}>
            <rect x={80} y={120 + i * 44} width={210} height={34} fill="#fff" stroke={D.ink} strokeWidth={3} />
            {mono(185, 144 + i * 44, t, 18)}
          </g>
        ))}
      </Lit>

      {/* Outside: what is kept, and what was left out. */}
      <Lit on={step >= 1} off={0.4}>
        <rect x={420} y={96} width={180} height={120} fill="#fff" stroke={D.ink} strokeWidth={4.5} />
        <path d="M420 136 H600 M420 176 H600" stroke={D.ink} strokeWidth={3.5} />
        <path d="M496 116 H524 M496 156 H524 M496 196 H524" {...LINE} strokeWidth={4} />
        {mono(510, 84, "KEPT BY THE APP", 18)}
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`rotate(${i * 5 - 8} 510 ${344 - i * 16})`}>
            <rect x={440 + (i % 2) * 8} y={334 - i * 16} width={130} height={18} fill="#fff" stroke={D.ink} strokeWidth={3} />
          </g>
        ))}
        {mono(510, 392, "NOT SELECTED", 18, D.greyLight)}
      </Lit>
      <Show on={step >= 1}>
        <path d="M416 156 C 380 160, 360 180, 334 200" fill="none" stroke={D.accent} strokeWidth={4} strokeDasharray="5 8" strokeLinecap="round" />
        <path d="M346 186 L332 202 L352 206" {...LINE} stroke={D.accent} strokeWidth={4} />
      </Show>
      <Show on={step >= 2}>
        <rect x={40} y={384} width={290} height={30} fill="#fff" stroke={D.accent} strokeWidth={3.5} />
        {mono(185, 405, "NOTHING CARRIES FORWARD", 18, D.accent)}
      </Show>
    </Plate>
  );
}
