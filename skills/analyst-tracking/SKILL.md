---
name: analyst-tracking
description: >-
  Configuring and analyzing user tracking for email, installs, segments, and
  influenced opens.
metadata:
  role: braze-analyst
  topics:
    - analytics-tracking
    - tracking-uninstall-tracking
    - tracking-segment-analytics-tracking
    - tracking-influenced-opens
    - tracking-email-tracking
    - locations-and-geofences-location-tracking
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
This is a **reference-type** skill (domain knowledge, not a discipline-enforcing rule). The structure differs: prioritize "when to use" triggers, a lens description, and topic summaries that act as a lookup index — not Red Flags tables or rationalization counters.
`─────────────────────────────────────────────────`

Here is the generated skill file body:

---

# User Tracking & Attribution

## Purpose

This skill covers how Braze captures, exposes, and enables analysis of user behavior signals — from the moment a push arrives to the moment a user uninstalls. Use it when configuring tracking infrastructure, interpreting engagement metrics, building attribution models, or diagnosing gaps in behavioral data.

## When to Use This Skill

- You're asked how Braze measures whether a notification "worked"
- A stakeholder asks why open rates look higher/lower than expected
- You need to enable or disable tracking for specific users (e.g., for GDPR/CCPA regions)
- You're analyzing segment-level session or revenue data
- You're setting up or auditing location-based targeting
- You need to explain the difference between a direct open and an influenced open
- Uninstall numbers are being used in a report and you need to characterize their reliability

## Analytical Lens: Attribution Modeling & User Behavior Measurement

This skill approaches tracking from the perspective of **what caused a user action** — not just whether an action occurred. Attribution in Braze is inherently multi-signal: a user may open an app because of a push, a follow-up email, or independently. Each tracking mechanism below produces a different kind of attribution signal, with different reliability characteristics.

Key analytical principles to apply throughout:

- **Directionality over precision** — most Braze signals (uninstalls, influenced opens) are trend indicators, not exact counts
- **Opt-in state matters** — tracking features like email pixel and location are per-user and can be disabled; always check profile state before drawing conclusions
- **Attribution windows are configurable** — influenced open windows are set per-workspace and affect how broadly credit is assigned
- **Segment analytics requires activation** — historical data for a segment is only available if analytics tracking was explicitly enabled

---

## Topics Synthesized

### Tracking Overview

Provides the conceptual foundation for Braze's user tracking capabilities. Covers the data model for behavioral signals, how tracking state is stored on user profiles, and the scope of what Braze can and cannot measure natively. Start here when orienting a new analyst or auditing a workspace's tracking configuration.

### Email Open Pixel and Click Tracking

Controls open and click tracking at the user-profile level via API. Useful for regional privacy compliance (e.g., disabling tracking for EU users). Covers the relevant profile fields, how to set them via REST API, and the downstream effect on email engagement metrics in dashboards and exports.

**Attribution note:** Open pixel tracking is inherently imprecise — Apple MPP pre-fetches pixels, inflating open counts. Click tracking is more reliable for behavioral attribution.

### Influenced Opens

Distinguishes two push-attribution types:
- **Direct open** — user taps the notification
- **Influenced open** — user opens the app organically within a configurable window after receiving a push (without tapping it)

Influenced opens extend the attributable impact of push campaigns beyond tap-throughs. The attribution window is workspace-level and should be calibrated to typical user re-engagement latency for your app.

**Analyst watch-out:** Widening the influenced open window inflates attributed opens. Treat influenced open volume as a sensitivity-dependent metric when comparing campaigns.

### Uninstall Tracking

Braze detects uninstalls via silent push tokens rejected by FCM/APNs. Because the signal depends on OS-level token invalidation timing, counts are directional indicators — not exact figures. Silently rejected tokens may arrive delayed, and some devices never invalidate tokens cleanly.

Use uninstall data to identify trends (e.g., spike after a campaign) rather than as a precise cohort count. Uninstall rates work best as relative metrics: cohort A vs. cohort B, not as absolute churn figures.

### Segment Analytics Tracking

Enables historical session, event, and revenue analysis for a specific segment. Without this setting enabled, only real-time statistics are available. Must be turned on explicitly per segment — it is not retroactive.

When diagnosing missing historical data in segment reports, check whether analytics tracking was active during the relevant time window.

### Location Tracking

Braze captures a user's most recent foreground location via GPS when the app is opened. Location data powers segmentation (e.g., users within X miles of a store), geotargeting for campaigns, and location-based filters.

**Analyst note:** "Most recent location" is a single point — not a history. Campaigns built on location data reflect where a user *was* when they last opened the app, which may lag their current location by hours or days.

---

## Common Attribution Pitfalls

| Signal | Reliability | Pitfall |
|---|---|---|
| Email opens | Low–Medium | Apple MPP inflates pixel-based opens |
| Click-throughs | High | Best email attribution signal |
| Direct push opens | High | Requires user to tap notification |
| Influenced opens | Medium | Window width directly affects count |
| Uninstall counts | Low–Medium | FCM/APNs timing makes exact counts unreliable |
| Location | Medium | Single-point snapshot, not real-time |
| Segment analytics | High | Only available if tracking was enabled beforehand |

---

`★ Insight ─────────────────────────────────────`
The **Quick Reference table** at the end is the most reusable pattern here — it gives future Claude instances a one-glance reliability calibration for each signal type, which is exactly what an attribution analyst needs when deciding which metrics to include in a report or stakeholder deck.
`─────────────────────────────────────────────────`
