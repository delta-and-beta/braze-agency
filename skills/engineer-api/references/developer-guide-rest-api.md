---
name: developer-guide-rest-api
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/rest_api/sending_sms_messages
indexed_at: '2026-04-05'
keywords:
  - SMS
  - REST
  - API
  - campaign
  - personalization
  - Liquid
  - subscription
  - transactional
  - endpoint
  - authentication
triggers:
  - send SMS via API
  - trigger transactional SMS messages
  - personalize SMS with Liquid
  - configure SMS campaign
  - send SMS to users
---
## Sending SMS via Braze REST API

Trigger transactional SMS messages from a backend service using the `/messages/send` endpoint. Analytics appear alongside campaigns and Canvases in the dashboard.

### Prerequisites

| Requirement | Description |
|---|---|
| REST API key | Requires `messages.send` permission. Create at **Settings > APIs and Identifiers > API Keys** |
| SMS subscription group | Must be configured in your Braze workspace |
| Backend service | Capable of making HTTP POST requests |

### Setup

**1. Create an API Campaign**

In the dashboard: **Messaging > Campaigns > Create Campaign > API Campaigns**

- Add a name, description, and tags
- Add **SMS** as the messaging channel
- Save the **Campaign ID** and **Message Variation ID** — both are required in the API request

**2. Send the SMS**

```
POST YOUR_REST_ENDPOINT/messages/send
Content-Type: application/json
Authorization: Bearer YOUR_REST_API_KEY
```

```json
{
  "campaign_id": "YOUR_CAMPAIGN_ID",
  "external_user_ids": ["user123"],
  "messages": {
    "sms": {
      "app_id": "YOUR_APP_ID",
      "subscription_group_id": "YOUR_SMS_SUBSCRIPTION_GROUP_ID",
      "message_variation_id": "YOUR_MESSAGE_VARIATION_ID",
      "body": "Hi {{${first_name}}}, you have a new message. Check it at https://yourwebsite.com/messages. Text STOP to opt out."
    }
  }
}
```

The `body` field supports Liquid personalization. See [SMS object docs](https://www.braze.com/docs/api/objects_filters/messaging/sms_object/) for all supported parameters.

> **Important:** Recipients in `external_user_ids` must already exist in Braze — API-only sends do not create new user profiles. Use `/users/track` first if you need to create users, or use an API-triggered campaign instead.

**3. Verify**

1. Send a test request using your own user ID as recipient
2. Confirm SMS delivery to your phone
3. Check the campaign results page in the dashboard to confirm the send is recorded

### Key Considerations

- **Compliance**: Include opt-out instructions (e.g., "Text STOP to opt out") in every message. Review SMS laws and regulations and opt-in/opt-out keyword requirements.
- **Personalization**: Use Liquid templates in the `body` field for dynamic, user-specific content.
- **Alternatives**: Use [API-triggered delivery](https://www.braze.com/docs/user_guide/engagement_tools/campaigns/building_campaigns/delivery_types/api_triggered_delivery/) to define message templates in the dashboard while still triggering sends from your backend.
- **Additional endpoints**: `/messages/schedule`, `/messages/send/triggered` for scheduling and campaign-triggered sends.
