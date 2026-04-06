---
name: ios-in-app-messaging
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/in-app_messaging/troubleshooting
indexed_at: '2026-04-05'
keywords:
  - impressions
  - delivery
  - display
  - analytics
  - logging
  - delegate
  - campaign
  - rate-limiting
  - segmentation
  - triggers
triggers:
  - analytics not logging
  - message did not display
  - impressions lower than expected
  - troubleshoot in-app messaging
  - debug delivery issues
---
# In-App Messaging Troubleshooting

## Analytics Not Logging

If you set a delegate to manually handle message display or click actions, you must also **manually log clicks and impressions** on the in-app message — they won't be tracked automatically.

## Impressions Lower Than Expected

Triggers sync to the device on session start, creating a race condition if users log an event or purchase immediately after starting a session. **Workaround:** Change the campaign to trigger off session start, then segment by the intended event/purchase. The in-app message will then appear on the *next* session start after the event occurs.

---

## Message Did Not Display

Break the problem into two stages: **delivery** then **display**.

### Stage 1: Delivery Troubleshooting

The SDK requests in-app messages from Braze servers on session start.

**Steps to verify delivery:**
1. Add yourself as a test user in the dashboard.
2. Create an in-app message campaign targeting your user.
3. Start a new session in the app.
4. Check **Event User Logs** for the SDK Request tied to your session start:
   - Triggered messages → look for `trigger` in **Requested Responses**
   - Original messages → look for `in_app` in **Requested Responses**
5. Confirm the correct messages appear in the response data.

**Messages not being requested:**
- The app may not be tracking sessions correctly — in-app messages refresh on session start.
- Verify the app is actually starting a session given your configured session timeout.

**Messages not being returned (campaign targeting issues):**

| Issue | Where to Check |
|-------|----------------|
| User not in segment | User's **Engagement** tab → **Segments** |
| User already received message, not re-eligible | Campaign **Delivery** step → re-eligibility settings |
| Frequency cap hit | Campaign frequency cap settings |
| User in control group | Create a segment with "received campaign variant = Control" filter |

> For integration testing, opt out of control groups to avoid false negatives.

### Stage 2: Display Troubleshooting

Messages are delivered but not shown — device-side logic is blocking display.

| Cause | Resolution |
|-------|------------|
| Rate limiting | Default minimum interval between triggers is **30 seconds** |
| Custom delegate | Review delegate logic — it may be suppressing display |
| Failed image download | Ensure `SDWebImage` is integrated correctly; check device logs for download errors |
| Orientation mismatch | Ensure device orientation matches the orientation specified by the campaign |
