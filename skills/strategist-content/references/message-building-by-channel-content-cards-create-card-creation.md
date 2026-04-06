---
name: message-building-by-channel-content-cards-create-card-creation
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/content_cards/create/card_creation
indexed_at: '2026-04-05'
keywords:
  - cards
  - campaign
  - canvas
  - audience
  - eligibility
  - personalization
  - timing
  - impression
  - session
  - anonymous
triggers:
  - how to create content cards
  - when do content cards expire
  - reach anonymous users with cards
  - configure card creation timing
  - personalize content cards
---
## Content Card Creation Details

Card creation timing controls **when** Braze evaluates audience eligibility and personalizes a Content Card.

**Minimum SDK versions required:** Swift 5.2.0 / Android 23.0.0 / Web 4.2.0

---

## Creation Timing Options

### In Campaigns (Scheduled Delivery)

| Option | Behavior |
|--------|----------|
| **At campaign launch** | Eligibility + personalization evaluated at launch; card stored until user opens app |
| **At first impression** *(recommended)* | Eligibility evaluated at launch; personalization (Liquid, Connected Content) evaluated when user starts their next session |

> Expiration countdown begins at **campaign launch** regardless of option.

### In Canvas (Message Step)

| Option | Behavior |
|--------|----------|
| **At step entry** | Eligibility evaluated at Canvas step entry; card stored until user opens app |
| **At first impression** *(recommended)* | Eligibility evaluated at step entry; personalization evaluated when user starts their next session |

> Expiration countdown begins at **Canvas step entry** regardless of option.

**Anonymous users in Canvas:** If you need anonymous users to see a card in their *first* session, use a **campaign** instead of Canvas. Anonymous users entering a Canvas have already started a session, so they won't receive the card until their next session.

---

## Comparison: Launch/Entry vs. First Impression

| Dimension | At Launch / Step Entry | At First Impression |
|-----------|------------------------|---------------------|
| **When to use** | Content must be snapshotted at a specific time | Need latest personalization, or need to reach new/anonymous users post-launch |
| **Audience** | Evaluated at send time; new/anonymous users missed if they join after launch | Evaluated at next session start; wider reach including new/anonymous users; rate limiting **not** applicable |
| **Personalization** | Liquid, Connected Content, Content Blocks evaluated at launch/step entry | Evaluated at first impression or next recurrence interval |
| **"Messages Sent" metric** | = cards created and stored (regardless of views) | = cards sent after a session start; lower send volume expected; Canvas users who enter without a session aren't counted |
| **Processing time** | All cards created at launch for entire segment | Card created on demand at first view; ~1–2 sec delay on first impression |

> **Note:** Once a card is created (by either method), Braze does **not** re-evaluate audience eligibility or personalization.

---

## Key Considerations

- **Don't change creation method after launch** — switching between options post-launch skews "Messages Sent" accuracy.
- **Large audiences** → prefer *At First Impression* so cards are available quickly after launch without a bulk creation bottleneck.
- **Session-triggered campaigns** may benefit from switching to *At First Impression* (via scheduled delivery) for better performance.
