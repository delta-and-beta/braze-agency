---
name: legacy-ios-push-custom-sounds
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/push_notifications/customization/custom_sounds
indexed_at: '2026-04-05'
keywords:
  - push
  - notifications
  - sounds
  - audio
  - iOS
  - Xcode
  - afconvert
  - Braze
  - alerts
  - formats
triggers:
  - how to add custom push sounds
  - configuring notification sounds in Braze
  - converting audio for iOS notifications
  - setting up custom alert sounds
  - supported audio formats for push notifications
---
# Custom Push Sounds (iOS)

Custom push notification sounds must be hosted locally within the app's main bundle.

## Supported Audio Formats

| Format | Container |
|--------|-----------|
| Linear PCM | AIFF, WAV, or CAF |
| IMA4 (MA4) | AIFF, WAV, or CAF |
| µLaw | AIFF, WAV, or CAF |
| aLaw | AIFF, WAV, or CAF |

Add sound files to your Xcode project as **non-localized resources** of the application bundle.

## Converting Audio with `afconvert`

Convert a 16-bit linear PCM file to IMA4 in CAF format:

```bash
afconvert /System/Library/Sounds/Submarine.aiff ~/Desktop/sub.caf -d ima4 -f caff -v
```

To inspect a sound's data format: open in QuickTime Player → **Movie** menu → **Show Movie Inspector**.

## Constraints

- Custom sounds must be **under 30 seconds**. If over the limit, the default system sound plays instead.

## Configuring the Sound in Braze

Specify a protocol URL pointing to the sound file's location within the app in the **Sound** field of the push composer (**Settings** section).

- Use `"default"` to play the device's default notification sound.
- If the specified file doesn't exist or `"default"` is entered, Braze falls back to the default device alert sound.
- Can also be configured via the [Braze Messaging API](https://www.braze.com/docs/api/endpoints/messaging/).

> See Apple's [Preparing Custom Alert Sounds](https://developer.apple.com/library/content/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/SupportingNotificationsinYourApp.html) for additional guidance.
