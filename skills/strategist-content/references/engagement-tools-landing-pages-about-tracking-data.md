---
name: engagement-tools-landing-pages-about-tracking-data
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/landing_pages/about_tracking_data
indexed_at: '2026-04-05'
keywords:
  - landing-pages
  - tracking
  - sdk
  - form-submission
  - profiles
  - merge
  - cookies
  - session
  - identifiers
  - api
triggers:
  - How to track landing page form submissions
  - Handling duplicate user profiles
  - Merging user profiles after form submission
  - Configure landing page tracking data collection
---
## Landing Page Tracking Data

### Web SDK Initialization

The Braze Web SDK initializes under two conditions:
- **Form submission**: SDK initializes when a user submits a landing page form
- **Liquid link navigation**: SDK initializes immediately when a user arrives via a `{% landing_page_url %}` Liquid tag link

**Pre-submission**: No personal data is collected; no cookies, local storage, or browser data is stored.

**On form submission, SDK collects:**
- Form submission event (event name + timestamp)
- Form field data (e.g., name, email, phone — as configured)
- Session start time
- Device ID (generated per-session, not stored)
- Country (derived from IP address)

### Anonymized Data (Pre-Submission)

Before form submission, only aggregate, non-identifiable metrics are tracked:
- Page views (impressions)
- Clicks

This data cannot be used to retarget or identify individual users.

### Duplicate User Profile Handling

Braze does **not** auto-merge profiles on matching attributes (email, phone). Submitting a form with an existing user's email/phone creates a **new separate profile**.

**To merge duplicates:**

| Method | Use Case |
|--------|----------|
| `/users/merge` endpoint | Trigger merge immediately on form submission |
| Bulk merging (Segments) | Periodic scheduled merges by matching identifiers |

- `/users/merge` docs: `{{site.baseurl}}/api/endpoints/user_data/post_users_merge/`
- Bulk merging docs: `{{site.baseurl}}/user_guide/engagement_tools/segments/user_profiles/duplicate_users/#bulk-merging`
