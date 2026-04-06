---
name: api-objects-event-object
source_url: 'https://braze-inc.github.io/braze-docs/_api/objects_filters/event_object'
indexed_at: '2026-04-05'
keywords:
  - event
  - tracking
  - properties
  - user-identification
  - timestamp
  - payload
  - API
  - custom-event
  - ISO-8601
  - request
triggers:
  - how to track user events
  - send event data to Braze
  - event object structure
  - set event properties
  - track events with identifiers
---
## Event Object

An event object represents a single occurrence of a custom event by a particular user at a specific time. Events objects are passed through the API and housed in an `events` array within `/users/track` requests.

### Object Structure

```json
{
  // One of these identifiers is required:
  "external_id" : (optional, string),
  "user_alias" : (optional, User Alias Object),
  "braze_id" : (optional, string),
  "email": (optional, string),
  "phone": (optional, string),

  "app_id" : (optional, string),
  "name" : (required, string),
  "time" : (required, ISO 8601 datetime string),
  "properties" : (optional, object),
  "_update_existing_only" : (optional, boolean)
}
```

**Identifier precedence:** When both `email` and `phone` are provided, `email` takes precedence.

### `_update_existing_only` Behavior

| Value | Behavior |
|-------|----------|
| `true` | Only updates existing profiles; does not create new ones |
| `false` (or omitted) | Creates a new profile if `external_id` doesn't exist |
| Always `true` | When using `user_alias` |

> When creating alias-only profiles via `/users/track`, set `_update_existing_only: false` explicitly, or the profile will not be created.

---

### Event Properties Object

The `properties` field is a key-value object. Rules:
- Keys must be non-empty strings ≤ 255 characters, no leading `$`
- Payload limit for objects/arrays: **100 KB**

**Supported value types:**

| Type | Notes |
|------|-------|
| Numbers | Integers or floats |
| Booleans | `true` or `false` |
| Strings | ≤ 255 characters |
| Datetimes | ISO 8601 string; not supported inside arrays; future timestamps default to current time; no timezone defaults to midnight UTC |
| Arrays | Cannot contain datetimes |
| Objects | Ingested as strings |

**Reserved keys** (cannot be used as property names — will cause API errors):
- `time`
- `event_name`

### Property Persistence

Event properties are designed for **message filtering and Liquid personalization** within triggered campaigns. They are **not persisted** on the user profile by default. For long-term segmentation use, configure custom event property storage separately.

---

### Example Request

```http
POST https://YOUR_REST_API_URL/users/track
Content-Type: application/json
Authorization: Bearer YOUR-REST-API-KEY

{
  "events": [
    {
      "external_id": "user1",
      "app_id": "your-app-id",
      "name": "watched_trailer",
      "time": "2013-07-16T19:20:30+01:00"
    },
    {
      "external_id": "user1",
      "app_id": "your-app-id",
      "name": "rented_movie",
      "time": "2013-07-16T19:20:45+01:00",
      "properties": {
        "movie": "The Sad Egg",
        "director": "Dan Alexander"
      }
    },
    {
      "user_alias": { "alias_name": "device123", "alias_label": "my_device_identifier" },
      "app_id": "your-app-id",
      "name": "watched_trailer",
      "time": "2013-07-16T19:20:50+01:00"
    }
  ]
}
```

### Usage Pattern

Event properties enable personalized messaging via Liquid. Example:

> "Hello **Beth**, Thanks for renting **The Sad Egg** by **Dan Alexander**, here are some recommended movies based on your rental..."

Properties are accessed in message templates using Liquid syntax referencing the triggering event's property values.
