---
name: endpoints-subscription-groups-get-list
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/subscription_groups/get_list_user_subscription_groups
indexed_at: '2026-04-05'
keywords:
  - subscription
  - groups
  - status
  - preferences
  - channels
  - unsubscribe
  - users
  - endpoint
triggers:
  - List user subscription groups
  - Get subscription status for users
  - Retrieve subscription preferences
  - Check subscription group status
  - Lookup subscription preferences by user
---
## GET /subscription/user/status — List User Subscription Groups

Retrieves subscription groups and their status history for one or more users.

**Required permission:** `subscription.groups.get`
**Rate limit:** Default

### Request Parameters

| Parameter | Required | Type | Description |
|---|---|---|---|
| `external_id` | Required | String | User external ID. 1–50 IDs. |
| `email` | Required* | String or String[] | User email address. 1–50 max. |
| `phone` | Required* | E.164 String | User phone number. 1–50 max. |
| `limit` | Optional | Integer | Max results. Default/max: 100. |
| `offset` | Optional | Integer | Number of results to skip. |

\* `email` and `phone` are conditionally required depending on channel (Email vs SMS/WhatsApp).

> **Note:** Multiple users sharing the same email address are each returned as separate users.

> **Note:** Only subscription groups with a prior status update appear in the response. Newly created groups are excluded.

### Example Requests

**Multiple users (external_id array):**
```
GET https://rest.iad-03.braze.com/subscription/user/status?external_id[]=1&external_id[]=2
```

**SMS/WhatsApp:**
```bash
curl -g --request GET \
  'https://rest.iad-01.braze.com/subscription/user/status?external_id={{external_id}}&limit=100&offset=1&phone=+11112223333' \
  --header 'Authorization: Bearer YOUR-REST-API-KEY'
```

**Email:**
```bash
curl -g --request GET \
  'https://rest.iad-01.braze.com/subscription/user/status?external_id={{external_id}}&email=example@braze.com&limit=100&offset=0' \
  --header 'Authorization: Bearer YOUR-REST-API-KEY'
```

### Example Response

```json
{
    "users": [
        {
            "email": "test@example.com",
            "phone": "50505050",
            "external_id": "20500",
            "subscription_groups": [
                { "id": "ec2fcc919fca", "name": "ActivationGroup",      "channel": "email", "status": "Subscribed"   },
                { "id": "7d7af9dd5556", "name": "ReactivationGroup",    "channel": "email", "status": "Subscribed"   },
                { "id": "a5e84fd16220", "name": "MarketingGroup",       "channel": "sms",   "status": "Unsubscribed" },
                { "id": "64d8cad9176c", "name": "TransactionalGroup",   "channel": "sms",   "status": "Unsubscribed" },
                { "id": "b2134cd63942", "name": "BankerMarketingGroup", "channel": "sms",   "status": "Subscribed"   }
            ]
        }
    ],
    "total_count": 1,
    "message": "success"
}
```

### Response Fields

| Field | Description |
|---|---|
| `users[].subscription_groups[].id` | Subscription group ID |
| `users[].subscription_groups[].name` | Group name |
| `users[].subscription_groups[].channel` | `email`, `sms`, or `whatsapp` |
| `users[].subscription_groups[].status` | `Subscribed` or `Unsubscribed` |
| `total_count` | Total number of matching users |
