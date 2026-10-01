# Handover: Pruning My Pothos (PMP)

For any agent picking this repository up cold. Read this, then `AGENTS.md`,
then `docs/STORYBOARD_AUTHORING.md`. Written 2026-09-26, updated 2026-09-30.

---

## 1. What this is

**pruningmypothos.com**: a field guide to applied AI systems by Shailesh
Rawat. Static Next.js site (App Router, `output: "export"`, trailing slashes),
content in MDX via content-collections, Tailwind, a Zod "editorial contract".

- Repo: `github.com/ShaileshRawat1403/pruning-my-pothos` (**public**).
- Local: `/Users/Shailesh/MYAIAGENTS/pruningmypothos`.
- Single public brand: Pruning My Pothos. (Sans Serif Systems is retired;
  Sans Serif Sentiments survives only as the writing voice.)

## 2. Non-negotiables

1. **Editorial contract** (`AGENTS.md`, `.agents/skills/pruningmypothos-editorial/`):
   never invent lived experience; illustrative details stay illustrative;
   consequential claims trace to the article and a declared source; repo
   sources pin a 40-char commit SHA.
2. **House style for copy**: no em dashes anywhere a reader sees (Test 69);
   no filler vocabulary (seamless, robust, leverage, unlock, deep dive...);
   **no "it's not X, it's Y" constructions** in headlines, punchlines,
   quips, takeaways or frame titles (Test 72). Say the thing plainly and let
   the drawing carry the contrast.
3. **Pushing `main` deploys production.** A green CI on `main` triggers
   "Deploy to Hostinger", which force-publishes `out/` to the `deploy`
   branch; Hostinger pulls it. Get the owner's explicit go-ahead before every
   push to `main`. Work on feature branches.
4. **Never stage the owner's working docs**: `docs/ARCHIVE_DISPOSITION_LEDGER.md`,
   `docs/CAROUSEL_VISUAL_SYSTEM_V1.md`, `docs/POST_BENCHMARK_PRODUCT_INSIGHTS.md`
   (now gitignored). Avoid `git add -A docs`; add files by name.
5. **Private design material** lives in `/private/` (gitignored): the
   approved style sheet (`private/style-sheet/`). Local review routes go in
   gitignored folders (`src/app/dank-samples/`). Never publish them.
6. The owner prefers terse replies (caveman mode is often on). Code and
   commits in normal English. Commit trailers: `Co-Authored-By` plus the
   session line the harness provides.

## 3. Information architecture

One config drives header, section sub-nav and footer:
`src/lib/config/sections.ts`.

| Section | Pages |
|:--|:--|
| Systems | `/systems/` explainers (28 articles). The 8-stage Systems Map (`src/lib/content/systems-map.ts`) names one flagship per stage; `src/lib/content/systems-ia.ts` places every other article under a stage as a companion or a note, or across the map. The build fails if an article is unplaced |
| Storyboards | `/storyboards/` illustrated PDF explainers, one per stage article (8 decks) |
| Stack | Projects `/stack/`, product pages `/stack/<product>/` (DAX at `/stack/dax/`), Tools `/tools/`, Canvases, Docs, Live lab |
| Shelf | `/shelf/` categories, Reference sheets `/shelf/reference/` (placeholder, noindexed until the first sheet) |
| Self | Work `/portfolio/`, Writing (`/sentences/`, `/sentiments/`), Schema, Calibrations `/self/`, About `/about/` |

`SectionNav` shows a second row on Stack and Self pages. The footer is one
site map on every page. Redirects and 410s live in `public/.htaccess`.

## 4. The visual system: "deadpan"

Approved register: **realistic dank deadpan**. Tired, specific people and
objects drawn straight with one wrong detail; visual puns; blunt, brutal,
brave dark humour about habits and roles. **No sexual humour. Nothing about
identity** (race, gender, religion, disability, nationality, looks).

Theme repeats (aged paper, ink, palette, Caveat/Schibsted/Plex, Pruning
Mark); subjects never do.

Code, in `src/components/illustrations/`:

| File | What |
|:--|:--|
| `deadpan.tsx` | palette `D`, `Paper` (grain + vignette; print uses a tiled PNG), `Ink` (wobble filter), and the realistic `Head` used everywhere (lids, bags, irises, nose, stubble), plus `Torso`, `Legs`, `Limb`, `Sheet`, `Label` |
| `dank.tsx` | the three standalone characters: `OnCall` (screen prop), `ThoughtLeader` (sign prop), `SecurityGuy` (say prop). 400 x 560 busts |
| `emblems.tsx` | one visual pun per Systems article (28). Used as article cover, storyboard cover and share card. Test 70 keeps the older cast out |
| `covers.tsx` | `COVERS[slug].quip` (the blunt caption) and `ArticleCover` |
| `kit.tsx` | older cast used inside teaching frames: `Model` (speech bubble; stays as the model), `Gate`, `Courier`, `Ledger`, `Person` (now with realistic faces), `FrameShell`, helpers |
| `templates.tsx` | frame templates: Cover, Steps, Cards, Contrast, Scene, Close, **Gag** (deadpan pun + punchline + claim) |
| `decks/*.tsx` | one deck per stage article; `decks/gags.tsx` holds gag frames; `decks/index.ts` interleaves gags via `withGags(deck, gags, afterPositions)` |
| `HeroCinema.tsx` | the home hero film (GSAP): gardener snips "hype", sips tea |
| `CoverFilm.tsx`, `films/*.ts` | cover films: an article's cover plays once as a six-second, three-shot film, then rests as the still. One script per article, animating the emblem's own `fx-` groups. All 28 Systems covers have one |
| `scenes/*.tsx`, `visuals/SceneVisual.tsx` | scroll scenes: an article's declared visual drawn as one pinned drawing that advances on scroll. Steps and words come from the visual's frontmatter (`lib/scene-steps.ts`). All 28 articles have one. Sixteen of the visuals were declared on 2026-09-30 from statements already in each article's body; they add no claim, and the owner should still read them |
| `sections.tsx`, `components/SectionHeader.tsx` | section headers: one deadpan drawing per section (systems, storyboards, stack, shelf, writing), full on section index pages and `slim` on pages inside a section |

Frame counts follow the article (readiness 13, governed 11, HITL 10,
evaluation 10, retrieval 8, handoff 8, model 7, prompting 7).

Motion rules: one thing moves at a time; a film or scene shows nothing its
article does not say; reduced motion, print and every export get the still.
Films and scenes cannot be judged from code. Freeze them on the local,
gitignored contact sheets (`/dank-samples/films/`, `/dank-samples/scenes/`)
and watch each once in a visible tab.

Process for any drawing change: `npm run build && npm run export:storyboards`
(needs Google Chrome; writes PDFs, share PNGs and cover PNGs into `public/`),
then look at every changed frame at `/storyboards/<slug>/print/`.

## 5. Commands and gates

```
npm run dev                  # the owner often runs one on :3000; don't start a second
npm run build
npm run export:storyboards   # after any illustration change (--only=<slug>)
npm run lint                 # 0 errors expected (9 known warnings)
npm run lint:gates           # copy rules on home components
npm run test:contract        # 72 tests, all must pass
npm run audit
npm run verify:covers
npm run validate:archive
```

Local static preview: `python3 -m http.server 8811 --directory out`.
Turbopack dev cache can serve stale CSS: `rm -rf .next/dev .next/cache/turbopack`.

### Docs that stay, and why

| Doc | Role |
|:--|:--|
| `HANDOVER.md` | this file: start here |
| `PMP_CONTENT_DOCTRINE.md` | what the content is for (locked principles) |
| `CONTENT_EXPERIENCE_V1.md` | how Systems content is typed and rendered (implemented spec) |
| `STORYBOARD_VISUAL_GRAMMAR_V1.md` | rules for article visuals (implemented spec) |
| `STORYBOARD_AUTHORING.md` | how to draw covers, films, scenes, storyboards |
| `STYLE_REFERENCES.md` | outside work the deadpan register learns from |
| `SEARCH_AND_DISTRIBUTION.md` | search, structured data, cross-posting |
| `HOSTING.md` | deploys, checks, Cloudflare and Hostinger |
| `REFERENCE_SHEETS_PROMPTS.md`, `reference-sheets/` | the NotebookLM kit |
| `ARCHIVE_DISPOSITION_MANIFEST.json`, `EDITORIAL_AUDIT.md` | machine-read by scripts and tests |
| `agent-handoff/current.md`, `agent-operations/ledger.jsonl` | **frozen specimens.** Two articles cite them as evidence at pinned commits and say "this repository keeps" them. Do not edit, move or delete them |

## 6. Hosting (see `docs/HOSTING.md`)

Visitor → Cloudflare (DNS, proxy, cache; SSL Full; Smart Tiered Cache; a
cache rule) → Hostinger (LiteSpeed). Hostinger's own CDN is **off** (it
caused 520/522/525s). Pages carry `s-maxage=600`, files `max-age=86400`.

After a deploy: the `deploy` branch advancing, Hostinger pulling, and
Cloudflare's 10-minute cache are three separate states. Check the origin
directly: `curl --resolve "pruningmypothos.com:443:82.112.239.210" ...` and
`last-modified`. Purge: Cloudflare → Caching → Purge Everything.

## 7. SEO state (Search Console, data to 2026-09-21)

- 307 indexed. New pages (`/storyboards/`, decks, `/stack/dax/`) confirmed
  on Google. Sitemap (265 URLs) read 2026-09-24, all 200/indexable/self-canonical.
- Not indexed 437, mostly intended: 175 noindex (long-tail tags by design;
  31 hub tags indexable), 132 redirects, 99 crawled-not-indexed (thin
  Sentences/Shelf notes, old slide PDFs), 24 404s (fixed, see below).

## 8. Where things stand

- `main` = `9c131e68` (live). Everything through the dank cast is deployed.
- Branch **`fix/gsc-404s`** (not merged, not deployed):
  - `.htaccess`: `/home/`→`/`, `/skills`→`/tools/skill-catalog/`,
    `/sentiments/about/`→`/about/`, five retired tags → 410.
  - Untracks the three owner docs above and gitignores them.
  - This handover.
  Needs the owner's go-ahead to merge to `main` (that deploys).
- Branch **`feature/cinematic-overhaul`** (branched from `fix/gsc-404s`, not
  merged, not deployed). The design overhaul the owner approved from mockups
  on 2026-09-30:
  - Cover films and scroll scenes for all 28 Systems articles (section 4).
  - Systems IA: `/systems/` lists every article under its stage, and each
    article ends with its stage and neighbours.
  - Article page: prose starts sooner. The storyboard link is one line under
    the cover, and "Where this helps, and where it stops" moved below the
    body. Reading text is full ink at about seventy characters a line,
    headings are bold, and code blocks are readable in light mode (they were
    dark text on a fixed dark ground). These type rules are `.content-body`,
    so Sentences, Calibrations and Shelf detail pages get them too.
  - `SectionHeader` replaces the painted oil plates on nine pages. The
    painted images, their loader page and three stale root docs
    (`REDESIGN_HANDOFF.md`, `CHARACTER-PLATES.md`, `PLATE-PROMPTS.md`) are
    deleted. About and Calibrations keep the self-portrait plate.
  - `Head` stubble is rounded so it hydrates in client components.
  - Home cards lift and boil on hover (`.ill-lift`).
  - Theme decision: keep today's near-white page with paper plates on it.
  Not done on this branch: the terminal toast is unchanged; the thin-line
  HTML figures (`SceneFigure`, `public/scenes/*.html`) still sit under some
  headers; only the tokenizer cover PNG was re-exported (its drawing gained
  price tags), so other cover PNGs predate the stubble rounding, which is
  below a pixel. The nineteen films added last were checked as frozen frames
  only and still need one watch each in a visible tab.
- Branch **`chore/repo-cleanup`** (on top of `feature/cinematic-overhaul`, not
  merged, not deployed): removed code, assets, infra and docs nothing uses,
  retired the thin-line figures, the terminal toast and the editorial
  sandbox, folded the still-valid parts of old docs into `HOSTING.md` and
  `SEARCH_AND_DISTRIBUTION.md`, added `verify:redirects` and `verify:links`
  to the audit, and merged `websiteops/dax-deadpan-v1` (/stack/dax in the
  deadpan register).
- Branches: only `main`, `deploy` (written by CI), `fix/gsc-404s`,
  `feature/cinematic-overhaul`, `chore/repo-cleanup` and the remote
  `websiteops/dax-deadpan-v1` (delete it once `chore/repo-cleanup` is on
  GitHub). The superseded branches were deleted on 2026-10-01 after their
  useful work was confirmed in `main` or salvaged; tips, in case one is ever
  needed: `seo/tier-1-corrective` 453eb62a, `feature/pmp-editorial-contract-v1`
  ae240271, `feature/pmp-dark-theme` 1da752eb, `codex/learning-discovery`
  1323eefc, `harness/website-build-pipeline` 2ef5c7d4.
- **Git history is 335 MB**, mostly slide PDFs and a video in
  `public/resources/`, and still contains the three owner docs. A history
  rewrite would fix both, but it changes every commit SHA, and Systems
  articles pin repository evidence to SHAs of this repository (for example
  the two frozen specimens in `docs/`). Rewriting means re-pinning those
  sources first. Owner's call; not done.

## 9. Open items and next steps

1. **Owner decision**: the three owner docs are in public git history since
   `f19c8f11`. Purging needs a history rewrite and force-push (destructive,
   owner's call).
2. **Owner, in Search Console**: remove the stale `sitemap_index.xml`
   (Astro-era, 404s); optionally request indexing for new pages.
3. **Deploy `fix/gsc-404s`** once approved.
4. **Thin pages**: the 99 crawled-not-indexed are mostly very short. Merge
   short Sentences into fuller pieces or noindex the thinnest.
5. **Storyboards next round**: give the dank characters roles in the
   teaching frames too (today they appear in gag frames; teaching frames use
   the realistic generic figures). Keep one idea per frame, captions true to
   the article, no "not X, Y".
6. **Reference sheets**: prompts in `docs/reference-sheets/batch-01.md`,
   kit and review loop in `docs/REFERENCE_SHEETS_PROMPTS.md`. When the owner
   brings NotebookLM drafts: review page by page (keep / fix copy /
   regenerate), they edit (badge off, PMP footer on), then add entries to
   `src/lib/content/reference-sheets.ts` with files in `public/reference/`.
   Disclosure line stays: "Drafted with NotebookLM, edited by Pruning My Pothos."
7. **Legacy imagery**: the painted plates are gone except the self-portrait
   (About, Calibrations). Shelf resource covers (`public/covers/shelf/`) are
   still the older calm abstract style; when Shelf is revamped they move to
   deadpan. Do not add new covers in the old style.
8. **DAX page**: the peer-comparison table (Cursor, Claude Code, Codex)
   makes claims to verify or source before wide sharing.
9. More product landing pages will follow the `/stack/<product>/` pattern.
10. **Fewer, fuller articles.** The owner's direction (2026-09-30): the eight
    Systems Map stage articles are the flagship pieces, each to carry a real
    proof of concept (repository at a pinned commit, screenshots, recordings
    or benchmarks the owner produces). The other twenty stay as companions
    and notes, as the archive disposition decided (22 full pages, 6 notes);
    nothing further is merged. Today every Systems article declares
    `synthesis` as its basis. A POC is never written into existence: it is
    added only when the owner supplies the built thing. The working plan and
    the per-article POC list are in the local, gitignored
    `private/flagship-plan.md`.
11. **Section drawings and captions** in `illustrations/sections.tsx` are
    drafts awaiting the owner's read, as are the step captions drawn inside
    the scenes.
12. **Remaining registers to fold in**: the terminal toast
    (`ConsoleToastHost`) and the `SceneFigure` HTML figures.
