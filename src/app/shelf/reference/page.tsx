import Link from "next/link";
import SpotlightCard from "../../../components/SpotlightCard";
import { constructMetadata } from "../../../lib/seo/metadata";
import { getWebPageSchema } from "../../../lib/seo/jsonld";
import {
  getReferenceSheets,
  BUILDER_SECTION,
  REFERENCE_DISCLOSURE,
  REFERENCE_TYPE_LABEL,
  REFERENCE_TYPE_NOTE,
  type ReferenceSheetType,
} from "../../../lib/content/reference-sheets";

const DESCRIPTION = `${BUILDER_SECTION.name}: ${BUILDER_SECTION.tagline} Field manuals, cheat sheets and maps for building with AI, each linked to the Systems article that explains why.`;

// Noindexed until the first sheet is published, so search engines never meet
// an empty shelf.
export const metadata = constructMetadata({
  title: BUILDER_SECTION.name,
  description: DESCRIPTION,
  path: "/shelf/reference",
  noindex: getReferenceSheets().length === 0,
});

const COMING: ReferenceSheetType[] = ["manual", "mindmap", "architecture"];

export default function ReferenceSheetsPage() {
  const sheets = getReferenceSheets();
  const schema = getWebPageSchema({ title: BUILDER_SECTION.name, description: DESCRIPTION, path: "/shelf/reference" });

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
          {BUILDER_SECTION.name}
        </h1>
        <p className="font-heading text-lg font-bold" style={{ color: "var(--text-primary)" }}>
          {BUILDER_SECTION.tagline}
        </p>
        <p className="text-base leading-relaxed max-w-2xl" style={{ color: "var(--text-secondary)" }}>
          {BUILDER_SECTION.intro}
        </p>
      </section>

      {sheets.length === 0 ? (
        <section aria-labelledby="coming-title" className="flex flex-col gap-6">
          <h2 id="coming-title" className="font-heading text-lg font-bold" style={{ color: "var(--text-primary)" }}>
            The first manuals are being written.
          </h2>
          <ul className="m-0 grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-3">
            {COMING.map((type) => (
              <li
                key={type}
                className="flex flex-col gap-3 rounded-sm border border-dashed p-5"
                style={{ borderColor: "var(--card-border)" }}
              >
                <div className="aspect-[4/3] w-full rounded-sm" style={{ background: "var(--card-bg)" }} aria-hidden="true" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em]" style={{ color: "var(--accent-cyan)" }}>
                  {REFERENCE_TYPE_LABEL[type]}
                </span>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {REFERENCE_TYPE_NOTE[type]}
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
                {s.drafted === "notebooklm" && (
                  <p className="font-mono text-[10px]" style={{ color: "var(--text-muted)" }}>{REFERENCE_DISCLOSURE}</p>
                )}
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
