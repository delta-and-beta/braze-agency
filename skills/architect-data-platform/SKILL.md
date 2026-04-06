---
name: architect-data-platform
description: >-
  Designs the overall Braze data platform topology including unification,
  activation, and distribution layers.
metadata:
  role: braze-architect
  topics:
    - data-braze_data_platform
    - data-unification
    - data-distribution
    - data-activation
    - data-unification-user_data
    - data-unification-data_transformation
    - data-unification-cloud_ingestion
    - data-technology_partners
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- Skill files in this pipeline are synthesized from atomic topic files (`references/*.md`) — the skill is the "lens" that unifies those fragments into a coherent perspective for an agent persona
- The role (`braze-architect`) determines the framing: an architect cares about topology and data flow, not individual metric definitions or API call signatures
- The writing-skills TDD approach applies to meta-skills (discipline enforcement); for domain reference skills like this one, the quality signal is coherence and coverage of the source topics
`─────────────────────────────────────────────────`

Here is the generated skill content:

---

# Data Platform Architecture

## Overview

This skill covers the Braze data platform as an architectural whole — how its three layers (unification, activation, distribution) connect, and how data flows through the system end-to-end. Use this skill when reasoning about topology decisions, integration points, data lifecycle, or how platform capabilities relate to each other.

The Braze data platform is a **composable set of capabilities and partner integrations** organized around three jobs-to-be-done:

| Layer | Job | Direction |
|---|---|---|
| **Data Unification** | Collect and consolidate user data from all sources | Inbound → Braze |
| **Data Activation** | Drive personalization, segmentation, and messaging | Internal → Channels |
| **Data Distribution** | Export and share data with downstream systems | Outbound ← Braze |

---

## End-to-End Data Flow

```
External Sources                Braze Core                 Downstream Systems
─────────────────    ─────────────────────────────    ──────────────────────
  SDK Events     ──►                                 ──►  Partner Platforms
  APIs           ──►   UNIFICATION → ACTIVATION      ──►  Data Warehouses
  CDI (Warehouse)──►   (User Profiles, Segments,     ──►  File Exports
  File Storage   ──►    Campaigns, Analytics)        ──►  Technology Partners
```

Data enters through the **unification layer**, is processed and acted upon in the **activation layer**, and leaves through the **distribution layer**. Each layer has distinct integration patterns and operational constraints.

---

## Layer 1: Data Unification

Unification is the inbound layer — it consolidates identity and behavioral data from all sources into Braze user profiles.

### Ingestion Mechanisms

- **SDK** — Real-time event capture from mobile and web surfaces. SDK events trigger session tracking, which affects user lifecycle state.
- **REST API** — Server-side event and attribute writes.
- **Cloud Data Ingestion (CDI)** — Direct sync from data warehouses (Snowflake, BigQuery, Redshift, Databricks) or file storage (S3, GCS). CDI supports both user data and **non-user (catalog) data** for personalization.

### CDI Architecture

CDI operates as a pull-based connector: Braze queries source tables/views on a schedule and syncs delta changes to user profiles. Key design considerations:

- Requires a **sync table or view** on the warehouse side with a `UPDATED_AT` column for delta detection
- Supports attribute writes, event writes, and deletion requests
- Suitable for high-volume historical backfills and warehouse-of-record patterns

### User Data Lifecycle Constraint

Braze automatically blocks users ("dummy users") who exceed **5 million sessions** with no further SDK event ingestion — a protective guard against misconfigured integrations or test data pollution. Architects must account for this when designing session instrumentation at scale.

---

## Layer 2: Data Activation

Activation is the internal processing layer — it drives segmentation, personalization, and analytics from unified profile data.

### Core Capabilities

- **Segmentation** — Filter users by attributes, events, and behavioral patterns for targeting
- **Personalization** — Liquid templating and Connected Content pull data into message rendering
- **Analytics** — Campaign and Canvas metrics track engagement outcomes

### Key Analytics Metrics (Reference)

Activation surfaces a rich set of engagement metrics. Representative examples across channels:

| Metric | Channel | Description |
|---|---|---|
| AMP Clicks | Email | Clicks within AMP-enabled emails |
| AMP Opens | Email | Opens of AMP-enabled emails |
| Unique Opens | Email | Distinct users who opened |
| Conversions | Cross-channel | Goal completions attributed to a campaign |

These metrics are the output of activation — they feed back into segmentation (e.g., "users who opened but did not convert") and into the distribution layer for downstream reporting.

---

## Layer 3: Data Distribution

Distribution is the outbound layer — it exports Braze data to partner systems, data warehouses, and analytics platforms.

### Distribution Patterns

- **Currents** — Real-time streaming export of engagement events (opens, clicks, conversions) to warehouses and partner platforms
- **REST API exports** — Pull-based segment and user data retrieval
- **Scheduled exports** — File-based CSV exports to cloud storage
- **Technology Partner integrations** — Pre-built connectors to analytics, attribution, and data platforms

### Technology Partners as Distribution Nodes

Technology partners extend Braze's distribution surface. Common integration categories include attribution platforms, CDPs, analytics tools, and advertising networks. Partners connect via Currents (event streaming), webhooks, or API-based data pulls.

---

## Data Transformation

Between layers, Braze supports in-platform transformation via **Data Transformation** — webhook-to-Braze pipelines that normalize and route inbound third-party payloads into user attribute or event writes. This bridges external event systems into the unification layer without requiring intermediate infrastructure.

---

## Topics This Skill Synthesizes

| Topic | Layer | Key Concept |
|---|---|---|
| Braze Data Platform Overview | All | Three-layer composable architecture |
| Cloud Data Ingestion (CDI) | Unification | Warehouse-to-Braze sync patterns |
| Data Unification Overview | Unification | Session limits, dummy user behavior |
| User Data Management | Unification | Dummy user blocking at 5M sessions |
| Data Transformation | Unification boundary | Webhook normalization into Braze |
| Data Activation Overview | Activation | Analytics metrics reference |
| Technology Partners | Distribution | Partner integration surface |
| Data Distribution Overview | Distribution | Export and sharing patterns |

---

## Architectural Lens

When reasoning as a **braze-architect**, the primary questions are:

- **Where does data originate?** → Determines ingestion mechanism (SDK vs. CDI vs. API)
- **What does Braze need to know about the user?** → Determines unification schema design
- **What actions does Braze take on that data?** → Determines activation configuration (segments, campaigns, canvases)
- **Where does data need to go after Braze?** → Determines distribution mechanism (Currents, exports, partner integrations)
- **What are the volume and lifecycle constraints?** → Dummy user limits, CDI sync frequency, Currents throughput

This skill does **not** cover per-channel message configuration, individual API endpoint reference, or SDK implementation details — those belong to engineering-focused skills.

---

`★ Insight ─────────────────────────────────────`
- The three-layer framing (unification → activation → distribution) maps directly to how most CDPs and marketing platforms are architected — it's a standard topology that makes it easy to reason about integration points
- CDI's pull-based delta sync pattern (via `UPDATED_AT`) is the same pattern used by tools like dbt, Fivetran, and Airbyte — recognizing this helps architects apply familiar warehouse integration intuitions to Braze
- The dummy user limit (5M sessions) is an operational constraint that surfaces architectural concerns: test data isolation, session instrumentation correctness, and load testing strategies all need to account for it
`─────────────────────────────────────────────────`
