---
name: email-post-remove-hard-bounces
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/email/post_remove_hard_bounces
indexed_at: '2026-04-05'
keywords:
  - bounce
  - email
  - remove
  - hard-bounce
  - endpoint
  - permission
  - provider
  - list
  - addresses
  - api
triggers:
  - remove bounced emails
  - clear bounce list
  - unblock hard bounced addresses
  - remove email from bounce list
  - manage bounce addresses
---
## Remove Hard Bounced Emails

**Endpoint:** `POST /email/bounce/remove`

Removes email addresses from both Braze's bounce list and the bounce list maintained by your email provider.

**Required permission:** `email.bounce.remove`
**Rate limit:** Default

### Request

```
POST https://rest.iad-01.braze.com/email/bounce/remove
Content-Type: application/json
Authorization: Bearer YOUR-REST-API-KEY
```

```json
{
  "email": "example@braze.com"
}
```

### Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `email` | Yes | String or array | Single email address, or array of up to 50 addresses |

### Example

```bash
curl --location --request POST 'https://rest.iad-01.braze.com/email/bounce/remove' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer YOUR-REST-API-KEY' \
  --data-raw '{
    "email": "example@braze.com"
  }'
```

### Notes

- Accepts a single string or an array of up to 50 email addresses per request
- Removal is applied to both Braze's internal list and the connected email provider's list
