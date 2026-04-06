---
name: message-building-by-channel-line-create-message-types
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/line/create/message_types
indexed_at: '2026-04-05'
keywords:
  - carousel
  - imagemap
  - text
  - image
  - buttons
  - liquid
  - personalization
  - interactive
  - clickable
  - limits
triggers:
  - Build a carousel message for LINE
  - Create an image map with tappable regions
  - Add clickable links to LINE messages
  - Send personalized text with Liquid
  - What are the LINE message types and specs
---
## LINE Message Types

LINE supports four message types in the composer, each with distinct specs and use cases.

---

## Text

- Up to **5,000 characters**
- Supports emojis and Liquid personalization

**Use cases:** limited-time promotions, personalized birthday greetings, event updates

---

## Image

Sources: media library, URL, or Liquid. Images are standalone — no clickable links.

**Use cases:** destination inspiration, seasonal promotions, sale countdowns

### URL Image Specs

| Spec | Value |
|------|-------|
| URL length | 2,000 chars max |
| Format | PNG, JPEG |
| File size | 10 MB max |

**Supports:** Liquid dynamic images, Connected Content, Braze Catalogs

---

## Rich Messages (Image Map)

An image with one or more tappable areas, each linked to a URI. Choose a template to define link regions.

**Use cases:** product grids with links, interactive menus, multi-promotion layouts

### Image Map Specs

| Spec | Value |
|------|-------|
| URL length | 2,000 chars max |
| Format | PNG (transparent ok), JPEG |
| Aspect ratio | 1:1 (square) |
| File size | 10 MB max |

### URI Link Specs

| Spec | Value |
|------|-------|
| Character count | 1,000 max |
| Schemes | HTTP, HTTPS, LINE, tel |

### Text (within rich message)
- Up to **400 characters**

---

## Card-Based (Carousel)

Horizontally scrollable cards; users tap a card or its buttons to take action.

**Use cases:** menu item promotions, seasonal highlights, product sampling

### Message Specs

| Spec | Value |
|------|-------|
| Columns | 10 max |
| Aspect ratio | Rectangle 1.51:1 / Square 1:1 |
| Title | 40 chars max |

### Image Specs

| Spec | Value |
|------|-------|
| Image URL | 2,000 chars max |
| Format | JPEG or PNG |
| Width | 1,024 px |
| File size | 1 MB |

### Text Specs

| Spec | Value |
|------|-------|
| Characters (no image/title) | 120 max |
| Characters (with image or title) | 60 max |
| Actions per card | 3 max |

---

## Quick Reference

| Type | Key Limit | Supports Links |
|------|-----------|----------------|
| Text | 5,000 chars | No |
| Image | 10 MB | No |
| Rich Message | 10 MB image, 400 char text | Yes (tappable regions) |
| Card-Based | 10 cols, 1 MB/image | Yes (buttons) |

`★ Insight ─────────────────────────────────────`
The carousel's image file size limit (1 MB) is 10x stricter than standalone images (10 MB) — worth flagging when advising on asset preparation for card-based campaigns.

The rich message URI scheme list (`HTTP, HTTPS, LINE, tel`) is notable: the `LINE` scheme allows deep-linking into LINE features (chats, profiles), and `tel` enables tap-to-call — both are easily overlooked in favor of plain HTTPS links.
`─────────────────────────────────────────────────`
