---
name: cdp-segment
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/get_started/users_and_segments
indexed_at: '2026-04-05'
keywords:
  - users
  - attributes
  - events
  - segments
  - profiles
  - devices
  - engagement
  - purchases
  - SDK
  - tracking
triggers:
  - how to track custom events
  - how to set custom attributes
  - how to build user segments
  - how to create user profiles
  - how to manage data points
---
`★ Insight ─────────────────────────────────────`
- Topic files in Nick's pipeline are **atomic knowledge units** nested inside `skills/{name}/references/` — they get embedded into the vector memory DB during Step 11, so dense, factual content retrieves better than narrative prose
- Removing Jekyll liquid tags (`{{site.baseurl}}/...`) and alert blocks is essential here — those are build-time artifacts that would corrupt semantic search results
`─────────────────────────────────────────────────`

Here's the condensed topic file:

---

## Segment CDP Overview: Users and Segments

### User Profiles

A user profile is the central data store for an individual user in Braze. Key components:

| Component | Description |
|-----------|-------------|
| **User ID** (`external_id`) | Unique identifier for logged-in users; enables cross-channel/device tracking |
| **Attributes** | Static properties (name, age, location, custom fields) |
| **Events** | User actions (purchases, clicks, app opens) |
| **Purchases** | Purchase history and buying patterns |
| **Devices** | Mobile, web, connected devices (wearables, smart TVs) |
| **Engagement** | Segment membership, subscription status, message interactions |
| **Message History** | Record of all messages sent per channel |

**Anonymous users** (no login) lack an `external_id` but can be assigned user aliases as alternative identifiers.

> The Braze SDK automatically collects 27 attributes and events on integration — segments can be built immediately after SDK install.

---

### Attributes

**Standard attributes** — predefined, auto-tracked after SDK integration:
- Demographics: First Name, Last Name, Email, Gender, Date of Birth, Country, City, Language
- Technical: Last Used App, Time Zone

**Custom attributes** — defined per business needs, require additional setup:
- Music app examples: Favorite Genre, Songs Played, Premium Subscriber (bool), Favorite Artist
- Retail app examples: Preferred Clothing Size, Favorite Brand, Purchase Count, Loyalty Member (bool)

Both standard and custom attributes can drive segmentation and message personalization (e.g., users in city X with >10 purchases).

---

### Events

**Standard events** — automatically tracked by SDK:
- `Session Start` — app opened
- `Session End` — app closed
- `Purchase` — in-app purchase made
- `Push Notification Click` — push notification tapped

**Custom events** — user-defined actions, require additional setup:
- Music app examples: Song Played, Playlist Created, Ad Skipped
- Fitness app examples: Workout Started, Workout Completed, Personal Record Set

---

### Data Points

Data points govern billing and define what Braze tracks. Consumed when:
- User profile data is updated
- Session starts/ends
- Custom event recorded
- Purchase made

**Not counted as data points:**
- Push tokens
- Device information
- Default campaign engagement tracking (email opens, push clicks)

Careful data point selection targets high-impact user data while controlling costs.

---

### Segments

Segments group users by demographic, behavioral, social, or technical criteria (attributes + events). Key behavior:

- **Dynamic**: Users continuously enter/exit segments as they meet or stop meeting criteria
- Segment membership is evaluated **at send time** — recipients are users matching criteria at the moment of campaign dispatch
- Enables customer lifecycle automation by moving users through journey stages
