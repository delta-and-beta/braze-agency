---
name: architect-catalog-design
description: >-
  Designs catalog data models, field schemas, selection strategies, and
  sync/async operation trade-offs.
metadata:
  role: braze-architect
  topics:
    - catalogs-catalog-management
    - catalogs-catalog-items
    - catalogs-catalog-fields
    - catalogs-catalog-selections
    - catalogs-items-synchronous
    - catalogs-items-asynchronous
    - catalogs-management-synchronous
    - catalogs-fields-asynchronous
    - catalogs-selections-asynchronous
    - endpoints-catalogs
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
This is a **reference skill** for a plugin role — structurally different from discipline-enforcing skills (like TDD). It should optimize for *discoverability* (Claude finds it when handling catalog design questions) and *density* (the architect persona reads it to know what trade-offs to consider, not to follow a rigid checklist).
`─────────────────────────────────────────────────`

Here is the generated skill file:

---

# Catalog Data Architecture

## Overview

This skill covers how to design Braze catalog data models, structure field schemas, define selection strategies, and choose between synchronous and asynchronous operation patterns. Use this skill when:

- Designing or reviewing a catalog schema for a new use case
- Advising on whether to use sync vs async catalog operations
- Structuring catalog selections (filtered views) for personalization
- Troubleshooting catalog field type mismatches or item lookup failures
- Evaluating API endpoint usage patterns for catalog management at scale

**Core principle:** Catalogs are a first-class data layer in Braze for product/content personalization. Field schema decisions made at creation time are hard to reverse — and sync vs async routing is driven by payload size and rate sensitivity, not preference.

---

## Lens: Data Modeling, Schema Design, and Sync/Async Trade-offs

This skill analyzes catalog problems through three lenses simultaneously:

| Lens | Questions it answers |
|------|----------------------|
| **Data modeling** | How should catalog items be structured? What's the right cardinality? What belongs in a catalog vs a user attribute? |
| **Schema design** | Which field types are appropriate? What are the validation constraints? How does field naming affect Liquid access patterns? |
| **Sync/async trade-offs** | When does a catalog operation need to be synchronous (immediately consistent)? When should it be offloaded asynchronously? What are the rate limit implications? |

---

## Topics This Skill Synthesizes

| Topic | What it covers |
|-------|----------------|
| **Catalog Selections Overview** | Filtered views of catalog data used for message personalization; selection criteria and targeting logic |
| **Catalog Management Overview** | Lifecycle management of catalogs — creation, updates, deletion, versioning concerns |
| **Catalog Items Overview** | Individual records within a catalog; item ID constraints, update semantics |
| **Catalog Fields Overview** | Field type system, naming conventions, schema immutability constraints |
| **Async Catalog Selections** | Asynchronous API paths for selection operations; when async is preferred and what consistency guarantees it provides |
| **Sync Catalog Management** | Synchronous catalog CRUD — immediate consistency, rate limits, suitable payload sizes |
| **Async Catalog Fields** | Asynchronous field operations; schema migrations without blocking request threads |
| **Sync Catalog Items** | Synchronous item-level operations; use cases, limits, and failure modes |
| **Async Catalog Items** | Bulk item ingestion and updates via async paths; job tracking, retry considerations |
| **Catalogs Endpoints Overview** | Full API surface for catalog management; endpoint selection by operation type |

---

## Key Design Decisions

### Sync vs Async: Decision Guide

```
Is the operation < 50 items AND non-bulk?
├── Yes → Sync endpoint (immediate consistency, simpler error handling)
└── No → Async endpoint (bulk, higher throughput, poll for job status)

Is the caller latency-sensitive (e.g., real-time API trigger)?
├── Yes → Sync for reads, pre-warm catalog ahead of time
└── No → Async acceptable for writes and schema changes
```

**Async operations return a job ID** — callers must poll or handle eventual consistency. Design downstream systems to tolerate a propagation delay.

### Schema Design Constraints

- Field types are **set at schema creation** and cannot be changed retroactively without recreating the catalog
- Field names map directly to Liquid variable names — use `snake_case` that reads naturally in message templates
- Item IDs must be unique within a catalog and stable — avoid user-generated or mutable identifiers as item IDs
- Boolean, number, and string fields behave differently in Liquid conditionals — choose types intentionally, not by convenience

### Selections as Filtered Views

Selections define which catalog items are eligible for a given context. They are **not copies of data** — they are filter predicates evaluated at send time. Design considerations:

- Selections add query overhead at send time; keep filter logic simple
- Multiple selections can reference the same catalog with different criteria
- Selections do not cache — underlying catalog changes propagate immediately

---

## Common Mistakes

| Mistake | Consequence | Fix |
|---------|-------------|-----|
| Using string fields for numeric values | Liquid math operations fail silently | Define numeric fields as `number` type at schema creation |
| Treating async jobs as fire-and-forget | Ingestion failures go undetected | Implement job status polling or webhook-based confirmation |
| Over-normalizing catalog structure | Requires complex multi-catalog Liquid joins at send time | Denormalize for read performance; catalogs are not relational databases |
| Mutable item IDs (e.g., SKU that changes) | Existing references in messages break | Use stable internal IDs; surface human-readable names as a field |
| Creating selections with too many filter criteria | Slower evaluation, harder to debug | Prefer fewer, broader selections with Liquid conditionals for fine-grained logic |

---

## Quick Reference: Endpoint Selection

| Operation | Sync endpoint | Async endpoint |
|-----------|--------------|----------------|
| Create/update 1 item | Yes | Yes |
| Bulk ingest 50+ items | Not recommended | Yes (preferred) |
| Field schema changes | Yes (small catalogs) | Yes (safer for production) |
| Delete catalog | Yes | Yes |
| Selection create/update | Yes | Yes |
| Read item for personalization | Yes (Liquid, not API) | N/A |

---

## When NOT to Use This Skill

- **User attribute design** — use a user data architecture skill instead; catalogs are for product/content data, not user state
- **Canvas or campaign logic** — catalog selection filtering is a data concern, but the trigger/audience logic belongs to campaign architecture skills
- **Real-time event stream design** — catalogs are static-ish reference data, not event logs
