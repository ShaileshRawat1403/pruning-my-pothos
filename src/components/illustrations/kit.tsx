import React from "react";
import { DeadpanDefs, Paper, SleepyEye, SaucerEye, Stubble } from "./deadpan";

/**
 * kit.tsx — the storybook drawing kit: palette, the recurring cast, and the
 * small set of helpers every storyboard frame is composed from.
 *
 * The cast (Model, Gate, Tool, Record, Person) is for the inside of a story,
 * where one character carries an argument across frames. It is not a mascot:
 * covers use each article's own emblem (emblems.tsx) instead, so the house
 * style repeats and the subjects don't.
 *
 * Illustrations carry their own paper and ink and deliberately do not re-theme
 * (see the note in globals.css). Text inside them is real SVG or HTML text,
 * never outlines, so it stays selectable and survives PDF export as text.
 *
 * Rule for every character: it never says anything the owning article does
 * not claim. The joke is always the argument, said sideways.
 */

export const C = {
  paper: "#EFE5CF",
  card: "#FFFFFF",
  ink: "#1F2A36",
  body: "#3D4854",
  muted: "#737D86",
  line: "#8A949C",
  faint: "#C9CDD0",
  rule: "#D9D4C6",
  wash: "#E9E2D0",
  accent: "#C0663C",
  teal: "#2A6F7F",
  sticky: "#F6E7A8",
  fadedCard: "#F9F7F1",
  fadedBorder: "#C4C8C6",
} as const;

const stroke = {
  fill: "none",
  stroke: C.ink,
  strokeWidth: 5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

type Place = { x: number; y: number; s?: number };

function at({ x, y, s = 1 }: Place) {
  return `translate(${x} ${y}) scale(${s})`;
}

/* ── The cast ─────────────────────────────────────────────────────────── */

/** The Model: a speech bubble with legs. Its body is the request. */
export function Model({
  lines = ["refund $40,", "please?"],
  arm = "down",
  ...place
}: Place & { lines?: string[]; arm?: "down" | "up" }) {
  return (
    <g transform={at(place)}>
      <path
        d="M58 8 H142 Q184 8 184 50 V96 Q184 136 142 136 H84 L50 166 L58 134 Q16 128 16 96 V50 Q16 8 58 8 Z"
        fill={C.card}
        stroke={C.ink}
        strokeWidth={4.5}
        strokeLinejoin="round"
      />
      <SleepyEye x={78} y={40} r={11} look={0.4} />
      <SleepyEye x={122} y={40} r={11} look={0.4} />
      <path d="M112 22 Q124 14 136 20" {...stroke} strokeWidth={3.5} />
      {lines.map((line, i) => (
        <text
          key={i}
          x={100}
          y={86 + i * 26}
          textAnchor="middle"
          className="ill-hand"
          fontSize={26}
          fontWeight={700}
          fill={C.ink}
        >
          {line}
        </text>
      ))}
      <path d="M94 136 L88 188 L72 192" {...stroke} />
      <path d="M118 136 L124 188 L140 192" {...stroke} />
      <path d="M17 82 C 4 96, -2 110, -6 126" {...stroke} />
      {arm === "down" ? (
        <path d="M183 82 C 196 100, 204 118, 208 140" {...stroke} />
      ) : (
        <path d="M183 82 C 200 72, 212 62, 224 50" {...stroke} />
      )}
    </g>
  );
}

/** The Gate: an unimpressed clerk behind a counter, holding a stamp. */
export function Gate({
  counter = "PERMISSIONS",
  stamp = true,
  ...place
}: Place & { counter?: string; stamp?: boolean }) {
  return (
    <g transform={at(place)}>
      <circle cx={120} cy={56} r={32} fill={C.card} stroke={C.ink} strokeWidth={4.5} />
      <path d="M89 50 Q92 22 120 22 Q148 22 151 50 Q140 36 120 36 Q100 36 89 50 Z" fill={C.ink} />
      <path d="M98 56 H114 M106 56 V64 M126 56 H142 M134 56 V64" {...stroke} strokeWidth={4.5} />
      <path d="M112 76 L128 76" {...stroke} strokeWidth={3.5} />
      <Stubble x={102} y={72} w={36} h={12} n={10} />
      <path
        d="M80 100 Q120 88 160 100 L170 160 L70 160 Z"
        fill={C.wash}
        stroke={C.ink}
        strokeWidth={4.5}
        strokeLinejoin="round"
      />
      <path d="M84 110 C 70 126, 72 142, 90 154" {...stroke} />
      <path d="M156 110 C 174 116, 186 124, 194 134" {...stroke} />
      {stamp && (
        <>
          <rect x={187} y={104} width={16} height={30} rx={6} fill={C.accent} stroke={C.ink} strokeWidth={3.5} />
          <rect x={176} y={132} width={38} height={14} rx={3} fill={C.ink} />
        </>
      )}
      <path d="M0 158 L240 156 L240 236 L0 238 Z" fill={C.card} stroke={C.ink} strokeWidth={4.5} strokeLinejoin="round" />
      <path d="M-6 158 L246 155" stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
      {counter && (
        <text x={120} y={206} textAnchor="middle" className="ill-mono" fontSize={16} letterSpacing={3} fill={C.muted}>
          {counter}
        </text>
      )}
    </g>
  );
}

/** The Tool: a grinning courier who reports that he did it. */
export function Courier({
  receipt = "200 OK",
  receiptColor = C.teal,
  tick = true,
  ...place
}: Place & { receipt?: string; receiptColor?: string; tick?: boolean }) {
  return (
    <g transform={at(place)}>
      <path d="M-4 90 L26 90 M6 112 L40 112 M-2 134 L30 134" stroke={C.line} strokeWidth={3.5} strokeLinecap="round" />
      <path d="M88 78 L94 150" stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
      <path d="M94 150 L68 196 L52 192" {...stroke} />
      <path d="M94 150 L126 184 L140 202" {...stroke} />
      <path d="M90 100 L58 120" {...stroke} />
      <path d="M90 98 L128 76 L146 44" {...stroke} />
      <circle cx={86} cy={52} r={27} fill={C.card} stroke={C.ink} strokeWidth={4.5} />
      <path d="M60 48 Q86 14 112 48 Z" fill={C.teal} stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
      <path d="M108 47 L134 52" {...stroke} />
      <SaucerEye x={78} y={56} r={7} px={1} py={1} />
      <SaucerEye x={96} y={56} r={7} px={1} py={1} />
      <path d="M74 67 Q88 84 104 67 Z" fill="#fff" stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />
      <g transform="rotate(-8 180 12)">
        <rect x={126} y={-26} width={112} height={72} rx={4} fill={C.card} stroke={C.ink} strokeWidth={4} />
        <text x={182} y={tick ? 6 : 16} textAnchor="middle" className="ill-mono" fontSize={20} fontWeight={600} fill={receiptColor}>
          {receipt}
        </text>
        {tick && <path d="M160 22 L172 32 L200 14" {...stroke} stroke={receiptColor} strokeWidth={5} />}
      </g>
    </g>
  );
}

/** The Record: an open ledger. The only witness worth asking. */
export function Ledger({
  was = "$120",
  now = "$120",
  left = "refund #4417",
  heading = "balance",
  ...place
}: Place & { was?: string; now?: string; left?: string; heading?: string }) {
  return (
    <g transform={at(place)}>
      <path d="M10 30 Q80 10 150 34 L150 190 Q80 168 10 186 Z" fill={C.card} stroke={C.ink} strokeWidth={4.5} strokeLinejoin="round" />
      <path d="M150 34 Q220 10 290 30 L290 186 Q220 168 150 190 Z" fill={C.card} stroke={C.ink} strokeWidth={4.5} strokeLinejoin="round" />
      <path d="M32 62 Q80 52 130 64 M32 90 Q80 80 130 92 M32 118 Q70 110 110 120" fill="none" stroke={C.faint} strokeWidth={3} strokeLinecap="round" />
      <text x={80} y={152} textAnchor="middle" className="ill-hand" fontSize={22} fill={C.muted}>{left}</text>
      <text x={214} y={72} textAnchor="middle" className="ill-hand" fontSize={24} fill={C.muted}>{heading}</text>
      <text x={214} y={110} textAnchor="middle" className="ill-hand" fontSize={30} fontWeight={700} fill={C.ink}>was {was}</text>
      <text x={214} y={148} textAnchor="middle" className="ill-hand" fontSize={30} fontWeight={700} fill={C.ink}>now {now}</text>
      <path d="M262 22 L262 60 L270 52 L278 60 L278 18" fill={C.accent} stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />
      <SleepyEye x={60} y={44} r={9} look={1} />
      <SleepyEye x={92} y={42} r={9} look={1} />
    </g>
  );
}

/** A person who can say no. Appears only where a human decides. */
export function Person({ ...place }: Place) {
  return (
    <g transform={at(place)}>
      <path d="M40 150 Q100 120 160 150 L170 230 L30 230 Z" fill="#4B4A46" stroke={C.ink} strokeWidth={4.5} strokeLinejoin="round" />
      <circle cx={100} cy={78} r={36} fill={C.card} stroke={C.ink} strokeWidth={4.5} />
      <path d="M66 70 Q70 36 102 38 Q132 40 136 72 Q120 54 100 56 Q80 56 66 70 Z" fill={C.ink} />
      <SleepyEye x={87} y={80} r={9} look={0.3} />
      <SleepyEye x={113} y={80} r={9} look={0.3} />
      <path d="M92 101 H108" {...stroke} strokeWidth={3.5} />
      <Stubble x={84} y={96} w={32} h={12} n={10} />
      <path d="M52 168 C 70 190, 96 196, 118 186" {...stroke} stroke="#F4F1E8" />
    </g>
  );
}

/* ── Helpers ──────────────────────────────────────────────────────────── */

/** Handwriting, for dialogue and margin notes only. */
export function Hand({
  x,
  y,
  size = 36,
  color = C.ink,
  anchor = "start",
  weight = 700,
  children,
}: {
  x: number;
  y: number;
  size?: number;
  color?: string;
  anchor?: "start" | "middle" | "end";
  weight?: number;
  children: React.ReactNode;
}) {
  return (
    <text x={x} y={y} className="ill-hand" fontSize={size} fontWeight={weight} fill={color} textAnchor={anchor}>
      {children}
    </text>
  );
}

/** Wrapping prose inside a drawing. Scales with the drawing. */
export function Para({
  x,
  y,
  w,
  h,
  size = 32,
  color = C.body,
  weight = 400,
  font = "sans",
  lh = 1.34,
  align = "left",
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  size?: number;
  color?: string;
  weight?: number;
  font?: "sans" | "hand" | "mono";
  lh?: number;
  align?: "left" | "center" | "right";
  children: React.ReactNode;
}) {
  return (
    <foreignObject x={x} y={y} width={w} height={h}>
      <div
        className={`ill-${font}`}
        style={{ margin: 0, fontSize: size, lineHeight: lh, color, fontWeight: weight, textAlign: align }}
      >
        {children}
      </div>
    </foreignObject>
  );
}

/**
 * The Pruning Mark: a hand-drawn strike through something that was really
 * refused or removed. What it strikes stays legible.
 */
export function Strike({ x, y, w, color = C.accent, width = 5 }: { x: number; y: number; w: number; color?: string; width?: number }) {
  return (
    <path
      d={`M${x} ${y + 4} C ${x + w * 0.3} ${y - 5}, ${x + w * 0.66} ${y + 6}, ${x + w} ${y - 3}`}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
    />
  );
}

/** A short hand-drawn arrow, left to right. Every arrow gets a verb. */
export function Arrow({ x1, x2, y, color = C.accent, verb, verbY }: { x1: number; x2: number; y: number; color?: string; verb?: string; verbY?: number }) {
  const mid = (x1 + x2) / 2;
  return (
    <g>
      <path d={`M${x1} ${y + 3} C ${x1 + (x2 - x1) * 0.35} ${y - 5}, ${x1 + (x2 - x1) * 0.65} ${y + 6}, ${x2} ${y}`} fill="none" stroke={color} strokeWidth={4} strokeLinecap="round" />
      <path d={`M${x2 - 10} ${y - 8} L${x2 + 1} ${y} L${x2 - 11} ${y + 9}`} fill="none" stroke={color} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
      {verb && <Hand x={mid} y={verbY ?? y - 16} size={28} color={color} anchor="middle">{verb}</Hand>}
    </g>
  );
}

/* ── Shells ───────────────────────────────────────────────────────────── */

export const FRAME_W = 1080;
export const FRAME_H = 1350;

/**
 * One 4:5 storyboard frame. Same grammar on every frame: top rail, headline,
 * the drawing, one supporting thought, bottom rail with frame number.
 */
export function FrameShell({
  label,
  chapter,
  number,
  total,
  headline,
  headlineSize = 64,
  children,
}: {
  label: string;
  chapter: string;
  number: number;
  total: number;
  headline: string[];
  headlineSize?: number;
  children: React.ReactNode;
}) {
  const step = Math.round(headlineSize * 1.03);
  return (
    <svg viewBox={`0 0 ${FRAME_W} ${FRAME_H}`} className="ill-svg" role="img" aria-label={label}>
      <DeadpanDefs id="fs" />
      <Paper id="fs" w={FRAME_W} h={FRAME_H} />
      <text x={76} y={72} className="ill-mono" fontSize={15} letterSpacing={2.6} fill={C.muted}>PRUNING MY POTHOS</text>
      <text x={1004} y={72} textAnchor="end" className="ill-mono" fontSize={15} letterSpacing={2.6} fill={C.muted}>{chapter}</text>
      <text className="ill-sans" fontSize={headlineSize} fontWeight={800} letterSpacing={-2} fill={C.ink}>
        {headline.map((line, i) => (
          <tspan key={i} x={76} y={112 + headlineSize * 0.86 + i * step}>{line}</tspan>
        ))}
      </text>
      {children}
      <path d="M76 1274 L1004 1274" stroke={C.rule} strokeWidth={2} />
      <text x={76} y={1308} className="ill-mono" fontSize={16} letterSpacing={2} fill={C.muted}>PRUNINGMYPOTHOS.COM</text>
      <text x={1004} y={1308} textAnchor="end" className="ill-mono" fontSize={16} letterSpacing={2} fill={C.ink}>
        {String(number).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </text>
    </svg>
  );
}
