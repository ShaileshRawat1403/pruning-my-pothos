import Link from "next/link";
import SpotlightCard from "../../../components/SpotlightCard";
import { constructMetadata } from "../../../lib/seo/metadata";
import { getWebPageSchema } from "../../../lib/seo/jsonld";
import {
  getReferenceSheets,
  REFERENCE_DISCLOSURE,
  REFERENCE_TYPE_LABEL,
} from "../../../lib/content/reference-sheets";

const DESCRIPTION =
  "Quick-reference sheets to download: slide guides, architecture sheets, cheat sheets and mind maps for connecting the dots across applied AI systems.";

// Noindexed until the first sheet is published, so search engines never meet
// an empty shelf.
export const metadata = constructMetadata({
  title: "Reference Sheets",
  description: DESCRIPTION,
  path: "/shelf/reference",
  noindex: getReferenceSheets().length === 0,
});

const COMING = [
  { type: "Slide guide", note: "A system, step by step, ending with where it breaks." },
  { type: "Architecture sheet", note: "Every component, every flow, every trust boundary on one page." },
  { type: "Mind map", note: "One topic, all its branches, for connecting the dots." },
];

export default function ReferenceSheetsPage() {
  const sheets = getReferenceSheets();
  const schema = getWebPageSchema({ title: "Reference Sheets", description: DESCRIPTION, path: "/shelf/reference" });

  return (
    <div className="relative w-full flex flex-col gap-12 max-w-[960px] mx-auto py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="flex flex-col gap-4 border-b pb-8" style={{ borderColor: "var(--card-border)" }}>
        <div className="flex items-center gap-2">
          <span className="h-px w-8" style={{ background: "var(--accent-cyan)" }} />
          <Link href="/shelf/" className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] hover:underline" style={{ color: "var(--text-muted)" }}>
            Shelf
          </Link>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold" style={{ color: "var(--text-primary)" }}>
          Reference sheets
        </h1>
        <p className="text-base leading-relaxed max-w-2xl" style={{ color: "var(--text-secondary)" }}>
          Quick-reference sheets to download and keep: slide guides, architecture sheets, cheat sheets and mind maps.
          Each one links back to the Systems articles it connects.
        </p>
        <p className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
          {REFERENCE_DISCLOSURE}
        </p>
      </section>

      {sheets.length === 0 ? (
        <section aria-labelledby="coming-title" className="flex flex-col gap-6">
          <h2 id="coming-title" className="font-heading text-lg font-bold" style={{ color: "var(--text-primary)" }}>
            The first sheets are being drafted.
          </h2>
          <ul className="m-0 grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-3">
            {COMING.map((c) => (
              <li
                key={c.type}
                className="flex flex-col gap-3 rounded-sm border border-dashed p-5"
                style={{ borderColor: "var(--card-border)" }}
              >
                <div className="aspect-[4/3] w-full rounded-sm" style={{ background: "var(--card-bg)" }} aria-hidden="true" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em]" style={{ color: "var(--accent-cyan)" }}>
                  {c.type}
                </span>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {c.note}
                </p>
              </li>
            ))}
          </ul>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Meanwhile, the <Link href="/storyboards/" className="underline underline-offset-4">storyboards</Link> draw
            single Systems articles as illustrated PDFs.
          </p>
        </section>
      ) : (
        <ul className="m-0 grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
          {sheets.map((s) => (
            <li key={s.slug}>
              <SpotlightCard href={s.file} accent="var(--accent-cyan)" className="gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.thumbnail} alt="" className="aspect-[4/3] w-full rounded-sm object-cover" loading="lazy" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em]" style={{ color: "var(--accent-cyan)" }}>
                  {REFERENCE_TYPE_LABEL[s.type]}
                  {s.pages ? ` · ${s.pages} pages` : ""}
                </span>
                <h2 className="font-heading text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                  {s.title}
                </h2>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {s.summary}
                </p>
                <span className="text-xs font-semibold" style={{ color: "var(--accent-cyan)" }}>
                  Download ➔
                </span>
              </SpotlightCard>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
