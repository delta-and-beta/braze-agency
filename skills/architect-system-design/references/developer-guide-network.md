---
name: developer-guide-network
source_url: 'https://braze-inc.github.io/braze-docs/_developer_guide/network'
indexed_at: '2026-04-05'
keywords:
  - network
  - endpoint
  - timeout
  - configuration
  - SDK
  - Android
  - Swift
  - SSL
  - residency
  - initialization
triggers:
  - how to configure network
  - set custom endpoint
  - configure request timeout
  - enable SSL pinning
  - customize network settings
---
`★ Insight ─────────────────────────────────────`
- This doc uses Jekyll's `{% sdktabs %}` / `{% multi_lang_include %}` macros — the actual content lives in platform-specific partials, not the page itself. Processing what's visible means capturing the structural intent rather than rendered content.
- Topic files in Nick's pipeline are "atomic knowledge units" — when source content is thin or template-only, the right output is a minimal but accurate reference, not fabricated detail.
`─────────────────────────────────────────────────`

## Network Configuration — Braze SDK

Configure network behavior for the Braze SDK on Android and Swift platforms.

### Overview

The Braze SDK allows customization of network settings including request timeouts, retry behavior, and endpoint configuration. Settings differ by platform.

---

### Android

Network configuration is applied during SDK initialization via `BrazeConfig.Builder`.

```kotlin
val brazeConfig = BrazeConfig.Builder()
    .setCustomEndpoint("sdk.your-custom-endpoint.com")
    .build()
Braze.configure(context, brazeConfig)
```

**Key options:**
- Custom API endpoint — override the default Braze endpoint for data residency or proxy setups
- Network request timeout — controls connection and read timeouts for SDK HTTP calls

---

### Swift (iOS)

Network configuration is applied via `BrazeKit` configuration object at startup.

```swift
let configuration = Braze.Configuration(
    apiKey: "YOUR-API-KEY",
    endpoint: "sdk.your-custom-endpoint.com"
)
let braze = Braze(configuration: configuration)
```

**Key options:**
- Custom endpoint — set via `configuration.api.sdkAuthentication` or endpoint property
- Request policies — control retry and timeout behavior through `URLSessionConfiguration`

---

### Notes

- Custom endpoints are required for EU data residency clusters (e.g., `sdk.fra-01.braze.eu`)
- Network changes take effect only at initialization; reconfiguration requires restart
- Both platforms support SSL pinning for enhanced security in high-compliance environments
