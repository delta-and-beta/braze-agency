---
name: engineer-data-connectors
description: >-
  Technical setup of workflow automation tools, cloud storage destinations, and
  data pipeline connectors.
metadata:
  role: braze-engineer
  topics:
    - workflow-automation-zapier
    - workflow-automation-snowplow
    - workflow-automation-nexla
    - workflow-automation-mozart-data
    - workflow-automation-metarouter
    - workflow-automation-fivetran
    - workflow-automation-airbyte
    - cloud-storage-microsoft-azure-blob-storage-for-currents
    - cloud-storage-google-cloud-storage-for-currents
    - cloud-storage-amazon-s3
    - data-and-analytics-workflow-automation
    - data-and-analytics-cloud-storage
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- This skill file serves as a **routing document** — Claude reads it to decide whether to apply this domain knowledge, so the structure prioritizes *when to apply* over *how to implement*
- Grouping topics by **connector type** (workflow automation vs. cloud storage vs. pipeline) mirrors how an engineer would mentally categorize integration work, making retrieval more intuitive
- The "lens" section is the most valuable part for an AI agent — it constrains *which aspects* of each topic are relevant to this role, preventing topic drift into unrelated concerns
`─────────────────────────────────────────────────`

Here is the generated skill file content:

---

# Data Connector Engineering

## Overview

This skill covers the technical configuration and operational management of data connectors that move event, user, and behavioral data into and out of Braze. It applies specifically to the **braze-engineer** role and focuses on the practitioner's lens: how to authenticate connectors, map data formats, schedule syncs, and tune throughput for production workloads.

Use this skill when you are:
- Setting up a third-party tool to send data to Braze or receive data from it
- Troubleshooting a broken or misconfigured connector
- Choosing between integration options (e.g., Fivetran vs. Airbyte vs. MetaRouter)
- Configuring Braze Currents to export event streams to cloud storage
- Optimizing pipeline throughput or sync frequency

Do **not** use this skill for questions about Braze campaign logic, message personalization, or segmentation — those belong to other role-specific skills.

---

## Lens: Connector Authentication, Data Format Mapping, Sync Scheduling, and Throughput Configuration

Every topic in this skill is read through four engineering concerns:

| Concern | What to focus on |
|---|---|
| **Authentication** | API keys, OAuth flows, service account credentials, IAM roles, and credential rotation |
| **Data format mapping** | Field-level mapping between source schemas and Braze's expected event/attribute/purchase structure |
| **Sync scheduling** | Trigger types (event-driven, batch, cron), latency tradeoffs, and backfill behavior |
| **Throughput** | Rate limits, parallelism, chunking, retry logic, and monitoring for lag or data loss |

When answering questions about any of the topics below, ground your response in these four concerns unless the question is explicitly narrower.

---

## Topics Synthesized

### Workflow Automation

**Zapier Workflow Automation** — Zapier connects Braze to hundreds of web apps through trigger-action Zaps. Relevant to low-code automation of user data flows, webhook relay, and event forwarding without a dedicated pipeline infrastructure.

**Mozart Data Workflow Automation** — Mozart Data is an all-in-one modern data platform built on Fivetran, Portable, and Snowflake. Relevant when orchestrating warehouse-centric workflows that feed into Braze via reverse ETL or data activation patterns.

**Workflow Automation Category Overview** — General context for evaluating automation platforms. Use when recommending an approach before a specific tool has been selected.

### Event Routing and Pipeline Infrastructure

**Snowplow Event Pipeline** — Snowplow is a behavioral data platform for server-side event collection and enrichment. Relevant when configuring Snowplow as an upstream event source that feeds Braze via a downstream connector or webhook.

**MetaRouter Event Routing** — MetaRouter is a server-side tag management and event routing platform. Relevant when centralizing event collection and forwarding enriched events to Braze without client-side SDKs.

**Fivetran Data Pipeline** — Fivetran provides fully managed ELT connectors with automatic schema management. Relevant when syncing structured data from databases or SaaS sources into a warehouse that subsequently feeds Braze.

**Airbyte Data Integration** — Airbyte is an open-source data integration engine for consolidating data across warehouses, lakes, and databases. Relevant for self-hosted or cloud-managed ELT pipelines feeding Braze through a data warehouse intermediary.

**Nexla Data Automation** — Nexla is a unified data operations platform for building governed, scalable data flows. Relevant when enterprise-grade data governance or cross-system data mesh patterns are required alongside Braze integration.

### Cloud Storage (Braze Currents Destinations)

**Amazon S3 Cloud Storage** — AWS S3 is the most common Currents destination. Relevant when configuring bucket policies, IAM roles, prefix routing, and cross-account access for Currents exports.

**Google Cloud Storage for Currents** — GCS as a Currents destination. Relevant when configuring service account authentication, bucket ACLs, and object lifecycle policies for Braze event exports on Google Cloud.

**Azure Blob Storage for Currents** — Azure Blob as a Currents destination. Relevant when configuring storage account credentials, SAS tokens, and container permissions for Braze event exports on Azure.

**Cloud Storage Category Overview** — General context for choosing and comparing cloud storage destinations for Currents. Use when the destination has not yet been decided.

---

## Key Engineering Patterns

**Authentication patterns by connector type:**
- *Managed SaaS connectors* (Fivetran, Airbyte Cloud, Nexla): OAuth or API key stored in the connector UI; Braze REST API key with appropriate endpoint permissions
- *Event routers* (MetaRouter, Snowplow): Webhook endpoint authentication via shared secret or HMAC signature verification
- *Cloud storage Currents*: IAM role assumption (AWS), service account JSON key (GCP), or storage account connection string / SAS token (Azure)
- *Workflow automation* (Zapier, Mozart Data): API key authentication against Braze's `/users/track`, `/events`, or `/purchases` endpoints

**Data format expectations:**
Braze's `/users/track` endpoint expects events, attributes, and purchases as distinct arrays. Most connectors require explicit field mapping from source schemas to these structures. Pay attention to:
- `external_id` as the primary user identifier (vs. `braze_id` or `user_alias`)
- ISO 8601 timestamps for `time` fields
- Custom event property nesting limits (max 50 key-value pairs per event, 255-character string values)

**Sync scheduling tradeoffs:**
- Real-time event routing (MetaRouter, Snowplow) minimizes latency but requires robust retry and dead-letter queue configuration
- Batch syncs (Fivetran, Airbyte) reduce API call overhead but introduce lag; tune sync frequency to match campaign personalization freshness requirements
- Currents is event-driven and near-real-time; cloud storage files are written in ~5-minute rolling windows

**Throughput and rate limits:**
Braze's REST API enforces per-endpoint rate limits (typically 250,000 requests/hour for `/users/track`). When configuring high-volume connectors:
- Batch requests into arrays (up to 75 events per `/users/track` call)
- Implement exponential backoff on 429 responses
- Monitor connector lag dashboards alongside Braze's delivery metrics

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| Using `braze_id` as the user identifier in connector mappings | Use `external_id` unless you have a specific reason to reference Braze's internal ID |
| Sending timestamps as Unix epoch integers | Braze expects ISO 8601 strings (e.g., `"2024-01-15T10:30:00Z"`) |
| Granting overly broad Braze API key permissions to connectors | Scope API keys to only the endpoints the connector calls |
| Ignoring Currents file schema versioning | Braze may add fields; parsers should be schema-tolerant (ignore unknown fields) |
| Configuring S3 Currents without versioning or lifecycle rules | Enable versioning and set a retention policy to manage storage costs |
| Treating Zapier as a production-scale pipeline | Zapier is appropriate for low-volume automation; use Fivetran/Airbyte for high-throughput data movement |
