---
name: export-segments-get-segment-details
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/export/segments/get_segment_details
indexed_at: '2026-04-05'
keywords:
  - segment
  - details
  - metadata
  - endpoint
  - identifier
  - filter
  - tags
  - teams
  - properties
triggers:
  - get segment details
  - retrieve segment metadata
  - fetch segment information
  - look up segment by ID
  - view segment properties
---
## Get Segment Details

**Endpoint:** `GET /segments/details`

Retrieves metadata for a specific segment by its ID.

**Required permission:** `segments.details`

---

### Request Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `segment_id` | Required | String | The segment's API identifier. Find it on the API Keys page in your Braze account, or via the [Export Segment List](#) endpoint. |

---

### Example Request

```bash
curl --location --request GET \
  'https://rest.iad-01.braze.com/segments/details?segment_id={{segment_identifier}}' \
  --header 'Authorization: Bearer YOUR-REST-API-KEY'
```

---

### Response

```json
{
  "message": "success",
  "created_at": "2024-01-15T10:00:00Z",
  "updated_at": "2024-03-01T14:30:00Z",
  "name": "High-Value Users",
  "description": "Users who purchased > $100 in last 30 days",
  "text_description": "Segment description text",
  "tags": ["retention", "vip"],
  "teams": ["Growth", "Marketing"]
}
```

**Response fields:**

| Field | Type | Description |
|-------|------|-------------|
| `message` | String | Export status; `"success"` on completion |
| `created_at` | String | ISO 8601 creation date |
| `updated_at` | String | ISO 8601 last-updated date |
| `name` | String | Segment name |
| `description` | String | Human-readable filter description |
| `text_description` | String | Segment description text |
| `tags` | Array | Tag names as strings |
| `teams` | Array | Associated Team names |

---

**Rate limit:** Default Braze rate limits apply.

`★ Insight ─────────────────────────────────────`
- The `description` vs `text_description` distinction is subtle: `description` is auto-generated from filter logic, while `text_description` is the manually written description field — worth preserving both in the topic file since consumers often conflate them.
- The `segment_id` bootstrap problem (you need it to call this endpoint, but can get it from the list endpoint) is a common API navigation pattern — noting the list endpoint as a prerequisite makes this topic truly self-contained.
`─────────────────────────────────────────────────`
