---
name: feature-flags-faq
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/feature_flags/faq
indexed_at: '2026-04-05'
keywords:
  - flags
  - targeting
  - rollout
  - segmentation
  - testing
  - SDK
  - implementation
  - properties
  - buckets
  - canvas
triggers:
  - How to implement feature flags
  - Feature flag rollout strategy
  - Targeting users with flags
  - A/B testing with feature flags
  - Feature flag segmentation
---
The `learn` skill isn't applicable here. Let me process the documentation content directly.

`★ Insight ─────────────────────────────────────`
- Topic files in Nick's architecture are "atomic knowledge units" stored under `skills/{id}/references/` — they're designed for fast retrieval, so removing Jekyll template syntax (`{% tabs %}`, `{% sdk_min_versions %}`) and navigation chrome is essential
- The three-audience structure (Marketing/Product/Engineering) maps well to Nick's role-based routing — preserving these distinctions helps the semantic search route queries to the right agent
`─────────────────────────────────────────────────`

---

## Feature Flags FAQ

### Platform Support

Supported platforms and minimum SDK versions:

| Platform | Min Version |
|----------|-------------|
| Swift (iOS) | 5.9.0 |
| Android | 24.2.0 |
| Web | 4.6.0 |
| Unity | 4.1.0 |
| Cordova | 5.0.0 |
| React Native | 4.1.0 |
| Flutter | 6.0.0 |
| Roku | 1.0.0 |

### Implementation Effort

Feature flags integrate in minutes — the bulk of effort is building the underlying feature. The flag itself is a simple `IF`/`ELSE` check:

```javascript
// JavaScript
import { getFeatureFlag } from "@braze/web-sdk";

if (getFeatureFlag("new_shopping_cart").enabled) {
    // Show new feature
} else {
    // Show old feature
}
```

```java
// Java
if (braze.getFeatureFlag("new_shopping_cart").getEnabled()) {
  // Show new feature
} else {
  // Show old feature
}
```

```kotlin
// Kotlin
if (braze.getFeatureFlag("new_shopping_cart")?.enabled == true) {
  // Show new feature
} else {
  // Show old feature
}
```

### Use Cases by Team

**Marketing**: Coordinate product announcements so messaging (email, push) targets only the users who have the feature enabled. Example: roll out a loyalty program to 10% of users, then send a campaign to that exact 10% via Canvas Feature Flag step.

**Product**: Gradual rollouts and soft launches to monitor KPIs before full release. Use feature flag properties to remotely populate dynamic content (deep links, text, images). Run A/B split tests via Canvas to measure conversion impact.

**Engineering**: Reduce release risk — ship code hidden behind a flag, then enable/disable from the Braze dashboard without a new deployment or app store approval.

---

### Targeting and Rollouts

**Targeting a specific group**: Create a Braze segment (by email, `user_id`, or any attribute), then deploy the feature flag to 100% of that segment.

**Rollout percentage behavior** (uses random buckets, consistent across devices/sessions):
- Increasing rollout (e.g., 10% → 20%): original 10% stay enabled, new 10% added
- Decreasing rollout (e.g., 20% → 10%): only the original 10% remain enabled
- Setting to 0%: removes all users; useful for disabling on bug discovery

Users do not flip-flop between sessions — bucket assignment is stable for the lifetime of the feature flag.

---

### Technical Details

**SDK initialization**: Feature flags cannot control SDK initialization. The SDK must be initialized first to download and sync feature flags. You cannot use feature flags to limit which users are tracked in Braze.

**Refresh frequency**: Flags refresh at session start and on active user change. Manual refresh is available via the SDK's refresh method. Rate limited to once every 5 minutes. Avoid over-refreshing; refresh only before user interaction with new features or periodically as needed.

**Offline availability**: After a refresh, flags are stored locally on the device and accessible offline.

**Mid-session refresh handling**: Flags may refresh mid-session. To control UI re-rendering behavior, listen for feature flag update events and decide whether to re-render based on which flags changed.

**Global Control Group**: Users in the Global Control Group cannot receive feature flag experiments. They are excluded from all Feature Flag experiment targeting.

`★ Insight ─────────────────────────────────────`
- The rollout bucketing explanation (stable 10% preserved when scaling up/down) is a non-obvious behavior that's high-value to preserve verbatim — semantic search will surface it when engineers ask "why are some users not seeing my feature after I increased rollout"
- Stripping Jekyll's `{% tabs %}` template tags while keeping all three language examples avoids losing multi-SDK coverage that routing agents may need to answer language-specific questions
`─────────────────────────────────────────────────`
