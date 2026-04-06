---
name: email-get-query-by-email-or-phone
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/email/get_query_by_email_or_phone
indexed_at: '2026-04-05'
keywords:
  - subscription
  - email
  - phone
  - query
  - lookup
  - status
  - state
  - user
  - groups
  - bounce
triggers:
  - query subscription by email
  - check subscription status
  - get user subscription state
  - lookup subscription groups
---
## Query Subscription by Email or Phone

**Endpoint:** `GET /users/subscription`

Returns subscription state for users identified by email address or phone number.

### Request Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `email` | Yes* | String | Email address(es) — 1 to 50 addresses |
| `phone` | Yes* | String | Phone number(s) in E.164 format — 1 to 50 numbers |

*At least one of `email` or `phone` must be provided.

### Example Request

```bash
curl --location --request GET \
  'https://rest.iad-01.braze.com/users/subscriptions?phone=+12123355555&email=example%40braze.com' \
  --header 'Authorization: Bearer YOUR_REST_API_KEY'
```

### Response

Results are returned in descending order. The response includes separate `emails` and `phone` arrays.

```json
{
  "emails": [
    {
      "email": "example@braze.com",
      "email_subscribe": {
        "email_subscription_event_date": "2019-11-20T19:58:04.825Z",
        "email_subscription_state": "Subscribed"
      },
      "subscription_group": [
        {
          "subscription_group_id": "5f5536d2a76e0f4e323a1234",
          "subscription_group_event_date": "2021-03-11T21:29:22.347Z",
          "subscription_group_state": "Unsubscribed"
        }
      ],
      "hard_bounced_at": null,
      "spam_at": null
    }
  ],
  "phone": [
    {
      "phone": "+12123355555",
      "subscription_group": [
        {
          "subscription_group_id": "3f5536d2a76e0f4e323a5555",
          "subscription_group_state": "Subscribed",
          "subscription_group_event_date": "2021-03-11T21:29:22.347Z"
        }
      ]
    }
  ],
  "message": "success"
}
```

### Key Response Fields

**Email entries:**
- `email_subscribe.email_subscription_state` — global email subscription state (e.g., `"Subscribed"`)
- `email_subscribe.email_subscription_event_date` — ISO 8601 timestamp of last state change
- `subscription_group[]` — per-group subscription state and event date
- `hard_bounced_at` — timestamp if hard bounced, otherwise `null`
- `spam_at` — timestamp if marked spam, otherwise `null`

**Phone entries:**
- `subscription_group[]` — per-group subscription state and event date (no global phone subscription state field)
