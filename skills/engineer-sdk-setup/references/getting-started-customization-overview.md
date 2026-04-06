---
name: getting-started-customization-overview
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/getting_started/customization_overview
indexed_at: '2026-04-05'
keywords:
  - customization
  - styling
  - analytics
  - templates
  - components
  - SDK
  - messaging
  - branding
  - dashboard
  - configuration
triggers:
  - how to customize Braze UI
  - override default styling
  - implement custom analytics tracking
  - configure Content Card appearance
---
## Customization Overview

Braze offers three tiers of customization ("crawl, walk, run") that scale by effort and developer involvement. Start with default `BrazeUI` components and customize as needed.

---

### The Three Approaches

#### Crawl — Low Effort (0–1 hrs dev work)
Marketers control content, audience, and timing via the dashboard. Minimal dev setup required.

| Dimension | Detail |
|---|---|
| Card style | Default Braze templates |
| Behavior | Default behavior options |
| Analytics | Captured automatically in Braze |
| Key-value pairs | Optional — enables additional UI/UX customization |

Best for: teams with limited dev resources or simple content needs.

---

#### Walk — Moderate Effort (0–4 hrs dev work)
Hybrid approach: devs customize look-and-feel (fonts, colors, border radius) via code while marketers retain dashboard control over audience, content, on-click behavior, and expiration.

| Dimension | Detail |
|---|---|
| UI | Braze templates with programmatic styling overrides |
| Behavior | Default behavior options |
| Analytics | Captured automatically in Braze |
| Key-value pairs | Optional — enables additional UI/UX customization |

Best for: teams that need brand-consistent styling without full custom builds.

---

#### Run — Variable Effort (1–8+ hrs dev work)
Developers own the full UX. Custom code controls appearance, behavior, and cross-channel interactions (e.g., triggering a Content Card from a push notification).

| Dimension | Detail |
|---|---|
| UI | Fully custom |
| Behavior | Fully custom |
| Analytics | **Must be implemented manually** — call SDK analytics methods explicitly |
| Key-value pairs | Required |

**Critical:** When building fully custom components (new Content Card types, bespoke in-app message UI), the SDK does **not** auto-track analytics. You must call the SDK's analytics methods programmatically to report impressions, clicks, and dismissals back to Braze. Each channel has a dedicated analytics article covering this.

---

### Cross-Functional Guidance

- Marketing and engineering should coordinate closely during customization.
- When developers build new UI or functionality, document the behavior and backend integration for marketers.
- The SDK serves two core roles: syncing user data to consolidated profiles, and handling messaging channels (in-app messages, push, Content Cards).
