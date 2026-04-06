---
name: endpoints-scim-put-update-user
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/scim/put_update_existing_user_account
indexed_at: '2026-04-05'
keywords:
  - SCIM
  - Users
  - Permissions
  - Dashboard
  - Provisioning
  - Workspace
  - Department
  - Authentication
  - Team
  - Update
triggers:
  - update user account
  - modify permissions
  - change user permissions
  - update dashboard user
  - manage user provisioning
---
## PUT /scim/v2/Users/{id} — Update Dashboard User Account

Updates an existing Braze dashboard user account. Supports updating names, permissions (company, workspace, team level), and department. **Email (`userName`) cannot be updated via this endpoint** — contact Braze Support for that.

---

### Prerequisites

- Requires a **SCIM token** in the `Authorization` header
- Requires `X-Request-Origin` header set to your service origin
- See [Automated user provisioning](https://www.braze.com/docs/scim/automated_user_provisioning/) for setup

**Rate limit:** 5,000 requests/day (shared across SCIM endpoints)

---

### Path Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `id` | Required | String | User's resource ID, returned by `POST /scim/v2/Users/` or `GET /scim/v2/Users?filter=userName eq "..."` |

---

### Request

```
PUT https://rest.iad-01.braze.com/scim/v2/Users/{id}
Content-Type: application/json
X-Request-Origin: YOUR-REQUEST-ORIGIN-HERE
Authorization: Bearer YOUR-SCIM-TOKEN-HERE
```

#### Body Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `schemas` | Required | Array of strings | Must be `["urn:ietf:params:scim:schemas:core:2.0:User"]` |
| `name` | Required | Object | Contains `givenName` and `familyName` |
| `department` | Required | String | Valid department string (see SCIM API appendix) |
| `permissions` | Required | Object | Company, role, workspace, and team permissions |

#### Permissions Object Structure

```json
"permissions": {
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
                {
                    "teamName": "Test Team",
                    "teamPermissions": ["admin"]
                }
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

---

### Example Request

```bash
curl --location --request PUT 'https://rest.iad-01.braze.com/scim/v2/Users/dfa245b7-24195aec-887bb3ad-602b3340' \
--header 'Content-Type: application/json' \
--header 'X-Request-Origin: YOUR-REQUEST-ORIGIN-HERE' \
--header 'Authorization: Bearer YOUR-SCIM-TOKEN-HERE' \
--data-raw '{
    "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
    "name": {
        "givenName": "Test",
        "familyName": "User"
    },
    "department": "finance",
    "permissions": {
        "companyPermissions": ["manage_company_settings"],
        "roles": [
            { "roleName": "Test Role" },
            { "roleId": "2519dafcdba238ae7" }
        ],
        "appGroup": [
            {
                "appGroupName": "Test Workspace",
                "appGroupPermissions": ["basic_access", "send_campaign_canvases"],
                "team": [
                    {
                        "teamName": "Test Team",
                        "teamPermissions": ["admin"]
                    }
                ]
            }
        ]
    }
}'
```

---

### Success Response (200)

Returns the full updated user object:

```json
{
    "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
    "id": "dfa245b7-24195aec-887bb3ad-602b3340",
    "userName": "user@test.com",
    "name": {
        "givenName": "Test",
        "familyName": "User"
    },
    "department": "finance",
    "lastSignInAt": "Thursday, January 1, 1970 12:00:00 AM",
    "permissions": {
        "companyPermissions": ["manage_company_settings"],
        "roles": [
            {
                "roleName": "Test Role",
                "roleId": "519dafcdba23dfaae7",
                "appGroup": [
                    {
                        "appGroupId": "241adcd25789fabcded",
                        "appGroupName": "Some Workspace",
                        "appGroupPermissions": ["basic_access", "publish_cards"],
                        "team": [
                            {
                                "teamId": "2519dafcdba238ae7",
                                "teamName": "Some Team",
                                "teamPermissions": ["export_user_data"]
                            }
                        ]
                    }
                ]
            }
        ],
        "appGroup": [
            {
                "appGroupId": "241adcd25789fabcded",
                "appGroupName": "Test Workspace",
                "appGroupPermissions": ["basic_access", "send_campaigns_canvases"],
                "team": [
                    {
                        "teamId": "2519dafcdba238ae7",
                        "teamName": "Test Team",
                        "teamPermissions": ["admin"]
                    }
                ]
            }
        ]
    }
}
```

---

### Error Response (404)

```json
{
    "schemas": ["urn:ietf:params:scim:api:messages:2.0:Error"],
    "detail": "User not found",
    "status": 404
}
```

---

### Key Notes

- Roles can be specified by **name** (`roleName`) or **ID** (`roleId`) — both are supported
- Workspace permissions (`appGroup`) and role-scoped permissions are separate structures in the response
- The response includes resolved IDs (e.g., `appGroupId`, `teamId`) even if you specified by name in the request
