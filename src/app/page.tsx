import type { Metadata } from "next";
import { allSystems } from "content-collections";
import { constructMetadata } from "../lib/seo/metadata";
import { SITE_POSITIONING } from "../lib/config/site-positioning";
import Hero from "../components/home/Hero";
import StartHere from "../components/home/StartHere";
import Projects from "../components/home/Projects";
import Tools from "../components/home/Tools";
import Methodology from "../components/home/Methodology";
import TopicPaths from "../components/home/TopicPaths";

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
    {
      "@type": "FAQPage",
      "@id": "https://pruningmypothos.com/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Pruning My Pothos?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Pruning My Pothos is an independent notebook and publication created by Shailesh Rawat. It publishes practical explainers, field notes, and architectural breakdowns of AI systems, grounded in real use and explained in plain language.",
          },
        },
        {
          "@type": "Question",
          "name": "What is the pruning approach behind the site?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "The approach is an iterative practice: notice real signals from direct use, test mechanisms in concrete environments, prune away unverified claims and brittle abstractions, examine failure boundaries directly, and retain only durable, verified patterns.",
          },
        },
        {
          "@type": "Question",
          "name": "Why do complex AI systems fail in practice?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Complex AI systems can fail when probabilistic model outputs are trusted without host-level boundaries, context degrades over multi-step workflows, and verification is missing. Testing failure boundaries directly and enforcing deterministic checks helps identify failure modes before they compound.",
          },
        },
      ],
    },
  ],
};

export default function HomePage() {
  const systemsCount = allSystems.length;

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF9F6]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOME_STRUCTURED_DATA) }}
      />
      <Hero systemsCount={systemsCount} />
      <StartHere />
      <TopicPaths />
      <Projects />
      <Tools />
      <Methodology systemsCount={systemsCount} />
    </div>
  );
}
