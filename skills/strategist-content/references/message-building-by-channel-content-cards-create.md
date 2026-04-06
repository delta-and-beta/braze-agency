---
name: message-building-by-channel-content-cards-create
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/content_cards/create
indexed_at: '2026-04-05'
keywords:
  - campaigns
  - canvases
  - content-cards
  - messaging
  - variants
  - audiences
  - images
  - pinned
  - expiration
  - Liquid
triggers:
  - how to create content cards
  - build a content card campaign
  - set up canvas messaging
  - compose content card messages
  - configure card expiration and delivery
---
# Create Content Cards

## Where to Build

**Campaigns** — single, simple messaging (one message to users)  
**Canvases** — multi-step journeys (tailored messaging based on behavior over time)

### Campaign Setup
1. **Messaging** > **Campaigns** > **Create Campaign** > **Content Cards** (or Multichannel)
2. Name, add teams/tags, add variants
3. Tip: Compose message before adding variants, then use **Copy from Variant**

### Canvas Setup
1. Add a **Message step** in Canvas builder
2. Select **Content Cards** as the messaging channel
3. Choose audience eligibility timing: **step entry** or **first impression** (recommended)
4. Optionally remove cards when users complete a purchase or custom event
5. Set card expiration: duration or specific time
6. Configure audience filters in **Delivery Settings** (checked after delay, at send time)

---

## Card Types

| Type | Description | Best For |
|------|-------------|----------|
| **Classic** | Bolded title, message text, optional image left-aligned | Square images/icons |
| **Captioned Image** | Large attention-grabbing image with copy below | Visual content with context |
| **Image Only** | Full image, GIF, or creative non-text content | Pure visual impact |

All types work on both mobile apps and web.

---

## Compose Tab Options

### Language
- **Add Languages** inserts Liquid conditional logic for multi-language support
- Select languages *before* writing content to place text in correct Liquid blocks
- Supports right-to-left messages (rendering depends on service provider)

### Content Fields
- **Title & Message** — no character limit; clear and concise recommended. Not available for Image Only cards.
- **Image** — via Media Library upload or URL. Fields limited to **2 KB total**.
- **Pin to Top** — card appears at top of feed, user cannot dismiss. Multiple pinned cards ordered chronologically. **Cannot retroactively update after send.**
- **On-click behavior** — options: deep link into app or external URL. Update **Link Text** to match chosen behavior.

---

## Key Constraints
- Content Card message fields: **2 KB total size limit**
- Pinned card setting: **only affects future sends** after campaign is live
- Canvas Content Card steps can be **scheduled or action-based**
