---
name: data-unification-cloud_ingestion-zero_copy_sync
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/data/unification/cloud_ingestion/zero_copy_sync
indexed_at: '2026-04-05'
keywords:
  - CDI
  - Canvas
  - Triggers
  - Personalization
  - Sync
  - Properties
  - ExternalID
  - Alias
  - Snowflake
  - ZeroCopy
triggers:
  - how to set up canvas triggers
  - sync warehouse data to canvas
  - configure CDI personalization
  - create canvas entry properties
  - zero-copy data sync
---
`★ Insight ─────────────────────────────────────`
- Topic files in Nick's plugin structure serve as "atomic knowledge units" — they're designed to be loaded independently at query time, so self-contained prose without cross-references is critical
- The `properties` vs `payload` distinction here is a CDI-specific breaking change worth highlighting prominently — engineers migrating from user-data syncs will hit this immediately
- Code examples should be preserved verbatim since they contain exact SQL schema definitions that engineers copy-paste
`─────────────────────────────────────────────────`

## Zero-Copy Personalization via CDI Canvas Triggers

CDI Canvas Triggers allow you to sync user-specific data from your data warehouse directly into Braze Canvas entry properties — without persisting that data on Braze user profiles. This is "zero-copy" in that sensitive or large attributes stay in your warehouse and are referenced only at trigger time.

**Key constraints:**
- Only `external_id` or user alias identifiers are supported (not email or phone)
- Only existing Braze users can be synced — new users cannot be created
- The column is named `properties` (not `payload` as in user-data CDI syncs)

When creating a new CDI sync, select **Canvas Triggers** as the data type.

---

## Source Table Schema

All platforms share the same logical schema:

| Column | Type | Required | Notes |
|---|---|---|---|
| `UPDATED_AT` | Timestamp | Yes | Braze syncs rows newer than last sync value |
| `EXTERNAL_ID` | String | Conditional | Required if not using alias |
| `ALIAS_NAME` | String | Conditional | Required with `ALIAS_LABEL` if using alias |
| `ALIAS_LABEL` | String | Conditional | Required with `ALIAS_NAME` if using alias |
| `PROPERTIES` | JSON String | Yes | Canvas entry properties; use `{}` if empty |

At least one of `EXTERNAL_ID` or the `ALIAS_NAME` + `ALIAS_LABEL` pair must be present per row.

`PROPERTIES` must always be a valid JSON string — never NULL. Use `{}` for rows with no personalization data.

---

## Snowflake Setup

### 1. Source Table

```sql
CREATE DATABASE BRAZE_CLOUD_PRODUCTION;
CREATE SCHEMA BRAZE_CLOUD_PRODUCTION.INGESTION;
CREATE OR REPLACE TABLE BRAZE_CLOUD_PRODUCTION.INGESTION.CANVAS_TRIGGERS_SYNC (
    UPDATED_AT    TIMESTAMP_NTZ(9) NOT NULL DEFAULT SYSDATE(),
    EXTERNAL_ID   VARCHAR(16777216),
    ALIAS_LABEL   VARCHAR(16777216),
    ALIAS_NAME    VARCHAR(16777216),
    PROPERTIES    VARCHAR(16777216)
);
```

A view or materialized view may be used instead of a table. Database, schema, and table names are customizable; column names must match exactly.

### 2. Credentials

```sql
CREATE ROLE BRAZE_INGESTION_ROLE;

GRANT USAGE ON DATABASE BRAZE_CLOUD_PRODUCTION TO ROLE BRAZE_INGESTION_ROLE;
GRANT USAGE ON SCHEMA BRAZE_CLOUD_PRODUCTION.INGESTION TO ROLE BRAZE_INGESTION_ROLE;
GRANT SELECT ON TABLE BRAZE_CLOUD_PRODUCTION.INGESTION.CANVAS_TRIGGERS_SYNC TO ROLE BRAZE_INGESTION_ROLE;

CREATE WAREHOUSE BRAZE_INGESTION_WAREHOUSE;
GRANT USAGE ON WAREHOUSE BRAZE_INGESTION_WAREHOUSE TO ROLE BRAZE_INGESTION_ROLE;

CREATE USER BRAZE_INGESTION_USER;
GRANT ROLE BRAZE_INGESTION_ROLE TO USER BRAZE_INGESTION_USER;
```

Existing CDI credentials can be reused — extend `SELECT` access to the new Canvas triggers table.

### 3. Network Policy

Allowlist Braze IPs in your Snowflake network policy to permit CDI connections.

---

## Redshift Setup

### 1. Source Table

```sql
CREATE DATABASE BRAZE_CLOUD_PRODUCTION;
CREATE SCHEMA BRAZE_CLOUD_PRODUCTION.INGESTION;
CREATE TABLE BRAZE_CLOUD_PRODUCTION.INGESTION.CANVAS_TRIGGERS_SYNC (
    updated_at   timestamptz default sysdate not null,
    external_id  varchar not null,
    alias_label  varchar,
    alias_name   varchar,
    properties   varchar(max)
);
```

### 2. Credentials

```sql
CREATE USER braze_user PASSWORD '{password}';
GRANT USAGE ON SCHEMA BRAZE_CLOUD_PRODUCTION.INGESTION TO braze_user;
GRANT SELECT ON TABLE CANVAS_TRIGGERS_SYNC TO braze_user;
```

### 3. Network Policy

Allowlist Braze IPs to enable the CDI service connection.

---

## BigQuery Setup

### 1. Dataset (optional)

```sql
CREATE SCHEMA BRAZE-CLOUD-PRODUCTION.INGESTION;
```

### 2. Source Table Fields

| Field | Type | Required |
|---|---|---|
| `UPDATED_AT` | TIMESTAMP | Yes |
| `PROPERTIES` | JSON | Yes |
| `EXTERNAL_ID` | STRING | NULLABLE |
| `ALIAS_NAME` | STRING | NULLABLE |
| `ALIAS_LABEL` | STRING | NULLABLE |

---

## Key Behavioral Notes

- **Boundary re-sync**: Rows at the exact last-synced timestamp boundary may be re-synced if new rows share that timestamp. Design for idempotent Canvas entries.
- **User aliases**: `alias_name` must be unique per `alias_label`. A user may have multiple aliases with different labels.
- **Properties scope**: Properties are available as Canvas entry properties for personalization. They are not written to the Braze user profile.
