---
name: whatsapp-whatsapp_campaign
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/whatsapp/whatsapp_campaign/whatsapp_flows
indexed_at: '2026-04-05'
keywords:
  - flows
  - template
  - canvas
  - attributes
  - schema
  - messaging
  - forms
  - responses
  - routing
  - preview
triggers:
  - how to create a flow
  - add flow to canvas message
  - preview flow responses
  - save flow response as attribute
  - generate flow schema
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's pipeline are atomic knowledge units — they live in `skills/{name}/references/*.md` and are designed to be retrievable independently. Good topic files strip Jekyll/Liquid templating artifacts and navigation structure, leaving only the semantic content that helps an AI agent answer questions accurately.
`─────────────────────────────────────────────────`

## WhatsApp Flows

WhatsApp Flows adds interactive, dynamic messaging to the WhatsApp channel — enabling multi-page forms and structured data collection within a conversation.

## Creating a Flow

Two entry points in Meta:
- **Account tools > Flows tab** — view Flow IDs and create new Flows
- **Manage templates** (recommended) — create Flows during template creation

When creating a Flow, choose:
- **Custom Form** — for specific/complex requirements
- **Pre-designed Elements** — for faster setup

## Adding a Flow to a Canvas Message Step

Two message types support Flows:

**Template message:** Select a template that already has a Flow attached. No additional Flow configuration needed in Braze — Flow selection was made at template creation time.

**Response message:** Select the Flow explicitly in the message composer when setting up the Canvas step.

## Previewing a Flow

Before launching, use **Preview Flow** in Braze to:
- Confirm behavior matches expectations
- Interact with each page of a multi-page Flow
- Make real-time adjustments

## Saving the Full Flow Response as a Custom Attribute

Braze can capture the entire structured JSON response from a Flow and store it as a **nested custom attribute (NCA)**.

### Generating the Schema (Recommended)

1. Set up your WhatsApp message step
2. Check **Save Flow responses as a custom attribute**
3. Send yourself a test message and complete the Flow as a user

Braze learns the response shape from the test and auto-generates the NCA schema. The attribute name is based on the Flow ID and is **consistent across all Canvases** that use it.

After schema generation, the **Flow Custom Attribute** section shows the expected structure with data types (e.g., `String`, `String Array`).

### Alternative: Advanced JSON Editor

```liquid
{"attributes": [{"flow_1": {{whats_app.${inbound_flow_response}}}}]}
```

Replace `flow_1` with your target custom attribute name.

### Alternative: UI Editor

1. Pre-create a custom attribute with **Object** data type in workspace settings
2. Set the key value to `{{whats_app.${inbound_flow_response}}}` before selecting the attribute

## Saving Specific Fields from a Flow Response

Use an **Action Path** Canvas step (or action-based campaign) to route based on Flow response values and save individual fields to specific custom attributes — avoids duplicating the full response object.

## Important Constraints

| Constraint | Detail |
|---|---|
| Schema re-generation | After changing a Flow, send a new test message to update the schema. Limited to **once per 24 hours**. |
| Existing schemas | If a schema already exists for a Flow ID, no test send is needed — Braze already knows the shape. |
| Attribute consistency | The same Flow ID always maps to the same custom attribute, regardless of which Canvas uses it. |
| Manual option | The "Save as custom attribute" checkbox is optional — you can manually save specific fields instead. |
