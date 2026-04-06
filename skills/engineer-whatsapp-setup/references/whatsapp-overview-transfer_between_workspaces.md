---
name: whatsapp-overview-transfer_between_workspaces
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/whatsapp/overview/transfer_between_workspaces
indexed_at: '2026-04-05'
keywords:
  - WhatsApp
  - workspace
  - subscription
  - transfer
  - integration
  - WABA
  - phone
  - archive
  - messaging
  - cluster
triggers:
  - transfer WhatsApp between workspaces
  - move phone number to workspace
  - archive subscription group
  - integrate WhatsApp messaging
  - set up WhatsApp integration
---
## WhatsApp Workspace Transfer

Move a WhatsApp Business Account (WABA) phone number and its subscription group between Braze workspaces without engineering help.

### Prerequisites

- "Manage Subscription Groups" permission in **both** source and destination workspaces
- Both workspaces must be on the same Braze cluster

### Transfer Steps

**Step 1 — Archive the subscription group (source workspace)**

1. Go to **Audience** > **Subscription Group Management**
2. Find the subscription group linked to the phone number
3. Hover over its status → select **Archive** (marks inactive, does not delete)

**Step 2 — Integrate into destination workspace**

1. Go to **Partner Integrations** > **Technology Partners** > **WhatsApp**
2. Scroll to **WhatsApp Messaging Integration**
3. Select **Create new subscription group and phone number**
4. During setup, select the phone number from the archived subscription group

**Step 3 — Verify**

1. Confirm the phone number is associated with the new workspace's subscription group
2. Send a test message to confirm send/receive works

### Key Notes

- To transfer back: archive in destination, re-integrate into source — same process in reverse
- Do **not** remove the phone number from Meta Business Manager during transfer
- WABAs cannot cross Braze clusters
