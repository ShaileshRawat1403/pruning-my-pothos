import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { constructMetadata } from "../../../../lib/seo/metadata";
import { BUILDER_SECTION, REFERENCE_SHEETS } from "../../../../lib/content/reference-sheets";
import SheetPage from "../../../../components/SheetPage";

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
  return constructMetadata({
    title: `${sheet.title} | ${BUILDER_SECTION.name}`,
    description: `After this, you can ${sheet.promise} ${sheet.summary}`.slice(0, 300),
    path: `/shelf/reference/${slug}`,
  });
}

export default async function SheetRoute({ params }: PageProps) {
  const { slug } = await params;
  const sheet = REFERENCE_SHEETS.find((s) => s.slug === slug);
  if (!sheet) notFound();
  return <SheetPage sheet={sheet} />;
}
