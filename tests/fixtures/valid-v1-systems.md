---
title: "Policy Boundary Markdown Format"
description: "Why host execution boundaries isolate model capabilities."
schemaVersion: "1.0"
contentKind: "explainer"
readerIntent: "understand"
readerOutcome: "Determine which tool permissions belong in prompt vs runtime."
thesis: "Model prompts cannot enforce security boundaries that require deterministic guarantees."
shortAnswer: "A policy-governed runtime moves authorization out of the prompt and into a deterministic host supervisor. The model proposes tool calls, but the host environment verifies permissions against immutable rules before execution begins."
category: "Concepts"
boundary:
  is: "An architecture for isolating tool execution in a host sandbox."
  isNot: "A guarantee against prompt injection in free-form reasoning."
  mattersWhen: "Tools have write access or outbound network access."
provenance:
  primary: "synthesis"
  sources:
    - id: "runtime-core"
      type: "repository"
      url: "https://github.com/example/mcp-runtime"
      path: "src/policy/engine.rs"
      ref: "4b825dc642cb6eb9a060e54bf8d69288fbee4904"
  claims:
    - statement: "The runtime rejects execution above the declared policy tier before invoking tools."
      kind: "repository"
      sources:
        - "runtime-core"
---

The runtime rejects execution above the declared policy tier before invoking tools.

Execution boundaries remain deterministic even when inputs vary.
