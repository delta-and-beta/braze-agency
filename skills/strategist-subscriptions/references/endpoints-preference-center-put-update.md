---
name: endpoints-preference-center-put-update
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/preference_center/put_update_preference_center
indexed_at: '2026-04-05'
keywords:
  - preference-center
  - update
  - PUT
  - endpoint
  - HTML
  - configuration
  - state
  - favicon
  - confirmation
  - API
triggers:
  - update preference center
  - modify preference center settings
  - configure preference center page
  - set preference center state
  - update confirmation page HTML
---
## PUT Update Preference Center

**Endpoint:** `PUT /preference_center/v1/{preferenceCenterExternalID}`

Updates an existing preference center.

**Required permission:** `preference_center.update`

---

### Path Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `preferenceCenterExternalID` | Required | String | The ID for your preference center |

### Request Body Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `name` | Required | String | Name of the preference center |
| `preference_center_page_html` | Required | String | HTML for the preference center page |
| `confirmation_page_html` | Required | String | HTML for the confirmation page |
| `preference_center_title` | Optional | String | Title for both pages (defaults to "Preference Center") |
| `state` | Optional | String | `active` or `draft` |
| `options` | Optional | Object | `meta-viewport-content` (string), `link-tags` (array of favicon `<link>` tag objects) |

### `options.link-tags` Object Shape

```json
{
  "rel": "icon | shortcut icon | apple-touch-icon",  // required
  "type": "image/png | image/svg | image/gif | image/x-icon | image/svg+xml | mask-icon",  // optional
  "sizes": "string",    // optional
  "color": "string",    // optional, use with type="mask-icon"
  "href": "string"      // required
}
```

---

### Example Request

```bash
curl --location --request PUT 'https://rest.iad-01.braze.com/preference_center/v1/{preferenceCenterExternalId}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR-API-KEY-HERE' \
--data-raw '{
  "name": "Example",
  "preference_center_title": "Example Preference Center Title",
  "preference_center_page_html": "HTML for preference center here",
  "confirmation_page_html": "HTML here with a message to users here",
  "state": "active"
}'
```

### Example Response

```json
{
  "preference_center_api_id": "8efc52aa-935e-42b7-bd6b-98f43bb9b0f1",
  "created_at": "2022-09-22T18:28:07Z",
  "updated_at": "2022-09-22T18:32:07Z",
  "message": "success"
}
```
