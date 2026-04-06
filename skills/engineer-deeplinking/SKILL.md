---
name: engineer-deeplinking
description: >-
  Technical configuration of deep linking and mobile attribution partner SDKs
  for cross-platform user routing.
metadata:
  role: braze-engineer
  topics:
    - message-orchestration-deeplinking
    - deeplinking-vizbee-for-tv-deeplinking
    - deeplinking-kochava
    - deeplinking-branch-for-deeplinking
    - deeplinking-appsflyer
    - deeplinking-appsflyer-appsflyer
    - attribution-appsflyer
    - attribution-branch-for-attribution
    - attribution-kochava
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
A skill file in the Nick plugin architecture serves as a semantic routing target — the language and structure you use here directly affects which queries get routed to this skill via `skill_index.json`. Using concrete partner names (Branch, Kochava, AppsFlyer) as headings and keywords ensures the vector embeddings capture those as first-class retrieval signals.
`─────────────────────────────────────────────────`

Here is the skill file body:

---

# Deep Linking & Attribution Engineering

## Overview

This skill covers the technical configuration of deep linking and mobile attribution partner integrations within Braze campaigns. It focuses on the **SDK integration layer**: how to wire up URI schemes, configure partner SDKs, and establish attribution callback pipelines so that clicks on Braze messages route users to the correct in-app destination and feed install/re-engagement data back to your attribution partner.

**Core principle:** Deep linking and attribution are distinct but tightly coupled concerns — deep linking routes the user, attribution records *why* they arrived. Configure them independently but verify them together.

---

## When to Use This Skill

Use this skill when working on any of the following:

- Configuring a **Branch**, **AppsFlyer**, or **Kochava** integration with Braze for deep linking or attribution
- Setting up **URI schemes** or **Universal Links / App Links** to route Braze message clicks into specific app screens
- Registering **attribution callbacks** or postback URLs so that partner SDKs report installs and re-engagements back to Braze
- Debugging broken deep links from push, email, or in-app messages
- Integrating **Vizbee** for cross-device (smartphone → smart TV) deep link routing
- Auditing whether attribution data is flowing correctly from a partner into Braze user profiles
- Choosing between partners (Branch vs. AppsFlyer vs. Kochava) for a new integration

**Not this skill:** Canvas or campaign logic that *uses* deep link data after it arrives (e.g., segmenting on attribution source). That falls under campaign orchestration.

---

## Partner Coverage

### Deep Linking Partners

| Partner | Primary Use Case | Key Config Surface |
|---------|-----------------|-------------------|
| **Branch** | Mobile deep linking + deferred deep links | Branch dashboard link settings, Braze SDK `setBrazeDeepLinkingEnabled`, URI scheme registration |
| **AppsFlyer** | Deep linking with attribution overlap | OneLink setup, Android/iOS scheme configuration, Braze middleware |
| **Kochava** | Deep linking within Kochava attribution flows | Kochava SDK init, deep link delegate methods |
| **Vizbee** | Cross-device TV deep linking from mobile | Vizbee SDK integration, existing Braze deep link scheme reuse |

### Attribution Partners

| Partner | Attribution Signals | Braze Integration Point |
|---------|---------------------|------------------------|
| **Branch** | Install, re-engagement, referral | Branch → Braze data import; `logPurchase` / custom event forwarding |
| **AppsFlyer** | Install attribution, in-app events, LTV | AppsFlyer postback → Braze REST API; SDK-level user attribute sync |
| **Kochava** | Install + post-install attribution, audience targeting | Kochava Audience Platform → Braze segment push; postback configuration |

---

## Engineering Lens

This skill approaches deep linking and attribution from three angles:

### 1. SDK Integration
- Initializing partner SDKs (Branch, AppsFlyer, Kochava, Vizbee) alongside the Braze SDK without lifecycle conflicts
- Ordering SDK initialization correctly in `AppDelegate` / `Application.onCreate`
- Passing deep link handling to the correct SDK delegate/listener without double-handling

### 2. URI Scheme & Universal Link Configuration
- Registering custom URI schemes (`myapp://`) and Universal Links / App Links (HTTPS-based) in app entitlements and manifests
- Configuring Braze to pass link clicks through to the partner SDK (rather than handling them natively)
- Handling deferred deep links — links that must survive an App Store install before resolving

### 3. Attribution Callback Setup
- Configuring postback/callback URLs in partner dashboards so attribution events reach Braze
- Mapping partner attribution fields (campaign name, ad group, channel) to Braze custom attributes
- Validating that attribution data appears on user profiles before using it in segmentation

---

## Topics Synthesized

This skill draws on the following reference topics:

- **Vizbee TV Deep Linking Partner** — cross-device deep link routing from smartphones to smart TVs using existing app URI schemes
- **Branch Deep Linking Partner** — Branch SDK setup for Braze-triggered deep links, deferred deep link handling
- **AppsFlyer Deep Linking Partner / Detail** — AppsFlyer OneLink configuration, Android/iOS deep link delegates, Braze middleware wiring
- **Kochava Deep Linking Partner** — Kochava SDK deep link delegate integration
- **Branch Attribution Partner** — Branch → Braze attribution data pipeline, postback setup
- **AppsFlyer Attribution Partner** — AppsFlyer install attribution callbacks, Braze user attribute mapping
- **Kochava Attribution Partner** — Kochava Audience Platform, postback URL configuration, Braze segment sync
- **Deep Linking Orchestration Overview** — how the above partners fit together in a multi-SDK environment

---

## Quick Reference

```
Braze message click
        │
        ▼
  Partner SDK (Branch / AppsFlyer / Kochava)
        │  ← URI scheme / Universal Link resolution
        ▼
  App route / screen
        │
  Attribution callback ──► Partner dashboard ──► Braze postback
                                                       │
                                               Braze user profile
                                            (custom attribute update)
```

**Common configuration files:**
- iOS: `Info.plist` (URI schemes), `.entitlements` (Associated Domains)
- Android: `AndroidManifest.xml` (`<intent-filter>` with `android:scheme`)
- Braze dashboard: Partner integration settings under **Technology Partners**

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Both Braze SDK and partner SDK try to handle the same deep link | Set `brazeHandlesDeepLinks = false` (or equivalent) in Braze config; let partner SDK own routing |
| Deferred deep links never fire after install | Confirm partner SDK `initSession` is called in `applicationDidBecomeActive` / `onResume`, not just `didFinishLaunchingWithOptions` |
| Attribution attributes missing on Braze user profiles | Verify postback URL in partner dashboard points to Braze REST endpoint with correct API key |
| Universal Links fall back to browser on cold start | Associated Domains entitlement must match the partner's AASA file domain exactly |
| Kochava / AppsFlyer SDK init order conflicts with Braze | Initialize attribution SDK first, Braze SDK second; pass attribution result to Braze after callback fires |

---

`★ Insight ─────────────────────────────────────`
The "Quick Reference" ASCII routing diagram doubles as a mental model *and* a search target — when a Braze engineer asks "where does attribution data go after a click?", that diagram's vocabulary (`postback`, `callback`, `user profile`) will match the query even if the exact phrasing differs. Concrete partner names in table cells (rather than generic "SDK") make the skill more retrievable via semantic search.
`─────────────────────────────────────────────────`
