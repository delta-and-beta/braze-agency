---
name: export-custom-events
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/export/custom_events/get_custom_events_data
indexed_at: '2026-04-05'
keywords:
  - events
  - export
  - custom
  - pagination
  - cursor
  - analytics
  - retrieve
  - list
triggers:
  - export custom events
  - list all events
  - fetch events with pagination
  - retrieve event data
---
# Export Custom Events

**Endpoint:** `GET /events`

Export a list of custom events recorded for your app. Returns events in groups of 50, sorted alphabetically.

**Required API key permission:** `events.get`

**Rate limit:** Standard events endpoint limits apply.

## Query Parameters

| Parameter | Required | Type | Description |
|---|---|---|---|
| `cursor` | Optional | String | Pagination cursor for fetching beyond the first 50 events. |

Use the `Link` header in the response to retrieve the next page when more than 50 events exist.

## Requests

**Without cursor:**
```bash
curl --location --request GET 'https://rest.iad-01.braze.com/events' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR-REST-API-KEY'
```

**With cursor:**
```bash
curl --location --request GET 'https://rest.iad-03.braze.com/events?cursor=c2tpcDow' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR-REST-API-KEY'
```

## Response

```json
{
    "message": "success",
    "events": [
        {
            "name": "The event name",
            "description": "The event description",
            "included_in_analytics_report": false,
            "status": "Active",
            "tag_names": ["Tag One", "Tag Two"]
        }
    ]
}
```

**Response fields:**
- `message` — `"success"` on completion without errors
- `name` — Event name
- `description` — Event description
- `included_in_analytics_report` — Boolean; whether event appears in analytics reports
- `status` — Event status (e.g., `"Active"`)
- `tag_names` — Array of tag strings associated with the event

## Notes

- Results are paginated at 50 per call; use `cursor` param with value from `Link` response header to page through results
- Fatal error codes follow the standard Braze fatal errors format

---

`★ Insight ─────────────────────────────────────`
- This endpoint is cursor-based (not offset/page-number), which is idiomatic for large, frequently-changing datasets — cursors avoid "page drift" when items are added/removed mid-export
- The `Link` header pattern for pagination follows RFC 5988 (Web Linking), the same standard used by GitHub's API — the cursor value `c2tpcDow` decodes from base64 to `skip:0`
- The `included_in_analytics_report` field is a useful signal for distinguishing instrumentation events from behavioral tracking events when building routing logic
`─────────────────────────────────────────────────`
