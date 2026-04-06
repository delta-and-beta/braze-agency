---
name: in-app_messages-creative_details-modal
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/in-app_messages/creative_details/modal
indexed_at: '2026-04-05'
keywords:
  - modal
  - overlay
  - in-app
  - messaging
  - creative
  - layout
  - image
  - responsive
  - sales
  - giveaway
triggers:
  - how to create modal in-app messages
  - designing modal message layouts
  - modal message best practices
  - creating overlay prompts
  - mobile modal specifications
---
`★ Insight ─────────────────────────────────────`
Topic files in this pipeline are atomic knowledge units — they live inside a skill's `references/` directory and are designed to be self-contained snippets that can be retrieved and composed at query time, without needing surrounding context.
`─────────────────────────────────────────────────`

## Modal In-App Messages

Modals appear centered on the device screen with a background overlay, making them visually prominent. Best suited for high-priority prompts like sales, giveaways, or calls to action that require user attention.

### Layout

- Positioned in the **center of the screen** with a translucent overlay behind it
- Contains an image region and a text region
- Overlay helps the modal stand out from the app background

### Image Specifications

| Property | Recommendation |
|---|---|
| Format | PNG, JPG, GIF |
| Aspect ratio | 29:10 (landscape) recommended for top-of-message images |
| File size | Under 5 MB |
| Safe zone | Keep key content centered to avoid crop on various screen sizes |

### Large Screen Behavior

On tablets and desktop browsers, modals retain their centered layout — they do **not** expand to fill the larger viewport. The message sits in the center of the screen just as it does on a phone, maintaining consistent presentation across device sizes.

### Use Cases

- Flash sales or limited-time offers
- Giveaway announcements
- Feature discovery prompts that require deliberate user action
