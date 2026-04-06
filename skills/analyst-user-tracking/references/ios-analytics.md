---
name: ios-analytics
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/analytics/uninstall_tracking
indexed_at: '2026-04-05'
keywords:
  - uninstall
  - tracking
  - push
  - notification
  - background
  - ios
  - analytics
  - braze
  - payload
  - capabilities
triggers:
  - how to track app uninstalls
  - enable uninstall tracking ios
  - configure push notification analytics
  - set up background push notifications
  - test uninstall tracking
---
`★ Insight ─────────────────────────────────────`
- Topic files are atomic knowledge units — stripping Jekyll templating (`{% %}`, `{{site.baseurl}}`) is essential since these won't render outside the docs build system
- The original mixes setup steps with test steps; keeping them clearly separated makes this more scannable as a reference
`─────────────────────────────────────────────────`

## iOS Uninstall Tracking

Uninstall tracking uses background push notifications with a Braze flag in the payload to collect analytics.

### Step 1: Enable Background Push

In Xcode, go to **Project Settings → Capabilities → Background Modes** and enable **Remote notifications**.

### Step 2: Ignore Braze Internal Pushes

Ensure your app does not take unwanted actions when receiving Braze's uninstall tracking background pushes. These are internal notifications and should be silently ignored by your push handling code.

### Step 3: Test from the Dashboard

1. Go to **Campaigns**, create a push notification campaign, and select **iOS push**.
2. On the **Settings** page, add key `appboy_uninstall_tracking` with value `true` and check **Add Content-Available Flag**.
3. Use the **Preview** page to send yourself a test push.
4. Verify your app takes no unwanted automatic actions on receipt.

> **Note:** Test pushes won't update your user profile. If badge counts are enabled, a badge number will accompany the test push — but actual Braze uninstall tracking pushes do **not** set a badge number.

### Step 4: Enable Uninstall Tracking

Enable uninstall tracking from the Braze dashboard under the user data and analytics tracking settings.

### How It Works

| Mechanism | Detail |
|-----------|--------|
| Delivery method | Background push (silent) |
| Payload flag | `appboy_uninstall_tracking: true` with `content-available` |
| Purpose | Analytics only — no user-visible notification |
| User profile impact | No updates triggered |
