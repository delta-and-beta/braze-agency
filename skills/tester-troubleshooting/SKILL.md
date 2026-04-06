---
name: tester-troubleshooting
description: >-
  Systematic diagnosis of push delivery failures, segment calculation issues,
  and channel-specific error codes with resolution workflows.
metadata:
  role: braze-tester
  topics:
    - message-building-by-channel-push-troubleshooting
    - message-building-by-channel-push-push-error-codes
    - engagement-tools-segments-troubleshooting
    - engagement-tools-testing-race-conditions
    - message-building-by-channel-push-faq
    - message-building-by-channel-banners-faq
    - engagement-tools-templates-and-media-faqs
    - ios-in-app-messaging-troubleshooting
    - api-errors
    - api-network-connectivity-issues
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
This skill synthesizes 10 topic reference files into a single navigable guide. The key challenge: the topics span orthogonal failure domains (push, segments, IAM, API) that share a common debugging *approach* (root cause analysis) but have completely different *resolution paths*. Good structure separates the channel-specific content while surfacing the shared diagnostic workflow at the top.
`─────────────────────────────────────────────────`

Here is the generated skill file:

---

# Troubleshooting & Error Resolution

## Overview

This skill covers systematic diagnosis and resolution of delivery failures, calculation errors, and channel-specific error conditions across Braze campaigns and Canvases. The lens is **root cause analysis**: start with observable symptoms, trace through the delivery pipeline to identify the failure layer, then apply the appropriate resolution.

Use this skill when:
- A push notification, in-app message, or banner is not delivering
- A segment reports unexpected membership or throws a launch error
- API or webhook requests return 4XX/5XX responses
- Analytics events are missing or not logging
- Campaign behavior is inconsistent or order-dependent (race conditions)
- An error code needs interpretation and a remediation path

---

## Diagnostic Mindset

Before diving into channel-specific checklists, establish the failure layer:

| Layer | What to check first |
|-------|---------------------|
| **User eligibility** | Subscription state, opt-in status, push token validity |
| **Segment/audience** | Filter complexity, reachability calculation errors |
| **Platform/channel** | Channel-specific error codes (FCM, APNs, IAM delegate) |
| **Infrastructure** | API connectivity, DNS resolution, webhook auth |
| **Timing/ordering** | Race conditions, event sequencing, step delays |

---

## Push Delivery Failures

### Diagnostic Checklist

Work through these in order before escalating:

**1. Push Subscription Status**
- Navigate to user profile → Engagement tab → **Push Registered For** field
- User must be **subscribed** and **push enabled** on device
- Foreground push requires explicit opt-in; background push does not

**2. Token Validity**
- Each device has one push token per app; tokens change on reinstall or OS-level revoke
- When a second user logs into a device, the push token is **reassigned to the new user** — the first user loses reachability via push until they log into another device
- Stale tokens surface as `InvalidRegistration` (FCM) or `BadDeviceToken` (APNs)

**3. Segment Reachability**
- Filter the segment to **Push Enabled is true** to isolate push-reachable users
- Confirm the campaign targets the correct app (iOS vs. Android tokens are not interchangeable)

**4. Message Payload**
- APNs hard limit: **4 KB** per notification payload
- Large image attachments or deeply nested `extras` can silently truncate

### Error Code Reference

**Android (FCM)**

| Code | Root Cause | Resolution |
|------|-----------|------------|
| `MismatchSenderId` | Token registered to different sender | Re-register token with correct FCM project |
| `InvalidRegistration` | Token malformed or app uninstalled | Token will be pruned automatically; no action needed |
| `MessageTooBig` | Payload exceeds 4 KB | Reduce extras or remove image URL from payload |
| `InvalidParameters` | Malformed request fields | Validate data key/value types (strings only) |
| `QuotaExceeded` | FCM per-device rate limit hit | Back off; reduce send frequency for this device |

**iOS (APNs)**

| Code | Root Cause | Resolution |
|------|-----------|------------|
| `BadDeviceToken` | Token invalid or expired | Token will be pruned; confirm push cert targets correct environment |
| `DeviceTokenNotForTopic` | Bundle ID mismatch | Verify APNs certificate matches app's bundle ID |
| `ExpiredProviderToken` | APNs auth key expired | Rotate APNs key in Braze dashboard under **App Settings** |
| `TooManyRequests` | APNs rate limited | Reduce message frequency; check for looping Canvases |
| `PayloadTooLarge` | Exceeds 4 KB | Trim notification body, remove media attachment |

### Multi-Device / Multi-User Scenarios

- A user logging out does **not** release the push token — they remain reachable until another user logs in on the same device
- Each device registration call should pass `changeUser()` to correctly transfer token ownership
- If the same push token appears on multiple profiles, the **most recent registration wins**

---

## Segment Troubleshooting

### Error: Target Audience Too Complex to Launch

**Symptom:** Campaign or Canvas refuses to launch with a complexity error.

**Root cause:** Segment filters are translated into a SQL-like query internally. Deeply nested OR/AND groups, many `Custom Attribute` filters, or combined segment membership conditions can exceed Braze's query character threshold.

**Resolution workflow:**
1. Identify the most complex filter group in the segment definition
2. Split compound conditions: extract sub-segments and use **Segment Membership** filters to compose them
3. Replace cascading OR conditions with a dedicated segment, then reference it
4. Re-test segment size estimate after each simplification — the estimate triggers the same query

**Prevention:** Prefer `AND` over `OR` chains; use pre-computed segments for complex cohorts and reference them by membership.

---

## In-App Messaging Troubleshooting

### Analytics Not Logging

**Root cause:** When a custom IAM delegate is set to handle display or click actions manually, Braze's automatic analytics tracking is bypassed.

**Resolution:** Call these methods explicitly whenever the delegate intercepts an event:

```swift
// Swift — must be called manually when delegate handles display
AppboyBinding.logInAppMessageImpression(inAppMessage)

// Swift — must be called manually when delegate handles click
AppboyBinding.logInAppMessageClicked(inAppMessage)
```

```kotlin
// Kotlin
Braze.getInstance(context).logInAppMessageImpression(inAppMessage)
Braze.getInstance(context).logInAppMessageClick(inAppMessage)
```

**Key rule:** If a delegate method returns `.discard` or `.reenqueue`, the SDK considers the event "handled" and skips automatic logging — manual calls are required.

---

## API & Webhook Errors

### 4XX Client-Side Errors

| Code | Meaning | Common Cause | Resolution |
|------|---------|--------------|------------|
| `400` | Bad Request | Malformed JSON, invalid field types | Validate request body schema |
| `401` | Unauthorized | Missing or invalid API key | Verify `Authorization: Bearer <key>` header |
| `403` | Forbidden | Key lacks required permissions | Add required endpoint permission in Braze dashboard |
| `404` | Not Found | Wrong endpoint URL, wrong app group | Confirm SDK endpoint matches your Braze instance |
| `422` | Unprocessable | Valid JSON but fails business validation | Check field constraints (e.g., `external_id` length) |
| `429` | Rate Limited | Exceeded per-minute request cap | Implement exponential back-off; batch requests |

### Connected Content — Network Connectivity

**DNS configuration matters:** Braze's API endpoints use Fastly CDN routing to the nearest POP based on DNS. Misconfigured DNS can route requests to a geographically distant endpoint, causing latency spikes or timeouts.

- Use DNS servers **co-located with your application servers** (not public resolvers like `8.8.8.8` from a different region)
- Test endpoint resolution with `dig api.braze.com` from the same host that runs your Connected Content requests
- If responses are slow, check whether your DNS TTL is long enough to cache the Fastly POP address

**Timeout handling:** Connected Content requests time out after **2 seconds** by default. For slower endpoints, add `:timeout X` to the Connected Content tag (max 30 seconds):

```liquid
{% connected_content https://api.example.com/data :timeout 10 :save result %}
```

---

## Race Conditions & Timing Issues

A race condition occurs when campaign behavior depends on the **sequence or timing** of concurrent events, not just their occurrence.

### Common Braze Race Condition Patterns

| Scenario | Symptom | Resolution |
|----------|---------|------------|
| Canvas step fires before profile attribute updates | Personalization shows stale data | Add a **Delay** step (≥ 5 min) after the event trigger |
| Two API calls update the same attribute simultaneously | Attribute value is unpredictable | Serialize updates; use event properties instead of attribute mutations |
| Segment membership evaluated at send-time vs. entry-time | User receives message after exiting the target cohort | Switch to **entry-time segment membership** evaluation |
| Purchase event and custom event arrive out of order | Triggered campaign misses eligibility | Use a 1-step Canvas with an action-based entry instead of scheduled |

**Debugging approach:** Add timestamp logging to both the triggering event and the message send event. If the delta between trigger and delivery is inconsistent, timing is the root cause.

---

## Templates & Media

### Storage and Limits

| Resource | Limit |
|----------|-------|
| Asset file size | 5 MB maximum per file |
| Asset storage | No total storage cap |
| Asset retention | Retained for the full duration of your Braze contract |
| Push payload | 4 KB (APNs and FCM) |
| Connected Content timeout | 2 s default, 30 s max |

Assets are not automatically expired. If an asset URL returns 404 in a live campaign, the asset was manually deleted from the Media Library.

---

## Quick Diagnostic Reference

```
Push not delivered?
  → Check Push Registered For field on user profile
  → Look up error code in FCM/APNs table above
  → Verify token ownership (multi-user device scenario)

Segment won't launch?
  → Simplify filter nesting
  → Extract sub-segments, compose with Segment Membership filters

IAM analytics missing?
  → Confirm delegate calls logImpression/logClick manually

API returning 4XX?
  → 401 → check API key header
  → 429 → add back-off, batch requests
  → 404 → verify endpoint URL matches your Braze instance region

Inconsistent behavior across sends?
  → Check for timing dependencies
  → Add Delay steps after attribute-writing events
  → Review Canvas entry evaluation timing
```

---

`★ Insight ─────────────────────────────────────`
Notice how the Quick Diagnostic Reference at the bottom mirrors the "failure layer" table at the top — users who scan top-down get the conceptual framework first, users who arrive mid-investigation can jump straight to the decision tree. This bidirectional navigation pattern is worth repeating in dense reference skills: orient → drill down → escape hatch at the bottom.
`─────────────────────────────────────────────────`
