---
name: engineer-push-notifications
description: >-
  Implements push notification delivery including rich push, push stories, deep
  linking, and silent notifications.
metadata:
  role: braze-engineer
  topics:
    - push-notifications-customization
    - push-notifications-rich
    - push-notifications-push-stories
    - push-notifications-silent
    - push-notifications-deep-linking
    - push-notifications-ios-deep-linking-guide
    - push-notifications-deep-linking-troubleshooting
    - push-notifications-subscription-states
    - push-notifications-soft-push-prompts
    - push-notifications-logging-message-data
    - push-notifications-examples
    - push-notifications-sending-test-messages
    - push-notifications-troubleshooting
    - developer-guide-push-notifications
    - legacy-ios-push-integration
    - legacy-ios-push-implementation-guide
    - legacy-ios-push-silent-push-notifications
    - legacy-ios-push-push-story
    - legacy-ios-push-push-primer
    - legacy-ios-push-customization
    - legacy-ios-push-rich-notifications
    - legacy-ios-push-custom-sounds
    - legacy-ios-push-badges
    - legacy-ios-push-advanced-settings
    - legacy-ios-push-action-buttons
    - legacy-ios-push-ignoring-internal-push
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- The writing-skills guide distinguishes between a skill (reusable technique/reference) and a narrative. This skill file should read like a fast-lookup reference, not a walkthrough — structured so Claude can scan the table, find the right sub-topic, and act immediately.
- The "lens" concept in Nick's architecture is the mental model an agent applies to all topics. For push engineering, that lens is "delivery mechanics and platform specifics" — so the skill should orient every sub-topic around what affects delivery (permissions, payloads, extensions, states), not UX or marketing copy.
`─────────────────────────────────────────────────`

Here is the generated skill file body:

---

# Push Notification Engineering

## Overview

This skill covers **push notification delivery for Braze** — from initial permission prompting through payload construction, platform-specific rendering, and background delivery. The operative lens is **delivery mechanics and platform-specific implementation**: what gets a notification to a device, what determines whether it renders, and what causes silent or visible failures.

Use this skill when working with iOS, Android, or Web push integrations involving Braze SDK configuration, rich media attachments, deep link routing, background processing, or subscription state management.

---

## Scope

| Layer | What's covered |
|---|---|
| Permissions & states | Subscription states, push enabled status, soft prompts, push primers |
| Payload construction | Rich push, custom sounds, badges, action buttons, key-value extras |
| Silent delivery | Background processing, uninstall tracking, geofence sync, internal push filtering |
| Advanced formats | Push Stories (multi-page), Rich Notifications (Service Extension) |
| Deep linking | Custom schemes, universal links, fallback behavior, troubleshooting |
| Testing & debugging | Test sends, troubleshooting by platform, logging |

---

## Delivery Model: Two Permission Layers

Braze tracks push readiness through two independent layers. Both must be satisfied for a push to deliver:

| Layer | What it tracks | How it's set |
|---|---|---|
| **Push subscription state** | User's preference (opted in/out) | Set programmatically or via Braze dashboard |
| **Push enabled status** | Whether a valid device token exists | Set automatically when OS permission granted |

A user can be subscribed but not push-enabled (token invalidated, app reinstalled). Always check both layers when debugging delivery gaps.

---

## Platform-Specific Implementation Index

### iOS

| Feature | Requirement | Key Detail |
|---|---|---|
| Rich Notifications | Notification Service Extension | Intercepts and mutates payload before display; iOS 10+ |
| Custom sounds | Local bundle only | Linear PCM, MA4, µLaw, aLaw; ≤30 seconds |
| Push badges | `applicationIconBadgeNumber` (deprecated) or Braze dashboard | SDK property deprecated in Braze iOS SDK v7.0+ |
| Push action buttons | `UNNotificationCategory` registration | Four built-in Braze categories available |
| Push primer | In-app message campaign triggers native OS prompt | Requires three code modifications to the app |
| Push Stories | Swift only (not Objective-C); requires Cordova/React Native wrappers | Multi-page image sequence with action buttons |
| Silent push | `content-available: 1` flag; no alert/sound | Used for background fetch, geofence sync, uninstall tracking |
| Deep linking | Custom scheme or Universal Link | Universal Links require Associated Domains entitlement |

### Android

| Feature | Requirement | Key Detail |
|---|---|---|
| Rich Notifications | Handled natively; no extension required | Images, large icons, expanded text via `NotificationCompat` |
| Silent push | `priority: low` + no user-visible content | Background data messages |
| Deep linking | Intent filters in `AndroidManifest.xml` | Custom scheme or App Links (verified domains) |

### Web

| Feature | Requirement | Key Detail |
|---|---|---|
| Permission prompt | Browser native or soft prompt first | Soft prompts shown before native dialog to improve opt-in |
| Silent push | Not widely supported across browsers | Limited background processing compared to native |

---

## Silent Push: Internal Braze Notifications

Braze sends silent pushes for **uninstall tracking** and **geofence sync**. If your app takes action on all pushes automatically, you must filter these:

```swift
// Swift: Detect and ignore Braze internal pushes
if let extras = notification.request.content.userInfo["ab"] as? [String: Any],
   extras["uri"] == nil {
    // Internal Braze push — do not trigger custom behavior
    return
}
```

Failure to filter causes false-positive triggers on geofence updates and uninstall pings.

---

## Deep Linking: Platform Comparison

| Link type | Example | Best for | Fallback if app absent |
|---|---|---|---|
| Custom scheme | `myapp://products/123` | Push, In-App | None — silently fails |
| Universal Link (iOS) | `https://example.com/products/123` | Push, Email | Opens browser |
| App Link (Android) | `https://example.com/products/123` | Push, Email | Opens browser |

**Troubleshooting custom scheme links:**
1. Verify `CFBundleURLTypes` in `Info.plist` (iOS) or `<intent-filter>` in `AndroidManifest.xml`
2. Set breakpoint in `application(_:open:options:)` (iOS) or `onNewIntent` (Android)
3. Check that Braze dashboard URL field matches scheme exactly (case-sensitive)

---

## Push Stories

Multi-page push notification with image sequence. Platform support:

| Platform | Supported |
|---|---|
| Swift (iOS) | Yes |
| Cordova | Yes |
| React Native | Yes |
| Objective-C | No |
| Android | No |
| Web | No |

Requires a separate **Notification Content Extension** target (iOS) in addition to the app target.

---

## Push Notification Troubleshooting Reference

| Symptom | Platform | Likely cause |
|---|---|---|
| No prompt shown | Web | Browser push permission previously denied or dismissed |
| Token not registering | iOS | Missing `registerForRemoteNotifications()` call or entitlement |
| Rich media not rendering | iOS | Service Extension not added or not matching bundle ID prefix |
| Push delivered but silent | iOS/Android | Payload missing `alert` or `sound`; `content-available` set |
| Deep link opens wrong view | iOS | Handler not checking path component; stale URL cache |
| Stories not displaying | iOS | Content Extension missing or wrong deployment target |
| Subscribed but not receiving | All | Device token invalidated; check push enabled status separately from subscription state |

---

## Test Push Workflow

Use Braze's test send feature to verify integration before campaign launch:

1. Navigate to **Settings > Developer Console > Push Notification Tester**
2. Enter the push token directly, or use the **User ID** field to look up a registered token
3. Confirm `content-available` and `mutable-content` flags if testing silent or rich push
4. Check device logs for `ABKPushUtils` output (iOS) or Logcat `Braze` tag (Android) to trace delivery

---

## Key-Value Extras (Advanced Settings)

Send custom string key-value pairs in the `extras` field alongside the push payload. Access in the app:

```swift
// Swift
let extras = notification.request.content.userInfo["ab_k"] as? [String: String]
```

```kotlin
// Kotlin
val extras = intent.extras?.getString("ab_k")
```

Used for: deep link parameters, feature flags delivered via push, payload enrichment for analytics.

---

## Topics Synthesized

This skill draws from the following topic references:

- Push Subscription States — permission layer model
- Soft Push Prompts — pre-permission UI patterns (Web)
- Push Primer — iOS in-app prompt integration
- Rich Notifications — iOS Service Extension setup
- Push Stories — multi-page push format
- Silent Push Notifications — background delivery mechanics
- Push Deep Linking / iOS Deep Linking Guide / Deep Linking Troubleshooting
- Push Action Buttons — `UNNotificationCategory` configuration
- Custom Push Sounds — supported formats and bundle requirements
- Push Badges — badge count control
- Push Advanced Settings — extras, TTL, priority
- Ignoring Internal Push — filtering Braze system pushes
- Push Message Data Logging — SDK-level delivery logging
- Push Notification Examples — Android and Swift implementation samples
- Sending Test Push Messages — test send workflow
- Push Notifications Overview / Troubleshooting — cross-platform diagnostic reference
- Push Implementation Guide / Legacy Push Integration — SDK setup patterns
