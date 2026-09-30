import React from "react";
import { D, LINE } from "../deadpan";
import { At, Lit, Plate, SceneProps, hand, mono } from "./kit";

/**
 * Workflow or agent. One cart, two kinds of track. First the track is laid
 * before the run, branch and all. Then every junction fans out and the path
 * is picked on the way. Last, the only thing that differs: who picks.
 */
const FAN: [number, number][][] = [
  [[190, 210]],
  [[310, 96], [310, 172], [310, 248], [310, 324]],
  [[430, 72], [430, 134], [430, 196], [430, 258], [430, 320]],
];
const CHOSEN: [number, number][] = [[70, 210], [190, 210], [310, 172], [430, 258], [566, 210]];
const FIXED = "M70 210 H190 L310 150 H430 L566 210 M190 210 L310 270 H430 L566 210";

export default function Scene({ step, id }: SceneProps) {
  const agent = step >= 1;
  const cart = agent ? CHOSEN[2] : [250, 180];
  const edges: string[] = [];
  FAN[0].forEach(([x, y]) => edges.push(`M70 210 L${x} ${y}`));
  FAN[1].forEach(([x, y]) => edges.push(`M190 210 L${x} ${y}`));
  FAN[1].forEach(([x1, y1]) => FAN[2].forEach(([x2, y2]) => Math.abs(y1 - y2) < 100 && edges.push(`M${x1} ${y1} L${x2} ${y2}`)));
  FAN[2].forEach(([x, y]) => edges.push(`M${x} ${y} L566 210`));

  return (
    <Plate id={id}>
      {/* The track laid in advance. */}
      <Lit on={step === 0} off={step === 2 ? 0.5 : 0.12}>
        <path d={FIXED} {...LINE} strokeWidth={6} />
        {[
          [190, 210],
          [430, 150],
          [430, 270],
        ].map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <path d={`M${x} ${y - 22} V${y + 22}`} stroke={D.accent} strokeWidth={6} strokeLinecap="round" />
            <circle cx={x} cy={y - 28} r={7} fill={D.accent} stroke={D.ink} strokeWidth={3} />
          </g>
        ))}
      </Lit>

      {/* Every path the run could take. */}
      <Lit on={step === 1} off={step === 2 ? 0.5 : 0}>
        <path d={edges.join(" ")} fill="none" stroke={D.greyLight} strokeWidth={3} strokeDasharray="5 8" strokeLinecap="round" />
        {[...FAN[1], ...FAN[2]].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={7} fill="#fff" stroke={D.ink} strokeWidth={3} />
        ))}
        <path d={`M${CHOSEN.map((p) => p.join(" ")).join(" L")}`} fill="none" stroke={D.accent} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
      </Lit>

      <circle cx={70} cy={210} r={11} fill={D.ink} />
      <circle cx={566} cy={210} r={11} fill="#fff" stroke={D.ink} strokeWidth={4} />

      <At x={cart[0]} y={cart[1]}>
        <rect x={-24} y={-30} width={48} height={26} rx={4} fill={D.teal} stroke={D.ink} strokeWidth={4} />
        <circle cx={-12} cy={0} r={7} fill={D.ink} />
        <circle cx={12} cy={0} r={7} fill={D.ink} />
      </At>

      <g style={{ opacity: step === 2 ? 1 : 0, transition: "opacity .3s" }}>{hand(320, 392, "who picks the next step?", 30, D.accent)}</g>
      <g style={{ opacity: step === 2 ? 0 : 1, transition: "opacity .3s" }}>{mono(320, 392, agent ? "PICKED DURING THE RUN" : "WRITTEN BEFORE THE RUN", 18, D.accent)}</g>
    </Plate>
  );
}
