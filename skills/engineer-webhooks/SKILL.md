---
name: engineer-webhooks
description: >-
  Webhook creation, templating, and integration patterns including
  Braze-to-Braze webhooks and lead scoring hooks.
metadata:
  role: braze-engineer
  topics:
    - message-building-by-channel-webhooks-creating-a-webhook
    - message-building-by-channel-webhooks-webhook-template
    - message-building-by-channel-webhooks-braze-to-braze-webhooks
    - message-building-by-channel-webhooks-lead-scoring
    - message-building-by-channel-webhooks-testing
    - message-building-by-channel-webhooks-reporting
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
Nick plugin skills (like this one) are *reference/knowledge skills* — they document domain expertise rather than enforce process discipline. The `writing-skills` TDD cycle (RED-GREEN-REFACTOR with baseline testing) is designed for process/discipline skills. For a generated reference skill like this, the focus shifts to: clear scope, strong keyword coverage for routing, and a useful engineering lens.
`─────────────────────────────────────────────────`

# Webhook Engineering

## Scope

This skill covers the full lifecycle of webhook creation, configuration, and integration within Braze — from building individual webhook requests to architecting multi-system orchestration flows. It focuses on the **HTTP integration layer**: how Braze sends structured payloads to external systems, how those systems respond, and how to design webhooks that are reliable, observable, and maintainable.

Use this skill when the task involves:
- Creating or editing webhook campaigns or Canvas steps
- Building Braze-to-Braze webhook orchestration (e.g., triggering a Canvas from another Canvas)
- Designing webhook templates for reuse across campaigns
- Constructing and validating JSON/form-encoded payloads with Liquid templating
- Implementing lead scoring or enrichment via outbound webhooks
- Testing, debugging, or interpreting webhook delivery reports

## Engineering Lens

This skill approaches webhooks as **HTTP integration contracts** — not just dashboard configuration. Every webhook involves a request shape (method, headers, body), a response contract (expected status codes, error handling), and a lifecycle (send → deliver → log → retry). When advising on webhooks, reason from:

1. **Payload construction first** — What data does the receiving system need? What Liquid variables are available at send time?
2. **HTTP semantics** — Is this a POST with JSON body, a form-encoded PUT, or a DELETE? Does the endpoint require auth headers?
3. **Idempotency and retries** — Braze will retry on failure. Is the receiving endpoint safe to call twice?
4. **Observability** — Can you distinguish delivery failures from processing failures in the Activity Log?

## Topics This Skill Synthesizes

### Webhook Templates
Save and reuse webhook configurations across campaigns via **Templates > Webhook Templates**. Templates capture the full request configuration — URL, method, headers, body — and can be cloned and customized per use case. Prefer templates over one-off webhooks for any endpoint called from more than one campaign.

### Creating a Webhook
Core creation flow: select HTTP method, set the endpoint URL, define request headers (including `Content-Type` and auth), and construct the request body using Liquid for dynamic personalization. Braze supports JSON body and form-encoded formats. Key decision point: `application/json` for REST APIs; `application/x-www-form-urlencoded` for legacy endpoints.

### Braze-to-Braze Webhooks
The primary pattern for **intra-platform orchestration**. Use a webhook campaign to call the Braze REST API — most commonly to trigger an API-triggered Canvas for a user based on behavior in another campaign or Canvas. Requires a valid Braze REST API key with the appropriate endpoint permission in the request headers. The request body targets the `/canvas/trigger/send` or `/campaigns/trigger/send` endpoints with a `recipients` array.

```json
POST https://rest.iad-01.braze.com/canvas/trigger/send
Headers:
  Authorization: Bearer {{api_key}}
  Content-Type: application/json

Body:
{
  "canvas_id": "your-canvas-id",
  "recipients": [{"external_user_id": "{{${user_id}}}"}]
}
```

### Webhook Lead Scoring
Outbound webhook pattern for triggering lead scoring updates in external systems (e.g., Salesforce, HubSpot, Marketo). The webhook fires on behavioral triggers and sends user attribute and event data to the scoring system. Design the payload to include the minimum identifying data (external ID or email) plus the event or attribute delta that should influence score.

### Webhook Testing
Braze provides a **Send Test** button in the webhook composer that fires the configured request with preview data. For production validation, inspect the **Message Activity Log** (Developer Console > Message Activity Log) — it records delivery status, HTTP response codes, and response bodies. A `2xx` from the endpoint confirms receipt; `4xx`/`5xx` indicate configuration or downstream issues.

For Braze-to-Braze webhooks, also check the Canvas entry source to confirm the triggered Canvas received users as expected.

### Webhook Reporting
Webhook delivery metrics appear in campaign/Canvas analytics under **Deliveries**. The Activity Log is the primary debugging surface — filter by message type `Webhook` to isolate delivery events. Response body inspection is available for failed requests. Note: Braze logs the HTTP response but does not track downstream processing in the external system.

## Quick Reference

| Task | Location |
|------|----------|
| Create reusable webhook | Templates > Webhook Templates |
| Braze-to-Braze trigger | POST `/canvas/trigger/send` or `/campaigns/trigger/send` |
| Test before launch | Webhook composer > Send Test |
| Debug delivery failures | Developer Console > Message Activity Log |
| Check response codes | Activity Log > Webhook entries |
| Add auth header | Request Headers > `Authorization: Bearer {{api_key}}` |

## Common Pitfalls

- **Wrong `Content-Type` header** — Sending JSON body without `Content-Type: application/json` causes many APIs to reject the request silently
- **Liquid rendered at send time** — Variables like `{{${email_address}}}` resolve to the specific user's value; test with a real user profile, not generic preview data
- **No retry idempotency** — Braze retries failed webhooks; design receiving endpoints to handle duplicate calls gracefully (use idempotency keys where supported)
- **API key scope too broad** — Braze-to-Braze webhooks only need `campaigns/trigger/send` or `canvas/trigger/send` permission; avoid using a full-access key
- **Missing error visibility** — A `200` response from the receiving server doesn't mean the action succeeded downstream; add logging on the receiving end to confirm processing
