---
name: data-activation-custom_data-custom_attributes
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/data/activation/custom_data/custom_attributes
indexed_at: '2026-04-05'
keywords:
  - attributes
  - segmentation
  - blocklist
  - profiles
  - data-types
  - SDK
  - PII
  - Liquid
  - canvas
triggers:
  - how to manage custom attributes
  - set custom attributes on users
  - segment users by custom attributes
  - blocklist or archive attributes
  - mark attributes as PII
---
# Custom Attributes

Custom attributes store unique user traits and low-value action data. Unlike custom events, they have **no time-series support** — no graphs or trend analysis.

## Dashboard Management

**Location:** Data Settings > Custom Attributes

### Actions per attribute (via action menu):

**Blocklist**
- Individual or bulk (up to 100 at a time)
- Effect: stops data collection, hides from filters/graphs, existing data unavailable until reactivated
- If referenced by active filters/triggers, a warning modal appears — those will be removed and archived

**Mark as PII**
- Admin-only action; attribute becomes visible only to admins and users with "View Custom Attributes Marked as PII" permission

**Add description / tags**
- Requires `Manage Events, Attributes, Purchases` permission
- Tags enable filtering the attributes list

**Remove from user profiles** (two methods):
1. Use a Canvas User Update step
2. Send `null` via `POST /users/track`

**Export:** Select "Export all" → CSV generated, download link emailed to you

## Usage Reports

Shows all Canvases, campaigns, and segments using a specific attribute (excludes Liquid usage).
- View up to 100 reports at a time via checkboxes
- **Values tab:** Shows top values sampled from ~250,000 users — not suitable for exhaustive data analysis or troubleshooting

## Data Storage

Custom attribute data on user profiles is retained indefinitely as long as the profile remains active.

## Data Types

| Type | Notes |
|------|-------|
| Boolean | True/false; segmentable as `true`, `false`, `true or not set`, `false or not set`, or "is not blank" |
| Number | Integer or float |
| String | Text values |
| Array | List of values |
| Time | Datetime |
| Object | Nested attributes |
| Array of objects | List of nested attribute objects |

### Boolean segmentation filters

| Filter | Options |
|--------|---------|
| IS | TRUE, FALSE, TRUE OR NOT SET, FALSE OR NOT SET |
| IS NOT BLANK | Checks attribute exists and is not null |

**Important — type matching in Liquid:**
- String: `{% if {{custom_attribute.${newsletter_subscribed}}} == 'true' %}` (quotes required)
- Boolean: `{% if {{custom_attribute.${newsletter_subscribed}}} == true %}` (no quotes)

## SDK Integration

Custom attributes can be set from: Android/FireOS, iOS (Swift), Web, React Native, Unity, .NET MAUI, Roku — all via `setCustomUserAttribute()` or equivalent SDK method.

---

`★ Insight ─────────────────────────────────────`
- The type-matching caveat for Liquid (string `'true'` vs boolean `true`) is a common production bug in Braze — worth surfacing prominently in a reference file since it's easy to mis-configure at the data ingestion layer and silently break segmentation.
- The blocklist behavior (existing data unavailable, filters archived) is non-obvious and consequential — it's not a soft "pause," it's closer to a destructive action for active campaigns.
`─────────────────────────────────────────────────`
