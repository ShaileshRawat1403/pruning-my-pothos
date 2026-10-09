import React from "react";
import { D } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * What replay rebuilds. A filmstrip of a past run: the recorded frames come
 * back clearly. Then what it cannot bring back: a die (the model need not say
 * the same thing twice), a building that has been repainted since (the
 * outside world moved on), and the blank frames nobody recorded. Last, the
 * strip with its blanks: replay reads the recording; it cannot write it.
 */
const SAYS = ["the recorded bits, back.", "not these.", "recorded first. replayed later."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The filmstrip. */}
      <Lit on={s !== 1} off={0.4}>
        <rect x={40} y={90} width={560} height={110} fill={D.ink} />
        {Array.from({ length: 7 }, (_, i) => {
          const blank = i === 2 || i === 5;
          return (
            <g key={i}>
              <rect x={56 + i * 78} y={106} width={66} height={78} fill={blank ? D.ink : "#fff"} stroke="#fff" strokeWidth={2} strokeDasharray={blank ? "4 4" : undefined} />
              {!blank && <path d={`M${68 + i * 78} ${130} H${110 + i * 78} M${68 + i * 78} ${150} H${100 + i * 78}`} stroke={D.greyLight} strokeWidth={3} strokeLinecap="round" />}
              {blank && s === 2 && mono(89 + i * 78, 152, "?", 22, D.accent)}
            </g>
          );
        })}
        {mono(320, 226, "RECORDED EVENTS AND STATE", 18, D.teal)}
      </Lit>

      {/* What it cannot bring back. */}
      <Lit on={s === 1} off={0.3}>
        <g transform="rotate(-10 110 300)">
          <rect x={76} y={266} width={68} height={68} rx={10} fill="#fff" stroke={D.ink} strokeWidth={4} />
          {[[96, 286], [124, 314], [110, 300]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={5} fill={D.ink} />)}
        </g>
        {mono(110, 360, "SAME OUTPUT?", 18, D.accent)}
        <path d="M270 340 V280 L310 250 L350 280 V340 Z" fill="#DDEFE6" stroke={D.ink} strokeWidth={4} strokeLinejoin="round" />
        <rect x={298} y={300} width={24} height={40} fill={D.paperDeep} stroke={D.ink} strokeWidth={3} />
        {mono(310, 360, "SAME WORLD?", 18, D.accent)}
        <rect x={470} y={266} width={66} height={78} fill={D.ink} stroke={D.greyLight} strokeWidth={2} strokeDasharray="4 4" />
        {mono(503, 360, "NEVER KEPT", 18, D.accent)}
      </Lit>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(320, 60, t, 28, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["WHAT IT CAN REBUILD", "WHAT IT DOES NOT GUARANTEE", "A CONSUMER OF THE RECORDING"][s], 18, D.accent)}
    </Plate>
  );
}
