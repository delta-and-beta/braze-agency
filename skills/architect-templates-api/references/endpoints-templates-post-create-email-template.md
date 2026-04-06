---
name: endpoints-templates-post-create-email-template
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/templates/email_templates/post_create_email_template
indexed_at: '2026-04-05'
keywords:
  - email
  - template
  - create
  - tags
  - subject
  - body
  - HTML
  - preheader
  - CSS
  - REST
triggers:
  - create email template
  - how to create email template
  - email template creation
  - new email template
  - POST template create
---
## POST /templates/email/create

Creates an email template in the Braze dashboard. Returns an `email_template_id` usable in subsequent update calls.

**Permission required:** `templates.email.create`
**Rate limit:** Default Braze rate limit

---

### Request

```
POST https://rest.iad-01.braze.com/templates/email/create
Content-Type: application/json
Authorization: Bearer YOUR_REST_API_KEY
```

### Parameters

| Parameter | Required | Type | Notes |
|---|---|---|---|
| `template_name` | Required | String | Name of the template |
| `subject` | Required | String | Subject line |
| `body` | Required | String | HTML body, up to 400 KB |
| `plaintext_body` | Optional | String | Plaintext fallback |
| `preheader` | Optional | String | Preview text shown in email clients |
| `tags` | Optional | String[] | Tags must already exist in Braze |
| `should_inline_css` | Optional | Boolean | Overrides app group default for CSS inlining |

---

### Example Request

```bash
curl --location --request POST 'https://rest.iad-01.braze.com/templates/email/create' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR_REST_API_KEY' \
--data-raw '{
  "template_name": "email_template_name",
  "subject": "Welcome to my email template!",
  "body": "This is the text within my email body and https://www.braze.com/ here is a link to Braze.com.",
  "plaintext_body": "This is the text within my email body and here is a link to https://www.braze.com/.",
  "preheader": "My preheader is pretty cool.",
  "tags": ["Tag1", "Tag2"]
}'
```

### Response

```json
{
  "email_template_id": "232b6d29-7e41-4106-a0ab-1c4fe915d701",
  "message": "success"
}
```

---

### Common Errors

| Error | Fix |
|---|---|
| Template name is required | `template_name` field is missing |
| Tags must be an array | Format as `["tag1", "tag2"]`, not a plain string |
| All tags must be strings | Tags must be quoted strings inside the array |
| Some tags could not be found | Tags must exist in Braze before use — create them first |
| Email must have valid Content Block names | Referenced Content Blocks don't exist in this environment |
| Invalid value for `should_inline_css` | Pass bare boolean `true`/`false`, not `"true"`/`"false"` (string) |
