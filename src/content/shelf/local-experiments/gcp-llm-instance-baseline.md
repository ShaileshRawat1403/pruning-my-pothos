---
title: "GCP GPU instance baseline"
description: "A first cloud baseline with focus on projects, IAM, and network rules."
publishDate: "2026-01-26"
tags:
  - experiments
  - cloud
  - gcp
  - setup
coverUrl: "/covers/shelf/items/local-experiments/gcp-llm-instance-baseline.png"
coverAlt: "Cover illustration for GCP GPU instance baseline"
---

> **Key takeaways**
> - GCP projects are real boundaries, not just labels.
> - IAM and firewall rules are the actual control planes.
> - Keep the first run narrow and repeatable.

This run was about understanding GCP's platform shape, not performance. If you want the RAG fundamentals, see [Retrieval-Augmented Generation in plain terms](/systems/retrieval-augmented-generation-in-plain-terms/).

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
      <summary>Portal setup</summary>
      <ol>
        <li><a href="#portal-walkthrough">Portal walkthrough</a></li>
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

GCP centers around projects. Everything inherits IAM and network rules from the project boundary.

<figure class="diagram">
  <svg viewBox="0 0 1200 520" role="img" aria-labelledby="gcp-arch-title gcp-arch-desc">
    <title id="gcp-arch-title">GCP baseline map</title>
    <desc id="gcp-arch-desc">A project boundary containing compute and database, with IAM and firewall as control planes.</desc>
    <rect width="1200" height="520" fill="#EFE5CF"/>
    <rect x="120" y="80" width="960" height="360" rx="20" fill="#FFFFFF" stroke="#1B1A17" stroke-width="3"/>
    <rect x="200" y="150" width="320" height="140" rx="16" fill="#FFFFFF" stroke="#2A6F7F" stroke-width="3"/>
    <rect x="620" y="150" width="320" height="140" rx="16" fill="#FFFFFF" stroke="#2A6F7F" stroke-width="3"/>
    <text x="360" y="230" fill="#1B1A17" font-size="23" text-anchor="middle" font-family="var(--font-mono)">GPU instance</text>
    <text x="780" y="230" fill="#1B1A17" font-size="23" text-anchor="middle" font-family="var(--font-mono)">Postgres</text>
    <rect x="200" y="320" width="320" height="90" rx="12" fill="#FFFFFF" stroke="#2A6F7F" stroke-width="3"/>
    <rect x="620" y="320" width="320" height="90" rx="12" fill="#FFFFFF" stroke="#2A6F7F" stroke-width="3"/>
    <text x="360" y="375" fill="#1B1A17" font-size="20" text-anchor="middle" font-family="var(--font-mono)">Firewall rules</text>
    <text x="780" y="375" fill="#1B1A17" font-size="20" text-anchor="middle" font-family="var(--font-mono)">IAM</text>
    <text x="150" y="110" fill="#4B4A46" font-size="20" font-family="var(--font-mono)">Project boundary</text>
  </svg>
  <figcaption>Project boundary with IAM and firewall rules as the two control planes.</figcaption>
</figure>

## What happened

The instance was live, but my app could not reach it. The firewall rule existed, but it was attached to the wrong network tag. The result looked like a code bug, but it was not.

## The two gates

The first gate is **IAM**. If the account does not have the right permissions, the service looks available but fails on use.

The second gate is **firewall rules**. The rule has to match the instance tags and the network you actually use.

## Portal walkthrough

1. Create a new GCP project for this experiment.
2. Enable the compute and AI services you need.
3. Create a GPU instance with a single, known image.
4. Add a firewall rule for the port you will hit.
5. Create the database and keep it in the same region.

## First-time config

```bash
export LLM_HOST="http://<instance-ip>:<port>"
export DATABASE_URL="postgresql://<user>:<password>@<db-hostname>:5432/<db-name>"
```

<aside class="callout">
  <p><strong>Guiding rule.</strong> In GCP, if the project is wrong, everything downstream is wrong.</p>
</aside>

## Quick checks

```bash
nc -vz <instance-ip> <port>
psql "postgresql://<user>:<password>@<db-hostname>:5432/<db-name>"
```

## Failure modes

- Firewall rule exists but does not match the instance tag.
- Services are not enabled on the project.
- Database lives in a different region than the instance.

## What made the difference

I treated project setup as an architectural decision, not a form. Once the project, IAM, and firewall rules aligned, the rest of the setup behaved.

## What I would do next time

I would verify project services first, pin the instance image, and keep every resource in one region.

