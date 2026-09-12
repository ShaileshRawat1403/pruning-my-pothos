# Editorial Integrity Audit Report

Content snapshot: sha256:5da91775bf565516229e9ece6ec98d0e5c14f46e00978b4fbf968f402c60d5a8
Status: Read-only diagnostic of the existing article archive.

## Status Definitions

- **Green**: No integrity risk detected by the current automated checks.
- **Amber**: Useful content, but certainty, comparative claims, or evidence need qualification.
- **Red**: Cannot currently be published as asserted under the evidence available to the validator (e.g. unverified first-person incidents, unanchored metrics).
- **Illustrative**: Explicitly declared in frontmatter/markup as an illustrative example or constructed scenario.

## Summary Register

| Total Articles | Green | Amber | Red | Illustrative |
| :--- | :--- | :--- | :--- | :--- |
| 85 | 26 | 58 | 1 | 0 |

## High-Priority Review Queue (Red)

Articles containing first-person incident assertions or ungrounded empirical claims that require author attestation or illustrative reframing:

### [Debugging a Semantic Cache Miss](../src/content/self/debugging-a-semantic-cache-miss.md)
- **File**: `src/content/self/debugging-a-semantic-cache-miss.md` (self)
- **Status**: 🔴 **Red**
- **Diagnostic Issues**:
  - First-person incident language detected without 'observed' provenance declaration or author attestation
- **Flagged Excerpts**:
  - `L14: "Last week, we received" — first-person incident opener ('Last week we/I received...')`
  - `L14: "we received a bug report" — unverified incident ('we received a bug report...')`
- **Action Required**: Decide whether incident genuinely occurred (add `provenance.primary: observed` + `attestation: author`) or reframe as an explicit illustrative scenario.

## Qualification Queue (Amber)

Articles with solid conceptual foundations that need qualified phrasing (e.g. comparative frequency assertions) or removal of legacy template constraints:

- **[From Text to Tokens](../src/content/systems/a-simple-tokenizer.mdx)** (`src/content/systems/a-simple-tokenizer.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L113: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L148: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L159: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[AEO and GEO as a Retrieval Design Problem](../src/content/systems/aeo-and-geo-as-a-retrieval-design-problem.mdx)** (`src/content/systems/aeo-and-geo-as-a-retrieval-design-problem.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L77: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L106: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L174: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[Agent Instructions and Handoff as an Operating System](../src/content/systems/agent-instructions-and-handoff-as-an-operating-system.mdx)** (`src/content/systems/agent-instructions-and-handoff-as-an-operating-system.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L91: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L140: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L184: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[Agentic Orchestration: Designing Multi-Agent Coordination](../src/content/systems/agentic-orchestration-coordination.mdx)** (`src/content/systems/agentic-orchestration-coordination.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L115: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L138: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L170: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[AI Architecture Explained: How Modern LLM Applications Work](../src/content/systems/ai-architecture-explained-how-modern-llm-applications-work.mdx)** (`src/content/systems/ai-architecture-explained-how-modern-llm-applications-work.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L81: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L108: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L208: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[AI Website Publishing with Human-in-the-Loop Control](../src/content/systems/ai-website-publishing-with-human-in-the-loop-control.mdx)** (`src/content/systems/ai-website-publishing-with-human-in-the-loop-control.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L74: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L137: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L174: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[The Architecture of In-Chat AI Apps](../src/content/systems/architecture-of-in-chat-ai-apps.mdx)** (`src/content/systems/architecture-of-in-chat-ai-apps.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L71: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L115: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L135: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[Comparing Cloud Architecture in 2026: AWS vs Azure vs GCP](../src/content/systems/cloud-architecture-comparison-2026.mdx)** (`src/content/systems/cloud-architecture-comparison-2026.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L85: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L153: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L313: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[Context Window Management and Retrieval Pruning Strategies](../src/content/systems/context-window-management-and-retrieval-pruning-strategies.mdx)** (`src/content/systems/context-window-management-and-retrieval-pruning-strategies.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L67: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L87: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L133: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[Context Windows as Working Memory](../src/content/systems/context-windows-as-working-memory.mdx)** (`src/content/systems/context-windows-as-working-memory.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L76: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L89: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L111: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[Decision-Making Under Uncertainty in AI Runtimes](../src/content/systems/decision-making-under-uncertainty-in-ai-runtimes.mdx)** (`src/content/systems/decision-making-under-uncertainty-in-ai-runtimes.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L77: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L111: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L169: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[Designing Reusable AI Skills](../src/content/systems/designing-reusable-ai-skills.mdx)** (`src/content/systems/designing-reusable-ai-skills.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L90: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L118: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L202: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[Drift, Decay, and Silent Failure](../src/content/systems/drift-decay-and-silent-failure.mdx)** (`src/content/systems/drift-decay-and-silent-failure.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L70: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L85: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L96: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[Embeddings Explained Like You're Human](../src/content/systems/embeddings-explained-like-youre-human.mdx)** (`src/content/systems/embeddings-explained-like-youre-human.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L72: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L85: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L98: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[Engineering Agentic Systems for Reliability](../src/content/systems/engineering-agentic-systems-for-reliability.mdx)** (`src/content/systems/engineering-agentic-systems-for-reliability.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L71: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L90: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L155: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[Engineering Bounded Autonomy into AI Systems](../src/content/systems/engineering-bounded-autonomy.mdx)** (`src/content/systems/engineering-bounded-autonomy.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L115: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L141: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L171: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[Enterprise AI at Scale: From Blueprint to Operating Reality](../src/content/systems/enterprise-ai-at-scale.mdx)** (`src/content/systems/enterprise-ai-at-scale.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L82: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L105: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L136: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[Entity Glossary for AI Discoverability](../src/content/systems/entity-glossary-for-ai-discoverability.mdx)** (`src/content/systems/entity-glossary-for-ai-discoverability.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L75: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L98: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L181: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[Evaluating Non-Deterministic Outputs with Rubric-Based Pipelines](../src/content/systems/evaluating-non-deterministic-outputs-with-rubric-based-pipelines.mdx)** (`src/content/systems/evaluating-non-deterministic-outputs-with-rubric-based-pipelines.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L66: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L84: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L134: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[Evaluation as a Runtime Discipline](../src/content/systems/evaluation-as-a-runtime-discipline.mdx)** (`src/content/systems/evaluation-as-a-runtime-discipline.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L76: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L110: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L166: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[Evaluation Is a Human Problem](../src/content/systems/evaluation-is-a-human-problem.mdx)** (`src/content/systems/evaluation-is-a-human-problem.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L70: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L83: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L94: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[From Ad-Hoc Prompts to Repeatable Agent Workflows](../src/content/systems/from-ad-hoc-prompts-to-repeatable-agent-workflows.mdx)** (`src/content/systems/from-ad-hoc-prompts-to-repeatable-agent-workflows.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L88: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L113: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L174: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[From Agent Intent to Governed Execution](../src/content/systems/from-agent-intent-to-governed-execution.mdx)** (`src/content/systems/from-agent-intent-to-governed-execution.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L79: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L110: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L177: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[From Prompt to Production: A Human Checklist](../src/content/systems/from-prompt-to-production.mdx)** (`src/content/systems/from-prompt-to-production.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L116: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L138: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L174: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[Human-in-the-Loop Is a System Design Choice](../src/content/systems/human-in-the-loop-is-a-system-design-choice.mdx)** (`src/content/systems/human-in-the-loop-is-a-system-design-choice.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L70: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L84: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L92: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[I-7 Cognitive Loop: A new standard for Human-AI interaction](../src/content/systems/i-7-cognitive-loop.mdx)** (`src/content/systems/i-7-cognitive-loop.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L83: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L165: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L244: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[Intent Architecture as a Language Contract](../src/content/systems/intent-architecture-as-a-language-contract.mdx)** (`src/content/systems/intent-architecture-as-a-language-contract.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L84: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L98: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L153: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[Knowledge Management as Runtime Memory](../src/content/systems/knowledge-management-as-runtime-memory.mdx)** (`src/content/systems/knowledge-management-as-runtime-memory.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L77: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L115: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L173: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[What LLM-Ops Actually Means](../src/content/systems/llm-ops-without-the-buzzwords.mdx)** (`src/content/systems/llm-ops-without-the-buzzwords.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L118: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L156: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L189: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[Managing State and Memory Handoffs in Multi-Agent Workflows](../src/content/systems/managing-state-and-memory-handoffs-in-multi-agent-workflows.mdx)** (`src/content/systems/managing-state-and-memory-handoffs-in-multi-agent-workflows.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L67: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L83: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L130: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[On Mental Frameworks](../src/content/systems/mental-frameworks.mdx)** (`src/content/systems/mental-frameworks.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L96: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L138: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L148: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[Natural Language Is the New API](../src/content/systems/natural-language-is-the-new-api.mdx)** (`src/content/systems/natural-language-is-the-new-api.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L91: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L124: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L143: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[Observability First: How AI Systems Learn After Launch](../src/content/systems/observability-first-ai-systems.mdx)** (`src/content/systems/observability-first-ai-systems.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L77: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L105: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L157: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[Policy-Governed MCP Runtimes for Secure Tool Execution](../src/content/systems/policy-governed-mcp-runtimes-for-secure-tool-execution.mdx)** (`src/content/systems/policy-governed-mcp-runtimes-for-secure-tool-execution.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L68: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L86: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L131: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[Probabilities, Not Truth](../src/content/systems/probabilities-not-truth.mdx)** (`src/content/systems/probabilities-not-truth.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L124: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L150: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L163: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[Prompting Is Not the Skill You Think It Is](../src/content/systems/prompting-is-not-the-skill-you-think-it-is.mdx)** (`src/content/systems/prompting-is-not-the-skill-you-think-it-is.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L84: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L97: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L110: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[Resilient Integration Contracts for Structured Outputs](../src/content/systems/resilient-integration-contracts-for-structured-outputs.mdx)** (`src/content/systems/resilient-integration-contracts-for-structured-outputs.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L72: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L88: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L139: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[Retrieval-Augmented Generation in Plain Terms](../src/content/systems/retrieval-augmented-generation-in-plain-terms.mdx)** (`src/content/systems/retrieval-augmented-generation-in-plain-terms.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L71: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L88: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L100: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[Runtime Over Model: Why Orchestration Is the Product](../src/content/systems/runtime-over-model-why-orchestration-is-the-product.mdx)** (`src/content/systems/runtime-over-model-why-orchestration-is-the-product.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L75: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L86: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L101: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[Semantic Caching for Probabilistic Systems](../src/content/systems/semantic-caching-for-probabilistic-systems.mdx)** (`src/content/systems/semantic-caching-for-probabilistic-systems.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L87: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L142: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L167: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[SEO, AEO, GEO: How Discoverability Actually Works](../src/content/systems/seo-aeo-geo-how-things-fit-together.mdx)** (`src/content/systems/seo-aeo-geo-how-things-fit-together.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L76: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L91: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L164: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[SEO, AEO, and GEO in Plain Terms](../src/content/systems/seo-aeo-geo-in-plain-terms.mdx)** (`src/content/systems/seo-aeo-geo-in-plain-terms.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L77: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L138: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L172: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[Skill Evaluation and Versioning](../src/content/systems/skill-evaluation-and-versioning.mdx)** (`src/content/systems/skill-evaluation-and-versioning.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L90: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L153: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L197: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[Skills vs Prompts vs Agents](../src/content/systems/skills-vs-prompts-vs-agents.mdx)** (`src/content/systems/skills-vs-prompts-vs-agents.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L126: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L152: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L237: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[Structured Output and Why It Matters](../src/content/systems/structured-output-and-why-it-matters.mdx)** (`src/content/systems/structured-output-and-why-it-matters.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L104: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L119: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L167: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[Systems 001: Foundations](../src/content/systems/systems-001-foundations.mdx)** (`src/content/systems/systems-001-foundations.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L134: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L304: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L355: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[Tech Stack for NLPg-Driven AI-Assisted SDLC](../src/content/systems/tech-stack-for-nlpg-driven-ai-assisted-sdlc.mdx)** (`src/content/systems/tech-stack-for-nlpg-driven-ai-assisted-sdlc.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L83: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L183: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L297: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[The Intelligence Assembly Model](../src/content/systems/the-intelligence-assembly-model.mdx)** (`src/content/systems/the-intelligence-assembly-model.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L71: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L91: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L164: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[The Logic Void: Where AI Reasoning Breaks Down](../src/content/systems/the-logic-void.mdx)** (`src/content/systems/the-logic-void.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L118: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L137: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L165: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[Tool Use: When Language Triggers Actions](../src/content/systems/tool-use-when-language-triggers-actions.mdx)** (`src/content/systems/tool-use-when-language-triggers-actions.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L71: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L84: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L92: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[Training, Fine-Tuning, and Inference](../src/content/systems/training-vs-inference.mdx)** (`src/content/systems/training-vs-inference.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L120: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L142: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L154: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[What a Skill Is in AI Systems](../src/content/systems/what-a-skill-is-in-ai-systems.mdx)** (`src/content/systems/what-a-skill-is-in-ai-systems.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L89: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L129: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L187: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[What a System Prompt Actually Is](../src/content/systems/what-a-system-prompt-actually-is.mdx)** (`src/content/systems/what-a-system-prompt-actually-is.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L116: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L130: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L202: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[What an AI Model Actually Is](../src/content/systems/what-an-ai-model-actually-is.mdx)** (`src/content/systems/what-an-ai-model-actually-is.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L122: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L149: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L174: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[What Large Language Models Are Optimized For](../src/content/systems/what-llms-are-optimized-for.mdx)** (`src/content/systems/what-llms-are-optimized-for.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L71: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L84: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L94: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[Why Most AI Projects Fail After the Demo Stage](../src/content/systems/why-most-ai-projects-fail-after-the-demo-stage.mdx)** (`src/content/systems/why-most-ai-projects-fail-after-the-demo-stage.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L79: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L117: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L203: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[Why OCR Quietly Breaks Document AI](../src/content/systems/why-ocr-quietly-breaks-document-ai.mdx)** (`src/content/systems/why-ocr-quietly-breaks-document-ai.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L74: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L90: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L131: "## Act III" — syntactic Act heading ('## Act I/II/III')`
- **[Winning AI Search as a Discoverability System](../src/content/systems/winning-ai-search-as-a-discoverability-system.mdx)** (`src/content/systems/winning-ai-search-as-a-discoverability-system.mdx`)
  - *Issue*: Legacy Act I-III syntax template (candidate for v1 migration)
  - *Excerpt*: `L72: "## Act I" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L84: "## Act II" — syntactic Act heading ('## Act I/II/III')`
  - *Excerpt*: `L156: "## Act III" — syntactic Act heading ('## Act I/II/III')`

## Full Archive Status Table

| Collection | Slug | Status | Contract | Boundary | Key Diagnostic |
| :--- | :--- | :---: | :---: | :---: | :--- |
| self | [attention-debt](../src/content/self/attention-debt.md) | 🟢 Green | Legacy | None | Clean |
| self | [building-a-knowledge-surface](../src/content/self/building-a-knowledge-surface.md) | 🟢 Green | Legacy | None | Clean |
| self | [calibration-rituals](../src/content/self/calibration-rituals.md) | 🟢 Green | Legacy | None | Clean |
| self | [constraint-of-kindness](../src/content/self/constraint-of-kindness.md) | 🟢 Green | Legacy | None | Clean |
| self | [craft-of-saying-no](../src/content/self/craft-of-saying-no.md) | 🟢 Green | Legacy | None | Clean |
| self | [debugging-a-semantic-cache-miss](../src/content/self/debugging-a-semantic-cache-miss.md) | 🔴 Red | Legacy | None | First-person incident language detected without 'observed' provenance declaration or author attestation |
| self | [debugging-multi-agent-systems](../src/content/self/debugging-multi-agent-systems.md) | 🟢 Green | Legacy | None | Clean |
| self | [debugging-my-first-schema-translation-error](../src/content/self/debugging-my-first-schema-translation-error.md) | 🟢 Green | Legacy | None | Clean |
| self | [decision-logs-beat-memory](../src/content/self/decision-logs-beat-memory.md) | 🟢 Green | Legacy | None | Clean |
| self | [designing-my-first-safety-constraint](../src/content/self/designing-my-first-safety-constraint.md) | 🟢 Green | Legacy | None | Clean |
| self | [diy](../src/content/self/diy.md) | 🟢 Green | Legacy | None | Clean |
| self | [doubt-as-tool](../src/content/self/doubt-as-tool.md) | 🟢 Green | Legacy | None | Clean |
| self | [edit-your-environment](../src/content/self/edit-your-environment.md) | 🟢 Green | Legacy | None | Clean |
| self | [friction-forecast](../src/content/self/friction-forecast.md) | 🟢 Green | Legacy | None | Clean |
| self | [habit-as-identity](../src/content/self/habit-as-identity.md) | 🟢 Green | Legacy | None | Clean |
| self | [how-i-run-a-weekly-eval-loop](../src/content/self/how-i-run-a-weekly-eval-loop.md) | 🟢 Green | Legacy | None | Clean |
| self | [inner-critic](../src/content/self/inner-critic.md) | 🟢 Green | Legacy | None | Clean |
| self | [learning-edges](../src/content/self/learning-edges.md) | 🟢 Green | Legacy | None | Clean |
| self | [learning-to-say-i-dont-know](../src/content/self/learning-to-say-i-dont-know.md) | 🟢 Green | Legacy | None | Clean |
| self | [margin-of-error](../src/content/self/margin-of-error.md) | 🟢 Green | Legacy | None | Clean |
| self | [my-first-thought](../src/content/self/my-first-thought.md) | 🟢 Green | Legacy | None | Clean |
| self | [the-second-voice](../src/content/self/the-second-voice.md) | 🟢 Green | Legacy | None | Clean |
| self | [the-weekly-observability-reset](../src/content/self/the-weekly-observability-reset.md) | 🟢 Green | Legacy | None | Clean |
| self | [unfinished-questions](../src/content/self/unfinished-questions.md) | 🟢 Green | Legacy | None | Clean |
| self | [what-i-learned-running-ai-governance](../src/content/self/what-i-learned-running-ai-governance.md) | 🟢 Green | Legacy | None | Clean |
| self | [writing-for-two-readers](../src/content/self/writing-for-two-readers.md) | 🟢 Green | Legacy | None | Clean |
| systems | [a-simple-tokenizer](../src/content/systems/a-simple-tokenizer.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [aeo-and-geo-as-a-retrieval-design-problem](../src/content/systems/aeo-and-geo-as-a-retrieval-design-problem.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [agent-instructions-and-handoff-as-an-operating-system](../src/content/systems/agent-instructions-and-handoff-as-an-operating-system.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [agentic-orchestration-coordination](../src/content/systems/agentic-orchestration-coordination.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [ai-agents-vs-ai-workflows](../src/content/systems/ai-agents-vs-ai-workflows.mdx) | 🟢 Green | v1.0 | Yes | Clean |
| systems | [ai-architecture-explained-how-modern-llm-applications-work](../src/content/systems/ai-architecture-explained-how-modern-llm-applications-work.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [ai-website-publishing-with-human-in-the-loop-control](../src/content/systems/ai-website-publishing-with-human-in-the-loop-control.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [architecture-of-in-chat-ai-apps](../src/content/systems/architecture-of-in-chat-ai-apps.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [cloud-architecture-comparison-2026](../src/content/systems/cloud-architecture-comparison-2026.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [context-window-management-and-retrieval-pruning-strategies](../src/content/systems/context-window-management-and-retrieval-pruning-strategies.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [context-windows-as-working-memory](../src/content/systems/context-windows-as-working-memory.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [decision-making-under-uncertainty-in-ai-runtimes](../src/content/systems/decision-making-under-uncertainty-in-ai-runtimes.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [designing-reusable-ai-skills](../src/content/systems/designing-reusable-ai-skills.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [drift-decay-and-silent-failure](../src/content/systems/drift-decay-and-silent-failure.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [embeddings-explained-like-youre-human](../src/content/systems/embeddings-explained-like-youre-human.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [engineering-agentic-systems-for-reliability](../src/content/systems/engineering-agentic-systems-for-reliability.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [engineering-bounded-autonomy](../src/content/systems/engineering-bounded-autonomy.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [enterprise-ai-at-scale](../src/content/systems/enterprise-ai-at-scale.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [entity-glossary-for-ai-discoverability](../src/content/systems/entity-glossary-for-ai-discoverability.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [evaluating-non-deterministic-outputs-with-rubric-based-pipelines](../src/content/systems/evaluating-non-deterministic-outputs-with-rubric-based-pipelines.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [evaluation-as-a-runtime-discipline](../src/content/systems/evaluation-as-a-runtime-discipline.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [evaluation-is-a-human-problem](../src/content/systems/evaluation-is-a-human-problem.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [from-ad-hoc-prompts-to-repeatable-agent-workflows](../src/content/systems/from-ad-hoc-prompts-to-repeatable-agent-workflows.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [from-agent-intent-to-governed-execution](../src/content/systems/from-agent-intent-to-governed-execution.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [from-prompt-to-production](../src/content/systems/from-prompt-to-production.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [human-in-the-loop-is-a-system-design-choice](../src/content/systems/human-in-the-loop-is-a-system-design-choice.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [i-7-cognitive-loop](../src/content/systems/i-7-cognitive-loop.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [intent-architecture-as-a-language-contract](../src/content/systems/intent-architecture-as-a-language-contract.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [knowledge-management-as-runtime-memory](../src/content/systems/knowledge-management-as-runtime-memory.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [llm-ops-without-the-buzzwords](../src/content/systems/llm-ops-without-the-buzzwords.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [managing-state-and-memory-handoffs-in-multi-agent-workflows](../src/content/systems/managing-state-and-memory-handoffs-in-multi-agent-workflows.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [mental-frameworks](../src/content/systems/mental-frameworks.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [natural-language-is-the-new-api](../src/content/systems/natural-language-is-the-new-api.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [observability-first-ai-systems](../src/content/systems/observability-first-ai-systems.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [policy-governed-mcp-runtimes-for-secure-tool-execution](../src/content/systems/policy-governed-mcp-runtimes-for-secure-tool-execution.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [probabilities-not-truth](../src/content/systems/probabilities-not-truth.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [prompting-is-not-the-skill-you-think-it-is](../src/content/systems/prompting-is-not-the-skill-you-think-it-is.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [resilient-integration-contracts-for-structured-outputs](../src/content/systems/resilient-integration-contracts-for-structured-outputs.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [retrieval-augmented-generation-in-plain-terms](../src/content/systems/retrieval-augmented-generation-in-plain-terms.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [runtime-over-model-why-orchestration-is-the-product](../src/content/systems/runtime-over-model-why-orchestration-is-the-product.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [semantic-caching-for-probabilistic-systems](../src/content/systems/semantic-caching-for-probabilistic-systems.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [seo-aeo-geo-how-things-fit-together](../src/content/systems/seo-aeo-geo-how-things-fit-together.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [seo-aeo-geo-in-plain-terms](../src/content/systems/seo-aeo-geo-in-plain-terms.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [skill-evaluation-and-versioning](../src/content/systems/skill-evaluation-and-versioning.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [skills-vs-prompts-vs-agents](../src/content/systems/skills-vs-prompts-vs-agents.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [structured-output-and-why-it-matters](../src/content/systems/structured-output-and-why-it-matters.mdx) | 🟡 Amber | Legacy | Yes | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [systems-001-foundations](../src/content/systems/systems-001-foundations.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [tech-stack-for-nlpg-driven-ai-assisted-sdlc](../src/content/systems/tech-stack-for-nlpg-driven-ai-assisted-sdlc.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [the-intelligence-assembly-model](../src/content/systems/the-intelligence-assembly-model.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [the-logic-void](../src/content/systems/the-logic-void.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [tool-use-when-language-triggers-actions](../src/content/systems/tool-use-when-language-triggers-actions.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [training-vs-inference](../src/content/systems/training-vs-inference.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [what-a-skill-is-in-ai-systems](../src/content/systems/what-a-skill-is-in-ai-systems.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [what-a-system-prompt-actually-is](../src/content/systems/what-a-system-prompt-actually-is.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [what-an-ai-model-actually-is](../src/content/systems/what-an-ai-model-actually-is.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [what-llms-are-optimized-for](../src/content/systems/what-llms-are-optimized-for.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [why-most-ai-projects-fail-after-the-demo-stage](../src/content/systems/why-most-ai-projects-fail-after-the-demo-stage.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [why-ocr-quietly-breaks-document-ai](../src/content/systems/why-ocr-quietly-breaks-document-ai.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |
| systems | [winning-ai-search-as-a-discoverability-system](../src/content/systems/winning-ai-search-as-a-discoverability-system.mdx) | 🟡 Amber | Legacy | None | Legacy Act I-III syntax template (candidate for v1 migration) |

