import React from "react";
import { D, LINE } from "../deadpan";
import { At, Lit, Plate, SceneProps, bare, mono } from "./kit";

/**
 * One step of generation. The input goes to the file of numbers, the numbers
 * give a ranking, and one piece is taken from the ranking and joins the input.
 * The phrase and the scores are the article's (its visual calls the scores
 * illustrative).
 */
export default function Scene({ step, steps, id }: SceneProps) {
  const input = bare(steps[0]?.title ?? "");
  const ranking = (steps[2]?.body ?? "")
    .split(", ")
    .map((r) => r.match(/^(.+?)\s+(\d+)%$/))
    .filter((m): m is RegExpMatchArray => Boolean(m))
    .map((m) => ({ word: m[1], pct: Number(m[2]) }));
  const chosen = bare(steps[3]?.title ?? ranking[0]?.word ?? "");
  const slipW = 36 + input.length * 12;

  return (
    <Plate id={id}>
      <path d="M20 352 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The file of numbers, under glass. */}
      <Lit on={step === 1} off={0.45}>
        <rect x={278} y={250} width={84} height={102} fill={D.paperDeep} stroke={D.ink} strokeWidth={4.5} />
        <rect x={266} y={238} width={108} height={14} fill="#fff" stroke={D.ink} strokeWidth={4} />
        <rect x={274} y={92} width={92} height={146} fill="#E8F0EE" fillOpacity={0.4} stroke={D.ink} strokeWidth={4.5} />
        <rect x={290} y={108} width={60} height={112} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
        {["0.021", "-1.44", "0.881", "..."].map((n, i) => (
          <text key={n} x={297} y={132 + i * 24} className="ill-mono" fontSize={15} fontWeight={700} fill={D.ink}>
            {n}
          </text>
        ))}
        <g style={{ opacity: step >= 1 ? 1 : 0, transition: "opacity .3s" }}>
          <rect x={300} y={286} width={40} height={30} rx={4} fill={D.accent} stroke={D.ink} strokeWidth={3.5} />
          <path d="M308 286 v -10 a 12 12 0 0 1 24 0 v 10" {...LINE} strokeWidth={4} />
        </g>
      </Lit>

      <path d="M214 214 H256 M246 204 L258 214 L246 224" {...LINE} strokeWidth={3.5} opacity={step >= 1 ? 0.9 : 0.25} />
      <path d="M384 214 H420 M410 204 L422 214 L410 224" {...LINE} strokeWidth={3.5} opacity={step >= 2 ? 0.9 : 0.25} />

      {/* The ranking. */}
      <Lit on={step === 2 || step === 3} off={step < 2 ? 0 : 0.45}>
        {ranking.map((r, i) => {
          const picked = step === 3 && r.word === chosen;
          return (
            <g key={r.word} style={{ opacity: step === 3 && !picked ? 0.35 : 1, transition: "opacity .3s" }}>
              {mono(436, 166 + i * 48, r.word, 19, picked ? D.accent : D.ink, "start")}
              <rect
                x={500}
                y={150 + i * 48}
                height={22}
                rx={3}
                width={Math.max(4, r.pct)}
                fill={picked ? D.accent : D.teal}
                stroke={D.ink}
                strokeWidth={3}
                style={{ transformBox: "fill-box", transformOrigin: "0 50%", transform: `scaleX(${step >= 2 ? 1 : 0})`, transition: `transform .5s ease ${i * 0.08}s` }}
              />
              <g style={{ opacity: step >= 2 ? 1 : 0, transition: `opacity .3s ${0.3 + i * 0.08}s` }}>{mono(508 + Math.max(4, r.pct), 167 + i * 48, `${r.pct}%`, 18, D.greyLight, "start")}</g>
            </g>
          );
        })}
      </Lit>

      {/* The input, and the piece that joins it. */}
      <At x={step === 1 || step === 2 ? 58 : 0}>
        <Lit on={step === 0 || step === 3} off={0.6}>
          <rect x={24} y={190} width={slipW} height={48} rx={4} fill="#fff" stroke={D.ink} strokeWidth={4} />
          {mono(24 + slipW / 2, 221, input, 19)}
        </Lit>
      </At>
      <At x={step === 3 ? 24 + slipW + 8 : 436} y={step === 3 ? 190 : 140} o={step === 3 ? 1 : 0}>
        <rect x={0} y={0} width={30 + chosen.length * 12} height={48} rx={4} fill={D.accent} stroke={D.ink} strokeWidth={4} />
        {mono((30 + chosen.length * 12) / 2, 31, chosen, 19, "#fff")}
      </At>

      {mono(320, 392, ["INPUT", "FIXED AFTER TRAINING", "A RANKING", "ONE PIECE, SELECTED"][Math.min(step, 3)], 18, D.accent)}
    </Plate>
  );
}
