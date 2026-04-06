---
name: engineer-email-api
description: >-
  Implements email endpoint operations including spam removal, bounce
  management, blocklisting, and subscription status.
metadata:
  role: braze-engineer
  topics:
    - email-post-remove-spam
    - email-post-remove-hard-bounces
    - email-post-email-subscription-status
    - email-post-blocklist
    - email-post-blacklist
    - email-get-query-unsubscribed-email-addresses
    - email-get-query-by-email-or-phone
    - email-get-list-hard-bounces
    - email-delete-remove-subscription-state
    - endpoints-email
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
The writing-skills skill emphasizes **CSO (Claude Search Optimization)** — structuring skill content so future Claude instances can quickly scan and locate the right reference. For an API reference skill like this, that means leading with a quick endpoint table and organizing by operation type (write vs. read vs. delete), not by arbitrary topic order.
`─────────────────────────────────────────────────`

Here is the generated skill file body:

---

# Email API Engineering

## Overview

This skill covers the full set of Braze email management endpoints: suppression list operations (spam, bounce, blocklist), subscription state changes, and list queries. The lens is **implementation correctness and endpoint integration** — choosing the right endpoint, supplying required permissions and parameters, and avoiding deprecated paths.

Use this skill when:
- Implementing email list hygiene flows (spam removal, hard bounce removal, blocklisting)
- Reading or writing subscription states for users identified by email or phone
- Querying unsubscribes or hard bounces for sync with external systems
- Handling deprecated endpoint references in existing code

## Endpoint Quick Reference

| Operation | Method | Path | Permission Required |
|-----------|--------|------|---------------------|
| Remove from spam list | POST | `/email/spam/remove` | `email.spam.remove` |
| Remove hard bounce | POST | `/email/bounce/remove` | `email.bounce.remove` |
| Change subscription status | POST | `/email/status` | `email.status` |
| Blocklist (add + hard bounce) | POST | `/email/blocklist` | `email.blacklist` |
| ~~Blacklist (deprecated)~~ | POST | `/email/blacklist` | `email.blacklist` |
| Query unsubscribes | GET | `/email/unsubscribes` | `email.unsubscribes` |
| Query subscription by email/phone | GET | `/users/subscription` | — |
| List hard bounces | GET | `/email/hard_bounces` | `email.hard_bounces` |
| Delete subscription state | DELETE | `/users/subscription` | — |

## Topics Synthesized

This skill synthesizes the following reference topics:

- **Remove Email from Spam List** — `POST /email/spam/remove` clears an address from both Braze's spam list and the downstream email provider's list simultaneously.
- **Remove Hard Bounced Emails** — `POST /email/bounce/remove` mirrors the same dual-removal pattern for bounce records.
- **Change Email Subscription Status** — `POST /email/status` sets subscription state and works even for email addresses not yet attached to a Braze user profile.
- **Add Emails to Blocklist** — `POST /email/blocklist` both unsubscribes the user and marks them as hard bounced in a single call.
- **Add Emails to Blacklist (Deprecated)** — `POST /email/blacklist` is functionally identical to `/email/blocklist`; use the blocklist path in all new code.
- **Query Unsubscribed Email Addresses** — `GET /email/unsubscribes` returns addresses that unsubscribed within a date range; primary input for bi-directional external sync.
- **Query Subscription by Email or Phone** — `GET /users/subscription` returns subscription state keyed on email address or phone number.
- **List Hard Bounced Emails** — `GET /email/hard_bounces` retrieves hard-bounced addresses within a specified time frame.
- **Delete Email Subscription State** — `DELETE /users/subscription` removes subscription state records for users identified by email or phone.
- **Email Endpoints Overview** — top-level map of email endpoint categories and where each fits in the suppression/subscription lifecycle.

## Implementation Lens

When approaching email endpoint work through this skill, evaluate:

1. **Write vs. read operation** — suppression writes (`/spam/remove`, `/bounce/remove`, `/blocklist`) require specific `email.*` permissions scoped to each action. Read endpoints (`/email/unsubscribes`, `/email/hard_bounces`) use separate read-scoped permissions. Never assume a write permission covers a read.

2. **Blocklist vs. unsubscribe** — `/email/blocklist` (and its deprecated alias `/email/blacklist`) performs two actions in one: unsubscribe + hard bounce flag. `/email/status` only sets subscription state. Use blocklist when you need both effects atomically; use `/email/status` when you need fine-grained state control.

3. **Deprecated path detection** — `/email/blacklist` is a drop-in replacement target. Any code referencing it should be migrated to `/email/blocklist` with no parameter changes required.

4. **User association is not required for writes** — `/email/status` and `/users/subscription` (DELETE) can operate on email addresses that have no Braze user profile yet. The state is stored and associated when a profile is later created. This matters for pre-registration suppression flows.

5. **Date-range queries for sync** — `/email/unsubscribes` and `/email/hard_bounces` are time-windowed endpoints. When building bi-directional sync, always use the last-synced timestamp as the `start_date` parameter to avoid full reprocessing.

## Common Mistakes

| Mistake | Correct Approach |
|---------|-----------------|
| Using `/email/blacklist` in new code | Use `/email/blocklist` — identical function, active endpoint |
| Calling `/email/blocklist` when only unsubscribing is needed | Use `/email/status` to avoid unintentional hard bounce marking |
| Omitting the correct permission scope for each endpoint | Every email endpoint has its own required permission; check the quick reference table above |
| Querying unsubscribes without a date range for full history | Provide explicit `start_date`/`end_date`; unbounded queries may be rejected or return unexpected page sizes |
| Assuming subscription delete affects all channels | `DELETE /users/subscription` is scoped to email or phone; confirm channel targeting before calling |

## Endpoint Integration Pattern

```
# Typical spam/bounce list hygiene flow
1. GET /email/hard_bounces?start_date=&end_date=   → collect addresses
2. Validate addresses against your external system
3. POST /email/bounce/remove                        → remove confirmed false positives
4. POST /email/blocklist                            → add any new known-bad addresses

# Subscription state sync
1. GET /email/unsubscribes?start_date=<last_sync>  → delta of unsubscribes
2. Mirror changes to external CRM/ESP
3. POST /email/status                              → push external overrides back to Braze
```
