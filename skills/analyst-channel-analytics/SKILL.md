---
name: analyst-channel-analytics
description: >-
  Channel-specific analytics for push notifications, in-app messages, content
  cards, and banners.
metadata:
  role: braze-analyst
  topics:
    - analytics-logging-channel-data
    - analytics-logging-channel-data-push-notifications
    - analytics-logging-channel-data-in-app-messages
    - analytics-logging-channel-data-content-cards
    - in-app-messages-logging-message-data
    - content-cards-logging-analytics
    - banners-analytics
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
Notice how the topic content itself reveals a structural pattern in the Braze docs: several topics use Jekyll's `{% multi_lang_include %}` / `{% sdktabs %}` partials, meaning the canonical analytics content lives in shared template files — not the main doc pages. A good skill should surface this so Claude knows to look for per-SDK method signatures rather than expecting a single unified API.
`─────────────────────────────────────────────────`

Here is the generated skill body:

---

# Channel Analytics

## Scope and Purpose

This skill covers analytics instrumentation and measurement across Braze's four primary messaging channels: **push notifications**, **in-app messages (IAMs)**, **content cards**, and **banners**. It synthesizes the tracking methods, SDK hooks, and engagement events that Braze exposes for each channel — and the critical distinction that most analytics logging is **not automatic**.

Use this skill when answering questions about:

- Why impressions, clicks, or dismissals aren't appearing in the Braze dashboard
- How to instrument custom display UI for IAMs, content cards, or banners
- Which SDK method to call for a specific analytics event on a given platform
- How attribution and unique recipient counts are calculated per channel
- Differences in analytics behaviour between default Braze UI and custom implementations

## Analytical Lens

This skill approaches channel data from a **channel measurement perspective**: the priority is understanding what engagement events are available, when they fire, and how to ensure they reach Braze reliably. Questions about creative design, message copy, or audience segmentation fall outside this skill's scope — prefer the Campaigns or Segmentation skills for those.

Key analytical concerns covered here:

| Concern | Channels |
|---|---|
| Manual vs. automatic logging | IAM, Content Cards, Banners |
| Impression deduplication / unique recipients | Content Cards |
| Click and button-level attribution | IAM, Push |
| Dismissal tracking | Content Cards |
| SDK-per-platform method signatures | All channels |

## Topics Synthesized

### In-App Message (IAM) Analytics

Braze SDKs expose hooks for **impressions**, **clicks**, and **button interactions**. These must be called explicitly when using a custom display implementation — the default Braze UI handles them automatically, but any custom renderer bypasses automatic tracking. Platform-specific method names vary; consult the SDK tab for your target platform.

Key events: `logImpression`, `logClick`, `logButtonClick`

### In-App Message Channel Data

Covers the per-platform SDK method signatures for IAM analytics events across Web, iOS (Swift/Obj-C), Android, React Native, Flutter, and other supported SDKs. Source documentation uses Jekyll `{% sdktabs %}` / `{% multi_lang_include %}` partials — SDK-specific content lives in shared template files, not the main doc page.

### Content Card Analytics Logging

Content Card analytics — impressions, clicks, and unique recipient counts — **require explicit logging**. The default Braze UI handles this automatically, but custom feed implementations must call the logging methods directly. Failing to log impressions means cards will not be marked as seen and re-eligibility logic will be affected.

Key events: `logImpression`, `logClicked`, `logDismissed`

### Content Card Channel Data

Covers the per-platform SDK method signatures for Content Card analytics. Impressions, clicks, and dismissals are not tracked automatically in custom implementations. SDK method names and call patterns differ by platform.

### Push Notification Channel Data

Push analytics instrumentation is largely handled by the OS and Braze SDK automatically for standard push. Source documentation for this topic relies on Jekyll SDK tab partials — the actual per-SDK content lives in shared include files rather than the main page. Direct SDK interaction is typically required only for custom notification handling scenarios.

### Banner Analytics

Banner analytics content in Braze's documentation is delivered via a Liquid `{% multi_lang_include %}` shared partial — the canonical content lives in a template include rather than a standalone page. When investigating banner-specific metrics, expect the same impression/click logging pattern as other channels but verify the current SDK documentation for banner-specific method names.

### Logging Channel Data

A general topic covering the Braze analytics logging model. Source documentation for this topic was minimal. The core principle: **Braze does not infer engagement from rendering** — your code must explicitly call the appropriate logging method at the right moment in the display lifecycle.

## When to Use vs. Other Skills

| Question type | Skill to use |
|---|---|
| "My click events aren't showing up for my custom IAM" | **This skill** |
| "How do I create a content card campaign?" | Campaigns skill |
| "Which users received my push?" | Audience / Segmentation skill |
| "How do I use Currents to stream events?" | Data Export / Currents skill |
| "What SDK version supports content card dismissal logging?" | **This skill** + SDK changelog |

## Common Pitfalls

- **Custom UI bypasses automatic logging.** Any channel rendered with a custom implementation requires explicit analytics calls. This is the most common source of missing impression and click data.
- **Content card impressions affect re-eligibility.** Not logging impressions means Braze treats the card as unseen — users may receive the same card repeatedly.
- **SDK method names are not uniform across platforms.** Always confirm the target platform's method signature; the Braze docs use shared partials that expand per SDK tab.
- **Button clicks on IAMs require a separate log call** from the overall message click — both can be tracked independently.
