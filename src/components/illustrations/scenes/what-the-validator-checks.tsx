import React from "react";
import { D, Head, Torso, Limb } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * What the validator checks. This repository's editorial skill as a customs
 * desk: the officer stamps the article's passport, page by page. DECLARED
 * OBSERVED: stamped (that it is declared). MAPS TO PROSE: stamped. COMMIT
 * PINNED: stamped. SOURCE SUPPORTS IT: the officer shrugs, not this desk.
 * Then the claim stamped on the cover, and the fair reading of it.
 */
const ROWS = ["DECLARED", "MAPS TO PROSE", "COMMIT PINNED", "SOURCE HOLDS?"];
const SAYS = ["declared. stamped.", "maps. stamped.", "pinned. stamped.", "not this desk.", "", "the structure holds. that's the stamp."];
const LABEL = ["THAT IT IS DECLARED", "CLAIM TO PROSE", "AN IMMUTABLE COMMIT", "NO VALIDATOR CHECKS THIS", "THE CLAIM", "THE AUTHOR STAYS ACCOUNTABLE"];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 5);
  return (
    <Plate id={id}>
      <path d="M20 380 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The passport: the article. */}
      <rect x={60} y={90} width={290} height={220} rx={6} fill="#fff" stroke={D.ink} strokeWidth={4.5} />
      <path d="M205 90 V310" stroke={D.ink} strokeWidth={3} />
      {mono(132, 120, "ARTICLE", 18, D.teal)}
      {ROWS.map((r, i) => {
        const y = 156 + i * 40;
        const absent = i === 3;
        return (
          <Lit key={r} on={s === i} off={s > i ? 0.75 : 0.25}>
            {mono(72, y, r, 18, absent ? D.accent : D.ink, "start")}
            <Show on={s > i || s === i}>
              {absent ? (
                mono(300, y, "?", 22, D.accent)
              ) : (
                <g transform={`rotate(-8 300 ${y - 6})`}>
                  <rect x={262} y={y - 22} width={76} height={26} fill="none" stroke={D.leaf} strokeWidth={3} />
                  {mono(300, y - 3, "OK", 18, D.leaf)}
                </g>
              )}
            </Show>
          </Lit>
        );
      })}

      {/* The officer. */}
      <rect x={380} y={250} width={240} height={18} fill={D.paperDeep} stroke={D.ink} strokeWidth={4} />
      <Torso x={510} y={196} w={90} h={54} fill={D.teal} />
      <Head x={510} y={154} r={36} eyes={s === 3 ? "tt" : "sleepy"} look={-1} mouth="flat" hair="curly" />
      <Limb d={s === 3 ? "M470 214 C 450 200, 446 186, 452 172" : "M470 214 C 430 224, 400 230, 360 232"} fill={D.teal} w={13} />
      {mono(510, 300, "VALIDATOR", 18, D.greyLight)}

      <Show on={s >= 4}>
        <g transform="rotate(-6 205 70)">
          <rect x={120} y={46} width={170} height={40} fill="#fff" stroke={D.accent} strokeWidth={3.5} />
          {mono(205, 72, "GOOD AND TRUE?", 18, D.accent)}
        </g>
      </Show>

      {SAYS.map((t, i) => (
        <Show key={i} on={s === i && t !== ""}>
          {hand(500, 70, t, 24, i === 5 ? D.teal : i === 3 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 408, LABEL[s], 18, D.accent)}
    </Plate>
  );
}
