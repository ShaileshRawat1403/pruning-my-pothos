# Search and distribution

What PMP does about being found, and what it does not. Distilled on
2026-10-01 from the March playbooks in `docs/agent-instructions/` (removed:
they prescribed an Act I/II/III template, a case-study voice and a topic
backlog that the editorial contract and the archive disposition have since
replaced). What survived is below. Where this disagrees with `AGENTS.md` or
`docs/PMP_CONTENT_DOCTRINE.md`, those win.

The site's own article on the subject is the stance:
[What a Publisher Actually Controls](/systems/seo-aeo-geo-in-plain-terms/).
A publisher controls access, identity, listing, status, linking and
structure. It does not control whether anything ranks, retrieves or cites it.
Work on the first list; do not write copy for the second.

## Structure: one page, one question

- Every Systems article sits in exactly one place on the map
  (`src/lib/content/systems-ia.ts`): a flagship, a companion or a note.
- A companion links to its flagship, and the flagship's "Stage" block links
  back to every companion and note. The article page renders that block, so
  the links exist whether or not the prose remembers them.
- Two pages may not answer the same question. If a new piece would, it
  becomes a section of the existing page instead.

## Structured data

- Use the smallest set that matches what is visibly on the page:
  `Article` + `BreadcrumbList` for articles, `WebSite` and the author once,
  site-wide.
- `FAQPage` only where real question-and-answer pairs are visible on the page.
- No schema value may disagree with the page's title, description or body.
- `npm run audit` checks schema presence in the build output.

## Indexing

- The sitemap lists only pages that exist, answer 200, are indexable and are
  their own canonical. `npm run audit` enforces it, including that no sitemap
  URL is redirected or answered 410 by `public/.htaccess`.
- Tag pages are indexable only as hubs (enough documents to be useful);
  the rest are `noindex, follow` and stay out of the sitemap.
- Retired URLs get a 301 to the page that now answers the question, or a 410
  when nothing does. Never a 301 to a page about something else.

## Cross-posting (LinkedIn, newsletters, communities)

- The website is the original. A cross-post is shorter, adapted to its
  platform, and links back to the article in its body.
- Use the platform's canonical field when it has one.
- Keep names the same in both places: article titles, stage names, product
  names.
- Never publish the full article elsewhere without the link back.

## Measuring

- Before a change that should affect search, note the date and the pages it
  touches. Search Console is the record; there is no separate scorecard.
- Look at it a week later for crawl and index problems, and a month later for
  anything resembling a trend. A movement inside a month is not evidence.
- A ranking or a citation is never claimed in copy as an outcome of anything.
