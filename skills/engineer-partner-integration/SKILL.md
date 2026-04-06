---
name: engineer-partner-integration
description: >-
  Technical setup for ISV partners including data connectors, cohort imports,
  Currents integration, and Snowflake data sharing.
metadata:
  role: braze-engineer
  topics:
    - partners-isv-partners
    - partners-isv-api-partner
    - partners-isv-currents-integration
    - partners-isv-cohort-import
    - partners-isv-data-transformation
    - partners-isv-snowflake-datasharing
    - partners-isv-best-practices
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- This is a **reference-type skill** (not discipline-enforcing), so the structure prioritizes quick lookup over rationalization tables — tables and bullets over flowcharts
- Skill files for agent plugins serve a dual audience: Claude (routing/retrieval) and the braze-engineer agent (actual content to apply) — so the "when to use" signals and keyword density matter as much as the content itself
`─────────────────────────────────────────────────`

Here is the generated skill file body:

---

# Partner Technical Integration

## Overview

This skill covers the technical mechanics of connecting ISV (Independent Software Vendor) partner platforms to Braze. It addresses every integration pathway a partner engineer encounters: data connectors, cohort imports, real-time event streaming, Snowflake data sharing, webhook-based transformations, and API contract requirements.

**Lens:** How to technically integrate partner platforms with Braze — from the partner engineer's perspective, not the customer's.

Use this skill when:
- Building or debugging a new ISV partner integration with Braze
- Choosing the right integration method (API, Currents, cohort import, data share, webhook/transformation)
- Implementing Snowflake Data Sharing on behalf of a customer
- Setting up a custom Currents connector for real-time event delivery
- Configuring cohort import to sync user segments from a partner platform
- Defining `User-Agent` headers or other API contract requirements for partner API integrations
- Using Braze Data Transformation to map partner webhooks to Braze user attributes/events

## Topics This Skill Synthesizes

| Topic | What It Covers |
|---|---|
| **ISV Partners Overview** | Integration method taxonomy; how Braze provisions partner access; partner onboarding concepts |
| **Snowflake Data Sharing** | Provisioning a Snowflake share to a partner's instance on behalf of the customer; schema access patterns |
| **ISV Data Transformation** | Using Braze Data Transformation to ingest partner webhooks and define field mappings to Braze objects |
| **Currents Integration** | Custom Currents connector setup; real-time event streaming from Braze to a partner endpoint |
| **Cohort Import** | Partner-side cohort generation and sync; sending user cohorts into Braze via the integration feature |
| **ISV Partner Best Practices** | User lifecycle management; identifier hygiene; data collection patterns for partner integrations |
| **API Partner Integration** | `User-Agent` header syntax requirements; API contract rules for partner API integrations |

## Integration Method Selection

Choose the integration pathway based on data direction and latency requirements:

| Scenario | Method |
|---|---|
| Partner needs Braze event data in real time | **Custom Currents connector** |
| Partner platform generates user segments to push into Braze | **Cohort Import** |
| Partner needs access to Braze data in their Snowflake account | **Snowflake Data Sharing** |
| Partner sends webhooks that need to map to Braze user/event data | **Data Transformation** |
| Partner calls Braze REST API directly | **API Partner Integration** (with `User-Agent` header contract) |

## Key Implementation Patterns

### Snowflake Data Sharing
Braze provisions the share to the partner's Snowflake instance on the customer's behalf. The partner receives read-only access to a subset of the customer's Braze data. Understand which schemas are exposed, the refresh cadence, and the customer authorization flow.

### Custom Currents Connector
Currents streams Braze engagement events (email opens, push sends, etc.) to a partner-controlled endpoint in real time. The connector must handle Avro-encoded payloads, implement idempotency, and respect Braze's delivery guarantees. Partners configure the connector endpoint; Braze handles fan-out.

### Cohort Import
Partners generate user cohorts in their platform and push them to Braze via the cohort import integration. The sync writes a custom attribute to Braze user profiles indicating cohort membership. Partners must manage the cohort identifier mapping and handle incremental vs. full-refresh sync strategies.

### Data Transformation (Webhook Ingestion)
Partners post webhooks to a Braze Data Transformation endpoint. A customer-defined JavaScript mapping function converts the payload into Braze `/users/track` API calls. As a partner engineer, provide reference transformation templates customers can adapt — do not assume customers will write mapping code from scratch.

### API Partner Integration
All partner API calls must include a structured `User-Agent` header identifying the partner platform and version. This is an API contract requirement, not optional. Braze uses this for attribution and support routing.

## User Identifier Best Practices

Across all integration methods, consistent user identification is critical:
- Map partner user identifiers to Braze `external_id` where possible
- Avoid creating duplicate profiles by coordinating identifier resolution before the first write
- For anonymous users, use `braze_id` or alias-based identification until an `external_id` is available
- Document the identifier mapping strategy in the integration spec before implementation

## Common Mistakes

| Mistake | Fix |
|---|---|
| Using email as the primary join key across systems | Use `external_id`; email can change and creates merge conflicts |
| Assuming Currents delivers exactly-once | Implement idempotency on the partner endpoint; Currents is at-least-once |
| Omitting `User-Agent` header in partner API calls | Required by API contract; add partner name + version in standard format |
| Sending full cohort on every sync | Support incremental sync (additions + removals) to avoid attribute churn |
| Writing Data Transformation code without a test payload | Always validate the mapping function against a real sample webhook payload before going live |
