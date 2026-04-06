---
name: ios-analytics-logging-purchases
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/analytics/logging_purchases
indexed_at: '2026-04-05'
keywords:
  - purchase
  - logging
  - revenue
  - currency
  - quantity
  - properties
  - iOS
  - analytics
  - in-app
triggers:
  - log purchases
  - add purchase properties
  - track revenue
  - record in-app purchase
  - set purchase quantity
---
`★ Insight ─────────────────────────────────────`
- This content uses the legacy `Appboy` SDK namespace (now `Braze`) — the deprecation notice at the top signals this. Good topic files should preserve the exact API calls since they're what developers will copy-paste.
- Jekyll template tags like `{% tabs %}` and `{% alert %}` are build-time artifacts that don't render in plain markdown — strip them and use native markdown equivalents instead.
`─────────────────────────────────────────────────`

## iOS Logging Purchases

Records in-app purchases to track revenue over time and segment users by lifetime value. Purchases reported in non-USD currencies are converted to USD at the exchange rate on the report date.

### Basic Purchase Logging

Call after a successful purchase:

**Objective-C**
```objc
[[Appboy sharedInstance] logPurchase:@"your product ID"
    inCurrency:@"USD"
    atPrice:[[[NSDecimalNumber alloc] initWithString:@"0.99"] autorelease]];
```

**Swift**
```swift
Appboy.sharedInstance()?.logPurchase("your product ID", inCurrency: "USD", atPrice: NSDecimalNumber(string: "0.99"))
```

**Constraints:**
- Product ID max length: 255 characters. Empty product ID = purchase not logged.
- Supported currencies: USD, CAD, EUR, GBP, JPY, AUD, CHF, NOK, MXN, NZD, CNY, RUB, TRY, INR, IDR, ILS, SAR, ZAR, AED, SEK, HKD, SPD, DKK, and more. Unknown symbols log a warning and are ignored.

### Adding Properties

Pass an `NSDictionary` with `NSNumber`, `NSString`, or `NSDate` values:

**Objective-C**
```objc
[[Appboy sharedInstance] logPurchase:@"your product ID"
    inCurrency:@"USD"
    atPrice:[[[NSDecimalNumber alloc] initWithString:@"0.99"] autorelease]
    withProperties:@{@"key1":"value1"}];
```

**Swift**
```swift
Appboy.sharedInstance()?.logPurchase("your product ID", inCurrency: "USD", atPrice: NSDecimalNumber(string: "0.99"), withProperties: ["key1":"value1"])
```

### Adding Quantity

Pass an `NSUInteger` for quantity when customers make the same purchase multiple times in one checkout:

- Valid range: 0–100
- Without quantity param: defaults to 1
- With quantity param: no default — must explicitly provide a value
- Example: price=10 USD, quantity=3 → logged as 3 purchases of $10 = $30 total

### Order-Level Logging

To log at the order level instead of product level, use order name or order category as the `product_id`.

### Reserved Keys

These keys cannot be used as purchase properties:
- `time`
- `product_id`
- `quantity`
- `event_name`
- `price`
- `currency`

### REST API Alternative

Purchases can also be recorded via the REST API using the User Data endpoint.
