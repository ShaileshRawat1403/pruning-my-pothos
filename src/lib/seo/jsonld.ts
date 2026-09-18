import { SITE_CONFIG } from "./site";

const PERSON_ID = `${SITE_CONFIG.url}/about/#person`;

export function getPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    "name": SITE_CONFIG.author,
    "url": `${SITE_CONFIG.url}/about/`,
    "jobTitle": "AI Systems Consultant and Technical Communicator",
    "worksFor": {
      "@type": "Organization",
      "name": SITE_CONFIG.name,
      "url": SITE_CONFIG.url,
    },
    "sameAs": [
      "https://www.linkedin.com/in/shailesh-rawat",
      "https://github.com/ShaileshRawat1403",
    ],
    "knowsAbout": [
      "AI orchestration",
      "AI governance",
      "LLM systems design",
      "Natural language programming",
      "Human-in-the-loop workflows",
      "Technical communication",
    ],
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_CONFIG.name,
    "url": SITE_CONFIG.url,
  };
}

export function getOrgSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SITE_CONFIG.name,
    "url": SITE_CONFIG.url,
    "logo": `${SITE_CONFIG.url}/favicon.png`,
  };
}

interface WebPageInput {
  title: string;
  description: string;
  path: string;
  image?: string;
}

export function getWebPageSchema({ title, description, path, image }: WebPageInput) {
  let cleanPath = path;
  if (cleanPath && !cleanPath.endsWith("/")) {
    cleanPath += "/";
  }
  if (cleanPath && !cleanPath.startsWith("/")) {
    cleanPath = "/" + cleanPath;
  }
  const canonicalUrl = cleanPath === "/" ? SITE_CONFIG.url : `${SITE_CONFIG.url}${cleanPath}`;
  const imageUrl = image ? (image.startsWith("http") ? image : `${SITE_CONFIG.url}${image}`) : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": canonicalUrl,
    ...(imageUrl ? { "image": imageUrl } : {}),
  };
}

interface ArticleInput {
  title: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
}

export function getArticleSchema({ title, description, path, datePublished, dateModified, image }: ArticleInput) {
  let cleanPath = path;
  if (cleanPath && !cleanPath.endsWith("/")) {
    cleanPath += "/";
  }
  if (cleanPath && !cleanPath.startsWith("/")) {
    cleanPath = "/" + cleanPath;
  }
  const canonicalUrl = cleanPath === "/" ? SITE_CONFIG.url : `${SITE_CONFIG.url}${cleanPath}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "url": canonicalUrl,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    ...(datePublished ? { "datePublished": datePublished } : {}),
    ...(dateModified ? { "dateModified": dateModified } : {}),
    "author": {
      "@type": "Person",
      "@id": PERSON_ID,
      "name": SITE_CONFIG.author,
      "url": `${SITE_CONFIG.url}/about/`,
    },
    "publisher": {
      "@type": "Organization",
      "name": SITE_CONFIG.name,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_CONFIG.url}/favicon.png`,
      },
    },
    ...(image
      ? {
          "image": (() => {
            const raster = image.endsWith(".svg") ? image.replace(/\.svg$/, ".png") : image;
            return raster.startsWith("http") ? raster : `${SITE_CONFIG.url}${raster}`;
          })(),
        }
      : {}),
  };
}

interface BreadcrumbItem {
  name: string;
  path: string;
}

/**
 * Breadcrumb trail for detail pages. Search engines use this to show the
 * section a page sits in rather than a bare URL, so the last item is the page
 * itself and every item carries an absolute URL.
 */
export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  if (!items || items.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => {
      let cleanPath = item.path;
      if (cleanPath && !cleanPath.endsWith("/")) {
        cleanPath += "/";
      }
      if (cleanPath && !cleanPath.startsWith("/")) {
        cleanPath = "/" + cleanPath;
      }
      const url = cleanPath === "/" ? SITE_CONFIG.url : `${SITE_CONFIG.url}${cleanPath}`;

      return {
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": url,
      };
    }),
  };
}

interface SoftwareAppInput {
  name: string;
  description: string;
  path: string;
}

export function getSoftwareAppSchema({ name, description, path }: SoftwareAppInput) {
  let cleanPath = path;
  if (cleanPath && !cleanPath.endsWith("/")) {
    cleanPath += "/";
  }
  if (cleanPath && !cleanPath.startsWith("/")) {
    cleanPath = "/" + cleanPath;
  }
  const canonicalUrl = `${SITE_CONFIG.url}${cleanPath}`;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": name,
    "description": description,
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "All",
    "url": canonicalUrl,
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD",
    },
  };
}

interface FAQInput {
  faq: Array<{ question: string; answer: string }>;
}

export function getFaqSchema({ faq }: FAQInput) {
  if (!faq || faq.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  };
}
