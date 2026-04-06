---
name: endpoints-templates-get-list-email-templates
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/templates/email_templates/get_list_email_templates
indexed_at: '2026-04-05'
keywords:
  - templates
  - email
  - list
  - retrieve
  - pagination
  - API
  - filtering
  - parameters
triggers:
  - list email templates
  - retrieve email templates
  - get template list
  - filter templates by date
  - paginate through templates
---
## GET /templates/email/list

Retrieves a list of available email templates in your Braze account.

**Note:** Templates built with the drag-and-drop email editor are **not** included in the response.

### Authentication

API key with `templates.email.list` permission required.

### Rate Limit

Default rate limit applies.

### Request Parameters

| Parameter | Required | Type | Description |
|---|---|---|---|
| `modified_after` | Optional | ISO-8601 string | Only return templates updated at or after this time |
| `modified_before` | Optional | ISO-8601 string | Only return templates updated at or before this time |
| `limit` | Optional | Positive integer | Max templates to return. Default: 100, max: 1000 |
| `offset` | Optional | Positive integer | Number of templates to skip |

### Example Request

```bash
curl --location --request GET \
  'https://rest.iad-01.braze.com/templates/email/list?modified_after=2020-01-01T01:01:01.000000&modified_before=2020-02-01T01:01:01.000000&limit=1&offset=0' \
  --header 'Authorization: Bearer YOUR_REST_API_KEY'
```

### Response

```json
{
  "count": 1,
  "templates": [
    {
      "email_template_id": "(string) API identifier for the template",
      "template_name": "(string) name of the email template",
      "created_at": "(string) creation time in ISO 8601",
      "updated_at": "(string) last updated time in ISO 8601",
      "tags": ["(array of strings) tags appended to template"]
    }
  ]
}
```
