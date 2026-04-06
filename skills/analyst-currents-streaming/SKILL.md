---
name: analyst-currents-streaming
description: >-
  Configures Braze Currents for real-time event streaming to data warehouses and
  analytics platforms.
metadata:
  role: braze-analyst
  topics:
    - data-distribution-braze_currents
    - data-distribution-braze_currents-setting_up_currents
    - data-distribution-braze_currents-transferring_data_to_redshift
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
Nick's skill files are used as "onboarding guides" for Claude agents — they encode procedural knowledge that isn't learnable from model weights alone (API connector quirks, warehouse-specific configs, required IAM permissions). A well-designed skill keeps the SKILL.md body lean and delegates deep detail to `references/` files for progressive disclosure.
`─────────────────────────────────────────────────`

# Currents Data Streaming

## Scope and Purpose

This skill covers Braze Currents — the platform's real-time behavioral event streaming feature — with a focus on setup, connector configuration, and optimization for downstream analytics systems. Use this skill when the goal is to export Braze engagement and behavioral data continuously to an external data warehouse, storage layer, or analytics platform.

Currents is the authoritative source of raw, granular Braze event data. Unlike Braze's REST Export APIs (which are batch and rate-limited), Currents delivers event records as they occur, enabling near-real-time analytics pipelines, attribution modeling, and behavioral cohort construction.

The lens of this skill is operational: how to activate, configure, and maintain a Currents connector so that data flows reliably and is structured for use in warehouse queries.

---

## When to Use This Skill

Apply this skill when a braze-analyst task involves any of the following:

- **Initial Currents setup** — choosing a connector type, configuring credentials, mapping event categories
- **Troubleshooting data gaps** — diagnosing missing events, verifying connector health, auditing event volume
- **Optimizing for a destination** — tuning Avro/JSON format selection, partition strategies, or Redshift-specific loading patterns
- **Expanding event coverage** — adding new event types (e.g., Content Card, Feature Flag impressions) to an existing Currents connection
- **Cross-platform data lineage** — understanding how Braze event fields map to warehouse columns for joins with CRM or product data
- **Cost and volume management** — estimating event volume, controlling connector scope to avoid excessive warehouse ingestion

---

## Topics Synthesized by This Skill

This skill draws on three primary knowledge areas:

### 1. Braze Currents Overview

Currents is Braze's event streaming feature for exporting real-time behavioral data to external systems. It supports two major connector categories:

**Data Warehouse / Storage connectors:**
- Amazon S3
- Google Cloud Storage
- Azure Blob Storage
- Snowflake (native partner connector)

**Analytics / Engagement connectors:**
- Segment
- Mixpanel
- Amplitude
- mParticle

Events are grouped into **engagement events** (sends, opens, clicks, bounces, conversions) and **user behavior events** (custom events, purchases, session starts, subscription changes). Each Currents connection can subscribe to one or more event categories.

Data is serialized in **Avro** (default, schema-enforced, compact) or **JSON** depending on connector and configuration. Avro schemas are versioned and published in Braze's public GitHub schema repository.

### 2. Setting Up Currents

Currents connections are created from **Braze Dashboard → Integrations → Currents → Create New Current**. Each connection requires:

- **Connector type selection** — determines available event categories and output format
- **Credential configuration** — AWS IAM role ARN or access key, GCS service account, Snowflake account credentials, etc.
- **Event category selection** — at minimum select the engagement event types relevant to the use case; user behavior events must be explicitly enabled
- **Connection naming and app association** — connections are scoped to an app group; name them to reflect destination and scope (e.g., `prod-s3-engagement-events`)

For storage connectors (S3, GCS), Braze writes Avro files in batches with a key structure:
```
{prefix}/{event-type}/YYYY/MM/DD/HH/{uuid}.avro
```

Verify the connection is active by checking **Dashboard → Currents → [Connection Name]** for `Status: Active` and reviewing delivery metrics within the first 30 minutes.

### 3. Transferring Data to Redshift

Loading Currents data into Amazon Redshift involves three distinct concerns: **storage layout**, **schema mapping**, and **load mechanics**.

**Storage layout for Redshift ingestion:**
- Configure the S3 Currents connector to write to a dedicated prefix (e.g., `braze-currents/`)
- Use a consistent bucket region matching the Redshift cluster region to avoid cross-region data transfer costs
- Enable S3 versioning on the target bucket to protect against accidental deletion

**Schema mapping:**
Avro schemas define all fields for each event type. Key structural patterns:

- All events share a common envelope: `id` (UUID), `time` (Unix epoch), `user_id` (external ID), `device_id`
- Engagement events include `app_id`, `send_id`, `campaign_id`/`canvas_id`, `dispatch_id`
- Message-type fields (e.g., `email_address`, `to_phone_number`) vary by channel

Convert Avro to Parquet or CSV before loading into Redshift, or use Redshift Spectrum to query Avro files in-place on S3.

**Load mechanics (COPY command pattern):**
```sql
COPY engagement_events
FROM 's3://your-bucket/braze-currents/users.messages.email.Open/'
IAM_ROLE 'arn:aws:iam::account-id:role/RedshiftS3Role'
FORMAT AS AVRO 'auto'
TIMEFORMAT 'epochsecs';
```

Use `MANIFEST` files or `AUTO` path discovery to incrementally load only new partitions. Schedule loads via AWS Glue, dbt, or Airflow at the appropriate cadence (typically hourly for near-real-time, daily for cost-optimized batch).

---

## Key Operational Patterns

### Connector Health Monitoring

Currents connectors surface delivery metrics in the Braze dashboard. Check:

- **Events delivered** vs. **events attempted** — a gap indicates credential or permissions issues
- **Last delivery timestamp** — stale timestamps signal connector interruption
- **Error logs** — accessible via Braze Support or webhook error surface depending on connector type

For S3 connectors, monitor the target bucket for new file arrivals using S3 event notifications or CloudWatch metrics on `NumberOfObjects`.

### Event Volume Estimation

Before enabling Currents, estimate daily event volume to size warehouse infrastructure:

- Pull monthly active users (MAU) from Braze Dashboard → Overview
- Apply channel multipliers: email sends ≈ MAU × send frequency; opens ≈ 20–30% of sends; clicks ≈ 3–5% of sends
- Custom events scale with product usage patterns — check Braze's Custom Events Report for current volume

Currents billing is typically included in enterprise contracts but may be volume-gated — confirm with Braze account team before enabling high-volume event categories.

### Managing Multiple Connections

Create separate Currents connections for:

- **Engagement events** (high volume, latency-sensitive) → real-time storage connector
- **User behavior events** (lower volume, enrichment-oriented) → analytics connector or same storage connector with separate prefix

Avoid mixing all event types into a single connection unless downstream infrastructure handles fan-out, as this complicates schema management and load pipelines.

---

## Common Configuration Mistakes

| Mistake | Impact | Fix |
|---|---|---|
| Insufficient S3 bucket policy | Connector fails silently or with auth errors | Grant `s3:PutObject`, `s3:GetBucketLocation` to Braze's AWS account ID |
| Missing `send_id` in joins | Duplicate attribution in campaign analysis | Always include `send_id` as the join key between send and engagement events |
| Loading all Avro fields into Redshift | Schema bloat, slow queries | Select only the columns used downstream; use Spectrum for exploratory access |
| Using access keys instead of IAM roles | Security risk, rotation burden | Prefer IAM role assumption with Braze's documented external account ID |
| Not filtering test sends | Skews analytics | Filter `canvas_id IS NULL AND campaign_id LIKE '%test%'` or use send tags |

---

## Reference Files

For detailed field-level schema documentation and connector-specific configuration walkthroughs, consult:

- **`references/currents-overview.md`** — Full event taxonomy, Avro schema structure, connector comparison matrix
- **`references/redshift-transfer.md`** — Step-by-step Redshift COPY patterns, Glue crawler configuration, partition pruning strategies
- **`references/currents-setup.md`** — Dashboard walkthrough, IAM policy templates, credential rotation procedures

---

## Decision Guidance

When assisting with a Currents task, first establish:

1. **Destination** — which connector type and warehouse/platform
2. **Event scope** — engagement only, behavior only, or both
3. **Latency requirement** — near-real-time (sub-hour) or daily batch acceptable
4. **Current state** — new setup, existing connector with issues, or expanding coverage

This determines whether the task is a **configuration task** (new connector, credential update), a **diagnostic task** (missing data, delivery errors), or an **optimization task** (query performance, cost reduction).

`★ Insight ─────────────────────────────────────`
The skill deliberately avoids embedding full Avro schemas or IAM policy JSON inline — that content belongs in `references/` files. This keeps SKILL.md fast to load and lets Claude decide whether the detailed reference material is actually needed for the specific query. For a "how do I set up Currents?" question, the setup section above is sufficient; for "what are all the fields on an email open event?", Claude would reach for `references/currents-overview.md`.
`─────────────────────────────────────────────────`
