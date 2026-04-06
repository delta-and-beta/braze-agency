---
name: strategist-campaigns
description: >-
  Designing multi-channel campaign strategies with audience segmentation,
  canvases, and landing pages.
metadata:
  role: braze-strategist
  topics:
    - engagement-tools-campaigns
    - engagement-tools-canvas
    - engagement-tools-segments
    - engagement-tools-landing-pages
    - engagement-tools-templates-and-media
    - engagement-tools-locations-and-geofences
    - reporting-campaign-analytics
    - reporting-canvas-analytics
    - api-api-campaigns
    - api-api-campaigns-transactional
    - api-use-cases
    - ios-in-app-messaging-delivery
    - ios-content-cards-use-cases
    - api-objects-connected-audience
    - endpoints-messaging-post-send-triggered-campaigns
    - endpoints-messaging-post-send-transactional
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
This is a **reference-type skill** — it synthesizes multiple atomic topic files into a navigable guide. The key design choice is organizing content by the *decision* a strategist faces, not by Braze's menu structure. That maps directly to how the `braze-strategist` agent will be queried.
`─────────────────────────────────────────────────`

# Campaign & Canvas Strategy

## Overview

This skill covers the full lifecycle of multi-channel engagement: from audience definition and asset preparation through campaign or Canvas construction, delivery configuration, and performance analysis.

Use this skill when designing, launching, or analyzing **Braze campaigns and Canvases** — including API-triggered sends, transactional flows, audience segmentation, landing page capture, and geo-behavioral targeting.

**Lens:** Strategic campaign orchestration and audience journey design — evaluating *which* delivery mechanism fits the use case, *how* audiences should be segmented and sequenced, and *what* analytics signal health or friction.

---

## When to Apply This Skill

| Scenario | Primary Focus |
|---|---|
| Designing a new multi-step user journey | Canvas architecture, entry/exit criteria |
| Sending a one-off or API-triggered message | Campaign type selection, trigger config |
| Segmenting users for targeted messaging | Audience Segments, Connected Audience filters |
| Capturing leads or enriching profiles | Landing Pages, Liquid `{% landing_page_url %}` |
| Analyzing campaign or journey performance | Campaign Analytics, Canvas Analytics |
| Managing templates and media centrally | Media Library |
| Targeting users by physical location | Locations & Geofences |

---

## Campaign vs Canvas: Core Decision

**Campaign** — Single-message or A/B send. Best for:
- One-off announcements, promos, transactional confirmations
- API-triggered sends to specific users (`POST /campaigns/trigger/send`)
- Transactional email with strict delivery guarantees (`POST /transactional/v1/campaigns/send`)

**Canvas** — Multi-step, branching journey. Best for:
- Onboarding sequences, lifecycle flows, re-engagement series
- Conditional logic based on user behavior between steps
- Cross-channel coordination (push → email → in-app) with timing control

---

## Delivery Mechanisms

### Scheduled vs Action-Based vs API-Triggered

| Type | When to Use |
|---|---|
| Scheduled | Time-based campaigns; newsletters, digests |
| Action-based | Behavior-triggered; post-purchase, session start |
| API-triggered | Server-driven; transactional, real-time personalization |

**API-triggered campaigns** keep copy and multivariate logic in the Braze dashboard while letting backend systems control timing and targeting. The `trigger_properties` payload injects dynamic data into Liquid at send time.

**Transactional sends** (`/transactional/v1/campaigns/send`) differ from standard triggered campaigns: they prioritize deliverability, support synchronous status webhooks, and are reserved for critical messages (receipts, password resets).

---

## Audience Strategy

### Segmentation
Segments are reusable, real-time audience definitions. The Segments dashboard shows live statistics — use it to validate size before launch and monitor drift over time.

### Connected Audience Filter
Apply a Connected Audience filter inside a campaign or Canvas step to dynamically refine delivery without creating a new reusable segment. Useful for one-off targeting logic that doesn't warrant a permanent segment.

### Geotargeting
Two mechanisms serve distinct use cases:
- **Location tracking (GPS)** — targets users based on most-recent-location captured at app open; available as a segment filter
- **Geofences** — triggers messages on entry/exit of defined geographic boundaries; requires SDK location permission

---

## In-App Message Delivery

In-app messages are **session-rendered**, not push-delivered — they display when the app is open. Configure trigger events carefully:

- Trigger types: `Any Purchase`, `Specific Purchase`, `Session Start`, `Custom Event` (with property filters)
- Re-eligibility and frequency caps apply per campaign settings
- Pre-cache assets via the Media Library to eliminate load latency

---

## Landing Pages

Use `{% landing_page_url %}` Liquid tag in any channel message (email, SMS, in-app) to link form submissions back to existing user profiles without requiring login. This bridges anonymous form interaction to known profile enrichment.

---

## Asset & Template Management

Centralize creative assets in **Templates > Media Library** before building campaigns. Benefits over external CDN:
- In-app message assets are pre-cached for faster render
- Assets are version-controlled within Braze
- Reusable across campaigns and Canvases

---

## Analytics Reference

| Surface | What to Measure |
|---|---|
| Campaign Analytics | Delivery, open, click, conversion rates per variant |
| Canvas Analytics | Step-by-step drop-off, variant performance, path comparison |
| Content Cards | Impressions, clicks, dismissals per card |

Use Canvas Analytics to identify friction steps — high drop-off at a step signals timing, copy, or eligibility issues.

---

## Topics Synthesized

- **Campaigns Overview** — Campaign types, creation flow, scheduling
- **Canvas Overview** — Canvas builder, step types, entry/exit rules
- **Canvas Analytics** — Journey funnel metrics, variant comparison
- **Campaign Analytics** — Delivery and engagement KPIs
- **Audience Segments** — Segment dashboard, filter logic, real-time stats
- **Connected Audience Filter** — Inline audience refinement at step level
- **In-App Message Delivery** — Trigger types, session rendering, frequency
- **Landing Pages** — Profile enrichment via `{% landing_page_url %}`
- **Locations & Geofences** — GPS tracking vs geofence triggers
- **Templates & Media Library** — Centralized asset management, pre-caching
- **Content Cards Use Cases** — Persistent in-app content surfaces
- **API Campaigns** — Dashboard-managed copy with API-controlled delivery
- **Transactional API Campaigns** — High-priority delivery with delivery status hooks
- **POST /campaigns/trigger/send** — Immediate sends to specified users
- **POST /transactional/v1/campaigns/send** — Transactional delivery endpoint
- **API Use Cases** — Catalog, messaging, and REST endpoint patterns

---

## Common Strategic Mistakes

| Mistake | Better Approach |
|---|---|
| Using campaigns for multi-step journeys | Move to Canvas; gain branching, timing, and analytics |
| Building new segments for every campaign | Use Connected Audience filters for one-off refinement |
| Hosting in-app assets on external CDN | Upload to Media Library for pre-caching |
| Triggering transactional sends via standard campaign API | Use `/transactional/v1/` endpoint for delivery guarantees |
| Geo-targeting without confirming SDK permission state | Verify location permission granted before geofence step |

`★ Insight ─────────────────────────────────────`
The decision table structure (Campaign vs Canvas, Scheduled vs API-triggered) matches how a strategist actually reasons — by use case, not by Braze menu path. Skills that mirror the user's mental model get retrieved and applied more reliably than ones that mirror the tool's UI structure.
`─────────────────────────────────────────────────`
