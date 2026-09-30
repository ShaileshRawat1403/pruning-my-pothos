import React from "react";
import { D } from "../deadpan";
import { Plate, SceneProps, Show, Tick, hand, mono } from "./kit";

/**
 * Six fields. The spec sheet from the table on the cover, filled in one line
 * at a time. A blank line is a decision somebody will make later without
 * saying so.
 */
export default function Scene({ step, steps, id }: SceneProps) {
  return (
    <Plate id={id}>
      <g transform="rotate(-1.5 250 210)">
        <rect x={50} y={34} width={400} height={352} fill="#fff" stroke={D.ink} strokeWidth={4.5} />
        {mono(250, 70, "SPEC", 20)}
        <path d="M70 84 H430" stroke={D.ink} strokeWidth={3} />
        {steps.map((s, i) => {
          const name = s.title.split(" ")[0].toUpperCase();
          return (
            <g key={s.id} style={{ opacity: step === i ? 1 : step > i ? 0.6 : 0.3, transition: "opacity .3s" }}>
              {mono(76, 122 + i * 46, name, 18, D.ink, "start")}
              <path d={`M${86 + name.length * 11} ${116 + i * 46} H${step >= i ? 386 : 86 + name.length * 11}`} stroke={step === i ? D.accent : D.greyLight} strokeWidth={4} strokeLinecap="round" style={{ transition: "d .4s" }} />
              <Tick x={410} y={112 + i * 46} on={step >= i} size={0.8} />
            </g>
          );
        })}
      </g>
      <Show on={step < steps.length - 1}>
        {hand(540, 200, "decided", 28, D.greyLight)}
        {hand(540, 232, "on paper.", 28, D.greyLight)}
      </Show>
      <Show on={step >= steps.length - 1}>
        {hand(540, 200, "nothing decided", 28, D.accent)}
        {hand(540, 232, "silently.", 28, D.accent)}
      </Show>
    </Plate>
  );
}
