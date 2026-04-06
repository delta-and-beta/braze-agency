---
name: architect-data-model
description: >-
  B2B data model design, Salesforce integration patterns, lead scoring
  architecture, and user profile data structure.
metadata:
  role: braze-architect
  topics:
    - get-started-b2b-use-cases
    - get-started-b2b-use-cases-b2b-data-models
    - get-started-b2b-use-cases-b2b-salesforce-sales-cloud
    - get-started-b2b-use-cases-lead-scoring
    - get-started-b2b-use-cases-account-based-segmentation
    - data
    - engagement-tools-segments-user-profiles
    - engagement-tools-segments-user-profiles-duplicate-users
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- Nick plugin skills are the "Layer 1" content that agents load for domain queries — they synthesize topic files (Layer 2) into actionable guidance
- The `lens` field determines how an agent frames a problem — "entity relationships" means this skill should surface structural decisions, not just operational steps
- B2B Braze architecture has a fundamental tension: Braze is user-centric (one profile per person), but B2B CRMs are account-centric (Leads → Contacts → Accounts) — the skill should foreground this mapping challenge
`─────────────────────────────────────────────────`

```markdown
# Data Architecture & B2B Modeling

## Scope & Purpose

This skill covers the architectural decisions behind modeling B2B data in Braze — from how raw CRM objects map to Braze user profiles, to how lead scoring and Salesforce sync flow across system boundaries. Apply this skill when designing data structures, integration pipelines, or segmentation strategies for B2B use cases.

**Lens: Entity relationships, data flow design, and cross-system integration architecture.**

Questions answered here are structural: *What owns this data? How does it flow? What breaks if the model is wrong?*

---

## Topics Synthesized

| Topic | What It Covers |
|-------|---------------|
| **B2B Use Cases Overview** | Foundational framing of B2B patterns in Braze |
| **B2B Data Models** | Mapping CRM objects (Lead, Contact, Account, Opportunity) to Braze profiles |
| **Account-Based Segmentation** | Segmenting by company/account using Catalogs or Connected Content |
| **B2B Lead Scoring** | Real-time score updates via Canvas workflows and external integrations |
| **B2B Salesforce Sales Cloud Integration** | Webhook-based sync to Salesforce `sobjects/Lead` REST API |
| **User Profiles** | Braze profile structure — custom attributes, event properties, identifiers |
| **Duplicate Users** | Profile merge strategies and irreversible merge risks |
| **Data Overview** | Platform-level data primitives available for B2B modeling |

---

## Core Architectural Challenge

Braze is **user-centric**: one profile per person, identified by `external_id`. B2B CRMs are **account-centric**: a Lead becomes a Contact under an Account, associated with Opportunities.

This mismatch is the root of most B2B modeling decisions:

```
CRM Model             Braze Model
─────────────         ───────────────────────────────
Account        →      Catalog entry (business object)
Contact        →      User profile (external_id = CRM contact ID)
Lead           →      User profile (pre-conversion)
Opportunity    →      Custom attribute or Catalog entry
Lead score     →      Custom attribute (real-time updateable)
```

**Lead → Contact conversion** is the most fragile point. If external_id changes at conversion, you lose event history. Design the identity scheme before any data flows into Braze.

---

## Data Flow Patterns

### Lead Scoring Architecture

Two patterns depending on scoring ownership:

**Native Canvas (Braze-owned scoring)**
- Trigger Canvas on behavioral events
- Increment score via attribute update step
- Branch on score threshold → auto-handoff or webhook to Sales

**External scoring system → Braze**
- Score computed outside Braze (Salesforce, Marketo, custom)
- Push score to Braze via `/users/track` with `custom_attribute`
- Braze segments on score for campaign routing

### Salesforce Sync (Webhook Pattern)

> Community-submitted integration — not officially Braze-supported.

Flow: Braze Canvas → Webhook step → Salesforce `sobjects/Lead` REST API

Key architectural considerations:
- Authentication: OAuth 2.0 client credentials, token refresh must be handled externally or via Connected Content
- Field mapping is explicit — no auto-sync; each mapped field requires a webhook body entry
- Upsert vs. create: use `external_id` matching to avoid duplicate Lead creation in Salesforce
- Error handling: Braze webhooks have no built-in retry on 4xx — design idempotent Lead upserts

---

## Account-Based Segmentation

Two valid approaches depending on data volume and query patterns:

**Option 1: Catalogs (recommended for <100k accounts)**
- Store account-level attributes (industry, tier, ARR) as Catalog entries
- Reference via `catalog_id` on user profile or in Liquid
- SQL segmentation: `JOIN users ON users.custom_attributes.account_id = catalog.id`

**Option 2: Custom Attributes on User**
- Denormalize account fields directly onto each user profile
- Simpler queries, higher storage cost, synchronization risk when account data changes

---

## User Profile Design Considerations

- **Identity stability**: `external_id` should be the CRM contact/lead ID set at first known identification — changing it post-creation requires a merge
- **Duplicate profiles**: Braze provides merge APIs, but merges are irreversible. Design anonymous-to-known identity resolution before launch
- **Attribute namespacing**: Prefix B2B-specific attributes (`b2b_lead_score`, `b2b_account_id`) to distinguish from B2C attributes in shared workspaces

---

## When to Apply This Skill

- Designing the initial Braze data model for a B2B product
- Evaluating whether to store account data in Catalogs vs. user attributes
- Architecting a Salesforce ↔ Braze sync strategy
- Debugging identity resolution failures (duplicate users, lost event history)
- Designing lead scoring pipelines that span Braze and external systems
- Building account-level segments or suppression lists
```

`★ Insight ─────────────────────────────────────`
- The "When to Apply This Skill" section at the bottom serves as CSO (Claude Search Optimization) — it gives future Claude instances concrete trigger phrases to match against
- Foregrounding the CRM-to-Braze object mapping table early gives the architect role an immediate mental model before diving into integration specifics
- Noting "community-submitted, not officially supported" for the Salesforce webhook pattern is architecturally important — it signals risk surface that a proper architect must account for
`─────────────────────────────────────────────────`
