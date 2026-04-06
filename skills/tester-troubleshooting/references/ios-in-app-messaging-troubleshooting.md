---
name: ios-in-app-messaging-troubleshooting
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/in-app_messaging/troubleshooting
indexed_at: '2026-04-05'
keywords:
  - analytics
  - impressions
  - delivery
  - display
  - delegates
  - triggers
  - segments
  - frequency
  - eligibility
  - orientation
triggers:
  - troubleshoot message not displaying
  - fix analytics not logging
  - resolve lower impressions
  - configure message triggers
  - verify message delivery
---
# In-App Messaging Troubleshooting

## Analytics Not Logging

If you've set an in-app message delegate to manually handle display or click actions, you must **manually log clicks and impressions** on the in-app message — they won't be captured automatically.

## Impressions Lower Than Expected

Triggers sync to the device on session start. A race condition can occur if users log an event or purchase immediately after session start. **Workaround:** Change the campaign trigger to session start, then segment on the intended event/purchase. The message will deliver on the next session start after the event occurs.

---

## Message Did Not Display

Troubleshoot in two phases: **delivery** first, then **display**.

### Phase 1: Delivery

The SDK requests in-app messages from Braze servers on session start.

**Steps to verify delivery:**

1. Add yourself as a test user in the dashboard.
2. Set up an in-app message campaign targeted at your user.
3. Trigger a new session in your app.
4. Check the **Event User Logs** → find the SDK Request for your test user's session start event.
   - Triggered messages: look for `trigger` in **Requested Responses** under **Response Data**
   - Original messages: look for `in_app` in **Requested Responses** under **Response Data**
5. Verify correct in-app messages appear in the response data.

**Messages not being requested — check:**
- App may not be tracking sessions correctly (messages refresh on session start)
- Verify app is starting a session per your session timeout configuration

**Messages not being returned — check:**
- **Segment**: User's **Engagement** tab → confirm correct segment appears under **Segments**
- **Re-eligibility**: Campaign Composer → **Delivery** step → re-eligibility settings may block repeat delivery
- **Frequency cap**: Campaign frequency cap settings may be blocking delivery
- **Control group**: Create a segment with "received campaign variant = Control" filter to check if user landed in the control group. For integration testing, opt out of control groups.

### Phase 2: Display

Messages are delivered but not shown — device-side logic is blocking display.

| Cause | Resolution |
|---|---|
| Rate limiting | Minimum interval between triggers defaults to **30 seconds** |
| Delegate interference | Review your delegate — ensure it's not suppressing display |
| Failed image download | Check device logs; verify `SDWebImage` is integrated correctly |
| Orientation mismatch | Ensure device orientation matches the orientation specified in the message |
