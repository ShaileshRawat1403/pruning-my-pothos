import React from "react";
import { D } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * The name suggests more. Four jars on a shelf, front labels in big friendly
 * letters: RETRIEVED, VALIDATED, AUTHORIZED, STORED, each with its promise.
 * Then the jars are turned round: the small print on the back says what was
 * actually established. Last, both labels at once.
 */
const JARS = [
  { name: "RETRIEVED", front: "RELEVANT, CURRENT", back: "SOMETHING CAME BACK" },
  { name: "VALIDATED", front: "CORRECT", back: "SHAPE MATCHED" },
  { name: "AUTHORIZED", front: "APPROPRIATE", back: "A RULE SAID OK" },
  { name: "STORED", front: "AVAILABLE, TRUE", back: "A WRITE WORKED" },
];
const SAYS = ["the label on the front.", "the small print.", "both. read the back."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />
      <rect x={30} y={300} width={580} height={14} fill={D.paperDeep} stroke={D.ink} strokeWidth={4} />

      {JARS.map((j, i) => {
        const x = 98 + i * 148;
        return (
          <g key={j.name}>
            <path d={`M${x - 58} 120 H${x + 58} V280 Q ${x + 58} 300 ${x + 38} 300 H${x - 38} Q ${x - 58} 300 ${x - 58} 280 Z`} fill="#fff" fillOpacity={0.6} stroke={D.ink} strokeWidth={4} />
            <rect x={x - 62} y={104} width={124} height={20} rx={4} fill={D.paperDeep} stroke={D.ink} strokeWidth={3.5} />
            {mono(x, 160, j.name, 18, D.ink)}
            <Lit on={s !== 1} off={0.25}>
              <rect x={x - 66} y={180} width={132} height={50} rx={4} fill="#DDEFE6" stroke={D.leaf} strokeWidth={3} />
              {j.front.split(", ").map((l, k, arr) => mono(x, 202 + k * 20 - (arr.length - 1) * 10 + 4, l, 18, D.leaf))}
            </Lit>
            <Lit on={s >= 1} off={0}>
              <rect x={x - 58} y={240} width={116} height={52} fill="#fff" stroke={D.ink} strokeWidth={2.5} />
              {j.back.split(" ").reduce<string[]>((acc, w) => {
                const last = acc[acc.length - 1];
                if (last && (last + " " + w).length <= 10) acc[acc.length - 1] = last + " " + w;
                else acc.push(w);
                return acc;
              }, []).map((l, k) => mono(x, 260 + k * 20, l, 18, D.accent))}
            </Lit>
          </g>
        );
      })}

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(320, 70, t, 28, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["WHAT THE NAME SUGGESTS", "WHAT IT ESTABLISHES", "A REAL GUARANTEE, A SMALLER ONE"][s], 18, D.accent)}
    </Plate>
  );
}
