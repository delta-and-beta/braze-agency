---
name: message-building-by-channel-in-app-messages
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/in-app_messages
indexed_at: '2026-04-05'
keywords:
  - messaging
  - modal
  - slideup
  - fullscreen
  - liquid
  - abort
  - trigger
  - templated
  - campaign
  - personalization
triggers:
  - send in-app messages
  - configure message types
  - set up message triggers
  - customize templated messages
  - understand abort behavior
---
# In-App Messages Channel Index

In-app messages deliver content without interrupting users via push notifications. They appear only while the user is active in the app, with lower urgency and more context than push.

## Use Cases

| Use Case | Notes |
| --- | --- |
| Push priming | Show benefits of push opt-in, present permission prompt |
| Sales & promotions | Modal with static promo codes/offers to drive conversions |
| Feature adoption | Encourage use of other app sections or services |
| Personalized campaigns | First thing users see on app entry; pair with Connected Content |
| Other | New features, app management, reviews, upgrades, giveaways |

## Standard Message Types

| Type | Behavior | Best For |
| --- | --- | --- |
| **Slide-up** | Appears at top or bottom of screen | Terms of service, cookies, brief info snippets |
| **Modal** | Centered with overlay, stands out from background | Sales, giveaways, moderate-urgency CTAs |
| **Fullscreen** | Takes entire device screen | Mandatory updates, highest-priority messages |

**Custom formats also available:** custom HTML in-app messages, web modals with CSS, web email capture forms.

## Abort Behavior

An **abort** occurs when a user performs a trigger action but Liquid logic marks them ineligible to receive the message.

### Standard In-App Messages

- Messages are **pulled at session start** and cached on device (no Internet needed at trigger time)
- Liquid eligibility is evaluated **before** the trigger occurs
- If excluded by Liquid logic, the message is simply not delivered
- **No abort event is logged** — because the user never performed a trigger action before exclusion was determined

### Templated In-App Messages

- Only trigger metadata is sent to the device at session start (not the full payload)
- Full message is fetched via network request **when the trigger event fires**
- Liquid logic is evaluated **after** the trigger action occurs
- If Liquid leads to abort at this point → **abort event IS logged**

### Comparison

| Message Type | Abort Event Logged? | Reason |
| --- | --- | --- |
| Standard | No | User never performed trigger before evaluation |
| Templated | Yes | User performed trigger before Liquid evaluation occurred |

`★ Insight ─────────────────────────────────────`
- The standard vs. templated abort distinction maps to a **push vs. pull model**: standard IAMs are fully cached client-side at session start (payload included), while templated IAMs defer payload fetch to trigger time — enabling server-side Liquid evaluation but introducing a network dependency.
- This is a good example of a **trade-off between freshness and reliability**: templated messages can use up-to-date data at trigger time, but require connectivity and can actually abort; standard messages are always available offline but evaluated against stale session-start data.
`─────────────────────────────────────────────────`
