import { allSentences } from "content-collections";
import Link from "next/link";
import SpotlightCard from "../../components/SpotlightCard";
import SectionHeader from "../../components/SectionHeader";
import { constructMetadata } from "../../lib/seo/metadata";
import { getWebPageSchema } from "../../lib/seo/jsonld";

export const metadata = constructMetadata({
  title: "Sentences Archive",
  description: "A chronological archive of short reflections, principles, and writing on systems design.",
  path: "/sentences"
});

export default function SentencesIndexPage() {
  const schema = getWebPageSchema({
    title: "Sentences Archive",
    description: "A chronological archive of short reflections, principles, and writing on systems design.",
    path: "/sentences"
  });

  return (
    <div className="relative flex flex-col gap-16 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Section header */}
      <SectionHeader
        eyebrow="Writing Archive"
        title="Sentences"
        intro="Short reflections, decision rules, and principles. The whole point of an aphorism is that it survives being carried alone."
        scene="writing"
        slim
        tick="var(--accent-blue)"
      />


      {allSentences.length === 0 ? (
        <p className="text-sm italic" style={{ color: "var(--text-muted)" }}>No sentences archived yet.</p>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allSentences.map((item) => {
            const slug = item._meta.path;
            return (
              <SpotlightCard key={slug} href={`/sentences/${slug}`} accent="var(--accent-blue)" className="gap-3 justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-sm"
                    style={{ color: "var(--accent-blue)", background: "color-mix(in srgb, var(--accent-blue) 10%, transparent)", border: "1px solid color-mix(in srgb, var(--accent-blue) 20%, transparent)" }}
                  >
                    {item.category || "Reflection"}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed italic border-l-2 pl-3 py-1" style={{ color: "var(--text-secondary)", borderColor: "var(--card-border)" }}>
                  {item.summary}
                </p>
                <span
                  className="text-xs font-semibold self-start mt-2 font-mono uppercase tracking-wide inline-flex items-center gap-1 transition-all duration-200 group-hover:gap-2"
                  style={{ color: "var(--accent-blue)" }}
                >
                  Read &rarr;
                </span>
              </SpotlightCard>
            );
          })}
        </section>
      )}

      <div className="border-t pt-8 mt-4 flex justify-between items-center text-xs font-mono" style={{ borderColor: "var(--card-border)" }}>
        <Link href="/sentiments" className="link-slide font-semibold" style={{ color: "var(--text-secondary)" }}>
          &larr; Back to Sentiments Workspace
        </Link>
      </div>
    </div>
  );
}
