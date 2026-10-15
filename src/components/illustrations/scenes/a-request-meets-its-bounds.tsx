import React from "react";
import { D } from "../deadpan";
import { Stamp } from "../props";
import { At, Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * One request, four checks. A slip ("delete old logs") travels left to right
 * through three gates (ALLOWED?, SCOPE?, BUDGET?), gets one of three stamps
 * (ASK, this time), and the ledger at the end writes a line either way.
 */
const GATES = [
  { x: 190, t: "ALLOWED?" },
  { x: 310, t: "SCOPE?" },
  { x: 430, t: "BUDGET?" },
];
const SLIP_X = [70, 190, 430, 430, 430];
const SAYS = ["it can ask for anything.", "is this tool allowed here?", "in scope, and in budget?", "allow, ask a person, or deny.", "and the decision is written down."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 4);
  return (
    <Plate id={id}>
      <path d="M20 352 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {GATES.map((g, i) => {
        const on = (s === 1 && i === 0) || (s === 2 && i > 0);
        return (
          <Lit key={g.t} on={on} off={0.35}>
            <path d={`M${g.x - 34} 352 V170 H${g.x + 34} V352`} fill="none" stroke={D.ink} strokeWidth={5} strokeLinejoin="round" />
            {mono(g.x, 158, g.t, 18, on ? D.accent : D.ink)}
          </Lit>
        );
      })}

      {/* The request slip. */}
      <At x={SLIP_X[s]} y={0}>
        <g transform="rotate(-4 0 260)">
          <rect x={-56} y={232} width={112} height={50} rx={5} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
          {mono(0, 254, "delete", 18, D.teal)}
          {mono(0, 274, "old logs", 18, D.teal)}
        </g>
      </At>

      {/* Three possible stamps; this request gets ASK. */}
      <Show on={s >= 3}>
        <g opacity={0.3}>
          <Stamp x={516} y={100} text="ALLOW" w={96} size={18} rotate={-6} color={D.leaf} />
        </g>
        <Stamp x={512} y={170} text="ASK" w={96} size={20} rotate={-8} color={D.accent} />
        <g opacity={0.3}>
          <Stamp x={516} y={290} text="DENY" w={96} size={18} rotate={4} color={D.grey} />
        </g>
      </Show>

      <Show on={s === 4}>
        <rect x={60} y={60} width={300} height={44} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
        {mono(210, 89, "LEDGER: asked, logs", 18, D.ink)}
      </Show>

      {hand(320, 40, SAYS[s], 26, s >= 3 ? D.accent : D.grey)}
      {mono(320, 404, ["THE AGENT PROPOSES", "CHECK: WHICH ACTIONS", "CHECK: WHERE, HOW MUCH", "A PERSON DECIDES THIS ONE", "RECORDED, WHATEVER THE OUTCOME"][s], 18, D.accent)}
    </Plate>
  );
}
