---
name: endpoints-preference-center-get-view-details
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/preference_center/get_view_details_preference_center
indexed_at: '2026-04-05'
keywords:
  - preference-center
  - endpoint
  - GET
  - retrieve
  - details
  - API
  - configuration
  - HTML
  - timestamps
  - view
triggers:
  - get preference center details
  - retrieve preference center configuration
  - fetch preference center information
  - view preference center HTML content
  - how to retrieve preference center data
---
## GET /preference_center/v1/{preferenceCenterExternalID}

Retrieve full details for a preference center, including creation and update timestamps.

**Required permission:** `preference_center.get`

### Path Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `preferenceCenterExternalID` | Yes | String | The ID for your preference center |

### Request

No request body parameters.

```bash
curl --location -g --request GET \
  https://rest.iad-01.braze.com/preference_center/v1/preference_center_external_id \
  --header 'Authorization: Bearer YOUR-REST-API-KEY'
```

### Response

```json
{
  "name": "My Preference Center",
  "preference_center_api_id": "preference_center_api_id",
  "created_at": "example_time_created",
  "updated_at": "example_time_updated",
  "preference_center_title": "Example preference center title",
  "preference_center_page_html": "HTML for preference center here",
  "confirmation_page_html": "HTML for confirmation page here",
  "redirect_page_html": null,
  "preference_center_options": {
    "meta-viewport-content": "width=device-width, initial-scale=2"
  },
  "state": "active"
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `name` | String | Internal name of the preference center |
| `preference_center_api_id` | String | Braze-generated API identifier |
| `created_at` / `updated_at` | String | ISO timestamps for creation and last update |
| `preference_center_title` | String | Display title shown to users |
| `preference_center_page_html` | String | HTML content of the main preference page |
| `confirmation_page_html` | String | HTML content of the post-submission confirmation page |
| `redirect_page_html` | String\|null | Optional HTML for a redirect page |
| `preference_center_options` | Object | Config options, e.g. `meta-viewport-content` |
| `state` | String | Active status (`"active"`) |
