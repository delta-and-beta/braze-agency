---
name: api-objects-user-alias-object
source_url: 'https://braze-inc.github.io/braze-docs/_api/objects_filters/user_alias_object'
indexed_at: '2026-04-05'
keywords:
  - alias
  - user
  - identifier
  - identity
  - reconciliation
  - authentication
  - analytics
  - schema
  - vendor
  - endpoint
triggers:
  - how to track users before login
  - reconcile third-party vendor identifiers
  - set up user aliases
  - map external user IDs to internal users
---
## User Alias Object

An alternative unique user identifier that provides a consistent identity across pre/post-login states and third-party vendor reconciliation.

### Structure

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `alias_name` | string | Yes | The identifier value |
| `alias_label` | string | Yes | The type/category of the alias |

**Constraints:** Users can have multiple aliases with different labels, but only one `alias_name` per `alias_label`.

### Schema

```json
{
  "user_alias": {
    "alias_name": (required, string),
    "alias_label": (required, string)
  }
}
```

### Example

```json
{
  "user_alias": {
    "alias_name": "john_doe_123",
    "alias_label": "email_id"
  },
  "external_id": "user_456"
}
```

### Key Uses

- **Analytics continuity** — track users before and after login
- **Third-party reconciliation** — map vendor identifiers to internal users
- **Multi-system identity** — one user can carry multiple alias labels simultaneously

This object appears as a nested component across many API endpoints.
