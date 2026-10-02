import React from "react";
import { D, Head, Torso, Limb } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Payload or shared store. Left: a sealed box handed over, small enough to
 * open and read, and fixed the moment it was taped shut. Right: one shared
 * board that two people read and write. Last: both get the same stamp,
 * because persisting is not the same as being current.
 */
const SAYS = ["sealed. inspectable.", "everyone writes on it.", "both age."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />
      <path d="M320 40 V372" stroke={D.greyLight} strokeWidth={3} strokeDasharray="6 10" />

      {/* Payload: a bounded package, handed across. */}
      <Lit on={s !== 1} off={0.4}>
        <Torso x={92} y={236} w={90} h={136} fill={D.grey} />
        <Head x={92} y={190} r={38} eyes="sleepy" look={1} mouth="flat" stubble hair="messy" />
        <Limb d="M134 282 C 160 284, 180 284, 196 282" fill={D.grey} />
        <rect x={190} y={240} width={110} height={84} fill="#C9B593" stroke={D.ink} strokeWidth={4.5} />
        <path d="M190 266 H300 M245 240 V324" stroke={D.accent} strokeWidth={6} opacity={0.8} />
        {mono(245, 300, "PAYLOAD", 18)}
        {mono(245, 352, "SEALED 10:02", 18, D.greyLight)}
      </Lit>

      {/* Shared store: one board, read and updated by whoever needs it. */}
      <Lit on={s !== 0} off={0.4}>
        <rect x={360} y={70} width={230} height={170} fill="#fff" stroke={D.ink} strokeWidth={4.5} />
        {mono(475, 98, "SHARED", 20)}
        {["STATUS: REVIEW", "OWNER: ?", "V: 3"].map((t, i) => mono(376, 136 + i * 34, t, 18, i === 1 ? D.accent : D.ink, "start"))}
        <Torso x={402} y={286} w={70} h={86} fill={D.teal} />
        <Head x={402} y={254} r={28} eyes="sleepy" look={1} mouth="flat" hair="curly" />
        <Torso x={548} y={286} w={70} h={86} fill={D.grey} />
        <Head x={548} y={254} r={28} eyes="sleepy" look={-1} mouth="flat" hair="sides" />
        <Limb d="M430 300 C 446 270, 456 250, 462 232" fill={D.teal} w={12} />
      </Lit>

      {/* The same stamp on both. */}
      <Show on={s === 2}>
        <g transform="rotate(-10 245 200)">
          <rect x={180} y={180} width={130} height={40} fill="none" stroke={D.accent} strokeWidth={4} />
          {mono(245, 208, "STALE?", 22, D.accent)}
        </g>
        <g transform="rotate(8 475 184)">
          <rect x={410} y={164} width={130} height={40} fill="none" stroke={D.accent} strokeWidth={4} />
          {mono(475, 192, "STALE?", 22, D.accent)}
        </g>
      </Show>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 1 ? 475 : i === 0 ? 160 : 320, i === 0 ? 120 : 52, t, 28, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["PAYLOAD HANDOFF", "SHARED STORE", "PERSISTED IS NOT CURRENT"][s], 18, D.accent)}
    </Plate>
  );
}
