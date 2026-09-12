---
name: pruningmypothos-editorial
description: Authoritative editorial governor for Pruning My Pothos. Enforces Sans Serif Sentiments, claim-level provenance graphs, boundary declarations, and epistemic integrity across systems and self.
---

# Pruning My Pothos — Editorial Governor (Contract v1)

## Philosophy: Sans Serif Sentiments

> *"Clarity should survive complexity; the absence of excess, so the human signal remains."*

Pruning My Pothos helps people understand AI by putting it to work. Its authority comes from the integrity of what is built, tested, and honestly observed. 

- **Sans**: Strip away jargon, padding, throat-clearing, formulaic transitions, generic contrast patterns, and arbitrary word count quotas. Length is derived entirely from the idea.
- **Serif**: Preserve craft only when it carries functional meaning: deliberate rhythm, earned wit, an illuminating metaphor, or a necessary operational nuance.
- **Sentiments**: Protect genuine human judgment, consequence, intellectual honesty about uncertainty, and lived experience.

---

## The Boundary Between Systems and Humans

> [!IMPORTANT]
> **Core Operational Invariant:**
> *Automation verifies the contract. The author remains accountable for the claim.*
>
> The deterministic validator verifies structural typing, source referential integrity, and provenance consistency. It verifies that an incident is declared `observed`, that a claim statement maps to prose, and that a repository source has an immutable commit SHA.
> 
> **It cannot prove that an observation genuinely happened to you, or that external evidence semantically proves your interpretation.** Human review remains authoritative for those questions.

---

## Rules of Epistemic Integrity

1. **Never manufacture lived experience**:
   Never write "Last week, we received a bug report...", "In our production cluster...", or "At my company..." unless the event actually happened to the author and is explicitly declared in `provenance` with `attestation: author`.
2. **Never convert an illustrative scenario into a first-person observation**:
   If a worked scenario or synthetic failure was constructed to explain a mechanism, keep it framed as an illustration (e.g., "Consider an invoice parser...", "Suppose a verifier times out...").
3. **Never strengthen interpretation into fact**:
   Synthesized conclusions must be framed as models or interpretations, not absolute empirical realities.
4. **Never strengthen possibility into frequency**:
   Never assert that something "fails more often than" another without comparative empirical data. Frame it instead around observed failure boundaries.
5. **Trace consequential claims**:
   Every consequential claim in `provenance.claims` must map directly to an assertion in the body text and reference a valid, declared source ID.
6. **Immutable repository references**:
   All repository evidence must provide an inspectable URL, a file path, and an immutable 40-character hexadecimal git commit SHA. Mutable branches (`main`) or tags are prohibited.

---

## Content Kinds and Scoping

Content kinds are strictly scoped per collection:

### `systems`
- **`explainer`**: Clarifies an architectural mechanism and its limits. Requires `shortAnswer`, `readerOutcome`, and complete `boundary` (`is`, `isNot`, `mattersWhen`).
- **`field-note`**: Brief operational observation from practice. Requires grounded context and author attestation. No heading count or word count quotas.
- **`playbook`**: Concrete operational walkthrough. Requires a `practice` block with actionable steps, verification instructions, and a failure check.

### `self`
- **`essay`**: Reflective analysis of human signal vs. automated excess. Requires clear `thesis` and honest judgment.
- **`field-note`**: Grounded personal observation or calibration note.

---

## The 12-Step Authoring Pipeline

```
1. READ PHILOSOPHY
   Absorb Sans Serif Sentiments and the boundary of the topic.
2. CLASSIFY CONTENT KIND
   Select explainer | field-note | playbook (for systems) or essay | field-note (for self).
3. IDENTIFY READER OUTCOME
   Define readerIntent and a concrete capability in readerOutcome.
4. MAP CONSEQUENTIAL CLAIMS
   Identify claims requiring grounding (repository, external, observed, illustrative, synthesis).
5. CLASSIFY PROVENANCE
   Declare document primary mode and register sources with unique IDs.
6. ATTEST OBSERVATIONS & IMMUTABLE REFS
   Ensure repository sources use 40-char commit SHAs; author observations use attestation: author.
7. DRAFT PROSE
   Draft with direct resolution. Do not pad words or manufacture 3-act structures.
8. APPLY SANS SERIF SENTIMENTS
   Prune throat-clearing openers, generic AI transitions (delve, tapestry), and formulaic contrast.
9. APPLY CANONICAL RECIPE
   Check draft against the corresponding YAML recipe in recipes/.
10. VERIFY CLAIM TRACEABILITY
    Verify every claim statement corresponds to an actual normalized assertion in the body text.
11. VERIFY NO INVENTED EXPERIENCE
    Ensure any incident language is backed by observed provenance.
12. STAGE VIA WEBSITEOPS
    Run deterministic validation before requesting human review:
    npm run lint:editorial:v1 -- --file <path>
    npm run lint:prose:v1 -- --file <path>
```

---

## Plain-Language Comprehension Pass

Plain language in Pruning My Pothos is an explanatory discipline, not a vocabulary reduction exercise. It ensures the underlying mechanism is clear before introducing abstraction.

Authors must evaluate every piece against this test:
> *"Can a reasonably curious non-developer understand the main idea, see how it works, and know why it matters?"*

Rules:
1. **Mechanism before terminology**: Describe what physically or logically occurs in ordinary language before introducing the formal technical label.
2. **Unfamiliar terms explained**: Define terms in context at their first appearance; never assume the reader shares your sub-discipline's dialect.
3. **Acronyms expanded on meaningful first use**: Expand acronyms (MCP, AST, LLM, RAG, KV) when first introduced, unless universally known.
4. **Technical precision retained**: Plain language does not mean sloppy analogies. Do not sacrifice correctness for simplicity.
5. **Boundaries stated**: Explicitly state where the explanation stops and what the system does not guarantee.
6. **No readability-score or word-count optimisation**: Do not write to satisfy Flesch-Kincaid formulas or arbitrary word length quotas. Clarity derives from the idea.

---

## Visual Decision Pass

Before specifying an inline visual, authors must evaluate the Six-Question Visual Model:
1. **What should the reader see?** (Concrete structural entities, not decorative illustrations).
2. **Why is prose insufficient?** (What spatial, hierarchical, or sequential relationship is confusing in linear text?).
3. **What is the single takeaway?** (One standalone sentence explaining the key insight).
4. **What is the caption?** (Contextual grounding).
5. **What is the alt/accessibility description?** (Detailed descriptive narrative for screen readers and search engines).
6. **Where does it belong?** (Placed directly adjacent to the prose concept it explains using `<!-- pmp:visual id="..." -->`).

> [!NOTE]
> **"No visual needed" remains a completely valid outcome.** If text explains the concept with total clarity, do not force an inline visual.
> Visuals belong to Pruning My Pothos Content Experience; do **not** add visual primitives to LanguageOps recipes or invent LanguageOps IDs.

---

## Frontmatter Schema Reference (v1.0)

```yaml
---
schemaVersion: "1.0"
title: "Policy-Governed MCP Runtimes"
description: "Why model tool execution requires a host-level boundary."
contentKind: explainer
readerIntent: understand
readerOutcome: "Determine which tool permissions should belong in the model prompt versus the host execution runtime."
thesis: "Model prompts cannot enforce security boundaries that require deterministic execution guarantees."
shortAnswer: "A policy-governed runtime moves authorization out of the prompt and into a deterministic host supervisor. The model proposes tool calls, but the host environment verifies permissions against immutable rules before execution begins."

boundary:
  is: "An architecture for isolating tool execution in a deterministic host sandbox."
  isNot: "A guarantee against prompt injection in free-form reasoning."
  mattersWhen: "Tools have access to write operations, databases, or outbound network calls."

provenance:
  primary: synthesis
  sources:
    - id: mcp-spec
      type: external
      url: "https://modelcontextprotocol.io/specification"
      citation: "Model Context Protocol Specification 2024-11-25"
    - id: runtime-core
      type: repository
      url: "https://github.com/example/mcp-runtime"
      path: "src/policy/engine.rs"
      ref: "4b825dc642cb6eb9a060e54bf8d69288fbee4904"
  claims:
    - statement: "The runtime rejects execution above the declared policy tier before invoking tools."
      kind: repository
      sources:
        - runtime-core
    - statement: "Separating permissions from generation makes debugging authorization failures simpler."
      kind: synthesis

visuals:
  - id: runtime-sequence
    purpose: sequence
    renderAs: generated-sequence
    takeaway: "Tool authorization happens deterministically in the host supervisor before execution."
    caption: "Three-stage execution lifecycle of a policy-governed tool call."
    alt: "Step sequence showing agent proposing tool call, host verifying policy, and sandbox executing."
    evidenceRole: explanatory
    data:
      orientation: horizontal
      steps:
        - id: propose
          label: "Propose Call"
          note: "Probabilistic agent"
        - id: verify
          label: "Verify Policy"
          note: "Deterministic host"
        - id: execute
          label: "Execute"
          note: "Isolated sandbox"

language:
  profile: sans-serif-sentiments
  recipe: pmp-systems-explainer
---
```
