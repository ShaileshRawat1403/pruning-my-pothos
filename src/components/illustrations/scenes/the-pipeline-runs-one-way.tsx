import React from "react";
import { D, LINE } from "../deadpan";
import { At, Plate, SceneProps, mono } from "./kit";

/**
 * The pipeline runs one way. The invoice from the cover goes through six
 * stations. Its figure is misread at the second, and every station after
 * that handles the misreading with care.
 */
const SHORT = ["DOCUMENT", "OCR", "TEXT", "INDEX", "CONTEXT", "MODEL"];

export default function Scene({ step, steps, id }: SceneProps) {
  const n = steps.length || 6;
  const garbled = step >= 1;
  const x = (i: number) => 66 + i * 101;
  return (
    <Plate id={id}>
      <path d="M30 290 H610" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />
      {SHORT.slice(0, n).map((t, i) => (
        <g key={t} style={{ opacity: step === i ? 1 : step > i ? 0.6 : 0.32, transition: "opacity .3s" }}>
          <rect x={x(i) - 38} y={296} width={76} height={46} rx={4} fill={i === 1 ? D.shirt : "#fff"} stroke={D.ink} strokeWidth={4} />
          {mono(x(i), 380, t, i === 0 || i === 4 ? 15 : 18)}
          {i < n - 1 && <path d={`M${x(i) + 44} 319 H${x(i) + 56} M${x(i) + 50} 312 L${x(i) + 58} 319 L${x(i) + 50} 326`} {...LINE} strokeWidth={3.5} />}
        </g>
      ))}
      <At x={x(Math.min(step, n - 1))} y={210}>
        <rect x={-62} y={-66} width={124} height={132} fill="#fff" stroke={D.ink} strokeWidth={4} />
        {mono(0, -36, "INVOICE", 18)}
        <path d="M-46 -24 H46" stroke={D.greyLight} strokeWidth={3} />
        {mono(0, 18, garbled ? "$4,OO.O0" : "$400.00", 20, garbled ? D.accent : D.ink)}
      </At>
      {mono(320, 60, step === 0 ? "AS PRINTED" : step === 1 ? "MISREAD HERE" : step < n - 1 ? "CARRIED FORWARD, AS READ" : "REASONED OVER, CONFIDENTLY", 18, D.accent)}
    </Plate>
  );
}
