---
name: engineer-email-composition
description: >-
  Building email campaigns using HTML editor, drag-and-drop editor, and template
  systems.
metadata:
  role: braze-engineer
  topics:
    - email-templates-link-template
    - email-templates-link-aliasing
    - email-templates-html-email-template
    - email-templates-faq
    - email-templates-email-template
    - email-html-editor-css-inline
    - email-html-editor-creating-an-email-campaign
    - email-html-editor-gmail-promotions-tab
    - email-drag-and-drop-overview
    - email-drag-and-drop-faq
    - email-drag-and-drop-dnd-email-style-settings
    - email-drag-and-drop-dnd-editor-blocks
    - email-drag-and-drop-dnd-content-blocks
    - email-universal-links
    - email-transactional-message-api-campaign
    - email-templates
    - email-html-editor
    - email-drag-and-drop
    - email-custom-email-footer
    - email-faq
    - email-apple-mail
    - email-best-practices-email-styling
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
Skill bodies for Nick-generated plugins synthesize multiple raw topic docs into a single coherent reference. The challenge is **progressive disclosure**: keep the body lean (~1,500–2,000 words) so the full body loads in context on trigger, while individual topic details live in `references/`. Here, since the user asked for just the body markdown, the topics are woven directly in rather than split across files.
`─────────────────────────────────────────────────`

Here is the generated skill body:

---

# Email Composition

## Purpose

This skill covers the end-to-end implementation of email content in Braze—choosing the right editor, building reusable templates, applying styling, configuring link tracking, and deploying campaigns or transactional messages. Use it when building, configuring, or customizing email content for campaigns or Canvases.

---

## Choosing an Editor

Braze provides two email composition paths. Select based on the team's technical capability and design requirements:

| Editor | Best For | Key Constraint |
|--------|----------|----------------|
| **Drag-and-drop (DnD)** | No-code layouts, rapid iteration, non-technical authors | Limited to DnD-native Content Blocks |
| **HTML editor** | Pixel-perfect control, custom logic, existing HTML templates | Requires HTML/CSS knowledge |

Both editors support Liquid personalization, Content Blocks, and link aliasing.

---

## HTML Editor

### Uploading a Template

To upload a custom HTML email template:

1. Navigate to **Templates > Email Templates** in the Braze dashboard.
2. Select **From File** and upload a `.html` file.
3. Give the template a name and save—it becomes available for reuse across campaigns.

### Troubleshooting HTML Rendering

When test emails render incorrectly:

- Verify that inline CSS is applied—many email clients strip `<style>` tags from `<head>`.
- Enable **CSS inlining** in Braze to automatically move stylesheet rules into element `style=""` attributes at send time. This is a preprocessing step; enable it per-template in the HTML editor settings.
- CSS inlining does not process styles already defined inline or styles inside `<style>` tags scoped to specific selectors that conflict with inlined rules—test with major clients after enabling.

### Custom Email Footer

Set a workspace-wide footer to satisfy unsubscribe requirements and avoid rewriting it per template:

1. Go to **Settings > Email Preferences > Custom Footer**.
2. Define footer content using standard Liquid, including `{{${email_footer}}}`.
3. Insert `{{${email_footer}}}` in any HTML template where the footer should appear.

The footer inherits no default styling—apply inline CSS directly in the footer definition.

---

## Drag-and-Drop Editor

### Building a Campaign

To create an email using the DnD editor:

1. Start a new email campaign or Canvas email step.
2. Select **Drag-and-Drop Editor** as the composition mode.
3. Drag editor blocks from the left panel into the canvas. Available block types include:
   - **Image** — inline images with alt text and link support
   - **Text** — rich text with inline styling
   - **Button** — CTA blocks with configurable link targets
   - **Divider**, **Spacer**, **HTML** (for custom markup injection)
4. Configure each block's properties in the right panel.

### Global Style Settings

Apply consistent typography, colors, and spacing across the entire email without configuring each block individually:

1. Open **Global Style Settings** from the DnD editor toolbar.
2. Set default font family, font size, link color, background color, and padding.
3. Global settings apply as defaults; individual block overrides take precedence.

### DnD Content Blocks

Content Blocks in the DnD editor are **DnD-specific**—they are not interchangeable with HTML Content Blocks used in the HTML editor. To create one:

1. Navigate to **Templates > Content Blocks**.
2. Build the block using the DnD editor.
3. Insert it into any DnD email campaign via the **Content Blocks** section in the editor panel.

DnD Content Blocks support Liquid and inherit global style settings from the parent template where used.

### Dark Mode Preview

To preview how an email renders in dark mode: use the **Preview & Test** tab and select the **Dark Mode** toggle. Dark mode rendering is client-specific; Braze shows an approximation—validate with actual device/client testing for critical campaigns.

---

## Email Templates

### Template Reuse

Templates created in either editor are accessible under **Templates > Email Templates**. To use a saved template:

1. Start a new email campaign.
2. Select **From Template** and choose the template.
3. The campaign inherits the template's content; changes do not propagate back to the original template.

Templates support both HTML and DnD formats—they are not cross-compatible between editor types.

### View In Browser Link

To add a "view this email in a browser" link:

- In HTML templates: include a link pointing to `{{${email_web_url}}}`.
- This Liquid variable resolves to a hosted version of the sent email; it is only valid after send, so do not use it in previews or tests.

---

## Link Management

### Link Templates

Link templates allow consistent URL construction by prepending prefixes or appending query parameters to every link in an email. Use them for:

- UTM parameter standardization across a campaign
- Redirect/proxy URL wrapping
- Affiliate tracking parameter injection

To configure a link template:

1. Go to **Settings > Email Preferences > Link Templates**.
2. Define the prefix or suffix pattern.
3. Apply the template to an email campaign during composition—it processes all links at send time.

Link templates apply globally to a message; exclude specific links by marking them with the **Exclude from link template** checkbox in the link editor.

### Link Aliasing

Link aliasing assigns a stable alias to each link in an email, enabling:

- Retargeting based on which links a user clicked
- Consistent click tracking across template edits

To use link aliasing:

1. Enable it at the workspace level under **Settings > Email Preferences**.
2. Aliases are assigned automatically when composing; customize alias names in the link panel.
3. Use aliases in segmentation filters: **Clicked Alias** with the specific alias name.

Link aliasing is incompatible with certain redirect setups—test click tracking in a campaign preview before sending.

---

## Gmail Promotions Tab

To populate Gmail's Promotions tab card with rich annotations (deal badge, product image, expiry date):

1. Add `<script type="application/ld+json">` structured data to the email `<head>` using the `PromotionCard` schema.
2. Key fields: `name`, `description`, `image`, `url`, `discount`, `availabilityStarts`, `availabilityEnds`.
3. Test via Google's [Gmail Promotions Annotator](https://developers.google.com/gmail/promotab/) tool before sending.

Gmail annotations are advisory—Google decides whether to display them and may ignore malformed or unverified markup.

---

## Universal Links and App Links

Configure universal links (iOS) and App Links (Android) to ensure email links open inside the native app rather than a browser:

- **iOS**: Host an `apple-app-site-association` (AASA) file at `/.well-known/apple-app-site-association` on the link domain. Braze's click-tracking domain must either be bypassed or configured to pass through to the app's domain.
- **Android**: Host a `assetlinks.json` file at `/.well-known/assetlinks.json`.

When using Braze link tracking (default), configure the tracking subdomain to support universal links—contact Braze support to enable universal link passthrough on the click-tracking domain if needed.

---

## Transactional Email

Transactional emails (receipts, password resets, confirmations) use the **Transactional Email campaign type**, which bypasses subscription state checks and sends to all users regardless of opt-in status.

To create a transactional email:

1. Select **Transactional Email** as the campaign type.
2. Compose content in the HTML or DnD editor as normal.
3. Send via the [Transactional HTTP API endpoint](https://www.braze.com/docs/api/endpoints/messaging/send_messages/post_send_transactional_message/)—not via standard campaign scheduling.

Transactional campaigns require explicit use case justification; do not use them for promotional content.

---

## Email Styling Best Practices

Apply these conventions for consistent, high-performing emails:

- **Subject line**: Target 6–10 words for highest open rates.
- **Preheader text**: Set a 85–100 character preheader; it appears alongside the subject line in inbox previews.
- **Image alt text**: Always populate—many clients block images by default.
- **Mobile-first layout**: Use single-column layouts that reflow cleanly at 320px width.
- **Inline all CSS**: Rely on Braze CSS inlining or manually inline styles before upload; avoid relying on `<style>` blocks.
- **Apple Mail Privacy Protection (MPP)**: MPP prefetches email content, inflating open rates. Avoid using open-rate metrics as the sole success signal for campaigns targeting Apple Mail users; supplement with click-based engagement metrics.

---

## Topics Synthesized

This skill draws from the following reference areas:

- Email Link Template and Link Aliasing — dynamic URL construction and click tracking
- HTML Email Template upload and HTML Editor troubleshooting
- Email Templates FAQ — common template questions and edge cases
- Gmail Promotions Tab setup — structured data annotations
- CSS Inlining — preprocessing behavior and limitations
- Creating an Email Campaign — HTML composition workflow
- Drag-and-Drop Editor (overview, FAQ, style settings, blocks, Content Blocks)
- Email Styling Best Practices — subject lines, preheaders, image handling
- Universal Links and App Links — native app deep linking from email
- Transactional Email API — triggered send workflow
- Custom Email Footer — workspace-wide footer configuration
- Apple Mail Privacy — open rate measurement caveats

---

`★ Insight ─────────────────────────────────────`
The "Topics Synthesized" section at the bottom is a useful navigation aid in Nick-generated skills—it tells Claude which reference areas were consulted, making it easier for the model to know where to dig deeper (e.g. into a `references/` file) rather than hallucinating details. It also communicates coverage boundaries so Claude knows when a question falls outside this skill's scope.
`─────────────────────────────────────────────────`
