---
name: strategist-banners
description: >-
  Banner placement strategy, migration from content cards, and engagement
  optimization.
metadata:
  role: braze-strategist
  topics:
    - banners-tutorial-displaying-banners
    - banners-placements
    - banners-migrating-from-content-cards
    - banners-faq
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
The `writing-skills` TDD methodology is designed for personal skills that enforce agent discipline. For plugin reference skills like this one — which synthesize documentation into a domain lens — the key goals shift: discoverability, topic synthesis, and a clear "when to use this" framing rather than pressure-testing agent compliance.
`─────────────────────────────────────────────────`

Here is the generated skill file content:

---

# Banner Strategy

## Overview

Banners are Braze's persistent, non-interruptive in-app content surface — designed for fixed placements in the UI rather than inbox-style feeds or modal interruptions. This skill covers how to implement, configure, and migrate to Banners with a focus on **visual engagement**: placing the right message in the right persistent location, and knowing when Banners outperform Content Cards.

Use this skill when:
- Deciding whether to migrate existing Content Card implementations to Banners
- Planning placement strategy for persistent promotional or navigational surfaces
- Implementing Banner rendering by placement ID on Web, iOS, or Android
- Answering client questions about Banner behavior, persistence, or refresh logic

## Visual Engagement Lens

This skill is written from a **visual engagement perspective**: Banners succeed when they feel native to the page layout rather than interruptive. Placement ID is the architectural primitive — the bridge between the Braze dashboard and a specific UI slot in your app. Good banner strategy starts with mapping your high-value surfaces (heroes, nav bars, checkout flows) to named placement IDs, then designing campaigns around those fixed slots.

## Topics Synthesized

### Displaying Banners by Placement ID

Banners are requested at render time using a placement ID configured in the Braze dashboard. Each platform fetches and renders differently:

- **Web**: Request the banner via the SDK using the placement ID; the SDK handles fetching and caching
- **iOS / Android**: Native SDK methods accept a placement ID and return the active Banner for that slot
- Banners are fetched on session start and cached — they render without a network call at display time
- If no active Banner exists for a placement, the slot renders nothing (graceful empty state)

**Key implementation pattern:** Placement IDs are stable string identifiers. Treat them as named UI contracts — the ID defines *where*, the campaign defines *what*.

### Banner Placements

A Banner placement is a named slot registered in the Braze dashboard that maps to a specific location in your app's UI. Placements are:
- Defined once and reused across multiple campaigns
- Platform-agnostic (same placement ID works across Web, iOS, Android)
- The unit of targeting: campaigns are assigned to placements, not injected ad hoc

**Strategist guidance:** Audit your highest-visibility persistent surfaces before creating placements. Homepage hero, category page header, checkout upsell, and persistent nav bar are common high-value candidates. Naming conventions matter — use surface-descriptive IDs (`homepage-hero`, `checkout-offer`) rather than campaign-descriptive ones (`summer-sale-banner`).

### Migrating from Content Cards to Banners

Banners are the preferred replacement for Content Cards used as persistent, embedded UI elements rather than as an inbox feed.

**Migrate when Content Cards are used for:**
- Homepage heroes or product page promotions
- Checkout or cart upsell offers
- Persistent navigation banners or announcement bars
- Any surface where the card is always visible (not scrollable inbox)

**Keep Content Cards when:**
- The use case is an inbox, feed, or notification center
- Users need to dismiss or archive messages
- Order/recency of messages matters to the UX

**Migration checklist:**
1. Identify Content Card placements that are always-visible, not feed-style
2. Create matching Banner placement IDs for each surface
3. Recreate campaigns in the Banners composer
4. Remove Content Card rendering code; add placement ID–based Banner requests
5. Validate empty states (no active Banner = slot is hidden, not broken)

### Banners FAQ

| Question | Answer |
|---|---|
| Are Banners interruptive? | No — they render in a fixed slot, never as overlays or modals |
| When do Banners refresh? | On session start; cached until next session |
| Can a placement show multiple Banners? | No — one active Banner per placement at a time |
| What happens with no active campaign? | The slot renders empty; no fallback content shown |
| Do Banners support click tracking? | Yes — standard Braze impression and click analytics apply |
| Are Banners personalized? | Yes — Liquid templating and Connected Content work in Banner campaigns |

## Quick Reference

```
Surface is always-visible, embedded in layout  →  Use Banners
Surface is a scrollable feed or inbox          →  Use Content Cards
Need to interrupt the user (modal/sheet)       →  Use In-App Messages

Banner slot is empty                           →  No active campaign for that placement
Banner not rendering                           →  Verify placement ID matches dashboard exactly
```

## Common Mistakes

- **Using campaign names as placement IDs** — Placement IDs should describe the UI slot, not the promotion. Campaigns rotate through a slot; the slot is permanent.
- **Expecting real-time refresh** — Banners cache on session start. Time-sensitive offers (flash sales) need session refresh logic or may be better served by In-App Messages.
- **Migrating Content Card feeds to Banners** — Only migrate non-feed, always-visible card usage. Feed/inbox patterns belong in Content Cards.
- **Not handling empty states** — If no Banner is active, the placement renders nothing. UI layouts must account for the slot being absent.

`★ Insight ─────────────────────────────────────`
The placement ID pattern is a clean example of the "named UI contract" pattern — the SDK decouples *where to render* (placement ID, owned by engineering) from *what to render* (campaign, owned by marketing). This separation lets marketers iterate on content without code deploys. The migration guidance from Content Cards to Banners maps directly to this: Content Cards conflated feed-style inbox UX with embedded placement UX, and Banners formalize the latter as a first-class primitive.
`─────────────────────────────────────────────────`
