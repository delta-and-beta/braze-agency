---
name: cdp-adobe-adobe-for-currents
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/data_and_analytics/customer_data_platform/adobe/adobe_for_currents
indexed_at: '2026-04-05'
keywords:
  - currents
  - adobe
  - streaming
  - schema
  - xdm
  - dataflow
  - integration
  - credentials
  - aep
  - mappings
triggers:
  - connect Braze Currents to Adobe
  - set up Adobe Experience Platform integration
  - configure streaming source connection
  - map Braze events to AEP
  - create XDM schema for Currents
---
## Adobe for Currents

Connects Braze Currents event data to Adobe Experience Platform (AEP) in real time via streaming source integration.

## Prerequisites

- Braze Currents enabled on your account
- Adobe Experience Platform account with permission to create streaming source connections

## Setup Steps

### 1. Create XDM Schema in Adobe

1. In AEP: **Schemas** > **Create schema** > **Experience Event** > **Next**
2. Name and describe your schema
3. In **Composition** > **Field groups** > **Add** > add **Braze Currents User Event** field group
4. **Save**

### 2. Connect Braze to AEP

1. In AEP: **Sources** > **Catalog** > **Marketing automation** > **Add data** (Braze Currents)
2. Upload the [Braze Currents sample file](https://github.com/Appboy/currents-examples/blob/master/sample-data/Adobe/adobe_examples.json)
3. Configure dataflow details:
   - First time: create a new dataset using the schema from Step 1
   - Subsequent times: use existing dataset referencing the Braze schema
4. Configure field mappings:
   - Change `id` mapping: `_braze.appID` → `_id` (root level)
   - Ensure `properties.is_amp` maps to `_braze.messaging.email.isAMP`
   - Delete `time` and `timestamp` mappings
   - Add calculated field: `time * 1000` → map to `timestamp` at root level

> **Important:** Braze timestamps are in **seconds**; AEP requires **milliseconds**. Use `time * 1000` as a calculated field.

5. **Validate** to confirm no mapping errors, then **Next** > **Finish**

### 3. Gather AEP Credentials

Collect these from your AEP source to input into Braze:

| Field | Description |
|-------|-------------|
| Client ID | From your AEP source |
| Client Secret | From your AEP source |
| Tenant ID | From your AEP source |
| Sandbox Name | From your AEP source |
| Dataflow ID | From your AEP source |
| Streaming Endpoint | From your AEP source (Braze auto-converts to batch streaming endpoint) |

### 4. Configure Currents in Braze

1. **Partner Integrations** > **Data Export** > **Create New Current**
2. Provide:
   - Connector name
   - Notification contact info
   - Credentials from Step 3
3. Select events to receive
4. (Optional) Configure field exclusions or transformations
5. **Launch Current**
