---
name: ios-analytics-tracking-sessions
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/analytics/tracking_sessions
indexed_at: '2026-04-05'
keywords:
  - sessions
  - tracking
  - timeout
  - lifecycle
  - notifications
  - engagement
  - analytics
  - configuration
  - Appboy
  - SDK
triggers:
  - configure session timeout
  - track user sessions
  - set session duration
  - verify session tracking
  - session lifecycle
---
## iOS Session Tracking

The Braze SDK automatically tracks session data for user engagement analytics. Sessions generate "start session" and "close session" data points visible in the Braze dashboard.

### Session Lifecycle

- **Start**: `startWithApiKey:inApplication:withLaunchOptions:withAppboyOptions` is called, then on each `UIApplicationWillEnterForegroundNotification`
- **End**: `UIApplicationDidEnterBackgroundNotification` fires, or the app terminates
- **Force new session**: Change the current user

### Session Timeout Configuration

**Default**: 10 seconds. **Minimum**: 1 second.

**Option 1 — Info.plist** (SDK v3.14.1+):
Add a `Braze` dictionary with a `SessionTimeout` number entry. (Use `Appboy` key for SDK < v4.0.2.)

**Option 2 — `appboyOptions`**:

```objc
// Objective-C — sets session timeout to 60 seconds
[Appboy startWithApiKey:@"YOUR-API_KEY"
          inApplication:application
      withLaunchOptions:options
      withAppboyOptions:@{ ABKSessionTimeoutKey : @(60) }];
```

```swift
// Swift — sets session timeout to 60 seconds
Appboy.start(withApiKey: "YOUR-API-KEY",
             in: application,
             withLaunchOptions: launchOptions,
             withAppboyOptions: [ABKSessionTimeoutKey: 60])
```

### Verifying Session Tracking

Dashboard path: **User Profile → App Usage → Sessions metric**. Confirm the count increments as expected when the app enters the foreground.
