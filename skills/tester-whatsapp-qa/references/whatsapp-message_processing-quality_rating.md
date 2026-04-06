---
name: whatsapp-message_processing-quality_rating
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/whatsapp/message_processing/quality_rating
indexed_at: '2026-04-05'
keywords:
  - quality
  - rating
  - messaging
  - limits
  - throughput
  - templates
  - pacing
  - feedback
  - engagement
  - blocks
triggers:
  - improve quality rating
  - check messaging limits
  - understand template pacing
  - increase throughput
  - avoid customer blocks
---
## WhatsApp Quality Rating & Messaging Limits

### Key Concepts

| Term | Definition |
|---|---|
| **Quality rating** | Rolling 7-day score based on customer feedback (blocks, reports). Meta uses this to adjust your sending capabilities. |
| **Messaging limit** | Max business-initiated conversations per phone number in a 24-hour rolling window. |

### Initial Onboarding

- Meta sets the initial sending limit when a new WhatsApp Business Account is created, based on multiple factors.
- Check your current limit in **WhatsApp Business Manager → Phone Number Insights**.

### Throughput

- Default: **80 messages/second** per registered business phone number.
- Upgrade to **1,000 messages/second** available automatically or on request.

### Template Pacing

Applies to:
- Recently created marketing templates
- Paused marketing templates that were just unpaused

**Behavior:** Messages send normally until an unspecified threshold is reached. After that, subsequent messages using the same template are **held** to allow time for customer feedback signals to accumulate.

- Pacing is primarily driven by your **template quality history**.
- Pacing ends once sufficient feedback data is collected.

### What Affects Your Rating

Meta continuously monitors your WhatsApp usage. Factors that can lower quality rating:
- Customers blocking your number
- Customers reporting messages
- Low engagement rates

A degraded quality rating can reduce your messaging limits.
