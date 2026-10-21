import React from "react";
import { D } from "../deadpan";
import { At, Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * From a sentence to a point. A slip reading "my small dog" goes into a box
 * (the embedding model); three short strips of numbers come out, one per
 * piece; they are averaged into one long strip; the strip lands as a dot on
 * a small map, right beside a dot labelled "puppy".
 */
const SAYS = ["a sentence.", "numbers for each piece.", "averaged into one list.", "a point you can measure."];
const TAGS = ["THE INPUT", "THE EMBEDDING MODEL", "POOLING (MEAN)", "1536 NUMBERS, ONE POINT"];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 3);
  return (
    <Plate id={id}>
      <path d="M20 352 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The sentence slip, which walks into the model. */}
      <At x={s === 0 ? 0 : 90} y={0} o={s === 0 ? 1 : 0}>
        <g transform="rotate(-4 100 210)">
          <rect x={26} y={186} width={160} height={46} rx={5} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
          {mono(105, 215, "my small dog", 18, D.teal)}
        </g>
      </At>

      {/* The model. */}
      <Lit on={s === 1} off={0.4}>
        <rect x={210} y={160} width={110} height={110} rx={10} fill={D.paperDeep} stroke={D.ink} strokeWidth={4} />
        {mono(265, 222, "MODEL", 18, D.ink)}
      </Lit>

      {/* Per-piece strips. */}
      <Show on={s >= 1}>
        <Lit on={s === 1} off={0.35}>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={346} y={170 + i * 34} width={120} height={24} fill="#fff" stroke={D.ink} strokeWidth={2.5} />
              {mono(406, 188 + i * 34, ["0.3 -0.1 …", "0.2 -0.5 …", "0.1 -0.6 …"][i], 18, D.grey)}
            </g>
          ))}
        </Lit>
      </Show>

      {/* The pooled strip. */}
      <Show on={s >= 2}>
        <Lit on={s === 2} off={0.35}>
          <path d="M472 218 H492" stroke={D.ink} strokeWidth={3} />
          <rect x={496} y={204} width={120} height={28} fill={D.teal} stroke={D.ink} strokeWidth={3} />
          {mono(556, 224, "0.2 -0.4 …", 18, "#fff")}
        </Lit>
      </Show>

      {/* The point, beside puppy. */}
      <Show on={s === 3}>
        <rect x={420} y={262} width={180} height={84} fill="#fff" stroke={D.ink} strokeWidth={3} />
        <circle cx={500} cy={302} r={8} fill={D.teal} stroke={D.ink} strokeWidth={2.5} />
        <circle cx={524} cy={292} r={8} fill={D.accent} stroke={D.ink} strokeWidth={2.5} />
        {mono(540, 330, "puppy", 18, D.accent)}
        <circle cx={448} cy={330} r={6} fill={D.greyLight} />
        <circle cx={584} cy={276} r={6} fill={D.greyLight} />
      </Show>

      {hand(320, 64, SAYS[s], 26, s === 3 ? D.accent : D.grey)}
      {mono(320, 404, TAGS[s], 18, D.accent)}
    </Plate>
  );
}
