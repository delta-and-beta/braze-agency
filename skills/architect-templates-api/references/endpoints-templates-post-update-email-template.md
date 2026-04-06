---
name: endpoints-templates-post-update-email-template
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/templates/email_templates/post_update_email_template
indexed_at: '2026-04-05'
keywords:
  - email
  - template
  - update
  - endpoint
  - subject
  - body
  - preheader
  - tags
  - css
  - validation
triggers:
  - update email template
  - modify template body
  - change subject line
  - add tags to email
  - update preheader
---
## POST /templates/email/update

Updates an existing email template in the Braze dashboard.

**Required permission:** `templates.email.update`
**Rate limit:** Default Braze rate limit

---

### Request

```
POST https://rest.iad-01.braze.com/templates/email/update
Content-Type: application/json
Authorization: Bearer YOUR_REST_API_KEY
```

```json
{
  "email_template_id": "required — find on Templates & Media page or from create endpoint",
  "template_name": "optional string",
  "subject": "optional string",
  "body": "optional string (HTML allowed)",
  "plaintext_body": "optional string",
  "preheader": "optional string",
  "tags": ["optional", "array", "of", "strings"],
  "should_inline_css": true
}
```

Only `email_template_id` is required; at least one other field must be provided.

### Parameters

| Parameter | Required | Type | Notes |
|---|---|---|---|
| `email_template_id` | Yes | String | Template's API identifier |
| `template_name` | No | String | Display name |
| `subject` | No | String | Subject line |
| `body` | No | String | HTML body |
| `plaintext_body` | No | String | Plain text fallback |
| `preheader` | No | String | Preview text shown in email clients |
| `tags` | No | Array of strings | Tags must already exist in Braze |
| `should_inline_css` | No | Boolean | `true`/`false` — overrides AppGroup default |

---

### Example Request

```bash
curl --location --request POST 'https://rest.iad-01.braze.com/templates/email/update' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR_REST_API_KEY' \
--data-raw '{
  "email_template_id": "email_template_id",
  "template_name": "Weekly Newsletter",
  "subject": "This Week'\''s Styles",
  "body": "Check out this week'\''s digital lookbook. https://www.braze.com/",
  "plaintext_body": "Updated text. https://www.braze.com/",
  "preheader": "We want you to have the best looks this summer",
  "tags": ["Tag1", "Tag2"]
}'
```

---

### Errors

| Error | Fix |
|---|---|
| Template name is required | Provide a non-empty `template_name` |
| Tags must be an array | Format as `["tag1", "tag2"]`, not a plain string |
| All tags must be strings | Wrap each tag in quotes inside the array |
| Some tags could not be found | Tags must already exist in Braze before use |
| Invalid value for `should_inline_css` | Pass bare boolean `true`/`false`, not `"true"`/`"false"` (strings rejected) |
