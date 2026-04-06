---
name: legacy-ios-setup-swift-package-manager
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/initial_sdk_setup/installation_methods/swift_package_manager
indexed_at: '2026-04-05'
keywords:
  - swift-package-manager
  - ios-sdk
  - xcode
  - appboykit
  - appboyui
  - build-settings
  - linker-flags
  - dependencies
  - push-stories
  - objective-c
triggers:
  - how to install ios sdk via swift package manager
  - add braze as a swift dependency
  - configure objc linker flags for ios
  - set up appboy ui components
  - add push story package to ios app
---
## Swift Package Manager Installation (iOS SDK)

**Requirements:** Xcode 12+. Note: tvOS is not supported via SPM.

### Step 1: Add the Dependency

1. Open project settings → **Swift Packages** tab → click **+**
2. Enter the repository URL:
   - SDK `3.33.1`+: `https://github.com/braze-inc/braze-ios-sdk`
   - SDK `3.29.0`–`3.32.0`: `https://github.com/Appboy/Appboy-ios-sdk`
3. Select SDK version (must be `3.29.0`+), click **Next**

#### Package Selection

Select **one** of the following (do not include both `AppboyKit` and `AppboyUI`):

| Package | Use when |
|---|---|
| `AppboyUI` | You need Braze UI components (Content Cards, in-app messages, etc.). Includes `AppboyKit` automatically. |
| `AppboyKit` | You don't need Braze UI components. |
| `AppboyPushStory` | You use Push Stories (v`3.31.0`+). Set **Add to Target** to your `ContentExtension` target, not the main app. |

### Step 2: Configure Build Settings

Add `-ObjC` to **Other Linker Flags** in your project's **Build Settings**.

> Without `-ObjC`, parts of the API will be missing and behavior is undefined — may cause "unrecognized selector sent to class" crashes.

### Step 3: Edit Target Scheme (Xcode 12.4 and earlier only)

Skip if using Xcode 12.5+.

Go to **Product > Scheme > Edit Scheme**, expand **Build** → **Post-actions**, add a **New Run Script Action**:

- Set **Provide build settings from** to your app's target
- Paste:

```sh
# iOS
bash "$BUILT_PRODUCTS_DIR/Appboy_iOS_SDK_AppboyKit.bundle/Appboy.bundle/appboy-spm-cleanup.sh"
# macOS (if applicable)
bash "$BUILT_PRODUCTS_DIR/Appboy_iOS_SDK_AppboyKit.bundle/Contents/Resources/Appboy.bundle/appboy-spm-cleanup.sh"
```

---

After completing these steps, proceed with the standard SDK integration (initializing Braze in your app delegate, etc.).
