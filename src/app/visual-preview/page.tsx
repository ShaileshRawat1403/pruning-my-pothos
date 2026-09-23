import type { Metadata } from "next";
import VisualBlock from "../../components/visuals/VisualBlock";
import { VISUAL_FIXTURES } from "../../lib/content/visual-fixtures";

/**
 * /visual-preview — a development fixture surface, not a reader surface.
 *
 * Renders one instance of every generated visual form from a single fixture
 * dataset, so a renderer change can be inspected at 390px and 1440px without
 * hunting through articles or temporarily editing content.
 *
 * Deliberately outside the public information architecture, following the
 * precedent /editorial-preview already set: noindex, absent from sitemap.ts,
 * llms.txt, RSS, the header and the footer, and linked from nowhere. It builds
 * because the export builds every route; that is the only reason it exists in
 * out/.
 */
export const metadata: Metadata = {
  title: "Visual Preview",
  robots: { index: false, follow: false },
};

export default function VisualPreviewPage() {
  return (
    <div className="flex flex-col gap-10 py-12">
      <header className="flex flex-col gap-3 max-w-[760px]">
        <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[color:var(--text-muted)]">
          Development fixture
        </span>
        <h1 className="font-heading text-2xl font-extrabold text-[color:var(--text-primary)]">
          Visual Preview
        </h1>
        <p className="text-sm leading-relaxed text-[color:var(--text-secondary)]">
          One instance of every generated visual form, from{" "}
          <code className="font-mono text-xs">src/lib/content/visual-fixtures.ts</code>.
          Not published, not indexed, not linked. The copy is placeholder and
          makes no claim about anything.
        </p>
      </header>

      {VISUAL_FIXTURES.map((visual) => (
        <section key={visual.id} className="flex flex-col gap-3">
          <h2 className="font-mono text-xs uppercase tracking-wider text-[color:var(--text-muted)]">
            {visual.renderAs}
            <span className="ml-2 normal-case text-[color:var(--text-secondary)]">
              purpose: {visual.purpose}
            </span>
          </h2>
          <VisualBlock visual={visual} />
        </section>
      ))}
    </div>
  );
}
