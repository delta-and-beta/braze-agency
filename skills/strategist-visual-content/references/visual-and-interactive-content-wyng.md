---
name: visual-and-interactive-content-wyng
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/message_personalization/dynamic_content/visual_and_interactive_content/wyng
indexed_at: '2026-04-05'
keywords:
  - wyng
  - interactive
  - zero-party
  - subscriptions
  - integration
  - api
  - mapping
  - connector
  - events
  - personalization
triggers:
  - how to connect wyng to braze
  - configure braze connector
  - map wyng fields to braze
  - troubleshoot integration failures
  - send zero-party data
---
## Wyng Interactive Content Integration

Wyng builds interactive digital experiences (quizzes, preference centers, promotions) that collect zero-party data and personalize in real time. The Braze-Wyng integration passes that zero-party data into Braze for campaign personalization and segmentation.

**Maintained by:** Wyng ([contact@wyng.com](mailto:contact@wyng.com))

---

### Prerequisites

- Active Wyng account
- Braze REST API key with `users.track` permissions (create at **Settings > API Keys**)

---

### Setup (3 Steps)

#### 1. Connect in Wyng
Navigate to **Integrations**, open the **Add** tab, hover over **Braze**, and click **Connect**.

#### 2. Configure the Braze Connector
In the configuration window:

1. **Enter your Braze REST API key**
2. **Select the Wyng campaign** to share with Braze
3. **Configure data objects** (all three sections):

   - **Subscriptions (required)** — Click **Add Subscription**, enter group name and ID. Repeat for multiple groups.
   - **User track** — Click **Add custom property** to send attribute/event object pairs to `/users/track`. Supports hard-coded attribute values per transaction.
   - **Custom events (optional)** — Enable **Sending custom event**, then provide event name and app ID.

4. **Map fields** — Use **Select a field** to map Wyng fields to Braze API fields. Click **Save**. Saved mappings appear under **Integrations > Manage**.

#### 3. Test
Submit the Wyng campaign form (or use preview mode to avoid adding production records). Verify a successful transaction appears in the **Integration** dashboard.

---

### Usage

Once connected, any Wyng field mapped to Braze behaves like any other Braze data field:
- Trigger campaigns
- Segment audiences
- Feed personalized content

---

### Troubleshooting: Failed Submissions

1. In the Integration dashboard, click **View Log** under the Actions header
2. The log shows: failed submission details, retry count, raw data, and error message
3. Click **View Error** to see the error code — cross-reference with Braze error documentation to diagnose
4. A **re-push** link is available to retry the submission

For unresolved issues, contact [support@wyng.com](mailto:support@wyng.com).

`★ Insight ─────────────────────────────────────`
- The original doc uses Jekyll liquid tags (`{% image_buster %}`) for images — these are stripped here since they're build-time artifacts, not useful in a standalone reference file
- The three data object types (subscriptions, user track, custom events) map directly to Braze's `/users/track` payload shape — subscriptions via `subscription_groups`, attributes/events via the standard track body, and custom events as the `events` array
- Zero-party data (willingly shared by consumers) has regulatory advantages over third-party data — this is the core value prop of the Wyng integration worth surfacing in agent context
`─────────────────────────────────────────────────`
