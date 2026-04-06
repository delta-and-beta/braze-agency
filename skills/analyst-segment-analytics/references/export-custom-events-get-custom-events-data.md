---
name: export-custom-events-get-custom-events-data
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/export/custom_events/get_custom_events_data
indexed_at: '2026-04-05'
keywords:
  - events
  - custom
  - pagination
  - cursor
  - analytics
  - endpoint
  - tags
  - response
  - API
  - data
triggers:
  - get custom events
  - retrieve events list
  - paginate through events
  - fetch event data
  - list all events
---
## Get Custom Events Data

**Endpoint:** `GET /events`

Returns a paginated list of custom events recorded for your app. Events are returned in groups of 50, sorted alphabetically.

**Required permission:** `events.get`

---

### Query Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `cursor` | Optional | String | Pagination cursor for fetching subsequent pages |

Use the `Link` response header to get the cursor for the next page.

---

### Example Requests

**Basic request:**
```bash
curl --request GET 'https://rest.iad-01.braze.com/events' \
--header 'Authorization: Bearer YOUR-REST-API-KEY'
```

**With pagination cursor:**
```bash
curl --request GET 'https://rest.iad-03.braze.com/events?cursor=c2tpcDow' \
--header 'Authorization: Bearer YOUR-REST-API-KEY'
```

---

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

**Event object fields:**

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Event name |
| `description` | string | Event description |
| `included_in_analytics_report` | boolean | Whether event appears in analytics reports |
| `status` | string | Event status (e.g., `"Active"`) |
| `tag_names` | string[] | Tags associated with the event |

---

### Notes

- Returns 50 events per page; use `cursor` parameter to paginate beyond 50
- On fatal errors, the API returns standard [fatal error status codes](https://www.braze.com/docs/api/errors/#fatal-errors)
