---
name: endpoints-scim
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/scim/put_update_existing_user_account
indexed_at: '2026-04-05'
keywords:
  - scim
  - users
  - endpoint
  - permissions
  - authentication
  - roles
  - department
  - dashboard
  - provisioning
  - workspaces
triggers:
  - update user account
  - modify user permissions
  - configure scim authentication
  - manage user roles and access
  - set user department
---
## Update Dashboard User Account — `PUT /scim/v2/Users/{id}`

Updates an existing dashboard user's name, permissions, and department. **Email (`userName`) cannot be changed via this endpoint** — contact Support for that.

### Authentication

```
Content-Type: application/json
X-Request-Origin: YOUR-REQUEST-ORIGIN-HERE
Authorization: Bearer YOUR-SCIM-TOKEN-KEY
```

Requires a SCIM token. See automated user provisioning docs for setup.

### Path Parameter

| Parameter | Type | Description |
|---|---|---|
| `id` | String | Resource ID returned by `POST /scim/v2/Users/` or `GET /scim/v2/Users?filter=userName eq "user@test.com"` |

### Request Body Parameters

| Parameter | Required | Type | Description |
|---|---|---|---|
| `schemas` | Yes | Array of strings | Must be `["urn:ietf:params:scim:schemas:core:2.0:User"]` |
| `name` | Yes | Object | `{ "givenName": "...", "familyName": "..." }` |
| `department` | Yes | String | Valid department string (see appendix) |
| `permissions` | Yes | Object | Company, role, workspace, and team permissions |

### Permissions Object Structure

```json
{
  "companyPermissions": ["manage_company_settings"],
  "roles": [
    { "roleName": "Test Role" },
    { "roleId": "2519dafcdba238ae7" }
  ],
  "appGroup": [
    {
      "appGroupName": "Test Workspace",
      "appGroupPermissions": ["basic_access", "send_campaigns_canvases"],
      "team": [
        { "teamName": "Test Team", "teamPermissions": ["admin"] }
      ]
    },
    {
      "appGroupName": "Other Test Workspace",
      "appGroupPermissionSets": [
        { "appGroupPermissionSetName": "Test Permission Set" }
      ]
    }
  ]
}
```

Roles can be specified by `roleName` or `roleId`. Workspaces support either explicit `appGroupPermissions` or `appGroupPermissionSets`.

### Example Request

```bash
curl --location --request PUT 'https://rest.iad-01.braze.com/scim/v2/Users/dfa245b7-24195aec-887bb3ad-602b3340' \
--header 'Content-Type: application/json' \
--header 'X-Request-Origin: YOUR-REQUEST-ORIGIN-HERE' \
--header 'Authorization: Bearer YOUR-SCIM-TOKEN-HERE' \
--data-raw '{
    "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
    "name": { "givenName": "Test", "familyName": "User" },
    "department": "finance",
    "permissions": {
        "companyPermissions": ["manage_company_settings"],
        "roles": [{ "roleName": "Test Role" }],
        "appGroup": [{
            "appGroupName": "Test Workspace",
            "appGroupPermissions": ["basic_access", "send_campaign_canvases"],
            "team": [{ "teamName": "Test Team", "teamPermissions": ["admin"] }]
        }]
    }
}'
```

### Success Response (200)

Returns the full updated user object including resolved role IDs, workspace IDs, and team IDs:

```json
{
    "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
    "id": "dfa245b7-24195aec-887bb3ad-602b3340",
    "userName": "user@test.com",
    "name": { "givenName": "Test", "familyName": "User" },
    "department": "finance",
    "lastSignInAt": "Thursday, January 1, 1970 12:00:00 AM",
    "permissions": {
        "companyPermissions": ["manage_company_settings"],
        "roles": [...],
        "appGroup": [...]
    }
}
```

### Error Response

**404 — User not found:**
```json
{
    "schemas": ["urn:ietf:params:scim:api:messages:2.0:Error"],
    "detail": "User not found",
    "status": 404
}
```
