---
name: decisioning-prepare-data-data-streams
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/brazeai/decisioning_studio/prepare_data/data_streams
indexed_at: '2026-04-05'
keywords:
  - snapshots
  - events
  - timestamps
  - aggregation
  - behavior
  - activation
  - conversion
  - attributes
  - Currents
  - deduplication
triggers:
  - prepare data streams
  - structure snapshot data
  - configure event streams
  - map data to Braze
  - avoid losing late-arriving events
---
# Data Streams: Snapshots vs. Event Streams

Data falls into two fundamental categories. Mixing them up is the most common cause of poor model performance in Decisioning Studio.

---

## Snapshot Data (State)

Answers: *"What does this customer look like right now?"*

Static, aggregated, cumulative. Use for customer profiles and computed features (e.g., `days_since_last_purchase`, `loyalty_tier`, `churn_score`).

**Required fields:**
- Customer identifier
- Snapshot date

**Update rules:**
- **Trigger:** Time-driven (fixed daily schedule), not event-driven
- **Scope:** Every update must include ALL customers — including those with no activity
- **Method:** Append new records; never overwrite (preserves history for training)

**Daily delivery query:**
```sql
SELECT *
FROM snapshot_data
WHERE snapshot_date = {t-1} -- on pipeline run date t, export snapshot from t-1
```

---

## Event Stream Data (Flow)

Answers: *"What did this customer do, and when?"*

Raw, immutable, incremental, chronological. Use for activation records, engagement logs (opens, clicks), conversions, coupon redemptions.

**Required fields:**
- Customer identifier
- Event type (e.g., `activation`, `conversion`, `click`)
- Event timestamp — when the action **actually occurred**
- Creation timestamp — when the record was **written to your system** (may be later due to processing delays)
- Event properties (richer = better cross-journey attribution)

> **Event timestamp ≠ Creation timestamp.** Both are required. Do not conflate them.

**Update rules:**
- **Trigger:** Event-driven — new records added when events occur
- **Scope:** Only customers with new events get new records
- **Method:** Existing records are immutable — updates are always inserts

**Daily delivery query — use `create_timestamp`, not `event_timestamp`:**
```sql
-- CORRECT: captures late-arriving events
SELECT *
FROM events_data
WHERE DATE(create_timestamp) = {t-1}
```

```sql
-- INCORRECT: permanently loses late-arriving events
SELECT *
FROM events_data
WHERE DATE(event_timestamp) = {t-1}
```

**Why this matters:** An event that occurred Jan 1 but was written to your system Jan 2 will be missed forever if you slice on `event_timestamp`.

---

## Braze-Native Mappings

| Data Type | Braze Mechanism | Notes |
|-----------|----------------|-------|
| Snapshot | Custom Attributes | Stores user-level state; overwrites on update — do **not** use for raw events |
| Event Stream | Braze Currents (`USER_BEHAVIOR_CUSTOM_EVENTS`) | Immutable raw event flow; correct source for behavior data |

---

## Common Mistakes

### Sending event data as a snapshot
Aggregating events into snapshot fields before delivery causes:
- **Loss of granularity** — individual records cannot be reconstructed
- **Imprecise timestamps** — fields like `last_email_sent` lose full event history
- **Phantom updates** — snapshot records updated on no-event days create deduplication problems

Use Currents exports (not custom attributes) for raw event data.

### Updating snapshots on an event trigger
If `days_since_last_purchase` is only recalculated when a purchase occurs, it becomes stale for all customers who haven't purchased recently. Features that depend on time passage require daily recalculation across **all** customers — not just active ones.
