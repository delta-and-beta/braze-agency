---
name: analytics-logging-purchases
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/analytics/logging_purchases
indexed_at: '2026-04-05'
keywords:
  - purchase
  - logPurchase
  - revenue
  - currency
  - quantity
  - properties
  - checkout
  - productId
  - lifetime-value
triggers:
  - log a purchase
  - track revenue
  - purchase properties
  - implement purchase logging
  - order-level logging
---
`★ Insight ─────────────────────────────────────`
- Topic files serve as **atomic knowledge units** within a skill's `references/` directory — they're meant to be fast-lookup references, not tutorials. Stripping navigation templates (like Jekyll `{% tabs %}` liquid tags) is essential since they're consumed by an LLM, not a browser.
- The multi-platform code examples are valuable but verbose — consolidating them into a platform table + key examples preserves the information density without the repetition.
`─────────────────────────────────────────────────`

## Logging Purchases (Braze SDK)

Use `logPurchase()` after a successful purchase to track revenue and enable lifetime value segmentation.

**Key constraints:**
- `productId` max 255 characters; empty `productId` silently skips logging
- Non-USD currencies are auto-converted using the exchange rate at report time — hardcode USD to avoid conversion
- Reserved keys that cannot be used as purchase properties: `time`, `product_id`, `quantity`, `event_name`, `price`, `currency`

---

### Core Method Signatures by Platform

| Platform | Method |
|---|---|
| **Web** | `braze.logPurchase(product_id, price, "USD", quantity, {props})` |
| **Android (Java)** | `Braze.getInstance(ctx).logPurchase(productId, currencyCode, price, quantity)` |
| **Android (Kotlin)** | `Braze.getInstance(ctx).logPurchase(productId, currencyCode, price, quantity)` |
| **Swift** | `AppDelegate.braze?.logPurchase(productID:, currency:, price:, properties:)` |
| **Obj-C** | `[AppDelegate.braze logPurchase:currency:price:properties:]` |
| **React Native** | `Braze.logPurchase(productId, price, currencyCode, quantity, properties)` |
| **Flutter** | `braze.logPurchase(productId, currencyCode, price, quantity, properties: {})` |
| **Cordova** | `BrazePlugin.logPurchase("PRODUCT_ID", 10, "USD", 5, properties)` |
| **Unity** | `AppboyBinding.LogPurchase("product_id", "currencyCode", price)` |
| **Roku** | `m.Braze.logPurchase("product_id", "currency_code", price, quantity)` |

---

### Purchase Properties

Pass metadata as a dictionary with values typed `Int`, `Double`, `String`, `Bool`, or `Date`.

**Web:**
```javascript
braze.logPurchase(product_id, price, "USD", quantity, { key: "value" });
```

**Android (Kotlin):**
```kotlin
val purchaseProperties = BrazeProperties()
purchaseProperties.addProperty("key", "value")
Braze.getInstance(context).logPurchase(..., purchaseProperties)
```

**Swift:**
```swift
let purchaseProperties = ["key": "value"]
AppDelegate.braze?.logPurchase(productID: "product_id", currency: "USD", price: price, properties: purchaseProperties)
```

**React Native:**
```javascript
Braze.logPurchase(productId, price, currencyCode, quantity, { key: "value" });
```

---

### Quantity

Default is `1`. Pass an `Int` to `quantity` when a customer buys the same product multiple times in a single checkout.

---

### Order-Level Logging

To log at order level instead of product level, use the order name or order category as `product_id`. See purchase object spec for naming conventions.

---

### Alternative: REST API

Purchases can also be recorded via the User Data REST endpoint instead of the SDK.

---

### Web: Google Tag Manager Integration

- Use the **Purchase** tag type to call `logPurchase` from GTM
- **Product ID** and **Price** are required fields
- Add purchase properties via the **Add Row** button
- For GA4 eCommerce data layer (`items` array): use **E-commerce Purchase** tag type — logs one Braze purchase per `item`; specify which item fields to include as purchase properties

---

### Supported Currencies (partial list)

Braze accepts standard ISO 4217 codes (AED, AFN, ALL, AMD, ARS, AUD, AZN, BAM, BBD, BDT, BGN, BHD, USD, EUR, GBP, etc.). Unsupported symbols log a warning and skip the purchase.

`★ Insight ─────────────────────────────────────`
- The **reserved keys list** (`time`, `product_id`, `quantity`, `event_name`, `price`, `currency`) is a common gotcha — worth keeping prominent in the reference since violations are silent failures, not exceptions.
- Collapsing platform-specific subtabs into a **lookup table + representative examples** reduces token consumption when an agent retrieves this topic at query time, while still covering the cross-platform surface area.
`─────────────────────────────────────────────────`
