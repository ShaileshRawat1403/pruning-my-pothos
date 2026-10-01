import Link from "next/link";
import type { ComponentType } from "react";
import { allSystems } from "content-collections";
import {
  BUILDER_SECTION,
  REFERENCE_TYPE_LABEL,
  type ReferenceSheet,
} from "../lib/content/reference-sheets";
import { placeOf } from "../lib/content/systems-ia";
import type { SceneStep } from "../lib/scene-steps";
import { SheetCover } from "./illustrations/sheets";
import CoverFilm from "./illustrations/CoverFilm";
import SceneVisual from "./visuals/SceneVisual";
import type { SceneProps } from "./illustrations/scenes/kit";

/**
 * One Works On My Prompt sheet (docs/BUILDER_TRACK.md, "The sheet format").
 *
 * Order, top to bottom: the drawn cover; the promise; the situation; the
 * steps, drawn as a pinned scroll scene where one exists (each beat is one
 * step: do this, check that, here is what failure looks like) or as a plain
 * list where not; the tools, each from its own docs and dated; where it
 * stops, with the Systems article that explains why; the sources.
 */

/** A sheet's steps as scroll-scene beats. */
export function sheetSteps(sheet: ReferenceSheet): SceneStep[] {
  return (sheet.steps ?? []).map((s, i) => ({
    id: s.id,
    tag: `Step ${String(i + 1).padStart(2, "0")}`,
    title: s.do,
    body: `Check: ${s.check}`,
    note: `If it fails: ${s.fails}`,
  }));
}

export default function SheetPage({ sheet, drawing }: { sheet: ReferenceSheet; drawing?: ComponentType<SceneProps> }) {
  const article = allSystems.find((a) => a._meta.path === sheet.article);
  const place = placeOf(sheet.article);
  const steps = sheetSteps(sheet);

  return (
    <article className="mx-auto flex max-w-[840px] flex-col gap-8 py-8">
      <header className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2 font-mono text-[10px] font-bold uppercase tracking-wider text-[color:var(--text-muted)]">
          <Link href="/shelf/reference/" className="hover:underline">
            {BUILDER_SECTION.name}
          </Link>
          <span>&bull;</span>
          <span>{REFERENCE_TYPE_LABEL[sheet.type]}</span>
          {place.stage && (
            <>
              <span>&bull;</span>
              <span>
                Stage {String(place.stage.number).padStart(2, "0")} &middot; {place.stage.label}
              </span>
            </>
          )}
        </div>
        <h1 className="font-heading text-3xl font-extrabold text-[color:var(--text-primary)] sm:text-4xl">{sheet.title}</h1>
        <p className="m-0 font-heading text-lg font-bold text-[color:var(--text-primary)]">After this, you can {sheet.promise}</p>
      </header>

      {/* Where the sheet has a cover film (illustrations/films/), it plays once, then rests. */}
      <figure className="ill-alive m-0 w-full overflow-hidden rounded-sm border border-[#D9D4C6]">
        <CoverFilm slug={sheet.slug}>
          <SheetCover slug={sheet.slug} type={sheet.type} title={sheet.title} promise={sheet.promise} quip={sheet.quip} />
        </CoverFilm>
      </figure>

      <div className="content-body">
        <p>{sheet.summary}</p>
      </div>

      {steps.length > 0 &&
        (drawing || sheet.scene ? (
          <figure className="scene-visual">
            <SceneVisual sceneId={sheet.scene ?? sheet.slug} alt={`The steps of ${sheet.title}, drawn.`} steps={steps} drawing={drawing} />
          </figure>
        ) : (
          <ol className="m-0 flex list-none flex-col gap-4 p-0">
            {steps.map((s) => (
              <li key={s.id} className="border-l-[3px] border-[color:var(--accent-purple)] pl-4">
                <span className="scene-tag">{s.tag}</span>
                <p className="scene-title">{s.title}</p>
                <p className="scene-body">{s.body}</p>
                <p className="scene-note">{s.note}</p>
              </li>
            ))}
          </ol>
        ))}

      {sheet.tools && sheet.tools.length > 0 && (
        <section aria-labelledby="sheet-tools" className="flex flex-col gap-4">
          <h2 id="sheet-tools" className="font-heading text-xl font-extrabold text-[color:var(--text-primary)]">
            The tools, from their own docs
          </h2>
          <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2">
            {sheet.tools.map((t) => (
              <li key={t.name} className="flex flex-col gap-2 rounded-sm border border-[color:var(--card-border)] bg-[color:var(--card-bg)] p-4">
                <a href={t.docs} target="_blank" rel="noopener noreferrer" className="font-heading font-bold text-[color:var(--text-primary)] underline underline-offset-4">
                  {t.name}
                </a>
                <p className="m-0 text-sm leading-relaxed text-[color:var(--text-secondary)]">
                  <span className="font-semibold text-[color:var(--text-primary)]">For: </span>
                  {t.forWhat}
                </p>
                <p className="m-0 text-sm leading-relaxed text-[color:var(--text-secondary)]">
                  <span className="font-semibold text-[color:var(--text-primary)]">Does not: </span>
                  {t.notFor}
                </p>
                <p className="m-0 font-mono text-[11px] text-[color:var(--text-muted)]">As of {t.asOf}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="sheet-stops" className="flex flex-col gap-3 rounded-sm border border-[color:var(--card-border)] p-5">
        <h2 id="sheet-stops" className="font-heading text-lg font-bold text-[color:var(--text-primary)]">
          Where this stops
        </h2>
        <p className="m-0 text-base leading-relaxed text-[color:var(--text-secondary)]">{sheet.stops}</p>
        {article && (
          <p className="m-0 text-sm text-[color:var(--text-secondary)]">
            Why:{" "}
            <Link href={`/systems/${sheet.article}/`} className="font-semibold text-[color:var(--text-primary)] underline underline-offset-4">
              {article.title}
            </Link>
          </p>
        )}
      </section>

      {sheet.sources.length > 0 && (
        <section aria-labelledby="sheet-sources" className="flex flex-col gap-2">
          <h2 id="sheet-sources" className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
            Sources
          </h2>
          <ul className="m-0 flex list-none flex-col gap-1 p-0 text-sm">
            {sheet.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-[color:var(--text-secondary)] underline underline-offset-4">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
