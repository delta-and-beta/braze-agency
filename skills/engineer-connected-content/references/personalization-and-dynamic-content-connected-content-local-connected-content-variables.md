---
name: >-
  personalization-and-dynamic-content-connected-content-local-connected-content-variables
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/personalization_and_dynamic_content/connected_content/local_connected_content_variables
indexed_at: '2026-04-05'
keywords:
  - connected-content
  - POST
  - GET
  - JSON
  - variables
  - endpoints
  - caching
  - HTTP
  - parsing
  - templating
triggers:
  - how to save connected content variables
  - how to make POST requests in messages
  - how to access JSON response fields
  - how to check HTTP status codes
  - how to cache API calls
---
## Local Connected Content Variables

Connected Content makes a GET request at send time to the specified endpoint.

- **JSON response** → auto-parsed into `connected` variable (or named variable with `:save`)
- **Text response** → inserted directly in place of the tag
- Stored variables are **field-scoped**: to use the same variable in multiple fields, repeat the request (Braze uses cached results for identical GET requests)

### Saving to a Named Variable

```liquid
{% connected_content https://api.example.com/data :save myvar %}
```

Access fields with dot notation: `{{myvar.field_name}}` or array indexing: `{{myvar.items[0].name}}`

### Multi-Call Example (Weather)

```liquid
{% connected_content https://api.example.com/search/?query={{custom_attribute.${customCity}}} :save locationjson %}
{% connected_content https://api.example.com/location/{{locationjson[0].woeid}}/ :save localweather %}

{% if {{localweather.consolidated_weather[0].weather_state_name}} == 'Rain' %}
  It's raining! Grab an umbrella!
{% elsif {{localweather.consolidated_weather[0].weather_state_name}} == 'Clouds' %}
  No sunscreen needed :)
{% else %}
  Enjoy the weather!
{% endif %}
```

---

## HTTP POST

Add `:method post` and `:body` to the tag. Use `:content_type application/json` for JSON bodies.

### Inline body (no spaces allowed)

```liquid
{% connected_content https://example.com/api/endpoint :method post :body {"foo":"bar","baz":"{{1|plus:1}}"} :content_type application/json %}
```

### Capture block (spaces allowed)

```liquid
{% capture postbody %}
{"foo": "bar", "baz": "{{ 1 | plus: 1 }}"}
{% endcapture %}
{% connected_content https://example.com/api/endpoint :method post :body {{postbody}} :content_type application/json %}
```

### Assign statement (spaces allowed)

```liquid
{% assign postbody = '{"foo":"bar", "baz": "2"}' %}
{% connected_content https://example.com/api/endpoint :method post :body {{postbody}} :content_type application/json %}
```

> **POST caching**: POST calls do not cache by default. Use `cache_max_age` option if caching is needed.

---

## HTTP Status Codes

Access the response status via `__http_status_code__` key:

```liquid
{% connected_content https://example.com/api/endpoint :save result %}
{% if result.__http_status_code__ != 200 %}
  {% abort_message('Connected Content returned a non-200 status code') %}
{% endif %}
```

**Constraint**: `__http_status_code__` is only auto-added when the endpoint returns a valid JSON **object** with a `2XX` response. Arrays or non-JSON responses will not have this key set.

---

## Key Rules Summary

| Scenario | Behavior |
|---|---|
| JSON response | Auto-parsed; access via dot/bracket notation |
| Text response | Inserted directly into message |
| `:save varname` | Stores response under custom variable name |
| Multiple identical GET requests | Braze uses cached result |
| Multiple identical POST requests | Second request is made (no cache by default) |
| Variable scope | Available only in the field where request was made |

`★ Insight ─────────────────────────────────────`
The original docs mix tutorial narrative with reference material. This reformatting separates the **what** (the rules table) from the **how** (code examples), making it scannable at a glance. The field-scoping constraint is easy to miss in prose form — surfacing it prominently prevents a common developer mistake where a variable works in the message body but not the subject line.
`─────────────────────────────────────────────────`
