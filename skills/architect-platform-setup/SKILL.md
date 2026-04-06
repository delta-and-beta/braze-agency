---
name: architect-platform-setup
description: >-
  Workspace configuration, SDK integration overview, and initial platform
  onboarding including Braze Pilot program guidance.
metadata:
  role: braze-architect
  topics:
    - get-started-workspaces
    - get-started-sdk-overview
    - get-started-integrations
    - get-started-terms-to-know
    - get-started-campaigns-and-canvases
    - get-started-braze-pilot
    - get-started-braze-pilot-getting-started
    - get-started-braze-pilot-deep-links
    - get-started-braze-pilot-data-dictionary
    - get-started-users-and-segments
    - onboarding-faq
    - home
    - administrative
    - privacy-portal
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
Nick skill files are consumed by AI agents at runtime — so the writing style matters architecturally. Imperative form (`Configure X`, not `You should configure X`) is not just stylistic; it removes ambiguity about the agent vs. Claude as the subject, making instructions unambiguous when the skill is injected into context.
`─────────────────────────────────────────────────`

# Platform Setup & Onboarding

## Scope and Purpose

This skill covers the end-to-end process of configuring a Braze environment from first login through SDK integration readiness. It synthesizes workspace topology, administrative configuration, SDK integration pathways, the Braze Pilot sandbox program, and foundational platform concepts into a coherent onboarding posture.

Apply this skill when:
- Setting up a new Braze workspace or advising on workspace structure
- Guiding SDK integration decisions (which platform, which integration path)
- Helping teams use the Braze Pilot sandbox before connecting a live app
- Answering foundational questions about Braze concepts, user identity, or data architecture
- Configuring administrative settings, privacy controls, or team permissions

## Architect's Lens

Approach this domain from a **system-level** perspective: workspace topology shapes every downstream capability — segmentation, campaign orchestration, privacy compliance, and SDK surface area all depend on decisions made at setup time. Bootstrap correctly once; retrofitting workspace structure or user identity models is expensive.

---

## Core Concepts

### Workspaces

A **workspace** is the fundamental organizational unit in Braze. All data, segments, campaigns, and SDK keys are scoped to a workspace.

Key topology rules:
- Separate workspaces by app or brand when data isolation is required
- Use a single workspace with multiple apps when cross-app user profiles or shared segmentation matter
- Each workspace has its own API keys — validate that SDK integrations target the correct workspace key
- Test/staging environments should use a dedicated workspace, not a flag within production

### User Identity Architecture

Each user has a **user profile** — a central record of behavior, attributes, and demographics. Understand the identity model before writing a single SDK call:

| Identifier | Type | Notes |
|---|---|---|
| `braze_id` | Braze-assigned UUID | Auto-created on first anonymous contact |
| `external_id` | Developer-assigned | Set once per profile; use your internal user ID |
| User aliases | Alternate IDs | Useful before `external_id` is known (e.g., email capture flows) |

**Anonymous-to-known transition**: When the SDK first contacts Braze, it creates an anonymous profile with a `braze_id`. When the user logs in or is identified, call `changeUser()` with the `external_id` to merge the anonymous session into the known profile. Failing to do this creates duplicate profiles.

### Key Terminology

| Term | Meaning |
|---|---|
| **Workspace** | Isolated environment containing apps, users, and campaigns |
| **App Group** | Legacy term for workspace — treat as synonymous in older docs |
| **Canvas** | Multi-step customer journey builder |
| **Segment** | Dynamic or static user cohort based on filters |
| **Custom Event** | Developer-defined action tracked via SDK or API |
| **Custom Attribute** | Developer-defined user property |
| **Content Block** | Reusable content snippet for messages |
| **Connected Content** | Dynamic API-fetched content in messages |

---

## SDK Integration

### Integration Pathways

Choose integration path based on platform and hosting model:

| Platform | Primary Path | Notes |
|---|---|---|
| iOS | Swift SDK (native) | Preferred for full feature access |
| Android | Android SDK (native) | Full SDK feature set |
| Web | Braze Web SDK | CDN or npm; supports push, in-app, content cards |
| React Native | Braze React Native SDK | Wraps native SDKs |
| Flutter | Braze Flutter SDK | Community-maintained bindings |
| Server-side | REST API | For back-end event ingestion; no in-app messaging |

### What the SDK Does

The SDK handles four responsibilities automatically once initialized:
1. **Session tracking** — Start/end events, session length
2. **User identification** — Anonymous profile creation, `changeUser()` transitions
3. **Event and purchase recording** — `logCustomEvent()`, `logPurchase()`
4. **In-app message and push rendering** — Triggered by campaigns or Canvas steps

### Integration Checklist

Before going live:
- [ ] SDK initialized with correct workspace API key
- [ ] `changeUser()` called on authentication with stable `external_id`
- [ ] Push permission prompt implemented (iOS/Android)
- [ ] At least one custom event validated in the Braze dashboard
- [ ] Test device registered and verified in the dashboard
- [ ] Data flowing to correct workspace (not accidentally pointing at production from staging)

---

## Braze Pilot Sandbox

### What It Is

Braze Pilot is a pre-built mobile sandbox for testing Braze features without connecting a real app. It provides simulated app environments with pre-seeded event data and realistic user profiles.

Use Braze Pilot to:
- Validate campaign logic before SDK integration is complete
- Demonstrate Braze capabilities in a controlled environment
- Test Canvas flows, deep links, and in-app messages safely

### App Simulations

| Prefix | App Simulation |
|---|---|
| `mc_` | MovieCanon (streaming) |
| `fw_` | FitWave (fitness) |
| `hb_` | HomeBrew (e-commerce) |
| `tt_` | TravelTrek (travel) |

Each simulation emits a consistent set of custom events and attributes prefixed by its app code. Reference `references/braze-pilot-data-dictionary.md` for the full event/attribute catalog per simulation.

### Setup

1. Download Braze Pilot from App Store (iOS) or Google Play (Android)
2. Create or log in to a Braze account
3. In the Pilot app, enter workspace credentials to connect
4. Select an app simulation
5. Trigger events via the app UI — they appear in the dashboard within seconds

### Deep Links

Braze Pilot supports the `braze-pilot://navigation/` URI scheme. Use deep links in campaigns to drive users to specific screens within the simulation. Reference `references/braze-pilot-deep-links.md` for the full navigation URI catalog.

---

## Administrative Configuration

### Dashboard Settings to Configure at Setup

| Setting | Location | Priority |
|---|---|---|
| Workspace API keys | Settings > API Keys | Critical — needed for SDK |
| Team member roles | Settings > Company Users | High — access control |
| Email sending domains | Settings > Email Preferences | High — needed for email campaigns |
| Push credentials (APNs/FCM) | Settings > App Settings | High — needed for push |
| Data retention policy | Settings > Data Settings | Medium |
| Custom event/attribute schema | Settings > Custom Events / Attributes | Medium |

### Home Dashboard

The Braze home dashboard surfaces high-level engagement metrics — active users, campaign performance, and revenue. Treat it as a health monitor, not a configuration surface. Most setup work happens in **Settings** and **Developer Console**.

---

## Privacy and Compliance

### Privacy Portal

Braze provides tools for GDPR/CCPA compliance:
- **User deletion** — Remove a user profile and all associated data via REST API (`/users/delete`)
- **Data export** — Export a user's profile data via REST API (`/users/export/ids`)
- **Subscription management** — Email and push subscription states are first-class profile fields

Configure subscription group defaults and data retention windows before ingesting production data. Retroactive deletion is supported but operationally expensive.

---

## Campaigns and Canvases (Conceptual Overview)

This skill covers these concepts at the platform-bootstrap level. For deep campaign or Canvas architecture guidance, use the `campaign-management` or `canvas-orchestration` skills.

| Concept | Use When |
|---|---|
| **Campaign** | One-time or recurring send to a segment; single-channel or multichannel |
| **Canvas** | Multi-step journey with branching logic, delays, and A/B splits |
| **Segment** | Dynamic cohort; re-evaluated at send time |
| **Action-based delivery** | Triggered by a custom event in real time |
| **Scheduled delivery** | Sent at a fixed time or recurring cadence |

---

## Onboarding FAQ

**Q: When should I call `changeUser()`?**
Call it immediately after the user authenticates — before logging any post-login events. Never call it with the same ID that's already set (no-op) or with an empty string (error).

**Q: Can I have multiple apps in one workspace?**
Yes. Each app in a workspace gets its own API key but shares the user profile database. Cross-app segmentation is possible. Use multiple apps in one workspace when unified user profiles across your product suite are desired.

**Q: How do I verify SDK data is flowing?**
Use the **User Search** in the dashboard (Audience > User Search) to look up a test user by `external_id`. The profile will show recent events, attributes, and session data.

**Q: What's the difference between a custom event and a custom attribute?**
Custom events are time-stamped occurrences (`user_purchased`, `video_watched`). Custom attributes are stateful properties on the profile (`subscription_tier: "premium"`, `total_purchases: 14`). Events drive action-based triggers; attributes drive segmentation.

---

## Reference Files

Detailed topic content is available in the `references/` directory:

- **`references/workspaces.md`** — Workspace topology, multi-app configurations, API key management
- **`references/users-and-segments.md`** — User profile anatomy, identity management, segmentation
- **`references/sdk-overview.md`** — SDK initialization, platform-specific setup, feature matrix
- **`references/integrations-overview.md`** — Integration patterns, REST API vs. SDK decision guide
- **`references/braze-pilot-data-dictionary.md`** — Full event/attribute catalog per app simulation
- **`references/braze-pilot-deep-links.md`** — Navigation URI scheme for Braze Pilot
- **`references/onboarding-faq.md`** — Extended FAQ covering anonymous users, identity edge cases
- **`references/terms-to-know.md`** — Braze glossary and terminology reference
- **`references/campaigns-and-canvases.md`** — Conceptual overview of messaging primitives
- **`references/privacy-portal.md`** — GDPR/CCPA tooling and compliance workflows
- **`references/administrative-settings.md`** — Dashboard settings reference

`★ Insight ─────────────────────────────────────`
The reference file list at the bottom of a skill body is load-bearing — it's how Claude knows what additional context exists without having to discover it through filesystem exploration. This is the "progressive disclosure" pattern: SKILL.md acts as a table of contents, and references/ files hold the depth. The skill itself stays lean (~1,500 words) while the full knowledge surface is unbounded.
`─────────────────────────────────────────────────`
