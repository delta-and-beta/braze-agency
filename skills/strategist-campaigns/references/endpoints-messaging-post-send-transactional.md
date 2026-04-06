---
name: endpoints-messaging-post-send-transactional
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/messaging/send_messages/post_send_transactional_message
indexed_at: '2026-04-05'
keywords:
  - transactional
  - email
  - campaign
  - deduplication
  - recipient
  - trigger_properties
  - external_user_id
  - postback
  - attributes
triggers:
  - send transactional email to user
  - one-off email delivery
  - deduplicate email sends
  - trigger properties personalization
---
That skill isn't relevant here. Let me process the documentation directly.

---

`★ Insight ─────────────────────────────────────`
- Transactional email endpoints differ from triggered campaigns: they enforce 1:1 targeting (single `external_user_id` or `user_alias`) rather than audience/segment targeting — this is a key structural constraint worth preserving clearly
- The `external_send_id` serves dual purpose: deduplication key (24h window) AND postback correlation identifier — both functions matter for implementation
`─────────────────────────────────────────────────`

---

## POST /transactional/v1/campaigns/{campaign_id}/send

Send an immediate, one-off transactional email to a single user via an API-triggered Transactional Email campaign.

**Requires:** `transactional.send` API key permission.

> Unlike triggered campaigns, this endpoint targets exactly one user per request. Purpose-built for 1:1 messages like order confirmations and password resets.

---

## Endpoint

```
POST https://rest.iad-01.braze.com/transactional/v1/campaigns/{campaign_id}/send
```

---

## Path Parameters

| Parameter | Required | Type | Description |
|---|---|---|---|
| `campaign_id` | Required | String | ID of the Transactional Email campaign |

---

## Request Headers

```
Content-Type: application/json
Authorization: Bearer YOUR-REST-API-KEY
```

---

## Request Body

```json
{
  "external_send_id": "BASE64_COMPATIBLE_STRING",
  "trigger_properties": {
    "key": "value"
  },
  "recipient": {
    "external_user_id": "USER_ID",
    "user_alias": { },
    "attributes": { }
  }
}
```

## Request Parameters

| Parameter | Required | Type | Description |
|---|---|---|---|
| `external_send_id` | Optional | String | Base64-compatible string matching `/^[a-zA-Z0-9-_+\/=]+$/`. Used as deduplication key (24h window) and included in HTTP event postback events. Duplicate within 24h = no new send. |
| `trigger_properties` | Optional | Object | Personalization key-value pairs templated into the message for this user. |
| `recipient` | Required | Object | Target user. Must include either `external_user_id` OR `user_alias` (not both). Optional `attributes` object creates/updates profile fields before send. |

**Recipient notes:**
- If `external_user_id` doesn't exist in Braze and `attributes` are provided, a new user profile is created.
- `first_name`, `last_name`, `email` are updated synchronously and templated into the message. Custom attributes are **not** synchronized — use caution with rapid successive updates.

---

## Example Request

```bash
curl -X POST \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR-REST-API-KEY' \
  -d '{
    "external_send_id": "YOUR_BASE64_COMPATIBLE_ID",
    "trigger_properties": {
      "example_string_property": "value",
      "example_integer_property": 42
    },
    "recipient": {
      "external_user_id": "TARGETED_USER_ID"
    }
  }' \
  https://rest.iad-01.braze.com/transactional/v1/campaigns/{campaign_id}/send
```

---

## Response

Returns a `dispatch_id` to correlate with Transactional HTTP event postback events.

```json
{
  "dispatch_id": "randomly-generated-unique-id",
  "status": "current-message-status",
  "metadata": {}
}
```

---

## Rate Limits

- **Hourly allotment**: Paid volume (e.g., 50,000 units/hour) — volume beyond allotment still sends but is **not SLA-covered**.
- **No per-endpoint rate limit**: Counts against overall external API rate limit (e.g., 250,000 req/hour across all endpoints).
- Exceeding the overall limit returns `429` until the limit resets.
- Hourly transactional volume resets each hour.

---

## Common Errors

| Error | Cause |
|---|---|
| `The campaign is not a transactional campaign` | `campaign_id` points to a non-transactional campaign |
| `The external reference has been queued. Please retry to obtain send_id.` | `external_send_id` was used recently; use a new ID |
| `Campaign does not exist` | Invalid `campaign_id` |
| `The campaign is archived` | Unarchive the campaign first |
| `The campaign is paused` | Resume the campaign first |
| `campaign_id must be a string of the campaign api identifier` | Malformed `campaign_id` |
| `Error authenticating credentials` | Invalid API key |
| `Invalid whitelisted IPs` | Sending IP not on IP whitelist |
| `You do not have permission to access this resource` | API key lacks `transactional.send` permission |
