---
name: engineer-cloud-ingestion
description: >-
  Configures cloud data ingestion connectors, sync pipelines, and data
  transformation workflows.
metadata:
  role: braze-engineer
  topics:
    - data-unification-cloud_ingestion
    - data-unification-cloud_ingestion-zero_copy_sync
    - data-unification-cloud_ingestion-sync_logs
    - data-unification-data_transformation
    - data-unification-data_transformation-creating_a_transformation
    - data-unification-data_transformation-use_cases
    - data-technology_partners
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
In Nick's two-layer hierarchy, `SKILL.md` files sit above atomic topic reference files — they **synthesize** topics rather than repeat them. A good skill tells Claude *when* and *why* to apply knowledge, while the references under `references/` carry the *how*. This separation allows depth-adaptive routing: shallow queries load skills only, deep queries load topics too.
`─────────────────────────────────────────────────`

Here is the generated skill body:

---

# Cloud Data Ingestion

## Overview

This skill covers how to connect external data sources to Braze and keep them in sync — including warehouse-native CDI connectors, webhook-based Data Transformation pipelines, and zero-copy integrations. The lens is **operational**: how to configure, test, monitor, and troubleshoot the path from an external system into Braze user profiles and catalogs.

Use this skill when the question involves:
- Setting up or troubleshooting a Cloud Data Ingestion (CDI) connector to a data warehouse (Snowflake, BigQuery, Redshift, Databricks)
- Writing or debugging a Data Transformation to map an inbound webhook payload to a Braze API call
- Syncing catalog data, user attributes, events, or purchases from file storage or a warehouse
- Reviewing sync logs, failure modes, or retry behavior
- Choosing between CDI, Data Transformation, and direct API ingestion for a given use case
- Connecting a technology partner (Typeform, Hightouch, Census, etc.) that pushes data into Braze

## Topics This Skill Synthesizes

| Topic | What It Covers |
|-------|---------------|
| **Cloud Data Ingestion (CDI)** | Core CDI concepts — how warehouse connections work, supported sources, sync types (user data, catalog), credential setup |
| **Zero Copy Sync** | Snowflake/BigQuery native sharing; when CDI bypasses ETL entirely |
| **Cloud Ingestion Sync Logs** | Reading sync history, interpreting error states, diagnosing row-level failures |
| **Data Transformation** | Webhook ingestion model, transformation code structure, supported destinations |
| **Transformation Use Cases** | Common patterns: lead capture (Typeform), CRM sync, event forwarding |
| **Creating a Transformation** | Step-by-step: draft, test with payload preview, activate, monitor |
| **Technology Partners** | Third-party connectors and platforms that feed data into Braze via CDI or transformations |

## Key Concepts

### CDI vs. Data Transformation — Which to Use

```
External data has a warehouse or file store? → CDI connector
External system pushes webhooks?             → Data Transformation
Need sub-minute latency from SaaS tool?      → Data Transformation
Batch sync of large attribute tables?        → CDI
```

CDI pulls on a schedule (minimum 15 min); Data Transformation reacts in real time to inbound HTTP requests.

### CDI Sync Model

1. Braze connects to your warehouse using a service account / IAM role with read-only access to a designated table or view.
2. A `UPDATED_AT` column (or equivalent) drives incremental syncs — only rows newer than the last high-watermark are processed.
3. Supported sync destinations: user attributes, events, purchases, subscription groups, catalog items, catalog deletions.
4. Each connector has an independent schedule; multiple connectors can share one warehouse credential.

### Data Transformation Code Contract

Transformations are JavaScript functions. The contract:
- **Input**: `payload` (parsed webhook body), `braze_id_type` hint
- **Output**: a Braze API-compatible object — typically a `/users/track` payload
- Transformations run in a sandboxed V8 environment; no network calls, no external imports
- Use the **Preview** tab with a captured real payload before activating

### Zero Copy

For Snowflake and BigQuery, CDI can read directly from a share without staging data in S3/GCS. This removes the ETL hop but requires the share to be in the same cloud region as the Braze data cluster.

## Quick Reference

| Task | Where to Look |
|------|--------------|
| Add a CDI connector | Braze dashboard → Data Settings → Cloud Data Ingestion |
| Check last sync time / errors | CDI connector detail → Sync History tab |
| Write a transformation | Data Settings → Data Transformation → New Transformation |
| Test transformation code | Transformation editor → Preview with a sample payload |
| Row-level sync failures | Sync Logs → filter by status `error`; inspect `error_message` field |
| Supported warehouse types | CDI documentation → Supported Sources |
| Webhook source doesn't appear | Verify the transformation is **Active**; check inbound request logs |

## Common Mistakes

- **Missing `UPDATED_AT` column** — CDI will fall back to full-table scans or fail; always include a timestamp column and keep it indexed.
- **Transformation returns wrong shape** — The output must match the target Braze endpoint schema exactly. Use Preview to validate before activating.
- **Service account lacks SELECT on view** — CDI needs SELECT granted on the specific table/view, not just the schema. Test with `SHOW GRANTS` before connecting.
- **Zero Copy region mismatch** — Sharing from a different cloud region causes silent connection failures. Confirm the share is co-located with your Braze cluster.
- **Overwriting attributes with nulls** — CDI rows with blank fields will overwrite existing values. Use a view or transformation to filter out nulls before sync.
