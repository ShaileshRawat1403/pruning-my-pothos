import React from "react";
import { D, Head, Torso, Limb } from "../deadpan";
import { At, Lit, Plate, SceneProps, Show, Tick, hand, mono } from "./kit";

/**
 * 200 and unchanged. The tool hands back a big green 200 OK. Behind it, the
 * ledger says exactly what it said before, and a letter comes back BOUNCED.
 * Then someone opens the ledger and reads the line. Last, two stamps side by
 * side: REPORTED and SHOWN.
 */
const SAYS = ["done, it says.", "checked the ledger.", "reported. shown."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The response. */}
      <Lit on={s === 0 || s === 2} off={0.4}>
        <rect x={50} y={110} width={190} height={110} rx={8} fill="#fff" stroke={D.ink} strokeWidth={4.5} />
        {mono(145, 160, "200 OK", 32, D.leaf)}
        {mono(145, 196, "TOOL RESPONSE", 18, D.greyLight)}
      </Lit>

      {/* The state: the ledger, and the letter. */}
      <Lit on={s === 1 || s === 2} off={0.45}>
        <rect x={330} y={100} width={250} height={170} fill="#fff" stroke={D.ink} strokeWidth={4.5} />
        {mono(455, 130, "LEDGER", 20)}
        {mono(350, 172, "BEFORE:  40", 18, D.ink, "start")}
        {mono(350, 204, "AFTER:   40", 18, s >= 1 ? D.accent : D.ink, "start")}
        <path d="M350 214 H500" stroke={s >= 1 ? D.accent : "none"} strokeWidth={3} />
        <At x={s >= 1 ? 0 : -30} o={s >= 1 ? 1 : 0}>
          <g transform="rotate(8 520 300)">
            <rect x={470} y={282} width={110} height={44} fill="#fff" stroke={D.ink} strokeWidth={3} />
            {mono(525, 310, "BOUNCED", 18, D.accent)}
          </g>
        </At>
      </Lit>

      {/* Whoever checks. */}
      <Torso x={270} y={290} w={70} h={82} fill={D.teal} />
      <Head x={270} y={258} r={30} eyes={s === 1 ? "tt" : "sleepy"} look={s === 0 ? -1 : 1} mouth="flat" hair="curly" />
      <Show on={s === 1}>
        <Limb d="M300 300 C 320 280, 334 250, 346 220" fill={D.teal} w={12} />
      </Show>

      <Show on={s === 2}>
        <g transform="rotate(-6 145 270)">
          <rect x={80} y={250} width={130} height={38} fill="#fff" stroke={D.greyLight} strokeWidth={3.5} />
          {mono(145, 276, "REPORTED", 18, D.greyLight)}
        </g>
        <g transform="rotate(5 455 64)">
          <rect x={390} y={44} width={130} height={38} fill="#fff" stroke={D.leaf} strokeWidth={3.5} />
          {mono(455, 70, "SHOWN", 18, D.leaf)}
        </g>
        <Tick x={530} y={60} on size={0.9} />
      </Show>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i && i !== 2}>
          {hand(i === 0 ? 145 : 455, 70, t, 26, D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["THE CALL REPORTS SUCCESS", "VERIFICATION CHECKS THE STATE", "EVIDENCED, NOT STATED"][s], 18, D.accent)}
    </Plate>
  );
}
