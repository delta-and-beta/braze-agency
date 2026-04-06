---
name: export-user-data-post-users-identifier
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/export/user_data/post_users_identifier
indexed_at: '2026-04-05'
keywords:
  - export
  - users
  - identifiers
  - profiles
  - fields
  - endpoint
  - authentication
  - data
  - limits
  - device
triggers:
  - export user data by ID
  - get user profile information
  - export users by email or phone
  - retrieve multiple user profiles
  - how to export user data from Braze
---
## Export Users by Identifier

**Endpoint:** `POST /users/export/ids`

Export data from user profiles by specifying a user identifier.

**Limits:** Up to 50 `external_ids` or `user_aliases` per request. For `device_id`, `email_address`, or `phone` — only one per request.

**Permission required:** `users.export.ids`

---

### Request

```
POST https://rest.iad-01.braze.com/users/export/ids
Content-Type: application/json
Authorization: Bearer YOUR-REST-API-KEY
```

### Parameters

| Parameter | Required | Type | Description |
|---|---|---|---|
| `external_ids` | Optional | Array of strings | External IDs for users to export (up to 50) |
| `user_aliases` | Optional | Array of user alias objects | User aliases to export (up to 50) |
| `device_id` | Optional | String | Device identifier from SDK `getDeviceId` |
| `braze_id` | Optional | String | Braze internal identifier |
| `email_address` | Optional | String | User's email address |
| `phone` | Optional | String (E.164) | User's phone number |
| `fields_to_export` | Conditional* | Array of strings | Specific fields to return |

> **`fields_to_export` notes:**
> - Required for accounts onboarded on or after **August 22, 2024**
> - Including it unlocks a faster rate limit: **40 req/sec** vs default **250 req/min**

---

### Example Request

```bash
curl --request POST 'https://rest.iad-01.braze.com/users/export/ids' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer YOUR-REST-API-KEY' \
  --data-raw '{
    "external_ids": ["user_identifier1", "user_identifier2"],
    "user_aliases": [{"alias_name": "example_alias", "alias_label": "example_label"}],
    "device_id": "1234567",
    "braze_id": "braze_identifier",
    "email_address": "example@braze.com",
    "phone": "11112223333",
    "fields_to_export": ["first_name", "email", "purchases"]
  }'
```

---

### Available `fields_to_export` Values

| Field | Type | Description |
|---|---|---|
| `apps` | Array | Sessions per app: `name`, `platform`, `version`, `sessions`, `first_used`, `last_used` |
| `attributed_campaign` | String | Ad campaign identifier (requires attribution integration) |
| `attributed_source` | String | Ad platform identifier (requires attribution integration) |
| `attributed_adgroup` | String | Ad group identifier (requires attribution integration) |

`★ Insight ─────────────────────────────────────`
- The dual rate limit design (`fields_to_export` unlocks 40/sec vs 250/min) is a common Braze pattern: specificity is rewarded with throughput. Always include this field in production integrations.
- E.164 phone format (`+11112223333`) is a global standard; Braze enforces it here to ensure unambiguous international number handling.
`─────────────────────────────────────────────────`
