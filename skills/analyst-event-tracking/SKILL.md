---
name: analyst-event-tracking
description: >-
  Configuration of custom events, purchase logging, session tracking, and
  uninstall detection.
metadata:
  role: braze-analyst
  topics:
    - analytics-logging-events
    - analytics-logging-purchases
    - analytics-tracking-sessions
    - analytics-tracking-uninstalls
    - analytics-tracking-location
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- Reference skills like this one are optimized for **fast retrieval**, not tutorial depth — tables and quick-reference sections beat prose for how Claude will actually use them mid-task
- The "lens" determines which *questions* the skill answers; an analyst lens means emphasizing attribution correctness and data fidelity over SDK integration mechanics
`─────────────────────────────────────────────────`

# Event & Purchase Tracking

## Scope

This skill covers Braze data instrumentation: how events, purchases, sessions, location data, and uninstall signals are captured, attributed, and validated. Use this skill when reasoning about **what data Braze is collecting**, **whether it's being collected correctly**, and **how that data feeds into segmentation, campaigns, and Canvas triggers**.

This is a **data instrumentation skill**, not an SDK integration guide. The perspective here is analytic accuracy — ensuring the data model is sound before building on top of it.

## Analyst Lens

Every topic in this skill is viewed through one question: *Is the signal trustworthy for downstream use?*

- **Custom events** — Are they logging the right user action at the right moment, with the right properties?
- **Purchases** — Is revenue attribution complete? Are currencies and quantities consistent?
- **Sessions** — Does the session definition match the engagement model the business actually cares about?
- **Location** — Is location data captured with sufficient precision and recency for geo-targeting?
- **Uninstalls** — Are uninstall signals being de-duplicated from legitimate push failures?

## Topics Synthesized

### Logging Custom Events

Custom events are the primary behavioral signal in Braze. They trigger campaigns, Canvas steps, and populate segments.

| Platform | Method |
|---|---|
| Web | `braze.logCustomEvent(name, properties)` |
| iOS/Android | `Braze.logCustomEvent(name, properties)` |

**Analyst considerations:**
- Event names are case-sensitive — `Purchase_Complete` and `purchase_complete` are different events
- Properties are optional but critical for fine-grained segmentation; missing properties cannot be backfilled
- Events without properties can still trigger but cannot be filtered by attribute value
- Maximum 50 custom event properties per event; property values must be scalar (string, number, boolean, date)

### Logging Purchases

Purchase events carry revenue attribution. Braze treats them as a distinct event type with built-in fields.

**Required fields:** `product_id`, `currency` (ISO 4217), `price`  
**Optional:** `quantity`, `properties`

**Analyst considerations:**
- `price` is per-unit; total revenue = `price × quantity`
- Currency inconsistency across platforms breaks revenue reporting — enforce a single currency at instrumentation time or normalize in downstream analytics
- `product_id` is the join key if reconciling against an external product catalog; use stable IDs, not display names
- Purchase events populate Braze's built-in LTV calculations; gaps in purchase logging create undercount

### Tracking Sessions

Session tracking defines engagement depth. Braze auto-tracks sessions via SDK, but the definition matters.

**Web SDK inactivity timeout:** 30 minutes — a session ends after 30 minutes without any SDK-tracked event. Each tracked event resets the timer.

**What counts as session activity:**
- Opening or backgrounding the app
- Any SDK-tracked custom event
- Any SDK-tracked purchase

**Analyst considerations:**
- Session counts in Braze reflect SDK activity windows, not user intent — a user who opens an app and immediately backgrounds it still starts a session
- Compare Braze session counts against product analytics (Mixpanel, Amplitude) to detect SDK gaps; significant divergence suggests missed `openSession`/`closeSession` calls
- Web SDK sessions are tab-scoped — multi-tab users will generate multiple concurrent sessions

### Tracking Location

Location data enables geo-targeting and location-based triggers.

**Analyst considerations:**
- Location is captured at SDK call time — stale location data from infrequent updates degrades geo-segment accuracy
- Braze stores last-known location; only the most recent coordinates are retained per user
- GPS precision varies by device and permission level; geofences should be sized to account for typical accuracy variance (~50m urban, ~150m suburban)
- Location tracking requires explicit user permission; segment by `location_available = true` before building geo-targeted campaigns to avoid sending to users with no location on file

### Tracking Uninstalls

Uninstall detection relies on silent push probes — Braze sends a silent push and marks a user as uninstalled if delivery fails.

**Analyst considerations:**
- Uninstall signals have latency; detection typically occurs 1–3 days after actual uninstall depending on platform and push provider behavior
- False positives occur when users have push notifications disabled but the app is still installed — validate uninstall rates against app store data where available
- Uninstall events should be excluded from re-engagement campaign eligibility filters to avoid targeting users who may still be reachable
- Suppressing uninstalled users from active segments reduces send volume and improves deliverability metrics

## When to Use This Skill

- Auditing whether events are instrumented correctly before building a campaign or Canvas
- Diagnosing discrepancies between Braze metrics and external analytics
- Reviewing a new event taxonomy for data quality issues
- Advising on purchase logging completeness for revenue reporting
- Evaluating session or location data before using it for segmentation

## Common Data Quality Failures

| Problem | Symptom | Root Cause |
|---|---|---|
| Duplicate events | Inflated event counts | Event fired on both client and server |
| Missing properties | Cannot filter segments | Properties not passed at log time |
| Currency mismatch | Broken LTV totals | Different currencies logged per platform |
| Session inflation | Sessions >> DAU | SDK `openSession` called redundantly |
| Stale location data | Geo-segments over/undercount | Location only updated at app open |
| Uninstall false positives | Re-engagement to churned users | Push-disabled users flagged as uninstalled |

`★ Insight ─────────────────────────────────────`
- The "common failures" table above serves as a fast diagnostic checklist — when data looks wrong in Braze, you can scan this table before diving into SDK logs
- Separating "what counts as a session" from "how sessions are implemented" is a key analyst move: the business definition and the SDK definition don't always match, and that gap is where reporting discrepancies hide
`─────────────────────────────────────────────────`
