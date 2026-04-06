---
name: email-post-blocklist
source_url: 'https://braze-inc.github.io/braze-docs/_api/endpoints/email/post_blocklist'
indexed_at: '2026-04-05'
keywords:
  - email
  - blocklist
  - unsubscribe
  - suppress
  - bounce
  - blacklist
  - batch
  - endpoint
triggers:
  - add emails to blocklist
  - unsubscribe users from email
  - hard bounce email addresses
  - bulk suppress emails
  - manage email suppression
---
## Add Emails to Blocklist

**Endpoint:** `POST /email/blocklist`

Unsubscribes a user from email and marks them as hard bounced.

**Required permission:** `email.blacklist`

### Request

```
POST https://rest.iad-01.braze.com/email/blocklist
Content-Type: application/json
Authorization: Bearer YOUR-REST-API-KEY
```

```json
{
  "email": ["blocklist_email1", "blocklist_email2"]
}
```

### Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `email` | Yes | String or array | Single email address or array of up to 50 addresses to blocklist |

### Example

```bash
curl --location --request POST 'https://rest.iad-01.braze.com/email/blocklist' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer YOUR-API-KEY-HERE' \
  --data-raw '{
    "email": ["blocklist_email1","blocklist_email2"]
  }'
```

### Notes

- Rate limit: default Braze rate limits apply
- Supports batch operation: up to 50 emails per request
- Effect: unsubscribes user + marks as hard bounced (permanent suppression)
