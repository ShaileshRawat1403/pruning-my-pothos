import React from "react";
import { C, Hand, Strike } from "./kit";

/**
 * props.tsx — small drawn objects the cast handles: documents, stickies,
 * stamps, receipts, crates, buttons. Every prop is placed with x/y (its
 * top-left) and an optional scale, and draws in the same ink as the cast.
 *
 * Add a prop here when a storyboard needs an object more than once. A prop
 * used in one frame only can stay in that frame.
 */

type Place = { x: number; y: number; s?: number };
const at = ({ x, y, s = 1 }: Place) => `translate(${x} ${y}) scale(${s})`;
const ink = { fill: "none", stroke: C.ink, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

/** A page with a folded corner. `lines` are drawn as text; otherwise ruled. */
export function Doc({
  w = 150,
  h = 190,
  lines,
  title,
  mono = false,
  size = 18,
  lineSize,
  tone = C.ink,
  ...p
}: Place & { w?: number; h?: number; lines?: string[]; title?: string; mono?: boolean; size?: number; lineSize?: number; tone?: string }) {
  const fold = 28;
  const ls = lineSize ?? size;
  return (
    <g transform={at(p)}>
      <path
        d={`M0 0 H${w - fold} L${w} ${fold} V${h} H0 Z`}
        fill={C.card}
        stroke={C.ink}
        strokeWidth={3.5}
        strokeLinejoin="round"
      />
      <path d={`M${w - fold} 0 V${fold} H${w}`} {...ink} strokeWidth={3} />
      {title && (
        <text x={16} y={36} className="ill-mono" fontSize={size} fontWeight={600} fill={tone}>
          {title}
        </text>
      )}
      {lines
        ? lines.map((l, i) => (
            <text
              key={i}
              x={16}
              y={(title ? 36 + ls + 14 : 40) + i * (ls + 10)}
              className={mono ? "ill-mono" : "ill-hand"}
              fontSize={ls}
              fontWeight={mono ? 400 : 700}
              fill={tone}
            >
              {l}
            </text>
          ))
        : [0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              d={`M18 ${(title ? 64 : 40) + i * 26} L${w - 24 - (i % 2) * 22} ${(title ? 64 : 40) + i * 26}`}
              stroke={C.faint}
              strokeWidth={3}
              strokeLinecap="round"
            />
          ))}
    </g>
  );
}

/** A yellow sticky note, slightly crooked. */
export function Sticky({
  lines,
  w = 190,
  h = 150,
  size = 30,
  rotate = -3,
  color = C.ink,
  ...p
}: Place & { lines: string[]; w?: number; h?: number; size?: number; rotate?: number; color?: string }) {
  return (
    <g transform={`${at(p)} rotate(${rotate} ${w / 2} ${h / 2})`}>
      <path d={`M2 4 L${w} 0 L${w - 2} ${h} L0 ${h - 2} Z`} fill={C.sticky} stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />
      {lines.map((l, i) => (
        <text
          key={i}
          x={w / 2}
          y={h / 2 - ((lines.length - 1) * size * 1.05) / 2 + i * size * 1.05 + size * 0.34}
          textAnchor="middle"
          className="ill-hand"
          fontSize={size}
          fontWeight={700}
          fill={color}
        >
          {l}
        </text>
      ))}
    </g>
  );
}

/** A rubber-stamp impression. */
export function Stamp({
  text,
  color = C.accent,
  w = 170,
  size = 30,
  rotate = -8,
  ...p
}: Place & { text: string; color?: string; w?: number; size?: number; rotate?: number }) {
  const h = size * 2.1;
  return (
    <g transform={`${at(p)} rotate(${rotate} ${w / 2} ${h / 2})`}>
      <rect x={0} y={0} width={w} height={h} rx={6} fill="none" stroke={color} strokeWidth={5} />
      <text x={w / 2} y={h / 2 + size * 0.36} textAnchor="middle" className="ill-mono" fontSize={size} fontWeight={600} fill={color}>
        {text}
      </text>
    </g>
  );
}

/** A small receipt or response slip. */
export function Slip({
  text,
  color = C.teal,
  w = 150,
  h = 80,
  size = 26,
  rotate = -5,
  tick = false,
  hand = false,
  ...p
}: Place & { text: string; color?: string; w?: number; h?: number; size?: number; rotate?: number; tick?: boolean; hand?: boolean }) {
  return (
    <g transform={`${at(p)} rotate(${rotate} ${w / 2} ${h / 2})`}>
      <rect x={0} y={0} width={w} height={h} rx={5} fill={C.card} stroke={C.ink} strokeWidth={3.5} />
      <text
        x={w / 2}
        y={tick ? h * 0.46 : h / 2 + size * 0.34}
        textAnchor="middle"
        className={hand ? "ill-hand" : "ill-mono"}
        fontSize={size}
        fontWeight={hand ? 700 : 600}
        fill={color}
      >
        {text}
      </text>
      {tick && <path d={`M${w / 2 - 20} ${h * 0.7} L${w / 2 - 8} ${h * 0.82} L${w / 2 + 18} ${h * 0.6}`} {...ink} stroke={color} strokeWidth={4.5} />}
    </g>
  );
}

/** A labelled crate: a separate piece of software, built around the model. */
export function Crate({ label, w = 150, h = 96, size = 24, ...p }: Place & { label: string; w?: number; h?: number; size?: number }) {
  return (
    <g transform={at(p)}>
      <rect x={0} y={10} width={w} height={h - 10} rx={4} fill={C.wash} stroke={C.ink} strokeWidth={3.5} />
      <path d={`M0 10 L12 0 H${w + 12} L${w} 10`} fill={C.card} stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />
      <path d={`M${w} 10 L${w + 12} 0 V${h - 12} L${w} ${h}`} fill={C.card} stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />
      <text x={w / 2} y={10 + (h - 10) / 2 + size * 0.34} textAnchor="middle" className="ill-mono" fontSize={size} fontWeight={600} fill={C.ink}>
        {label}
      </text>
    </g>
  );
}

/** A magnifying glass. (x, y) is the centre of the lens. */
export function Lens({ r = 44, color = C.teal, ...p }: Place & { r?: number; color?: string }) {
  return (
    <g transform={at(p)}>
      <circle cx={0} cy={0} r={r} fill={C.card} fillOpacity={0.14} stroke={color} strokeWidth={6} />
      <path d={`M${r * 0.72} ${r * 0.72} L${r * 1.45} ${r * 1.45}`} stroke={color} strokeWidth={10} strokeLinecap="round" />
    </g>
  );
}

/** A padlock. */
export function Padlock({ ...p }: Place) {
  return (
    <g transform={at(p)}>
      <path d="M14 34 V22 Q14 2 34 2 Q54 2 54 22 V34" {...ink} strokeWidth={5} />
      <rect x={4} y={32} width={60} height={46} rx={6} fill={C.accent} stroke={C.ink} strokeWidth={4} />
      <circle cx={34} cy={52} r={6} fill={C.ink} />
    </g>
  );
}

/** A die, for sampling. */
export function Die({ ...p }: Place) {
  return (
    <g transform={at(p)}>
      <rect x={0} y={0} width={70} height={70} rx={12} fill={C.card} stroke={C.ink} strokeWidth={4} transform="rotate(-10 35 35)" />
      {[
        [20, 20],
        [50, 20],
        [35, 35],
        [20, 50],
        [50, 50],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={5.5} fill={C.ink} transform="rotate(-10 35 35)" />
      ))}
    </g>
  );
}

/** A big on-screen button. */
export function ButtonDoodle({ label, w = 220, color = C.teal, ...p }: Place & { label: string; w?: number; color?: string }) {
  return (
    <g transform={at(p)}>
      <rect x={4} y={8} width={w} height={70} rx={14} fill={C.ink} />
      <rect x={0} y={0} width={w} height={70} rx={14} fill={color} stroke={C.ink} strokeWidth={4} />
      <text x={w / 2} y={46} textAnchor="middle" className="ill-mono" fontSize={28} fontWeight={600} fill={C.card} letterSpacing={2}>
        {label}
      </text>
    </g>
  );
}

/** A folder being passed on. */
export function Folder({ label, ...p }: Place & { label: string }) {
  return (
    <g transform={at(p)}>
      <path d="M0 20 H60 L76 0 H190 V140 H0 Z" fill="#E7D9B0" stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
      <path d="M0 40 H190" stroke={C.ink} strokeWidth={3} />
      <text x={95} y={98} textAnchor="middle" className="ill-mono" fontSize={26} fontWeight={600} fill={C.ink}>
        {label}
      </text>
    </g>
  );
}

/** An envelope, optionally stamped. */
export function Envelope({ stamp, ...p }: Place & { stamp?: string }) {
  return (
    <g transform={at(p)}>
      <rect x={0} y={0} width={170} height={110} rx={6} fill={C.card} stroke={C.ink} strokeWidth={4} />
      <path d="M0 4 L85 64 L170 4" {...ink} strokeWidth={4} />
      {stamp && <Stamp x={70} y={56} text={stamp} w={120} size={22} rotate={-12} />}
    </g>
  );
}

/** A long transcript scroll with hand-written entries. */
export function Scroll({ lines, w = 300, size = 26, ...p }: Place & { lines: string[]; w?: number; size?: number }) {
  const h = 60 + lines.length * (size + 16);
  return (
    <g transform={at(p)}>
      <path d={`M16 12 H${w} V${h} H16 Z`} fill={C.card} stroke={C.ink} strokeWidth={3.5} strokeLinejoin="round" />
      <ellipse cx={16} cy={12 + (h - 12) / 2} rx={14} ry={(h - 12) / 2} fill={C.wash} stroke={C.ink} strokeWidth={3.5} />
      {lines.map((l, i) => (
        <text key={i} x={44} y={56 + i * (size + 16)} className="ill-hand" fontSize={size} fontWeight={700} fill={C.body}>
          {l}
        </text>
      ))}
    </g>
  );
}

/** A ranked list of short bars, the top ones longest. */
export function Ranking({ n = 4, highlight, ...p }: Place & { n?: number; highlight?: number }) {
  return (
    <g transform={at(p)}>
      {Array.from({ length: n }).map((_, i) => (
        <rect
          key={i}
          x={0}
          y={i * 22}
          width={100 - i * 18}
          height={14}
          rx={4}
          fill={i === highlight ? C.accent : C.wash}
          stroke={C.ink}
          strokeWidth={2.5}
        />
      ))}
    </g>
  );
}

/** A numbered circle, for steps that need no drawing of their own. */
export function Num({ n, color = C.ink, ...p }: Place & { n: number; color?: string }) {
  return (
    <g transform={at(p)}>
      <circle cx={40} cy={40} r={36} fill={C.card} stroke={color} strokeWidth={4} />
      <text x={40} y={54} textAnchor="middle" className="ill-sans" fontSize={40} fontWeight={800} fill={color}>
        {n}
      </text>
    </g>
  );
}

/** A checklist card. `done` lines get a tick; others an empty box. */
export function Checklist({
  items,
  w = 520,
  size = 30,
  ...p
}: Place & { items: { text: string; done?: boolean }[]; w?: number; size?: number }) {
  const pitch = size + 26;
  return (
    <g transform={at(p)}>
      <rect x={0} y={0} width={w} height={40 + items.length * pitch} rx={8} fill={C.card} stroke={C.ink} strokeWidth={3.5} />
      {items.map((it, i) => (
        <g key={i} transform={`translate(28 ${34 + i * pitch})`}>
          <rect x={0} y={0} width={30} height={30} rx={4} fill="none" stroke={C.ink} strokeWidth={3} />
          {it.done && <path d="M6 16 L13 23 L26 6" {...ink} stroke={C.teal} strokeWidth={4} />}
          <text x={48} y={size * 0.82} className="ill-sans" fontSize={size} fontWeight={600} fill={C.ink}>
            {it.text}
          </text>
        </g>
      ))}
    </g>
  );
}

/** A struck-through wrong idea on a card: the Pruning Mark in its commonest form. */
export function PrunedNote({ text, note, w = 360, ...p }: Place & { text: string; note?: string; w?: number }) {
  return (
    <g transform={at(p)}>
      <text x={0} y={34} className="ill-sans" fontSize={34} fontWeight={800} fill={C.muted}>
        {text}
      </text>
      <Strike x={-6} y={22} w={w} width={5} />
      {note && (
        <Hand x={0} y={78} size={32} color={C.accent}>
          {note}
        </Hand>
      )}
    </g>
  );
}

/** A small rain cloud, for variation. */
export function Cloud({ ...p }: Place) {
  return (
    <g transform={at(p)}>
      <path
        d="M30 90 C 6 90, 4 48, 40 44 C 44 10, 90 0, 110 20 C 130 -10, 190 -8, 202 22 C 232 6, 276 22, 270 52 C 300 56, 300 90, 270 90 Z"
        fill={C.card}
        stroke={C.ink}
        strokeWidth={4.5}
        strokeLinejoin="round"
      />
      <path d="M60 106 L52 130 M110 106 L102 130 M160 106 L152 130 M210 106 L202 130 M86 144 L78 166 M136 144 L128 166 M186 144 L178 166" stroke={C.teal} strokeWidth={3.5} strokeLinecap="round" />
    </g>
  );
}
