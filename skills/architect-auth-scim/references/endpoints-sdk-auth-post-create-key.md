---
name: endpoints-sdk-auth-post-create-key
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/sdk_authentication/post_create_sdk_authentication_key
indexed_at: '2026-04-05'
keywords:
  - authentication
  - SDK
  - RSA
  - encryption
  - key
  - signing
  - API
  - endpoint
  - create
  - security
triggers:
  - create SDK authentication key
  - generate authentication key
  - set up SDK signing
  - configure app authentication
  - manage SDK keys
---
## POST /app_group/sdk_authentication/create

Creates a new SDK Authentication key for an app.

**Required permission:** `sdk_authentication.create`

### Request

```
POST https://rest.iad-01.braze.com/app_group/sdk_authentication/create
Content-Type: application/json
Authorization: Bearer YOUR-REST-API-KEY
```

```json
{
  "app_id": "App API identifier",
  "rsa_public_key_str": "RSA public key string",
  "description": "description",
  "make_primary": false
}
```

### Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `app_id` | Required | String | App API identifier |
| `rsa_public_key_str` | Required | String | Valid RSA public key string (PEM format) |
| `description` | Required | String | Label for this key; cannot be empty |
| `make_primary` | Optional | Boolean | If `true`, sets this as the primary SDK Authentication key on creation |

### Example Request

```bash
curl --location --request POST 'https://rest.iad-01.braze.com/app_group/sdk_authentication/create' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR-REST-API-KEY' \
--data-raw '{
  "app_id": "01234567-89ab-cdef-0123-456789abcdef",
  "rsa_public_key_str": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvvD+fgA0YuCUd/v35htn...\n-----END PUBLIC KEY-----",
  "description": "SDK Authentication Key for iOS App",
  "make_primary": false
}'
```

### Response

```json
{
  "id": "key id"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | ID of the newly created SDK Authentication key |

### Validation Rules

- Maximum **3 SDK Authentication keys per app**
- `rsa_public_key_str` must be a valid PEM-formatted RSA public key
- `app_id` must be a valid app API identifier
- `description` cannot be empty
