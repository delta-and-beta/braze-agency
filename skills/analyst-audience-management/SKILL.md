---
name: analyst-audience-management
description: >-
  Manages audience segmentation, cohort imports, and user profile enrichment
  across CDP integrations.
metadata:
  role: braze-analyst
  topics:
    - cdp-amplitude-amplitude-audiences
    - cdp-amplitude-amplitude-cohort-import
    - cdp-amplitude-amplitude-user-profile-api
    - cdp-tealium-tealium-audience-stream
    - cdp-segment-segment-engage
    - cdp-zeotap-symphony
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- Nick's skill files are **reference skills**, not discipline-enforcing ones — so they should optimize for retrieval (scannable tables, headers) over persuasion (rationalization counters, red flags lists)
- The `lens` concept acts as a perspectival filter: the same raw topic facts read differently depending on role (analyst vs. engineer), so the lens section shapes *how* Claude applies the information, not just *what* it knows
- Listing topics explicitly creates a discoverable keyword surface — future routing can match query terms against topic names before even reading full content
`─────────────────────────────────────────────────`

# Audience & Cohort Management

## Overview

This skill covers audience segmentation, cohort imports, and user profile enrichment across the CDP (Customer Data Platform) integrations that connect external tools to Braze. Use it when designing, troubleshooting, or optimizing audience-based targeting strategies — from initial cohort definition through import mechanics to downstream campaign activation.

**Lens: Audience targeting and segmentation strategy**
Read every integration through the question: *Does this approach produce audiences that are accurate, actionable, and maintainable at scale?* Prefer solutions that keep segmentation logic close to the source of truth and minimize data drift between systems.

---

## When to Use This Skill

Use this skill when:

- Importing cohorts or user segments from an external CDP into Braze
- Troubleshooting audience sync failures or unexpected segment membership
- Evaluating which CDP integration to use for a given segmentation use case
- Enriching Braze user profiles with attributes from Amplitude, Segment, Tealium, or Zeotap
- Designing audience refresh cadences or real-time vs. batch segmentation strategies
- Answering questions about how user identity is resolved across CDP boundaries

**Do not use** for campaign execution logic, message personalization, or A/B test design — those fall under separate skills.

---

## Topics Synthesized

| Topic | What It Covers |
|---|---|
| **Amplitude User Profile API** | Reading and writing user properties to/from Amplitude; profile enrichment patterns |
| **Amplitude Cohort Import** | Batch and streaming cohort sync from Amplitude to Braze; field mapping and refresh scheduling |
| **Amplitude Audiences** | Building behavioral cohorts in Amplitude; predictive audiences and computed traits |
| **Segment Engage** | Segment's Audiences and Computed Traits; sync to Braze via destination actions |
| **Tealium AudienceStream** | Real-time visitor profile building; audience connector rules and badge/attribute forwarding to Braze |
| **Zeotap Symphony** | Real-time orchestration for email and push; sending user attributes and custom events via Braze's `/users/track` endpoint |

---

## Integration Patterns at a Glance

### Amplitude → Braze

Amplitude supports two primary flows:

1. **Cohort sync** — exports a list of `user_id` or `device_id` values matching a behavioral cohort; Braze receives these as custom attribute updates (typically a boolean flag or cohort membership array)
2. **User Profile API** — pull-based enrichment; Amplitude profiles can be queried to backfill attributes not captured natively in Braze

**Key considerations:**
- Match key alignment (`user_id` in Amplitude must match `external_id` in Braze)
- Cohort refresh frequency (hourly vs. daily) directly affects campaign eligibility lag
- Predictive audiences require Amplitude's Recommend add-on; confirm entitlements before designing around them

### Segment Engage → Braze

Segment's Engage layer sits between raw event data and activation:

- **Computed Traits** map to Braze custom attributes (e.g., `ltv_90d`, `last_purchase_category`)
- **Audiences** map to Braze segments via boolean custom attributes or subscription group membership
- Use **Destination Actions** (not classic destinations) for granular field-level control and real-time sync

**Key considerations:**
- Trait computation runs on Segment's warehouse; latency depends on sync schedule, not event ingestion time
- Profile merge conflicts arise when `anonymous_id` → `user_id` resolution differs between Segment and Braze identity graphs

### Tealium AudienceStream → Braze

AudienceStream builds visitor profiles from EventStream data in real time:

- **Badges** represent audience membership (binary)
- **Attributes** represent computed properties (strings, numbers, dates)
- Both can be forwarded to Braze via the AudienceStream Braze connector on audience qualification or disqualification events

**Key considerations:**
- AudienceStream operates on Tealium's visitor identity model; map `tealium_visitor_id` to a Braze identifier explicitly
- Real-time qualification events fire per-visitor; high-volume sites can generate significant Braze API call volume — budget accordingly

### Zeotap Symphony → Braze

Symphony provides real-time orchestration targeting email and push channels:

- Sends user attributes and custom events to Braze via `/users/track`
- Designed for moment-of-intent triggers (e.g., browsing signals, intent scores)

**Key considerations:**
- Confirm that Zeotap's identity graph has resolved to a `braze_id` or `external_id` before events are forwarded — unresolved profiles create orphaned records
- Custom event payloads from Zeotap follow Braze's standard event schema; validate property names against Braze's 255-character key limit

---

## Identity Resolution Across CDPs

The most common failure mode in CDP → Braze integrations is **identity mismatch**. Before any cohort import:

1. Confirm the **match key** each CDP sends (email, `external_id`, `device_id`, phone)
2. Map it to the corresponding Braze identifier type
3. Validate match rates on a test cohort before activating at scale
4. Monitor `invalid_user_id` errors in Braze's import logs as a leading indicator

> When match rates drop below ~85%, investigate identity graph divergence rather than assuming data quality issues on the source side.

---

## Audience Freshness vs. Accuracy Trade-off

| Cadence | Use case fit | Risk |
|---|---|---|
| Real-time (Tealium, Zeotap) | Behavioral triggers, cart abandonment | Volume spikes; requires rate-limit headroom |
| Hourly (Amplitude, Segment) | Lifecycle segments, engagement tiers | Up to 1h eligibility lag for time-sensitive sends |
| Daily batch | Large suppression lists, high-LTV audiences | Stale membership during fast-moving campaigns |

When in doubt, match audience refresh cadence to campaign send frequency — a daily digest campaign does not benefit from real-time audience sync.
