---
name: ios-advanced-fine-network-traffic-control
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/advanced_use_cases/fine_network_traffic_control
indexed_at: '2026-04-05'
keywords:
  - network
  - traffic
  - requests
  - processing
  - policy
  - flush
  - automatic
  - manual
  - communication
  - queuing
triggers:
  - control network requests
  - set request processing policy
  - flush data to servers
  - manual network processing
---
`★ Insight ─────────────────────────────────────`
- Nick topic files are atomic knowledge units stored in `skills/{name}/references/*.md` — they're designed for fast vector lookup, so density over narrative is the right goal
- Stripping Jekyll templating (`{% tabs %}`, `{% multi_lang_include %}`) is essential; these are server-side rendering artifacts that would pollute embeddings
- Keeping Swift alongside Obj-C examples is worth it since both remain in active use in the SDK, but the Obj-C deprecation notice should be dropped (it's boilerplate, not knowledge)
`─────────────────────────────────────────────────`

---

# Fine Network Traffic Control (iOS SDK)

## Request Processing Policies

Controls how/when the Braze iOS SDK communicates with servers. Set via `ABKRequestProcessingPolicy` enum.

### Automatic (`ABKAutomaticRequestProcessing`) — Default

- SDK handles all server communication automatically
- Flushes custom events and attributes periodically (every few seconds)
- Performs immediate requests when user-facing data is needed (e.g., in-app messages)
- Also updates Content Cards, Geofences, and fetches new in-app messages automatically

### Manual (`ABKManualRequestProcessing`)

- Custom attributes and event data are **not** automatically flushed during the session
- Internal SDK features (in-app messages, Liquid templating, Geofences, location) still trigger automatic network requests
- Those internal requests **may** flush locally stored custom data as a side effect

## Manual Flush

Trigger an immediate flush to Braze servers at any time:

```swift
// Swift
Appboy.sharedInstance()?.flushDataAndProcessRequestQueue()
```

```objc
// Objective-C
[[Appboy sharedInstance] flushDataAndProcessRequestQueue];
```

## Setting the Policy

### At Startup

Pass `ABKRequestProcessingPolicyOptionKey` in the `appboyOptions` dictionary to `startWithApiKey:inApplication:withLaunchOptions:withAppboyOptions`:

```swift
// Swift
let appboyOptions: [AnyHashable: Any] = [
  ABKRequestProcessingPolicyOptionKey: ABKRequestProcessingPolicy.automaticRequestProcessing.rawValue
]
```

```objc
// Objective-C
NSDictionary *appboyOptions = @{
  ABKRequestProcessingPolicyOptionKey : @(ABKAutomaticRequestProcessing)
};
```

### At Runtime

```swift
// Swift
Appboy.sharedInstance()?.requestProcessingPolicy = ABKRequestProcessingPolicy.automaticRequestProcessing
```

```objc
// Objective-C
[Appboy sharedInstance].requestProcessingPolicy = ABKAutomaticRequestProcessing;
```

## Shutting Down In-Flight Requests

Halts any active server communication immediately:

```swift
// Swift
Appboy.sharedInstance()?.shutdownServerCommunication()
```

```objc
// Objective-C
[[Appboy sharedInstance] shutdownServerCommunication];
```

**Important:** After calling this, reset the policy back to automatic. Only use this when the OS forces you to stop background tasks (e.g., background task expiration handler).

`★ Insight ─────────────────────────────────────`
- The topic omits the `ABKRequestProcessingPolicy` GitHub link — external links in topic files are generally low-value since they may rot; the enum name itself is sufficient for a developer to find it
- Consolidating the duplicate "manual flush" code block (which appeared under both policy sections) reduces redundancy without losing information — topic files are read in isolation, so one canonical location is cleaner
`─────────────────────────────────────────────────`
