import Link from "next/link";
import {
  BUILDER_SECTION,
  getReferenceSheets,
  REFERENCE_TYPE_LABEL,
  REFERENCE_TYPE_NOTE,
  type ReferenceSheetType,
} from "../../lib/content/reference-sheets";
import SpotlightCard from "../SpotlightCard";
import { SheetTypeEmblem } from "../illustrations/sheets";

// Home preview of Shelf → Works On My Prompt, read from the same list as the
// page, so it cannot drift. Until the first sheet is published it shows what
// is coming rather than an empty grid.
const PREVIEW_COUNT = 3;
const PLACEHOLDERS: ReferenceSheetType[] = ["manual", "mindmap", "architecture"];

export default function ReferencePreview() {
  const sheets = getReferenceSheets().slice(0, PREVIEW_COUNT);

  return (
    <section
      id="reference-sheets"
      aria-labelledby="reference-title"
      className="scroll-mt-28 w-full border-b border-[color:var(--card-border)] bg-[color:var(--bg-color)]"
    >
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12 py-16">
        <div className="flex justify-between items-end mb-8 flex-wrap gap-4">
          <div className="flex flex-col gap-1 max-w-2xl">
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[color:var(--text-muted)]">
              {BUILDER_SECTION.name}
            </span>
            <h2
              id="reference-title"
              className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[color:var(--text-primary)]"
            >
              {BUILDER_SECTION.tagline}
            </h2>
            <p className="text-sm leading-relaxed text-[color:var(--text-secondary)] mt-2">
              Post-mortems written before the incident, cheat sheets and maps, for the part after the demo works.{" "}
              {sheets.length === 0 ? "The first ones are being written." : ""}
            </p>
          </div>
          <Link
            href="/shelf/reference/"
            className="font-mono text-xs text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] underline underline-offset-4 decoration-[color:var(--card-border)] transition-colors"
          >
            {sheets.length === 0 ? "See what's coming" : `All of ${BUILDER_SECTION.name}`} <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <ul className="m-0 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {sheets.length === 0
            ? PLACEHOLDERS.map((type) => (
                <li
                  key={type}
                  className="flex flex-col gap-3 rounded-sm border border-dashed p-4 border-[color:var(--card-border)]"
                >
                  <div className="ill-alive overflow-hidden rounded-sm border border-[#D9D4C6]" aria-hidden="true">
                    <SheetTypeEmblem type={type} id={`home-${type}`} />
                  </div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
                    {REFERENCE_TYPE_LABEL[type]} · coming soon
                  </span>
                  <p className="text-sm leading-relaxed text-[color:var(--text-secondary)]">{REFERENCE_TYPE_NOTE[type]}</p>
                </li>
              ))
            : sheets.map((s) => (
                <li key={s.slug}>
                  <SpotlightCard href={`/shelf/reference/${s.slug}/`} compact className="gap-3">
                    <div className="ill-lift overflow-hidden rounded-sm border border-[#D9D4C6]" aria-hidden="true">
                      <SheetTypeEmblem type={s.type} id={`home-${s.slug}`} />
                    </div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
                      {REFERENCE_TYPE_LABEL[s.type]}
                    </span>
                    <h3 className="font-heading text-lg font-bold text-[color:var(--text-primary)]">{s.title}</h3>
                  </SpotlightCard>
                </li>
              ))}
        </ul>
      </div>
    </section>
  );
}
