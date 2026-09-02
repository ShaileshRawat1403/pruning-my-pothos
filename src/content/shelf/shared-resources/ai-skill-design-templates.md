---
title: "AI skill design templates"
description: "Three compact templates for defining, reviewing, and composing AI skills as reusable execution units."
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

These templates are for the moment when a useful prompt starts repeating often enough that it should become a reusable capability.

The goal is not to create documentation overhead. The goal is to make repeated work clearer, safer, and easier to hand off.

## Skill definition template

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

Use this when a repeated task needs a stable contract.

## Skill review template

```yaml
skill_version:
change_summary:
expected_behavior_change:
test_cases:
rollback_note:
```

Use this when a skill changes and you want the behavior shift to stay explicit.

## Skill composition template

```yaml
trigger:
upstream_context:
skill_execution:
output_contract:
downstream_handoff:
```

Use this when one skill becomes part of a wider workflow.

These templates work best when paired with:

- [What a Skill Is in AI Systems](/systems/what-a-skill-is-in-ai-systems/)
- [Skills vs Prompts vs Agents](/systems/skills-vs-prompts-vs-agents/)
- [Dual NLP for AI-assisted SDLC](/docs/natural-language-programming-stack/)
