---
title: "Unrelated Incident in Observed Document Test"
description: "Demonstrates rejection when an observed document contains an unbacked incident narrative."
schemaVersion: "1.0"
contentKind: "field-note"
readerIntent: "inspect"
readerOutcome: "Understand that every incident phrase must map to an author-attested claim."
thesis: "Observed primary status does not authorize unbacked incident claims."
publishDate: "2026-09-10"
provenance:
  primary: "observed"
  statement: "Observed directly during cluster testing."
  claims:
    - statement: "In our production cluster, secondary cache eviction caused transient tail latency spikes."
      kind: "observed"
      attestation: "author"
---

In our production cluster, secondary cache eviction caused transient tail latency spikes.

Last week, we received a bug report regarding intermittent database disconnections.
