---
name: decisioning-prepare-data-data-principles
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/brazeai/decisioning_studio/prepare_data/data_principles
indexed_at: '2026-04-05'
keywords:
  - identifier
  - events
  - timestamps
  - snapshots
  - deduplication
  - profiles
  - streams
  - quality
  - feedback
triggers:
  - prepare data for decisioning
  - structure event data
  - ensure data consistency
  - validate data quality
  - set up customer feeds
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's plugin structure are atomic knowledge units — they live in `skills/{name}/references/*.md` and are loaded selectively based on query depth routing. Keeping them dense and self-contained ensures they're useful at the "Default" depth (Sonnet, fast lookup) without requiring full context injection.
`─────────────────────────────────────────────────`

# Decisioning Studio: Core Data Principles

Four principles apply to all data sent to Decisioning Studio. Violating any of them is among the most common causes of degraded model performance.

---

## 1. One Consistent Customer Identifier Across All Assets

Every asset (profiles, activations, engagements, conversions) must use the **same single primary identifier**.

- **Violation risk**: If different assets use different ID systems (e.g., warehouse ID for features, platform ID for activations), the engine cannot join them reliably. This breaks the feedback loop and degrades model training and reporting.
- **Severe risk**: If the mapping between two ID systems is many-to-many rather than one-to-many, data integrity failures can be severe.

Use Braze external ID as the recommended identifier.

---

## 2. Event Data Must Be an Incremental Stream, Not a Snapshot

Events (conversions, engagements, activations) must be delivered as an **append-only stream of individual timestamped records**.

- **Violation risk**: Aggregated snapshots (e.g., a "last send time" attribute instead of individual send records) lose precise event timing. Without exact timestamps, the engine cannot attribute outcomes to specific decisions — the feedback loop breaks.

---

## 3. Snapshot Data Must Update on a Regular Time-Driven Schedule

Snapshots (customer profiles, features) must be refreshed on a **regular schedule (e.g., daily)**, not triggered by events.

- **Violation risk**: Event-triggered snapshot updates cause time-dependent features (e.g., "days since last purchase", "days since enrollment") to go stale for inactive customers. The model trains on outdated values, reducing recommendation accuracy.

---

## 4. All Assets Must Meet Minimum Data Quality Requirements

Data must be internally consistent, deduplicated, and complete.

- **Required**: Primary key fields present; join keys to other assets where applicable; no duplicate records before ingestion.
- **Violation risk**: Duplicates add noise to training and cause incorrect attribution. Missing keys prevent the engine from linking events across the customer journey (recommendation → conversion).

### Required Fields for Event Stream Records

| Field | Notes |
|-------|-------|
| Customer identifier | Must match identifier used in all other assets |
| Event timestamp | When the event **occurred** — not when the record was created |
| Record creation timestamp | When the record was created in your system (used for incremental export slicing) |
| Event type | — |
| Filterable fields | Enough to isolate the specific events you care about |

### Recommended Fields for Event Stream Records

| Field | Notes |
|-------|-------|
| Event metadata for matching | Enables linking conversion events back to the specific activation that preceded them |

`★ Insight ─────────────────────────────────────`
The two-timestamp pattern (event occurred vs. record created) is a subtle but critical distinction — it's what makes reliable incremental exports possible without re-scanning full history. This is worth highlighting in the topic file because it's easy to conflate and a common source of data bugs.
`─────────────────────────────────────────────────`
