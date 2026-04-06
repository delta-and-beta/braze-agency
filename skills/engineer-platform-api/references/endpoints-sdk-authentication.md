---
name: endpoints-sdk-authentication
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/sdk_authentication/put_primary_sdk_authentication_key
indexed_at: '2026-04-05'
keywords:
  - authentication
  - SDK
  - primary
  - endpoint
  - key
  - REST
  - API
  - app
triggers:
  - set primary SDK authentication key
  - mark authentication key as primary
  - update SDK authentication
  - configure SDK key
---
`★ Insight ─────────────────────────────────────`
- Jekyll `{% api %}` / `{% apimethod %}` / `{% endapi %}` tags are Liquid template directives — they render navigation chrome, method badges, and anchors in the docs site but carry zero semantic value in a topic file.
- The `{: .reset-td-br-*}` table attributes are Jekyll/Kramdown CSS class injectors — stripping them yields clean standard markdown tables.
- Keeping the `curl` example intact is high-value: it concretely encodes method, URL, headers, and payload in a single scannable block.
`─────────────────────────────────────────────────`

---

## Set Primary SDK Authentication Key

**Endpoint:** `PUT /app_group/sdk_authentication/primary`

Sets an existing SDK Authentication key as the primary key for a given app.

**Required permission:** `sdk_authentication.primary`

### Request

```
Content-Type: application/json
Authorization: Bearer YOUR-REST-API-KEY
```

```json
{
  "app_id": "App API identifier",
  "key_id": "key id"
}
```

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `app_id` | Required | String | The app API identifier. |
| `key_id` | Required | String | ID of the SDK Authentication key to mark as primary. |

### Example Request

```bash
curl --location --request PUT 'https://rest.iad-01.braze.com/app_group/sdk_authentication/primary' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR-REST-API-KEY' \
--data-raw '{
  "app_id": "01234567-89ab-cdef-0123-456789abcdef",
  "key_id": "abcdef12-3456-7890-abcd-ef1234567890"
}'
```

### Response

Returns an array of all SDK Authentication keys for the app, with `is_primary` updated to reflect the change.

```json
{
  "keys": [
    {
      "id": "abcdef12-3456-7890-abcd-ef1234567890",
      "rsa_public_key": "-----BEGIN PUBLIC KEY-----\nMIIBIjAN...\n-----END PUBLIC KEY-----",
      "description": "SDK Authentication Key for iOS App",
      "is_primary": true
    },
    {
      "id": "fedcba98-7654-3210-fedc-ba9876543210",
      "rsa_public_key": "-----BEGIN PUBLIC KEY-----\nqWGfHOAi...\n-----END PUBLIC KEY-----",
      "description": "SDK Authentication Key for Android App",
      "is_primary": false
    }
  ]
}
```

| Field | Type | Description |
|-------|------|-------------|
| `keys` | Array | All SDK Authentication key objects for the app. |
| `keys[].id` | String | Key ID. |
| `keys[].rsa_public_key` | String | RSA public key string. |
| `keys[].description` | String | Human-readable description of the key. |
| `keys[].is_primary` | Boolean | Whether this key is currently the primary key. |

### Validation Rules

- `key_id` must be a valid SDK Authentication key ID that exists for the specified app.
- `app_id` must be a valid app API identifier.

`★ Insight ─────────────────────────────────────`
- The response returns **all keys**, not just the one updated — this is worth preserving because callers need to know they'll see the full key list, not a delta. That subtlety is easy to lose in condensation.
- RSA public key values were truncated in the output (they'd be 400+ char strings in production) — keeping truncated placeholders is the right call for a reference file: it signals the field exists and its format without bloating the file.
`─────────────────────────────────────────────────`
