---
name: endpoints-subscription-groups-get-status
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/subscription_groups/get_list_user_subscription_group_status
indexed_at: '2026-04-05'
keywords:
  - subscriptions
  - subscription-groups
  - status
  - endpoint
  - identifiers
  - email
  - phone
  - SMS
  - WhatsApp
  - state
triggers:
  - check subscription status
  - get subscription group status
  - retrieve user subscription state
  - query multiple user subscriptions
---
## GET Subscription Group Status

**Endpoint:** `GET /subscription/status/get`

Returns the subscription state (`Subscribed`, `Unsubscribed`, or `Unknown`) for one or more users in a specific subscription group.

**Required permission:** `subscription.status.get`

---

### Request Parameters

| Parameter | Required | Type | Description |
|---|---|---|---|
| `subscription_group_id` | Yes | String | ID of the subscription group |
| `external_id` | Required* | String | User external ID(s). Max 50. When combined with `email`/`phone`, only `external_id` is used for querying. |
| `email` | Required* | String | User email address(es). Max 50. Cannot combine with `phone` unless `external_id` is also provided. |
| `phone` | Required* | String (E.164) | User phone number(s). Max 50. Cannot combine with `email` unless `external_id` is also provided. |

**\* Identifier rules by channel:**
- **SMS / WhatsApp groups:** `external_id` or `phone` required
- **Email groups:** `external_id` or `email` required
- Submitting both `email` and `phone` with no `external_id` returns an error

---

### Example Requests

**Multiple users (query string):**
```
GET https://rest.iad-03.braze.com/subscription/status/get?subscription_group_id={{subscription_group_id}}&external_id[]=1&external_id[]=2
```

**SMS / WhatsApp:**
```bash
curl --location -g --request GET \
  'https://rest.iad-01.braze.com/subscription/status/get?subscription_group_id={{subscription_group_id}}&phone=+11112223333' \
  --header 'Authorization: Bearer YOUR-REST-API-KEY'
```

**Email:**
```bash
curl --location -g --request GET \
  'https://rest.iad-01.braze.com/subscription/status/get?subscription_group_id={{subscription_group_id}}&email=example@braze.com' \
  --header 'Authorization: Bearer YOUR-REST-API-KEY'
```

---

### Response

```json
{
  "status": {
    "1": "Unsubscribed",
    "2": "Subscribed"
  },
  "message": "success"
}
```

---

### Important: Global vs. Group Subscription State

This endpoint returns the **subscription group status independently of the user's global subscription state.**

- If a user is globally unsubscribed, the Braze dashboard shows them as unsubscribed from all groups — but this endpoint returns the **last saved group-level status** (e.g., `Subscribed`), because the global state supersedes group states without overwriting them.
- Braze preserves individual group states so that if the user globally resubscribes, each group reverts to its previously saved status.
- To determine a user's **effective** subscription state, check **both** their global subscription status and the group status returned by this endpoint.

---

`★ Insight ─────────────────────────────────────`
- The two-layer subscription model (global state + per-group state) is a common pattern in CRM/messaging platforms — global state acts as a short-circuit without destroying granular preferences, enabling "resume where you left off" on resubscription.
- The identifier priority rule (when `external_id` + `email`/`phone` are both sent, only `external_id` is used for querying) is easy to misuse — it means you can pass an email to be *applied* to a user record without it affecting which user is *looked up*.
`─────────────────────────────────────────────────`
