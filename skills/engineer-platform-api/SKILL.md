---
name: engineer-platform-api
description: >-
  Implements platform-level endpoints for SDK authentication, SCIM provisioning,
  user data, templates, and media.
metadata:
  role: braze-engineer
  topics:
    - endpoints-sdk-authentication
    - endpoints-scim
    - endpoints-user-data
    - endpoints-templates
    - endpoints-translations
    - endpoints-media-library
    - endpoints-preference-center
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
The skill-development guide emphasizes **progressive disclosure** — keep SKILL.md lean (~1,500–2,000 words) and use imperative form. Since the user asked for no frontmatter, I'll produce just the markdown body, structured so a Claude agent can quickly determine relevance and find actionable guidance.
`─────────────────────────────────────────────────`

```markdown
# Platform API Engineering

## Scope and Purpose

This skill covers the platform-level Braze REST API surface that powers identity management, content
authoring, user data operations, and SDK session authentication. Apply this skill when implementing
or debugging endpoints that operate at the infrastructure layer — not behavioral/engagement APIs like
Campaigns or Canvas, but the underlying primitives those systems depend on.

Platform APIs share a common character: they are lower-level, often synchronous in constraint but
asynchronous in execution, and carry tighter permission requirements than message-delivery endpoints.
Mistakes here propagate broadly (a bad merge is permanent; a bad SCIM update affects dashboard access).

---

## Lens: Platform Infrastructure, Authentication, and Content Management

View every request through three lenses:

1. **Infrastructure** — Does this endpoint mutate durable state (user records, dashboard accounts,
   preference centers)? Apply extra care around idempotency, ordering guarantees, and rollback.

2. **Authentication** — Is the caller a machine (SDK), a human (SCIM), or an API key holder? Each
   authentication surface has distinct permission grants and rate characteristics.

3. **Content management** — Does this endpoint own a content artifact (template, translation, media)?
   Treat it like a file system operation: respect versioning, handle binary/multipart correctly, and
   never assume the artifact is small.

---

## Topics This Skill Synthesizes

| Topic | Core Concern |
|---|---|
| **User Data Endpoints** | `POST /users/merge` — async multi-user merge, 50-merge limit |
| **SDK Authentication Endpoints** | Session token issuance, SDK identification flows |
| **SCIM Provisioning Endpoints** | Dashboard user lifecycle — create, update, delete via SCIM v2 |
| **Preference Center Endpoints** | `PUT /preference_center/v1/{id}` — opt-in/opt-out surface |
| **Templates Endpoints** | Email template CRUD |
| **Translations Endpoints** | Locale-level content variants tied to templates |
| **Media Library Endpoints** | Binary asset upload and retrieval |

---

## User Data Endpoints

### Merge (`POST /users/merge`)

Submit merges in batches of up to 50 per request. Each merge object specifies a `merge_from` and
`merge_to` identifier pair using `external_id`, `user_alias`, or `braze_id`.

**Key behaviors to internalize:**

- Execution is **asynchronous** — the API response confirms receipt, not completion. Never assert
  merge results are visible immediately in subsequent reads.
- Merge order within a batch is **not guaranteed**. For chains (A→B→C), submit as separate requests
  and poll or use event callbacks to confirm completion before the next step.
- Merging transfers custom attributes, events, and purchases to the target user. Profile data on
  `merge_from` is discarded after merge.

**Required permission:** `users.merge`

**Common mistake:** Submitting the same `external_id` as both source and target. Validate that
`merge_from != merge_to` before sending.

---

## SDK Authentication Endpoints

SDK authentication issues short-lived session tokens that identify a device/user pair to the Braze
SDK. This surface is distinct from the REST API key used in server-side calls.

**Implementation pattern:**

1. Receive SDK initialization request from the client application.
2. Issue a token scoped to the app group and user identity.
3. Return the token with its expiry; the SDK handles refresh.

**Permission model:** SDK auth endpoints require the `apps.sdk_auth` permission, which is separate
from general `users.*` write permissions. Scope API keys narrowly — an SDK auth key should not also
have `campaigns.trigger` access.

**Security consideration:** SDK tokens are client-visible. Do not embed long-lived secrets in SDK
auth responses. Treat token expiry as a first-class concern, not an afterthought.

---

## SCIM Provisioning Endpoints

SCIM v2 governs programmatic management of dashboard user accounts. This is the integration surface
for SSO providers and enterprise identity platforms (Okta, Azure AD, etc.).

### Update Dashboard User (`PUT /scim/v2/Users/{id}`)

Updates display name, permissions, and department. **Email address (`userName`) is immutable via
this endpoint** — changes must go through the Braze dashboard directly.

**Request shape:**

```json
{
  "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
  "name": { "givenName": "...", "familyName": "..." },
  "department": "...",
  "permissions": { ... }
}
```

**Operational rules:**

- Always fetch the current resource with `GET /scim/v2/Users/{id}` before issuing a `PUT` — SCIM
  uses full replacement semantics, not partial update. Sending an incomplete body removes fields.
- Use `PATCH` (if available for the endpoint) for targeted field changes. Confirm endpoint support
  in the API reference before assuming PATCH is valid.
- SCIM IDs (`id`) are Braze-internal identifiers, distinct from `external_id`. Store and index both.

**Deprovisioning:** Use `DELETE /scim/v2/Users/{id}` to remove dashboard access. This does not
delete the user's associated end-user data in Braze.

---

## Preference Center Endpoints

Preference centers expose a user-facing opt-in/opt-out UI. The API surface manages the center's
configuration, not individual user subscription states.

### Update Preference Center (`PUT /preference_center/v1/{preferenceCenterExternalID}`)

**Required permission:** `preference_center.update`

**Path parameter:** `preferenceCenterExternalID` — the external identifier set at creation, not the
Braze-internal UUID. These are different values; use the correct one to avoid 404s.

**Design considerations:**

- Preference centers have a `page_html` body that accepts HTML. Sanitize any dynamic content before
  embedding — this HTML is rendered in a browser, making XSS a real risk.
- Changes are effective immediately for new page loads. There is no staging/preview endpoint; test
  in a non-production app group.
- Subscription groups referenced in the preference center must exist before the center is updated.
  Validate group IDs server-side before submitting.

---

## Templates Endpoints

Email templates are reusable content artifacts referenced by Campaigns and Canvas steps.

**CRUD surface:**

| Operation | Endpoint |
|---|---|
| Create | `POST /templates/email/create` |
| Update | `POST /templates/email/update` |
| Info | `GET /templates/email/info` |
| List | `GET /templates/email/list` |

**Implementation patterns:**

- Templates contain Liquid markup. Validate Liquid syntax before saving — malformed templates fail
  silently at send time, not at save time.
- `email_template_id` is the stable identifier for downstream references. Cache this ID after
  creation; the template name is mutable.
- List endpoint supports pagination via `offset` and `count`. Use when building sync tools that
  mirror template state to an external CMS.

---

## Translations Endpoints

Translations attach locale-specific content variants to templates. These endpoints are closely tied
to the Templates surface.

**Operational context:**

- Translations are children of a parent template. Always establish the parent template ID before
  managing translations.
- Locale codes follow IETF BCP 47 format (e.g., `en-US`, `pt-BR`). Reject non-standard locale
  strings before submitting to avoid unrecoverable data states.
- Source documentation for this surface is sparse. When in doubt, test against a sandbox environment
  and inspect responses carefully before implementing production flows.

---

## Media Library Endpoints

The media library stores binary assets (images, fonts, documents) for use in messages.

**Upload pattern:**

- Use `multipart/form-data` encoding for all binary uploads. JSON-encoded endpoints do not accept
  binary content.
- Set `Content-Type` accurately per asset type. Braze validates MIME types and rejects mismatches.
- Assets are referenced by URL after upload. Store returned URLs — there is no list endpoint to
  reconstruct them after the fact.

**Operational note:** Source documentation for media library endpoints is minimal. Treat as a
write-once surface: upload assets, capture the returned URL, and treat URLs as stable references
in downstream template and campaign content.

---

## Cross-Cutting Patterns

### Permission Scoping

Each platform endpoint requires a narrowly scoped permission. Build separate API keys per
integration surface — do not use a single omnibus key across SCIM, SDK auth, and user data
operations.

### Async Operations

`/users/merge` is explicitly asynchronous. Treat any endpoint whose response confirms receipt
(HTTP 200/202 with a job ID or no body) as async until documented otherwise. Design callers with
polling or webhook confirmation rather than assuming immediate consistency.

### Error Handling at Boundaries

Platform APIs return errors in `{"errors": [...]}` arrays, not always as HTTP 4xx. Always check
the response body for an `errors` field even on HTTP 200 responses — partial failures are reported
inline, not via status code.

### Rate Limits

Platform endpoints share rate limits with other REST endpoints. SCIM operations and user merges
are particularly sensitive — batch where possible and implement exponential backoff on 429 responses.
```

`★ Insight ─────────────────────────────────────`
A few structural choices worth noting here:
- The **topic table** near the top acts as a quick-reference index — Claude can scan it to decide if this skill is relevant before reading the full body.
- **SCIM's full-replacement PUT semantics** (fetch before write) is non-obvious and worth calling out explicitly; missing it causes data loss.
- The "Cross-Cutting Patterns" section captures platform-wide gotchas (async semantics, inline error bodies on HTTP 200) that apply across all seven topic areas, avoiding repetition.
`─────────────────────────────────────────────────`
