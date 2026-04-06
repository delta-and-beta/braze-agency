---
name: engagement-tools-landing-pages-tracking-users
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/landing_pages/tracking_users
indexed_at: '2026-04-05'
keywords:
  - landing-pages
  - tracking
  - personalization
  - campaigns
  - forms
  - profiles
  - liquid
  - channels
  - lead-generation
  - url
triggers:
  - how to track landing page users
  - set up landing page tracking
  - generate landing page liquid tag
  - embed landing page in campaign message
  - link users to existing profiles
---
## Landing Page User Tracking

The `{% landing_page_url %}` Liquid tag links a user who submits a landing page form to their **existing** Braze profile (no duplicate profile creation). Works across all channels: email, SMS, in-app messages, etc.

### Setup

**Prerequisites:** A published landing page and a campaign.

**Step 1 — Verify/set the page URL**

In **Messaging > Landing Pages**, open your landing page and check **page URL**. This slug becomes part of the Liquid tag.

> Changing the URL after sending breaks old links — users will hit a 404.

**Step 2 — Generate the Liquid tag**

In the campaign message editor, select **Personalization**, then:

| Field | Value |
|---|---|
| Personalization type | Landing Page |
| Landing page | Your target landing page |

Braze generates a tag like:

```ruby
{% landing_page_url custom-url-handle %}
```

Insert it or copy to clipboard.

**Step 3 — Embed in message and send**

```html
<a href="{% landing_page_url customer-survey %}" class="button">Take the Survey!</a>
```

### Lead Generation (External Channels)

For use outside Braze messages, go to **Landing Page Details** to get the raw URL. Embed it directly in external channels (no Liquid tag needed).

`★ Insight ─────────────────────────────────────`
- The `{% landing_page_url %}` tag is resolved server-side at send time, which means Braze can inject a user-specific tracking token into the URL — this is what enables form submissions to map back to the correct profile without requiring the user to be logged in.
- The "no duplicate profile" guarantee relies on the URL containing an encoded user identifier; if a user shares the link, the submission may be attributed to the original recipient.
`─────────────────────────────────────────────────`
