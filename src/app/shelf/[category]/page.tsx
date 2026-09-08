import { allShelves } from "content-collections";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import SpotlightCard from "../../../components/SpotlightCard";
import { constructMetadata } from "../../../lib/seo/metadata";
import { getWebPageSchema } from "../../../lib/seo/jsonld";

interface PageProps {
  params: Promise<{ category: string }>;
}

const VALID_CATEGORIES = [
  "books",
  "culture",
  "local-experiments",
  "music",
  "notes",
  "philosophy",
  "shared-resources",
  "tools"
];

export const dynamicParams = false;

export function generateStaticParams() {
  return VALID_CATEGORIES.map((cat) => ({ category: cat }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  if (!VALID_CATEGORIES.includes(category)) return {};

  const titleMap: Record<string, string> = {
    books: "Bookshelf & Readings",
    culture: "Culture Shelf",
    "local-experiments": "Local Experiments Shelf",
    music: "Music Shelf",
    notes: "Notes Shelf",
    philosophy: "Philosophy & Beliefs",
    "shared-resources": "Shared Resources Shelf",
    tools: "Tools & Stack"
  };

  return constructMetadata({
    title: titleMap[category] || `${category} Shelf`,
    description: `Browse index listings for the ${category} category inside the workspace.`,
    path: `/shelf/${category}`
  });
}

export default async function ShelfCategoryIndexPage({ params }: PageProps) {
  const { category } = await params;
  if (!VALID_CATEGORIES.includes(category)) {
    return notFound();
  }

  // Filter items in allShelves belonging to this category directory
  const items = allShelves.filter((item) => item._meta.directory === category);

  const titleMap: Record<string, string> = {
    books: "Books & Readings",
    culture: "Culture Shelf",
    "local-experiments": "Local Experiments",
    music: "Music & Soundtrack",
    notes: "Notes & Fragments",
    philosophy: "Philosophy & Beliefs",
    "shared-resources": "Shared Resources",
    tools: "Tools & Stack"
  };

  const currentTitle = titleMap[category] || category;

  const schema = getWebPageSchema({
    title: `${currentTitle} Shelf | Pruning My Pothos`,
    description: `Index collection listing of articles under the ${category} workspace category.`,
    path: `/shelf/${category}`
  });

  return (
    <div className="relative w-full flex flex-col gap-16 max-w-[800px] mx-auto py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="flex flex-col gap-4 border-b pb-8" style={{ borderColor: "var(--card-border)" }}>
        <div className="flex items-center gap-2">
          <span className="h-px w-8" style={{ background: "var(--accent-cyan)" }} />
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
            Shelf Category
          </span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold" style={{ color: "var(--text-primary)" }}>
          {currentTitle}
        </h1>
        <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          Index of items under the {category} catalog directory.
        </p>
      </section>

      {items.length === 0 ? (
        <p className="text-sm italic" style={{ color: "var(--text-muted)" }}>No entries published in this category yet.</p>
      ) : (
        <section className="flex flex-col gap-6">
          {items.map((item) => {
            const slug = item._meta.fileName.replace(/\.mdx?$/, "");
            return (
              <SpotlightCard key={slug} href={`/shelf/${category}/${slug}`} accent="var(--accent-cyan)" className="gap-2">
                <span className="text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>
                  {item.publishDate ? new Date(item.publishDate).toLocaleDateString("en-US", { year: "numeric", month: "short" }) : "Archive"}
                </span>
                <h3 className="font-heading text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {item.description}
                </p>
                <span
                  className="text-xs font-semibold self-start mt-2 inline-flex items-center gap-1 transition-all duration-200 group-hover:gap-2"
                  style={{ color: "var(--accent-cyan)" }}
                >
                  Read entry &rarr;
                </span>
              </SpotlightCard>
            );
          })}
        </section>
      )}

      <div className="border-t pt-8 mt-4 flex justify-between items-center text-xs font-mono" style={{ borderColor: "var(--card-border)" }}>
        <Link href="/shelf" className="link-slide font-semibold" style={{ color: "var(--text-secondary)" }}>
          &larr; Back to Shelf
        </Link>
      </div>
    </div>
  );
}
