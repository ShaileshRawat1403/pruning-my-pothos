---
title: "Context window stress test"
description: "A small experiment to see where longer context starts to degrade quality."
publishDate: "2026-01-20"
tags:
  - experiments
  - local-llm
  - evaluation
  - context
coverUrl: "/covers/shelf/items/local-experiments/context-window-stress.png"
coverAlt: "Cover illustration for Context window stress test"
---

> **Key takeaways**
> - Longer context is not free; quality bends before it breaks.
> - A fixed dataset makes the drift visible.
> - Measure the threshold where summaries go vague.

If context windows are new, start with [Context windows as working memory](/systems/context-windows-as-working-memory/).

<div id="toc-anchor"></div>
<nav class="toc" aria-label="On-page">
  <h2 class="toc-title">Contents</h2>
  <div class="toc-groups">
    <details open>
      <summary>Orientation</summary>
      <ol>
        <li><a href="#architecture-map">Architecture map</a></li>
        <li><a href="#what-happened">What happened</a></li>
        <li><a href="#the-two-gates">The two gates</a></li>
      </ol>
    </details>
    <details>
      <summary>Experiment</summary>
      <ol>
        <li><a href="#experiment-walkthrough">Experiment walkthrough</a></li>
        <li><a href="#first-time-config">First-time config</a></li>
      </ol>
    </details>
    <details>
      <summary>Verification</summary>
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

The experiment is a loop: fixed documents in, fixed prompt, outputs out. The only variable is context length.

<figure class="diagram">
  <svg viewBox="0 0 1200 360" role="img" aria-labelledby="context-loop-title context-loop-desc">
    <title id="context-loop-title">Context test loop</title>
    <desc id="context-loop-desc">Documents feed a prompt, model output is scored, and the loop repeats.</desc>
    <rect width="1200" height="360" fill="#EFE5CF"/>
    <rect x="100" y="120" width="220" height="120" rx="16" fill="#FFFFFF" stroke="#1B1A17" stroke-width="3"/>
    <rect x="390" y="120" width="220" height="120" rx="16" fill="#FFFFFF" stroke="#1B1A17" stroke-width="3"/>
    <rect x="680" y="120" width="220" height="120" rx="16" fill="#FFFFFF" stroke="#1B1A17" stroke-width="3"/>
    <rect x="970" y="120" width="120" height="120" rx="16" fill="#FFFFFF" stroke="#1B1A17" stroke-width="3"/>
    <path d="M320 180 L390 180" stroke="#2A6F7F" stroke-width="6"/>
    <path d="M610 180 L680 180" stroke="#2A6F7F" stroke-width="6"/>
    <path d="M900 180 L970 180" stroke="#2A6F7F" stroke-width="6"/>
    <text x="210" y="190" fill="#1B1A17" font-size="23" text-anchor="middle" font-family="var(--font-mono)">Docs</text>
    <text x="500" y="190" fill="#1B1A17" font-size="23" text-anchor="middle" font-family="var(--font-mono)">Prompt</text>
    <text x="790" y="190" fill="#1B1A17" font-size="23" text-anchor="middle" font-family="var(--font-mono)">Model</text>
    <text x="1030" y="190" fill="#1B1A17" font-size="23" text-anchor="middle" font-family="var(--font-mono)">Score</text>
  </svg>
  <figcaption>The only variable is context length; everything else stays fixed.</figcaption>
</figure>

## What happened

Quality held up through the middle range, then bent. Past a threshold, summaries became vague and citations started drifting. The model still responded, but the answers softened.

## The two gates

The first gate is **retrieval fit**. If the context is already noisy, adding more text does not help.

The second gate is **attention budget**. Past a point, the model spends more effort tracking tokens than answering the question.

## Experiment walkthrough

1. Fix a small, representative document set.
2. Keep the prompt constant across runs.
3. Increase context in steps and score the output.

## First-time config

```bash
export OLLAMA_MODEL="llama3.1:8b"
export CONTEXT_STEPS="4k,8k,16k,32k"
```

<aside class="callout">
  <p><strong>Guiding rule.</strong> If you change more than one variable, the result stops being a signal.</p>
</aside>

## Quick checks

```bash
ollama run llama3.1:8b "summarize the document set"
```

## Failure modes

- Changing the document set between runs hides the drift.
- Adding context without scoring quality gives false confidence.
- Overfitting the prompt to one test case.

## What made the difference

I fixed the dataset and prompt, then focused on the slope where quality started to bend. That gave me a usable boundary.

## What I would do next time

I would add a small human rubric and track a single quality score per step to make the curve explicit.

