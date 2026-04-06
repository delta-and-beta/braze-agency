---
name: whatsapp-overview
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/whatsapp/overview/transfer_between_workspaces
indexed_at: '2026-04-05'
keywords:
  - whatsapp
  - transfer
  - workspace
  - subscription
  - integration
  - archive
  - messaging
  - braze
  - migration
  - phone
triggers:
  - Transfer WhatsApp phone number
  - Move phone between workspaces
  - Integrate WhatsApp into workspace
  - Archive subscription group
  - Reverse WhatsApp transfer
---
## Transfer WhatsApp Phone Numbers Between Workspaces

Move a WhatsApp Business Account (WABA) phone number and its subscription group from one Braze workspace to another without engineering help.

### Prerequisites

- **Permission required**: "Manage Subscription Groups" in both source and destination workspaces
- WABA cannot cross multiple Braze clusters (same company typically means same cluster)

### Transfer Steps

**Step 1 — Archive the subscription group (source workspace)**
1. Navigate to **Audience** > **Subscription Group Management**
2. Find the subscription group tied to the phone number
3. Hover over the status and select **Archive** — marks it inactive, does not delete it

**Step 2 — Integrate into the new workspace**
1. In the destination workspace, go to **Partner Integrations** > **Technology Partners** > **WhatsApp**
2. Scroll to **WhatsApp Messaging Integration**
3. Select **Create new subscription group and phone number**
4. During setup, select the phone number from the archived subscription group

**Step 3 — Verify**
- Confirm the phone number is associated with the new workspace's subscription group
- Send and receive a test message

### Key Notes

- **Reversing the transfer**: Archive in the destination workspace, then re-integrate into the original workspace using the same steps
- **Meta Business Manager**: No changes needed there during transfer — the phone number stays registered
