---
name: engineer-channel-integrations
description: >-
  Technical implementation of additional messaging channels including instant
  chat, support, direct mail, mobile wallet, and advertising partners.
metadata:
  role: braze-engineer
  topics:
    - additional-channels-support
    - additional-channels-shopgate
    - additional-channels-mobile-wallet
    - additional-channels-instant-chat
    - additional-channels-direct-mail
    - additional-channels-advertising
    - additional-channels-support-zendesk
    - additional-channels-support-pypestream
    - additional-channels-mobile-wallet-passkit
    - additional-channels-instant-chat-zendesk-chat
    - additional-channels-instant-chat-sendbird
    - additional-channels-instant-chat-regal
    - additional-channels-instant-chat-pypestream
    - additional-channels-instant-chat-messenger
    - additional-channels-instant-chat-front
    - additional-channels-and-extensions-additional-channels
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
Skill files in this plugin system are pure reference documents — no frontmatter, no TDD cycle needed here since this is synthesized reference content from existing topic sources, not a behavioral/discipline skill. The writing-skills TDD framework applies primarily to skills that enforce agent behavior patterns, not to documentation synthesis like this.
`─────────────────────────────────────────────────`

Here is the generated skill markdown:

---

# Channel Integration Engineering

## Scope and Purpose

This skill covers the technical implementation of messaging channels beyond Braze's core offerings — including instant chat platforms, support ticketing integrations, mobile wallet passes, direct mail, mobile commerce, and advertising partners. Use this skill when configuring webhook pipelines, setting up SDK integrations, or connecting third-party channel platforms to Braze campaigns.

**Lens:** Technical integration patterns, SDK configuration, and webhook setup for messaging channels. Focus is on the *how* of connecting systems: payload shapes, authentication, webhook routing, and two-way conversation flows.

## When to Use This Skill

- Setting up a new messaging channel partner (chat, wallet, support, advertising)
- Configuring webhook-based two-way conversations via Braze Data Transformation
- Troubleshooting channel-specific SDK or API connectivity issues
- Architecting multi-channel flows that extend beyond email, SMS, and push

## Channel Categories

### Instant Chat

Instant chat integrations typically follow a **webhook bridge pattern**: inbound messages from the chat platform trigger a Braze webhook, and outbound Braze messages are delivered via the partner's API.

| Platform | Integration Pattern | Key Mechanism |
|---|---|---|
| **Facebook Messenger** | Direct API integration | Messenger Platform webhooks → Braze |
| **Sendbird** | In-app persistent messaging | Sendbird SDK + Braze notification trigger |
| **Zendesk Chat** | Two-way SMS via webhooks | Platform webhook → ticket creation → reply |
| **Front** | Two-way SMS pipeline | Data Transformation + outbound webhook |
| **Regal** | Phone + SMS sales conversations | Regal event triggers → Braze attributes |
| **Pypestream** | Conversational AI gateway | Full-stack cloud messaging bridge |

**Common webhook flow (Front, Zendesk Chat):**
1. Platform sends inbound webhook to Braze Data Transformation endpoint
2. Transformation code maps payload to Braze user attributes or custom events
3. Braze Canvas or Campaign triggers outbound message via connected channel

### Support Channel Integrations

Support integrations bridge customer service platforms with Braze user profiles, enabling support interactions to inform campaign logic.

**Zendesk Support Suite (ZSS):**
- Omnichannel support with email, chat, voice
- Integration point: ticket events as Braze custom events, agent notes as user attributes
- Use Braze Data Transformation to normalize Zendesk webhook payloads

**Pypestream:**
- Full-stack conversational AI with cloud messaging
- Integration pattern: Pypestream conversation outcomes fed into Braze as events for re-engagement flows

### Mobile Wallet

**PassKit** is the primary integration for Apple Wallet and Google Pay passes.

Key capabilities:
- Create, manage, distribute, and analyze pass performance
- Pass updates (e.g., loyalty balance changes) can trigger Braze events
- Distribute passes via Braze Content Cards, email, or push as deep links

Integration pattern:
1. PassKit generates pass via API
2. Pass URL delivered through Braze message
3. Pass scan/redemption events posted back to Braze as custom events

### Mobile Commerce

**Shopgate** connects mobile commerce and omnichannel retail to Braze:
- Shopping app behavior (add-to-cart, purchase) maps to Braze purchase events
- Brick-and-mortar interactions (in-store scan, associate lookup) feed Braze profiles
- Use Shopgate SDK events as triggers for Braze abandoned cart or loyalty flows

### Direct Mail

Direct mail channel integrations route physical mail fulfillment through third-party print/mail vendors. Typical pattern:
- Braze webhook action triggers mail vendor API with personalization payload
- Delivery confirmation event returned to Braze via partner webhook
- Reference vendor-specific API docs for address validation and job submission schemas

### Advertising Partners

Advertising channel integrations primarily use **Braze Audience Sync** or webhook-based audience pushes:
- Sync Braze segments to ad platforms (Facebook, Google, etc.) for retargeting
- Use connected content to pull ad performance data into Braze for message personalization
- Configure suppression lists to exclude recently messaged users from paid ads

## Core Integration Patterns

### Webhook Bridge (Two-Way Chat)
```
[Platform] → inbound webhook → [Braze Data Transformation]
                                        ↓
                              Braze user attribute / event
                                        ↓
                              Canvas trigger → outbound API message
                                        ↓
                              [Platform delivers reply]
```

### SDK Event Bridge (In-App)
```
[Partner SDK] fires event → mapped to Braze custom event
                                     ↓
                           Braze Canvas entry trigger
```

### Pass/Asset Delivery
```
Braze message → deep link to pass URL → [PassKit/partner]
[Partner] → redemption webhook → Braze custom event
```

## Common Configuration Checklist

- [ ] Webhook endpoint authenticated (HMAC signature or bearer token)
- [ ] Data Transformation code handles all payload variants (null fields, optional keys)
- [ ] Test event fired and visible in Braze user profile before enabling production flow
- [ ] Outbound rate limits respected per partner API docs
- [ ] Retry/failure handling configured for webhook delivery

## Topics Synthesized

- Additional Channels Category Overview
- Instant Chat Channels Overview
- Support Channels Overview
- Mobile Wallet Channels Overview
- Direct Mail Channels Overview
- Advertising Channels Overview
- Facebook Messenger Integration
- Sendbird Chat Integration
- Zendesk Chat Integration
- Front Chat Integration
- Regal Chat Integration
- Pypestream Chat Integration (Support + Chat)
- Zendesk Support Integration
- PassKit Mobile Wallet Integration
- Shopgate Mobile Commerce

`★ Insight ─────────────────────────────────────`
The skill groups Pypestream under both Support and Chat because the source topics treat it differently — `pypestream` (support context) vs the full integration doc (chat/conversational AI context). This dual-categorization reflects how Braze's actual docs split the same partner across multiple channel categories, which is worth preserving in the skill so an engineer searching by use case finds it either way.
`─────────────────────────────────────────────────`
