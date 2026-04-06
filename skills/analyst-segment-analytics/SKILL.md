---
name: analyst-segment-analytics
description: >-
  Analyzes segment composition, custom event patterns, and user attribute
  distributions.
metadata:
  role: braze-analyst
  topics:
    - export-segments-get-segment-details
    - export-segments-get-segment-analytics
    - export-segments-get-segment
    - export-segments-post-cancel-export
    - export-custom-events-get-custom-events-data
    - export-custom-events-get-custom-events-analytics
    - export-custom-events-get-custom-events
    - export-custom-attributes-get-custom-attributes
    - export-segments
    - export-custom-events
    - export-custom-attributes
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
Plugin skill files serve a different purpose than personal process skills — they act as **contextual routing documents** that help Claude decide *when* to invoke domain-specific knowledge. The lens/perspective metadata is particularly valuable here: it tells the agent *how* to interpret data, not just *what* data to look at.
`─────────────────────────────────────────────────`

# Segment & Event Analytics

## Overview

This skill covers the analysis of segment composition, custom event patterns, and user attribute distributions within Braze. Use it when you need to understand **who your users are**, **what actions they take**, and **how behavioral signals correlate with segment membership**.

The guiding lens is **audience behavior patterns, event frequency analysis, and attribute correlation** — meaning every API call here should be interpreted not just as data retrieval, but as evidence about audience dynamics and engagement trends.

## When to Use This Skill

Use this skill when:
- Investigating the size, trend, or metadata of a specific user segment
- Auditing which custom events exist and how frequently they fire
- Exporting or canceling exports of segment data
- Correlating custom attribute distributions with event behavior
- Answering questions like "Is this segment growing?", "What events does this audience trigger most?", or "Which attributes distinguish high-engagement users?"

Do **not** use this skill for campaign performance metrics, message delivery analysis, or conversion funnels — those fall under separate campaign analytics skills.

## Lens: Audience Behavior Patterns

Every topic in this skill should be read through the following analytical perspective:

- **Segment composition** — What defines this audience? Is it rule-based or dynamic? How is membership changing over time?
- **Event frequency** — How often do specific custom events fire? Are there spikes, drops, or anomalies in the time series?
- **Attribute correlation** — Do users with certain custom attribute values cluster into specific segments or event patterns? What attributes predict high engagement?

This lens transforms raw API responses into audience intelligence.

## Topics Synthesized

| Topic | Purpose |
|-------|---------|
| **Get Segment Details** | Retrieve metadata (name, filter definition, tags) for a specific segment by ID |
| **Get Segment Analytics** | Pull a daily size time series to track segment growth or decay |
| **List Segments** | Enumerate all segments; use for discovery and bulk auditing |
| **Cancel Segment Export** | Halt in-progress exports for a given segment; important for managing API quota |
| **Segments Export Overview** | Understand the full export lifecycle — initiation, progress, and cancellation |
| **Get Custom Events Data** | Paginated list of all custom events recorded in the app |
| **Get Custom Events Analytics** | Time-series occurrence counts per event — the primary signal for event frequency analysis |
| **List Custom Events** | Enumerate events alphabetically in groups of 50; useful for schema auditing |
| **Custom Events Export Overview** | Context on exporting raw event data at scale |
| **Get Custom Attributes** | Retrieve all custom attribute definitions — the vocabulary of your user properties |
| **Custom Attributes Export Overview** | Describes the structure and limitations of attribute export |

## Key API Patterns

**Segment analysis flow:**
1. `GET /segments/details` — inspect the segment definition and tags
2. `GET /segments/data_series` — retrieve the daily size trend
3. `POST /export/segment/cancel` — cancel any stale export jobs if needed

**Event frequency flow:**
1. `GET /events` — enumerate all custom events (paginate in groups of 50)
2. `GET /events/data_series` — pull occurrence counts over a time window for the events of interest

**Attribute correlation setup:**
1. `GET /custom_attributes` — enumerate attributes (paginate in groups of 50)
2. Cross-reference attribute distributions with segment membership or event co-occurrence

## Required API Key Permissions

| Operation | Required Permission |
|-----------|-------------------|
| Segment metadata | `segments.details` |
| Segment size series | `segments.data_series` |
| List/export segments | `segments.list` |
| List custom events | `events.get` |
| Event time series | `events.data_series` |
| List custom attributes | `custom_attributes.get` |

## Common Analytical Tasks

**"Is this segment growing?"**
→ Use `GET /segments/data_series` with a 30–90 day window. Plot or compare first vs. last value.

**"What's the event frequency trend for X?"**
→ Use `GET /events/data_series` with `event_name=X`. Look for weekly seasonality or step-change anomalies.

**"Which custom attributes exist for correlation analysis?"**
→ Use `GET /custom_attributes` (paginate until `has_more: false`) to build the full attribute schema before querying user-level data.

**"A segment export is stuck — how do I clear it?"**
→ `POST /export/segment/cancel` with the `segment_id`. Requires `segments.list` permission.

## Analytical Considerations

- Segment size values from `data_series` are **estimates**, not exact counts — account for margin of error in trend analysis.
- Custom event lists are sorted **alphabetically** and paginated at 50; for large event catalogs, collect all pages before analyzing distribution.
- Rate limits apply to all endpoints — batch requests across time windows rather than issuing parallel calls for the same resource.
- Attribute and event schemas change as the product evolves; always re-fetch the list before assuming a static schema.

`★ Insight ─────────────────────────────────────`
The "topics synthesized" table acts as a **skill index within the skill** — it lets Claude quickly match a user's question to the exact API topic without loading all topic files. The "common analytical tasks" section mirrors how users actually phrase questions, which improves routing accuracy when the skill is used as a router target.
`─────────────────────────────────────────────────`
