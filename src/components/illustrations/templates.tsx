import React from "react";
import { C, FrameShell, Hand, Para, Strike } from "./kit";
import { Num } from "./props";

/**
 * templates.tsx — the six frame layouts every storyboard is built from.
 *
 *   CoverTemplate     frame 1: title, a hero drawing, a strip, one summary
 *   StepsTemplate     an ordered path, 2-6 rows, icon + title + hand note
 *   CardsTemplate     2-4 cards, any of them struck (the Pruning Mark)
 *   ContrastTemplate  two panels side by side, either may be struck
 *   SceneTemplate     a free drawing, with an optional "this -> that" line
 *   CloseTemplate     last frame: headline, a drawing, takeaway, link home
 *
 * All coordinates are on the 1080 x 1350 master. Drawings passed in as
 * children are placed in absolute frame coordinates unless a template says it
 * translates them (Steps icons, Cards icons, Contrast art). Text sizes here are
 * the legibility floor: the frame is read at about a third of this size in a
 * phone feed, so nothing smaller than 27px belongs on a frame.
 */

export interface FrameProps {
  label: string;
  number: number;
  total: number;
}

type Base = FrameProps & { chapter: string };

const FOOT = { x: 76, w: 928 };

/* ── Cover ──────────────────────────────────────────────────────────── */

export function CoverTemplate({
  label,
  number,
  total,
  chapter,
  titleLines,
  hero,
  heroLabel,
  heroQuip,
  strip,
  summary,
}: Base & {
  titleLines: string[];
  /** Drawn in frame coordinates, inside roughly x 600-1004, y 180-520. */
  hero: React.ReactNode;
  heroLabel: string;
  heroQuip: string[];
  /** Drawn in frame coordinates, inside roughly y 640-980. */
  strip: React.ReactNode;
  summary: string;
}) {
  return (
    <FrameShell label={label} chapter={chapter} number={number} total={total} headline={[]}>
      <rect x={0} y={0} width={1080} height={8} fill={C.ink} />
      <text x={76} y={150} className="ill-mono" fontSize={16} letterSpacing={3} fill={C.accent}>
        A STORYBOARD IN {total} FRAMES
      </text>
      <text className="ill-sans" fontSize={84} fontWeight={800} letterSpacing={-3} fill={C.ink}>
        {titleLines.map((l, i) => (
          <tspan key={i} x={76} y={250 + i * 86}>
            {l}
          </tspan>
        ))}
      </text>
      {hero}
      <text x={800} y={556} textAnchor="middle" className="ill-mono" fontSize={17} letterSpacing={2} fill={C.muted}>
        {heroLabel}
      </text>
      {heroQuip.map((q, i) => (
        <Hand key={i} x={800} y={600 + i * 40} size={40} color={C.accent} anchor="middle">
          {q}
        </Hand>
      ))}
      {strip}
      <Para x={76} y={1014} w={928} h={230} size={34}>
        {summary}
      </Para>
    </FrameShell>
  );
}

/* ── Steps ──────────────────────────────────────────────────────────── */

export interface Step {
  title: string;
  note: string;
  /** Drawn in a local 0-120 box. Defaults to the step number. */
  icon?: React.ReactNode;
  /** Colour the note as the point of the frame. */
  accent?: boolean;
}

export function StepsTemplate({
  label,
  number,
  total,
  chapter,
  headline,
  steps,
  top = 330,
  lead,
  footnote,
  footY = 1156,
}: Base & { headline: string[]; steps: Step[]; top?: number; lead?: React.ReactNode; footnote?: string; footY?: number }) {
  const n = steps.length;
  const pitch = Math.min(180, Math.floor((1128 - top) / n));
  const big = pitch >= 160;
  const titleSize = big ? 40 : 34;
  const noteSize = big ? 34 : 30;
  return (
    <FrameShell label={label} chapter={chapter} number={number} total={total} headline={headline}>
      {lead}
      {steps.map((s, i) => {
        const y = top + i * pitch;
        return (
          <g key={i}>
            <g transform={`translate(88 ${y}) scale(${big ? 1 : 0.86})`}>{s.icon ?? <Num n={i + 1} x={20} y={10} />}</g>
            {i < n - 1 && (
              <path
                d={`M148 ${y + (big ? 124 : 108)} L148 ${y + pitch - 6}`}
                stroke={C.accent}
                strokeWidth={4}
                strokeLinecap="round"
                strokeDasharray="2 12"
              />
            )}
            <text x={260} y={y + titleSize + 10} className="ill-sans" fontSize={titleSize} fontWeight={800} letterSpacing={-1} fill={C.ink}>
              {s.title}
            </text>
            <Hand x={260} y={y + titleSize + noteSize + 22} size={noteSize} color={s.accent ? C.accent : C.teal}>
              {s.note}
            </Hand>
          </g>
        );
      })}
      {footnote && (
        <Para x={FOOT.x} y={footY} w={FOOT.w} h={1268 - footY} size={footY < 1100 ? 30 : 28}>
          {footnote}
        </Para>
      )}
    </FrameShell>
  );
}

/* ── Cards ──────────────────────────────────────────────────────────── */

export interface Card {
  label: string;
  /** Approximate rendered width of `label`, used to size the strike. */
  labelW?: number;
  notes: string[];
  /** Drawn in a local 0-100 box. */
  icon?: React.ReactNode;
  /** The Pruning Mark: this card names something that is not the answer. */
  struck?: boolean;
}

export function CardsTemplate({
  label,
  number,
  total,
  chapter,
  headline,
  scene,
  cards,
  footnote,
}: Base & { headline: string[]; scene?: React.ReactNode; cards: Card[]; footnote?: string }) {
  const top = scene ? 604 : 360;
  const h = scene ? 244 : 300;
  const gap = 30;
  return (
    <FrameShell label={label} chapter={chapter} number={number} total={total} headline={headline}>
      {scene}
      {cards.map((c, i) => {
        const x = i % 2 === 0 ? 76 : 552;
        const y = top + Math.floor(i / 2) * (h + gap);
        const tx = c.icon ? x + 142 : x + 30;
        const ly = y + (scene ? 100 : 118);
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={452}
              height={h}
              rx={6}
              fill={c.struck ? C.fadedCard : C.card}
              stroke={c.struck ? C.fadedBorder : C.ink}
              strokeWidth={c.struck ? 2.5 : 3}
            />
            {c.icon && <g transform={`translate(${x + 22} ${y + (h - 100) / 2 - 10})`}>{c.icon}</g>}
            <text x={tx} y={ly} className="ill-sans" fontSize={32} fontWeight={800} fill={c.struck ? C.muted : C.ink}>
              {c.label}
            </text>
            {c.struck && <Strike x={tx - 6} y={ly - 11} w={(c.labelW ?? c.label.length * 18) + 12} width={4} />}
            {c.notes.map((note, j) => (
              <Hand key={j} x={tx} y={ly + 52 + j * 40} size={36} color={c.struck ? C.ink : C.teal}>
                {note}
              </Hand>
            ))}
          </g>
        );
      })}
      {footnote && (
        <Para x={FOOT.x} y={top + 2 * h + gap + 34} w={FOOT.w} h={1260 - (top + 2 * h + gap + 34)} size={30}>
          {footnote}
        </Para>
      )}
    </FrameShell>
  );
}

/* ── Contrast ───────────────────────────────────────────────────────── */

export interface Panel {
  title: string;
  titleW?: number;
  notes: string[];
  /** Drawn in panel-local coordinates, a 444 x 380 box. */
  art: React.ReactNode;
  struck?: boolean;
}

export function ContrastTemplate({
  label,
  number,
  total,
  chapter,
  headline,
  left,
  right,
  footnote,
}: Base & { headline: string[]; left: Panel; right: Panel; footnote?: string }) {
  const top = 330;
  return (
    <FrameShell label={label} chapter={chapter} number={number} total={total} headline={headline}>
      {[left, right].map((p, i) => {
        const x = i === 0 ? 76 : 560;
        return (
          <g key={i}>
            <rect
              x={x}
              y={top}
              width={444}
              height={680}
              rx={8}
              fill={p.struck ? C.fadedCard : C.card}
              stroke={p.struck ? C.fadedBorder : C.ink}
              strokeWidth={p.struck ? 2.5 : 3}
            />
            <g transform={`translate(${x} ${top})`}>{p.art}</g>
            <text x={x + 28} y={top + 440} className="ill-sans" fontSize={36} fontWeight={800} fill={p.struck ? C.muted : C.ink}>
              {p.title}
            </text>
            {p.struck && <Strike x={x + 22} y={top + 428} w={(p.titleW ?? p.title.length * 20) + 12} width={5} />}
            {p.notes.map((n, j) => (
              <Hand key={j} x={x + 28} y={top + 496 + j * 42} size={34} color={p.struck ? C.ink : C.teal}>
                {n}
              </Hand>
            ))}
          </g>
        );
      })}
      {footnote && (
        <Para x={FOOT.x} y={1040} w={FOOT.w} h={220} size={30}>
          {footnote}
        </Para>
      )}
    </FrameShell>
  );
}

/* ── Scene ──────────────────────────────────────────────────────────── */

export function SceneTemplate({
  label,
  number,
  total,
  chapter,
  headline,
  children,
  prune,
  footnote,
  footY = 1060,
}: Base & {
  headline: string[];
  children: React.ReactNode;
  /** A "this -> that" line: the struck idea, then the one that survives.
   *  `fromW` overrides the estimated width of `from` for wide glyphs. */
  prune?: { from: string; to: string; y: number; fromW?: number };
  footnote?: string;
  footY?: number;
}) {
  const fromW = prune ? (prune.fromW ?? prune.from.length * 30) : 0;
  return (
    <FrameShell label={label} chapter={chapter} number={number} total={total} headline={headline}>
      {children}
      {prune && (
        <g>
          <text x={76} y={prune.y} className="ill-sans" fontSize={52} fontWeight={800} letterSpacing={-1.2} fill={C.muted}>
            {prune.from}
          </text>
          <Strike x={68} y={prune.y - 18} w={fromW + 12} width={5.5} />
          <text x={76 + fromW + 30} y={prune.y - 5} className="ill-sans" fontSize={44} fill={C.accent}>
            &rarr;
          </text>
          <text x={76 + fromW + 94} y={prune.y} className="ill-sans" fontSize={52} fontWeight={800} letterSpacing={-1.2} fill={C.ink}>
            {prune.to}
          </text>
        </g>
      )}
      {footnote && (
        <Para x={FOOT.x} y={footY} w={FOOT.w} h={1262 - footY} size={30}>
          {footnote}
        </Para>
      )}
    </FrameShell>
  );
}

/* ── Close ──────────────────────────────────────────────────────────── */

export function CloseTemplate({
  label,
  number,
  total,
  chapter,
  headline,
  children,
  takeaway,
  slug,
}: Base & { headline: string[]; children: React.ReactNode; takeaway: string; slug: string }) {
  return (
    <FrameShell label={label} chapter={chapter} number={number} total={total} headline={headline}>
      {children}
      <Para x={FOOT.x} y={876} w={FOOT.w} h={160} size={30}>
        {takeaway}
      </Para>
      <rect x={76} y={1044} width={928} height={184} rx={10} fill={C.card} stroke={C.ink} strokeWidth={3} />
      <text x={110} y={1104} className="ill-sans" fontSize={36} fontWeight={800} letterSpacing={-0.8} fill={C.ink}>
        Read the whole explanation
      </text>
      <text className="ill-mono" fontSize={22} fill={C.muted}>
        <tspan x={110} y={1152}>
          pruningmypothos.com/systems/
        </tspan>
        <tspan x={110} y={1186}>
          {slug}/
        </tspan>
      </text>
      <text x={966} y={1150} textAnchor="end" className="ill-sans" fontSize={56} fill={C.accent}>
        &rarr;
      </text>
    </FrameShell>
  );
}
