---
name: endpoints-templates-get-email-template-info
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/templates/email_templates/get_see_email_template_information
indexed_at: '2026-04-05'
keywords:
  - template
  - email
  - endpoint
  - retrieve
  - identifier
  - API
  - HTML
  - metadata
  - CSS
  - preheader
triggers:
  - retrieve email template information
  - get template details by ID
  - fetch template metadata
  - find email template endpoint
  - query template info
---
## GET Email Template Information

Retrieve details about a specific email template by its API identifier.

**Endpoint:** `GET /templates/email/info`

> Note: Templates built with the drag-and-drop email editor are not supported by this endpoint.

### Prerequisites

- API key with `templates.email.info` permission
- Rate limit: default endpoint limits apply

### Request Parameters

| Parameter | Required | Type | Description |
|---|---|---|---|
| `email_template_id` | Required | String | The email template API identifier |

### Example Request

```bash
curl --location -g --request GET \
  'https://rest.iad-01.braze.com/templates/email/info?email_template_id={{email_template_id}}' \
  --header 'Authorization: Bearer YOUR_REST_API_KEY'
```

### Response

```json
{
  "email_template_id": "(string) API Identifier",
  "template_name": "(string) Template name",
  "description": "(string) Template description",
  "subject": "(string) Subject line",
  "preheader": "(optional, string) Preview text shown in some email clients",
  "body": "(optional, string) Template body, may include HTML",
  "plaintext_body": "(optional, string) Plaintext version of the body",
  "should_inline_css": "(optional, boolean) Whether CSS is inlined — defaults to workspace setting",
  "tags": "(string) Tag names",
  "created_at": "(string) ISO 8601 creation timestamp",
  "updated_at": "(string) ISO 8601 last-updated timestamp"
}
```

Images in the response appear as HTML within the `body` field.

---

`★ Insight ─────────────────────────────────────`
- The original uses Jekyll liquid tags (`{% api %}`, `{% apiref %}`, `{% alert %}`) — these are stripped since they're build-time rendering directives, not content
- `{{site.baseurl}}` interpolations are removed since they resolve to navigation URLs irrelevant in a standalone reference file
- The `should_inline_css` field is worth preserving with its default-behavior note — that's non-obvious behavior that would affect rendered output
`─────────────────────────────────────────────────`
