---
name: endpoints-scim-delete-dashboard-user
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/scim/delete_existing_dashboard_user
indexed_at: '2026-04-05'
keywords:
  - scim
  - delete
  - users
  - dashboard
  - endpoint
  - api
  - authentication
  - provisioning
  - removal
  - token
triggers:
  - delete dashboard user
  - remove SCIM user
  - delete user via SCIM
  - user deletion endpoint
  - how to delete users
---
## DELETE Dashboard User (SCIM)

**Endpoint:** `DELETE /scim/v2/Users/{id}`

Permanently deletes an existing dashboard user. Equivalent to deleting a user via **Company Users** in the Braze dashboard.

### Prerequisites

- SCIM token (Bearer)
- `X-Request-Origin` header set to your service origin

### Path Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `id` | Yes | String | Resource ID returned by `POST /scim/v2/Users/` or `GET /scim/v2/Users?filter=userName eq "user@test.com"` |

### Request

```bash
curl --location --request DELETE 'https://rest.iad-01.braze.com/scim/v2/Users/dfa245b7-24195aec-887bb3ad-602b3340' \
  --header 'Content-Type: application/json' \
  --header 'X-Request-Origin: YOUR-REQUEST-ORIGIN-HERE' \
  --header 'Authorization: Bearer YOUR-SCIM-TOKEN-HERE'
```

### Responses

**Success:** `204 No Content`

**User not found:**
```http
HTTP/1.1 404 Not Found

{
    "schemas": ["urn:ietf:params:scim:api:messages:2.0:Error"],
    "detail": "User not found",
    "status": 404
}
```

### Notes

- Rate limits apply to this endpoint
- The `id` parameter is the SCIM resource ID, not the user's email or Braze user ID
