---
name: endpoints-scim-get-search-dashboard-user
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/scim/get_search_existing_dashboard_user
indexed_at: '2026-04-05'
keywords:
  - scim
  - dashboard
  - user
  - search
  - email
  - permissions
  - authentication
  - provisioning
  - workspace
  - endpoint
triggers:
  - search for dashboard user
  - find user by email
  - get user permissions
  - lookup user account
---
## GET Search Dashboard User (SCIM)

Search for an existing dashboard user account by email address.

**Endpoint:** `GET /scim/v2/Users?filter=userName%20eq%20%22{email}%22`

### Prerequisites

- Requires a SCIM token (Bearer auth)
- `X-Request-Origin` header required
- See [Automated user provisioning] for SCIM token setup

### Request

```http
GET /scim/v2/Users?filter=userName%20eq%20%22user@test.com%22
Content-Type: application/json
X-Request-Origin: YOUR-REQUEST-ORIGIN-HERE
Authorization: Bearer YOUR-API-KEY-HERE
```

**Query parameter:** `filter=userName eq "user@example.com"` (URL-encoded)

```bash
curl --location --request GET \
  'https://rest.iad-01.braze.com/scim/v2/Users?filter=userName%20eq%20%22user@test.com%22' \
  --header 'Content-Type: application/json' \
  --header 'X-Request-Origin: YOUR-REQUEST-ORIGIN-HERE' \
  --header 'Authorization: Bearer YOUR-API-KEY-HERE'
```

### Response

Returns a SCIM `ListResponse` with `totalResults` and a `Resources` array.

```json
{
    "schemas": ["urn:ietf:params:scim:api:messages:2.0:ListResponse"],
    "totalResults": 1,
    "Resources": [
        {
            "userName": "user@test.com",
            "id": "dfa245b7-24195aec-887bb3ad-602b3340",
            "name": {
                "givenName": "Test",
                "familyName": "User"
            },
            "department": "finance",
            "lastSignInAt": "Thursday, January 1, 1970 12:00:00 AM",
            "permissions": {
                "companyPermissions": ["manage_company_settings"],
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
    ]
}
```

### Key Response Fields

| Field | Description |
|---|---|
| `userName` | User's email address |
| `id` | Unique SCIM user ID (used in GET/PUT/DELETE by ID) |
| `name` | `givenName` and `familyName` |
| `department` | User's department |
| `lastSignInAt` | Last login timestamp |
| `permissions.companyPermissions` | Company-level permissions array |
| `permissions.appGroup` | Workspace-level permissions with nested team permissions |

### Notes

- Returns `totalResults: 0` with empty `Resources` if no match found
- The returned `id` is used as the path parameter for subsequent SCIM operations (GET by ID, PUT, DELETE)
- Rate limit applies — check current limits in Braze documentation
