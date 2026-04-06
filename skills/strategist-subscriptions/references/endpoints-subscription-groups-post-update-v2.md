---
name: endpoints-subscription-groups-post-update-v2
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/subscription_groups/post_update_user_subscription_group_status_v2
indexed_at: '2026-04-05'
keywords:
  - subscriptions
  - groups
  - status
  - batch
  - identifiers
  - opt-in
  - external_ids
  - v2
triggers:
  - update subscription group status
  - batch update subscriptions
  - set subscription state
  - manage subscription preferences
  - double opt-in logic
---
## POST /v2/subscription/status/set — Update Subscription Group Status (V2)

Batch update subscription state for up to 50 users across multiple subscription groups in a single request.

**Required permission:** `subscription.status.set`

---

## V2 vs V1 Differences

| Feature | V1 | V2 |
|---|---|---|
| Subscription groups per request | 1 | Multiple |
| Update email + SMS in one call | No | Yes (with `external_ids` only) |
| Email/phone identifiers | Supported | Supported (separate calls required) |

---

## Request

```
POST https://rest.iad-01.braze.com/v2/subscription/status/set
Content-Type: application/json
Authorization: Bearer YOUR-REST-API-KEY
```

```json
{
  "subscription_groups": [
    {
      "subscription_group_id": "required — string",
      "subscription_state": "required — 'subscribed' or 'unsubscribed'",
      "external_ids": "required* — array of strings (up to 50)",
      "emails": "required* — array of strings (up to 50)",
      "phones": "required* — array of E.164 strings (up to 50)",
      "use_double_opt_in_logic": "optional — boolean, default false"
    }
  ]
}
```

**\* Identifier rules:**
- Use `external_ids` to update both email and SMS groups in one call
- Cannot mix `emails` and `phones` in the same request
- If using `emails` or `phones`, make separate calls for email vs SMS groups

---

## Parameters

| Parameter | Required | Type | Notes |
|---|---|---|---|
| `subscription_group_id` | Yes | String | ID of the subscription group |
| `subscription_state` | Yes | String | `subscribed` or `unsubscribed` |
| `external_ids` | Required* | Array of strings | Up to 50 user external IDs |
| `emails` | Required* | String or array | Up to 50 addresses; shared emails update all matching users |
| `phones` | Required* | Array of E.164 strings | Up to 50; format: `+12223334444`; shared numbers update all matching users |
| `use_double_opt_in_logic` | Optional | Boolean | SMS only. `true` triggers double opt-in workflow on subscribe. Default: `false` |

---

## Example Requests

**Using `external_ids` (updates email + SMS in one call):**
```bash
curl --request POST 'https://rest.iad-01.braze.com/v2/subscription/status/set' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR-REST-API-KEY' \
--data-raw '{
  "subscription_groups": [
    {
      "subscription_group_id": "subscription_group_identifier",
      "subscription_state": "subscribed",
      "external_ids": ["example-user", "example1@email.com"]
    },
    {
      "subscription_group_id": "subscription_group_identifier",
      "subscription_state": "subscribed",
      "external_ids": ["example-user", "example1@email.com"]
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
      "subscription_group_id": "subscription_group_identifier",
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
      "subscription_group_id": "subscription_group_identifier",
      "subscription_state": "subscribed",
      "phones": ["+12223334444", "+15556667777"]
    }
  ]
}'
```

---

## Notes

- Phone numbers must be in **E.164 format** (`+12223334444`); non-E.164 numbers are rejected
- To set subscription groups at user creation time, use the `subscription_groups` field inside user attributes on the [`/users/track`](https://www.braze.com/docs/api/endpoints/user_data/post_user_track/) endpoint
- LINE subscription groups require contacting your customer success manager
- Rate limits apply — check Braze rate limit documentation for `subscription status set`
