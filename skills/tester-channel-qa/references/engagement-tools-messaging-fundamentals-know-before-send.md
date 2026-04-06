---
name: engagement-tools-messaging-fundamentals-know-before-send
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/messaging_fundamentals/know_before_send
indexed_at: '2026-04-05'
keywords:
  - ratelimits
  - frequencycap
  - controlgroup
  - canvas
  - push
  - sms
  - email
  - segmentation
  - compliance
  - throughput
triggers:
  - before sending a campaign
  - frequency capping rules
  - push notification requirements
  - sms compliance and laws
  - email volume and IP warming
---
## Know Before You Send — Pre-Launch Checklist

### General

**Check before sending:**
- **API rate limits**: Review workspace rate limits to avoid errors. Batch requests where possible; contact your CSM to increase limits (requires lead-time).
- **Frequency capping overrides**: Transactional messages (e.g., delivery notifications) should have frequency capping toggled off so they always reach users regardless of caps.

**Key behaviors to know:**
- **Global control groups**: A percentage of users won't receive any campaigns/Canvases. Exceptions can be set via exclusion settings. Export these users via CSV or API.
- **Canvas rate limits**: Rate limit applies to the entire Canvas, not individual steps. A 10,000/min limit on a multi-step Canvas is capped at the first step.
- **Frequency capping scope**: Applies to push, email, SMS, and webhooks — NOT to in-app messages or Content Cards.
- **Frequency capping timing**: Calculated by calendar day in the user's timezone, not 24-hour periods. A user at 11pm local time can receive another message an hour later.

> Contact Braze Support within 30 days of an issue — diagnostic logs only go back 30 days.

---

### Email

**Check before sending:**
- **Customer consent**: Obtain permission before sending. See Braze Acceptable Use Policy.
- **Volume per IP**: 2M emails/day per IP is the recommended ceiling for a properly warmed IP.
  - Higher consistent volume → use multiple IPs in an IP pool to avoid soft bounces and reputation damage.
  - Short burst send → research how quickly target providers accept mail to determine IP count needed.

**Key behaviors to know:**
- Sending capacity depends on: mailbox provider infrastructure size and sender reputation at each mailbox/domain.
- Review Braze email best practices; contact your Account Team for deliverability services.

---

### Push

**Check before sending:**
- **Subscription status**: Users must be opted-in (iOS) or subscribed (Android) AND have `Push Enabled = True` to receive push.
- **Android 13**: Introduces a major change in push notification permission management — review the Android 13 SDK upgrade guide.

**Key behaviors to know:**
- **Web push**: Works identically to mobile app push. Requires Braze Web SDK setup.
- **Single-app targeting**: Review segmentation differences when targeting a specific app and its users.

---

### SMS

**Check before sending:**
- **Allotments and throughput**: Confirm your account's short code/long code allotments and their throughput capacity match your send volume and time window.
  - Formula: `Audience × SMS segments = Throughput needed`
- **Segment estimation**: Use the SMS segment calculator to estimate segments from your copy. Factor segment count into throughput planning.
- **Legal compliance**: Review SMS laws, regulations, and abuse prevention rules. Consult legal counsel before sending.

**Key behaviors to know:**
- SMS messages default to sending from the short code in the sender pool.
- **Alphanumeric sender IDs**: Two-way messaging does not work with alphanumeric sender IDs — one-way only.
- **US throughput**: Changed with A2P 10DLC registration — verify current throughput limits for US sends.
