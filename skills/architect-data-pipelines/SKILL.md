---
name: architect-data-pipelines
description: >-
  Designing data preparation workflows including data streams and governance
  principles.
metadata:
  role: braze-architect
  topics:
    - decisioning-studio-prepare-data
    - decisioning-prepare-data-data-streams
    - decisioning-prepare-data-data-principles
    - reverse-etl-rudderstack
    - reverse-etl-mozart-data
    - reverse-etl-hightouch
    - reverse-etl-census
    - reverse-etl-hightouch-personalization-api
    - reverse-etl-hightouch-cohort-import
    - reverse-etl-hightouch-overview
    - reverse-etl-census-cohort-import
    - data-and-analytics-reverse-etl
    - workflow-automation-fivetran
    - workflow-automation-airbyte
    - workflow-automation-zapier
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
Nick skill files follow a progressive disclosure model: SKILL.md should be lean (1,500–2,000 words) as it loads into context on every trigger, while detailed content lives in `references/*.md` atomic topic files that load only when needed. For this synthesized skill, the body should orient Claude on the domain landscape and point to the topic references — not reproduce them.
`─────────────────────────────────────────────────`

Here is the generated skill body:

---

# Data Pipeline Architecture

## Scope and Purpose

This skill covers the design and evaluation of data pipelines that feed Braze's decisioning infrastructure. Apply it when reasoning about how customer data moves from source systems into Braze — whether through real-time event streams, batch snapshot syncs, reverse ETL tools, or automation platforms.

The lens is **data architecture for decisioning inputs**: the goal is not general data engineering but specifically optimizing pipelines to support Braze Decisioning Studio, segmentation accuracy, personalization fidelity, and governance compliance.

Use this skill when the architect role involves:

- Evaluating which data integration tool (Fivetran, Airbyte, Census, Hightouch, RudderStack, Mozart, Zapier) fits a given use case
- Deciding between snapshot and event stream approaches for a given data entity
- Designing cohort import workflows for targeted campaigns
- Planning reverse ETL pipelines from cloud data warehouses into Braze
- Establishing data governance and quality principles for decisioning inputs
- Advising on personalization API architectures for low-latency attribute serving

---

## Core Conceptual Distinction: Snapshots vs. Event Streams

The most architecturally consequential decision in any Braze data pipeline is whether a given data entity should flow as **snapshot data** or **event stream data**.

- **Snapshot data** represents current state — a user's account tier, subscription status, or last-known location. It is replaced on each sync. Reverse ETL tools are the primary mechanism for syncing snapshots from data warehouses into Braze user profiles.
- **Event stream data** represents immutable facts — a purchase happened, a page was viewed, an email was opened. It is appended, never replaced. Streaming pipelines (Segment, Rudderstack in event mode, native Braze SDK) are the right channel for events.

Mixing these categories — for example, treating a mutable attribute as an event, or treating an event as a snapshot — is the most common root cause of poor model performance and stale personalization in Decisioning Studio.

See `references/data-streams.md` for the full treatment of this distinction.

---

## Integration Tool Landscape

### Reverse ETL (Warehouse → Braze)

Reverse ETL tools sync computed attributes, audience segments, and enriched profiles from cloud data warehouses (Snowflake, BigQuery, Redshift) back into Braze. Evaluate tools across: sync frequency, transformation support, cohort import capability, and Braze destination maturity.

| Tool | Primary Strength | Cohort Import | Notes |
|------|-----------------|---------------|-------|
| **Hightouch** | Most mature Braze destination; Personalization API for low-latency serving | Yes | Preferred for complex decisioning use cases |
| **Census** | Strong SQL-native transformation layer | Yes | Good for teams owning their transformation logic |
| **RudderStack** | Unified event + reverse ETL in one platform | Limited | Better for teams already using RudderStack for event streaming |
| **Mozart Data** | Turnkey warehouse + reverse ETL for smaller teams | Limited | Lower operational overhead, less flexibility |

See individual topic references for integration-specific configuration details.

### Inbound ETL (Source → Warehouse)

Before warehouse data can be synced into Braze via reverse ETL, it must exist in the warehouse. Fivetran and Airbyte cover the inbound leg.

- **Fivetran** — Fully managed, analyst-friendly. Prioritize when the team values reliability and minimal maintenance over flexibility.
- **Airbyte** — Open-source, self-hostable. Prioritize when cost, customization, or connector coverage (long-tail sources) is the constraint.

### Automation and Lightweight Workflows

- **Zapier** — Suitable for low-volume, event-driven automations (form submission → Braze profile update). Not appropriate for high-throughput data pipelines or as a substitute for a proper reverse ETL tool. Useful for teams without engineering resources who need simple triggers.

---

## Hightouch Personalization API Pattern

For use cases requiring real-time attribute lookups at message render time (rather than pre-synced profile attributes), Hightouch's Personalization API provides a managed low-latency data API backed by the warehouse. This pattern is appropriate when:

- Attributes are too dynamic or high-cardinality to pre-sync into Braze user profiles
- Personalization logic requires joins across warehouse tables at render time
- The team wants to avoid bloating Braze user profiles with rarely-used attributes

See `references/hightouch-personalization-api.md` for architecture details.

---

## Cohort Import Pattern

Both Hightouch and Census support importing user cohorts directly into Braze for campaign targeting. This pattern is used when:

- Audience definitions are complex SQL queries that cannot be recreated in Braze's native segmentation
- Cohort membership is computed in the warehouse from first-party and third-party data sources
- Marketing teams need to act on data that does not exist in Braze user attributes

Cohort imports create Braze segments that update on the reverse ETL sync schedule. Design the sync frequency to match the campaign's targeting freshness requirements.

See `references/hightouch-cohort-import.md` and `references/census-cohort-import.md` for tool-specific steps.

---

## Data Governance Principles for Decisioning Inputs

Decisioning quality is bounded by data quality. Enforce these principles at the pipeline design stage:

1. **Schema contracts** — Define the expected shape of every attribute synced into Braze user profiles. Untyped or schema-less syncs accumulate technical debt and cause silent failures in Liquid personalization.
2. **Sync frequency discipline** — Match sync frequency to business need. Over-syncing wastes API quota; under-syncing produces stale decisioning inputs. Most CRM use cases are well-served by hourly or daily syncs.
3. **Idempotency** — Reverse ETL syncs should be idempotent. Running the same sync twice should not produce duplicate events or corrupted profile state.
4. **Nullability hygiene** — Explicitly define how null/missing values are handled at the pipeline layer, before they reach Braze. A missing value in Liquid without a fallback will surface as an empty string in a sent message.
5. **Audit trails** — Maintain lineage from source system to Braze attribute. When a personalization defect occurs, the ability to trace the data back to its origin is essential for diagnosis.

See `references/data-principles.md` for the full governance framework.

---

## Reference Topics

This skill synthesizes the following atomic knowledge units. Consult them for tool-specific configuration, deeper architectural patterns, or implementation details:

| Reference | Content |
|-----------|---------|
| `references/data-streams.md` | Snapshots vs. event streams — the core architectural distinction |
| `references/data-principles.md` | Governance and quality principles for decisioning inputs |
| `references/prepare-data.md` | Decisioning Data Preparation workflow |
| `references/fivetran.md` | Fivetran inbound ETL integration |
| `references/airbyte.md` | Airbyte open-source data integration |
| `references/hightouch.md` | Hightouch reverse ETL — full overview and deep dive |
| `references/hightouch-personalization-api.md` | Low-latency attribute serving via Hightouch Personalization API |
| `references/hightouch-cohort-import.md` | Importing cohorts from Hightouch into Braze |
| `references/census.md` | Census reverse ETL and data activation |
| `references/census-cohort-import.md` | Importing cohorts from Census into Braze |
| `references/rudderstack.md` | RudderStack reverse ETL |
| `references/mozart-data.md` | Mozart Data reverse ETL |
| `references/reverse-etl-overview.md` | Reverse ETL category overview and selection framework |
| `references/zapier.md` | Zapier automation for lightweight Braze workflows |

---

## Decision Framework: Choosing an Integration Approach

When advising on pipeline architecture, apply this decision sequence:

1. **What is the data entity type?** → Snapshot or event stream (see Core Distinction above)
2. **Where does the data live?** → Cloud warehouse, SaaS application, or operational database
3. **What is the sync frequency requirement?** → Real-time, hourly, daily, or on-demand
4. **What is the team's operational model?** → Managed/SaaS preferred, or open-source acceptable
5. **What Braze capability is being fed?** → User profile attributes, cohort segments, or real-time personalization API

The answers to these questions narrow the tool selection and architecture pattern to recommend.

`★ Insight ─────────────────────────────────────`
The decision table at the bottom of the skill is the most durable part — it encodes the architect's judgment in a form Claude can apply consistently without needing to re-derive the tradeoffs from scratch. Embedding decision frameworks (not just facts) is what elevates a skill from a reference doc to an opinionated workflow guide.
`─────────────────────────────────────────────────`
