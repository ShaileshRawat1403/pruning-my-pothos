import React from "react";
import { D, LINE, Head } from "../deadpan";
import { At, Lit, Page, Plate, SceneProps, mono } from "./kit";

/**
 * Three kinds of human involvement, with the same man in the same chair.
 * Present: the work has already gone by. Approval: it waits for his one
 * button. Judgment: he can see it, he has a second lever, and the second
 * lever goes somewhere.
 */
export default function Scene({ step, id }: SceneProps) {
  return (
    <Plate id={id}>
      <path d="M20 352 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />
      <path d="M20 118 H620" {...LINE} strokeWidth={4} />
      {[60, 160, 260, 360, 460, 560].map((x) => (
        <circle key={x} cx={x} cy={127} r={7} fill={D.greyLight} stroke={D.ink} strokeWidth={3} />
      ))}

      {/* The man and his chair never change. */}
      <path d="M150 352 L166 286 H246 L262 352 M140 286 H272" {...LINE} strokeWidth={5} />
      <path d="M166 286 L176 214 C 180 196 196 190 206 190 C 216 190 232 196 236 214 L246 286 Z" fill={D.grey} stroke={D.ink} strokeWidth={4.5} strokeLinejoin="round" />
      <Head x={206} y={158} r={34} eyes="sleepy" look={0.8} stubble />

      {/* Present: it already went by. He is told. */}
      <Lit on={step === 0} off={0}>
        <path d="M520 118 V170 H606 V118" {...LINE} strokeWidth={4.5} />
        {mono(563, 196, "DONE", 18, D.greyLight)}
        <g transform="rotate(-8 300 190)">
          <rect x={268} y={172} width={64} height={40} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
          <path d="M268 172 L300 196 L332 172" {...LINE} strokeWidth={3} />
        </g>
        {mono(300, 240, "FYI", 18, D.greyLight)}
      </Lit>

      {/* Approval: a stop, and one button. */}
      <Lit on={step === 1} off={0}>
        <rect x={238} y={66} width={10} height={52} fill={D.accent} stroke={D.ink} strokeWidth={3.5} />
        <path d="M330 352 V300" {...LINE} strokeWidth={6} />
        <circle cx={330} cy={286} r={20} fill={D.accent} stroke={D.ink} strokeWidth={4.5} />
        {mono(330, 250, "APPROVE", 18)}
      </Lit>

      {/* Judgment: two levers, and the second one leads somewhere. */}
      <Lit on={step === 2} off={0}>
        {[
          { x: 416, t: "YES", c: D.leaf },
          { x: 496, t: "NO", c: D.accent },
        ].map((l) => (
          <g key={l.t}>
            <rect x={l.x - 22} y={318} width={44} height={34} fill={D.greyLight} stroke={D.ink} strokeWidth={4} />
            <path d={`M${l.x} 318 L${l.x + 10} 280`} {...LINE} strokeWidth={6} />
            <circle cx={l.x + 11} cy={276} r={8} fill={l.c} stroke={D.ink} strokeWidth={3.5} />
            {mono(l.x, 252, l.t, 18)}
          </g>
        ))}
        <path d="M520 336 H600 Q614 336 614 322 V160" fill="none" stroke={D.accent} strokeWidth={4} strokeDasharray="8 8" strokeLinecap="round" />
        <path d="M604 172 L614 156 L624 172" {...LINE} stroke={D.accent} strokeWidth={4} />
      </Lit>

      {/* The work itself. */}
      <At x={step === 0 ? 563 : step === 1 ? 206 : 330} y={step === 0 ? 144 : step === 1 ? 97 : 176}>
        {step === 2 ? (
          <Page w={62} h={80} lines={5} />
        ) : (
          <g>
            <rect x={-22} y={-18} width={44} height={36} rx={2} fill="#fff" stroke={D.ink} strokeWidth={4} />
            <path d="M-22 -4 H22" stroke={D.accent} strokeWidth={4} />
          </g>
        )}
      </At>

      {mono(320, 392, ["TOLD AFTERWARDS", "A SIGNAL IS REQUIRED", "STILL OPEN, AND HE CAN SAY NO"][Math.min(step, 2)], 18, D.accent)}
    </Plate>
  );
}
