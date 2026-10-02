import React from "react";
import { D } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Model or application. A small box in the middle of the bench: the model,
 * which emits one ranked list. Around it, a busy workshop: the machines that
 * fetch, call tools, keep state, validate, apply policy, evaluate. Last, a
 * detective's magnifier hovers over the whole bench: which part did it?
 */
const PARTS = [
  { x: 110, y: 120, t: "FETCH" },
  { x: 320, y: 90, t: "TOOLS" },
  { x: 530, y: 120, t: "STATE" },
  { x: 110, y: 290, t: "SCHEMA" },
  { x: 320, y: 320, t: "POLICY" },
  { x: 530, y: 290, t: "EVALUATE" },
];
const SAYS = ["one ranked list.", "everything else.", "which part did it?"];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The workshop around it. */}
      {PARTS.map((p) => (
        <Lit key={p.t} on={s === 1} off={s === 2 ? 0.75 : 0.3}>
          <path d={`M${p.x} ${p.y} L320 205`} stroke={D.greyLight} strokeWidth={3} strokeDasharray="6 6" />
          <rect x={p.x - 62} y={p.y - 24} width={124} height={44} rx={6} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
          {mono(p.x, p.y + 5, p.t, 18)}
        </Lit>
      ))}

      {/* The model: small, in the middle, one job. */}
      <Lit on={s !== 1} off={0.55}>
        <rect x={262} y={168} width={116} height={78} rx={8} fill={D.teal} stroke={D.ink} strokeWidth={4.5} />
        {mono(320, 196, "MODEL", 18, "#fff")}
        <path d="M282 212 H358 M282 226 H340" stroke="#fff" strokeWidth={3} strokeLinecap="round" opacity={0.8} />
      </Lit>

      <Show on={s === 2}>
        <circle cx={430} cy={220} r={40} fill="#fff" fillOpacity={0.25} stroke={D.ink} strokeWidth={5} />
        <path d="M458 248 L486 276" stroke={D.ink} strokeWidth={8} strokeLinecap="round" />
      </Show>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(320, i === 1 ? 46 : 150, t, 26, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["THE MODEL", "THE APPLICATION SOMEONE BUILT", "ONE SUSPECT AMONG SEVERAL"][s], 18, D.accent)}
    </Plate>
  );
}
