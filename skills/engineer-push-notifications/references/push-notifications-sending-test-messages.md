---
name: push-notifications-sending-test-messages
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/push_notifications/sending_test_messages
indexed_at: '2026-04-05'
keywords:
  - push
  - notifications
  - testing
  - device
  - token
  - campaign
  - APNs
  - FCM
  - messaging
  - API
triggers:
  - how to send test push notifications
  - sending test messages to devices
  - registering test devices
  - testing push integration
  - verifying push messages before sending
---
# Sending Test Push Messages

## Overview

Test push notifications allow you to verify push integration and message rendering before sending to users. Tests can be sent to individual devices or internal test groups.

## Prerequisites

- Push integration completed (APNs for iOS, FCM for Android)
- A registered push token for the target device
- Device registered as a test device in Braze dashboard

## Sending a Test from the Dashboard

1. Navigate to **Messaging > Campaigns** and create or open a push campaign
2. Compose your message in the campaign editor
3. Click **Test Send** (or **Preview & Test**)
4. Select **Send Test**
5. Enter an external user ID or email address, or select a test device
6. Click **Send Test**

The test notification arrives on the target device immediately, bypassing scheduling and audience filters.

## Registering a Test Device

**Dashboard path:** Settings > Developer Console > Test Devices

- Add a device by push token or by scanning a QR code from the Braze SDK
- Test devices receive test sends regardless of audience targeting

## Sending via API (Test Endpoint)

Use the `/messages/send` endpoint with the `override_messaging_limits` and `recipient_subscription_state` fields to send to a specific user without checking subscription state:

```json
POST /messages/send
{
  "external_user_ids": ["test_user_id"],
  "messages": {
    "apple_push": {
      "alert": "Test push message",
      "badge": 1
    }
  }
}
```

For Android:
```json
{
  "external_user_ids": ["test_user_id"],
  "messages": {
    "android_push": {
      "alert": "Test push message",
      "title": "Test Title"
    }
  }
}
```

## Content Test Groups

Send to predefined groups of internal testers without manually entering IDs each time:

- **Dashboard path:** Settings > Developer Console > Content Test Groups
- Create a group, add internal user IDs
- Select the group in the **Test Send** dialog

## Troubleshooting

| Issue | Check |
|-------|-------|
| Test not received | Verify push token is registered and active |
| Token invalid | Re-register device; tokens rotate after reinstalls |
| iOS test fails | Confirm APNs certificate/key is valid and not expired |
| Android test fails | Confirm Firebase project ID and server key match |

## Key Behaviors

- Test sends **bypass** audience filters, rate limits, and quiet hours
- Test sends **do not** count toward campaign analytics
- Sending to an unsubscribed user via test send will still deliver the message
- Rich media (images, action buttons) renders in test sends exactly as in production
