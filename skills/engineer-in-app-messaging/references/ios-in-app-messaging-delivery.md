---
name: ios-in-app-messaging-delivery
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/in-app_messaging/in-app_message_delivery
indexed_at: '2026-04-05'
keywords:
  - messaging
  - triggers
  - delivery
  - events
  - prefetch
  - stack
  - rate-limiting
  - SDK
  - delegate
  - priority
triggers:
  - configure trigger types for messages
  - set message delivery rate limits
  - handle no matching trigger events
  - manage in-app message display queue
  - prefetch assets for in-app messages
---
# In-App Message Delivery

## Trigger Types

In-app messages can be triggered by:
- `Any Purchase`
- `Specific Purchase` (with property filters)
- `Session Start`
- `Custom Event` (with property filters)
- `Push Click`

> **Note:** Triggered in-app messages only work with custom events logged through the Braze SDK — not API events or API-triggered purchases.

## Delivery Semantics

- All eligible in-app messages are delivered to the device on **session start**
- Assets are prefetched at delivery to minimize display latency at trigger time
- When multiple messages are triggered by the same event, only the **highest priority** message is delivered
- Messages shown immediately on delivery (session start, push click) may have slight latency if assets weren't prefetched

## Minimum Time Interval Between Triggers

Default rate limit: **once every 30 seconds**.

Override via `ABKMinimumTriggerTimeIntervalKey` in `appboyOptions`:

```objc
// Objective-C — set minimum interval to 5 seconds
[Appboy startWithApiKey:@"YOUR-API-KEY"
          inApplication:application
      withLaunchOptions:options
      withAppboyOptions:@{ ABKMinimumTriggerTimeIntervalKey : @(5) }];
```

```swift
// Swift
Appboy.start(withApiKey: "YOUR-API-KEY", in: application,
             withLaunchOptions: launchOptions,
             withAppboyOptions: [ABKMinimumTriggerTimeIntervalKey: 5])
```

## No Matching Trigger

When no trigger matches an event, Braze calls `noMatchingTriggerForEvent:name:` on `ABKInAppMessageControllerDelegate`. Implement this method to handle the scenario.

## In-App Message Stack

The stack is **in-memory only** and cleared between app launches from suspended mode.

### When Messages Are Added to Stack

- A trigger event fires
- Session start
- App opened from push notification

Display order: **last in, first out** (most recently received shown first).

### When Messages Are Returned to Stack

- App is in the background when triggered
- Another in-app message is currently visible
- The deprecated `beforeInAppMessageDisplayed:withKeyboardIsUp:` is not implemented and keyboard is showing
- Delegate method `beforeInAppMessageDisplayed:` returns `ABKDisplayInAppMessageLater`

### When Messages Are Discarded

- Delegate method returns `ABKDiscardInAppMessage`
- Asset (image or ZIP) failed to download
- Message is past its timeout duration
- Device orientation doesn't match the message's required orientation
- Full in-app message has no image
- Image-only modal has no image

> **Important:** Do not display in-app messages while the keyboard is on screen — rendering behavior is undefined.

### Manually Display Next Message

```objc
// Objective-C
[[Appboy sharedInstance].inAppMessageController displayNextInAppMessage];
```

```swift
// Swift
Appboy.sharedInstance()!.inAppMessageController.displayNextInAppMessage()
```

## Real-Time Local In-App Messages

Create and display in-app messages locally without a Braze campaign. **Note: analytics are not supported for locally created messages.**

```objc
// Objective-C
ABKInAppMessageSlideup *customInAppMessage = [[ABKInAppMessageSlideup alloc] init];
customInAppMessage.message = @"YOUR_CUSTOM_SLIDEUP_MESSAGE";
customInAppMessage.duration = 2.5;
customInAppMessage.extras = @{@"key" : @"value"};
[[Appboy sharedInstance].inAppMessageController addInAppMessage:customInAppMessage];
```

```swift
// Swift
let customInAppMessage = ABKInAppMessageSlideup.init()
customInAppMessage.message = "YOUR_CUSTOM_SLIDEUP_MESSAGE"
customInAppMessage.duration = 2.5
customInAppMessage.extras = ["key": "value"]
Appboy.sharedInstance()!.inAppMessageController.add(customInAppMessage)
```

`★ Insight ─────────────────────────────────────`
- The stack uses LIFO (last-in, first-out) ordering — a deliberate design choice prioritizing recency over arrival order, since the most recently triggered message is likely most contextually relevant to the user's current action.
- The `ABKMinimumTriggerTimeIntervalKey` pattern (injecting config via a startup options dictionary) is a common iOS SDK pattern — it avoids needing post-init configuration methods while keeping the API surface small.
- Local in-app messages intentionally bypass analytics — this is architecturally significant because it means locally-created messages won't pollute campaign metrics or affect A/B test results in the Braze dashboard.
`─────────────────────────────────────────────────`
