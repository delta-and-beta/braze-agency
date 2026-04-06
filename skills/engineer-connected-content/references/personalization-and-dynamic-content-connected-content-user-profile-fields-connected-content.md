---
name: >-
  personalization-and-dynamic-content-connected-content-user-profile-fields-connected-content
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/personalization_and_dynamic_content/connected_content/user_profile_fields_connected_content
indexed_at: '2026-04-05'
keywords:
  - connected
  - liquid
  - personalization
  - rerender
  - escape
  - templating
  - variables
  - fields
  - response
  - predeclaration
triggers:
  - how to use liquid in connected content
  - fixing connected content personalization
  - enabling rerender for liquid responses
  - escaping JSON in connected content responses
  - pre-declaring user profile fields
---
## User Profile Fields in Connected Content

When a Connected Content response contains Liquid personalization tags (user profile fields), those fields must be **pre-declared in the message** before the Connected Content call. Without this, Braze cannot retrieve the needed user attributes before making the request.

### The `:rerender` Flag

Include `:rerender` in the Connected Content tag to enable Liquid rendering of the response. **Limitation:** `:rerender` is only one level deep — nested Connected Content tags or catalog tags in the response will not be re-rendered.

### Why Pre-Declaration Is Required

Braze resolves user profile fields before passing them to Liquid. If a Connected Content response returns `Your language is ${language}`, the `${language}` variable won't be substituted unless `${language}` appears somewhere in the outgoing request.

**Broken — `${language}` never fetched:**
```liquid
Hi ${first_name},
{% connected_content https://examplewebsite.com :rerender %}
```

**Fixed — `${language}` pre-declared in the URL:**
```liquid
Hi ${first_name}, {% connected_content https://examplewebsite.com?language=${language} :rerender %}
```

The Liquid preprocessor sees `${language}` in the request, fetches it from the user profile, and makes it available when templating the response.

### Best Practice: `json_escape` for JSON Responses

When using `:rerender` with JSON-formatted Connected Content responses, apply the `json_escape` filter to any Liquid tag that could contain characters breaking JSON syntax. If JSON parsing fails, the entire response is treated as plain text and no variables are saved.

```liquid
[{
  "message": "{{event_properties.${message} | json_escape}}"
}]
```

### Quick Reference

| Requirement | Details |
|---|---|
| Pre-declare user fields | Any `${field}` used in the CC response must appear in the request body/URL |
| `:rerender` flag | Required for Liquid in CC responses; one level deep only |
| `json_escape` | Apply to Liquid tags inside JSON payloads when using `:rerender` |
