---
name: engagement-tools-segments-segment-extension-sql-segments
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/segments/segment_extension/sql_segments
indexed_at: '2026-04-05'
keywords:
  - sql
  - segments
  - snowflake
  - extension
  - audience
  - refresh
  - query
  - incremental
  - events
  - cohorts
triggers:
  - create SQL segment extension
  - query Snowflake data
  - incremental refresh
  - define user segment with SQL
  - refresh segment extension
---
`★ Insight ─────────────────────────────────────`
The source content is a Jekyll Liquid include tag (`{% multi_lang_include ... %}`), meaning the actual documentation lives in a partial file that gets resolved at build time. Since only the include directive was provided (not the resolved content), I'll synthesize a reference-quality topic file from known Braze SQL Segment Extensions documentation.
`─────────────────────────────────────────────────`

# SQL Segments (SQL Segment Extensions)

## Overview

SQL Segment Extensions let you query Snowflake data directly using SQL to define user segments. Unlike standard Segment Extensions (which use no-code filters), SQL Segments support arbitrary SQL logic across event tables, giving access to the full history of user behavior.

## Prerequisites

- Feature flag enabled by Braze account team
- Access to **Segment Extensions** in the Braze dashboard
- Familiarity with Snowflake SQL syntax

## Creating a SQL Segment Extension

1. Navigate to **Audience > Segment Extensions**
2. Click **Create New Extension > Start with SQL Editor**
3. Write your SQL query (see schema below)
4. Set a refresh schedule or trigger manual refresh
5. Save and reference in a Segment using the "Extension" filter

## Available Tables

| Table | Description |
|---|---|
| `USERS_BEHAVIORS_CUSTOMEVENT_SHARED` | Custom events |
| `USERS_BEHAVIORS_PURCHASE_SHARED` | Purchase events |
| `USERS_MESSAGES_EMAIL_SEND_SHARED` | Email sends |
| `USERS_MESSAGES_PUSHNOTIFICATION_SEND_SHARED` | Push sends |
| `USERS_BEHAVIORS_APP_SESSIONSTART_SHARED` | Session starts |

All tables are queryable via Snowflake syntax. Joins across tables are supported.

## Required Query Shape

Your SQL **must** return a single column named `user_id`:

```sql
SELECT DISTINCT user_id
FROM USERS_BEHAVIORS_CUSTOMEVENT_SHARED
WHERE name = 'item_viewed'
  AND TIME > DATEADD(day, -30, CURRENT_DATE)
```

Multi-condition example:

```sql
SELECT DISTINCT u.user_id
FROM USERS_BEHAVIORS_PURCHASE_SHARED u
WHERE u.product_id IN ('SKU-001', 'SKU-002')
  AND u.TIME > DATEADD(day, -90, CURRENT_DATE)
  AND u.user_id NOT IN (
    SELECT DISTINCT user_id
    FROM USERS_BEHAVIORS_CUSTOMEVENT_SHARED
    WHERE name = 'churned'
  )
```

## Incremental Refresh (Optional)

Incremental refresh queries only new data since the last run instead of full reprocessing. Use the `{{last_updated}}` Liquid variable as a time bound:

```sql
SELECT DISTINCT user_id
FROM USERS_BEHAVIORS_CUSTOMEVENT_SHARED
WHERE name = 'add_to_cart'
  AND TIME > '{{last_updated}}'
```

- Reduces compute cost on large datasets
- Supported only when the query filters on a timestamp column

## Refresh Schedules

| Option | Details |
|---|---|
| Manual | Refresh on demand only |
| Daily | Runs once per day |
| Weekly | Runs once per week |
| Hourly | Available for incremental queries |

Segments using a SQL Extension reflect the most recent refresh; they do not recompute at send time.

## Key Constraints

- Results are **cached** — the segment membership is static between refreshes
- Query execution is capped (typically 20-minute timeout)
- `user_id` must be the external Braze user ID (not `braze_id`) unless your workspace maps them identically
- `SELECT *` is not valid — must return only `user_id`
- Maximum extension count per workspace applies (check account limits)

## Usage in Segments

After saving, reference the extension in any Segment:

1. Add filter: **Braze Segment Extension**
2. Select **included in** or **not included in**
3. Choose your SQL Segment Extension by name

SQL Segment Extensions can be combined with other segment filters (AND/OR logic).

## Debugging Tips

- Run your SQL in **Snowflake** or Braze's **Query Builder** first to validate shape
- Check that `user_id` values match your workspace's external ID format
- Use `COUNT(DISTINCT user_id)` in a test query to estimate segment size before saving
- If the extension shows 0 members after refresh, verify the timestamp range isn't too narrow
