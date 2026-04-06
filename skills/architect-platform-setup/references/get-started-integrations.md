---
name: get-started-integrations
source_url: 'https://braze-inc.github.io/braze-docs/_user_guide/get_started/integrations'
indexed_at: '2026-04-05'
keywords:
  - SDK
  - integration
  - channels
  - messaging
  - push
  - email
  - webhooks
  - attributes
  - events
  - credentials
triggers:
  - how to implement SDK
  - set up messaging channels
  - configure push notifications
  - define custom events
  - test integration before launch
---
`★ Insight ─────────────────────────────────────`
Topic files are atomic knowledge units — the goal is maximum signal density. Strip Jekyll template syntax (`{% alert %}`, `{{site.baseurl}}`), marketing fluff, and navigation chrome while preserving the structured facts that an AI agent would actually need to answer questions.
`─────────────────────────────────────────────────`

## Integrations Overview

Braze integration is a collaborative effort between marketers and developers. This topic covers the technical steps, channel setup, and post-launch considerations.

---

## Integration Steps

### Step 1: SDK Implementation

Developers implement the Braze SDK to enable data exchange between Braze and your app or site. They require:

- **API keys** — provide directly or grant Braze account access
- **SDK endpoint** — use predefined SDK endpoints (custom endpoints are no longer issued)
  - If you have a legacy custom endpoint, setup guides exist for Android, iOS (Swift), and Web

> Caution: Do not allow unintentional changes to company credentials in Braze during implementation — this can lock accounts or break the integration.

### Step 2: Messaging Channel Setup

Each channel requires its own implementation steps beyond the base SDK. Communicate channel priorities to developers early.

| Channel | Notes |
|---|---|
| In-app messages | Requires SDK + channel-specific steps |
| Push | Requires SDK + messaging credentials + push token handling |
| Email | Entirely separate process — see Email Setup docs |
| Content Cards | Contact Braze customer success manager to get started |
| SMS & MMS | See SMS Setup docs |
| Webhooks | Requires SDK + channel-specific steps |

### Step 3: Data Setup

Define what user actions and attributes Braze should track. Preparation steps:

1. Work with marketing to define campaigns, goals, custom attributes, and events
2. Define custom data requirements (custom attributes, custom events)
3. Decide how data is tracked (SDK-triggered events, etc.)
4. Determine workspace count and test/configure those workspaces

Outputs for developers: custom data implementation, user imports if needed. Follow event naming conventions consistently.

### Step 4: Advanced Customization

For API-triggered launches and Connected Content (pulling external data into messages), coordinate between your Braze contact and developers before implementation.

### Step 5: QA

Before go-live:
- Send test messages
- Use Braze test apps (Android, iOS)
- Test Android/FireOS basic integration
- Test iOS push notifications

---

## Post-Implementation

- **Rate limiting**: Before sending at scale, assess your infrastructure's capacity to handle Braze-triggered requests. Configure rate limiting accordingly.
- **Do not blast at launch**: Sending mass push to users who all click simultaneously can overload your backend.

---

## Key Roles

| Who | Responsibility |
|---|---|
| Developers | SDK integration, channel setup, custom event tracking |
| Marketers | Define events/attributes/campaigns, provide API keys, QA sign-off |
| Braze CSM | Required for Content Cards onboarding |

`★ Insight ─────────────────────────────────────`
The table format for channels and roles dramatically improves scannability for AI retrieval — structured data is easier to pattern-match than prose. Removing Jekyll liquid tags (`{% alert %}`, `{{site.baseurl}}`) is essential since they're meaningless outside the docs build system and add noise to embeddings.
`─────────────────────────────────────────────────`
