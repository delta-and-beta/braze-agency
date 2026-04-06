---
name: sms-post-remove-invalid-numbers
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/sms/post_remove_invalid_numbers
indexed_at: '2026-04-05'
keywords:
  - sms
  - invalid
  - phone_numbers
  - validation
  - remove
  - endpoint
  - permissions
  - rate-limit
  - e164
triggers:
  - remove invalid SMS numbers
  - re-validate phone numbers
  - unblock phone numbers
  - SMS number validation
---
## Remove Invalid SMS Numbers

**Endpoint:** `POST /sms/invalid_phone_numbers/remove`

Removes phone numbers from Braze's invalid list, allowing re-validation of previously marked-invalid numbers.

**Required permission:** `sms.invalid_phone_numbers.remove`

**Rate limit:** Default

---

### Request

```
POST https://rest.iad-01.braze.com/sms/invalid_phone_numbers/remove
Content-Type: application/json
Authorization: Bearer YOUR-REST-API-KEY
```

**Body:**

```json
{
  "phone_numbers": ["12183095514", "14255551212"]
}
```

| Parameter | Required | Type | Notes |
|---|---|---|---|
| `phone_numbers` | Yes | Array of strings (e.164 format) | Up to 50 numbers per request |

---

### Example

```bash
curl --location --request POST 'https://rest.iad-01.braze.com/sms/invalid_phone_numbers/remove' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR-REST-API-KEY' \
--data-raw '{
  "phone_numbers": ["12183095514", "14255551212"]
}'
```
