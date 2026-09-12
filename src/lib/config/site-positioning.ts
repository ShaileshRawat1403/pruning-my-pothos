/**
 * site-positioning.ts — Canonical Positioning Contract for Pruning My Pothos
 *
 * Centralizes durable identity facts only. Contextual copy (e.g. FAQ answers,
 * About page biographical paragraphs, Methodology cards) derives from these
 * facts but remains authored locally where it is rendered.
 */
export const SITE_POSITIONING = {
  // Frozen primary anchor
  headline: "Understand AI by putting it to work.",

  // Candidate reader-value support line (candidate for review, not frozen)
  candidateSupportLine:
    "I build with AI, test what happens, and explain what I learn in plain language.",

  // Canonical site description for meta tags and top-level JSON-LD WebSite schema
  canonicalDescription:
    "Practical explainers, field notes, and architectural breakdowns of AI systems, grounded in real use and explained in plain language.",

  // Audience framing (focused on mechanisms, avoiding sweeping universal claims)
  audienceFraming:
    "For curious builders, product thinkers, and engineers who want to understand how specific AI systems and mechanisms work without drowning in specialist jargon.",

  // Newsletter value proposition
  newsletterPromise:
    "What worked, what broke, and what I learned building with AI.",

  // Author identity facts
  author: {
    name: "Shailesh Rawat",
    role: "Builder & Author",
    shortBio:
      "I build with AI, test failure boundaries in practice, and translate technical mechanisms into plain language.",
  },
} as const;
