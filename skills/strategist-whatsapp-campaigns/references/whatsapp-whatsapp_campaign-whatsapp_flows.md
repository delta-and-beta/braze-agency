---
name: whatsapp-whatsapp_campaign-whatsapp_flows
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/whatsapp/whatsapp_campaign/whatsapp_flows
indexed_at: '2026-04-05'
keywords:
  - flows
  - whatsapp
  - canvas
  - templates
  - responses
  - attributes
  - schema
  - messaging
  - interactive
  - forms
triggers:
  - Set up WhatsApp Flows
  - Save Flow responses as custom attributes
  - Configure Flow messages in Canvas
  - Preview WhatsApp Flows
  - Map Flow response fields
---
## WhatsApp Flows

WhatsApp Flows enhances the WhatsApp channel with interactive, dynamic messaging experiences — multi-page forms users navigate within the chat thread.

### Setting Up Flows

Create Flows from two locations in Meta:
- **Account tools > Flows tab** — view Flow ID, create new Flows
- **Manage templates** (recommended) — create templates and select a Flow option during template creation

When creating a Flow, choose:
- **Custom Form** — for specific requirements
- **Pre-designed Elements** — for quicker setup

### Configuring Flow Messages in Braze Canvas

**Template message:**
Add a WhatsApp message step using a template that already contains the Flow. No additional Flow configuration is required at compose time.

**Response message:**
Add a WhatsApp message step, select "response message" type, then select the specific Flow from the dropdown.

### Previewing a Flow

Use **Preview Flow** before launching a Canvas to confirm behavior. The preview is interactive — you can navigate all pages and make real-time adjustments.

### Saving Full Flow Responses as Custom Attributes

Braze stores Flow responses as nested custom attributes (NCAs). It needs the expected JSON response shape to generate the NCA schema.

**Step 1: Generate the schema**

Recommended method:
1. Set up your WhatsApp message step
2. Check **Save Flow responses as a custom attribute**
3. Send a test message and complete the Flow yourself

Braze infers the schema from the actual response shape.

**Alternative — Advanced JSON editor:**
```
{"attributes": [{"flow_1": {{whats_app.${inbound_flow_response}}}}]}
```
Where `flow_1` is the target custom attribute name.

**Alternative — UI editor:**
1. Pre-create a custom attribute with `object` data type in workspace settings
2. Set key value to `{{whats_app.${inbound_flow_response}}}}` before selecting the custom attribute

**Step 2: View the saved response**

After Flow completion, Braze auto-creates a Flow custom attribute named by Flow ID. View it in the user profile under **Custom Attributes** as a nested object. The schema section shows expected data types per field (e.g., "String", "String Array").

### Key Considerations

| Consideration | Detail |
|---|---|
| Existing schema | If a Flow's custom attribute already exists, no test send is needed |
| Flow changes | After changing a Flow, send a new test to update the schema; limited to once per 24 hours |
| Consistency | The custom attribute is the same across all Canvases using the same Flow |
| Manual option | You can skip the checkbox and save specific fields using the JSON editor instead |

### Saving Specific Fields to Custom Attributes

To map individual Flow response fields to specific custom attributes (rather than saving the entire response), use an **Action Path** Canvas step or an action-based campaign to intercept the inbound Flow response and extract fields via Liquid.
