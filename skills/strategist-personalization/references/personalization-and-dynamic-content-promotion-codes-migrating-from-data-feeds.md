---
name: personalization-and-dynamic-content-promotion-codes-migrating-from-data-feeds
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/personalization_and_dynamic_content/promotion_codes/migrating_from_data_feeds
indexed_at: '2026-04-05'
keywords:
  - promotion
  - codes
  - migration
  - feeds
  - CSV
  - expiration
  - deprecation
  - lists
triggers:
  - how to migrate promotion codes
  - migrating from data feeds
  - create promotion code list
  - upload CSV codes
  - update message references
---
## Migrating Promotion Codes from Data Feeds

Data Feeds is deprecated. Migrate to promotion code lists — they offer additional capabilities not available in Data Feeds.

### Feature Comparison

| Feature | Promotion Codes | Data Feeds |
|---|---|---|
| Descriptions | Yes | No |
| Expiration Dates | Yes | No |
| Creation Method | CSV upload | Pasting text |

### Migration Steps

1. Go to **Data Settings** → **Create Promotion Code List**
2. Configure the promotion code list (upload CSV with your codes)
3. Update all messages that previously referenced the Data Feed to reference the new promotion code list instead

### Key Differences to Note

- Promotion code lists require a **CSV file upload** rather than pasting text directly
- You can now add **descriptions** and **expiration dates** to your promotion codes — populate these fields during setup if needed
- Message references must be manually updated after creating the list; there is no automatic migration of existing message references
