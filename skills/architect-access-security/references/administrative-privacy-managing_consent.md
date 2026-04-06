---
name: administrative-privacy-managing_consent
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/administrative/privacy/managing_consent
indexed_at: '2026-04-05'
keywords:
  - consent
  - subscription
  - privacy
  - compliance
  - segmentation
  - attributes
  - governance
  - channels
  - opt-in
triggers:
  - how to manage consent
  - setting up subscription groups
  - implementing consent management
  - configuring user privacy
  - managing gdpr compliance
---
## Managing Consent

Braze provides several tools for subscription and consent management, but does not advise on legal interpretation — consult your legal team to determine the right approach.

### Consent Management Options (Most → Least Strict)

**1. Braze Teams (Strictest)**
- Add a custom attribute to all user profiles indicating consent status, consent date, or both
- Migrate all campaigns and Canvases to a designated team
- Adjust user permissions on the dashboard accordingly
- Use case: True governance with access control

**2. User Profile Attribute**
- Add a `consent` custom attribute (e.g., `consent = true/false`) to all user profiles
- Segment consented users and include that segment in all campaigns and Canvases
- Simple boolean flag approach; easy to query and filter

**3. Channel-Specific Subscription Groups (Least Strict)**
- Manipulate subscription groups per channel (push, email, SMS, etc.)
- Default new users to **unsubscribed**; mark as subscribed only after consent is given
- Scope is limited to channel opt-in/out rather than a global consent record

### Choosing an Approach

| Option | Granularity | Enforcement Level |
|--------|-------------|-------------------|
| Braze Teams | Platform-wide | Dashboard + data access |
| Profile attribute | User-level | Segmentation-based |
| Subscription groups | Channel-level | Send-time filtering |

The right option depends on how strictly your legal team interprets applicable consent regulations (e.g., GDPR, CCPA).
