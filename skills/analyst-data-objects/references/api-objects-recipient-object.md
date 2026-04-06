---
name: api-objects-recipient-object
source_url: 'https://braze-inc.github.io/braze-docs/_api/objects_filters/recipient_object'
indexed_at: '2026-04-05'
keywords:
  - recipients
  - identifiers
  - deduplication
  - personalization
  - attributes
  - campaign
  - canvas
  - messaging
  - aliasing
  - routing
triggers:
  - how to identify users for API messaging
  - how to handle duplicate recipients
  - how to personalize messages per user
  - how to create user profiles via recipients
---
# Recipient Object

The recipients object identifies users in API requests. Exactly one identifier is required per entry: `external_user_id`, `user_alias`, `braze_id`, or `email`.

## Object Structure

```json
[{
  "user_alias": (optional, User Alias Object) User alias of user to receive message,
  "external_user_id": (optional, string) External user ID,
  "braze_id": (optional, string) Braze ID,
  "email": (optional, string) Email address of user to receive message,
  "prioritization": (optional, array) Required when using email identifier,
  "trigger_properties": (optional, object) Personalization key-value pairs for campaigns/messages,
  "context": (optional, object) Personalization key-value pairs for Canvas triggers,
  "send_to_existing_only": (optional, boolean) Defaults to true; cannot be used with user aliases,
  "attributes": (optional, object) Creates or updates user profile attributes before message is sent
}]
```

## Key Behaviors

**`send_to_existing_only`**
- `true` (default): Message sent only to existing users. Not compatible with user aliases.
- `false`: Requires `attributes`. Braze creates the user profile before sending.

**Deduplication**
Braze automatically deduplicates recipients targeting the same address (email or push). Duplicate `external_user_id` entries in the same array result in a single message sent using trigger properties from the **last occurrence** in the array.

```json
{"campaign_id":"#####","recipients":[
  {"external_user_id":"userid1","trigger_properties":{"name":"Beth Test 1"}},
  {"external_user_id":"userid1","trigger_properties":{"name":"Beth Test 2"}}
]}
```

In this example, `userid1` receives one message with `"name": "Beth Test 2"` (last entry wins).

To bypass deduplication, use multiple separate API calls.

## Compatible Objects

The recipient object can be combined with:
- User Alias Object
- Trigger Properties Object
- Canvas Entry Properties / Canvas Context Object
- User Attributes Object
