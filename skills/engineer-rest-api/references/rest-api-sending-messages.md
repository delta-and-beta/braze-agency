---
name: rest-api-sending-messages
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/rest_api/sending_sms_messages
indexed_at: '2026-04-05'
keywords:
  - SMS
  - REST
  - API
  - messages
  - campaign
  - transactional
  - subscription
  - personalization
  - endpoint
  - compliance
triggers:
  - send SMS messages
  - send via REST API
  - create API campaign
  - personalize SMS
  - verify message delivery
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's pipeline are atomic knowledge units nested under `skills/{name}/references/*.md`. Good topic files strip Jekyll templating (`{{site.baseurl}}`, `{% raw %}` tags, `{: .reset-td-br-1}` table attributes) while preserving the actionable technical content — the goal is standalone readability for an AI agent doing lookups at runtime.
`─────────────────────────────────────────────────`

## Sending SMS Messages via REST API

Send transactional SMS messages programmatically from your backend using the Braze REST API. Messages are tracked alongside campaigns and Canvases in the dashboard.

### Prerequisites

| Requirement | Description |
|---|---|
| REST API key | Requires `messages.send` permission. Create at **Settings > APIs and Identifiers > API Keys**. |
| SMS subscription group | Configured in your Braze workspace. |
| Backend service | Capable of making HTTP POST requests. |

### Step 1: Create an API Campaign

1. Go to **Messaging > Campaigns > Create Campaign > API Campaigns**.
2. Name the campaign and select **SMS** as the messaging channel.
3. Note the **Campaign ID** and **Message Variation ID** — required for API requests.

### Step 2: Send via `/messages/send`

**Endpoint:** `POST {REST_ENDPOINT}/messages/send`

```json
{
  "campaign_id": "YOUR_CAMPAIGN_ID",
  "external_user_ids": ["user123"],
  "messages": {
    "sms": {
      "app_id": "YOUR_APP_ID",
      "subscription_group_id": "YOUR_SMS_SUBSCRIPTION_GROUP_ID",
      "message_variation_id": "YOUR_MESSAGE_VARIATION_ID",
      "body": "Hi {{${first_name}}}, you have a new message. Check it out at https://yourwebsite.com/messages. Text STOP to opt out."
    }
  }
}
```

**Headers:**
```
Content-Type: application/json
Authorization: Bearer YOUR_REST_API_KEY
```

**Key constraints:**
- Recipients in `external_user_ids` must already exist in Braze — this endpoint does not create user profiles.
- To create users first, call `/users/track`, or use an API-triggered campaign instead.
- The `body` field supports Liquid personalization (`{{${first_name}}}`, etc.).

### Step 3: Verify

1. Send a test request using your own user ID as recipient.
2. Confirm SMS delivery to your phone.
3. Check the campaign results page in the dashboard to confirm the send was recorded.

### Compliance Requirements

- Every SMS message must include opt-out instructions (e.g., "Text STOP to opt out").
- Comply with SMS laws, regulations, and carrier requirements for each target region.

### Related Capabilities

- **API-triggered delivery**: Define message templates in the dashboard while triggering sends from your backend — useful when you want to separate template ownership from send logic.
- **Scheduling & triggering**: Additional messaging endpoints exist for scheduled sends and campaign triggers.
- **Personalization**: Use Liquid and dynamic content to tailor message body per recipient.
