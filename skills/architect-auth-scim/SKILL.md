---
name: architect-auth-scim
description: >-
  Manages SDK authentication keys and automates dashboard user provisioning
  through SCIM endpoints.
metadata:
  role: braze-architect
  topics:
    - endpoints-sdk-auth-put-primary-key
    - endpoints-sdk-auth-post-create-key
    - endpoints-sdk-auth-get-keys
    - endpoints-sdk-auth-delete-key
    - endpoints-scim-put-update-user
    - endpoints-scim-post-create-user
    - endpoints-scim-get-user-info
    - endpoints-scim-get-search-dashboard-user
    - endpoints-scim-delete-dashboard-user
    - api-objects-scim-api-appendix
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
**Reference skills** like this one differ from technique/discipline skills — they're optimized for *retrieval*, not rule enforcement. The structure should front-load the "when to use" signal so future Claude instances can decide to load this skill quickly, and then organize content for fast scanning (tables, headers, code blocks) rather than narrative reading.
`─────────────────────────────────────────────────`

# SDK Authentication & SCIM Provisioning

## Overview

This skill covers two related but distinct security surfaces in Braze: **SDK Authentication** (cryptographic key management for client-side SDK integrity) and **SCIM User Provisioning** (automated dashboard access management via standard REST endpoints).

The unifying lens is **security automation** — both systems involve sensitive credentials, access control, and lifecycle management that should be driven by programmatic interfaces rather than manual dashboard work.

## When to Use This Skill

Use when:
- Generating, rotating, or promoting SDK Authentication keys for an app
- Auditing which SDK keys are active or primary across app groups
- Automating onboarding/offboarding of dashboard users at scale
- Integrating Braze with an Identity Provider (IdP) for SSO-adjacent provisioning
- Configuring per-workspace or per-team permission scopes for provisioned users
- Investigating auth failures tied to SDK key mismatches

Do **not** use for:
- REST API key management (separate permission surface)
- End-user authentication within apps (handled by SDK, not these endpoints)
- Workspace-level SSO configuration (separate Braze settings)

## Lens: Security, Authentication, and Automated Provisioning

All guidance here is filtered through a security-first perspective:

- **Least privilege**: Grant only the permissions required. SCIM provisioning supports granular workspace and team-level scopes — prefer these over broad company-level permissions.
- **Key hygiene**: SDK Authentication keys should be rotated regularly. The primary key constraint (cannot delete the active primary) is a safety rail, not an obstacle — rotate by creating, promoting, then deleting the old key.
- **Automation over manual**: SCIM exists precisely to eliminate manual user management. Any provisioning done through the UI instead of SCIM is an audit gap.
- **Credential separation**: SCIM tokens are distinct from REST API keys and SDK auth keys. Each has its own permission scope and should be stored and rotated independently.

## Topics Synthesized

### SDK Authentication Keys

| Endpoint | Method | Permission Required | Purpose |
|---|---|---|---|
| `/app_group/sdk_authentication/create` | POST | `sdk_authentication.create` | Create a new key for an app |
| `/app_group/sdk_authentication/primary` | PUT | `sdk_authentication.write` | Promote an existing key to primary |
| `/app_group/sdk_authentication` | GET | `sdk_authentication.read` | List all keys for an app |
| `/app_group/sdk_authentication/delete` | DELETE | `sdk_authentication.delete` | Delete a non-primary key |

**Key lifecycle pattern (safe rotation):**

```
1. POST /create          → generates new key (inactive)
2. PUT  /primary         → promotes new key to primary (old key demoted)
3. DELETE /delete        → removes demoted key after SDK clients have updated
```

The primary key **cannot be deleted directly** — always promote a replacement first. Attempting to delete the primary returns an error.

### SCIM User Provisioning

| Endpoint | Method | Auth Header | Purpose |
|---|---|---|---|
| `/scim/v2/Users` | POST | `Bearer YOUR-SCIM-TOKEN` | Create dashboard user |
| `/scim/v2/Users/{id}` | GET | `Bearer YOUR-SCIM-TOKEN` | Retrieve user by SCIM resource ID |
| `/scim/v2/Users?filter=userName eq "{email}"` | GET | `Bearer YOUR-SCIM-TOKEN` | Search user by email |
| `/scim/v2/Users/{id}` | PUT | `Bearer YOUR-SCIM-TOKEN` | Update user (name, permissions, department) |
| `/scim/v2/Users/{id}` | DELETE | `Bearer YOUR-SCIM-TOKEN` | Permanently delete dashboard user |

**Required headers on all SCIM requests:**
```http
Content-Type: application/json
Authorization: Bearer YOUR-SCIM-TOKEN
X-Request-Origin: YOUR-REQUEST-ORIGIN
```

`X-Request-Origin` is a custom Braze header (not part of SCIM 2.0 spec) — omitting it causes auth failures.

### SCIM Permission Model

Braze supports two SCIM variants with different permission granularity:

| Variant | Permission Style | Use Case |
|---|---|---|
| **Legacy SCIM** | Predefined role names | Simpler IdP integrations |
| **Granular SCIM** | Workspace + team-level scopes | Fine-grained access automation |

When using granular SCIM, permissions nest as: **Company → Workspace → Team**. A `PUT /scim/v2/Users/{id}` can update all three levels in a single call — send the full desired permission state, not a delta.

## Common Mistakes

| Mistake | Consequence | Fix |
|---|---|---|
| Deleting the primary SDK key directly | API error, key not deleted | Promote a new key first, then delete |
| Omitting `X-Request-Origin` header | SCIM auth failure | Always include alongside `Authorization` |
| Sending partial permissions on PUT | Omitted permissions may be cleared | PUT replaces the full permission set — always send the complete desired state |
| Searching SCIM by name instead of email | No reliable search method | Use `userName` filter (email address) for lookups |
| Storing SCIM token with REST API keys | Scope confusion, over-broad credential access | Store separately; SCIM token has dashboard user management scope only |

## Quick Reference: SCIM vs SDK Auth Credentials

| | SDK Auth Key | SCIM Token |
|---|---|---|
| **Controls** | Client SDK request integrity | Dashboard user provisioning |
| **Scope** | App-level | Company-level |
| **Created via** | SDK Auth API | Braze dashboard settings |
| **Rotatable via API?** | Yes (full lifecycle via API) | No (must regenerate in dashboard) |
| **Primary/secondary concept** | Yes | No |

`★ Insight ─────────────────────────────────────`
The PUT-replaces-full-state behavior on SCIM is a common integration pitfall — it mirrors how HTTP PUT semantics are *supposed* to work (full resource replacement vs. PATCH partial update), but IdP connectors often send only changed fields, silently stripping permissions. Worth surfacing prominently in any SCIM integration PR review.
`─────────────────────────────────────────────────`
