---
title: "Azure setup: first cloud pass"
description: "A first-time Azure run that turned identity and networking into the real curriculum."
publishDate: "2026-01-26"
tags:
  - experiments
  - cloud
  - azure
  - setup
coverUrl: "/covers/shelf/items/local-experiments/azure-llm-vm-setup.png"
coverAlt: "Cover illustration for Azure setup: first cloud pass"
---

> **Key takeaways**
> - Azure treats identity and networking as the default gatekeepers.
> - Deployment names are part of the API contract, not a label.
> - Tight verification loops beat full app boots when the cloud is new.
> - Free credits are enough to learn the terrain safely.

I went to Azure for a clean, cloud-hosted RAG setup. I expected configuration work. I did not expect the first hour to be a tutorial in identity and network policy. The experience was useful because it forced me to see the platform the way Azure sees it: as a system of locks, not a single machine. If you are new to RAG, start with [Retrieval-Augmented Generation in plain terms](/systems/retrieval-augmented-generation-in-plain-terms/). For system boundaries and feedback loops, see [Systems 001: Foundations](/systems/systems-001-foundations/). For the difference between tuning and retrieval, see [Training vs inference](/systems/training-vs-inference/). If context is new, read [Context windows as working memory](/systems/context-windows-as-working-memory/).

If you are new to Azure, start with the free credits so you can explore without pressure: [Azure free credits](https://azure.microsoft.com/free/).

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
      <summary>Act II: Portal setup</summary>
      <ol>
        <li><a href="#portal-walkthrough">Portal walkthrough</a></li>
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

Azure makes more sense when you separate where things live from who can touch them.

- **Subscription** is the billing boundary.
- **Resource group** is your organizational box.
- **Services** are the active components: AI Foundry, Postgres, the app host.
- **Identity** decides who can act.
- **Networking** decides where traffic can flow.

<figure class="diagram">
  <svg viewBox="0 0 1200 620" role="img" aria-labelledby="azure-architecture-title azure-architecture-desc">
    <title id="azure-architecture-title">Azure architecture map</title>
    <desc id="azure-architecture-desc">Subscription and resource group contain services, with identity and networking as control planes.</desc>
    <rect width="1200" height="620" fill="#0b1b2b"/>
    <rect x="80" y="70" width="1040" height="480" rx="24" fill="#0f1f33" stroke="#1d4ed8" stroke-width="2"/>
    <rect x="140" y="130" width="920" height="360" rx="20" fill="#111827" stroke="#3b82f6" stroke-width="2"/>
    <text x="120" y="110" fill="#cbd5f5" font-size="14" font-family="var(--font-mono)">Subscription</text>
    <text x="160" y="160" fill="#cbd5f5" font-size="14" font-family="var(--font-mono)">Resource Group</text>
    <rect x="200" y="210" width="240" height="140" rx="16" fill="#0f1f33" stroke="#60a5fa" stroke-width="2"/>
    <rect x="480" y="210" width="240" height="140" rx="16" fill="#0f1f33" stroke="#60a5fa" stroke-width="2"/>
    <rect x="760" y="210" width="240" height="140" rx="16" fill="#0f1f33" stroke="#60a5fa" stroke-width="2"/>
    <text x="320" y="285" fill="#cbd5f5" font-size="16" text-anchor="middle" font-family="var(--font-mono)">Azure AI Foundry</text>
    <text x="600" y="285" fill="#cbd5f5" font-size="16" text-anchor="middle" font-family="var(--font-mono)">Postgres + pgvector</text>
    <text x="880" y="285" fill="#cbd5f5" font-size="16" text-anchor="middle" font-family="var(--font-mono)">App Host</text>
    <rect x="200" y="380" width="360" height="120" rx="16" fill="#0f1f33" stroke="#1d4ed8" stroke-width="2"/>
    <rect x="600" y="380" width="360" height="120" rx="16" fill="#0f1f33" stroke="#1d4ed8" stroke-width="2"/>
    <text x="380" y="450" fill="#cbd5f5" font-size="16" text-anchor="middle" font-family="var(--font-mono)">Identity</text>
    <text x="780" y="450" fill="#cbd5f5" font-size="16" text-anchor="middle" font-family="var(--font-mono)">Networking</text>
  </svg>
  <figcaption>Subscription and resource group hold the services; identity and networking decide who can do what.</figcaption>
</figure>

<figure class="diagram">
  <svg viewBox="0 0 1200 600" role="img" aria-labelledby="azure-rag-title azure-rag-desc">
    <title id="azure-rag-title">RAG flow on Azure</title>
    <desc id="azure-rag-desc">Client to Spring Boot, then to Azure AI Foundry and Postgres with pgvector, with logs on the edge.</desc>
    <rect width="1200" height="600" fill="#0b1b2b"/>
    <rect x="80" y="220" width="240" height="160" rx="18" fill="#0f1f33" stroke="#1d4ed8" stroke-width="2"/>
    <rect x="360" y="220" width="240" height="160" rx="18" fill="#0f1f33" stroke="#1d4ed8" stroke-width="2"/>
    <rect x="640" y="160" width="240" height="160" rx="18" fill="#0f1f33" stroke="#1d4ed8" stroke-width="2"/>
    <rect x="640" y="340" width="240" height="160" rx="18" fill="#0f1f33" stroke="#1d4ed8" stroke-width="2"/>
    <rect x="920" y="250" width="200" height="100" rx="18" fill="#0f1f33" stroke="#1d4ed8" stroke-width="2"/>
    <path d="M320 300 L360 300" stroke="#60a5fa" stroke-width="6"/>
    <path d="M600 260 L640 240" stroke="#60a5fa" stroke-width="6"/>
    <path d="M600 340 L640 360" stroke="#60a5fa" stroke-width="6"/>
    <path d="M880 300 L920 300" stroke="#60a5fa" stroke-width="6"/>
    <text x="200" y="310" fill="#cbd5f5" font-size="20" text-anchor="middle" font-family="var(--font-mono)">Client</text>
    <text x="480" y="310" fill="#cbd5f5" font-size="20" text-anchor="middle" font-family="var(--font-mono)">Spring Boot</text>
    <text x="760" y="230" fill="#cbd5f5" font-size="18" text-anchor="middle" font-family="var(--font-mono)">Azure AI Foundry</text>
    <text x="760" y="430" fill="#cbd5f5" font-size="18" text-anchor="middle" font-family="var(--font-mono)">Postgres + pgvector</text>
    <text x="1020" y="310" fill="#cbd5f5" font-size="18" text-anchor="middle" font-family="var(--font-mono)">Logs</text>
  </svg>
  <figcaption>RAG flow once identity and network gates are aligned.</figcaption>
</figure>

## What happened

I had a Spring Boot backend, a PostgreSQL database with `pgvector`, and a hosted LLM. The first deployment looked clean, but the system behaved like it was unplugged. The database connection timed out, and the LLM endpoint returned 404s even with the correct API key.

The fix was not in the code. It was in the cloud posture.

## The two gates

Identity is the first gate. In Azure AI Foundry, the deployment name is part of the contract. If the app expects `gpt-4o` and the deployment is named something else, the request fails without a helpful error.

Networking is the second gate. PostgreSQL Flexible Server starts in a default-deny posture. I had to explicitly open the Azure Firewall for my IP and allow internal Azure services.

<figure class="diagram">
  <svg viewBox="0 0 1200 600" role="img" aria-labelledby="azure-gates-title azure-gates-desc">
    <title id="azure-gates-title">Identity and networking gates</title>
    <desc id="azure-gates-desc">Two panels showing identity and networking checks that block or permit traffic.</desc>
    <rect width="1200" height="600" fill="#0b1b2b"/>
    <rect x="120" y="150" width="420" height="300" rx="20" fill="#0f1f33" stroke="#1d4ed8" stroke-width="2"/>
    <rect x="660" y="150" width="420" height="300" rx="20" fill="#0f1f33" stroke="#1d4ed8" stroke-width="2"/>
    <text x="330" y="200" fill="#cbd5f5" font-size="20" text-anchor="middle" font-family="var(--font-mono)">Identity</text>
    <text x="870" y="200" fill="#cbd5f5" font-size="20" text-anchor="middle" font-family="var(--font-mono)">Networking</text>
    <rect x="170" y="240" width="320" height="50" rx="12" fill="#111827" stroke="#3b82f6" stroke-width="2"/>
    <rect x="170" y="310" width="320" height="50" rx="12" fill="#111827" stroke="#3b82f6" stroke-width="2"/>
    <rect x="710" y="240" width="320" height="50" rx="12" fill="#111827" stroke="#3b82f6" stroke-width="2"/>
    <rect x="710" y="310" width="320" height="50" rx="12" fill="#111827" stroke="#3b82f6" stroke-width="2"/>
    <text x="330" y="272" fill="#94a3b8" font-size="16" text-anchor="middle" font-family="var(--font-mono)">Deployment name</text>
    <text x="330" y="342" fill="#94a3b8" font-size="16" text-anchor="middle" font-family="var(--font-mono)">API key + endpoint</text>
    <text x="870" y="272" fill="#94a3b8" font-size="16" text-anchor="middle" font-family="var(--font-mono)">Firewall rules</text>
    <text x="870" y="342" fill="#94a3b8" font-size="16" text-anchor="middle" font-family="var(--font-mono)">NSG / VNet</text>
  </svg>
  <figcaption>Two locks that decide whether your request is even allowed to speak.</figcaption>
</figure>

## Portal walkthrough

This is the most compact first-time path I found. The goal is to prove the system works before you optimize it. Treat this as a tour of Azure's main control surfaces.

1. **Create a resource group.** This is your container for everything that follows.
2. **Create PostgreSQL Flexible Server.** Choose a basic tier. Turn on the `pgvector` extension after the instance is running.
3. **Open the firewall.** Add your current IP and allow Azure services. Without this, connections will fail even if credentials are correct.
4. **Create an Azure AI Foundry project.** Deploy a model and give it a deployment name you will use in code.
5. **Collect the endpoint + key.** Treat these as the root of your API contract.

<figure class="diagram">
  <svg viewBox="0 0 1200 360" role="img" aria-labelledby="azure-portal-title azure-portal-desc">
    <title id="azure-portal-title">Portal path for first runs</title>
    <desc id="azure-portal-desc">Five steps from resource group to endpoint and key.</desc>
    <rect width="1200" height="360" fill="#0b1b2b"/>
    <rect x="80" y="120" width="190" height="120" rx="16" fill="#0f1f33" stroke="#1d4ed8" stroke-width="2"/>
    <rect x="310" y="120" width="190" height="120" rx="16" fill="#0f1f33" stroke="#1d4ed8" stroke-width="2"/>
    <rect x="540" y="120" width="190" height="120" rx="16" fill="#0f1f33" stroke="#1d4ed8" stroke-width="2"/>
    <rect x="770" y="120" width="190" height="120" rx="16" fill="#0f1f33" stroke="#1d4ed8" stroke-width="2"/>
    <rect x="1000" y="120" width="120" height="120" rx="16" fill="#0f1f33" stroke="#1d4ed8" stroke-width="2"/>
    <text x="175" y="155" fill="#cbd5f5" font-size="16" text-anchor="middle" font-family="var(--font-mono)">Resource</text>
    <text x="175" y="175" fill="#cbd5f5" font-size="16" text-anchor="middle" font-family="var(--font-mono)">Group</text>
    <text x="405" y="160" fill="#cbd5f5" font-size="16" text-anchor="middle" font-family="var(--font-mono)">Postgres</text>
    <text x="405" y="180" fill="#cbd5f5" font-size="16" text-anchor="middle" font-family="var(--font-mono)">Flexible</text>
    <text x="635" y="160" fill="#cbd5f5" font-size="16" text-anchor="middle" font-family="var(--font-mono)">Firewall</text>
    <text x="635" y="180" fill="#cbd5f5" font-size="16" text-anchor="middle" font-family="var(--font-mono)">Rules</text>
    <text x="865" y="160" fill="#cbd5f5" font-size="16" text-anchor="middle" font-family="var(--font-mono)">AI Foundry</text>
    <text x="865" y="180" fill="#cbd5f5" font-size="16" text-anchor="middle" font-family="var(--font-mono)">Deployment</text>
    <text x="1060" y="160" fill="#cbd5f5" font-size="16" text-anchor="middle" font-family="var(--font-mono)">Keys</text>
    <path d="M270 180 L310 180" stroke="#60a5fa" stroke-width="6"/>
    <path d="M500 180 L540 180" stroke="#60a5fa" stroke-width="6"/>
    <path d="M730 180 L770 180" stroke="#60a5fa" stroke-width="6"/>
    <path d="M960 180 L1000 180" stroke="#60a5fa" stroke-width="6"/>
  </svg>
  <figcaption>A conceptual map of the portal steps, not tied to UI layout.</figcaption>
</figure>

## First-time config

I kept the first run intentionally small. One model. One database. One backend. Azure gets easier when the first pass is narrow.

Wire the app with explicit environment variables. Avoid hidden defaults for the first pass.

```bash
export AZURE_OPENAI_ENDPOINT="https://<resource-name>.openai.azure.com"
export AZURE_OPENAI_API_KEY="<your-key>"
export AZURE_OPENAI_DEPLOYMENT="<deployment-name>"
export DATABASE_URL="postgresql://<user>:<password>@<db-hostname>:5432/<db-name>"
```

<figure class="diagram">
  <svg viewBox="0 0 1200 400" role="img" aria-labelledby="azure-config-title azure-config-desc">
    <title id="azure-config-title">Configuration focus for first runs</title>
    <desc id="azure-config-desc">A minimal set of environment variables grouped by model and database.</desc>
    <rect width="1200" height="400" fill="#0b1b2b"/>
    <rect x="140" y="110" width="420" height="180" rx="16" fill="#0f1f33" stroke="#1d4ed8" stroke-width="2"/>
    <rect x="640" y="110" width="420" height="180" rx="16" fill="#0f1f33" stroke="#1d4ed8" stroke-width="2"/>
    <text x="350" y="150" fill="#cbd5f5" font-size="18" text-anchor="middle" font-family="var(--font-mono)">Model</text>
    <text x="850" y="150" fill="#cbd5f5" font-size="18" text-anchor="middle" font-family="var(--font-mono)">Database</text>
    <text x="350" y="190" fill="#94a3b8" font-size="14" text-anchor="middle" font-family="var(--font-mono)">endpoint</text>
    <text x="350" y="220" fill="#94a3b8" font-size="14" text-anchor="middle" font-family="var(--font-mono)">api key</text>
    <text x="350" y="250" fill="#94a3b8" font-size="14" text-anchor="middle" font-family="var(--font-mono)">deployment</text>
    <text x="850" y="205" fill="#94a3b8" font-size="14" text-anchor="middle" font-family="var(--font-mono)">host</text>
    <text x="850" y="235" fill="#94a3b8" font-size="14" text-anchor="middle" font-family="var(--font-mono)">user</text>
    <text x="850" y="265" fill="#94a3b8" font-size="14" text-anchor="middle" font-family="var(--font-mono)">password</text>
  </svg>
  <figcaption>A short list of variables that removes most ambiguity.</figcaption>
</figure>

<aside class="callout">
  <p><strong>Guiding rule.</strong> If Azure can deny something, assume it will. Make each permission explicit.</p>
</aside>

## Quick checks

Check the database port is reachable:

```bash
nc -vz <db-hostname> 5432
```

Confirm the database allows your connection:

```bash
psql "postgresql://<user>:<password>@<db-hostname>:5432/<db-name>"
```

Verify the model deployment is reachable (Azure OpenAI-style endpoints):

```bash
curl -s \
  -H "api-key: $AZURE_OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  "$AZURE_OPENAI_ENDPOINT/openai/deployments/$AZURE_OPENAI_DEPLOYMENT/chat/completions?api-version=2024-06-01" \
  -d '{"messages":[{"role":"user","content":"ping"}],"max_tokens":5}'
```

## Failure modes

- The deployment name in code does not match the Azure AI Foundry deployment name.
- The database firewall blocks your IP, even if credentials are correct.
- The endpoint URL is right but the API version is not supported.
- Secrets are scattered across files and the app reads the wrong one.

## What made the difference

I mirrored the deployment name in my app config so there was no drift between code and Azure AI Foundry. I treated firewall setup as a prerequisite, not a later fix. And I validated the model endpoint with `curl` before touching Spring Boot.

## What I would do next time

I would open networking first, even before spinning up the app. I would validate the model endpoint and database with CLI probes to keep feedback tight. And I would centralize deployment names and resource groups from day one, because config drift hides the real problem.

