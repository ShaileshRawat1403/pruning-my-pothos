> **Frozen specimen, not current instructions.** This is the Astro-era handoff log, kept because the article
> "What Has to Survive for Work to Continue" cites it as evidence. For the current state of the repository,
> read [docs/HANDOVER.md](../HANDOVER.md).

# Agent Handoff: Current State

## Last updated
- Date: 2026-06-29
- Updated by: Antigravity agent (Next.js Root Merge)

## Next.js Migration & Root Merge Summary
- Switched website root framework from Astro to Next.js 15 App Router.
- Ported design system, dynamic collection pages, sitemaps, and ToolSmith React component playpens.
- Enforced output: 'export' static compilation targeting simple static hosting.
- Set pre-merge rollback git tag `pre-next-merge` and git archive branch `astro-archive` for security.
- Audited and merged public assets directory (favicons, PDFs, images, and `.htaccess` redirects).
- Total statically compiled page count: 440 routes prerendered successfully with zero compile warnings/errors.

## What changed
- SEO remediation pass from SEMrush crawl exports:
  - standardized trailing-slash canonical behavior in generated links and sitemap URLs
  - reduced redirect-prone internal URLs by normalizing page/component link builders
  - added markdown/MDX rehype transform to auto-normalize internal relative links to trailing slash
  - fixed robots directive format to standards-compliant output and retained sitemap reference
  - improved meta-description uniqueness with title-based fallback descriptions in `Layout.astro`
  - added/updated explicit descriptions on key section/category/detail templates where missing
  - updated stale external references in `systems-001-foundations.mdx` to stable, crawlable sources

## Key files touched
- `astro.config.mjs`
- `src/layouts/Layout.astro`
- `src/pages/sitemap.xml.ts`
- `src/pages/robots.txt.ts`
- `src/pages/llms.txt.ts`
- `src/pages/index.astro`
- `src/components/ContentDiscovery.astro`
- `src/components/SystemsList.astro`
- `src/components/SentencesList.astro`
- `src/components/SimpleEnhancedPostCard.astro`
- `src/components/EnhancedPostCard.astro`
- `src/components/PostCard.astro`
- `src/components/Search.astro`
- `src/components/TagList.astro`
- `src/pages/systems.astro`
- `src/pages/sentences.astro`
- `src/pages/shelf.astro`
- `src/pages/systems/[slug].astro`
- `src/pages/sentences/[slug].astro`
- `src/pages/self.astro`
- `src/pages/self/[slug].astro`
- `src/pages/sticky-notes.astro`
- `src/pages/sticky-notes/[slug].astro`
- `src/pages/tags.astro`
- `src/pages/tags/[tag].astro`
- `src/pages/systems/concepts.astro`
- `src/pages/systems/explanations.astro`
- `src/pages/systems/how-things-fit-together.astro`
- `src/pages/sentences/attention.astro`
- `src/pages/sentences/meaning.astro`
- `src/pages/sentences/judgment.astro`
- `src/pages/portfolio.astro`
- `src/pages/shelf/*.astro` (category index link normalization)
- `src/content/systems/systems-001-foundations.mdx`
- `src/utils/rehypeTrailingSlashInternalLinks.mjs`

## Decisions
- Default canonical site URL is `https://pruningmypothos.com` with env override via `SITE_URL`.
- Systems detail pages use article OG type and article JSON-LD.
- Shared semantic bridge cover is used as the systems social image fallback.
- Trailing-slash URL style is now the enforced internal convention to match production hosting behavior.
- Internal markdown/MDX links are normalized at build time instead of manual post editing.

## Open risks / follow-ups
- Production `robots.txt` is currently Cloudflare-managed; repo updates must be mirrored in Cloudflare rules/content or Astro route must be source-of-truth.
- `No HSTS support` remains infrastructure-level and cannot be solved in Astro source alone.
- External source uptime can drift over time; periodic outbound link checks are still required.

## Suggested next actions
1. Align Cloudflare `robots.txt` behavior with repo output (or disable CF override).
2. Re-run SEMrush crawl and compare: `301`, `sitemap incorrect pages`, `duplicate description`, and `broken external links`.
3. Start Phase 2 SEO/AEO/GEO: entity-first summaries, schema refinement per section, and prompt-answer targeting.

## Update: 2026-03-05 (SEO/AEO/GEO content cluster)

### Summary
- Added a cross-section SEO/AEO/GEO knowledge cluster to improve both discoverability and topical authority.
- Published one flagship systems mapping doc and two supporting systems docs (Concepts + Explanations).
- Added supporting sentences, sticky notes, and a self entry to reinforce internal entity coherence and interlinking.

### New files
- `src/content/systems/seo-aeo-geo-how-things-fit-together.mdx`
- `src/content/systems/seo-aeo-geo-in-plain-terms.mdx`
- `src/content/systems/aeo-and-geo-as-a-retrieval-design-problem.mdx`
- `src/content/sentences/attention-follows-structure.md`
- `src/content/sentences/entities-are-memory-anchors.md`
- `src/content/sentences/citations-are-earned-not-requested.md`
- `src/content/sticky-notes/note-34.md`
- `src/content/sticky-notes/note-35.md`
- `src/content/sticky-notes/note-36.md`
- `src/content/sticky-notes/note-37.md`
- `src/content/self/writing-for-two-readers.md`

### Decisions
- Kept section-specific style constraints intact:
  - Systems docs: Key takeaways + 3-act TOC pattern + inline SVG diagrams + comparison tables.
  - Sentences: short reflective style with final "What this changes in practice" line.
  - Sticky notes: micro-note structure with strict frontmatter.
  - Self: lead paragraph, sparse highlights, and inline responsive figure.
- Used trailing-slash internal links in new docs for canonical consistency.

### Validation
- `npm run build` passed with all new pages generated.

### Open risks / follow-ups
- `robots.txt` on production may remain cached briefly at Cloudflare edge even after deploy.
- Next SEMrush/GSC verification should be done after edge cache settles to confirm issue deltas.

### Suggested next actions
1. Re-run SEMrush site audit and compare deltas in `301`, duplicate metadata, and crawlability categories.
2. Add FAQ schema blocks to the three new systems pages if snippet/answer-surface capture is a priority.
3. Add one shared-resources entry curating SEO/AEO/GEO primary references and link from new systems pages.

## Update: 2026-03-05 (Systems consistency automation + normalization)

### Summary
- Added automated consistency linting for all Systems docs.
- Enforced baseline gates in code: minimum word count and required Systems structure.
- Normalized all failing Systems docs so the whole section now passes the baseline.

### Files touched
- `scripts/lint-systems-consistency.mjs` (new)
- `package.json` (`lint:systems` script)
- `src/content/systems/seo-aeo-geo-in-plain-terms.mdx` (rewritten to full Systems format)
- `src/content/systems/aeo-and-geo-as-a-retrieval-design-problem.mdx` (rewritten to full Systems format)
- `src/content/systems/context-windows-as-working-memory.mdx`
- `src/content/systems/embeddings-explained-like-youre-human.mdx`
- `src/content/systems/runtime-over-model-why-orchestration-is-the-product.mdx`
- `src/content/systems/structured-output-and-why-it-matters.mdx`
- `AGENTS.md` (Systems standards now include target and hard minimum word criteria)

### Decisions
- Systems consistency checks are now executable, not only editorial guidance.
- Hard gate currently validates:
  - min word count (`>= 800`, body-only)
  - Key takeaways presence
  - TOC anchor and `.toc` nav
  - Act I/II/III headings
- Kept checks narrow and deterministic to avoid false positives.

### Validation
- `npm run lint:systems` passed (`OK: 27 systems docs passed consistency checks.`)
- `npm run build` passed.

### Open risks / follow-ups
- The linter does not yet enforce table/callout/link balance quality; it enforces structure and length only.
- Existing older docs may still vary stylistically while passing baseline checks.

### Suggested next actions
1. Add a lightweight CI step to run `npm run lint:systems` on pull requests.
2. Add optional advisory checks (non-blocking) for internal/external link presence and table usage.
3. Periodically review long docs for verbosity drift despite passing minimum structure.

## Update: 2026-03-05 (CI wiring for Systems consistency)

### Summary
- Added a dedicated CI workflow for PR/push quality checks.
- CI now runs systems consistency reporting, systems lint gates, and full site build.
- Deployment workflow now blocks on `lint:systems` before build/deploy.

### Files touched
- `.github/workflows/ci.yml` (new)
- `.github/workflows/deploy-hostinger.yml`
- `scripts/report-systems-consistency.mjs` (new)
- `package.json` (new scripts: `report:systems`, `verify:systems`)

### Decisions
- Keep `report:systems` advisory and non-blocking.
- Keep `lint:systems` blocking for consistency safety.
- Require `lint:systems` in deploy workflow to prevent drift from reaching production.

### Validation
- `npm run report:systems` passed.
- `npm run lint:systems` passed.
- `npm run build` passed.

## Update: 2026-03-05 (Advisory noise tuning + automatic cross-link cleanup)

### Summary
- Tuned advisory checks to reduce false/noisy warnings.
- Ran an automated cleanup pass that injected internal related-reading links into systems docs missing them.
- Reduced advisory warning volume from 70 to 5 while preserving strict blocking checks.

### Files touched
- `scripts/lint-systems-advisory.mjs` (threshold tuning)
- `src/content/systems/*.mdx` (targeted auto-insert of internal related links where missing)
- `src/content/systems/systems-001-foundations.mdx` (added internal related links near conclusion)

### Decisions
- Advisory is now focused on high-signal drift:
  - words close to floor (`< 850`)
  - very long docs (`> 3000`)
  - missing internal links
  - missing visual aid (table/diagram)
- Removed low-signal advisory checks for mandatory external links and callouts.

### Validation
- `npm run lint:systems:advisory` passes (non-blocking) with 5 warnings.
- `npm run verify:systems` passes.
- Strict `npm run lint:systems` remains green.

## Update: 2026-03-05 (Systems callout/highlight enforcement)

### Summary
- Added explicit consistency enforcement for callouts and highlights across all Systems docs.
- Normalized existing Systems docs so each doc now includes at least one callout and one highlight span.
- Promoted these checks into the blocking systems linter.

### Files touched
- `scripts/lint-systems-consistency.mjs` (new required checks)
- `AGENTS.md` (Systems standards updated)
- `src/content/systems/*.mdx` (normalization pass for missing callout/highlight blocks)

### Decisions
- Callout/highlight are now section-level consistency requirements for Systems docs.
- Advisory checks remain non-blocking; structural consistency checks are blocking.

### Validation
- `npm run lint:systems:advisory` -> no warnings.
- `npm run lint:systems` -> passed for all 27 systems docs.
- `npm run build` -> passed.

## Update: 2026-03-05 (SEO/AEO/GEO agent instruction framework)

## Update: 2026-03-14 (Entity signal strengthening pass)

### Summary
- Strengthened site-wide entity clarity around `PruningMyPothos` without changing information architecture.
- Reweighted homepage, about page, footer, sitemap, and `llms.txt` toward AI systems authority signals.
- Fixed systems article schema so `DefinedTerm` links only emit for glossary-backed terms.

### Files touched
- `src/layouts/Layout.astro`
- `src/components/Footer.astro`
- `src/pages/index.astro`
- `src/pages/about.astro`
- `src/pages/llms.txt.ts`
- `src/pages/sitemap.xml.ts`
- `src/pages/systems/[slug].astro`

### Decisions
- `PruningMyPothos` is now the primary site/entity name in site-wide metadata and schema.
- `A Thinking Workspace` remains as a subtitle/editorial frame, not the dominant structured-data entity.
- The canonical authority sentence is: `PruningMyPothos is a thinking workspace on AI systems, orchestration, platform integration, governance, and adoption.`
- Portfolio is included in sitemap coverage because it is a proof and consulting-intent surface.
- Systems pages now skip `DefinedTerm` schema entries when no matching glossary anchor exists.

### Open risks / follow-ups
- Many page titles across section routes still end with `A Thinking Workspace`; this is acceptable for now but could be normalized later if a fuller brand pass is desired.
- Homepage/about copy now better signals authority, but stronger demand-shaped pillar pages are still the main remaining content gap.
- `llms.txt` is stronger, but a future pass could add more curated high-signal case-study/resource links.

### Suggested next actions
1. Add three demand-shaped systems pillars: AI architecture, agents vs workflows, and post-demo failure.
2. Expand reporting scripts to check definition intros, proof links, and audience declarations.
3. Re-run build and live verification after deploy to confirm sitemap and metadata output.

## Update: 2026-03-14 (Authority pillar + reporting pass)

### Summary
- Added three demand-shaped systems pillar pages focused on AI architecture, agents vs workflows, and post-demo failure.
- Surfaced the new pillars in the main systems discovery page, homepage featured priority order, and `llms.txt`.
- Upgraded systems reporting so advisory and report outputs now track authority signals such as definition intros, audience framing, and proof-surface links.
- Added proof-surface links from flagship systems docs into portfolio, local experiments, and shared resources to strengthen topical authority and GEO support.

### Files touched
- `src/content/systems/ai-architecture-explained-how-modern-llm-applications-work.mdx`
- `src/content/systems/ai-agents-vs-ai-workflows.mdx`
- `src/content/systems/why-most-ai-projects-fail-after-the-demo-stage.mdx`
- `src/content/systems/seo-aeo-geo-how-things-fit-together.mdx`
- `src/content/systems/observability-first-ai-systems.mdx`
- `src/content/systems/knowledge-management-as-runtime-memory.mdx`
- `src/content/systems/decision-making-under-uncertainty-in-ai-runtimes.mdx`
- `src/pages/systems.astro`
- `src/pages/index.astro`
- `src/pages/llms.txt.ts`
- `src/components/ContentDiscovery.astro`
- `scripts/lint-systems-advisory.mjs`
- `scripts/report-systems-consistency.mjs`
- `scripts/report-topic-coverage.mjs`
- `scripts/report-main-gaps.mjs`

### Decisions
- New authority pillars stay inside `systems`; no new section or navigation restructuring was introduced.
- Discovery weighting now favors architecture, workflows/agents, and post-demo failure alongside existing orchestration/discoverability docs.
- Reporting now treats authority signals as first-class advisory data, not only structural consistency.
- Proof surfaces should include `portfolio`, `shelf/local-experiments`, or `shelf/shared-resources` where naturally relevant.

### Validation
- `npm run lint:systems` passed.
- `npm run report:gaps` now shows all main gaps addressed.
- `npm run report:systems` includes new authority-signal columns.
- `npm run build` passed after the content and reporting updates.

### Open risks / follow-ups
- `report:topics` still shows `adoption` as thin and `architecture`/`integration` as developing, which is directionally correct and should inform the next content batch.
- Advisory warnings remain intentionally non-blocking; older systems docs still lack some direct-answer or proof-link signals.
- The new pillars improve authority, but off-site distribution and search-console monitoring remain external work.

### Suggested next actions
1. Add one adoption-focused systems doc and one integration-focused systems doc to close the remaining topic thin spots.
2. Run a selective refresh pass on older flagship systems docs with the highest advisory gaps.
3. After deploy, compare impression/click changes for the new pillars and the updated `/systems/` hub.

### Summary
- Added a reusable SEO/AEO/GEO instruction framework with a clear separation between transferable core rules and site-specific overlay.
- Added playbooks for cluster rollout, schema rollout, and measurement/reporting to make execution consistent.
- Added authoring templates for systems pages, entity-centric pages, and FAQ blocks.
- Wired framework paths and usage rules into `AGENTS.md` so future agents follow one standard operating model.

### Files touched
- `docs/agent-instructions/seo-aeo-geo-core.md` (new)
- `docs/agent-instructions/seo-aeo-geo-site-overlay.md` (new)
- `docs/agent-instructions/playbooks/content-cluster-rollout.md` (new)
- `docs/agent-instructions/playbooks/schema-rollout.md` (new)
- `docs/agent-instructions/playbooks/measurement-and-reporting.md` (new)
- `docs/agent-instructions/templates/systems-seo-aeo-geo-template.md` (new)
- `docs/agent-instructions/templates/entity-page-template.md` (new)
- `docs/agent-instructions/templates/faq-block-template.md` (new)
- `docs/agent-instructions/implementation/seo-aeo-geo-roadmap.md` (new)
- `AGENTS.md` (new section with framework references and agent usage rule)

### Decisions
- Core framework remains generic and portable across projects.
- Site Overlay contains repo-specific constraints and section-role mapping.
- Playbooks focus on execution sequence and acceptance criteria, not editorial style duplication.
- Templates encode consistent page anatomy while preserving section-specific style constraints already defined in `AGENTS.md`.

### Open risks / follow-ups
- Framework exists, but current pages are not yet fully audited against every new playbook criterion.
- Measurement playbook requires a repeatable query/prompt set to avoid inconsistent tracking.

### Suggested next actions
1. Run a first structured gap audit of key pages against the new Core + Site Overlay checks.
2. Define a stable query/prompt benchmark set for monthly SEO/AEO/GEO reporting.
3. Implement targeted upgrades in one pilot cluster (`systems` first), then apply to other sections.

## Update: 2026-03-05 (Cross-section topic mapping + automation)

### Summary
- Added a value-first cross-section topic map to guide safe, systematic topic expansion across `systems`, `sentences`, `self`, `shelf`, and `sticky-notes`.
- Added an automated topic coverage report script (`report:topics`) so future expansion can be evidence-driven rather than ad-hoc.
- Wired both into `AGENTS.md` under the SEO/AEO/GEO instruction framework section.

## Update: 2026-03-08 (Cornerstone systems hub + Dual NLP surfacing)

### Summary
- Added a clear `Start Here` hub to the Systems section page for the seven locked cornerstone guides.
- Surfaced `Dual NLP for AI-assisted SDLC` as the manifesto/framework page behind DIY intelligence, NLPg, and governed execution.
- Strengthened internal cross-links across the cornerstone systems pages so the cluster reads as one authority mesh instead of isolated essays.
- Added a live SEO verification script entry point (`verify:seo-live`) to make post-deploy tag/sitemap checks repeatable.

### Files touched
- `src/pages/systems.astro`
- `src/pages/dual-nlp-framework.astro`
- `src/content/systems/seo-aeo-geo-how-things-fit-together.mdx`
- `src/content/systems/aeo-and-geo-as-a-retrieval-design-problem.mdx`
- `src/content/systems/prompting-is-not-the-skill-you-think-it-is.mdx`
- `src/content/systems/observability-first-ai-systems.mdx`
- `src/content/systems/agent-instructions-and-handoff-as-an-operating-system.mdx`
- `src/content/systems/tech-stack-for-nlpg-driven-ai-assisted-sdlc.mdx`
- `src/content/systems/entity-glossary-for-ai-discoverability.mdx`
- `package.json`
- `scripts/verify-seo-live.sh`

### Decisions
- Locked the seven-cornerstone Systems cluster:
  - discoverability map
  - retrieval design
  - prompting as system design
  - observability
  - agent operating system
  - AI-assisted SDLC stack
  - entity glossary
- Kept `DIY Intelligence / Dual NLP` as a framework page, not a search pillar.
- Homepage remains four-pillar (`systems`, `sentences`, `self`, `shelf`) while `/systems/` now exposes the deeper authority spine.

### Open risks / follow-ups
- Production still needs a fully current deploy before live tag `noindex, follow` verification can pass.
- The cornerstone mesh is now explicit, but `/systems/` category pages still behave mostly as browse pages rather than curated sub-hubs.
- No dedicated `DIY Intelligence` manifesto slug was added; the current framework page carries that role.

### Suggested next actions
1. Deploy latest `main`, then run `npm run verify:seo-live`.
2. Re-submit `https://pruningmypothos.com/sitemap.xml` only after live tag meta and sitemap output are confirmed.
3. Consider a second-pass upgrade for `/systems/` category pages so each category gets a smaller `Start Here` cluster as well.

## Update: 2026-03-08 (Support cluster expansion + micro-interaction polish)

### Summary
- Added one support document each to `systems`, `sentences`, `self`, `shelf/shared-resources`, plus one sticky note to reinforce retrieval, grounding, and evaluation language across sections.
- Added a small interaction polish pass to the homepage knowledge map:
  - active connected-link highlighting on node hover/focus
  - calmer pathway card hover/focus states
- Kept the editorial layout model unchanged; changes are limited to support content and subtle interaction feedback.

### Files touched
- `src/content/systems/evaluation-as-a-runtime-discipline.mdx`
- `src/content/sentences/retrieve-before-claim.md`
- `src/content/self/how-i-run-a-weekly-eval-loop.md`
- `src/content/shelf/shared-resources/retrieval-and-grounding-evaluation-kit.md`
- `src/content/sticky-notes/note-39.md`
- `src/components/KnowledgeMap.astro`

### Decisions
- Chose a support batch aligned to the existing topic map instead of expanding the cornerstone set.
- Reinforced retrieval, grounding, and evaluation as supporting keywords because those surfaces are already strong enough to deepen, not broad enough to fragment.
- Kept micro-interactions restrained and keyboard-accessible.

### Open risks / follow-ups
- New support docs improve cluster depth, but related “continue reading” patterns could still be made more systematic across non-systems sections.
- The homepage hero still carries the heaviest motion on the page; no performance trim was attempted in this pass.

### Suggested next actions
1. Add one more support resource or tool page for evaluation/observability if you want stronger shelf depth around the new systems doc.
2. After live deploy, re-run topic reports and live SEO verification before sitemap submission.

## Update: 2026-03-08 (Skills cluster phase 1)

### Summary
- Added the first published batch of the `skills` cluster inside `systems`:
  - one concept page defining skills as reusable execution units
  - one comparison page separating skills, prompts, workflows, and agents
- Added one shelf shared-resource page with three compact AI skill templates.
- Updated the Dual NLP framework page with a small note positioning the sandbox as a skill blueprint compiler.

### Files touched
- `src/content/systems/what-a-skill-is-in-ai-systems.mdx`
- `src/content/systems/skills-vs-prompts-vs-agents.mdx`
- `src/content/shelf/shared-resources/ai-skill-design-templates.md`
- `src/pages/dual-nlp-framework.astro`

### Decisions
- `Skills` remains a Systems sub-cluster, not a new site pillar.
- Kept phase 1 constrained to two systems pages, one resource page, and one framing update.
- Positioned templates as practical support assets, not as the thesis of the cluster.
- Positioned the sandbox as a compiler surface for moving from intent to skill blueprint.

### Open risks / follow-ups
- The two deeper planned skills pages (`designing-reusable-ai-skills`, `skill-evaluation-and-versioning`) are intentionally not added yet.
- The Systems landing page has not yet been updated to surface the new skills cluster explicitly in its `Start Here` area.

### Suggested next actions
1. Add the two deeper skills pages only after reviewing how the first batch integrates into the Systems cluster.
2. Consider a small systems-hub update later so the skills cluster is more visible without crowding the seven cornerstone cards.

## Update: 2026-03-08 (Skills cluster phase 2)

### Summary
- Added the two deeper operational skills pages:
  - reusable skill design
  - skill evaluation and versioning
- Added a compact skills cluster callout under the main Systems cornerstone section.
- Kept the skills cluster subordinate to the seven-page cornerstone spine.

### Files touched
- `src/content/systems/designing-reusable-ai-skills.mdx`
- `src/content/systems/skill-evaluation-and-versioning.mdx`
- `src/pages/systems.astro`

### Decisions
- Skills cluster is now complete enough to cover concept, comparison, design, and evaluation without expanding beyond the approved four pages.
- The Systems hub change stays subordinate: visible cluster reference, no redesign, no homepage spillover.

### Open risks / follow-ups
- The new skills cluster is linked from `/systems/`, but the individual skill pages do not yet have a fully developed “continue” navigation pattern among themselves.
- No extra shelf or sticky-note reinforcement was added for this second phase.

### Suggested next actions
1. After production deploy and live SEO verification, assess whether the skills cluster needs one small internal nav enhancement at the end of each page.
2. Keep future additions around skills limited to supporting assets, not new top-level conceptual sprawl.

## Update: 2026-03-06 (Phase 1 URL detox + Phase 2 knowledge map foundation)

### Summary
- Implemented strict crawl/index cleanup without rewriting core content.
- Reduced sitemap scope to strict-core plus live content entries under centralized exclusions.
- Deindexed tag pages while keeping them crawlable and canonicalized.
- Demoted homepage tag prominence below primary discovery sections.
- Introduced a lightweight homepage `KnowledgeMap` component with direct pillar navigation.

### Files touched
- `src/pages/sitemap.xml.ts`
- `src/pages/tags.astro`
- `src/pages/tags/[tag].astro`
- `src/components/ContentDiscovery.astro`
- `src/components/KnowledgeMap.astro` (new)
- `src/pages/index.astro`

### Decisions
- Sitemap model: hybrid auto (small core allowlist + collection entries), with centralized route exclusions.
- Tag policy: keep accessible for UX, set `noindex`, and remove from sitemap.
- Backlink policy: monitor-only (no disavow in this phase).
- Knowledge map rollout: static/semi-interactive SVG only (no graph libraries).

### Validation
- `npm run build` passed.
- `dist/sitemap.xml` no longer includes tags and excluded non-strategic route classes.
- `dist/tags/index.html` and `dist/tags/*/index.html` output `meta robots` as `noindex, nofollow`.
- Internal-link audit on built output found no broken internal links.

### Monitoring thresholds
- Investigate if any of the following occur:
  1. toxic referring domains increase by `>= 20%` month-over-month
  2. target URL errors in backlink tools increase by `>= 15` in a reporting cycle
  3. GSC indexed core pages drop by `>= 10%` week-over-week

### Open risks / follow-ups
- Existing global runtime payload in `Layout.astro` (Mermaid and other global scripts) remains and should be trimmed in a dedicated performance pass.
- If exclusion policy changes, update `EXCLUDED_ROUTE_PREFIXES` in `sitemap.xml.ts` to prevent crawl drift.

### Files touched
- `docs/agent-instructions/implementation/cross-section-topic-map-v1.md` (new)
- `scripts/report-topic-coverage.mjs` (new)
- `package.json` (new script: `report:topics`)
- `AGENTS.md` (framework references + topic report usage note)

### Validation
- `npm run report:topics` passed.
- Current strategic seed gaps identified by report:
  - missing: `observability`, `workflows`, `knowledge-management`
  - thin: `decision-making`

### Decisions
- Topic expansion should prioritize durable value and section-fit over trend coverage.
- Keep automated coverage checks advisory (reporting), not blocking, to avoid over-constraining editorial voice.

### Suggested next actions
1. Start Tier 1 topic expansion from `cross-section-topic-map-v1.md`.
2. Add one pilot systems doc in each missing/thin seed area.
3. Re-run `npm run report:topics` after each batch to track coverage deltas.

## Update: 2026-03-05 (First cross-section implementation batch: observability)

### Summary
- Implemented the first mapped topic cluster (`observability`) across five sections:
  - Systems
  - Sentences
  - Self
  - Shelf (notes)
  - Sticky notes
- Tuned the topic report script to reduce advisory noise from tag variants (`workflow` vs `workflows` and related aliases).

### Files touched
- `src/content/systems/observability-first-ai-systems.mdx` (new)
- `src/content/sentences/observability-turns-behavior-into-knowledge.md` (new)
- `src/content/self/the-weekly-observability-reset.md` (new)
- `src/content/shelf/notes/observability-logbook-pattern.md` (new)
- `public/covers/shelf/observability-logbook-pattern.svg` (new)
- `src/content/sticky-notes/note-38.md` (new)
- `scripts/report-topic-coverage.mjs` (alias normalization for lower noise)

### Validation
- `npm run lint:systems` passed (`28 systems docs passed consistency checks`).
- `npm run report:topics` passed.
- `npm run build` passed.
- Topic coverage change after batch:
  - `observability`: now covered in 5 sections (strong)
  - action candidates reduced to: `knowledge-management` (missing), `decision-making` (thin)

### Decisions
- Started with one high-value missing topic to prove the cross-section pattern end-to-end.
- Kept report script advisory and improved canonicalization rather than adding stricter gating.

### Suggested next actions
1. Run the second batch on `knowledge-management` across at least three sections.
2. Add one decision-design systems page plus matching sentence/self support to improve `decision-making` coverage.
3. Add a compact monthly topic-coverage snapshot (append-only) for trend visibility.

## Update: 2026-03-05 (Second cross-section implementation batch: knowledge-management)

### Summary
- Implemented the `knowledge-management` cluster across four sections in one batch:
  - systems
  - sentences
  - self
  - shelf/notes
- Added a unique editorial cover for the shelf note entry.
- Kept systems long-form and consistency gates intact while improving cross-section internal linking.

### Files touched
- `src/content/systems/knowledge-management-as-runtime-memory.mdx` (new)
- `src/content/sentences/knowledge-needs-shape-to-compound.md` (new)
- `src/content/self/building-a-knowledge-surface.md` (new)
- `src/content/shelf/notes/knowledge-surface-weekly-map.md` (new)
- `public/covers/shelf/knowledge-surface-weekly-map.svg` (new)

### Validation
- `npm run lint:systems` passed (`29 systems docs passed consistency checks`).
- `npm run report:topics` passed.
- `npm run build` passed.
- Topic coverage delta:
  - `knowledge-management`: now covered in 4 sections (strong).
  - `retrieval`: improved to 4 sections (strong).
  - Remaining strategic thin gap: `decision-making` (1 section).

### Decisions
- Prioritized durable value and cross-section reuse rather than adding isolated one-off pages.
- Preserved section-specific writing constraints while improving shared entity coverage.

### Suggested next actions
1. Execute Batch 3 for `decision-making` (systems flagship + sentence + self support).
2. Optionally add one shelf/shared-resource entry curating decision frameworks and postmortem references.
3. Re-run `npm run report:topics` after Batch 3 and snapshot the delta.

## Update: 2026-03-05 (Third cross-section implementation batch: decision-making)

### Summary
- Implemented the `decision-making` cluster across the planned three sections:
  - systems flagship
  - sentence support
  - self reflection support
- Added internal cross-links between the new decision pages and existing runtime/observability pages.
- Completed the original strategic seed-coverage plan: no thin/missing topics remain in the seeded set.

### Files touched
- `src/content/systems/decision-making-under-uncertainty-in-ai-runtimes.mdx` (new)
- `src/content/sentences/a-decision-rule-is-a-kindness-to-your-future-self.md` (new)
- `src/content/self/decision-logs-beat-memory.md` (new)

### Validation
- `npm run lint:systems` passed (`30 systems docs passed consistency checks`).
- `npm run report:topics` passed.
- `npm run build` passed (`413 page(s) built`).
- Strategic seed status after batch:
  - `decision-making`: now 3 sections (strong)
  - report now shows: `Action candidates: No thin/missing seed topics detected.`

### Decisions
- Kept the third batch scoped to the planned minimum set (systems + sentence + self) to preserve momentum and avoid content sprawl.
- Maintained section-specific style constraints while expanding cross-section entity coherence.

### Suggested next actions
1. Run a monthly cadence update for `report:topics` and append trend snapshots.
2. Consider optional expansion of `citation` and `agents` from developing to strong via one additional section each.
3. Keep future batches tied to measurable gaps from `report:topics` to avoid ad-hoc growth.

## Update: 2026-03-05 (Main-gap closure pass: entity/schema/evidence/AEO/distribution)

### Summary
- Implemented a focused gap-closure pass across the five requested categories:
  - entity layer
  - schema
  - evidence/citation (GEO)
  - AEO extraction
  - distribution framework
- Added a canonical systems glossary page with stable `term-*` anchors.
- Extended systems content schema and systems detail rendering for optional `updatedAt`, `proofPoints`, and `faq`.
- Enabled `FAQPage` JSON-LD on systems detail pages when FAQ frontmatter is present.
- Added direct-answer question blocks and proof metadata to key flagship systems pages.
- Added a distribution + canonical syndication playbook and a deterministic `report:gaps` script.

### Files touched
- `src/content/config.ts` (systems schema extension)
- `src/pages/systems/[slug].astro` (FAQ schema, DefinedTerm linking, mentions, proof/update rendering)
- `src/content/systems/entity-glossary-for-ai-discoverability.mdx` (new)
- `src/content/systems/seo-aeo-geo-how-things-fit-together.mdx` (updated with faq/proof/updatedAt + direct answer)
- `src/content/systems/observability-first-ai-systems.mdx` (updated with faq/proof/updatedAt + direct answer)
- `src/content/systems/knowledge-management-as-runtime-memory.mdx` (updated with faq/proof/updatedAt + direct answer)
- `src/content/systems/decision-making-under-uncertainty-in-ai-runtimes.mdx` (updated with faq/proof/updatedAt + direct answer)
- `docs/agent-instructions/playbooks/distribution-and-canonical-syndication.md` (new)
- `scripts/report-main-gaps.mjs` (new)
- `package.json` (`report:gaps` script)
- `AGENTS.md` (framework references + `report:gaps` usage)

### Validation
- `npm run lint:systems` passed (`31 systems docs passed consistency checks`).
- `npm run report:topics` passed.
- `npm run report:gaps` passed with status:
  - Entity layer: Addressed
  - Schema: Addressed
  - Evidence/citation (GEO): Addressed
  - AEO extraction: Addressed
  - Distribution: Addressed (framework)
- `npm run build` passed (`415 page(s) built`).

### Decisions
- Distribution was implemented as in-repo framework/process (playbook + reporting); actual off-site publication remains operational work outside this repository.
- Gap closure was done with explicit, testable signals rather than qualitative-only claims.

### Suggested next actions
1. Execute one live cross-post cycle for a flagship explainer and track in a distribution log.
2. Add one more `citation`-focused page to raise citation coverage from `developing` to `strong`.
3. Keep running `npm run report:gaps` and `npm run report:topics` before each deploy batch.

## Update: 2026-03-05 (Practical docs on agent instructions + handoff method)

### Summary
- Added two high-value Systems documents that explain the agent-instructions + handoff method using in-repo practical examples and measured outcomes.
- Kept both pages aligned with Systems consistency standards (3-act structure, key takeaways, callout, highlight, tables, FAQs, proof blocks, direct answers).

### Files touched
- `src/content/systems/agent-instructions-and-handoff-as-an-operating-system.mdx` (new flagship)
- `src/content/systems/from-ad-hoc-prompts-to-repeatable-agent-workflows.mdx` (new practical case study)

### Validation
- `npm run lint:systems` passed (`33 systems docs passed consistency checks`).
- `npm run build` passed (`417 page(s) built`).
- Topic report remains stable (`npm run report:topics`).
- Main gap report remains addressed (`npm run report:gaps`).

### Decisions
- Kept publication in the current website (no separate repo) to maximize practical continuity and avoid maintenance overhead.
- Used repository-native evidence and workflow outputs to make examples concrete and reproducible.

### Suggested next actions
1. Add one companion `self` entry and one `shelf/notes` template note linking to the two new systems docs.
2. Add a short section-level index page in `systems` that groups these process docs as a mini series.
3. Run one distribution cycle (cross-post with canonical) and capture outcomes in a dated log.

## Update: 2026-03-05 (Reusable agent-ops case study template)

### Summary
- Added a permanent, usability-focused template for documenting agent-ops case studies with practical proof requirements.
- Linked the template in `AGENTS.md` under the authoring templates list.

### Files touched
- `docs/agent-instructions/templates/agent-ops-case-study-template.md` (new)
- `AGENTS.md` (template reference added)

### Notes
- Template includes: frontmatter scaffold, systems-standard body structure, required evidence sections, proof block pattern, reuse checklist, and anti-pattern list.

## Update: 2026-03-05 (End-of-day closure)

### Summary
- Handoff is current for today's SEO/AEO/GEO framework work, gap-closure implementation, process-doc publication, and reusable template creation.
- No unresolved code/schema blockers are pending in-repo from today's scope.

### Open operational follow-through (outside core code changes)
- Run one live distribution cycle (cross-post with canonical link back) and record outcomes.
- Optionally add one supporting `self` note and one `shelf/notes` entry linking the new process docs.
- Maintain weekly/monthly cadence for `npm run report:topics` and `npm run report:gaps`.

## Update: 2026-03-05 (Disable FTP deploy for manual dist uploads)

### Summary
- Disabled automatic FTP deployment in GitHub Actions so push status is no longer tied to FTP credentials.
- Kept a manual workflow entry (`workflow_dispatch`) that still runs install/lint/build checks as a release gate before manual `dist/` upload.

### Files touched
- `.github/workflows/deploy-hostinger.yml`

### Root cause confirmed
- Recent red workflow runs (including `b2b4c87`) failed at FTP step with:
  - `Error: Input required and not supplied: password`
- Build step itself was successful.

### Current deployment mode
- Manual upload from local `dist/` to hosting target.
- Optional manual GitHub workflow run for verification only.

## Update: 2026-03-05 (Homepage CTA typewriter + style-safe SEO rollback/fix)

### Summary
- Reworked homepage CTA typing animation so only text animates and CTA pill width stays stable.
- Removed intrusive homepage content blocks that broke established editorial layout rhythm.
- Retained non-visual structured-data enhancement (`FAQPage` JSON-LD) for homepage AEO support.

### Files touched
- `src/pages/index.astro`

### Validation
- `npm run build` passed (`417 page(s) built`).

## Update: 2026-04-14 (Cross-section content clusters from presentations)

### Summary
- Created 4 cross-section content clusters based on the 4 new presentation PDFs.
- Each cluster includes: 1 systems doc, 1 sentence, 1 self entry, 1 sticky note.
- All docs are interlinked; shared-resource collaterals updated with related doc links.

### Cluster 1: Enterprise AI at Scale
- `src/content/systems/enterprise-ai-at-scale.mdx`
- `src/content/sentences/governance-before-architecture.md`
- `src/content/self/what-i-learned-running-ai-governance.md`
- `src/content/sticky-notes/note-enterprise-governance.md`
- Linked from: `enterprise-ai-blueprint-deck.md`

### Cluster 2: The Logic Void
- `src/content/systems/the-logic-void.mdx`
- `src/content/sentences/the-void-is-not-a-flaw.md`
- `src/content/self/learning-to-say-i-dont-know.md`
- `src/content/sticky-notes/note-logic-void.md`
- Linked from: `logic-void-deck.md`

### Cluster 3: Engineering Bounded Autonomy
- `src/content/systems/engineering-bounded-autonomy.mdx`
- `src/content/sentences/autonomy-needs-boundaries.md`
- `src/content/self/designing-my-first-safety-constraint.md`
- `src/content/sticky-notes/note-bounded-autonomy.md`
- Linked from: `engineering-bounded-autonomy-deck.md`

### Cluster 4: Agentic Orchestration
- `src/content/systems/agentic-orchestration-coordination.mdx`
- `src/content/sentences/handoffs-are-load-bearing.md`
- `src/content/self/debugging-multi-agent-systems.md`
- `src/content/sticky-notes/note-agentic-orchestration.md`
- Linked from: `dax-agentic-orchestration-deck.md`

### Validation
- `npm run lint:systems` passed (49 systems docs).
- `npm run build` passed (472 pages).
- All new docs follow section-specific guidelines (systems 3-act structure, sentences reflective style, self lead + inline SVG, sticky minimal format).

### Decisions
- Kept each cluster topic-focused and interconnected rather than duplicating existing content.
- Each systems doc links to its corresponding shared-resource collateral for PDF access.
- Cross-links between clusters reinforce topical authority (e.g., logic void links to bounded autonomy, orchestration links to both).

### Open risks / follow-ups
- None; all 18 presentation PDFs now have corresponding shelf collaterals and supporting cross-section content.

### Suggested next actions
1. Review the 4 new clusters for content accuracy based on PDF content.
2. Consider adding more cross-links between clusters to strengthen topical authority mesh.

## Update: 2026-04-14 (Presentation collaterals pass)

### Summary
- Added shared-resources collaterals for 4 presentations that were in `/public/resources/presentations/` but not yet covered on the site.
- All 4 new entries follow shelf/shared-resources guidelines with `pdfUrl`, `coverUrl`, `resourceHighlights`, and internal related links.

### New files
- `src/content/shelf/shared-resources/enterprise-ai-blueprint-deck.md`
- `src/content/shelf/shared-resources/logic-void-deck.md`
- `src/content/shelf/shared-resources/engineering-bounded-autonomy-deck.md`
- `src/content/shelf/shared-resources/dax-agentic-orchestration-deck.md`
- `public/covers/shelf/shared-enterprise-ai-blueprint.svg`
- `public/covers/shelf/shared-logic-void.svg`
- `public/covers/shelf/shared-bounded-autonomy.svg`
- `public/covers/shelf/shared-dax-orchestration.svg`

### Validation
- `npm run lint:systems` passed (45 systems docs).
- `npm run build` passed (452 pages, up from 443).
- All 4 new pages generated: `/shelf/shared-resources/enterprise-ai-blueprint-deck/`, `/shelf/shared-resources/logic-void-deck/`, `/shelf/shared-resources/engineering-bounded-autonomy-deck/`, `/shelf/shared-resources/dax-agentic-orchestration-deck/`.

### Decisions
- Kept collateral format consistent with existing deck entries (title, description, tags, coverUrl, pdfUrl, resourceHighlights, related internal links).
- Each SVG cover uses a unique abstract motif following `docs/style-guides/shelf-resource-cover-style.md`.

### Open risks / follow-ups
- None; all 18 PDFs in presentations folder now have corresponding shelf/shared-resources collaterals.

### Suggested next actions
1. Review the 4 new entries for content accuracy based on PDF content.
2. Consider adding more internal links to strengthen cross-navigation.

## Update: 2026-04-14 (SEO/AEO indexability priority pass)

### Summary
- Achieved 100% FAQ frontmatter coverage on all 45 systems docs
- Added Article schema with BreadcrumbList to all section detail pages (sentences, shelf, self)
- Added CollectionPage + ItemList schema to systems category index pages (concepts, explanations, how-things-fit-together)
- Added ogType="article" to detail page templates for proper OG metadata
- Fixed YAML quoting issues in FAQ frontmatter (colons in answer text now quoted)

### Files touched
- All 45 systems docs in `src/content/systems/` (FAQ + proofPoints added)
- `src/pages/systems/concepts.astro`
- `src/pages/systems/explanations.astro`
- `src/pages/systems/how-things-fit-together.astro`
- `src/pages/sentences/[slug].astro`
- `src/pages/self/[slug].astro`
- `src/components/ShelfEntryPage.astro`
- `src/pages/shelf/local-experiments/[slug].astro`
- `src/pages/shelf/shared-resources/[slug].astro`

### Validation
- `npm run lint:systems` passed (45 systems docs)
- `npm run build` passed
- `npm run report:gaps` shows all main gaps addressed

### Suggested next actions
1. Deploy and verify sitemap.xml includes all detail pages
2. Re-submit sitemap to Google Search Console
3. Monitor index coverage report for improvements

## Update: 2026-03-05 (Homepage caret blink + AEO/GEO signal pass)

### Summary
- Refined homepage CTA typing UX by separating the blinking caret from typed text, preventing width jitter and preserving a smooth typewriter loop.
- Added a compact direct-answer block on homepage for AEO extraction (question-style heading + concise answer).
- Added a style-consistent "Featured from the Workspace" signal block with intent-mapped internal links.
- Strengthened homepage structured data with `dateModified` and `mentions` (DefinedTerm links to core entity pages).

### Files touched
- `src/pages/index.astro`

### Notes
- Maintained existing editorial layout style; no nav/hero/footer structural redesign.
- Homepage schema remains aligned with visible content (no hidden FAQ schema).

## Update: 2026-06-17 (Sentences content drought & SEO/AEO/GEO alignment)

### Summary
- Added 7 new sentences posts to target strategic topics and resolve content drought under brand style rules and SEO/AEO/GEO criteria.
- Ensured all new files are pure Markdown (no MDX, no HTML tags, no SVG, no code blocks) as required by external agent guardrails.
- Confirmed that content checks and site compilation compile and build with zero errors.

### New files
- `src/content/sentences/constraints-prevent-confusion.md`
- `src/content/sentences/contracts-reduce-ambiguity.md`
- `src/content/sentences/drift-is-rarely-loud.md`
- `src/content/sentences/escalation-requires-context.md`
- `src/content/sentences/grounding-prevents-hallucination.md`
- `src/content/sentences/validation-is-not-static.md`
- `src/content/sentences/measure-before-optimize.md`

### Validation
- `npm run lint:content` passed successfully.
- `npm run build` passed successfully with 479 pages built.

## Update: 2026-06-17 (Integration Contracts cross-section cluster)

### Summary
- Designed and directly deployed a topic cluster for **"Resilient Integration Contracts"** spanning all 5 sections of the repository (`systems`, `sentences`, `self`, `shelf`, and `sticky-notes`).
- Enforced all specific style constraints for each section (e.g. 800+ word counts, takeaways, and callout validations for `systems`; lead paragraphs and SVG diagrams for `self`; coverUrl rules for `shelf`; rotation constraints for `sticky-notes`).

### New files
- `src/content/sentences/interfaces-define-integration-boundaries.md`
- `src/content/systems/resilient-integration-contracts-for-structured-outputs.mdx`
- `src/content/self/debugging-my-first-schema-translation-error.md`
- `src/content/shelf/notes/structured-output-translation-playbook.md`
- `src/content/sticky-notes/note-integration-interfaces.md`

### Validation
- `npm run lint:content` passed successfully.
- `npm run lint:systems` passed successfully (50 systems docs checked).
- `npm run build` passed successfully with 484 pages built.

## Update: 2026-06-17 (SEO/AEO/GEO schema and indexing validation)

### Summary
- Aligned dynamic sitemap generation and tag templates with the site tag policy by removing `/tags` routes from `sitemap.xml.ts` and setting `noindex={true}` on all tag templates.
- Added `BreadcrumbList` JSON-LD schema to the homepage to resolve validation warnings.
- Synchronized live SEO check script `verify-seo-live.sh` with updated noindex and exclusion expectations.

### Files touched
- `src/pages/sitemap.xml.ts`
- `src/pages/tags.astro`
- `src/pages/tags/[tag].astro`
- `src/pages/index.astro`
- `scripts/verify-seo-live.sh`

### Validation
- `npm run verify:indexing` passed successfully with **25 passes, 0 warnings, 0 failures**.
- `npm run build` passed successfully with 484 pages built.

## Update: 2026-06-17 (Legacy redirects and 410 Gone configuration)

### Summary
- Audited git commit history to identify deleted files and directories (movies shelf category, old placeholder sentences, old notes, and deleted tokenizer page).
- Configured `.htaccess` rules: used **301 redirects** for renamed paths (notes $\rightarrow$ sticky-notes) and **410 Gone** status rules for retired legacy pages to tell Google to drop them from search results permanently.
- Created `scripts/verify-htaccess-sitemap.mjs` to dynamically cross-reference all sitemap URLs with the rewrite rules, verifying zero URL conflicts.

### Files touched
- `public/.htaccess`
- `scripts/verify-htaccess-sitemap.mjs`

### Validation
- `node scripts/verify-htaccess-sitemap.mjs` passed with zero conflicts.
- `npm run verify:indexing` remained green with **25 passes, 0 warnings, 0 failures**.
- `npm run build` passed successfully.

## Update: 2026-06-24 (Technical SEO/AEO/GEO Overhaul)

### Summary
- Diagnosed and resolved technical issues affecting crawl efficiency, metadata trust, and structured data hierarchy.
- Suppressed duplicate article schemas on detail pages by adding `disableDefaultArticleSchema` support.
- Fully integrated metadata and canonical URLs for the portfolio section page and subpages.
- Added `BreadcrumbList` JSON-LD schema blocks to all core section landing pages.
- Enabled systems article `<lastmod>` generated values within `sitemap.xml`.

### Files touched
- `src/layouts/Layout.astro`
- `src/layouts/PortfolioLayout.astro`
- `src/components/ShelfEntryPage.astro`
- `src/pages/systems/[slug].astro`
- `src/pages/sentences/[slug].astro`
- `src/pages/self/[slug].astro`
- `src/pages/shelf/local-experiments/[slug].astro`
- `src/pages/shelf/shared-resources/[slug].astro`
- `src/pages/about.astro`
- `src/pages/systems.astro`
- `src/pages/sentences.astro`
- `src/pages/self.astro`
- `src/pages/shelf.astro`
- `src/pages/sticky-notes.astro`
- `src/pages/portfolio.astro`
- `src/pages/portfolio/[sample].astro`
- `src/pages/sitemap.xml.ts`

### Decisions
- Prevent layout fallback article schemas from rendering on detail pages where custom structured article schemas are defined.
- Formally index and associate the portfolio section page and case studies with the primary `PruningMyPothos` entity.
- Map the systems collection `updatedAt` field directly to `<lastmod>` inside sitemap generation.

### Validation
- `npm run verify:content` passed successfully.
- `npm run build` completed successfully (488 pages built).
- `npm run verify:indexing` passed successfully with **25 passes, 0 warnings, 0 failures**.

## Update: 2026-06-25 (LLMOps Evals Sentences Post)

### Summary
- Created a new sentences content page `evals-are-operational-contracts.md` under the `Judgment` category.
- Covered the topic of LLMOps evaluations as continuous operational contracts, linking to the NewTuple blog for document parsing benchmarks.

### New files
- `src/content/sentences/evals-are-operational-contracts.md`

- `npm run verify:indexing` passed successfully with **25 passes, 0 warnings, 0 failures**.

## Update: 2026-06-25 (LLMOps Evals Systems Doc integration)

### Summary
- Updated and expanded the existing systems doc `llm-ops-without-the-buzzwords.mdx` under the `Explanations` category per user approved option.
- Added a new subsection "Benchmarks vs. Runtime Evaluations" under Act II to introduce static benchmark datasets for complex workloads (specifically document parsing and OCR).
- Integrated the external link to the NewTuple OCR benchmarking blog under the evaluations section.
- Added new entry under `proofPoints` and incremented the `updatedAt` field.

### Files modified
- `src/content/systems/llm-ops-without-the-buzzwords.mdx`

- `npm run verify:indexing` passed successfully with **25 passes, 0 warnings, 0 failures**.

## Update: 2026-06-25 (Semantic Caching Cross-Section Cluster)

### Summary
- Designed and deployed a complete topic cluster for **"Semantic Caching in LLMOps"** spanning all 5 sections of the repository.
- Created the flagship systems page defining exact-match vs vector-similarity caching trade-offs, similarity threshold gating, and invalidation strategies.
- Added supporting files (reflective rule, debug story, policy guide note, and micro sticky-note) with consistent cross-linking and a new editorial SVG cover.

### New files
- `src/content/systems/semantic-caching-for-probabilistic-systems.mdx`
- `src/content/sentences/caching-is-a-semantic-compromise.md`
- `src/content/self/debugging-a-semantic-cache-miss.md`
- `src/content/shelf/notes/semantic-cache-policy-guide.md`
- `src/content/sticky-notes/note-semantic-caching.md`
- `public/covers/shelf/note-semantic-cache-policy-guide.svg`

### Validation
- `npm run verify:content` passed successfully with zero advisory warnings across all 55 systems pages.
- `npm run build` completed successfully (499 pages built).
- `npm run verify:indexing` passed successfully with **25 passes, 0 warnings, 0 failures**.

## Update: 2026-06-28 (Homepage Redesign to Vibe Debugging and About Page Migration)

### Summary
- Redesigned the homepage (`index.astro`) into a professional **two-column layout** on desktop screens, highlighting the "Debugging the Vibe" theme, introducing a target-agnostic explanation of natural language, critical thinking, context, prompting, agentic loops, and workflow engineering, backed by a soft radial-gradient aura.
- Moved the original homepage visual hero elements (including the DIY CTA, self-portrait line-drawing iframe, tagline, and authority brief sections) to the About page (`about.astro`) to keep the personal brand intact.
- Designed and coded a completely new **Horizontal Content Pipeline** for the interactive `<KnowledgeMap />` graph: input streams (systems & sentences) flow inward from the left, synthesize in the center core workspace node, and output streams (self & shelf) flow outward to the right along elegant bezier paths with accelerated speed flows on hover.

### Files modified
- `src/pages/index.astro`
- `src/pages/about.astro`
- `src/components/KnowledgeMap.astro`

### Validation
- `npm run build` completed successfully (499 pages built).
- `npm run verify:content` passed all content validation rules successfully.

## Update: 2026-06-28 (Brand Polish, CLI Safeguards, Systems SEO Parity, and Open Source CTAs)

### Summary
- **Clean Naming Split**: Renamed all headers, navigations, footers, index cards, and previews to use "Systems" and "Sentiments" (completely removing suffixes "Garden" and "Lab").
- **Planned CLI Safeguards**: Replaced all terminal command lines on tool cards and pages with "Planned CLI target" or "Planned install command" blocks, hiding/disabling all copy buttons for packages not yet published on PyPI.
- **Systems SEO Parity**:
  - Added programmatic canonical links, Robots meta, Open Graph, and Twitter card tags to `SystemsLayout.astro`.
  - Configured JSON-LD schema blocks (`WebSite`, `Organization`, `WebPage`, and `SoftwareApplication` for tools) in the document head.
  - Set unique page-specific meta descriptions for the homepage, canvas hub, docs index, all documentation files, and the six browser tool pages.
  - Aligned homepage hero subtitle text with the planned CLI package positioning.
  - Installed `@astrojs/sitemap`, added it to `astro.config.mjs`, updated the dynamic `robots.txt.ts` route to target `sitemap-index.xml`, and created a static `public/robots.txt` fallback matching the build structure.
- **Open Source CTAs**:
  - Removed all commercial consultation pitches, sales pitches, and "Get in Touch" consulting phrases.
  - Rewrote CTAs on the homepage, footer, about page, and tool sidebars to focus on open-source contributions, feedback, and technical collaboration via email.

### Files modified
- `src/layouts/SystemsLayout.astro`
- `src/layouts/Layout.astro`
- `src/pages/index.astro`
- `src/pages/about.astro`
- `src/pages/tools/index.astro`
- `src/pages/tools/prompt-to-json.astro`
- `src/pages/tools/workflow-to-diagram.astro`
- `src/pages/tools/csv-to-eval.astro`
- `src/pages/tools/change-to-checklist.astro`
- `src/pages/tools/repo-context-pack.astro`
- `src/pages/tools/notes-to-brief.astro`
- `src/pages/canvases/index.astro`
- `src/pages/docs/index.astro`
- `src/pages/docs/tool-status.astro`
- `src/pages/docs/natural-language-programming-stack.astro`
- `src/pages/docs/public-private-boundary.astro`
- `src/pages/live-lab/index.astro`
- `src/pages/robots.txt.ts`
- `astro.config.mjs`
- `package.json`

### New files
- `public/robots.txt`

### Validation
- `npm run build` completed successfully compiling **515 static pages** with zero warnings or errors.
- Verified that `dist/robots.txt` is outputted correctly, contains the correct lastmod date (`2026-06-28`), and references `sitemap-index.xml`.

## Update: 2026-06-28 (Pre-Live Enhancements & Credibility Guardrails)

### Summary
- **Start Here Guidance Table**: Added a visitor path guide ("Start with the layer you need") to the homepage to orient new visitors on where to go depending on their objective.
- **What this is / is not**: Added a dedicated credibility grid to the homepage to declare exactly what the lab is (browser native utilities, documentation, proof workspace) vs what it is not (commercial SaaS, autonomous agent deployer, live CLI package).
- **Product Status Legend**: Added a status legend panel near the Tools directory header detailing Browser Prototype, Planned CLI Target, Tessera-compatible, and Future Wiring meanings.
- **Ecosystem Map**: Added a structured stack ecosystem map ("How the Sans Serif Systems stack fits together") defining ToolSmith, Tessera, Flowright, BrainBench, Hermes, and Content Engine.
- **Live Lab Proof Cards**: Improved `/live-lab/` to render a Proof Status Roadmap card grid highlighting ToolSmith, Flowright Rollout, AI Rollout Loop, and Tessera Runtime status.
- **Footer Credibility Line**: Added the lab manifesto to the Systems Layout footer.

### Files modified
- `src/pages/index.astro`
- `src/pages/live-lab/index.astro`
- `src/layouts/SystemsLayout.astro`

### Validation
- `npm run build` compiled successfully (515 static pages).
- All changes staged, committed, and pushed to remote branch main.

### Open risks / follow-ups
- Edge servers cache settings should be monitored after deploy.

### Suggested next actions
1. Go-live deployment check on pruningmypothos.com.
2. Build the Governed AI Rollout Loop canvas.
3. Build the ToolSmith HITL checklist connection.

## Update: 2026-06-28 (Enablement Portfolio Revamp & Flowright Cleanup)

### Summary
- **Enablement Portfolio Revamp (Option A)**:
  - Deleted the legacy React build folder `public/technical-marketing-portfolio/`.
  - Added a `301 Redirect` in `public/.htaccess` from `/technical-marketing-portfolio/` to `/portfolio/`. Verified that sitemap URLs are not impacted.
  - Aligned `/portfolio/` pages and layouts to focus on **AI + Documentation + Communication Enablement** instead of technical writing or consulting.
  - Changed job titles in `PortfolioLayout.astro` and `portfolio.astro` to *"AI, Documentation, and Communication Enablement Developer"*.
  - Reworked homepage and portfolio copy to favor technical functional positioning, replacing "Commercial velocity" with **Developer velocity**.
- **Flowright Cleanup**:
  - Removed all public references to the personal project `Flowright` across the site, replacing it with generic, descriptive terms like `Governance Engine` or `ChangeOps` in layouts, index cards, live-lab status roadmaps, and tool sandbox configuration objects.

### Files modified
- `src/layouts/PortfolioLayout.astro`
- `src/pages/portfolio.astro`
- `src/pages/index.astro`
- `src/pages/live-lab/index.astro`
- `src/pages/tools/index.astro`
- `src/pages/tools/change-to-checklist.astro`
- `src/pages/tools/csv-to-eval.astro`
- `src/pages/docs/public-private-boundary.astro`
- `src/pages/docs/tool-status.astro`
- `public/.htaccess`

### Validation
- `npm run build` completed successfully, compiling **515 static pages** with zero warnings or errors.
- Verified htaccess redirects pass checking rules successfully.
