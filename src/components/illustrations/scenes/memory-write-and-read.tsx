import React from "react";
import { D } from "../deadpan";
import { At, Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * One fact, from one run to the next. A speech bubble "I prefer metric" in
 * run one; a card "prefers metric" is written from it; the card goes into a
 * drawer outside the model; in run two the card comes back out and sits in
 * the model's input, beside the new question.
 */
const SAYS = ["something worth keeping.", "written down.", "kept outside the model.", "placed back in the input."];
const TAGS = ["RUN ONE", "WRITE", "STORE", "RUN TWO"];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 3);
  // Where the card is: written beside run one, filed in the drawer, then
  // placed into run two's input.
  const card = [
    { x: 0, y: 0, o: 0 },
    { x: 0, y: 0, o: 1 },
    { x: 200, y: 128, o: 1 },
    { x: 400, y: 0, o: 1 },
  ][s];
  return (
    <Plate id={id}>
      {/* Run one. */}
      <Lit on={s <= 1} off={0.35}>
        <rect x={20} y={110} width={200} height={150} fill="none" stroke={D.ink} strokeWidth={3} />
        {mono(120, 100, "RUN ONE", 18, D.ink)}
        <rect x={30} y={128} width={180} height={40} rx={14} fill="#fff" stroke={D.ink} strokeWidth={2.5} />
        {mono(120, 154, "I prefer metric", 18, D.teal)}
      </Lit>

      {/* The drawer, outside both runs. */}
      <Lit on={s === 2} off={0.35}>
        <rect x={220} y={290} width={200} height={88} fill={D.paperDeep} stroke={D.ink} strokeWidth={3.5} />
        {mono(320, 314, "STORAGE", 18, D.ink)}
      </Lit>

      {/* Run two. */}
      <Lit on={s === 3} off={0.35}>
        <rect x={420} y={110} width={200} height={150} fill="none" stroke={D.ink} strokeWidth={3} />
        {mono(520, 100, "RUN TWO", 18, D.ink)}
        <rect x={430} y={128} width={180} height={40} rx={14} fill="#fff" stroke={D.ink} strokeWidth={2.5} />
        {mono(520, 154, "Oven temp?", 18, D.teal)}
      </Lit>

      {/* The card. */}
      <At x={card.x} y={card.y} o={card.o}>
        <rect x={36} y={196} width={168} height={40} fill="#F6E7A8" stroke={D.ink} strokeWidth={2.5} />
        {mono(120, 222, "prefers metric", 18, D.ink)}
      </At>

      <Show on={s === 3}>
        {mono(520, 290, "in the input", 18, D.accent)}
      </Show>

      {hand(320, 64, SAYS[s], 26, s === 3 ? D.accent : D.grey)}
      {mono(320, 404, TAGS[s], 18, D.accent)}
    </Plate>
  );
}
