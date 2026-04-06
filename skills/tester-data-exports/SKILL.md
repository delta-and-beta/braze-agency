---
name: tester-data-exports
description: >-
  Verifies export data completeness, format correctness, and analytics
  consistency across all export endpoints.
metadata:
  role: braze-tester
  topics:
    - export-user-data-post-users-segment
    - export-user-data-post-users-identifier
    - export-user-data-post-users-global-control-group
    - export-segments-post-cancel-export
    - export-segments-get-segment-analytics
    - export-campaigns-get-send-analytics
    - export-campaigns-get-campaign-analytics
    - export-canvas-get-canvas-analytics
    - export-canvas-get-canvas-analytics-summary
    - export-kpi-get-kpi-dau-date
    - export-purchases-get-revenue-series
    - export-custom-events-get-custom-events-data
    - export-sessions-get-sessions-analytics
    - export-custom-attributes-get-custom-attributes
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- Braze export endpoints split into two behavioral families: **bulk async exports** (segment, identifier, global control group) that return job IDs and must be polled, vs. **synchronous analytics queries** that return data immediately — testing strategy differs fundamentally between them
- The `cancel` endpoint (`POST /export/segment/cancel`) is an unusual pattern: a `POST` that acts as a control signal, not a data mutation — validating it requires confirming that subsequent export status calls reflect the cancellation
`─────────────────────────────────────────────────`

# Data Export Validation

## Purpose

Validate the correctness, completeness, and consistency of all Braze data export and analytics endpoints. This skill covers bulk user export flows, segment and campaign analytics, KPI time series, and real-time event/attribute retrieval — tested through the lens of data integrity, cross-endpoint consistency, and export completeness.

Apply this skill when verifying that:
- Export jobs return all expected users with correct field shapes
- Analytics time series are internally consistent across endpoints
- Pagination and rate limits behave correctly under load
- Cancellation, permissions, and error states are handled properly

---

## Scope and Topics

This skill synthesizes the following Braze API surface areas:

### Bulk User Export Endpoints (Async)

| Topic | Endpoint | Method |
|---|---|---|
| Export Users by Segment | `/users/export/segment` | POST |
| Export Users by Identifier | `/users/export/ids` | POST |
| Export Global Control Group Users | `/users/export/global_control_group` | POST |
| Cancel Segment Export | `/export/segment/cancel` | POST |

These endpoints initiate jobs and return `export_id` or `object_prefix` values. Validation requires polling until completion — test assertions must account for async timing, not just the initial response.

### Analytics and Time Series Endpoints (Synchronous)

| Topic | Endpoint | Method |
|---|---|---|
| Get Segment Analytics | `/segments/data_series` | GET |
| Get KPI DAU by Date | `/kpi/dau/data_series` | GET |
| Get Custom Events Data | `/events` | GET |
| Get Revenue Time Series | `/purchases/revenue_series` | GET |
| Get Campaign Send Analytics | `/sends/data_series` | GET |
| Get Campaign Analytics | `/sends/data_series` | GET |
| Get Canvas Analytics Summary | `/canvas/data_summary` | GET |
| Get Canvas Analytics | `/canvas/data_summary` | GET |
| Get Sessions Analytics | `/sessions/data_series` | GET |
| Get Custom Attributes | `/custom_attributes` | GET |

These return data immediately. Validate response shapes, date range coverage, pagination cursors, and numerical plausibility.

---

## Testing Lens

Approach every test through three overlapping concerns:

### 1. Data Integrity Verification

Confirm that exported data is structurally sound and complete:

- Each exported user record contains all requested fields (no null leakage for required attributes)
- Identifiers match across export types — a user exported by `external_id` should appear identically in a segment export covering the same population
- JSON line format is well-formed; each line in bulk export files parses independently
- `fields_to_export` filters are respected precisely — no extra or missing fields
- Global control group exports exclude users who have received campaigns (verify against campaign membership)

### 2. Analytics Consistency

Confirm that time series data is internally coherent and cross-endpoint consistent:

- DAU from `/kpi/dau/data_series` should be ≥ unique users derived from session analytics for the same date window
- Revenue series totals should align with purchase event counts weighted by price (cross-validate `/purchases/revenue_series` against raw event data)
- Segment size estimates from `/segments/data_series` should trend consistently with actual export counts from `/users/export/segment`
- Campaign send analytics (`/sends/data_series`) should reflect sends recorded within the 14-day retention window — validate that queries outside this window return empty or partial data, not errors
- Custom event counts from `/events` (list endpoint) should match event frequencies visible in campaign conversion analytics

### 3. Export Completeness Testing

Confirm that exports are exhaustive and not silently truncated:

- Segment exports paginate fully — collect all output files and verify user count matches the segment's estimated size
- Identifier exports respect the 50-record limit; requests exceeding this should fail with a clear error, not silently truncate
- Paginated list endpoints (`/events`, `/custom_attributes`) return consistent results across pages when sorted alphabetically — no duplicates, no gaps
- Cancelled exports (`/export/segment/cancel`) stop producing new output files — verify by polling after cancellation

---

## Key Validation Patterns

### Async Export Lifecycle

```
POST /users/export/segment
  → returns { export_id, object_prefix }
  → poll until S3/Azure files appear at object_prefix
  → download and parse each .ndjson file
  → assert: line count == segment size estimate (±5% tolerance for live segments)
  → assert: each line is valid JSON with required fields
```

Always test cancellation by initiating an export on a large segment, immediately cancelling, and confirming no additional files appear after the cancel response.

### Time Series Date Alignment

When validating analytics endpoints, use a fixed historical date range (not relative dates like "last 7 days") to produce deterministic assertions. Verify:
- `time` field format matches expected ISO 8601 or epoch pattern per endpoint
- No gaps in the series for the requested `length`
- `unit` parameter (day/hour) produces correct granularity in the response

### Permission Scope Isolation

Each endpoint requires a specific API key permission. When testing authorization:
- Confirm that a key missing the required scope returns HTTP 401 or 403, not a data response
- Confirm that a valid key for one endpoint does not implicitly grant access to a different endpoint in the same family

Required permissions to cover: `users.export.segment`, `users.export.ids`, `users.export.global_control_group`, `segments.list`, `segments.data_series`, `kpi.dau.data_series`, `events.list`, `purchases.revenue_series`, `sends.data_series`, `canvas.data_summary`, `sessions.data_series`, `custom_attributes`.

---

## Common Failure Modes

| Symptom | Likely Cause | Validation Step |
|---|---|---|
| Export files missing users | Segment definition changed mid-export | Compare export count to segment snapshot taken before export start |
| Revenue series shows zero | Wrong `app_id` parameter | Re-run with all app IDs and sum |
| DAU series has gaps | `length` exceeds retention window | Cap to documented retention period and retest |
| Cancel returns 200 but files still appear | Race condition — files in-flight at cancel time | Allow one polling interval after cancel before asserting no new files |
| Custom attributes pagination loops | Cursor not advanced correctly | Track cursors; assert each page offset is unique |
| Send analytics return 404 | `send_id` older than 14 days | Use a recent tracked send or assert 404 is the expected behavior |

---

## Relationships Between Topics

- **Segment exports + Segment analytics**: Use the same `segment_id`. Validate that the user count from export completeness aligns with the daily size estimate from analytics.
- **Campaign analytics + Send analytics**: Both use `/sends/data_series` but differ in scope. Campaign analytics aggregate across sends; send analytics are per `send_id`. A discrepancy between the two can indicate untracked sends.
- **Canvas analytics summary + Canvas analytics**: Both hit `/canvas/data_summary`. The summary returns rollup stats; validate that component-level stats sum to rollup totals within rounding tolerance.
- **Custom events list + Sessions analytics**: Both feed into DAU calculations. A user with a custom event on a given day should also appear in that day's session count unless the event was server-side only.

`★ Insight ─────────────────────────────────────`
- The 14-day retention limit on `send_id` analytics is a silent failure risk: querying outside the window returns empty data (not an error), so tests must assert on *expected data presence* rather than just *absence of errors* — a pattern called "asserting liveness"
- Cross-endpoint consistency checks (e.g., DAU ≥ session-unique-users) are more valuable than per-endpoint shape checks alone — they catch data pipeline bugs that individual endpoint tests miss entirely
`─────────────────────────────────────────────────`
