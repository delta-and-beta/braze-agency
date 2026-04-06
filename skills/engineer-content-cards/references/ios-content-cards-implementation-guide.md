---
name: ios-content-cards-implementation-guide
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/content_cards/implementation_guide
indexed_at: '2026-04-05'
keywords:
  - ContentCards
  - iOS
  - Protocol
  - TypeRouting
  - Analytics
  - Braze
  - CustomObjects
  - ABKContentCard
  - Dashboard
  - Events
triggers:
  - how to implement content cards
  - setting up content card routing
  - logging content card analytics
  - custom content card protocol
  - handle content card events
---
# Content Cards Implementation Guide (iOS SDK)

> Advanced guide for custom Content Card implementations. Covers custom objects, type routing, and analytics logging.

## Core Architecture

Content Cards can be mapped to custom objects via the `ContentCardable` protocol. This enables:
- Interchangeable data backends
- Type-safe routing via `class_type` key-value pairs (set in Braze dashboard)
- Automatic analytics delegation through protocol extensions

### Key Components

| Component | Role |
|---|---|
| `ContentCardable` | Protocol your custom objects conform to |
| `ContentCardData` | Struct holding parsed `ABKContentCard` values |
| `ContentCardClassType` | Enum mapping `class_type` KV pairs to Swift types |
| `metaData` dictionary | All `ABKContentCard` fields as `[ContentCardKey: Any]` |

The `extras` variable on `ABKContentCard` carries Braze dashboard key-value pairs, including `class_type`.

---

## Protocol & Data Struct

### Swift

**ContentCardable Protocol**

```swift
protocol ContentCardable {
  var contentCardData: ContentCardData? { get }
  init?(metaData: [ContentCardKey: Any], classType contentCardClassType: ContentCardClassType)
}

extension ContentCardable {
  var isContentCard: Bool {
    return contentCardData != nil
  }

  func logContentCardClicked() {
    BrazeManager.shared.logContentCardClicked(idString: contentCardData?.contentCardId)
  }

  func logContentCardDismissed() {
    BrazeManager.shared.logContentCardDismissed(idString: contentCardData?.contentCardId)
  }

  func logContentCardImpression() {
    BrazeManager.shared.logContentCardImpression(idString: contentCardData?.contentCardId)
  }
}
```

**ContentCardData Struct**

```swift
struct ContentCardData: Hashable {
  let contentCardId: String
  let contentCardClassType: ContentCardClassType
  let createdAt: Double
  let isDismissable: Bool
  // other properties: expiresAt, pinned, etc.
}

extension ContentCardData: Equatable {
  static func ==(lhs: ContentCardData, rhs: ContentCardData) -> Bool {
    return lhs.contentCardId == rhs.contentCardId
  }
}
```

### Objective-C

**ContentCardable Protocol**

```objc
@protocol ContentCardable <NSObject>

@property (nonatomic, strong) ContentCardData *contentCardData;
- (instancetype __nullable)initWithMetaData:(NSDictionary *)metaData
                                  classType:(enum ContentCardClassType)classType;

- (BOOL)isContentCard;
- (void)logContentCardImpression;
- (void)logContentCardClicked;
- (void)logContentCardDismissed;

@end
```

**ContentCardData Interface**

```objc
@interface ContentCardData : NSObject

+ (ContentCardClassType)contentCardClassTypeForString:(NSString *)rawValue;

- (instancetype)initWithIdString:(NSString *)idString
                       classType:(ContentCardClassType)classType
                       createdAt:(double)createdAt
                   isDismissible:(BOOL)isDismissible;

@property (nonatomic, readonly) NSString *contentCardId;
@property (nonatomic) ContentCardClassType classType;
@property (nonatomic, readonly) double *createdAt;
@property (nonatomic, readonly) BOOL isDismissible;
// other properties: expiresAt, pinned, etc.

@end
```

---

## Custom Object Initializer

### Swift

```swift
extension CustomObject: ContentCardable {
  init?(metaData: [ContentCardKey: Any], classType contentCardClassType: ContentCardClassType) {
    guard let idString = metaData[.idString] as? String,
      let createdAt = metaData[.created] as? Double,
      let isDismissable = metaData[.dismissable] as? Bool,
      let extras = metaData[.extras] as? [AnyHashable: Any]
      else { return nil }

    let contentCardData = ContentCardData(
      contentCardId: idString,
      contentCardClassType: contentCardClassType,
      createdAt: createdAt,
      isDismissable: isDismissable
    )
    let customObjectProperty = extras["YOUR-CUSTOM-OBJECT-PROPERTY"] as? String

    self.init(contentCardData: contentCardData, property: customObjectProperty)
  }
}
```

### Objective-C

```objc
- (id _Nullable)initWithMetaData:(nonnull NSDictionary *)metaData
                       classType:(enum ContentCardClassType)classType {
  self = [super init];
  if (self) {
    if ([metaData objectForKey:ContentCardKeyIdString] &&
        [metaData objectForKey:ContentCardKeyCreated] &&
        [metaData objectForKey:ContentCardKeyDismissible] &&
        [metaData objectForKey:ContentCardKeyExtras]) {
      NSDictionary *extras = metaData[ContentCardKeyExtras];
      NSString *idString = metaData[ContentCardKeyIdString];
      double createdAt = [metaData[ContentCardKeyCreated] doubleValue];
      BOOL isDismissible = metaData[ContentCardKeyDismissible];

      // Use extras["YOUR-CUSTOM-PROPERTY"] to populate custom fields
    }
  }
  return self;
}
```

---

## Type Routing via ContentCardClassType

The `class_type` key-value pair in the Braze dashboard determines which object gets initialized. Values must match exactly (case-insensitive).

### Swift

```swift
enum ContentCardClassType: Hashable {
  case yourValue
  case yourOtherValue
  case none

  init(rawType: String?) {
    switch rawType?.lowercased() {
    case "your_value":       // must match Braze dashboard value
      self = .yourValue
    case "your_other_value": // must match Braze dashboard value
      self = .yourOtherValue
    default:
      self = .none
    }
  }
}
```

`ContentCardClassType` also serves as a **filter identifier** for rendering cards in different UI locations.

---

## Analytics Logging

All three analytics events are routed through the `ContentCardable` protocol extension to `BrazeManager`:

| Method | Trigger |
|---|---|
| `logContentCardImpression()` | Card becomes visible |
| `logContentCardClicked()` | User taps the card |
| `logContentCardDismissed()` | User dismisses the card |

Call these methods on any object conforming to `ContentCardable` — no direct `ABKContentCard` reference needed.

---

## Key Integration Notes

- `ABKContentCard` payload initializes both `ContentCardData` and the custom object via `metaData` dictionary
- Custom objects are initialized from a `Dictionary` type — interchangeable with JSON or other sources
- `extras` on `ABKContentCard` carries all Braze dashboard KV pairs
- `class_type` in `extras` drives type dispatch; unrecognized values map to `.none`
- Reference implementation: [braze-growth-shares-ios-demo-app](https://github.com/braze-inc/braze-growth-shares-ios-demo-app)
