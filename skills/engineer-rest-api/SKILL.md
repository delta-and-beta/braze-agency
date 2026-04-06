---
name: engineer-rest-api
description: >-
  Builds and integrates Braze REST API endpoints for messaging, SMS, email, and
  product recommendations.
metadata:
  role: braze-engineer
  topics:
    - rest-api-sending-messages
    - rest-api-sending-sms-messages
    - rest-api-sending-email-messages
    - rest-api-reminder-messaging
    - rest-api-recommending-products
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
Nick's topic files are atomic knowledge units that live inside `skills/{name}/references/*.md`. A well-written SKILL.md body references those topic files explicitly — this enables Claude Code's progressive disclosure system to load detailed content only when needed, keeping the skill trigger lean (~1,500–2,000 words) while the full knowledge lives in references.
`─────────────────────────────────────────────────`

Here is the generated skill body:

---

# REST API Implementation

Build and integrate Braze REST API endpoints for transactional messaging, campaign delivery, SMS, email, reminders, and AI-driven product recommendations. This skill covers the full lifecycle of API-driven message delivery: constructing request payloads, selecting correct endpoints, handling authentication, and debugging delivery failures.

## Scope

This skill applies whenever a Braze integration requires sending or scheduling messages programmatically — outside of the dashboard and without relying on canvas or campaign triggers alone. It covers five primary delivery surfaces:

- **Transactional and broadcast messages** via `/messages/send`
- **SMS messages** via the SMS-specific send endpoints
- **Email messages** with per-recipient personalization via Liquid
- **Reminder messages** driven by user-selected dates stored as custom attributes
- **Product recommendation messages** powered by Catalogs or Connected Content

The lens is **API integration and message delivery**: every decision here is evaluated against latency, payload correctness, rate limits, and delivery reliability — not UX or campaign strategy.

## When to Use This Skill

Apply this skill when:

- Implementing a backend service that calls Braze's `/messages/send`, `/messages/schedule/*`, or channel-specific endpoints
- Debugging a failed or delayed API-triggered message
- Designing a recommendation or personalization flow that populates user attributes before send time
- Building a reminder workflow that stores a user-chosen date as a custom attribute and fires on that date

Do not use this skill for in-app message design, canvas branching logic, or segment-level audience targeting — those fall under separate skills.

## Topics Synthesized

This skill draws from five reference topics. Consult them for endpoint-specific details, payload schemas, and edge case handling:

| Topic | File | Purpose |
|---|---|---|
| Sending Messages via API | `references/sending-messages-via-api.md` | Core `/messages/send` payload structure, authentication, rate limits, broadcast vs. targeted sends |
| Sending SMS Messages via API | `references/sending-sms-messages-via-api.md` | SMS-specific endpoint variants, subscription state validation, opt-out handling |
| Sending Email Messages via API | `references/sending-email-messages-via-api.md` | Email payload construction, Liquid personalization, attachment handling, reply-to configuration |
| Reminder Messaging via API | `references/reminder-messaging-via-api.md` | Custom attribute–driven reminder pattern, landing page self-selection flow, scheduled send setup |
| Product Recommendations via API | `references/product-recommendations-via-api.md` | RE output storage on user profiles, Catalogs lookup at send time, Connected Content fallback |

Load the relevant reference file when working on that specific delivery surface.

## Core Implementation Pattern

Every API-triggered send follows this sequence:

1. **Authenticate** — include the workspace REST API key in the `Authorization: Bearer` header
2. **Identify the recipient** — use `external_id`, `braze_id`, or an alias; never send to anonymous profiles without an alias
3. **Construct the payload** — match the schema for the target channel (message object shape differs for email, SMS, push)
4. **Set delivery controls** — specify `broadcast: true` explicitly for no-recipient sends; set `override_frequency_capping` only when justified
5. **Handle the response** — check `dispatch_id` on 201, parse error codes on 4xx/5xx, and log for retry

For scheduled sends, replace `/messages/send` with `/messages/schedule/create` and include an ISO 8601 `time` field. Use `/messages/schedule/update` and `/messages/schedule/delete` for lifecycle management.

## Authentication

All REST API calls require a workspace-level REST API key:

```
Authorization: Bearer {REST_API_KEY}
Content-Type: application/json
```

API keys are scoped by permission. Ensure the key used for sending has the **Send messages** permission enabled. Keys with only read permissions will return `401`.

## Rate Limits

| Endpoint | Default Limit |
|---|---|
| `/messages/send` | 250 requests/min |
| `/messages/schedule/create` | 250 requests/min |
| SMS send endpoints | Varies by carrier |

Implement exponential backoff on `429` responses. For high-volume sends, use the `/messages/send` `recipients` array to batch up to 50 recipients per request rather than issuing one request per user.

## Personalization via Liquid

Liquid templates in message bodies resolve against the recipient's profile at send time. Store recommendation output, reminder dates, and dynamic content as custom attributes on the user profile before the send call:

```json
{
  "attributes": [
    {
      "external_id": "user_123",
      "reminder_date": "2026-05-01",
      "top_product_id": "SKU-9981"
    }
  ]
}
```

Then reference in message body: `{{ custom_attribute.${reminder_date} }}` or `{{ custom_attribute.${top_product_id} }}`.

For product metadata not stored on the profile, use Connected Content to fetch from Catalogs at send time. See `references/product-recommendations-via-api.md` for the full pattern.

## Debugging Delivery Failures

When a send returns success (`201`) but the message is not received:

1. Check **Message Activity Log** in the Braze dashboard for suppression reasons
2. Verify the recipient is **reachable** on the channel (subscribed for email/SMS, has a push token for push)
3. Confirm **frequency capping** has not suppressed the send
4. For SMS, validate the `subscription_group_id` matches the sending number's group
5. For scheduled sends, verify the scheduled time is in the future and the timezone is correctly specified

For `4xx` errors, the response body includes a `message` field with the specific validation failure. Common causes: missing `broadcast` flag, invalid `external_id`, malformed Liquid in the message body.

## Additional Resources

### Reference Files

- **`references/sending-messages-via-api.md`** — Full `/messages/send` schema, broadcast mode, dispatch ID handling
- **`references/sending-sms-messages-via-api.md`** — SMS endpoint variants, subscription group requirements, opt-out compliance
- **`references/sending-email-messages-via-api.md`** — Email payload, Liquid personalization, attachment support
- **`references/reminder-messaging-via-api.md`** — User-selected reminder pattern, landing page flow, scheduled send lifecycle
- **`references/product-recommendations-via-api.md`** — RE output storage, Catalogs at send time, Connected Content integration

---

`★ Insight ─────────────────────────────────────`
The skill body references each topic file by path (`references/*.md`) rather than inlining their content. This is intentional: Claude Code's progressive disclosure system loads those files into context only when Claude determines they're needed, keeping the initial skill trigger under ~1,800 words while full schemas and edge cases remain accessible. The summary table at the top of "Topics Synthesized" acts as a routing guide — Claude reads it and knows exactly which reference to load for a given sub-task.
`─────────────────────────────────────────────────`
