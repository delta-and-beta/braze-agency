---
name: personalization-and-dynamic-content-key-value-pairs
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/personalization_and_dynamic_content/key_value_pairs
indexed_at: '2026-04-05'
keywords:
  - personalization
  - metadata
  - push
  - APNs
  - payload
  - localization
  - deeplink
  - tracking
  - routing
triggers:
  - add key-value pairs to messages
  - configure custom push payload
  - set up deep linking
  - localize push notifications
  - track analytics with custom keys
---
## Key-Value Pairs

Structured metadata attached to messages across push, in-app, email, and Content Card channels. Data isn't visible to recipients but drives rendering, routing, and processing by connected systems.

**Structure:** Each pair has a `Key` (identifier) and `Value` (associated data).

### Common Use Cases

| Use Case | Key | Value |
|----------|-----|-------|
| Analytics tracking | `utm_campaign` | `spring_sale` |
| Internal routing | `priority` | `high` |
| Deep linking | `deep_link` | `app://promo-page` |

---

## Push Notifications

Add via **Settings tab > Add New Pair** in the message composer.

### iOS (APNs)

APNs uses the reserved `aps` library for alert control. Braze auto-handles: `alert`, `content-available`, `sound`, `category`.

**APS Library Keys**

| Key | Value Type | Description |
|-----|------------|-------------|
| `alert` | string or dictionary | Displays alert message or banner |
| `badge` | number | App icon badge count |
| `sound` | string | Sound file name (must be in app bundle or `Library/Sounds`) |
| `content-available` | number | `1` = signals new content on launch/resume |

**Alert Dictionary Keys** (used inside `alert`)

| Key | Value Type | Description |
|-----|------------|-------------|
| `title` | string | Short title shown on Apple Watch |
| `body` | string | Notification content |
| `title-loc-key` | string or null | Localization key for title from `Localizable.strings` |
| `title-loc-args` | array or null | Values substituted into `title-loc-key` format specifiers |
| `action-loc-key` | string or null | Localizes Close and View button labels |
| `loc-key` | string or null | Localization key for message body |
| `loc-args` | array of strings | Values substituted into `loc-key` format specifiers |
| `launch-image` | string | Launch image filename when user taps action |

**Payload Examples**

Simple:
```json
{
    "aps": { "alert": "Message received from Spencer" }
}
```

Complex:
```json
{
    "aps": {
        "alert": {
            "body": "Hi, welcome to our app!",
            "loc-key": "France",
            "loc-args": ["Bonjour", "bienvenue"],
            "action-loc-key": "Button_Type_1",
            "launch-image": "Paris"
        },
        "content-available": 1
    }
}
```

**Custom Key-Value Pairs**

Sent outside the `aps` object. Restricted to primitive types: dictionary, array, string, number, boolean. Accessed via the `extras` key in app code.

> **Warning:** Do not use `ab` as a top-level key or dictionary name — reserved by Braze.
> **Warning:** Do not include sensitive customer data in custom payload data.
> **Size limit:** HTTP/2 APNs payloads max at **4096 bytes**; legacy binary interface max is **2048 bytes**.

**API-Triggered Campaigns — JSON Extras**

Set key as `example_key`, value as `$json:{"foo": 1, "bar": 1}` in the dashboard. Result in payload: `"extras": { "test": { "foo": 1, "bar": 1 } }`.

### Android

Custom key-value pairs are sent as additional data payloads alongside push notifications (same pattern as iOS custom pairs).

---

`★ Insight ─────────────────────────────────────`
- The `aps` library distinction is important: Braze auto-manages several APS keys, so developers shouldn't manually set `alert`, `sound`, `content-available`, or `category` via custom pairs — they'll be overwritten or conflict
- The `extras` key pattern (accessed in Swift/Kotlin SDK) is the primary bridge between Braze KV pairs and app-side logic — it's separate from the APS payload
- The `$json:` prefix syntax for API-triggered campaigns is a Braze-specific convention that deserializes the string value into a nested object at delivery time
`─────────────────────────────────────────────────`
