---
name: data-unification-cloud_ingestion
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/data/unification/cloud_ingestion
indexed_at: '2026-04-05'
keywords:
  - ingestion
  - warehouse
  - integration
  - sync
  - identifiers
  - attributes
  - events
  - segmentation
  - sources
  - billing
triggers:
  - set up cloud data ingestion
  - connect data warehouse to Braze
  - sync user data to Braze
  - configure CDI integration
  - map user identifiers
---
# Cloud Data Ingestion (CDI)

Braze CDI enables direct connections from data warehouses or file storage to sync user and non-user data to Braze for personalization and segmentation.

## How It Works

- Sets up a scheduled integration between your data warehouse and Braze workspace
- Sync frequency: every 15 minutes (minimum) to once per month
- For sub-15-minute frequency, use REST API calls instead
- Each sync retrieves all new data from the specified table and updates Braze accordingly

**Finding your integration ID:** Navigate to **Data Settings > Cloud Data Ingestion**, select an integration. The ID appears in the URL: `https://[instance].braze.com/integrations/cloud_data_ingestion/[integration_id]`

## Supported Data Sources

- Amazon Redshift
- Databricks
- Google BigQuery
- Microsoft Fabric
- Snowflake
- Amazon S3

## Supported Data Types

| Category | Types |
|----------|-------|
| User data | Attributes (nested custom, arrays of objects, subscription statuses), custom events, purchase events, deletion requests |
| Non-user | Catalog items |
| Zero-copy | Connected Sources (Braze queries your warehouse directly without copying data) |

## User Identifiers

Each row must contain a value for **only one identifier type**, but a table can include columns for multiple types.

| Identifier | Notes |
|------------|-------|
| `EXTERNAL_ID` | Matches `external_id` in Braze; creates or updates profiles |
| `ALIAS_NAME` + `ALIAS_LABEL` | Together form a user alias object; one `alias_name` per `alias_label` |
| `BRAZE_ID` | SDK-generated ID; **cannot create new users**, only update existing |
| `EMAIL` | Most recently updated profile prioritized on duplicates; takes precedence over phone when both present |
| `PHONE` | Most recently updated profile prioritized on duplicates |

## Data Point Billing

CDI billing is equivalent to the `/users/track` endpoint. CDI rate limits are **combined** with the Braze API rate limit — not separate.

## Product Limits

| Limit | Value |
|-------|-------|
| Integrations | Unlimited total; one per table/view |
| Rows per sync | 500 million max (contact support to increase) |
| Attributes per row | Single user ID + JSON object with up to 250 attributes |
| Payload size | 1 MB max per row; oversized payloads are rejected and logged |
| Region support | All Braze regions; any region can connect to any source region |

## Connected Sources (Zero-Copy Alternative)

Connected Sources let Braze directly query your data warehouse to build CDI segments without copying underlying data to Braze.

`★ Insight ─────────────────────────────────────`
- The "one integration per table/view" constraint means schema design matters upstream — teams often create dedicated CDI views rather than pointing at raw tables, enabling fine-grained control over what gets synced without schema changes.
- The combined rate limit between CDI and REST API is an easy-to-miss footgun: a high-frequency CDI sync can throttle your real-time API calls, and vice versa.
`─────────────────────────────────────────────────`
