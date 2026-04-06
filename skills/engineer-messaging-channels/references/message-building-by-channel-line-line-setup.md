---
name: message-building-by-channel-line-line-setup
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/line/line_setup
indexed_at: '2026-04-05'
keywords:
  - LINE
  - webhook
  - messaging
  - integration
  - subscription
  - channel
  - followers
  - API
  - credentials
  - profiles
triggers:
  - how to set up LINE
  - integrate LINE channel
  - configure LINE webhook
  - sync LINE followers
  - import LINE users
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick are atomic knowledge units nested under `skills/{id}/references/` — they're designed to be self-contained snippets that can be retrieved independently by the router, so removing Jekyll templating (`{{site.baseurl}}`, `{% alert %}`) and navigation boilerplate is essential for clean embedding/retrieval.
`─────────────────────────────────────────────────`

## LINE Setup

Integrates Braze with LINE's Messaging API channel to send LINE messages and sync subscriber states.

### Prerequisites

- LINE business account (official account)
- **Verified or premium** account status — required to sync existing followers
- LINE developers account
- LINE Messaging API channel
- Sending LINE messages consumes Braze Message Credits

### Account Types

| Type | Badge | Search Visible | Notes |
|------|-------|----------------|-------|
| Unverified | Gray | No | Default on creation |
| Verified | Blue | Yes | Japan, Taiwan, Thailand, Indonesia only |
| Premium | Green | Yes | Granted by LINE at their discretion |

Verified or premium status is required to sync followers into Braze. Request verification via: **Official Account > Settings > Information Disclosure Verification Status > Request Account Verification**.

### Integration Steps (Overview)

1. Import/update existing LINE users
2. Integrate the LINE channel
3. Reconcile user IDs
4. Change user update methods
5. *(Optional)* Merge user profiles

> One LINE account per Braze workspace. Use separate workspaces for multiple LINE accounts.

---

### Step 1: Import Existing LINE Users

Skip if you have no pre-existing users with known LINE IDs.

Update user profiles using `/users/track`, CSV import, or Cloud Data Ingestion. Set `native_line_id` on each profile.

- Do **not** specify subscription group state — LINE is the source of truth and will sync automatically.

### Step 2: Integrate LINE Channel

After integration, Braze auto-pulls the channel's followers. LINE IDs matched to existing profiles are updated to "subscribed"; unmatched IDs create anonymous profiles.

#### 2.1 — Webhook Settings (LINE Console)

1. Go to **Messaging API** tab → **Webhook settings**
2. Set **Webhook URL** to `https://anna.braze.com/line/events` *(Braze adjusts this per dashboard cluster)*
3. Enable **Use webhook** and **Webhook redelivery**
4. Under **Response settings**:
   - Disable **Greeting message** (handle via Braze follow trigger)
   - Disable **Auto-response messages**
   - Enable **Webhooks**

#### Collect from LINE Providers Tab

| Field | Where to Find |
|-------|---------------|
| Provider ID | Provider > Settings > Basic information |
| Channel ID | Provider > Channels > your channel > Basic settings |
| Channel secret | Provider > Channels > your channel > Basic settings |
| Channel access token | Provider > Channels > your channel > Messaging API → Issue if missing |

#### 2.2 — Connect in Braze

1. Navigate to **Technology Partners > LINE**
2. Enter: Provider ID, Channel ID, Channel secret, Channel access token
3. Add Braze cluster IPs to LINE's IP allowlist if using IP whitelisting
4. Braze auto-generates a subscription group for each successfully connected LINE integration

> Verify the channel secret is correct — an incorrect secret causes subscription status inconsistencies.

---

### Setting `native_line_id`

Set via server-side methods if the client SDK has no dedicated field:
- `/users/track` endpoint
- CSV import
- Cloud Data Ingestion
