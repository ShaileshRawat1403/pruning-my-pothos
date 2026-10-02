import React from "react";
import { D } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Close the loop. Five stations on a ring: the failure, the record read and
 * named, the new case added, the set rerun, the change shipped. A token goes
 * round, one station per step. The third station has a little sign on it: the
 * one everybody skips, drawn with a gap in the ring until the token gets there.
 */
const STATIONS = ["FAILS", "NAMED", "BECOMES A CASE", "RERUN", "SHIPS"];
const SAYS = ["it broke.", "it has a name now.", "the step everyone skips.", "same set, again.", "now it ships."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 4);
  const cx = 320;
  const cy = 210;
  const R = 170;
  const pos = (i: number) => {
    const a = (-90 + i * 72) * (Math.PI / 180);
    return [cx + R * Math.cos(a), cy + R * Math.sin(a) * 0.72];
  };
  const [tx, ty] = pos(s);
  return (
    <Plate id={id}>
      <path d="M20 380 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The ring, with a gap at the skipped step until it is reached. */}
      <ellipse cx={cx} cy={cy} rx={R} ry={R * 0.72} fill="none" stroke={D.greyLight} strokeWidth={5} strokeDasharray="12 8" />
      <Show on={s < 2}>
        <circle cx={pos(2)[0] - 40} cy={pos(2)[1] + 10} r={18} fill={D.paper} />
      </Show>

      {STATIONS.map((t, i) => {
        const [x, y] = pos(i);
        const w = t.length * 11 + 28;
        return (
          <Lit key={t} on={s === i} off={i < s ? 0.75 : 0.35}>
            <rect x={x - w / 2} y={y - 20} width={w} height={38} rx={6} fill={i === 2 ? "#F6E7A8" : "#fff"} stroke={D.ink} strokeWidth={3.5} />
            {mono(x, y + 6, t, 18, i === 2 ? D.accent : D.ink)}
          </Lit>
        );
      })}

      {/* The token going round. */}
      <circle cx={tx} cy={ty - 32} r={11} fill={D.teal} stroke={D.ink} strokeWidth={3} style={{ transition: "cx .5s, cy .5s" }} />

      <Show on={s === 2}>
        <g transform="rotate(-6 520 330)">
          <rect x={440} y={316} width={170} height={34} fill="#fff" stroke={D.accent} strokeWidth={3} />
          {mono(525, 339, "USUALLY SKIPPED", 18, D.accent)}
        </g>
      </Show>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(cx, cy + 8, t, 26, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 408, ["A RUN FAILS IN PRODUCTION", "THE FAILURE MODE, NAMED", "IT BECOMES A CASE", "THE SET IS RERUN", "THE CHANGE SHIPS"][s], 18, D.accent)}
    </Plate>
  );
}
