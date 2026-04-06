---
name: endpoints-preference-center-get-create-url
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/preference_center/get_create_url_preference_center
indexed_at: '2026-04-05'
keywords:
  - preference-center
  - endpoint
  - url
  - api
  - user
  - get
  - authentication
  - braze
  - external-id
  - request
triggers:
  - how to get preference center URL
  - create user preference center link
  - generate preference center URL for user
  - retrieve preference center URL
  - preference center URL endpoint
---
## GET Create Preference Center URL

**Endpoint:** `GET /preference_center/v1/{preferenceCenterExternalID}/url/{userID}`

Generates a unique preference center URL for a specific user. Each URL is user-specific.

**Required permission:** `preference_center.user.get`

---

### Path Parameters

| Parameter | Type | Description |
|---|---|---|
| `preferenceCenterExternalID` | String | ID of the preference center |
| `userID` | String | The user ID |

### Request Parameters

| Parameter | Type | Description |
|---|---|---|
| `preference_center_api_id` | String | ID of the preference center |
| `external_id` | String | External ID for the user |

---

### Example Request

```bash
curl --location --request GET 'https://rest.iad-01.braze.com/preference_center/v1/$preference_center_external_id/url/$user_external_id' \
--header 'Authorization: Bearer YOUR-API-KEY-HERE'
```

### Response

```json
{
  "preference_center_url": "https://www.example.com/preferences"
}
```

---

**Note:** Only works with new preference centers (created via API or drag-and-drop editor). Rate limit is fixed and non-configurable.
