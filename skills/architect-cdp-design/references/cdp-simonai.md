---
name: cdp-simonai
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/data_and_analytics/customer_data_platform/simonai
indexed_at: '2026-04-05'
keywords:
  - Braze
  - Simon
  - CDP
  - Segment
  - Campaign
  - Canvas
  - Integration
  - Traits
  - Sync
  - Authentication
triggers:
  - How to authenticate Braze in Simon
  - Sync Simon segment to Braze
  - Trigger a Braze Canvas
  - Send a Braze campaign
  - Configure contact properties
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's pipeline are "atomic knowledge units" — they live in `skills/{name}/references/*.md` and are designed to be retrieved independently at query time. Good topic files strip Jekyll templating (`{% alert %}`, `{{site.baseurl}}`), resolve relative links to their intent, and frontload the most actionable facts so shallow lookups (default Sonnet depth) still yield useful answers.
`─────────────────────────────────────────────────`

---

## Simon AI CDP — Braze Integration

Simon AI is an Agentic Marketing Platform combining a composable CDP with AI agents running on Snowflake. The Braze integration syncs advanced audiences built in Simon to Braze for real-time, no-code orchestration.

**Core capabilities:** identity resolution, customer data unification, AI-driven segmentation, delta-only syncing (only changed data is sent to Braze, minimizing API consumption).

---

### Prerequisites

| Requirement | Details |
|---|---|
| Simon AI account | Required to access the Braze integration within Simon |
| Braze REST API key | Needs `users.track`, `campaigns.trigger.schedule.create`, `campaigns.trigger.send` permissions. Create at **Settings > API Keys** in the Braze dashboard. |
| Braze Dashboard URL | Your instance REST endpoint URL |

---

### Setup: Authenticate Braze in Simon AI

1. In Simon, go to **Integrations** (left nav) and scroll to Braze.
2. Enter your Braze REST API key and dashboard URL.
3. Click **Save Changes**.

A **Connected** status confirms successful authentication.

---

### Available Braze Actions (Flows & Journeys)

After authentication, three actions can be added to Simon Flows or Journeys:

| Action | Description |
|---|---|
| **Sync Simon segment attribute** | Syncs segment details to a new or existing Braze custom attribute |
| **Trigger a Braze Canvas** | Triggers a Canvas using Simon segment data |
| **Send a Braze campaign** | Launches a full Braze campaign from Simon |

> Some actions are only available for specific Flow types or Journeys. See Simon documentation for details.

---

### Sync Traits and Contact Properties

Trait syncing minimizes data costs by sending only selected fields rather than all customer data on each sync.

**Activation:** Submit a request via the Simon Support Center. Your account manager enables the feature.

**Configuration steps (after activation):**

1. In Simon, go to **Admin Center > Sync Contact Traits**.
2. Select **Braze**. Contact properties appear nested by dataset.
3. Configure sync fields:
   - **Number of traits** — count of available fields per dataset; select all or expand to pick individual fields.
   - **Downstream name** — optionally rename fields as they appear in Braze.
   - **Backfill all contacts** — on first integration, run a full backfill to ensure complete data sync. Subsequent syncs will only send the selected traits (delta only).

**Key behavior:** Simon sends only deltas on each sync — unchanged data is not re-sent, reducing Braze data point consumption.

---

### Use Cases Summary

- Trigger a Braze Canvas or email campaign from Simon segment events
- Pass and maintain Segment Properties to Braze
- Sync selected Traits and Contact Properties with delta-only updates
