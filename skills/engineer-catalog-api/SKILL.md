---
name: engineer-catalog-api
description: >-
  Implements catalog CRUD operations across synchronous and asynchronous modes
  for items, fields, selections, and management.
metadata:
  role: braze-engineer
  topics:
    - catalogs-catalog-items
    - catalogs-catalog-fields
    - catalogs-catalog-selections
    - catalogs-catalog-management
    - catalogs-items-synchronous
    - catalogs-items-asynchronous
    - catalogs-management-synchronous
    - catalogs-selections-asynchronous
    - catalogs-fields-asynchronous
    - catalogs-post-create-catalog-selections
    - catalogs-delete-catalog-selection
    - catalogs-post-create-catalog
    - catalogs-get-list-catalogs
    - catalogs-delete-catalog
    - catalogs-put-update-catalog-item
    - endpoints-catalogs
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
The writing-skills skill enforces TDD methodology for skill creation, but here we're generating a **reference-type skill** (API documentation + patterns) — the skill taxonomy distinguishes this from discipline-enforcing skills, so the structure priorities shift toward discoverability and dense reference tables over rationalization tables.
`─────────────────────────────────────────────────`

Here's the generated skill content:

---

# Catalog API Engineering

## Overview

This skill covers CRUD operations for Braze catalogs — structured data stores used to personalize messages at scale. The central engineering concern is the **sync/async split**: some operations complete immediately and return results synchronously, while others enqueue work and complete via background jobs. Mixing these modes incorrectly causes silent failures, unexpected rate limit errors, and incomplete data states.

**When to use this skill:**
- Implementing catalog create/read/update/delete flows
- Deciding between synchronous vs. asynchronous endpoints for a given operation
- Engineering catalog selections (filtered views for personalization)
- Working with catalog fields, items, and management endpoints

---

## Sync vs. Async: The Core Lens

Braze catalog endpoints are split into two operation modes. Choosing wrong mode causes rate limit errors or missed data — always identify which mode an endpoint belongs to before implementation.

| Mode | Behavior | Rate Limit Group | Use When |
|---|---|---|---|
| **Synchronous** | Returns result immediately | Synchronous catalog rate limit | Small payloads, real-time requirements, single-item operations |
| **Asynchronous** | Returns job ID; result available later | Asynchronous catalog rate limit | Bulk operations, selections, large data sets |

**Key rule:** Asynchronous endpoints require polling or webhook handling to confirm job completion. Never assume an async 202 means the data is immediately queryable.

---

## Catalog Resource Hierarchy

```
Catalog (workspace-scoped)
├── Fields        (schema definition)
├── Items         (data rows)
└── Selections    (filtered views for personalization)
```

Operations at each level have both sync and async variants — pick based on payload size and latency requirements.

---

## Endpoints Quick Reference

### Catalog Management

| Operation | Method + Path | Mode | Permission |
|---|---|---|---|
| List catalogs | `GET /catalogs` | Sync | `catalogs.get` |
| Create catalog | `POST /catalogs` | Sync | `catalogs.create` |
| Delete catalog | `DELETE /catalogs/{catalog_name}` | Async | `catalogs.delete` |

### Catalog Items

| Operation | Method + Path | Mode | Permission |
|---|---|---|---|
| List items (sync) | `GET /catalogs/{catalog_name}/items` | Sync | `catalogs.get_item` |
| Create items (sync) | `POST /catalogs/{catalog_name}/items` | Sync | `catalogs.create_item` |
| Create items (async) | `POST /catalogs/catalog_items` | Async | `catalogs.create_item` |
| Update item (replace) | `PUT /catalogs/{catalog_name}/items/{item_id}` | Sync | `catalogs.update_item` |
| Update items (async) | `PATCH /catalogs/catalog_items` | Async | `catalogs.update_item` |
| Delete items (async) | `DELETE /catalogs/catalog_items` | Async | `catalogs.delete_item` |

> **Upsert behavior:** `PUT /catalogs/{catalog_name}/items/{item_id}` creates the item if `item_id` is not found. Treat as upsert, not strict update.

### Catalog Fields

| Operation | Method + Path | Mode | Permission |
|---|---|---|---|
| Create fields (sync) | `POST /catalogs/{catalog_name}/fields` | Sync | `catalogs.create_fields` |
| Create fields (async) | `POST /catalogs/catalog_fields` | Async | `catalogs.create_fields` |
| Delete fields (async) | `DELETE /catalogs/catalog_fields` | Async | `catalogs.delete_fields` |

### Catalog Selections

| Operation | Method + Path | Mode | Permission |
|---|---|---|---|
| Create selection | `POST /catalogs/{catalog_name}/selections` | Async | `catalogs.create_selection` |
| Delete selection | `DELETE /catalogs/{catalog_name}/selections/{selection_name}` | Async | `catalogs.delete_selection` |

---

## Catalog Selections

Selections are **filtered views** of catalog data used to personalize messages. They define criteria (filters) that items must meet before being surfaced to users — analogous to a saved SQL `WHERE` clause on catalog rows.

**Engineering notes:**
- All selection operations are asynchronous — creation and deletion both return job IDs
- A selection only serves items that match all defined filter criteria at query time
- Selections are named and workspace-scoped; names must be unique within a catalog
- Required permission: `catalogs.create_selection` (create) / `catalogs.delete_selection` (delete)
- Rate limit: asynchronous catalog selections rate limit applies

---

## Topics Synthesized

This skill draws from the following reference topics:

- **Catalog Selections Overview** — filtered view semantics, criteria model, personalization use cases
- **Catalog Management Overview** — workspace-scoped catalog lifecycle
- **Catalog Items Overview** — item structure, CRUD patterns
- **Catalog Fields Overview** — schema/field management
- **Async Catalog Selections** — async create/delete patterns for selections
- **Sync Catalog Management** — synchronous list/create for catalogs
- **Async Catalog Fields** — bulk field operations via async endpoints
- **Sync Catalog Items** — immediate item reads and single-item writes
- **Async Catalog Items** — bulk item create/update/delete via job endpoints
- **Create Catalog Selections** — `POST /catalogs/{catalog_name}/selections` implementation
- **Delete Catalog Selection** — `DELETE /catalogs/{catalog_name}/selections/{selection_name}` implementation
- **Create Catalog** — catalog creation endpoint details
- **List Catalogs** — `GET /catalogs` response structure
- **Delete Catalog** — async catalog deletion pattern
- **Update Catalog Item** — upsert semantics via `PUT`
- **Catalogs Endpoints Overview** — cross-cutting endpoint index

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| Calling sync endpoint with bulk payload | Use async bulk endpoint; sync endpoints have tighter payload limits |
| Assuming async 202 means data is live | Poll job status or handle via webhook before downstream reads |
| Using `PUT` expecting strict update (no create) | `PUT` on items is upsert — creates if `item_id` absent |
| Deleting a field with active selections referencing it | Delete or update dependent selections first |
| Wrong permission scope for selection operations | Selection CRUD requires `catalogs.*_selection` permissions, not generic `catalogs.*_item` |

---

`★ Insight ─────────────────────────────────────`
The sync/async split in Braze catalogs mirrors a common API design pattern where **synchronous endpoints favor correctness** (small, atomic, immediate) and **async endpoints favor throughput** (bulk, eventually consistent). The path naming convention encodes this: async bulk endpoints live at `/catalogs/catalog_items` (flat), while sync per-item endpoints live at `/catalogs/{catalog_name}/items/{item_id}` (nested). The nesting depth is a reliable heuristic for which rate limit group applies.
`─────────────────────────────────────────────────`
