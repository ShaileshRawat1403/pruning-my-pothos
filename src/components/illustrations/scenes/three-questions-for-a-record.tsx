import React from "react";
import { D, LINE } from "../deadpan";
import { At, Lit, Plate, SceneProps, Show, mono } from "./kit";

/**
 * Three questions for a record. The tape from the black box on the cover,
 * laid flat. A lens moves along it. The third question needs a second tape:
 * the last run that behaved.
 */
const SEG = ["DECIDED", "EVIDENCE", "CHANGED"];

export default function Scene({ step, id }: SceneProps) {
  const compare = step >= 2;
  return (
    <Plate id={id}>
      <rect x={30} y={150} width={92} height={96} rx={10} fill={D.accent} stroke={D.ink} strokeWidth={4.5} />
      <rect x={42} y={182} width={68} height={30} rx={3} fill="#fff" stroke={D.ink} strokeWidth={3} />

      {/* This run. */}
      <rect x={122} y={170} width={488} height={56} fill="#fff" stroke={D.ink} strokeWidth={4} />
      {SEG.map((t, i) => (
        <Lit key={t} on={step === i} off={0.4}>
          <rect x={140 + i * 156} y={178} width={140} height={40} fill={step === i ? "#F6E7A8" : "none"} stroke={D.ink} strokeWidth={3} strokeDasharray="6 6" style={{ transition: "fill .3s" }} />
          {mono(210 + i * 156, 205, t, 18)}
        </Lit>
      ))}
      {mono(614, 160, "THIS RUN", 18, D.greyLight, "end")}

      {/* The last run that behaved correctly. */}
      <Show on={compare}>
        <rect x={122} y={290} width={488} height={56} fill="#fff" stroke={D.ink} strokeWidth={4} />
        <path d="M150 318 H560" stroke={D.greyLight} strokeWidth={4} strokeDasharray="14 10" strokeLinecap="round" />
        {mono(614, 376, "THE LAST RUN THAT BEHAVED", 18, D.greyLight, "end")}
        <path d="M522 232 V284 M510 246 L522 232 L534 246 M510 270 L522 284 L534 270" {...LINE} stroke={D.accent} strokeWidth={4} />
      </Show>

      <At x={210 + Math.min(step, 2) * 156} y={198}>
        <circle cx={0} cy={0} r={44} fill="none" stroke={D.ink} strokeWidth={5} />
        <path d="M32 32 L62 62" {...LINE} strokeWidth={8} />
      </At>
    </Plate>
  );
}
