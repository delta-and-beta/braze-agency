---
name: tester-push-validation
description: 'Push notification testing, unit tests, and troubleshooting across platforms.'
metadata:
  role: braze-tester
  topics:
    - legacy-ios-push-testing
    - legacy-ios-push-unit-tests
    - legacy-ios-push-troubleshooting
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
The `plugin-dev:skill-development` guidelines specify: SKILL.md body should be lean (1,500–2,000 words), use imperative form (no "you should"), and explicitly reference the `references/` topic files so Claude knows where to find atomic detail. Detailed troubleshooting trees and unit test boilerplate belong in references, not the skill body.
`─────────────────────────────────────────────────`

Here is the generated skill body:

---

# Push Notification Testing

## Overview

This skill covers quality assurance for push notification delivery in Braze-integrated applications. Apply it when verifying that push notifications reach devices correctly, when writing or reviewing unit tests for push integration code, and when diagnosing delivery failures across iOS and Android platforms.

The perspective throughout is that of a **quality assurance engineer**: delivery is not confirmed until it is measurably verified, failures have deterministic root causes, and every platform integration requires explicit test coverage before it can be considered complete.

## Scope

This skill synthesizes three interconnected domains:

| Domain | What it covers |
|--------|----------------|
| **Command-Line Push Testing** | Sending test pushes via CURL and the Braze REST API to validate end-to-end delivery without a UI |
| **Push Unit Tests (iOS)** | Writing and interpreting unit tests for `AppDelegate` push integration using the iOS Legacy SDK |
| **Push Troubleshooting** | Structured diagnosis of delivery failures, credential errors, token issues, and platform-specific edge cases |

For detailed reference material on each domain, see:
- **`references/push-testing-cli.md`** — CURL examples, required fields, API endpoint reference
- **`references/push-unit-tests.md`** — iOS unit test patterns, mock structures, assertion strategies
- **`references/push-troubleshooting.md`** — Failure taxonomy, diagnostic decision tree, common fixes

---

## When to Apply This Skill

Apply this skill when the task involves any of the following:

- Sending a test push notification to a specific device or segment
- Writing unit tests that cover `application(_:didRegisterForRemoteNotificationsWithDeviceToken:)` or related delegate methods
- Diagnosing why a push notification is not being delivered or displayed
- Auditing push integration code for correctness before a release
- Reviewing whether CI test coverage adequately exercises the push registration flow

---

## Command-Line Push Testing

To test push delivery without using the Braze dashboard, send requests directly to the Braze Messaging API using CURL.

### Minimum Required Fields

Every test push request must include:
- `api_key` — REST API key with `messages.send` permission
- `external_user_ids` or `segment_id` — target audience
- `messages.apple_push` or `messages.android_push` — platform payload
- `alert` — the notification body string

Refer to **`references/push-testing-cli.md`** for complete CURL examples and the full field reference table.

### QA Checklist for CLI Tests

Before marking a CLI push test as passing:

- [ ] Response returns `HTTP 201` with a `dispatch_id`
- [ ] Notification appears on the physical or simulated device
- [ ] Badge count, sound, and deep link behave as configured
- [ ] Test was performed against the correct Braze instance URL (US vs EU clusters differ)

---

## Push Unit Tests (iOS)

Unit tests for push integration verify that `AppDelegate` correctly registers for notifications and forwards tokens to the Braze SDK. Passing tests confirm the code path is wired correctly; they do not confirm that APNs certificates are valid or that tokens are provisioned correctly in production.

### What to Test

Cover the following delegate methods:

1. `application(_:didFinishLaunchingWithOptions:)` — confirm `registerForRemoteNotifications()` is called
2. `application(_:didRegisterForRemoteNotificationsWithDeviceToken:)` — confirm token is forwarded to `Braze.shared`
3. `application(_:didFailToRegisterForRemoteNotificationsWithError:)` — confirm error is handled gracefully
4. `application(_:didReceiveRemoteNotification:fetchCompletionHandler:)` — confirm payload is passed to the SDK

### Test Isolation

Unit tests for push integration must not make real network calls or interact with APNs. Mock the following:
- `UNUserNotificationCenter` to simulate permission grants
- `Braze` SDK class to capture token forwarding calls
- `UIApplication` for registration state

See **`references/push-unit-tests.md`** for mock structures and assertion patterns for each delegate method.

### Interpreting Failures

| Failure type | Likely cause |
|--------------|--------------|
| `didRegisterForRemoteNotificationsWithDeviceToken` not called in test | Mock for `UIApplication.registerForRemoteNotifications()` not configured |
| Token not forwarded to SDK | `AppDelegate` calls SDK method on wrong thread or with wrong format |
| Test passes locally, fails in CI | Push entitlement missing from CI build configuration |

---

## Push Troubleshooting

Use a structured approach when diagnosing delivery failures. Work through layers in order: credentials → registration → payload → delivery → display.

### Layer 1: Credentials and Configuration

- Verify APNs certificate (or APNs Auth Key) is uploaded in the Braze dashboard under **App Settings → Push Notifications**
- Confirm the certificate matches the bundle ID of the target build (development vs production)
- For Android, confirm the FCM Server Key is correctly entered

### Layer 2: Device Token Registration

- Confirm `didRegisterForRemoteNotificationsWithDeviceToken` fires at app launch
- Log the raw token and verify it appears in the Braze user profile under **Engagement → Contact Information**
- A missing token means the device is not registered with APNs/FCM — check network conditions and provisioning profiles

### Layer 3: Payload Validity

- Validate JSON payload structure before sending; malformed payloads are silently rejected
- Confirm `content-available: 1` is set for background pushes
- Check that `mutable-content: 1` is set if using Notification Service Extensions

### Layer 4: Delivery Pipeline

- Check the Braze Message Activity Log for delivery errors against the `dispatch_id`
- Common error codes and their meanings are in **`references/push-troubleshooting.md`**
- Rate limits and quiet hours can block delivery silently — verify campaign settings

### Layer 5: Display

- Confirm the app is not in the foreground without a custom `UNUserNotificationCenterDelegate` handler
- Verify notification permissions are granted at the OS level (Settings → Notifications)
- Check that Do Not Disturb or Focus modes are not suppressing delivery

For a full diagnostic decision tree, see **`references/push-troubleshooting.md`**.

---

## QA Standards for Push Integration

Apply these standards when reviewing push integration code or test suites:

1. **Registration flow must have unit test coverage** — no exceptions; the absence of `didRegisterForRemoteNotificationsWithDeviceToken` coverage is a blocking defect
2. **Error handling must be explicit** — `didFailToRegisterForRemoteNotificationsWithError` must log or surface the error; silent failure is unacceptable
3. **CLI tests must precede release** — at minimum one successful end-to-end push delivery to a real device must be confirmed before shipping
4. **Credential rotation must trigger re-test** — any change to APNs certificates or FCM keys requires a full Layer 1–5 re-verification
5. **Platform parity** — if the app targets both iOS and Android, both platforms must pass delivery verification independently

---

## Additional Resources

### Reference Files

- **`references/push-testing-cli.md`** — CURL command templates, Braze API field reference, endpoint URLs by cluster
- **`references/push-unit-tests.md`** — iOS unit test examples, mock patterns, XCTest assertion strategies
- **`references/push-troubleshooting.md`** — Failure taxonomy, diagnostic decision tree, error code reference

---

`★ Insight ─────────────────────────────────────`
The layered troubleshooting structure (credentials → registration → payload → delivery → display) mirrors how the Braze backend itself processes a push — starting at the furthest upstream point makes it easier to isolate which layer introduced the failure without guessing. The QA standards section doubles as a review checklist, which means this skill file itself can serve as a rubric during code review.
`─────────────────────────────────────────────────`
