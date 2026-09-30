import React from "react";
import { D } from "../deadpan";
import { At, Lit, Plate, SceneProps, bare, hand, mono } from "./kit";

/**
 * Text becomes integers. The same three pieces stay on the board throughout:
 * one phrase, then cut, then looked up, then numbers. The phrase, the pieces
 * and the ids are the article's own (its visual says the ids are invented).
 */
export default function Scene({ step, steps, id }: SceneProps) {
  const phrase = bare(steps[0]?.title ?? "");
  const pieces = (steps[1]?.body ?? phrase).split(" · ");
  const ids = (steps[steps.length - 1]?.title ?? "").split(" · ");
  const widths = pieces.map((p) => 44 + p.length * 22);
  const gap = step === 0 ? 0 : 24;
  const total = widths.reduce((a, b) => a + b, 0) + gap * (pieces.length - 1);
  const xs = widths.map((_, i) => 320 - total / 2 + widths.slice(0, i).reduce((a, b) => a + b, 0) + gap * i);
  const whole = widths.reduce((a, b) => a + b, 0);

  return (
    <Plate id={id}>
      <rect x={70} y={286} width={500} height={28} rx={6} fill="#C9A77C" stroke={D.ink} strokeWidth={4} />

      {/* The vocabulary: one row per piece. */}
      <Lit on={step === 2} off={step === 3 ? 0.3 : 0}>
        <rect x={190} y={34} width={260} height={28 + pieces.length * 30} rx={4} fill="#fff" stroke={D.ink} strokeWidth={4} />
        <path d={`M320 34 V${62 + pieces.length * 30}`} stroke={D.greyLight} strokeWidth={3} />
        {pieces.map((p, i) => (
          <g key={p}>
            {mono(255, 68 + i * 30, p, 19)}
            {mono(385, 68 + i * 30, ids[i] ?? "", 19, D.teal)}
          </g>
        ))}
        {pieces.map((p, i) => (
          <path key={p} d={`M${xs[i] + widths[i] / 2} 216 V${190 - (pieces.length - 1 - i) * 0}`} stroke={D.ink} strokeWidth={3} strokeDasharray="5 7" strokeLinecap="round" />
        ))}
      </Lit>

      <g style={{ opacity: step === 0 ? 1 : 0, transition: "opacity .15s" }}>
        <rect x={320 - whole / 2} y={220} width={whole} height={70} rx={30} fill="#D98F7A" stroke={D.ink} strokeWidth={4} />
        {mono(320, 264, phrase, 26)}
      </g>
      {pieces.map((p, i) => (
        <At key={p} x={xs[i]} y={step === 3 ? -6 : 0} o={step === 0 ? 0 : 1}>
          <rect x={0} y={220} width={widths[i]} height={70} rx={30} fill={step === 3 ? "#fff" : "#D98F7A"} stroke={D.ink} strokeWidth={4} style={{ transition: "fill .4s" }} />
          {mono(widths[i] / 2, 264, step === 3 ? (ids[i] ?? "") : p, 26, step === 3 ? D.teal : D.ink)}
        </At>
      ))}

      {hand(320, 372, ["what you typed", "cut into pieces", "each piece has a number", "what the model receives"][Math.min(step, 3)], 28, D.accent)}
    </Plate>
  );
}
