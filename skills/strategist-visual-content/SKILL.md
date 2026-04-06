---
name: strategist-visual-content
description: >-
  Integrates visual and interactive content partners for rich messaging
  experiences in Braze campaigns.
metadata:
  role: braze-strategist
  topics:
    - visual-and-interactive-content-movable-ink
    - visual-and-interactive-content-storyly
    - visual-and-interactive-content-stylitics
    - visual-and-interactive-content-niftyimages
    - visual-and-interactive-content-cloudinary
    - visual-and-interactive-content-playable
    - visual-and-interactive-content-seen
    - visual-and-interactive-content-judo
    - visual-and-interactive-content-yotpo
    - visual-and-interactive-content-wyng
    - visual-and-interactive-content-wsc-sports
    - visual-and-interactive-content-worthy
    - visual-and-interactive-content-videosmart
    - visual-and-interactive-content-odicci
    - visual-and-interactive-content-future-anthem
    - personalization-engines-movable-ink
    - personalized-recommendations-movable-ink
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
A few design choices inform how this skill is structured:
- **Categorizing by integration pattern** (URL-based, Connected Content, SDK, webhook) is more durable than organizing by partner name — patterns stay stable even as partners change or add features
- **The "lens" belongs in the strategy section**, not just the header — framing it as explicit decision criteria (render fidelity, personalization depth, zero-party data, channel fit) gives Claude actionable guidance rather than just a label
- **Partner tables over prose lists** — tables with capability + integration method let Claude quickly match a campaign need to the right tool without reading every reference file
`─────────────────────────────────────────────────`

---

# Visual & Interactive Content

Apply this skill when designing Braze campaigns that incorporate third-party visual assets, personalized imagery, interactive experiences, or rich video content. The skill covers the full ecosystem of visual and interactive content partners integrated with Braze — from dynamic image personalization to story-format experiences and personalized video delivery.

## Scope and Purpose

Modern messaging campaigns increasingly rely on visual and interactive elements to capture attention and drive action. This skill synthesizes knowledge across Braze's visual and interactive content partner ecosystem, enabling strategic decisions about which tools to use, how to integrate them, and how to maximize engagement through rich content experiences.

The **visual engagement lens** means approaching every recommendation from the standpoint of how content will render, personalize, and perform across channels — email, push, in-app messages, and Content Cards.

## Partner Categories

### Dynamic Image & Visual Personalization

Partners that generate or transform images at send time, enabling 1:1 visual personalization without manual asset creation:

| Partner | Core Capability | Integration Method |
|---|---|---|
| **Movable Ink** | Real-time personalized images and data-driven visual content | Liquid templating + Connected Content |
| **NiftyImages** | Dynamic email images using Braze merge tags | URL-based, no Braze connector required |
| **Cloudinary** | DAM-connected dynamic image/video delivery | Connected Content or URL transformation |
| **Stylitics** | Automated product bundle visualization for email | Connected Content (triggered campaigns) |
| **Yotpo** | UGC reviews and loyalty badges in visual content | Connected Content API calls |

### Personalized Video

Partners that generate, deliver, or embed video content personalized to the individual recipient:

| Partner | Core Capability | Channel |
|---|---|---|
| **Seen** | Personalized video generation from Braze user data | Email (Connected Content) |
| **Playable** | Auto-play video in email (98%+ inbox support) | Email |
| **WSC Sports** | Personalized sports highlight videos | Push notifications |
| **VideoSmart** | Interactive personalized video via Connected Content | Email, web |

### Interactive Experience Delivery

Partners that deliver interactive, story-format, or gamified content within or alongside Braze campaigns:

| Partner | Core Capability | Integration Method |
|---|---|---|
| **Storyly** | Story-format content targeted to Braze segments | SDK (custom attribute targeting) |
| **Judo** | No-code interactive in-app experiences | SDK (server-driven UI) |
| **Wyng** | Quizzes, preference centers, and zero-party data capture | Connected Content + webhooks |
| **Odicci** | Gamification and loyalty-driven interactive content | Audience sync + webhooks |
| **Worthy** | Drag-and-drop rich in-app experiences | Connected Content (auto-generated APIs) |

### AI-Driven Personalization Engines

Partners that combine visual delivery with machine learning recommendations:

| Partner | Core Capability | Use Case |
|---|---|---|
| **Movable Ink (Personalization)** | AI content decisioning for visual blocks | Email, push personalization at scale |
| **Movable Ink (Recommendations)** | Product and content recommendations surfaced visually | Cross-sell, re-engagement |
| **Future Anthem** | Real money gaming player personalization (Amplifier AI) | Casino, sports, lottery verticals |

## Visual Engagement Lens

When evaluating visual and interactive content integrations, apply these strategic considerations:

**Render fidelity across environments** — Email clients vary dramatically in support for rich content. Playable video works in 98%+ of inboxes; animated GIFs are universal but heavier; static fallbacks must always exist. Assess the fallback chain before recommending a partner.

**Personalization depth vs. complexity** — NiftyImages requires no Braze connector but offers shallow personalization (merge tags only). Movable Ink offers deep behavioral and real-time data-driven personalization but requires connector setup. Match depth to campaign sophistication.

**Zero-party data as an outcome** — Interactive partners (Wyng, Odicci, Storyly) are not just display tools; they are data capture mechanisms. Frame recommendations that include these partners in terms of what preference or behavioral data will flow back into Braze user profiles.

**Channel fit** — Push notifications support limited visual richness (WSC Sports video thumbnails, rich push images). Email supports the widest range. In-app messages (Judo, Worthy) enable the richest interactivity. Match partner to channel capability.

**Connected Content latency** — Real-time personalization via Connected Content adds API call latency at send time. For high-volume sends, evaluate caching strategies and Connected Content rate limits.

## Integration Patterns

### URL-Based Image Personalization

The simplest pattern: embed a partner-generated URL with Braze merge tags in the `src` attribute of an `<img>` tag. No Braze connector required; personalization resolves at render time in the email client. Used by NiftyImages and Cloudinary URL transformations.

### Connected Content API Calls

Use Braze's Connected Content block to call partner APIs at send time. The API returns content (image URLs, HTML snippets, video embed codes) that Liquid renders into the message. Requires API credentials stored as Connected Content variables. Used by Movable Ink, Stylitics, Yotpo, VideoSmart, and Worthy.

### SDK + Segment Targeting

Partner SDK is installed in the app. Braze segments or custom attributes are passed to the partner SDK to control which experiences display to which users. No message-level integration — targeting happens at the app layer. Used by Storyly, Judo, and Odicci.

### Webhook + Data Sync

Partner captures interaction data (quiz responses, loyalty points, review submissions) and sends it back to Braze via webhook or API, enriching user profiles. Combined with Connected Content for outbound delivery. Used by Wyng, Odicci, and Yotpo.

### User Data Export → Content Generation → Retrieval

Braze exports user data to the partner, the partner generates personalized content (video, image), and the generated asset URL is retrieved via Connected Content and embedded in the message. Used by Seen and WSC Sports.

## Reference Topics

Detailed integration specifics for each partner are documented in the `references/` directory:

- `references/movable-ink-personalization.md` — Movable Ink Personalization Engine
- `references/movable-ink-visual.md` — Movable Ink Visual Content
- `references/movable-ink-recommendations.md` — Movable Ink Recommendations
- `references/storyly.md` — Storyly Interactive Content
- `references/stylitics.md` — Stylitics Visual Content
- `references/niftyimages.md` — NiftyImages Visual Content
- `references/cloudinary.md` — Cloudinary Visual Content
- `references/playable.md` — Playable Interactive Content
- `references/seen.md` — Seen Personalized Video
- `references/judo.md` — Judo Interactive Content
- `references/yotpo.md` — Yotpo Visual Content
- `references/wyng.md` — Wyng Interactive Content
- `references/wsc-sports.md` — WSC Sports Visual Content
- `references/worthy.md` — Worthy Visual Content
- `references/videosmart.md` — VideoSmart Visual Content
- `references/odicci.md` — Odicci Interactive Content
- `references/future-anthem.md` — Future Anthem Visual Content

---

`★ Insight ─────────────────────────────────────`
The structure above follows Nick's progressive disclosure architecture: the SKILL.md body (~900 words) stays lean by deferring all partner-specific detail to `references/` files. At query time, only the relevant partner's reference file loads into context — so a question about NiftyImages doesn't burden Claude with Movable Ink's full API surface, and vice versa. This is the key reason Nick uses `references/` subdirectories rather than embedding everything in SKILL.md.
`─────────────────────────────────────────────────`
