---
name: engagement-tools-messaging-fundamentals-localization-right-to-left-messages
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/messaging_fundamentals/localization/right_to_left_messages
indexed_at: '2026-04-05'
keywords:
  - RTL
  - localization
  - bidirectional
  - rendering
  - Arabic
  - Hebrew
  - punctuation
  - emoji
  - promo codes
  - diacritical marks
triggers:
  - how to create RTL messages
  - detect rendering direction
  - RTL message preview
  - Arabic text formatting
  - bidirectional text handling
---
## Right-to-Left Messages

RTL message rendering is controlled by the user's device OS and language settings — dashboard previews are not reliable indicators of final appearance.

### How to Detect Rendering Direction

Check punctuation and emoji placement:
- **Standard (LTR):** exclamation point and emoji appear at the **end** of sentences
- **RTL:** exclamation point and emoji appear at the **beginning** of sentences

### Creating an RTL Message

1. Draft the message in the Braze editor
2. Copy the text and convert it using a localization tool
3. Paste the converted text back into Braze
4. Verify formatting and alignment:
   - Drag-and-drop or HTML email: use the RTL/LTR toggle button in the composer
   - Other channels: use a separate word processor to verify

### Considerations

**Long Push Notifications**
- The copy-paste method breaks down with multi-line content — word placement and alignment can shift
- Workaround: paste in small installments (e.g., 5 words at a time) with line breaks between each installment
- **Preview & Test is built for LTR** — RTL messages won't render correctly there; send test messages to a real device instead

**Bi-directional Text**
- Many RTL users mix languages (e.g., Hebrew text with an English brand name)
- Braze cannot handle bi-directional formatting automatically
- Options: avoid bi-directional text entirely, or separate LTR and RTL segments with line breaks
- **Promo codes** are typically LTR — place them at the end of the message after a line break, or use an image

**Special Characters, Numbers, and Emojis**
- Punctuation, math symbols, currency, numbers, bullet points, and emojis can shift position unpredictably
- Workaround: compose in an external word processor with proper formatting, then paste into Braze
- Avoid placing emojis at the start of text; separate them from text using line breaks

**Arabic Font Sizing**
- Arabic fonts are rendered smaller to accommodate diacritical marks (accent marks above/below letters)
- Use font sizes ~20% larger than you would for Latin/Roman alphabet languages to achieve equivalent readability
