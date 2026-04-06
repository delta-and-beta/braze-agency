---
name: strategist-channel-strategy
description: >-
  Advises on channel partner selection, multi-channel orchestration, and CRM
  integration strategy for customer engagement.
metadata:
  role: braze-strategist
  topics:
    - additional-channels-and-extensions-additional-channels
    - additional-channels-and-extensions-extensions
    - additional-channels-support
    - additional-channels-instant-chat
    - additional-channels-direct-mail
    - additional-channels-advertising
    - additional-channels-mobile-wallet
    - data-and-analytics-customer-relationship-management
    - customer-relationship-management-actionableme
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
Nick's pipeline synthesizes multiple sparse topic sources into a unified skill body. When individual topics have minimal source docs (as most do here), the skill body itself becomes the primary knowledge surface — making the framing and lens description especially important for grounding Claude's reasoning. The skill body essentially acts as a "meta-document" that compensates for thin topic coverage by encoding the strategic perspective directly.
`─────────────────────────────────────────────────`

Here is the generated skill body:

---

# Multi-Channel Engagement Strategy

Apply this skill when advising on channel partner selection, multi-channel orchestration, or CRM integration strategy for customer engagement programs in Braze. Use this perspective when evaluating channel mix tradeoffs, mapping customer journey touchpoints across delivery surfaces, or assessing the capability fit of partner integrations.

## Lens: Channel Mix Optimization, Journey Touchpoints, and Partner Capability Evaluation

Approach every channel decision through three interlocking questions:

1. **Does this channel reach the right customer at the right moment?** — Channel selection is a journey design problem. Map each channel to the lifecycle stage where it delivers the highest contextual relevance.
2. **Does the channel mix work together, or just in parallel?** — Orchestration across channels requires coordination logic (send-time suppression, channel fallback, cross-channel frequency caps). A channel that fires independently without awareness of others creates noise.
3. **Does the partner or integration capability match the program requirement?** — Partner maturity, data flow fidelity, and latency characteristics determine whether a technical integration can support the campaign model being designed.

---

## Scope

This skill synthesizes knowledge across the following topic areas:

| Topic | Coverage |
|---|---|
| Support Channels | Channels used for post-purchase or service-oriented engagement |
| Mobile Wallet | Passes, loyalty cards, and wallet-native notification surfaces |
| Instant Chat | Real-time conversational engagement surfaces (in-app, live chat) |
| Direct Mail | Physical mail as a high-attention, low-frequency channel |
| Advertising | Paid media and retargeting channels coordinated with CRM data |
| Additional Channels & Extensions | Non-standard or emerging delivery surfaces beyond core channels |
| Extensions | Extensibility mechanisms for custom channel delivery |
| CRM Partners | Third-party CRM platforms integrated with Braze data and events |
| ActionableMe CRM Integration | Standardized CRM program execution via the actionable.me platform |

---

## Channel Category Guidance

### Support Channels

Use support channels for reactive, event-driven engagement triggered by customer actions or service states (ticket open, resolution, follow-up). Prioritize low-friction surfaces (in-app, SMS, email) where the customer has already established a service relationship. Avoid promotional messaging within support flows — the customer's intent is resolution, not conversion.

### Mobile Wallet

Mobile wallet passes (Apple Wallet, Google Wallet) are persistent, low-intrusion surfaces suited for loyalty state, offers, and time-bound value delivery. Wallet push notifications bypass app install dependency and reach opted-in customers directly on the lock screen. Use wallet channels for durable engagement artifacts (loyalty cards, event tickets, coupons) rather than transient messages.

### Instant Chat

Instant chat surfaces support high-context, conversational engagement where the customer expects a real-time or near-real-time response. Coordinate chat with CRM event data to personalize the conversational context (e.g., surface order status, loyalty tier, or relevant product history). Avoid overloading chat with automated outbound — use it for inbound-triggered or support-adjacent flows where the customer has signaled intent.

### Direct Mail

Direct mail carries high attention cost and low frequency ceiling. Reserve it for high-value customer segments, reactivation programs, or campaigns where digital channel saturation makes physical outreach a differentiated signal. Coordinate suppression logic with digital channels to avoid simultaneous multi-channel pressure on the same customer. Lead time requirements (print, fulfillment) require earlier trigger windows than digital channels.

### Advertising Channels

Advertising channels extend CRM reach into paid media — retargeting lapsed users, suppressing active customers from acquisition spend, or building lookalike audiences from high-LTV segments. Coordinate CRM segment exports with ad platform sync cadence to maintain audience freshness. Align ad channel exposure with email/push cadence to reinforce messaging without creating fatigue across surfaces.

### Additional Channels and Extensions

Non-standard delivery surfaces (webhooks, custom integrations, third-party APIs) enable channel delivery beyond Braze's native set. Evaluate these for niche use cases: delivery to proprietary platforms, enterprise communication tools (Slack, Teams), or regional messaging networks. Extensions require stronger technical validation — assess latency, delivery confirmation, and error handling before committing to them in critical journey paths.

### CRM Partners

CRM partners bring structured program management, data enrichment, or campaign automation capabilities that complement Braze's orchestration layer. Evaluate partners on:

- **Data flow**: Does the partner consume and produce events that map cleanly to Braze's data model?
- **Latency**: Can the partner respond to real-time triggers, or is it batch-oriented?
- **Program fit**: Does the partner's methodology align with the campaign model (always-on CRM vs. campaign bursts)?

---

## CRM Integration: ActionableMe

ActionableMe, built by Massive Rocket, provides a standardized, automated approach to CRM program execution. It is designed to reduce the operational overhead of running structured CRM programs by providing templated workflows and data orchestration patterns.

When evaluating ActionableMe as a CRM partner:

- **Use it** when the program requires a repeatable, methodology-driven CRM framework rather than bespoke campaign builds
- **Integrate it** where CRM program logic needs to be abstracted away from campaign-specific configuration, enabling faster program setup and consistent execution
- **Assess data connectivity** between ActionableMe's program state and Braze's user and event model — consistent attribute and event naming conventions are critical for reliable orchestration

---

## Multi-Channel Orchestration Principles

When designing cross-channel programs, apply these orchestration principles:

**Prioritize, don't spray.** Define a channel hierarchy for each journey step. If email is primary, push is the fallback for non-openers, and SMS is reserved for time-sensitive confirmation — state that hierarchy explicitly in the campaign logic.

**Suppress before sending.** Cross-channel frequency management prevents over-messaging. Implement global frequency caps and recency suppression across channels before layering in channel-specific rules.

**Unify the event model.** Reliable multi-channel orchestration depends on a consistent event stream. Audit that conversion events, engagement signals, and suppression triggers are captured and attributed consistently regardless of which channel generated them.

**Match channel to intent signal.** A customer who clicks a loyalty email is expressing purchase intent — follow up on a high-conversion surface (push, in-app). A customer who opens a support ticket is in resolution mode — do not cross-sell on the same surface until the service event is resolved.

---

## When to Apply This Skill

Invoke this skill when:

- Evaluating which channels to include in a new CRM program or lifecycle journey
- Assessing the capability fit of a CRM partner or channel integration
- Designing suppression, fallback, or orchestration logic across multiple delivery surfaces
- Advising on how to coordinate paid media (advertising channels) with owned channel programs
- Reviewing a multi-channel campaign architecture for journey coherence and frequency logic
- Integrating a third-party CRM platform (such as ActionableMe) with Braze event and user data

---

`★ Insight ─────────────────────────────────────`
The generated body intentionally front-loads the "lens" framing before the topic inventory — this mirrors how a skilled human consultant would orient a client: establish the evaluative perspective first, then surface the specific knowledge areas. For Claude, this ordering means the reasoning framework is in context before the topic details, which improves how the skill guides synthesis across sparse topic inputs.
`─────────────────────────────────────────────────`
