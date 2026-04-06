---
name: decisioning-reporting-diagnostics
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/brazeai/decisioning_studio/reporting/diagnostics
indexed_at: '2026-04-05'
keywords:
  - diagnostics
  - decisioning
  - outbound
  - inbound
  - recommendations
  - activations
  - delivery
  - data
  - feeds
  - monitoring
triggers:
  - how to monitor recommendation health
  - troubleshoot data delivery issues
  - track recommendation activations
  - check inbound data flows
  - diagnose decisioning problems
---
## Decisioning Diagnostics

The diagnostics report provides two views for monitoring BrazeAI™ decisioning health: **Outbound** and **Inbound**.

---

### Outbound Diagnostics

Tracks the daily volume of recommendations **generated** and **activated** across audiences.

Use it to:
- Spot delivery issues
- Track spikes or drops in activations
- Confirm messages are reaching the right audience groups

Filters available: date range, audience selection.

---

### Inbound Diagnostics

Monitors the health of data feeds flowing into BrazeAI™. Tracks file counts, sizes, and row volumes per asset.

Use it to:
- Confirm data is flowing in as expected
- Troubleshoot data issues before they affect agents or campaigns

Filters available: date range, data asset selection, chart metric (e.g., average file size, file count).

#### Inbound Report Fields

| Field | Description |
|-------|-------------|
| Data asset | Name of the dataset or file delivered |
| Date | Date the data was received |
| Last delivery time | Most recent time the data was delivered |
| File count | Total number of files received |
| Max file size (MBs) | Size of the largest file received |
| Average file size (MBs) | Average size of all files received |
| File row count | Total number of rows in the delivered files |
