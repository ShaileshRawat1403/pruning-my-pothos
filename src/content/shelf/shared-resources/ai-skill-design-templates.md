---
title: "AI skill design templates"
seoTitle: "AI Skill Templates: Define, Review and Compose a Reusable Skill"
description: "Three copy-ready AI skill templates: one to define a skill, one to review a change to it, one to hand it to the next step. Each field explained, with a filled example."
publishDate: "2026-03-08"
tags:
  - resources
  - skills
  - workflow
  - prompting
  - governance
coverUrl: "/covers/shelf/shared-semantic-bridge.svg"
coverAlt: "Cover illustration for AI skill design templates"
resourceHighlights:
  - "Skill definition template for reusable task boundaries."
  - "Skill review template for versioned behavior changes."
  - "Skill composition template for handoff-safe orchestration."
---

Use these when a prompt you keep pasting has started doing a job. A prompt is the input to one run; a skill is the same job written down once, with what it takes, what it returns, and what counts as done. The difference is explained in [skills vs prompts vs agents](/systems/skills-vs-prompts-vs-agents/).

There are three templates. Most skills only ever need the first.

## 1. Skill definition template

Fill this in when a task repeats and you want the same result from it every time.

```yaml
name:
objective:
inputs:
constraints:
tools:
output_format:
success_criteria:
failure_modes:
escalation:
```

What each field is for:

- **name**: what people will call it. One job, one name.
- **objective**: the single outcome, in one sentence. If it needs "and", it may be two skills.
- **inputs**: what it is given, and in what shape. Anything not listed here is not its responsibility.
- **constraints**: what it must not do or change. The easiest field to leave empty and the one reviews end up being about.
- **tools**: which tools it may call. None is a valid answer.
- **output_format**: the shape of what comes back, precise enough for code to check.
- **success_criteria**: how you would know it worked, written so two people would agree.
- **failure_modes**: the ways it is known to go wrong, so they can be checked for.
- **escalation**: what happens when it cannot finish: stop, retry, or hand to a person.

An illustrative example, filled in:

```yaml
name: extract-invoice-fields
objective: Return the invoice number, total and currency from one invoice.
inputs: The text of a single invoice.
constraints:
  - Do not guess a field that is not on the invoice.
  - Do not convert currencies.
tools: none
output_format: JSON with invoice_id (string), total (number), currency (ISO code)
success_criteria: All three fields match the invoice, or are null when absent.
failure_modes:
  - Several totals on one invoice (subtotal, tax, total).
  - Currency shown only as a symbol.
escalation: If more than one total could be the answer, return null and flag it.
```

## 2. Skill review template

Fill this in when a skill changes, so the change in behaviour is written down rather than discovered.

```yaml
skill_version:
change_summary:
expected_behavior_change:
test_cases:
rollback_note:
```

- **skill_version**: the version this change produces. Bump it when behaviour changes, not when wording does.
- **change_summary**: what was edited.
- **expected_behavior_change**: what should now come out differently. "None" is a claim worth testing.
- **test_cases**: the inputs that show the change, including at least one that should not have changed.
- **rollback_note**: how to go back if it misbehaves.

## 3. Skill composition template

Fill this in when one skill's output becomes another step's input.

```yaml
trigger:
upstream_context:
skill_execution:
output_contract:
downstream_handoff:
```

- **trigger**: what starts this skill.
- **upstream_context**: what it receives from the step before.
- **skill_execution**: which skill runs, and at which version.
- **output_contract**: what the next step can rely on, usually the definition's output_format.
- **downstream_handoff**: who or what receives it, and what happens if the output fails its check.

## Where these stop

A template is a contract on paper. It makes a disagreement cheap, because it shows up in a field before it shows up in a result. It does not enforce anything: a constraint written here is still an instruction until something checks it. Deciding where a skill's boundary sits, and when one skill should be two, is covered in [designing reusable AI skills](/systems/designing-reusable-ai-skills/).

Related:

- [Designing reusable AI skills](/systems/designing-reusable-ai-skills/)
- [Skills vs prompts vs agents](/systems/skills-vs-prompts-vs-agents/)
- [What a system prompt actually is](/systems/what-a-system-prompt-actually-is/)
