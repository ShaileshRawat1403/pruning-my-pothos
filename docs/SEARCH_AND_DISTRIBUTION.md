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

## Growth plan to 1M impressions a month (set 2026-10-10)

Goal: a steady 1M Google Search impressions a month. No deadline; the
checkpoints below are targets to steer by, not predictions.

### Baseline (Search Console, 7 Jul to 6 Oct 2026)

- 15.2k impressions, 138 clicks, CTR 0.9%, average position 12.1.
- About 5k a month (about 170 a day), flat since July; down to about 100 a
  day in the two weeks after the archive pruning (expected while redirects
  settle).
- One page carries the site: `/systems/skills-vs-prompts-vs-agents/` has
  8.6k of 16.3k page impressions (53%), position 7.9, CTR 1.1%. Its queries
  ("skill vs prompt", "prompt vs skill", "skills vs system prompt",
  "prompt vs skill vs agent") are a cluster nobody owns yet.
- Next tier, each 200 to 600: AI skill design templates (Shelf), training vs
  inference, Ollama notes, prompting is not the skill (position 30),
  structured output (position 61), context windows.
- Leaks: `/scenes/nietzsche.html` (424 impressions, off-topic, now 404) and
  `/systems/mental-frameworks/` (74, now 404). Google also still shows four
  section links into the skills page whose headings no longer exist.
- Analytics: GA4 and Clarity live from 2026-10-09; nothing to read yet.

### What the target means

1M a month is 200 times the baseline. Sites of this kind get there with
roughly 500+ indexed pages averaging 1-2k impressions each, plus a few dozen
pages on page one for head terms. The skills page shows the pattern works
here: a clear comparison question, answered plainly, ranks.

### Checkpoints (monthly impressions)

| By | Target | Mainly from |
| :--- | :--- | :--- |
| Dec 2026 | 15k | Fix the leaks; win the skills cluster (top 3); CTR on the next tier |
| Mar 2027 | 50k | A comparison series built on the skills pattern; steady cadence |
| Sep 2027 | 250k | 2-3 pages a week; links earned from distribution; AI citations |
| 2028 | 1M | 500+ quality pages; flagship pages on head terms |

### Phase 1: take what already works (now to Dec 2026)

1. Done 2026-10-10. The skills page: put back the four sections Google still links
   (system prompt fit, the comparison, the decision rule, where workflows
   fit) as anchors on the matching sections; answer "skill vs prompt" in
   the first lines; title and description aimed at that exact query.
2. Done 2026-10-10: strengthen, don't split. The skills page answers
   "skill vs prompt" and "prompt vs agent" directly; the system-prompt
   page's "skill vs system prompt" section says so in its heading; the AI
   skill templates guide was rebuilt (fields explained, filled example).
   Separate pages for those questions would compete with the skills page
   and break the one-question rule.
3. Done 2026-10-10. Leaks: 410 for `/scenes/nietzsche.html` (off-topic, keep it gone); 301
   or 410 for `/systems/mental-frameworks/` to the nearest real answer.
4. Done 2026-10-10 (titles; revisit position in November). Next tier CTR: titles and descriptions for training vs inference,
   context windows, structured output; find why structured output sits at
   61 and prompting at 30 (likely the intent does not match the page).
5. Done 2026-10-10: the 17 articles that gained drawn scenes carry updatedAt 2026-10-09/10, so the sitemap lastmod signals the change. Structured output (61) and prompting (30) rank for head terms ("structured outputs", "prompting") where provider docs dominate; the titles now aim at the longer questions they answer.

### How the work is done (from 2026-10-15)

`docs/GROWTH_TRACK.md` holds the weekly loop, the cadence (2 pages a week,
discussed and published in a session; no automation; distribution is the
owner's) and the keyword map. This file keeps the goal, the checkpoints and
the audit history.

### Phase 2: a repeatable engine (2027)

- Publishing: comparison and definition pages chosen from Search Console
  queries where the site already appears at positions 8 to 30.
- Every article gets a cross-post (LinkedIn first, with one drawn scene),
  a newsletter mention, and, for the strongest, Hacker News or Reddit.
- Monthly review: the checkpoint table, the top 50 queries, pages that
  slipped. One change per page per month, logged with its date.

Editorial rules still hold: one page answers one question, no manufactured
experience, no claims of ranking in copy.

### Site readiness audit (2026-10-14)

Checked against the live site, Search Console, GA4 and Clarity before
distribution starts.

In place: HTTPS and www redirects to one host; robots.txt open to search and
AI crawlers; sitemap of 239 URLs with no noindexed page in it; one canonical,
one h1, Open Graph and Twitter cards on every page; Article, BreadcrumbList,
WebSite, Organization and Person schema with one author @id; visible sources
cited in schema; llms.txt (index-led); RSS; 410 for retired URLs; GA4 linked
to Search Console; Clarity recording.

Fixed in this pass:
- Titles longer than 60 characters drop the " | Pruning My Pothos" suffix
  (35 pages were cut off in results).
- Systems articles carry article:published_time, article:modified_time and
  og:image:alt.
- Shelf category pages have real descriptions.
- Stylesheets and fonts send Access-Control-Allow-Origin, so Clarity heatmaps
  render styled.
- IndexNow: the deploy workflow submits pages whose lastmod is in the last
  three days (scripts/indexnow.mjs, key file in public/).

Owner-side, in the tools:
- Bing Webmaster Tools: verified (316 impressions, 7 Jul to 14 Oct). Its
  short-description warning is handled in code (below).
- GA4: enhanced measurement is on, but GA4 only lets an event be starred as
  a key event after it has fired once. When file_download shows under Admin,
  Events, Recent events, star it.
- Own visits: open any page with ?pmp-owner=on once in each browser and on
  each device; GA4 and Clarity skip that browser from then on, whatever the
  IP. ?pmp-owner=off undoes it.

Meta descriptions under about 120 characters (Bing flags them) are filled out
from the page's own opening sentences, a deck's highlights, or the titles a
tag or shelf page lists, or a reference list's entries
(src/lib/seo/description.ts); ten app pages were rewritten by hand. 160 short
pages became 3.
- Core Web Vitals has no field data yet (too few visits); revisit at 1k
  visits a month.

Content gaps from queries where the site shows but ranks poorly:
structured output (positions 60 to 77), embeddings and embedding dimensions
(30 to 70), "what is prompting" (about 40), Ollama models with tool support
(30 to 50). Each is a page that exists but does not answer the query directly.
