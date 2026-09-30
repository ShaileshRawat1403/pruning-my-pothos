import React from "react";
import { D, LINE } from "../deadpan";
import { Lit, Plate, SceneProps, Tick, hand, mono } from "./kit";

/**
 * What a publisher holds. The garden from the cover, fenced. Six pots inside
 * it, each one checkable. Outside the fence, the cloud, which answers to
 * nobody in the garden.
 */
export default function Scene({ step, steps, id }: SceneProps) {
  const held = (steps[0]?.items ?? []).map((t) => t.split(":")[0].toUpperCase());
  return (
    <Plate id={id}>
      <Lit on={step === 0} off={0.45}>
        <rect x={24} y={150} width={400} height={226} fill="none" stroke={D.ink} strokeWidth={4.5} strokeDasharray="2 14" strokeLinecap="round" />
        {mono(224, 138, (steps[0]?.tag ?? "").toUpperCase(), 18, D.accent)}
        {held.map((t, i) => {
          const x = 70 + (i % 2) * 190;
          const y = 186 + Math.floor(i / 2) * 64;
          return (
            <g key={t}>
              <path d={`M${x} ${y} H${x + 40} L${x + 34} ${y + 38} H${x + 6} Z`} fill={D.accent} stroke={D.ink} strokeWidth={3.5} strokeLinejoin="round" />
              <path d={`M${x + 20} ${y} C ${x + 14} ${y - 18}, ${x + 2} ${y - 22}, ${x - 2} ${y - 12} M${x + 20} ${y} C ${x + 26} ${y - 20}, ${x + 40} ${y - 22}, ${x + 42} ${y - 10}`} fill="none" stroke={D.leaf} strokeWidth={4} strokeLinecap="round" />
              {mono(x + 52, y + 26, t, 18, D.ink, "start")}
              <Tick x={x - 18} y={y + 22} on={step === 0} size={0.8} />
            </g>
          );
        })}
      </Lit>

      <Lit on={step === 1} off={0.4}>
        <path d="M456 96 C 434 96, 428 66, 452 60 C 456 34, 494 26, 510 44 C 526 22, 572 24, 580 48 C 608 40, 630 60, 618 86 C 630 96, 622 112, 606 110 Z" fill="#fff" stroke={D.ink} strokeWidth={4.5} strokeLinejoin="round" />
        {["RETRIEVES", "RANKS", "CITES"].map((t, i) => (
          <g key={t}>{mono(534, 176 + i * 40, t, 18)}</g>
        ))}
        <path d="M472 124 l -6 16 M534 124 l -6 16 M596 124 l -6 16" {...LINE} stroke={D.teal} strokeWidth={4} />
        {hand(534, 322, "or does not.", 28, D.accent)}
      </Lit>
    </Plate>
  );
}
