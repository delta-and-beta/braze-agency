---
name: analyst-user-tracking
description: >-
  Configures session tracking, custom events, purchase logging, user attributes,
  location tracking, and uninstall detection on iOS.
metadata:
  role: braze-analyst
  topics:
    - ios-analytics-tracking-sessions
    - ios-analytics-tracking-custom-events
    - ios-analytics-setting-user-ids
    - ios-analytics-setting-custom-attributes
    - ios-analytics-logging-purchases
    - ios-analytics-location-tracking
    - ios-analytics-uninstall-tracking
    - ios-analytics-disabling-tracking
    - ios-analytics
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- Nick skill files use a flat topic structure: the `references/` subdirectory holds atomic knowledge units, while `SKILL.md` synthesizes them into agent-consumable guidance
- The "lens" concept is key to Nick's architecture — the same raw topics can produce different skills depending on which role consumes them (analyst vs engineer vs architect)
`─────────────────────────────────────────────────`

# User Analytics & Event Tracking

## Overview

This skill covers the full spectrum of Braze iOS data collection: how the SDK captures user behavior from first session to app removal. Use this skill when designing or auditing a measurement strategy — deciding *what* to track, *how* to configure it, and *why* each signal matters in downstream analytics.

The lens here is **data collection strategy and user behavior measurement**: not just the Swift/Objective-C APIs, but the decisions behind them — what constitutes a meaningful event, when custom attributes outperform events, and how tracking choices compound into the behavioral profiles that power segmentation and personalization.

## Scope

This skill synthesizes the following knowledge areas:

| Topic | What it covers |
|---|---|
| **iOS Analytics Overview** | Entry point — SDK capabilities and the dashboard data model |
| **Session Tracking** | Automatic session start/close lifecycle; configuring session timeout |
| **Custom Event Tracking** | Logging named events with properties; Swift vs Objective-C API surface |
| **Setting User IDs** | Identity assignment strategy; aliasing anonymous and known users |
| **Custom Attributes** | Typed attribute API (string, int, bool, date, array); incrementing vs setting |
| **Logging Purchases** | Revenue events with currency, price, quantity, and product ID |
| **Location Tracking** | Opt-in flow, single-point logging, permission model |
| **Uninstall Tracking** | Background push detection; Xcode capability requirements |
| **Disabling Tracking** | Compliance/privacy scenarios; suppressing SDK data collection |

## When to Use This Skill

Use this skill when:

- **Designing an instrumentation plan** — deciding which events and attributes to capture for a new feature or campaign
- **Auditing existing tracking** — reviewing whether current calls generate the right data points for segmentation, A/B testing, or churn prediction
- **Debugging missing data** — investigating why events or attributes aren't appearing in the Braze dashboard
- **Advising on identity management** — when to call `changeUser()`, how to handle pre-login anonymous sessions, and alias vs identified user tradeoffs
- **Handling compliance requirements** — implementing opt-out flows or suppressing collection for GDPR/CCPA scenarios
- **Revenue attribution** — configuring `logPurchase` correctly so purchase data rolls into Braze's revenue analytics

## Key Patterns

### SDK Namespace

The legacy `Appboy` namespace (Objective-C) is deprecated. Modern integrations use the Swift `Braze` SDK. Preserved legacy examples exist in topic files for reference when auditing older codebases, but new instrumentation should use the current namespace.

### Data Point Economics

Every tracked event, attribute update, and session start consumes Braze data points. Tracking strategy must balance behavioral signal fidelity against data point budget — prefer attributes that *replace* prior values over high-frequency events when the cardinality is low.

### Event vs Attribute Decision

- **Custom events**: actions that happen (tapped, submitted, completed) — timestamped, countable, filterable by property
- **Custom attributes**: persistent user state (tier, preference, flag) — overwritten or incremented, drive segment membership

### Identity Lifecycle

`changeUser()` should fire at login/logout boundaries. Calling it mid-session splits the session record. Anonymous pre-login activity is attached to a device-generated ID; aliasing connects that history to the authenticated user post-login.

## Quick Reference

```swift
// Session: automatic — configure timeout in Info.plist
// ABKMinimumTriggerTimeIntervalKey (default: 30s)

// Custom event
AppDelegate.braze?.logCustomEvent(name: "item_viewed", properties: ["sku": "ABC123"])

// User ID
AppDelegate.braze?.changeUser(userId: "user_12345")

// Custom attribute
AppDelegate.braze?.user.setCustomAttribute(key: "plan_tier", value: "pro")
AppDelegate.braze?.user.incrementCustomUserAttribute(key: "login_count", by: 1)

// Purchase
AppDelegate.braze?.logPurchase(productId: "pro_monthly", currency: "USD", price: 9.99)

// Location (after permission granted)
AppDelegate.braze?.logLocation(latitude: 37.33, longitude: -122.03, altitude: 0, horizontalAccuracy: 10)

// Disable tracking
AppDelegate.braze?.enabled = false
```

## Common Mistakes

| Mistake | Impact | Fix |
|---|---|---|
| Calling `changeUser()` mid-session | Splits session attribution | Call only at auth boundaries |
| Using events for slow-changing state | Data point waste | Use attributes for user state |
| Skipping `productId` on purchases | Revenue rollup breaks | Always pass a non-empty product ID |
| Enabling location without checking permission | Silent no-op or crash | Check `CLAuthorizationStatus` first |
| Not enabling background push for uninstall tracking | Uninstall events never fire | Add Remote Notifications capability in Xcode |
| Setting attributes before `changeUser()` | Attributes attach to wrong profile | Establish identity before writing attributes |

## Analyst Perspective

From a measurement strategy standpoint, the most common instrumentation failures are:

1. **Over-tracking events, under-tracking attributes** — 50 custom events that could be collapsed into 5 events + 10 attributes, with better segmentation power
2. **No identity stitching plan** — anonymous sessions that never connect to authenticated users, creating ghost profiles
3. **Currency inconsistency in purchase logging** — mixing USD and local currencies breaks revenue aggregation in dashboards
4. **Tracking disabled in non-production environments** — staging events polluting production segment membership

`★ Insight ─────────────────────────────────────`
- The "lens" in Nick's architecture shapes which aspects of raw topic content get foregrounded — the same iOS SDK docs would produce a different skill for `braze:engineer` (focused on API correctness and edge cases) vs `braze:analyst` (focused on measurement strategy and data model implications)
- Topic files stripping Jekyll templating (`{% %}`, `{{site.baseurl}}`) is necessary because those Liquid tags are Jekyll-build-time constructs — they never render in plain markdown contexts like Claude's context window
`─────────────────────────────────────────────────`
