import React from "react";
import { D } from "../deadpan";
import { At, Plate, SceneProps, Show, Tick, hand, mono } from "./kit";

/**
 * Local success is not system success. The tower from the cover, built one
 * true fact at a time. Every block earns its tick. The tower still leans.
 */
const SHORT = ["RETRIEVAL", "MODEL", "SCHEMA", "API", "STATE", "LOG"];

export default function Scene({ step, steps, id }: SceneProps) {
  const last = step >= steps.length - 1;
  return (
    <Plate id={id}>
      <path d="M40 366 H600" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />
      <g style={{ transformBox: "fill-box", transformOrigin: "50% 100%", transform: `rotate(${last ? 5 : 0}deg)`, transition: "transform .7s cubic-bezier(.3,1.3,.5,1) .15s" }}>
        {steps.map((s, i) => (
          <At key={s.id} x={170 + (i % 2) * 8} y={step >= i ? 316 - i * 50 : 250 - i * 50} o={step >= i ? 1 : 0}>
            <rect x={0} y={0} width={210} height={46} rx={4} fill={i % 2 ? D.shirt : "#E2C9A0"} stroke={D.ink} strokeWidth={4.5} style={{ opacity: step === i || last ? 1 : 0.6, transition: "opacity .3s" }} />
            {mono(86, 30, SHORT[i] ?? "", 18)}
            <Tick x={182} y={24} on={step >= i} />
          </At>
        ))}
      </g>
      <Show on={last}>
        {hand(516, 150, "all true.", 30, D.ink)}
        {hand(516, 186, "still wrong.", 30, D.accent)}
      </Show>
      <Show on={!last}>{mono(320, 398, "TRUE, AS FAR AS IT GOES", 18, D.accent)}</Show>
    </Plate>
  );
}
