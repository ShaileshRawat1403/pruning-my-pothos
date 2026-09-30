import React from "react";
import { D, LINE } from "../deadpan";
import { At, Lit, Plate, SceneProps, hand, mono } from "./kit";

/**
 * Ready for what. The bridge from the cover, with two things that want to
 * cross it. The sign names the exposure; the bicycle is the narrow use the
 * evidence covers; the lorry is the wider one it does not.
 */
export default function Scene({ step, steps, id }: SceneProps) {
  const at = steps[step]?.id;
  const justified = at === "justified";
  const refused = at === "not-justified";
  const asked = step >= 1;

  return (
    <Plate id={id}>
      {/* Road, bridge, water. */}
      <path d="M20 292 H236 M500 292 H620" {...LINE} strokeWidth={5} />
      <rect x={236} y={282} width={264} height={16} rx={3} fill={D.paperDeep} stroke={D.ink} strokeWidth={4} />
      <path d="M290 298 L284 372 M446 298 L452 372" {...LINE} strokeWidth={4} />
      <path d="M200 356 Q226 344 252 356 T304 356 T356 356 T408 356 T460 356 T512 356" fill="none" stroke={D.teal} strokeWidth={4} strokeLinecap="round" />
      <path d="M230 388 Q256 376 282 388 T334 388 T386 388 T438 388 T490 388" fill="none" stroke={D.teal} strokeWidth={4} strokeLinecap="round" />

      {/* The exposure, named. */}
      <Lit on={step === 0} off={0.5}>
        <path d="M34 292 V196" {...LINE} strokeWidth={5} />
        <rect x={20} y={28} width={216} height={170} rx={5} fill="#fff" stroke={D.ink} strokeWidth={4.5} />
        {["WHICH USERS", "DOING WHAT", "WHAT IS AT STAKE", "HOW FAR IT GOES"].map((t, i) => (
          <g key={t}>{mono(36, 66 + i * 38, t, 18, D.ink, "start")}</g>
        ))}
      </Lit>

      {/* The controls that limit what goes wrong. */}
      <g style={{ opacity: justified ? 1 : 0, transition: "opacity .3s" }}>
        <path d="M324 282 V258 H492 V282 M380 258 V282 M436 258 V282" {...LINE} strokeWidth={3.5} />
      </g>

      {/* Evidence still to gather. */}
      <g style={{ opacity: refused ? 1 : 0, transition: "opacity .3s" }}>
        {[0, 1, 2].map((i) => (
          <rect key={i} x={328 + i * 6 - (i === 2 ? 22 : 0)} y={i === 2 ? 222 : 252} width={40} height={30} fill={D.greyLight} stroke={D.ink} strokeWidth={4} transform={i === 1 ? "translate(44 0)" : undefined} />
        ))}
        {hand(384, 206, "gather the evidence first", 26, D.accent)}
      </g>

      {/* The barrier in front of the wider use. */}
      <g style={{ opacity: justified || refused ? 1 : 0, transition: "opacity .3s" }}>
        <path d="M236 282 V236" {...LINE} strokeWidth={6} />
        <rect x={232} y={230} width={84} height={12} rx={4} fill={D.accent} stroke={D.ink} strokeWidth={3.5} />
      </g>

      {/* The lorry: the wider exposure. */}
      <Lit on={asked && !justified} off={0.5}>
        <rect x={52} y={222} width={86} height={58} rx={4} fill={D.shirt} stroke={D.ink} strokeWidth={4.5} />
        <path d="M138 240 H160 Q170 240 172 250 L176 280 H138 Z" fill={D.accent} stroke={D.ink} strokeWidth={4.5} strokeLinejoin="round" />
        <circle cx={78} cy={284} r={11} fill={D.ink} />
        <circle cx={156} cy={284} r={11} fill={D.ink} />
      </Lit>

      {/* The bicycle: the narrow one. */}
      <At x={justified ? 350 : 0}>
        <Lit on={asked && !refused} off={0.5}>
          <circle cx={196} cy={276} r={13} fill="none" stroke={D.ink} strokeWidth={4} />
          <circle cx={228} cy={276} r={13} fill="none" stroke={D.ink} strokeWidth={4} />
          <path d="M196 276 L208 256 H222 L228 276 M208 256 L214 276 M204 250 H212 M220 248 L224 258" {...LINE} strokeWidth={3.5} />
        </Lit>
      </At>

      <g style={{ opacity: at === "question" ? 1 : 0, transition: "opacity .3s" }}>{hand(368, 236, "?", 72, D.accent)}</g>
    </Plate>
  );
}
