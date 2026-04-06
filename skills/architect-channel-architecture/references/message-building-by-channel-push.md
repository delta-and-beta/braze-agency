---
name: message-building-by-channel-push
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/push/web
indexed_at: '2026-04-05'
keywords:
  - push
  - web
  - notifications
  - browser
  - integration
  - personalization
  - abandonment
  - triggers
  - messaging
  - engagement
triggers:
  - how to send web push notifications
  - web push integration guide
  - composing push messages
  - triggering notifications on events
  - personalizing push notifications
---
## Web Push Notifications

Web push delivers urgent, actionable updates to users of your web application. Users on [supported browsers](#supported-browsers) can opt-in whether or not the web page is currently loaded.

### Use Cases

| Use case | Description |
|---|---|
| Free trial | Encourage new visitors to sign up; hook users before converting to paid |
| App download | Drive web users to mobile app; personalize based on engagement patterns |
| Discounts and sales | Time-sensitive promotions across multiple channels |
| Cart abandonment | Automated reminders to incomplete transactions — web push is 53% more effective than email and 23% more impactful than mobile push for re-engagement |

### Prerequisites

- Developers must integrate push into your website via the **Web push integration guide**
- Users must explicitly opt in to receive notifications (same as mobile push)
- Consider using an in-browser **push primer** message to prompt opt-in before requesting permission

### Supported Browsers

- Chrome (including Chrome for Android)
- Safari 16+
- Firefox (including Firefox for Android)
- Opera
- Edge

> Web push does not work in private/incognito browsing modes.

### Key Capabilities

- Trigger messages on data events (e.g., price drops)
- Include call-to-action buttons to drive site return
- Personalize with product and customer data

Composing a web push message follows the same flow as standard push notifications. See **Create a push notification** for authoring details.
