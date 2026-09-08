import type { Metadata } from "next";
import { allSystems } from "content-collections";
import { constructMetadata } from "../lib/seo/metadata";
import Hero from "../components/home/Hero";
import StartHere from "../components/home/StartHere";
import Projects from "../components/home/Projects";
import Tools from "../components/home/Tools";
import Methodology from "../components/home/Methodology";

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
      "description":
        "Tech-editorial publication exploring AI coding agents, context compaction, deterministic runtimes, and engineering hygiene.",
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
              "Pruning My Pothos is an engineering publication and systems laboratory created by Shailesh Rawat. It publishes practical architectural breakdowns of AI coding agents, deterministic execution engines, context compaction algorithms, and developer tools.",
          },
        },
        {
          "@type": "Question",
          "name": "What is the pothos pruning methodology in AI software engineering?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "The pruning methodology is a 6-stage engineering lifecycle: (1) Notice genuine architectural signals, (2) Validate through hands-on sandbox trials, (3) Prune away unverified abstractions and brittle prompt chains, (4) Deconstruct boundary limits such as context degradation, (5) Adopt typed, verified production patterns, and (6) Retain only durable, high-ROI systems.",
          },
        },
        {
          "@type": "Question",
          "name": "Why do multi-step AI coding agents fail in production codebases?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Agents break due to unchecked context compaction, silent hallucination drift, and lack of typed verification gates. Without deterministic state machines, AST validation, and fail-fast sandboxes, errors compound across long autonomous trajectories.",
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
      <Projects />
      <Tools />
      <Methodology systemsCount={systemsCount} />
    </div>
  );
}
