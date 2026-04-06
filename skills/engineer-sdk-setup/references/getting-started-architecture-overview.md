---
name: getting-started-architecture-overview
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/getting_started/architecture_overview
indexed_at: '2026-04-05'
keywords:
  - segmentation
  - orchestration
  - ingestion
  - mongodb
  - snowflake
  - kafka
  - journey
  - streaming
  - attributes
  - events
triggers:
  - how does braze architecture work
  - understanding data ingestion
  - creating user segments
  - designing user journeys
  - setting up data warehouse sync
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's architecture serve as "atomic knowledge units" — they live inside `skills/{name}/references/` and are loaded selectively based on query depth routing. Keeping them dense and self-contained ensures they're useful whether loaded alone (Default depth) or alongside full skill/role context (Think/Ultrathink depth).
`─────────────────────────────────────────────────`

## Braze Architecture Overview

Braze is a streaming data platform for aggregating user data and driving personalized messaging. The platform consists of four primary surfaces: **SDK**, **REST API**, **dashboard**, and **partner integrations**.

### Five-Layer Stack

| Layer | Purpose |
|-------|---------|
| **Data Ingestion** | Pull data from SDKs, APIs, warehouses, and partners |
| **Classification** | Dynamically segment users based on attributes and events |
| **Orchestration** | Design user journeys and trigger campaigns |
| **Personalization** | Transform content in real time using audience data |
| **Action** | Deliver via push, in-app, SMS, email, webhook, Connected Catalog |

Engagement data flows back into the platform, creating a closed feedback loop for analytics.

---

### Data Ingestion

Built on **Snowflake, Kafka, MongoDB, and Redis**. All data is stored on the **user profile**.

**Key concept — User IDs:** Set `external_id` for each user at login. Must be unchanging and consistent across devices/platforms. Anonymous users are tracked from first open; `external_id` links them once known.

#### Data Sources

| Source | Mechanism |
|--------|-----------|
| Frontend (devices) | Braze SDK — auto-captures first-party data, handles anonymous users |
| Backend (databases, transactions, warehouses) | REST API |
| Partner integrations | 150+ "Alloys" — interoperable tech and data APIs |
| Data warehouse direct sync | Braze Cloud Data Ingestion (CDI) |

**Cloud Data Ingestion** supports Snowflake, Amazon Redshift, Databricks, and Google BigQuery. Syncs user attributes, events, and purchases including nested JSON and arrays of objects.

#### Storage Backend by Feature

**MongoDB** powers:
- Custom events (SDK and API)
- Custom attributes
- User profiles
- Purchase events
- Most segmentation and targeting

**Snowflake** powers:
- SQL Segment Extensions
- Prediction Suite
- Personalized Paths and Personalized Variant
- AI Personalized Item Recommendations
- Estimated Real Open Rate

> **Important:** MongoDB and Snowflake are separate systems. Removing custom event data from one does **not** remove it from the other. Data removal operations must target the correct system.

---

### Classification

Segments are built dynamically from data flowing through Braze. Standard attributes (name, email, DOB, country) are auto-tracked by the SDK. Developers define custom events and attributes during implementation — these determine how users can be segmented.

---

### Orchestration

Marketing teams design user journeys via the dashboard. Campaigns can also be triggered programmatically via the **API Campaigns** endpoint, allowing backend systems to control send timing while marketers design the content.
