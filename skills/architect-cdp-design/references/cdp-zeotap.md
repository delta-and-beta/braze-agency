---
name: cdp-zeotap
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/data_and_analytics/customer_data_platform/zeotap/zeotap_for_currents
indexed_at: '2026-04-05'
keywords:
  - zeotap
  - segments
  - identity
  - enrichment
  - integration
  - currents
  - CDP
  - credentials
  - endpoint
triggers:
  - set up Zeotap integration
  - configure Braze Currents
  - sync Zeotap segments to Braze
  - stream engagement events to Zeotap
  - enable custom HTTP connector
---
## Zeotap CDP Overview

Zeotap is a next-generation customer data platform (CDP) providing identity resolution, audience insights, and data enrichment. The Braze-Zeotap integration syncs Zeotap customer segments to Braze user profiles and supports bidirectional data flow via Braze Currents.

**Note:** The custom HTTP connector is in beta — contact your CSM to enable it.

## Prerequisites

- Active Zeotap account
- Braze Currents enabled on your account

## Integration Setup

### Step 1: Create a Currents Source in Zeotap

1. In Zeotap: **Integrate** > **Sources** > **Create Source**
2. Select category: **Customer Engagement Channels**
3. Select data source: **Braze**
4. Enter a source name and select your region
5. Click **Create Source**
6. Go to the **Implementation Details** tab — record:
   - **API URL** (used as Endpoint)
   - **Write Key** (used as Bearer Token)

### Step 2: Configure Currents in Braze

1. In Braze: **Partner Integrations** > **Data Export**
2. Click **Create New Current** > **Custom Currents Export**
3. Enter an integration name and alert email
4. Under **Credentials**:
   - **Endpoint**: API URL from Step 1
   - **Bearer Token**: Write Key from Step 1
5. Select the message engagement events to stream to Zeotap
6. Click **Launch Current**

## Key Constraints

- Anonymous users (no `external_id`) are **not supported** by the Currents connector
- Data flows from Braze → Zeotap via Currents (event streaming)
- Data flows from Zeotap → Braze via segment sync (user profiles)

`★ Insight ─────────────────────────────────────`
- The template variables like `{{site.baseurl}}` and `{% image_buster %}` are Jekyll/Liquid syntax from Braze's docs site — stripping these cleanly is essential for topic files, since they resolve to nothing in plain markdown contexts.
- The two-directional data flow (segments Zeotap→Braze, events Braze→Zeotap) is the architectural core of this integration — worth surfacing explicitly since it's easy to miss in the original prose.
`─────────────────────────────────────────────────`
