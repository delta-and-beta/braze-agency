---
name: data-unification-user_data-collection_use_case
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/data/unification/user_data/collection_use_case
indexed_at: '2026-04-05'
keywords:
  - events
  - attributes
  - funnel
  - tracking
  - segmentation
  - personalization
  - campaigns
  - journey
  - goals
  - integration
triggers:
  - how to collect user data
  - setting up custom events
  - defining user attributes
  - mapping user funnels
  - creating campaign segments
---
## Data Collection Use Cases

When deciding what user data to collect, work through three questions: goal, funnel steps, and user characteristics.

### Framework

**Q1: What is the goal?**
Define the single primary action users should take in your app.

**Q2: What funnel steps lead to that goal?**
Map the user journey into discrete, trackable steps. Each step becomes a **custom event**.

**Q3: What user characteristics inform messaging?**
Identify persistent state that varies by user. Each characteristic becomes a **custom attribute**.

---

### Example: Ride-Sharing App (StyleRyde)

**Goal:** Users hail taxi rides.

#### Custom Events

| Event | Trigger |
|-------|---------|
| `Began Registration` | User starts sign-up flow |
| `Completed Registration` | User verifies via SMS code |
| `Successful Taxi Hail` | Taxi successfully matched |
| `Unsuccessful Taxi Hail` | Hail attempt failed |

**Campaign use cases from these events:**
- Re-engage users who `Began Registration` but not `Completed Registration` within a time window
- Congratulate users on `Completed Registration`
- Apologize + offer credit to users with `Unsuccessful Taxi Hail` not followed by a `Successful Taxi Hail`
- Reward power users with many `Successful Taxi Hails`

#### Custom Attributes

| Attribute | Type | Use |
|-----------|------|-----|
| `Promotional Credit Balance` | Decimal | Target users with unused credit |
| `Average Driver Rating` | Integer | Segment by satisfaction level |
| `Unique Promo Code` | String | Personalize messaging via templates |

**Campaign use cases from these attributes:**
- Re-engage lapsed users (7+ days inactive) who have promotional credit remaining
- Inject `Unique Promo Code` directly into message copy via personalization features

---

### Important Limits

Braze blocks users with **over 5,000,000 sessions and no SDK events** — these are treated as misintegrated dummy users. Contact your account manager if a legitimate user is affected.
