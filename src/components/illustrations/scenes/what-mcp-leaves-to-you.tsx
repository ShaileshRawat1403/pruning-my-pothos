import React from "react";
import { D, Head, Torso } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * What MCP leaves to you. Left: the box the standard comes in, with what it
 * covers printed on the side (message format, roles, how things are
 * offered). Right: the house rules taped next to the socket, written by
 * whoever runs the host: ask first, limit what each server sees, do not
 * believe the tool's own label. Last: the line between the two.
 */
const IN = ["MESSAGE FORMAT", "THE THREE ROLES", "HOW TOOLS ARE OFFERED"];
const OUT = ["ask before a tool runs", "limit what each server sees", "don't trust the tool's label"];
const SAYS = ["what the standard covers.", "what it hands back.", "the line is yours to hold."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The standard's box. */}
      <Lit on={s !== 1} off={0.4}>
        <rect x={40} y={90} width={250} height={230} fill="#fff" stroke={D.ink} strokeWidth={5} />
        <path d="M40 90 L70 60 H320 L290 90 M290 90 V320 L320 290 V60" fill={D.paperDeep} stroke={D.ink} strokeWidth={4} strokeLinejoin="round" />
        {mono(165, 124, "MCP", 22, D.teal)}
        {IN.map((t, i) => mono(165, 176 + i * 44, t, 18, D.ink))}
      </Lit>

      {/* The host's own rules, taped up. */}
      <Lit on={s !== 0} off={0.4}>
        <g transform="rotate(3 490 200)">
          <rect x={370} y={90} width={240} height={190} fill="#F6E7A8" stroke={D.ink} strokeWidth={4} />
          {mono(490, 120, "HOST RULES", 18, D.accent)}
          {OUT.map((t, i) => hand(386, 166 + i * 40, "· " + t, 22, D.ink, "start"))}
        </g>
        <Torso x={560} y={330} w={50} h={42} fill={D.grey} />
        <Head x={560} y={308} r={20} eyes="sleepy" look={-1} mouth="flat" stubble hair="sides" />
      </Lit>

      <Show on={s === 2}>
        <path d="M335 40 V360" stroke={D.accent} strokeWidth={4} strokeDasharray="10 8" />
      </Show>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 0 ? 165 : i === 1 ? 490 : 335, i === 2 ? 30 : 40, t, 22, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["STANDARDISED BY MCP", "LEFT TO THE APPLICATION", "THE PROTOCOL CANNOT ENFORCE IT"][s], 18, D.accent)}
    </Plate>
  );
}
