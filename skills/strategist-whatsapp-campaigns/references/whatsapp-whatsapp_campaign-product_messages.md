---
name: whatsapp-whatsapp_campaign-product_messages
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/whatsapp/whatsapp_campaign/product_messages
indexed_at: '2026-04-05'
keywords:
  - whatsapp
  - catalog
  - product
  - commerce
  - webhook
  - template
  - checkout
  - cart
  - messaging
  - meta
triggers:
  - send product messages
  - create catalog message
  - set up product catalog
  - manage commerce products
  - configure checkout flow
---
## WhatsApp Product Messages

Send interactive WhatsApp messages showcasing products directly from a Meta catalog. Users can browse products, add to cart, place orders, and are redirected to your site/app for checkout.

**User journey:**
1. User receives product/catalog message in WhatsApp
2. User adds products to cart in WhatsApp
3. User taps **Place order**
4. Your app receives cart data from Braze and generates a checkout link
5. User completes checkout on your site/app

Braze receives webhook data when users add items via catalog messages, enabling follow-up actions.

---

## Requirements

- **WhatsApp Business Account** connected to Braze
- **Meta catalog** set up in Commerce Manager
- Compliance with [Meta Commerce Terms and Policies](https://www.facebook.com/policies_center/commerce)

---

## Message Types

| Type | Description | Available As |
|------|-------------|--------------|
| **Catalog messages** | Displays full product catalog interactively | Template + Response |
| **Multi-product messages** | Highlights up to 30 specific products | Template + Response |
| **Single product messages** | Highlights one specific product | Response only |

- Multi-product and single-product: select products by ID manually, or use the integrated dropdown selector (if catalog permissions enabled)
- Known issue: multi-product message template header display bug — Meta is aware and working on a fix

---

## Setup

1. In **Meta Commerce Manager**, create a Meta catalog. Must be in the same Meta Business Portfolio as your Braze-connected WhatsApp Business Account.

2. Connect your Meta catalog to the WhatsApp Business Account by assigning **"Manage Catalog"** permission. Use Braze Business Manager ID: **`332231937299182`** as the partner business ID.

3. In catalog settings, enable **"Show catalog icon in chat header"** (required to send catalog messages).

4. In Braze, complete the **embedded signup** process and select all catalogs to grant permissions — this unlocks the integrated product selector.

---

## Building a Product Message

### Via WhatsApp Template Message

1. In Meta Business Manager → **Message Templates**, select **Catalog** format
2. Choose **Catalog message** or **Multi-product catalog message**
3. In Braze, create a WhatsApp campaign or Canvas step → select subscription group → **WhatsApp Template Message**
4. Select your template
   - For multi-product: provide section title and content IDs (copy from Commerce Manager, or use integrated selector)
5. Finish building the message

### Via Response Message

1. In Braze, create a WhatsApp campaign or Canvas step → select subscription group → **Response Message**
2. Select **Meta Product Messages**
3. Choose message type (catalog, multi-product, or single product)
4. Finish building the message

---

## Managing Products

Manage catalog assets in **Meta Business Manager → Commerce Manager**:
- Create catalogs
- Add/update products
- Remove discontinued items

> **Important:** Removing products referenced in active messages will cause those messages to fail to send.

---

## Inbound Product Questions

Users can reply to product/catalog messages with questions. These arrive as inbound messages and can be routed using action-based triggers in Braze.

`★ Insight ─────────────────────────────────────`
- The customer journey ends *outside* WhatsApp — Braze receives cart data via webhook and your app generates the checkout URL, making Braze a cart relay rather than a full commerce platform.
- Catalog permissions granted during embedded signup serve dual purpose: they link the Meta catalog to Braze AND unlock the integrated product selector UI, so the permission step is load-bearing for UX, not just access control.
- The Braze Business Manager ID (`332231937299182`) is a fixed constant — it's the same across all Braze customers, not per-account.
`─────────────────────────────────────────────────`
