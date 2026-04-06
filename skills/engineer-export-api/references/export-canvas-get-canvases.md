---
name: export-canvas-get-canvases
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/export/canvas/get_canvases
indexed_at: '2026-04-05'
keywords:
  - canvas
  - list
  - pagination
  - filter
  - archived
  - sorting
  - tags
  - endpoint
  - api
  - permission
triggers:
  - List Canvases
  - Get Canvases
  - Filter archived Canvases
  - Sort Canvases by date
  - Paginate through Canvases
---
## List Canvases

**Endpoint:** `GET /canvas/list`

Returns a paginated list of Canvases with their name, API identifier, and tags. Results are grouped in sets of 100, sorted oldest to newest by default.

**Required permission:** `canvas.list`

---

### Request Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | Integer | `0` | Page of results (100 per page) |
| `include_archived` | Boolean | `false` | Include archived Canvases |
| `sort_direction` | String | `asc` | `asc` (oldest→newest) or `desc` (newest→oldest) |
| `last_edit.time[gt]` | String | — | Filter to Canvases edited after this time (`yyyy-MM-DDTHH:mm:ss`) |

**Note:** Stopped (but not archived) Canvases are returned by default.

---

### Example Request

```bash
curl --location -g --request GET \
  'https://rest.iad-01.braze.com/canvas/list?page=1&include_archived=false&sort_direction=desc&last_edit.time[gt]=2020-06-28T23:59:59-5:00' \
  --header 'Authorization: Bearer YOUR-REST-API-KEY'
```

---

### Response

```json
{
  "canvases": [
    {
      "id": "(string) Canvas API identifier",
      "last_edited": "(ISO 8601 string) last edited timestamp",
      "name": "(string) Canvas name",
      "tags": ["(string) tag names"]
    }
  ],
  "message": "success"
}
```

---

`★ Insight ─────────────────────────────────────`
- The `last_edit.time[gt]` parameter uses a non-standard key format with brackets and a dot — this is a range filter pattern common in Braze APIs, where `[gt]` means "greater than." Square bracket notation like this often requires URL encoding or `-g` (globoff) in curl to prevent shell glob expansion.
- Archived vs. stopped is a meaningful distinction here: archived Canvases are excluded by default, but stopped ones are not. Topic files like this one are valuable precisely because they surface these subtle behavioral defaults that are easy to miss.
`─────────────────────────────────────────────────`
