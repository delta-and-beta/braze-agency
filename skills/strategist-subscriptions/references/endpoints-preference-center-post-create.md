---
name: endpoints-preference-center-post-create
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/preference_center/post_create_preference_center
indexed_at: '2026-04-05'
keywords:
  - preference-center
  - endpoint
  - REST
  - API
  - authentication
  - Liquid
  - subscription
  - HTML
  - campaigns
  - forms
triggers:
  - create preference center
  - manage notification preferences
  - set up preference center
  - configure subscription groups
  - build preference page
---
## POST /preference_center/v1 — Create Preference Center

Creates a new preference center for managing user notification preferences for email campaigns.

**Required permission:** `preference_center.update`

---

## Request

```
POST /preference_center/v1
Content-Type: application/json
Authorization: Bearer YOUR-REST-API-KEY
```

```json
{
  "name": "string",
  "preference_center_title": "string",
  "preference_center_page_html": "string",
  "confirmation_page_html": "string",
  "state": "active",
  "options": {
    "meta-viewport-content": "string",
    "links-tags": [
      {
        "rel": "icon",
        "type": "image/png",
        "sizes": "string",
        "color": "string",
        "href": "string"
      }
    ]
  }
}
```

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `name` | Required | String | Letters, numbers, hyphens, underscores only — no spaces. **Cannot be edited after creation.** |
| `preference_center_title` | Optional | String | Title for preference center and confirmation pages. Defaults to "Preference Center". |
| `preference_center_page_html` | Required | String | HTML for the preference center page. |
| `confirmation_page_html` | Required | String | HTML for the confirmation page. |
| `state` | Optional | String | `active` or `draft`. Defaults to `active`. |
| `options` | Optional | Object | `meta-viewport-content`: adds viewport meta tag. `link-tags`: sets favicon via `<link rel="...">` tag. |

---

## Liquid Tags for Preference Center HTML

### User Subscription State

| Liquid | Description |
|--------|-------------|
| `{{subscribed_state.${email_global}}}` | Global email state: `"opted_in"`, `"subscribed"`, or `"unsubscribed"` |
| `{{subscribed_state.${<subscription_group_id>}}}` | Subscription group state: `"subscribed"` or `"unsubscribed"` |

### Form Inputs and Actions

| Liquid | Description |
|--------|-------------|
| `{% form_field_name :email_global_state %}` | Links input to user's global email state. Checkbox → `"opted_in"` or `"unsubscribed"`; hidden input also accepts `"subscribed"`. |
| `{% form_field_name :subscription_group <id> %}` | Links input to a specific subscription group. Values: `"subscribed"` or `"unsubscribed"`. |
| `{{preference_center_submit_url}}` | Generates the form submission URL. |

---

## Response

```json
{
  "preference_center_api_id": "preference_center_api_id_example",
  "liquid_tag": "{{preference_center.${MyPreferenceCenter2022-09-22}}}",
  "created_at": "2022-09-22T18:28:07+00:00",
  "message": "success"
}
```

Use the returned `liquid_tag` to embed the preference center link in email campaigns.

---

## HTML Form Example (Pattern)

Key JavaScript pattern for managing checkbox states with Liquid:

```javascript
window.onload = () => {
  const globalUnsubscribed = '{{subscribed_state.${email_global}}}' == "unsubscribed";
  const globalSubscribedValue = '{{subscribed_state.${email_global}}}' == "opted_in" ? "opted_in" : "subscribed";

  const idStates = [
    // [SUBSCRIPTION_GROUP_API_ID, '{{subscribed_state.${API_ID}}}' == "subscribed"]
    ['3d2ae07a-f2ff-4318-bdff-e394f2d3a4ec', '{{subscribed_state.${3d2ae07a-...}}}' == 'subscribed'],
  ];

  // setState: sync checkbox and hidden input value
  // setGlobal: toggle global unsubscribe, disable group checkboxes when true
};
```

Form inputs use hidden fields to hold subscription state values submitted to `{{preference_center_submit_url}}`.
