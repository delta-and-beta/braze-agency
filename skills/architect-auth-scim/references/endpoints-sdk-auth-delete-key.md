---
name: endpoints-sdk-auth-delete-key
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/sdk_authentication/delete_sdk_authentication_key
indexed_at: '2026-04-05'
keywords:
  - authentication
  - sdk
  - delete
  - key
  - endpoint
  - api
  - management
  - rsa
  - primary
  - validation
triggers:
  - how to delete SDK authentication key
  - remove authentication key
  - revoke SDK key
  - delete SDK key for app
---
## Delete SDK Authentication Key

**Endpoint:** `DELETE /app_group/sdk_authentication/delete`

**Permission required:** `sdk_authentication.delete`

> The primary key cannot be deleted — the endpoint returns an error if attempted.

### Request

```
Content-Type: application/json
Authorization: Bearer YOUR-REST-API-KEY
```

```json
{
  "app_id": "App API Identifier",
  "key_id": "key id"
}
```

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `app_id` | Required | String | The app API identifier |
| `key_id` | Required | String | ID of the SDK Authentication key to delete |

### Example

```bash
curl --location --request DELETE 'https://rest.iad-01.braze.com/app_group/sdk_authentication/delete' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR-REST-API-KEY' \
--data-raw '{
  "app_id": "01234567-89ab-cdef-0123-456789abcdef",
  "key_id": "fedcba98-7654-3210-fedc-ba9876543210"
}'
```

### Response

Returns the remaining keys after deletion:

```json
{
  "keys": [
    {
      "id": "abcdef12-3456-7890-abcd-ef1234567890",
      "rsa_public_key": "-----BEGIN PUBLIC KEY-----\nMIIBIjAN...\n-----END PUBLIC KEY-----",
      "description": "SDK Authentication Key for iOS App",
      "is_primary": true
    }
  ]
}
```

| Field | Type | Description |
|-------|------|-------------|
| `keys` | Array | Remaining SDK Authentication key objects |
| `keys[].id` | String | Key ID |
| `keys[].rsa_public_key` | String | RSA public key string |
| `keys[].description` | String | Key description |
| `keys[].is_primary` | Boolean | Whether this is the primary key |

### Validation

- `key_id` must be a valid SDK Authentication key ID for the specified app
- `app_id` must be a valid app API identifier
- Primary SDK Authentication key cannot be deleted
