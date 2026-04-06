---
name: cdp-toovio
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/data_and_analytics/customer_data_platform/toovio
indexed_at: '2026-04-05'
keywords:
  - CDP
  - Toovio
  - Braze
  - integration
  - Currents
  - triggers
  - API
  - real-time
  - events
  - campaigns
triggers:
  - How to integrate Toovio with Braze
  - Set up real-time AI triggers
  - Configure Toovio CDP integration
  - Stream data to Toovio
  - Enable Toovio message triggering
---
## Toovio CDP

Toovio is an AI-powered data-as-a-service company. The Braze-Toovio integration enables near real-time message triggering, incremental performance tools, and advanced campaign measurement.

### Prerequisites

| Requirement | Details |
|---|---|
| Toovio account | Required — contact [info@toovio.com](mailto:info@toovio.com) |
| Braze REST API key | Needs `users.track` permission. Create at **Settings > API Keys** |
| Braze Currents | Required to stream event/behavior data to a storage partner (AWS S3, GCS, or Azure Blob) for Toovio to consume |

### How It Works

Toovio processes user event data from Currents, evaluates triggers via its AI models, then sends those triggers back to Braze via the [`POST /users/track`](https://www.braze.com/docs/api/endpoints/user_data/post_user_track/) endpoint to fire campaigns in near real-time.

### Integration Steps

**Step 1 — Share Currents feed location**
Provide Toovio with the drop location (S3/GCS/Azure) for your Currents data so they can access and process user event/behavior data.

**Step 2 — Create an API-triggered campaign in Braze**
Set up a Braze [API-triggered campaign](https://www.braze.com/docs/api/endpoints/messaging/send_messages/post_send_triggered_campaigns/) targeting the customer events and user attributes that Toovio will act on.

**Step 3 — Activate Toovio account**
Email [info@toovio.com](mailto:info@toovio.com?subject=New%20Customer%20Request) with subject "New Customer Request". Toovio will configure triggers and the underlying predictive models for your use case.

### Key Facts

- **Integration maintained by Toovio** (not Braze)
- Data flow: Braze Currents → storage → Toovio processing → `/users/track` → Braze campaign fire
- Latency: near real-time triggering
