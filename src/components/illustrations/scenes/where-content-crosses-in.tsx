import React from "react";
import { D, Head, Torso } from "../deadpan";
import { At, Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Where content crosses in. Inside the room, the operator writes one short
 * note: the request. Through the mail slot, everything else pours in: an
 * email, a web page, a document, a database row, a tool's own description,
 * a tool's output. Last, the wall itself is labelled: the trust boundary.
 */
const INCOMING = [
  { t: "EMAIL", x: 470, y: 90 },
  { t: "WEB PAGE", x: 560, y: 150 },
  { t: "DOC", x: 470, y: 200 },
  { t: "DB ROW", x: 560, y: 250 },
  { t: "TOOL DESC", x: 470, y: 300 },
  { t: "TOOL OUTPUT", x: 560, y: 340 },
];
const SAYS = ["i wrote this bit.", "nobody wrote this bit. well, somebody.", "who wrote this?"];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The wall, with a mail slot. */}
      <Lit on={s === 2} off={0.55}>
        <rect x={370} y={40} width={24} height={332} fill="#C9B593" stroke={D.ink} strokeWidth={4} />
        <rect x={366} y={196} width={32} height={14} fill={D.ink} />
        <Show on={s === 2}>{mono(382, 30, "TRUST BOUNDARY", 18, D.accent)}</Show>
      </Lit>

      {/* Inside: the operator, and the one note they wrote. */}
      <Lit on={s !== 1} off={0.45}>
        <Torso x={110} y={236} w={96} h={136} fill={D.teal} />
        <Head x={110} y={190} r={38} eyes="sleepy" look={1} mouth="flat" hair="curly" />
        <g transform="rotate(-4 240 210)">
          <rect x={186} y={178} width={110} height={64} fill="#F6E7A8" stroke={D.ink} strokeWidth={3.5} />
          {mono(241, 208, "REQUEST", 18)}
          <path d="M200 224 H282" stroke={D.greyLight} strokeWidth={3} strokeLinecap="round" />
        </g>
      </Lit>

      {/* Outside: everything else, arriving. */}
      {INCOMING.map((c, i) => (
        <At key={c.t} x={s >= 1 ? 0 : 60} o={s >= 1 ? 1 : 0.15} delay={s === 1 ? i * 0.08 : 0}>
          <Lit on={s === 1} off={0.6}>
            <rect x={c.x - 58} y={c.y - 18} width={116} height={32} rx={3} fill="#fff" stroke={D.ink} strokeWidth={3} />
            {mono(c.x, c.y + 4, c.t, 18, D.ink)}
          </Lit>
        </At>
      ))}

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 1 ? 470 : 190, i === 1 ? 52 : i === 2 ? 110 : 120, t, i === 1 ? 22 : 26, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["WHAT THE OPERATOR WROTE", "FROM SOMEWHERE THEY DO NOT CONTROL", "PROVENANCE, NOT DANGER"][s], 18, D.accent)}
    </Plate>
  );
}
