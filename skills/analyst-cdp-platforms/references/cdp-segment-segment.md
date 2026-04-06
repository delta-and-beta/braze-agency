---
name: cdp-segment-segment
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/get_started/users_and_segments
indexed_at: '2026-04-05'
keywords:
  - segment
  - profile
  - attribute
  - event
  - purchase
  - device
  - tracking
  - engagement
  - custom-event
  - data-point
triggers:
  - how to create user segments
  - how to track custom events
  - how to set custom attributes
  - what counts as data points
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's pipeline are "atomic knowledge units" — they live in `skills/{id}/references/*.md` and get embedded as vectors for semantic search. The goal is high signal density: strip Jekyll template syntax (`{{site.baseurl}}`), Liquid tags (`{% alert %}`), and navigation artifacts while preserving the facts an LLM needs to answer developer questions.
`─────────────────────────────────────────────────`

## Segment Integration

### User Profiles

Every Braze user has a **user profile** — a central store of attributes, events, purchases, device info, and engagement history.

**Key profile components:**

| Component | Description |
|---|---|
| `external_id` | Unique user identifier across channels/devices |
| Attributes | Static properties (name, age, location, custom fields) |
| Events | Actions the user performs (purchases, clicks, app opens) |
| Purchases | Full purchase history |
| Devices | Mobile, browser, connected devices |
| Engagement | Segment membership, subscription status, message interactions |
| Message History | Per-channel record of sent messages |

Anonymous users (no login) lack an `external_id` but can be assigned **user aliases** as alternative identifiers.

The Braze SDK automatically collects **27 standard attributes and events** on integration — segments can be built immediately.

---

### Attributes

#### Standard Attributes (auto-collected post-SDK)
First Name, Last Name, Email, Gender, Date of Birth, Country, City, Last Used App, Language, Time Zone

#### Custom Attributes
Defined per business need. Examples:
- Music app: Favorite Genre, Songs Played, Premium Subscriber (bool)
- Retail app: Preferred Clothing Size, Loyalty Member (bool), Purchase Count

Both standard and custom attributes support segmentation and message personalization (e.g., "users in NYC with 10+ purchases").

---

### Events

#### Standard Events (auto-tracked)
| Event | Trigger |
|---|---|
| Session Start | User opens the app |
| Session End | User closes the app |
| Purchase | In-app purchase made |
| Push Notification Click | User taps a push notification |

#### Custom Events
Defined per app behavior. Examples:
- Music app: Song Played, Playlist Created, Ad Skipped
- Fitness app: Workout Started, Workout Completed, Personal Record Set

Custom events and custom attributes require additional setup beyond SDK integration.

---

### Data Points

Data points are consumed when a user profile is updated or the user performs specific actions (session start/end, custom events, purchases).

**Not counted as data points:**
- Push tokens
- Device information
- Campaign engagement events (email opens, push clicks)

Data points affect billing and pricing — track only high-impact data.

---

### Segments

Segments target users by demographic, behavioral, social, or technical criteria (attributes + events).

**Critical behavior:** Segments are **dynamic** — users flow in and out continuously. Segment membership is evaluated at send time, not at creation time.

**Best practices:**
- Combine standard + custom attributes for precise targeting
- Use event-based segments to target behavioral patterns
- Segment membership can be viewed on individual user profiles under the Engagement section
