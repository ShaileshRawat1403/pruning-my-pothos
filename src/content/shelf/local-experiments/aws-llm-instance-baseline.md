---
title: "AWS GPU instance baseline"
description: "A minimal cloud baseline focused on identity, networking, and cost control."
publishDate: "2026-01-26"
tags:
  - experiments
  - cloud
  - aws
  - setup
coverUrl: "/covers/shelf/items/local-experiments/aws-llm-instance-baseline.png"
coverAlt: "Cover illustration for AWS GPU instance baseline"
---

> **Key takeaways**
> - Cloud baselines fail at identity, networking, and instance drift.
> - A small, repeatable path beats a big, flexible one.
> - Verify endpoints before wiring the app.

This run was about learning the AWS shape, not squeezing performance. For system boundaries and failure loops, see [Systems 001: Foundations](/systems/systems-001-foundations/).

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

The AWS mental model is a VPC boundary with security groups and IAM as the two control planes.

<figure class="diagram">
  <svg viewBox="0 0 1200 520" role="img" aria-labelledby="aws-arch-title aws-arch-desc">
    <title id="aws-arch-title">AWS baseline map</title>
    <desc id="aws-arch-desc">A VPC boundary holds compute and database, with IAM and security groups as control layers.</desc>
    <rect width="1200" height="520" fill="#EFE5CF"/>
    <rect x="120" y="80" width="960" height="360" rx="20" fill="#E4D6B8" stroke="#1B1A17" stroke-width="3"/>
    <rect x="200" y="150" width="320" height="140" rx="16" fill="#FFFFFF" stroke="#C0663C" stroke-width="3"/>
    <rect x="620" y="150" width="320" height="140" rx="16" fill="#FFFFFF" stroke="#C0663C" stroke-width="3"/>
    <text x="360" y="230" fill="#1B1A17" font-size="23" text-anchor="middle" font-family="var(--font-mono)">GPU instance</text>
    <text x="780" y="230" fill="#1B1A17" font-size="23" text-anchor="middle" font-family="var(--font-mono)">Postgres</text>
    <rect x="200" y="320" width="320" height="90" rx="12" fill="#FFFFFF" stroke="#C0663C" stroke-width="3"/>
    <rect x="620" y="320" width="320" height="90" rx="12" fill="#FFFFFF" stroke="#C0663C" stroke-width="3"/>
    <text x="360" y="375" fill="#1B1A17" font-size="20" text-anchor="middle" font-family="var(--font-mono)">Security groups</text>
    <text x="780" y="375" fill="#1B1A17" font-size="20" text-anchor="middle" font-family="var(--font-mono)">IAM</text>
  </svg>
  <figcaption>VPC boundary with security groups and IAM as the two control planes.</figcaption>
</figure>

## What happened

My first run failed even with valid keys. The issue was not the model. It was a security group rule that blocked the inbound port and a missing IAM permission that made the instance look healthy but unusable.

## The two gates

The first gate is **IAM**. If the role is wrong, you can see the instance but cannot use it.

The second gate is **networking**. Security groups block traffic by default; your app must be explicitly allowed.

## Portal walkthrough

1. Create a VPC or reuse the default one for the first pass.
2. Launch a GPU instance and attach a minimal IAM role.
3. Open the inbound port for your app and database access.
4. Create a Postgres instance inside the same VPC.
5. Collect the endpoint, key, and host values for config.

## First-time config

```bash
export LLM_HOST="http://<instance-ip>:<port>"
export DATABASE_URL="postgresql://<user>:<password>@<db-hostname>:5432/<db-name>"
```

<aside class="callout">
  <p><strong>Guiding rule.</strong> If you cannot describe the VPC boundary, you will debug the wrong layer.</p>
</aside>

## Quick checks

```bash
nc -vz <instance-ip> <port>
psql "postgresql://<user>:<password>@<db-hostname>:5432/<db-name>"
```

## Failure modes

- IAM role looks correct but lacks the specific service permission.
- Security group allows the port but the instance subnet is private.
- Using a different region for the database adds invisible latency.

## What made the difference

I treated IAM and security groups as first-class parts of the architecture, not afterthoughts. Once those gates were clear, the rest was predictable.

## What I would do next time

I would pin the AMI, keep everything in a single region, and log network rules alongside app config.

