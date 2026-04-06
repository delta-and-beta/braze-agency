---
name: cdp-octolis
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/data_and_analytics/customer_data_platform/octolis
indexed_at: '2026-04-05'
keywords:
  - octolis
  - braze
  - CDP
  - sync
  - deduplication
  - audiences
  - integration
  - activation
  - attributes
  - webhook
triggers:
  - how to sync data to Braze
  - set up Braze integration
  - configure field mapping
  - create Octolis audience
  - deduplicate customer data
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's architecture are "atomic knowledge units" — they live in `skills/{name}/references/*.md` and are loaded at Default depth (Sonnet). Keeping them concise and self-contained is critical because they're the first layer hit on every query.
`─────────────────────────────────────────────────`

## Octolis CDP — Braze Integration

Octolis is a headless CDP / data activation platform that sits atop your own database. It unifies, prepares, scores, and syncs data from multiple sources into Braze.

**Role in the stack:** Octolis acts as middleware between raw data sources (online + offline) and Braze — handling deduplication, normalization, computed fields, and incremental sync.

---

### Prerequisites

| Requirement | Notes |
|---|---|
| Octolis account | Required |
| Braze REST API key | Needs `users.track` permission — create at **Settings > API Keys** |
| Braze REST endpoint | Instance-specific URL |
| Braze app key | Found at **Dashboard > Manage Settings > API Key** |

---

### Integration Steps

#### 1. Connect Data Sources

Create at least one **Audience** in Octolis before syncing. Audiences combine multiple sources with preparation steps and computed fields.

Supported source types:
- Salesforce objects (contacts, accounts)
- Zendesk objects (tickets)
- SFTP files (CSV, JSON)
- Database tables/views
- Webhook/API-pushed records

#### 2. Add Braze as Destination

**Settings > + Add more > Braze**, then configure:
- API key
- Time window + request volume (rate limiting)
- Custom attributes — specify field name, format (`string`, `integer`, `float`), and whether required for syncs

#### 3. Create a Sync

**Syncs > Add sync** — select an audience, choose Braze as destination, select the target Braze entity.

#### 4. Configure Output Settings

| Setting | Description |
|---|---|
| Target entity | Braze object to create/update |
| Identifier field | Field Octolis uses to match existing Braze records |
| Sync frequency | Incremental by default (only new/changed values); full-table also available |
| Field mapping | Map Octolis fields to Braze fields; computed fields require the column to exist in Braze first |
| Trigger | Manual, real-time, or scheduled |
| Sync on Create vs Update | **Create:** use for opt-ins (Braze stays master). **Update:** use for mutable fields like first name |

---

### Multi-Key Deduplication

Octolis supports **multi-key deduplication** via a no-code module — useful when reconciling online and offline data. Deduplication logic is configurable per master table/entity.
