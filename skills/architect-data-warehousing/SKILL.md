---
name: architect-data-warehousing
description: >-
  Designs and manages Snowflake data warehouse schemas, ETL pipelines, entity
  relationships, and data retention policies.
metadata:
  role: braze-architect
  topics:
    - data-warehouses-snowflake
    - data-warehouses-snowflake-user-attributes
    - data-warehouses-snowflake-sample-queries
    - data-warehouses-snowflake-faqs
    - data-warehouses-snowflake-etl-pipeline-setup
    - data-warehouses-snowflake-entity-relationships
    - data-warehouses-snowflake-data-sharing
    - data-warehouses-snowflake-data-retention
    - data-and-analytics-data-warehouses
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- Skill files for Claude Code plugins are essentially **context injection documents** — they shape how the agent reasons, not just what it knows. The lens/perspective framing is important because it tells Claude *which angle* to apply knowledge from.
- The `writing-skills` skill I loaded recommends keeping frequently-referenced skills under ~500 words and avoiding narrative storytelling — good constraints to keep in mind here.
`─────────────────────────────────────────────────`

Here is the generated skill file:

---

# Data Warehouse Architecture

## Overview

This skill covers the design, management, and optimization of Snowflake data warehouse schemas in the context of Braze's Secure Data Sharing integration. The **braze-architect** lens emphasizes schema design correctness, query performance, entity relationship integrity, and data governance — not just raw feature usage.

Use this skill when:
- Designing or auditing a Snowflake schema that consumes Braze event or user data
- Setting up or troubleshooting an ETL pipeline over Braze's Snowflake data share
- Mapping entity relationships across Braze messaging channels in SQL
- Evaluating data retention implications for compliance or cost control
- Answering questions about what data is available, how it is structured, and how long it persists

Do **not** use this skill for general Braze campaign configuration, SDK integration, or non-Snowflake data destinations.

---

## Lens: Schema Design, Query Optimization, Data Modeling, and Warehouse Governance

Every recommendation from this skill should be evaluated through four lenses:

| Lens | Key Questions |
|------|--------------|
| **Schema Design** | Is the schema normalized appropriately? Are naming conventions consistent? Are join keys indexed? |
| **Query Optimization** | Does the query use partition pruning? Are aggregations pushed down? Are full table scans avoidable? |
| **Data Modeling** | Do entity relationships reflect Braze's actual data model? Are foreign key semantics understood even if unenforced? |
| **Warehouse Governance** | Is PII handled in compliance with Braze's anonymization policy? Is data retention configured to align with business needs? |

---

## Topics Synthesized

### 1. Snowflake Data Warehouse Overview
Braze provides a Snowflake-native SaaS integration via Secure Data Sharing — no ETL replication required. Data is accessed directly through a shared database, meaning Braze manages the source tables and the consumer account queries them read-only. Understand that schema changes originate from Braze, not the consumer.

### 2. User Profile Attributes Schema
Three view categories cover default and custom attributes: default attributes (standard profile fields), custom attributes (merchant-defined), and computed attributes. Design queries that join across these views using `external_user_id` as the stable cross-system key. Be aware that custom attribute column names are dynamic and may require schema introspection at pipeline build time.

### 3. Sample Queries and ETL Pipeline Setup
The canonical ETL entry point is an email clicks query pattern. Structure pipelines around:
- **Time-bounded extraction**: Always filter by `time` or `sf_created_at` to enable incremental loads
- **Deduplication**: Events can appear more than once; use `id` (event UUID) as the deduplication key
- **Channel partitioning**: Separate pipeline branches per messaging channel reduce join complexity

### 4. Entity Relationships
Braze's Snowflake schema uses a hub-and-spoke model: `USERS_BEHAVIORS_*` event tables connect to user profiles via `external_user_id`, and to campaign/canvas metadata via `campaign_id` / `canvas_id` / `message_variation_id`. Key relationships per channel (email, push, SMS, in-app, content cards) are documented — always verify which join keys are available before writing cross-channel queries.

### 5. Data Sharing Architecture
Braze uses Snowflake's **Secure Data Sharing** (not a data copy). This means:
- No storage costs for the consumer on shared tables
- No cross-region data copy by default — region alignment between Braze's Snowflake account and the consumer's is required for zero-latency sharing
- PII obfuscation is not available at the sharing layer; must be handled in consumer-side views or masking policies

### 6. Data Retention Policies
Braze anonymizes PII in Snowflake event data older than **2 years**. Certain event types have shorter retention windows. Design downstream models and retention schedules around this:
- Aggregate or snapshot user-level data before the 2-year window if longitudinal analysis is required
- Do not architect systems that assume raw PII persists indefinitely
- The anonymization replaces identifiable fields with nulls or pseudonymous tokens — downstream joins on those fields will silently fail after the cutoff

---

## Common Mistakes

| Mistake | Correct Approach |
|---------|-----------------|
| Joining on `user_id` (internal Braze ID) instead of `external_user_id` | Use `external_user_id` as the cross-system key |
| Full table scans on large event tables | Always filter on `time` or partition columns first |
| Assuming data share is a live copy | It is a live share — schema changes from Braze propagate immediately |
| Building models that expect PII after 2 years | Snapshot or aggregate PII-dependent data well before the anonymization window |
| Cross-region data share without alignment check | Verify Snowflake region parity between Braze account and consumer account |
| Treating custom attribute columns as stable | Column names reflect Braze workspace config — validate schema before pipeline deployment |

---

## Quick Reference

```sql
-- Incremental event extraction pattern
SELECT *
FROM BRAZE_SHARE.USERS_BEHAVIORS_EMAIL_CLICK_SHARED
WHERE time >= :last_extracted_ts
  AND time < :current_run_ts
QUALIFY ROW_NUMBER() OVER (PARTITION BY id ORDER BY time DESC) = 1;

-- Cross-channel user attribution join
SELECT
    u.external_user_id,
    e.campaign_id,
    e.canvas_id,
    e.time AS event_time
FROM USERS_BEHAVIORS_EMAIL_OPEN_SHARED e
JOIN USERS_ATTRIBUTES_SHARED u
    ON e.external_user_id = u.external_user_id
WHERE e.time > DATEADD('day', -30, CURRENT_TIMESTAMP());
```

`★ Insight ─────────────────────────────────────`
- The "Quick Reference" SQL section is valuable here because architects most frequently need copy-paste patterns for incremental loads and cross-channel joins — the two patterns that go wrong most often.
- Note how the `QUALIFY ROW_NUMBER()` deduplication pattern is baked in — this reflects the Braze-specific fact that event tables can contain duplicate `id` values, which is a non-obvious schema characteristic that belongs in the skill.
`─────────────────────────────────────────────────`
