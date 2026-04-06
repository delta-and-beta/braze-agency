---
name: developer-guide-references
source_url: 'https://braze-inc.github.io/braze-docs/_developer_guide/references'
indexed_at: '2026-04-05'
keywords:
  - sdk
  - documentation
  - reference
  - repository
  - android
  - swift
  - javascript
  - flutter
  - integration
  - sample
triggers:
  - find SDK documentation
  - sample app repository
  - SDK reference guide
  - platform integration
  - how to initialize
---
## Braze SDK Developer References

A consolidated reference for all Braze SDK documentation, GitHub repositories, and sample apps.

---

## SDK Resources

| Platform | Reference Docs | Repository | Sample App |
|---|---|---|---|
| **Android** | [KDoc Reference](https://braze-inc.github.io/braze-android-sdk/kdoc/index.html) | [braze-android-sdk](https://github.com/braze-inc/braze-android-sdk) | [samples/](https://github.com/braze-inc/braze-android-sdk/tree/master/samples) |
| **Swift** | [BrazeKit Reference](https://braze-inc.github.io/braze-swift-sdk/documentation/brazekit/braze) | [braze-swift-sdk](https://github.com/braze-inc/braze-swift-sdk) | [Examples/](https://github.com/braze-inc/braze-swift-sdk/tree/main/Examples) |
| **Web** | [JS Module Reference](https://js.appboycdn.com/web-sdk/latest/doc/modules/braze.html#initialize) | [braze-web-sdk](https://github.com/braze-inc/braze-web-sdk) | [sample-builds/](https://github.com/braze-inc/braze-web-sdk/tree/master/sample-builds) |
| **JavaScript** | [JS SDK Reference](https://braze-inc.github.io/braze-javascript-sdk/) | [braze-javascript-sdk](https://github.com/braze-inc/braze-javascript-sdk/tree/main) | — |
| **Cordova** | [BrazePlugin.js declaration](https://github.com/braze-inc/braze-cordova-sdk/blob/master/www/BrazePlugin.js) | [braze-cordova-sdk](https://github.com/braze-inc/braze-cordova-sdk) | [sample-project/](https://github.com/braze-inc/braze-cordova-sdk/tree/master/sample-project) |
| **Flutter** | [pub.dev Reference](https://pub.dev/documentation/braze_plugin/latest/braze_plugin/) | [braze-flutter-sdk](https://github.com/braze-inc/braze-flutter-sdk) | [example/](https://github.com/braze-inc/braze-flutter-sdk/tree/master/example) |
| **React Native** | [index.d.ts declaration](https://github.com/braze-inc/braze-react-native-sdk/blob/master/src/index.d.ts) | [braze-react-native-sdk](https://github.com/braze-inc/braze-react-native-sdk) | [BrazeProject/](https://github.com/braze-inc/braze-react-native-sdk/tree/master/BrazeProject) |
| **Roku** | — | [braze-roku-sdk](https://github.com/braze-inc/braze-roku-sdk) | [torchietv/](https://github.com/braze-inc/braze-roku-sdk/tree/main/torchietv) |
| **Unity** | [BrazePlatform.cs declaration](https://github.com/braze-inc/braze-unity-sdk/blob/master/Assets/Plugins/Appboy/BrazePlatform.cs) | [braze-unity-sdk](https://github.com/braze-inc/braze-unity-sdk) | [unity-samples/](https://github.com/braze-inc/braze-unity-sdk/tree/master/unity-samples) |
| **.NET MAUI (Xamarin)** | — | [braze-xamarin-sdk](https://github.com/braze-inc/braze-xamarin-sdk) | [samples/](https://github.com/braze-inc/braze-xamarin-sdk/tree/master/appboy-component/samples) |

---

## Building Sample Apps

### Android: "Droidboy"

Full-featured test app in [braze-android-sdk](https://github.com/braze-inc/braze-android-sdk).

1. Create a Braze workspace and note the API identifier key.
2. Copy your FCM sender ID and Braze API key into `/droidboy/res/values/braze.xml` (tags: `com_braze_push_fcm_sender_id`, `com_braze_api_key`).
3. Copy FCM server key and server ID to workspace **Manage Settings**.
4. Build APK: `./gradlew assemble` (use `gradlew.bat` on Windows)
5. Install on test device: `./gradlew installDebug`

### Android: "Hello Braze"

Minimal SDK integration example showing Gradle project setup.

1. Copy your API key from **Manage Settings** into `res/values/braze.xml`.
2. Install to device/emulator:
```bash
./gradlew installDebug
```

> If `ANDROID_HOME` is not set or `local.properties` is missing a valid `sdk.dir`, the plugin installs the base SDK automatically.

### Swift Test Apps

1. Create a Braze workspace; note the API key and endpoint.
2. Select the appropriate `.xcodeproj` based on integration method (Swift Package Manager, CocoaPods, or Manual).
3. Add your API key and endpoint to the `Credentials` file.

---

## Debugging

Use the [SDK Debugger](https://www.braze.com/docs/developer_guide/sdk_integration/debugging) during QA to troubleshoot integration issues without enabling verbose logging.
