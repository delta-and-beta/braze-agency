---
name: api-use-cases
source_url: 'https://braze-inc.github.io/braze-docs/_api/use_cases'
indexed_at: '2026-04-05'
keywords:
  - catalogs
  - email
  - spam
  - canvas
  - analytics
  - broadcasts
  - messages
  - scheduling
  - deletion
  - preferences
triggers:
  - delete catalog items
  - remove from spam list
  - audit canvas analytics
  - check scheduled broadcasts
  - list canvases
---
# API Use Cases

The Braze REST API supports a wide range of customer engagement operations. Below are practical examples for common endpoint categories.

---

## Catalogs: Bulk Delete Items

**Endpoint:** `DELETE /catalogs/{catalog_name}/items`

Remove multiple catalog items by passing an array of item IDs.

```bash
curl --location --request DELETE 'https://rest.iad-03.braze.com/catalogs/dishware/items' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR-REST-API-KEY' \
--data-raw '{
  "items": [
    {"id": "plainbisque"},
    {"id": "pearlporcelain"},
    {"id": "pinkshimmer"}
  ]
}'
```

**Response:**
```json
{ "message": "success" }
```

---

## Email Lists: Remove from Spam List

**Endpoint:** `POST /email/spam/remove`  
**Required permission:** `email.spam.remove`

Removes addresses from Braze's spam list and the email provider's spam list. Accepts a string or array of up to **50 email addresses**.

```bash
curl --location --request POST 'https://rest.iad-01.braze.com/email/spam/remove' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR-REST-API-KEY' \
--data-raw '{
  "email": [
    "august.author@example.com",
    "betty.benson@example.com",
    "charlie.chase@example.com",
    "delilah.york@example.com",
    "evergreen.rebecca@example.com"
  ]
}'
```

**Response:**
```json
{ "message": "success" }
```

---

## Export: Audit Canvases

**Step 1 — List all Canvases**

**Endpoint:** `GET /canvas/list`

Returns Canvas names, IDs, tags, and last-edited timestamps.

```bash
curl --location --request GET 'https://rest.iad-01.braze.com/canvas/list' \
--header 'Authorization: Bearer YOUR-REST-API-KEY'
```

**Step 2 — Get analytics summary for a Canvas**

**Endpoint:** `GET /canvas/data_summary`

Key parameters:
| Parameter | Type | Description |
|---|---|---|
| `canvas_id` | string | Canvas identifier |
| `starting_at` | ISO 8601 | Start of analytics window |
| `ending_at` | ISO 8601 | End of analytics window |
| `include_variant_breakdown` | bool | Include per-variant stats |
| `include_step_breakdown` | bool | Include per-step stats |

```bash
curl --location -g --request GET \
'https://rest.iad-01.braze.com/canvas/data_summary?canvas_id=canvas_identifier_2&ending_at=2023-07-10T23:59:59&starting_at=2020-07-10T23:59:59&length=5&include_variant_breakdown=false&include_step_breakdown=false&include_deleted_step_data=false' \
--header 'Authorization: Bearer YOUR-REST-API-KEY'
```

---

## Messages: Check Scheduled Broadcasts

**Endpoint:** `GET /messages/scheduled_broadcasts`

Returns upcoming scheduled campaigns and Canvases before a given cutoff time. Use the `name` field in the response to identify specific messages.

```bash
curl --location --request GET \
'https://rest.iad-01.braze.com/messages/scheduled_broadcasts?end_time=2024-03-31T12:00:00' \
--header 'Authorization: Bearer YOUR-REST-API-KEY'
```

---

## Preference Center: View Details

**Endpoint:** `GET /preference_center/v1/{preferenceCenterExternalID}`

Pass the preference center's external ID as a path parameter to retrieve creation/update timestamps, title, and page HTML.

```bash
curl --location -g --request GET \
'https://rest.iad-01.braze.com/preference_center/v1/politer_weekly_preference_center_api_id' \
--header 'Authorization: Bearer YOUR-REST-API-KEY'
```

**Response fields:**
- `name` — internal name
- `preference_center_api_id` — unique identifier
- `created_at` / `updated_at` — ISO 8601 timestamps
- `preference_center_title` — display title
- `preference_center_page_html` — full rendered HTML

---

`★ Insight ─────────────────────────────────────`
- The Braze API uses **cluster-specific base URLs** (`iad-01`, `iad-03`, etc.) — the cluster suffix in your REST endpoint URL must match your dashboard cluster, otherwise requests silently route to the wrong workspace.
- The **spam removal endpoint** operates on both Braze's internal list AND the upstream email provider's list simultaneously — a single call has dual effect, which is worth noting in audit logs.
- Canvas analytics queries use `canvas_id` (the internal identifier from `/canvas/list`), not the Canvas name — the list endpoint is effectively a prerequisite lookup step before any analytics export.
`─────────────────────────────────────────────────`
