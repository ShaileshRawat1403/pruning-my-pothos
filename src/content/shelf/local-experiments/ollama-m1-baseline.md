---
title: "Ollama on M1: thermal baseline"
description: "A baseline run to learn where M1 throttles and why it matters."
publishDate: "2026-01-24"
tags:
  - experiments
  - local-llm
  - ollama
  - performance
coverUrl: "/covers/shelf/items/local-experiments/ollama-m1-baseline.png"
coverAlt: "Cover illustration for Ollama on M1: thermal baseline"
---

> **Key takeaways**
> - Local performance is a temperature story, not just a model story.
> - Baselines should be short, repeatable, and recorded.
> - Throttling hides inside long runs and ruins comparisons.

I wanted a fair baseline for local models on an M1 machine. The surprise was not raw speed. It was how quickly a clean run drifted once the system warmed up.

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

The system is simple: model runtime, the host machine, and the environment around it. The host is the real boundary.

<figure class="diagram">
  <svg viewBox="0 0 1200 420" role="img" aria-labelledby="m1-arch-title m1-arch-desc">
    <title id="m1-arch-title">Local runtime and host boundary</title>
    <desc id="m1-arch-desc">A model runtime sits inside a host boundary with thermal limits.</desc>
    <rect width="1200" height="420" fill="#0f172a"/>
    <rect x="140" y="80" width="920" height="260" rx="20" fill="#111827" stroke="#334155" stroke-width="2"/>
    <rect x="340" y="150" width="520" height="140" rx="16" fill="#0f1f33" stroke="#38bdf8" stroke-width="2"/>
    <text x="600" y="230" fill="#cbd5f5" font-size="18" text-anchor="middle" font-family="var(--font-mono)">Model runtime</text>
    <text x="170" y="120" fill="#94a3b8" font-size="14" font-family="var(--font-mono)">Host boundary</text>
  </svg>
  <figcaption>The host boundary decides how stable your baseline really is.</figcaption>
</figure>

## What happened

Short runs were fast. Long runs slowed down. Once I logged temperatures, the pattern was obvious: the system throttled after a few minutes, and the numbers became incomparable.

## The two gates

The first gate is **time**. If you test too long, you stop testing the model and start testing heat dissipation.

The second gate is **consistency**. Without a fixed prompt and a fixed run length, the baseline drifts even when nothing else changes.

## Setup walkthrough

1. Pick one model and one prompt.
2. Run the prompt in short bursts to avoid thermal drift.
3. Log run time and system temperature together.

## First-time config

```bash
export OLLAMA_HOST="http://127.0.0.1:11434"
export OLLAMA_MODEL="llama3.1:8b"
```

<aside class="callout">
  <p><strong>Guiding rule.</strong> Your first baseline is only valid for the temperature window you measured.</p>
</aside>

## Quick checks

```bash
ollama run llama3.1:8b "ping"
```

## Failure modes

- Long runs hide throttling until you compare a later test.
- Background apps push the host into a hotter state.
- Changing the prompt changes the performance profile.

## What made the difference

I treated the baseline as a short, repeatable ritual and logged the host temperature alongside the timing. That made later comparisons honest.

## What I would do next time

I would automate a short benchmark loop, record system temperature per run, and stop the test before the host warms up.

