---
name: endpoints-subscription-groups-post-update
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/subscription_groups/post_update_user_subscription_group_status_v2
indexed_at: '2026-04-05'
keywords:
  - subscription-groups
  - batch-update
  - subscription-state
  - identifiers
  - opt-in
  - unsubscribe
  - bulk-operations
  - email-sms
  - channels
triggers:
  - update subscription group status
  - batch update subscription state
  - set subscription preferences
  - manage multiple subscriptions
  - update user subscription channels
---
## POST /v2/subscription/status/set — Update Subscription Group Status (V2)

Batch update subscription state for up to 50 users across multiple subscription groups (email, SMS, WhatsApp) in a single request.

**Required permission:** `subscription.status.set`

---

## V2 vs V1 Differences

| Feature | V1 | V2 |
|---|---|---|
| Subscription groups per request | 1 | Multiple |
| Update email + SMS in one call | No | Yes (with `external_ids` only) |
| Mixed identifier types | N/A | `emails`/`phones` cannot be mixed in one request |

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
      "subscription_group_id": "string (required)",
      "subscription_state": "subscribed | unsubscribed (required)",
      "external_ids": ["array of strings (required*)"],
      "emails": ["array of strings (required*)"],
      "phones": ["+12223334444 (required*, E.164 format)"],
      "use_double_opt_in_logic": false
    }
  ]
}
```

## Parameters

| Parameter | Required | Description |
|---|---|---|
| `subscription_group_id` | Required | ID of the subscription group |
| `subscription_state` | Required | `subscribed` or `unsubscribed` |
| `external_ids` | Required* | Up to 50 user external IDs |
| `emails` | Required* | Up to 50 email addresses. Shared emails update all matching users. |
| `phones` | Required* | Up to 50 phone numbers in E.164 format (`+12223334444`). Shared numbers update all matching users. |
| `use_double_opt_in_logic` | Optional | SMS only. `true` triggers double opt-in workflow on subscribe. Defaults to `false`. |

**Identifier rules:**
- Use `external_ids` to update both email and SMS groups in one call
- Cannot mix `emails` and `phones` in the same request
- `emails`, `phones`, or `external_ids` can each be used alone

---

## Example: external_ids (email + SMS in one call)

```bash
curl --location --request POST 'https://rest.iad-01.braze.com/v2/subscription/status/set' \
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

## Example: Email only

```bash
curl --location --request POST 'https://rest.iad-01.braze.com/v2/subscription/status/set' \
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

## Example: SMS / WhatsApp

```bash
curl --location --request POST 'https://rest.iad-01.braze.com/v2/subscription/status/set' \
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

- Phone numbers not in E.164 format are rejected
- Find `subscription_group_id` on the **Subscription Group** page in the dashboard
- To set subscription groups at user creation time, use the `subscription_groups` field in the `/users/track` user attributes object
- LINE subscription groups require contacting your customer success manager
