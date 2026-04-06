---
name: export-custom-events-get-custom-events
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/export/custom_events/get_custom_events_data
indexed_at: '2026-04-05'
keywords:
  - events
  - export
  - list
  - pagination
  - cursor
  - REST
  - API
  - endpoints
  - analytics
  - tags
triggers:
  - list custom events
  - export custom events
  - get custom events
  - fetch event data
  - retrieve events with pagination
---
## List Custom Events

**Endpoint:** `GET /events`

Export a list of custom events recorded for your app. Returns groups of 50, sorted alphabetically.

**Required permission:** `events.get`

**Rate limit:** Standard events endpoint rate limit applies.

### Query Parameters

| Parameter | Required | Type | Description |
|---|---|---|---|
| `cursor` | Optional | String | Pagination cursor for fetching beyond the first 50 events |

### Pagination

Each call returns 50 events. Use the `Link` response header to get the cursor for the next page.

### Example Requests

```bash
# Without cursor (first page)
curl --request GET 'https://rest.iad-01.braze.com/events' \
  --header 'Authorization: Bearer YOUR-REST-API-KEY'

# With cursor (subsequent pages)
curl --request GET 'https://rest.iad-03.braze.com/events?cursor=c2tpcDow' \
  --header 'Authorization: Bearer YOUR-REST-API-KEY'
```

### Response

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

| Field | Type | Description |
|---|---|---|
| `name` | string | Event name |
| `description` | string | Event description |
| `included_in_analytics_report` | boolean | Whether event appears in analytics reports |
| `status` | string | Event status (e.g., `"Active"`) |
| `tag_names` | array of strings | Tags associated with the event |
