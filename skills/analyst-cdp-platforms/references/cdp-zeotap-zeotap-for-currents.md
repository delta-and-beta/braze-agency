---
name: cdp-zeotap-zeotap-for-currents
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/data_and_analytics/customer_data_platform/zeotap/zeotap_for_currents
indexed_at: '2026-04-05'
keywords:
  - zeotap
  - currents
  - integration
  - segments
  - connector
  - identity
  - enrichment
  - export
  - credentials
  - http
triggers:
  - sync segments to Braze
  - stream events to Zeotap
  - set up Zeotap integration
  - configure custom Currents export
  - connect Braze to Zeotap
---
## Zeotap for Currents

Zeotap is a customer data platform offering identity resolution, insights, and data enrichment. The Braze–Zeotap integration lets you sync Zeotap customer segments to Braze user profiles and stream Currents event data to Zeotap via a custom HTTP connector.

**Note:** The custom HTTP connector is currently in beta. Contact your customer success manager to enable it.

## Prerequisites

- Zeotap account
- Braze Currents enabled on your account

## Setup

### Step 1: Create a Currents Source in Zeotap

1. In Zeotap, navigate to **Integrate > Sources**.
2. Select **Create Source**.
3. Choose category: **Customer Engagement Channels**.
4. Select **Braze** as the data source.
5. Enter a source name and select your region.
6. Select **Create Source**.
7. On the **Implementation Details** tab, copy the **API URL** and **Write Key** — needed for Step 2.

### Step 2: Configure Custom Currents Export in Braze

1. In Braze, go to **Partner Integrations > Data Export**.
2. Select **Create New Current > Custom Currents Export**.
3. Enter an integration name and contact email for error alerts.
4. Under **Credentials**, enter:
   - **Endpoint**: the API URL from Step 1
   - **Bearer Token**: the Write Key from Step 1
5. Select the message engagement events to forward to Zeotap.
6. Select **Launch Current** to activate.

**Limitation:** Anonymous users (those without an `external_id`) are not supported by the Currents connector.
