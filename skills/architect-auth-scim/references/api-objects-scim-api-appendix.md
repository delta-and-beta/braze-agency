---
name: api-objects-scim-api-appendix
source_url: 'https://braze-inc.github.io/braze-docs/_api/objects_filters/scim_api_appendix'
indexed_at: '2026-04-05'
keywords:
  - SCIM
  - provisioning
  - permissions
  - user
  - workspace
  - roles
  - schema
  - teams
  - granular
  - authentication
triggers:
  - how to provision users with SCIM
  - set up user permissions
  - configure workspace access
  - assign granular permissions
  - manage team permissions
---
# SCIM API Objects and Appendix

## Overview

Braze supports two SCIM API variants for automated user provisioning:

- **Legacy SCIM API** — Role-based permissions using predefined roles
- **Granular SCIM API** — Fine-grained permission assignments per workspace

---

## User Object Schema

The SCIM user object follows RFC 7643. Both API variants share the base structure:

```json
{
  "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
  "id": "string",
  "externalId": "string",
  "userName": "user@example.com",
  "name": {
    "givenName": "First",
    "familyName": "Last"
  },
  "emails": [
    {
      "value": "user@example.com",
      "primary": true
    }
  ],
  "active": true
}
```

---

## Legacy SCIM API

### Extension Schema

Uses the Braze-specific extension namespace:

```
urn:ietf:params:scim:schemas:extension:braze:2.0:User
```

### Permission Object

```json
{
  "schemas": [
    "urn:ietf:params:scim:schemas:core:2.0:User",
    "urn:ietf:params:scim:schemas:extension:braze:2.0:User"
  ],
  "urn:ietf:params:scim:schemas:extension:braze:2.0:User": {
    "permissions": {
      "companyPermissions": ["manage_company_settings"],
      "appGroup": [
        {
          "appGroupName": "Workspace Name",
          "appGroupPermissions": ["basic_access", "send_campaigns_canvases"],
          "team": [
            {
              "teamName": "Team Name",
              "teamPermissions": ["basic_access"]
            }
          ]
        }
      ]
    }
  }
}
```

### Company-Level Permissions

| Permission String | Description |
|---|---|
| `manage_company_settings` | Manage company settings |
| `can_create_workspaces` | Create new workspaces |

### App Group (Workspace) Permissions

| Permission String | Description |
|---|---|
| `basic_access` | Basic dashboard access |
| `send_campaigns_canvases` | Send campaigns and Canvases |
| `publish_cards` | Publish Content Cards |
| `view_user_profile` | View user profiles |
| `import_and_update_user_data` | Import and update user data |
| `export_user_data` | Export user data |
| `view_pii` | View PII fields |
| `manage_dashboard_users` | Manage dashboard users |
| `manage_events_attributes_purchases` | Manage events, attributes, and purchases |
| `manage_tags` | Manage tags |
| `manage_email_settings` | Manage email settings |
| `manage_subscription_groups` | Manage subscription groups |
| `manage_apps` | Manage app settings |
| `manage_teams` | Manage teams |
| `admin` | Admin (all permissions) |

### Team Permissions

| Permission String | Description |
|---|---|
| `basic_access` | Basic team access |
| `send_campaigns_canvases` | Send campaigns and Canvases |
| `publish_cards` | Publish Content Cards |
| `view_user_profile` | View user profiles |
| `import_and_update_user_data` | Import and update user data |
| `export_user_data` | Export user data |

---

## Granular SCIM API

### Extension Schema

```
urn:ietf:params:scim:schemas:extension:braze:2.0:User
```

### Permission Object Structure

Granular permissions use explicit boolean flags instead of string arrays:

```json
{
  "urn:ietf:params:scim:schemas:extension:braze:2.0:User": {
    "permissions": {
      "companyPermissions": {
        "manage_company_settings": true,
        "can_create_workspaces": false
      },
      "appGroup": [
        {
          "appGroupName": "Workspace Name",
          "appGroupPermissions": {
            "basic_access": true,
            "send_campaigns_canvases": true,
            "view_pii": false
          },
          "team": [
            {
              "teamName": "Team Name",
              "teamPermissions": {
                "basic_access": true,
                "send_campaigns_canvases": false
              }
            }
          ]
        }
      ]
    }
  }
}
```

---

## Standard SCIM Responses

### Success — Single User (`200 OK`)

```json
{
  "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
  "id": "user-id-string",
  "userName": "user@example.com",
  "active": true
}
```

### Success — List (`200 OK`)

```json
{
  "schemas": ["urn:ietf:params:scim:schemas:api:2.0:ListResponse"],
  "totalResults": 1,
  "Resources": [ /* user objects */ ]
}
```

### Error Response

```json
{
  "schemas": ["urn:ietf:params:scim:api:messages:2.0:Error"],
  "detail": "User already exists in the database.",
  "status": 409
}
```

### Common Error Codes

| Status | Meaning |
|---|---|
| `400` | Bad request — malformed JSON or missing required field |
| `401` | Unauthorized — invalid or missing API token |
| `403` | Forbidden — insufficient permissions |
| `404` | User not found |
| `409` | Conflict — user already exists |
| `429` | Rate limit exceeded |

---

## Authentication

All requests require a Bearer token in the `Authorization` header:

```
Authorization: Bearer YOUR_SCIM_API_TOKEN
```

The SCIM API token is separate from REST API keys. Generate it in **Settings > Admin Settings > SCIM Provisioning**.

---

## Filtering

Supports SCIM filter syntax for `GET /scim/v2/Users`:

```
GET /scim/v2/Users?filter=userName eq "user@example.com"
```

Supported filter operators: `eq`
