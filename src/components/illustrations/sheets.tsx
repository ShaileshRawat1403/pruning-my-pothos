import React from "react";
import type { ReferenceSheetType } from "../../lib/content/reference-sheets";
import { REFERENCE_TYPE_LABEL } from "../../lib/content/reference-sheets";
import { D, LINE, DeadpanDefs, Paper, Ink, Head, Torso, Limb, Label } from "./deadpan";

/**
 * sheets.tsx: drawings for Works On My Prompt (docs/BUILDER_TRACK.md).
 *
 * One small emblem per sheet type, in the deadpan register, used on cards and
 * the empty state; and SheetCover, the 1200 x 630 title card of one sheet.
 * Emblems draw in a 320 x 240 box. Words in them are labels, never claims.
 */

export const EMBLEM_BOX = { w: 320, h: 240 };

const mono = (x: number, y: number, t: string, size = 15, fill: string = D.ink, anchor: "start" | "middle" | "end" = "middle") => (
  <text x={x} y={y} textAnchor={anchor} className="ill-mono" fontSize={size} fontWeight={700} fill={fill}>
    {t}
  </text>
);
const hand = (x: number, y: number, t: string, size = 22, fill: string = D.ink, anchor: "start" | "middle" | "end" = "middle") => (
  <text x={x} y={y} textAnchor={anchor} className="ill-hand" fontSize={size} fontWeight={700} fill={fill}>
    {t}
  </text>
);

const ART: Record<ReferenceSheetType, React.ReactNode> = {
  /* Post-Mortem, Pre-Written: the report is filled in. The incident is pending. */
  manual: (
    <g>
      <g transform="rotate(-3 150 124)">
        <rect x={62} y={30} width={176} height={196} rx={6} fill={D.paperDeep} stroke={D.ink} strokeWidth={4.5} />
        <rect x={118} y={20} width={64} height={22} rx={5} fill={D.greyLight} stroke={D.ink} strokeWidth={3.5} />
        <rect x={76} y={50} width={148} height={162} fill="#fff" stroke={D.ink} strokeWidth={3} />
        {mono(150, 76, "POST-MORTEM", 15)}
        {mono(88, 100, "INCIDENT:", 12, D.ink, "start")}
        {hand(214, 101, "pending", 19, D.accent, "end")}
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={90} y={118 + i * 28} width={16} height={16} fill="none" stroke={D.ink} strokeWidth={2.5} />
            <path d={`M92 ${126 + i * 28} l5 6 l9 -12`} fill="none" stroke={D.accent} strokeWidth={3} strokeLinecap="round" />
            <path d={`M116 ${127 + i * 28} H${210 - (i % 2) * 22}`} stroke={D.greyLight} strokeWidth={3} strokeLinecap="round" />
          </g>
        ))}
      </g>
      <path d="M254 186 H292 L288 220 Q273 230 258 220 Z" fill="#fff" stroke={D.ink} strokeWidth={3.5} strokeLinejoin="round" />
      <path d="M266 176 q -4 -8 0 -14 M280 176 q -4 -8 0 -14" fill="none" stroke={D.greyLight} strokeWidth={2.5} strokeLinecap="round" />
    </g>
  ),

  /* Conspiracy Board: pins, string, and one photo nobody can explain. */
  mindmap: (
    <g>
      <rect x={30} y={22} width={260} height={196} rx={4} fill="#C9A77C" stroke={D.ink} strokeWidth={4.5} />
      {[
        [64, 52], [126, 96], [210, 58], [252, 140], [90, 170], [176, 184],
      ].map(([x, y], i) => (
        <g key={i}>
          <rect x={x - 22} y={y - 2} width={44} height={34} fill={i === 3 ? "#fff" : "#F6E7A8"} stroke={D.ink} strokeWidth={2.5} transform={`rotate(${(i % 3) * 4 - 4} ${x} ${y})`} />
          {i === 3 && hand(x, y + 26, "?", 26, D.accent)}
        </g>
      ))}
      <path d="M64 52 L126 96 L210 58 L252 140 L90 170 L176 184 L126 96" fill="none" stroke={D.accent} strokeWidth={2.5} strokeLinejoin="round" />
      {[
        [64, 52], [126, 96], [210, 58], [252, 140], [90, 170], [176, 184],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={5} fill={D.accent} stroke={D.ink} strokeWidth={2} />
      ))}
    </g>
  ),

  /* Blast Radius Map: one box, one fuse, and how far it goes. */
  architecture: (
    <g>
      {[96, 70, 44].map((r, i) => (
        <circle key={r} cx={160} cy={136} r={r} fill="none" stroke={i === 2 ? D.accent : D.greyLight} strokeWidth={3} strokeDasharray="7 7" />
      ))}
      <rect x={128} y={112} width={64} height={48} rx={4} fill="#fff" stroke={D.ink} strokeWidth={4} />
      {mono(160, 142, "PROD", 14)}
      <path d="M192 112 C 210 90, 222 78, 236 70" fill="none" stroke={D.ink} strokeWidth={3} strokeLinecap="round" />
      <path d="M236 70 l 8 -10 M236 70 l 12 2 M236 70 l -2 -12" stroke={D.accent} strokeWidth={3} strokeLinecap="round" />
      {mono(36, 34, "ONE TYPO", 13, D.greyLight, "start")}
    </g>
  ),

  /* Things You'll Google Anyway: many tabs, one search. */
  cheatsheet: (
    <g>
      <rect x={30} y={40} width={260} height={176} rx={8} fill="#fff" stroke={D.ink} strokeWidth={4.5} />
      {Array.from({ length: 9 }).map((_, i) => (
        <path key={i} d={`M${38 + i * 28} 40 l 4 -16 h 18 l 4 16`} fill={i === 8 ? "#fff" : D.paperDeep} stroke={D.ink} strokeWidth={2.5} strokeLinejoin="round" />
      ))}
      <rect x={52} y={74} width={216} height={34} rx={17} fill={D.paper} stroke={D.ink} strokeWidth={3} />
      {hand(66, 98, "how to undo", 22, D.ink, "start")}
      <rect x={196} y={82} width={3} height={20} fill={D.accent} />
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M56 ${136 + i * 24} H${244 - i * 30}`} stroke={D.greyLight} strokeWidth={4} strokeLinecap="round" />
      ))}
    </g>
  ),

  /* The Long Way Round: the demo is close. Production is not. */
  slides: (
    <g>
      <path d="M20 220 C 90 200, 40 150, 130 140 C 230 128, 120 80, 210 70 C 260 64, 280 40, 300 22" fill="none" stroke={D.paperDeep} strokeWidth={26} strokeLinecap="round" />
      <path d="M20 220 C 90 200, 40 150, 130 140 C 230 128, 120 80, 210 70 C 260 64, 280 40, 300 22" fill="none" stroke={D.ink} strokeWidth={2.5} strokeDasharray="8 10" />
      <path d="M86 216 V150" {...LINE} strokeWidth={5} />
      <path d="M50 150 H124 L134 164 L124 178 H50 Z" fill="#fff" stroke={D.ink} strokeWidth={3.5} strokeLinejoin="round" />
      {mono(88, 169, "DEMO 2 KM", 12)}
      <path d="M54 186 H128 L138 200 L128 214 H54 Z" fill="#fff" stroke={D.ink} strokeWidth={3.5} strokeLinejoin="round" />
      {mono(92, 205, "PROD 400 KM", 12, D.accent)}
    </g>
  ),
};

/** The type's emblem on its own paper, for cards. */
export function SheetTypeEmblem({ type, id }: { type: ReferenceSheetType; id?: string }) {
  const key = id ?? `sheet-${type}`;
  return (
    <svg viewBox={`0 0 ${EMBLEM_BOX.w} ${EMBLEM_BOX.h}`} className="ill-svg" role="img" aria-label={REFERENCE_TYPE_LABEL[type]}>
      <DeadpanDefs id={key} />
      <Paper id={key} w={EMBLEM_BOX.w} h={EMBLEM_BOX.h} />
      <Ink id={key}>{ART[type]}</Ink>
    </svg>
  );
}

/**
 * The title card of one sheet: the type, the joke as a title, the promise,
 * and someone who has read it and is unimpressed.
 */
export function SheetCover({ slug, type, title, promise, quip }: { slug: string; type: ReferenceSheetType; title: string; promise: string; quip?: string }) {
  const id = `sheetcover-${slug}`;
  const words = title.split(" ");
  const lines: string[] = [];
  for (const w of words) {
    const last = lines[lines.length - 1];
    if (last && (last + " " + w).length <= 18) lines[lines.length - 1] = last + " " + w;
    else lines.push(w);
  }
  return (
    <svg viewBox="0 0 1200 630" className="ill-svg" role="img" aria-label={`${REFERENCE_TYPE_LABEL[type]}: ${title}. After this, you can ${promise}`}>
      <DeadpanDefs id={id} />
      <Paper id={id} w={1200} h={630} />
      <rect width={1200} height={8} fill={D.ink} />
      <text x={72} y={92} className="ill-mono" fontSize={18} letterSpacing={3} fill={D.accent}>
        {`WORKS ON MY PROMPT · ${REFERENCE_TYPE_LABEL[type].toUpperCase()}`}
      </text>
      {lines.slice(0, 4).map((l, i) => (
        <text key={i} x={72} y={196 + i * 78} className="ill-hand" fontSize={76} fontWeight={700} fill={D.ink}>
          {l}
        </text>
      ))}
      <text x={72} y={586} className="ill-mono" fontSize={17} letterSpacing={2.4} fill={D.greyLight}>
        PRUNINGMYPOTHOS.COM
      </text>
      <g transform="translate(700 80) scale(1.35)">
        <Ink id={id}>{ART[type]}</Ink>
      </g>
      <g transform="translate(980 300)">
        <Ink id={id}>
          <Torso x={70} y={150} w={110} h={130} fill={D.grey} />
          <Head x={70} y={96} r={46} eyes="sleepy" look={-1} mouth="flat" stubble hair="messy" />
          <Limb d="M18 190 C 0 170, -10 150, -14 130" fill={D.grey} />
        </Ink>
      </g>
      {quip && (
        <g transform="translate(770 560)">
          <Label x={0} y={0} text={quip.toUpperCase()} size={13} color={D.accent} r={-3} />
        </g>
      )}
    </svg>
  );
}
