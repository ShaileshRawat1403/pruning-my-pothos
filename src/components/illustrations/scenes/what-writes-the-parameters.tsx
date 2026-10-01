import React from "react";
import { D, LINE, Head, Torso } from "../deadpan";
import { At, Lit, Plate, SceneProps, mono } from "./kit";

/**
 * What writes the parameters. The record press from the cover on one side of
 * a line, the record player on the other. The press cuts the groove; the
 * player only follows it, however many times it plays.
 */
export default function Scene({ step, steps, id }: SceneProps) {
  const label = (steps[0]?.tag ?? "").toUpperCase();
  const reading = step >= 1;
  const both = step >= 2;
  return (
    <Plate id={id}>
      <path d="M20 352 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />
      <path d="M320 64 V352" stroke={D.ink} strokeWidth={4} strokeDasharray="4 12" strokeLinecap="round" />
      {mono(320, 44, label, 18, D.accent)}

      {/* Writes: the press, and the smaller tool that recuts a little. */}
      <Lit on={!reading || both} off={0.4}>
        <At y={reading ? -12 : 0}>
          <rect x={70} y={70} width={170} height={110} rx={6} fill={D.greyLight} stroke={D.ink} strokeWidth={4.5} />
          <rect x={120} y={180} width={70} height={56} fill={D.grey} stroke={D.ink} strokeWidth={4} />
        </At>
        <ellipse cx={155} cy={300} rx={120} ry={36} fill={D.shirt} stroke={D.ink} strokeWidth={4.5} />
        <ellipse cx={155} cy={294} rx={94} ry={26} fill={D.ink} />
        <ellipse cx={155} cy={294} rx={22} ry={7} fill={D.accent} />
        <g style={{ opacity: reading ? 0 : 1, transition: "opacity .3s" }}>
          <path d="M262 236 L236 282" {...LINE} strokeWidth={6} />
          <path d="M254 224 L272 232 L264 250 L246 242 Z" fill={D.accent} stroke={D.ink} strokeWidth={3.5} strokeLinejoin="round" />
        </g>
      </Lit>

      {/* Reads: the same disc, a needle, a listener, and tonight's request. */}
      <Lit on={reading || both} off={0.4}>
        <ellipse cx={470} cy={300} rx={120} ry={36} fill={D.shirt} stroke={D.ink} strokeWidth={4.5} />
        <ellipse cx={470} cy={294} rx={94} ry={26} fill={D.ink} />
        <ellipse cx={470} cy={294} rx={66} ry={18} fill="none" stroke="#3A4652" strokeWidth={3} />
        <ellipse cx={470} cy={294} rx={22} ry={7} fill={D.accent} />
        <g style={{ transformBox: "fill-box", transformOrigin: "100% 0%", transform: `rotate(${reading ? 0 : -18}deg)`, transition: "transform .5s ease" }}>
          <path d="M596 252 L548 270 L516 286" {...LINE} strokeWidth={6} />
          <circle cx={596} cy={252} r={11} fill={D.face} stroke={D.ink} strokeWidth={4} />
        </g>
        <Torso x={500} y={170} w={84} h={70} fill={D.teal} />
        <Head x={500} y={134} r={32} eyes="closed" mouth="smirk" stubble hair="messy" />
        <At x={388} y={reading ? 176 : 150} o={reading ? 1 : 0}>
          <rect x={-30} y={-38} width={60} height={76} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
          <path d="M-18 -18 H18 M-18 -2 H10 M-18 14 H18" stroke={D.greyLight} strokeWidth={3} strokeLinecap="round" />
        </At>
      </Lit>

      {mono(155, 392, "THE GROOVE IS CUT", 18, reading && !both ? D.greyLight : D.accent)}
      {mono(470, 392, "THE GROOVE IS FOLLOWED", 18, reading ? D.accent : D.greyLight)}
      <g style={{ opacity: both ? 1 : 0, transition: "opacity .3s" }}>
        <rect x={262} y={196} width={116} height={40} rx={4} fill="#fff" stroke={D.accent} strokeWidth={4} />
        {mono(320, 222, "ONE WAY", 18, D.accent)}
        <path d="M282 252 H358 M346 242 L360 252 L346 262" fill="none" stroke={D.accent} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </Plate>
  );
}
