---
name: architect-data-integration
description: >-
  Designs CDI pipeline patterns, job synchronization flows, and integration
  management strategies.
metadata:
  role: braze-architect
  topics:
    - cdi-post-job-sync
    - cdi-get-job-sync-status
    - cdi-get-integration-list
    - endpoints-cdi
    - endpoints-user-data
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
This skill file is a **Reference** type in the skill taxonomy — no TDD cycle needed, but structure should optimize for how Claude discovers and applies it: searchable symptom terms early, quick-scan tables, and a tight scope definition so Claude knows *when* to reach for it vs. other skills.
`─────────────────────────────────────────────────`

Here is the generated skill markdown:

---

# Data Integration Architecture

## Scope

This skill guides architectural decisions around Braze Cloud Data Ingestion (CDI) — the integration layer that syncs external data warehouses into Braze. Use this skill when designing, diagnosing, or orchestrating CDI pipeline flows, including triggering syncs, monitoring job health, and coordinating multi-integration strategies.

**Architect lens:** Every recommendation here is filtered through *data pipeline reliability, sync patterns, and integration orchestration*. Concerns such as latency tolerance, idempotency, sync sequencing, and failure recovery take priority over convenience or simplicity.

## When to Use

Apply this skill when the work involves:

- Designing a CDI sync strategy (scheduled vs. triggered, single vs. multi-integration)
- Triggering sync jobs programmatically and handling response states
- Querying sync job history to diagnose failures or audit pipeline behavior
- Enumerating active integrations to build routing or orchestration logic
- Sequencing CDI syncs alongside user merge operations or other data mutations
- Building reliability patterns around CDI — retries, fan-out, status polling

**Do not use for:** Braze Currents (event streaming), standard API import/export, or Segment/mParticle middleware configurations. Those are separate architectural domains.

## Topics Synthesized

This skill draws from the following reference areas:

### 1. Trigger CDI Job Sync
`POST /cdi/integrations/{integration_id}/sync`

Starts a sync for a given CDI integration. Requires the `cdi.integration_sync` API key permission. Central to any push-based or event-triggered pipeline design — use when external pipeline completion should drive Braze data freshness rather than waiting on a schedule.

**Architectural notes:**
- Fire-and-forget POST; the response confirms job initiation, not completion
- Pair with status polling (see below) for reliable completion detection
- One trigger per `integration_id` — fan-out across multiple integrations requires parallel requests with separate API keys or permission scopes

### 2. Get CDI Job Sync Status
`GET /cdi/integrations/{integration_id}/job_sync_status`

Returns a paginated list of past sync statuses for a given integration. The authoritative source for pipeline health checks, audit trails, and retry-decision logic.

**Architectural notes:**
- Use for polling loops after a trigger — check for terminal states (`succeeded`, `failed`, `cancelled`) before proceeding downstream
- Historical status list enables SLO tracking: measure sync duration trends and failure rates over time
- Status entries are immutable; build append-only audit stores rather than overwriting

### 3. List CDI Integrations
`GET /cdi/integrations`

Returns all configured CDI integrations. Requires `cdi.integration_list` permission.

**Architectural notes:**
- Use to dynamically enumerate integration IDs rather than hardcoding — makes orchestration layers resilient to integration additions/removals
- Combine with a routing table to fan-out triggers or aggregate status across the integration fleet
- Paginated; always handle cursor-based continuation for accounts with many integrations

### 4. User Data Endpoints — Merge Context
`POST /users/merge`

Merges one user profile into another (up to 50 merges per request). Asynchronous; merge ordering is not guaranteed.

**Architectural notes:**
- Do not assume CDI sync and user merge operations are sequenced — they are independent async operations
- If CDI data must land on a post-merge canonical profile, trigger merge *before* CDI sync and allow settling time before triggering
- 50-merge batch limit means large identity resolution jobs must be chunked; design backpressure into the pipeline accordingly

### 5. CDI Endpoints Overview

Consolidates the full CDI surface: trigger, status, and list. Use as the entry point when mapping integration permissions across API keys in a multi-team or multi-environment setup.

**Architectural notes:**
- Permission model is additive — a single API key can hold `cdi.integration_sync`, `cdi.integration_list`, and `cdi.integration_status` independently
- Design separate keys for trigger vs. read-only status roles to enforce least-privilege in orchestration services

## Reliability Patterns

| Scenario | Recommended Pattern |
|---|---|
| Triggered sync after ETL job | POST trigger → poll status every 30–60s → proceed on terminal state |
| Multi-integration fan-out | Enumerate via List, fire parallel triggers, aggregate status |
| Failure recovery | Check last status entry; if `failed`, inspect error, then re-trigger with backoff |
| Identity resolution before sync | Batch merge → settle → trigger CDI sync |
| Audit / SLO monitoring | Scheduled status pulls → append to time-series store |
| Dynamic integration routing | Cache List response; invalidate on integration config changes |

## Integration Permissions Quick Reference

| Operation | Required Permission |
|---|---|
| Trigger sync | `cdi.integration_sync` |
| Get sync status | `cdi.integration_status` (check per environment) |
| List integrations | `cdi.integration_list` |
| Merge users | `users.merge` |

## Common Design Mistakes

**Assuming synchronous completion.** The trigger endpoint returns immediately. A 200 response means the job was *queued*, not finished. Always poll status before downstream actions.

**Hardcoding integration IDs.** Integration IDs change when integrations are deleted and recreated. Use the List endpoint to resolve IDs dynamically in production orchestrators.

**Merging after syncing.** If a CDI sync lands data on a pre-merge alias profile, that data may not transfer to the canonical profile. Sequence merge-then-sync, not the reverse.

**Ignoring pagination.** Both the List and status endpoints are paginated. Orchestration code that reads only the first page will silently miss integrations or historical status entries on larger accounts.

**Single API key for all CDI operations.** Mixing trigger and read permissions on one key creates blast-radius risk. Separate keys by operation type for production pipelines.
