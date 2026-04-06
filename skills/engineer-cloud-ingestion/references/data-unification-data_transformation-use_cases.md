---
name: data-unification-data_transformation-use_cases
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/data/unification/data_transformation/use_cases
indexed_at: '2026-04-05'
keywords:
  - webhook
  - transformation
  - integration
  - mapping
  - typeform
  - zendesk
  - attributes
  - events
  - survey
  - synchronization
triggers:
  - transform webhook data to Braze
  - sync external platform data
  - map form responses to user attributes
  - track survey responses and NPS
---
## Data Transformation Use Cases

Braze Data Transformation processes incoming webhooks from external platforms and maps them to Braze API calls.

### Common Use Cases

**Lead Generation (Typeform)**
- Create new users in Braze from form submissions
- Add users to email lists
- Sync form responses as custom attributes for personalization

**Customer Service (Zendesk)**
- Write a custom event when a support ticket is created
- Write a custom event with properties when a negative CSAT rating is submitted

**Survey Platforms (Iterate)**
- Save multiple survey responses under one nested custom attribute (more efficient than the native integration, which creates multiple flat attributes)

---

### Example: Typeform Webhook Transformation

Typeform sends a payload on each survey response. The relevant fields are:
- `payload.form_response.hidden.email_address` — identifies the user
- `payload.form_response.answers[n]` — indexed answer values (`.text`, `.number`)
- `payload.form_response.form_id` — the survey identifier

#### Basic Transformation

Maps answers to attributes and fires a completion event:

```js
return {
  "attributes": [
    {
      "email": payload.form_response.hidden.email_address,
      "_update_existing_only": true,
      "home_city": payload.form_response.answers[0].text,
      "home_weather_rating": payload.form_response.answers[1].number
    }
  ],
  "events": [
    {
      "email": payload.form_response.hidden.email_address,
      "_update_existing_only": true,
      "name": "weather_survey_completed",
      "time": new Date(),
      "properties": {
        "form_id": payload.form_response.form_id
      }
    }
  ]
}
```

#### Advanced Transformation — Conditional Categorization

Adds logic to bucket a numeric answer into named segments (NPS pattern):

```js
let nps_category;
let nps_number = payload.form_response.answers[1].number;
if (nps_number < 7) {
  nps_category = "Detractor";
} else if (nps_number == 7 || nps_number == 8) {
  nps_category = "Passive";
} else if (nps_number > 8) {
  nps_category = "Promoter";
}

return {
  "attributes": [
    {
      "email": payload.form_response.hidden.email_address,
      "_update_existing_only": true,
      "home_city": payload.form_response.answers[0].text,
      "home_weather_NPS_category": nps_category
    }
  ],
  "events": [
    {
      "email": payload.form_response.hidden.email_address,
      "_update_existing_only": true,
      "name": "weather_survey_completed",
      "time": new Date(),
      "properties": {
        "form_id": payload.form_response.form_id
      }
    }
  ]
}
```

**Key pattern:** `_update_existing_only: true` prevents creating phantom users when a webhook arrives for an email not yet in Braze. Remove this flag only if you want the transformation to also create new profiles.
