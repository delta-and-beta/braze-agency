---
name: data-unification-user_data-import_users
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/data/unification/user_data/import_users
indexed_at: '2026-04-05'
keywords:
  - import
  - users
  - data
  - CSV
  - API
  - events
  - attributes
  - sync
  - upload
  - S3
triggers:
  - import user data
  - bulk user import
  - real-time user tracking
  - sync from data warehouse
  - CSV file upload
---
## Import Users

Braze supports multiple methods for importing and maintaining user data.

### HTML Validation Warning

Braze does **not** sanitize, validate, or reformat HTML during import. Remove all script tags from import data used for web personalization. Use the `strip_html` Liquid filter to escape HTML at render time:

```liquid
{{ "Have <em>you</em> read <strong>Ulysses</strong>?" | strip_html }}
// Output: Have you read Ulysses?
```

### Import Methods

| Method | Best For | File Size Limit |
|---|---|---|
| CSV Import | Bulk user attribute updates | 500 MB (attributes), 50 MB (events) |
| Lambda S3 CSV | Serverless bulk uploads via S3 bucket | ~1M rows in ~5 min |
| REST API `/users/track` | Real-time event/attribute/purchase recording | — |
| Cloud Data Ingestion | Ongoing sync from data warehouse | — |

### CSV Import

Supports three data types:

- **Default Attributes** — Reserved Braze fields (`first_name`, `email`, etc.)
- **Custom Attributes** — Business-specific user fields (`last_destination_searched`)
- **Custom Events** — Business-specific user actions (`trip_booked`)

### Lambda S3 CSV Import

Serverless solution: drop CSVs into an S3 bucket, scripts automatically upload via the Braze API. Suitable for large one-time or scheduled bulk loads.

### REST API

Use `POST /users/track` to record:
- Custom events
- User attributes
- Purchases

Suitable for real-time or programmatic updates.

### Cloud Data Ingestion (CDI)

Preferred method for continuous sync from cloud data warehouses. Maintains user attributes on an ongoing basis without manual uploads.
