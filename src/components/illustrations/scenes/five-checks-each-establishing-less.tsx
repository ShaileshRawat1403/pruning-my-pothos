import React from "react";
import { D, LINE } from "../deadpan";
import { At, Plate, SceneProps, Tick, mono } from "./kit";

/**
 * Five checks. One response goes through five doors. Each door only asks its
 * own question, which is why getting through the first tells you nothing
 * about the fourth.
 */
const SHORT = ["PARSE", "SCHEMA", "MEANING", "ALLOWED", "RAN"];
const SAYS = ["IT CAN BE READ", "IT HAS THE SHAPE", "THE VALUES MAKE SENSE", "IT IS PERMITTED", "SOMETHING HAPPENED"];

export default function Scene({ step, id }: SceneProps) {
  return (
    <Plate id={id}>
      <path d="M20 330 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />
      {SHORT.map((t, i) => {
        const x = 70 + i * 118;
        return (
          <g key={t} style={{ opacity: step === i ? 1 : step > i ? 0.6 : 0.3, transition: "opacity .3s" }}>
            <path d={`M${x - 34} 330 V170 Q ${x} 130 ${x + 34} 170 V330`} {...LINE} strokeWidth={5} fill={step === i ? "#F6E7A8" : "none"} />
            {mono(x, 118, t, 18)}
            <Tick x={x} y={90} on={step > i} />
          </g>
        );
      })}
      <At x={70 + Math.min(step, 4) * 118} y={262}>
        <rect x={-26} y={-34} width={52} height={68} fill="#fff" stroke={D.ink} strokeWidth={4} />
        <path d="M-14 -16 H14 M-14 -2 H8 M-14 12 H14" stroke={D.greyLight} strokeWidth={3} strokeLinecap="round" />
      </At>
      {mono(320, 384, SAYS[Math.min(step, 4)], 18, D.accent)}
    </Plate>
  );
}
