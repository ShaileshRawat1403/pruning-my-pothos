---
title: "Soothsayer MCP kernel: from prompts to controlled orchestration"
description: "How I built a policy-governed MCP runtime where models can reason freely but execution stays deterministic, verifiable, and auditable."
publishDate: "2026-03-04"
tags:
  - experiments
  - mcp
  - orchestration
  - policy
  - reliability
coverUrl: "/covers/shelf/local-soothsayer-mcp-kernel.svg"
coverAlt: "Cover illustration for Soothsayer MCP kernel: from prompts to controlled orchestration"
---

> **Key takeaways**
> - Reliable agents need a runtime loop, not just model + tools.
> - In this design, the model proposes actions, but the runtime decides execution.
> - Lifecycle state, permission gates, and trace logs are what make orchestration trustworthy.

This started from a familiar failure mode. Early agent demos looked impressive, but as soon as tasks became multi-step, the system became hard to trust. Tools executed in surprising order, state went out of sync, and success messages appeared without proof.

The core lesson was simple: model reasoning is probabilistic, but system execution must be controlled. So instead of building a tool-calling chatbot, I built `workspace-mcp` as a runtime kernel with explicit orchestration rules.

<div id="toc-anchor"></div>
<nav class="toc" aria-label="On-page">
  <h2 class="toc-title">Contents</h2>
  <div class="toc-groups">
    <details open>
      <summary>Act I: Orientation</summary>
      <ol>
        <li><a href="#architecture-map">Architecture map</a></li>
        <li><a href="#what-happened">What happened</a></li>
        <li><a href="#the-two-gates">The two gates</a></li>
        <li><a href="#message-parts-timeline">Message parts timeline</a></li>
      </ol>
    </details>
    <details>
      <summary>Act II: Build</summary>
      <ol>
        <li><a href="#setup-walkthrough">Setup walkthrough</a></li>
        <li><a href="#first-time-config">First-time config</a></li>
      </ol>
    </details>
    <details>
      <summary>Act III: Verification</summary>
      <ol>
        <li><a href="#quick-checks">Quick checks</a></li>
        <li><a href="#failure-modes">Failure modes</a></li>
        <li><a href="#what-made-the-difference">What made the difference</a></li>
        <li><a href="#what-i-would-do-next-time">What I would do next time</a></li>
      </ol>
    </details>
  </div>
</nav>

## Architecture map

The most important boundary is this:

`think` and `act` are separated.

The model can think and propose. The runtime can approve, deny, execute, verify, and record.

<figure class="diagram">
  <img src="/images/diagrams/soothsayer-runtime-loop.svg" alt="Runtime control loop showing user request, model proposal, session loop, tool execution, verification, and next step decision." loading="lazy" />
  <figcaption>The runtime loop is the product. The model is one component inside it.</figcaption>
</figure>

## What happened

The first version followed the typical pattern: prompt in, tool call out, answer back. It was fast to build and good for demos, but unreliable for sustained use.

Three problems kept repeating:

- tool calls retried in loops
- write operations happened without strong guardrails
- success was claimed before verification

## The two gates

The first gate is **permission governance**.
Before a tool runs, the runtime must decide: allow, deny, or ask user.

The second gate is **contract integrity**.
If response shape drifts, clients become fragile and audit trails become noisy.

<figure class="diagram">
  <img src="/images/diagrams/soothsayer-orchestration-core.svg" alt="Orchestration core diagram showing policy engine, tool registry, patch and bundle layer, and trace audit around the session loop." loading="lazy" />
  <figcaption>Internally, this is orchestration infrastructure: policy, tools, patches, and traces move as one system.</figcaption>
</figure>

## Message parts timeline

DAX-style event streaming becomes much easier to inspect when each response is split into structured parts instead of one long string. This is the timeline model that keeps execution debuggable.

<figure class="diagram">
  <img src="/images/diagrams/soothsayer-message-parts-timeline.svg" alt="Compact timeline showing reasoning, text, tool, patch, and step message parts as structured events." loading="lazy" />
  <figcaption>Message parts (`reasoning`, `text`, `tool`, `patch`, `step`) create an audit-friendly execution timeline.</figcaption>
</figure>

## Setup walkthrough

1. Enter the `workspace-mcp` package in the Soothsayer repo.
2. Install in editable mode with dev tooling.
3. Start the kernel with explicit workspace and profile.
4. Run a controlled lifecycle, not ad hoc tool calls.

```bash
cd workspace-mcp
python -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
```

```bash
workspace-mcp --workspace-root /tmp/workspace --profile dev
```

## First-time config

Project policy layering is where this becomes useful in real teams. The packaged kernel policy is stable, while each workspace can overlay tighter controls.

```bash
workspace-mcp \
  --workspace-root ./examples/minimal-project/workspace \
  --policy-path ./examples/minimal-project/project_policy.yaml \
  --profile dev
```

A minimal lifecycle should always follow this order:

1. `kernel_version`
2. `self_check`
3. `start_run`
4. `repo_search`
5. `create_change_bundle`
6. `bundle_report`
7. `end_run`
8. `get_run_summary`

This keeps every change traceable to one explicit run context.

## Quick checks

Build-time confidence:

```bash
pytest -q
ruff check .
mypy src
```

Deterministic hash parity:

```bash
python spec-tests/generate_bundle_hashes.py --check
```

Runtime behavior sanity:

```bash
workspace-mcp --workspace-root /tmp/workspace --profile read_only
```

For CI hardening, run the kernel under `ci` profile and assert blocked write flows return canonical violations instead of tool output.

## Failure modes

- Starting without `start_run`, then assuming subsequent steps are connected.
- Letting the model call tools directly without a policy decision boundary.
- Trusting success text without verification evidence.
- Treating violations as free-form errors rather than structured contract outputs.
- Ignoring loop behavior (repeated tool intents) until runtime costs spike.

## What made the difference

These decisions made the runtime resilient:

- Enforce runtime invariants (`meta` shape, code alignment, timestamp format).
- Make lifecycle explicit (`run_id`, owner scoping, bounded run store).
- Keep patch/change artifacts deterministic and hash-based.
- Record policy decisions in audit logs that can be explained later.

That moved the system from "assistant behavior" to "orchestrated execution."

## What I would do next time

I would add three integration harnesses on day one: one CLI loop, one IDE loop, one CI loop. The runtime is stable only when contract assumptions are tested from each client surface, not just from unit tests.

If you want the design lens behind this implementation, [Dual NLP framework](/docs/natural-language-programming-stack/) explains the planning language this runtime operationalizes.
