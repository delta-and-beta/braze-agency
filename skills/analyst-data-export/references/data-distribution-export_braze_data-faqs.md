---
name: data-distribution-export_braze_data-faqs
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/data/distribution/export_braze_data/faqs
indexed_at: '2026-04-05'
keywords:
  - export
  - S3
  - credentials
  - bucket
  - profiles
  - segment
  - Azure
  - duplication
  - API
  - destination
triggers:
  - how to export user profiles
  - exporting data to S3
  - setting default export destination
  - handling duplicate users in exports
  - configuring S3 credentials
---
## Export FAQs

**S3 Bucket Behavior**

- If S3 credentials are provided to Braze, **all** exports go to your S3 bucket — you cannot selectively route exports.
- If no S3 credentials are provided, all exports go to a Braze-owned S3 bucket.

**"Make this the default data export destination" checkbox**

- Only relevant when you have credentials for **both** S3 and Azure.
- Controls which of the two destinations receives exports.

**Multiple files when exporting user profiles to S3**

- Expected behavior for large workspaces.
- Braze splits exports into multiple files: roughly **1 file per 5,000 users**.
- A small segment inside a large workspace may still produce multiple files.

**Duplicate users when exporting by segment via REST API**

- Rare; caused by the underlying database architecture.
- Duplicates are cleaned out weekly, though most weeks no duplicates are cleared.
