---
name: tracking-uninstall-tracking
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/analytics/tracking/uninstall_tracking
indexed_at: '2026-04-05'
keywords:
  - uninstall
  - tracking
  - detection
  - campaign
  - segment
  - push
  - reinstall
  - analytics
  - FCM
  - silent
triggers:
  - how to track uninstalls
  - enable uninstall tracking
  - detect app uninstalls
  - uninstall campaign analytics
  - segment uninstalled users
---
`★ Insight ─────────────────────────────────────`
- Braze's uninstall detection relies on **FCM/APNs signals**, making it inherently imprecise — counts are directional indicators, not exact metrics
- The nightly silent push mechanism is clever: it piggybacks on existing push infrastructure to get "liveness" signals without user-visible messages
- The reinstall edge case (tag persists until new session) is a common source of data confusion worth calling out explicitly
`─────────────────────────────────────────────────`

## Uninstall Tracking

Braze tracks app uninstalls at two levels:
- **App-level**: Daily time series on the Home page
- **Campaign-level**: Per-campaign uninstall counts on Campaign Analytics pages

Available for iOS, Android, and Fire OS. Must be opted into per-app in **Settings > App Settings**.

---

### How Detection Works

Braze detects uninstalls from two sources:

1. **Push campaign signals** — When FCM or APNs reports that a push to a user's device failed because the app is no longer installed
2. **Silent background push** (when Global Uninstall Tracking is enabled) — A daily silent push sent to users with no session or push in the past 24 hours; invisible to users

When an uninstall is detected:
- User is tagged as "uninstalled"
- The best estimated uninstall time is recorded as a standard attribute on the user profile (usable for win-back segments)
- The uninstall count increments for every campaign the user received in the past 24 hours

**Reinstall behavior**: The uninstall tag persists on the user profile until they start a new session in the reinstalled app. A user who reinstalls but never opens the app continues to appear as uninstalled.

---

### Enabling Uninstall Tracking

1. Go to **Settings > App Settings**
2. Enable uninstall tracking per app

**SDK configuration:**
- **iOS**: Use the `isUninstallTrackingPush` utility method (Swift SDK)
- **Android**: Use [`isUninstallTrackingPush()`](https://braze-inc.github.io/braze-android-sdk/kdoc/braze-android-sdk/com.braze.models.push/-braze-notification-payload/is-uninstall-tracking-push.html) from `BrazeNotificationPayload`

---

### Segment Filtering

Use the **Uninstalled** filter to target users who uninstalled within a time range.

> **Recommendation**: Use wider time ranges for uninstall filters — the exact uninstall timestamp is an estimate, so narrow ranges may miss users.

To view uninstall stats by segment on the Home page:
1. Go to **Performance Over Time** graph
2. **Statistics For** → Uninstalls
3. **Breakdown** → By segment
4. Select segments in **Breakdown Values**

> Apps without uninstall tracking enabled only report uninstalls from users who received push notifications, so totals may be understated.

---

### Campaign-Level Uninstall Tracking

Shows how many users received a campaign and then uninstalled within the selected timeframe. Located on the campaign's **Campaign Analytics** page.

- Multichannel campaigns: breakdowns by channel
- Multivariate campaigns: breakdowns by variant

**Attribution window**: If a user receives 3 campaigns in a 24-hour period and then uninstalls, all 3 campaigns are incremented.

**Important**: FCM and APNs can report uninstalls at any point — use campaign uninstall counts to detect directional trends, not precise statistics.

---

### Troubleshooting

**Spike in uninstalls?**
FCM and APNs revoke old push tokens at irregular intervals, which can cause artificial spikes. To distinguish genuine uninstalls from token revocations:
- Monitor uninstall counts alongside **direct push open rate**
- If uninstalls spike but push opens remain stable → likely a partner revoking old tokens, not real uninstalls

**Confirming genuine uninstalls (APNs):**
Check user profiles for the `BadDeviceToken` push error. Bulk `BadDeviceToken` errors coinciding with an uninstall spike indicate genuine uninstalls (invalid token = app no longer installed).

**Discrepancy between Braze uninstalls and APNs numbers:**
Expected behavior. Apple intentionally delays reporting invalid push tokens on a randomized schedule to protect user privacy, so APNs may continue returning success responses for a period after an app is uninstalled. Braze's count reflects when APNs/FCM actually notified Braze, which may lag behind the real uninstall event.
