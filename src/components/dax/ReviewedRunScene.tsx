import React from "react";
import { D, Head, Torso } from "../illustrations/deadpan";
import { Stamp, Slip } from "../illustrations/props";
import { Lit, Plate, SceneProps, Show, Tick, hand, mono } from "../illustrations/scenes/kit";

/**
 * DAX 2.0 reviewed run, as a scroll scene. Left: the grant, a sheet listing
 * what the run may do. The operator stamps exactly that sheet; the run box
 * lights only when it is started; a request the sheet does not cover is
 * stamped DENIED and the ledger line is written before anything happens.
 * Everything drawn is in the v2.0.0 changelog.
 */
const GRANT = ["read", "edit src/**", "run tests"];

export default function ReviewedRunScene({ step, id }: SceneProps) {
  const s = Math.min(step, 3);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The grant. */}
      <Lit on={s === 0 || s === 1} off={0.45}>
        <g transform="rotate(-2 150 190)">
          <rect x={40} y={70} width={220} height={230} fill="#fff" stroke={D.ink} strokeWidth={5} />
          {mono(150, 104, "GRANT", 22, D.teal)}
          {GRANT.map((t, i) => hand(62, 150 + i * 40, "· " + t, 26, D.ink, "start"))}
        </g>
      </Lit>
      <Show on={s >= 1}>
        <Stamp x={84} y={262} text="APPROVED" w={150} size={20} rotate={-10} color={D.leaf} />
      </Show>

      {/* The operator who approves it. */}
      <Lit on={s === 1} off={0.3}>
        <Torso x={318} y={330} w={56} h={42} fill={D.grey} />
        <Head x={318} y={306} r={22} eyes="sleepy" look={-1} mouth="flat" stubble hair="sides" />
      </Lit>

      {/* The run: dark until it is started. */}
      <Lit on={s >= 2} off={0.3}>
        <rect x={400} y={80} width={200} height={130} fill={s >= 2 ? D.face : D.paperDeep} stroke={D.ink} strokeWidth={5} />
        {mono(500, 120, "RUN", 22, D.ink)}
        {mono(500, 160, s >= 2 ? "STARTED" : "NOT STARTED", 18, s >= 2 ? D.teal : D.greyLight)}
        <Tick x={500} y={190} on={s === 2} />
      </Lit>
      <Show on={s === 2}>
        <path d="M268 150 C320 120 350 120 392 140" fill="none" stroke={D.teal} strokeWidth={4} strokeDasharray="10 8" strokeLinecap="round" />
      </Show>

      {/* A request the grant does not cover. */}
      <Show on={s === 3}>
        <Slip x={410} y={222} text="shell: curl" w={170} h={50} size={18} rotate={4} color={D.accent} />
        <Stamp x={480} y={266} text="DENIED" w={120} size={22} rotate={-8} color={D.accent} />
        <rect x={344} y={322} width={280} height={40} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
        {mono(480, 348, "LEDGER: denial recorded", 18, D.ink)}
      </Show>

      {hand(320, 40, ["what the run may do", "this grant, exactly", "approval alone starts nothing", "recorded before any effect"][s], 26, s === 3 ? D.accent : D.grey)}
    </Plate>
  );
}
