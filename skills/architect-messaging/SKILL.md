---
name: architect-messaging
description: Designing messaging fundamentals and template/media management architecture.
metadata:
  role: braze-architect
  topics:
    - engagement-tools-messaging-fundamentals
    - engagement-tools-templates-and-media
    - developer-guide-in-app-messages
    - in-app-messages-triggering-messages
    - in-app-messages-deep-linking
    - in-app-messages-html-messages
    - content-cards-creating-cards
    - content-cards-deep-linking
    - content-cards-content-card-inbox
    - banners-placements
    - banners-migrating-from-content-cards
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- The `writing-skills` skill is designed for creating personal process/discipline skills with TDD testing. This request is different — it's generating **domain knowledge content** for a plugin skill file, where the "test" is whether Claude can find and apply the right architecture guidance, not discipline enforcement.
- Plugin skill files act as knowledge synthesizers: they aggregate atomic topic references into a coherent lens that shapes how an agent reasons about a domain.
`─────────────────────────────────────────────────`

# Messaging Infrastructure

## Skill Scope

This skill covers the **foundational architecture of Braze's messaging delivery systems** — how messages are structured, stored, targeted, triggered, and rendered across channel types. Use this skill when designing or reviewing systems that involve:

- Campaign and Canvas message composition pipelines
- Asset management and content reuse strategies
- Audience targeting and segmentation at the infrastructure level
- In-app message delivery, rendering, and SDK interaction patterns
- Content Card and Banner channel selection and migration
- Deep linking from messages into native app flows

This skill does **not** cover analytics pipelines, A/B test instrumentation, or Connected Content integrations — those belong to separate data and personalization domains.

---

## Architect's Lens: Messaging Infrastructure Patterns

As a messaging infrastructure architect, evaluate Braze implementations through two primary concerns:

1. **Content Management Architecture** — How assets, templates, and reusable components are organized, cached, and governed at scale
2. **Delivery Channel Selection** — The structural trade-offs between IAM, Content Cards, Banners, and HTML, and how channel choice affects SDK behavior, caching, and lifecycle

---

## Asset and Template Management

### Media Library as a First-Class Infrastructure Component

The Media Library (`Templates > Media Library`) is Braze's centralized asset store. Architecturally, it is not merely a convenience — it is the mechanism that enables **pre-caching of in-app message assets** at SDK initialization time.

**Key architectural implication:** Assets referenced via the Media Library can be pre-fetched before a user session, reducing perceived latency for in-app messages. Assets pulled from an external CDN at render time cannot benefit from this optimization.

**Design guidance:**
- Route all in-app message visual assets through the Media Library, not external CDNs, when render-time latency is a concern
- Treat the Media Library as a governed content layer — apply naming conventions and ownership policies to prevent sprawl across teams
- For multi-brand or multi-locale deployments, establish a folder hierarchy that mirrors your campaign taxonomy

---

## Audience Targeting Architecture

### Four Targeting Modes

When architecting campaign pipelines, targeting strategy determines both personalization depth and infrastructure complexity:

| Method | Infrastructure Pattern | Trade-off |
|---|---|---|
| **Single segment** | Reusable segment definition; evaluated at send time | Simplest; segment must be pre-built |
| **Multiple segments** | Boolean logic across segment store | Flexible; risk of segment drift |
| **Attribute filters** | Inline predicate evaluation at send time | No segment maintenance; higher query cost |
| **CSV upload** | One-time user list; bypasses segment store | Surgical targeting; not reusable |

**Architectural guidance:** Prefer named segments for recurring audience patterns — they are maintainable, auditable, and can be reused across campaigns and Canvases. Reserve attribute filters for one-off or experimental targeting where segment creation overhead is unjustified.

---

## In-App Message Infrastructure

### Delivery Model

In-app messages are **session-triggered, SDK-rendered** — they are fetched and cached by the SDK at session start, then displayed when trigger conditions are met. This is a fundamentally different delivery model from push or email, with distinct infrastructure implications:

- Messages are evaluated client-side against trigger conditions (event-based, session start, API trigger)
- Assets pre-cached via Media Library are available offline or in low-connectivity conditions
- HTML in-app messages bypass the SDK's standard rendering pipeline, requiring explicit security review

### Triggering Architecture

Triggers define the **conditions under which a cached message surfaces**. From an infrastructure standpoint, trigger design affects:

- **Event volume** — Action-based triggers fire on every matching event; high-frequency events can cause message fatigue or race conditions in Canvas flows
- **Re-eligibility windows** — Controls how frequently a given user can re-enter the IAM trigger cycle; a misconfigured window is a common source of unexpected repeat impressions
- **API-triggered delivery** — Decouples campaign execution from the Braze UI scheduling model; required for transactional or real-time messaging patterns

### HTML In-App Messages

Custom HTML messages provide full rendering control but introduce a separate infrastructure concern: **the JavaScript bridge to the Braze SDK**. Custom HTML messages can invoke `brazeBridge` methods for logging events, setting attributes, or closing the message — these calls must be explicitly designed and tested, not treated as incidental.

**Design guidance:**
- Treat HTML IAMs as a lightweight embedded web application, not a styled HTML email
- Establish a shared `brazeBridge` call library for teams authoring custom HTML to prevent fragmented implementations
- Custom HTML requires explicit allowlisting in SDK configuration — verify this is in place before deploying

### Deep Linking from In-App Messages

Deep link handling in IAMs is **platform-delegated**: the Braze SDK passes the URI to the host application's registered deep link handler. There is no universal Braze-side routing — the infrastructure must exist in the native app.

**Architectural requirement:** Before implementing IAM deep links, confirm the target app has a registered URI scheme or universal link domain and a routing handler that covers all intended destinations.

---

## Content Cards and Banners

### Channel Selection Framework

Content Cards and Banners serve overlapping use cases but have different infrastructure models:

| Dimension | Content Cards | Banners |
|---|---|---|
| **Persistence** | Feed-based; cards accumulate until dismissed or expired | Placement-based; one active card per placement slot |
| **Rendering** | SDK-provided feed UI or custom inbox implementation | Fully custom; no SDK-provided UI |
| **Deep linking** | Platform-dependent (Web not supported) | Not covered by this skill |
| **Migration path** | Can migrate to Banners | — |

### When to Migrate from Content Cards to Banners

Banners are the appropriate architecture when Content Cards are being used for **placement-anchored, non-feed content**: homepage heroes, checkout promotions, persistent navigation callouts. These patterns fight the Content Card feed model rather than leveraging it.

**Migration signal:** If your Content Card implementation involves custom UI that renders only one card in a fixed location, you are effectively building a Banner manually. Migrate to the Banner channel to align the infrastructure with intent.

**Migration is additive, not destructive** — existing Content Card campaigns continue functioning; Banner placements are configured independently.

### Custom Content Card Inbox

Building a custom message inbox with Content Cards requires platform-specific implementation work:

- **Android (Jetpack Compose):** `LazyColumn`-based implementation consuming the Content Card feed
- **Android (View system):** `RecyclerView` with a custom adapter
- **iOS/Web:** Equivalent native patterns

**Architectural note:** Custom inboxes take full ownership of feed rendering, read/unread state management, and dismissal handling. The SDK provides the data layer; the app provides all UI logic. Design the data-to-UI contract explicitly before implementation to avoid reimplementation cycles.

---

## Decision Guide: Which Channel for Persistent Messaging?

```
Is the message feed-oriented (accumulates over time)?
├── YES → Content Cards
│         └── Need custom placement UI with one card shown?
│             └── YES → Migrate to Banners
└── NO  → Is it a fixed, persistent UI placement?
          ├── YES → Banners
          └── NO  → Consider IAM (session-scoped) or push
```

---

## Common Architectural Mistakes

| Mistake | Consequence | Guidance |
|---|---|---|
| Using external CDN URLs in IAMs | Assets load at render time; no pre-cache benefit | Use Media Library for IAM assets |
| High-frequency event as IAM trigger | Over-impression, user fatigue, Canvas race conditions | Use session start or deliberate user action as trigger |
| HTML IAM without `brazeBridge` plan | Analytics gaps, uncontrolled message lifecycle | Design bridge calls as part of message spec |
| Content Cards for single-slot placements | Manual workaround of feed model | Use Banners |
| Deep links without app-side routing | Silent failures on tap | Verify routing handler before campaign launch |
