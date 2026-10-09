import React from "react";
import { D, Head, Torso } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Before anything runs. A request slip arrives at a counter: REFUND_ORDER,
 * A-3391, 40. The clerk works down a checklist: is that a tool we have; do
 * the order and the amount check out; may this person, now; and what if the
 * till jams. One line lights per step, the slip waiting the whole time.
 */
const CHECKS = ["TOOL EXISTS?", "ARGUMENTS HOLD UP?", "ALLOWED, NOW?", "IF IT FAILS?"];
const SAYS = ["a name is not a tool.", "A-3391 exists? 40 in range?", "a separate question.", "timeouts happen. plan for them."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 3);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The request slip. */}
      <rect x={40} y={70} width={200} height={110} fill="#F6E7A8" stroke={D.ink} strokeWidth={3.5} />
      {mono(140, 100, "refund_order", 18)}
      {mono(140, 128, "order: A-3391", 18, D.grey)}
      {mono(140, 156, "amount: 40", 18, D.grey)}

      {/* The clerk and the checklist. */}
      <rect x={30} y={250} width={260} height={18} fill={D.paperDeep} stroke={D.ink} strokeWidth={4} />
      <Torso x={210} y={300} w={70} h={72} fill={D.grey} />
      <Head x={210} y={276} r={26} eyes="sleepy" look={1} mouth="flat" stubble hair="sides" />
      <rect x={330} y={60} width={280} height={260} fill="#fff" stroke={D.ink} strokeWidth={4} />
      {mono(470, 90, "BEFORE IT RUNS", 18, D.teal)}
      {CHECKS.map((c, i) => (
        <Lit key={c} on={s === i} off={s > i ? 0.7 : 0.25}>
          <rect x={346} y={110 + i * 50} width={22} height={22} fill="none" stroke={D.ink} strokeWidth={2.5} />
          {s > i && <path d={`M350 ${121 + i * 50} l5 6 l10 -12`} fill="none" stroke={D.leaf} strokeWidth={3} strokeLinecap="round" />}
          {mono(380, 128 + i * 50, c, 18, D.ink, "start")}
        </Lit>
      ))}

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(470, 350, t, 22, D.accent)}
        </Show>
      ))}
      {mono(320, 404, ["IS IT A TOOL YOU EXPOSE?", "DO THE ARGUMENTS HOLD UP?", "SHOULD IT RUN AT ALL?", "WHAT HAPPENS WHEN IT FAILS?"][s], 18, D.accent)}
    </Plate>
  );
}
