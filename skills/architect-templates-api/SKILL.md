---
name: architect-templates-api
description: >-
  Creates, updates, and manages email templates and reusable content blocks
  through the REST API.
metadata:
  role: braze-architect
  topics:
    - endpoints-templates-email-templates
    - endpoints-templates-content-blocks
    - endpoints-templates-post-update-email-template
    - endpoints-templates-post-create-email-template
    - endpoints-templates-get-email-template-info
    - endpoints-templates-get-list-email-templates
    - endpoints-templates-post-update-content-block
    - endpoints-templates-post-create-email-content-block
    - endpoints-templates-get-content-blocks-info
    - endpoints-templates-get-list-email-content-blocks
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- Reference skills work best when organized around *decision points* rather than exhaustively listing every endpoint — an architect needs to know *when* to use a Content Block vs. an inline template, not just *what* the endpoints are.
- The "lens" concept here (reusable content architecture) means the skill should surface trade-offs and lifecycle concerns, not just API signatures.
`─────────────────────────────────────────────────`

# Templates & Content Blocks API

## Overview

This skill covers the Braze REST API surface for creating and maintaining **email templates** and **Content Blocks** — Braze's two primary mechanisms for reusable messaging content. Use this skill when designing systems for template lifecycle management, building content reuse strategies, or integrating programmatic template operations into engineering workflows.

**Architect lens:** Reusable content architecture and template lifecycle management. The focus is on *how* templates and blocks compose into a maintainable content system, not just individual API calls.

---

## When to Use This Skill

Apply this skill when the task involves:

- Creating or updating email templates via API (not the dashboard UI)
- Building Content Block libraries for cross-template reuse
- Programmatically synchronizing template content (e.g., CI/CD pipelines, design system exports)
- Querying template inventories for auditing, governance, or migration
- Deciding between embedding content inline vs. extracting it to a Content Block
- Managing template versioning and content freshness

**Out of scope:** Sending campaigns (covered by Messaging API), drag-and-drop editor templates (not returned by list endpoints), or user segmentation.

---

## Architecture: Templates vs. Content Blocks

| Concern | Email Templates | Content Blocks |
|---|---|---|
| Granularity | Full email layout | Reusable fragment (header, footer, CTA) |
| Reuse pattern | One template per campaign type | One block referenced by many templates |
| API identifier | `email_template_id` | `content_block_id` |
| Drag-and-drop editor | Not API-accessible | Not API-accessible |
| Primary create endpoint | `POST /templates/email/create` | `POST /content_blocks/create` |
| Primary update endpoint | `POST /templates/email/update` | `POST /content_blocks/update` |

**Key architectural principle:** Content Blocks are the right abstraction for any content that appears in more than one template. Duplicating content across templates creates a maintenance liability — a brand update or legal change must be applied N times. Extract shared content to blocks early.

---

## API Quick Reference

### Email Templates

| Operation | Method | Endpoint | Required Permission |
|---|---|---|---|
| Create | `POST` | `/templates/email/create` | `templates.email.create` |
| Update | `POST` | `/templates/email/update` | `templates.email.update` |
| Get details | `GET` | `/templates/email/info` | — |
| List | `GET` | `/templates/email/list` | — |

**Note:** `GET /templates/email/list` excludes drag-and-drop editor templates. If you need a full inventory, supplement with dashboard exports.

### Content Blocks

| Operation | Method | Endpoint | Required Permission |
|---|---|---|---|
| Create | `POST` | `/content_blocks/create` | `content_blocks.create` |
| Update | `POST` | `/content_blocks/update` | `content_blocks.update` |
| Get info | `GET` | `/content_blocks/info` | `content_blocks.info` |
| List | `GET` | `/content_blocks/list` | `content_blocks.list` |

---

## Lifecycle Patterns

### Template Creation Flow

```
POST /templates/email/create
  → returns email_template_id
  → store id for subsequent update calls
  → reference id in campaign creation
```

### Content Block Reference in Templates

Content Blocks are referenced inside template bodies using Liquid:

```liquid
{{content_blocks.${block_name}}}
```

When designing templates programmatically, treat block references as *named slots* — the block name is the stable contract between template and block.

### Pagination for Inventory Queries

Both `GET /templates/email/list` and `GET /content_blocks/list` support:
- `offset` + `limit` for pagination
- `modified_after` / `modified_before` for date-filtered syncs

Use date filtering for incremental sync jobs rather than full re-fetches.

---

## Topics Synthesized

This skill draws from:

- **Email Templates Overview** — scope and constraints of the email template system
- **Content Blocks Templates Overview** — Content Block system design and reuse model
- **POST Create Email Template** — fields, required permissions, response shape
- **POST Update Email Template** — update semantics, `email_template_id` usage
- **GET Email Template Information** — retrieving a single template for inspection or diff
- **GET List Email Templates** — inventory queries, pagination, drag-and-drop exclusion caveat
- **POST Create Email Content Block** — block creation, naming, HTML/text body fields
- **POST Update Content Block** — update semantics, idempotency considerations
- **GET Content Blocks Information** — single block retrieval, `include_inclusion_data` flag
- **GET List Email Content Blocks** — block inventory, date filtering, pagination

---

## Common Mistakes

**Assuming drag-and-drop templates are API-accessible.** Templates built in the drag-and-drop editor do not appear in `GET /templates/email/list` and cannot be managed via API. Architect accordingly — if programmatic management is a requirement, templates must be created via API.

**Not storing `email_template_id` after create.** The create endpoint returns this ID and it's the only way to reference the template in update calls. Treat it as a foreign key and persist it.

**Inline-duplicating content that belongs in a block.** If the same footer, legal copy, or header HTML appears in multiple templates, it should be a Content Block. Templates that embed repeated content drift out of sync over time.

**Ignoring `include_inclusion_data` on block info.** `GET /content_blocks/info` accepts an `include_inclusion_data` parameter that returns which templates reference the block. Use this before updating or deleting a block to understand blast radius.

**Over-granular blocks.** Very small blocks (a single word, a color hex) create unnecessary indirection. Blocks are best scoped to coherent content units: headers, footers, CTAs, legal sections.
