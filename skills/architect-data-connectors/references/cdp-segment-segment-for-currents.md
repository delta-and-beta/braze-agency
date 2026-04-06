---
name: cdp-segment-segment-for-currents
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/data_and_analytics/customer_data_platform/segment/segment_for_currents
indexed_at: '2026-04-05'
keywords:
  - segment
  - currents
  - export
  - events
  - analytics
  - integration
  - engagement
  - messages
  - campaign
  - webhook
triggers:
  - export Braze events to Segment
  - set up Currents connector
  - configure Segment integration
  - track message engagement
  - send campaign data to analytics
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's pipeline are atomic knowledge units stored under `skills/{skill-name}/references/*.md`. They strip Jekyll template syntax (`{{site.baseurl}}`, `{% alert %}`, `{: .reset-td-br-1 }`) and liquid tags that would be noise for an LLM context window, while preserving the structured facts an agent needs to answer questions.
`─────────────────────────────────────────────────`

## Segment for Currents

Export Braze events to Segment via Braze Currents to drive analytics into conversions, retention, and product usage.

## Prerequisites

| Requirement | Detail |
|---|---|
| Segment account | Active account at app.segment.com |
| Braze destination in Segment | Braze must already be configured as a destination in Segment (correct data center + REST API key) |
| Braze Currents | Currents must be enabled on your Braze account |

## Setup

### 1. Get the Segment Write Key

In Segment dashboard: **Source > Settings > API Keys > Write Key**

> Keep this key current. Expired credentials stop event delivery. After **5 days** of failure, events are permanently dropped.

### 2. Create the Currents Connector in Braze

1. **Partner Integrations > Data Export**
2. **+ Create New Current > Segment Data Export**
3. Fill in: integration name, contact email, Segment write key, Segment region

### 3. Select Events and Launch

- Choose message engagement events to export
- All events include `external_user_id` as `userId` and `braze_id` as `anonymousId`
- Anonymous user events only export if **Include events from anonymous users** is checked
- Click **Launch Current**

## Supported Export Events

### Behaviors
- `users.behaviors.Uninstall`
- `users.behaviors.subscription.GlobalStateChange`
- `users.behaviors.subscriptiongroup.StateChange`

### Campaigns
- `users_campaigns_abort`
- `users.campaigns.Conversion`
- `users.campaigns.EnrollInControl`

### Canvas
- `users_canvas_abort`
- `users.canvas.Conversion`
- `users.canvas.Entry`
- `users.canvas.exit.MatchedAudience`
- `users.canvas.exit.PerformedEvent`
- `users.canvas.experimentstep.Conversion`
- `users.canvas.experimentstep.SplitEntry`

### Messages

**Content Card:** Abort, Click, Dismiss, Impression, Send
- `users.messages.contentcard.{Abort|Click|Dismiss|Impression|Send}`

**Email:** Abort, Bounce, Click, Delivery, MarkAsSpam, Open, Send, SoftBounce, Unsubscribe
- `users.messages.email.{Abort|Bounce|Click|Delivery|MarkAsSpam|Open|Send|SoftBounce|Unsubscribe}`

**In-App Message:** Abort, Click, Impression
- `users.messages.inappmessage.{Abort|Click|Impression}`

**Push Notification:** Abort, Bounce, IosForeground, Open, Send
- `users.messages.pushnotification.{Abort|Bounce|IosForeground|Open|Send}`

**SMS:** Abort, Delivery, DeliveryFailure, InboundReceive, Rejection, Send, ShortLinkClick
- `users.messages.sms.{Abort|Delivery|DeliveryFailure|InboundReceive|Rejection|Send|ShortLinkClick}`

**Webhook:** Abort, Send
- `users.messages.webhook.{Abort|Send}`

**WhatsApp:** Abort, Delivery, Failure, InboundReceive, Read, Send
- `users.messages.whatsapp.{Abort|Delivery|Failure|InboundReceive|Read|Send}`

`★ Insight ─────────────────────────────────────`
The brace-expansion notation (`{Abort|Click|Dismiss}`) isn't standard Markdown but reads naturally as a compact enumeration — useful in topic files where screen real estate matters and an LLM can trivially expand the pattern. The alternative (a full list per channel) would triple the file size with minimal information gain.
`─────────────────────────────────────────────────`
