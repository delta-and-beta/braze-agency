---
name: cdp-zeotap-zeotap
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/data_and_analytics/customer_data_platform/zeotap/zeotap_for_currents
indexed_at: '2026-04-05'
keywords:
  - Zeotap
  - Currents
  - Segments
  - Integration
  - Connector
  - Endpoint
  - Export
  - Events
  - Credentials
  - Activation
triggers:
  - integrate Zeotap with Braze
  - set up Currents export to Zeotap
  - configure Zeotap Currents connector
  - sync segments to Zeotap
  - stream events to Zeotap
---
## Zeotap Integration with Braze Currents

Zeotap is a customer data platform providing identity resolution, insights, and data enrichment. The Braze-Zeotap integration syncs Zeotap customer segments to Braze user profiles and connects Braze Currents data to Zeotap for activation across the growth stack.

> **Note:** The custom HTTP connector is currently in beta. Contact your customer success manager to enable it.

## Prerequisites

- **Zeotap account** — required for the integration
- **Braze Currents** — must be enabled on your Braze account to export event data to Zeotap

## Setup

### Step 1: Create a Currents Source in Zeotap

1. In Zeotap, navigate to **Integrate > Sources**
2. Click **Create Source**
3. Select category: **Customer Engagement Channels**
4. Select data source: **Braze**
5. Enter a source name and select your region
6. Click **Create Source**
7. Open the **Implementation Details** tab and record:
   - **API URL** — used as the Currents endpoint
   - **Write Key** — used as the Bearer token

### Step 2: Configure Currents in Braze

1. In Braze, go to **Partner Integrations > Data Export**
2. Click **Create New Current > Custom Currents Export**
3. Enter an integration name and contact email for error notifications
4. Under **Credentials**, enter:
   - **Endpoint**: the API URL from Step 1
   - **Bearer Token**: the Write Key from Step 1
5. Select the message engagement events to stream to Zeotap
6. Click **Launch Current**

## Limitations

- Anonymous users (those without an `external_id`) are **not supported** by the Currents connector

`★ Insight ─────────────────────────────────────`
- Braze Currents uses a generic "Custom Currents Export" pathway for third-party CDPs like Zeotap — the Bearer Token pattern (Write Key → Bearer) is the standard auth handshake for this connector type
- The `external_id` requirement is a systemic Currents limitation, not Zeotap-specific — worth flagging in any Currents-based integration topic file
`─────────────────────────────────────────────────`
