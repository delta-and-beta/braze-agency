---
name: whatsapp-faqs
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/whatsapp/faqs
indexed_at: '2026-04-05'
keywords:
  - whatsapp
  - waba
  - opt-in
  - opt-out
  - messaging
  - phone-number
  - limits
  - webhook
  - quality
  - subscription
triggers:
  - how to create a WhatsApp Business Account
  - how to manage opt-in consent
  - how to increase messaging limits
  - how to handle opt-out requests
  - how to configure phone numbers
---
## WhatsApp FAQs

### Business Accounts

- Create your WhatsApp Business Account (WABA) through the **embedded sign-up flow** in the Braze dashboard
- A WABA is required even if you already have a Meta Business account — nest it under your main Meta Business account
- Access your WABA at `business.facebook.com > WhatsApp section`
- You can connect **up to 10 WABAs per workspace**; each WABA can be under a different Meta Business Manager

### Phone Numbers

- A phone number is required; verified via 2FA during embedded sign-up
- The number **cannot be used for any other WhatsApp account** (business or personal)
- A phone number **cannot be shared across multiple WABAs**
- Any supported phone number can message end-users in any supported country — no country-specific number required
- See Meta's phone number requirements for supported types

### Opt-In & Subscription Management

- **Opt-in is required** for marketing messages; WhatsApp mandates explicit consent
- If proactively messaging users to collect opt-in, the first message must ask if they want to receive marketing messages
- You need the user's phone number on their Braze profile to message them; collect it during opt-in if not already present
- **Double opt-in is not required**
- Update existing opted-in users via **user import**
- Refer to Meta's opt-in guidelines for compliant collection methods

**Opt-out methods:**
1. Inbound WhatsApp message with a specific opt-out keyword → webhook to update subscription status
2. Opt-out quick reply button in a WhatsApp template → webhook to update subscription status

### Messaging Limits

Limits control the max number of business-initiated conversations per phone number in a rolling **24-hour period**.

| Tier | Conversations/24h |
|------|-------------------|
| 1k | 1,000 |
| 10k | 10,000 |
| 100k | 100,000 |
| Unlimited | — |

**To increase limits**, all three conditions must be met:
1. Phone number status is **Connected**
2. Quality rating is **Medium** or **High**
3. Initiated ≥ `(current limit ÷ 2)` conversations with unique users in the last 7 days

- 1k → Unlimited is achievable in **4 days** if conditions are met
- View current limits: **WhatsApp Manager > Overview Dashboard > Insights**
- If a campaign targets more users than your limit allows, messages fail; Braze retries for up to **1 day** as limits increase
- Limits can **decrease** if phone number quality rating drops — subscribe to WhatsApp quality update notifications
