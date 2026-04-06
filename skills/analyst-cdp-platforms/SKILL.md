---
name: analyst-cdp-platforms
description: >-
  Manages customer data platform configurations and analyzes user data flows
  across Amplitude, Segment, Tealium, and other CDPs.
metadata:
  role: braze-analyst
  topics:
    - cdp-amplitude-amplitude-user-profile-api
    - cdp-amplitude-amplitude-for-currents
    - cdp-amplitude-amplitude-cohort-import
    - cdp-amplitude-amplitude-audiences
    - cdp-segment-segment
    - cdp-segment-segment-for-currents
    - cdp-segment-segment-engage
    - cdp-tealium-tealium
    - cdp-tealium-tealium-for-currents
    - cdp-tealium-tealium-audience-stream
    - cdp-zeotap-zeotap
    - cdp-zeotap-zeotap-for-currents
    - cdp-zeotap-symphony
    - cdp-adobe-adobe
    - cdp-adobe-adobe-for-currents
    - personalized-recommendations-amplitude
    - personalized-recommendations-fullstory
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- Nick skill files are **reference skills** — optimized for fast agent lookup during a conversation, not exhaustive documentation. The `references/` topic files hold the deep detail; the `SKILL.md` orients the agent to *when* and *how* to use those references.
- The **lens** concept is architectural — it tells the agent which interpretive frame to apply, so an analyst and an engineer reading the same topic file reach different conclusions intentionally.
- Grouping topics into a **Quick Reference table** mirrors Nick's routing logic: agents use keyword matching to land on the right topic file, so the table should reflect the natural question shapes users ask.
`─────────────────────────────────────────────────`

Here is the generated skill file:

---

# CDP Platform Analytics

## Overview

This skill covers the configuration, integration, and data flow analysis for Customer Data Platforms (CDPs) connected to Braze. It synthesizes knowledge across four major CDP ecosystems — **Adobe Experience Platform**, **Amplitude**, **Segment**, and **Tealium** — plus specialized identity and behavioral platforms: **Zeotap** and **FullStory**.

**Lens:** Data analysis and platform-specific configuration. Apply this skill when the question involves how data moves between a CDP and Braze, how to configure an integration correctly, or how to diagnose a data flow problem. Prioritize schema accuracy, integration health, and platform-specific constraints over general marketing strategy.

## When to Use This Skill

Use when the user asks about:
- Configuring a CDP-to-Braze or Braze-to-CDP integration (event forwarding, cohort sync, Currents streaming)
- Diagnosing why events or audiences are not appearing in Braze from a CDP (or vice versa)
- Comparing integration approaches across platforms (e.g., Segment vs. Tealium for Currents)
- Setting up audience targeting or segmentation that involves an external CDP
- Choosing between Currents export, API sync, or cohort import for a specific use case

Do **not** use for:
- Native Braze segmentation or Canvas logic (use the Segmentation or Engagement skill instead)
- General event schema design not tied to a specific CDP integration

## Platform Coverage

### Adobe Experience Platform

| Topic | Scope |
|-------|-------|
| **Adobe Integration** | Server-side event forwarding via AEP Edge Network → Braze `/users/track` API |
| **Adobe for Currents** | Real-time Braze Currents streaming into AEP via streaming source connector |

### Amplitude

| Topic | Scope |
|-------|-------|
| **Amplitude for Currents** | One-way export of Braze events into Amplitude for product analytics |
| **Amplitude Cohort Import** | Batch sync of Amplitude behavioral cohorts into Braze for targeting |
| **Amplitude Audiences** | Bidirectional audience sync between Amplitude and Braze |
| **Amplitude User Profile API** | Enrich Braze profiles with Amplitude user properties at message-send time |
| **Amplitude Recommendations** | Surface Amplitude ML recommendations as targeting inputs in Braze campaigns |

### Segment

| Topic | Scope |
|-------|-------|
| **Segment Integration** | Route Segment `track`/`identify` calls to Braze as a destination |
| **Segment for Currents** | Stream Braze Currents events into Segment as a source |
| **Segment Engage** | Sync Segment Engage audiences and computed traits to Braze |

### Tealium

| Topic | Scope |
|-------|-------|
| **Tealium Integration** | Braze Currents → Tealium for routing events across the marketing stack |
| **Tealium for Currents** | Stream Currents data into Tealium EventStream |
| **Tealium AudienceStream** | Segment Tealium visitor profiles into Braze-targetable audiences |

### Zeotap

| Topic | Scope |
|-------|-------|
| **Zeotap Integration** | Sync Zeotap customer segments to Braze via Currents |
| **Zeotap for Currents** | Identity-resolved Zeotap segments → Braze user targeting |
| **Zeotap Symphony** | Real-time orchestration: push attributes and custom events from Zeotap to Braze `/users/track` |

### FullStory

| Topic | Scope |
|-------|-------|
| **FullStory Recommendations** | Surface FullStory behavioral signals as targeting inputs in Braze |

## Analyst Lens: Data Analysis & Platform-Specific Configuration

When answering through this skill, apply these priorities in order:

1. **Trace the data flow first.** Source event → CDP transform → Braze endpoint. Identify where schema drift, dropped fields, or identity mismatches can occur at each hop.
2. **Apply platform-specific constraints.** Each CDP has its own field mapping rules, rate limits, and authentication patterns. Do not generalize an Amplitude answer to a Tealium question.
3. **Distinguish Currents from API sync.** Currents is a push-based, near-real-time Braze-out stream. Cohort/audience imports are pull-based and typically batch. These serve different use cases — surface this tradeoff proactively.
4. **Confirm identity resolution.** CDPs like Zeotap handle identity resolution differently from Amplitude. Verify which identifier (`external_id`, email, device ID) is active at each integration boundary before recommending a configuration.
5. **Surface latency expectations.** Currents integrations are near-real-time; cohort syncs are batch (often hourly or daily). Flag this when the user's use case depends on data freshness.

## Quick Reference: Integration Directions

| Platform | Braze → CDP | CDP → Braze |
|----------|-------------|-------------|
| Adobe AEP | Currents streaming source | Event Forwarding via Edge Network |
| Amplitude | Currents export | Cohort import, Audiences sync, User Profile API |
| Segment | Currents source | Destination (track/identify events) |
| Tealium | Currents → EventStream | AudienceStream audience sync |
| Zeotap | Currents export | Segment sync, Symphony event push |
| FullStory | — | Behavioral recommendations |

## Common Pitfalls

- **Currents not enabled**: Most streaming integrations require Braze Currents to be enabled on the account. Verify this before troubleshooting missing data.
- **Schema mismatch at ingestion**: Currents exports use a fixed, Braze-defined event schema. Receiving CDPs must be configured to accept this structure — silent drops are common when field types don't align.
- **Cohort sync frequency misunderstood**: Amplitude and Segment cohort imports are batch operations. Do not recommend them for real-time personalization without surfacing sync frequency and lag.
- **Identity collisions across CDPs**: When multiple CDPs write to the same Braze profile via different identifiers, external_id conflicts can corrupt or duplicate user records.
- **Adobe prerequisites**: Adobe Event Forwarding requires the AEP Web SDK and Edge Network to be active before the Braze extension can forward server-side events.

`★ Insight ─────────────────────────────────────`
- The **Quick Reference table** mirrors how Nick's router works — agents match a user question to a platform name and integration direction, then drill into the specific topic file. Structuring it as a 2D matrix (platform × direction) makes that lookup fast.
- The **Common Pitfalls** section is particularly valuable in a reference skill because it captures the *non-obvious* failure modes — the things a user wouldn't think to ask about until they're already debugging at 2am.
`─────────────────────────────────────────────────`
