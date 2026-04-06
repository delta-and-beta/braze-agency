---
name: sdk-integration-verbose-logging
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/sdk_integration/verbose_logging
indexed_at: '2026-04-05'
keywords:
  - logging
  - verbose
  - sdk-initialization
  - debugging
  - message-delivery
  - deep-links
  - connectivity
  - push-tokens
  - session-tracking
  - logcat
triggers:
  - enable verbose logging
  - troubleshoot message delivery
  - debug deep links
  - verify sdk initialization
  - collect sdk logs
---
# SDK Verbose Logging

Verbose logging outputs detailed, low-level information about SDK initialization, server communication, and messaging channels (push, in-app messages, Content Cards). Use it to identify root causes instead of guessing.

> **Important**: Verbose logging is for development/testing only. Disable before releasing to production.

## When to Use

- **Verify SDK initialization** — confirm correct API key and endpoint
- **Troubleshoot message delivery** — push token registration, IAM triggering, Content Card sync
- **Debug deep links** — verify SDK receives and opens deep links
- **Validate session tracking** — confirm sessions start/end correctly
- **Diagnose connectivity** — inspect network requests/responses to Braze servers

## Enabling Verbose Logging

### Android

Enable before any other SDK calls in `Application.onCreate()`.

**Java:**
```java
BrazeLogger.setLogLevel(Log.VERBOSE);
```

**Kotlin:**
```kotlin
BrazeLogger.logLevel = Log.VERBOSE
```

**`braze.xml`:**
```xml
<integer name="com_braze_logger_initial_log_level">2</integer>
```

Verify by searching `V/Braze` in Logcat:
```
2077-11-19 16:22:49.591 ? V/Braze v9.0.01 .bo.app.d3: Request started
```

### Swift / iOS

Set log level on `Braze.Configuration` during initialization.

**Swift:**
```swift
let configuration = Braze.Configuration(
  apiKey: "<BRAZE_API_KEY>",
  endpoint: "<BRAZE_ENDPOINT>"
)
configuration.logger.level = .debug
let braze = Braze(configuration: configuration)
```

**Objective-C:**
```objc
BRZConfiguration *configuration = [[BRZConfiguration alloc] initWithApiKey:@"<BRAZE_API_KEY>"
                                                                  endpoint:@"<BRAZE_ENDPOINT>"];
[configuration.logger setLevel:BRZLoggerLevelDebug];
Braze *braze = [[Braze alloc] initWithConfiguration:configuration];
```

`.debug` is the most verbose level and recommended for troubleshooting.

### Web

Add `?brazeLogging=true` as a URL parameter, or set during initialization:

```javascript
braze.initialize('YOUR-API-KEY', {
    baseUrl: 'YOUR-SDK-ENDPOINT',
    enableLogging: true
});
```

Toggle logging after initialization:
```javascript
braze.toggleLogging();
```

Logs appear in the browser **Console** tab (F12 or Cmd+Option+I).

### Unity

1. Navigate to **Braze > Braze Configuration**
2. Open **Show Braze Android Settings**
3. Set **SDK Log Level** to `0`

### React Native

```javascript
const configuration = new Braze.BrazeConfiguration('YOUR-API-KEY', 'YOUR-SDK-ENDPOINT');
configuration.logLevel = Braze.LogLevel.Verbose;
```

## Collecting Logs

After enabling, reproduce the issue, then collect:

| Platform | Tool | Filter |
|----------|------|--------|
| Android | Android Studio Logcat | `V/Braze` or `D/Braze` |
| iOS | macOS Console app (device connected) | `Braze` or `BrazeKit` |
| Web | Browser DevTools Console tab | — |

Start logging before launching the app and continue until after the issue occurs to capture the full event sequence.

## Sharing with Braze Support

Include:
1. Complete verbose log file (before launch through issue occurrence)
2. Steps to reproduce
3. Expected vs. actual behavior
4. SDK version
5. Platform and OS version (e.g., iOS 18.0, Android 14, Chrome 120)

`★ Insight ─────────────────────────────────────`
- The original uses Jekyll liquid template tags (`{% tabs %}`, `{% alert %}`) — these are stripped in topic files since they're runtime-rendered by the docs site, not meaningful in a static reference
- The table format for log collection consolidates 3 platform-specific sections into a single scannable reference, which fits the "atomic knowledge unit" philosophy of Nick topic files
- Cross-references to other docs pages are removed because topic files should be self-contained; the reader shouldn't need to follow links to understand the content
`─────────────────────────────────────────────────`
