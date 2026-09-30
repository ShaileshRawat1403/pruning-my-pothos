import React from "react";
import { D, LINE } from "../deadpan";
import { At, Lit, Plate, SceneProps, hand, mono } from "./kit";

/**
 * An instruction and a contract. The same wrong-shaped output leaves the
 * megaphone twice: once with nothing in its way, once with a check that
 * software can apply. The check only knows shapes.
 */
function Out({ text, w = 116 }: { text: string; w?: number }) {
  return (
    <g>
      <rect x={-w / 2} y={-28} width={w} height={56} fill="#fff" stroke={D.ink} strokeWidth={4} />
      {mono(0, 7, text, 19)}
    </g>
  );
}

export default function Scene({ step, id }: SceneProps) {
  const gate = step >= 1;
  return (
    <Plate id={id}>
      <path d="M20 352 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The instruction. */}
      <Lit on={step !== 1} off={0.5}>
        <path d="M36 200 L112 164 V262 L36 228 Z" fill={D.accent} stroke={D.ink} strokeWidth={4.5} strokeLinejoin="round" />
        <path d="M130 172 L152 160 M134 212 H162 M130 252 L152 264" stroke={D.accent} strokeWidth={4} strokeLinecap="round" />
      </Lit>

      {/* The contract: a gap cut to one shape. */}
      <g style={{ opacity: gate ? 1 : 0, transition: "opacity .35s" }}>
        <rect x={372} y={70} width={36} height={112} fill={D.paperDeep} stroke={D.ink} strokeWidth={4.5} />
        <rect x={372} y={246} width={36} height={106} fill={D.paperDeep} stroke={D.ink} strokeWidth={4.5} />
        {mono(390, 52, "{ }", 22, D.teal)}
      </g>

      {/* The output that does not fit. */}
      <At x={!gate ? 510 : 286} y={!gate ? 214 : 318} r={!gate ? 0 : -12}>
        <Out text="{ maybe" />
        {gate && <path d="M-50 -14 L50 14" stroke={D.accent} strokeWidth={5} strokeLinecap="round" />}
      </At>
      {/* The output that does. */}
      <At x={gate ? 512 : 200} y={214} o={gate ? 1 : 0} delay={0.2}>
        <Out text='{"ok":1}' />
      </At>

      <g style={{ opacity: step === 2 ? 1 : 0, transition: "opacity .35s" }}>
        {hand(472, 120, "caught here", 28, D.accent)}
        <path d="M428 130 Q 412 150 404 176" {...LINE} stroke={D.accent} strokeWidth={3.5} />
      </g>

      {mono(320, 392, ["NOTHING CHECKS IT", "SOFTWARE CHECKS THE SHAPE", "WHERE THE FAILURE IS CAUGHT"][Math.min(step, 2)], 18, D.accent)}
    </Plate>
  );
}
