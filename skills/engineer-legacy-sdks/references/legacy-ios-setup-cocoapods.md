---
name: legacy-ios-setup-cocoapods
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/initial_sdk_setup/installation_methods/cocoapods
indexed_at: '2026-04-05'
keywords:
  - cocoapods
  - podfile
  - ios
  - sdk
  - braze
  - appboy
  - objective-c
  - installation
  - subspecs
  - ruby
triggers:
  - install braze ios
  - cocoapods setup
  - podfile configuration
  - objective-c sdk
  - ios dependencies
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's architecture are "atomic knowledge units" — they live in `skills/{name}/references/*.md` and are loaded at the default depth (Sonnet). Keeping them terse and self-contained ensures fast lookups don't pull in irrelevant context.
`─────────────────────────────────────────────────`

## CocoaPods Installation (Braze iOS SDK — Legacy Objective-C)

> **Deprecated**: This integration uses the legacy Objective-C SDK (`Appboy-iOS-SDK`). Prefer the Swift SDK for new projects.

### Prerequisites

- Ruby 2.0.0+
- CocoaPods installed: `sudo gem install cocoapods`

---

### Podfile Setup

In your Xcode project directory, create or edit your `Podfile`:

```ruby
target 'YourAppTarget' do
  pod 'Appboy-iOS-SDK'
end
```

**Recommended version pinning** (auto-updates patches/minors, not majors):
```ruby
pod 'Appboy-iOS-SDK' ~> Major.Minor.Build
```

#### Available Subspecs

| Subspec | Contents |
|---------|----------|
| `Appboy-iOS-SDK/InAppMessage` | In-app message UI + Core SDK |
| `Appboy-iOS-SDK/ContentCards` | Content Card UI + Core SDK |
| `Appboy-iOS-SDK/NewsFeed` | Core SDK only |
| `Appboy-iOS-SDK/Core` | Analytics only (custom events, attributes) |

Import the full SDK unless you have a specific reason to use a subspec.

---

### Installation

```bash
pod install
```

After running, open the generated `.xcworkspace` file — **not** the `.xcodeproj`.

---

### Updating

```bash
pod update
```

Run from your project directory to pull the latest compatible version per your Podfile constraints.

`★ Insight ─────────────────────────────────────`
The Liquid template tags (`{% image_buster %}`, `{% alert %}`, `{{site.baseurl}}`) and `{% multi_lang_include %}` directives are Jekyll-specific and meaningless outside that build context — stripping them is the right call for a portable reference file. The subspec table is preserved because it's genuinely branching decision information, not boilerplate.
`─────────────────────────────────────────────────`
