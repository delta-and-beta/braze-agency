---
name: endpoints-user-data-post-user-track
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/user_data/post_user_track_synchronous
indexed_at: '2026-04-05'
keywords:
  - sync
  - track
  - attributes
  - events
  - purchases
  - user
  - profile
  - endpoint
  - synchronous
  - response
triggers:
  - update user attributes synchronously
  - track custom events with response
  - record purchases in real time
  - sync user profile changes
  - create users with immediate response
---
## POST /users/track/sync — Create and Update Users (Synchronous)

Synchronously records custom events, purchases, and user profile attribute updates. Unlike `/users/track` (async, returns `201` on receipt), this endpoint returns `201` only after the operation **completes**, and includes the updated profile fields in the response.

**Status:** Limited beta — contact your Braze account manager to join.

## Key Differences from /users/track

| Aspect | /users/track | /users/track/sync |
|--------|-------------|-------------------|
| Execution | Asynchronous | Synchronous |
| Rate limit | Higher | 500 req/min |
| Objects per request | Multiple | One (event, attribute, **or** purchase) |
| Response | Acknowledgement only | Updated profile fields returned |

Use both together: use `/users/track/sync` when ordering matters (sequential requests for the same user), and `/users/track` for high-throughput bulk updates.

## Authentication

API key with `users.track.sync` permission. Server-to-server callers behind a firewall must allowlist `rest.iad-01.braze.com`.

## Rate Limit

500 requests/minute. One object per request (one event, one attribute object, or one purchase).

## Request

```
POST https://rest.iad-01.braze.com/users/track/sync
Content-Type: application/json
Authorization: Bearer YOUR_REST_API_KEY
```

```json
{
  "attributes": (optional, one attributes object),
  "events":     (optional, one event object),
  "purchases":  (optional, one purchase object)
}
```

Each object must include one of: `external_id`, `user_alias`, `braze_id`, `email`, or `phone`.

## Response Formats

**Success (`201`):**
```json
{
  "users": [
    {
      "custom_attributes": { ... },
      "custom_events": { ... },
      "purchase_events": { ... }
    }
  ],
  "message": "success"
}
```
Response reflects only the attributes/events/purchases included in the request. Empty `users` array if no user found and `_update_existing_only` is `true`.

**Fatal error:**
```json
{
  "message": "<fatal error message>",
  "errors": [{ "<fatal error message>" }]
}
```

## Examples

### Update custom attributes (by external_id)

```bash
curl --request POST 'https://rest.iad-01.braze.com/users/track/sync' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer YOUR_REST_API_KEY' \
  --data-raw '{
    "attributes": [{
      "external_id": "xyz123",
      "string_attribute": "fruit",
      "boolean_attribute_1": true,
      "integer_attribute": 25,
      "array_attribute": ["banana", "apple"]
    }]
  }'
```

Response:
```json
{
  "users": [{
    "external_id": "xyz123",
    "custom_attributes": {
      "string_attribute": "fruit",
      "boolean_attribute_1": true,
      "integer_attribute": 25,
      "array_attribute": ["banana", "apple"]
    }
  }],
  "message": "success"
}
```

### Update a custom event (by email)

```bash
curl --request POST 'https://rest.iad-01.braze.com/users/track/sync' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer YOUR_REST_API_KEY' \
  --data-raw '{
    "events": [{
      "email": "test@braze.com",
      "app_id": "your_app_identifier",
      "name": "rented_movie",
      "time": "2022-12-06T19:20:45+01:00",
      "properties": {
        "release": { "studio": "FilmStudio", "year": "2022" },
        "cast": [{ "name": "Actor1" }, { "name": "Actor2" }]
      }
    }]
  }'
```

Response:
```json
{
  "users": [{
    "email": "test@braze.com",
    "custom_events": [{
      "name": "rented_movie",
      "first": "2022-01-01T00:00:00.000Z",
      "last": "2022-12-06T18:20:45.000Z",
      "count": 10
    }]
  }],
  "message": "success"
}
```

### Update a purchase event (by user alias)

```bash
curl --request POST 'https://rest.iad-01.braze.com/users/track/sync' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer YOUR_REST_API_KEY' \
  --data-raw '{
    "purchases": [{
      "user_alias": { "alias_name": "device123", "alias_label": "my_device_identifier" },
      "app_id": "11ae5b4b-2445-4440-a04f-bf537764c9ad",
      "product_id": "Completed Order",
      "currency": "USD",
      "price": 219.98,
      "time": "2022-12-06T19:20:45+01:00",
      "properties": {
        "products": [
          { "name": "Monitor", "category": "Gaming", "product_amount": 19.99 },
          { "name": "Gaming Keyboard", "category": "Gaming", "product_amount": 199.99 }
        ]
      }
    }]
  }'
```

## Related

- [User Attributes Object](https://www.braze.com/docs/api/objects_filters/user_attributes_object/)
- [Events Object](https://www.braze.com/docs/api/objects_filters/event_object/)
- [Purchases Object](https://www.braze.com/docs/api/objects_filters/purchase_object/)
- [Asynchronous /users/track endpoint](https://www.braze.com/docs/api/endpoints/user_data/post_user_track)

`★ Insight ─────────────────────────────────────`
- The sync vs async distinction here maps directly to a classic API design tradeoff: `/users/track` is fire-and-forget (higher throughput, no ordering guarantees), while `/users/track/sync` trades rate limit headroom for causal ordering — useful when the next request depends on the previous write having landed.
- The "one object per request" constraint on the sync endpoint is a deliberate design choice: it keeps response latency predictable. Batching multiple objects would mean the caller waits for the slowest write in the batch.
- The response echoing back only the fields from the request (not the full profile) is an important detail for consumers — it means you can't use this endpoint as a read-after-write pattern to fetch the full current state.
`─────────────────────────────────────────────────`
