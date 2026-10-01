import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { constructMetadata } from "../../../../lib/seo/metadata";
import { BUILDER_SECTION, REFERENCE_SHEETS } from "../../../../lib/content/reference-sheets";
import SheetPage from "../../../../components/SheetPage";
import { getBreadcrumbSchema, getHowToSchema } from "../../../../lib/seo/jsonld";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

// A static export needs at least one path for a dynamic route. Until the
// first sheet is published, a single "_" path renders the 404 page, and is
// kept out of the sitemap and search by notFound().
export function generateStaticParams() {
  return REFERENCE_SHEETS.length > 0 ? REFERENCE_SHEETS.map((s) => ({ slug: s.slug })) : [{ slug: "_" }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const sheet = REFERENCE_SHEETS.find((s) => s.slug === slug);
  if (!sheet) return {};
  // The promise is the description: one sentence saying what the reader can
  // do afterwards, short enough to show whole in a result.
  return constructMetadata({
    title: sheet.title,
    description: `${BUILDER_SECTION.name}: after this, you can ${sheet.promise}`,
    path: `/shelf/reference/${slug}`,
    image: `/covers/sheets/${slug}.png`,
    ogType: "article",
  });
}

export default async function SheetRoute({ params }: PageProps) {
  const { slug } = await params;
  const sheet = REFERENCE_SHEETS.find((s) => s.slug === slug);
  if (!sheet) notFound();
  const path = `/shelf/reference/${slug}`;
  const howTo = getHowToSchema({
    name: sheet.title,
    description: `After this, you can ${sheet.promise} ${sheet.summary}`,
    path,
    image: `/covers/sheets/${slug}.png`,
    datePublished: sheet.publishDate,
    dateModified: sheet.updatedAt ?? sheet.publishDate,
    steps: (sheet.steps ?? []).map((s) => ({ name: s.do, text: `${s.do} Check: ${s.check} If it fails: ${s.fails}` })),
    tools: sheet.tools?.map((t) => t.name),
    basedOn: `/systems/${sheet.article}/`,
  });
  const crumbs = getBreadcrumbSchema([
    { name: "Shelf", path: "/shelf/" },
    { name: BUILDER_SECTION.name, path: "/shelf/reference/" },
    { name: sheet.title, path },
  ]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      <SheetPage sheet={sheet} />
    </>
  );
}
