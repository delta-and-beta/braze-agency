---
name: message-building-by-channel-push-web
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/push/web
indexed_at: '2026-04-05'
keywords:
  - push
  - web
  - notifications
  - engagement
  - personalization
  - opt-in
  - abandonment
  - messages
  - browser
  - SDK
triggers:
  - send web push notifications
  - set up web push messaging
  - web push for cart abandonment
  - personalize web push campaigns
  - web push opt-in flow
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's pipeline are atomic knowledge units stored as `skills/{name}/references/*.md`. They're designed for fast semantic lookup, so stripping Jekyll templating syntax (`{{site.baseurl}}`, `{% %}` tags, image directives) while preserving facts is the core transformation needed here.
`─────────────────────────────────────────────────`

## Web Push Notifications

Web push notifications allow you to engage web application users via browser-level push, reaching them even when the web page isn't loaded. Visitors must opt in, similar to mobile app push.

### Key Capabilities

- Trigger messages on data changes (e.g., price drops)
- Drive return visits with call-to-action buttons
- Personalize with product and customer data
- Works identically to mobile app push notifications

### Use Cases

| Use Case | Description |
|---|---|
| Free trial | Encourage sign-ups for new visitors to convert them to paying customers |
| App download | Drive web users to mobile app using personalized engagement-based messaging |
| Discounts & sales | Time-sensitive promotions across multiple channels |
| Cart abandonment | Automated reminders — web push is **53% more effective than email** and **23% more impactful than mobile push** at recovering incomplete purchases (Braze research) |

### Prerequisites

- Developer integration required via the Web Push Integration Guide
- Users must explicitly opt in to receive notifications
- Consider using an in-browser push primer message to improve opt-in rates

### Supported Browsers

| Browser | Notes |
|---|---|
| Chrome | Desktop + Android mobile |
| Safari | Version 16 or newer |
| Firefox | Desktop + Android mobile |
| Opera | |
| Edge | |

> Note: Web push does not function in private/incognito browsing modes.

### Setup Path

1. Work with developers to integrate the Braze Web SDK with push support
2. Implement opt-in flow (push permission prompt or push primer)
3. Compose web push messages the same way as standard push notifications
