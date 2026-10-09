import React from "react";
import { D } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * The ranking moved. Two podiums from one published benchmark, drawn with
 * name cards only and only the scores the article quotes. Invoice run A:
 * Docling on top at 0.98. The mixed set: LlamaParse and PaddleOCR sharing
 * the top step at 0.79, Docling on a lower step at 0.69. Last, an arrow
 * between the two Docling cards, and the authors' own advice.
 */
function Card({ x, y, name, score, hot }: { x: number; y: number; name: string; score: string; hot?: boolean }) {
  return (
    <g>
      <rect x={x - 62} y={y - 46} width={124} height={44} rx={4} fill="#fff" stroke={hot ? D.accent : D.ink} strokeWidth={hot ? 3.5 : 3} />
      {mono(x, y - 26, name, 18, D.ink)}
      {mono(x, y - 7, score, 18, hot ? D.accent : D.teal)}
    </g>
  );
}

const SAYS = ["on invoices.", "on mixed documents.", "test on yours."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />
      <path d="M320 40 V340" stroke={D.greyLight} strokeWidth={3} strokeDasharray="6 10" />

      {/* Invoice run A. */}
      <Lit on={s !== 1} off={0.4}>
        <rect x={110} y={250} width={100} height={122} fill={D.paperDeep} stroke={D.ink} strokeWidth={4} />
        {mono(160, 290, "1", 28, D.ink)}
        <Card x={160} y={248} name="DOCLING" score="0.98" hot={s === 2} />
        {mono(160, 120, "INVOICE RUN A", 18, D.teal)}
      </Lit>

      {/* The mixed set. */}
      <Lit on={s !== 0} off={0.4}>
        <rect x={360} y={250} width={140} height={122} fill={D.paperDeep} stroke={D.ink} strokeWidth={4} />
        {mono(430, 290, "1=", 28, D.ink)}
        <Card x={400} y={196} name="LLAMAPARSE" score="0.79" />
        <Card x={460} y={248} name="PADDLEOCR" score="0.79" />
        <rect x={510} y={300} width={100} height={72} fill={D.paperDeep} stroke={D.ink} strokeWidth={4} />
        <Card x={560} y={298} name="DOCLING" score="0.69" hot={s === 2} />
        {mono(480, 120, "MIXED SET", 18, D.teal)}
      </Lit>

      <Show on={s === 2}>
        <path d="M224 214 C 330 150, 470 200, 540 248" fill="none" stroke={D.accent} strokeWidth={3.5} strokeDasharray="8 6" />
        <path d="M528 238 L542 252 L524 254" fill="none" stroke={D.accent} strokeWidth={3.5} strokeLinecap="round" />
      </Show>

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(i === 0 ? 160 : i === 1 ? 480 : 320, i === 2 ? 70 : 80, t, 26, i === 2 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["ONE BENCHMARK, ONE TEST SET", "ANOTHER TEST SET", "NO ENGINE LED EVERY CATEGORY"][s], 18, D.accent)}
    </Plate>
  );
}
