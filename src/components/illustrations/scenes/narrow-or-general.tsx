import React from "react";
import { D } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Narrow or general. A Swiss army knife with every blade out, labelled
 * DO_ANYTHING(query): impossible to check what it will do. Then a single
 * labelled key that fits one lock: REFUND(order, amount, reason), easy to
 * check. Last, the tool's description tag, which is what the model reads
 * when it chooses: write it well.
 */
const SAYS = ["it can do anything. that's the problem.", "one job. three arguments.", "the model picks by this label."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />
      <path d="M320 40 V340" stroke={D.greyLight} strokeWidth={3} strokeDasharray="6 10" />

      {/* The everything tool. */}
      <Lit on={s === 0} off={0.4}>
        <rect x={80} y={200} width={160} height={44} rx={22} fill={D.accent} stroke={D.ink} strokeWidth={4} />
        {[-60, -35, -10, 15, 40, 65].map((a, i) => (
          <path key={i} d={`M160 210 l ${Math.cos(((a - 90) * Math.PI) / 180) * 90} ${Math.sin(((a - 90) * Math.PI) / 180) * 90}`} stroke={D.greyLight} strokeWidth={8} strokeLinecap="round" />
        ))}
        {mono(160, 290, "do_anything(query)", 18)}
      </Lit>

      {/* The one-job key. */}
      <Lit on={s !== 0} off={0.4}>
        <circle cx={420} cy={200} r={36} fill="#E8C77A" stroke={D.ink} strokeWidth={4} />
        <circle cx={420} cy={200} r={12} fill={D.paper} stroke={D.ink} strokeWidth={3} />
        <path d="M456 200 H580 M540 200 V222 M566 200 V218" stroke={D.ink} strokeWidth={8} strokeLinecap="round" />
        {mono(480, 290, "refund(order,", 18)}
        {mono(480, 314, "amount, reason)", 18)}
      </Lit>

      {/* The description tag. */}
      <Show on={s === 2}>
        <path d="M384 172 L360 120" stroke={D.ink} strokeWidth={2.5} />
        <rect x={250} y={70} width={200} height={50} rx={4} fill="#fff" stroke={D.accent} strokeWidth={3} />
        {mono(350, 92, "Refunds one order,", 18, D.accent)}
        {mono(350, 112, "up to its total.", 18, D.accent)}
      </Show>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 0 ? 160 : i === 1 ? 480 : 320, i === 2 ? 356 : 70, t, 20, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["ONE FLEXIBLE OPERATION", "A NARROW TOOL", "DESCRIBE IT WELL"][s], 18, D.accent)}
    </Plate>
  );
}
