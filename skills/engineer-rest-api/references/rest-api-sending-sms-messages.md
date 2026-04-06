---
name: rest-api-sending-sms-messages
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/rest_api/sending_sms_messages
indexed_at: '2026-04-05'
keywords:
  - SMS
  - REST
  - API
  - campaign
  - messages
  - endpoint
  - transactional
  - subscription
  - personalization
  - compliance
triggers:
  - how to send SMS messages
  - sending SMS via REST API
  - SMS campaign setup
  - transactional SMS configuration
  - API SMS delivery
---
`★ Insight ─────────────────────────────────────`
- Topic files in Nick's architecture are "atomic knowledge units" — they live inside a skill's `references/` directory and should be self-contained, standalone facts
- Stripping Jekyll template syntax (`{{site.baseurl}}`, `{% raw %}`, `{% alert %}`) is essential since these are Braze's static site directives that won't render in plain markdown
- The condensed format prioritizes the API contract (endpoint, payload shape, required IDs) over prose explanation — this is what an engineer actually needs at lookup time
`─────────────────────────────────────────────────`

## Sending SMS Messages via API

Use the `/messages/send` REST endpoint to trigger transactional SMS messages programmatically from your backend, with analytics tracked in the Braze dashboard alongside campaigns and Canvases.

### Prerequisites

| Requirement | Description |
|---|---|
| REST API key | Requires `messages.send` permission. Create at **Settings > APIs and Identifiers > API Keys** |
| SMS subscription group | Must be configured in your Braze workspace |
| Backend service | Capable of making HTTP POST requests |

### Setup: Create an API Campaign

1. Go to **Messaging > Campaigns > Create Campaign > API Campaigns**
2. Name the campaign and add **SMS** as the messaging channel
3. Record the **Campaign ID** and **Message Variation ID** — both are required in API requests

### Sending an SMS

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
      "body": "Hi {{first_name}}, you have a new message. Check it out at https://yourwebsite.com/messages. Text STOP to opt out."
    }
  }
}
```

**Headers:**
```
Content-Type: application/json
Authorization: Bearer YOUR_REST_API_KEY
```

### Key Constraints

- **Users must exist first.** `external_user_ids` must reference existing Braze profiles. API-only sends do not create new users. Use `/users/track` to create users beforehand, or switch to an API-triggered campaign.
- **Liquid personalization** is supported in the `body` field (e.g., `{{first_name}}`).
- **Opt-out text is required** in every message for regulatory compliance (e.g., "Text STOP to opt out").

### Verification Checklist

1. Send a test request using your own `external_user_id`
2. Confirm SMS delivery to your phone
3. Confirm the send is recorded on the campaign results page in the Braze dashboard
4. Monitor delivery analytics as you scale

### Compliance Notes

- SMS messages must comply with carrier requirements and regional regulations (e.g., TCPA in the US)
- Always include opt-out instructions in message body
- Review Braze SMS laws/regulations and opt-in/opt-out keyword documentation before sending at scale

`★ Insight ─────────────────────────────────────`
- The original doc used Jekyll's `{% alert important %}` callout — condensed to a "Key Constraints" section, which is more scannable in a reference file
- Liquid template syntax in the original (`{{${first_name}}}`) uses Braze's Jekyll-escaped format; normalized to `{{first_name}}` which is what engineers write in actual message bodies
`─────────────────────────────────────────────────`
