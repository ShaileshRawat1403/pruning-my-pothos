import React from "react";
import { D, Head, Torso } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Property, not quality. One big dial labelled QUALITY, needle twitching,
 * telling nobody anything. Then four small gauges, one per property, and one
 * of them is plainly in the red. Last, the big dial again: it moved, and it
 * cannot say which.
 */
const GAUGES = [
  { x: 380, y: 130, t: "PARSES", a: -40 },
  { x: 530, y: 130, t: "SUPPORTED", a: 40 },
  { x: 380, y: 270, t: "DECLINES", a: -30 },
  { x: 530, y: 270, t: "REGISTER", a: 20 },
];
const SAYS = ["quality: 7.3. great.", "this one, specifically.", "it moved. which part?"];

function Dial({ x, y, r, a, red }: { x: number; y: number; r: number; a: number; red?: boolean }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="#fff" stroke={D.ink} strokeWidth={4} />
      <path d={`M${x - r * 0.8} ${y + r * 0.3} A ${r * 0.85} ${r * 0.85} 0 0 1 ${x + r * 0.8} ${y + r * 0.3}`} fill="none" stroke={D.greyLight} strokeWidth={5} />
      <path d={`M${x + r * 0.45} ${y - r * 0.6} A ${r * 0.85} ${r * 0.85} 0 0 1 ${x + r * 0.8} ${y + r * 0.3}`} fill="none" stroke={D.accent} strokeWidth={5} opacity={0.6} />
      <g style={{ transform: `rotate(${a}deg)`, transformOrigin: `${x}px ${y}px`, transition: "transform .5s" }}>
        <path d={`M${x} ${y} V${y - r * 0.75}`} stroke={red ? D.accent : D.ink} strokeWidth={4} strokeLinecap="round" />
      </g>
      <circle cx={x} cy={y} r={5} fill={D.ink} />
    </g>
  );
}

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* One quality score. */}
      <Lit on={s !== 1} off={0.4}>
        <Dial x={170} y={190} r={92} a={s === 2 ? -12 : 8} />
        {mono(170, 316, "QUALITY", 20)}
      </Lit>

      {/* One gauge per property. */}
      <Lit on={s === 1} off={s === 2 ? 0.55 : 0.3}>
        {GAUGES.map((g, i) => (
          <g key={g.t}>
            <Dial x={g.x} y={g.y} r={44} a={i === 1 && s >= 1 ? 62 : g.a} red={i === 1 && s >= 1} />
            {mono(g.x, g.y + 70, g.t, 18, i === 1 && s >= 1 ? D.accent : D.ink)}
          </g>
        ))}
      </Lit>

      <Torso x={70} y={320} w={50} h={52} fill={D.grey} />
      <Head x={70} y={300} r={20} eyes={s === 2 ? "tt" : "sleepy"} look={1} mouth="flat" stubble hair="sides" />

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 1 ? 455 : 170, 60, t, 26, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["ONE QUALITY SCORE", "ONE CHECK PER PROPERTY", "A NUMBER THAT MOVES, SAYING NOTHING"][s], 18, D.accent)}
    </Plate>
  );
}
