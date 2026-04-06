---
name: analytics-tracking
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/analytics/tracking/uninstall_tracking
indexed_at: '2026-04-05'
keywords:
  - uninstall
  - tracking
  - analytics
  - campaign
  - segmentation
  - detection
  - reinstall
  - filtering
  - session
  - push
triggers:
  - enable uninstall tracking
  - view uninstall analytics
  - filter uninstalled users
  - segment by uninstall
  - configure uninstall detection
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's architecture are "atomic knowledge units" — they live inside `skills/{id}/references/*.md` and are designed to be self-contained. The key discipline here is **stripping navigational chrome** (Jekyll liquid tags, image_buster paths, internal cross-links) while preserving the operational facts that an agent needs to answer questions.
`─────────────────────────────────────────────────`

---

## Uninstall Tracking Overview

Braze uninstall tracking provides two views:
- **App-level**: Daily uninstall statistics in a time series graph on the Home page
- **Campaign-level**: Daily uninstall counts per campaign on the Campaign Details/Analytics page

**Prerequisites**: Must be opted in per-app via **Settings > App Settings**. Supported on iOS, Android, and Fire OS.

---

## How Detection Works

Braze detects uninstalls via signals from **Firebase Cloud Messaging (FCM)** or **Apple Push Notification Service (APNs)** indicating the app is no longer installed.

When Global Uninstall Tracking is enabled, Braze sends a **nightly silent background push** to users who haven't recorded a session or received a push in the past 24 hours. This push is invisible to users (unless they've disabled silent pushes).

On detecting an uninstall:
1. The app's total uninstall count increments by one
2. The uninstall count for every campaign the user successfully received in the past 24 hours increments by one
3. If a user received 3 campaigns in 24 hours before uninstalling, all 3 campaign counts increment

**Important limitation**: FCM and APNs can notify Braze of uninstalls at any point — not necessarily in real time. Use uninstall tracking for **directional trends**, not precise statistics.

---

## User Profile Behavior

| Event | Effect on Profile |
|---|---|
| Uninstall detected | User tagged as "uninstalled" |
| App reinstalled but not opened | Uninstall tag remains |
| User opens reinstalled app (new session) | Uninstall tag removed |

The **Has Not Uninstalled** campaign filter excludes tagged users.

The best-estimated uninstall time is stored as a **standard attribute** on the user profile — usable for win-back campaign segmentation.

---

## Enabling Uninstall Tracking

1. Go to **Settings > App Settings**
2. Enable uninstall tracking per app

**SDK configuration:**
- **iOS (Swift)**: Use the utility method in the developer guide for tracking uninstalls
- **Android**: Use [`isUninstallTrackingPush()`](https://braze-inc.github.io/braze-android-sdk/kdoc/braze-android-sdk/com.braze.models.push/-braze-notification-payload/is-uninstall-tracking-push.html) to detect uninstall-tracking pushes

---

## Filtering and Segmenting by Uninstalls

The **Uninstalled** segment filter accepts a time range. Because exact uninstall time is uncertain, use **wider time ranges** to ensure full coverage.

To view uninstall data by segment on the Home page:
1. Go to **Home > Performance Over Time**
2. Set **Statistics For** → Uninstalls
3. Set **Breakdown** → By Segment
4. Select segments in **Breakdown Values**

> Apps without uninstall tracking enabled report uninstalls only from push-targeted users, so actual totals may be higher than displayed.

---

## Campaign-Level Uninstall Tracking

Shows users who received a specific campaign and subsequently uninstalled within the selected timeframe. Found on the **Campaign Analytics** page.

- **Multichannel campaigns**: breakdowns by channel
- **Multivariate campaigns**: breakdowns by variant

---

## Troubleshooting

### Spike in uninstalls

**Likely cause**: FCM/APNs revoking old tokens in bulk (irregular schedule, for privacy reasons).

**How to validate**: Compare uninstall spike against **direct push open rate**:
- If uninstalls spike but push opens are stable → likely token revocation, not real user behavior
- If both increase → likely genuine uninstalls

**For APNs specifically**: Check user profiles for the `BadDeviceToken` push error. Bulk occurrences of this error coinciding with a spike indicate genuine uninstalls (token invalid = app uninstalled).

### APNs count mismatch

Apple uses a **randomized delay** before reporting an invalid push token, so APNs may return successful responses after an app is uninstalled for some period. Discrepancies between Braze counts and APNs counts are expected — this is by design to protect user privacy.

### Confirming a specific campaign caused uninstalls

1. Check campaign analytics for messages sent around the time of the spike
2. On the Home page, use **Uninstalls by Segment** breakdown
3. If tracking lapsing users with segment analytics enabled, compare that segment's uninstall trend to the overall app trend
