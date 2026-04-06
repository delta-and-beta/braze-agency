---
name: endpoints-sdk-auth-put-primary-key
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/sdk_authentication/put_primary_sdk_authentication_key
indexed_at: '2026-04-05'
keywords:
  - authentication
  - sdk
  - key
  - primary
  - endpoint
  - rest
  - api
  - app
  - credentials
  - rsa
triggers:
  - how to set primary SDK authentication key
  - promoting SDK key to primary
  - managing SDK authentication keys
  - configure primary authentication key
---
## PUT Primary SDK Authentication Key

**Endpoint:** `PUT /app_group/sdk_authentication/primary`

Sets an existing SDK Authentication key as the primary key for an app.

**Required permission:** `sdk_authentication.primary`

---

### Request

```
Content-Type: application/json
Authorization: Bearer YOUR-REST-API-KEY
```

**Body parameters:**

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `app_id` | Yes | String | The app API identifier |
| `key_id` | Yes | String | ID of the SDK Authentication key to mark as primary |

**Example:**

```bash
curl --location --request PUT 'https://rest.iad-01.braze.com/app_group/sdk_authentication/primary' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR-REST-API-KEY' \
--data-raw '{
  "app_id": "01234567-89ab-cdef-0123-456789abcdef",
  "key_id": "abcdef12-3456-7890-abcd-ef1234567890"
}'
```

---

### Response

Returns the full list of SDK Authentication keys for the app, with the promoted key showing `is_primary: true`.

```json
{
  "keys": [
    {
      "id": "abcdef12-3456-7890-abcd-ef1234567890",
      "rsa_public_key": "-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----",
      "description": "SDK Authentication Key for iOS App",
      "is_primary": true
    },
    {
      "id": "fedcba98-7654-3210-fedc-ba9876543210",
      "rsa_public_key": "-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----",
      "description": "SDK Authentication Key for Android App",
      "is_primary": false
    }
  ]
}
```

**Response fields:**

| Field | Type | Description |
|-------|------|-------------|
| `keys` | Array | All SDK Authentication keys for the app |
| `keys[].id` | String | Key ID |
| `keys[].rsa_public_key` | String | RSA public key string |
| `keys[].description` | String | Human-readable key description |
| `keys[].is_primary` | Boolean | Whether this is the active primary key |

---

### Validation

- `key_id` must be a valid, existing SDK Authentication key ID
- `app_id` must be a valid app API identifier
- The specified key must already exist for the specified app
