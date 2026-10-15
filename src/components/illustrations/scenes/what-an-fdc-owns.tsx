import React from "react";
import { D, Head, Torso } from "../deadpan";
import { At, Lit, Plate, SceneProps, hand, mono } from "./kit";

/**
 * What an FDC owns, as a walk through five stations on one floor: a target
 * (the result), a process sheet with one step crossed out and redrawn, a
 * stack of built blocks, a row of people now using it, and a binder handed
 * over at the door. The consultant walks the line; each beat lights one.
 */
const X = [70, 190, 310, 430, 550];
const LABELS = ["RESULT", "PROCESS", "BUILD", "ADOPT", "HANDOFF"];
const SAYS = ["what did they buy it for?", "fix the process first.", "then build on it.", "real people, real work.", "and leave it runnable."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 4);
  return (
    <Plate id={id}>
      <path d="M20 352 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* 1. The result: a target. */}
      <Lit on={s === 0} off={0.4}>
        {[34, 22, 10].map((r, i) => (
          <circle key={r} cx={X[0]} cy={200} r={r} fill={i % 2 ? "#fff" : D.accent} stroke={D.ink} strokeWidth={3.5} />
        ))}
      </Lit>

      {/* 2. The process, redrawn before building. */}
      <Lit on={s === 1} off={0.4}>
        <rect x={X[1] - 40} y={160} width={80} height={86} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
        <path d={`M${X[1] - 26} 180 H${X[1] + 26} M${X[1] - 26} 204 H${X[1] + 26} M${X[1] - 26} 228 H${X[1] + 10}`} stroke={D.greyLight} strokeWidth={4} strokeLinecap="round" />
        <path d={`M${X[1] - 30} 194 L${X[1] + 30} 214`} stroke={D.accent} strokeWidth={4} strokeLinecap="round" />
      </Lit>

      {/* 3. Built: blocks on the product. */}
      <Lit on={s === 2} off={0.4}>
        <rect x={X[2] - 40} y={218} width={80} height={30} fill={D.teal} stroke={D.ink} strokeWidth={3.5} />
        <rect x={X[2] - 30} y={188} width={60} height={30} fill={D.paperDeep} stroke={D.ink} strokeWidth={3.5} />
        <rect x={X[2] - 18} y={158} width={36} height={30} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
      </Lit>

      {/* 4. Adopted: people at work. */}
      <Lit on={s === 3} off={0.4}>
        {[-30, 0, 30].map((dx) => (
          <g key={dx}>
            <Torso x={X[3] + dx} y={246} w={26} h={22} fill={D.grey} />
            <Head x={X[3] + dx} y={228} r={12} eyes="sleepy" look={0} mouth="flat" />
          </g>
        ))}
      </Lit>

      {/* 5. Handed off: the binder, at the door. */}
      <Lit on={s === 4} off={0.4}>
        <path d={`M${X[4] + 40} 352 V150 H${X[4] + 70} V352`} fill={D.paperDeep} stroke={D.ink} strokeWidth={3.5} />
        <rect x={X[4] - 34} y={180} width={50} height={64} fill={D.leaf} stroke={D.ink} strokeWidth={3.5} />
        <path d={`M${X[4] - 24} 180 V244`} stroke={D.ink} strokeWidth={3} />
      </Lit>

      {LABELS.map((t, i) => (
        <g key={t} style={{ opacity: s === i ? 1 : 0.45, transition: "opacity .35s" }}>{mono(X[i], 132, t, 18, s === i ? D.accent : D.ink)}</g>
      ))}

      {/* The consultant, walking the line. */}
      <At x={X[s]} y={0}>
        <Torso x={0} y={318} w={40} h={34} fill={D.accent} />
        <Head x={0} y={300} r={17} eyes="sleepy" look={1} mouth="flat" hair="sides" />
      </At>

      {hand(320, 70, SAYS[s], 26, s === 4 ? D.accent : D.grey)}
    </Plate>
  );
}
