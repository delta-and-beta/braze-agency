---
name: tester-integrations
description: >-
  Validation and quality assurance for message orchestration and personalization
  partner integrations.
metadata:
  role: braze-tester
  topics:
    - message-orchestration-deeplinking
    - message-orchestration-attribution
    - message-orchestration-retargeting
    - message-orchestration-templates
    - message-personalization-location
    - message-personalization-localization
    - deeplinking-branch-for-deeplinking
    - deeplinking-appsflyer
    - attribution-adjust
    - attribution-appsflyer
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
The writing-skills guide emphasizes CSO (Claude Search Optimization) — the structure of a skill determines how reliably a future agent will find and apply it. For a skill covering this many partner integrations, a clear taxonomy (attribution vs. deep linking vs. orchestration) helps Claude route to the right guidance faster than a flat list would.
`─────────────────────────────────────────────────`

# Partner Integration Testing

## Overview

This skill guides validation and quality assurance for Braze partner integrations across messaging orchestration, personalization, and mobile attribution pipelines. The lens is **integration correctness validation, data flow verification, and partner API conformance testing** — confirming that partner-provided SDKs, webhooks, and APIs behave as Braze's documentation specifies under real usage conditions.

Use this skill when testing whether a partner integration is wired correctly, passing the right data at the right time, and conforming to the expected API contract — not when designing or configuring integrations from scratch.

## When to Use

- Validating a newly configured partner integration before enabling it in production
- Diagnosing data discrepancies between Braze and a partner platform (attribution mismatch, missing location events, broken deep links)
- Confirming that SDK instrumentation passes required fields (device ID, session token, event timestamps) to third-party partners
- Testing partner webhook delivery and payload conformance
- Verifying that localized content, deep link routes, or attribution windows behave consistently across platforms

**Not for:** Configuring integrations from scratch, selecting which partner to use, or debugging Braze campaign logic unrelated to a partner data flow.

## Partner Categories This Skill Covers

### Attribution Partners
Partners that map ad spend to installs and in-app events.

| Partner | Key Test Surface |
|---------|-----------------|
| **Adjust** | Install attribution callbacks, event forwarding, postback URLs, SKAN configuration |
| **AppsFlyer** (Attribution) | Attribution API conformance, install events, re-engagement tracking, data freshness |
| **Singular** | Unified cost aggregation, attribution window accuracy, cross-channel deduplication |

### Deep Linking Partners
Partners that route users from links into specific in-app contexts.

| Partner | Key Test Surface |
|---------|-----------------|
| **Branch** | Universal link resolution, deferred deep link payloads, fallback URL behavior |
| **AppsFlyer** (Deep Linking) | OneLink routing, deferred deep links, web-to-app journeys |
| **Vizbee** | Cross-screen deep link handoff (smartphone → smart TV), session continuity |

### Personalization Partners
Partners that enrich messages with dynamic, real-world context.

| Partner | Key Test Surface |
|---------|-----------------|
| **Radar** | Geofence entry/exit event delivery, location accuracy, event deduplication |
| **Transifex** | Localized string delivery, locale fallback chains, content sync freshness |

### Orchestration / Templates Partners

| Partner | Key Test Surface |
|---------|-----------------|
| **Taxi for Email** | Template export fidelity, HTML/CSS rendering, variable substitution |
| **Vizbee** (Retargeting) | Retargeting signal delivery, cross-device identity resolution |

## Testing Lens

All testing through this skill applies three validation dimensions:

**1. Integration Correctness**
Does the integration behave the way Braze's documentation says it should? Check: required fields present, event names match expected schema, SDK hooks fire at the right lifecycle points.

**2. Data Flow Verification**
Does data move end-to-end without loss or corruption? Check: event arrives at partner within SLA, payload fields survive serialization, Braze receives callbacks and attribute updates correctly.

**3. API Conformance**
Does the integration respect the partner's API contract? Check: authentication credentials valid, rate limits respected, deprecated endpoints not used, version pinning where required.

## Key Testing Patterns

### Attribution Validation
- Confirm install event fires once per organic and paid install (no duplication)
- Validate postback URL receives correct `advertising_id`, `campaign_id`, and timestamp
- Test re-engagement attribution does not overwrite an existing install attribution
- Verify attribution window boundaries: events outside the window should not attribute

### Deep Link Validation
- Test deferred deep link: install app via link → confirm correct destination on first launch
- Test direct deep link: app installed → link opens → confirm correct in-app destination
- Test fallback: link opened on desktop → confirm redirect to correct web URL
- Validate that link parameters survive URL encoding/decoding

### Location / Geofence Validation (Radar)
- Confirm geofence entry event arrives in Braze with correct `geofence_id` and coordinates
- Test exit event fires and clears the active geofence attribute
- Validate event deduplication: rapid enter/exit should not flood the event stream
- Check that location permission denial is handled without crashing the SDK

### Localization Validation (Transifex)
- Confirm correct locale string is served for each supported locale
- Test fallback: unsupported locale → confirm fallback to default language
- Validate content sync: update a string in Transifex → confirm it propagates within the expected window

### Template Validation (Taxi for Email)
- Export template and confirm HTML renders correctly across target email clients
- Validate that Liquid/merge tag variables are preserved in the exported HTML
- Check image asset URLs are absolute and accessible

## Common Failure Modes

| Symptom | Likely Cause | Where to Check |
|---------|-------------|----------------|
| Attribution not appearing in Braze user profile | Postback URL misconfigured or IDFA/GAID missing | Partner dashboard → postback logs |
| Deep link lands on home screen instead of content | Universal link domain not in entitlements, or deferred link payload missing | Branch/AppsFlyer dashboard → link tester |
| Geofence events missing or delayed | Background location permission denied, or Radar SDK not initialized before login | Radar dashboard → event log |
| Wrong locale served | Locale code mismatch (e.g., `en` vs `en-US`) or stale CDN cache | Transifex project → language codes |
| Email template variables appear as raw tags | Merge tag format incompatible with Taxi export | Exported HTML → inspect raw source |

## Quick Reference: What to Verify Per Integration Type

```
Attribution   → install event, postback delivery, window boundaries, no duplicates
Deep Linking  → deferred payload, direct routing, fallback URL, parameter encoding
Location      → entry/exit events, deduplication, permission handling
Localization  → correct locale, fallback chain, sync freshness
Templates     → HTML fidelity, variable preservation, image URLs
```
