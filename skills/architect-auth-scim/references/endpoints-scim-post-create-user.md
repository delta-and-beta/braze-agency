---
name: endpoints-scim-post-create-user
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/scim/post_create_user_account
indexed_at: '2026-04-05'
keywords:
  - scim
  - users
  - authentication
  - permissions
  - provisioning
  - dashboard
  - roles
  - workspaces
triggers:
  - create user account
  - provision dashboard user
  - set user permissions
  - assign roles and workspaces
  - manage user access
---
## POST /scim/v2/Users — Create Dashboard User Account

Creates a new Braze dashboard user account via SCIM 2.0.

**Auth:** Requires SCIM token (`Authorization: Bearer YOUR-SCIM-TOKEN`) + `X-Request-Origin` header.

---

### Request

```
POST https://rest.iad-01.braze.com/scim/v2/Users
Content-Type: application/json
X-Request-Origin: YOUR-REQUEST-ORIGIN-HERE
Authorization: Bearer YOUR-SCIM-TOKEN-KEY
```

**Body parameters:**

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `schemas` | Yes | Array of strings | Must be `["urn:ietf:params:scim:schemas:core:2.0:User"]` |
| `userName` | Yes | String | User's email address |
| `name` | Yes | Object | `{ givenName, familyName }` |
| `department` | Yes | String | Valid department string (see appendix) |
| `permissions` | No | Object | Company, workspace, team, and role permissions |

**Permissions object structure:**
- `companyPermissions` — array of company-level permission strings (e.g., `"manage_company_settings"`)
- `roles` — array of role references by `roleName` or `roleId`
- `appGroup` — array of workspace objects, each with:
  - `appGroupName` — workspace name
  - `appGroupPermissions` — direct permission strings (e.g., `"basic_access"`, `"send_campaigns_canvases"`)
  - `appGroupPermissionSets` — named permission set objects (alternative to direct permissions)
  - `team` — array of team objects with `teamName` and `teamPermissions`

---

### Example Request

```bash
curl --location --request POST 'https://rest.iad-01.braze.com/scim/v2/Users' \
--header 'Content-Type: application/json' \
--header 'X-Request-Origin: YOUR-REQUEST-ORIGIN-HERE' \
--header 'Authorization: Bearer YOUR-SCIM-TOKEN-HERE' \
--data-raw '{
    "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
    "userName": "user@test.com",
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
                "appGroupPermissions": ["basic_access","send_campaigns_canvases"],
                "team": [
                    {
                        "teamName": "Test Team",
                        "teamPermissions": ["basic_access","export_user_data"]
                    }
                ]
            }
        ]
    }
}'
```

---

### Response (200 OK)

Returns the created user object with Braze-generated `id` and resolved role/workspace details:

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
        "roles": [ ... ],
        "appGroup": [ ... ]
    }
}
```

**Response fields:**

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Braze-generated user ID (used for GET/PATCH/DELETE operations) |
| `userName` | String | Email address |
| `lastSignInAt` | String | Last successful sign-on (UTC) |
| `schemas` | Array | SCIM schema identifier |
| `permissions` | Object | Full resolved permissions including role-inherited workspace access |

---

### Error: User Already Exists (409)

```http
HTTP/1.1 409 Conflict
Content-Type: text/json;charset=UTF-8

{
  "schemas": ["urn:ietf:params:scim:api:messages:2.0:Error"],
  "detail": "User already exists in the database.",
  "status": 409
}
```

Triggers when `userName` (email) already exists in Braze.

---

### Key Notes

- Roles can be referenced by **either** `roleName` or `roleId` — both are valid
- `appGroup` permissions can use **either** direct `appGroupPermissions` strings **or** named `appGroupPermissionSets` (not both on the same workspace entry)
- The response `permissions` object reflects the **resolved** effective permissions, which may differ from the request if roles contribute additional workspace access
- Rate limits apply — see Braze rate limit documentation for `create dashboard user` endpoint
