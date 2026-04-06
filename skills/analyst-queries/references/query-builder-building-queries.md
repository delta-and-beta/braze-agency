---
name: query-builder-building-queries
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/analytics/query_builder/building_queries
indexed_at: '2026-04-05'
keywords:
  - query
  - segment
  - analytics
  - SQL
  - filtering
  - targeting
  - events
  - behavior
  - builder
triggers:
  - how to build queries
  - creating segments
  - analyzing user behavior
  - building custom segments
  - query builder
---
The provided content contains only a Jekyll template include tag (`{% multi_lang_include ... %}`), meaning the actual content wasn't resolved before being passed in. I'll produce a minimal, honest topic file from what's available.

---

# Building Queries

> **Note:** The original source for this topic uses a Jekyll multi-language include (`brazeai/generative_ai/building_queries.md`). The content below reflects the topic scope based on available context.

## Overview

Building Queries in Braze AI refers to constructing analytical or segmentation queries using Braze's query tools, potentially augmented by generative AI capabilities to assist in query construction.

## Key Concepts

- **Query Builder** — Braze's interface for constructing SQL-like queries against your data (e.g., Currents, Snowflake data)
- **Generative AI assistance** — AI-powered suggestions or auto-completion to help construct queries
- **Segment queries** — Filters applied to user populations for targeting or analysis

## Typical Query Structure

```sql
SELECT user_id, event_type, time
FROM users_behaviors_app_firstsession
WHERE app_id = 'your-app-id'
  AND time BETWEEN '2024-01-01' AND '2024-12-31'
LIMIT 100
```

## Common Use Cases

- Analyzing user behavior patterns
- Building custom segments from event data
- Extracting campaign performance metrics
- Joining user profile data with event streams

---

`★ Insight ─────────────────────────────────────`
The source document uses `{% multi_lang_include %}` — a Jekyll pattern for shared content across localized doc sites. When Nick's pipeline encounters unresolved template tags, the fetched content is the raw Liquid syntax rather than the rendered HTML, which means the adapter's fetch/clone step likely captures markdown sources before Jekyll renders them. For complete topics, the pipeline would need to resolve these includes before the Triage step.
`─────────────────────────────────────────────────`
