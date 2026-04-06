---
name: in-app-messages-sending-test-messages
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/in_app_messages/sending_test_messages
indexed_at: '2026-04-05'
keywords:
  - test
  - messages
  - push
  - email
  - SMS
  - webhooks
  - segments
  - liquid
  - analytics
  - preview
triggers:
  - sending test messages
  - testing message delivery
  - preview personalized content
  - send test push notification
  - troubleshoot message delivery
---
# Sending Test Messages

> **Note:** The original source for this topic is a Jekyll template include (`developer_guide/_shared/sending_test_messages.md`). The content below is structured from the available template reference.

## Overview

Test messages allow you to verify message appearance and delivery behavior before sending to real users. Most messaging channels support sending to individual test devices or designated test segments.

## Supported Channels

- Push notifications (iOS, Android, Web)
- Email
- SMS / MMS
- In-app messages
- Content Cards
- Webhooks

## Sending a Test Message

### Via the Dashboard

1. Navigate to your campaign or Canvas.
2. Click **Test** (or **Preview & Test**) before launching.
3. Enter a user identifier (user ID, email, or device token).
4. Select the target channel.
5. Click **Send Test**.

### Via the API

Use the `/messages/send` endpoint with a test-specific segment or a single recipient:

```json
POST /messages/send
{
  "broadcast": false,
  "recipients": [
    {
      "external_user_id": "test_user_id"
    }
  ],
  "messages": {
    "email": {
      "subject": "Test Subject",
      "body": "Test body content"
    }
  }
}
```

## Test Recipients

- **Individual users**: Target by `external_user_id`, `email`, or device token.
- **Internal test groups**: Pre-configured groups of test users. Set up under **Settings > Internal Groups**.
- **Preview users**: Use a specific user's profile to render personalized content (Liquid, Connected Content).

## Key Behaviors

| Behavior | Detail |
|----------|--------|
| Frequency capping | Bypassed for test sends |
| Quiet hours | Not enforced |
| Rate limits | Still apply |
| Analytics | Test sends are excluded from campaign analytics |
| Conversion tracking | Not tracked for test sends |

## Liquid Rendering in Tests

To preview personalized content, select a **Preview User** — a real user profile whose attributes populate Liquid variables. Without a preview user, variables render as empty strings.

## Troubleshooting

- **Message not received**: Confirm the device token or user ID is registered and the app is installed.
- **Content looks wrong**: Check Liquid syntax and Connected Content responses in the **Message Preview** panel.
- **Push not delivered on iOS**: Ensure the APNs certificate or token is configured and the app has push permissions.
