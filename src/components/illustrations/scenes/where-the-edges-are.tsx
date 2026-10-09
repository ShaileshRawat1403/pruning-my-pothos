import React from "react";
import { D, Head, Torso } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Where the edges are. A wall between two departments with a hatch in it.
 * Things pass through the hatch: a form, a crate, an envelope, a person's
 * signed note: interfaces, whether anyone designed them or not. Then the
 * limits on the hatch: one sign (chosen) and one wedge of rubble nobody put
 * there on purpose (an accident). Last, the wall itself: responsibility
 * changes hands here.
 */
const SAYS = ["it all goes through the hatch.", "one rule chosen. one rock, not.", "here, it becomes someone else's."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The wall and the hatch. */}
      <Lit on={s === 2} off={0.6}>
        <rect x={290} y={40} width={60} height={332} fill="#C9B593" stroke={s === 2 ? D.accent : D.ink} strokeWidth={s === 2 ? 5 : 4} />
        <rect x={286} y={170} width={68} height={80} fill={D.paper} stroke={D.ink} strokeWidth={4} />
      </Lit>

      {/* What crosses. */}
      <Lit on={s === 0} off={0.4}>
        {[
          { x: 200, y: 150, t: "f(x)" },
          { x: 210, y: 200, t: "ROW" },
          { x: 420, y: 160, t: "MSG" },
          { x: 430, y: 220, t: "OK'D" },
        ].map((c, i) => (
          <g key={c.t}>
            <rect x={c.x - 36} y={c.y - 18} width={72} height={32} rx={4} fill={i % 2 ? "#F6E7A8" : "#fff"} stroke={D.ink} strokeWidth={2.5} />
            {mono(c.x, c.y + 5, c.t, 18)}
          </g>
        ))}
        <path d="M250 196 H392" stroke={D.ink} strokeWidth={3} strokeDasharray="6 6" />
        <path d="M384 188 L396 196 L384 204" fill="none" stroke={D.ink} strokeWidth={3} />
      </Lit>

      {/* What limits it. */}
      <Lit on={s === 1} off={0.3}>
        <rect x={250} y={262} width={140} height={34} rx={4} fill="#fff" stroke={D.ink} strokeWidth={3} />
        {mono(320, 285, "MAX 1 MB", 18, D.teal)}
        <path d="M300 250 L312 232 L330 240 L346 228 L354 250 Z" fill={D.grey} stroke={D.ink} strokeWidth={2.5} />
        {mono(320, 322, "CHOSEN / ACCIDENT", 18, D.accent)}
      </Lit>

      <Torso x={100} y={290} w={70} h={82} fill={D.teal} />
      <Head x={100} y={258} r={28} eyes="sleepy" look={1} mouth="flat" hair="curly" />
      <Torso x={540} y={290} w={70} h={82} fill={D.grey} />
      <Head x={540} y={258} r={28} eyes="sleepy" look={-1} mouth="flat" stubble hair="sides" />

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(320, i === 2 ? 356 : 30, t, 22, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["WHAT CROSSES: AN INTERFACE", "WHAT LIMITS IT: CONSTRAINTS", "WHERE RESPONSIBILITY CHANGES HANDS"][s], 18, D.accent)}
    </Plate>
  );
}
