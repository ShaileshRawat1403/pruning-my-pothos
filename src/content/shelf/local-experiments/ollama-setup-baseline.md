---
title: "Ollama setup: local baseline"
description: "A first clean install that taught me where local stacks really fail."
publishDate: "2026-01-26"
tags:
  - experiments
  - local-llm
  - ollama
  - setup
coverUrl: "/covers/shelf/items/local-experiments/ollama-setup-baseline.png"
coverAlt: "Cover illustration for Ollama setup: local baseline"
---

> **Key takeaways**
> - Local stacks fail at the edges: model names, memory, and heat.
> - A repeatable baseline beats a fast demo.
> - Verify the model before you wire the app.

I wanted a stable local baseline before changing models, prompts, or context size. The surprise was how many failure modes live outside the code. For the RAG side of this stack, see [Retrieval-Augmented Generation in plain terms](/systems/retrieval-augmented-generation-in-plain-terms/).

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
      </ol>
    </details>
    <details>
      <summary>Act II: Setup</summary>
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

Local Ollama is a short stack: a model runtime, a local API, and your app. The boundaries are simple, which makes the bottlenecks obvious.

<figure class="diagram">
  <svg viewBox="0 0 1200 520" role="img" aria-labelledby="ollama-arch-title ollama-arch-desc">
    <title id="ollama-arch-title">Local Ollama architecture</title>
    <desc id="ollama-arch-desc">App calls a local API which routes to a model runtime and files on disk.</desc>
    <rect width="1200" height="520" fill="#0f172a"/>
    <rect x="120" y="170" width="220" height="180" rx="16" fill="#111827" stroke="#334155" stroke-width="2"/>
    <rect x="410" y="170" width="260" height="180" rx="16" fill="#111827" stroke="#334155" stroke-width="2"/>
    <rect x="730" y="120" width="300" height="140" rx="16" fill="#111827" stroke="#334155" stroke-width="2"/>
    <rect x="730" y="290" width="300" height="140" rx="16" fill="#111827" stroke="#334155" stroke-width="2"/>
    <path d="M340 260 L410 260" stroke="#38bdf8" stroke-width="6"/>
    <path d="M670 220 L730 200" stroke="#38bdf8" stroke-width="6"/>
    <path d="M670 300 L730 320" stroke="#38bdf8" stroke-width="6"/>
    <text x="230" y="265" fill="#cbd5f5" font-size="18" text-anchor="middle" font-family="var(--font-mono)">App</text>
    <text x="540" y="265" fill="#cbd5f5" font-size="18" text-anchor="middle" font-family="var(--font-mono)">Ollama API</text>
    <text x="880" y="200" fill="#cbd5f5" font-size="16" text-anchor="middle" font-family="var(--font-mono)">Model runtime</text>
    <text x="880" y="360" fill="#cbd5f5" font-size="16" text-anchor="middle" font-family="var(--font-mono)">Model files</text>
  </svg>
  <figcaption>The shortest useful path: app → local API → runtime + model files.</figcaption>
</figure>

## What happened

The install looked easy and it was. The failure showed up later: a model name mismatch, a stalled pull, and thermal throttling after a long run. Each issue felt minor, but they compounded into unstable baselines.

## The two gates

The first gate is **model identity**. If the model name in your prompt runner does not match the local registry, the request fails or pulls the wrong thing.

The second gate is **host capacity**. Local runs are bounded by RAM, VRAM, and heat. Even on a good machine, long runs will drift if the system throttles.

## Setup walkthrough

1. Install Ollama and verify the CLI is present.
2. Pull one model and run a single prompt to confirm the runtime.
3. Keep the first run small. Your goal is a stable baseline, not speed.

## First-time config

I pinned the model and forced explicit names in config so I did not guess later.

```bash
export OLLAMA_HOST="http://127.0.0.1:11434"
export OLLAMA_MODEL="llama3.1:8b"
```

<aside class="callout">
  <p><strong>Guiding rule.</strong> If the model name is not explicit, the test result is not reliable.</p>
</aside>

## Quick checks

```bash
ollama list
ollama run llama3.1:8b "ping"
```

## Failure modes

- Model name in code does not match the local registry.
- The first run pulls a large model and stalls without feedback.
- Thermal throttling changes latency after a few minutes.

## What made the difference

I locked the model name, measured the first five runs only, and recorded machine state while the fan curve was stable. That turned the baseline into something I could compare later.

## What I would do next time

I would script the baseline run from the start, capture system temperature in the log, and freeze the model version before testing anything else.

