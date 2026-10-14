import { Metadata } from "next";
import { SITE_CONFIG } from "./site";

interface MetadataInput {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  noindex?: boolean;
  ogType?: "website" | "article";
  imageAlt?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

// Search results show about 60 characters of a title. A long title keeps its
// words and drops the site name, rather than losing its end to an ellipsis.
const TITLE_LIMIT = 60;

export function constructMetadata({
  title,
  description,
  image,
  path = "",
  noindex = false,
  ogType = "website",
  imageAlt,
  publishedTime,
  modifiedTime,
}: MetadataInput = {}): Metadata {
  const branded = title ? `${title} | ${SITE_CONFIG.name}` : "";
  const metaTitle = !title ? SITE_CONFIG.defaultTitle : branded.length <= TITLE_LIMIT ? branded : title;
  const metaDesc = description || SITE_CONFIG.defaultDescription;
  // Social platforms (LinkedIn, X, Slack) do not render SVG og:images.
  // PNG variants are generated alongside each SVG cover.
  const rasterImage = image?.endsWith(".svg") ? image.replace(/\.svg$/, ".png") : image;
  const metaImage = rasterImage
    ? (rasterImage.startsWith("http") ? rasterImage : `${SITE_CONFIG.url}${rasterImage}`)
    : `${SITE_CONFIG.url}${SITE_CONFIG.defaultImage}`;
  
  // Ensure paths start and end cleanly with trailing slashes to match static export URL structure
  let cleanPath = path;
  if (cleanPath && !cleanPath.endsWith("/")) {
    cleanPath += "/";
  }
  if (cleanPath && !cleanPath.startsWith("/")) {
    cleanPath = "/" + cleanPath;
  }
  const canonicalUrl = cleanPath === "/" ? SITE_CONFIG.url : `${SITE_CONFIG.url}${cleanPath}`;

  return {
    title: metaTitle,
    description: metaDesc,
    alternates: {
      canonical: canonicalUrl,
      types: {
        "application/rss+xml": `${SITE_CONFIG.url}/rss.xml`,
      },
    },
    robots: {
      index: !noindex,
      follow: true,
    },
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      locale: "en_GB",
      images: [
        {
          url: metaImage,
          ...(imageAlt ? { alt: imageAlt } : {}),
        },
      ],
      type: ogType,
      ...(ogType === "article" && publishedTime ? { publishedTime, modifiedTime: modifiedTime ?? publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDesc,
      images: [metaImage],
    },
    authors: [{ name: SITE_CONFIG.author }],
  };
}
