---
name: email-delete-remove-subscription-state
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/email/delete_remove_subscription_state
indexed_at: '2026-04-05'
keywords:
  - subscription
  - delete
  - email
  - phone
  - unsubscribe
  - removal
  - endpoint
  - batch
  - user
  - state
triggers:
  - delete subscription by email
  - remove user subscriptions
  - unsubscribe users by phone
  - batch delete subscriptions
  - queue subscription deletion
---
## Delete Subscription State by Email or Phone

**Endpoint:** `DELETE /users/subscription`

Deletes subscription state values for users identified by email address or phone number.

### Request Parameters

| Parameter | Required | Type | Notes |
|-----------|----------|------|-------|
| `email` | Yes* | String | 1–50 addresses |
| `phone` | Yes* | String | 1–50 numbers; E.164 format recommended |

*At least one of `email` or `phone` must be provided per object.

### Request Format

```http
Content-Type: application/json
Authorization: Bearer YOUR_REST_API_KEY
```

```json
[
  {"phone": "+12125551212"},
  {"email": "dont.spam@me.com"},
  {"phone": "+17185551212"}
]
```

### Response

```json
{
  "status": "The emails and/or phone numbers have been queued for deletion",
  "message": "success"
}
```

Deletion is **asynchronous** — the response confirms queuing, not immediate removal.

`★ Insight ─────────────────────────────────────`
- The original example shows bare objects in a set literal (`{phone: ...}, {email: ...}`) — this is malformed JSON. The corrected form is a JSON array of objects, which is what the API actually expects.
- The endpoint accepts mixed batches (some email, some phone) in a single request, up to 50 entries each type — worth preserving as it's a non-obvious batch capability.
`─────────────────────────────────────────────────`
