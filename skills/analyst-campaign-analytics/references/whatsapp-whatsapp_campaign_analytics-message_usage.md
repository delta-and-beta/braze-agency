---
name: whatsapp-whatsapp_campaign_analytics-message_usage
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/whatsapp/whatsapp_campaign_analytics/message_usage
indexed_at: '2026-04-05'
keywords:
  - messages
  - usage
  - billing
  - conversations
  - templates
  - categories
  - quality
  - limits
  - pricing
  - tracking
triggers:
  - how to view WhatsApp message usage
  - count WhatsApp messages in Braze
  - manage conversation windows
  - monitor phone number quality
  - understand messaging limits
---
## WhatsApp Message Usage

WhatsApp message usage in Braze refers to the tracking and reporting of WhatsApp messages sent through the platform, which directly affects billing and quota management.

### What Counts as a Message

Braze counts WhatsApp messages at the **individual message component level**, not per campaign send:

- Each **message template** sent to a user = 1 message
- Authentication messages, utility messages, marketing messages, and service messages are each counted separately
- Inbound messages from users do **not** count toward your usage

### Message Categories

WhatsApp classifies messages into four business-initiated categories that affect both routing and pricing:

| Category | Use Case |
|---|---|
| **Marketing** | Promotions, offers, announcements |
| **Utility** | Transactional updates, account alerts, order confirmations |
| **Authentication** | One-time passcodes, verification codes |
| **Service** | Responses to user-initiated conversations (free-form) |

### Viewing Usage

Message usage is visible in the Braze dashboard under:
- **Settings > Billing** — aggregate usage across all channels
- **Analytics > Message Usage** — per-channel breakdown including WhatsApp

Usage resets on your billing cycle date.

### Free-Tier Conversations

Meta provides a **1,000 free service conversations per month** per WhatsApp Business Account (WABA). These are conversations initiated by users, not by your business.

### Conversation Windows

WhatsApp uses a **24-hour conversation window** model:

- A conversation opens when you send the first message to a user
- All messages within 24 hours of the first message in that conversation are grouped into a single billable conversation
- A new window opens if 24 hours have elapsed

### Key Limits

- **Message template approval** is required before sending business-initiated messages outside an open service window
- **Phone number quality rating** (High/Medium/Low) affects your messaging limits — low quality can reduce your daily message cap
- **Messaging limits** scale from 1K → 10K → 100K → unlimited conversations per day based on quality and volume

### Monitoring Quality

Monitor your WhatsApp phone number quality in:
1. Meta Business Manager > WhatsApp Manager
2. Braze dashboard > Partner Integrations > WhatsApp

A drop in quality rating is a leading indicator of user blocks/reports and can result in messaging tier downgrades.
