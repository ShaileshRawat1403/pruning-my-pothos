# Publication integrity

Pruning My Pothos helps people understand AI by putting it to work. Its audience includes non-developer builders, analysts, writers, product people, and developers. Work shown is the source of authority.

## Editorial contract

- Explain what the reader can understand, decide, inspect, or do afterward.
- Distinguish source evidence, observed results, illustrative examples, and interpretation.
- A source claim needs a public inspectable URL. Code evidence needs an immutable reference.
- Preserve existing article URLs, redirects, canonical policy, and static export behavior.
- The website is the canonical publication. Kit handles newsletter subscription and delivery.
- Preserve the editorial visual language. Add visuals to explain mechanisms, boundaries, and decisions.

## Existing content model

Use the systems collection's optional shortAnswer, analogy, figure, useValue, boundary, evidence, and related fields. Do not introduce a second graph of the same content.

- useValue states a reader capability, not an outcome metric.
- boundary describes scope and limitations.
- figure needs an accurate caption and text alternative. A generic diagram is an illustration, not repository evidence.
- related retains curated link titles and URLs; its note explains why the next step matters.
- evidence is currently narrative metadata. Do not treat its presence as proof of factual verification.
- Projects on the homepage carry sourceUrl, filename, ref, and exact excerpts. Keep the source accessible on mobile.

The structured-output article is the first useValue/boundary pilot. Its worked example is explicitly illustrative and makes no claim of a measured run.

## Release checks

Run npm run build before npm run audit. The indexing check reads out/, so a pre-build audit can inspect stale output.

The audit must fail for sitemap entries that lack an exported page, are noindex, or redirect. Preserve the existing six-document tag indexing threshold. Generated topic counts are counts of documents, never popularity claims.

Also run npm run lint and git diff --check. Lint errors must be reported, not silently described as a clean release. No npm test script currently exists. The September 9 pass removed the existing lint errors; warnings remain for follow-up.

Browser checks: mobile menu, Escape/focus return, keyboard focus, newsletter invalid input, narrow-screen overflow, source links, and the article-to-tool journey.

## Follow-up work requiring evidence

- Review the remaining articles for unsupported certainty and mismatched diagrams.
- Verify public project source availability and excerpt fidelity at pinned revisions.
- Extend practical learning blocks based on the article, not a quota for diagrams or downloads.
- Resolve remaining lint warnings and broaden tests of consequential tool transformations.
- Audit all rendered internal fragments, canonical/JSON-LD parity, and asset dimensions.
- Check actual production performance and search-console data before claiming search gains.
- Keep newsletter confirmation testing separate from real subscriber acquisition. Never create test subscriptions without authorization.

Search eligibility and good content structure do not guarantee rankings or AI citations.
