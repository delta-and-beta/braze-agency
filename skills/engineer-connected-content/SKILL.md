---
name: engineer-connected-content
description: >-
  Technical implementation of Connected Content API calls including variable
  handling, retry logic, and external data integration.
metadata:
  role: braze-engineer
  topics:
    - personalization-and-dynamic-content-connected-content
    - personalization-and-dynamic-content-connected-content-making-an-api-call
    - >-
      personalization-and-dynamic-content-connected-content-local-connected-content-variables
    - >-
      personalization-and-dynamic-content-connected-content-connected-content-retries
    - personalization-and-dynamic-content-connected-content-public-apis
    - >-
      personalization-and-dynamic-content-connected-content-user-profile-fields-connected-content
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- The skill-development guide emphasizes **progressive disclosure**: keep SKILL.md lean (~1,500-2,000 words) and push detailed reference material to `references/` subdirectories — exactly matching Nick's two-layer content hierarchy
- Skills are consumed by another Claude instance, so imperative/infinitive form ("To fetch data, use...") is more parseable than second-person prose
- The "lens" requested here maps directly to what plugin-dev calls a skill's **core perspective** — it shapes what to emphasize from each topic
`─────────────────────────────────────────────────`

```markdown
# Connected Content Engineering

Connected Content enables Braze messages to fetch live external data at send time via HTTP GET requests. Use this skill when implementing dynamic message personalization that requires runtime data — pricing, inventory, user scores, external profiles, or any data not stored directly in Braze user profiles.

This skill synthesizes the engineering perspective across six knowledge areas: the Connected Content execution model, API call syntax, local variable scoping, retry mechanics, compatible public APIs, and the pre-declaration requirement for Liquid fields inside API responses.

---

## Scope and Purpose

Apply this skill when the task involves any of the following:

- Writing or debugging a `{% connected_content %}` Liquid tag
- Mapping API response fields to message variables
- Handling failed or slow Connected Content calls with `:retry`
- Integrating a public third-party API (weather, geolocation, sports data, etc.)
- Resolving rendering issues caused by missing user profile field pre-declarations

This skill does **not** cover Content Blocks, Catalogs, or server-side data ingestion — those are separate concerns.

---

## Core Concepts

### Runtime Fetch Model

Connected Content executes at **message send time**, not at composition time. Each eligible recipient triggers an independent HTTP GET to the configured endpoint. This has critical engineering implications:

- Endpoint latency directly affects send throughput
- Responses are not cached across recipients by default
- Failed calls can be retried with `:retry`, but this increases total send time
- The endpoint must handle concurrent requests proportional to audience size

### Call Syntax

```liquid
{% connected_content https://example.com/api/data :save result %}
{{ result.field_name }}
```

The `:save` directive assigns the parsed JSON response to a named local variable. Without `:save`, the response body is rendered inline. Always use `:save` when consuming structured data.

### Variable Scoping

Variables created with `:save` are **local to the message**. They exist only during the render pass for a single recipient and are not persisted anywhere. To expose multiple values from one response, navigate the `result` object directly:

```liquid
{% connected_content https://api.example.com/user/{{ ${user_id} }} :save profile %}
Name: {{ profile.display_name }}
Tier: {{ profile.membership_tier }}
```

### Retry Behavior

Append `:retry` to re-attempt calls that fail due to network errors or non-2xx responses:

```liquid
{% connected_content https://api.example.com/data :save result :retry %}
```

- Up to **5 retries** using exponential backoff
- `:retry` is **not available** for in-app messages
- Total send time increases with each retry attempt — account for this in latency-sensitive campaigns

### User Profile Field Pre-Declaration

When a Connected Content API response itself contains Liquid personalization (e.g., the API returns `"Hello {{ ${first_name} }}"`) those profile attribute references must be **pre-declared in the message body** before the `connected_content` tag. Braze resolves profile attributes in a single pass; fields not yet seen in the template are treated as empty.

```liquid
{{ ${first_name} | default: "" }}
{% connected_content https://api.example.com/personalized :save content %}
{{ content.message }}
```

---

## Topics Synthesized by This Skill

| Topic | Engineering Focus |
|---|---|
| **Connected Content Overview** | Execution model, send-time fetch lifecycle, use-case scoping |
| **Making a Connected Content API Call** | Tag syntax, `:save` usage, inline vs. structured response handling |
| **Local Connected Content Variables** | Variable scoping rules, JSON auto-parsing into `connected` or named vars |
| **Connected Content Retries** | `:retry` semantics, exponential backoff, message type restrictions |
| **Connected Content Public APIs** | Compatible third-party APIs, rate limiting considerations, authentication patterns |
| **User Profile Fields in Connected Content** | Pre-declaration requirement, render-pass ordering, debugging missing field values |

---

## Engineering Lens

Approach Connected Content problems through three lenses:

**API Integration Patterns**
Treat each Connected Content call as a synchronous API integration with no SDK — just a raw HTTP GET. Apply standard integration hygiene: validate endpoint availability, define expected response schema, handle missing or null fields with Liquid defaults (`| default: ""`), and avoid embedding secrets directly in message templates (use server-side proxy endpoints instead).

**Error Handling**
The primary failure modes are: network timeout, non-2xx response, malformed JSON, and missing keys in the response object. Liquid's `default` filter handles missing keys. `:retry` handles transient network failures. For endpoints that may return empty or error payloads, add conditional guards:

```liquid
{% connected_content https://api.example.com/data :save result %}
{% if result.status == "ok" %}
  {{ result.value }}
{% else %}
  {% abort_message %}
{% endif %}
```

Use `{% abort_message %}` to suppress sends when data quality is insufficient rather than delivering broken content.

**Runtime Data Fetching**
Every Connected Content call is a live network request at scale. Design endpoints to be stateless, fast, and horizontally scalable. Prefer GET-only endpoints with simple query parameters over complex payloads. Avoid chaining multiple Connected Content calls in a single message unless necessary — each call adds latency and a new failure surface.

---

## Reference Files

For detailed reference material, consult:

- **`references/connected-content-overview.md`** — Execution lifecycle, use-case examples, limitations
- **`references/api-call-syntax.md`** — Full tag syntax reference, headers, authentication patterns
- **`references/local-variables.md`** — Variable scoping, JSON parsing behavior, multi-call patterns
- **`references/retries.md`** — Retry configuration, backoff timing, message-type restrictions
- **`references/public-apis.md`** — Curated list of compatible public APIs with usage notes
- **`references/user-profile-fields.md`** — Pre-declaration patterns, render-order debugging
```

`★ Insight ─────────────────────────────────────`
- The `{% abort_message %}` pattern is idiomatic Braze — it's a Liquid tag unique to Braze that silently suppresses delivery for a single recipient without failing the send job; worth highlighting because it's non-obvious to engineers coming from general API integration backgrounds
- The pre-declaration requirement for user profile fields is a common footgun: Braze resolves Liquid in a single top-to-bottom pass, so a `{{ ${first_name} }}` buried inside an API response string won't resolve unless it appeared earlier in the template — the skill surfaces this as a first-class concern rather than a footnote
`─────────────────────────────────────────────────`
