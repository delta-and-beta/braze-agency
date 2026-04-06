---
name: email-post-remove-spam
source_url: 'https://braze-inc.github.io/braze-docs/_api/endpoints/email/post_remove_spam'
indexed_at: '2026-04-05'
keywords:
  - email
  - spam
  - removal
  - unsubscribe
  - recover
  - batch
  - cleanup
  - endpoint
  - permission
triggers:
  - remove email from spam list
  - recover from spam
  - unsubscribe from spam
  - batch remove spam emails
  - bulk email spam removal
---
## Remove Email from Spam List

**Endpoint:** `POST /email/spam/remove`

Removes email addresses from both the Braze spam list and your email provider's spam list.

**Required permission:** `email.spam.remove`

**Rate limit:** Default

### Request

```
POST https://rest.iad-01.braze.com/email/spam/remove
Content-Type: application/json
Authorization: Bearer YOUR-REST-API-KEY
```

### Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `email` | Required | String or Array | Single email address or array of up to 50 addresses |

### Example

```bash
curl --location --request POST 'https://rest.iad-01.braze.com/email/spam/remove' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR-REST-API-KEY' \
--data-raw '{
  "email": "example@braze.com"
}'
```

```json
{
  "email": "example@braze.com"
}
```

**Batch usage:** Pass an array to remove up to 50 addresses in one call:

```json
{
  "email": ["user1@example.com", "user2@example.com"]
}
```
