---
name: email-post-blacklist
source_url: 'https://braze-inc.github.io/braze-docs/_api/endpoints/email/post_blacklist'
indexed_at: '2026-04-05'
keywords:
  - email
  - blacklist
  - unsubscribe
  - bounce
  - deprecated
  - blocklist
  - endpoint
  - api
triggers:
  - add emails to blacklist
  - unsubscribe from email
  - mark as hard bounced
  - blacklist email addresses
---
## Add Emails to Blacklist — `POST /email/blacklist` (Deprecated)

> **Deprecated:** Use [`/email/blocklist`](https://www.braze.com/docs/api/endpoints/email/post_blocklist/) instead — identical functionality, preferred endpoint.

Unsubscribes a user from email and marks them as hard bounced.

### Prerequisites

API key with `email.blacklist` permission.

### Rate Limit

Default rate limit applies.

### Request

```
POST https://rest.iad-01.braze.com/email/blacklist
Content-Type: application/json
Authorization: Bearer YOUR-REST-API-KEY
```

```json
{
  "email": ["blacklist_email1", "blacklist_email2"]
}
```

### Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `email` | Yes | String or array | Single email address or array of up to 50 addresses to blacklist. |

### Example

```bash
curl --location --request POST 'https://rest.iad-01.braze.com/email/blacklist' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer YOUR-API-KEY-HERE' \
  --data-raw '{
    "email": ["blacklist_email1","blacklist_email2"]
  }'
```
