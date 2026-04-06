---
name: get-started-users-and-segments
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/get_started/users_and_segments
indexed_at: '2026-04-05'
keywords:
  - attributes
  - events
  - segments
  - profiles
  - identifiers
  - datapoints
  - engagement
  - purchases
  - tracking
  - devices
triggers:
  - how to segment users
  - understanding user profiles
  - custom attributes and events
  - user identification
  - creating dynamic segments
---
## Users and Segments Overview

### User Profiles

Each user in Braze has a **user profile** — a central repository for behavior, preferences, and demographics.

**Key profile components:**

| Component | Description |
|-----------|-------------|
| **User Identifier** | `external_id` — tracks user across channels/devices. Anonymous users lack one but can use **user aliases** |
| **Attributes** | Characteristics (name, age, location) used for segmentation and personalization |
| **Events** | Actions taken (purchases, clicks, app opens) — also usable for segmentation |
| **Purchases** | Purchase history for understanding buying habits |
| **Devices** | Mobile, web, connected devices (wearables, smart TVs) |
| **Engagement** | Segment membership, subscription status, message interaction data |
| **Message History** | Per-channel record of all messages sent to user |

> The Braze SDK automatically collects **27 attributes and events** out of the box — segments can be built immediately after SDK integration.

---

### Attributes

#### Standard Attributes
Predefined, auto-tracked after SDK integration:
- First/Last Name, Email, Gender, Date of Birth
- Country, City, Language, Time Zone
- Last Used App

#### Custom Attributes
User-defined for business-specific needs. Examples:
- Music app: `Favorite Genre`, `Number of Songs Played`, `Premium Subscriber`
- Retail app: `Preferred Clothing Size`, `Loyalty Program Member`, `Number of Purchases`

Both standard and custom attributes can be combined for segmentation (e.g., users in `City = "Chicago"` with `Number of Purchases > 10`).

---

### Events

#### Standard Events
Auto-tracked by Braze SDK:
- `Session Start` / `Session End`
- `Purchase`
- `Push Notification Click`

#### Custom Events
User-defined for app-specific actions. Examples:
- Music app: `Song Played`, `Playlist Created`, `Ad Skipped`
- Fitness app: `Workout Started`, `Workout Completed`, `Personal Record Set`

---

### Data Points

Data points drive **billing and personalization**. Consumed when:
- User profile data is updated
- User performs: session start/end, custom event, purchase

**Not counted as data points:**
- Push tokens
- Device information
- Campaign engagement events (email opens, push clicks)

Be selective about what you track — prioritize highest-impact data.

---

### Segments

Segments dynamically group users by demographic, behavioral, social, or technical characteristics.

**Key behavior:** Segments are **dynamic** — users continuously flow in and out as they meet or stop meeting criteria. Segment membership is evaluated at send time, not at creation time.

---

`★ Insight ─────────────────────────────────────`
- The `external_id` / anonymous user alias distinction matters for SDK integration order — setting `external_id` too late can cause profile splits, creating duplicate anonymous + identified profiles that require merging.
- Data points are a billing concept unique to Braze — tracking too many custom attributes/events inflates costs. The distinction between "free" SDK-auto-collected data vs. billable custom data is worth surfacing explicitly to engineers integrating the SDK.
- Dynamic segment membership means you cannot reliably use a segment as a snapshot — always re-query at send time or use `segment_id` filters in the API.
`─────────────────────────────────────────────────`
