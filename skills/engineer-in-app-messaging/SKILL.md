---
name: engineer-in-app-messaging
description: >-
  Implements and customizes in-app messages including display handling,
  delegates, triggers, orientation, view controllers, and click behaviors.
metadata:
  role: braze-engineer
  topics:
    - ios-in-app-messaging-overview
    - ios-in-app-messaging-implementation-guide
    - ios-in-app-messaging-delivery
    - ios-in-app-messaging-customization
    - ios-in-app-messaging-custom-app-store-review-prompt
    - ios-in-app-messaging-shareplay
    - ios-in-app-messaging-setting-delegates
    - ios-in-app-messaging-modal-dismissal
    - ios-in-app-messaging-key-value-pairs
    - ios-in-app-messaging-handling-in-app-display
    - ios-in-app-messaging-customizing-orientation
    - ios-in-app-messaging-custom-view-controller
    - ios-in-app-messaging-custom-triggering
    - ios-in-app-messaging-behavior-on-click
    - ios-in-app-messaging
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
The `writing-skills` skill is TDD-oriented for authoring *new superpowers process skills* — but here we're generating a **reference skill** for a Braze plugin. The structure guidance still applies: rich description, keyword coverage, topic synthesis over narration, and a scannable quick-reference table.
`─────────────────────────────────────────────────`

Here is the generated skill file content:

---

# In-App Messaging Implementation

## Skill Overview

This skill covers hands-on implementation and customization of Braze in-app messages on iOS. It synthesizes guidance on display lifecycle control, delegate wiring, trigger configuration, orientation handling, view controller injection, and click-action customization — oriented toward engineers actively building or debugging the in-app message layer.

**Lens:** Hands-on customization and display control for in-app message UI. This skill prioritizes the *how* of implementation: which delegate methods to implement, which properties to set, which SDK classes to subclass or replace — not campaign strategy or analytics interpretation.

---

## When to Use This Skill

Use this skill when:

- Implementing or customizing in-app message display behavior (custom view controllers, custom animations, manual display gating)
- Wiring up `ABKInAppMessageUIDelegate` or `ABKInAppMessageControllerDelegate` to intercept display or click events
- Configuring trigger conditions for in-app messages (session start, custom events, purchase events)
- Setting per-message or global orientation constraints
- Controlling modal dismissal behavior on outside tap
- Reading or acting on key-value pairs (`extras`) from in-app message objects
- Implementing custom in-app message triggering via silent push + server-sent events
- Integrating SharePlay with in-app messages (iOS 15+)
- Building a custom App Store review prompt using in-app message campaigns

**Not this skill** if you need campaign scheduling, A/B test setup, or server-side delivery logic — those are dashboard and data concerns.

---

## Topics Synthesized

| Topic | What It Covers |
|---|---|
| **In-App Messaging Overview** | Message types, delivery context, engagement model |
| **In-App Message Delivery** | Trigger types: session start, custom event, purchase, API |
| **Handling In-App Display** | Display coordinator pattern, `ABKInAppMessageUIDelegate` hooks |
| **Setting Delegates** | Legacy Objective-C delegate wiring (`Appboy` / `ABK` prefix SDK) |
| **Customizing Orientation** | Global `supportedOrientationMask` via `ABKInAppMessageUIController` |
| **Custom View Controller** | Injecting a custom VC; Braze retains animation and analytics |
| **Modal Dismissal** | `Info.plist` key to enable/disable dismiss-on-outside-tap |
| **Key-Value Pairs** | Reading `extras` dictionary on `ABKInAppMessage` objects |
| **In-App Message Click Behavior** | Delegate-based click interception, custom URL routing |
| **Custom In-App Message Triggering** | Silent push → SDK custom event → in-app message trigger chain |
| **Custom App Store Review Prompt** | KVP-driven native review prompt; analytics ownership trade-off |
| **SharePlay Integration** | `GroupActivities` framework wiring for iOS 15+ FaceTime sessions |
| **Analytics Logging (Manual)** | When delegates intercept display/click, impressions/clicks must be logged manually |

---

## Core Implementation Patterns

### Display Delegate (Objective-C SDK)

When using `ABKInAppMessageUIDelegate`, you control whether and how messages display. If you return `ABKDisplayInAppMessageNow`, Braze renders normally. If you return `ABKDiscardInAppMessage` or `ABKDisplayInAppMessageLater`, **you are responsible for logging impressions and clicks** — Braze will not do it automatically.

```objc
// Implement in your delegate
- (ABKInAppMessageDisplayChoice)beforeInAppMessageDisplayed:(ABKInAppMessage *)inAppMessage
                                              withKeyWindow:(UIWindow *)keyWindow {
    // Inspect inAppMessage.extras for routing decisions
    if ([inAppMessage.extras[@"target"] isEqualToString:@"premium"]) {
        return ABKDisplayInAppMessageNow;
    }
    return ABKDiscardInAppMessage;
}
```

### Manual Analytics (Critical)

If you intercept display or clicks via a delegate and suppress or reroute the default behavior, you **must** call:

```objc
[inAppMessage logInAppMessageImpression];
[inAppMessage logInAppMessageClicked];
```

Skipping these breaks campaign analytics silently — impressions and clicks will appear as zero in the dashboard.

### Custom View Controller Injection

Pass your custom `UIViewController` subclass to Braze before display. Braze handles:
- Entry/exit animation
- Impression and click logging
- Dismissal on button tap

Your view controller must conform to the required Braze protocol and **not** manage its own presentation lifecycle.

### Custom Triggering via Silent Push

To trigger in-app messages from server-sent events:

1. Send a silent push notification to the device
2. In `application(_:didReceiveRemoteNotification:fetchCompletionHandler:)`, call `logCustomEvent` on the Braze SDK
3. Configure your in-app message campaign to trigger on that custom event

**Requirement:** The user must have a registered push token and background push enabled.

---

## Quick Reference

| Need | Where to Look |
|---|---|
| Intercept display before it shows | `ABKInAppMessageUIDelegate` → `beforeInAppMessageDisplayed` |
| Read campaign KVPs at runtime | `inAppMessage.extras` (NSDictionary) |
| Force landscape/portrait globally | `ABKInAppMessageUIController.supportedOrientationMask` |
| Dismiss modal on outside tap | `Info.plist` → `Appboy Dismiss Modal On Outside Tap` = YES |
| Replace message UI entirely | Inject custom `UIViewController` via Braze display API |
| Trigger from server event | Silent push → `logCustomEvent` → campaign trigger |
| App Store review prompt | KVP key in campaign + deep link handler in app |
| SharePlay in-app messages | `GroupActivities` framework + Braze IAM session hooks |

---

## Common Mistakes

**Forgetting manual analytics after delegate interception.** Any `ABKDiscardInAppMessage` or custom routing path that bypasses normal display must call `logInAppMessageImpression` and `logInAppMessageClicked` manually or the campaign will show zero engagement.

**Using legacy `Appboy`-prefixed APIs with the Swift SDK.** The `ABK` and `Appboy` prefixes are Objective-C era (pre-Swift SDK). Do not mix legacy delegate protocols with the modern Swift SDK — they are incompatible.

**Presenting a custom view controller with its own `present(_:animated:)` call.** Braze manages presentation when you inject a custom view controller. Calling `present` yourself causes double-presentation or animation conflicts.

**Setting `supportedOrientationMask` after the first message has displayed.** Orientation configuration must be set before any in-app message renders. Set it at SDK initialization time.

**Silent push triggering without background modes enabled.** Custom triggering via silent push requires `Background Modes → Remote notifications` in the app's capabilities. Without it, the push payload is never delivered to the app delegate while backgrounded.

---

## SDK Context Note

Several topics in this skill reference the **legacy Objective-C Braze iOS SDK** (`Appboy`, `ABK` class prefixes). This predates the Swift SDK rebranding. If your project uses `import BrazeKit` (Swift SDK), class names and delegate protocols differ — but the architectural patterns (display delegate, custom view controller injection, manual analytics) remain conceptually identical.
