// Single source of truth for the newsletter integration. This is the ONLY file to
// touch once a real Beehiiv publication exists — every NewsletterForm variant reads
// from here, nothing else in the codebase should reference Beehiiv directly.
//
// Beehiiv free tier: up to 2,500 subscribers, no card required, no API key needed
// for the public embed/subscribe endpoints referenced below.
//
// To go live:
//   1. Create the publication at https://www.beehiiv.com
//   2. Settings → Growth → Subscribe Forms → grab the embed URL (iframe) and the
//      publication's public subscribe POST endpoint.
//   3. Replace the three placeholder values below. Nothing else changes.
export const NEWSLETTER_CONFIG = {
  beehiivPublicationId: "REPLACE_ME_PUBLICATION_ID",
  // Beehiiv's hosted iframe embed src, used by the hero variant.
  embedIframeUrl: "https://embeds.beehiiv.com/REPLACE_ME_PUBLICATION_ID",
  // Beehiiv's public form-post endpoint, used by the footer/inline variants.
  embedFormUrl: "https://embeds.beehiiv.com/REPLACE_ME_PUBLICATION_ID/subscribe",
  // Real subscriber count once known. Keep null rather than inventing a number —
  // the hero/footer copy only shows a "Join N readers" line when this is set.
  socialProofCount: null as number | null,
};

export const isNewsletterConfigured =
  NEWSLETTER_CONFIG.beehiivPublicationId !== "REPLACE_ME_PUBLICATION_ID";
