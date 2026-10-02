import React from "react";
import { D, Head, Torso, Limb } from "../deadpan";
import { At, Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Five words for ready. A box with an empty READY FOR label. Then the five
 * stickers that get slapped on in its place, one after another. Then a
 * magnifier over them: each says what someone called it.
 */
const STICKERS = [
  { t: "TESTED", x: 170, y: 150, r: -8 },
  { t: "APPROVED", x: 300, y: 138, r: 5 },
  { t: "DEPLOYED", x: 200, y: 214, r: 4 },
  { t: "OBSERVABLE", x: 330, y: 206, r: -5 },
  { t: "GOVERNED", x: 262, y: 276, r: -2 },
];
const SAYS = ["ready for what?", "very labelled.", "what was checked?"];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The box, and the one label that matters. */}
      <path d="M110 110 L380 110 L400 330 L90 330 Z" fill="#C9B593" stroke={D.ink} strokeWidth={4.5} strokeLinejoin="round" />
      <path d="M110 110 L150 80 H420 L380 110 M420 80 L440 300 L400 330" fill={D.paperDeep} stroke={D.ink} strokeWidth={4.5} strokeLinejoin="round" />
      <Lit on={s === 0 || s === 2} off={0.5}>
        <rect x={130} y={300} width={230} height={26} fill="#fff" stroke={D.ink} strokeWidth={3} />
        {mono(140, 320, "READY FOR: ________", 18, D.accent, "start")}
      </Lit>

      {/* The stickers, slapped on one after another. */}
      {STICKERS.map((k, i) => (
        <At key={k.t} s={s >= 1 ? 1 : 0.4} o={s >= 1 ? 1 : 0} delay={s === 1 ? i * 0.12 : 0}>
          <g transform={`rotate(${k.r} ${k.x} ${k.y})`}>
            <rect x={k.x - k.t.length * 6.5 - 10} y={k.y - 22} width={k.t.length * 13 + 20} height={34} rx={4} fill={i % 2 ? "#F6E7A8" : "#fff"} stroke={D.ink} strokeWidth={3} />
            {mono(k.x, k.y + 1, k.t, 18, s === 2 ? D.greyLight : D.ink)}
          </g>
        </At>
      ))}

      {/* The buyer, and the magnifier. */}
      <Torso x={540} y={240} w={100} h={132} fill={D.grey} />
      <Head x={540} y={192} r={40} eyes={s === 2 ? "tt" : "sleepy"} look={-1} mouth="flat" stubble hair="sides" />
      <Show on={s === 2}>
        <Limb d="M494 280 C 460 270, 430 250, 410 236" fill={D.grey} />
        <circle cx={380} cy={216} r={34} fill="#fff" fillOpacity={0.35} stroke={D.ink} strokeWidth={4.5} />
        <path d="M404 240 L420 258" stroke={D.ink} strokeWidth={7} strokeLinecap="round" />
      </Show>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(540, 110, t, 28, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["READINESS: FOR A PARTICULAR USE", "OFFERED IN ITS PLACE", "FIND WHAT WAS ACTUALLY CHECKED"][s], 18, D.accent)}
    </Plate>
  );
}
