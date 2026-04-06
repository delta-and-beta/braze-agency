---
name: tester-api-validation
description: >-
  Tests API endpoint behavior for email, SMS, catalog, CDI, and platform
  operations including error cases.
metadata:
  role: braze-tester
  topics:
    - email-post-remove-spam
    - email-post-blocklist
    - email-post-blacklist
    - email-delete-remove-subscription-state
    - catalogs-post-create-catalog
    - catalogs-delete-catalog
    - catalogs-put-update-catalog-item
    - catalogs-post-create-catalog-selections
    - catalogs-delete-catalog-selection
    - cdi-post-job-sync
    - cdi-get-job-sync-status
    - sms-post-remove-invalid-numbers
    - endpoints-sdk-authentication
    - endpoints-scim
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- Nick's topic files feed into skills like this — they're atomic knowledge units that get synthesized up the hierarchy, so the skill body should summarize and contextualize rather than duplicate the raw endpoint details
- The "lens" is the most important differentiator here: two skills could cover the same endpoints but a `braze-tester` skill reads them through a *testing* lens (error paths, auth failures, destructive safety), while a `braze-engineer` skill reads them for *implementation* guidance
`─────────────────────────────────────────────────`

# API Endpoint Validation

This skill guides testing of Braze REST API endpoints across email management, SMS, catalog operations, Cloud Data Ingestion (CDI), SDK authentication, and SCIM provisioning. Apply it when verifying that endpoints behave correctly under valid inputs, malformed requests, missing permissions, and edge cases involving destructive or irreversible operations.

The central lens is **input validation, error response coverage, and destructive operation safety**:

- Validate that required fields are enforced and that the API returns descriptive errors for missing or malformed input
- Confirm error response shapes (status codes, error message keys, rate limit headers) match documented behavior
- Treat destructive and irreversible operations (deletes, blocklist additions, subscription state removal) with special care — verify preconditions before executing and confirm the action cannot silently succeed on a non-existent resource

---

## Scope

This skill synthesizes knowledge from the following endpoint groups:

| Group | Endpoints |
|---|---|
| **Email management** | Remove from spam list, add to blocklist, blacklist (deprecated), delete subscription state |
| **SMS management** | Remove invalid phone numbers |
| **Catalog operations** | Create catalog, create selection, update item, delete selection, delete catalog |
| **CDI** | Trigger job sync, get job sync status |
| **SDK authentication** | Authentication endpoint overview |
| **SCIM provisioning** | Dashboard user management overview |

---

## Testing Approach

### Input Validation Coverage

For every endpoint, construct at least three request variants:

1. **Happy path** — valid required fields, expected response shape
2. **Missing required field** — omit one required parameter; expect a `400` with an `errors` array naming the missing field
3. **Invalid field type** — pass a string where an array is expected, or vice versa; confirm the API rejects with a meaningful message rather than silently coercing

For endpoints that accept arrays (e.g., `email/blocklist`, `sms/invalid_phone_numbers/remove`), test both a single-element array and a batch at or near the documented maximum.

### Error Response Coverage

Braze error responses follow a consistent shape. When testing error cases, assert on:

- HTTP status code (not just "non-200")
- `errors` array presence and content
- `message` field where present
- Rate limit headers (`X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`) on rate-limited endpoints

Permission errors (`403`) deserve explicit test cases — use a credential scoped to a different permission set to confirm that endpoints enforce their documented `Required permission` annotation.

### Destructive Operation Safety

Several endpoints in this skill's scope perform irreversible or hard-to-reverse operations:

| Endpoint | Risk | Precaution |
|---|---|---|
| `POST /email/blocklist` | Hard-bounces and unsubscribes — hard to reverse | Confirm email is a test address; verify unsubscribe status after |
| `DELETE /users/subscription` | Permanently removes subscription state by email or phone | Use synthetic test identifiers only |
| `DELETE /catalogs/{name}/selections/{selection}` | Async deletion — no confirmation step | Verify selection exists before issuing delete; poll for completion |
| `DELETE /catalogs/{name}` | Deletes entire catalog asynchronously | Never run against a catalog shared with production data |
| `POST /email/spam/remove` | Modifies both Braze and the underlying ESP spam list | Validate the email is on the spam list first |

Before executing any destructive test, confirm the target resource exists using a corresponding read or list operation. After execution, verify the expected state change occurred rather than trusting the `200` response alone.

---

## Endpoint Group Notes

### Email Management

**Spam list removal (`POST /email/spam/remove`)** — requires `email.spam.remove` permission. Test with an address that is and is not on the spam list; the second case should clarify whether the endpoint returns an error or silently succeeds.

**Blocklist (`POST /email/blocklist`)** — supersedes the deprecated `/email/blacklist` endpoint (identical functionality, same permission `email.blacklist`). When testing legacy integrations, verify both paths behave identically. Do not use the blacklist endpoint in new test suites — document any usage as deprecated.

**Delete subscription state (`DELETE /users/subscription`)** — accepts `email` or `phone` parameter. Test both identifiers independently. Confirm that passing neither, or passing both, returns a validation error.

### SMS Management

**Remove invalid numbers (`POST /sms/invalid_phone_numbers/remove`)** — test with a number that is on the invalid list, a number that is not, and a malformed number (missing country code, non-numeric characters). Confirm the endpoint handles mixed-validity batches predictably.

### Catalog Operations

Catalog endpoints are predominantly **asynchronous**. After triggering a create, delete, or selection operation, do not assert on the final state immediately — poll the relevant status endpoint or use a short wait before verifying.

Test the create-then-delete cycle to confirm cleanup: create a catalog, verify it appears in the list, delete it, confirm it no longer appears. For selections, test the same lifecycle within a catalog.

**Update catalog item (`PUT /catalogs/{catalog_name}/items/{item_id}`)** is synchronous and performs an upsert. Test both the update path (existing item) and the create path (non-existent `item_id`).

### CDI

**Trigger sync (`POST /cdi/integrations/{integration_id}/sync`)** — requires `cdi.integration_sync` permission. Test with a valid `integration_id` and an invalid one (expect `404`). Since this triggers a real sync, use a sandbox integration.

**Get sync status (`GET /cdi/integrations/{integration_id}/job_sync_status`)** — test pagination parameters, an `integration_id` with no prior syncs, and an invalid ID.

### SDK Authentication and SCIM

These endpoint groups are primarily read-heavy or configuration-oriented. Focus testing on:

- Permission enforcement (correct `403` on under-scoped credentials)
- Response schema completeness (all documented fields present)
- `PUT /scim/v2/Users/{id}` — confirm that attempting to change `userName` (email) returns an appropriate error, as this field is explicitly locked

---

## Reference Files

For detailed endpoint specifications, request/response schemas, and permission tables, consult the skill's `references/` directory:

- **`references/email-endpoints.md`** — spam removal, blocklist, blacklist (deprecated), subscription state deletion
- **`references/sms-endpoints.md`** — invalid number removal
- **`references/catalog-endpoints.md`** — catalog and selection lifecycle, item updates
- **`references/cdi-endpoints.md`** — sync trigger and status
- **`references/platform-endpoints.md`** — SDK authentication overview, SCIM provisioning

---

## Quick Checklist

Before marking an endpoint tested:

- [ ] Happy path returns expected status and response shape
- [ ] Missing required field returns `400` with named error
- [ ] Invalid field type is rejected, not coerced
- [ ] Permission enforcement verified with under-scoped credential
- [ ] Destructive operations executed only against test resources
- [ ] Async operations polled for final state, not assumed from `200`
- [ ] Deprecated endpoints flagged if encountered in test suite

`★ Insight ─────────────────────────────────────`
- The quick checklist pattern is particularly valuable in skill files for a `tester` role — it gives Claude a concrete exit criterion for each endpoint rather than leaving "done" ambiguous
- Separating the "safety precaution" table from the general error-coverage section means a future reader (or Claude instance) can scan destructive risk in O(1) rather than reading prose
`─────────────────────────────────────────────────`
