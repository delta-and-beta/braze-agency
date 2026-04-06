---
name: personalization-and-dynamic-content-promotion-codes-manage
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/personalization_and_dynamic_content/promotion_codes/manage
indexed_at: '2026-04-05'
keywords:
  - promotion
  - codes
  - Liquid
  - Canvas
  - deduction
  - channels
  - multichannel
  - attributes
  - messages
  - Currents
triggers:
  - how to manage promotion codes
  - inserting unique codes in messages
  - reusing codes across Canvas steps
  - viewing promotion code usage
  - handling code deduction
---
## Managing Promotion Codes

### Prerequisites
Create a promotion code list before use.

### Basic Usage
1. Select **Copy Snippet** next to a promotion code list
2. Paste the snippet into a Braze message
3. Use Liquid to insert unique codes — each used code is marked as sent (no duplicates)

### Canvas Multi-Step Behavior
- Each Canvas step with a promotion code snippet assigns the user a **new** code per step
- To reuse one code across steps:
  1. **User Update step** (first step): assign the code to a custom attribute (e.g., `Promo Code`) using the Liquid snippet `{% promotion('spring25') %}`
  2. **Later steps**: reference the attribute via `{{custom_attribute.${Promo Code}}}`
- Multichannel sends within the same step use the **same code** across all channels (email + push = one code)

### Channel-Specific Notes
| Channel | Behavior |
|---|---|
| In-app messages | Code deducted only when message is **displayed** (not sent) |
| Test/seed sends | Codes **are consumed** by default — contact your account manager to disable |
| Currents | Supports Liquid promotion codes via message extras |

### Code Deduction Mechanics
Codes are deducted **before** the message sends to ensure:
- Same codes used across channels in multichannel sends
- No extra codes consumed if a message fails or aborts

**Important edge case**: If a message uses Liquid conditional logic with two promo lists, **both lists are deducted** regardless of which branch the user follows:
```liquid
{% if user.is_vip %}
  {% promotion('vip-deal') %}
{% else %}
  {% promotion('regular-deal') %}
{% endif %}
```
Both `vip-deal` and `regular-deal` are deducted here.

> If a promotion code list runs out or expires, subsequent messages are **aborted**. Upload more codes than estimated.

### Viewing Usage
- **Promotion Codes** page → **Remaining** column shows current count
- Export unused codes as CSV from the promotion code list detail page
