---
name: cdp-amplitude-amplitude-audiences
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/data_and_analytics/customer_data_platform/amplitude/amplitude_audiences
indexed_at: '2026-04-05'
keywords:
  - amplitude
  - audiences
  - cohorts
  - events
  - streaming
  - traits
  - segments
  - sync
  - integration
  - currents
triggers:
  - sync Amplitude cohorts to Braze
  - setup Amplitude event streaming
  - import user traits from Amplitude
  - troubleshoot cohort sync failures
  - configure Amplitude integration
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's architecture are "atomic knowledge units" — they live inside `skills/{name}/references/*.md` and are loaded selectively based on query depth. A well-structured topic file strips Jekyll template syntax (`{% %}`, `{{site.baseurl}}`), image busters, and navigation links while keeping the dense, actionable facts that an agent needs at runtime.
`─────────────────────────────────────────────────`

## Amplitude Audiences Integration

Amplitude is a product analytics platform. The Braze–Amplitude integration is **bi-directional**: import Amplitude cohorts/traits/events into Braze, or export Braze events to Amplitude via Currents.

---

## Integration Methods

| Method | Direction | Use Case |
|--------|-----------|----------|
| **Event Streaming** | Amplitude → Braze | Forward raw Amplitude events to Braze in real-time |
| **Cohort Import** | Amplitude → Braze | Sync Amplitude cohorts as Braze segments |
| **User Traits / Computations** | Amplitude → Braze | Sync user properties as Braze custom attributes |
| **Currents Export** | Braze → Amplitude | Export Braze events for deeper analytics |

---

## Braze Event Streaming Setup

**Prerequisites:**
- Braze REST API key (all permissions) — create at **Settings > API Keys**
- Braze REST endpoint URL (instance-specific)
- Braze app identifier — found at **Developer Console > Settings**

**Amplitude configuration steps:**
1. Navigate to **Data Destinations** → search "Braze - Event Stream"
2. Enter a sync name → **Create Sync**
3. Click **Edit** → provide REST endpoint, API key, and app identifier
4. Use the send events filter to select events (recommend selecting only the most important ones)
5. Enable destination and save

---

## Syncing User Traits and Computations (Audiences)

Syncs user properties and computations to Braze as **custom attributes** with the same name.

**Constraints:**
- Only users active in the **last 90 days** are eligible
- Creates new Braze users if the identifier doesn't exist yet
- Sync requires a user identifier — supported types:
  - External ID
  - Braze ID
  - User alias
  - Email address

**Steps (in Amplitude Audiences):**
1. Go to **Syncs > Create Sync**
2. Choose sync type: **User Property**, **Computation**, **Cohort**, or **Recommendation**
3. Select the specific property or computation
4. Select Braze as the destination
5. Define sync frequency: one-time or scheduled

---

## Troubleshooting: "Not enough data for this filter" (Cohort Sync)

When importing an Amplitude cohort fails with this error:

1. **Check User ID alignment** — Amplitude User ID (not Amplitude ID) must exactly match Braze External User ID (not Braze/BSON ID). Example: `12345` in Amplitude must match `12345` in Braze.
2. **Regenerate the API key** — In Braze, go to **Partner Integrations > Technology Partners > Amplitude** → **Generate New Key** → retry the cohort sync.
3. **Verify cohort synced on Amplitude's side** — Contact Amplitude support to confirm the cohort successfully synced before troubleshooting in Braze.

---

## Requirements Summary

| Requirement | Purpose |
|-------------|---------|
| Amplitude account | Required for all integration types |
| Braze Currents | Required only for Braze → Amplitude data export |
| Braze REST API key (all permissions) | Required for Event Streaming |
| Braze app identifier | Required for Event Streaming |
