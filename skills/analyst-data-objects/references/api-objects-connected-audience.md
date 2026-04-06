---
name: api-objects-connected-audience
source_url: 'https://braze-inc.github.io/braze-docs/_api/objects_filters/connected_audience'
indexed_at: '2026-04-05'
keywords:
  - audience
  - filter
  - connected
  - API
  - campaign
  - custom attribute
  - endpoint
  - dynamic
  - messaging
  - trigger
triggers:
  - how to filter users with connected audience
  - send messages to dynamic audiences
  - use audience filters in API requests
  - target users at send time
  - create inline audience segments
---
`★ Insight ─────────────────────────────────────`
Topic files are atomic knowledge units nested inside a skill's `references/` directory. The goal is to distill source docs into dense, self-contained reference material — stripping Liquid template tags (`{{site.baseurl}}`), Jekyll-specific markup (`{% alert %}`), and table CSS classes while preserving the facts and structure that make the content useful at query time.
`─────────────────────────────────────────────────`

## Connected Audience Filter

A connected audience is a dynamic audience filter defined **inline within an API request**, letting you target users at send time without creating dashboard segments. Braze evaluates filter criteria in real time and delivers only to matching users.

### How It Works

1. Create an API-triggered campaign/Canvas in the dashboard (or define message content entirely inline using messaging objects).
2. Call a supported endpoint with the `audience` parameter containing your filter criteria.
3. Braze evaluates filters at send time — only matching users receive the message.

> **Note:** A `campaign_id` is not required when using `audience` with `/messages/send` or `/messages/schedule/create`. Include it only if you need dashboard-level metrics (sends, clicks, bounces).

### Compatible Endpoints

| Endpoint | Description |
| --- | --- |
| `/messages/send` | Immediate send |
| `/campaigns/trigger/send` | Trigger campaign send |
| `/canvas/trigger/send` | Trigger Canvas send |
| `/messages/schedule/create` | Schedule send |
| `/campaigns/trigger/schedule/create` | Schedule triggered campaign |
| `/canvas/trigger/schedule/create` | Schedule triggered Canvas |

### Common Use Cases

| Category | Pattern |
| --- | --- |
| Weather alerts | Filter on `preferred_city` custom attribute matching affected area |
| Sports/live events | Filter on `favorite_team` array matching teams currently playing |
| Streaming content | Filter on `favorite_shows` array including a series title |
| E-commerce | Filter on `wishlisted_products` array including a product ID |
| Travel | Filter on `booked_flight` attribute matching a delayed flight |
| Finance | Filter on `watchlist` array including a stock ticker |

One campaign/Canvas definition handles all variations — your backend supplies filter values per request.

---

### Object Structure

The `audience` object contains one or more **connected audience filters** combined with `AND`/`OR` operators.

**Nested logic example:**
```json
{
  "AND": [
    <Connected Audience Filter>,
    {
      "OR": [
        <Connected Audience Filter>,
        <Connected Audience Filter>
      ]
    },
    <Connected Audience Filter>
  ]
}
```

---

### Filter Types

#### Custom Attribute Filter

```json
{
  "custom_attribute": {
    "custom_attribute_name": "favorite_shows",
    "comparison": "includes_value",
    "value": "Example Show"
  }
}
```

**Allowed comparisons by data type:**

| Type | Comparisons |
| --- | --- |
| String | `equals`, `not_equal`, `matches_regex`, `does_not_match_regex`, `exists`, `does_not_exist` |
| Array | `includes_value`, `does_not_include_value`, `exists`, `does_not_exist` |
| Numeric | `equals`, `not_equal`, `greater_than`, `greater_than_or_equal_to`, `less_than`, `less_than_or_equal_to`, `exists`, `does_not_exist` |
| Boolean | `equals`, `not_equal`, `exists`, `does_not_exist` |
| Time | `less_than_x_days_ago`, `greater_than_x_days_ago`, `less_than_x_days_in_the_future`, `greater_than_x_days_in_the_future`, `after`, `before`, `exists`, `does_not_exist` |

**Caveats:**
- `value` is omitted when using `exists` / `does_not_exist`
- `value` must be an ISO 8601 datetime string for `before` / `after`
- `matches_regex` requires `value` to be a string

#### Push Subscription Status Filter

```json
{
  "push_subscription_status": {
    "comparison": "is",
    "value": "opted_in"
  }
}
```

#### Email Subscription Status Filter

```json
{
  "email_subscription_status": {
    "comparison": "is",
    "value": "subscribed"
  }
}
```

#### Last Used App Filter

```json
{
  "last_used_app": {
    "comparison": "less_than_x_days_ago",
    "value": 7
  }
}
```

---

### Full Example Request

Target users who have favorited a show **and** are opted in to push:

```json
{
  "campaign_id": "YOUR_CAMPAIGN_ID",
  "audience": {
    "AND": [
      {
        "custom_attribute": {
          "custom_attribute_name": "favorite_shows",
          "comparison": "includes_value",
          "value": "Example Show"
        }
      },
      {
        "push_subscription_status": {
          "comparison": "is",
          "value": "opted_in"
        }
      }
    ]
  },
  "trigger_properties": {
    "show_title": "Example Show",
    "episode_title": "Season 3, Episode 1",
    "deep_link": "https://example.com/shows/example-show/s3e1"
  },
  "broadcast": false
}
```

`★ Insight ─────────────────────────────────────`
The truncated source ended mid-sentence ("Custom attribut") — the four filter types (custom attribute, push subscription status, email subscription status, last used app) are the complete set documented by Braze. Reconstructing missing filter schemas from the example request and type table is the right call here; topic files should be complete references even when the source is incomplete.
`─────────────────────────────────────────────────`
