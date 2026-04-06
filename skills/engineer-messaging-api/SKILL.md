---
name: engineer-messaging-api
description: >-
  Implements SMS, messaging, and subscription group endpoints for multi-channel
  communication.
metadata:
  role: braze-engineer
  topics:
    - sms-post-remove-invalid-numbers
    - endpoints-sms
    - endpoints-messaging
    - endpoints-subscription-groups
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
**Progressive disclosure matters here**: The skill body should stay lean (~1,500-2,000 words) and act as a routing map — pointing Claude toward detailed reference content rather than embedding it inline. The topics provided become natural candidates for `references/` files.
`─────────────────────────────────────────────────`

Here is the generated skill body:

---

# Messaging API Engineering

## Scope and Purpose

This skill covers the implementation of Braze's outbound communication APIs — specifically SMS messaging, multi-channel message dispatch, and subscription group lifecycle management. Apply this skill when building integrations that send messages to users, manage opt-in/opt-out state, or control which channels a user receives communications on.

The lens for this skill is **multi-channel messaging implementation and subscription lifecycle management**: treat every API interaction as part of a coherent user communication journey, not a standalone send event. Subscription state governs deliverability; message routing governs channel selection; both must be modeled accurately to avoid compliance failures and silent delivery gaps.

## When to Use This Skill

Apply this skill when the task involves:

- Sending SMS messages or querying SMS-related infrastructure (invalid number lists, opt-out handling)
- Dispatching messages via the `/messages/send`, `/messages/schedule/*`, or `/messages/live_activity/*` endpoints
- Reading or writing subscription group membership for SMS, email, or WhatsApp channels
- Batch-updating user subscription states across multiple groups in a single request
- Debugging delivery failures related to subscription status, invalid phone numbers, or channel eligibility

Do **not** apply this skill for Canvas or campaign *configuration* (use the Campaigns/Canvas skill), user attribute writes unrelated to messaging (use the User Data skill), or Content Block management.

---

## Topics This Skill Synthesizes

### 1. Subscription Groups Endpoints

Subscription groups define a user's opt-in or opt-out status for a named communication channel segment (e.g., "Promotional SMS", "Transactional Email"). The V2 endpoint (`POST /v2/subscription/status/set`) supports batch updates across multiple groups and multiple users in a single call — up to 50 users per request.

Key implementation points:

- Always use V2 over V1 for new integrations; V2 supports multi-group payloads and is the maintained surface.
- The `subscription_groups` array in the request body accepts `subscription_group_id` + `subscription_state` pairs. Valid states: `subscribed`, `unsubscribed`.
- Reads use `GET /subscription/status/get` with either `external_id` or `email`/`phone` as the lookup key. Prefer `external_id` for determinism.
- Subscription group IDs are workspace-scoped — validate that the IDs used match the target workspace's API key.

For detailed endpoint shapes and field-level constraints, consult `references/subscription-groups.md`.

### 2. SMS Endpoints

The SMS surface includes both message dispatch (handled via the messaging endpoints) and number list management. The most operationally significant endpoint in this domain is the invalid number removal endpoint.

**Invalid number management (`POST /sms/invalid_phone_numbers/remove`):**

- Braze marks numbers invalid after carrier-reported delivery failures. Once marked, Braze will not attempt delivery to that number.
- The removal endpoint re-allows delivery attempts — use it only after confirming the number is corrected or the original failure was transient.
- The request body accepts an array of E.164-formatted phone numbers.
- Pair this endpoint with a `GET /sms/invalid_phone_numbers` audit query before bulk removal to avoid re-enabling known-bad numbers at scale.

For SMS send mechanics (short codes, long codes, rate limits), cross-reference the Messaging Endpoints section below.

For detailed request/response schemas and error codes, consult `references/sms-endpoints.md`.

### 3. Messaging Endpoints

The messaging endpoints dispatch content to one or more users immediately or on a schedule. The primary send surface is `POST /messages/send`.

Core concepts:

- **Recipient specification**: Provide `external_user_ids`, `user_aliases`, or a `segment_id`. For transactional sends to known users, always prefer `external_user_ids` over segment targeting to reduce latency and avoid unintended fan-out.
- **Message objects**: The request body includes typed message objects per channel (`sms`, `email`, `push`, etc.). Include only the channels you intend to send on — omitting a channel object does not suppress it if a Canvas is also in play.
- **Broadcast flag**: When sending to a segment without specifying recipients, set `"broadcast": true` explicitly. The API rejects segment-targeted sends without this flag to prevent accidental mass sends.
- **Campaign ID tracking**: Pass `campaign_id` to associate the send with an existing Braze campaign for analytics attribution. Omitting it creates an untracked send.

Schedule variants use `POST /messages/schedule/create` and accept a `schedule` object with `time` (ISO 8601) and optional `in_local_time` boolean.

For detailed endpoint reference including live activity and connected content interactions, consult `references/messaging-endpoints.md`.

---

## Implementation Lens: Multi-Channel Messaging and Subscription Lifecycle

When implementing against these endpoints, reason about two orthogonal concerns simultaneously:

**1. Channel eligibility before send**

Before dispatching a message, verify:
- The user has a reachable identifier for the target channel (phone number for SMS, email address for email).
- The user is `subscribed` (or `opted_in` for email) in the relevant subscription group — or the send is explicitly transactional and subscription state is intentionally bypassed via `override_frequency_capping`.
- For SMS: the number is not on the invalid list.

Skipping these checks produces silent failures — Braze accepts the API call but does not deliver.

**2. Subscription state as source of truth for compliance**

Subscription group state is the compliance record. Treat writes to subscription state (`/v2/subscription/status/set`) as high-integrity operations:

- Log the `external_id`, `subscription_group_id`, target state, and timestamp on every write.
- Do not infer subscription state from send history — always read it from `GET /subscription/status/get`.
- When a user opts out via an inbound SMS keyword (STOP), Braze updates the subscription state automatically. Avoid overwriting Braze-managed state with application-layer writes unless you are reconciling a known sync gap.

---

## Common Patterns

**Batch subscription update on user import:**
```
POST /v2/subscription/status/set
{
  "subscription_groups": [
    {
      "subscription_group_id": "<id>",
      "subscription_state": "subscribed",
      "external_ids": ["user_001", "user_002", ..., "user_050"]
    }
  ]
}
```
Cap at 50 `external_ids` per group object per request. For larger imports, chunk and sequence calls with backoff.

**Pre-send eligibility check flow:**
1. `GET /subscription/status/get?external_id=<id>&subscription_group_id=<id>` → assert `subscribed`
2. `GET /sms/invalid_phone_numbers` → assert number absent
3. `POST /messages/send` with SMS message object

**Removing a number from the invalid list after correction:**
1. Confirm the corrected number in your system of record.
2. `POST /sms/invalid_phone_numbers/remove` with `{"phone_numbers": ["+15551234567"]}`
3. Re-attempt send — do not assume the removal is synchronous; allow a brief propagation window in high-throughput systems.

---

## Error Handling

| HTTP Status | Interpretation | Action |
|-------------|----------------|--------|
| `400` | Malformed request body | Inspect field names, required fields, E.164 format for phone numbers |
| `401` | Invalid or wrong-workspace API key | Verify key matches target workspace |
| `403` | Endpoint not enabled or rate limited | Check workspace plan; implement exponential backoff |
| `429` | Rate limit exceeded | Back off and retry; log rate limit headers for adaptive throttling |

For subscription group errors specifically: a `400` on `/v2/subscription/status/set` often means an invalid `subscription_group_id` — validate IDs against the workspace before bulk operations.

---

## Additional Resources

- **`references/subscription-groups.md`** — Full V1/V2 endpoint shapes, field constraints, and migration notes from V1
- **`references/sms-endpoints.md`** — Invalid number list management, opt-out keyword handling, and SMS-specific error codes
- **`references/messaging-endpoints.md`** — Complete send/schedule endpoint reference including live activity, connected content headers, and broadcast safety

---

`★ Insight ─────────────────────────────────────`
**The error handling table is load-bearing**: For API-focused skills, a compact status-code table gives Claude fast, scannable decision logic without needing to read verbose documentation. It belongs in SKILL.md (always loaded) rather than a reference file, because it applies to every endpoint covered by this skill.

**Lens framing shapes reasoning, not just content**: The "channel eligibility before send" and "subscription state as compliance record" framing in the lens section teaches Claude *how to think* about these APIs, not just what fields they accept. This is the highest-leverage content in a skill body.
`─────────────────────────────────────────────────`
