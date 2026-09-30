import React from "react";
import { D, LINE } from "../deadpan";
import { Plate, SceneProps, Tick, mono } from "./kit";

/**
 * The five-minute version. The checklist from the flat-pack on the cover,
 * down to the five lines that get run, with a clock that has not moved far.
 */
const SHORT = ["INTENT", "CONTEXT", "PLAN", "BOUNDARY", "REUSE"];

export default function Scene({ step, steps, id }: SceneProps) {
  const n = steps.length || 5;
  const angle = ((step + 1) / n) * 30 - 90;
  return (
    <Plate id={id}>
      <g transform="rotate(-2 210 210)">
        <rect x={60} y={50} width={300} height={320} fill="#fff" stroke={D.ink} strokeWidth={4.5} />
        <rect x={160} y={34} width={100} height={30} rx={6} fill={D.greyLight} stroke={D.ink} strokeWidth={4} />
        {SHORT.slice(0, n).map((t, i) => (
          <g key={t} style={{ opacity: step === i ? 1 : step > i ? 0.6 : 0.32, transition: "opacity .3s" }}>
            <rect x={84} y={92 + i * 54} width={28} height={28} fill="none" stroke={D.ink} strokeWidth={3.5} />
            <Tick x={98} y={106 + i * 54} on={step >= i} color={D.accent} />
            {mono(130, 114 + i * 54, t, 19, D.ink, "start")}
          </g>
        ))}
      </g>
      <circle cx={500} cy={200} r={84} fill="#fff" stroke={D.ink} strokeWidth={5} />
      {[0, 3, 6, 9].map((h) => (
        <path key={h} d={`M${500 + Math.cos((h / 12) * Math.PI * 2) * 70} ${200 + Math.sin((h / 12) * Math.PI * 2) * 70} L${500 + Math.cos((h / 12) * Math.PI * 2) * 80} ${200 + Math.sin((h / 12) * Math.PI * 2) * 80}`} stroke={D.ink} strokeWidth={4} strokeLinecap="round" />
      ))}
      <path d="M500 200 V146" {...LINE} strokeWidth={6} />
      <g style={{ transformBox: "view-box", transformOrigin: "500px 200px", transform: `rotate(${angle + 90}deg)`, transition: "transform .5s ease" }}>
        <path d="M500 200 V134" {...LINE} stroke={D.accent} strokeWidth={5} />
      </g>
      <circle cx={500} cy={200} r={7} fill={D.ink} />
      {mono(500, 324, "A FEW MINUTES", 18, D.accent)}
    </Plate>
  );
}
