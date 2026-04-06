---
name: architect-api-patterns
description: >-
  Defines cross-cutting API patterns for authentication, provisioning,
  preference management, and content delivery.
metadata:
  role: braze-architect
  topics:
    - endpoints-sdk-authentication
    - endpoints-scim
    - endpoints-preference-center
    - endpoints-messaging
    - endpoints-subscription-groups
    - endpoints-export
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
**Nick generates skill files by synthesizing topic references into a domain-scoped lens.** The skill body acts as Layer 2 in the hierarchy — it sits above individual topic reference files and provides the architectural perspective that unifies them. Rather than repeating topic details, a well-authored skill body should tell Claude *how to think across* those topics, not *what's in* them.
`─────────────────────────────────────────────────`

Here is the generated skill content:

---

# API Pattern Architecture

Establish and enforce consistent design standards across Braze's REST API surface — covering authentication flows, user provisioning, preference management, subscription lifecycle, and data export. Apply this skill when designing new integrations, auditing existing API usage for security gaps, or advising on cross-domain API composition patterns.

## Scope

This skill synthesizes patterns across six API domains:

| Domain | Primary Concern |
|---|---|
| **SDK Authentication** | Identifying and selecting the right credential type for client vs. server contexts |
| **SCIM Provisioning** | Lifecycle management of dashboard users via standard identity protocols |
| **Subscription Groups** | Batch state transitions for opt-in/opt-out compliance |
| **Preference Centers** | User-facing control surfaces for communication consent |
| **Messaging** | Send-time delivery routing and channel selection |
| **Export** | Bulk data retrieval patterns and pagination strategies |

## Architectural Lens

Evaluate all API decisions through three cross-cutting concerns:

### 1. API Consistency

Braze's API surface spans REST endpoints with varying vintage and design conventions. When advising on integrations:

- Prefer V2 endpoints over V1 where both exist (e.g., `/v2/subscription/status/set` supports multi-group batching that V1 cannot)
- Identify mismatches between endpoint capabilities and integration requirements early — a V1 endpoint may appear sufficient but impose undocumented batch limits
- Treat HTTP method semantics strictly: `PUT` replaces a resource, `PATCH` modifies fields; SCIM provisioning violates this subtly (email is immutable via `PUT /scim/v2/Users/{id}`)

### 2. Security Patterns

Authentication and authorization surface area across Braze APIs follows a tiered model:

- **API Keys** — scoped to REST endpoints; apply least-privilege by restricting key permissions to only required operations at provisioning time
- **SDK Authentication** — client-side keys are inherently public; never place server-side API keys in mobile or browser contexts
- **SCIM Bearer Tokens** — long-lived provisioning credentials; treat as secrets, rotate regularly, and restrict to IdP/SCIM client IPs where possible
- **Preference Center Tokens** — user-scoped, short-lived; validate token expiry before trusting preference update requests

When designing an integration, map each credential type to its threat model. SDK keys being compromised is a usability risk; server-side keys being compromised is a data integrity and compliance risk.

### 3. Cross-Domain Integration Design

Real integrations rarely touch a single API domain. Common cross-domain patterns require careful sequencing:

**User Lifecycle Orchestration**: SCIM provisions dashboard users; subscription group endpoints manage end-user communication consent. These are separate identity scopes — dashboard user IDs and end-user external IDs are not interchangeable.

**Preference + Subscription Consistency**: Preference Centers expose user-facing consent surfaces; Subscription Groups store the underlying state. A `PUT /preference_center/v1/{id}` update and a `/v2/subscription/status/set` call may both be required to keep consent state consistent across Braze's data model.

**Export + Messaging Feedback Loops**: Export endpoints provide delivery and engagement data; messaging endpoints drive outbound sends. Design pipelines that close the loop — export data should inform suppression lists and subscription group membership before the next send.

## When to Apply This Skill

Apply this skill when:

- Designing a new Braze REST integration and selecting which endpoints to use
- Auditing an existing integration for credential misuse, over-privileged keys, or deprecated endpoint usage
- Advising on compliance requirements (GDPR opt-out, CAN-SPAM) that touch subscription group and preference center state
- Resolving inconsistencies between what a preference center displays and what subscription group state records
- Architecting bulk data pipelines that combine export, messaging, and user provisioning operations

## Key Constraints to Surface Early

- **SCIM email immutability**: `userName` (email) cannot be changed via SCIM `PUT`. Direct customers with email-change requirements to the dashboard or alternative provisioning paths.
- **Subscription batch limits**: V2 subscription endpoint supports up to 50 users per request. Design bulk update pipelines with chunking at the caller.
- **Preference center permissions**: The `preference_center.update` permission is distinct from general API write permissions — integrations that manage consent UX need explicit permission grants.
- **Export pagination**: Export endpoints for large datasets use async job patterns; do not assume synchronous response for bulk pulls.

## Reference Files

Consult the following topic references for endpoint-level detail:

- **`references/subscription-groups-endpoints.md`** — V2 batch update mechanics, subscription state enum values
- **`references/sdk-authentication-endpoints.md`** — Credential type selection, client vs. server authentication patterns
- **`references/scim-provisioning-endpoints.md`** — Dashboard user CRUD, permission field schema, immutability constraints
- **`references/preference-center-endpoints.md`** — Preference center update parameters, required permissions
- **`references/messaging-endpoints.md`** — Send routing, channel targeting patterns
- **`references/export-endpoints.md`** — Bulk export patterns, async job handling

`★ Insight ─────────────────────────────────────`
**The "lens" structure above (consistency / security / cross-domain) is intentional.** Skill files for architect roles work best when they give Claude a *decision framework*, not a reference dump. The topic reference files hold the facts; the skill body holds the judgment layer — which is what an architect persona actually contributes at query time.
`─────────────────────────────────────────────────`
