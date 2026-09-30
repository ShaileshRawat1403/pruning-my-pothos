import React from "react";
import { D, LINE } from "../deadpan";
import { Plate, SceneProps, Show, mono } from "./kit";

/**
 * Four questions, five words. The cake from the cover. Each question lights
 * the layer it answers; the last one lights two, because who decides the
 * next step is what separates a workflow from an agent-like choice.
 */
const LAYERS = ["prompt", "system prompt", "skill", "workflow", "choice"];
const FILL = [D.shirt, "#E8C766", "#fff", "#E8CFC0", D.shirt];
const LIT: number[][] = [[0], [1], [2], [3, 4]];

export default function Scene({ step, id }: SceneProps) {
  const lit = LIT[Math.min(step, 3)];
  return (
    <Plate id={id}>
      <ellipse cx={230} cy={372} rx={200} ry={22} fill="#fff" stroke={D.ink} strokeWidth={4.5} />
      {LAYERS.map((t, i) => {
        const on = lit.includes(i);
        return (
          <g key={t} style={{ opacity: on ? 1 : 0.35, transition: "opacity .3s" }}>
            <rect x={70} y={304 - i * 58} width={320} height={58} fill={FILL[i]} stroke={D.ink} strokeWidth={on ? 6 : 4} />
            {mono(230, 340 - i * 58, t, 19)}
          </g>
        );
      })}
      <Show on={step >= 3}>
        <path d="M400 159 H452 M452 159 L500 120 M452 159 L500 198" {...LINE} strokeWidth={4} />
        {mono(510, 126, "THE PROGRAM", 18, D.ink, "start")}
        {mono(510, 204, "THE MODEL", 18, D.accent, "start")}
      </Show>
      <Show on={step < 3}>
        <path d={`M400 ${333 - Math.min(step, 2) * 58} H470`} {...LINE} stroke={D.accent} strokeWidth={4} />
        <circle cx={478} cy={333 - Math.min(step, 2) * 58} r={8} fill={D.accent} stroke={D.ink} strokeWidth={3} />
      </Show>
    </Plate>
  );
}
