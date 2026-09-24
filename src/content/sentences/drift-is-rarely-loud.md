---
title: 'Drift is rarely loud.'
summary: 'Silent degradation happens in small increments that escape macro monitoring.'
category: 'Attention'
tags:
  - observability
  - reliability
  - safety
  - drift
  - seo
  - aeo
  - geo
---

Major outages are rare. The more common failure mode is drift: the slow, quiet erosion of performance over time.

When models drift, they do not throw errors. They simply provide slightly less accurate, slightly less relevant, or slightly less grounded answers.

Because drift is quiet, macro metrics often miss it. We must look at micro signals, user patterns, and sample quality to catch it early.

**What this changes in practice:** check small batches of production inputs and outputs weekly to detect shift patterns before they impact macro success.
