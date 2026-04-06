---
name: architect-audience-sync
description: >-
  Cross-platform audience synchronization design across advertising platforms
  including Facebook, Google, TikTok, LinkedIn, and programmatic networks.
metadata:
  role: braze-architect
  topics:
    - partners-canvas-audience-sync
    - partners-audience-sync-overview
    - partners-audience-sync-facebook
    - partners-audience-sync-google
    - partners-audience-sync-tiktok
    - partners-audience-sync-snapchat
    - partners-audience-sync-pinterest
    - partners-audience-sync-linkedin
    - partners-audience-sync-trade-desk
    - partners-audience-sync-criteo
    - partners-audience-sync-faq
    - canvas-components-audience-sync
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
**Nick's two-layer content hierarchy** means this generated SKILL.md acts as the synthesis layer — it references atomic topic files (the `references/` subdirectory) rather than embedding all their detail. The skill file itself should be lean and directive, leaving raw platform docs in the topic files for on-demand loading.
`─────────────────────────────────────────────────`

Here is the generated skill body:

---

# Audience Sync Architecture

## Scope and Purpose

This skill guides the design and implementation of **Braze Audience Sync** integrations — the Canvas-native mechanism for pushing first-party user segments from Braze directly into advertising platform audiences. Use this skill when architecting how behavioral CRM data flows from Braze into paid media channels: Facebook Custom Audiences, Google Customer Match, TikTok Audiences, LinkedIn Matched Audiences, Snapchat Customer Lists, Pinterest Audiences, Criteo segments, and The Trade Desk's programmatic network.

The architectural lens is **data flow design**: how user identity maps across platforms, how Canvas orchestration controls sync timing and membership, how to handle consent requirements and data residency constraints, and how to avoid common integration pitfalls that cause audience drift or compliance exposure.

---

## When to Apply This Skill

Apply this skill when:

- Designing a retargeting architecture that coordinates Braze journey state with paid media spend
- Selecting which advertising platforms to sync to for a given audience strategy
- Architecting consent and suppression flows (EU/EEA compliance, CCPA opt-outs)
- Debugging audience population delays or identity-match rate problems
- Planning multi-platform audience orchestration through a single Canvas

---

## Core Concepts

### Audience Sync as a Canvas Step

Audience Sync is a **Canvas component**, not a standalone broadcast tool. It executes within user journey logic — sync decisions are made per-user as they traverse a Canvas, which means:

- Sync is conditional on journey state (eligibility checks, filter criteria upstream in the Canvas)
- Users can be added to or removed from ad audiences based on branch outcomes
- Sync operates at the individual user level, not bulk export

The Canvas Audience Sync step fires after a user enters that step in the flow. This has latency implications: audience population on the ad platform side can take minutes to hours depending on the platform's ingestion pipeline.

### Identity Matching Architecture

Each platform uses a different primary identity for matching. Design data collection and normalization to support the matching identifiers required by target platforms:

| Platform | Primary Match Keys |
|---|---|
| Facebook | Email, phone, mobile device ID (IDFA/GAID), Facebook UID |
| Google | Email, phone, mobile device ID |
| TikTok | Email, phone, mobile device ID |
| LinkedIn | Email, LinkedIn profile ID |
| Snapchat | Email, phone, mobile device ID |
| Pinterest | Email, mobile device ID |
| Criteo | Email, mobile device ID |
| The Trade Desk | Email, phone, UID2 |

**Design principle**: Collect and store hashed email and phone at the profile level in Braze. These are the highest-coverage match keys across all platforms. Hash normalization (lowercase → SHA-256) happens inside Braze before transmission — store the plaintext, let Braze handle hashing at sync time.

### Platform OAuth Integration Pattern

All Audience Sync destinations use OAuth-based authorization. The integration pattern is:

1. Admin connects the ad account in the Braze dashboard (Technology Partners)
2. Braze stores the OAuth token and refreshes it automatically
3. Canvas Audience Sync steps reference the connected account
4. Braze manages audience membership (add/remove calls) against the platform API

**Architectural implication**: A single broken OAuth credential blocks all Canvas steps using that account. Build monitoring and alerts around token health. Reconnection requires admin action in the dashboard — it cannot be automated from the Canvas side.

---

## Platform-Specific Architecture Notes

### Facebook

Facebook Audience Sync supports Custom Audiences via the Marketing API. Key design decisions:

- **Lookalike seeding**: Synced audiences can seed Facebook Lookalikes — design high-quality seed segments (high LTV customers, recent converters) as dedicated Canvas paths
- **Suppression audiences**: Use Audience Sync to maintain suppression lists (existing customers excluded from acquisition campaigns) — these require continuous membership updates as users convert
- **Data residency**: EU users require Facebook's EU Data Transfer controls enabled on the account before syncing

### Google

Google Audience Sync maps to Google Customer Match. Architectural notes:

- **EU User Consent Policy (2024)**: Syncing EU/EEA users requires confirmed consent signals. The integration requires Google's consent mode signals to be present — design a consent collection flow upstream in Canvas
- **Account eligibility**: Google Customer Match requires a minimum ad spend threshold on the Google Ads account. Validate eligibility before building dependent Canvas flows
- **Match rate expectations**: Email-based matching on Google typically achieves 40–60% match rates for consumer audiences

### TikTok

TikTok Audience Sync uses the TikTok Audiences API. Key considerations:

- **Minimum audience size**: TikTok enforces a minimum of 1,000 matched users before an audience becomes targetable — design seeding logic for initial population
- **Mobile-first identity**: TikTok match rates are highest when IDFA/GAID is available — prioritize mobile app users for TikTok sync paths

### LinkedIn

LinkedIn Audience Sync maps to LinkedIn Matched Audiences. Architectural notes:

- **B2B use case fit**: LinkedIn sync is most effective for professional attributes (job title, company, industry) — segment upstream in Canvas on professional profile data before syncing
- **Minimum size enforcement**: LinkedIn requires 300 matched members before activation — factor this into audience sizing during Canvas design
- **Email match only**: LinkedIn does not match on device IDs; email is the sole match key — ensure email capture is a prerequisite in the user journey

### The Trade Desk

The Trade Desk Audience Sync feeds programmatic DSP targeting. Architectural notes:

- **UID2 support**: The Trade Desk uses Unified ID 2.0 (UID2) as its primary privacy-preserving identity — integrate UID2 resolution if available to maximize match rates
- **Programmatic reach extension**: TTD sync extends CRM retargeting beyond social platforms into display, CTV, and audio inventory
- **Segment freshness**: Programmatic campaigns are sensitive to audience staleness; design Canvas re-entry or refresh logic to keep segments current

### Snapchat, Pinterest, Criteo

These platforms follow the same OAuth + customer list pattern. Key notes:

- **Snapchat**: Strongest match on phone number for mobile-heavy consumer audiences
- **Pinterest**: Visual commerce use case — sync purchasers and high-intent browsers for retargeting in shopping contexts
- **Criteo**: Commerce-media network — sync lapsed purchasers and cart abandoners for product retargeting

---

## Consent and Compliance Architecture

Design consent controls as upstream Canvas gates, not post-sync filters:

1. **Opt-out suppression branch**: Before any Audience Sync step, add a Canvas filter checking the user's ad tracking consent attribute. Route opted-out users to an exit path that explicitly removes them from synced audiences
2. **EU/EEA handling**: Implement separate Canvas variants for EU users that either skip Audience Sync steps or route to platforms with confirmed EU data transfer mechanisms
3. **CCPA**: California "Do Not Sell" signals must be honored — maintain a Braze custom attribute for CCPA opt-out status and filter on it upstream

**Removal architecture**: Audience Sync supports both add and remove operations. Build explicit removal logic into Canvas for: opt-outs, post-conversion suppression, and audience refresh cycles.

---

## Operational Architecture

### Latency Model

Audience population follows a two-phase latency model:

1. **Braze transmission latency**: Braze processes the sync call within minutes of Canvas step execution
2. **Platform ingestion latency**: Each platform's audience pipeline adds additional delay — typically 1–6 hours for Facebook/Google, potentially longer for smaller platforms

Design campaign activation timing to account for this pipeline. Do not schedule ad campaigns to launch immediately after Canvas audience population — build in a buffer.

### Audience Membership Lifecycle

Model audience membership as a stateful lifecycle, not a one-time export:

- **Add on entry**: User enters Canvas → qualifies for sync step → added to ad platform audience
- **Remove on exit or disqualification**: User converts, opts out, or falls out of segment → Canvas exit step removes them from audience
- **Refresh on re-entry**: Canvas re-entry logic keeps audience membership current as user behavior changes

### Error Handling

Platform API failures silently drop sync operations by default. Build observability into the architecture:

- Monitor Canvas step-level error rates in Braze analytics
- Set up alerts on OAuth token expiration (platforms typically expire tokens after 60–90 days)
- Design Canvas fallback paths for users whose sync fails (e.g., email retargeting as fallback channel)

---

## Topics Synthesized by This Skill

This skill draws from the following reference topics:

- `audience_sync` — Canvas Audience Sync step mechanics
- `canvas_audience_sync_overview` — Feature overview and getting started
- `audience_sync_getting_started` — Initial configuration and account connection
- `facebook_audience_sync` — Facebook Custom Audiences integration
- `google_audience_sync` — Google Customer Match, EU consent requirements
- `tiktok_audience_sync` — TikTok Audiences API
- `linkedin_audience_sync` — LinkedIn Matched Audiences
- `snapchat_audience_sync` — Snapchat customer lists
- `pinterest_audience_sync` — Pinterest Audiences
- `criteo_audience_sync` — Criteo segment sync
- `trade_desk_audience_sync` — The Trade Desk programmatic integration
- `audience_sync_faq` — Timing, troubleshooting, and platform-specific edge cases

---

`★ Insight ─────────────────────────────────────`
**Platform identity heterogeneity** is the central design constraint in audience sync architecture — each destination uses a different primary key (email, phone, device ID, UID2). The skill surfaces this as a data collection imperative: store plaintext email/phone at the Braze profile level and let Braze handle hashing, rather than pre-hashing at the source which would break cross-platform compatibility. **Canvas as control plane** is the other key pattern: sync decisions live inside journey logic, not in batch exports, which means timing, consent gating, and membership removal all flow through the same Canvas orchestration layer.
`─────────────────────────────────────────────────`
