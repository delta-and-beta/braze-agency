---
name: engagement-tools-segments-user-profiles
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/segments/user_profiles
indexed_at: '2026-04-05'
keywords:
  - profiles
  - segments
  - campaigns
  - engagement
  - messaging
  - subscription
  - devices
  - webhooks
  - predictions
  - attributes
triggers:
  - find user
  - check campaign receipt
  - debug sends
  - view engagement history
  - verify subscription status
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's architecture are atomic knowledge units stored in `skills/{name}/references/*.md`. They're designed for fast lookup at the "Default" depth (Sonnet), so removing Liquid template tags, image references, and nav boilerplate is essential — these add noise without semantic value for an LLM routing queries.
`─────────────────────────────────────────────────`

## User Profiles

User profiles store all persistent data associated with a user. They're the primary tool for troubleshooting, testing, and inspecting engagement history.

### Searching for a User

Navigate to **Search Users** and search by:
- External user ID
- Braze ID
- Email
- Phone number (converted to E.164 format; invalid numbers are unsearchable)
- Push token
- User alias: format `[user_alias]:[alias_name]` (e.g., `amplitude_id:user_123`)

Multiple matches can be merged individually or via bulk user merge.

### Common Use Cases

| Goal | Where to Look |
|------|--------------|
| Find device/OS for a user | Overview tab |
| Check user language | Overview tab |
| Verify campaign receipt | Engagement tab |
| Check segment membership | Engagement tab |
| Verify push/email opt-in status | Engagement tab |
| Debug unexpected sends or non-sends | Engagement tab → Contact Settings |

### Profile Sections

#### Overview Tab

| Category | Data |
|----------|------|
| Profile | Gender, age group, location, language, locale, time zone, birthday |
| Sessions | Count, first/last session dates, apps used |
| Custom attributes | Attribute names, values (including nested) |
| Recent devices | Device count, device details, advertising IDs |
| Custom events | Event names, counts, last performed timestamps |
| Purchases | Lifetime revenue, last purchase, total count, purchase list |

#### Engagement Tab

| Category | Data |
|----------|------|
| Contact settings | Email/SMS/push subscription status, subscription groups, push token changelog |
| Campaigns received | List of received campaigns with timestamps |
| Segments | Segments this user belongs to |
| Communication stats | Last message received per channel |
| Install attribution | How/when the user installed the app |
| Canvas messages received | Canvas messages received with timestamps |
| Predictions | Churn prediction and event prediction scores |
| Miscellaneous | Random bucket number |

#### Messaging History Tab

Shows ~40 recent messaging events from the **past 30 days**, including:
- Messages sent, received, and interacted with
- Covers: email, SMS, push, in-app messages, Content Cards, webhooks

**Limitations:**
- Not updated after a user is merged
- API-triggered sends without a campaign ID do not appear

Each event shows: channel, event type, timestamp, associated campaign/Canvas, and device data. Use **Filters** to narrow by event type.

`★ Insight ─────────────────────────────────────`
The condensed format drops Liquid template refs (`{{site.baseurl}}`), `{% alert %}` block wrappers, and image busters — all Jekyll-specific. What remains is pure semantic content that the MCP semantic search can embed and retrieve accurately. This is the key difference between a raw doc scrape and a Nick topic file.
`─────────────────────────────────────────────────`
