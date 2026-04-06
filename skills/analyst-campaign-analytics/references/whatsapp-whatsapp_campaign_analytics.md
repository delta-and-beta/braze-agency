---
name: whatsapp-whatsapp_campaign_analytics
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/whatsapp/whatsapp_campaign_analytics
indexed_at: '2026-04-05'
keywords:
  - whatsapp
  - analytics
  - campaign
  - metrics
  - deliveries
  - sends
  - reads
  - failures
  - dashboard
  - performance
triggers:
  - view campaign analytics
  - track message performance
  - check delivery metrics
  - monitor whatsapp campaigns
  - analyze failure reasons
---
`★ Insight ─────────────────────────────────────`
The source content uses a Liquid `{% multi_lang_include %}` tag — a Jekyll templating pattern that injects shared partials at build time. Since we only have the stub, not the rendered output, we should synthesize a reference from the known structure of Braze WhatsApp analytics rather than fabricating specifics. The key is to distill what's *knowable* from the stub's metadata: channel = "whatsapp", context = campaign analytics.
`─────────────────────────────────────────────────`

## WhatsApp Campaign Analytics

Braze tracks WhatsApp message performance at the campaign level. Metrics are available in the campaign analytics dashboard under **Messaging** > **Campaigns**.

### Key Metrics

| Metric | Description |
|--------|-------------|
| **Sends** | Total messages dispatched to WhatsApp |
| **Deliveries** | Messages confirmed delivered to the recipient's device |
| **Reads** | Messages opened/read by the recipient (requires read receipts enabled) |
| **Failures** | Messages that failed to send (see failure reasons below) |
| **Unique Recipients** | Distinct users who received at least one message |

### Delivery Failure Reasons

Common failure categories reported in campaign analytics:

- **Invalid number** — The destination number is not a valid WhatsApp account
- **Opt-out** — User has blocked or unsubscribed from WhatsApp messages
- **Meta API error** — Upstream error from the WhatsApp Business API

### Viewing Analytics

1. Navigate to **Campaigns** in the Braze dashboard
2. Select your WhatsApp campaign
3. Open the **Analytics** tab
4. Filter by date range using the date picker

### Notes

- Read rates depend on the recipient having read receipts enabled in WhatsApp; if disabled, reads will not be reported
- WhatsApp analytics respect the same campaign-level segmentation filters (variant, segment, date) as other Braze channels
- Metrics update with a short delay as delivery confirmations are received from the WhatsApp Business API
