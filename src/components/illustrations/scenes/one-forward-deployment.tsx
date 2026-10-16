import React from "react";
import { D, Head, Torso } from "../deadpan";
import { At, Lit, Plate, SceneProps, hand, mono } from "./kit";

/**
 * One deployment, four stations on the customer's floor: a whiteboard with
 * the analysts' question, a data pipe from their stores, blocks built on the
 * product, a row of users being trained. Two figures hand the work along:
 * the strategist (accent) and the engineer (teal).
 */
const X = [100, 250, 400, 550];
const LABELS = ["QUESTION", "DATA", "WORKFLOW", "USERS"];
const SAYS = ["what do they need to answer?", "wire their data in.", "build the workflow on it.", "teach the people using it."];
const WHO = ["STRATEGIST, WITH THE ANALYSTS", "ENGINEER: THE PIPELINE", "BOTH, ON THE PRODUCT", "STRATEGIST OR CONSULTANT"];
// Where each figure stands on each beat.
const STRAT = [X[0] + 34, X[0] + 34, X[2] + 30, X[3] - 56];
const ENG = [X[1] + 40, X[1] + 40, X[2] - 30, X[2] + 10];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 3);
  return (
    <Plate id={id}>
      <path d="M20 352 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* 1. The question, on the whiteboard. */}
      <Lit on={s === 0} off={0.4}>
        <rect x={X[0] - 60} y={150} width={92} height={80} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
        <text x={X[0] - 14} y={210} textAnchor="middle" className="ill-mono" fontSize={52} fontWeight={700} fill={D.accent}>?</text>
      </Lit>

      {/* 2. The data: stores piped into one line. */}
      <Lit on={s === 1} off={0.4}>
        {[0, 1].map((i) => (
          <g key={i}>
            <ellipse cx={X[1] - 40} cy={168 + i * 56} rx={22} ry={8} fill={D.paperDeep} stroke={D.ink} strokeWidth={3} />
            <path d={`M${X[1] - 62} ${168 + i * 56} V${196 + i * 56} M${X[1] - 18} ${168 + i * 56} V${196 + i * 56}`} stroke={D.ink} strokeWidth={3} />
            <path d={`M${X[1] - 62} ${196 + i * 56} Q${X[1] - 40} ${206 + i * 56} ${X[1] - 18} ${196 + i * 56}`} fill={D.paperDeep} stroke={D.ink} strokeWidth={3} />
          </g>
        ))}
        <path d={`M${X[1] - 18} 184 C ${X[1] + 10} 184, ${X[1]} 214, ${X[1] + 30} 214 M${X[1] - 18} 240 C ${X[1] + 10} 240, ${X[1]} 214, ${X[1] + 30} 214 H${X[1] + 60}`} fill="none" stroke={D.teal} strokeWidth={5} strokeLinecap="round" />
      </Lit>

      {/* 3. The workflow, built on the product. */}
      <Lit on={s === 2} off={0.4}>
        <rect x={X[2] - 40} y={218} width={80} height={30} fill={D.teal} stroke={D.ink} strokeWidth={3.5} />
        <rect x={X[2] - 30} y={188} width={60} height={30} fill={D.paperDeep} stroke={D.ink} strokeWidth={3.5} />
        <rect x={X[2] - 18} y={158} width={36} height={30} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
      </Lit>

      {/* 4. The users, being trained. */}
      <Lit on={s === 3} off={0.4}>
        {[0, 34].map((dx) => (
          <g key={dx}>
            <Torso x={X[3] + dx} y={330} w={28} h={22} fill={D.grey} />
            <Head x={X[3] + dx} y={312} r={13} eyes="sleepy" look={-1} mouth="flat" />
          </g>
        ))}
        <rect x={X[3] - 20} y={170} width={84} height={56} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
        <path d={`M${X[3] - 8} 190 H${X[3] + 50} M${X[3] - 8} 208 H${X[3] + 30}`} stroke={D.greyLight} strokeWidth={4} strokeLinecap="round" />
      </Lit>

      {LABELS.map((t, i) => (
        <g key={t} style={{ opacity: s === i ? 1 : 0.45, transition: "opacity .35s" }}>{mono(X[i], 128, t, 18, s === i ? D.accent : D.ink)}</g>
      ))}

      {/* The engineer and the strategist, handing the work along. */}
      <At x={ENG[s]} y={0}>
        <g style={{ opacity: s === 0 ? 0.35 : 1, transition: "opacity .35s" }}>
          <Torso x={0} y={322} w={38} h={30} fill={D.teal} />
          <Head x={0} y={302} r={17} eyes="sleepy" look={1} mouth="flat" stubble hair="sides" />
        </g>
      </At>
      <At x={STRAT[s]} y={0}>
        <g style={{ opacity: s === 1 ? 0.35 : 1, transition: "opacity .35s" }}>
          <Torso x={0} y={322} w={38} h={30} fill={D.accent} />
          <Head x={0} y={302} r={17} eyes="sleepy" look={-1} mouth="flat" hair="sides" />
        </g>
      </At>

      {hand(320, 64, SAYS[s], 26, s === 3 ? D.accent : D.grey)}
      {mono(320, 404, WHO[s], 18, D.accent)}
    </Plate>
  );
}
