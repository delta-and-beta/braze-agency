---
name: engineer-in-app-messages
description: >-
  Creating and customizing in-app messages using traditional and drag-and-drop
  editors.
metadata:
  role: braze-engineer
  topics:
    - in-app-traditional-create
    - in-app-traditional-customize
    - in-app-traditional-templates
    - in-app-traditional-dark-mode
    - in-app-traditional-video
    - in-app-traditional-html-in-app-messages
    - in-app-traditional-email-capture-form
    - in-app-traditional-color-profiles-and-css
    - in-app-messages-traditional
    - in-app-messages-drag-and-drop
    - in-app-messages-creative-details
    - in-app-messages-faq
    - in-app-messages-ios-app-rating-prompt
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
The `plugin-dev:skill-development` skill enforces progressive disclosure: keep SKILL.md to 1,500–2,000 words and push detailed reference material into `references/` files. Since the user asked for just the markdown body (no frontmatter), I'll write a lean, implementation-focused body that references supporting files Claude should load as needed.
`─────────────────────────────────────────────────`

Here is the generated skill body:

---

# In-App Message Building

Build, customize, and configure in-app messages and in-browser messages in Braze — from selecting an editor and message type through advanced HTML composition, video embedding, dark mode theming, and reusable color profiles.

## Scope and Lens

This skill covers **implementation**: the practical steps to construct, configure, and deliver in-app messages using both the traditional and drag-and-drop (DnD) editors. Apply it when:

- Creating a new in-app or in-browser message campaign or Canvas step
- Choosing between message types (slideup, modal, fullscreen, HTML, DnD)
- Writing or customizing HTML messages with JavaScript bridge calls
- Embedding video content in an HTML message
- Building an email capture form
- Applying or creating dark mode themes
- Saving and reusing color profiles or CSS templates
- Triggering an iOS App Store rating prompt via Braze
- Diagnosing delivery, eligibility, or trigger behavior questions

## Topics Synthesized

| Topic | What It Covers |
|-------|----------------|
| Traditional In-App Messages Overview | Message types, trigger behavior, session-based delivery |
| Drag & Drop In-App Messages | DnD editor blocks, layout options, editor constraints |
| In-App Message Templates | Dashboard-saved message templates and reuse workflow |
| Create Traditional In-App Message | Step-by-step creation via campaign, Canvas, and API |
| In-App Creative Details | Slideup, modal, fullscreen specs and layout constraints |
| HTML In-App Messages | Custom HTML, JavaScript bridge, asset uploads, preview |
| In-App Video Messages | `<video>` element setup, remote and uploaded asset handling |
| Email Capture Form | Prompt-and-submit flow, user profile email update |
| Color Profiles & CSS | Dashboard-saved color palettes and CSS template reuse |
| In-App Dark Mode | System-level dark mode config per platform, CSS strategies |
| iOS App Rating Prompt | SKStoreReviewController integration and eligibility rules |
| In-App Messages FAQ | In-browser vs. in-app, rate limits, re-eligibility |

---

## Editor Types

### Traditional Editor

Use the traditional editor for:

- Slideup, modal, fullscreen, and custom HTML message types
- Fine-grained control over font, color, button layout, and on-click behavior
- API-triggered campaigns requiring precise payload control

### Drag & Drop Editor

Use the DnD editor for:

- Rapid visual composition without writing code
- Reordering content blocks (image, text, button, divider)
- Messages authored or reviewed by non-technical stakeholders

**Constraint**: The DnD editor does not support arbitrary HTML injection. For full HTML control, select the **HTML** message type in the traditional editor instead.

---

## Creating an In-App Message

### Via Campaign

1. Navigate to **Messaging > Campaigns > Create Campaign > In-App Message**.
2. Select delivery: **Scheduled**, **Action-Based**, or **API-Triggered**.
3. Choose the message type (slideup, modal, fullscreen, HTML, or DnD).
4. Build message content in the editor.
5. Configure trigger event, target audience, and conversion goals.
6. Review and launch.

### Via Canvas

1. Add an **In-App Message** step to a Canvas flow.
2. Configure whether the step advances on a schedule or on user action.
3. Note: Canvas in-app messages display the next time a user opens the app after reaching the step — they are not real-time server pushes.

### Via API

For API-triggered in-app messages:

1. Create a campaign with **API-Triggered Delivery**.
2. Call `/campaigns/trigger/send` or `/canvas/trigger/send`.
3. Pass `trigger_properties` in the request body to inject dynamic content at send time via Liquid (e.g., `{{trigger_properties.${promo_code}}}`).

---

## Message Types and Creative Specs

| Type | Position | Best For |
|------|----------|----------|
| **Slideup** | Top or bottom of screen | Lightweight alerts, feature announcements |
| **Modal** | Centered overlay | Confirmations, short-form content |
| **Fullscreen** | Entire screen | Onboarding flows, high-impact promotions |
| **HTML** | Custom rendered view | Complex layouts, video, capture forms |
| **Drag & Drop** | Custom visual layout | Non-coded composition |

For pixel dimensions, image size limits, and button count constraints per type, consult `references/creative-details.md`.

---

## HTML In-App Messages

HTML messages give full layout and interaction control. Key implementation details:

**Asset Upload**: Upload local images, CSS, and fonts via the dashboard asset uploader. Braze hosts them and returns CDN URLs; reference them in HTML directly.

**JavaScript Bridge**: Use `brazeBridge` (newer SDKs) or `appboyBridge` (legacy) to call SDK methods from within the HTML:

```javascript
// Log a button click
brazeBridge.logClick('button-primary');

// Close the message
brazeBridge.closeMessage();

// Write email to user profile
brazeBridge.getUser().setEmail('user@example.com');

// Log a custom event
brazeBridge.logCustomEvent('rating_prompt_shown');
```

**SDK Prerequisite**: Set `allowUserSuppliedJavascript: true` during SDK initialization (iOS and Android) to enable the JavaScript bridge.

**Preview**: Use the dashboard preview panel for layout checks. For interaction testing, send a **Test Send** to a device registered in the dashboard.

### Embedding Video

To include video in an HTML in-app message:

```html
<video width="100%" autoplay muted playsinline controls>
  <source src="https://cdn.example.com/promo.mp4" type="video/mp4">
</video>
```

- Use `autoplay` + `muted` — browsers and iOS require muted for autoplay to fire.
- Use `playsinline` to prevent full-screen takeover on iOS.
- For uploaded assets, use the Braze CDN URL returned after upload.
- All remote video URLs must be HTTPS.

---

## Email Capture Form

The email capture form is a pre-built HTML message type that:

1. Displays a text input prompting for an email address.
2. On submit, calls `brazeBridge.getUser().setEmail(value)` to write the address to the user profile.
3. Automatically closes the message after successful submission.

To use: select **Email Capture Form** from the message type picker. Customize copy, button label, and colors — the submit logic is pre-wired and does not require custom JavaScript.

---

## Reusable Templates

### Color Profiles

1. Navigate to **Templates > In-App Message Templates > Color Profiles**.
2. Define hex values for background, text, and button colors.
3. Apply the profile when composing any traditional message — the palette populates automatically.

### CSS Templates

1. Navigate to **Templates > In-App Message Templates > CSS Templates**.
2. Write and save a CSS block.
3. Select the template when creating an HTML message to auto-populate the CSS panel. Useful for brand-consistent typography and spacing across multiple campaigns.

### Message Templates

Save any composed message as a reusable template via **Save as Template** in the editor. Templates capture the full layout, copy, and settings — useful for recurring message types that share consistent structure.

---

## Dark Mode

Dark mode support allows messages to respect the user's system-level color preference (Android 10+ and iOS 13+).

### Traditional Editor

- Toggle **Dark Mode** in the message settings panel to define an alternate color palette.
- Specify background, text, and button colors for dark environments.
- The Braze SDK switches palettes automatically based on `UIUserInterfaceStyle` (iOS) or `Configuration.uiMode` (Android).

### HTML Messages

Use the CSS `prefers-color-scheme` media query for HTML-level dark mode:

```css
@media (prefers-color-scheme: dark) {
  body {
    background-color: #1a1a1a;
    color: #f0f0f0;
  }
  .cta-button {
    background-color: #3a86ff;
  }
}
```

---

## iOS App Rating Prompt

To prompt users to rate the app via Braze:

1. Trigger a standard Braze in-app message (e.g., a modal: "Are you enjoying the app?").
2. On the positive action button, call `SKStoreReviewController.requestReview()` from native code — wire this via a deep link, custom event, or SDK delegate.
3. **Do not call `requestReview()` unconditionally** — Apple enforces a limit of 3 prompts per 365-day period per app installation. Use Braze audience filters to target engaged users (e.g., session count ≥ 5, no prior rating event logged).

---

## Delivery and Trigger Behavior

- In-app messages are **triggered client-side**: the SDK evaluates trigger conditions locally against a message queue fetched at session start.
- Messages are not real-time server pushes — new messages become eligible at the next session start.
- **Re-eligibility**: Configure per-campaign whether a user can receive the same message more than once, and the re-eligibility window.
- **Frequency cap**: Apply a global impression cap under **Settings > Global Message Settings** to prevent message overexposure across campaigns.
- **In-browser messages**: Functionally equivalent to in-app messages but delivered via the Braze Web SDK. The same APIs, trigger logic, and message types apply; the distinction is the runtime environment (browser vs. native app).

---

## Additional Resources

For detailed reference material, load as needed:

- **`references/creative-details.md`** — Slideup, modal, and fullscreen size constraints, image specs, button limits per type
- **`references/html-messages.md`** — Full JavaScript bridge API surface, asset upload workflow, preview and test tooling
- **`references/dark-mode.md`** — Platform-specific dark mode SDK configuration and CSS `prefers-color-scheme` patterns
- **`references/faq.md`** — Common questions on in-browser vs. in-app differences, trigger rate limits, re-eligibility windows, and session timing

`★ Insight ─────────────────────────────────────`
- The progressive disclosure pattern used here keeps the SKILL.md body to ~1,500 words by deferring pixel specs, full bridge API tables, and platform-specific SDK flags to `references/` files — Claude loads those only when the query requires them, preserving context window budget.
- Separating the "via Campaign / via Canvas / via API" creation paths early in the skill helps Claude match the user's delivery architecture before recommending configuration steps — a detail that's easy to miss but changes which settings are relevant.
- The `brazeBridge` / `appboyBridge` dual-name callout reflects a real SDK migration; surfacing it in the skill prevents Claude from confidently recommending a deprecated API name to an engineer on an older SDK version.
`─────────────────────────────────────────────────`
