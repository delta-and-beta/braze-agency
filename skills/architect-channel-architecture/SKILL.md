---
name: architect-channel-architecture
description: >-
  System-level design of the multi-channel messaging topology including channel
  selection, orchestration, and platform capabilities.
metadata:
  role: braze-architect
  topics:
    - message-building-by-channel
    - message-building-by-channel-push
    - message-building-by-channel-email
    - message-building-by-channel-sms-mms-rcs
    - message-building-by-channel-in-app-messages
    - message-building-by-channel-whatsapp
    - message-building-by-channel-content-cards
    - message-building-by-channel-webhooks
    - message-building-by-channel-line
    - message-building-by-channel-kakaotalk
    - message-building-by-channel-banners
    - engagement-tools
    - engagement-tools-messaging-fundamentals-delivery-types
    - engagement-tools-messaging-fundamentals-copying-across-workspaces
    - brazeai
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
The skill-development guide emphasizes **progressive disclosure**: keep SKILL.md lean (1,500–2,000 words) and use `references/` for depth. Since all 15 topics are already separate reference files, the SKILL.md body should be a routing/synthesis layer—telling Claude *when* to consult which topic, not duplicating their content.
`─────────────────────────────────────────────────`

# Multi-Channel Architecture

Design, select, and orchestrate Braze's full suite of messaging channels to reach users with the right message, on the right surface, at the right moment. This skill applies an architectural lens: channel topology, cross-channel orchestration, and platform capability mapping—not message copy or campaign setup.

Consult this skill when making decisions such as:

- Which channel (or combination of channels) best fits a use case
- How to sequence or coordinate messages across multiple channels in a Canvas
- What delivery type to apply to a campaign or Canvas step
- Whether a platform capability (BrazeAI, webhooks, RCS) unlocks a requirement
- How to scope work that must span multiple workspaces

---

## Channel Taxonomy

Braze organizes channels into three topological families:

### On-Device (In-Session)
Appear while the user is active in an app or browser session. Lower urgency; richer layout control.

| Channel | Surface | Key Trait |
|---------|---------|-----------|
| In-App Messages | Mobile/Web app | Session-gated; no opt-in required |
| Content Cards | App feed or embedded widget | Persistent; user-pulls content |
| Banners | App header/footer strip | Non-intrusive; persistent placement |

### Push (Interrupt)
Delivered to the device OS or browser, outside the app. Requires explicit opt-in.

| Channel | Surface | Key Trait |
|---------|---------|-----------|
| Mobile Push | iOS / Android | High reach; requires permission |
| Web Push | Browser (supported only) | Desktop/tab re-engagement |

### External Messaging
Route through third-party platforms. Reach users where they communicate socially or professionally.

| Channel | Platform | Key Trait |
|---------|---------|-----------|
| Email | Inbox | Rich HTML; high content capacity |
| SMS/MMS/RCS | Carrier / device | Direct; opt-in regulated by law |
| WhatsApp | Meta | Template-first; WABA required |
| LINE | LINE Corp (APAC) | Flex message format |
| KakaoTalk | CJ OliveNetworks / Infobip | Korea-specific; partner-mediated |
| Webhooks | Any HTTP endpoint | Platform-agnostic; system integration |

---

## Channel Selection Framework

Evaluate two axes when selecting a channel:

**Urgency** — How time-sensitive is the message? (Seconds → Days)  
**Content richness** — How much layout control is needed? (Plain text → Full HTML)

Map these to channels:

```
High urgency  │ Push (mobile/web)   SMS/RCS
              │ WhatsApp            KakaoTalk / LINE
              │
Low urgency   │ In-App Messages     Content Cards
              │ Email               Banners
              └──────────────────────────────
                Low richness →       High richness
```

Secondary selection factors:
- **Reach**: Does the user have app installed? Browser? Phone number? Email?
- **Regulatory surface**: SMS and WhatsApp carry opt-in/opt-out legal requirements
- **Content lifetime**: Push and SMS are ephemeral; Content Cards and Banners persist

Consult `references/message-building-by-channel-index.md` for the full decision matrix and channel-specific composer constraints.

---

## Cross-Channel Orchestration Patterns

### Fallback Chains
Route users to the next channel if the primary is unavailable or unread.

**Pattern**: Push → In-App → Email  
**Canvas implementation**: Use audience filter steps to check push eligibility, then branch.

### Coordinated Timing
Suppress a follow-up channel if the user converts on the first.

**Pattern**: Email send → 24h wait → check open → SMS if unopened  
**Canvas implementation**: Delay step + Action Path on email open event.

### Cross-Surface Persistence
Pair an interrupt channel with a persistent surface for long-lived content.

**Pattern**: Push notification links to Content Card feed  
**Use case**: Promotions that expire in 7 days, surfaced repeatedly until acted on.

### Webhook as Orchestration Bus
Use webhooks to trigger actions outside Braze—CRM updates, fulfillment systems, other messaging platforms—within a Canvas flow.

Consult `references/webhooks-channel-index.md` for webhook template patterns and authentication setup.

---

## Delivery Type Selection

Every campaign and Canvas entry must use one of three delivery types:

| Type | When to Use |
|------|------------|
| **Scheduled** | One-off sends; date-based triggers; recurring digests |
| **Action-Based** | Triggered by a user behavior event (purchase, page view, etc.) |
| **API-Triggered** | Launched programmatically from your backend or another system |

Delivery type is set at the campaign or Canvas level and affects available timing controls (send time optimization, quiet hours, rate limiting). Consult `references/delivery-types.md` for the full capability matrix per type.

---

## Platform Capabilities That Shape Architecture

### BrazeAI
BrazeAI surface features across channels: send time optimization, predictive churn, intelligent channel selection. Evaluate BrazeAI options when designing high-volume or personalization-heavy flows. Consult `references/brazeai.md`.

### RCS (Rich Communication Services)
RCS upgrades SMS with richer card layouts and read receipts on supported devices, with automatic carrier fallback to SMS. Factor device/carrier support into channel decisions when considering SMS/MMS/RCS. Consult `references/sms-mms-rcs-channel-index.md`.

### Engagement Tools
Braze's engagement tools (A/B testing, Feature Flags, Campaign Analytics) apply across channels. Reference `references/engagement-tools-index.md` when designing experiments or phased rollouts.

---

## Multi-Workspace Considerations

When campaigns or Canvases must be replicated across workspaces (e.g., regional brands, staging → production):

- Campaigns and Canvases are copied as **drafts**—review and launch required after copy
- Not all channel types support cross-workspace copy; verify before designing workflows that depend on it
- Connected Content, Liquid, and event properties do not transfer automatically

Consult `references/copying-across-workspaces.md` for the supported channel matrix and copy checklist.

---

## When to Apply This Skill

Apply this skill as the **first architectural pass** before any channel-specific implementation work. Use it to:

1. Map user requirements to channel capabilities
2. Identify which channels are in-scope and which are out
3. Design the Canvas orchestration topology
4. Select delivery type and timing strategy
5. Flag regulatory or partner-mediated constraints early (SMS, WhatsApp, KakaoTalk)

For deep implementation guidance within a specific channel, route to the corresponding channel-specific skill after completing the architectural pass.

---

## Reference Files

| File | Contents |
|------|---------|
| `references/message-building-by-channel-index.md` | Full channel selection matrix; composer constraints |
| `references/delivery-types.md` | Scheduled / Action-Based / API-Triggered capability comparison |
| `references/email-channel-index.md` | Email templates, drag-and-drop, HTML customization |
| `references/push-channel-index.md` | Mobile and web push; browser support matrix |
| `references/in-app-messages-channel-index.md` | In-app message types; display triggers |
| `references/content-cards-channel-index.md` | Feed and embedded card patterns |
| `references/banners-channel-index.md` | Banner placement and persistence |
| `references/sms-mms-rcs-channel-index.md` | SMS/MMS/RCS; carrier fallback; compliance |
| `references/whatsapp-channel-index.md` | WABA setup; template approval workflow |
| `references/webhooks-channel-index.md` | Webhook templates; authentication; retry |
| `references/line-channel-index.md` | LINE Flex Messages; APAC surface |
| `references/kakaotalk-channel-index.md` | KakaoTalk setup; partner requirements |
| `references/engagement-tools-index.md` | A/B testing; Feature Flags; analytics |
| `references/brazeai.md` | AI-powered send time, predictions, intelligent selection |
| `references/copying-across-workspaces.md` | Cross-workspace copy; supported channels; draft workflow |

`★ Insight ─────────────────────────────────────`
The channel taxonomy table deliberately mirrors the **urgency × richness** matrix rather than Braze's own nav structure—this gives Claude an architectural mental model for *why* channels differ, not just *what* they are. The reference index at the bottom acts as a routing table: Claude can jump to the specific channel file without holding all 15 topics in context simultaneously, preserving the progressive disclosure principle.
`─────────────────────────────────────────────────`
