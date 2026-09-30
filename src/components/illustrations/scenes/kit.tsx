import React from "react";
import type { SceneStep } from "../../../lib/scene-steps";
import { D, DeadpanDefs, Paper, Ink } from "../deadpan";

/**
 * scenes/kit.tsx: what every scroll scene is built from.
 *
 * A scene is one drawing with a `step`. Nothing is redrawn between steps:
 * things move, fade, or light up, so the reader watches the same objects go
 * through the mechanism. Rules (docs/STORYBOARD_AUTHORING.md, "Scenes"):
 * - Draw in a 640 x 420 box. Nothing smaller than 18px; handwriting 24px up.
 * - Words in the drawing come from the visual's own steps, or are single
 *   plain labels. A scene claims nothing its article does not.
 * - One thing changes per step. What is not the subject of a step is pencil.
 */

export const SW = 640;
export const SH = 420;

export interface SceneProps {
  step: number;
  steps: SceneStep[];
  /** Unique per instance, for filter ids. */
  id: string;
}

const EASE = "cubic-bezier(.3,1.3,.5,1)";

/** Places its children, and glides there when the placement changes. */
export function At({
  x = 0,
  y = 0,
  r = 0,
  s = 1,
  o = 1,
  delay = 0,
  children,
}: {
  x?: number;
  y?: number;
  r?: number;
  s?: number;
  o?: number;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <g
      style={{
        transform: `translate(${x}px, ${y}px) rotate(${r}deg) scale(${s})`,
        opacity: o,
        transition: `transform .55s ${EASE} ${delay}s, opacity .35s ease ${delay}s`,
      }}
    >
      {children}
    </g>
  );
}

/** Full ink when it is this part's turn, pencil when it is not. */
export function Lit({ on, off = 0.28, children }: { on: boolean; off?: number; children: React.ReactNode }) {
  return <g style={{ opacity: on ? 1 : off, transition: "opacity .35s ease" }}>{children}</g>;
}

/** The plate: paper, then the drawing under the ink wobble. */
export function Plate({ id, children, over }: { id: string; children: React.ReactNode; over?: React.ReactNode }) {
  return (
    <svg viewBox={`0 0 ${SW} ${SH}`} className="ill-svg">
      <DeadpanDefs id={id} />
      <Paper id={id} w={SW} h={SH} />
      <Ink id={id}>{children}</Ink>
      {over}
    </svg>
  );
}

export const mono = (x: number, y: number, t: string, size = 18, fill: string = D.ink, anchor: "start" | "middle" | "end" = "middle") => (
  <text x={x} y={y} textAnchor={anchor} className="ill-mono" fontSize={size} fontWeight={700} fill={fill}>
    {t}
  </text>
);

export const hand = (x: number, y: number, t: string, size = 26, fill: string = D.ink, anchor: "start" | "middle" | "end" = "middle") => (
  <text x={x} y={y} textAnchor={anchor} className="ill-hand" fontSize={size} fontWeight={700} fill={fill}>
    {t}
  </text>
);

/** A small sheet of paper with ruled lines, drawn around its own centre. */
export function Page({ w = 40, h = 52, lines = 3, fill = "#fff" }: { w?: number; h?: number; lines?: number; fill?: string }) {
  return (
    <g>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} fill={fill} stroke={D.ink} strokeWidth={3.5} />
      {Array.from({ length: lines }, (_, i) => (
        <path key={i} d={`M${-w / 2 + 7} ${-h / 2 + 12 + i * 11} H${w / 2 - 7 - (i % 2) * 8}`} stroke={D.greyLight} strokeWidth={3} strokeLinecap="round" />
      ))}
    </g>
  );
}

/** Strips the quotation marks an author put round a literal label. */
export const bare = (s: string) => s.replace(/^["“]|["”]$/g, "");

/** A tick that appears when `on`. Drawn around its own origin. */
export function Tick({ x, y, on, size = 1, color = D.leaf }: { x: number; y: number; on: boolean; size?: number; color?: string }) {
  return (
    <path
      d={`M${x - 9 * size} ${y} l ${6 * size} ${7 * size} l ${12 * size} ${-15 * size}`}
      fill="none"
      stroke={color}
      strokeWidth={5}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ opacity: on ? 1 : 0, transition: "opacity .3s" }}
    />
  );
}

/** Appears when `on`; otherwise absent. */
export function Show({ on, delay = 0, children }: { on: boolean; delay?: number; children: React.ReactNode }) {
  return <g style={{ opacity: on ? 1 : 0, transition: `opacity .3s ease ${delay}s` }}>{children}</g>;
}
