---
name: whatsapp-message_processing-opt-ins_and_opt-outs
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/whatsapp/message_processing/opt-ins_and_opt-outs
indexed_at: '2026-04-05'
keywords:
  - opt-in
  - opt-out
  - subscription
  - WhatsApp
  - keyword
  - Canvas
  - webhook
  - quality-rating
  - phone-number
triggers:
  - how to set up WhatsApp opt-ins
  - managing WhatsApp opt-outs
  - setting up keyword filters for opt-out
  - updating WhatsApp subscription status
  - WhatsApp opt-in methods
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's architecture are atomic knowledge units nested under `skills/{skill-name}/references/`. They're designed to be self-contained — the pipeline strips Liquid template tags (`{{site.baseurl}}`), removes nav boilerplate, and preserves only actionable facts so the MCP semantic search can surface precise answers at query time.
`─────────────────────────────────────────────────`

## WhatsApp Opt-ins and Opt-outs

WhatsApp monitors your **phone number quality rating** — low ratings reduce message limits. Prevent this by allowing customers to opt-out, controlling message frequency, and providing value-driven messaging.

---

## Opt-in Setup Requirements

Every opt-in must provide Braze with:
- `external_id`
- Phone number
- Updated subscription status

Update via `/users/track` endpoint or `/v2/subscription/status/set` endpoint or Braze SDK (`addToSubscriptionGroup`).

---

## Opt-in Methods

### External to Braze

**1. Externally built opt-in list**
If you have a pre-existing WhatsApp opt-in list, import via CSV or API using the user import format.

**2. Outbound message in customer support channel**
After resolving a support issue, send an automatic follow-up asking if the user wants to opt-in to marketing:
1. Provide a WhatsApp Business message link
2. Use quick reply actions (e.g., customer replies "Yes")
3. Set up a custom keyword trigger
4. Call `/users/track` to update/create the user, then call `/subscription/status/set` or use the SDK

**3. Inbound WhatsApp message**
Have customers message your WhatsApp number to trigger opt-in:
1. Create an action-based campaign triggered by an inbound WhatsApp message
2. Create a webhook campaign to update subscription status
3. Optionally build a QR code or URL via WhatsApp Manager under **Phone Number > Message Links**

### Braze-Powered

**SMS message (Canvas)**
Set up a Canvas campaign asking customers to opt-in to WhatsApp:
- Target segment: subscribed marketing group outside the US
- Use custom keyword trigger setup

**In-app or in-browser message**
Use an HTML in-app message with JavaScript bridge to interface with Braze SDK. Specify the WhatsApp subscription group ID.

**Phone number capture form**
Use the drag-and-drop editor's phone number capture form template to collect phone numbers and grow WhatsApp subscription groups.

---

## Opt-out Methods

### General Opt-out Keywords (Canvas)

Set up a Canvas triggered by inbound WhatsApp messages containing opt-out keywords (e.g., "STOP"):

1. **Canvas entry step**: Action-based trigger — "Inbound WhatsApp Message"
2. **Add keyword filter**: Match the specific opt-out keyword
3. **Update subscription status**: Call `/subscription/status/set` or use SDK to unsubscribe
4. **Optional**: Send a confirmation message acknowledging the opt-out

Canvases are preferred over campaigns here because they support a follow-up confirmation message.

### Keyword Modifiers: `regex` vs `is`

| Modifier | Behavior |
|----------|----------|
| `is` | Exact match only — message must equal the keyword exactly |
| `regex` | Pattern match — allows partial matches, variations, or case-insensitive matching |

Use `regex` when you want to catch variations (e.g., "stop", "STOP", "Stop please"). Use `is` for strict keyword enforcement.

### Marketing Opt-out Selection

WhatsApp marketing message templates can include a built-in **opt-out button**. When a user taps this button:
1. WhatsApp records the opt-out signal
2. Braze receives the event
3. Update the user's subscription status via webhook or Canvas action

---

## Key Endpoints

| Action | Endpoint |
|--------|----------|
| Update user profile + phone | `POST /users/track` |
| Set subscription status | `POST /subscription/status/set` |
| Set subscription status (v2) | `POST /v2/subscription/status/set` |
