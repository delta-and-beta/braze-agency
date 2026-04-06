---
name: get-started-b2b-use-cases-account-based-segmentation
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/get_started/b2b_use_cases/account_based_segmentation
indexed_at: '2026-04-05'
keywords:
  - segmentation
  - catalogs
  - account-based
  - SQL
  - events
  - enterprise
  - filtering
  - Salesforce
  - targeting
  - properties
triggers:
  - set up account-based segmentation
  - create B2B account segments
  - catalog segment template
  - filter by enterprise classification
  - join catalog data in segments
---
## Account-Based Segmentation

B2B account-based segmentation works via two approaches depending on your data model setup.

---

## Option 1: Catalogs for Business Objects

### Basic SQL Template (Catalog Segment for Events)

**Path:** Audience > Segment Extensions > Create New Extension > Start with a template > **Catalog segment for events**

The template joins user event data with catalog data to segment users who engage with catalog items.

**Required variables (Variables tab):**

| Variable | Value |
|---|---|
| Catalog | Account Catalog |
| Catalog field | Id |
| Custom event | `account_linked` |
| Custom event property | `account_id` |
| Filter SQL Results — Catalog Field | Classification |
| Filter SQL Results — Value | Enterprise |

---

### Sophisticated SQL Segmentation

**Pattern 1: Two filters in a single catalog**  
Example: Users in the restaurant industry at enterprise-level accounts.

```sql
WITH salesforce_accounts AS (
   SELECT
       ITEM_ID as id,
       MAX(CASE WHEN FIELD_NAME = 'Industry' THEN FIELD_VALUE END) AS Industry,
       MAX(CASE WHEN FIELD_NAME = 'Classification' THEN FIELD_VALUE END) AS Classification
   FROM CATALOGS_ITEMS_SHARED
   WHERE CATALOG_ID = '6655ef5213ea0f00591816e2' -- salesforce_accounts
   GROUP BY ITEM_ID
)
SELECT DISTINCT events.USER_ID
FROM USERS_BEHAVIORS_CUSTOMEVENT_SHARED as events
JOIN salesforce_accounts
  ON TRY_PARSE_JSON(events.properties):account_id::STRING = salesforce_accounts.id
WHERE events.name = 'account_linked'
  AND salesforce_accounts.Industry = 'Restaurants'
  AND salesforce_accounts.Classification = 'Enterprise';
```

**Pattern 2: Filters across two separate catalogs**  
Example: Users at enterprise accounts with an open "Closed Won" opportunity.

```sql
WITH salesforce_accounts AS (
   SELECT
       ITEM_ID as id,
       MAX(CASE WHEN FIELD_NAME = 'Industry' THEN FIELD_VALUE END) AS Industry,
       MAX(CASE WHEN FIELD_NAME = 'Classification' THEN FIELD_VALUE END) AS Classification
   FROM CATALOGS_ITEMS_SHARED
   WHERE CATALOG_ID = '6655ef5213ea0f00591816e2' -- salesforce_accounts
   GROUP BY ITEM_ID
),
salesforce_opportunities AS (
   SELECT
       ITEM_ID as id,
       MAX(CASE WHEN FIELD_NAME = 'Account_ID' THEN FIELD_VALUE END) AS Account_ID,
       MAX(CASE WHEN FIELD_NAME = 'Stage' THEN FIELD_VALUE END) AS Stage
   FROM CATALOGS_ITEMS_SHARED
   WHERE CATALOG_ID = '6655f84a348f0f0059ad0627' -- salesforce_opportunities
   GROUP BY ITEM_ID
)
SELECT DISTINCT events.USER_ID
FROM USERS_BEHAVIORS_CUSTOMEVENT_SHARED as events
JOIN salesforce_accounts
  ON TRY_PARSE_JSON(events.properties):account_id::STRING = salesforce_accounts.id
JOIN salesforce_opportunities
  ON salesforce_accounts.id = salesforce_opportunities.Account_ID
WHERE events.name = 'account_linked'
  AND salesforce_accounts.Industry = 'Restaurants'
  AND salesforce_opportunities.Stage = 'Closed Won';
```

**Key SQL pattern:** `CATALOGS_ITEMS_SHARED` stores catalog data in a long/EAV format (one row per field). Use `MAX(CASE WHEN FIELD_NAME = '...' THEN FIELD_VALUE END)` to pivot into columns. Always filter by `CATALOG_ID` and join on `ITEM_ID`.

---

## Option 2: Connected Sources (CDI Segments)

Use CDI Segment Extensions instead of catalog-based templates. Source table formatting is flexible — use the catalog SQL patterns above as structural inspiration, adapting them to your CDI source schema.

---

## Using Segment Extensions in Targeting

Once a Segment Extension is created, add it directly to targeting criteria in any segment. Layer on additional user-level filters (role, campaign engagement history, demographics) to refine targeting further.
