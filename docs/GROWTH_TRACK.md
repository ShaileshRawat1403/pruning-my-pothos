# Growth track: rank, then distribute

The plan for growing search, AI-answer and social traffic to PMP. Any agent
picking this up reads this file first, does the **next open step** in the
order below, and updates this file (the keyword map status and the log)
before stopping. One page at a time; the owner reviews each page before the
next one starts. Pushing `main` deploys production: get the owner's go-ahead
before every push.

Started 2026-10-15. Goal and checkpoints: `docs/SEARCH_AND_DISTRIBUTION.md`
("Growth plan to 1M impressions a month"). This file is how the work gets
done; that file is why and the audit history.

## What the site is for (the intent every keyword must match)

PMP explains how AI systems actually work, in plain terms and drawings, for
people who build with AI: what a model, prompt, skill, agent, tool, context
and protocol are; where control, permission and evidence belong; and the
builder craft around them. It also shows that work being tested (Stack:
DAX, LanguageOps, PaneTera) and gives browser tools for it.

A query is in scope only if a page on this site can answer it better than
the pages already ranking, from what the site already knows. Off-intent
queries the site happens to appear for (philosophy quotes, a person's
height, music lessons, cloud price comparisons) are left alone: no page is
written to catch them.

## The weekly loop

1. **Pick** the next `open` row in the keyword map below, top to bottom.
2. **Check before writing** (10 minutes, every time):
   - Search the repo for the term (`grep -ril "<term>" src/content`) and
     check Search Console's Pages tab for the query. If a page already
     ranks for it, improve that page instead of writing a new one. Two pages
     on one question split the ranking.
   - Read what ranks on page one today. The new page must answer the
     question more directly or more completely, or it is not worth writing.
   - Confirm the claims can be sourced. If the page would need a first-person
     story the owner has not supplied, stop and ask (editorial contract).
3. **Write** the page under the editorial contract
   (`.agents/skills/pruningmypothos-editorial/SKILL.md`):
   - One page answers one question. The question is the target query.
   - Title: the query in plain words, at most 60 characters with the site
     suffix dropped automatically when it does not fit (`src/lib/seo/metadata.ts`).
   - `shortAnswer` answers the query in two or three sentences; the first
     paragraph of the body says the same thing.
   - `description` 120 to 160 characters, says what the reader gets.
   - At least one declared visual with a scroll scene
     (`docs/STORYBOARD_AUTHORING.md`); a cover with its own emblem.
   - Links: 2 to 4 links to related Systems pages, and the closest related
     page links back. Name the hub page of the cluster in the log.
   - Sources pinned (40-character SHAs for repositories); dated tool notes.
4. **Gates:** `npm run lint`, `npm run build`, `npm run test:contract`,
   `npm run audit`, `npm run audit:editorial`, `npm run validate:archive`.
   Never run the contract suite while a dev server is up.
5. **Owner review:** dev server only for the review, stopped after.
6. **Distribution pack** in `private/distribution/<slug>.md` (local only,
   gitignored): one LinkedIn post (the drawn scene, the one-line answer, the
   link for the first comment), two X posts, one newsletter paragraph. Same
   house rules as the site: no em dashes, no "it's not X, it's Y", none of
   the banned stock words in `docs/BUILDER_TRACK.md`, no claims of ranking.
   The owner posts; agents never post or send.
7. **Ship** after the owner's go-ahead. IndexNow runs in the deploy.
8. **Log** the row below: date, page, target query, the query's position and
   impressions before (from the map), the hub page.

## Cadence

| Rhythm | What | Who |
| :--- | :--- | :--- |
| Weekly | 2 pages from the keyword map (1 when the owner is busy) | Agent drafts, owner reviews |
| Weekly | Distribution packs for that week's pages; 3 LinkedIn, 4 X posts | Agent drafts, owner posts |
| Every 2 weeks | Newsletter; one Stack, tool or Shelf update | Agent drafts, owner sends |
| Monthly | One flagship piece built on an example the owner supplies | Owner supplies, agent builds |
| Monthly | Review (below) | Agent prepares, owner decides |

## Monthly review (first week of each month)

From Search Console, last 28 days against the 28 before:

- Total impressions against the checkpoint table.
- Every query at positions 8 to 30 with 10+ impressions: is it in the map?
  Add it if it matches the intent.
- Pages that slipped more than 3 positions: one change per page, logged with
  its date; wait a month before changing it again.
- Rows logged `live` for 4+ weeks: record their position now in the log.
- GA4: visits from chatgpt.com, perplexity.ai, copilot.microsoft.com and
  bing.com/chat (AI answers); clicks from linkedin.com and x.com.

## Keyword map

Impressions and positions: Search Console, 3 months to 2026-10-14.
`open` means not started. Tier 3 has no data yet: volume is unverified, and
each row is checked against Search Console 6 weeks after its page ships.

### Tier 1: already showing at positions 8 to 30 (fastest wins)

| # | Target query | Seen as | Impr. | Pos. | Page | Action | Status |
| :- | :--- | :--- | -: | -: | :--- | :--- | :--- |
| 1 | what is bounded autonomy | "bounded autonomy", "bounded autonomy definition", "bounded ai" | 249 | 8.2–9.0 | new: `/systems/what-is-bounded-autonomy/` | Definition page; hub is HITL page | open |
| 2 | HITL vs HOTL vs HOOTL | "hitl hotl hootl", "hitl/hotl", "hitl gate", "human-in-the-loop laws" | 21 | 9–22 | `/systems/human-in-the-loop-is-a-system-design-choice/` | Put the three terms in title and first lines | open |
| 3 | inference vs fine-tuning | "inference vs fine tuning", "fine tuning vs inference", "training vs fine tuning" | 22 | 7–10 | `/systems/training-vs-inference/` | Title and short answer name all three | open |
| 4 | ollama launch | "ollama launch droid", "ollama launch", "ollama launch codex", "ollama launcher" | 56 | 8–18 | `/shelf/local-experiments/ollama-launch-integrations/` | Lead with the command and what it does; dated | open |
| 5 | obsidian scratchpad | "obsidian scratchpad" | 53 | 8.8 | `/shelf/notes/obsidian-scratchpad/` | Answer first; a setup the reader can copy | open |
| 6 | brief.md format | "brief md format" | 12 | 22.1 | `/tools/notes-to-brief/` | Explain the format on the tool page; link a template | open |
| 7 | what is AEO and GEO | "what is aeo and geo in publishing", "docseo" | 13 | 12–16 | `/systems/seo-aeo-geo-in-plain-terms/` | Name AEO and GEO in title and first lines | open |
| 8 | opencode with a local model | "opencode local model", "ollama opencode", "opencode ollama provider" | 7 | 2–8 | `/shelf/tools/ollama/` | Section on running OpenCode against Ollama; dated | open |

### Tier 2: showing at positions 30 to 80 (intent mismatch; a direct answer can climb)

| # | Target query | Seen as | Impr. | Pos. | Page | Action | Status |
| :- | :--- | :--- | -: | -: | :--- | :--- | :--- |
| 9 | what are embeddings | "embedding dimension", "mean embedding", "embedding space", "embeddings explained", "vector embedding explained", "embedding math" | 25 | 28–70 | new: `/systems/what-are-embeddings/` | Vectors, dimensions, similarity; one drawn scene | open |
| 10 | which Ollama models support tools | "which ollama models support tools", "ollama tools models", "ollama with tools", 8 more variants | 30 | 26–50 | new Shelf reference, dated | A dated list with how to check it yourself | open |
| 11 | structured outputs with JSON Schema | "structured outputs", "structured output", "structured output json schema", "qwen structured output" | 290 | 61–77 | `/systems/structured-output-and-why-it-matters/` plus `/shelf/notes/structured-output-translation-playbook/` | A JSON Schema section with a worked example; local models (Qwen via Ollama) | open |
| 12 | what is prompting | "prompting", "what is prompting", "prompting definition", "promting" | 115 | 39–41 | `/systems/prompting-is-not-the-skill-you-think-it-is/` | A plain definition in the first lines, then the article's point | open |
| 13 | what is a context window | "context window", "all llms have a context window" | 6 | 9–37 | `/systems/context-windows-as-working-memory/` | Definition first | open |

### Tier 3: new terms close to the site's intent (no data yet)

| # | Target query | Why it fits | Page | Status |
| :- | :--- | :--- | :--- | :--- |
| 14 | prompt injection explained | Tool use, MCP and governed execution already explain the boundary it crosses | new Systems page | open |
| 15 | least privilege for AI agents | The permission question DAX and the MCP pages are about | new Systems page | open |
| 16 | MCP vs function calling | Comparison pattern that made the skills page rank; MCP page is the hub | new Systems page | open |
| 17 | AGENTS.md vs CLAUDE.md | The agent-instructions page explains these files; a direct comparison is missing | new Systems page or a section | open |
| 18 | context engineering vs prompt engineering | Bridges the prompting and context window pages | new Systems page | open |
| 19 | RAG vs fine-tuning | Joins the RAG and training pages | new Systems page | open |
| 20 | AI agent audit trail | Observability and DAX's ledger | new Systems page | open |
| 21 | sandboxing AI coding agents | DAX workers, Verb, PaneTera all draw this line | new Systems page | open |
| 22 | human on the loop meaning | Narrower than row 2; check after row 2 ships, it may not need its own page | decide after #2 | open |
| 23 | signs of AI-generated writing | LanguageOps' pattern registry, the free checker | new Systems page; links the tool | open |
| 24 | what is an LLM eval | "What counts as good" page is the hub | new Systems page or retitle | open |
| 25 | local LLM tool calling | Joins row 10 and the tool-use page | after #10 | open |

Rules for adding rows: the query matches the intent above; a page here can
answer it better than what ranks; it joins a cluster that already exists.
Never chase a query only because it has volume.

## Never

- Claim a ranking, a citation or traffic as an outcome in site copy.
- Write a page for an off-intent query, stuff keywords, or publish two pages
  for one question.
- Buy links, swap links, or post the same link across communities. Reddit
  and Hacker News only where the page answers the thread, by the owner.
- Invent experience or examples presented as real. Illustrative stays
  illustrative.
- Post, send or publish anything on the owner's behalf.

## Log

| Date | Row | Page | Target query | Before (impr., pos.) | Hub | Status |
| :--- | :- | :--- | :--- | :--- | :--- | :--- |
