---
name: message-building-by-channel-webhooks-creating-a-webhook
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/webhooks/creating_a_webhook
indexed_at: '2026-04-05'
keywords:
  - webhook
  - campaign
  - canvas
  - endpoint
  - payload
  - Liquid
  - HTTP
  - personalization
  - JSON
  - integration
triggers:
  - how to create a webhook campaign
  - webhook personalization and Liquid
  - sending data to external systems
  - webhook endpoint configuration
  - webhook vs canvas for automations
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's pipeline are "atomic knowledge units" — they live inside a skill's `references/` directory and are designed to be self-contained snippets that the routing system can surface individually. Stripping Jekyll template syntax (`{%`, `{{site.baseurl}}`) and collapsing tab-based navigation into flat prose is key to making them LLM-readable.
`─────────────────────────────────────────────────`

## Creating a Webhook Campaign

Webhooks let you trigger non-app actions by sending real-time information to external systems (Salesforce, Marketo, your own backend). Use cases include crediting customer accounts after custom events.

---

## Step 1: Choose Campaign vs Canvas

| Use | When |
|-----|------|
| **Campaign** | Single, targeted webhook send |
| **Canvas** | Multi-step user journeys requiring a webhook step |

### Campaign Setup
1. Go to **Messaging > Campaigns** > **Create Campaign**
2. Select **Webhook** (single channel) or **Multichannel**
3. Name the campaign clearly; optionally add description, teams, and tags
4. Add variants as needed — each variant can use a different webhook template
   - Tip: Compose one message first, then use **Copy from Variant** when adding more

### Canvas Setup
1. Create your Canvas, then add a step in the Canvas builder
2. Set a step schedule and delay
3. Filter audience for this step (checked after delay, at send time)
4. Set advancement behavior and any additional messaging channels

---

## Step 2: Build the Webhook (Compose Tab)

### Webhook URL
- Specifies the endpoint receiving the data
- Get this URL from the vendor's API docs or your engineering team
- Braze only allows ports **80** (HTTP) and **443** (HTTPS)
- Supports **Liquid personalization** — always include a default value for user-specific fields

### HTTP Method
- Varies by endpoint; **POST** is most common

### Request Body — Two Options

**JSON Key-Value Pairs**
- Use when the endpoint expects JSON
- Enter key/value pairs in the UI; the composer generates valid JSON automatically
- Supports Liquid for user attributes, custom attributes, and event properties
- Example: key `message_body`, value `Your order just arrived!`
- Always set default values for each Liquid attribute

**Raw Text**
- Use for any non-JSON format (e.g., XML)
- Full Liquid personalization and internationalization supported
- Set `Content-Type` request header to match the format

### Internationalization
- Select **Add Languages** before writing content
- Liquid-based; fill text per language in the template
- Right-to-left language rendering depends on the receiving service provider

---

## Key Constraints
- Ports: HTTP (80) and HTTPS (443) only
- Liquid default values required for all user-specific URL or body fields
- JSON key-value mode only works with JSON-expecting endpoints; use raw text otherwise
