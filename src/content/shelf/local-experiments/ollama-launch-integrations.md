---
title: "Ollama launch: integration handoff"
seoTitle: "Ollama Integration Setup: Hand Local Models to Codex and OpenCode"
description: "A launcher flow that hands a local Ollama model to Codex or OpenCode. Setup walkthrough, the two gates it checks, failure modes and what fixed them."
publishDate: "2026-01-27"
tags:
  - experiments
  - local-llm
  - ollama
  - workflow
coverUrl: "/covers/shelf/local-ollama-launch.svg"
coverAlt: "Cover illustration for Ollama launch: integration handoff"
---

> **Key takeaways**
> - `ollama launch` turns model selection into a single handoff step.
> - The integration list is the contract: install the tool before you launch it.
> - A short, visible flow beats hidden config when you are new to local stacks.

This experiment is about a new entry point: `ollama launch`. Instead of wiring a tool to a model by hand, the launcher asks which integration you want and then routes the model into it. The result feels like a simple handoff layer for local AI tools.

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

`ollama launch` acts like a dispatcher. You pick a tool, then a model, and it hands the model into that tool.

<figure class="diagram">
  <svg viewBox="0 0 1200 420" role="img" aria-labelledby="ollama-launch-arch-title ollama-launch-arch-desc">
    <title id="ollama-launch-arch-title">Ollama launch handoff</title>
    <desc id="ollama-launch-arch-desc">Ollama launch selects an integration, then hands a model into the tool session.</desc>
    <rect width="1200" height="420" fill="#0f172a"/>
    <rect x="120" y="140" width="220" height="140" rx="16" fill="#111827" stroke="#334155" stroke-width="2"/>
    <rect x="430" y="140" width="260" height="140" rx="16" fill="#111827" stroke="#334155" stroke-width="2"/>
    <rect x="780" y="90" width="260" height="100" rx="16" fill="#111827" stroke="#334155" stroke-width="2"/>
    <rect x="780" y="230" width="260" height="100" rx="16" fill="#111827" stroke="#334155" stroke-width="2"/>
    <path d="M340 210 L430 210" stroke="#38bdf8" stroke-width="6"/>
    <path d="M690 190 L780 140" stroke="#38bdf8" stroke-width="6"/>
    <path d="M690 230 L780 280" stroke="#38bdf8" stroke-width="6"/>
    <text x="230" y="215" fill="#cbd5f5" font-size="16" text-anchor="middle" font-family="var(--font-mono)">Ollama</text>
    <text x="560" y="215" fill="#cbd5f5" font-size="16" text-anchor="middle" font-family="var(--font-mono)">Launch menu</text>
    <text x="910" y="150" fill="#cbd5f5" font-size="14" text-anchor="middle" font-family="var(--font-mono)">Tool A</text>
    <text x="910" y="290" fill="#cbd5f5" font-size="14" text-anchor="middle" font-family="var(--font-mono)">Tool B</text>
  </svg>
  <figcaption>A small handoff layer: choose the tool, then the model.</figcaption>
</figure>

## What happened

The flow started with a simple command and a menu. The launcher listed available integrations (Claude, Codex, OpenCode, and others), then asked for a model. When I selected Codex without having it installed, the launcher surfaced the missing dependency clearly and told me what to install.

<figure class="diagram">
  <img src="/images/screenshots/ollama-launch-integration-menu.png" alt="Ollama launch integration menu listing Claude, Codex, Droid, and OpenCode." loading="lazy" />
  <figcaption>Integration menu: the launcher presents the available tools.</figcaption>
</figure>

<details class="image-expand">
  <summary>More screenshots</summary>
  <figure class="diagram">
    <img src="/images/screenshots/ollama-launch-model-select.png" alt="Ollama launch model selection screen showing multiple local models." loading="lazy" />
    <figcaption>Model selection: choose a local model for the selected tool.</figcaption>
  </figure>
</details>

## The two gates

The first gate is **tool installation**. If the integration is not installed, the launcher stops and tells you exactly what is missing.

The second gate is **model availability**. If the model is not local, the handoff stalls until it is pulled or selected.

## Setup walkthrough

1. Run the launcher.
2. Select an integration (Codex, OpenCode, or another tool you have installed).
3. Select a local model.
4. Start the tool session.

```bash
ollama launch
```

## First-time config

When Codex was missing, the launcher pointed to the installation command. After installing, the same launch flow worked cleanly.

```bash
npm install -g @openai/codex
```

<figure class="diagram">
  <img src="/images/screenshots/ollama-launch-missing-codex.png" alt="Terminal message showing Codex is not installed and suggesting npm install -g @openai/codex." loading="lazy" />
  <figcaption>A clean failure path: missing integrations are explicit.</figcaption>
</figure>

## Quick checks

```bash
ollama launch codex
```

```bash
ollama launch opencode
```

```bash
ollama launch claude
```

<figure class="diagram">
  <img src="/images/screenshots/ollama-launch-codex-running.png" alt="Terminal showing Codex running after ollama launch codex." loading="lazy" />
  <figcaption>The handoff works once the tool is installed.</figcaption>
</figure>

## Failure modes

- Launching a tool before it is installed.
- Selecting a model that is not available locally.
- Assuming the launcher is a model manager rather than a handoff layer.

## What made the difference

The launcher compresses setup into one visible decision tree. Instead of hunting for flags and configs, you pick a tool and a model and move on.

## What I would do next time

I would pre-install the integrations I care about, then treat `ollama launch` as the default entry point for local tool sessions.

