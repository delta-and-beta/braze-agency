---
name: engineer-export-api
description: >-
  Implements data export endpoints for user data, segments, campaigns, canvases,
  and custom events.
metadata:
  role: braze-engineer
  topics:
    - export-user-data-post-users-segment
    - export-user-data-post-users-identifier
    - export-user-data-post-users-global-control-group
    - export-segments-post-cancel-export
    - export-segments-get-segment
    - export-campaigns-get-campaigns
    - export-campaigns-get-campaign-details
    - export-canvas-get-canvases
    - export-canvas-get-canvas-details
    - export-custom-events-get-custom-events
    - export-custom-events-get-custom-events-data
    - export-purchases-get-list-product-id
    - export-sessions-get-sessions-analytics
    - export-custom-attributes-get-custom-attributes
    - endpoints-export
    - export-user-data
    - export-sessions
    - export-custom-attributes
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
The writing-skills skill is TDD-focused (for creating skills you'll use yourself), but here the task is content generation — producing a plugin skill file for a braze-engineer agent. The TDD cycle doesn't apply; what applies is good synthesis: organizing the provided topic knowledge into a scannable, agent-readable reference.
`─────────────────────────────────────────────────`

# Export API Engineering

## Overview

This skill covers implementing, consuming, and debugging Braze's data export endpoints. It synthesizes patterns across user exports, segment exports, campaign/canvas analytics, and catalog-style list endpoints (events, attributes, products).

**Use this skill when:**
- Implementing code that calls any Braze `/users/export/*`, `/segments/*`, `/canvas/*`, `/campaigns/*`, `/events`, `/purchases/*`, or `/sessions/*` endpoint
- Debugging pagination issues on list endpoints
- Handling async export jobs (segment exports) vs. synchronous list responses
- Choosing the right export strategy for a given data shape

**Do not use for:** write operations, subscription group management, messaging APIs.

---

## Export Architecture Patterns

Braze export endpoints fall into two distinct patterns — know which you're dealing with before implementing:

| Pattern | Trigger | Response | Example |
|---|---|---|---|
| **Async file export** | `POST` | Job ID → S3/Azure file links | `/users/export/segment` |
| **Synchronous list** | `GET` | Paginated JSON array inline | `/events`, `/canvas/list` |
| **Synchronous detail** | `GET` | Single resource object | `/campaigns/details`, `/canvas/details` |
| **Analytics series** | `GET` | Time-series data array | `/sessions/data_series`, `/sends/data_series` |

> **Critical:** `/users/export/global_control_group` is a `POST` despite being a data export. POST is used here because the request body carries filter parameters too complex for query strings — not because it mutates state.

---

## User Export Endpoints

### Export by Segment — `POST /users/export/segment`

Triggers an async export of all users in a segment. Output is newline-delimited JSON files hosted on cloud storage.

**Required permission:** `users.export.segment`

**Key request fields:**

```json
{
  "segment_id": "abc123",
  "callback_endpoint": "https://your-app.com/webhook",
  "fields_to_export": ["external_id", "email", "custom_attributes"]
}
```

**Response:** Returns an `export_id`. Poll or use the callback to retrieve download URLs.

**Cancellation:** Use `POST /export/segment/cancel` with `{ "segment_id": "abc123" }` and `segments.list` permission. Cancels **all ongoing exports** for that segment.

### Export by Identifier — `POST /users/export/ids`

Synchronous export for up to **50 users** per request. Accepts `external_ids` or `user_aliases`.

```json
{
  "external_ids": ["user_1", "user_2"],
  "fields_to_export": ["email", "push_subscribe", "custom_attributes"]
}
```

**When to use vs. segment export:** Use `/ids` for targeted lookups (profile inspection, reconciliation). Use `/segment` for bulk population exports.

### Export Global Control Group — `POST /users/export/global_control_group`

Same async pattern as segment export but scoped to the global control group. No `segment_id` needed.

---

## Segment Metadata — `GET /segments/details`

Returns metadata for a single segment (not user data).

**Required permission:** `segments.details`

**Request parameters:**

| Parameter | Required | Description |
|---|---|---|
| `segment_id` | Yes | Target segment |

Returns name, creation time, filter definition, and analytics tracking status.

---

## Campaign & Canvas Endpoints

### List Campaigns

Use `GET /campaigns/list` for paginated campaign discovery. Results sorted newest-first by default.

**Pagination:** `page` (0-indexed), `include_archived` flag available.

### Get Campaign Details — `GET /campaigns/details`

**Required permission:** `campaigns.details`

Returns full campaign configuration including message variants, conversion events, and send schedule.

```
GET /campaigns/details?campaign_id=abc123
```

**Send Analytics:** For API campaigns only, use `GET /sends/data_series?send_id=...` — data is retained for **14 days** after send.

### List Canvases — `GET /canvas/list`

Returns paginated list (100 per page) sorted oldest-to-newest. Includes name, API identifier, and tags.

**Pagination pattern:**

```python
page = 0
while True:
    resp = get("/canvas/list", params={"page": page, "include_archived": False})
    canvases = resp["canvases"]
    if not canvases:
        break
    process(canvases)
    page += 1
```

### Get Canvas Details — `GET /canvas/details`

Returns full Canvas configuration: steps, variants, entry schedule, and conversion events.

```
GET /canvas/details?canvas_id=abc123
```

---

## Catalog-Style List Endpoints

These endpoints return paginated lists sorted alphabetically, 50 records per page.

### Custom Events — `GET /events`

**Required permission:** `events.get` | **Rate limit:** Default Braze rate limit

Returns custom event names recorded for your app. Use `cursor` for pagination when it's returned in the response.

```python
cursor = None
while True:
    params = {"cursor": cursor} if cursor else {}
    resp = get("/events", params=params)
    process(resp["events"])
    cursor = resp.get("cursor")
    if not cursor:
        break
```

### Custom Attributes — `GET /custom_attributes`

**Required permission:** `custom_attributes.get`

Same pagination pattern as events. Returns attribute name, type (`string`, `boolean`, `number`, etc.), and whether it's nested.

### Product IDs — `GET /purchases/product_list`

**Required permission:** `purchases.product_list`

Returns paginated product ID list. Use `page` (integer, 0-indexed) for pagination.

---

## Analytics Time-Series

### Sessions Analytics — `GET /sessions/data_series`

Returns session counts over a time range.

**Required parameters:**

| Parameter | Type | Notes |
|---|---|---|
| `length` | integer | Number of days in series (max 100) |
| `unit` | string | `"day"` or `"hour"` |
| `ending_at` | ISO 8601 | End of the series window |
| `app_id` | string | Filter to specific app (optional) |

Response is an array of `{ time, sessions }` objects.

---

## Pagination Quick Reference

| Endpoint | Mechanism | Page Size |
|---|---|---|
| `/users/export/segment` | Async, no pagination | Full segment |
| `/users/export/ids` | N/A (max 50 IDs) | 50 |
| `/canvas/list` | `page` (0-indexed) | 100 |
| `/campaigns/list` | `page` (0-indexed) | varies |
| `/events` | `cursor` (string token) | 50 |
| `/custom_attributes` | `cursor` (string token) | 50 |
| `/purchases/product_list` | `page` (0-indexed) | varies |
| `/sessions/data_series` | `length` + `ending_at` window | N/A |

**Cursor vs. page:** Prefer cursor-based pagination when available — it's stable under concurrent writes. Page-based pagination can skip or duplicate records if the dataset changes during iteration.

---

## Permission Reference

| Endpoint | Required Permission |
|---|---|
| `POST /users/export/segment` | `users.export.segment` |
| `POST /users/export/ids` | `users.export.ids` |
| `POST /users/export/global_control_group` | `users.export.global_control_group` |
| `POST /export/segment/cancel` | `segments.list` |
| `GET /segments/details` | `segments.details` |
| `GET /campaigns/details` | `campaigns.details` |
| `GET /canvas/list` | `canvas.list` |
| `GET /canvas/details` | `canvas.details` |
| `GET /events` | `events.get` |
| `GET /custom_attributes` | `custom_attributes.get` |
| `GET /purchases/product_list` | `purchases.product_list` |

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| Calling `GET` on `/users/export/segment` | It's `POST` — the segment ID goes in the request body |
| Polling segment export indefinitely | Use `callback_endpoint` or implement exponential backoff with a timeout |
| Requesting `fields_to_export` with invalid field names | Validate against the Braze field list; invalid fields cause the whole export to fail |
| Using `page`-based pagination on `/events` | Use `cursor` — page parameter is not supported for that endpoint |
| Treating `/sends/data_series` as persistent | Data expires 14 days post-send; cache or store it if you need historical access |
| Calling `/users/export/global_control_group` as `GET` | It's `POST` |
