---
name: engagement-tools-landing-pages
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/landing_pages/tracking_users
indexed_at: '2026-04-05'
keywords:
  - landing-page
  - liquid-tag
  - form-submission
  - user-tracking
  - personalization
  - campaign
  - messaging
  - braze
  - url
  - profile
triggers:
  - how to track users through a landing page
  - how to link form submissions to user profiles
  - how to generate a landing page liquid tag
  - how to embed a landing page in a message
---
## Tracking Users Through a Landing Page Form

Use the `{% landing_page_url %}` Liquid tag in any Braze message (email, SMS, in-app, etc.) to link form submissions back to existing user profiles — no new profiles created.

**Prerequisites:** A landing page and campaign must already exist.

### Implementation

**1. Verify or set the page URL**

Go to **Messaging > Landing Pages**, open your landing page, and confirm the page URL under **page URL**. This URL drives the Liquid tag — changing it after sending breaks old links (404).

**2. Generate the Liquid tag**

In your campaign's message editor, select **Personalization**, then:

| Field | Value |
|---|---|
| Personalization type | Landing Page |
| Landing page | Your target landing page |

Copy the auto-generated snippet:

```ruby
{% landing_page_url custom-url-handle %}
```

**3. Embed in message and send**

```html
<a href="{% landing_page_url customer-survey %}" class="button">Take the Survey!</a>
```

### Lead Generation (External Channels)

For non-Braze channels, use the static URL instead of the Liquid tag. Find it under **Landing Page Details** after creating the page.

### Key Behaviors

- Submissions are linked to the **existing user profile** (not a new one)
- Works across all Braze messaging channels
- Page URL changes invalidate previously sent links
