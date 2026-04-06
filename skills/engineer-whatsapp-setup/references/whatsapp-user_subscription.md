---
name: whatsapp-user_subscription
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/whatsapp/user_subscription
indexed_at: '2026-04-05'
keywords:
  - subscription
  - WhatsApp
  - opt-in
  - consent
  - enrollment
  - status
  - groups
  - messaging
  - webhook
  - Canvas
triggers:
  - set subscription state
  - check subscription status
  - manage WhatsApp opt-in
  - update subscription in Canvas
  - configure subscription groups
---
`★ Insight ─────────────────────────────────────`
Topic files in this codebase are atomic knowledge units stored under `skills/{skill-name}/references/*.md` — they're designed to be loaded selectively during query routing, so trimming boilerplate and Jekyll template syntax (like `{{site.baseurl}}` and `{: .reset-td-br-1}`) is essential for clean embedding and retrieval.
`─────────────────────────────────────────────────`

## WhatsApp User Subscription Groups

WhatsApp subscription groups are created when integrating WhatsApp via the Technology Partner Portal.

### Subscription States

| State | Behavior |
|---|---|
| `subscribed` | User has explicitly opted in to receive WhatsApp messages from a specific company |
| `unsubscribed` | User has not consented or consent has been removed; receives no WhatsApp messages from numbers in the group |

### Setting Subscription State

**REST API** — `POST /subscription/status/set`
Updates user profiles programmatically via the Braze REST API.

**Web SDK** — `addToSubscriptionGroup` method
Available for Android, iOS, and Web SDKs.

**User Import (CSV)**
Requires two columns: `subscription_group_id` and `subscription_state`. Supports email and SMS only (not WhatsApp).

### Checking Subscription State

**Dashboard**: Audience > Search Users → user profile → Engagement tab shows subscription group and status.

**REST API**: Use `GET /subscription/status/get` (list user's subscription group status) or `GET /subscription/groups/user` (list user's subscription groups).

### Opt-In / Opt-Out

- Opt-ins are **required** for WhatsApp messaging.
- Supported opt-in channels: SMS, website, WhatsApp thread, phone, or in person.
- **Keyword-based opt-ins are not supported** for WhatsApp — you must maintain your user list manually.
- WhatsApp uses a retrospective rate-limit approach: if users report or block you, your messaging rate limit is lowered.

### Updating Subscription Status in Canvas

Two methods to update subscription state within a Canvas flow:

**Option 1 — Braze-to-Braze Webhook**
Use a `POST` webhook to call the subscription status API. To avoid race conditions, trigger any follow-up messaging from a **second Canvas** based on outcomes of the first (e.g., user entered a variation and is in a WhatsApp subscription group).

**Option 2 — User Update Step (Advanced JSON Editor)**

```json
{
  "attributes": [
    {
      "subscription_groups": [
        {
          "subscription_group_id": "subscription_group_identifier_1",
          "subscription_state": "unsubscribed"
        },
        {
          "subscription_group_id": "subscription_group_identifier_2",
          "subscription_state": "subscribed"
        },
        {
          "subscription_group_id": "subscription_group_identifier_3",
          "subscription_state": "subscribed"
        }
      ]
    }
  ]
}
```

> **Note:** Subscription status updates may take up to 60 seconds to propagate.

`★ Insight ─────────────────────────────────────`
The JSON editor template above is worth preserving verbatim — it's a multi-group batch update pattern that isn't obvious from the API docs alone, and it's the kind of concrete example that makes a topic file genuinely useful at query time versus a high-level summary that would force the agent to guess at structure.
`─────────────────────────────────────────────────`
