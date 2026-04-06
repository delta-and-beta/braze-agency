---
name: get-started-b2b-use-cases-b2b-data-models
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/get_started/b2b_use_cases/b2b_data_models
indexed_at: '2026-04-05'
keywords:
  - b2b
  - catalogs
  - crm
  - objects
  - profiles
  - accounts
  - opportunities
  - segmentation
  - identifiers
  - warehouse
triggers:
  - set up b2b data models
  - map crm objects to braze
  - create business objects
  - relate accounts to user profiles
  - sync catalog data from crm
---
No additional skills apply to this documentation processing task. Here's the condensed topic file:

---

# B2B Data Models in Braze

## Core Object Mapping

Braze consolidates the four standard B2B CRM objects into two:

| Standard B2B Object | Braze Equivalent |
|---|---|
| Leads, Contacts | **User profiles** |
| Accounts, Opportunities | **Business objects** |

**User profiles** map to leads/contacts. Leads captured in Braze auto-create as leads in your CRM; when converted to contacts, the contact IDs sync back to Braze.

**Business objects** map to non-user CRM records (accounts, opportunities, etc.).

---

## Step 1: Create Business Objects in Braze

Two methods to store account/opportunity data:

### Option A: Catalogs
- Data tables hosted **inside Braze**
- Duplicates CRM data into Braze for segmentation/personalization
- Update via [Catalogs API](https://www.braze.com/docs/api/endpoints/catalogs/) or [CDI catalog sync](https://www.braze.com/docs/user_guide/data/cloud_ingestion/sync_catalogs_data/)
- **Critical:** `id` field in catalog must match `id` in your CRM

**Account catalog — example Salesforce field mapping:**

| Braze Field | Salesforce Object | Salesforce Field |
|---|---|---|
| `id` | account | `id` |
| `AccountName` | account | Account Name |
| `Type` | account | Type |

**Opportunity catalog — example Salesforce field mapping:**

| Braze Field | Salesforce Object | Salesforce Field |
|---|---|---|
| `id` | opportunity | `id` |
| `OpportunityName` | opportunity | Opportunity Name |
| `Territory` | opportunity | Territory |

### Option B: Connected Sources
- Data stays in **your data warehouse** (zero-copy)
- Braze queries warehouse directly via [CDI Segment Extensions](https://www.braze.com/docs/user_guide/engagement_tools/segments/segment_extension/cdi_segments/)
- No duplication; warehouse is source of truth
- Setup: see [Integrating connected sources](https://www.braze.com/docs/user_guide/data_and_analytics/cloud_ingestion/connected_sources#integrating-connected-sources)

**When to use which:**
- **Catalogs** — simpler setup, good for most cases
- **Connected sources** — preferred when data warehouse is already the CRM sync target and you want to avoid duplication

---

## Step 2: Relate Business Objects to User Profiles

User profiles hold default SDK data plus custom attributes, events, and purchases.

### Step 2.1: Map CRM IDs to Braze User Profiles

Establish a shared identifier between Braze and your CRM. Map your CRM's lead/contact IDs onto the Braze user object so records stay linked across systems.

---

`★ Insight ─────────────────────────────────────`
- The **catalogs vs. connected sources** decision is a classic "copy vs. reference" architecture trade-off: catalogs trade storage duplication for simpler Braze-native query access, while connected sources maintain a single source of truth at the cost of requiring a data warehouse setup.
- The `id` field alignment between Braze catalogs and CRM systems is the **join key** for the entire data model — getting this wrong breaks all account-based segmentation downstream.
- Nick's pipeline would generate this as an atomic topic reference inside a skill like `braze:engineer`'s B2B data skill, making it independently queryable via semantic search without needing surrounding context.
`─────────────────────────────────────────────────`
