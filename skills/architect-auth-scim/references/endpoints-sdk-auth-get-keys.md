---
name: endpoints-sdk-auth-get-keys
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/sdk_authentication/get_sdk_authentication_keys
indexed_at: '2026-04-05'
keywords:
  - authentication
  - sdk
  - keys
  - rsa
  - api
  - public-key
  - verification
  - credentials
triggers:
  - get SDK authentication keys
  - retrieve RSA public keys
  - list SDK credentials
  - fetch authentication keys
---
`★ Insight ─────────────────────────────────────`
- Topic files in Nick's architecture are "atomic knowledge units" stored as `skills/{name}/references/*.md` — they're the lowest layer of the two-layer content hierarchy, meant to be retrieved at query time
- Stripping Jekyll liquid tags (`{% api %}`, `{: .reset-td-br-1 ...}`) is essential since they're template directives that render to nothing useful in a plain markdown context
- The goal is density without loss: keep the curl example and JSON response shape since those are the highest-value artifacts for an engineer using this reference
`─────────────────────────────────────────────────`

## GET /app\_group/sdk\_authentication/keys

Retrieves all SDK Authentication keys for a specified app.

**Required permission:** `sdk_authentication.keys`

### Request

```
GET https://rest.iad-01.braze.com/app_group/sdk_authentication/keys
```

**Parameters:**

| Parameter | Required | Type   | Description             |
|-----------|----------|--------|-------------------------|
| `app_id`  | Yes      | String | The app API identifier. |

**Example:**

```bash
curl --location --request GET \
  'https://rest.iad-01.braze.com/app_group/sdk_authentication/keys?app_id=01234567-89ab-cdef-0123-456789abcdef' \
  --header 'Authorization: Bearer YOUR-REST-API-KEY'
```

### Response

```json
{
  "keys": [
    {
      "id": "abcdef12-3456-7890-abcd-ef1234567890",
      "rsa_public_key": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvvD+fgA0YuCUd/v35htn...\n-----END PUBLIC KEY-----",
      "description": "SDK Authentication Key for iOS App",
      "is_primary": true
    },
    {
      "id": "fedcba98-7654-3210-fedc-ba9876543210",
      "rsa_public_key": "-----BEGIN PUBLIC KEY-----\nqWGfHOAiIwVzC/bTxwQZQQVzm/3ktgdNXRUDm5aIwVzCtxbNm5aIxOAiIwVzVHOA...\n-----END PUBLIC KEY-----",
      "description": "SDK Authentication Key for Android App",
      "is_primary": false
    }
  ]
}
```

**Response fields:**

| Field                   | Type    | Description                                      |
|-------------------------|---------|--------------------------------------------------|
| `keys`                  | Array   | Array of SDK Authentication key objects.         |
| `keys[].id`             | String  | The key's unique identifier.                     |
| `keys[].rsa_public_key` | String  | The RSA public key string.                       |
| `keys[].description`    | String  | Human-readable description of the key.           |
| `keys[].is_primary`     | Boolean | Whether this is the primary SDK Authentication key. |

### Validation

- `app_id` must be a valid app API identifier.
- The app must exist in your workspace.

`★ Insight ─────────────────────────────────────`
- Notice the response carries both `id` and `rsa_public_key` — the `id` is used for key management operations (update/delete), while the public key itself is what gets embedded in the SDK client for JWT verification
- The `is_primary` flag is significant: Braze uses it to determine which key is used for active token validation, enabling zero-downtime key rotation by staging a secondary key before promoting it
`─────────────────────────────────────────────────`
