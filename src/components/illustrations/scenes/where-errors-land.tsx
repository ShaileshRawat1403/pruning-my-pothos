import React from "react";
import { D, Head, Torso } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Where errors land. An invoice after extraction: most of it fine, and the
 * smudges exactly where it hurts: the total, the date, a label, and a table
 * row merged into the wrong cell. Then two suspects in a line-up, MODEL and
 * PAGE, and nobody who scored only the final answer can tell which. Last,
 * the confident wrong answer that came out the end. All values illustrative.
 */
const SAYS = ["mostly fine. mostly.", "reasoning, or the page?", "confident. wrong."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The extracted invoice. */}
      <Lit on={s === 0} off={0.5}>
        <rect x={40} y={60} width={270} height={300} fill="#fff" stroke={D.ink} strokeWidth={4} />
        {mono(56, 92, "INVOICE", 20, D.ink, "start")}
        {mono(56, 124, "DATE  04/O3", 18, D.ink, "start")}
        <ellipse cx={170} cy={118} rx={36} ry={14} fill={D.accent} opacity={0.25} />
        <path d="M56 150 H294 M56 186 H294 M56 222 H294 M180 150 V258" stroke={D.ink} strokeWidth={2} />
        {mono(64, 176, "Widgets  12", 18, D.ink, "start")}
        {mono(64, 212, "Bolts", 18, D.ink, "start")}
        {mono(250, 212, "4O 8", 18, D.accent, "start")}
        <ellipse cx={262} cy={206} rx={30} ry={14} fill={D.accent} opacity={0.25} />
        {mono(56, 300, "TOTL", 18, D.ink, "start")}
        <ellipse cx={80} cy={294} rx={30} ry={14} fill={D.accent} opacity={0.25} />
        {mono(294, 300, "1,24O.0O", 22, D.accent, "end")}
        <ellipse cx={240} cy={294} rx={58} ry={16} fill={D.accent} opacity={0.25} />
      </Lit>

      {/* The line-up. */}
      <Lit on={s === 1} off={0.35}>
        <rect x={360} y={70} width={250} height={210} fill="#F6F1E4" stroke={D.ink} strokeWidth={3} />
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M360 ${110 + i * 40} H610`} stroke={D.greyLight} strokeWidth={1.5} />
        ))}
        <Torso x={420} y={210} w={60} h={70} fill={D.teal} />
        <Head x={420} y={184} r={24} eyes="sleepy" look={1} mouth="flat" hair="curly" />
        {mono(420, 270, "MODEL", 18, "#fff")}
        <rect x={500} y={150} width={70} height={92} fill="#fff" stroke={D.ink} strokeWidth={3} />
        <path d="M512 172 H558 M512 190 H546 M512 208 H558" stroke={D.greyLight} strokeWidth={3} strokeLinecap="round" />
        {mono(535, 270, "PAGE", 18)}
      </Lit>

      {/* The answer that came out. */}
      <Show on={s === 2}>
        <rect x={360} y={296} width={250} height={56} rx={8} fill="#fff" stroke={D.accent} strokeWidth={3.5} />
        {mono(485, 330, "TOTAL: 124,000", 20, D.accent)}
      </Show>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 0 ? 175 : 485, i === 0 ? 46 : 46, t, 26, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["TOTALS, DATES, LABELS, CELLS", "WHICH ONE?", "SCORE THE EXTRACTION ON ITS OWN"][s], 18, D.accent)}
    </Plate>
  );
}
