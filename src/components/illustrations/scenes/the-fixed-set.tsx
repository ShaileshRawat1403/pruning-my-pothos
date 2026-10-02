import React from "react";
import { D, Head, Torso } from "../deadpan";
import { At, Lit, Plate, SceneProps, Show, Tick, hand, mono } from "./kit";

/**
 * The fixed set. A jar labelled THINGS THAT WENT WRONG fills with bad
 * outputs. Then they are sorted into labelled drawers, one per failure mode.
 * Then, after a change, the same drawers are re-checked: ticks where nothing
 * came back, one cross where something did.
 */
const DRAWERS = ["WRONG FACT", "WRONG TONE", "NO REFUSAL", "MALFORMED", "TRUNCATED", "THIN EVIDENCE"];
const SAYS = ["keep the bad ones.", "sorted. labelled. kept.", "same set. one came back."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The jar. */}
      <Lit on={s === 0} off={0.45}>
        <path d="M70 120 H230 V340 Q 230 360 210 360 H90 Q 70 360 70 340 Z" fill="#fff" fillOpacity={0.6} stroke={D.ink} strokeWidth={4.5} />
        <rect x={62} y={104} width={176} height={20} rx={4} fill={D.paperDeep} stroke={D.ink} strokeWidth={4} />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <At key={i} y={s >= 0 ? 0 : -200} delay={i * 0.06}>
            <rect x={84 + (i % 3) * 44} y={300 - Math.floor(i / 3) * 36} width={38} height={30} fill={i % 2 ? "#F6E7A8" : "#fff"} stroke={D.ink} strokeWidth={2.5} transform={`rotate(${(i % 3) * 6 - 6} ${100 + (i % 3) * 44} ${314 - Math.floor(i / 3) * 36})`} />
          </At>
        ))}
        {mono(150, 160, "WENT WRONG", 18)}
      </Lit>

      {/* The drawers: one per failure mode. */}
      <Lit on={s >= 1} off={0.3}>
        <rect x={290} y={80} width={320} height={270} fill="#C9B593" stroke={D.ink} strokeWidth={4.5} />
        {DRAWERS.map((d, i) => {
          const y = 92 + i * 42;
          const back = i === 2;
          return (
            <g key={d}>
              <rect x={302} y={y} width={296} height={34} fill={D.paperDeep} stroke={D.ink} strokeWidth={3} />
              {mono(318, y + 23, d, 18, D.ink, "start")}
              <Show on={s === 2} delay={i * 0.08}>
                {back ? (
                  <path d={`M574 ${y + 9} l14 14 m0 -14 l-14 14`} stroke={D.accent} strokeWidth={4} strokeLinecap="round" />
                ) : (
                  <Tick x={580} y={y + 19} on size={0.75} />
                )}
              </Show>
            </g>
          );
        })}
      </Lit>

      <Torso x={250} y={330} w={44} h={42} fill={D.teal} />
      <Head x={250} y={312} r={18} eyes="sleepy" look={1} mouth="flat" hair="curly" />

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 0 ? 150 : 450, 58, t, 26, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["KEEP THE BAD OUTPUTS", "SORT BY FAILURE MODE", "RE-SCORE THE SAME SET"][s], 18, D.accent)}
    </Plate>
  );
}
