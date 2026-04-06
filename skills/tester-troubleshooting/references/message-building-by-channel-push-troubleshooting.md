---
name: message-building-by-channel-push-troubleshooting
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/push/troubleshooting
indexed_at: '2026-04-05'
keywords:
  - push
  - subscription
  - segment
  - frequency-capping
  - push-token
  - deep-links
  - rate-limits
  - delivery
  - campaign
  - device
triggers:
  - troubleshoot missing push notifications
  - push not delivering to users
  - push click doesn't open app
  - push link opening in-app instead of browser
  - debug push delivery issues
---
## Push Troubleshooting

### Missing Push Notifications — Checklist

**1. Push Subscription Status**
- Check user profile → Engagement tab → **Push Registered For** field
- User must be **subscribed or opted-in** to receive pushes
- Export via API to inspect push token objects:
  - `POST /users/export/ids` (by identifier)
  - `POST /users/export/segment` (by segment)
- Token objects include push enablement info per device

**2. Segment Membership**
- Confirm user falls into the targeted segment (real-time, ever-changing)
- Use **User Lookup** when building a segment to verify membership
- Check user profile for current segment list

**3. Frequency Caps**
- Global frequency capping may have been hit for the time frame
- Check: Dashboard → Global Frequency Capping
- Campaign Details shows count of users impacted by caps

**4. Rate Limits**
- Campaign or Canvas rate limits may exclude the user
- Verify rate limit settings in campaign configuration

**5. Control Group**
- Single-channel campaigns and Canvases may have a control group
- Check variant distribution for control group existence
- Filter by "in campaign control group" → export segment → verify user ID

**6. Valid Push Token**
- Device must have a valid push token; no token = no delivery
- Missing/expired tokens silently drop notifications

**7. Push Notification Type Mismatch**
| Target | Correct Type |
|---|---|
| FireTV | Kindle push (not Android) |
| Android | Android push (not iOS) |
| iOS | APNs / Swift SDK |

**8. Current App Session (Testing)**
- Internal test users must be **logged into the relevant app** when testing
- Wrong session → wrong push received or no push at all

---

### Push Click Doesn't Open the App

**Android**
1. Confirm campaign is configured to open app on click
2. Check `braze.xml`: `com_braze_handle_push_deep_links_automatically`
   - `true` → Braze SDK handles deep links automatically
   - `false` → app needs a broadcast receiver for push received/opened intents — verify receiver is implemented
3. Enable verbose logging, reproduce, send logs + `braze.xml` + `AndroidManifest.xml` to Support

**iOS**
1. Confirm campaign is configured to open app on click
2. Deep linking is handled by standard Braze push integration — verify implementation including custom delegate handling
3. Enable verbose logging, reproduce, send logs to Support

---

### Push Links Unexpectedly Open In-App Instead of Browser

**Check Campaign Config**
- Campaign/Canvas step → On-click behavior → confirm **"Open web URL inside mobile app"** is NOT selected
- Default behavior by SDK version:
  - iOS ≥ 2.29.0 / Android ≥ 2.0.0: option selected by default (opens in web view)
  - Earlier versions: option cleared by default (opens in device browser)

**Check Push Integration**
- Review push delegate implementation for correctness
- Custom delegate handling may be overriding default browser behavior
- If misconfigured, links route to in-app web view regardless of campaign settings

`★ Insight ─────────────────────────────────────`
- The checklist ordering matters: subscription status and segment membership are the most common causes and cheapest to verify — always check these first before investigating rate limits or tokens.
- The `com_braze_handle_push_deep_links_automatically` flag in `braze.xml` is a binary fork in Android push architecture — `true` delegates everything to Braze, `false` requires custom broadcast receiver logic. Missing the receiver entirely is a silent failure mode.
- SDK version-gated defaults (iOS 2.29.0 / Android 2.0.0) for "open web URL inside mobile app" are a common source of regression after SDK upgrades — behavior changes without any code change.
`─────────────────────────────────────────────────`
