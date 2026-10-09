import React from "react";
import { D } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Interactive, not acting. One component plugged in: its cable runs to a
 * server. Then four more, just as clickable, their plugs lying on the floor:
 * a read-only card, a selector, an unsubmitted form, a chart. Last, the line:
 * what it is wired to, which you cannot see from the clicking.
 */
const LOOSE = [
  { x: 330, y: 100, t: "CARD" },
  { x: 480, y: 100, t: "SELECTOR" },
  { x: 330, y: 220, t: "FORM" },
  { x: 480, y: 220, t: "CHART" },
];
const SAYS = ["plugged in.", "just as clickable. plugged into nothing.", "you can't tell by clicking."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* Wired: a component and a cable to a server. */}
      <Lit on={s !== 1} off={0.45}>
        <rect x={50} y={100} width={130} height={80} rx={8} fill="#fff" stroke={D.ink} strokeWidth={4} />
        {mono(115, 146, "SUBMIT", 18, D.teal)}
        <path d="M115 180 C 115 260, 120 300, 150 320" fill="none" stroke={D.ink} strokeWidth={5} />
        <rect x={150} y={290} width={70} height={82} fill={D.grey} stroke={D.ink} strokeWidth={4} />
        <path d="M162 310 H208 M162 326 H208 M162 342 H208" stroke="#fff" strokeWidth={3} />
      </Lit>

      {/* Interactive, connected to nothing. */}
      {LOOSE.map((c) => (
        <Lit key={c.t} on={s === 1} off={0.35}>
          <rect x={c.x - 62} y={c.y - 30} width={124} height={70} rx={8} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
          {mono(c.x, c.y + 10, c.t, 18)}
          <path d={`M${c.x} ${c.y + 40} C ${c.x} ${c.y + 70}, ${c.x + 20} ${c.y + 80}, ${c.x + 30} ${c.y + 90}`} fill="none" stroke={D.ink} strokeWidth={4} />
          <rect x={c.x + 24} y={c.y + 86} width={16} height={10} fill={D.greyLight} stroke={D.ink} strokeWidth={2} />
        </Lit>
      ))}

      <Show on={s === 2}>
        <path d="M250 60 V372" stroke={D.accent} strokeWidth={4} strokeDasharray="10 8" />
        {mono(250, 50, "WIRED TO AN EFFECT?", 18, D.accent)}
      </Show>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i && i !== 2}>
          {hand(i === 0 ? 115 : 400, i === 0 ? 66 : 50, t, 22, D.greyLight)}
        </Show>
      ))}
      <Show on={s === 2}>{hand(440, 340, SAYS[2], 24, D.accent)}</Show>
      {mono(320, 404, ["CONNECTED TO SOMETHING THAT ACTS", "INTERACTIVE, CONNECTED TO NOTHING", "WHAT IT WAS WIRED TO"][s], 18, D.accent)}
    </Plate>
  );
}
