---
name: administrative-access_braze-sdk_endpoints
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/administrative/access_braze/sdk_endpoints
indexed_at: '2026-04-05'
keywords:
  - endpoints
  - SDK
  - REST
  - clusters
  - configuration
  - dashboard
  - initialization
  - onboarding
  - instances
triggers:
  - how to find my Braze endpoints
  - SDK endpoint configuration
  - REST vs SDK endpoint
  - initialize Braze SDK
  - configure cluster endpoints
---
## SDK Endpoints

Braze organizes dashboard, SDK, and REST endpoints into clusters (instances). Your onboarding manager specifies which cluster you're on. Logging in at `dashboard.braze.com` auto-redirects to the correct cluster.

### Key Rule

- **SDK integration** → use the **SDK endpoint**
- **REST API calls** → use the **REST endpoint**

These are distinct URLs — do not mix them.

### Endpoint Structure

Each Braze instance exposes three endpoint types:

| Type | Purpose |
|------|---------|
| Dashboard | Web login URL |
| SDK | Mobile/web SDK initialization |
| REST | Server-side API calls |

### Finding Your Endpoints

Your specific cluster endpoints are provided during onboarding. Common instance patterns:

- Dashboard: `https://dashboard-XX.braze.com`
- SDK: `sdk.iad-XX.braze.com` (no `https://` prefix — SDK handles transport)
- REST: `https://rest.iad-XX.braze.com`

Where `XX` corresponds to your cluster number (e.g., `01`, `02`, `03`).

### SDK Initialization Example

When initializing the SDK, pass the SDK endpoint directly:

```swift
// iOS example
let configuration = Braze.Configuration(apiKey: "YOUR-API-KEY", endpoint: "sdk.iad-01.braze.com")
```

```kotlin
// Android example
BrazeConfig.Builder().setCustomEndpoint("sdk.iad-01.braze.com")
```

> If you don't know your cluster, check the URL after logging into the dashboard — the subdomain (e.g., `dashboard-01`) indicates your instance.
