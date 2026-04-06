---
name: strategist-content
description: >-
  Content cards, banners, templates, media library, landing pages, and Canvas
  template design for rich in-app and web experiences.
metadata:
  role: braze-strategist
  topics:
    - message-building-by-channel-content-cards-create
    - message-building-by-channel-content-cards-create-card-creation
    - message-building-by-channel-content-cards-creative-details
    - >-
      message-building-by-channel-content-cards-best-practices-improving-low-latency-requirements
    - message-building-by-channel-content-cards-testing
    - message-building-by-channel-content-cards-reporting
    - message-building-by-channel-banners-create
    - message-building-by-channel-banners-custom-code
    - message-building-by-channel-banners-faq
    - message-building-by-channel-banners-testing
    - message-building-by-channel-banners-analytics
    - engagement-tools-templates-and-media-media-library
    - engagement-tools-templates-and-media-managing-templates
    - engagement-tools-templates-and-media-image-specs
    - engagement-tools-templates-and-media-content-blocks
    - engagement-tools-templates-and-media-canvas-templates
    - engagement-tools-templates-and-media-faqs
    - engagement-tools-landing-pages-creating-pages
    - engagement-tools-landing-pages-personalizing-pages
    - engagement-tools-landing-pages-customizing-urls
    - engagement-tools-landing-pages-retargeting
    - engagement-tools-landing-pages-tracking-users
    - engagement-tools-landing-pages-about-tracking-data
    - message-orchestration-templates
    - message-orchestration-cms-dam
    - message-orchestration-ab-testing
    - message-personalization-creative-studio-figma
    - message-personalization-creative-studio-canva
    - templates-jasper
    - templates-knak
    - templates-stensul
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
Nick's skill SKILL.md files serve dual purpose: they're both documentation for humans AND routing signals for Claude's auto-discovery. The description frontmatter (not included here per the request) is what Claude actually pattern-matches against — the body is what loads into context when the skill triggers.
`─────────────────────────────────────────────────`

Here is the generated skill body:

---

# Content Design & Management

Apply this skill when designing, building, or managing user-facing content assets in Braze — including Content Cards, Banners, landing pages, templates, media, and Canvas-level creative. This skill synthesizes the full content lifecycle: from asset creation and personalization through analytics, retargeting, and third-party creative tool integration.

**Lens**: Visual design, content lifecycle, and user-facing asset management. Treat every content surface as both a design artifact and a data-producing touchpoint — creative choices have downstream reporting and retargeting implications.

---

## Scope of This Skill

### Content Cards

Content Cards deliver persistent, feed-style content inside mobile and web apps. Use for notification centers, promotions, and contextual recommendations.

**Card types and specs:**
- **Classic Card** — icon + text; best for notifications and categorized items
- **Captioned Image** — image + header + body; for rich promotions
- **Banner Image** — full-width image with no text overlay; purely visual

**Creation path:**
- Build via **Campaigns** (single-step delivery) or **Canvases** (journey-based, behavioral targeting)
- Card creation timing controls when Braze evaluates audience eligibility — choose **At campaign launch** (immediate) or **At first impression** (deferred, personalized at display time)
- Minimum SDK versions: Swift 5.2.0 / Android 8.0.0 for deferred creation

**Performance optimization:**
- For high-visibility surfaces (e.g., homepage banners), mitigate latency by pre-fetching cards, minimizing Connected Content calls in card content, and controlling refresh frequency in the SDK
- Avoid excessive refresh cycles — each refresh is a network round-trip

**Reporting access:**
- Campaign-level: **Campaigns > [Campaign] > Analytics**
- Canvas step-level: available per Content Card step in the Canvas analytics view
- Key metrics: impressions, clicks, dismissals, CTR, revenue (if conversion tracking enabled)

**Testing:**
- Use internal test groups or the **Preview** panel before launch
- Source documentation for Content Cards testing is sparse — defer to Braze's general campaign QA workflow

---

### Banners

Banners are persistent, contextually placed content surfaces rendered via the Braze SDK — distinct from Content Cards in that they are positioned within specific app UI regions rather than a feed.

**Custom code and JavaScript bridge:**
- Banners use the same JavaScript bridge as HTML in-app messages
- The Braze SDK **cannot** automatically attach click listeners to elements inside Banner HTML — explicitly wire click events using `brazeBridge.logClick()` or custom JS
- Failure to attach listeners means click events won't log, breaking analytics

**Analytics access:**
- Navigate to Banner campaign > **Analytics** tab
- Both campaign-level and message-level performance data are available
- Track impressions, clicks, and custom conversion events

**Testing:**
- Banner-specific testing documentation is minimal; use preview devices and internal groups
- Validate JavaScript bridge interactions in a test environment before production launch

**FAQ highlights:**
- Banner placements are registered in the SDK, not in the dashboard — coordinate with mobile/web engineers for placement IDs
- Banners do not expire unless a campaign end date is set

---

### Landing Pages

Landing pages are hosted Braze pages for form capture, lead generation, and campaign-specific experiences — no external hosting required.

**Creating landing pages:**
- Build from **Messaging > Landing Pages** in the dashboard
- Supports Liquid personalization for dynamic content (e.g., personalized headlines, user-specific offers)
- Use `{% landing_page_url %}` Liquid tag in emails or messages to generate tracked, user-linked URLs

**URL customization:**
- Connect a custom subdomain (e.g., `forms.yourbrand.com`) in **Settings > Landing Pages**
- Subdomain setup requires DNS CNAME configuration — coordinate with your domain administrator
- Without a custom subdomain, Braze hosts pages on a default Braze domain

**User tracking:**
- The `{% landing_page_url %}` tag links form submissions back to the submitting user's **existing** Braze profile — prevents duplicate profile creation
- Works across all channels: email, push, in-app messages, Content Cards

**Retargeting after submission:**
Two approaches:
1. **Segment-based**: Create a segment filtering on "submitted landing page [X]" — use for broad retargeting
2. **Canvas continuation**: Trigger a Canvas step after submission for real-time journey progression

**Web SDK initialization on landing pages:**
- SDK initializes on form submission OR when a Liquid `{% if %}` block evaluates (if page uses Liquid)
- Be aware: SDK initialization triggers session tracking — factor this into attribution models

---

### Media Library

Centralized asset management for all Braze campaigns. Navigate to **Templates > Media Library**.

**Key behaviors:**
- Assets in in-app messages are **pre-cached** by the Braze SDK for faster display — preferred over external CDN links for in-app use
- No storage limits; maximum **5 MB per file**
- Assets are retained for the entire duration of your account — no automatic expiration
- Supported types: images (PNG, JPG, GIF, SVG), fonts, and other media

**Image specifications:**
- Recommended dimensions vary by channel and card type — consult the `references/` files for channel-specific specs
- Use PNG for assets requiring transparency; JPG for photographic content; GIF for animation (be aware of file size limits)

**Templates and media FAQs:**
- Assets can be used across multiple campaigns simultaneously
- Deleting a media library asset does not automatically update campaigns referencing it — audit before deletion

---

### Content Blocks

Reusable, cross-channel content managed from **Templates > Content Blocks**.

**Use cases:**
- Email headers, footers, unsubscribe language (legally required copy)
- Shared offer codes or promotional banners
- Pre-approved brand copy that must appear consistently

**Key behaviors:**
- Content Blocks support Liquid — personalization within a block is evaluated at send time
- Updating a Content Block propagates to all active campaigns using it — changes are **live immediately**
- Version history is not maintained — archive before modifying if rollback is needed

---

### Templates

**Managing templates:**
- Duplicate: Select the cog icon on the template card > **Duplicate**
- Archive: Select the cog icon > **Archive** — archived templates are hidden but not deleted
- Bulk operations: Select multiple templates for batch archive or duplicate

**Template partners** (for email template creation outside Braze):
- **Stensul** — mobile-responsive email builder; exports directly to Braze campaigns
- **Knak** — enterprise drag-and-drop email builder with brand governance; pushes to Braze
- **Jasper** — AI-generated copy and content; integrates with Braze for on-brand messaging at scale
- **Taxi for Email** — collaborative email production with Braze export

**Creative studio partners** (for visual asset design):
- **Figma** — design and prototype; use the Braze Figma plugin to export component specs and assets
- **Canva** — graphic design for social, presentation, and campaign assets; use the Braze integration to push assets directly to the Media Library

---

### Canvas Templates

Canvas Templates provide reusable journey blueprints. Source documentation for Canvas Templates is minimal — consult the Braze dashboard's template gallery and the Canvas documentation for step-by-step configuration.

Use Canvas Templates when:
- Standardizing onboarding, re-engagement, or lifecycle journeys across campaigns
- Creating repeatable multi-channel sequences with consistent logic

---

### A/B Testing, CMS/DAM, and Orchestration

**A/B testing:**
- Source documentation is minimal for dedicated A/B testing of content assets — use Braze's built-in multivariate testing at the campaign or Canvas level
- Test card copy, images, CTAs, and timing as separate variants

**CMS & DAM integration:**
- Source documentation is minimal — for organizations with existing DAM systems, the Media Library API and Content Blocks API support programmatic asset management
- Coordinate with engineering for webhook-based or API-based DAM sync workflows

---

## Content Lifecycle Decision Map

| Task | Where to build |
|---|---|
| One-time promotional card | Campaign > Content Card |
| Behavior-triggered card sequence | Canvas > Content Card step |
| Persistent app placement | Banner campaign |
| Form capture / lead gen | Landing Page |
| Shared email footer | Content Block |
| Reusable journey structure | Canvas Template |
| Brand asset management | Media Library |
| External email design | Template partner (Stensul, Knak, Taxi) |
| Visual asset creation | Creative studio partner (Figma, Canva) |

---

## Additional References

Consult the `references/` directory for detailed topic documentation:

- **`references/content-cards-creative-details.md`** — Card type specs, field limits, image dimensions
- **`references/create-content-cards.md`** — Step-by-step creation workflow
- **`references/content-card-creation-details.md`** — Creation timing, SDK version requirements
- **`references/improving-content-card-low-latency.md`** — Performance optimization patterns
- **`references/content-card-reporting.md`** — Metrics reference and analytics access
- **`references/banner-custom-code.md`** — JavaScript bridge usage and click listener patterns
- **`references/banner-analytics.md`** — Banner performance metrics
- **`references/creating-landing-pages.md`** — Landing page builder walkthrough
- **`references/personalizing-landing-pages.md`** — Liquid personalization patterns
- **`references/customizing-landing-page-urls.md`** — Custom subdomain setup
- **`references/landing-page-user-tracking.md`** — Profile linking and `{% landing_page_url %}`
- **`references/landing-page-retargeting.md`** — Segment and Canvas retargeting methods
- **`references/about-landing-page-tracking-data.md`** — Web SDK initialization behavior
- **`references/media-library.md`** — Asset management and pre-caching behavior
- **`references/content-blocks.md`** — Reusable block creation and live-update behavior
- **`references/managing-templates.md`** — Duplicate, archive, and bulk operations
- **`references/templates-and-media-faqs.md`** — Storage, retention, and common questions
- **`references/figma-creative-studio-partner.md`** — Figma integration setup
- **`references/canva-creative-studio-partner.md`** — Canva integration setup
- **`references/stensul-template-partner.md`** — Stensul export workflow
- **`references/knak-template-partner.md`** — Knak brand governance and export
- **`references/jasper-template-partner.md`** — Jasper AI content generation integration
- **`references/templates-orchestration-overview.md`** — Taxi for Email and orchestration tools

`★ Insight ─────────────────────────────────────`
The references section mirrors Nick's `references/` subdirectory pattern exactly — each bullet maps to a topic file that already exists in the pipeline output. This design means the SKILL.md stays lean (~1,800 words here) while Claude can load individual topic files on demand rather than frontloading all 30+ topic files into context at once.
`─────────────────────────────────────────────────`
