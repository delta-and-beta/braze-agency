---
name: engineer-api-data
description: >-
  API usage, webhook troubleshooting, user management, data type operations, and
  technical help resources.
metadata:
  role: braze-engineer
  topics:
    - help-home
    - help-help-articles
    - help-overview
    - help-api
    - help-api-webhook-connected-content-errors
    - help-api-delete-user
    - help-api-attribute-name-id-across-sources
    - help-data
    - help-data-dispatch-id
    - help-data-change-custom-data-type
    - help-data-blocklisting-deletion
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
This skill file follows a **reference skill** pattern — its job is orienting Claude on *when* to apply it and *what* it covers, not encoding exhaustive docs. The topics with minimal source content ("Note: Source documentation was minimal") are worth acknowledging briefly but shouldn't pad the file with noise.
`─────────────────────────────────────────────────`

# API & Data Integration

## Overview

This skill covers the practical mechanics of interacting with Braze programmatically — from REST API calls and webhook debugging to managing user records and custom data types. Apply this skill when questions involve API behavior, data pipeline troubleshooting, or understanding how Braze-internal identifiers behave across surfaces.

**Lens:** How to integrate with Braze APIs and manage data operations

---

## When to Use This Skill

Use this skill when the question involves:

- Calling Braze REST API endpoints (user data, messaging, export)
- Debugging webhook or Connected Content HTTP errors
- Understanding how to delete or blocklist users and custom data
- Reconciling campaign/Canvas attribute names between Liquid, the REST API, and Currents
- Changing custom attribute or event data types in the dashboard
- Understanding `dispatch_id` behavior for scheduled vs. triggered messages
- Navigating Braze Help Center resources for API-related issues

---

## Topics Synthesized

| Topic | What It Covers |
|---|---|
| **Webhook & Connected Content Errors** | Common HTTP error codes and troubleshooting steps for webhook and Connected Content requests |
| **Delete User API** | What data is nulled when a user is deleted via the REST API |
| **Attribute Names & IDs Across Sources** | How campaign, Canvas, and Canvas Step names/IDs map across Liquid, REST API, and Currents |
| **Dispatch ID Behavior** | How `dispatch_id` is assigned — unique per transmission, shared for scheduled sends |
| **Change Custom Data Type** | Dashboard workflow for changing custom attribute or event data types |
| **Blocklisting vs. Deletion** | Behavioral difference between blocklisting custom data and deleting it |
| **Help Center Resources** | Entry points to Braze Help Center for API, data, and integration articles |

---

## Key Concepts

### Webhook & Connected Content Troubleshooting

When a webhook or Connected Content request fails, Braze surfaces HTTP error codes in the message activity log. Common patterns:

- **4xx errors** — client-side: malformed request, authentication failure, rate limit exceeded
- **5xx errors** — server-side: the target endpoint is unavailable or erroring
- Connected Content failures do not retry by default; use `:retry` to opt in

### User Deletion via API

Deleting a user via `/users/delete` nulls all attributes, events, and purchases tied to that profile. This is irreversible. Downstream systems (Currents, exports) will no longer receive data for that user. If the goal is to stop messaging without losing history, consider suppression lists instead.

### Blocklisting vs. Deleting Custom Data

| Action | Effect |
|---|---|
| **Blocklist** | Stops ingesting new data for that attribute/event; existing data retained on profiles |
| **Delete** | Removes the attribute/event definition and all data across profiles |

Blocklisting is reversible; deletion is not. Blocklist first if uncertain.

### Attribute Names Across Sources

Campaign and Canvas attributes surface differently depending on where you access them:

- **Liquid**: `campaign.${api_id}`, `canvas.name`, etc.
- **REST API**: `campaign_id`, `canvas_id`, `canvas_step_id`
- **Currents**: field names in event schemas (e.g., `campaign_id`, `message_variation_id`)

When an ID from one surface doesn't match another, consult the attribute mapping reference in Braze docs — the same entity often has different field names per surface.

### Dispatch ID

`dispatch_id` identifies a single message transmission. Key behaviors:

- Scheduled messages sent to multiple users at the same time share a `dispatch_id`
- Action-based or API-triggered sends generate a unique `dispatch_id` per user
- Use `dispatch_id` for deduplication in Currents data or when correlating send events

### Changing Custom Attribute Data Types

To change the data type of a custom attribute (e.g., string → number), navigate to **Data Settings → Custom Attributes** in the Braze dashboard. Note: changing a data type affects how new data is ingested going forward; existing data on profiles may behave unexpectedly until profiles are updated.

---

## Common Mistakes

- **Confusing blocklisting with deletion** — blocklisting is safe and reversible; deletion is permanent across all profiles
- **Expecting `dispatch_id` to be unique per user** — it is unique per transmission event, not per recipient, for scheduled sends
- **Mismatching attribute names between Liquid and Currents** — they use different field naming conventions; always verify against the attribute mapping table
- **Not using `:retry` on Connected Content** — without it, transient failures will silently drop personalization data

---

## Help Center Entry Points

For issues not covered by the synthesized topics above, the Braze Help Center organizes articles by category:

- **API articles** — endpoint-specific guidance, rate limits, authentication
- **Data articles** — custom attributes, events, purchases, data type management
- **Overview / Home** — general navigation to support resources

When escalating or searching, start with the API or Data category depending on whether the issue is connectivity/authentication vs. schema/type related.
