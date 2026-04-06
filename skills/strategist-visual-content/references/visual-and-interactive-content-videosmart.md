---
name: visual-and-interactive-content-videosmart
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/message_personalization/dynamic_content/visual_and_interactive_content/videosmart
indexed_at: '2026-04-05'
keywords:
  - VideoSmart
  - Connected Content
  - Liquid
  - personalization
  - video
  - authentication
  - templating
  - integration
  - email
  - credentials
triggers:
  - How to integrate VideoSmart with Braze
  - Set up personalized video campaigns
  - Configure Connected Content authentication
  - Generate dynamic video URLs
  - Add VideoSmart Content Block to email
---
## VideoSmart Visual Content Integration

VideoSmart provides personalized, interactive video technology integrated with Braze via Connected Content and Liquid templating. Videos are dynamically generated at send time using customer-level data.

---

### Prerequisites

| Requirement | Description |
|---|---|
| Connected Content credential | Basic Auth credential named `basic_credentials` (VideoSmart-provided values) |
| VideoSmart Content Block | Template added to your Braze dashboard (provided by VideoSmart) |
| Braze email message | Campaign or Canvas email step where Content Block will be inserted |

---

### Integration Steps

**1. Add the Content Block template** — Request from VideoSmart, add to Braze dashboard.

**2. Configure Connected Content auth** — Create a Basic Auth credential named `basic_credentials` using VideoSmart-supplied username/password.

**3. Insert the Content Block** into your email:
```liquid
{{content_blocks.${VideoSmart_Campaign}}}
```
> Name is case-sensitive and must match exactly.

**4. Override campaign/record data (optional)** — Set Liquid variables before the Content Block renders:

```liquid
{% assign vs_campaign_id = "CAMPAIGN_ID" %}

{% capture vs_record_data %}
{
  "FirstName": "{{ ${first_name} | default: 'John' | json_escape }}",
  "LastName": "{{ ${last_name} | default: 'Doe' | json_escape }}"
}
{% endcapture %}
{% assign vs_record_data = vs_record_data | strip_newlines %}
```

Key variables:
- `vs_campaign_id` — VideoSmart campaign identifier
- `vs_record_data` — JSON string of personalization fields (must be valid JSON as single string)

Always provide defaults so Braze Preview renders correctly.

**5. Reference generated variables** after the Content Block runs:

| Variable | Description |
|---|---|
| `{{ video_url }}` | URL of the personalized video |
| `{{ poster_url }}` | URL of the poster image |
| `{{ output_data.VARIABLE_NAME }}` | Additional Content Block output fields |

---

### Rate Limits

**10,000 requests/minute.** Configure Braze campaign rate limiting to stay below this threshold.

---

### Troubleshooting

**Preview not working:**
- Verify `basic_credentials` exists and is correct
- Verify VideoSmart Content Block is present in the account
- Ensure required variables have defaults (`vs_campaign_id`, fields in `vs_record_data`)

**Variables not generating expected output:**
- Confirm Content Block is set up correctly in Braze
- Confirm Connected Content authentication is valid
- Verify field names in `vs_record_data` match VideoSmart's expected schema

---

### Use Cases

Onboarding/welcome journeys, financial statements, product cross-sell, retention, abandoned cart reminders, post-purchase follow-ups.
