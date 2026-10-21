import React from "react";
import { D } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";
import { Stamp } from "../props";

/**
 * What nearness tells you. One small map of an embedding space. Left beat:
 * "small dog" and "puppy" sit together, circled: related, correctly. Right
 * beat: "policy (2025)" and "policy (2026)" sit together too; one gets an
 * OUTDATED stamp that the distance could not have given it. Last beat: the
 * score reads 0.82 for both pairs.
 */
const SAYS = ["related, as the model learned it.", "close, and one of them is wrong.", "the score is a distance, nothing more."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <rect x={40} y={100} width={560} height={260} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
      {[[90, 320], [140, 150], [560, 330], [520, 140], [300, 330], [330, 130]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={6} fill={D.greyLight} />
      ))}

      {/* The dogs. */}
      <Lit on={s !== 1} off={0.35}>
        <circle cx={170} cy={230} r={9} fill={D.teal} stroke={D.ink} strokeWidth={2.5} />
        <circle cx={196} cy={244} r={9} fill={D.teal} stroke={D.ink} strokeWidth={2.5} />
        {mono(150, 194, "small dog", 18, D.ink)}
        {mono(230, 278, "puppy", 18, D.ink)}
        <ellipse cx={184} cy={238} rx={46} ry={34} fill="none" stroke={D.leaf} strokeWidth={3.5} />
      </Lit>

      {/* The policies. */}
      <Lit on={s !== 0} off={0.35}>
        <circle cx={420} cy={220} r={9} fill={D.accent} stroke={D.ink} strokeWidth={2.5} />
        <circle cx={446} cy={236} r={9} fill={D.accent} stroke={D.ink} strokeWidth={2.5} />
        {mono(372, 194, "policy 2025", 18, D.ink)}
        {mono(480, 272, "policy 2026", 18, D.ink)}
        <ellipse cx={434} cy={228} rx={46} ry={34} fill="none" stroke={D.accent} strokeWidth={3.5} />
        <Show on={s >= 1}>
          <Stamp x={384} y={136} text="OUTDATED" w={120} size={18} rotate={-6} color={D.accent} />
        </Show>
      </Lit>

      <Show on={s === 2}>
        {mono(184, 340, "score 0.82", 18, D.teal)}
        {mono(434, 340, "score 0.82", 18, D.accent)}
      </Show>

      {hand(320, 64, SAYS[s], 26, s === 2 ? D.accent : D.grey)}
      {mono(320, 404, ["NEARNESS TELLS YOU", "NEARNESS DOES NOT TELL YOU", "CHECK CURRENCY ELSEWHERE"][s], 18, D.accent)}
    </Plate>
  );
}
