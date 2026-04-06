---
name: architect-api-fundamentals
description: >-
  Covers API basics, authentication, rate limits, error codes, endpoint
  overview, data retention policies, and Postman collection usage.
metadata:
  role: braze-architect
  topics:
    - api-home
    - api-basics
    - api-endpoints
    - api-errors
    - api-api-limits
    - api-data-retention
    - api-identifier-types
    - api-network-connectivity-issues
    - api-postman-collection
    - api-use-cases
    - api-objects-filters
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
Nick plugin skill files differ from Claude Code skills: they're domain knowledge synthesis documents for agent context, not behavioral guides. The `braze-architect` lens means this skill should emphasize constraints, tradeoffs, and integration patterns — the system-design perspective rather than how-to steps.
`─────────────────────────────────────────────────`

# API Fundamentals & Reference

## Purpose & Scope

This skill provides foundational knowledge for architects and engineers designing systems that integrate with the Braze REST API. It covers the essential constraints, structures, and operational boundaries that govern all Braze API usage — from authentication and rate limits to error handling, data retention, and identifier semantics.

Use this skill when:
- Designing or reviewing a Braze API integration architecture
- Evaluating whether a use case is feasible given API constraints
- Debugging integration failures at the infrastructure or protocol level
- Planning for scale, retry logic, or multi-workspace configurations
- Onboarding to the Braze API surface for the first time

This skill complements endpoint-specific skills (messaging, users, catalogs) by establishing the constraints and patterns that apply universally.

---

## Architect's Lens: System-Level API Design

The `braze-architect` perspective frames all API knowledge through three questions:

1. **What are the hard constraints?** (rate limits, retention windows, identifier uniqueness)
2. **Where are the failure modes?** (4XX vs 5XX, DNS/CDN routing, auth edge cases)
3. **What integration patterns fit?** (sync vs async, bulk vs single-record, polling vs webhooks)

Understanding these foundations prevents costly rework when individual integrations scale.

---

## Topics Synthesized

### API Basics
The Braze REST API is a JSON-over-HTTPS interface organized by workspace. All requests must use UTF-8 encoding. The API is stateless — each request carries full authentication context via a REST API key in the `Authorization` header. There is no session or token refresh cycle; keys are long-lived and scoped to a workspace.

**Architect implication:** API key management and rotation must be handled at the infrastructure level. Treat keys as secrets with workspace-level blast radius.

---

### API Identifier Types
Braze uses several distinct identifier types across its API surface:

| Identifier | Scope | Use |
|---|---|---|
| `app_identifier` | App-level | Identifies mobile/web app instances |
| `api_key` | Workspace-level | Authenticates REST API calls |
| `canvas_id`, `campaign_id` | Object-level | References messaging objects |
| `segment_id` | Workspace-level | References user segments |
| `external_id` | User-level | Your system's user identifier |

All identifiers must be UTF-8 encoded. Identifier collisions across workspaces are not a concern — each workspace is an isolated namespace.

**Architect implication:** The `external_id` is the primary join key between your system and Braze. Its uniqueness and consistency are critical — once set, it cannot be changed without explicit user aliasing workflows.

---

### API Endpoints Overview
Braze API endpoints are grouped by domain:

- **User Data** — `/users/track`, `/users/export`, `/users/delete`
- **Messaging** — `/messages/send`, `/campaigns/trigger/send`, `/canvas/trigger/send`
- **Catalogs** — `/catalogs/{catalog_name}/items`
- **Subscription Groups** — `/subscription/status/set`
- **Templates** — `/templates/email`, `/templates/content_blocks`
- **Segments & Campaigns** — Read/list via export endpoints
- **Purchases & Events** — Tracked via `/users/track`

All endpoints follow the pattern: `https://{rest_endpoint}/endpoint/path`

**Architect implication:** The REST endpoint domain varies by cluster (US-01, US-02, EU-01, etc.). This is a deployment-time configuration, not a runtime decision. Hardcoding `api.braze.com` without cluster awareness is a common integration mistake.

---

### API Rate Limits
Braze enforces per-workspace rate limits. Exceeding them returns HTTP `429 Too Many Requests`.

Key limits (subject to change — verify with your Braze CSM):

| Endpoint Group | Default Limit |
|---|---|
| `/users/track` | 50,000 requests/minute |
| `/messages/send` | 250 requests/minute |
| `/campaigns/trigger/send` | 250 requests/minute |
| `/users/export/ids` | 2,500 requests/minute |

Limits are applied at the workspace level, not per API key. Multiple integrations sharing a workspace share the same budget.

**Architect implication:** Design for `429` as a normal operating condition, not an error. Implement exponential backoff with jitter. For high-throughput pipelines, batch records via `/users/track` (up to 75 events per call) rather than sending individually. Contact Braze to negotiate limit increases before go-live for high-volume use cases.

---

### API Errors
Braze uses standard HTTP status semantics:

**4XX — Client errors (your responsibility to fix):**

| Code | Meaning |
|---|---|
| `400` | Malformed request body or missing required fields |
| `401` | Missing or invalid `Authorization` header |
| `403` | API key lacks permission for this endpoint |
| `404` | Referenced object (campaign, canvas, user) not found |
| `429` | Rate limit exceeded |

**5XX — Server errors (Braze-side, retry with backoff):**

| Code | Meaning |
|---|---|
| `500` | Internal server error |
| `503` | Service temporarily unavailable |

Webhook and Connected Content failures follow the same 4XX/5XX semantics but are logged differently in the dashboard.

**Architect implication:** Never retry `4XX` errors without inspecting the response body — the payload contains actionable error details. Distinguish `401` (auth misconfiguration) from `403` (permission misconfiguration) for faster incident response. Build dead-letter queues for `4XX` failures; they require human intervention, not automatic retry.

---

### API Rate Limits: Network Connectivity
Braze API endpoints are fronted by Fastly CDN. DNS resolution routes requests to the nearest Point of Presence (POP) based on the resolver's location.

**Common connectivity failure modes:**
- DNS resolvers co-located far from your servers → latency spikes
- Misconfigured corporate proxies stripping `Authorization` headers
- TLS inspection appliances breaking certificate chains
- IPv6/IPv4 dual-stack routing inconsistencies

**Architect implication:** Use DNS servers co-located with your application servers. Validate connectivity from your deployment environment, not from a developer laptop. If operating behind a proxy or firewall, explicitly allowlist Braze IP ranges (available from Braze support).

---

### API Data Retention
Braze retains different data types for different durations:

- **User profiles:** Retained while the workspace is active; explicit deletion via `/users/delete`
- **Event/purchase history:** Subject to workspace data retention policy (configurable, typically 2 years)
- **Message engagement data:** Dashboard retention windows vary by plan
- **Export data:** Point-in-time snapshots; not kept server-side after export

**Architect implication:** Do not rely on Braze as a system of record for user behavioral data. If long-term event history is required, stream events to your data warehouse via Currents (Braze's event streaming product). Plan for GDPR/CCPA deletion workflows using `/users/delete`.

---

### API Objects & Filters Overview
The `/users/track` endpoint accepts three object types in a single request:

- **Attributes object** — Set or update user profile fields
- **Events object** — Record custom events with optional properties
- **Purchases object** — Record purchase events with required `product_id`, `currency`, `price`

All three can be batched in a single call (up to 75 per array). Objects are matched to users via `external_id`, `user_alias`, or `braze_id`.

Filter objects appear in segmentation and export endpoints to scope results by user attributes or engagement data.

**Architect implication:** Batching `/users/track` is the single highest-leverage optimization for write-heavy integrations. A pipeline sending 75 records per call achieves the same throughput at 1/75th the rate limit cost versus individual calls.

---

### API Postman Collection
Braze publishes and maintains an official Postman collection covering all REST API endpoints. It is the fastest way to validate endpoint behavior, test authentication, and explore response shapes.

**Use for:**
- Prototyping new endpoint usage before implementation
- Reproducing bugs in a controlled environment
- Validating API key permissions and endpoint access
- Exploring response schemas for new features

Import the collection via the Postman workspace link in Braze documentation. Configure environment variables for `rest_endpoint` and `api_key` to enable one-click execution across clusters.

---

### API Use Cases
Common high-value API integration patterns:

| Use Case | Endpoint | Pattern |
|---|---|---|
| Sync user profile on registration | `/users/track` | Sync, per-event |
| Bulk backfill historical users | `/users/track` | Batched, async pipeline |
| Trigger transactional message | `/campaigns/trigger/send` | Sync, event-driven |
| Export segment for analysis | `/users/export/segment` | Async, polling |
| Delete user on account closure | `/users/delete` | Sync, event-driven |
| Bulk delete catalog items | `/catalogs/{name}/items` | Batched |

**Architect implication:** Match the integration pattern to the latency requirement. Transactional flows (password reset, order confirmation) require synchronous triggering. Analytical and bulk flows should be decoupled via queues to avoid cascading failures when Braze is slow or unavailable.

---

## Key Architectural Principles

1. **Workspace = isolation boundary.** Rate limits, API keys, and user namespaces are all workspace-scoped. Multi-brand or multi-region architectures typically use multiple workspaces.

2. **Design for 429 and 5XX.** Both are normal. Implement backoff + retry for 5XX; implement batching and rate-aware scheduling to avoid 429.

3. **`external_id` is the integration contract.** It must be stable, unique, and consistent across your systems. Changing it requires a coordinated migration.

4. **Braze is not a data warehouse.** Export what you need via Currents or API exports. Do not query Braze as a source of truth for analytics.

5. **Cluster-aware configuration.** The REST endpoint domain is environment-specific. Parameterize it at deployment time, not hardcoded in application logic.

`★ Insight ─────────────────────────────────────`
This skill file uses a **topic-per-section structure** with a consistent "Architect implication" callout — a pattern that makes the `braze-architect` lens explicit and scannable. Claude agents routing to this skill can quickly locate the constraint or pattern relevant to a specific question without reading the full document. The Quick Reference table near the end consolidates decision-relevant patterns for fast lookup.
`─────────────────────────────────────────────────`
