---
name: endpoints-scim-get-user-info
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/scim/get_see_user_account_information
indexed_at: '2026-04-05'
keywords:
  - SCIM
  - authentication
  - permissions
  - endpoint
  - provisioning
  - token
  - user
  - REST
  - account
  - dashboard
triggers:
  - retrieve user account information
  - get SCIM user by ID
  - fetch user permissions
  - lookup user details
  - query dashboard user
---
## GET SCIM User Account — `/scim/v2/Users/{id}`

Retrieve an existing dashboard user account by its SCIM resource ID.

### Authentication

```http
Content-Type: application/json
X-Request-Origin: YOUR-REQUEST-ORIGIN-HERE
Authorization: Bearer YOUR-REST-API-KEY
```

Requires a SCIM token. The `X-Request-Origin` header must match your service origin. See [Automated user provisioning] for setup.

### Path Parameters

| Parameter | Required | Type | Description |
|---|---|---|---|
| `id` | Yes | String | Resource ID returned by `POST /scim/v2/Users/` or `GET /scim/v2/Users?filter=userName eq "..."` |

### Example Request

```bash
curl --location --request GET 'https://rest.iad-01.braze.com/scim/v2/Users/dfa245b7-24195aec-887bb3ad-602b3340' \
--header 'Content-Type: application/json' \
--header 'X-Request-Origin: YOUR-REQUEST-ORIGIN-HERE' \
--header 'Authorization: Bearer YOUR-API-KEY-HERE'
```

### Response

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
    "createdAt": "Thursday, January 1, 1970 12:00:00 AM",
    "permissions": {
        "companyPermissions": ["manage_company_settings"],
        "roles": [
            {
                "roleName": "Another Test Role",
                "roleId": "23125dad23dfaae7",
                "appGroup": [
                    {
                        "appGroupId": "241adcd25adfabcded",
                        "appGroupName": "Production Workspace",
                        "appGroupPermissionSets": [
                            {
                                "appGroupPermissionSetName": "A Permission Set",
                                "appGroupPermissionSetId": "dfa385109bc38",
                                "permissions": ["basic_access", "publish_cards"]
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
                        "teamId": "241adcd25789fabcded",
                        "teamName": "Test Team",
                        "teamPermissions": ["admin"]
                    }
                ]
            }
        ]
    }
}
```

### Response Fields

| Field | Description |
|---|---|
| `id` | SCIM resource ID |
| `userName` | User's email address |
| `name` | Object with `givenName` and `familyName` |
| `department` | User's department |
| `lastSignInAt` | Timestamp of last login |
| `createdAt` | Timestamp of account creation |
| `permissions.companyPermissions` | Array of company-level permission strings |
| `permissions.roles` | Named roles with associated workspace permission sets |
| `permissions.appGroup` | Direct workspace permissions and team assignments |

### Notes

- The `id` path parameter is obtained from `POST /scim/v2/Users/` (on creation) or from a filtered `GET` search by `userName`.
- Permissions can come from **roles** (which include permission sets scoped to workspaces) or **direct app group permissions** with optional team-level overrides.
