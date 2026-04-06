---
name: whatsapp-whatsapp_use_cases-ads_that_click
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/whatsapp/whatsapp_use_cases/ads_that_click
indexed_at: '2026-04-05'
keywords:
  - whatsapp
  - ads
  - messaging
  - canvas
  - conversion
  - opt-in
  - acquisition
  - automation
  - webhook
  - pricing
triggers:
  - set up whatsapp ads in braze
  - configure ads that click to whatsapp
  - handle opt-in on whatsapp messages
  - route whatsapp conversions to canvas
---
# WhatsApp Ads That Click to WhatsApp

Ads That Click to WhatsApp bring users from Meta ads (Facebook, Instagram, etc.) directly into a WhatsApp conversation with your brand. Useful for acquiring new users and prompting opt-ins.

## Setup (4-Step Process)

### Step 1 — Create the Ad in Meta Ads Manager

- Follow Meta's guide to create an Ad That Clicks to WhatsApp.
- **Do not** configure automated responses in Meta — handle responses in Braze instead.
- Set a **pre-filled message** that the user sends when they tap the ad. Choose a specific trigger phrase (e.g., `"I want free delivery"`).
- In the ad copy, signal the WhatsApp interaction: *"Chat now on WhatsApp"*.

### Step 2 — Configure an Action-Based Canvas in Braze

- Canvas entry type: **Action-Based**
- Trigger event: **Send a WhatsApp inbound message**
- Message body condition: matches your trigger phrase (e.g., regex `free delivery`)

### Step 3 — Send an Immediate Response Message

- Send a response immediately after Canvas entry (no delay).
- Even though clicking the ad implies intent, **ask users to explicitly opt in** to future marketing messages.
- Use **quick reply buttons** (e.g., `"Yes"` / `"No Thanks"`) for frictionless opt-in.
- Include any promised offer (discount code, free delivery details, etc.) in this first message.

### Step 4 — Update Subscription Status on Opt-In

When a user replies "YES" (or your opt-in trigger word), update their subscription status via one of:

- **Braze-to-Braze webhook** — calls the REST API to update subscription status.
- **Advanced JSON editor** in a User Update Canvas step — updates the user profile inline.

Canvas action paths to handle:
- `Opting In` — trigger: inbound WhatsApp message to subscription group with word `"YES"`
- `Opting Out` — trigger: inbound WhatsApp message with opt-out word
- `Everyone Else` — fallback path

## Pricing Considerations

Conversations initiated via Ads That Click to WhatsApp qualify as **Free Entry Point** conversations:

| Condition | Result |
|---|---|
| User messages you via the ad | 24-hour customer service window opens |
| You respond within 24 hours | 72-hour free messaging window opens |
| All messages within the 72-hour window | Free of charge |
| Response messaging | Always free of charge |

> If you do **not** respond within 24 hours, the free entry point window closes and standard conversation charges apply.

`★ Insight ─────────────────────────────────────`
- The trigger phrase pattern (pre-filled message → Canvas regex match) is a lightweight event bridge between Meta's ad platform and Braze's action-based entry system — no webhooks or pixel integrations needed.
- Asking for explicit opt-in even when the ad click implies intent is a best practice for GDPR/compliance hygiene, since ad clicks don't constitute a clear affirmative opt-in under most regulations.
- The 72-hour free window is a useful budget lever: structuring your nurture sequence to complete within that window avoids per-message conversation fees entirely.
`─────────────────────────────────────────────────`
