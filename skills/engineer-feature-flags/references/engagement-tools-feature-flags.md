---
name: engagement-tools-feature-flags
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/feature_flags/faq
indexed_at: '2026-04-05'
keywords:
  - flags
  - rollout
  - targeting
  - segmentation
  - testing
  - bucketing
  - SDK
  - deployment
  - Canvas
  - experimentation
triggers:
  - how to implement feature flags
  - how to target users for rollout
  - how to run A/B tests with feature flags
  - how to gradually rollout a feature
  - how to manage feature flag versions
---
# Feature Flags Overview

## Platform Support

Supported on iOS, Android, and Web. Minimum SDK versions:

| Platform | Version |
|----------|---------|
| Swift | 5.9.0 |
| Android | 24.2.0 |
| Web | 4.6.0 |
| Unity | 4.1.0 |
| Cordova | 5.0.0 |
| React Native | 4.1.0 |
| Flutter | 6.0.0 |
| Roku | 1.0.0 |

---

## Implementation

Integration is minimal — typically just an `if/else` check:

```javascript
// JavaScript (Web SDK)
import { getFeatureFlag } from "@braze/web-sdk";

if (getFeatureFlag("new_shopping_cart").enabled) {
    // Show new feature
} else {
    // Show old feature
}
```

```java
// Java (Android)
if (braze.getFeatureFlag("new_shopping_cart").getEnabled()) {
    // Show new feature
}
```

```kotlin
// Kotlin (Android)
if (braze.getFeatureFlag("new_shopping_cart")?.enabled == true) {
    // Show new feature
}
```

---

## Use Cases by Team

**Marketing:** Coordinate product announcements to match rollout percentage. Example: roll out a loyalty program to 10% of users, then target that exact 10% with a Canvas email/push campaign using the Canvas Feature Flag step.

**Product:** Gradual rollouts and soft launches with KPI monitoring. Use feature flag properties to remotely populate dynamic content (deep links, text, images). Run A/B split tests via Canvas Feature Flag step.

**Engineering:** Decouple deployments from feature activation. Toggle features remotely from the dashboard without pushing new code or waiting for app store approvals.

---

## Targeting and Rollouts

**Targeting a specific group:** Create a Braze segment (by email, `user_id`, or any profile attribute) and deploy to 100% of that segment.

**Rollout percentage consistency:**
- Rollout is stable per user across devices and sessions
- Increasing from 10% → 20%: original 10% stays enabled, new 10% added
- Decreasing from 20% → 10%: only the original 10% remains
- Setting to 0% removes all users (useful for disabling on bug discovery)

---

## SDK Behavior

| Topic | Behavior |
|-------|----------|
| Initialization | SDK must be initialized before feature flags can be used — cannot gate SDK init itself |
| Refresh timing | Refreshed at session start and on active user change |
| Manual refresh | Available via SDK `refresh` method |
| Rate limit | Once every 5 minutes (subject to change) |
| Offline access | Flags are stored locally after first refresh; available offline |
| Mid-session refresh | Supported — use the SDK update listener to decide whether to re-render UI |

**Listening for mid-session updates:** Use the SDK's update listener to selectively re-render when specific flags change, avoiding jarring UI shifts.

---

## Constraints

- **Global Control Group users** cannot receive feature flag experiments and will not be part of Feature Flag A/B tests.
- Feature flags **cannot control SDK initialization** — the SDK must already be running to sync flags.

---

`★ Insight ─────────────────────────────────────`
- The rollout percentage uses **random bucketing with persistence** — users are assigned to a bucket once and stay there. This is why increasing from 10→20% adds users rather than re-randomizing, ensuring a stable user experience across sessions.
- The **Global Control Group exclusion** is a non-obvious gotcha: users in GCG are excluded from _all_ experiments including feature flag A/B tests, which can skew results if your GCG is large or unevenly distributed.
- Feature flag **properties** (not covered deeply in this FAQ but referenced) are the mechanism that lets product teams use flags as a remote config system, not just on/off toggles — worth expanding in a dedicated topic.
`─────────────────────────────────────────────────`
