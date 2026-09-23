# Editorial Integrity Audit Report

Content snapshot: sha256:c7e70ab61da4b5f5ae2de38edb1ce359bf672af2f5aa633f23765ebef1b92bc0
Status: Read-only diagnostic of the existing article archive.

## Status Definitions

- **Green**: No integrity risk detected by the current automated checks.
- **Amber**: Useful content, but certainty, comparative claims, or evidence need qualification.
- **Red**: Cannot currently be published as asserted under the evidence available to the validator (e.g. unverified first-person incidents, unanchored metrics).
- **Illustrative**: Explicitly declared in frontmatter/markup as an illustrative example or constructed scenario.

## Summary Register

| Total Articles | Green | Amber | Red | Illustrative |
| :--- | :--- | :--- | :--- | :--- |
| 54 | 53 | 0 | 1 | 0 |

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
| systems | [a-simple-tokenizer](../src/content/systems/a-simple-tokenizer.mdx) | 🟢 Green | v1.0 | Yes | Clean |
| systems | [agent-instructions-and-handoff-as-an-operating-system](../src/content/systems/agent-instructions-and-handoff-as-an-operating-system.mdx) | 🟢 Green | v1.0 | Yes | Clean |
| systems | [ai-agents-vs-ai-workflows](../src/content/systems/ai-agents-vs-ai-workflows.mdx) | 🟢 Green | v1.0 | Yes | Clean |
| systems | [ai-architecture-explained-how-modern-llm-applications-work](../src/content/systems/ai-architecture-explained-how-modern-llm-applications-work.mdx) | 🟢 Green | v1.0 | Yes | Clean |
| systems | [architecture-of-in-chat-ai-apps](../src/content/systems/architecture-of-in-chat-ai-apps.mdx) | 🟢 Green | v1.0 | Yes | Clean |
| systems | [context-windows-as-working-memory](../src/content/systems/context-windows-as-working-memory.mdx) | 🟢 Green | v1.0 | Yes | Clean |
| systems | [designing-reusable-ai-skills](../src/content/systems/designing-reusable-ai-skills.mdx) | 🟢 Green | v1.0 | Yes | Clean |
| systems | [evaluation-is-a-human-problem](../src/content/systems/evaluation-is-a-human-problem.mdx) | 🟢 Green | v1.0 | Yes | Clean |
| systems | [from-agent-intent-to-governed-execution](../src/content/systems/from-agent-intent-to-governed-execution.mdx) | 🟢 Green | v1.0 | Yes | Clean |
| systems | [from-prompt-to-production](../src/content/systems/from-prompt-to-production.mdx) | 🟢 Green | v1.0 | Yes | Clean |
| systems | [human-in-the-loop-is-a-system-design-choice](../src/content/systems/human-in-the-loop-is-a-system-design-choice.mdx) | 🟢 Green | v1.0 | Yes | Clean |
| systems | [i-7-cognitive-loop](../src/content/systems/i-7-cognitive-loop.mdx) | 🟢 Green | v1.0 | Yes | Clean |
| systems | [observability-first-ai-systems](../src/content/systems/observability-first-ai-systems.mdx) | 🟢 Green | v1.0 | Yes | Clean |
| systems | [policy-governed-mcp-runtimes-for-secure-tool-execution](../src/content/systems/policy-governed-mcp-runtimes-for-secure-tool-execution.mdx) | 🟢 Green | v1.0 | Yes | Clean |
| systems | [prompting-is-not-the-skill-you-think-it-is](../src/content/systems/prompting-is-not-the-skill-you-think-it-is.mdx) | 🟢 Green | v1.0 | Yes | Clean |
| systems | [retrieval-augmented-generation-in-plain-terms](../src/content/systems/retrieval-augmented-generation-in-plain-terms.mdx) | 🟢 Green | v1.0 | Yes | Clean |
| systems | [runtime-over-model-why-orchestration-is-the-product](../src/content/systems/runtime-over-model-why-orchestration-is-the-product.mdx) | 🟢 Green | v1.0 | Yes | Clean |
| systems | [semantic-caching-for-probabilistic-systems](../src/content/systems/semantic-caching-for-probabilistic-systems.mdx) | 🟢 Green | v1.0 | Yes | Clean |
| systems | [seo-aeo-geo-in-plain-terms](../src/content/systems/seo-aeo-geo-in-plain-terms.mdx) | 🟢 Green | v1.0 | Yes | Clean |
| systems | [skills-vs-prompts-vs-agents](../src/content/systems/skills-vs-prompts-vs-agents.mdx) | 🟢 Green | v1.0 | Yes | Clean |
| systems | [structured-output-and-why-it-matters](../src/content/systems/structured-output-and-why-it-matters.mdx) | 🟢 Green | v1.0 | Yes | Clean |
| systems | [systems-001-foundations](../src/content/systems/systems-001-foundations.mdx) | 🟢 Green | v1.0 | Yes | Clean |
| systems | [tech-stack-for-nlpg-driven-ai-assisted-sdlc](../src/content/systems/tech-stack-for-nlpg-driven-ai-assisted-sdlc.mdx) | 🟢 Green | v1.0 | Yes | Clean |
| systems | [tool-use-when-language-triggers-actions](../src/content/systems/tool-use-when-language-triggers-actions.mdx) | 🟢 Green | v1.0 | Yes | Clean |
| systems | [training-vs-inference](../src/content/systems/training-vs-inference.mdx) | 🟢 Green | v1.0 | Yes | Clean |
| systems | [what-a-system-prompt-actually-is](../src/content/systems/what-a-system-prompt-actually-is.mdx) | 🟢 Green | v1.0 | Yes | Clean |
| systems | [what-an-ai-model-actually-is](../src/content/systems/what-an-ai-model-actually-is.mdx) | 🟢 Green | v1.0 | Yes | Clean |
| systems | [why-ocr-quietly-breaks-document-ai](../src/content/systems/why-ocr-quietly-breaks-document-ai.mdx) | 🟢 Green | v1.0 | Yes | Clean |

