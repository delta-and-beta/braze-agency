---
name: whatsapp-message_processing-handling_unknown_numbers
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/whatsapp/message_processing/handling_unknown_numbers
indexed_at: '2026-04-05'
keywords:
  - anonymous
  - profile
  - alias
  - phone
  - subscription
  - opt-in
  - Canvas
  - unknown
  - matching
  - WhatsApp
triggers:
  - How to handle unknown WhatsApp numbers
  - Creating anonymous profiles for unrecognized contacts
  - Setting up phone aliases in WhatsApp
  - Configuring opt-in Canvas for subscriptions
  - Managing WhatsApp subscription groups
---
## Handling Unknown Numbers

When WhatsApp receives a message from an unrecognized number, Braze attempts to match it to an existing user profile. If no match is found, the behavior depends on whether an opt-in Canvas is configured.

### With opt-in Canvas configured

- Creates an anonymous profile
- Assigns a user alias: `alias_label: "phone"`, `alias_name: <phone_number>`
- Sets the phone attribute
- Subscribes the user to the relevant subscription group per Canvas logic

### Without opt-in Canvas

- Creates an anonymous profile
- Assigns a user alias: `alias_label: "phone"`, `alias_name: <phone_number>`
- Sets the phone attribute
- Defaults subscription status to `unsubscribed` for **all** WhatsApp subscription groups

### Key points

- An alias-only (anonymous) profile is always created for unknown numbers — no merge with existing profiles occurs automatically
- The `alias_label` is always `phone`; the `alias_name` is the raw phone number string
- Subscription outcome is entirely determined by whether an opt-in Canvas trigger word is present
