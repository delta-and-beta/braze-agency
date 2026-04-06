---
name: endpoints-subscription-groups
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/subscription_groups/post_update_user_subscription_group_status_v2
indexed_at: '2026-04-05'
keywords:
  - subscriptions
  - groups
  - batch
  - status
  - identifiers
  - preferences
  - optins
  - channels
  - users
  - endpoints
triggers:
  - update subscription status
  - batch update subscriptions
  - manage subscription groups
  - set user subscription preferences
  - handle double opt-in logic
---
## Update User Subscription Group Status (V2)

**Endpoint:** `POST /v2/subscription/status/set`

Batch update subscription state for up to 50 users across multiple subscription groups in a single request.

**Required permission:** `subscription.status.set`

---

### V2 vs V1 Differences

| Feature | V1 | V2 |
|---|---|---|
| Subscription groups per request | 1 | Multiple |
| Update email + SMS in one call | No | Yes (with `external_ids` only) |
| Identifier flexibility | `external_ids` only | `external_ids`, `emails`, or `phones` |

---

### Request Format

```
POST https://rest.iad-01.braze.com/v2/subscription/status/set
Content-Type: application/json
Authorization: Bearer YOUR-REST-API-KEY
```

```json
{
  "subscription_groups": [
    {
      "subscription_group_id": "string (required)",
      "subscription_state": "subscribed | unsubscribed (required)",
      "external_ids": ["user1", "user2"],
      "emails": ["user@example.com"],
      "phones": ["+12223334444"],
      "use_double_opt_in_logic": false
    }
  ]
}
```

---

### Parameters

| Parameter | Required | Type | Notes |
|---|---|---|---|
| `subscription_group_id` | Required | String | ID of the subscription group |
| `subscription_state` | Required | String | `subscribed` or `unsubscribed` |
| `external_ids` | Required* | Array of strings | Up to 50 IDs |
| `emails` | Required* | String or array | Up to 50 addresses. Shared email addresses update all matching users. |
| `phones` | Required* | Array of strings | Up to 50 numbers, **must be E.164 format** (e.g. `+12223334444`). Shared numbers update all matching users. |
| `use_double_opt_in_logic` | Optional | Boolean | SMS only. `true` triggers double opt-in workflow on subscribe. Default: `false`. |

**Identifier rules:**
- Use `external_ids` to update both email and SMS groups in one call
- `emails` and `phones` cannot be combined in the same request
- `emails` or `phones` alone require separate calls for email vs SMS groups

---

### Examples

**Update both email + SMS groups (external_ids):**
```bash
curl --request POST 'https://rest.iad-01.braze.com/v2/subscription/status/set' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR-REST-API-KEY' \
--data-raw '{
  "subscription_groups": [
    {
      "subscription_group_id": "email_group_id",
      "subscription_state": "subscribed",
      "external_ids": ["user-id-1", "user-id-2"]
    },
    {
      "subscription_group_id": "sms_group_id",
      "subscription_state": "subscribed",
      "external_ids": ["user-id-1", "user-id-2"]
    }
  ]
}'
```

**Email only:**
```bash
curl --request POST 'https://rest.iad-01.braze.com/v2/subscription/status/set' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR-REST-API-KEY' \
--data-raw '{
  "subscription_groups": [
    {
      "subscription_group_id": "email_group_id",
      "subscription_state": "subscribed",
      "emails": ["example1@email.com", "example2@email.com"]
    }
  ]
}'
```

**SMS / WhatsApp:**
```bash
curl --request POST 'https://rest.iad-01.braze.com/v2/subscription/status/set' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR-REST-API-KEY' \
--data-raw '{
  "subscription_groups": [
    {
      "subscription_group_id": "sms_group_id",
      "subscription_state": "subscribed",
      "phones": ["+12223334444", "+15556667777"]
    }
  ]
}'
```

---

### Notes

- Find `subscription_group_id` in the Braze dashboard under **Subscription Groups**
- Phone numbers not in E.164 format are rejected
- New users can have subscription groups set inline via the `/users/track` endpoint's user attributes object
- LINE subscription groups require contacting your customer success manager
