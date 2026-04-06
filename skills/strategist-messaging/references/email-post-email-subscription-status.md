---
name: email-post-email-subscription-status
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/email/post_email_subscription_status
indexed_at: '2026-04-05'
keywords:
  - email
  - subscription
  - status
  - subscribed
  - unsubscribed
  - opted-in
  - bulk
  - state
  - endpoint
triggers:
  - change email subscription status
  - update email preferences
  - bulk update email status
  - set subscription state
---
## Change Email Subscription Status

**Endpoint:** `POST /email/status`

Sets the email subscription state for users. Can be applied to email addresses not yet associated with a user — the state will be automatically applied when the address is linked.

**Required permission:** `email.status`

**Rate limit:** Default Braze rate limits apply.

### Request

```
POST https://rest.iad-01.braze.com/email/status
Content-Type: application/json
Authorization: Bearer YOUR-REST-API-KEY
```

```json
{
  "email": "example@braze.com",
  "subscription_state": "subscribed"
}
```

### Parameters

| Parameter | Required | Type | Description |
|---|---|---|---|
| `email` | Yes | String or array | Single email address or array of up to 50 addresses |
| `subscription_state` | Yes | String | `"subscribed"`, `"unsubscribed"`, or `"opted_in"` |

**Subscription states:**
- `opted_in` — explicitly opted in
- `subscribed` — subscribed but not explicitly opted in or out
- `unsubscribed` — unsubscribed

### Example

```bash
curl --location --request POST 'https://rest.iad-01.braze.com/email/status' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR-API-KEY-HERE' \
--data-raw '{
  "email": "example@braze.com",
  "subscription_state": "subscribed"
}'
```

### Notes

- Supports bulk updates: pass an array of up to 50 email addresses in the `email` field
- Setting state for an unrecognized email address is valid — the state applies automatically when the address is later linked to a user profile
