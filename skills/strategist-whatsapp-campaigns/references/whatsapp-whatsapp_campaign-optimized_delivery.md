---
name: whatsapp-whatsapp_campaign-optimized_delivery
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/whatsapp/whatsapp_campaign/optimized_delivery
indexed_at: '2026-04-05'
keywords:
  - WhatsApp
  - delivery
  - optimized
  - engagement
  - marketing
  - templates
  - WABA
  - retargeting
  - API
  - Currents
triggers:
  - Set up optimized delivery for WhatsApp
  - Improve WhatsApp message deliverability
  - Retarget users who didn't receive WhatsApp messages
  - Handle WhatsApp delivery failures
  - Choose between optimized delivery and Cloud API
---
## WhatsApp Optimized Delivery

WhatsApp messages with optimized delivery use Meta's **Marketing Messages API (MM API for WhatsApp)** — an engagement-based delivery system that routes high-engagement messages to users more likely to read and click them.

**Key characteristics:**
- Messages assessed on expectedness, relevance, and timeliness
- Equal or greater deliverability vs. Cloud API (India: up to 9% more messages delivered per Meta)
- Does **not** guarantee 100% deliverability
- Regional availability varies — depends on business phone number and user region

---

## Setup

1. **Braze** → Partner Integrations → Technology Partners → WhatsApp
2. Under "Optimize your sending with optimized delivery," select **Upgrade setting** → triggers embedded sign-up workflow
3. Once enabled, **WhatsApp Business Account Management** will show the optimized delivery status

Alternatively: enable directly in WhatsApp Manager, then send from Braze.

**Setup errors:**
- **General error:** Contact Braze Support
- **Ineligible error:** `"At least one WhatsApp Business Account is restricted by Meta. Accounts must be in good standing to upgrade."` — must resolve with Meta before dismissing

---

## Usage in Campaigns and Canvases

**Only for marketing messages.** Braze automatically removes optimized delivery for utility, authentication, service, and response messages (those use Cloud API by default).

### Selecting delivery method

1. WhatsApp composer → **Settings** tab → **Delivery method** section
2. **Optimized Delivery (Recommended)** checkbox is checked by default when WABA is enabled
3. Uncheck to revert to Cloud API for that specific message
4. If optimized delivery is selected but unavailable, automatically falls back to Cloud API

---

## Retargeting Users on Other Channels

Since MM API doesn't guarantee 100% deliverability, retarget users who didn't receive the message:

**Filter by error code `131049`** — indicates a marketing template message was not sent due to WhatsApp's per-user marketing template limit.

| Method | Approach |
|--------|----------|
| **Braze Currents** | Export message failure events → update a custom attribute (e.g., `whatsapp_failed_last_msg: true`) → use as retargeting filter |
| **SQL Segment Extensions** | Query message failure logs via SQL → create user segment → target on alternate channel |
