---
name: sdk-integration-authentication
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/sdk_integration/authentication
indexed_at: '2026-04-05'
keywords:
  - authentication
  - JWT
  - RSA256
  - SDK
  - encryption
  - security
  - tokens
  - credentials
  - endpoint
triggers:
  - how to set up SDK authentication
  - enable JWT in SDK
  - configure user authentication
  - generate authentication tokens
  - implement SDK security
---
`★ Insight ─────────────────────────────────────`
Nick topic files are **atomic knowledge units** — they live in `skills/{skill}/references/*.md` and are designed to be loaded at query time. The goal is maximum signal density: strip Liquid template syntax (`{% tabs %}`, `{% alert %}`), platform-repetitive boilerplate, and navigation, while keeping the code that engineers actually copy-paste.
`─────────────────────────────────────────────────`

# SDK Authentication

SDK Authentication provides cryptographic proof (generated server-side) that SDK requests come from authenticated logged-in users. When enforced via the Braze dashboard, requests with invalid/missing JWTs are rejected.

## What it protects

- Sending custom events, attributes, purchases, session data
- Creating new users in your workspace
- Updating user profile attributes
- Receiving/triggering messages

Prevents unauthenticated users from using your SDK API key to impersonate other users.

## Setup Overview

1. Generate RSA256 key-pair on your server
2. Issue JWTs server-side per logged-in user
3. Enable authentication in the SDK
4. Register public key in Braze dashboard
5. Set enforcement policy in dashboard

---

## Step 1: Server-Side Setup

### Generate RSA256 Key-Pair

Use RSA 2048-bit key with RS256 algorithm. Store the **private key securely on your server only** — never expose or hard-code it in client code.

### Generate JWTs

Your server returns a JWT for the currently logged-in user (e.g., at login or profile refresh).

**JWT Header fields:**

| Field | Required | Value |
|-------|----------|-------|
| `alg` | Yes | `RS256` |
| `typ` | Yes | `JWT` |

**JWT Payload fields:**

| Field | Required | Description |
|-------|----------|-------------|
| `sub` | Yes | Must match the User ID passed to `changeUser` |
| `exp` | Yes | Token expiration timestamp |

Reference: [https://jwt.io](https://jwt.io) for libraries and tooling.

---

## Step 2: Enable Authentication in the SDK

**Minimum SDK versions:** Swift 5.0.0 · Android 14.0.0 · Web 3.3.0

> Enabling this option alone does **not** affect data collection until enforcement is turned on in the dashboard.

### Web

```javascript
import * as braze from "@braze/web-sdk";
braze.initialize("YOUR-API-KEY-HERE", {
  baseUrl: "YOUR-SDK-ENDPOINT-HERE",
  enableSdkAuthentication: true,
});
```

### Swift (iOS)

```swift
let configuration = Braze.Configuration(apiKey: "{YOUR-BRAZE-API-KEY}",
                                        endpoint: "{YOUR-BRAZE-ENDPOINT}")
configuration.api.sdkAuthentication = true
let braze = Braze(configuration: configuration)
AppDelegate.braze = braze
```

### Objective-C (iOS)

```objc
BRZConfiguration *configuration =
    [[BRZConfiguration alloc] initWithApiKey:@"{BRAZE_API_KEY}"
                                    endpoint:@"{BRAZE_ENDPOINT}"];
configuration.api.sdkAuthentication = YES;
Braze *braze = [[Braze alloc] initWithConfiguration:configuration];
AppDelegate.braze = braze;
```

### Android (Java)

```java
BrazeConfig.Builder brazeConfigBuilder = new BrazeConfig.Builder()
    .setIsSdkAuthenticationEnabled(true);
Braze.configure(this, brazeConfigBuilder.build());
```

Or via `braze.xml`:
```xml
<bool name="com_braze_sdk_authentication_enabled">true</bool>
```

### Android (Kotlin)

```kotlin
BrazeConfig.Builder brazeConfigBuilder = BrazeConfig.Builder()
    .setIsSdkAuthenticationEnabled(true)
Braze.configure(this, brazeConfigBuilder.build())
```

### React Native

Enable in native layer first, then use React Native JS methods.

**iOS (AppDelegate.swift):**
```swift
let configuration = Braze.Configuration(
  apiKey: "{YOUR-BRAZE-API-KEY}",
  endpoint: "{YOUR-BRAZE-ENDPOINT}"
)
configuration.api.sdkAuthentication = true
```

**Android (braze.xml):**
```xml
<bool name="com_braze_sdk_authentication_enabled">true</bool>
```

### Flutter / Dart

Enable in native iOS/Android layer (same as above). JWT signature passing is then handled via Flutter/Dart SDK methods after native enablement.

---

## Step 3: Provide the JWT to the SDK

After enabling, supply the JWT to the SDK when a user logs in and refresh it before expiration. The SDK appends the current user's JWT to all network requests automatically once set.
