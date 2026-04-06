---
name: endpoints-user-data-post-user-track-synchronous
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/user_data/post_user_track_synchronous
indexed_at: '2026-04-05'
keywords:
  - synchronous
  - track
  - events
  - attributes
  - purchases
  - custom
  - sequential
  - ordering
  - profile
  - endpoint
triggers:
  - synchronous user tracking
  - track events with ordering guarantees
  - when to use sync tracking
  - sequential user updates
  - update user profile synchronously
---
## POST /users/track/sync — Synchronous User Track

Synchronous variant of `/users/track`. Records custom events, purchases, and user profile attribute updates — and **waits for completion** before returning.

> **Beta**: Currently in limited beta. Contact your Braze account manager for access.

---

## Key Differences vs `/users/track`

| | `/users/track` (async) | `/users/track/sync` |
|---|---|---|
| Response code | `201` = received | `201` = received **and completed** |
| Response body | Minimal | Returns updated profile fields |
| Rate limit | Higher | **500 req/min** |
| Objects per request | Multiple | **One** (event, attribute, OR purchase) |

**When to use sync**: When you need ordering guarantees — e.g., consecutive updates for the same user where each must complete before the next begins.

**Recommended pattern**: Use `/users/track` for bulk/high-volume updates and `/users/track/sync` only where sequential consistency is required.

---

## Authentication

API key with `users.track.sync` permission. Server-to-server callers behind a firewall must allowlist `rest.iad-01.braze.com`.

```
Authorization: Bearer YOUR_REST_API_KEY
Content-Type: application/json
```

---

## Rate Limit

**500 requests/minute** (base). Each request: max one object (event, attribute, or purchase), updating one user.

---

## Request Body

```json
{
  "attributes": (optional, one attributes object),
  "events":     (optional, one event object),
  "purchases":  (optional, one purchase object)
}
```

Each object requires one user identifier: `external_id`, `user_alias`, `braze_id`, `email`, or `phone`.

---

## Response

### Success (`201`)

```json
{
  "users": [
    {
      "custom_attributes": { ... },
      "custom_events":     { ... },
      "purchase_events":   { ... }
    }
  ],
  "message": "success"
}
```

Only fields from the request are reflected back. `users` may be empty if no user is found and `_update_existing_only` is `true`.

### Fatal Error

```json
{
  "message": "<fatal error message>",
  "errors": [{ "<fatal error message>" }]
}
```

---

## Examples

### Update Custom Attributes (by external_id)

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

**Response:**
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

### Track Custom Event (by email)

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

**Response:**
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

### Track Purchase (by user_alias)

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

---

## Related

- [`/users/track`](https://www.braze.com/docs/api/endpoints/user_data/post_user_track) — async bulk version
- [User attributes object](https://www.braze.com/docs/api/objects_filters/user_attributes_object/)
- [Events object](https://www.braze.com/docs/api/objects_filters/event_object/)
- [Purchases object](https://www.braze.com/docs/api/objects_filters/purchase_object/)
