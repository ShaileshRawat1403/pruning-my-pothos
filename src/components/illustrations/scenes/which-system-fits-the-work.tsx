import React from "react";
import { D, Head, Torso } from "../deadpan";
import { At, Lit, Plate, SceneProps, hand, mono } from "./kit";

/**
 * Which system fits the work. One task slip, four bins on the floor: a gear
 * (automation), a magnifier (retrieval), a robot inside a small fence (a
 * model or a bounded agent), and a person. First beat: the person bin, for
 * high stakes, checked before anything else. Then the slip waits to be sorted
 * and drops into each of the other bins in turn.
 */
const X = [110, 250, 390, 530];
const LABELS = ["AUTOMATION", "RETRIEVAL", "MODEL / AGENT", "PERSON"];
const SAYS = ["high stakes? a person decides.", "otherwise: what kind of work?", "clear rules: automate it.", "something to find: retrieve it.", "judgement: a model, bounded."];
const TAGS = ["CHECKED FIRST", "SORT FIRST, BUILD SECOND", "CLEAR RULES", "INFORMATION TO FIND", "JUDGEMENT NEEDED"];
// Which bin is in ink on each beat: the person first, then none, then 0..2.
const LIT = [3, -1, 0, 1, 2];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 4);
  const lit = LIT[s];
  const slipX = s < 2 ? 320 : X[s - 2];
  const slipY = s < 2 ? 0 : 44;
  return (
    <Plate id={id}>
      <path d="M20 352 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {X.map((x, i) => (
        <Lit key={LABELS[i]} on={lit === i} off={0.35}>
          {/* The bin. */}
          <path d={`M${x - 52} 262 L${x - 44} 352 H${x + 44} L${x + 52} 262`} fill={D.paperDeep} stroke={D.ink} strokeWidth={4} strokeLinejoin="round" />
          {mono(x, 246, LABELS[i], 18, lit === i ? D.accent : D.ink)}
        </Lit>
      ))}

      {/* What is in each bin. */}
      <Lit on={lit === 0} off={0.35}>
        <circle cx={X[0]} cy={310} r={18} fill="#fff" stroke={D.ink} strokeWidth={4} />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <path key={a} d={`M${X[0]} 286 V292`} transform={`rotate(${a} ${X[0]} 310)`} stroke={D.ink} strokeWidth={6} strokeLinecap="round" />
        ))}
        <circle cx={X[0]} cy={310} r={6} fill={D.ink} />
      </Lit>
      <Lit on={lit === 1} off={0.35}>
        <circle cx={X[1] - 6} cy={304} r={16} fill="#fff" stroke={D.ink} strokeWidth={4} />
        <path d={`M${X[1] + 6} 316 L${X[1] + 22} 332`} stroke={D.ink} strokeWidth={6} strokeLinecap="round" />
      </Lit>
      <Lit on={lit === 2} off={0.35}>
        <rect x={X[2] - 34} y={282} width={68} height={58} fill="none" stroke={D.accent} strokeWidth={3} strokeDasharray="8 6" />
        <rect x={X[2] - 16} y={296} width={32} height={28} rx={6} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
        <circle cx={X[2] - 6} cy={308} r={3.5} fill={D.ink} />
        <circle cx={X[2] + 6} cy={308} r={3.5} fill={D.ink} />
      </Lit>
      <Lit on={lit === 3} off={0.35}>
        <Torso x={X[3]} y={330} w={36} h={26} fill={D.grey} />
        <Head x={X[3]} y={306} r={17} eyes="sleepy" look={0} mouth="flat" hair="sides" />
      </Lit>

      {/* The task slip. */}
      <At x={slipX} y={slipY}>
        <g transform="rotate(-4 0 150)">
          <rect x={-56} y={126} width={112} height={46} rx={5} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
          {mono(0, 156, "the task", 18, D.teal)}
        </g>
      </At>

      {hand(320, 64, SAYS[s], 26, s === 0 ? D.accent : D.grey)}
      {mono(320, 404, TAGS[s], 18, D.accent)}
    </Plate>
  );
}
