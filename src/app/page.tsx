import type { Metadata } from "next";
import { constructMetadata } from "../lib/seo/metadata";
import { SITE_POSITIONING } from "../lib/config/site-positioning";
import Hero from "../components/home/Hero";
import SystemsMap from "../components/home/SystemsMap";
import SelectedSystems from "../components/home/SelectedSystems";
import ReferencePreview from "../components/home/ReferencePreview";
import Projects from "../components/home/Projects";
import ShelfPreview from "../components/home/ShelfPreview";
import DriftingLeaf from "../components/home/DriftingLeaf";

export const metadata: Metadata = constructMetadata({
  path: "/",
});

const HOME_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://pruningmypothos.com/#website",
      "url": "https://pruningmypothos.com",
      "name": "Pruning My Pothos",
      "description": SITE_POSITIONING.canonicalDescription,
      "publisher": {
        "@id": "https://pruningmypothos.com/#organization",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://pruningmypothos.com/#organization",
      "name": "Pruning My Pothos",
      "url": "https://pruningmypothos.com",
      "logo": "https://pruningmypothos.com/favicon.png",
      "founder": {
        "@id": "https://pruningmypothos.com/#author",
      },
    },
    {
      "@type": "Person",
      "@id": "https://pruningmypothos.com/#author",
      "name": "Shailesh Rawat",
      "url": "https://pruningmypothos.com/about",
      "sameAs": [
        "https://github.com/ShaileshRawat1403",
        "https://www.linkedin.com/in/shailesh-rawat",
      ],
      "knowsAbout": [
        "AI orchestration",
        "AI governance",
        "LLM systems design",
        "Context compaction",
        "Autonomous workflows",
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://pruningmypothos.com/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://pruningmypothos.com",
        },
      ],
    },
  ],
};

export default function HomePage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-[#FAF9F6]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOME_STRUCTURED_DATA) }}
      />
      <Hero />
      <SystemsMap />
      <SelectedSystems />
      <ReferencePreview />
      <Projects />
      <ShelfPreview />
      <DriftingLeaf />
    </div>
  );
}
