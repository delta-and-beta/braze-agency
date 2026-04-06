---
name: ios-analytics-uninstall-tracking
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/analytics/uninstall_tracking
indexed_at: '2026-04-05'
keywords:
  - uninstall-tracking
  - background-push
  - notifications
  - iOS
  - APNs
  - payload
  - Braze
  - tracking
  - dashboard
triggers:
  - how to enable iOS uninstall tracking
  - set up background push notifications for uninstalls
  - configure uninstall tracking in Braze
  - test uninstall tracking notifications
---
## iOS Uninstall Tracking

Uninstall tracking uses background push notifications with a Braze flag in the payload to collect analytics.

### Step 1: Enable Background Push

In Xcode, enable the **Remote notifications** option under **Capabilities → Background Modes**.

### Step 2: Ignore Braze Internal Pushes

Ensure your app takes no unwanted actions when it receives uninstall tracking notifications. These are background pushes Braze sends silently — your app logic must explicitly ignore them.

Check for the `appboy_uninstall_tracking` key in the push payload and skip any business logic when it's present.

### Step 3: Test from the Dashboard

1. Create a push notification campaign targeting **iOS push**.
2. On the **Settings** page, add key `appboy_uninstall_tracking` with value `true`, and check **Add Content-Available Flag**.
3. Use **Preview** to send a test push to yourself.
4. Verify your app performs no unwanted automatic actions on receipt.

> **Note:** Test pushes do not update user profiles. If badge counts are enabled, a badge number is sent with the test push — but real uninstall tracking pushes do **not** set a badge number.

### Step 4: Enable in Dashboard

Navigate to the uninstall tracking settings in the Braze dashboard under **Data & Analytics → Tracking → Uninstall Tracking** and enable it for your app.

### How It Works

- Braze sends a silent background push with `content-available: 1`
- Payload contains the flag `appboy_uninstall_tracking: true`
- If the device receives it, the app is still installed — Braze records no uninstall
- If delivery fails (APNs reports the token as invalid), Braze marks the user as uninstalled
