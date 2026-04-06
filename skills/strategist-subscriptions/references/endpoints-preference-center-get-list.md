---
name: endpoints-preference-center-get-list
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/preference_center/get_list_preference_center
indexed_at: '2026-04-05'
keywords:
  - preference-center
  - list
  - endpoint
  - GET
  - API
  - retrieve
  - permission
  - workspace
  - identifier
  - REST
triggers:
  - list all preference centers
  - retrieve preference center list
  - get preference center API IDs
  - fetch available preference centers
---
## GET /preference_center/v1/list

Lists all available preference centers in your Braze workspace.

**Required permission:** `preference_center.list`

### Request

```
GET https://rest.iad-01.braze.com/preference_center/v1/list
Authorization: Bearer YOUR-REST-API-KEY
```

No path or request parameters.

**Example:**
```bash
curl --location -g --request GET https://rest.iad-01.braze.com/preference_center/v1/list \
--header 'Authorization: Bearer YOUR-REST-API-KEY'
```

### Response

Returns an array of preference center objects.

```json
{
  "preference_centers": [
    {
      "name": "My Preference Center 1",
      "preference_center_api_id": "preference_center_api_id",
      "created_at": "2022-08-17T15:46:10Z",
      "updated_at": "2022-08-17T15:46:10Z"
    }
  ]
}
```

**Response fields:**

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Display name of the preference center |
| `preference_center_api_id` | string | Unique identifier used in other preference center API calls |
| `created_at` | ISO 8601 | Creation timestamp |
| `updated_at` | ISO 8601 | Last modified timestamp |

`★ Insight ─────────────────────────────────────`
- The `preference_center_api_id` returned here is the key linkage value — it's what you pass to other endpoints like GET/PUT preference center by ID, so surfacing it prominently is valuable for reference use.
- This endpoint has no parameters at all (not even pagination), implying Braze returns all preference centers in a single response — worth noting implicitly by the flat array structure.
`─────────────────────────────────────────────────`
