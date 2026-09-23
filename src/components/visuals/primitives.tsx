import React from "react";

/**
 * primitives.tsx — the small shared vocabulary the generated renderers draw with.
 *
 * Extracted because seven renderers were about to repeat the same panel, label,
 * bullet and crossing markup. It is deliberately not a visual framework: there
 * is no layout engine here, no configuration surface, and no abstraction over
 * what a visual *means*. Each renderer still owns its own composition and its
 * own responsive behaviour; these are the pieces that composition is made of.
 *
 * Every primitive is real DOM text. Nothing here renders into a fixed canvas,
 * because a fixed canvas is what forces text to shrink on a phone.
 * See docs/STORYBOARD_VISUAL_GRAMMAR_V1.md §3.
 */

type Tone = "neutral" | "accent" | "muted";

const TONE_TEXT: Record<Tone, string> = {
  neutral: "text-[color:var(--text-primary)]",
  accent: "text-[color:var(--accent-green)]",
  muted: "text-[color:var(--text-muted)]",
};

const TONE_BORDER: Record<Tone, string> = {
  neutral: "border-[color:var(--card-border)]",
  accent: "border-[color:var(--accent-green)]",
  muted: "border-[color:var(--card-border)]",
};

const TONE_DOT: Record<Tone, string> = {
  neutral: "bg-[color:var(--text-muted)]",
  accent: "bg-[color:var(--accent-green)]",
  muted: "bg-[color:var(--text-muted)]",
};

/** A bordered region with a heading. The unit every form is built from. */
export function Panel({
  label,
  tone = "neutral",
  children,
  labelSuffix,
}: {
  label: string;
  tone?: Tone;
  children: React.ReactNode;
  labelSuffix?: React.ReactNode;
}) {
  return (
    <div
      className={`flex flex-col gap-3 rounded-sm border bg-[color:var(--card-bg)] p-4 sm:p-5 ${TONE_BORDER[tone]}`}
    >
      <p className={`flex items-center gap-2 text-sm font-semibold ${TONE_TEXT[tone]}`}>
        <span>{label}</span>
        {labelSuffix}
      </p>
      {children}
    </div>
  );
}

/** A bulleted list of author-supplied strings. Wraps; never truncates. */
export function ItemList({
  items,
  tone = "neutral",
}: {
  items: string[];
  tone?: Tone;
}) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item, idx) => (
        <li
          key={idx}
          className="flex gap-2 text-sm leading-snug text-[color:var(--text-secondary)]"
        >
          <span
            aria-hidden="true"
            className={`mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full ${TONE_DOT[tone]}`}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * A labelled crossing: dashed rules either side of a label. Horizontal on a
 * phone so the reader passes *through* it going down the page, vertical from
 * `sm` so it separates two columns. Visible at every width, because the
 * crossing is the subject in boundary and state-change rather than decoration.
 */
export function Crossing({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-3 sm:flex-col sm:px-2">
      <span
        aria-hidden="true"
        className="h-px flex-1 border-t border-dashed border-[color:var(--card-border)] sm:h-auto sm:w-px sm:flex-1 sm:border-l sm:border-t-0"
      />
      <span className="max-w-[14rem] rounded-full border border-[color:var(--card-border)] bg-[color:var(--bg-elevated)] px-3 py-1 text-center text-sm font-medium text-[color:var(--text-muted)]">
        {label}
      </span>
      <span
        aria-hidden="true"
        className="h-px flex-1 border-t border-dashed border-[color:var(--card-border)] sm:h-auto sm:w-px sm:flex-1 sm:border-l sm:border-t-0"
      />
    </div>
  );
}

/**
 * The step/flow connector. Points down on a phone and right from `sm`, so the
 * arrow always agrees with the direction the composition actually reads.
 * aria-hidden: order is already carried by the DOM and by `<ol>` semantics.
 */
export function FlowArrow() {
  return (
    <div
      aria-hidden="true"
      className="flex items-center justify-center text-lg leading-none text-[color:var(--text-muted)]"
    >
      <span className="lg:hidden">&darr;</span>
      <span className="hidden lg:inline">&rarr;</span>
    </div>
  );
}

/** A secondary line under a step or support. */
export function Note({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs leading-relaxed text-[color:var(--text-muted)]">{children}</p>
  );
}

/** A closing line for the whole visual, such as a diff note or a declared gap. */
export function Footnote({
  label,
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <p className="mt-4 text-sm leading-relaxed text-[color:var(--text-muted)]">
      {label && (
        <span className="font-semibold text-[color:var(--text-secondary)]">
          {label}{" "}
        </span>
      )}
      {children}
    </p>
  );
}

/** The outer wrapper every generated visual shares. */
export function VisualFrame({
  alt,
  children,
}: {
  alt: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full" role="group" aria-label={alt}>
      {children}
    </div>
  );
}
