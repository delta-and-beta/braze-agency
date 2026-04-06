---
name: message-building-by-channel
source_url: 'https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel'
indexed_at: '2026-04-05'
keywords:
  - messaging
  - channel
  - urgency
  - accessibility
  - push
  - email
  - SMS
  - routing
  - campaigns
  - content
triggers:
  - how to choose a messaging channel
  - when to use push vs email
  - building accessible messages
  - message routing by urgency
  - channel selection strategy
---
## Message Building by Channel Index

### Channel Selection Framework

Choose a channel by balancing two factors:

| Factor | Definition | High | Low |
|--------|------------|------|-----|
| **Content** | Visual richness, multimedia support | Rich media, embedded assets | Plain text |
| **Urgency** | Speed of notification and attention capture | Immediately visible (push) | Requires app login |

### Braze Messaging Matrix

Maps **Content Complexity** vs **Delivery Urgency**:

| | High Urgency | Low Urgency |
|-|-------------|------------|
| **Simple Content** | Mobile/web push | In-app / browser messages |
| **Rich Content** | Email | Content Cards |

**Exceptions:** SMS and WhatsApp are high-urgency and scale to rich content when using multimedia (MMS, rich messaging formats).

### Accessibility Requirements

When implementing messages, ensure:
- Alt text is added to images
- Content is structured for assistive technologies (screen readers)
- Implementation meets accessibility standards (coordinate with engineering)

Key resources:
- [Accessible Messaging Foundations](https://learning.braze.com/accessible-messaging-foundations) — Braze Learning course on accessibility principles
- [Building Accessible Messages](https://www.braze.com/docs/help/accessibility/) — adding alt text and structuring content in Braze

`★ Insight ─────────────────────────────────────`
- The 2×2 matrix (urgency × content richness) is a reusable mental model for channel routing logic — worth referencing in any skill that involves campaign or Canvas channel selection.
- SMS/WhatsApp intentionally break the matrix's clean quadrants, so any routing heuristic should treat them as conditional based on message format, not fixed-position.
- Accessibility guidance is separated from channel selection deliberately — it applies cross-channel regardless of the matrix position chosen.
`─────────────────────────────────────────────────`
