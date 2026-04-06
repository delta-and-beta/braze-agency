---
name: engagement-tools-segments-segment-extension-cdi-segments
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/segments/segment_extension/cdi_segments
indexed_at: '2026-04-05'
keywords:
  - CDI
  - segments
  - SQL
  - warehouse
  - extension
  - connections
  - targeting
  - queries
  - external_user_id
  - Braze
triggers:
  - How to create a CDI segment extension
  - Writing SQL for segment extensions
  - Setting up connected sources
  - Troubleshooting segment extension queries
  - How to target users with CDI data
---
## CDI Segment Extensions

CDI Segment Extensions let you write SQL that queries your data warehouse directly via CDI connections, creating targetable user groups in Braze.

**Cost note:** Queries run against your warehouse (billed by your warehouse provider). CDI Segments do not consume SQL segment credits, don't count toward Segment Extension limits, and don't log data points.

## Prerequisites

- A configured [connected source](https://www.braze.com/docs/user_guide/data/cloud_ingestion/connected_sources/) in your workspace
- Access to Segment Extensions in Braze

## Setup

### 1. Create a connected source
Set up a CDI connected source pointing to your data warehouse before creating any CDI Segment Extensions.

### 2. Create the segment extension
1. Create a new **Segment Extension** → select **Full refresh**
2. For data source, choose **CDI Data Tables**
3. Select a connection (each connection has specific data tables configured by your dev team)
4. Use **Reference** to inspect available tables, schema, and descriptions
5. Write SQL using [Braze SQL syntax](https://www.braze.com/docs/user_guide/engagement_tools/segments/sql_segments/#writing-sql)

### 3. SQL requirements

- Must select `external_user_id` as the output column
- `external_user_id` must be a **string** — cast numeric IDs: `CAST(client_id AS VARCHAR)`
- Users returned that don't exist in Braze are silently ignored (no new users created)

### 4. Use in a segment
Reference the Segment Extension within a Braze segment to target in campaigns or Canvases.

## Constraints

| Constraint | Detail |
|---|---|
| Connections per extension | One only — cannot mix connections |
| Data source mixing | CDI data OR Braze Snowflake (Currents), not both in one extension |
| Query timeout | 60 minutes maximum (set per connection sync) |

## Troubleshooting

- **Timeout errors**: Query exceeded 60-minute max runtime — optimize SQL or check the connection's runtime setting on the Cloud Data Ingestion page
- **SQL errors**: Verify syntax matches your specific warehouse dialect
