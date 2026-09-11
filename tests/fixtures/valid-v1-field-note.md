---
title: "Valid Author-Attested Field Note"
description: "A valid field note documenting observed behavior during an infrastructure migration."
schemaVersion: "1.0"
contentKind: "field-note"
readerIntent: "inspect"
readerOutcome: "Recognize how cache invalidation cascades under real load."
thesis: "Secondary cache eviction causes transient tail latency spikes."
publishDate: "2026-09-10"
provenance:
  primary: "observed"
  statement: "Observed directly during internal cluster load testing on 2026-09-08."
  claims:
    - statement: "In our production cluster, secondary cache eviction caused transient tail latency spikes."
      kind: "observed"
      attestation: "author"
---

In our production cluster, secondary cache eviction caused transient tail latency spikes.

When keys were cleared simultaneously, downstream services queued requests until cold storage re-warmed.
