# Archive Disposition Ledger

**Status**: Pass 1 · candidate analysis · 2026-09-13. Not a migration plan and not a rewrite queue. Human decisions recorded: 59 pages, in 60 log rows (see Recorded decisions and rules). **Archive disposition is complete: all 59 Systems pages have a recorded human decision.** Integrity baseline: 46 pages on hold, closed for disposition review. Clusters closed: C5 on 2026-09-18, and C1, C4, C3, C7, C2, C11, C10, C9, C6, C8, C12 and C13 on 2026-09-19. All 13 clusters closed; all 59 Systems pages reviewed.
**Governed by**: [PMP_CONTENT_DOCTRINE.md](PMP_CONTENT_DOCTRINE.md), section 7.
**Scope**: All 59 articles in `src/content/systems/`, each read in full.

> **Candidate disposition is analysis. Human decision is authority.**

A "Human decision" cell is filled only when Shailesh has decided. Forty-two are filled as of 2026-09-19, plus three dispositions that follow arithmetically from the C5 closure and are marked as such. No article, redirect or renderer has been changed.

---

## How to read this ledger

### Method

1. Every Systems article was read in full.
2. Pages were grouped by the reader question each one actually answers, not by title or tag.
3. Each cluster was read side by side before any candidate disposition was written, so overlap is judged against neighbours rather than in isolation.
4. Audit colour (Green, Amber, Red) was not used as a quality signal. All 58 Amber flags in [EDITORIAL_AUDIT.md](EDITORIAL_AUDIT.md) share one cause, the legacy Act I-III template.
5. Article length, metadata volume and link count were not treated as merit.

### Field values

| Field | Values |
| :--- | :--- |
| Basis | built · inspected · observed · synthesis · unclear (a claim of work that the page does not show) |
| Distinct | yes · partial · no |
| Density | dense · adequate · padded |
| Freshness | durable · needs review · dated |
| Inbound | `content / code`. Content counts other files in `src/content` that link to the page. Code counts files in `src/app`, `src/components`, `src/lib` and `src/data`. |
| Candidate | keep-rewrite · keep-strip · merge · reduce-to-note · retire · attest-or-reframe |
| Redirect | yes · no |
| Integrity hold | YES (codes) · blank. YES means no rewrite, merge, promotion or migration until the held claim is resolved. W = claim of work, measurement or implementation (Pass 1). P = material prevalence or comparative claim (Pass 2). S = material strong claim from the semantic coverage pass. C = material correctness issue from review decisions. |
| Human decision | blank until decided · KEEP-REWRITE · KEEP-STRIP · MERGE · REDUCE-TO-NOTE · RETIRE · ATTEST-OR-REFRAME · HOLD (decision deferred, with reason) |

**How inbound counts should be read.** The same pasted sentence ("For related systems context, see Systems 001: Foundations and From Prompt to Production") appears in 15 content files. It inflates the counts for `systems-001-foundations` and `from-prompt-to-production`, so those two pages cost less to remove than their numbers suggest.

**Where rationale lives.** Each cluster table carries the structured fields. The rationale and unresolved notes for every article sit in a keyed list directly below its table, so the table stays readable.

---

## Recorded decisions and rules

### Integrity hold

A page goes on integrity hold when the answer to one question is no: *would we knowingly allow this claim to remain published in its current form?*

That covers claims of work, measurement or implementation the page does not support, and unsupported claims about how often something happens.

- **The hold overrides disposition.** No rewrite, merge, promotion or migration until each held claim is sourced, attested, corrected or removed.
- **A hold is not a verdict on the article.** The claim can be resolved as part of the rewrite. Until it is resolved, the page does not advance.
- **Where holds are tracked.** In the Integrity hold column of each cluster table, in the claims table under [Claims of work or measurement the page does not show](#claims-of-work-or-measurement-the-page-does-not-show), and in the list under [Frequency claims under a synthesis basis](#frequency-claims-under-a-synthesis-basis).
- **Holds belong on the integrity record too.** Integrity and disposition stay separate concerns.

Forty-six of 59 pages are on hold (2026-09-13). The history of the count:

1. The prevalence pass produced a provisional 43.
2. [Integrity pass 2](#integrity-pass-2-material-claim-calibration) recalibrated it for materiality, to 42.
3. [Review decisions applied](#review-decisions-applied) settled the remaining cases, to 46.

The Integrity hold column shows why each page is held:

- **W** (9 pages): an unsupported claim of work, measurement or implementation, from Pass 1.
- **P** (27 pages): at least one material prevalence or comparative claim.
- **S** (22 pages): at least one material strong claim found by the semantic coverage pass.
- **C** (8 pages): a material correctness issue (a factual error, a contradiction, a central thesis presented as fact, or a nonexistent implementation), recorded from review decisions.

Many pages carry more than one code.

### Materiality test

Adopted 2026-09-13. An integrity hold blocks a page only when an unsupported claim materially affects what the reader is asked to believe or do.

A claim is material when changing or removing it would alter any of these:

- the title, thesis or a canonical definition
- the short answer or a key takeaway
- a reader decision or recommendation
- a quantitative or measured result
- a comparison of effectiveness or reliability
- a safety or legal interpretation
- a causal claim central to the argument
- the evidence or provenance posture
- a claimed implementation or capability

Two outcomes:

- **Material blocker.** The page stays on hold until the claim is sourced, scoped, attested or rewritten.
- **Local claim repair.** Incidental unsupported language. The exact sentence is recorded and fixed during rewrite, strip or merge. It does not block the page.

What gets judged is the unsupported part of the claim. If replacing "usually" with "can" leaves the argument and the reader's decision intact, the frequency is not material.

Specific policies:

- Titles are claims.
- Legal and compliance claims need scoped, inspectable support.
- Benchmark evidence supports only what the benchmark measured.
- An unattested personal observation blocks only when the article relies on it.
- Conditional heuristics and superlatives are judged by the same test as prevalence claims. Author judgment, framed as judgment, does not block.

**Order of work for a held page:** resolve the claim, the hold clears, then the candidate disposition proceeds.

### Material correctness rule

A page receives an integrity hold when a factual error, a contradiction, an unsupported central thesis, or a capability claim materially changes the reader's understanding, decision, or trust in the page. Incidental errors remain repair items and do not block disposition.

- **FAQ content is reader-visible.** A material contradiction between FAQ and body holds the page. A peripheral one is a local repair.
- **Central theses.** A central thesis presented as established fact holds the page when the piece does not identify itself as synthesis. It can clear in any of four ways:
  - declare synthesis
  - write the judgment as judgment
  - narrow the claim
  - source it, where it is genuinely factual
- **Existence claims.** Commands, tools or features described as existing must exist, or be labelled as proposed or illustrative. Do not build a tool to rescue an article.
- **Plausibility is not support.** A claim being plausible or well known does not replace support when a material claim rests on outside evidence.

### Evidence independence

Order of preference for support:

1. independent public evidence
2. inspectable affiliated evidence, with disclosure
3. no support, which is not acceptable for a material claim

Affiliated sources can be cited when they are public, inspectable and disclosed. They never count as independent corroboration. Where equivalent independent evidence exists, use it instead. The Newtuple citations in `architecture-of-in-chat-ai-apps`, `why-ocr-quietly-breaks-document-ai` and `llm-ops-without-the-buzzwords` are treated as affiliated evidence.

### Comparison tables

Design reasoning in a comparison table can stay as synthesis. A cell becomes an integrity concern when it claims, without basis, that something is:

- more accurate, safer or more reliable
- cheaper or faster
- reduces failures
- best or worst
- required by law

Claims such as "more control" or "easier to inspect" can often be defended from the mechanism itself, but should still be worded carefully.

### Integrity baseline status

Closed for disposition review on 2026-09-13. No further archive-wide integrity search is planned. Issues found during rewrites are recorded and resolved as they appear. Integrity review is a safety net, not proof that the archive is error-free.

### Unsupported prevalence rule

Claims about how often something happens require inspectable support. This covers words such as most, often, usually, generally, commonly, rarely, typically and majority, and any equivalent comparative-frequency language.

If the support is missing, the page goes on integrity hold until the claim is one of:

- sourced
- scoped to an attested observation
- rewritten without the frequency assertion

**Titles are claims too.** A claim in a title, description, FAQ or other headline copy is not exempt because it sits in metadata or display text.

Resolutions can be small. "Most agent failures happen because..." can become "Agent failures can emerge when...". A title that asserts prevalence should be replaced with one that states the page's actual argument.

**Scan coverage.** The [Prevalence integrity pass](#prevalence-integrity-pass) reviewed every match of nine prevalence words across all 59 pages. `ai-agents-vs-ai-workflows` went on hold just before the pass; its human decision KEEP-REWRITE stands, and the hold covers its current wording. Equivalent phrasing without those words, such as "many teams" or "almost always", was not scanned. Integrity pass 2 then looked for material strong claims by type rather than by keyword.

### Editorial rules adopted during review

1. **A concept gets its own page when it answers a different reader question, not merely because it has a different technical label.**
2. **One concept gets one canonical definition. Other pages link to it instead of quietly redefining it.**

Both rules were recorded from review on 2026-09-13. They are candidates for the next doctrine version, not yet part of it.

### Decision log

One row per recorded decision, dated to when the decision was made rather than when it was written down. Every reviewed page in a closed cluster appears here. Row count exceeds the number of decided pages because `skills-vs-prompts-vs-agents` carries a 2026-09-13 HOLD that a later decision supersedes; the superseded row is kept for audit rather than deleted. Rows marked **historical reconciliation** were resolved in their cluster table at closure and mirrored here afterwards; their dates are the closure dates, not the insertion dates.

| Date | Article | Human decision | Canonical job | Boundary |
| :--- | :--- | :--- | :--- | :--- |
| 2026-09-13 | `tool-use-when-language-triggers-actions` | KEEP-REWRITE | Explain how model output crosses into software action | Owns the action boundary: the model produces a request, the program checks it, the program executes or refuses, and the result returns. Does not define "agent". |
| 2026-09-13 | `ai-agents-vs-ai-workflows` | KEEP-REWRITE | Explain who chooses the next step, and how much freedom the running system allows | Owns the choice boundary: fixed next step versus model-selected next step. Does not re-explain tool calling. Holds the site's canonical definition of agent-like behaviour. |
| 2026-09-13 | `skills-vs-prompts-vs-agents` | HOLD | A map of the terms, linking out to canonical explanations | May not establish its own definition of agent. Pending review of cluster C3. |
| 2026-09-18 | `from-agent-intent-to-governed-execution` | KEEP-REWRITE | The evidence-led practitioner page for governed execution | Keeps this URL. The reader-facing title changes to plainer language during the rewrite; the slug does not. |
| 2026-09-18 | `policy-governed-mcp-runtimes-for-secure-tool-execution` | KEEP-REWRITE | Stays a separate page, reframed around hostile input | Owns what happens when tool input or tool output is adversarial. Drops the empirical-verification framing it cannot support. |
| 2026-09-18 | `runtime-over-model-why-orchestration-is-the-product` | REDUCE-TO-NOTE | One authored note carrying the inspectability argument | Its "Why the loop outlives the model" material survives as the note. It stops being a full page. |
| 2026-09-18 | `engineering-agentic-systems-for-reliability` | MERGE | Reliability material becomes part of the C5 canonical page | **Historical reconciliation from C5 closure, not a new decision.** Mirrored into the dated log on 2026-09-19 from the Human decision cell already recorded in the C5 table ("MERGE (follows from C5 closure)"); the disposition itself dates from the C5 closure of 2026-09-18 and is unchanged. "Debugging becomes storytelling instead of engineering" and "verification: completion must be evidenced, not merely stated" carry across. It is linked from three code files, and those links must change in the same commit as the redirect. The homepage Methodology card summarises it with claims the article does not make. Redirect to `from-agent-intent-to-governed-execution`. |
| 2026-09-18 | `engineering-bounded-autonomy` | RETIRE | Nothing survives as a page | **Historical reconciliation from C5 closure, not a new decision.** Mirrored into the dated log on 2026-09-19 from the Human decision cell already recorded in the C5 table ("RETIRE (follows from C5 closure)"); the disposition itself dates from the C5 closure of 2026-09-18 and is unchanged. Generic, with no distinct idea beyond the canonical page, restating "boundaries must be enforced, not suggested" at length. The `engineering-bounded-autonomy-deck` shelf item needs its link repointed. Redirect to `from-agent-intent-to-governed-execution`. |
| 2026-09-18 | `decision-making-under-uncertainty-in-ai-runtimes` | MERGE | The uncertainty and decision-mode material becomes one section of the C5 canonical page | **Historical reconciliation from C5 closure, not a new decision.** Mirrored into the dated log on 2026-09-19 from the Human decision cell already recorded in the C5 table ("MERGE (follows from C5 closure)"); the disposition itself dates from the C5 closure of 2026-09-18 and is unchanged. The allow / ask / deny / defer modes weighed against reversibility, the three kinds of uncertainty, and "log the reason, not only the outcome" carry across. The coined "PE-R loop" name is dropped, the "most AI failures are decision failures" frequency claim does not carry, and the retrofitted I-7 mapping is removed. Redirect to `from-agent-intent-to-governed-execution`. |
| 2026-09-19 | `what-an-ai-model-actually-is` | KEEP-REWRITE | The canonical foundation: what a model is, what happens when it generates, and why plausible is not true | Owns the definition of model, next-token prediction, and the probability separation. Links out for tokens, for the training and fine-tuning decision, and for context windows. |
| 2026-09-19 | `probabilities-not-truth` | MERGE | Its reader question survives as a section of the canonical page | "Why can AI sound confident when it is wrong?" becomes a strong section, not a page. Its Paris and Mars contrast and its confidence-as-style idea carry across. |
| 2026-09-19 | `what-llms-are-optimized-for` | MERGE | One corrective survives inside the canonical page | Next-token prediction can produce sophisticated capability, so "it predicts tokens" does not mean trivial autocomplete. Must be qualified around pretraining, because post-training explains much of modern chat behaviour. |
| 2026-09-19 | `training-vs-inference` | KEEP-REWRITE | The decision page: what changes during training, fine-tuning and use | Teaches the choice rather than decreeing an answer. Owns parameters versus context. Carries the heaviest integrity load in C1. |
| 2026-09-19 | `a-simple-tokenizer` | KEEP-REWRITE | The mechanism page: what the model actually receives | Owns token, tokenization, subword and encoding for the whole archive. Must show real tokenizer output rather than invented diagrams. |
| 2026-09-19 | `the-logic-void` | RETIRE | Nothing survives as a page | The coined framework has no demonstrated use and its substance duplicates the confidence and reliability material. The malformed-question observation survives as two sentences in the canonical page. Redirect to `what-an-ai-model-actually-is`. The `logic-void-deck` shelf item needs its link repointed, decided separately. |
| 2026-09-19 | `prompting-is-not-the-skill-you-think-it-is` | KEEP-REWRITE | Canonical language side: how to shape an instruction | Owns task, constraints, examples, requested output shape, diagnosing output failures, iterative refinement, and versioning and testing prompts. Must not redefine next-token prediction (C1), system prompts (C3) or tool authorization (C5). |
| 2026-09-19 | `structured-output-and-why-it-matters` | KEEP-REWRITE | Canonical software side: what software can check | Owns structured output, schema, parser versus validator, syntactic validity versus semantic correctness, generate/parse/validate/repair, schema versioning, validation failures as telemetry, and feeding exact validation errors back into repair loops. May state that valid structure does not imply permission or successful execution, but must not become the canonical authorization page. |
| 2026-09-19 | `intent-architecture-as-a-language-contract` | MERGE | Its three contract layers become the frame of the canonical software page | Meaning, structure and execution layers survive as the conceptual frame around the parse, validate, check, authorise sequence. The page never gave a concrete example, so nothing else carries across. Redirect to `structured-output-and-why-it-matters`. |
| 2026-09-19 | `resilient-integration-contracts-for-structured-outputs` | MERGE | Two ideas survive inside the canonical software page | Validation failure rate as operational telemetry, and self-repair mechanics that serialise exact validation errors into a correction prompt. The 90 percent claim and "our team has tested" are removed rather than rescued. Redirect to `structured-output-and-why-it-matters`. |
| 2026-09-19 | `natural-language-is-the-new-api` | RETIRE | Nothing survives as a page | Held for a material factual error, vector search presented as the mechanism that maps requests to actions. One defensible idea survives: natural language can be the human-facing interface, and structured contracts still need to exist underneath it. The prompt-injection row goes to C5 `policy-governed-mcp-runtimes-for-secure-tool-execution`. Redirect to `prompting-is-not-the-skill-you-think-it-is`. |
| 2026-09-19 | `skills-vs-prompts-vs-agents` | KEEP-REWRITE | Canonical term map | Supersedes the HOLD of 2026-09-13. Maps terms with one concise distinction each and links to canonical pages. Does not independently redefine prompt, workflow, agent, runtime or tool, and must adopt C5 canonical agent and runtime distinction. |
| 2026-09-19 | `what-a-system-prompt-actually-is` | KEEP-STRIP | Owns resident, system-level instruction | Owns range versus task-specific invocation, the hidden contradiction and review problem, and context footprint. Must state explicitly that system prompts influence model behaviour and do not enforce runtime policy. Needs inbound links from the term map and the skill playbook. |
| 2026-09-19 | `designing-reusable-ai-skills` | KEEP-REWRITE | Canonical skill playbook | Owns PMP working definition of a skill, when a repeated task deserves promotion, inputs and outputs, constraints, tool scope, escalation, the split-or-merge rule, skill-specific tests, behaviour-based versioning and rollback conditions. General evaluation methodology stays with C7. |
| 2026-09-19 | `what-a-skill-is-in-ai-systems` | MERGE | Its definition and promotion list move into the skill playbook | Merge target changed from the term map to `designing-reusable-ai-skills`. A one-line-per-term map cannot absorb a thousand-word definition, which the 2026-09-13 HOLD had already specified. The tools, actions and skills synonym claim is removed rather than carried. Redirect to `designing-reusable-ai-skills`. |
| 2026-09-19 | `skill-evaluation-and-versioning` | MERGE | Becomes the evaluation half of the skill playbook | Four test types, behaviour-based versioning and rollback conditions carry across. Redirect to `designing-reusable-ai-skills`. |
| 2026-09-19 | `evaluation-is-a-human-problem` | KEEP-REWRITE | Canonical evaluation and judgment page | Owns eval anatomy, expected property or outcome, deterministic assertions, human judgment, heuristics, model-based graders, regression sets, the failure to eval feedback loop, and metric-to-decision discipline. Skill-specific testing stays with C3. |
| 2026-09-19 | `observability-first-ai-systems` | KEEP-REWRITE | Canonical observability and evidence page | Owns events, traces, tool-call records, failures, timing, policy decisions as recorded evidence, derived metrics, monitoring, drift signals, replay as state reconstruction, and audit as a separate evidence concept. |
| 2026-09-19 | `evaluating-non-deterministic-outputs-with-rubric-based-pipelines` | MERGE | Rubric mechanics move into the evaluation page | The four quality dimensions, the constraints-then-alignment ordering and the evaluator-rationale requirement carry across. The LLM-as-a-judge accuracy rating is held and does not carry. Its false proofPoint, claiming it was built using validation rules from the retrieval and grounding evaluation kit, is removed; that kit defines no validation rules. Redirect to `evaluation-is-a-human-problem`. |
| 2026-09-19 | `evaluation-as-a-runtime-discipline` | MERGE | Its judgment argument joins the evaluation page; its record shape joins observability | Merge target changed from observability to `evaluation-is-a-human-problem`, because the page judges behaviour rather than defining what to record. Its decision-quality layer belongs to C5 and its execution-quality layer to C4, so neither carries across. The seam sentence, observability tells you what happened and evaluation tells you whether it should count as good, is preserved on both canonical pages. |
| 2026-09-19 | `llm-ops-without-the-buzzwords` | MERGE | Operations-over-time material joins observability | The DevOps versus LLM-Ops comparison and the deterministic, model-graded and human eval taxonomy carry to the evaluation page. The system-prompt-as-governance framing is removed, because it contradicts the closed C3 rule. Held claims about evaluation replacing unit tests and about requiring an evaluation suite do not carry. Redirect to `observability-first-ai-systems`. |
| 2026-09-19 | `drift-decay-and-silent-failure` | MERGE | Silent failure survives as a section of observability | Silent failure, and the distinction between loud and quiet degradation, carry across. The classical machine-learning framing of retraining strategies and held-out test sets does not, because it is not actionable for readers on hosted models. "Log everything" is retired. Redirect to `observability-first-ai-systems`. |
| 2026-09-19 | `retrieval-augmented-generation-in-plain-terms` | KEEP-REWRITE | Canonical retrieval page | Absorbs embeddings, similarity-is-not-correctness, freshness and ownership from knowledge management, chunking, and the retrieval failure stages. Must distinguish retrieval from context assembly, and must not teach vector search as the retrieval mechanism. |
| 2026-09-19 | `context-windows-as-working-memory` | KEEP-REWRITE | Canonical context page, with the working-memory definition retired | URL stays for now. A context window is the bounded information available to the model for the current run; persistent memory is a separate application-level mechanism. The tiering heuristic survives as PMP guidance, not universal architecture. |
| 2026-09-19 | `why-ocr-quietly-breaks-document-ai` | KEEP-STRIP | Upstream document-ingestion page | Distinct because its failure occurs before retrieval exists. Needs the false Local Experiments evidence pointer removed and its benchmark-derived frequency claims scoped to the benchmark. |
| 2026-09-19 | `semantic-caching-for-probabilistic-systems` | REDUCE-TO-NOTE | One mechanism survives as a note, URL kept | Keeps: a similar query is not a safely reusable answer; knowledge changes require invalidation; cache poisoning risk. Strips every threshold and prevalence figure. Must distinguish semantic caching from provider prompt or context caching. |
| 2026-09-19 | `context-window-management-and-retrieval-pruning-strategies` | MERGE | Its ranking material becomes part of the context page | The two-stage retrieve-then-rerank pipeline is the only explanation of ranking anywhere in the archive and must survive the merge. Numbers do not: the 70-90 percent reduction, the 0.70 threshold, the 10/20/50/20 split and the linear time-to-first-token claim are all held. Redirect to `context-windows-as-working-memory`. |
| 2026-09-19 | `embeddings-explained-like-youre-human` | MERGE | Similarity-is-not-correctness moves into the retrieval page | Merge target changed from keep-rewrite to `retrieval-augmented-generation-in-plain-terms`. The page has zero inbound links, and its central correction is exactly the boundary the retrieval page is missing. Folding it in also stops the archive implying that vector similarity is the whole retrieval story. |
| 2026-09-19 | `knowledge-management-as-runtime-memory` | MERGE | Freshness and ownership move into the retrieval page | The four-layer failure column, the weekly review and "content grows faster than structure" carry across. The SEO, AEO and GEO paragraph does not; it is recorded as candidate material for the later C11 mission review, not as surviving content. Redirect to `retrieval-augmented-generation-in-plain-terms`. |
| 2026-09-19 | `seo-aeo-geo-in-plain-terms` | REDUCE-TO-NOTE | The one surviving C11 artifact, keeping its URL | Becomes a note answering "what does a publisher actually control in machine-mediated discovery?". Owns only inspectable publishing controls: crawl access, canonical URLs, sitemap coverage, robots policy, status codes, and machine-readable publishing structure. Must not redefine retrieval, ranking, embeddings, chunking, grounding or context assembly. |
| 2026-09-19 | `seo-aeo-geo-how-things-fit-together` | MERGE | Crawl and publishing mechanics only | Layer 1 crawl material is the only concretely checkable content in the cluster and carries into the note. The DefinedTerm proofPoint is false and is removed. Redirect to `seo-aeo-geo-in-plain-terms`. |
| 2026-09-19 | `aeo-and-geo-as-a-retrieval-design-problem` | RETIRE | Nothing survives as a page | Held on four material blockers, including a description of answer-engine internals that the whole argument rests on with no source. Its chunking and entity material is now C2-owned. Its diagnostic checklist may survive only reframed as questions about your own writing rather than about engine behaviour. This page is also the origin of the retrieval-ready page pattern recorded under Archive-level flags. Redirect to the note. |
| 2026-09-19 | `winning-ai-search-as-a-discoverability-system` | RETIRE | Nothing survives as a page | A fourth restatement of the same pipeline, with one inbound link and an unsupported engine-behaviour claim used to justify page-design advice. Redirect to the note. |
| 2026-09-19 | `entity-glossary-for-ai-discoverability` | MOVE-TO-SHELF | Becomes a reference artifact, not an essay | Before migration, remove definitions already owned by canonical C1 to C7 pages. Drop the unsupported claim that glossary stability improves retrieval or citation. The anchor scheme is not evidence of usefulness: twelve anchors are defined and zero pages link to any of them. If little remains after pruning, retire rather than preserve a mostly empty glossary. |
| 2026-09-19 | `managing-state-and-memory-handoffs-in-multi-agent-workflows` | MERGE | State and handoff material becomes a section of the C9 canonical page | Merge target changed from keep-rewrite to `agent-instructions-and-handoff-as-an-operating-system`. That C9 page already names a handoff protocol as a component of its architecture and holds 12 inbound links against this page's zero. The three state topologies, the handoff-contract idea, static assertion before launching the receiver, and loop prevention carry across. "Memory" does not: the mechanism described is workflow state and a keyed store. The skill-template proofPoint is unsupported and is removed. |
| 2026-09-19 | `agentic-orchestration-coordination` | MERGE | One idea survives inside the C9 canonical page | The four compounding failure modes (context loss, conflicting outputs, blocking dependencies, cascading failure) carry across. Nothing else does. Its observability material belongs to C7, its bounded-autonomy and runtime material to C5. "This doc is backed by the DAX Agentic Orchestration shared resource" is not evidence; a deck listing is not a demonstration. Redirect to `agent-instructions-and-handoff-as-an-operating-system`. |
| 2026-09-19 | `agent-instructions-and-handoff-as-an-operating-system` | KEEP-REWRITE | The canonical C9 page: how AI-assisted work stays repeatable across steps, sessions and hands | Owns repeatability, instruction contract, current state, handoff and checks. Survives on substance, not on the "operating system" metaphor, which is retired during rewrite. Replacement title is not locked here. Boundary: **repeatability means preserving the process, state, constraints and checks well enough that work continues coherently even when model outputs vary.** Repeatability does not mean identical model output. Instructions stay C3-owned, context and memory stay C2-owned, checks and observability stay C7-owned. |
| 2026-09-19 | `from-ad-hoc-prompts-to-repeatable-agent-workflows` | MERGE | Two things survive inside the canonical page | The before-and-after material, after correcting the stale "31 systems docs" count and removing the nonexistent `report:topics` and `report:gaps` gates. And the historical fact that the archive once added the same templated scaffolding this pruning now removes, kept visible rather than quietly dropped. Do not reproduce the old page template in the canonical rewrite. Redirect to `agent-instructions-and-handoff-as-an-operating-system`. |
| 2026-09-19 | `tech-stack-for-nlpg-driven-ai-assisted-sdlc` | REDUCE-TO-NOTE | One note carrying the instruction-specification mechanism, URL kept | Preserves the instruction spec (objective, constraints, acceptance criteria, risk category, approval gates, rollback), the risk-gate matrix, and the RBAC and Stripe examples. Removes the `nlpg` CLI surface, which does not exist, the staged plan and template-repo-as-product framing, and the unsupported operating metrics. **`NLPg` is retired as a PMP public acronym and taxonomy.** Do not choose between its two expansions; stop using the overloaded acronym and name the mechanism instead. |
| 2026-09-19 | `i-7-cognitive-loop` | REDUCE-TO-NOTE | One note carrying the five-minute operating loop, URL kept | Supersedes the attest-or-reframe candidate. I-7 is classified as **a PMP working method**, not a new standard, not a validated general framework, not a universal systems architecture. The five-minute run loop is what earns the note its place. The seven-stage framework claim is not supported by the archive. Do not collapse or redesign the stages during disposition; the stage-order and Norman-mapping inconsistency is resolved at rewrite. Remove the "new standard for Human-AI interaction" claim. |
| 2026-09-19 | `human-in-the-loop-is-a-system-design-choice` | KEEP-REWRITE | The canonical C6 page: whether a person can actually judge what the machine proposes | Owns the quality and placement of human judgment. Boundary: **C5 decides whether the machine may act. C6 decides whether a person can actually judge what the machine proposes.** Preserve **approval asks whether a human said yes; judgment asks whether they were in a position to say no.** A human being present is not enough; they need the information, authority and return path required to make a meaningful decision. Authorization, allow / ask / deny, approval gates as execution controls, escalation triggers and external action stay C5-owned. Logging and audit stay C7-owned. Structural validation stays C4-owned. |
| 2026-09-19 | `ai-website-publishing-with-human-in-the-loop-control` | MERGE | Survives only as worked-example material inside the canonical page | Supersedes the attest-or-reframe candidate. Not a second reader question: it is one worked example of judgment placement. Preserve the reject / request revision / approve path and the stop-point insight. Drop Flowright as the evidence path; it is private, unattested and not inspectable. Clear `featured: true` when the merge is implemented. Redirect to `human-in-the-loop-is-a-system-design-choice`. |
| 2026-09-19 | `from-prompt-to-production` | KEEP-REWRITE | The canonical C8 page: is this AI-assisted workflow ready to face its intended users? | Retitle later; do not lock a replacement title during disposition. Boundary: **C8 decides whether enough evidence and control exist to expose an AI-assisted workflow to its intended users.** Preserve **deployment means the software is running; readiness means there is enough evidence and control to justify exposing it to intended use.** C8 consumes but does not reteach validation (C4), execution controls (C5), human judgment (C6), evaluation and observability (C7), or continuity and handoff (C9). It owns the assembly judgment. |
| 2026-09-19 | `why-most-ai-projects-fail-after-the-demo-stage` | MERGE | The demo boundary survives as material inside the canonical page | The title frequency claim is unsupported and disappears with the merge; no variant of "most AI projects fail" carries across. Preserve the mechanism: **a demo shows that a system can succeed under chosen conditions; readiness asks what happens when those conditions stop being tidy.** The demo-illusion material may support that idea. Breakpoints are reassigned: integration debt and adoption stay C8, governance goes to C5, observability to C7. Redirect to `from-prompt-to-production`. |
| 2026-09-19 | `enterprise-ai-at-scale` | RETIRE | Nothing survives as a page | Its three scale tests are the sibling page's four tests minus observability. Do not migrate generic "enterprise" or "scale" language; any useful governance or observability material is already owned by C5 and C7. The page also collapses deployment into readiness, which the canonical page must not do. Its only proofPoint cites a Shelf deck, which is not evidence. Redirect to `from-prompt-to-production`. |
| 2026-09-19 | `ai-architecture-explained-how-modern-llm-applications-work` | KEEP-REWRITE | The canonical C12 assembly map: how already-settled mechanisms connect | Retitle later. It survives because **the detailed canonical pages explain individual mechanisms, and C12 explains where responsibility transfers between them and which mechanism to inspect when something goes wrong.** It must not freeze its current five layers as PMP vocabulary; C1 to C9 terminology remains authoritative. Prefer tracing one request through the system, naming at each boundary what enters, what is decided, what can fail, and which canonical mechanism owns that failure. |
| 2026-09-19 | `the-intelligence-assembly-model` | RETIRE | Nothing survives as a page | A relabelling of the canonical architecture page with a different five boxes, no direction of flow, zero surviving outbound links and a false proofPoint. Preserve only the seam-ownership insight: if responsibility at a boundary is unclear, teams can optimise their own component while the user experiences the failure between components. Do not preserve the IAM name or the five-box model. Redirect to `ai-architecture-explained-how-modern-llm-applications-work`. |
| 2026-09-19 | `systems-001-foundations` | REDUCE-TO-NOTE | A short systems-thinking note, URL kept | Eventual reader question: **what can systems thinking help me inspect in an AI system?** Preserve only material surviving rewrite scrutiny around boundaries, interfaces and constraints, feedback, drift, Goodhart's law, variety mismatch, and the practical audit questions. **Do not create a new named framework during disposition.** Remove general-history material, unrelated statistics, digital-twin material, broad documentation theory, and AI terminology already owned by closed clusters. All three of its proofPoints are false and none survive. Clear `featured: true` when the reduction is implemented. |
| 2026-09-19 | `mental-frameworks` | RETIRE | Nothing survives as a page | Generic cognition with no AI mechanism, zero inbound links and a false proofPoint. **Do not automatically redirect to the canonical architecture page**: a reader asking about mental frameworks is not asking about AI application architecture, so the reader intent is not equivalent. Leave the redirect destination unresolved for the later structural-cleanup pass, which may decide on no redirect or a genuinely equivalent destination. |
| 2026-09-19 | `architecture-of-in-chat-ai-apps` | KEEP-STRIP | Canonical owner of the interaction surface | The distinct C13 mechanism is the **interaction surface**. C4, C5, C6, C9 and C12 continue to own validation, execution, judgment, state and assembly respectively. This page may explain why a text reply and an interactive application surface afford different kinds of parallel state, user choice, bounded interaction and reusable UI components. **Do not expand into MCPUI or WebMCP during disposition**; recorded only that this is a suitable future conceptual home for host-mediated interface work. The page must not depend on the Newtuple example to survive. |
| 2026-09-19 | `cloud-architecture-comparison-2026` | RETIRE | Nothing survives as a Systems page | Redirect to the existing Shelf cloud experiments (`aws-llm-instance-baseline`, `azure-llm-vm-setup`, `gcp-llm-instance-baseline`), which are the author's own runs and the more honest artifacts. **Do not migrate its provider matrix, service names, pricing and discount posture, or dated 2026 comparisons into canonical Systems content.** The durable "choose by dominant constraint" thought is insufficient to justify a Systems page and must not reintroduce another layer taxonomy, which C12 has just closed. Analytics may inform redirect and discovery implementation, but not the disposition. |

The two beginner pages stay separate. The line that separates them:

> Tool use asks whether the model can request an action. Agent-like behaviour asks whether the model can decide which action or step should happen next.

---

## Summary

| Measure | Count |
| :--- | :--- |
| Systems pages reviewed | 59 |
| Reader-question clusters | 13 |
| Candidate: keep-rewrite | 21 |
| Candidate: keep-strip | 3 |
| Candidate: merge | 21 |
| Candidate: reduce-to-note | 4 |
| Candidate: retire | 7 |
| Candidate: attest-or-reframe | 3 |
| Human decisions recorded | 59 pages (60 log rows) |
| Pages on integrity hold | 46 |
| Prevalence matches reviewed | 247 |
| Material blockers | 118 (8 from Pass 1, 100 from Pass 2, 10 from review decisions) |
| Local claim repairs | 83 |

These counts describe candidate analysis only. They are not a target.

### Cluster index

| # | Reader question | Pages | Candidate survivors as full pages |
| :--- | :--- | :--- | :--- |
| C1 | What is a model, and why is it confidently wrong? | 6 | 3 (closed 2026-09-19) |
| C2 | How does a model get the right information in front of it? | 7 | 3, plus 1 note (closed 2026-09-19) |
| C3 | Prompt, system prompt, skill, workflow, agent: which do I need? | 5 | 3 (closed 2026-09-19) |
| C4 | How do I turn words into something software can safely use? | 5 | 2 (closed 2026-09-19) |
| C5 | How do I let AI take actions without losing control? | 8 | 4, plus 1 note (closed 2026-09-18) |
| C6 | Where should a person sit in an AI system? | 2 | 1 (closed 2026-09-19) |
| C7 | How do I know my AI system still works after launch? | 6 | 2 (closed 2026-09-19) |
| C8 | How do I get from a promising demo to real use? | 3 | 1 (closed 2026-09-19) |
| C9 | How do I get consistent results when AI does ongoing work? | 4 | 1, plus 2 notes (closed 2026-09-19) |
| C10 | How do several agents hand work to each other? | 2 | 0 canonical, merged into C9 (closed 2026-09-19) |
| C11 | How do search and AI answer engines find and cite my work? | 5 | 0 canonical, plus 1 note and 1 shelf reference (closed 2026-09-19) |
| C12 | How do the parts of an AI application fit together? | 4 | 1, plus 1 note (closed 2026-09-19) |
| C13 | Standalone pages outside the main clusters | 2 | 1 (closed 2026-09-19) |

### Final disposition shape

**Archive disposition complete, 2026-09-19.** All 13 clusters closed. All 59 Systems pages carry a recorded human decision.

| Outcome | Count |
| :--- | :--- |
| Systems pages reviewed | **59** |
| Canonical Systems pages | **22** |
| Notes, URL retained | **6** |
| Shelf reference | **1** |
| Merged or retired | **30** |

That is **about a 63 percent reduction in canonical Systems pages across the original 59-page archive**.

**Redirects will be implemented where a semantically appropriate destination exists.** Not every destination is settled: `mental-frameworks` was deliberately left unresolved in C12, because redirecting a reader asking about mental frameworks to an AI application architecture page would be semantically misleading. Do not record that all merged or retired URLs already resolve by redirect.

This is a disposition record, not a migration plan. The consolidation pass that follows turns it into one.

---

## Archive-level flags

### Repetition the archive does not see

- **"The model proposes, the runtime decides."** Stated in at least eight Systems pages in near-identical words.
- **Three different "seven stages" for the same loop.** `from-agent-intent-to-governed-execution` has one set in its body and a different set in its FAQ. `policy-governed-mcp-runtimes-for-secure-tool-execution` has a third.
- **Three different "five layers."**
  - `ai-architecture-explained-how-modern-llm-applications-work` uses model, retrieval, orchestration, interface, governance.
  - `the-intelligence-assembly-model` uses model, memory, retrieval, execution, control.
  - `cloud-architecture-comparison-2026` uses authority, state, intelligence, orchestration, experience.
- **Competing production tests.** `enterprise-ai-at-scale` lists three. `why-most-ai-projects-fail-after-the-demo-stage` lists four, overlapping.
- **The same illustration twice.** The "first person on Mars / John Boone" example appears in both `what-an-ai-model-actually-is` and `probabilities-not-truth`.
- **Template boilerplate.**
  - The highlight line "clarity at boundaries reduces downstream errors" appears in 18 articles.
  - A "Design note" callout appears in 43.
  - The pasted Systems 001 / From Prompt to Production sentence appears in 15 content files.
  - Retrofitted sentences mapping a section to an I-7 stage appear in 6 articles.

### The retrieval-ready page pattern

*Recorded 2026-09-19 during the C11 closure.* `aeo-and-geo-as-a-retrieval-design-problem` prescribes a "retrieval-ready page pattern": a definition block, answer blocks, a comparison table, and a closing section titled "what this changes in practice". That is the clearest surviving statement of the house template this pruning exercise has been dismantling, and it is the shape almost every page in the archive wears. The Content Doctrine supersedes it. Do not migrate this structure into surviving content in any cluster.

### Contradictions between or inside pages

- **Agent.**
  - `ai-agents-vs-ai-workflows` defines it as the model choosing the next step.
  - `skills-vs-prompts-vs-agents` defines it as the runtime actor executing workflows.
  - *Resolved 2026-09-13:* the canonical definition lives in `ai-agents-vs-ai-workflows`, and the term map links to it.
- **NLPg.**
  - `tech-stack-for-nlpg-driven-ai-assisted-sdlc` expands it as "Natural Language Process Governance".
  - `natural-language-is-the-new-api` defines it as "Natural Language Programming".
  - *Deferred 2026-09-19:* not resolved inside C4, and retiring `natural-language-is-the-new-api` does not settle it. Site chrome currently uses "Natural Language Programming" in `src/app/docs/page.tsx`, `src/app/systems/page.tsx` and the docs slug title. Recorded as a separate terminology decision for later.
- **Seven stages.** In `from-agent-intent-to-governed-execution` the FAQ lists different stages from the body.
- **Four constraints.** In `runtime-over-model-why-orchestration-is-the-product` the FAQ lists permission, validation, scope and rollback, while the body lists lifecycle, permission, verification and trace.
- **Step count.**
  - `from-prompt-to-production`'s description and FAQ say seven steps.
  - Its body and proofPoint name six.
- **Token count.** `a-simple-tokenizer` gives "Strawberry" a single token ID in the body. Its FAQ says "3 tokens (straw-berry)".
- **Old and new advice together.** `structured-output-and-why-it-matters` pairs a new, careful boundary ("valid JSON does not establish the value is true") with old takeaways that contradict it ("structured output is reliable", "the most reliable method").

### Claims of work or measurement the page does not show

Every page in this table is on **integrity hold** (see Recorded decisions and rules).

| Page | Claim | What is missing |
| :--- | :--- | :--- |
| `resilient-integration-contracts-for-structured-outputs` | "reduce API translation errors by 90% in our local sandbox"; "Our team has tested these contracts extensively" | No data, no artifact, no attestation |
| `semantic-caching-for-probabilistic-systems` | "up to 40% of user queries represent semantically duplicate intents" | No source |
| `context-window-management-and-retrieval-pruning-strategies` | proofPoint "Tested on local models using the context window stress test dataset"; "70-90%" reduction | No results shown |
| `policy-governed-mcp-runtimes-for-secure-tool-execution` | "Empirically verified in our Soothsayer MCP kernel sandbox" for container sandboxing | The Soothsayer note does not mention containers, Docker or sandboxing |
| `why-ocr-quietly-breaks-document-ai` | Intro points to "hands-on testing runs and benchmarks" in Local Experiments | No OCR experiment exists in `shelf/local-experiments` |
| `entity-glossary-for-ai-discoverability`, `seo-aeo-geo-how-things-fit-together` | DefinedTerm schema mapped to glossary anchors | `DefinedTerm` appears only in `scripts/report-main-gaps.mjs`, not in rendering code |
| `training-vs-inference` | "99% of business applications" | No source |
| `from-prompt-to-production` | "The cost of fixing AI in production is 10x the cost of design" | No source |
| `human-in-the-loop-is-a-system-design-choice` | proofPoint "Referenced in from-agent-intent-to-governed-execution.mdx" | **False.** That file contains zero occurrences of this slug (verified 2026-09-19) |
| `ai-website-publishing-with-human-in-the-loop-control` | Three proofPoints asserting a specific Flowright WebsiteOps run that "stopped at the human review gate" | No provenance block, so observed claims carry no `attestation: "author"`. No run ID, log or artifact. Git history shows no WebsiteOps-authored commit |
| `agent-instructions-and-handoff-as-an-operating-system`, `from-ad-hoc-prompts-to-repeatable-agent-workflows` | `report:topics` presented as an operating repository script and quality gate | **Does not exist.** `package.json` defines only `report:systems`. *Historical reconciliation from C9 review, not a new finding.* |
| `agent-instructions-and-handoff-as-an-operating-system`, `from-ad-hoc-prompts-to-repeatable-agent-workflows` | `report:gaps` presented as an operating repository script and quality gate | **Does not exist.** `package.json` defines only `report:systems`. *Historical reconciliation from C9 review, not a new finding.* |
| `tech-stack-for-nlpg-driven-ai-assisted-sdlc` | A "minimal CLI surface" of eight `nlpg` commands (`init`, `spec new`, `spec validate`, `plan`, `run`, `gate`, `ledger view`, `pr create`) presented as implemented, unlabelled as proposed | **No CLI, binary, source or npm command exists.** Only `public/scenes/nlpg-swimlane.html`, `nlpg-mindmap.html` and build output. *Historical reconciliation from C9 review, not a new finding.* |
| `from-prompt-to-production` | proofPoint "Referenced in from-ad-hoc-prompts-to-repeatable-agent-workflows.mdx" | **False.** That file contains zero occurrences of this slug (verified 2026-09-19). Second instance of this "Referenced in" proofPoint form, after `human-in-the-loop-is-a-system-design-choice` |
| `systems-001-foundations` | proofPoint "618 lines of canonical systems terminology and taxonomy" | **False.** The file is **574 lines**. Self-referential even if the count were right |
| `systems-001-foundations` | proofPoint "Includes glossary anchors for 12 key terms" | **False.** The page has five `id` attributes: `toc-anchor` and four SVG title and desc ids. **Zero glossary anchors exist** |
| `systems-001-foundations` | proofPoint "Used as reference by SEO/AEO/GEO framework docs" | **False.** All five C11 pages reference it **zero** times |
| `the-intelligence-assembly-model` | proofPoint "Referenced in runtime-over-model-why-orchestration-is-the-product.mdx" | **False.** Zero occurrences (verified 2026-09-19) |
| `mental-frameworks` | proofPoint "Referenced in decision-making-under-uncertainty-in-ai-runtimes.mdx" | **False.** Zero occurrences (verified 2026-09-19) |

The integrity audit did not catch these. They belong on the integrity record as well as here.

**Systemic defect, measured 2026-09-19.** The `Referenced in X.mdx` proofPoint form is not a set of isolated editorial errors. A full scan of `src/content/systems` finds **19 proofPoints of this form, of which 15 are false** and only 4 are true. The false ones name a real file that contains zero references to the claiming page. This should be treated as a **generation or tooling defect** rather than page-by-page mistakes, and the whole class should be removed or re-verified in one pass rather than corrected cluster by cluster. The false instances are on: `a-simple-tokenizer`, `context-windows-as-working-memory`, `drift-decay-and-silent-failure`, `embeddings-explained-like-youre-human`, `from-prompt-to-production`, `human-in-the-loop-is-a-system-design-choice`, `llm-ops-without-the-buzzwords`, `mental-frameworks`, `prompting-is-not-the-skill-you-think-it-is`, `retrieval-augmented-generation-in-plain-terms`, `runtime-over-model-why-orchestration-is-the-product`, `structured-output-and-why-it-matters`, `the-intelligence-assembly-model`, `tool-use-when-language-triggers-actions` and `what-llms-are-optimized-for`. The four true ones are on `aeo-and-geo-as-a-retrieval-design-problem`, `probabilities-not-truth`, `seo-aeo-geo-in-plain-terms` and `training-vs-inference`.

### Frequency claims under a synthesis basis

Every page in this list is on **integrity hold** under the unsupported prevalence rule.

- "Most agent failures are not caused by low model capability" (`from-agent-intent-to-governed-execution`)
- "Agentic systems fail at boundaries more often than they fail at generation" (`engineering-agentic-systems-for-reliability`)
- "Most AI failures are decision failures under uncertainty" (`decision-making-under-uncertainty-in-ai-runtimes`)
- "AI incidents are usually boundary failures" (`observability-first-ai-systems`)
- The title "Why Most AI Projects Fail After the Demo Stage"

### Coined frameworks with no demonstrated use

I-7 Cognitive Loop ("a new standard"), NLPg, Intelligence Assembly Model, Logic Void, Intent Architecture, PE-R loop, Dual NLP.

Each has a deck or an interactive component. None of the Systems pages shows the framework applied to a real piece of work.

### Generic thought leadership

`enterprise-ai-at-scale`, `engineering-bounded-autonomy`, `the-intelligence-assembly-model`, `the-logic-void`, `natural-language-is-the-new-api`, `agentic-orchestration-coordination`, `intent-architecture-as-a-language-contract`.

### Time-sensitive pages

`cloud-architecture-comparison-2026`, `llm-ops-without-the-buzzwords`, `architecture-of-in-chat-ai-apps`, `policy-governed-mcp-runtimes-for-secure-tool-execution`, `evaluation-is-a-human-problem`, `training-vs-inference`, the skills pages, and the whole AI-search cluster.

### Disclosure question

**RESOLVED 2026-09-19: affiliated evidence.** Answered by the author after C13 closure.

**Shailesh Rawat works at Newtuple and published or contributed to the referenced work.** Newtuple material may be cited as **inspectable affiliated evidence**, provided the relationship is disclosed where it is material to the claim. It must **never** be represented as independent validation.

**Four** archive locations cite Newtuple, not three (corrected 2026-09-19). All four are resolved by the answer above:

| Location | How it is used |
| :--- | :--- |
| `systems/architecture-of-in-chat-ai-apps` | A published proof of concept, used to support the widget-reuse claim |
| `systems/why-ocr-quietly-breaks-document-ai` | A structured OCR benchmark grading 1,600 outputs |
| `systems/llm-ops-without-the-buzzwords` | The same OCR benchmark, in the body **and as a proofPoint** |
| `sentences/evals-are-operational-contracts` | The same OCR benchmark, cited in passing |

A full scan of `src/app`, `src/components`, `src/content/self` and the About page found **no disclosure statement anywhere**. One is now required at each location where the relationship is material.

**Editorial standard: use the best source, disclose the relationship, do not promote the employer.** Removing these citations because of the affiliation would replace strong inspectable sources with weaker ones, which is the opposite of transparency.

**Approved disclosure line**, with minor grammatical variation allowed:

> Disclosure: I work at Newtuple and contributed to the work referenced here.

Keep it factual, brief, non-promotional and visually secondary. A normal backlink to the source article is sufficient. **Do not add** marketing copy, service descriptions, calls to action, "learn more" language, endorsements, logos or cards, or employer biography.

**What Newtuple material may demonstrate:** that the referenced proof of concept or benchmark was actually published; the implementation or test setup documented in that source; the measurements or observations explicitly reported there; the author's first-hand participation where the source supports it.

**What it must never demonstrate:** independent external validation; general industry prevalence; superiority outside the tested population; universal architecture claims; outcomes the source did not measure. **Possibility is not frequency, and an affiliated benchmark is not independent validation.**

**Per-location treatment.**

- `architecture-of-in-chat-ai-apps` (KEEP-STRIP): the proof of concept may remain as a worked example where it materially helps the reader understand shared widget reuse, rendering inside an assistant surface, or host and widget architecture. Backlink, disclose, and state plainly that mock data was used if the source says so. **The article must still stand without the employer example**; its reason to exist is the interaction-surface boundary.
- `why-ocr-quietly-breaks-document-ai` (KEEP-STRIP): **load-bearing and stays.** Treat as affiliated benchmark evidence, not independent research. Backlink, disclose, and scope every numerical and frequency claim to the actual benchmark population. Do not generalise "observed in this benchmark" into "OCR systems generally do X at this frequency".
- `observability-first-ai-systems` (KEEP-REWRITE, inheriting the `llm-ops-without-the-buzzwords` material): usable **only for the exact claim the source supports**, with disclosure if retained. An employer article must not carry PMP's broader observability argument, which stays grounded in canonical reasoning and approved implementation evidence.
- `sentences/evals-are-operational-contracts`: same disclosure dependency, handled in the **later Sentences cleanup**. Outside the Systems rewrite batches; do not expand archive scope now.

Newtuple is **no longer an evidence blocker** for any rewrite batch.

**MCP sandboxing attestation: RESOLVED 2026-09-20 as UNATTESTED.** No currently attestable evidence supports publishing the historical Soothsayer sandbox and container-isolation claim. This is **not** a finding that the work was never built, nor that it was design only. It means PMP lacks evidence strong enough to publish the implementation claim as fact, so the claim was removed from `policy-governed-mcp-runtimes-for-secure-tool-execution` during Batch 4B. The page's KEEP-REWRITE disposition is unchanged: preflight confirmed a distinct trust-boundary argument survives without the claim. **No open factual evidence questions remain in the archive.**

### Substantial inbound links

| Page | Inbound (content / code) | Note |
| :--- | :--- | :--- |
| `systems-001-foundations` | 21 / 0 | **Verified 2026-09-19: 15 of 21 are the pasted boilerplate sentence**, the same sentence that inflates `from-prompt-to-production`. Six are substantive: four Shelf artifacts, `cloud-architecture-comparison-2026` and `i-7-cognitive-loop`. **Resolved in C12 (closed 2026-09-19):** zero of the six substantive inbound links come from a surviving canonical page. Inbound count must not be read as centrality. |
| `from-prompt-to-production` | 19 / 0 | **Verified 2026-09-19: 15 of 19 are the pasted boilerplate sentence.** Of the remaining four, two are Shelf decks, one is `tech-stack-for-nlpg-driven-ai-assisted-sdlc` (REDUCE-TO-NOTE) and one is `systems-001-foundations` (undecided). **No surviving canonical Systems page links to it substantively.** High inbound is not evidence of conceptual centrality. |
| `from-agent-intent-to-governed-execution` | 14 / 0 | |
| `agent-instructions-and-handoff-as-an-operating-system` | 12 / 0 | |
| `observability-first-ai-systems` | 12 / 0 | |
| `skills-vs-prompts-vs-agents` | 12 / 1 | Linked from `TopicPaths.tsx` |
| `i-7-cognitive-loop` | 9 / 1 | Has its own `I7LoopInteractive.tsx` component |
| `retrieval-augmented-generation-in-plain-terms` | 9 / 0 | |
| `engineering-agentic-systems-for-reliability` | 3 / 3 | Linked from `page.tsx`, `Methodology.tsx`, `StartHere.tsx` |
| `policy-governed-mcp-runtimes-for-secure-tool-execution` | 0 / 2 | Linked from `StartHere.tsx`, `Methodology.tsx` |
| `what-an-ai-model-actually-is` | 2 / 1 | Linked from `StartHere.tsx`, whose card copy describes content the article does not contain |

---

## Archive-level cleanup obligations

Work items that cross cluster boundaries. **Recorded during disposition, repaired after it.** None of these are scheduled, and none change a disposition decision.

### MIGRATION-RULE-01 · Schema v1 is the standing rule for rewrites

**Recorded 2026-09-19 during Batch 1 implementation.**

**Every canonical rewrite and REDUCE-TO-NOTE migration adopts `schemaVersion: "1.0"` unless an actual schema incompatibility is discovered and escalated.**

**Why this is not merely a lint workaround.** `scripts/content-contract.mjs` branches on the declaration. Documents without it are held to the legacy body contract, which **requires** a `**Key takeaways**` block, `id="toc-anchor"`, `<nav class="toc">`, `## Act I`, `## Act II`, `## Act III`, `<aside class="callout">`, `<span class="highlight">` and a body of at least 800 words. Those are exactly the structures the Content Doctrine retired. Documents declaring v1 are instead held to the Editorial Contract v1 gate, which **prohibits** Act headings and generic meta-headings and applies no word floor.

A rewritten page that does not declare v1 will therefore be told by the gate to put the scaffolding back. Adopting v1 is how a doctrine-compliant page passes, not a way around a check.

Declaring v1 makes these fields required for an explainer: `contentKind`, `readerIntent`, `readerOutcome`, `thesis`, `provenance`, `boundary` and `shortAnswer`. Claim statements in `provenance.claims` must appear in the body as normalized substrings, so they must quote real sentences rather than paraphrase them.

**Do not bulk-apply.** Each page adopts v1 only when it enters its approved migration batch.

### ARCHIVE-CLEANUP-02 · Broken SVG arrow markers

**Recorded 2026-09-19 during Batch 1 implementation. Structural and visual cleanup obligation.**

`id="arrowhead"` is defined in exactly one file, `src/content/systems/llm-ops-without-the-buzzwords.mdx`, which is a MERGE page. SVG marker references resolve within the rendered document, so every `marker-end="url(#arrowhead)"` on any other page already renders no arrowhead. The defect predates the migration and is not created by it, but the merge removes the only definition.

The three Batch 1 pages were fixed in place by giving each figure a locally scoped marker. **The remaining occurrences were deliberately not swept.** Address them during structural and visual cleanup, either by a local marker per figure or by one shared definition in a layout component.

### ARCHIVE-CLEANUP-01 · ProofPoint referential integrity

**Status:** recorded 2026-09-19 during C12 closure. **Split into two tracks (corrected during Consolidation Pass 01).** Repair of the known false proofPoints happens **during each affected page's rewrite**, not as a separate later sweep: a known false proofPoint must never be carried through a completed rewrite. Prevention is a **governance task**, scheduled after content migration.

**Finding.** A full scan of `src/content/systems` found **19 proofPoints of the form `Referenced in X.mdx`. Fifteen are false**: the named file exists but contains **zero** references to the page making the claim. Four are true.

Treat this as a **systemic generation or tooling defect**, not fifteen independent editorial mistakes. The uniform shape of the claim and the uniform failure mode indicate the proofPoints were produced without validating the reference they assert.

**Why it cannot wait for pruning to solve it.** Counted against recorded dispositions on 2026-09-19, **nine of the fifteen false instances survive disposition**: eight on pages decided KEEP-REWRITE (`a-simple-tokenizer`, `context-windows-as-working-memory`, `from-prompt-to-production`, `human-in-the-loop-is-a-system-design-choice`, `prompting-is-not-the-skill-you-think-it-is`, `retrieval-augmented-generation-in-plain-terms`, `structured-output-and-why-it-matters`, `tool-use-when-language-triggers-actions`) and one on a page decided REDUCE-TO-NOTE (`runtime-over-model-why-orchestration-is-the-product`). Only six disappear as a side effect of merge or retire. Pruning removes those six by accident, not by repair, and leaves the majority in place.

**False (15).** `a-simple-tokenizer`, `context-windows-as-working-memory`, `drift-decay-and-silent-failure`, `embeddings-explained-like-youre-human`, `from-prompt-to-production`, `human-in-the-loop-is-a-system-design-choice`, `llm-ops-without-the-buzzwords`, `mental-frameworks`, `prompting-is-not-the-skill-you-think-it-is`, `retrieval-augmented-generation-in-plain-terms`, `runtime-over-model-why-orchestration-is-the-product`, `structured-output-and-why-it-matters`, `the-intelligence-assembly-model`, `tool-use-when-language-triggers-actions`, `what-llms-are-optimized-for`.

**True (4).** `aeo-and-geo-as-a-retrieval-design-problem`, `probabilities-not-truth`, `seo-aeo-geo-in-plain-terms`, `training-vs-inference`.

**The repair runs on two tracks.**

*During each affected page rewrite (content migration):*

1. Remove or correct that page's false proofPoint. **Do not carry a known false proofPoint through a completed rewrite.**
2. Revalidate a true proofPoint whenever a merge or retirement changes the relationship it asserts.

*During governance hardening (after content migration):*

3. Scan other proofPoint patterns for the same class of unvalidated referential claim.
4. **Encode a deterministic validator** so a claim of the form `Referenced in X` cannot pass unless X actually contains the reference.

Step 4 is the point. The standing rule is: **if we solve it once, encode the solution so we do not solve it manually again.** Steps 1 to 3 repair the current archive; only step 4 stops the class from returning. The validator belongs with the existing Editorial Contract v1 gates rather than as a separate script.

---

## C1 · What is a model, and why is it confidently wrong?

> **Closed 2026-09-19.** Six pages become three canonical foundation pages: `what-an-ai-model-actually-is` (canonical), `training-vs-inference` (the decision), and `a-simple-tokenizer` (the mechanism). `probabilities-not-truth` and `what-llms-are-optimized-for` merge into the canonical page. `the-logic-void` retires into it. Do not reopen these decisions in later passes.
>
> **MERGE does not mean concatenate.** The canonical page keeps the best explanation from each source and deletes the rest. It does not become a 4,000 word page because three articles fed it.

**What C1 is for.** C1 is supporting infrastructure for the PMP niche, not a general AI curriculum. It exists to give a reader enough foundation for later work on context, memory, sessions, harnesses, MCP and evaluation. The spine is: what a model is, including what happens when it generates and why plausible is not true; then what changes during training, fine-tuning and use; then what the model actually receives, which is tokens.

**Rewrite constraints, recorded 2026-09-19.** These bind the C1 rewrites and are not optional wording preferences.

1. **Model versus application.** The model generates from its current input and learned parameters. The application around it may retrieve documents, memories, search results or tool output and place them into that input. Do not teach "nothing is retrieved" as a property of the product, because for the product it is often false. Retire "the conversation is an illusion of interface". Say instead that the model does not continuously learn from the conversation, and that the application creates continuity by supplying previous messages, summaries, memory or other context again. This distinction is the bridge to the later PMP work on RAG, context, memory and sessions.
2. **Parameters versus context.** Training changes the model's parameters. Fine-tuning changes those parameters further for a task, behaviour or domain. Context and retrieval change what the model can use during a particular run without changing the base weights. Neither is universally the right place for business data. Retire "fine-tuning is for behaviour, not knowledge" as a categorical rule, because fine-tuning can alter factual associations. The decision page teaches the choice and explains why retrieval and context are attractive when information must stay inspectable, replaceable or current. "Your data belongs in context, not weights" does not survive as a universal rule.
3. **Probability separation.** Token probability, expressed confidence and factual accuracy are three different things. The current cluster blurs all three. This separation is the most important single idea the C1 review surfaced.

**Canonical page progression.** A model is not a database and not a continuously learning mind. Training changes a large set of numerical parameters based on patterns in training data. During ordinary inference those parameters stay fixed. The model receives some input and context. It computes probabilities for possible next tokens. A decoding strategy selects one. That token becomes part of the next input. Repeat. Then: token probability is not answer confidence, and neither is factual accuracy.

**Tokenizer page constraint.** Tokenization must not become the explanation for every numerical or spelling failure. Show real tokenizer output. Distinguish "tokenization can contribute to strange behaviour" from "tokenization caused this particular wrong answer". The 9.11 versus 9.9 story and the letter-counting story are teaching illustrations until a real artifact is shown, and a real one is cheap to produce here.

**Cleanup approved with the closure.** Fix the `StartHere.tsx` card, which promises transformer weight distributions and inference kernels that the canonical page does not contain, in the same commit as the rewrite. Remove the Ollama links from `what-an-ai-model-actually-is` and `training-vs-inference` rather than dressing them up, because neither experiment helps a reader evaluate any claim on those pages. Remove the false proofPoints: "Referenced by 5+ other systems docs" (4 actual) and "Referenced in context-windows-as-working-memory.mdx" (0 actual). Remove the Act I, II and III scaffolding, which the editorial contract already forbids. Remove the repeated boilerplate: the "clarity at boundaries reduces downstream errors" line, the "Design note" callout, and the pasted Systems 001 and From Prompt to Production sentence. Context window concepts stay in C2 and are linked, not redefined here.

**What the cluster repeats**
- Next-token prediction is explained from scratch in three pages.
- "Not a brain, a statistical engine" is argued twice.
- The same Mars example appears twice.
- "Hallucination is not a bug" is argued twice, framed differently each time.

**Strongest surviving ideas**
- Confidence is a style of writing, not a measure of accuracy.
- Fine-tuning changes behaviour, while retrieval supplies knowledge.
- The model is frozen during use, and anything that feels like memory is the product around it.
- Tokens explain spelling mistakes, number confusion and cost.

**Where real evidence exists**
- The Ollama baseline experiments (local inference runs).
- The context window stress test.
- Otherwise this cluster is legitimately synthesis.

**Likely canonical pages**
- `what-an-ai-model-actually-is`
- `training-vs-inference`
- `a-simple-tokenizer`

**Could disappear without losing knowledge**
- `what-llms-are-optimized-for`
- `the-logic-void`
- `probabilities-not-truth` as a separate page (its core becomes the centre of the canonical page)

| Article | Reader question | Basis | Evidence available | Distinct | Overlaps | Density | Freshness | Inbound | Candidate | Merge target | Redirect | Integrity hold | Human decision |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `what-an-ai-model-actually-is` | What is a model, really? | synthesis | none required (Ollama links unrelated, remove) | partial | probabilities-not-truth, what-llms-are-optimized-for, training-vs-inference | adequate | needs review | 2 / 1 | keep-rewrite | | no | | KEEP-REWRITE (2026-09-19) |
| `probabilities-not-truth` | Why does AI sound confident when it is wrong? | synthesis | none needed | partial | what-an-ai-model-actually-is, what-llms-are-optimized-for | adequate | durable | 2 / 0 | merge | what-an-ai-model-actually-is | yes | YES (P, S) | MERGE (2026-09-19) |
| `what-llms-are-optimized-for` | What is the model trained to do? | synthesis | none needed | no | what-an-ai-model-actually-is, probabilities-not-truth | adequate | dated | 1 / 0 | merge | what-an-ai-model-actually-is | yes | YES (S) | MERGE (2026-09-19) |
| `training-vs-inference` | Do I need to train a model on my data? | synthesis | none required (Ollama links unrelated, remove) | yes | what-an-ai-model-actually-is | dense | needs review | 4 / 0 | keep-rewrite | | no | YES (W, P, S) | KEEP-REWRITE (2026-09-19) |
| `a-simple-tokenizer` | Why does the model see tokens instead of words? | synthesis | context window stress test; real tokenizer output required | yes | context-windows-as-working-memory | adequate | needs review | 0 / 0 | keep-rewrite | | no | | KEEP-REWRITE (2026-09-19) |
| `the-logic-void` | Where does AI reasoning stop being reliable? | synthesis | self: learning-to-say-i-dont-know (unattested) | no | probabilities-not-truth, decision-making-under-uncertainty-in-ai-runtimes | padded | durable | 2 / 0 | retire | what-an-ai-model-actually-is | yes | YES (P) | RETIRE (2026-09-19) |

**Rationale and notes**

- **what-an-ai-model-actually-is**
  - *Rationale:* It answers the broadest beginner question and is already linked from the homepage, so it is the natural home for the three overlapping foundations pages.
  - *Unresolved:* The homepage card promises "transformer weight distributions, inference kernels", which the article never covers. "At its core" appears in the body. `probabilities-not-truth` has the stronger title and `seoTitle`, so the canonical URL could reasonably go the other way.
- **probabilities-not-truth**
  - *Rationale:* It is the clearest statement of "confidence is style", but it repeats the model explanation and the Mars example.
  - *Unresolved:* The SVG shows invented percentages ("John Boone (50%)") that need to be framed as illustration. "If it can't point to where it found the information, it is likely hallucinating" is incomplete, because citations can be fabricated too.
- **what-llms-are-optimized-for**
  - *Rationale:* It adds nothing the other two do not, and "not optimized for user intent" ignores the post-training step that makes chat models follow instructions.
  - *Unresolved:* The note on temperature and sampling settings is worth carrying into the canonical page.
- **training-vs-inference**
  - *Rationale:* "Fine-tuning is for behaviour, not knowledge" is one of the most useful practical ideas in the archive for business readers.
  - *Unresolved:* "99% of business applications" has no source. "Inference is stateless" needs a note that products such as chat apps now add memory around the model. Cost figures are dated.
- **a-simple-tokenizer**
  - *Rationale:* It is the only page on tokens, and tokens explain cost, spelling errors and number confusion in terms a non-developer can see.
  - *Unresolved:* Its FAQ contradicts the body on "Strawberry". The claim that prompt engineering is "often just finding words that tokenize into patterns" is overstated. The "b-omb" jailbreak example is unsourced.
- **the-logic-void**
  - *Rationale:* A coined name wrapped around ideas already covered better elsewhere. The one useful observation, a confident answer to a malformed question, can live in the canonical page.
  - *Unresolved:* The advice to express "confidence intervals rather than binary answers" does not match how language models behave. A deck exists (`logic-void-deck`), so decide separately whether the deck stays on the shelf.

---

## C2 · How does a model get the right information in front of it?

> **Closed 2026-09-19.** Seven pages become three canonical pages plus one note: `retrieval-augmented-generation-in-plain-terms` (retrieval), `context-windows-as-working-memory` (context), `why-ocr-quietly-breaks-document-ai` (upstream ingestion), and the reduced semantic-caching note. Do not reopen these decisions in later passes.

**Binding rewrite constraints, recorded 2026-09-19.**

1. **Context is not memory.** The canonical URL stays for now, but the rewrite retires "working memory" as the literal definition. Canonical distinction: **a context window is the bounded information available to the model for the current run. Persistent memory is a separate application-level mechanism that may place selected information into that context.** Remove or reframe "the oldest tokens are pushed out of memory", which describes application behaviour rather than a model property. The persistent core, task frame and evidence pack structure survives only as a PMP context-management heuristic, not universal architecture. Replace "position beats volume" with the defensible form: selection and placement can matter as much as raw context size. If "lost in the middle" stays, it needs scoped evidence rather than an uncited "research shows".
2. **Retrieval page ownership.** `retrieval-augmented-generation-in-plain-terms` absorbs embeddings, similarity-is-not-correctness, freshness and ownership from knowledge management, chunking, and the retrieval failure stages. It must distinguish retrieval from context assembly.
3. **Retrieval methods.** Do not teach vector search as the retrieval mechanism. The rewrite acknowledges lexical and keyword retrieval, semantic and vector retrieval, hybrid approaches, and reranking where appropriate. Because lexical and hybrid material is absent from the current archive, verified across all 59 Systems pages, this is **new sourced corrective content, not migrated archive evidence**.
4. **Canonical retrieval boundary.** **Retrieval can provide evidence to the model. It does not guarantee that the evidence is relevant, sufficient, current or correct, nor that the model will use it correctly.** Remove or rewrite "RAG reduces hallucinations" and "RAG solves the gap" unless properly scoped and sourced.
5. **C2 and C7 evaluation seam.** C2 owns one question: **was the needed evidence indexed, retrieved, ranked and selected?** C7 owns general evaluation methodology and answer-level judgment. C2 may locate downstream failures such as faithfulness or answer correctness, but links rather than reteaches. No existing C2 threshold or percentage survives as written.
6. **OCR.** Stays distinct because its failure occurs before retrieval. Remove the false Local Experiments evidence pointer: no OCR experiment exists in `shelf/local-experiments`. Scope benchmark-derived frequency claims to the benchmark instead of generalising into often, usually or rarely. The Newtuple affiliation and disclosure question stays open and must not be treated silently as independent evidence.
7. **Semantic caching.** Reduce to a note keeping only: a similar query is not a safely reusable answer; knowledge changes require invalidation; cache poisoning risk. Strip numerical thresholds and prevalence claims. Explicitly distinguish semantic caching from provider prompt or context caching. The first-person bug-report self note is unusable until attested and converted to valid observed provenance.
8. **Artifact evidence.** The Azure pgvector setup note and the context-window stress test are **pending attestation**. Public availability alone does not establish provenance; neither file carries a provenance block. If attested, Azure can support implementation claims such as building a retrieval flow on Postgres with pgvector, but not performance claims it never measured.
9. **C11 handoff.** C11 must inherit rather than redefine: retrieval, chunk, embedding, lexical, vector and hybrid retrieval, ranking and reranking, grounding, context assembly, and the retrieval-is-not-truth boundary. The SEO, AEO and GEO paragraph is removed from the C2 merge and recorded only as candidate material for C11's later mission review.
10. **Cleanup.** During rewrite remove the Act I, II and III scaffolding (six occurrences on all seven pages), repeated RAG definitions, duplicate freshness advice (verified in five pages, not three), unsupported placement and performance claims, the Design note and highlight boilerplate, and unrelated discoverability material.

**What the cluster repeats**
- "Lost in the middle" is explained in two pages.
- "Put important information at the start or end" appears twice.
- The retrieval pipeline is described step by step in three pages.
- Stale knowledge and freshness rules appear in three.

**Strongest surviving ideas**
- A context window is working memory, and position matters as well as volume.
- Retrieval quality sets the ceiling for answer quality.
- Similar is not the same as correct.
- OCR errors are inherited by everything downstream.
- A semantic cache can return a confidently wrong answer to a question that merely sounds similar.

**Where real evidence exists**
- The context window stress test (linked, but its results are not used).
- The Azure and GCP cloud setup notes, which describe hands-on RAG setup.
- Self: `debugging-a-semantic-cache-miss` (Red in the audit, unattested).
- Self: `building-a-knowledge-surface`.
- Shelf notes: `semantic-cache-policy-guide`.

**Likely canonical pages**
- `context-windows-as-working-memory`
- `retrieval-augmented-generation-in-plain-terms`
- `embeddings-explained-like-youre-human`
- `why-ocr-quietly-breaks-document-ai`

**Could disappear without losing knowledge**
- `context-window-management-and-retrieval-pruning-strategies`
- `knowledge-management-as-runtime-memory`

| Article | Reader question | Basis | Evidence available | Distinct | Overlaps | Density | Freshness | Inbound | Candidate | Merge target | Redirect | Integrity hold | Human decision |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `context-windows-as-working-memory` | What is a context window, and why doesn't bigger fix everything? | synthesis | context window stress test (pending attestation; not linked from this page) | yes | context-window-management-and-retrieval-pruning-strategies | adequate | needs review | 4 / 0 | keep-rewrite | | no | YES (P, S) | KEEP-REWRITE · retire working-memory definition (2026-09-19) |
| `context-window-management-and-retrieval-pruning-strategies` | How do I fit retrieved material into a limited window? | unclear | context window stress test (pending attestation) | partial | context-windows-as-working-memory, retrieval-augmented-generation-in-plain-terms | adequate | needs review | 0 / 0 | merge | context-windows-as-working-memory | yes | YES (W, S) | MERGE (2026-09-19) |
| `retrieval-augmented-generation-in-plain-terms` | How does giving a model documents ground its answers, and where does that fail? | synthesis | Azure pgvector note (pending attestation); GCP note (platform shape only); OCR piece | yes | knowledge-management-as-runtime-memory, embeddings-explained-like-youre-human | adequate | needs review | 9 / 0 | keep-rewrite | | no | YES (S) | KEEP-REWRITE (2026-09-19) |
| `embeddings-explained-like-youre-human` | Why does similarity search return related but wrong results? | synthesis | retrieval and grounding kit (resource, not evidence) | yes | retrieval-augmented-generation-in-plain-terms | adequate | needs review | 0 / 0 | merge | retrieval-augmented-generation-in-plain-terms | yes | | MERGE (2026-09-19) |
| `knowledge-management-as-runtime-memory` | How should I organise knowledge so retrieval uses current, correct material? | synthesis | self: building-a-knowledge-surface (no provenance block); shelf notes: knowledge-surface-weekly-map | partial | retrieval-augmented-generation-in-plain-terms, entity-glossary-for-ai-discoverability | padded | durable | 6 / 0 | merge | retrieval-augmented-generation-in-plain-terms | yes | YES (P) | MERGE (2026-09-19) |
| `semantic-caching-for-probabilistic-systems` | Can I reuse answers when people ask the same thing differently? | synthesis | self: debugging-a-semantic-cache-miss (contract violation, unusable until attested); shelf notes: semantic-cache-policy-guide | yes | none close | padded | needs review | 3 / 0 | reduce-to-note | | no (if URL kept) | YES (W, P, S) | REDUCE-TO-NOTE (2026-09-19) |
| `why-ocr-quietly-breaks-document-ai` | Why do document answers go wrong before the model is involved? | inspected | Newtuple benchmark (affiliated; disclosure open); false Local Experiments pointer to be removed | yes | retrieval-augmented-generation-in-plain-terms | dense | needs review | 0 / 0 | keep-strip | | no | YES (W, P) | KEEP-STRIP (2026-09-19) |

**Rationale and notes**

- **context-windows-as-working-memory**
  - *Rationale:* The canonical explainer. Its "persistent core / task frame / evidence pack" tiering is practical. The author has a stress test on exactly this topic, so it could become evidence-led.
  - *Unresolved:* "The oldest tokens are pushed out" describes what some applications do, not what the model does. "Research shows" needs a citation.
- **context-window-management-and-retrieval-pruning-strategies**
  - *Rationale:* Its practical content (re-ranking, token budgets) belongs as a section of the canonical page.
  - *Unresolved:* The proofPoint claims testing that the page never shows. The "70-90%" figure, the 0.70 threshold and the 10/20/50/20 budget split have no source. The claim that time to first token scales linearly needs checking.
- **retrieval-augmented-generation-in-plain-terms**
  - *Rationale:* The canonical RAG page, clear for non-developers. It should absorb the ownership and freshness ideas from knowledge management.
  - *Unresolved:* It presents vector search as the only retrieval method, when keyword and hybrid search are common. It has no example of retrieval returning the wrong passage, which is the failure readers most need to see.
- **embeddings-explained-like-youre-human**
  - *Rationale:* "Similar is not correct" and "measure neighbours on your own queries" are distinct and useful. The library analogy works.
  - *Unresolved:* The FAQ answer about "bank" and rivers is incoherent. "Revolutionized" is hype. Consider whether it becomes a section of the RAG page after that page is rewritten.
- **knowledge-management-as-runtime-memory**
  - *Rationale:* The useful idea, that a small well-owned knowledge surface beats volume and needs a weekly review, fits inside the RAG canonical.
  - *Unresolved:* SEO, AEO and GEO outcomes are mixed into a retrieval topic. Its proof points are site changelog items, not evidence.
- **semantic-caching-for-probabilistic-systems**
  - *Rationale:* The one essential idea is that a similarity threshold can serve a confidently wrong cached answer ("Is it safe to delete this database?" matched to "How do I delete this database?"), plus the need for invalidation. That fits a short note, and the long reference form is developer-heavy for this audience.
  - *Unresolved:* The "40%" figure has no source. If the author attests `debugging-a-semantic-cache-miss`, the note should become an observed field note built on that incident. The page never distinguishes semantic caching from provider prompt caching, which readers will confuse.
- **why-ocr-quietly-breaks-document-ai**
  - *Rationale:* Well argued, distinct, and already close to doctrine voice. It needs only the legacy scaffolding removed.
  - *Unresolved:* Its intro points to local OCR experiments that do not exist. The Newtuple benchmark citation needs the disclosure check.

---

## C3 · Prompt, system prompt, skill, workflow, agent: which do I need?

> **Closed 2026-09-19.** Five pages become three: `skills-vs-prompts-vs-agents` (term map), `what-a-system-prompt-actually-is` (keep-strip) and `designing-reusable-ai-skills` (skill playbook). `what-a-skill-is-in-ai-systems` and `skill-evaluation-and-versioning` merge into the playbook. Do not reopen these decisions in later passes.
>
> C3 is terminology and composition. It does not redefine concepts closed in C1, C4 or C5.

**Binding rewrite constraints, recorded 2026-09-19.**

1. **"Skill" is an overloaded term.** It must be labelled as PMP working architectural vocabulary, not presented as universal industry terminology. Canonical framing: in PMP, a skill is a reusable, versioned package of instructions and declared operating constraints for a repeated task. It may define inputs, outputs, tool scope, success criteria, failure conditions and escalation. Other platforms may use the word differently.
2. **Do not claim system prompts are universally paid for on every turn.** Caching, provider accounting and product implementation can change that. State instead that system-level instructions remain part of the model working context across the interaction, so growing them carries context and maintenance costs even when provider-side caching changes the billing cost.
3. **The term map adopts C5 canonical definitions and links rather than redefines.** The current page inverts them: it calls the agent the runtime actor, while `ai-agents-vs-ai-workflows` makes the runtime the host authority that constrains a model granted discretion over the next step. Prompt belongs to C4, model mechanics to C1, agent-like choice and tool requests to C5.
4. **`what-a-system-prompt-actually-is` must state explicitly:** system prompts influence model behaviour; they do not enforce runtime policy. Runtime enforcement belongs to C5.
5. **`designing-reusable-ai-skills` becomes the skill playbook** and absorbs the useful material from both merging pages, including skill-level evaluation and versioning. General evaluation methodology stays with C7.
6. **Evidence.** `.agents/skills/pruningmypothos-editorial/` is the primary worked specimen, with its `SKILL.md`, recipe files and validator-backed structure. State its boundary: this shows how PMP packages and validates a skill, and does not establish a universal skill format. The Skill Catalog tool can demonstrate metadata linting and duplicate detection. CSV-to-eval can demonstrate turning cases into runnable evaluation input. Neither proves a skill is good. No Systems page currently cites the repository own skill, which is the largest missed opportunity in this cluster.
7. **Cleanup.** Remove the tools, actions and skills synonym claim, which is the held (C) error. Correct the inverted agent and runtime definitions. Remove repeated prompt and workflow definitions and link instead. Remove the Act I, II and III scaffolding, six occurrences on every page. Remove the Design note callout and highlight slogan, one of each on every page. Remove the Dual NLP tangent from C3. Link the currently isolated system-prompt page, which has zero inbound links despite being the strongest writing in the cluster, from both the term map and the skill playbook.
8. **NLPg.** Removing the C3 Dual NLP tangent settles this cluster exposure. The wider NLPg naming conflict stays deferred (see Contradictions between or inside pages).

**What the cluster repeats**
- The prompt → skill → workflow → agent sequence is laid out in three pages.
- "What a skill is" is defined three times.
- "A system prompt accumulating rules is a skill that has not been named yet" appears in two pages.

**Strongest surviving ideas**
- The difference between a system prompt and a skill is range, not importance.
- Two resident rules can contradict each other silently.
- Split a skill when its parts would be evaluated differently.
- Test a skill with a normal case, a borderline case, a failure case and an escalation case.

**Where real evidence exists**
- This repository's own editorial skill: `.agents/skills/pruningmypothos-editorial` with its recipes, plus `scripts/validate-languageops-recipes.mjs`.
- The PMP skill catalog tool.
- None of it is used by these pages.

**Likely canonical pages**
- `skills-vs-prompts-vs-agents` (term map, on HOLD)
- `what-a-system-prompt-actually-is`
- `designing-reusable-ai-skills` (practice)

**Could disappear without losing knowledge**
- `what-a-skill-is-in-ai-systems`
- `skill-evaluation-and-versioning` as a separate page

| Article | Reader question | Basis | Evidence available | Distinct | Overlaps | Density | Freshness | Inbound | Candidate | Merge target | Redirect | Integrity hold | Human decision |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `skills-vs-prompts-vs-agents` | What is the difference between these, and which do I need? | synthesis | skill catalog tool (live) | yes | what-a-skill-is-in-ai-systems, ai-agents-vs-ai-workflows | adequate | needs review | 12 / 1 | keep-rewrite | | no | | KEEP-REWRITE · term map (2026-09-19, supersedes HOLD) |
| `what-a-skill-is-in-ai-systems` | What is a skill? | synthesis | repo editorial skill | no | skills-vs-prompts-vs-agents, designing-reusable-ai-skills | padded | needs review | 7 / 0 | merge | designing-reusable-ai-skills | yes | YES (C) | MERGE (2026-09-19) |
| `what-a-system-prompt-actually-is` | What belongs in a system prompt, and what should be a skill? | synthesis | none needed | yes | skills-vs-prompts-vs-agents | dense | durable | 0 / 0 | keep-strip | | no | | KEEP-STRIP (2026-09-19) |
| `designing-reusable-ai-skills` | How do I turn a prompt that worked into something reusable and safe? | synthesis | repo editorial skill and recipes (PMP implementation, not a universal standard) | partial | skill-evaluation-and-versioning, what-a-skill-is-in-ai-systems | adequate | needs review | 4 / 0 | keep-rewrite | | no | | KEEP-REWRITE (2026-09-19) |
| `skill-evaluation-and-versioning` | How do I change a skill without breaking what depends on it? | synthesis | repo contract tests; csv-to-eval tool (live) | partial | designing-reusable-ai-skills | padded | durable | 1 / 0 | merge | designing-reusable-ai-skills | yes | | MERGE (2026-09-19) |

**Rationale and notes**

- **skills-vs-prompts-vs-agents**
  - *Rationale:* The canonical comparison. It already has the best analogy in the archive, including its "where the analogy breaks" note, and the older annotated figure.
  - *Unresolved:*
    - *Human decision HOLD (2026-09-13):* becomes a map of terms (prompt, system prompt, skill, workflow, tool use, agent-like behaviour, runtime), one line each, with links to canonical pages. It may not define "agent" itself; that definition lives in `ai-agents-vs-ai-workflows`.
    - The Dual NLP tangent does not serve the reader question.
    - Agent skill formats have become concrete products since publication, so it needs a freshness check.
- **what-a-skill-is-in-ai-systems**
  - *Rationale:* Its definition and "when a task should become a skill" list fit inside the canonical comparison.
  - *Unresolved:* It lists "tools, actions, tasks, extensions" as other names for skills, which conflates skills with tools.
- **what-a-system-prompt-actually-is**
  - *Rationale:* The strongest authored writing in the archive, and the closest existing page to doctrine voice. It needs only scaffolding removed.
  - *Unresolved:*
    - "Most teams write their first system prompt in about four minutes" and the "nine hundred words" scenario read as observation, so frame them as illustration unless attested.
    - The inserted audience paragraph and the "Practical verification templates" link are template residue.
    - It is a strong candidate for exemplar #2.
- **designing-reusable-ai-skills**
  - *Rationale:* The canonical skills playbook, with concrete split-or-merge tests. The author's own editorial skill is a real, inspectable specimen of everything this page describes.
  - *Unresolved:* It could show the repository's skill and recipe files as the worked example, including what those files got wrong (see C9).
- **skill-evaluation-and-versioning**
  - *Rationale:* Its four test types and behaviour-based versioning belong as the second half of the skills playbook.
  - *Unresolved:* None beyond the merge itself.

---

## C4 · How do I turn words into something software can safely use?

> **Closed 2026-09-19.** Five pages become two canonical pages: `prompting-is-not-the-skill-you-think-it-is` (language side) and `structured-output-and-why-it-matters` (software side). `intent-architecture-as-a-language-contract` and `resilient-integration-contracts-for-structured-outputs` merge into the software page. `natural-language-is-the-new-api` retires into the language page. Do not reopen these decisions in later passes.
>
> The cluster splits at the point where responsibility transfers, from the person writing the instruction to the software checking the output.

**Binding rewrite constraints, recorded 2026-09-19.**

1. **Prompt versus contract.** A prompt is an instruction to a probabilistic generator. It can describe constraints, but ordinary software cannot enforce the prompt itself. A schema declares explicit rules that software can check, and a validator decides whether output satisfies them. Canonical formulation: **the machine-enforceable contract begins where software can validate explicit rules.** Retire "a prompt is a contract" as a literal explanation.
2. **C4 and C5 boundary.** C4 owns intent, instruction, candidate output, parse, validate structure, check meaning. C5 owns authorise, execute, verify effect. `structured-output-and-why-it-matters` may state that valid structure does not imply permission or successful execution, but it must not become the canonical authorization page.
3. **Natural Language Is the New API.** Retire the Systems page. Preserve only the defensible idea: natural language can be the human-facing interface, and structured contracts still need to exist underneath it. Do not preserve the literal API framing, the executable-English framing, or vector search as action dispatch. Flag the phrase as a possible future Sentences entry, not a surviving Systems explainer.
4. **The prompting page owns** task, constraints, examples, requested output shape, diagnosing output failures, iterative refinement, and versioning and testing prompts. It must not redefine next-token prediction, which C1 owns; system prompts, which C3 owns; or tool authorization, which C5 owns.
5. **The structured-output page owns** structured output, schema, parser versus validator, syntactic validity versus semantic correctness, generate then parse then validate then repair, schema versioning, validation failures as telemetry, and feeding exact validation errors back into repair loops. Canonical rule: **valid structure does not mean correct meaning, factual truth, permission to act, or successful execution.**
6. **Evidence.** Keep prompt-to-json only with its existing honest limitation, that it can draft a schema and a mock instance but does not establish correctness. Do not cite the retired `json-schema-lint` route as evidence. The schema-translation self note stays unattested until Shailesh confirms the incident happened as described. Remove the 90 percent claim and "our team has tested" rather than trying to rescue them.
7. **Cleanup for the rewrite.** Remove both false proofPoints (`prompting` claims a reference from `what-a-skill-is-in-ai-systems`, and `structured-output` claims a reference from `prompting`; neither exists). Remove the Act I, II and III scaffolding. Remove the boilerplate "Design note" callout and the "clarity at boundaries" slogan where they add nothing. Remove the stale `beta.openai.com/docs` reference. Remove the dangling marketing-plan callback to an example that does not exist in Systems 001. Remove the unrelated seo, aeo and geo tags from `resilient-integration-contracts-for-structured-outputs`. Repoint links from the retiring and merging pages, including three shelf decks, `systems-001-foundations` and `tech-stack-for-nlpg-driven-ai-assisted-sdlc`. Update the `related` entry in `structured-output-and-why-it-matters`, which currently points at a merging page. *Recorded 2026-09-19:* that boilerplate sentence also carries the only link to the DAX Agentic Orchestration deck. The boilerplate is removed as approved, and the link is not automatically replaced with `/dax`. Adding a deliberate DAX link requires a reader-value decision during the C4 rewrite; the existence of the DAX product page is not sufficient reason on its own.
8. **NLPg.** Not resolved inside C4. Recorded as a separate terminology decision (see Contradictions between or inside pages).

**What the cluster repeats**
- "A prompt is a contract or specification" is argued in three pages.
- Schema validation followed by a repair loop appears in two pages.
- A three-layer "contract" model appears in one page and is implied in two others.

**Strongest surviving ideas**
- Prompts improve through iteration against observed output, not through clever wording.
- Valid JSON says nothing about whether a value is true or an action is allowed.
- Parse, then validate shape, then check meaning, then authorise.
- Version schemas together with the prompts that produce them.

**Where real evidence exists**
- The PMP prompt-to-json tool.
- Self: `debugging-my-first-schema-translation-error` (unattested).
- Shelf notes: `structured-output-translation-playbook`.

**Likely canonical pages**
- `prompting-is-not-the-skill-you-think-it-is`
- `structured-output-and-why-it-matters`

**Could disappear without losing knowledge**
- `natural-language-is-the-new-api`
- `intent-architecture-as-a-language-contract`
- `resilient-integration-contracts-for-structured-outputs`

| Article | Reader question | Basis | Evidence available | Distinct | Overlaps | Density | Freshness | Inbound | Candidate | Merge target | Redirect | Integrity hold | Human decision |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `prompting-is-not-the-skill-you-think-it-is` | What actually makes prompts work? | synthesis | prompt-to-json tool (drafting only) | yes | natural-language-is-the-new-api, what-a-system-prompt-actually-is | adequate | needs review | 4 / 0 | keep-rewrite | | no | YES (P) | KEEP-REWRITE (2026-09-19) |
| `natural-language-is-the-new-api` | What changes when software is instructed in plain language? | synthesis | none | partial | prompting-is-not-the-skill-you-think-it-is, intent-architecture-as-a-language-contract | padded | dated | 6 / 0 | retire | prompting-is-not-the-skill-you-think-it-is | yes | YES (C) | RETIRE (2026-09-19) |
| `intent-architecture-as-a-language-contract` | How does a vague request become something a system can act on? | synthesis | none | no | structured-output-and-why-it-matters, natural-language-is-the-new-api | padded | durable | 4 / 0 | merge | structured-output-and-why-it-matters | yes | | MERGE (2026-09-19) |
| `structured-output-and-why-it-matters` | Why ask for structured output, and what does valid JSON still not guarantee? | synthesis | prompt-to-json tool (drafting only); self schema note (unattested) | yes | resilient-integration-contracts-for-structured-outputs | adequate | needs review | 6 / 0 | keep-rewrite | | no | YES (P, S) | KEEP-REWRITE (2026-09-19) |
| `resilient-integration-contracts-for-structured-outputs` | How do I stop malformed output from breaking downstream software? | synthesis | self schema note (unattested); shelf playbook | no | structured-output-and-why-it-matters | padded | needs review | 0 / 0 | merge | structured-output-and-why-it-matters | yes | YES (W, P) | MERGE (2026-09-19) |

**Rationale and notes**

- **prompting-is-not-the-skill-you-think-it-is**
  - *Rationale:* The canonical prompting page for non-developers. "The skill is diagnosing the output's flaws" is the idea worth keeping.
  - *Unresolved:* Advice on role prompting and examples needs review against current reasoning models. The Dual NLP link is a tangent.
- **natural-language-is-the-new-api**
  - *Rationale:* Its ideas are covered more accurately elsewhere, and it carries factual problems.
  - *Unresolved:*
    - It presents vector search as the mechanism for choosing actions, which is not how tool calling works.
    - "Let's revisit the marketing plan example" refers to an example that does not exist in Systems 001.
    - It defines NLPg differently from `tech-stack-for-nlpg-driven-ai-assisted-sdlc`.
    - It links to beta OpenAI documentation.
- **intent-architecture-as-a-language-contract**
  - *Rationale:* The meaning / structure / execution split is a usable idea, but the page never gives a concrete example. It belongs as one paragraph in structured output.
  - *Unresolved:* A shelf deck exists (`intent-architecture-blueprint-deck`).
- **structured-output-and-why-it-matters**
  - *Rationale:* The canonical page, and already half migrated. Its new four-step check and invoice example are the best practical writing in this cluster.
  - *Unresolved:* The old takeaways and "the most reliable method" contradict the new boundary. "This chain would be impossible with unstructured text" is overstated. The PMP tool and the self schema note could turn the invoice example into evidence.
- **resilient-integration-contracts-for-structured-outputs**
  - *Rationale:* It duplicates structured output. Its self-repair loop and schema versioning sections are worth carrying across.
  - *Unresolved:* The "90%" claim and "our team has tested" have to be attested with an artifact or removed before any content moves. Its SEO, AEO and GEO tags are unrelated to the topic.

---

## C5 · How do I let AI take actions without losing control?

> **Closed 2026-09-18.** Four canonical Systems pages plus one authored note: `tool-use-when-language-triggers-actions`, `ai-agents-vs-ai-workflows`, `from-agent-intent-to-governed-execution`, `policy-governed-mcp-runtimes-for-secure-tool-execution`, and the note carried out of `runtime-over-model-why-orchestration-is-the-product`. The three remaining pages do not survive as pages; their dispositions follow from that closure and are marked so in the table. Do not reopen these decisions in later passes.

**What the cluster repeats**
- "The model proposes, the runtime decides" is stated in every page.
- Three different seven-stage lists.
- Two different four-constraint lists.
- allow / ask / deny appears in four pages.
- "Failures happen at boundaries, not generation" is claimed as frequency four times with no data.

**Strongest surviving ideas**
- A tool call is structured text the application chooses whether to run (`tool-use-when-language-triggers-actions`).
- The distinction that matters is who picks the next step (`ai-agents-vs-ai-workflows`).
- The rule check must be ordinary code rather than another model call, so it cannot be talked out of its rules (`policy-governed-mcp-runtimes-for-secure-tool-execution`).
- Allow / ask / deny / defer, weighed against reversibility (`decision-making-under-uncertainty-in-ai-runtimes`).
- "A model you cannot inspect fails as a mood. A loop you can inspect fails as a specific step with a specific reason." (`runtime-over-model-why-orchestration-is-the-product`)
- Completion must be shown with evidence, not declared (`engineering-agentic-systems-for-reliability`).

**Where real evidence exists**
- The author's Soothsayer build note (`shelf/local-experiments/soothsayer-mcp-kernel`).
  - **Decided 2026-09-18:** Soothsayer is a private repository, so it cannot serve as public repository evidence. It may be cited as attested observation by the author. Inspectable proof for this cluster comes from the public DAX, PaneTera and Verb artifacts with pinned commits.
  - It is linked from eight Systems pages and used substantively by none.
  - Its runtime diagram labels (allow / deny / ask, run_id, continue / stop / compact) match this cluster's claims directly.
- The homepage projects DAX, Verb and PaneTera, with pinned commits. No article uses them.

**Likely canonical pages**
- `tool-use-when-language-triggers-actions` (mechanism, for beginners)
- `ai-agents-vs-ai-workflows` (distinction, for beginners)
- `from-agent-intent-to-governed-execution` (practice, evidence-led)

**Could disappear without losing knowledge**
- `runtime-over-model-why-orchestration-is-the-product` (carry its best section across)
- `engineering-agentic-systems-for-reliability`
- `engineering-bounded-autonomy`
- `decision-making-under-uncertainty-in-ai-runtimes`

| Article | Reader question | Basis | Evidence available | Distinct | Overlaps | Density | Freshness | Inbound | Candidate | Merge target | Redirect | Integrity hold | Human decision |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `tool-use-when-language-triggers-actions` | What happens when a model can call tools, and who is responsible? | synthesis | Soothsayer (unattested) | yes | ai-agents-vs-ai-workflows, from-agent-intent-to-governed-execution | dense | durable | 2 / 0 | keep-rewrite | | no | YES (C) | KEEP-REWRITE (2026-09-13) |
| `ai-agents-vs-ai-workflows` | What is the difference between an agent and a workflow? | synthesis | Soothsayer (unattested), unused | partial | skills-vs-prompts-vs-agents, tool-use-when-language-triggers-actions, runtime-over-model-why-orchestration-is-the-product | adequate | durable | 5 / 0 | keep-rewrite | | no | YES (P) | KEEP-REWRITE (2026-09-13) |
| `from-agent-intent-to-governed-execution` | What happens between an agent proposing an action and it running? | synthesis | Soothsayer (attested observation); DAX, Verb, PaneTera | partial | runtime-over-model-why-orchestration-is-the-product, engineering-agentic-systems-for-reliability, policy-governed-mcp-runtimes-for-secure-tool-execution | dense | durable | 14 / 0 | keep-rewrite | | no | YES (P, C) | KEEP-REWRITE (2026-09-18) |
| `runtime-over-model-why-orchestration-is-the-product` | Why does the code around the model matter more than the model? | synthesis | Soothsayer (attested observation) | partial | from-agent-intent-to-governed-execution | adequate | durable | 7 / 0 | merge | from-agent-intent-to-governed-execution | yes | YES (C) | REDUCE-TO-NOTE (2026-09-18) |
| `engineering-agentic-systems-for-reliability` | How do I build an agent that fails safely? | synthesis | Soothsayer (attested observation) | partial | from-agent-intent-to-governed-execution, engineering-bounded-autonomy | adequate | durable | 3 / 3 | merge | from-agent-intent-to-governed-execution | yes | YES (P) | MERGE (follows from C5 closure) |
| `engineering-bounded-autonomy` | How do I set limits on an autonomous system? | synthesis | none used | no | engineering-agentic-systems-for-reliability, from-agent-intent-to-governed-execution | padded | durable | 2 / 0 | retire | from-agent-intent-to-governed-execution | yes | YES (S) | RETIRE (follows from C5 closure) |
| `policy-governed-mcp-runtimes-for-secure-tool-execution` | How do I stop an agent's MCP tools from doing damage? | synthesis | public artifacts only | partial | from-agent-intent-to-governed-execution, tool-use-when-language-triggers-actions | adequate | needs review | 0 / 2 | keep-rewrite | | no | YES (W, S) | KEEP-REWRITE · hostile input (2026-09-18) |
| `decision-making-under-uncertainty-in-ai-runtimes` | How should a system decide whether to act when evidence is thin? | synthesis | Soothsayer allow / deny / ask (attested observation) | partial | from-agent-intent-to-governed-execution, human-in-the-loop-is-a-system-design-choice | adequate | durable | 2 / 0 | merge | from-agent-intent-to-governed-execution | yes | YES (P) | MERGE (follows from C5 closure) |

**Rationale and notes**

- **tool-use-when-language-triggers-actions**
  - *Rationale:* It states plainly the mechanism non-developers most need: the model returns a structured request, and the application decides whether to run it. Its closing paragraph is authored.
  - *Decided 2026-09-13:* stays a separate page (see Decision log).
  - *Rewrite direction:* remove "transforms the model from a passive text generator into an active agent", which is exactly the confusion this page should clear up. Build around one sentence: a model does not call a tool by itself; it produces a request, and ordinary software decides whether that request becomes an action.
- **ai-agents-vs-ai-workflows**
  - *Rationale:* It has a distinct beginner handle, but the review of 2026-09-13 found it was processed rather than authored, and it omits real evidence that exists.
  - *Decided 2026-09-13:* stays a separate page and holds the site's canonical definition of agent-like behaviour: the model has meaningful discretion over the next step.
  - *Rewrite direction:* do not spend space re-explaining tool calling; link to `tool-use-when-language-triggers-actions` instead. The tool-use question that blocked the exemplar rewrite is resolved.
- **from-agent-intent-to-governed-execution**
  - *Rationale:* The most concrete practitioner page, and it has the most inbound content links. It is the natural home for an evidence-led rewrite around Soothsayer, absorbing the best of four sibling pages.
  - *Unresolved:*
    - Its FAQ and body list different seven stages.
    - The title is house dialect and should change during the rewrite; the URL can stay.
    - "Most agent failures" is a frequency claim.
    - Choosing this URL over `engineering-agentic-systems-for-reliability`, which the homepage links, is ambiguous.
- **runtime-over-model-why-orchestration-is-the-product**
  - *Rationale:* Mostly repeats the canonical loop. Its "Why the loop outlives the model" section is some of the best prose in the cluster and should be carried across, lightly edited.
  - *Unresolved:* Its FAQ and body list different constraints. "A chat loop is a stateless exchange" is inaccurate.
- **engineering-agentic-systems-for-reliability**
  - *Rationale:* It overlaps the canonical almost completely. The lines "debugging becomes storytelling instead of engineering" and "verification: completion must be evidenced, not merely stated" should move across.
  - *Unresolved:*
    - It is linked from three code files, and those links must change in the same commit as the redirect.
    - The homepage Methodology card summarises it with claims the article does not make.
    - A deck exists.
- **engineering-bounded-autonomy**
  - *Rationale:* Generic, with no distinct idea beyond the canonical. It restates "boundaries must be enforced, not suggested" at length.
  - *Unresolved:* A deck exists (`engineering-bounded-autonomy-deck`).
- **policy-governed-mcp-runtimes-for-secure-tool-execution**
  - *Rationale:* Its MCP-specific security content is distinct: container isolation, result sanitisation, and rules checked by code rather than a model. But its claim of empirical verification is not supported by the Soothsayer note, and it speaks in first person ("how we built").
  - *Unresolved:*
    - The author must decide whether sandboxing was built and tested. If so, attest with an artifact and keep it as a security companion. If not, reframe it as synthesis and merge it into the canonical page.
    - "Absolute (Failsafe execution)" jailbreak resistance is an overclaim.
    - It is linked from two homepage components.
- **decision-making-under-uncertainty-in-ai-runtimes**
  - *Rationale:* The allow / ask / deny / defer modes, the three kinds of uncertainty, and the "log the reason, not only the outcome" point form one strong section of the canonical page.
  - *Unresolved:* "PE-R loop" is a coined name to drop. "Most AI failures are decision failures" is a frequency claim. It retrofits an I-7 mapping.

---

## C6 · Where should a person sit in an AI system?

> **Closed 2026-09-19.** Two pages become **one canonical Systems page**. The publishing article is not a second reader question; it is a worked example of judgment placement. Do not reopen these decisions in later passes.

**Binding rewrite constraints, recorded 2026-09-19.**

1. **Decisions.** `human-in-the-loop-is-a-system-design-choice` is KEEP-REWRITE and canonical. `ai-website-publishing-with-human-in-the-loop-control` merges into it. The publishing article survives only as worked-example material, not as a separate reader question.
2. **Canonical C5 / C6 seam.** Record: **C5 decides whether the machine may act. C6 decides whether a person can actually judge what the machine proposes.** C5 continues to own authorization, allow / ask / deny, approval gates as execution controls, escalation triggers, and external action. C6 owns the quality and placement of human judgment.
3. **Approval versus judgment.** Preserve: **approval asks whether a human said yes; judgment asks whether they were in a position to say no.** The rewrite tests oversight through four concrete questions: what decision stops, who owns it, what does the reviewer see, and where does rejection go. **Do not treat a confirm button as evidence of meaningful oversight.** The stronger test: a human being present is not enough; they need the information, authority and return path required to make a meaningful decision.
4. **Scope the human-judgment claim.** Do not preserve broad claims such as "anything where model confidence is uncorrelated with correctness requires a human" unless separately sourced. "Irreversible public effects" is also too strong for publishing, which can often be reversed. Use the narrower boundary: **human judgment becomes relevant where the workflow intentionally reserves a consequential decision for accountable human review.** C6 does not need to invent a universal risk taxonomy; C5 already owns the escalation and authorization logic.
5. **HITL / HOTL / HOOTL.** Do not make these acronyms the organizing framework of the rewritten page. Where they are really authorization and execution modes, defer to C5. Keep only what helps explain judgment placement.
6. **Publishing worked example.** Drop Flowright as the primary evidence path; it is private, unattested and not inspectable. Use the current PMP WebsiteOps implementation instead: `scripts/websiteops-conform.mjs`, `scripts/websiteops-publish.mjs`, and the editorial skill WebsiteOps staging step. Cite them at **immutable repository refs** at rewrite time. These artifacts demonstrate a real staging and proposal boundary. They do **not** prove better editorial judgment or content quality.
7. **Auto-merge nuance.** Preserve: **automation after approval does not necessarily remove the human gate; it may move the stop point earlier in the workflow.** The rewrite must describe both the manual-promotion and the approved-auto-merge paths accurately. **Do not claim "merge is always the stop sign."**
8. **Rejection path.** Preserve the publishing example's strongest operational detail: reject, request revision, approve. The canonical page must explicitly explain where rejected work returns, rather than treating rejection as the end of the flow.
9. **C7 and C4 boundaries.** C7 owns logging the model suggestion alongside the human decision, and audit evidence. C4 owns structural validation. Preserve the seam: **passing validation does not grant publication authority.**
10. **Evidence cleanup.** Remove during rewrite: the false proofPoint claiming reference from `from-agent-intent-to-governed-execution`; the unattested Flowright proofPoints; generic medical, autopilot and ad-bidding filler unless it genuinely earns its place; the I-7 retrofit; Act I, II and III; the Design note; and the "clarity at boundaries" boilerplate. Clear `featured: true` from the publishing page when the merge is implemented.
11. **Discovery.** The canonical page currently has **no surviving canonical inbound links**. During structural cleanup, deliberately add relevant inbound links from surviving C5 and C9 material rather than relying on dead archive links.

**What the cluster repeats**
- Very little. The two pages are complementary, one explaining and one showing.

**Strongest surviving ideas**
- Oversight is a design choice made per risk, not a safety blanket.
- Automation bias: a reviewer who approves a 99.9%-reliable system stops looking.
- The proof of control is where the workflow stopped, not what it produced.

**Where real evidence exists**

Verified 2026-09-19. The evidence the publishing page cites is not inspectable, but **this repository contains a real implementation of the same pattern that the page never cites**.

| Artifact | Public | Provenance | Demonstrates | Does not demonstrate |
| :--- | :--- | :--- | :--- | :--- |
| Flowright WebsiteOps run | **private, external** | none; no provenance block | nothing inspectable | that the gate held. No run ID, log or artifact link. Git history shows no WebsiteOps-authored commit; the article landed inside bulk commit `dc0ca08` |
| `scripts/websiteops-conform.mjs` | **public, in repo** (16,298 bytes) | code | A real staging bridge. Its own header: "It never publishes. It stages; a human promotes, opens a PR, and merges. That merge is the stop sign." | an AI drafting loop, or the Flowright run |
| `scripts/websiteops-publish.mjs` | **public, in repo** (6,392 bytes) | code | Conform plus `lint:content`, `lint:systems` and `verify:covers` gates, then a PR proposal. Never deploys | human review of content quality |
| `npm run blog:conform` / `blog:publish` | **public** | `package.json` | Both scripts are wired as real commands | that any published article went through them |
| Editorial skill step 12, "STAGE VIA WEBSITEOPS" | **public** | `.agents/skills/pruningmypothos-editorial/SKILL.md` | WebsiteOps staging is part of the declared editorial process | that it was followed for any given page |
| `.websiteops/staged/` (21 files) | **gitignored** | n/a | the gates were exercised | anything citable. Mostly rollback and lint test fixtures |
| `public/scenes/hitl-spectrum.html` | public (1,060 bytes) | n/a | a diagram | any oversight outcome |
| Soothsayer | **private** (C5 decision, 2026-09-18) | attested observation only | n/a | not public repository evidence |

- **The `--auto-merge` path matters.** `websiteops-publish.mjs` can squash-merge once CI passes, with the comment "The human decision already happened at the review gate that approved this packet". The stop point **moves** rather than disappearing.
- **Timing.** `websiteops-conform.mjs` is dated 2026-09-11 and the article 2026-07-02, so the page could not have cited it then. It can now.
- **Flowright naming.** `docs/agent-handoff/current.md` records removing all public Flowright references on 2026-06-28, four days before the article published naming it six times. That entry lists `.astro` files, so it belongs to the predecessor site and is a reversed editorial decision rather than a live contradiction. Flowright also sits inside the retired Sans Serif Systems product family.
- **The canonical page has no surviving inbound links.** All seven inbound files are retired, reduced, or inside this cluster: `engineering-bounded-autonomy` (RETIRE), `i-7-cognitive-loop` (REDUCE-TO-NOTE), the in-cluster publishing page, and four Shelf decks.

**Likely canonical page**
- `human-in-the-loop-is-a-system-design-choice`

**Could disappear without losing knowledge**
- Nothing yet. It depends on attestation of the case study.

| Article | Reader question | Basis | Evidence available | Distinct | Overlaps | Density | Freshness | Inbound | Candidate | Merge target | Redirect | Integrity hold | Human decision |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `human-in-the-loop-is-a-system-design-choice` | How much human oversight should a system have, and how do I make it work? | synthesis | WebsiteOps case (unattested) | yes | decision-making-under-uncertainty-in-ai-runtimes | adequate | durable | 7 / 0 | keep-rewrite | | no | YES (P, S) | KEEP-REWRITE (2026-09-19) |
| `ai-website-publishing-with-human-in-the-loop-control` | Can AI help maintain a website without publishing on its own? | unclear | Flowright WebsiteOps run (artifacts not shown) | yes | human-in-the-loop-is-a-system-design-choice | adequate | needs review | 0 / 0 | merge | human-in-the-loop-is-a-system-design-choice | yes | YES (S) | MERGE (2026-09-19) |

**Rationale and notes**

- **human-in-the-loop-is-a-system-design-choice**
  - *Rationale:* Automation bias and "design the interface for scepticism" are distinct and valuable for product people. With the WebsiteOps run as a specimen, the page becomes evidence-led.
  - *Unresolved:* It carries a retrofitted I-7 mapping and the boilerplate link sentence.
- **ai-website-publishing-with-human-in-the-loop-control**
  - *Rationale:* It is the rare page that reports a real run, and it honestly names a limitation (a deterministic fallback generator was used). But nothing is inspectable.
  - *Unresolved:*
    - Attest the run, then add a run record or a log excerpt.
    - Afterwards, decide whether it stays as a short observed field note or becomes the specimen inside the canonical page.
    - Its takeaways contain em dashes.

---

## C7 · How do I know my AI system still works after launch?

> **Closed 2026-09-19.** Six pages become two: `evaluation-is-a-human-problem` (judgment) and `observability-first-ai-systems` (evidence). The other four merge. Do not reopen these decisions in later passes.
>
> One page owns judgment. The other owns evidence about what happened.

**Binding rewrite constraints, recorded 2026-09-19.**

1. **Evaluation versus observability.** Evaluation asks whether behaviour met an expectation. Observability preserves enough evidence to understand what happened. Monitoring watches selected signals over time. Audit preserves evidence under a defined control model. Replay reconstructs recorded state from events, and must not be described as rerunning a stochastic model.
2. **Evaluation page ownership.** `evaluation-is-a-human-problem` owns general eval anatomy, expected behaviour or property, deterministic assertions, human judgment, heuristics, model-based graders, regression sets, the failure to eval feedback loop, and metric-to-decision discipline. Skill-specific testing remains C3.
3. **Observability page ownership.** `observability-first-ai-systems` owns events, traces, tool-call records, failures, timing, policy decisions as recorded evidence, derived metrics, monitoring, drift signals, replay as state reconstruction, and audit as a separate evidence concept.
4. **C4 and C5 seam.** C4 owns parse, schema and semantic validation. C5 owns authorization, execution and immediate effect verification. C7 may consume those outcomes as evidence across runs but must not redefine them. Canonical seam: **C5 owns the act. C7 owns the evidence trail across runs.**
5. **Failure to eval loop.** Preserve: runtime failure, inspect evidence, identify failure mode, add regression case, rerun eval, release. Observability owns the inspection side. Evaluation owns the regression-test side. No page currently owns the whole loop, which is the largest gap in this cluster.
6. **System-prompt governance collision.** Remove the `llm-ops-without-the-buzzwords` framing that treats system prompts as enforceable governance. The closed C3 rule remains authoritative: system prompts influence model behaviour; they do not enforce runtime policy.
7. **Measurement discipline.** Remove unsupported percentages, unattested production claims, undefined composite scores and benchmark-like numbers with no test population. Every retained metric must answer: what is measured, on what population or test set, over what period, how it was produced, and what decision changes if it moves. Do not repair unsupported measurements during disposition.
8. **Evidence.** Soothsayer remains private and is not public repository evidence. DAX may be used only where the public repository at an immutable ref demonstrates event-based state reconstruction, audit posture from structured signals, or tamper-evident ledger verification. State the limitation: those artifacts demonstrate implementation, not overall system quality or eval validity. Do not use the `/dax` product landing page as evidence.
9. **Logging.** Retire "log everything". Prefer: record the smallest set of signals that lets you explain important behaviour later. Preserve the privacy, cost and relevance boundaries the pages already support, including the existing choice to exclude model inputs and outputs from the minimum event record.
10. **Cleanup.** Remove repeated eval definitions, metric lists, dashboard boilerplate, the Act I, II and III scaffolding, Design note and highlight residue, and duplicated observability explanations. Remove the SEO, AEO and GEO non sequitur and the `geo` tag from the observability page. The Newtuple disclosure question stays open and gates the only external evidence in this cluster.

**What the cluster repeats**
- "Evaluation is a loop, not a score" appears in three pages.
- The BLEU and ROUGE critique appears in two.
- Drift is defined three times, in two incompatible frames: classical machine learning retraining versus changes to prompts, providers and data.
- "Log decisions, not only outputs" appears in two.
- A weekly review appears in three.

**Strongest surviving ideas**
- People define what "good" means.
- Keep a fixed failure library and re-score it after every change.
- Rubrics plus an evaluator model that must explain its score.
- Evaluate the decision chain, not only the final answer.
- A minimum record for every step.
- Silent failure is output that stays mostly right while its meaning shifts.

**Where real evidence exists**
- Self: `how-i-run-a-weekly-eval-loop` and `the-weekly-observability-reset` (unattested).
- Shelf notes: `observability-logbook-pattern`.
- The PMP csv-to-eval tool.
- Soothsayer trace fields (unattested).

**Likely canonical pages**
- `evaluation-is-a-human-problem`
- `observability-first-ai-systems`

**Could disappear without losing knowledge**
- `evaluating-non-deterministic-outputs-with-rubric-based-pipelines`
- `evaluation-as-a-runtime-discipline`
- `llm-ops-without-the-buzzwords`
- `drift-decay-and-silent-failure`

| Article | Reader question | Basis | Evidence available | Distinct | Overlaps | Density | Freshness | Inbound | Candidate | Merge target | Redirect | Integrity hold | Human decision |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `evaluation-is-a-human-problem` | How do I tell whether outputs are good for my task? | synthesis | self: weekly eval loop (no provenance block); csv-to-eval tool (lexical assertions only) | yes | evaluating-non-deterministic-outputs-with-rubric-based-pipelines, evaluation-as-a-runtime-discipline | adequate | needs review | 1 / 0 | keep-rewrite | | no | | KEEP-REWRITE (2026-09-19) |
| `evaluating-non-deterministic-outputs-with-rubric-based-pipelines` | How do I test outputs that can be worded many ways? | synthesis | csv-to-eval tool; false proofPoint to be removed | partial | evaluation-is-a-human-problem | adequate | needs review | 0 / 0 | merge | evaluation-is-a-human-problem | yes | YES (S) | MERGE (2026-09-19) |
| `evaluation-as-a-runtime-discipline` | How does a live system know it behaved well on this run? | synthesis | Soothsayer trace fields (private, not public evidence) | partial | observability-first-ai-systems, evaluation-is-a-human-problem | padded | durable | 7 / 0 | merge | evaluation-is-a-human-problem | yes | | MERGE (2026-09-19) |
| `observability-first-ai-systems` | What should I record so I can explain what my system did? | synthesis | DAX public repo at immutable ref (replay, audit posture, ledger); Soothsayer is private and not citable; self: observability reset (no provenance block); shelf logbook note | yes | evaluation-as-a-runtime-discipline, llm-ops-without-the-buzzwords, drift-decay-and-silent-failure | adequate | durable | 12 / 0 | keep-rewrite | | no | YES (P) | KEEP-REWRITE (2026-09-19) |
| `llm-ops-without-the-buzzwords` | What does running an AI app involve beyond uptime? | synthesis | Newtuple benchmark (affiliated; disclosure open) | partial | observability-first-ai-systems, drift-decay-and-silent-failure | adequate | dated | 3 / 0 | merge | observability-first-ai-systems | yes | YES (S) | MERGE (2026-09-19) |
| `drift-decay-and-silent-failure` | Why do AI systems get worse without anyone noticing? | synthesis | self: observability reset (no provenance block) | partial | observability-first-ai-systems, llm-ops-without-the-buzzwords | adequate | dated | 1 / 0 | merge | observability-first-ai-systems | yes | YES (P, S) | MERGE (2026-09-19) |

**Rationale and notes**

- **evaluation-is-a-human-problem**
  - *Rationale:* The clearest evaluation explainer for non-developers. The rubric pipeline becomes its practice section, and the author's weekly eval loop could make it evidence-led.
  - *Unresolved:* The RLHF section describes how labs train models, not how a builder evaluates an application, and readers will conflate the two. MMLU is a dated reference. It contains em dashes.
- **evaluating-non-deterministic-outputs-with-rubric-based-pipelines**
  - *Rationale:* Its practical content (quality dimensions, a golden set, evaluator rationale) fits inside the canonical page.
  - *Unresolved:*
    - "Output will vary on every run due to model temperature and training weights" is wrong: weights do not change between runs.
    - The LLM-as-judge row says "High semantic accuracy" without mentioning judge bias.
    - "100+ pairs" and "a 0.2 drop" have no source.
- **evaluation-as-a-runtime-discipline**
  - *Rationale:* Its distinct point, evaluating the decision chain and keeping an evaluation record, pairs with the observability record rather than with rubrics.
  - *Unresolved:* The merge target could be `evaluation-is-a-human-problem` instead. It is heavily cross-linked and retrofits an I-7 mapping.
- **observability-first-ai-systems**
  - *Rationale:* The canonical page for after launch. Its minimum event list is concrete and matches the Soothsayer diagram field for field.
  - *Unresolved:* "That is why observability is foundational for both SEO/AEO/GEO outcomes" is a non sequitur to remove. "AI incidents are usually boundary failures" is a frequency claim.
- **llm-ops-without-the-buzzwords**
  - *Rationale:* The DevOps versus LLM operations table is a useful orientation for non-developers. The rest is covered by the canonical page.
  - *Unresolved:* The GPT-5 and GPT-4 references and the "(2026)" column header date it. "If you can't measure it, you can't improve it" is a slogan caption. It cites a Newtuple benchmark, which needs the disclosure check.
- **drift-decay-and-silent-failure**
  - *Rationale:* "Silent failure" is a strong idea and should survive as a section.
  - *Unresolved:* The body frames drift as classical machine learning (retraining strategy, held-out test sets), which does not fit readers using hosted models. The actual drift sources for them are provider model updates, prompt edits and changes in the underlying data.

---

## C8 · How do I get from a promising demo to real use?

> **Closed 2026-09-19.** Three pages become **one canonical Systems page**. Do not reopen these decisions in later passes.

**Binding rewrite constraints, recorded 2026-09-19.**

1. **Decisions.** `from-prompt-to-production` is KEEP-REWRITE and canonical, to be retitled later. `why-most-ai-projects-fail-after-the-demo-stage` merges into it. `enterprise-ai-at-scale` is retired and redirects to it. **Do not lock the canonical replacement title during disposition.**
2. **Canonical C8 question.** Record: **C8 decides whether enough evidence and control exist to expose an AI-assisted workflow to its intended users.** Preserve the C9 seam: **C9 keeps work coherent while it continues. C8 decides whether it is fit to face users.**
3. **Deployment is not readiness.** Preserve: **deployment means the software is running; readiness means there is enough evidence and control to justify exposing it to intended use.** Remove any implication that hosting, cloud deployment, organisational size or "scale" itself establishes readiness.
4. **Demo boundary.** Do not preserve "most AI projects fail" or any frequency variant; the title and slug claim is unsupported and disappears with the merge. Preserve the mechanism: **a demo shows that a system can succeed under chosen conditions; readiness asks what happens when those conditions stop being tidy.** The existing demo-illusion material may support that idea.
5. **Readiness conditions.** Preserve only what the archive earns: intended outcome and success criteria, risk and known failure modes, an explicit release criterion, a fallback or stop point, accountable ownership, and adoption or intended-user impact. **Do not fabricate a complete production-readiness checklist.** Record rollback, recovery, cost and latency, and escalation as gaps in the current archive where relevant.
6. **Evaluation threshold.** **Do not preserve `accuracy > 90% on 50 examples` as a reusable readiness rule.** Preserve the mechanism instead: **define an explicit release criterion against an appropriate evaluation set before exposure.** The threshold, population and acceptable failure rate must be task-specific and owned. C7 remains authoritative for evaluation methodology.
7. **Closed-cluster ownership.** C8 consumes but does not reteach: validation (C4), execution controls (C5), meaningful human judgment (C6), evaluation and observability (C7), continuity, state and handoff (C9). C8 owns the assembly judgment: is the system ready for intended use?
8. **Evidence.** The earlier review flag stating that C8 has no evidence without the self essay is **corrected**. `scripts/websiteops-conform.mjs` and `scripts/websiteops-publish.mjs` provide legitimate implementation evidence for a pre-exposure gate: staging, validation and controlled promotion or proposal. Cite them at **immutable repository refs** at rewrite time. They do **not** prove improved quality, reliability or user outcomes. `self/what-i-learned-running-ai-governance` remains **pending attestation**; if attested it may support scoped first-person observations, and it must never support "most AI projects fail" or other general frequency claims.
9. **Enterprise page.** Retire `enterprise-ai-at-scale`. Do not migrate generic "enterprise" or "scale" language. Any useful governance or observability material is already owned by C5 and C7.
10. **Maturity ladders.** Retire the cluster's three overlapping stage ladders. The surviving readiness material is a **set of conditions and questions**, not `prompt -> pilot -> production -> enterprise scale`. No maturity staircase unless each transition corresponds to a defined mechanism and decision.
11. **False proofPoint and boilerplate inbound.** The proofPoint "Referenced in from-ad-hoc-prompts-to-repeatable-agent-workflows.mdx" is **false**, verified at zero occurrences, and is added to the archive-level false-claim register. Separately, record as an archive-level discovery issue: **15 of the 19 inbound links to `from-prompt-to-production` are the pasted boilerplate sentence.** Of the remaining four, two are Shelf decks, one is `tech-stack-for-nlpg-driven-ai-assisted-sdlc` (REDUCE-TO-NOTE) and one is `systems-001-foundations` (undecided). **No surviving canonical Systems page links to it substantively.** A high inbound count is not evidence of conceptual centrality. Carry this into C12, because `systems-001-foundations` is the other target of the same repeated sentence and is inflated the same way.
12. **Cleanup.** During rewrite remove: the "most AI projects fail" frequency framing; the `10x` claim; the calibrated-confidence assumption behind "the AI's confidence score"; "log everything", already retired in C7; Act I, II and III; Design note and highlight boilerplate; decorative scene dependence; generic transformation and enterprise-scale language; the stale NLPg proofPoint; and the six versus seven step inconsistency. **Do not change `featured: true` during disposition**; clear it only if the later rewrite or discovery pass decides the canonical page should no longer be featured.

**What the cluster repeats**
- The production tests: three in one page, four in another, overlapping.
- "Governance first."
- "A demo proves fluency, not readiness."

**Strongest surviving ideas**
- A demo compresses reality into one user, one clean input and one success path.
- A launch checklist a non-technical owner can use: intent, risks, interface, validation, monitoring, fallback.

**Where real evidence exists**

Verified 2026-09-19. C8 does have evidence independent of the self essay.

| Artifact | Public | Immutable ref | Demonstrates | Does not demonstrate | Attestation |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `scripts/websiteops-conform.mjs`, `scripts/websiteops-publish.mjs` | **public, in repo** | yes | A real pre-exposure gate: staging, deterministic validation, and controlled promotion by proposal rather than direct publication | improved quality, reliability or user outcomes | none needed |
| `self/what-i-learned-running-ai-governance` | public, in repo | yes | If attested: scoped first-person observations about governance friction, the autonomy versus control tension, and the auditability versus usability tension | "most AI projects fail" or any general frequency claim. No organisation, period or scale is named | **Required and absent.** Sustained first-person observed claims with no provenance block |
| `enterprise-ai-blueprint-deck` | Shelf | n/a | that a deck exists | any outcome | not evidence |
| `/portfolio/` | route exists | n/a | a portfolio page | any readiness decision | n/a |
| Soothsayer | **private** (C5 decision) | no | n/a | not public repository evidence | n/a |
| `human-fallback-flow.html`, `demo-to-production-gaps.html`, `enterprise-venn.html` | public, about 1.0 to 1.4 KB each | n/a | diagrams | any outcome | n/a |

- **The canonical page can survive even if the self essay is never attested.** The WebsiteOps scripts carry the implementation claim on their own.
- **Six of thirteen readiness conditions are supported by the archive.** Rollback, cost and latency, recovery and escalation are absent and must be recorded as gaps rather than invented.
- **Step count.** The title, description and diagram deliver six steps. The FAQ names a seventh, "Document and version the workflow", which has no section in the body.

**Likely canonical page**
- `from-prompt-to-production`

**Could disappear without losing knowledge**
- `why-most-ai-projects-fail-after-the-demo-stage`
- `enterprise-ai-at-scale`

| Article | Reader question | Basis | Evidence available | Distinct | Overlaps | Density | Freshness | Inbound | Candidate | Merge target | Redirect | Integrity hold | Human decision |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `from-prompt-to-production` | What must I check before putting an AI workflow in front of real users? | synthesis | self: governance at scale (unattested) | yes | why-most-ai-projects-fail-after-the-demo-stage | dense | needs review | 19 / 0 | keep-rewrite | | no | YES (W, S, C) | KEEP-REWRITE (2026-09-19) |
| `why-most-ai-projects-fail-after-the-demo-stage` | Why do pilots stall after a good demo? | synthesis | self: governance at scale (unattested) | partial | enterprise-ai-at-scale, from-prompt-to-production | padded | durable | 2 / 0 | merge | from-prompt-to-production | yes | YES (P) | MERGE (2026-09-19) |
| `enterprise-ai-at-scale` | What does enterprise AI need beyond a prototype? | synthesis | self: governance at scale (unattested) | no | why-most-ai-projects-fail-after-the-demo-stage | padded | durable | 1 / 0 | retire | from-prompt-to-production | yes | YES (C) | RETIRE (2026-09-19) |

**Rationale and notes**

- **from-prompt-to-production**
  - *Rationale:* It explicitly addresses non-technical owners, and the checklist form suits them. "What a demo actually proves" becomes its opening.
  - *Unresolved:*
    - Seven steps are promised and six delivered.
    - "10x" has no source.
    - "The AI's confidence score" implies calibrated confidence that most applications do not have.
    - 15 of its 19 inbound links are boilerplate.
    - It contains em dashes.
- **why-most-ai-projects-fail-after-the-demo-stage**
  - *Rationale:* Its "demo illusion" framing and its failure table are the parts worth moving.
  - *Unresolved:* The title makes a frequency claim. If `what-i-learned-running-ai-governance` is attested, it is the evidence this whole cluster lacks.
- **enterprise-ai-at-scale**
  - *Rationale:* Generic thought leadership that repeats the post-demo page with fewer specifics.
  - *Unresolved:* A deck exists (`enterprise-ai-blueprint-deck`).

---

## C9 · How do I get consistent results when AI does ongoing work?

> **Closed 2026-09-19.** Four pages become **one canonical Systems page and two notes**. Both C10 merges remain pointed at the surviving canonical page, confirming the provisional target recorded under C10 constraint 1. Do not reopen these decisions in later passes.

**Binding rewrite constraints, recorded 2026-09-19.**

1. **Canonical page.** `agent-instructions-and-handoff-as-an-operating-system` is KEEP-REWRITE and canonical. It survives on substance, not on the "operating system" metaphor, which is retired during rewrite. **Do not lock a replacement title here**; that belongs to the rewrite pass. Canonical C9 boundary: **repeatability means preserving the process, state, constraints and checks well enough that work continues coherently even when model outputs vary.** Repeatability does not mean identical model output. The compact mechanism this page owns: **instruction → current state → handoff → check → continue**, where instruction comes from C3, state is what is currently true, a transcript is only the history of what happened, a handoff transfers enough structured state and responsibility to continue, and checks verify the work at meaningful boundaries. Context and memory remain C2 concepts.
2. **Merge.** `from-ad-hoc-prompts-to-repeatable-agent-workflows` merges into the canonical page. Preserve only the useful before-and-after material, after correcting stale counts and removing nonexistent scripts, and the historical fact that the archive once added the same templated scaffolding now being pruned. That contradiction is more interesting than quietly hiding it. **Do not reproduce the old page template in the canonical rewrite.**
3. **C10 inheritance.** Both C10 merges remain pointed at the canonical C9 page. Preserve state versus transcript, the five-element PMP handoff model, payload versus shared keyed store, and the handoff-specific failure modes. Context and memory remain C2-owned.
4. **Evidence.** `docs/agent-handoff/current.md` is the strongest current C9 artifact and demonstrates sustained session continuity. It does **not** prove better outcomes, agent-to-agent coordination, or higher quality. During rewrite, cite it at an **immutable repository ref**, not mutable `current.md`. `AGENTS.md` is not the substantive contract the article describes; identify the actual editorial skill and contract artifact instead. Remove all claims about `report:topics` and `report:gaps`; they do not exist.
5. **NLPg.** `tech-stack-for-nlpg-driven-ai-assisted-sdlc` becomes a note. **Retire `NLPg` as a PMP public acronym and taxonomy.** Do not choose between "Natural Language Programming" and "Natural Language Process Governance"; stop using the overloaded acronym. Preserve the mechanisms: instruction specification, objective, constraints, acceptance criteria, risk category, approval gates, rollback, and the RBAC and Stripe examples. Remove the nonexistent NLPg CLI, the template-repo-as-product framing, and the unsupported operating metrics. Live docs and chrome uses of `NLPg`, `Dual NLP` and "Natural Language Programming Stack" become **structural-cleanup dependencies after archive disposition**, not an immediate erasure of every historical or external use.
6. **I-7.** `i-7-cognitive-loop` becomes a note and keeps its URL. Classify I-7 as **a PMP working method**, not a new standard, not a validated general framework, not a universal systems architecture. Preserve the useful five-minute operating loop. **Do not collapse or redesign the seven stages during disposition**; that is a later rewrite decision. Remove the unsupported "new standard" claim. Resolve the internal stage-order and Norman-mapping inconsistency during rewrite. The `/schema` I-7 section, three Shelf artifacts and `I7LoopInteractive.tsx` are downstream cleanup dependencies.
7. **Workflow terminology.** Where the mechanism is ordinary deterministic automation, call it a **workflow**, not an agent. Everything `from-ad-hoc-prompts` describes (instruction files, handoff discipline, lint scripts, CI, batch execution) is workflow automation; no autonomous step selection appears. Do not equate repeatability with autonomous agent behaviour.
8. **Historical ledger.** `docs/agent-operations/ledger.jsonl` is **not evidence for the current PMP repository**. It records a predecessor Astro site during one short session. Preserve it as a **historical design specimen**, because its record schema (`run_id`, `context_used`, `checks_run`, `evidence`, `human_decision`, `rollback_note`, `lesson_learned`) may be useful during the later C7 rewrite, clearly labelled as historical. Do not treat it as operational evidence.
9. **C9 / C8 seam.** Record: **C9 keeps work coherent while it continues. C8 decides whether it is fit to face users.** `from-prompt-to-production` stays with C8.
10. **Pending evidence.** `self/debugging-multi-agent-systems` remains pending attestation and must not be used as evidence yet.
11. **Cleanup.** During rewrite remove: Act I, II and III scaffolding (six occurrences on each of the four pages), Design note and highlight boilerplate, stale counts, nonexistent scripts and tools, unnecessary framework labels, "handoff memory", "agent operating system", and the duplicate contract, handoff and check explanations told twice in full.

**What the cluster repeats**
- Instruction contract, handoff memory and quality gates are described twice for the same body of work.
- "Language is a contract."
- Two frameworks, I-7 and NLPg, each presented as the method.
- The I-7 framework retrofitted into six other articles.

**Strongest surviving ideas**
- An agent's quality depends on operations, not on the model.
- A handoff file must stay short, dated and operational.
- Keep hard gates narrow.
- Plan and state assumptions before execution.
- An instruction spec with risk level, approval gates and rollback, as shown in the RBAC and Stripe examples.

**Where real evidence exists**

This was recorded in Pass 1 as "the strongest evidence in the whole archive, and it is inspectable today". Verified page by page on 2026-09-19, that is **half true**. One artifact is excellent, one is mislabelled, one belongs to a different repository, and two cited quality gates do not exist.

| Artifact | Status | Proves | Does not prove |
| :--- | :--- | :--- | :--- |
| `docs/agent-handoff/current.md` | **usable, needs pinning** | 1,167 lines of dated entries, each with Summary, Files touched, Decisions, Validation, Open risks, Suggested next actions. Sustained session continuity, and that the five-element handoff model is achievable in practice. | Better outcomes, agent-to-agent coordination, or higher quality. It is a log, not a result. |
| `AGENTS.md` | **mislabelled** | A 17-line, 182-word pointer file. | That it is the substantive instruction contract the article describes. The real contract is the editorial skill. |
| `docs/agent-operations/ledger.jsonl` | **wrong repository** | Five entries inside one 91-minute window on 2026-06-28, all naming `repo: "ShaileshRawat1403/pruning-my-pothos-website"` and touching `.astro` files. | Anything about this repository, which is `pruning-my-pothos`, is Next.js, and contains zero `.astro` files. |
| `lint:systems` | exists | A real gate. | |
| `report:topics`, `report:gaps` | **do not exist** | | `package.json` defines only `report:systems`. Both C9 pages cite all three as working gates. |
| `nlpg` CLI | **does not exist** | | No npm script, no binary, no source. Only `public/scenes/nlpg-swimlane.html`, `nlpg-mindmap.html` and build output. |
| I-7 deck, video, note, `I7LoopInteractive.tsx` | presentation only | That the framework is presented. | That it was ever used. No demonstrated run exists anywhere. |
| `self/debugging-multi-agent-systems` | **pending attestation** | | Must not be used as evidence until attested. |

- The Editorial Contract, its lint gates and tests, and the full git history remain genuine evidence.
- Nothing is pinned or linked from these pages.
- The same history also records what the gates made worse: the template boilerplate listed above.
- **I-7 footprint is ten files, not six:** four Systems pages, three Shelf artifacts, `I7LoopInteractive.tsx` (291 lines), and a titled I-7 section in `/schema` site chrome. Three of the four Systems pages are already retired or merging under closed decisions, so those mentions vanish regardless.
- **NLPg conflict:** `tech-stack` expands it as "Natural Language Process Governance". The competing "Natural Language Programming" expansion survives in `docs/[slug]/page.tsx` and `docs/page.tsx` as "The Natural Language Programming Stack", which six Systems pages link to as "Dual NLP".

**Likely canonical page**
- `agent-instructions-and-handoff-as-an-operating-system`, rebuilt as an evidence-led case study.

**Could disappear without losing knowledge**
- `from-ad-hoc-prompts-to-repeatable-agent-workflows`
- Most of `tech-stack-for-nlpg-driven-ai-assisted-sdlc`

| Article | Reader question | Basis | Evidence available | Distinct | Overlaps | Density | Freshness | Inbound | Candidate | Merge target | Redirect | Integrity hold | Human decision |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `agent-instructions-and-handoff-as-an-operating-system` | How do I get consistent results from agents across sessions? | built | this repository and its history | yes | from-ad-hoc-prompts-to-repeatable-agent-workflows | adequate | dated | 12 / 0 | keep-rewrite | | no | YES (P, S) | KEEP-REWRITE (2026-09-19) |
| `from-ad-hoc-prompts-to-repeatable-agent-workflows` | What changed when this site moved from ad-hoc prompts to contracts and checks? | built | this repository and its history | no | agent-instructions-and-handoff-as-an-operating-system | adequate | dated | 4 / 0 | merge | agent-instructions-and-handoff-as-an-operating-system | yes | YES (S) | MERGE (2026-09-19) |
| `tech-stack-for-nlpg-driven-ai-assisted-sdlc` | How should a team structure AI-assisted software work so changes stay governed? | synthesis | DAX, Verb (unused) | partial | agent-instructions-and-handoff-as-an-operating-system, from-prompt-to-production | padded | needs review | 6 / 0 | reduce-to-note | | no (if URL kept) | YES (P, C) | REDUCE-TO-NOTE (2026-09-19) |
| `i-7-cognitive-loop` | How should a person work with an AI assistant and stay in control? | synthesis | deck, video, interactive component; no demonstrated run | partial | human-in-the-loop-is-a-system-design-choice, from-agent-intent-to-governed-execution | adequate | durable | 9 / 1 | reduce-to-note | | no (if URL kept) | YES (S) | REDUCE-TO-NOTE (2026-09-19) |

**Rationale and notes**

- **agent-instructions-and-handoff-as-an-operating-system**
  - *Rationale:* The work it describes is real and can be inspected in this repository. A rewrite that pins commits and shows the handoff file, the ledger and the gates, and honestly includes what those gates did to article quality, would be the most distinctly PMP page in the archive.
  - *Unresolved:*
    - `report:topics` and `report:gaps` are no longer npm scripts; only `report:systems` remains.
    - The operating model has since moved to Editorial Contract v1.
    - The claims are written as "in this repository" without attestation or pinned references.
- **from-ad-hoc-prompts-to-repeatable-agent-workflows**
  - *Rationale:* It is the same work told a second time. Its before-and-after table is the part worth moving.
  - *Unresolved:*
    - "31 systems docs" is stale; there are now 59.
    - The improvements it reports (callouts, highlights, FAQ, proof blocks) are the scaffolding the doctrine now removes, so the merged page should say so.
    - It contains an "unlocked compounding gains" slogan.
- **tech-stack-for-nlpg-driven-ai-assisted-sdlc**
  - *Rationale:* The instruction spec and the risk gate table are concrete and reusable. The staged plan toward a "SaaS layer", the template repository shape and the `nlpg` command surface read as a product roadmap with no shown implementation.
  - *Unresolved:*
    - Does an `nlpg` tool exist?
    - Do DAX or Verb embody this method? If so, the note could become evidence-led.
    - NLPg is defined inconsistently across pages.
    - Decks exist.
- **i-7-cognitive-loop**
  - *Rationale:* This is the author's signature framework, with a deck, a video, an interactive component and six retrofitted mentions. But no Systems page shows it used on a real task, and "a new standard for Human-AI interaction" is a claim this archive cannot support.
  - *Unresolved:*
    - If the author can show I-7 applied to real work, rewrite it evidence-led and drop "new standard".
    - If not, reduce it to its five-minute run loop, which is genuinely useful.
    - Its Norman mapping table reorders stages inconsistently with the loop order.
    - The six retrofitted mentions elsewhere should be reviewed together with this decision.

---

## C10 · How do several agents hand work to each other?

> **Closed 2026-09-19.** Two pages become **zero canonical pages**. Both merge into `agent-instructions-and-handoff-as-an-operating-system` in C9, which already owns the stronger framing and carries 12 inbound links against the C10 candidate's zero. **Confirmed 2026-09-19 when C9 closed:** the merge target survives as KEEP-REWRITE canonical, so both merges stand as recorded. Do not reopen these decisions in later passes.

**Binding rewrite constraints, recorded 2026-09-19.**

1. **No standalone C10 page.** Both pages merge into the C9 canonical page. The surviving material becomes a section there rather than a separate multi-agent article. Note that the merge target is itself still a C9 candidate (keep-rewrite) and is not yet decided; C9 review confirms or redirects it.
2. **State vocabulary.** Record: **state is what is currently true about the workflow.** Also preserve: **a transcript is a record of what happened, not a statement of what is now true.** C2's definitions of context and memory remain authoritative. Remove the word "memory" from the C10 material wherever the mechanism is actually workflow state or a shared keyed store, including from the surviving page's own title.
3. **Handoff definition is a rewrite boundary, not an archive finding.** Use: **a handoff transfers responsibility plus the minimum information needed for the next actor to continue.** The current pages support only the information half. Ownership of the next step, what "done" means for the sender, what the receiver may change, and how rejection returns upstream are all under-specified or absent. The C9 rewrite must make that distinction explicit rather than presenting it as already established.
4. **Smallest handoff contract.** Five elements found across the two pages, stated fully by neither: what was done, what is currently true, what happens next, constraints, and the failure or fallback path. This is the smallest PMP handoff model derived from this cluster, **not a universal standard**. A confirmation or acknowledgement signal may remain where useful.
5. **Payload versus shared store.** Preserve the distinction between a structured payload passed from one agent to the next, and a shared keyed store both read and write. State explicitly: **a shared store does not by itself define ownership, sequencing, responsibility transfer, or what should be loaded into context.**
6. **Transcript trap.** Preserve "transcript is not state", and the reason a deliberate handoff is needed. Do not reteach C2's context-window placement or lost-in-the-middle material; link instead.
7. **Terminology.** Do not encode a global rule that C5 owns the word "orchestration". Record instead: **prefer the concrete mechanism over the umbrella term.** Where the mechanism is topology, routing, supervision, sequencing or handoff, name it directly. C5 remains authoritative for runtime authorization and execution boundaries. The current pages use coordination and orchestration almost interchangeably, which is the problem this rule addresses.
8. **Failure ownership.** C10-specific failures carry across: missing state, stale state, contradictory state, duplicated work and loops, ownership ambiguity, wrong next actor, artifact not transferred, missing constraint. Link outward rather than absorb: context bloat to C2, execution and cascade containment to C5, trace, audit and replay to C7.
9. **Evidence.** The DAX deck is not evidence that the mechanism works. The "Modeled using the execution parameters in our AI skill design templates" proofPoint is unsupported as worded; that template is a YAML skill definition containing no execution parameters. `docs/agent-handoff/current.md` is a real 60 KB handoff artifact but is **session-to-session, not agent-to-agent**, so it is reserved for C9. `self/debugging-multi-agent-systems` is **pending attestation**: it describes a specific stale-state failure and reads as a genuine personal account rather than a manufactured team incident, but it carries no provenance block and must not be used as evidence until attested.
10. **C9 inheritance.** C9 inherits state versus transcript, explicit handoff, the five-element handoff model, payload versus shared store, and failure ownership. C9 does **not** inherit new definitions of context or memory; those stay with C2. C9 owns the broader question of repeatability across sessions and ongoing work.
11. **Cleanup.** During rewrite remove the duplicated topology tables (two, with different labels for overlapping concepts), repeated handoff explanations, the generic coordination-tax prose restated three times, the Act I, II and III scaffolding (six occurrences on both pages), the Design note and highlight boilerplate, and the unsupported skill-template proofPoint.

**What the cluster repeats**
- Handoff protocols.
- A comparison of topologies (hub-and-spoke, pipeline, shared state) in both pages.

**Strongest surviving ideas**
- Pass structured state, not a transcript.
- A shared store lets each agent read only the keys it needs.
- Validate at every transition.
- Detect agents passing the same task back and forth.

**Where real evidence exists**
- DAX (orchestration project, unused).
- This repository's session handoff file, which is related but covers handoff between sessions rather than between concurrent agents.

**Likely canonical page**
- `managing-state-and-memory-handoffs-in-multi-agent-workflows`

**Could disappear without losing knowledge**
- `agentic-orchestration-coordination`

| Article | Reader question | Basis | Evidence available | Distinct | Overlaps | Density | Freshness | Inbound | Candidate | Merge target | Redirect | Integrity hold | Human decision |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `managing-state-and-memory-handoffs-in-multi-agent-workflows` | How do agents pass work without losing context? | synthesis | DAX (unused); skill-template proofPoint unsupported | partial | agentic-orchestration-coordination, agent-instructions-and-handoff-as-an-operating-system | adequate | durable | 0 / 0 | merge | agent-instructions-and-handoff-as-an-operating-system | yes | | MERGE (2026-09-19) |
| `agentic-orchestration-coordination` | How do multiple agents coordinate without failing? | synthesis | DAX deck (resource, not evidence) | no | managing-state-and-memory-handoffs-in-multi-agent-workflows | padded | durable | 1 / 0 | merge | agent-instructions-and-handoff-as-an-operating-system | yes | | MERGE (2026-09-19) |

**Rationale and notes**

- **managing-state-and-memory-handoffs-in-multi-agent-workflows**
  - *Rationale:* The more concrete of the two pages. The payload versus shared-store distinction is specific enough to act on.
  - *Unresolved:* Multi-agent design is builder-heavy for this audience, so confirm it belongs in the publication at all. It contains an em dash. "Modeled using the execution parameters in our AI skill design templates" is vague.
- **agentic-orchestration-coordination**
  - *Rationale:* Generic, with a meta intro and "the coordination tax" restated several times. Its failure list is the only part worth keeping.
  - *Unresolved:* "This doc is backed by the DAX Agentic Orchestration shared resource": a deck is not evidence.

---

## C11 · How do search and AI answer engines find and cite my work?

> **Closed 2026-09-19.** Five Systems pages become **zero canonical Systems pages, one note and one Shelf reference**. Four of the five pages failed the mission test: if the marketing benefit disappeared, they would not teach how an AI system works. Do not reopen these decisions in later passes.

**Binding rewrite constraints, recorded 2026-09-19.**

1. **The surviving note.** `seo-aeo-geo-in-plain-terms` keeps its URL and becomes a note answering: **what does a publisher actually control in machine-mediated discovery?** Canonical boundary: **publishers can control whether their content is crawlable, canonical, structured and machine-readable. They cannot determine whether an answer engine retrieves it, selects it, uses it in synthesis, or cites it.** It owns crawl access, canonical URLs, sitemap coverage, robots policy, status codes and machine-readable publishing structure, and nothing else.
2. **Page decisions.** Reduce-to-note, merge, retire, retire, move-to-shelf, as recorded in the table and decision log.
3. **SEO, AEO and GEO.** Do not describe SEO itself as the technical mechanism. SEO stays as an established publishing and search practice label where useful. The actual mechanisms are crawl, index, canonicalization, status codes and ranking. AEO and GEO may be mentioned as industry labels, but must not become PMP-owned technical concepts, because the archive establishes neither a mechanism nor an outcome for them.
4. **Citation boundary.** The rewrite must separate **retrievable, selected, used in synthesis, and cited** as four distinct events. Remove claims implying that structured data, page structure, entity consistency or explicit evidence determines citation probability, unless sourced outcome evidence exists.
5. **Evidence discipline.** PMP may cite its own site as **implementation** evidence for FAQPage schema actually emitted, canonical URLs, sitemap, robots policy, status codes, semantic and structured publishing, and `llms.txt` existing. These prove implementation only. They do not prove improved AI visibility, retrieval, ranking, inclusion, citation or attribution. **This cluster has zero outcome evidence for any of those effects**, verified page by page.
6. **False proofPoint.** The DefinedTerm claim on two pages is false: `DefinedTerm` appears only in `scripts/report-main-gaps.mjs`, and there only as a string match, never in rendering code. Remove it. The FAQPage proofPoint is supported as an implementation claim, verified emitting on 158 Systems pages.
7. **llms.txt.** The Systems archive currently makes no llms.txt claim at all. If the note later mentions it, the allowed claim is: PMP publishes a canonical content surface through `llms.txt`. Do not claim that answer engines consume, honour or prefer it.
8. **Glossary.** Moves to Shelf as a reference artifact rather than an essay. Before migration, remove definitions already owned by canonical C1 to C7 pages, and drop the unsupported stability-improves-retrieval claim. Twelve anchors are defined and zero pages link to any of them, so the anchor scheme is not evidence of usefulness. If little survives the pruning, retire rather than keep a mostly empty glossary.
9. **C2 inheritance.** C11 must inherit and never redefine retrieval, chunking, embeddings, lexical, vector and hybrid retrieval, ranking and reranking, grounding, context assembly, and the retrieval-is-not-truth boundary. Any SEO, AEO or GEO material removed from C2 remains candidate material only; this closure does not rescue it.
10. **The old house template.** Recorded as an archive-level finding (see Archive-level flags). Do not migrate the definition-block, answer-block, comparison-table, what-this-changes-in-practice structure into surviving content anywhere.
11. **Cleanup.** During rewrite and redirect work remove unsupported causal claims, citation-probability claims, AEO and GEO optimisation advice, the four repeated pipelines, the Act I, II and III scaffolding (six occurrences on all five pages), the Design note and highlight boilerplate (all five pages), the false DefinedTerm proofPoints, and unsupported outcome language.

**What the cluster repeats**
- "SEO, AEO and GEO are one system with three surfaces" is argued in four pages.
- A crawl → understand → retrieve → cite pipeline appears three times.
- Entity consistency appears in four pages.
- Their proof points are changelog items about PMP itself.

**Strongest surviving ideas**
- A passage has to stand on its own to be retrieved.
- Two pages defining one concept differently weaken both.
- A mention without the right claim context can harm credibility.

**Where real evidence exists**
- PMP itself: `docs/agent-instructions/seo-aeo-geo-core.md`, the indexing and SEO verification scripts, and the site's structured data.
- No outcome data (impressions, citations) is published anywhere.

**Likely canonical page**
- `seo-aeo-geo-in-plain-terms`

**Could disappear without losing knowledge**
- `seo-aeo-geo-how-things-fit-together`
- `aeo-and-geo-as-a-retrieval-design-problem`
- `winning-ai-search-as-a-discoverability-system`

| Article | Reader question | Basis | Evidence available | Distinct | Overlaps | Density | Freshness | Inbound | Candidate | Merge target | Redirect | Integrity hold | Human decision |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `seo-aeo-geo-in-plain-terms` | What does a publisher actually control in machine-mediated discovery? | synthesis | PMP site practice: implementation only, zero outcome data | partial | the other four in this cluster | adequate | needs review | 5 / 0 | reduce-to-note | | no (URL kept) | YES (P) | REDUCE-TO-NOTE (2026-09-19) |
| `seo-aeo-geo-how-things-fit-together` | How do engines find, use and cite a page? | synthesis | FAQPage schema supported (158 pages); DefinedTerm proofPoint false | no | seo-aeo-geo-in-plain-terms, winning-ai-search-as-a-discoverability-system | adequate | needs review | 6 / 0 | merge | seo-aeo-geo-in-plain-terms | yes | YES (W) | MERGE (2026-09-19) |
| `aeo-and-geo-as-a-retrieval-design-problem` | How do I make pages that answer engines retrieve and cite? | synthesis | none; engine internals asserted without source | partial | seo-aeo-geo-in-plain-terms | adequate | needs review | 6 / 0 | retire | seo-aeo-geo-in-plain-terms | yes | YES (P) | RETIRE (2026-09-19) |
| `winning-ai-search-as-a-discoverability-system` | What does winning AI search require? | synthesis | none | no | seo-aeo-geo-how-things-fit-together | padded | needs review | 1 / 0 | retire | seo-aeo-geo-in-plain-terms | yes | YES (P) | RETIRE (2026-09-19) |
| `entity-glossary-for-ai-discoverability` | What do the recurring terms on this site mean? | unclear | 12 anchors defined, zero pages link them; DefinedTerm claim false | partial | aeo-and-geo-as-a-retrieval-design-problem | padded | needs review | 5 / 0 | move-to-shelf | Shelf reference | yes (later) | YES (W, P) | MOVE-TO-SHELF (2026-09-19) |

**Rationale and notes**

- **seo-aeo-geo-in-plain-terms**
  - *Rationale:* The clearest of the five. Its comparison table is the single most useful artifact in the cluster.
  - *Unresolved:*
    - **Mission fit.** Is "how to get cited by AI search" part of "Understand AI by putting it to work", or a marketing sideline? Decide before rewriting.
    - **Outcome data.** If PMP has impression or citation data from its own practice, the page can become evidence-led. If not, it stays synthesis.
    - The claims about how long citation patterns take to change have no source.
- **seo-aeo-geo-how-things-fit-together**
  - *Rationale:* It repeats the canonical page. Its layer list can be absorbed.
  - *Unresolved:* The DefinedTerm proofPoint is not supported by rendering code.
- **aeo-and-geo-as-a-retrieval-design-problem**
  - *Rationale:* Its diagnostic checklist is the part to keep.
  - *Unresolved:*
    - Its "retrieval-ready page pattern" prescribes the article template the doctrine now rejects: a definition block, answer blocks, a comparison table, and an ending titled "what this changes in practice".
    - The canonical page has to reconcile advice for answer engines with doctrine rather than repeat it.
    - "A model may avoid citing either to reduce contradiction risk" is speculation about how engines work internally.
- **winning-ai-search-as-a-discoverability-system**
  - *Rationale:* A third restatement of the same pipeline.
  - *Unresolved:* A deck exists (`winning-ai-search-deck`).
- **entity-glossary-for-ai-discoverability**
  - *Rationale:* Short, stable definitions are useful as a reference. The essay around them repeats the answer-engine argument.
  - *Unresolved:*
    - The DefinedTerm schema claim is not found in rendering code.
    - A public glossary of house vocabulary (orchestration, governance, observability) sits awkwardly with the doctrine rule that house words must be made unnecessary in prose. Decide what a reader glossary is for.

---

## C12 · How do the parts of an AI application fit together?

> **Closed 2026-09-19.** Four pages become **one canonical Systems page and one note**. Do not reopen these decisions in later passes.

**Binding rewrite constraints, recorded 2026-09-19.**

1. **Decisions.** `ai-architecture-explained-how-modern-llm-applications-work` is KEEP-REWRITE and canonical, to be retitled later. `the-intelligence-assembly-model` is retired and redirects to the canonical page. `systems-001-foundations` is reduced to a note, URL kept. `mental-frameworks` is retired. **Do not automatically redirect `mental-frameworks` to the canonical architecture page**; its reader intent is not equivalent. Leave the redirect destination unresolved for the later structural-cleanup pass.
2. **The canonical page is an assembly map, not a new taxonomy.** The survivor must show how already-settled mechanisms connect. **Do not freeze the existing five-layer model as PMP's new architecture vocabulary.** C1 to C9 terminology remains authoritative. Prefer tracing a request through the system and identifying, at each boundary: what enters, what is decided there, what can fail there, and which canonical mechanism owns that failure.
3. **Missing relationship.** Preserve the genuine contribution: **the detailed canonical pages explain individual mechanisms; C12 explains where responsibility transfers between them and which mechanism to inspect when something goes wrong.** That is the reason the canonical page survives.
4. **Vocabulary.** Do not preserve umbrella boxes where concrete mechanisms already exist. Specifically: a "memory layer" must respect C2's memory and context distinction; "orchestration layer" must resolve to concrete mechanisms rather than become another umbrella; an "execution layer" uses C5 terminology; a "control layer" must not collapse C5 authorization and C6 human judgment; a "governance layer" must not collapse C5, C7 and C8; and HITL, HOTL and HOOTL do not return as an organising framework.
5. **Model versus surrounding system.** Record this rewrite boundary: **the model generates candidate outputs; the surrounding system supplies context, validates contracts, controls effects, preserves state, and records and evaluates behaviour.** Do not claim the surrounding system always "decides what happens next", because that phrase crosses the C5 workflow and agent-choice boundary.
6. **Architecture evidence.** The canonical page is **explanatory synthesis**. No current PMP artifact proves the entire proposed architecture. WebsiteOps may illustrate a specific control and publication path only. Soothsayer remains private and cannot serve as public repository evidence. Decks and scene diagrams demonstrate presentation, not implementation.
7. **Intelligence Assembly Model.** Retire the named framework. Preserve only the seam-ownership insight: if responsibility at a boundary is unclear, teams can optimise their own component while the user experiences the failure between components. **Do not preserve the IAM name or the five-box model.**
8. **Systems 001.** Reduce to a note. **Do not create a new named "four systems lenses" framework during disposition.** Preserve only material that survives rewrite scrutiny around boundaries, interfaces and constraints, feedback, drift, Goodhart's law, variety mismatch, and the practical audit questions. Eventual reader question, approximately: **what can systems thinking help me inspect in an AI system?** Remove general-history material, unrelated statistics, digital-twin material, broad documentation theory and already-owned AI terminology. Clear `featured: true` when the reduction is implemented.
9. **False proofPoints.** This review verifies **five false proofPoints inside C12**: three on `systems-001-foundations` ("618 lines" against an actual 574; "glossary anchors for 12 key terms" when zero glossary anchors exist; "used as reference by SEO/AEO/GEO framework docs" when all five C11 pages reference it zero times), one on `the-intelligence-assembly-model`, and one on `mental-frameworks`. The earlier count of six was wrong and is corrected here. See the archive-level register for the systemic finding.
10. **Link inflation.** Preserve the measured finding: `systems-001-foundations` has 21 inbound, 15 boilerplate, 6 substantive and **zero from surviving canonical pages**. **Do not use raw inbound count as a reason for survival.** The canonical architecture page also currently has zero inbound from surviving canonical pages. Later structural cleanup must deliberately rebuild meaningful discovery rather than preserve template-generated links.
11. **Dead outbound links.** The canonical page has 8 outbound links, 4 pointing at merged or reduced pages. Treat as a rewrite and structural-cleanup dependency. Repoint only after canonical destinations are settled.
12. **House-style cleanup.** During later rewrite remove: Act I, II and III; Design note and highlight boilerplate; Systems 001 templating; decorative framework diagrams that add no relationship; coined architecture names; generic "modern AI system" universals; false and circular proofPoints; and any vocabulary that contradicts closed clusters.

**What the cluster repeats**
- Two different five-layer models of the same application.
- "The model is not the system."
- General systems-thinking material (feedback, boundaries, frameworks) that is not specific to AI.

**Strongest surviving ideas**
- The model is where capability enters, not where reliability is created.
- Failures happen at the seams between layers.
- Goodhart's law and variety mismatch as lenses.

**Where real evidence exists**

Verified 2026-09-19. **C12 has no implementation evidence of its own.**

| Artifact | Public | Immutable ref | Implementation or diagram | Demonstrates | Does not demonstrate |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Soothsayer | **private** (C5 decision) | no | n/a | n/a | not public repository evidence |
| `intelligence-assembly-deck` | Shelf | n/a | diagram | that a deck exists | any implementation |
| Five scene iframes (all present, about 1 KB each) | public | n/a | diagram | rendering | that any architecture was built |
| `systems-001-foundations` external citations | public | n/a | literature | that general systems theory is real | anything about AI applications. One reference is labelled "American Heart Association" and links to cdc.gov |
| WebsiteOps scripts (C6, C8) | **public, in repo** | yes | implementation | one real orchestration-to-publication path | the proposed architecture as a whole |

**Boundary recorded:** the architecture page is **explanatory synthesis across mechanisms demonstrated and defined elsewhere**. Individual artifacts may illustrate particular boundaries, but no single PMP artifact proves the whole architecture.

**Link measurements.** No C12 page has a single substantive inbound link from a surviving canonical page:

| Page | Inbound | Boilerplate | Substantive | From surviving canonical |
| :--- | :--- | :--- | :--- | :--- |
| `ai-architecture-explained-how-modern-llm-applications-work` | 2 | 0 | 2 (both C8 pages now merged or retired) | **0** |
| `the-intelligence-assembly-model` | 2 | 1 | 1 (its own deck) | **0** |
| `systems-001-foundations` | 21 | **15** | 6 (four Shelf, one undecided, one reduced) | **0** |
| `mental-frameworks` | 0 | 0 | 0 | **0** |

**Dead outbound.** The canonical page has 8 outbound Systems links, **4 of which point at merged or reduced pages**. `the-intelligence-assembly-model` has 3 of 3 dead. This is a rewrite and structural-cleanup dependency: repoint only after canonical destinations are settled.

**Likely canonical page**
- `ai-architecture-explained-how-modern-llm-applications-work`

**Could disappear without losing knowledge**
- `the-intelligence-assembly-model`
- `mental-frameworks`
- Most of `systems-001-foundations`

| Article | Reader question | Basis | Evidence available | Distinct | Overlaps | Density | Freshness | Inbound | Candidate | Merge target | Redirect | Integrity hold | Human decision |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `ai-architecture-explained-how-modern-llm-applications-work` | What are the parts of an AI application beyond the model? | synthesis | Soothsayer (unattested) | partial | the-intelligence-assembly-model | padded | durable | 2 / 0 | keep-rewrite | | no | YES (P, S) | KEEP-REWRITE (2026-09-19) |
| `the-intelligence-assembly-model` | Why does behaviour depend on more than the model? | synthesis | deck only | no | ai-architecture-explained-how-modern-llm-applications-work, runtime-over-model-why-orchestration-is-the-product | padded | durable | 2 / 0 | retire | ai-architecture-explained-how-modern-llm-applications-work | yes | YES (P) | RETIRE (2026-09-19) |
| `systems-001-foundations` | What general ideas about systems help me reason about AI? | synthesis | external citations | partial | mental-frameworks | padded | durable | 21 / 0 | reduce-to-note | | no (if URL kept) | YES (S) | REDUCE-TO-NOTE (2026-09-19) |
| `mental-frameworks` | What is a mental framework, and how do I keep one honest? | synthesis | none | yes | systems-001-foundations | padded | durable | 0 / 0 | retire | | unresolved, not the architecture page | | RETIRE (2026-09-19) |

**Rationale and notes**

- **ai-architecture-explained-how-modern-llm-applications-work**
  - *Rationale:* A single orientation map is useful for non-developers, and this is the more concrete of the two maps.
  - *Unresolved:* It opens with a meta intro ("This article explains a core component...") and its layer sections are padded. Whether its five layers survive as five should be decided by what the map needs to show, not by the number.
- **the-intelligence-assembly-model**
  - *Rationale:* A coined framework restating the architecture page with a different five layers.
  - *Unresolved:* A deck exists (`intelligence-assembly-deck`).
- **systems-001-foundations**
  - *Rationale:* It is not about AI. It sprawls across a history timeline, heart pumping volume, digital twins and W3C ontologies. A short note on the handful of systems lenses the archive actually uses (boundaries, feedback, Goodhart's law, variety mismatch) would serve readers better.
  - *Unresolved:*
    - Its inbound count is mostly the pasted boilerplate sentence, and that sentence should be removed wherever it appears whatever is decided here.
    - A reference labelled "American Heart Association" links to a CDC page.
    - The "618 lines of canonical taxonomy" proofPoint is self-referential.
    - It contains em dashes.
- **mental-frameworks**
  - *Rationale:* It contains no AI content, and nothing in it is specific to building or using AI.
  - *Unresolved:* The idea could move to `self` as a short reflective note if the author wants to keep it.

---

## C13 · Standalone pages outside the main clusters

> **Closed 2026-09-19.** Two unrelated pages, reviewed independently rather than as a cluster. One survives as canonical, one retires. **This closes disposition review for all 59 Systems pages.** Do not reopen these decisions in later passes.

**Binding rewrite constraints, recorded 2026-09-19.**

1. **In-chat page.** The distinct C13 mechanism is the **interaction surface**. C4, C5, C6, C9 and C12 continue to own validation, execution, judgment, state and assembly. C13 may explain why a text reply and an interactive application surface afford different kinds of parallel state, user choice, bounded interaction and reusable UI components. **Do not expand into MCPUI or WebMCP during disposition.** Record only that the page is a suitable future conceptual home for host-mediated interface work.
2. **Reader outcome.** Rewrite boundary: **after reading this, the reader can decide whether a workflow needs an interactive surface rather than a text reply, and identify what the host and widget layer must provide for that interaction to work safely and reusefully.** **Do not make affordability the canonical promise** unless a cost model is later established; the reuse economics may stay as one argument inside the article, not as its defining claim.
3. **Strip from the in-chat page.** Later remove Act I, II and III; the Design note; highlight boilerplate; the dead outbound link to `engineering-agentic-systems-for-reliability` (MERGE); and the duplicated C5, C6, C7 and C8 production material. Keep the narrow surface and interface argument.
4. **Newtuple.** Recorded as an **archive-wide open evidence question**, not a C13-only constraint. See the Disclosure question under Archive-level flags. **Do not infer affiliation or independence.** The question requires the author's factual confirmation. If affiliated, all four recurring references need appropriate disclosure; if not, treat them as ordinary third-party sources subject to freshness and relevance checks. The in-chat page must not depend on the Newtuple example to survive.
5. **Cloud comparison.** Retires. Do not migrate its provider matrix, service names, pricing and discount posture, or dated 2026 comparisons into canonical Systems content. Redirect to the existing Shelf cloud experiment surface during structural cleanup.
6. **Final archive shape.** Recorded under Final disposition shape in the Summary.
7. **Disposition phase.** Marked **complete**. Do not begin rewrites, redirects or content cleanup yet.

| Article | Reader question | Basis | Evidence available | Distinct | Overlaps | Density | Freshness | Inbound | Candidate | Merge target | Redirect | Integrity hold | Human decision |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `architecture-of-in-chat-ai-apps` | What does it take to put a real app, not a text reply, inside an AI assistant? | inspected | external proof of concept only | yes | none close | dense | needs review | 0 / 0 | keep-strip | | no | YES (S) | KEEP-STRIP (2026-09-19) |
| `cloud-architecture-comparison-2026` | Which cloud should I choose for AI workloads? | inspected | shelf: AWS, Azure and GCP baseline runs (unused) | yes | none close | dense | dated | 1 / 0 | retire | shelf cloud baselines | yes | YES (P) | RETIRE (2026-09-19) |

**Rationale and notes**

- **architecture-of-in-chat-ai-apps**
  - *Rationale:* Distinct, well written, and useful for product people. It needs only the scaffolding removed.
  - *Unresolved:*
    - This area moves quickly (assistant app platforms, interface components over MCP), so freshness needs checking.
    - It cites Newtuple, which needs the disclosure check.
    - "Real-world interface implementations and prototypes are cataloged in our Portfolio" should be verified.
- **cloud-architecture-comparison-2026**
  - *Rationale:* A vendor comparison with a year in its title reads like a benchmark and dates quickly, both outside the publication's stated scope. The author's own first cloud runs on the shelf already hold the real experience.
  - *Unresolved:*
    - The `seoTitle` suggests it may carry search traffic, so check before retiring.
    - The redirect target could be the shelf experiments index or the Azure run note.

---

## Strongest evidence opportunities

1. **This repository.**
   - What exists: `AGENTS.md`, the handoff file, `docs/agent-operations/ledger.jsonl`, the Editorial Contract and its gates, and the git history.
   - Why it matters: it is inspectable now and can be pinned to commits. It also records what the machinery made worse, which is the doctrine's "show what was removed and why" in its most honest form.
   - Where it goes: C9, and the skills playbook in C3.
2. **Soothsayer.**
   - What exists: the author's build note, linked from eight Systems pages and used substantively by none.
   - Why it matters: its diagram labels map directly onto the claims of C5 and C7.
   - First step: attestation.
3. **DAX, Verb and PaneTera.**
   - What exists: real repositories shown on the homepage with pinned commits.
   - Why it matters: no article draws on them, although C5, C9 and C10 all describe the kind of control these projects implement.
4. **The context window stress test.**
   - What exists: a measurement experiment on exactly the topic of `context-windows-as-working-memory`, linked but not used for its results.
5. **PMP's own tools.**
   - What exists: prompt-to-json, csv-to-eval and skill-catalog.
   - Why it matters: they can serve as "try it yourself" specimens for C3, C4 and C7.
6. **Self field notes.**
   - What exists: the weekly eval loop, the observability reset, the schema translation error, the semantic cache miss (Red), multi-agent debugging, and governance at scale.
   - Why it matters: each would make a synthesis page evidence-led once the author attests it.
7. **The shelf cloud baselines.**
   - Why it matters: the real, first-hand replacement for the cloud comparison page.

---

## Hardest ambiguous decisions

1. **One beginner agent page or two.** *Resolved 2026-09-13:* two separate pages. The action boundary lives in `tool-use-when-language-triggers-actions`, and the choice boundary in `ai-agents-vs-ai-workflows`. `skills-vs-prompts-vs-agents` is on HOLD and becomes a term map. See the Decision log.
2. **Which URL anchors the governance cluster.**
   - `from-agent-intent-to-governed-execution` has the most content links and the most concrete body.
   - `engineering-agentic-systems-for-reliability` is the one linked from the homepage.
   - A separate question was whether `policy-governed-mcp-runtimes-for-secure-tool-execution` survives as a security companion. **Resolved 2026-09-20:** it does, on the trust-boundary argument rather than on the sandboxing claim, which is recorded as UNATTESTED and removed from the page.
3. **Which URL anchors the foundations cluster.**
   - `what-an-ai-model-actually-is` has the homepage link and the broader question.
   - `probabilities-not-truth` has the better title, the clearer idea and a search-oriented title.
4. **Whether AI search belongs in PMP.** Five pages sit at the edge of the mission, and their prescribed page pattern contradicts the doctrine. Decide scope before choosing a canonical page.
5. **I-7 and NLPg.**
   - Both are the author's own frameworks, backed by decks, a video and an interactive component, and referenced across the archive.
   - The ledger cannot judge whether they have been used on real work. Only the author can.
6. **`systems-001-foundations`.** It is the most linked page and not about AI. Most of its links are boilerplate, but removing it will feel larger than it is.
7. **The WebsiteOps case study.** It could stay a standalone observed note, or become the specimen inside the human-in-the-loop page. That depends on how much inspectable material the run left behind.
8. **Where runtime evaluation goes.** `evaluation-as-a-runtime-discipline` could merge into evaluation or into observability. Its argument sits between the two.

---

## Prevalence integrity pass

**Date**: 2026-09-13. **Scope**: every match of most, often, usually, generally, commonly, rarely, typically, majority and frequently in the 59 Systems articles, 247 matches on 54 pages. Each match was read in context and classified by meaning, not by keyword. No article was edited.

Quoted claims below are verbatim from the article source with HTML tags and markdown markers removed. They can contain punctuation this ledger otherwise avoids, such as em dashes, because they are quotations.

### Classification

| Class | What it covers | Matches |
| :--- | :--- | :--- |
| Not a prevalence claim | Superlatives and probability ("most probable"), audience self-description, the author's recommended structure, questions, link text, paths, hypotheticals | 106 |
| Supported prevalence claim | The frequency follows from a mechanism the page explains, or matches a documented technical convention | 9 |
| Scoped observation | Bounded to the author's own practice. Still needs attestation. | 1 |
| Unsupported prevalence claim | Frequency asserted about teams, systems, projects, failures or users, with no inspectable support | 131 |

### Result

- **Pages with at least one unsupported prevalence claim:** 40.
- **Newly held by this pass:** 28.
- **Pages on integrity hold after the pass:** 43 of 59, provisional. Integrity pass 2 recalibrated this to 42.
- **Pages not on hold:** 16. They are clean for the nine scanned words only; see the coverage gap below.

### Newly held pages

Pass 2 found only local repairs on 12 of these pages. Two of the 12 went back on hold for other material claims found by the coverage pass.

| Page | Unsupported prevalence claims |
| :--- | :--- |
| `a-simple-tokenizer` | 1 |
| `aeo-and-geo-as-a-retrieval-design-problem` | 5 |
| `agent-instructions-and-handoff-as-an-operating-system` | 4 |
| `ai-architecture-explained-how-modern-llm-applications-work` | 8 |
| `architecture-of-in-chat-ai-apps` | 2 |
| `cloud-architecture-comparison-2026` | 6 |
| `context-windows-as-working-memory` | 2 |
| `designing-reusable-ai-skills` | 3 |
| `drift-decay-and-silent-failure` | 2 |
| `evaluation-as-a-runtime-discipline` | 4 |
| `human-in-the-loop-is-a-system-design-choice` | 1 |
| `intent-architecture-as-a-language-contract` | 2 |
| `knowledge-management-as-runtime-memory` | 3 |
| `llm-ops-without-the-buzzwords` | 1 |
| `managing-state-and-memory-handoffs-in-multi-agent-workflows` | 1 |
| `natural-language-is-the-new-api` | 2 |
| `probabilities-not-truth` | 2 |
| `runtime-over-model-why-orchestration-is-the-product` | 1 |
| `seo-aeo-geo-in-plain-terms` | 5 |
| `skills-vs-prompts-vs-agents` | 1 |
| `structured-output-and-why-it-matters` | 1 |
| `tech-stack-for-nlpg-driven-ai-assisted-sdlc` | 1 |
| `the-intelligence-assembly-model` | 6 |
| `the-logic-void` | 1 |
| `what-a-skill-is-in-ai-systems` | 1 |
| `what-a-system-prompt-actually-is` | 3 |
| `what-an-ai-model-actually-is` | 1 |
| `winning-ai-search-as-a-discoverability-system` | 2 |

### Ambiguous cases for review

*Update 2026-09-13:* Shailesh's decisions on these cases are applied in Integrity pass 2.

These were classified, but a reasonable reviewer could decide differently. Where a different call would change a page's hold, the effect is stated.

1. **Conditional heuristics (15 matches, classified not a prevalence claim).** Sentences shaped like "if X, Y usually follows", where the consequence follows from the mechanism the page describes. Examples: "If a skill can do 'a little bit of everything,' it usually becomes hard to test" (M062) and "A system prompt that keeps accumulating task-specific rules is usually a skill that has not been named yet" (M167). *Effect if reclassified as unsupported:* one more hold, `from-ad-hoc-prompts-to-repeatable-agent-workflows` (M098, "Reversing that order usually creates rework"). Every other page involved is already held.
2. **Superlative efficacy claims (3, classified not a prevalence claim).** "One of the most effective ways to guide the model's output" (M136), "The most effective recovery pattern is the self-repair loop" (M139) and "This is the most reliable method" (M170). They rank methods rather than state frequency, but they still assert something unsupported. *Effect if reclassified:* one more hold, `prompting-is-not-the-skill-you-think-it-is`.
3. **Prescriptive scope (2, classified not a prevalence claim).** "For most teams, a good default looks like this" (M035) and "A compact metadata contract is enough for most teams" (M111). *Effect:* none; both pages are already held.
4. **True but uncited (2, classified unsupported).** "Research shows that models often struggle to pay attention to information in the middle of very long contexts" (M047) matches published research, and "strict human-in-the-loop requirements are often mandated by law" (M103) is plausible. Neither page cites a source. *Effect:* `human-in-the-loop-is-a-system-design-choice` is held on M103 alone, so adding a citation clears it.
5. **One external benchmark generalised (4, classified unsupported).** `why-ocr-quietly-breaks-document-ai` cites one benchmark of four engines, then says one engine "rarely" wins and engines "often" fall behind (M233, M234, M235, M242). The source supports the pattern for that benchmark, not the frequency. *Effect:* none; already held.
6. **Pages held by one low-severity sentence (4).** `what-an-ai-model-actually-is` (M204, "There is often confusion about when a model learns"), `structured-output-and-why-it-matters` (M171, "These techniques are not mutually exclusive and are often combined"), `llm-ops-without-the-buzzwords` (M114, "Governance is often seen as a bottleneck") and `runtime-over-model-why-orchestration-is-the-product` (M142, "Most teams begin with model quality and tool calling"). The rule applies as written, and each clears with a small wording change.
7. **Discourse openers (10, classified unsupported).** Sentences such as "Teams often talk about..." and "People often say..." (M092, M105, M137, M148, M150, M174, M191, M204, M224, M244) assert how common a belief is. They are low stakes, and they are also the template openers the doctrine wants removed. Resolution is usually deleting the sentence.
8. **Unattested scoped observation (1).** M099, "Context often re-established manually", describes this repository's own earlier state in a case study. It is scoped, but not attested. *Effect:* none now; the page is not held, and its other claims already need attestation under C9.
9. **Author's own baseline (1, classified not a prevalence claim).** M036 in the WebsiteOps case, "The missing record usually looks like this", generalises from the author's own context.
10. **Link text and contents copies (6, classified not a prevalence claim).** Four links repeating "Why Most AI Projects Fail After the Demo Stage" (M083 to M086) and two contents entries for "Where teams usually break the chain" (M151, M152) repeat claims already counted at their source. They have to change when those titles change.

### What this pass did not cover

The pass is lexical. Equivalent language without the nine words was not scanned, for example "many teams", "almost always", "tend to", "the common failure" or "predictable". Three examples were noticed in passing, all on pages already held:

- "This is almost always wrong" (`training-vs-inference`)
- "Many teams publish excellent long-form writing" (`aeo-and-geo-as-a-retrieval-design-problem`)
- "Many teams still describe knowledge management as..." (`knowledge-management-as-runtime-memory`)

A second pass over equivalent phrasing is needed before the 16 unheld pages can be called clean.

### Unsupported prevalence claims (131)

Match IDs (M001 to M247) are stable for this snapshot of the archive. Resolution for each claim is one of: source it, scope it to an attested observation, or remove the frequency language.

| Page | ID | Line | Where | Claim | Pass 2 outcome | Resolution |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `a-simple-tokenizer` | M003 | 166 | body | Performance: "Prompt Engineering" is often just finding words that tokenize into patterns the model recognizes more strongly. | Local repair: aside in an implications list | fix during rewrite |
| `aeo-and-geo-as-a-retrieval-design-problem` | M004 | 20 | FAQ | AEO and GEO failures are usually retrieval failures before they are writing failures. | Material blocker: FAQ answer stating the page thesis | rewrite |
| `aeo-and-geo-as-a-retrieval-design-problem` | M005 | 29 | takeaways | AEO and GEO failures are usually retrieval failures before they are writing failures. | Material blocker: key takeaway stating the thesis | rewrite |
| `aeo-and-geo-as-a-retrieval-design-problem` | M006 | 81 | body | Answer and generative systems typically run a sequence: | Material blocker: describes engine internals the whole argument rests on, without a source | source |
| `aeo-and-geo-as-a-retrieval-design-problem` | M007 | 88 | body | This is why AEO and GEO performance often depends more on retrieval architecture than on writing style. | Material blocker: comparative thesis claim | rewrite |
| `aeo-and-geo-as-a-retrieval-design-problem` | M009 | 99 | body | Narrative writing often distributes these properties across multiple paragraphs. | Local repair: supporting observation | fix during rewrite |
| `agent-instructions-and-handoff-as-an-operating-system` | M013 | 47 | body | Most people discover AI agent limits through inconsistency. | Local repair: opener | fix during rewrite |
| `agent-instructions-and-handoff-as-an-operating-system` | M014 | 47 | body | The root problem is rarely model intelligence. | Material blocker: central causal claim | scope to an attested observation |
| `agent-instructions-and-handoff-as-an-operating-system` | M015 | 47 | body | It is usually missing operations: no explicit contract, no continuity memory, and no measurable definition of done. | Material blocker: central causal claim | scope to an attested observation |
| `agent-instructions-and-handoff-as-an-operating-system` | M016 | 95 | body | Prompt-only workflows usually fail for three reasons: | Material blocker: causal claim behind the three recommended components | scope to an attested observation |
| `ai-agents-vs-ai-workflows` | M018 | 22 | short answer | Most reliable production systems are hybrids: they allow the model to choose local steps while a deterministic host runtime enforces permissions, execution limits, approvals, and audit trails. | Material blocker: short answer | rewrite |
| `ai-agents-vs-ai-workflows` | M019 | 104 | FAQ | In production, most useful 'agents' still need workflow-like controls. | Material blocker: FAQ answer | rewrite |
| `ai-agents-vs-ai-workflows` | M020 | 113 | takeaways | Reliable production designs frequently adopt a hybrid model: adaptive reasoning operating inside deterministic boundaries. | Material blocker: key takeaway | rewrite |
| `ai-agents-vs-ai-workflows` | M021 | 116 | body | The phrase "AI agent" has become so broad that it often obscures how systems actually work. | Local repair: opener | fix during rewrite |
| `ai-agents-vs-ai-workflows` | M022 | 159 | body | In production environments, the most reliable systems are rarely pure workflows or unconstrained agents. | Material blocker: central argument | rewrite |
| `ai-agents-vs-ai-workflows` | M023 | 159 | body | In production environments, the most reliable systems are rarely pure workflows or unconstrained agents. | Material blocker: central argument | rewrite |
| `ai-architecture-explained-how-modern-llm-applications-work` | M024 | 21 | FAQ | Most production systems need five layers: model access, knowledge and retrieval, orchestration, interface, and governance. | Material blocker: FAQ answer defining the layers | rewrite |
| `ai-architecture-explained-how-modern-llm-applications-work` | M025 | 30 | takeaways | Reliability usually breaks between layers, especially where policy, context, and execution meet. | Material blocker: key takeaway, causal | rewrite |
| `ai-architecture-explained-how-modern-llm-applications-work` | M027 | 37 | body | Most teams first picture an LLM app as a simple chain: user prompt in, answer out. | Local repair: opener | fix during rewrite |
| `ai-architecture-explained-how-modern-llm-applications-work` | M028 | 41 | body | A modern LLM application usually includes five working layers: the model layer, the retrieval layer, the orchestration layer, the interface layer, and the governance layer. | Material blocker: definition the page is built on | rewrite |
| `ai-architecture-explained-how-modern-llm-applications-work` | M030 | 119 | body | Teams often over-invest here because model catalogs are visible and exciting. | Local repair: aside on team behaviour | fix during rewrite |
| `ai-architecture-explained-how-modern-llm-applications-work` | M031 | 139 | body | This is the layer most "simple" diagrams omit and the one that matters most once the system has to do real work. | Local repair: aside | fix during rewrite |
| `ai-architecture-explained-how-modern-llm-applications-work` | M033 | 141 | body | This is why the runtime is often the real product. | Local repair: slogan; the argument holds without it | fix during rewrite |
| `ai-architecture-explained-how-modern-llm-applications-work` | M034 | 212 | body | Production AI systems usually fail at their seams: | Material blocker: causal claim behind the recommendation | rewrite |
| `architecture-of-in-chat-ai-apps` | M037 | 87 | body | Most teams building for assistants land on one of two shapes. | Local repair: introduces a table that stands without prevalence | fix during rewrite |
| `architecture-of-in-chat-ai-apps` | M039 | 143 | body | It usually runs on mock data, with no live backend behind it. | Local repair: incidental description of a proof of concept | fix during rewrite |
| `cloud-architecture-comparison-2026` | M040 | 272 | body | Networking architecture often decides whether multi-region growth stays simple or becomes fragile. | Local repair: section opener | fix during rewrite |
| `cloud-architecture-comparison-2026` | M041 | 319 | body | Governance-first intent: Azure often reduces policy drift sooner. | Material blocker: reader decision: cloud selection | source |
| `cloud-architecture-comparison-2026` | M042 | 320 | body | Data/AI-first intent: GCP often reduces distance between data and model workflows. | Material blocker: reader decision: cloud selection | source |
| `cloud-architecture-comparison-2026` | M043 | 321 | body | Modularity-first intent: AWS usually provides the widest composition space. | Material blocker: reader decision: cloud selection | source |
| `cloud-architecture-comparison-2026` | M044 | 323 | body | For a student onboarding platform: if identity and compliance stack are Microsoft-centered, Azure is often the fastest institutional fit; if multimodal data and model workflows are core product differentiators, GCP is often the cleaner data-and-AI fit; if scale plus multi-model optionality dominates, AWS can be the strongest builder path. | Material blocker: worked recommendation | source |
| `cloud-architecture-comparison-2026` | M045 | 323 | body | For a student onboarding platform: if identity and compliance stack are Microsoft-centered, Azure is often the fastest institutional fit; if multimodal data and model workflows are core product differentiators, GCP is often the cleaner data-and-AI fit; if scale plus multi-model optionality dominates, AWS can be the strongest builder path. | Material blocker: worked recommendation | source |
| `context-windows-as-working-memory` | M047 | 95 | body | Research shows that models often struggle to pay attention to information in the middle of very long contexts, a phenomenon known as the "lost in the middle" problem. | Material blocker: external research the key takeaway depends on | source |
| `context-windows-as-working-memory` | M048 | 101 | body | Systems often fail because teams keep adding documents while ignoring ordering. | Local repair: supporting; the takeaway rests on M047 | fix during rewrite |
| `decision-making-under-uncertainty-in-ai-runtimes` | M053 | 29 | takeaways | Most AI failures are decision failures under uncertainty, not generation failures. | Material blocker: key takeaway | rewrite |
| `decision-making-under-uncertainty-in-ai-runtimes` | M054 | 34 | body | AI systems rarely fail because the model cannot produce language. | Material blocker: thesis | rewrite |
| `decision-making-under-uncertainty-in-ai-runtimes` | M055 | 34 | body | In production, you are often choosing under time pressure, with ambiguous context, and with real consequences if you are wrong. | Local repair: scene-setting | fix during rewrite |
| `decision-making-under-uncertainty-in-ai-runtimes` | M056 | 81 | body | The gap is usually between proposal and permission: | Material blocker: central causal claim | rewrite |
| `decision-making-under-uncertainty-in-ai-runtimes` | M057 | 89 | body | The hardest part is that weak decisions often look fine at first. | Local repair: supporting | fix during rewrite |
| `designing-reusable-ai-skills` | M060 | 46 | body | Teams often take a successful prompt, save it, call it a skill, and assume the architecture problem is solved. | Local repair: opener | fix during rewrite |
| `designing-reusable-ai-skills` | M061 | 46 | body | Usually it is not. | Local repair: opener | fix during rewrite |
| `designing-reusable-ai-skills` | M067 | 219 | body | The most common failures are predictable: | Local repair: list framing | fix during rewrite |
| `drift-decay-and-silent-failure` | M068 | 76 | body | It is often a side effect of incremental updates, fine-tuning, or changes in other parts of the software ecosystem. | Material blocker: causal definition of model decay | source or rewrite |
| `drift-decay-and-silent-failure` | M070 | 94 | body | These are often the first sign of drift. | Local repair: monitoring aside | fix during rewrite |
| `engineering-agentic-systems-for-reliability` | M072 | 20 | FAQ | Agentic systems fail at boundaries more often than they fail at generation. | Material blocker: FAQ answer, comparative causal | rewrite |
| `engineering-agentic-systems-for-reliability` | M073 | 20 | FAQ | The generation step is usually fine; it's the control around it that breaks. | Material blocker: FAQ answer, causal | rewrite |
| `engineering-agentic-systems-for-reliability` | M074 | 29 | takeaways | Agentic systems fail at boundaries more often than they fail at generation. | Material blocker: key takeaway | rewrite |
| `engineering-agentic-systems-for-reliability` | M077 | 166 | body | The blast-radius idea matters because agentic failures are rarely unique. | Local repair: supporting; the advice stands without it | fix during rewrite |
| `engineering-agentic-systems-for-reliability` | M078 | 168 | body | Teams that rely on informal confidence usually plateau early because every new capability reintroduces the same old ambiguity in a different place. | Local repair: aside on team culture | fix during rewrite |
| `evaluation-as-a-runtime-discipline` | M092 | 33 | body | Teams often talk about evaluation as if it were a separate reporting layer. | Local repair: opener | fix during rewrite |
| `evaluation-as-a-runtime-discipline` | M093 | 80 | body | Post-hoc reviews usually suffer from a timing problem. | Local repair: the argument is structural, not frequency-based | fix during rewrite |
| `evaluation-as-a-runtime-discipline` | M094 | 89 | body | This is why benchmark wins often fail to translate into durable system quality. | Local repair: supporting | fix during rewrite |
| `evaluation-as-a-runtime-discipline` | M096 | 145 | body | Most teams over-measure the third layer and under-measure the first two. | Local repair: the advice stands without it | fix during rewrite |
| `from-agent-intent-to-governed-execution` | M100 | 36 | body | Most agent failures are not caused by low model capability. | Material blocker: thesis | rewrite |
| `from-agent-intent-to-governed-execution` | M102 | 181 | body | Most breakdowns happen at boundaries, not at generation: | Material blocker: central causal claim | rewrite |
| `human-in-the-loop-is-a-system-design-choice` | M103 | 88 | body | In regulated industries like healthcare and aviation, strict human-in-the-loop requirements are often mandated by law. | Material blocker: legal claim | source and scope by jurisdiction |
| `intent-architecture-as-a-language-contract` | M105 | 46 | body | People often say a system should "understand the user's intent." | Local repair: opener | fix during rewrite |
| `intent-architecture-as-a-language-contract` | M107 | 143 | body | Semantic drift usually starts when one layer is missing: | Local repair: the three-layer advice stands without the frequency | fix during rewrite |
| `knowledge-management-as-runtime-memory` | M108 | 99 | body | Large knowledge bases often feel impressive while producing weak outcomes. | Local repair: supporting | fix during rewrite |
| `knowledge-management-as-runtime-memory` | M109 | 101 | body | A small, well-governed knowledge surface usually outperforms a massive, weakly-structured one. | Material blocker: comparative effectiveness behind the recommendation | rewrite |
| `knowledge-management-as-runtime-memory` | M112 | 189 | body | Most knowledge-management regressions are gradual. | Local repair: aside | fix during rewrite |
| `llm-ops-without-the-buzzwords` | M114 | 205 | body | Governance is often seen as a bottleneck—a compliance team saying "no." | Local repair: opener | fix during rewrite |
| `managing-state-and-memory-handoffs-in-multi-agent-workflows` | M115 | 73 | body | The receiving agent often ignores instructions hidden in the middle of the transcript, resulting in execution drift. | Local repair: design advice is risk-based; frequency not needed | fix during rewrite |
| `natural-language-is-the-new-api` | M117 | 147 | body | In deterministic systems, errors are usually syntax violations or logic bugs. | Local repair: contrast setup | fix during rewrite |
| `natural-language-is-the-new-api` | M118 | 147 | body | In probabilistic systems, errors are often semantic misunderstandings. | Local repair: contrast setup | fix during rewrite |
| `observability-first-ai-systems` | M119 | 24 | FAQ | Retrofitting after incidents usually leaves missing rationale and weak comparability across runs. | Material blocker: FAQ answer to a reader decision | rewrite |
| `observability-first-ai-systems` | M120 | 30 | takeaways | AI incidents are usually boundary failures, so your telemetry must be boundary-aware. | Material blocker: key takeaway | rewrite |
| `observability-first-ai-systems` | M121 | 34 | body | Most teams invest early in prompts, models, and tools, then treat observability as a later concern. | Local repair: opener | fix during rewrite |
| `observability-first-ai-systems` | M123 | 86 | body | Teams often measure only output quality because it is easier to evaluate manually. | Local repair: aside | fix during rewrite |
| `observability-first-ai-systems` | M124 | 86 | body | But incidents usually emerge from behavior quality failures: wrong tool execution, missing verification, silent retries, stale context, or policy drift. | Material blocker: central causal claim | rewrite |
| `observability-first-ai-systems` | M125 | 92 | body | Most production issues reduce to three questions: | Local repair: framing | fix during rewrite |
| `observability-first-ai-systems` | M127 | 181 | body | These signals are often early warnings of quality decay before public metrics move. | Local repair: aside | fix during rewrite |
| `policy-governed-mcp-runtimes-for-secure-tool-execution` | M128 | 72 | body | When developers first build agentic loops, they typically bind tool interfaces directly to model prompts. | Local repair: opener | fix during rewrite |
| `probabilities-not-truth` | M132 | 130 | body | Because they are trained on human writing, and humans usually write confidently. | Material blocker: causal answer to the page's main question | source or rewrite |
| `probabilities-not-truth` | M134 | 161 | body | They are often right, but they don't know when they are wrong. | Material blocker: reliability claim readers use to calibrate trust | rewrite |
| `resilient-integration-contracts-for-structured-outputs` | M137 | 40 | body | Teams often talk about prompting language models to output JSON as a solved problem. | Local repair: opener | fix during rewrite |
| `resilient-integration-contracts-for-structured-outputs` | M138 | 80 | body | Treating model output as a guaranteed, deterministic input is one of the most common architectural errors in modern software engineering. | Local repair: hyperbole in framing | fix during rewrite |
| `resilient-integration-contracts-for-structured-outputs` | M140 | 133 | body | Because models are highly responsive to structural feedback, self-repair loops resolve the vast majority of schema errors in a single retry, without requiring human intervention. | Material blocker: quantitative effectiveness claim | source or remove |
| `runtime-over-model-why-orchestration-is-the-product` | M142 | 39 | body | Most teams begin with model quality and tool calling. | Local repair: opener | fix during rewrite |
| `semantic-caching-for-probabilistic-systems` | M144 | 36 | body | Because natural language is fluid, users can ask the same question in infinite ways, meaning the exact same intent rarely arrives as the exact same string. | Material blocker: premise the recommendation depends on | source or scope |
| `semantic-caching-for-probabilistic-systems` | M147 | 163 | body | For most workloads, a threshold between `0.90` and `0.95` is ideal. | Material blocker: quantitative recommendation | source |
| `seo-aeo-geo-how-things-fit-together` | M148 | 33 | body | Teams often treat SEO, AEO, and GEO as separate checklists. | Local repair: opener | fix during rewrite |
| `seo-aeo-geo-in-plain-terms` | M150 | 34 | body | Teams often ask whether SEO is being replaced by AEO or GEO. | Local repair: opener | fix during rewrite |
| `seo-aeo-geo-in-plain-terms` | M153 | 148 | body | Strong GEO outcomes usually come from disciplined source pages, not "AI tricks." | Material blocker: thesis, causal | rewrite |
| `seo-aeo-geo-in-plain-terms` | M154 | 152 | heading | Where teams usually break the chain | Local repair: section heading; the list stands without prevalence | fix during rewrite |
| `seo-aeo-geo-in-plain-terms` | M155 | 154 | body | Most inconsistency comes from content architecture, not algorithm updates. | Material blocker: comparative causal claim behind the recommendation | rewrite |
| `seo-aeo-geo-in-plain-terms` | M156 | 161 | body | Machines usually cannot. | Local repair: aside | fix during rewrite |
| `skills-vs-prompts-vs-agents` | M168 | 214 | body | That is the most common version of this mistake, and it is expensive because the rules become invisible. | Local repair: aside | fix during rewrite |
| `structured-output-and-why-it-matters` | M171 | 165 | body | These techniques are not mutually exclusive and are often combined. | Local repair: aside | fix during rewrite |
| `tech-stack-for-nlpg-driven-ai-assisted-sdlc` | M173 | 151 | body | Most software failures begin before code: ambiguity, hidden assumptions, and unstated constraints. | Material blocker: premise of the method | source or rewrite |
| `the-intelligence-assembly-model` | M174 | 33 | body | People often talk about an AI system as if the model were the whole thing. | Local repair: opener | fix during rewrite |
| `the-intelligence-assembly-model` | M175 | 42 | body | When teams say a model feels "smart" in one workflow and brittle in another, the difference is often assembly, not raw capability. | Material blocker: thesis | rewrite as judgment |
| `the-intelligence-assembly-model` | M178 | 162 | body | That is why assembly design often matters more than adding one more capability. | Material blocker: comparative thesis | rewrite as judgment |
| `the-intelligence-assembly-model` | M179 | 162 | body | A smaller, clearer assembly usually outperforms a busier one because each layer knows what it is responsible for and what evidence the next layer needs. | Material blocker: comparative effectiveness | rewrite as judgment |
| `the-intelligence-assembly-model` | M180 | 168 | body | Assemblies usually break in one of four ways: | Local repair: failure taxonomy stands without frequency | fix during rewrite |
| `the-intelligence-assembly-model` | M181 | 179 | body | The user usually feels this as inconsistency. | Local repair: aside | fix during rewrite |
| `the-logic-void` | M182 | 23 | FAQ | Because systems that do not acknowledge where logic ends often fail silently at the boundaries. | Material blocker: FAQ answer stating the thesis | rewrite |
| `training-vs-inference` | M186 | 19 | FAQ | Most business applications use inference exclusively. | Material blocker: FAQ answer to a reader decision | source |
| `training-vs-inference` | M187 | 21 | FAQ | RAG is usually cheaper and faster to implement. | Material blocker: FAQ answer, comparative | source |
| `training-vs-inference` | M188 | 32 | takeaways | Most business customization happens via Context (RAG), not training. | Material blocker: key takeaway | source |
| `training-vs-inference` | M189 | 76 | body | Most organizations only ever operate in Stage 3. | Material blocker: figure caption repeating a material claim | source |
| `training-vs-inference` | M190 | 85 | body | This page is for teams trying to avoid expensive architectural confusion, and the key decision is usually whether a problem needs better context and retrieval rather than a new model-training effort. | Local repair: audience sentence | fix during rewrite |
| `training-vs-inference` | M191 | 158 | body | Business leaders often say, "We need to train a model on our documents." | Local repair: opener | fix during rewrite |
| `training-vs-inference` | M192 | 160 | body | What they usually mean is: "We need the model to _know_ about our documents." | Local repair: aside | fix during rewrite |
| `what-a-skill-is-in-ai-systems` | M196 | 204 | body | Teams usually misuse skills in three ways: | Local repair: list framing | fix during rewrite |
| `what-a-system-prompt-actually-is` | M197 | 80 | body | Most teams write their first system prompt in about four minutes and then never look at it again. | Local repair: illustrative scenario; the argument does not depend on the frequency (decision 2026-09-13) | frame as illustration during rewrite |
| `what-a-system-prompt-actually-is` | M199 | 145 | body | Most arguments about this are not really about definitions. | Local repair: aside | fix during rewrite |
| `what-a-system-prompt-actually-is` | M201 | 210 | body | It usually is not the model. | Local repair: diagnosis stands with softer wording | fix during rewrite |
| `what-an-ai-model-actually-is` | M204 | 153 | body | There is often confusion about when a model learns. | Local repair: opener | fix during rewrite |
| `why-most-ai-projects-fail-after-the-demo-stage` | M217 | 2 | title | Why Most AI Projects Fail After the Demo Stage | Material blocker: title | rewrite |
| `why-most-ai-projects-fail-after-the-demo-stage` | M218 | 5 | description | Why AI projects often stall after promising demos: weak integration, missing governance, low observability, and unclear adoption design. | Material blocker: description | rewrite |
| `why-most-ai-projects-fail-after-the-demo-stage` | M220 | 21 | FAQ | Projects usually fail when they hit integration debt, governance uncertainty, missing observability, and weak user adoption design. | Material blocker: FAQ answer | rewrite |
| `why-most-ai-projects-fail-after-the-demo-stage` | M221 | 29 | takeaways | Most failures happen in the move from isolated prompt success to workflow-level reliability. | Material blocker: key takeaway | rewrite |
| `why-most-ai-projects-fail-after-the-demo-stage` | M223 | 35 | body | It is most useful for teams trying to move a pilot into real operations, and for leaders who need to understand why model quality alone rarely predicts production value. | Material blocker: central claim for the stated audience | rewrite |
| `why-most-ai-projects-fail-after-the-demo-stage` | M224 | 37 | body | Teams often interpret a strong demo as evidence that the hard part is behind them. | Local repair: opener | fix during rewrite |
| `why-most-ai-projects-fail-after-the-demo-stage` | M225 | 37 | body | In reality, the demo usually proves only one thing: a model can generate a compelling response inside controlled conditions. | Material blocker: thesis | rewrite |
| `why-most-ai-projects-fail-after-the-demo-stage` | M226 | 41 | body | Most AI projects stall because the demo validates model output, while the production environment exposes system debt. | Material blocker: thesis | rewrite |
| `why-most-ai-projects-fail-after-the-demo-stage` | M227 | 41 | body | Once real source systems, policy boundaries, reliability expectations, and user trust enter the picture, the original prototype often has no architecture for handling them. | Local repair: supporting | fix during rewrite |
| `why-most-ai-projects-fail-after-the-demo-stage` | M228 | 103 | body | Most projects only become real when they pass four tests: | Material blocker: central framework | rewrite |
| `why-most-ai-projects-fail-after-the-demo-stage` | M230 | 114 | body | The first strong answer is often the easiest part of the project. | Local repair: caption aside | fix during rewrite |
| `why-most-ai-projects-fail-after-the-demo-stage` | M231 | 121 | body | The prototype usually assumes context is already available in one clean place. | Local repair: supporting | fix during rewrite |
| `why-most-ai-projects-fail-after-the-demo-stage` | M232 | 121 | body | Production rarely looks like that. | Local repair: supporting | fix during rewrite |
| `why-ocr-quietly-breaks-document-ai` | M233 | 21 | proof point | Explains why one engine rarely wins across every document type | Material blocker: proof point overreaching its benchmark | scope to the benchmark |
| `why-ocr-quietly-breaks-document-ai` | M234 | 27 | FAQ | Usually not. | Material blocker: FAQ answer overreaching the benchmark | scope to the benchmark |
| `why-ocr-quietly-breaks-document-ai` | M235 | 27 | FAQ | Engines that lead on clean, structured documents like invoices often fall behind on messy, mixed-layout material, and the reverse also holds. | Material blocker: FAQ answer overreaching the benchmark | scope to the benchmark |
| `why-ocr-quietly-breaks-document-ai` | M236 | 27 | FAQ | Document type changes the ranking more than most teams expect, which is why routing by document type tends to beat standardizing on one engine. | Local repair: the frequency is incidental; the ranking claim is the benchmark's | fix during rewrite |
| `why-ocr-quietly-breaks-document-ai` | M238 | 36 | takeaways | The tokens OCR gets wrong are usually the ones that carry the most meaning: totals, dates, and table relationships. | Material blocker: key takeaway not shown by the benchmark | source or rewrite |
| `why-ocr-quietly-breaks-document-ai` | M240 | 40 | body | Most teams treat OCR as solved plumbing and spend their attention on the model at the end of the chain. | Local repair: opener | fix during rewrite |
| `why-ocr-quietly-breaks-document-ai` | M242 | 88 | body | It usually does not. | Material blocker: benchmark overreach behind the routing advice | scope to the benchmark |
| `winning-ai-search-as-a-discoverability-system` | M244 | 29 | body | Teams often talk about "winning AI search" as if it requires a new playbook detached from SEO. | Local repair: opener | fix during rewrite |
| `winning-ai-search-as-a-discoverability-system` | M247 | 160 | body | The pages that travel best across search and AI surfaces usually share five properties: | Material blocker: comparative effectiveness behind the recommendation | rewrite |

### Other matches (116)

| ID | Page:line | Word | Class | Reason | Excerpt |
| :--- | :--- | :--- | :--- | :--- | :--- |
| M001 | `a-simple-tokenizer`:136 | usually | Not a prevalence claim | illustration or hypothetical | `5421` followed by `892` usually implies a transformation of |
| M002 | `a-simple-tokenizer`:152 | most | Not a prevalence claim | superlative or probability | and iteratively merges the most frequent adjacent pairs until |
| M008 | `aeo-and-geo-as-a-retrieval-design-problem`:92 | usually | Not a prevalence claim | author's recommended structure | A retrievable passage usually has four properties: |
| M010 | `aeo-and-geo-as-a-retrieval-design-problem`:110 | rarely | Supported | documented convention (retrieval works on chunks) | The retrieval unit is rarely the whole page; it |
| M011 | `aeo-and-geo-as-a-retrieval-design-problem`:110 | usually | Supported | documented convention (retrieval works on chunks) | whole page; it is usually a chunk. That means |
| M012 | `aeo-and-geo-as-a-retrieval-design-problem`:199 | usually | Not a prevalence claim | conditional heuristic (flagged) | "no," retrieval quality is usually the bottleneck. |
| M017 | `agentic-orchestration-coordination`:37 | most | Not a prevalence claim | audience or usefulness self-description | It is most useful for teams building |
| M026 | `ai-architecture-explained-how-modern-llm-applications-work`:35 | most | Not a prevalence claim | audience or usefulness self-description | It is most useful for teams moving |
| M029 | `ai-architecture-explained-how-modern-llm-applications-work`:89 | most | Not a prevalence claim | superlative or probability | That model hides most of the work that |
| M032 | `ai-architecture-explained-how-modern-llm-applications-work`:139 | most | Not a prevalence claim | superlative or probability | This is the layer most "simple" diagrams omit and |
| M035 | `ai-architecture-explained-how-modern-llm-applications-work`:223 | most | Not a prevalence claim | prescriptive scope (flagged) | For most teams, a good default |
| M036 | `ai-website-publishing-with-human-in-the-loop-control`:126 | usually | Not a prevalence claim | author's own baseline (flagged) | evidence. The missing record usually looks like this: |
| M038 | `architecture-of-in-chat-ai-apps`:131 | usually | Not a prevalence claim | capability or possibility | same capability layer can usually be delivered through more |
| M046 | `context-window-management-and-retrieval-pruning-strategies`:37 | most | Not a prevalence claim | superlative or probability | ensuring that only the most relevant context is fed |
| M049 | `context-windows-as-working-memory`:117 | most | Not a prevalence claim | superlative or probability | used to find the most relevant information from an |
| M050 | `context-windows-as-working-memory`:119 | usually | Not a prevalence claim | author's recommended structure | A reliable operating loop usually looks like this: |
| M051 | `context-windows-as-working-memory`:132 | most | Not a prevalence claim | superlative or probability | resource and place the most important information at the |
| M052 | `decision-making-under-uncertainty-in-ai-runtimes`:22 | Usually | Not a prevalence claim | capability or possibility | Usually no. The goal is |
| M058 | `decision-making-under-uncertainty-in-ai-runtimes`:104 | usually | Not a prevalence claim | author's recommended structure | different response. Context uncertainty usually needs retrieval or clarification. |
| M059 | `decision-making-under-uncertainty-in-ai-runtimes`:104 | often | Not a prevalence claim | author's recommended structure | stricter constraints. Outcome uncertainty often needs reversible actions or |
| M062 | `designing-reusable-ai-skills`:57 | usually | Not a prevalence claim | conditional heuristic (flagged) | bit of everything," it usually becomes hard to test, |
| M063 | `designing-reusable-ai-skills`:109 | usually | Not a prevalence claim | conditional heuristic (flagged) | output. But that flexibility usually hides a design cost: |
| M064 | `designing-reusable-ai-skills`:171 | often | Not a prevalence claim | structural description | boundaries matter because skills often sit close to execution. |
| M065 | `designing-reusable-ai-skills`:184 | most | Not a prevalence claim | superlative or probability | One of the most important design decisions is |
| M066 | `designing-reusable-ai-skills`:215 | usually | Not a prevalence claim | conditional heuristic (flagged) | that never escalates is usually either trivial or overconfident. |
| M069 | `drift-decay-and-silent-failure`:89 | often | Not a prevalence claim | terminology | outputs. This practice is often called "ML Monitoring" or |
| M071 | `embeddings-explained-like-youre-human`:102 | frequently | Not a prevalence claim | illustration or hypothetical | If the training data frequently associates "doctor" with "he" |
| M075 | `engineering-agentic-systems-for-reliability`:81 | usually | Not a prevalence claim | author's recommended structure | That usually requires four things: |
| M076 | `engineering-agentic-systems-for-reliability`:94 | usually | Not a prevalence claim | conditional heuristic (flagged) | Agentic systems usually hold up better when |
| M079 | `engineering-bounded-autonomy`:72 | most | Not a prevalence claim | audience or usefulness self-description | It is most useful for teams building |
| M080 | `engineering-bounded-autonomy`:78 | most | Not a prevalence claim | illustration or hypothetical | may produce useful outputs most of the time, but |
| M081 | `engineering-bounded-autonomy`:178 | often | Not a prevalence claim | metric or condition wording | how often escalation paths are triggered |
| M082 | `enterprise-ai-at-scale`:41 | most | Not a prevalence claim | audience or usefulness self-description | It is most useful for teams building |
| M083 | `enterprise-ai-at-scale`:148 | Most | Not a prevalence claim | link text or contents copy of a counted claim | See [Why Most AI Projects Fail After |
| M084 | `enterprise-ai-at-scale`:148 | most | Not a prevalence claim | link text or contents copy of a counted claim | See [Why Most AI Projects Fail After |
| M085 | `enterprise-ai-at-scale`:156 | Most | Not a prevalence claim | link text or contents copy of a counted claim | [Why Most AI Projects Fail After |
| M086 | `enterprise-ai-at-scale`:156 | most | Not a prevalence claim | link text or contents copy of a counted claim | [Why Most AI Projects Fail After |
| M087 | `entity-glossary-for-ai-discoverability`:22 | often | Not a prevalence claim | question text | How often should these definitions be |
| M088 | `entity-glossary-for-ai-discoverability`:31 | most | Not a prevalence claim | audience or usefulness self-description | A glossary is most useful when schema, headings, |
| M089 | `entity-glossary-for-ai-discoverability`:44 | usually | Not a prevalence claim | conditional heuristic (flagged) | quality and citation consistency usually degrade. |
| M090 | `entity-glossary-for-ai-discoverability`:79 | often | Not a prevalence claim | capability or possibility | of knowledge. Humans can often infer intent from context; |
| M091 | `evaluation-as-a-runtime-discipline`:28 | most | Not a prevalence claim | audience or usefulness self-description | Evaluation is most useful when it runs |
| M095 | `evaluation-as-a-runtime-discipline`:114 | usually | Not a prevalence claim | author's recommended structure | Useful runtime evaluation usually has three layers. |
| M097 | `evaluation-as-a-runtime-discipline`:184 | usually | Not a prevalence claim | author's recommended structure | Several patterns usually indicate that evaluation is |
| M098 | `from-ad-hoc-prompts-to-repeatable-agent-workflows`:56 | usually | Not a prevalence claim | conditional heuristic (flagged) | content. Reversing that order usually creates rework. |
| M099 | `from-ad-hoc-prompts-to-repeatable-agent-workflows`:155 | often | Scoped observation | this repository's own earlier state; scoped but unattested | Context often re-established manually |
| M101 | `from-agent-intent-to-governed-execution`:114 | usually | Not a prevalence claim | author's recommended structure | A practical orchestration loop usually passes through seven stages. |
| M104 | `human-in-the-loop-is-a-system-design-choice`:96 | most | Not a prevalence claim | superlative or probability | limitations. One of the most significant challenges is "automation |
| M106 | `intent-architecture-as-a-language-contract`:102 | usually | Not a prevalence claim | author's recommended structure | A practical intent architecture usually relies on three contract |
| M110 | `knowledge-management-as-runtime-memory`:119 | usually | Not a prevalence claim | author's recommended structure | system for AI operations usually has four layers. |
| M111 | `knowledge-management-as-runtime-memory`:159 | most | Not a prevalence claim | prescriptive scope (flagged) | contract is enough for most teams: |
| M113 | `llm-ops-without-the-buzzwords`:22 | typically | Supported | follows from the mechanism (model-graded evals make model calls) | exact matches. Evals are typically slower and less deterministic |
| M116 | `natural-language-is-the-new-api`:118 | most | Not a prevalence claim | superlative or probability | a database for the most |
| M122 | `observability-first-ai-systems`:34 | usually | Not a prevalence claim | conditional heuristic (flagged) | feels efficient, but it usually creates blind spots that |
| M126 | `observability-first-ai-systems`:98 | usually | Not a prevalence claim | conditional heuristic (flagged) | response becomes guesswork. Guesswork usually leads to fragile patches |
| M129 | `probabilities-not-truth`:6 | most | Not a prevalence claim | superlative or probability | Language models return the most probable continuation, not the |
| M130 | `probabilities-not-truth`:20 | most | Not a prevalence claim | superlative or probability | A model generates the most probable continuation regardless of |
| M131 | `probabilities-not-truth`:90 | most | Not a prevalence claim | superlative or probability | which words are statistically most likely to follow the |
| M133 | `probabilities-not-truth`:135 | most | Not a prevalence claim | superlative or probability | ask a question, the most probable continuation is a |
| M135 | `prompting-is-not-the-skill-you-think-it-is`:88 | most | Not a prevalence claim | superlative or probability | is to predict the most probable sequence of tokens |
| M136 | `prompting-is-not-the-skill-you-think-it-is`:106 | most | Not a prevalence claim | superlative efficacy claim (flagged) | is one of the most effective ways to guide |
| M139 | `resilient-integration-contracts-for-structured-outputs`:131 | most | Not a prevalence claim | superlative efficacy claim (flagged) | The most effective recovery pattern is |
| M141 | `retrieval-augmented-generation-in-plain-terms`:94 | most | Not a prevalence claim | superlative or probability | document chunks with the most similar embeddings. These are |
| M143 | `runtime-over-model-why-orchestration-is-the-product`:90 | usually | Not a prevalence claim | author's recommended structure | A stable orchestration system usually enforces four constraints: |
| M145 | `semantic-caching-for-probabilistic-systems`:95 | typically | Supported | documented convention (cosine similarity) | computes the distance (typically cosine similarity) between the query |
| M146 | `semantic-caching-for-probabilistic-systems`:158 | most | Not a prevalence claim | superlative or probability | threshold is the single most sensitive decision in semantic |
| M149 | `seo-aeo-geo-how-things-fit-together`:152 | often | Supported | follows from the design of answer engines | engines, your page is often not shown first as |
| M151 | `seo-aeo-geo-in-plain-terms`:63 | usually | Not a prevalence claim | link text or contents copy of a counted claim | Where teams usually break the chain |
| M152 | `seo-aeo-geo-in-plain-terms`:63 | usually | Not a prevalence claim | link text or contents copy of a counted claim | Where teams usually break the chain |
| M157 | `skill-evaluation-and-versioning`:46 | often | Not a prevalence claim | capability or possibility | its blast radius is often local. A skill is |
| M158 | `skill-evaluation-and-versioning`:110 | most | Not a prevalence claim | superlative or probability | The most useful test set usually |
| M159 | `skill-evaluation-and-versioning`:110 | usually | Not a prevalence claim | author's recommended structure | most useful test set usually includes: |
| M160 | `skill-evaluation-and-versioning`:162 | often | Not a prevalence claim | metric or condition wording | escalation happens less often when risk is unchanged |
| M161 | `skill-evaluation-and-versioning`:203 | usually | Not a prevalence claim | author's recommended structure | Rollback is usually appropriate when: |
| M162 | `skill-evaluation-and-versioning`:215 | often | Not a prevalence claim | author's recommended structure | Several patterns often indicate that a skill |
| M163 | `skills-vs-prompts-vs-agents`:79 | often | Not a prevalence claim | structural description | workflow coordinates several steps, often including multiple skills. |
| M164 | `skills-vs-prompts-vs-agents`:84 | usually | Not a prevalence claim | conditional heuristic (flagged) | the layer correctly, it usually cannot govern or improve |
| M165 | `skills-vs-prompts-vs-agents`:93 | usually | Not a prevalence claim | conditional heuristic (flagged) | begins, the system is usually harder to debug, evaluate, |
| M166 | `skills-vs-prompts-vs-agents`:134 | often | Not a prevalence claim | structural description | workflows are often described in language |
| M167 | `skills-vs-prompts-vs-agents`:214 | usually | Not a prevalence claim | conditional heuristic (flagged) | accumulating task-specific rules is usually a skill that has |
| M169 | `structured-output-and-why-it-matters`:161 | often | Supported | documented convention (JSON mode tied to tool calling in APIs) | JSON object. This is often tied to tool use |
| M170 | `structured-output-and-why-it-matters`:163 | most | Not a prevalence claim | superlative efficacy claim (flagged) | code. This is the most reliable method. |
| M172 | `systems-001-foundations`:244 | Most | Supported | supported by the systems theory source the page cites | Most real systems are open; |
| M176 | `the-intelligence-assembly-model`:89 | usually | Not a prevalence claim | author judgment | That second frame is usually more useful once the |
| M177 | `the-intelligence-assembly-model`:95 | usually | Not a prevalence claim | author's recommended structure | A practical intelligence assembly usually combines five layers: |
| M183 | `the-logic-void`:72 | most | Not a prevalence claim | audience or usefulness self-description | It is most useful for teams building |
| M184 | `the-logic-void`:86 | most | Not a prevalence claim | superlative or probability | Design note. The most dangerous moment in an |
| M185 | `tool-use-when-language-triggers-actions`:105 | most | Not a prevalence claim | superlative or probability | is the part worth most of your attention. |
| M193 | `what-a-skill-is-in-ai-systems`:173 | usually | Not a prevalence claim | author's recommended structure | A useful skill usually contains: |
| M194 | `what-a-skill-is-in-ai-systems`:191 | usually | Not a prevalence claim | author's recommended structure | A task usually deserves skill status when: |
| M195 | `what-a-skill-is-in-ai-systems`:193 | often | Not a prevalence claim | metric or condition wording | it happens often enough to justify reuse |
| M198 | `what-a-system-prompt-actually-is`:124 | often | Supported | follows from the mechanism (resident on every turn) | the model far more often than it is read |
| M200 | `what-a-system-prompt-actually-is`:145 | usually | Not a prevalence claim | conditional heuristic (flagged) | and the answer is usually immediate. |
| M202 | `what-an-ai-model-actually-is`:85 | often | Not a prevalence claim | illustration or hypothetical | It knows that "blue" often follows "sky is". |
| M203 | `what-an-ai-model-actually-is`:135 | most | Not a prevalence claim | superlative or probability | the text that is most likely to follow your |
| M205 | `what-an-ai-model-actually-is`:176 | most | Not a prevalence claim | superlative or probability | the desired output the most likely. |
| M206 | `what-llms-are-optimized-for`:19 | most | Not a prevalence claim | superlative or probability | intent. They generate the most statistically probable continuation of |
| M207 | `what-llms-are-optimized-for`:21 | most | Not a prevalence claim | superlative or probability | text, and when the most probable continuation includes plausible-sounding |
| M208 | `what-llms-are-optimized-for`:33 | most | Not a prevalence claim | superlative or probability | simple goal: predicting the most probable next token in |
| M209 | `what-llms-are-optimized-for`:33 | most | Not a prevalence claim | superlative or probability | simple goal: predicting the most probable next token in |
| M210 | `what-llms-are-optimized-for`:75 | most | Not a prevalence claim | superlative or probability | the token that is most likely to come next. |
| M211 | `what-llms-are-optimized-for`:81 | most | Not a prevalence claim | superlative or probability | is to find the most statistically likely token to |
| M212 | `what-llms-are-optimized-for`:90 | most | Not a prevalence claim | superlative or probability | completes it with the most plausible-sounding text it can |
| M213 | `what-llms-are-optimized-for`:98 | most | Not a prevalence claim | superlative or probability | trying to find the most plausible continuation of your |
| M214 | `what-llms-are-optimized-for`:100 | most | Not a prevalence claim | superlative or probability | the desired output the most probable one. |
| M215 | `what-llms-are-optimized-for`:102 | usually | Supported | follows from the mechanism (lower sampling variance) | plus strict output constraints usually produce more stable results |
| M216 | `what-llms-are-optimized-for`:108 | most | Not a prevalence claim | superlative or probability | ask "Is this the most useful completion of my |
| M219 | `why-most-ai-projects-fail-after-the-demo-stage`:7 | most | Not a prevalence claim | file path | heroImage: '/covers/systems/why-most-ai-projects-fail-after-the-demo-stage.svg' |
| M222 | `why-most-ai-projects-fail-after-the-demo-stage`:35 | most | Not a prevalence claim | audience or usefulness self-description | It is most useful for teams trying |
| M229 | `why-most-ai-projects-fail-after-the-demo-stage`:110 | often | Not a prevalence claim | conditional heuristic (flagged) | these fail, the project often stays trapped in pilot |
| M237 | `why-ocr-quietly-breaks-document-ai`:28 | often | Not a prevalence claim | question text | How often should a document pipeline |
| M239 | `why-ocr-quietly-breaks-document-ai`:36 | most | Not a prevalence claim | superlative or probability | ones that carry the most meaning: totals, dates, and |
| M241 | `why-ocr-quietly-breaks-document-ai`:80 | most | Not a prevalence claim | superlative or probability | tokens that carry the most meaning: totals, dates, labels, |
| M243 | `why-ocr-quietly-breaks-document-ai`:118 | most | Not a prevalence claim | superlative or probability | The most consistent all-rounder, as a |
| M245 | `winning-ai-search-as-a-discoverability-system`:42 | usually | Not a prevalence claim | conditional heuristic (flagged) | one sentence, it will usually be harder for both |
| M246 | `winning-ai-search-as-a-discoverability-system`:146 | usually | Not a prevalence claim | author's recommended structure | That usually means: |

---

## Integrity pass 2: material claim calibration

**Date**: 2026-09-13. **Scope**: the 131 unsupported prevalence claims, 22 previously excluded or borderline matches, the 8 Pass 1 claims of work or measurement, and a semantic coverage pass across all 59 Systems pages. No article was edited.

### Result

| Measure | Count |
| :--- | :--- |
| Provisional holds before calibration | 43 |
| Holds after calibration and coverage | 42 |
| Material blockers among the 131 unsupported claims | 67 |
| Material blockers among reviewed exclusions | 7 |
| Material blockers from semantic coverage | 27 |
| Pass 1 claims of work or measurement, re-checked and still material | 8 |
| Local claim repairs | 79 (64 from the 131, 15 from reviewed exclusions) |
| Pages removed from hold | 10 |
| Pages newly placed on hold | 9 |
| Pages still held on a different basis | 3 |

*Adjusted the same day by [Review decisions applied](#review-decisions-applied) to 46 pages on hold.*

The outcome for each of the 131 claims is in the Pass 2 outcome column of the [unsupported prevalence claims table](#unsupported-prevalence-claims-131). The 8 Pass 1 claims all concern measured results, implementation or evidence shown to readers (proof points render on the page as "Practical takeaways"), so all 8 remain material.

### Hold changes

| Page | Before | After | Why |
| :--- | :--- | :--- | :--- |
| `a-simple-tokenizer` | held | not held | Its only unsupported claim (M003) is a local repair. |
| `designing-reusable-ai-skills` | held | not held | M060, M061 and M067 are local repairs; conditional heuristics M062, M063 and M066 follow from the mechanism described. |
| `evaluation-as-a-runtime-discipline` | held | not held | M092 to M096 are local repairs; the argument is structural, not frequency-based. |
| `intent-architecture-as-a-language-contract` | held | not held | M105 and M107 are local repairs. |
| `managing-state-and-memory-handoffs-in-multi-agent-workflows` | held | not held | M115 is a local repair; the design advice is risk-based. Its comparison table is treated as design reasoning (ambiguous case 8). |
| `natural-language-is-the-new-api` | held | not held | M117 and M118 are local repairs. Its factual error and argued title are open questions (ambiguous cases 1 and 2). |
| `runtime-over-model-why-orchestration-is-the-product` | held | not held | M142 is a local repair. Its thesis and FAQ contradiction are open questions (ambiguous cases 2 and 3). |
| `skills-vs-prompts-vs-agents` | held | not held | M168 is a local repair; heuristics M164, M165 and M167 can be reframed as judgment. The human decision HOLD (term map) is unaffected. |
| `what-a-skill-is-in-ai-systems` | held | not held | M196 is a local repair. A naming error is an open question (ambiguous case 1). |
| `what-an-ai-model-actually-is` | held | not held | M204 is a local repair. |
| `ai-website-publishing-with-human-in-the-loop-control` | not held | held | Coverage: the run it reports is its entire evidence, with no artifact and no attestation. |
| `engineering-bounded-autonomy` | not held | held | Coverage: a safety guarantee stated as fact in an FAQ answer. |
| `evaluating-non-deterministic-outputs-with-rubric-based-pipelines` | not held | held | Coverage: rates LLM-as-a-judge as highly accurate without support. |
| `from-ad-hoc-prompts-to-repeatable-agent-workflows` | not held | held | Coverage: stale, uninspectable measured results and a tool that is not an npm script. |
| `i-7-cognitive-loop` | not held | held | Coverage: the title claims "a new standard". |
| `prompting-is-not-the-skill-you-think-it-is` | not held | held | M136, a comparative effectiveness claim that drives the few-shot recommendation. |
| `retrieval-augmented-generation-in-plain-terms` | not held | held | Coverage: the key takeaway "RAG reduces hallucinations" cites no research. |
| `systems-001-foundations` | not held | held | Coverage: a legal requirement attributed partly to a voluntary framework, and a proof point claiming glossary anchors that do not exist. |
| `what-llms-are-optimized-for` | not held | held | Coverage: an unsourced FAQ claim about how model scale affects truthfulness. |
| `architecture-of-in-chat-ai-apps` | held | held, new basis | M037 and M039 are now local repairs. Held for coverage findings: a causal takeaway generalised from one proof of concept, and an unsupported portfolio claim. |
| `llm-ops-without-the-buzzwords` | held | held, new basis | M114 is now a local repair. Held for coverage findings: "Evaluation replaces deterministic unit testing" and "you cannot deploy an AI system without an Evaluation Suite". |
| `structured-output-and-why-it-matters` | held | held, new basis | M171 is now a local repair. Held for M170 ("the most reliable method") and the takeaway "structured output is reliable". |

### Reviewed exclusions (22)

Matches that Pass 1 classified as not a prevalence claim, or as a scoped observation, re-judged under the materiality test.

| ID | Page | Line | Pass 1 class | Pass 2 outcome | Resolution | Claim |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| M012 | `aeo-and-geo-as-a-retrieval-design-problem` | 199 | conditional heuristic | Material blocker: diagnostic rule in the reader checklist | rewrite | When answers are mostly "no," retrieval quality is usually the bottleneck. |
| M035 | `ai-architecture-explained-how-modern-llm-applications-work` | 223 | prescriptive scope | Local repair: recommendation scope; reframe as judgment | fix during rewrite | For most teams, a good default looks like this: |
| M036 | `ai-website-publishing-with-human-in-the-loop-control` | 126 | author's own baseline | Local repair: incidental generalisation from the author's own context | fix during rewrite | The missing record usually looks like this: |
| M062 | `designing-reusable-ai-skills` | 57 | conditional heuristic | Local repair: consequence follows from the mechanism described | fix during rewrite | If a skill can do "a little bit of everything," it usually becomes hard to test, hard to version, and hard to trust. |
| M063 | `designing-reusable-ai-skills` | 109 | conditional heuristic | Local repair: consequence follows from the mechanism described | fix during rewrite | But that flexibility usually hides a design cost: |
| M066 | `designing-reusable-ai-skills` | 215 | conditional heuristic | Local repair: aphorism; reframe as judgment | fix during rewrite | A skill that never escalates is usually either trivial or overconfident. |
| M076 | `engineering-agentic-systems-for-reliability` | 94 | conditional heuristic | Material blocker: comparative reliability claim behind the four-boundary model | rewrite as judgment or source | Agentic systems usually hold up better when they enforce four boundaries: |
| M089 | `entity-glossary-for-ai-discoverability` | 44 | conditional heuristic | Material blocker: engine-behaviour claim that justifies the glossary | source or rewrite | If the core term changes every month, retrieval quality and citation consistency usually degrade. |
| M098 | `from-ad-hoc-prompts-to-repeatable-agent-workflows` | 56 | conditional heuristic | Local repair: case-study lesson; scope or reframe | fix during rewrite | Reversing that order usually creates rework. |
| M099 | `from-ad-hoc-prompts-to-repeatable-agent-workflows` | 155 | scoped observation (unattested) | Local repair: article does not depend on it; attest or remove | attest or remove | Context often re-established manually |
| M111 | `knowledge-management-as-runtime-memory` | 159 | prescriptive scope | Local repair: recommendation scope; reframe as judgment | fix during rewrite | A compact metadata contract is enough for most teams: |
| M122 | `observability-first-ai-systems` | 34 | conditional heuristic | Local repair: consequence follows from the mechanism described | fix during rewrite | That sequence feels efficient, but it usually creates blind spots that are expensive to unwind. |
| M126 | `observability-first-ai-systems` | 98 | conditional heuristic | Local repair: aside | fix during rewrite | Guesswork usually leads to fragile patches that hide root causes. |
| M136 | `prompting-is-not-the-skill-you-think-it-is` | 106 | superlative efficacy | Material blocker: comparative effectiveness claim driving the few-shot recommendation | source or frame as judgment | This is one of the most effective ways to guide the model's output, as it learns the pattern directly from your examples. |
| M139 | `resilient-integration-contracts-for-structured-outputs` | 131 | superlative efficacy | Material blocker: comparative effectiveness claim for self-repair | source or frame as judgment | The most effective recovery pattern is the self-repair loop. |
| M164 | `skills-vs-prompts-vs-agents` | 84 | conditional heuristic | Local repair: reframe as judgment | fix during rewrite | If the team cannot name the layer correctly, it usually cannot govern or improve it correctly either. |
| M165 | `skills-vs-prompts-vs-agents` | 93 | conditional heuristic | Local repair: consequence follows from the mechanism described | fix during rewrite | If you cannot point to where the prompt ends and the runtime begins, the system is usually harder to debug, evaluate, and scale. |
| M167 | `skills-vs-prompts-vs-agents` | 214 | conditional heuristic | Local repair: heuristic; reframe as judgment | fix during rewrite | A system prompt that keeps accumulating task-specific rules is usually a skill that has not been named yet. |
| M170 | `structured-output-and-why-it-matters` | 163 | superlative efficacy | Material blocker: comparative reliability claim that conflicts with the page's own boundary | source or rewrite | This is the most reliable method. |
| M200 | `what-a-system-prompt-actually-is` | 145 | conditional heuristic | Local repair: aside | fix during rewrite | Run it through the test above and the answer is usually immediate. |
| M229 | `why-most-ai-projects-fail-after-the-demo-stage` | 110 | conditional heuristic | Local repair: follows from the four tests | fix during rewrite | If any of these fail, the project often stays trapped in pilot mode. |
| M245 | `winning-ai-search-as-a-discoverability-system` | 42 | conditional heuristic | Material blocker: engine-behaviour claim behind page-design advice | source or rewrite | If a page cannot be summarized cleanly in one sentence, it will usually be harder for both ranking systems and retrieval systems to trust. |

### Semantic coverage findings (27)

Material strong claims the nine-word search could not catch, found by reading for claim types. Low-value rhetorical matches are not recorded. Claims are verbatim, with markdown markup removed where noted by context.

| Type | Page | Line | Where | Claim | Why it is material | Resolution | Hold effect |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| comparative / superlative | `evaluating-non-deterministic-outputs-with-rubric-based-pipelines` | 125 | table cell | Rubric-Based (LLM-as-a-Judge), Semantic Accuracy column: High (Captures intent and facts) | Rates an evaluation method as highly accurate in the table readers use to choose one; evaluator-model bias is documented and not mentioned | source or rewrite | newly held |
| comparative / superlative | `what-llms-are-optimized-for` | 23 | FAQ | Scaling improves pattern matching and generates more fluent text, but it does not make models inherently more truthful. Larger models are better at mimicking correct answers but can also mimic incorrect answers more persuasively. | FAQ answer on whether bigger models are more reliable; a research-style claim with no source | source or rewrite | newly held |
| comparative / superlative | `probabilities-not-truth` | 161 | body | Current models are high-accuracy but low-trustworthiness. | Reliability claim about all current models, in the section readers use to calibrate trust | rewrite | already held |
| comparative / superlative | `structured-output-and-why-it-matters` | 51 | takeaways | Free text is readable; structured output is reliable. | Key takeaway that contradicts the page's own boundary | rewrite | already held |
| comparative / superlative | `drift-decay-and-silent-failure` | 33 | body | This silent failure is one of the greatest operational risks in production AI. | Sets the reader's risk belief for the whole page | source or rewrite | already held |
| causal | `architecture-of-in-chat-ai-apps` | 34 | takeaways | In-chat apps work because they reuse one shared widget layer across different tasks, not because each app is custom-built. | Causal key takeaway generalised from one external proof of concept | scope to the source | newly held (basis changed) |
| universal / necessity | `i-7-cognitive-loop` | 2 | title | I-7 Cognitive Loop: A new standard for Human-AI interaction | Title claims standard status; no adoption or real use is shown | rewrite title | newly held |
| universal / necessity | `engineering-bounded-autonomy` | 25 | FAQ | Bounded autonomy is reliable because the system cannot act outside its safe operating envelope. | Safety guarantee stated as fact in an FAQ answer | rewrite | newly held |
| universal / necessity | `llm-ops-without-the-buzzwords` | 30 | takeaways | Evaluation replaces deterministic unit testing as the primary confidence mechanism. | Key takeaway, repeated in the FAQ (line 22), that misstates practice; deterministic tests still apply to the code around a model | rewrite | newly held (basis changed) |
| universal / necessity | `llm-ops-without-the-buzzwords` | 160 | body | In 2026, you cannot deploy an AI system without an Evaluation Suite. | Necessity stated as fact | rewrite | newly held (basis changed) |
| universal / necessity | `policy-governed-mcp-runtimes-for-secure-tool-execution` | 120 | table cell | Governed Gating, Jailbreak Resistance column: Absolute (Failsafe execution) | Safety guarantee in the comparison readers use to choose a design | rewrite | already held |
| legal / compliance | `systems-001-foundations` | 337 | body | High-risk systems now require explicit human oversight (EU AI Act, 2024; NIST AI RMF 1.0). | Legal requirement claim; the NIST AI RMF is a voluntary framework, and the EU AI Act requirement applies to a defined scope | scope and source | newly held |
| quantitative / measured | `from-ad-hoc-prompts-to-repeatable-agent-workflows` | 17 | proof point | Systems consistency checks are passing at 31 systems docs. | Rendered as evidence for the case study; stale (59 docs now) and not inspectable | attest with pinned artifacts or remove | newly held |
| quantitative / measured | `context-windows-as-working-memory` | 26 | FAQ | This means costs and response times increase faster than linearly as you add more context. | Cost claim readers use to budget; hosted APIs price input per token | source or rewrite | already held |
| quantitative / measured | `context-window-management-and-retrieval-pruning-strategies` | 80 | body | Time-to-first-token scales linearly with prompt size. | Performance claim behind the pruning recommendation | source | already held |
| quantitative / measured | `from-prompt-to-production` | 168 | body | Do not deploy until you have run your prompt against at least 50 examples. | Deployment threshold with no stated basis | source or frame as judgment | already held |
| quantitative / measured | `training-vs-inference` | 137 | body | Cost: Hundreds to thousands of dollars. | Fine-tuning cost figure (with the pre-training figure at line 127) that drives the page's recommendation; undated and unsourced | source and date | already held |
| quantitative / measured | `semantic-caching-for-probabilistic-systems` | 55 | body | Implementing a semantic cache directly reduces average system latency from seconds to milliseconds while lowering model API costs. | Quantitative performance claim in the page's impact callout | source | already held |
| implementation / capability | `from-ad-hoc-prompts-to-repeatable-agent-workflows` | 132 | body | `report:gaps` gives one page of status for core concerns (entity, schema, evidence, AEO, distribution framework), reducing subjective "are we done?" debates. | Presented as a working tool in the case study; no `report:gaps` npm script exists (only `scripts/report-main-gaps.mjs`) | correct or pin | newly held |
| implementation / capability | `ai-website-publishing-with-human-in-the-loop-control` | 178 | body | The WebsiteOps run was created from a declared site goal and explicit publishing constraints. It produced a draft artifact, passed the workflow's validation step, and stopped at `human_review`. | The article's entire evidence; no run record, log or artifact, and not attested | attest with an artifact | newly held |
| implementation / capability | `architecture-of-in-chat-ai-apps` | 38 | body | Real-world interface implementations and prototypes are cataloged in our [Portfolio](/portfolio/). | Implies the author's own in-chat work; the portfolio page source has no in-chat or widget content | attest or remove | newly held (basis changed) |
| implementation / capability | `systems-001-foundations` | 20 | proof point | Includes glossary anchors for 12 key terms | Rendered claim; the article contains no glossary anchors | correct or remove | newly held |
| implementation / capability | `agent-instructions-and-handoff-as-an-operating-system` | 49 | body | It is not theory-only. It is based on what worked in this repository while scaling content quality across systems, sentences, self, shelf, and sticky-notes. | Claims first-hand evidence without pinned artifacts or attestation | attest | already held |
| implementation / capability | `agent-instructions-and-handoff-as-an-operating-system` | 18 | proof point | Automated checks (`lint:systems`, `report:topics`, `report:gaps`) are used as repeatable quality gates. | `report:topics` and `report:gaps` are not npm scripts in `package.json` | correct | already held |
| implementation / capability | `ai-architecture-explained-how-modern-llm-applications-work` | 18 | proof point | Soothsayer is used as a working in-repo experiment for orchestration and controlled execution. | No Soothsayer or workspace-mcp code exists in this repository, only diagrams and a shelf note | correct | already held |
| externally attributed research | `retrieval-augmented-generation-in-plain-terms` | 30 | takeaways | RAG reduces hallucinations but introduces new failure modes. | Key takeaway resting on research the page does not cite; truth is not the test | cite research and state exactly what it supports, or rewrite as a qualified claim | newly held |
| externally attributed research | `human-in-the-loop-is-a-system-design-choice` | 96 | body | If a system is reliable 99.9% of the time, the human supervisor will naturally stop paying close attention. | The page's strongest idea (automation bias) rests on uncited research and is stated as certain | source | already held |

### Genuinely ambiguous cases for Shailesh

*Decided 2026-09-13. See [Review decisions applied](#review-decisions-applied).*

1. **Factual and definitional errors.** Pass 2 did not treat plain inaccuracy as an unsupported claim. Examples:
   - `tool-use-when-language-triggers-actions` (line 33): tool use "transforms the model from a passive text generator into an active agent"
   - `natural-language-is-the-new-api`: vector search presented as the mechanism for choosing actions
   - `a-simple-tokenizer`: the FAQ contradicts the body on "Strawberry"
   - `embeddings-explained-like-youre-human`: the FAQ answer about "bank"
   - `what-a-skill-is-in-ai-systems`: tools and actions named as other words for skills
   - `evaluation-is-a-human-problem`: RLHF presented as builder evaluation

   *If errors should block:* those six pages go on hold.
2. **Argued theses stated as fact.** Examples:
   - `runtime-over-model-why-orchestration-is-the-product` (line 37): "The runtime is more important than the model..."
   - `natural-language-is-the-new-api`: its title
   - `enterprise-ai-at-scale`: "Enterprise AI requires governance contracts before architecture decisions"

   The doctrine allows synthesis to argue, but none of these pages is labelled as synthesis yet. *If comparative theses should block until labelled:* those three pages go on hold.
3. **Internal contradictions.** FAQ and body disagree in:
   - `runtime-over-model-why-orchestration-is-the-product` (not held)
   - `a-simple-tokenizer` (not held)
   - `from-agent-intent-to-governed-execution` (held)
   - `from-prompt-to-production` (held)

   Should a contradiction block the page, or be fixed during rewrite?
4. **`what-a-system-prompt-actually-is` is held on M197 alone.** Its opening scenario, "Most teams write their first system prompt in about four minutes", reads as observed prevalence and carries the page's premise. The fix is framing it as illustration. Is that material enough to hold the strongest page in the archive?
5. **True but uncited research.** `retrieval-augmented-generation-in-plain-terms` is newly held only for "RAG reduces hallucinations". The human-in-the-loop automation-bias claim and "lost in the middle" are held the same way. Confirm that this matches the "truth is not the test" decision.
6. **`tech-stack-for-nlpg-driven-ai-assisted-sdlc`.** It presents a template repository and `nlpg` commands. No `nlpg` tool exists in this repository. Is this a proposal, or a claim that the tool exists? (The page is already held.)
7. **Newtuple disclosure.** Still open for `architecture-of-in-chat-ai-apps`, `why-ocr-quietly-breaks-document-ai` and `llm-ops-without-the-buzzwords`. It decides whether those citations count as independent support.
8. **Qualitative comparison tables.** Tables in `managing-state-and-memory-handoffs-in-multi-agent-workflows`, `agentic-orchestration-coordination`, `context-window-management-and-retrieval-pruning-strategies` and `engineering-bounded-autonomy` were treated as design reasoning, not held. The exception is where a cell asserts measurable accuracy or safety (the rubric-pipeline judge rating, and "Absolute" jailbreak resistance).

---

## Review decisions applied

**Date**: 2026-09-13. Shailesh's decisions on the open cases from Integrity pass 2, applied without a new archive-wide search. No article was edited.

### Decisions

1. **Factual errors** use the materiality test. Material errors hold `tool-use-when-language-triggers-actions`, `natural-language-is-the-new-api` and `what-a-skill-is-in-ai-systems`. The errors in `a-simple-tokenizer`, `embeddings-explained-like-youre-human` and `evaluation-is-a-human-problem` are peripheral, so they are local repairs.
2. **A central thesis presented as fact**, in a piece that does not identify itself as synthesis, holds the page: `runtime-over-model-why-orchestration-is-the-product`, `natural-language-is-the-new-api` and `enterprise-ai-at-scale`. This was applied to those three pages only. Theses on other pages will be judged during cluster review.
3. **FAQ and body contradictions.**
   - Material, so held: `runtime-over-model-why-orchestration-is-the-product`, `from-agent-intent-to-governed-execution`, `from-prompt-to-production`.
   - Peripheral, so a local repair: `a-simple-tokenizer`.
4. **`what-a-system-prompt-actually-is`** comes off hold. M197 becomes a local repair: frame the opening scenario as an illustration.
5. **`retrieval-augmented-generation-in-plain-terms`** stays on hold. It clears by citing research and stating exactly what that research supports, or by rewriting to a qualified claim.
6. **`tech-stack-for-nlpg-driven-ai-assisted-sdlc`** stays on hold. The `nlpg` commands are treated as an existence claim unless labelled as proposed or illustrative.
7. **Affiliated citations** (Newtuple) are not independent support. See [Evidence independence](#evidence-independence).
8. **Qualitative comparison tables** carry no hold unless a cell makes a material factual or comparative claim. See [Comparison tables](#comparison-tables).

### Correctness findings (13)

| Page | Line | Where | Issue | Text | Outcome | Why | Resolution |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `tool-use-when-language-triggers-actions` | 33 | body | factual or definitional error | It transforms the model from a passive text generator into an active agent that can query databases, call APIs, and perform actions. | Material blocker | Conflicts with the canonical definition of agent-like behaviour in `ai-agents-vs-ai-workflows`; tool use lets a model request actions, it does not make it an agent | rewrite |
| `natural-language-is-the-new-api` | 117 | body (core concepts) | factual error | Vector Search: The core mechanism for finding meaning. When a user provides a query, the system converts it to an embedding and searches a database for the most similar vectors, which correspond to known actions or data. | Material blocker | Presents vector search as the mechanism that maps requests to actions, in the section that defines the page's model; tool calling does not work this way | rewrite |
| `natural-language-is-the-new-api` | 35 | body and title | central thesis presented as fact | That era is giving way to a new abstraction layer: natural language. (Title: Natural Language Is the New API) | Material blocker | The page's thesis is stated as established fact and the piece does not identify itself as synthesis | declare synthesis, write as judgment, or narrow |
| `what-a-skill-is-in-ai-systems` | 117 | body | factual or definitional error | Different platforms use different names: skills, tools, actions, tasks, extensions. The naming changes, but the architectural need is the same. | Material blocker | Tells readers that tools and actions are other names for skills, which blurs the skill definition and the separate tool-use concept | rewrite |
| `runtime-over-model-why-orchestration-is-the-product` | 37 | body and title | central thesis presented as fact | The runtime is more important than the model because a model's output is probabilistic, while system behavior must be deterministic. | Material blocker | The page's thesis is stated as established fact and the piece does not identify itself as synthesis | declare synthesis or write as judgment |
| `runtime-over-model-why-orchestration-is-the-product` | 24 | FAQ | material contradiction | FAQ: permission gates, validation, scope limits, rollback. Body: lifecycle context, permission boundary, verification boundary, trace boundary. | Material blocker | The four constraints are the page's core model, and the FAQ and body name different ones | reconcile |
| `enterprise-ai-at-scale` | 30 | takeaways | central thesis presented as fact | Enterprise AI requires governance contracts before architecture decisions. | Material blocker | Central necessity claim stated as fact; the piece does not identify itself as synthesis | declare synthesis, narrow, or source |
| `tech-stack-for-nlpg-driven-ai-assisted-sdlc` | 507 | body (Minimal CLI surface) | implementation or existence claim | Minimal CLI surface: nlpg init, nlpg spec new, nlpg spec validate, nlpg plan, nlpg run, nlpg gate, nlpg ledger view, nlpg pr create | Material blocker | Commands are presented without being labelled as proposed, and no `nlpg` tool exists | label as proposed or illustrative, or point to an inspectable artifact; do not build a tool to rescue the article |
| `from-agent-intent-to-governed-execution` | 26 | FAQ | material contradiction | FAQ: intent parsing, policy check, permission gate, action proposal, validation, execution, audit logging. Body: intent capture, proposal, policy gate, execution, verification, trace write, next-step decision. | Material blocker | The seven stages are the page's core model, and the FAQ and body list different ones | reconcile |
| `from-prompt-to-production` | 24 | FAQ and description | material contradiction | Description and FAQ promise a 7-step framework; the body and proof point give six steps. | Material blocker | The checklist is the page's core content | reconcile |
| `a-simple-tokenizer` | 20 | FAQ | peripheral contradiction | "Strawberry" has 3 tokens (straw-berry), making counting the 'r's across token boundaries difficult. | Local repair | The body gives a single token ID for the same word, but both versions support the core point that the model does not see letters | fix during rewrite |
| `embeddings-explained-like-youre-human` | 25 | FAQ | peripheral factual error | A question about "bank" might retrieve information about rivers if the training data had more financial contexts. | Local repair | The example is garbled, but the body explains the "bank" ambiguity correctly | fix during rewrite |
| `evaluation-is-a-human-problem` | 92 | body | peripheral framing error | RLHF is listed as the third step of the evaluation process. | Local repair | The description of RLHF is accurate, but it is a model training method, not a step in an application team's evaluation; the page's advice does not depend on it | fix during rewrite |

### Hold changes

| Page | Before | After | Why |
| :--- | :--- | :--- | :--- |
| `what-a-system-prompt-actually-is` | held (P) | not held | M197 is an illustrative scenario the argument does not depend on. |
| `tool-use-when-language-triggers-actions` | not held | held (C) | Material definitional error about agents. |
| `natural-language-is-the-new-api` | not held | held (C) | Vector search presented as the mechanism that chooses actions, and a central thesis stated as fact. |
| `what-a-skill-is-in-ai-systems` | not held | held (C) | Tools and actions presented as other names for skills. |
| `runtime-over-model-why-orchestration-is-the-product` | not held | held (C) | Central thesis stated as fact, and a material FAQ and body contradiction. |
| `enterprise-ai-at-scale` | not held | held (C) | Central necessity thesis stated as fact. |

C was also added to three pages already on hold: `tech-stack-for-nlpg-driven-ai-assisted-sdlc` (existence claim), `from-agent-intent-to-governed-execution` and `from-prompt-to-production` (contradictions).

**Final state:** 46 of 59 pages on integrity hold. The integrity baseline is closed for disposition review.

---

## What this ledger deliberately did not do

- Change any article, redirect, renderer file or governance document.
- Treat Green or Amber as evidence of quality.
- Treat word count, metadata, decks or link counts as merit.
- Decide anything on its own. The three recorded human decisions came from review, not from this analysis.
