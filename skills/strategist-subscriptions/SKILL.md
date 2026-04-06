---
name: strategist-subscriptions
description: >-
  Manages subscription group status, user preferences, and preference center
  configuration for opt-in/opt-out compliance.
metadata:
  role: braze-strategist
  topics:
    - endpoints-subscription-groups-post-update-v2
    - endpoints-subscription-groups-post-update
    - endpoints-subscription-groups-get-list
    - endpoints-subscription-groups-get-status
    - endpoints-preference-center-put-update
    - endpoints-preference-center-post-create
    - endpoints-preference-center-get-view-details
    - endpoints-preference-center-get-list
    - endpoints-preference-center-get-create-url
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
The skill body (no frontmatter) acts as the "loaded context" layer in progressive disclosure — it's what Claude reads when the skill triggers. Writing in imperative form keeps it dense and instruction-oriented rather than conversational, which improves how AI agents parse and apply it.
`─────────────────────────────────────────────────`

# Subscription & Preference Management

## Purpose

Use this skill to manage user consent, subscription states, and preference configurations in Braze. This covers the full lifecycle of opt-in/opt-out compliance: querying current subscription states, updating them in bulk, and building or maintaining the preference centers that surface these controls to end users.

The lens for this skill is **user consent and preference management for compliance** — every API operation here touches data that governs whether Braze may legally send a message to a user. Treat all subscription state changes as compliance operations, not just data writes.

---

## Scope

This skill synthesizes nine API surfaces across two domains:

### Subscription Group State APIs

| Operation | Method + Endpoint | Purpose |
|-----------|-------------------|---------|
| Batch update subscription state | `POST /v2/subscription/status/set` | Update up to 50 users across multiple groups (email, SMS, WhatsApp) |
| List user's subscription groups | `GET /subscription/user/status` | Retrieve all groups and status history for one or more users |
| Get subscription state for a group | `GET /subscription/status/get` | Check `Subscribed`, `Unsubscribed`, or `Unknown` for users in a specific group |

### Preference Center APIs

| Operation | Method + Endpoint | Purpose |
|-----------|-------------------|---------|
| Create preference center | `POST /preference_center/v1` | Provision a new preference center for email campaigns |
| Update preference center | `PUT /preference_center/v1/{preferenceCenterExternalID}` | Modify an existing preference center's configuration |
| View preference center details | `GET /preference_center/v1/{preferenceCenterExternalID}` | Retrieve full config, creation/update timestamps |
| List all preference centers | `GET /preference_center/v1/list` | Enumerate available preference centers in a workspace |
| Generate user-specific URL | `GET /preference_center/v1/{preferenceCenterExternalID}/url/{userID}` | Create a unique, user-scoped preference center URL |

---

## When to Apply This Skill

Apply this skill when the task involves any of the following:

- **Bulk opt-out or re-opt-in operations**: Processing suppression lists, honor unsubscribe requests, or re-engagement campaigns that require resetting subscription state for many users at once
- **Compliance audits**: Verifying that specific users are unsubscribed from required groups before a send, or retrieving status history as evidence of consent
- **Preference center setup or migration**: Building new preference centers, updating group associations, or generating per-user links for email footers or account settings pages
- **Cross-channel subscription coordination**: Managing subscription state consistently across email, SMS, and WhatsApp for the same user pool
- **Debugging deliverability**: Investigating why a user did not receive a message by checking their subscription state across relevant groups

---

## Key Concepts

### Subscription States

Every user-group relationship resolves to one of three states:

- **`Subscribed`** — User has explicitly opted in; eligible to receive messages from this group
- **`Unsubscribed`** — User has opted out; Braze will suppress sends to this user for this group
- **`Unknown`** — No state has been recorded; behavior depends on workspace settings (often treated as opted-in for opt-out programs, or suppressed for opt-in programs)

When writing subscription updates, always confirm the target state explicitly — never assume a default.

### V2 Batch API vs. Legacy

The `POST /v2/subscription/status/set` endpoint accepts a `subscription_groups` array per user, enabling multi-group updates in a single user object. The legacy v1 endpoint (`POST /subscription/status/set`) updates one group at a time per request. Prefer V2 for any bulk operation to reduce API call volume and keep updates atomic per user.

### Required Permissions

Every endpoint in this skill requires a specific REST API key permission. Verify the key in use has the correct scope before constructing requests:

| Endpoint category | Required permission |
|-------------------|-------------------|
| Update subscription status | `subscription.status.set` |
| Read subscription status/groups | `subscription.groups.get` |
| Create/update preference center | `preference_center.update` |
| Read preference center | `preference_center.get` |
| List preference centers | `preference_center.list` |

### Rate Limits

The subscription status endpoints share Braze's standard rate limit tier. For large-scale operations (tens of thousands of users), batch requests at the maximum 50-user limit and implement backoff handling for `429` responses.

---

## Workflow Patterns

### Pattern 1: Bulk Subscription State Update

To update subscription state for a cohort of users:

1. Retrieve current state via `GET /subscription/user/status` for a sample to confirm group IDs
2. Chunk the user list into batches of ≤50
3. For each batch, construct a `POST /v2/subscription/status/set` request with a `subscription_groups` array per user
4. Log responses and flag any users where the API returns an error — do not silently skip failures in compliance contexts

### Pattern 2: Pre-Send Compliance Check

To verify subscription eligibility before a campaign send:

1. Call `GET /subscription/status/get` with the target subscription group ID and a sample of recipient `external_id`s or email addresses
2. Confirm all returned states are `Subscribed`
3. Flag any `Unknown` states for review — resolve according to the workspace's opt-in model before proceeding

### Pattern 3: Preference Center Lifecycle

To create and surface a new preference center:

1. Define the set of subscription groups to expose (obtain group IDs from the Braze dashboard or via the subscription group APIs)
2. Call `POST /preference_center/v1` with the group configuration and desired page settings
3. Retrieve the created center's details via `GET /preference_center/v1/{id}` to confirm structure
4. For each user who needs a direct link (e.g., in an email footer), call `GET /preference_center/v1/{id}/url/{userID}` — URLs are user-scoped and should not be cached or shared across users
5. To update the center later (add/remove groups, change layout), use `PUT /preference_center/v1/{id}`

---

## Compliance Considerations

Subscription state is legally significant in most jurisdictions (CAN-SPAM, GDPR, CASL, TCPA for SMS). When advising on or implementing subscription management:

- **Never re-subscribe a user who has explicitly unsubscribed** without a new, verifiable opt-in event
- **Retain audit evidence**: For regulated channels (SMS, transactional email), log the source and timestamp of every subscription state change
- **Distinguish channel types**: An email unsubscribe does not automatically apply to SMS, and vice versa — these are managed through separate subscription groups
- **Preference centers are UI, not enforcement**: A preference center gives users visibility; the actual enforcement happens at the subscription group level. Confirm that preference center group selections map correctly to the groups used in campaign targeting

---

## Reference Files

For complete endpoint request/response schemas and field-level documentation, consult the topic reference files in `references/`:

- **`references/subscription-status-set-v2.md`** — Full V2 batch update endpoint spec
- **`references/subscription-status-set.md`** — Legacy V1 update endpoint spec
- **`references/subscription-user-status.md`** — List user subscription groups endpoint
- **`references/subscription-status-get.md`** — Get subscription group status endpoint
- **`references/preference-center-create.md`** — Create preference center endpoint
- **`references/preference-center-update.md`** — Update preference center endpoint
- **`references/preference-center-details.md`** — View preference center details endpoint
- **`references/preference-center-list.md`** — List preference centers endpoint
- **`references/preference-center-url.md`** — Generate user preference center URL endpoint

`★ Insight ─────────────────────────────────────`
The "Workflow Patterns" section above serves a specific purpose: it bridges individual API endpoints into multi-step procedures. Without it, a language model reading this skill would know the APIs exist but not how to sequence them for real-world tasks like a pre-send compliance check. Patterns encode the "when and in what order" knowledge that can't be derived from endpoint specs alone.
`─────────────────────────────────────────────────`
