---
name: architect-user-data-api
description: >-
  Manages user lifecycle through track, identify, merge, alias, and delete
  endpoints, plus external ID migration.
metadata:
  role: braze-architect
  topics:
    - endpoints-user-data-post-user-track
    - endpoints-user-data-post-user-track-synchronous
    - endpoints-user-data-post-user-identify
    - endpoints-user-data-post-user-delete
    - endpoints-user-data-post-user-alias
    - endpoints-user-data-post-users-alias-update
    - endpoints-user-data-post-users-merge
    - endpoints-user-data-external-id-migration
    - endpoints-user-data-post-external-ids-rename
    - endpoints-user-data-post-external-ids-remove
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- The `writing-skills` skill emphasizes TDD for documentation: baseline → minimal green → refactor/close loopholes. For a generated skill body like this, we follow the structure pattern rather than the testing ceremony (no agent to test against during generation).
- The "lens" is the key differentiator here — the same endpoints look different to an architect (design decisions, tradeoffs, when to use async vs sync) vs. an engineer (request schemas, rate limits). I'll write through the architect's perspective.
- Token efficiency matters: architect-facing skills should front-load decisions and tradeoffs, with reference details de-emphasized in favor of pointers.
`─────────────────────────────────────────────────`

Here is the generated skill file body:

---

# User Data API Endpoints

## Overview

This skill covers Braze's full user lifecycle API surface: ingesting behavioral events and profile updates, resolving identity across anonymous and identified states, merging duplicate profiles, and permanently removing user data. It is the primary reference for **user identity management and data ingestion architecture** — the decisions that determine how user records are created, resolved, and maintained across your system of record.

**Architect lens:** These endpoints are not just API calls — they encode identity resolution strategy. Every integration decision (async vs. sync, alias vs. external ID, merge vs. identify) shapes the long-term integrity of your user graph. Use this skill when designing ingestion pipelines, evaluating identity resolution approaches, or diagnosing data quality issues rooted in user profile management.

---

## When to Use This Skill

Use when:
- Designing a user data ingestion pipeline (events, purchases, profile attributes)
- Resolving identity for anonymous, alias-only, email-only, or phone-only users
- Planning a migration to new external IDs without breaking existing profiles
- Evaluating whether to use `/users/track` (async) vs. `/users/track/sync` (synchronous)
- Merging duplicate user profiles at scale
- Implementing GDPR/CCPA deletion workflows
- Debugging missing or duplicated user profiles

---

## Topics Covered

| Topic | Endpoint | Key Concern |
|---|---|---|
| User Track (async) | `POST /users/track` | High-throughput event/purchase/attribute ingestion |
| User Track (sync) | `POST /users/track/sync` | Guaranteed delivery before response |
| User Identify | `POST /users/identify` | Resolving anonymous → identified profiles |
| User Delete | `POST /users/delete` | Permanent, irreversible profile removal |
| User Alias Update | `POST /users/alias/update` | Updating existing alias values |
| Users Merge | `POST /users/merge` | Consolidating duplicate profiles (async) |
| External ID Rename | `POST /users/external_ids/rename` | Migrating to a new primary external ID |
| External ID Remove | `POST /users/external_ids/remove` | Removing deprecated external IDs post-migration |

---

## Core Architectural Concepts

### Identity Model

Braze supports multiple identity anchors, processed in priority order:

```
external_id  ← preferred, stable, system-of-record identifier
user_alias   ← secondary label (alias_name + alias_label pair)
email        ← fallback for email-only profiles
phone        ← fallback for phone-only profiles
braze_id     ← Braze-internal, read-only, not for ingestion
```

**Design principle:** Profiles without an `external_id` are inherently transient. Until identified, they cannot be reliably targeted across sessions or channels.

### Async vs. Synchronous Ingestion

| | `/users/track` | `/users/track/sync` |
|---|---|---|
| Response on receipt | `201 Created` | After processing completes |
| When to use | High-volume pipelines, best-effort | Need guarantee before continuing |
| Failure visibility | Delayed | Immediate |
| Throughput | Higher | Lower |

**Architect recommendation:** Default to async (`/users/track`) for event pipelines. Use sync only where a downstream step requires confirmed ingestion — e.g., personalization endpoints called immediately after profile update.

### Identity Resolution Pattern

When an anonymous session converts to an identified user:

```
1. Anonymous profile exists (alias-only, email-only, or phone-only)
2. POST /users/identify → merges anonymous profile into external_id profile
3. Anonymous profile is removed; attributes/events are preserved on identified profile
```

**Critical:** `identify` is one-directional and destructive on the anonymous side. Design the call site to be idempotent — calling identify twice on a profile that was already merged should not error.

### Merge vs. Identify

| Scenario | Endpoint |
|---|---|
| Anonymous → identified (first-time login) | `/users/identify` |
| Two identified profiles exist (de-dup) | `/users/merge` |
| Alias name is wrong/stale | `/users/alias/update` |

`/users/merge` is async and accepts up to 50 merge objects per request. The "winning" profile retains its external_id; the "losing" profile's data is merged in and the record is removed.

### External ID Migration

Used when the primary identifier changes (e.g., internal UUID → hashed customer ID):

```
1. POST /users/external_ids/rename  → sets new primary, demotes old to deprecated
2. Verify migration in downstream systems
3. POST /users/external_ids/remove  → permanently removes deprecated ID
```

**Warning:** Removal is irreversible. Do not call remove until the new external_id is confirmed stable in all integrations. The deprecated ID can still be used for lookups until removed — treat this window as a migration grace period.

### Deletion Architecture

`POST /users/delete` is permanent and cannot be undone. Design deletion workflows with:
- An audit log outside Braze before calling the endpoint
- Batch sizing ≤ 50 external IDs per request
- A confirmation step in any automated pipeline
- GDPR/CCPA right-to-erasure verification gate

---

## Common Architectural Mistakes

| Mistake | Impact | Fix |
|---|---|---|
| Calling `/users/track` before `/users/identify` for converted users | Events land on anonymous profile, don't migrate automatically | Identify first, then track |
| Using `/users/merge` for first-time identification | Overkill; requires two identified profiles | Use `/users/identify` instead |
| Calling `/users/external_ids/remove` immediately after rename | Race condition; downstream systems still holding old ID | Insert migration verification gate |
| Using `braze_id` as the ingestion key | `braze_id` is internal-only; not stable for integrations | Use `external_id` or a named alias |
| Omitting `alias_label` on alias creation | Aliases without labels cannot be reliably resolved | Always specify both `alias_name` and `alias_label` |
| Using sync track for all events | Unnecessary latency; sync blocks until processing | Reserve sync for cases requiring delivery confirmation |

---

## Batch Limits Quick Reference

| Endpoint | Max per request |
|---|---|
| `/users/track` | 75 events, 75 purchases, 75 attribute objects |
| `/users/delete` | 50 external IDs |
| `/users/merge` | 50 merge objects |
| `/users/alias/update` | 50 aliases |
| `/users/external_ids/rename` | 50 rename objects |
| `/users/external_ids/remove` | 50 IDs |

---

`★ Insight ─────────────────────────────────────`
- The skill organizes around **decision points**, not endpoint list — an architect needs to know "which endpoint for which situation" before they need request schema details. The comparison tables encode that decision logic concisely.
- The external ID migration section models the **grace period pattern** explicitly — a two-phase commit analog in the identity domain. This is the kind of non-obvious architectural nuance that distinguishes an architect skill from a reference doc.
- Token efficiency: heavy reference (request/response schemas, full error codes) is deliberately excluded — those live in topic reference files. This skill stays under ~500 words of prose by focusing on what can't be derived from an endpoint spec alone.
`─────────────────────────────────────────────────`
