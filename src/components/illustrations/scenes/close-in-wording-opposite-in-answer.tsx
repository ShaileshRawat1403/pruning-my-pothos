import React from "react";
import { D, LINE } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Close in wording, opposite in answer. The two questions from the article,
 * one above the other, each with the kind of answer it needs. Then a cache
 * that files them as one and hands the first answer to the second.
 */
function Asked({ y, text }: { y: number; text: string }) {
  return (
    <g>
      <rect x={24} y={y} width={396} height={54} rx={8} fill="#fff" stroke={D.ink} strokeWidth={4} />
      {mono(222, y + 34, text, 18)}
    </g>
  );
}

export default function Scene({ step, steps, id }: SceneProps) {
  const reused = step >= 2;
  return (
    <Plate id={id}>
      <Lit on={step === 0 || reused} off={0.45}>
        <Asked y={70} text={steps[0]?.title ?? ""} />
        <rect x={470} y={66} width={146} height={62} fill="#F6E7A8" stroke={D.ink} strokeWidth={4} />
        {mono(543, 104, "STEPS 1-4", 18)}
      </Lit>

      <Lit on={step === 1 || reused} off={0.45}>
        <Asked y={250} text={steps[1]?.title ?? ""} />
        <g style={{ opacity: reused ? 0.25 : 1, transition: "opacity .3s" }}>
          <rect x={470} y={246} width={146} height={62} fill="#fff" stroke={D.ink} strokeWidth={4} />
          {hand(543, 290, "no.", 40, D.accent)}
        </g>
      </Lit>

      <Show on={reused}>
        <path d="M543 134 V236 M529 220 L543 238 L557 220" {...LINE} stroke={D.accent} strokeWidth={5} />
        <g transform="rotate(-8 300 190)">
          <rect x={236} y={166} width={128} height={48} rx={4} fill="#fff" stroke={D.accent} strokeWidth={5} />
          {mono(300, 198, "SAME", 22, D.accent)}
        </g>
      </Show>

      {mono(320, 376, ["WANTS INSTRUCTIONS", "WANTS A JUDGEMENT", "ANSWERED WITH THE FIRST ONE"][Math.min(step, 2)], 18, D.accent)}
    </Plate>
  );
}
