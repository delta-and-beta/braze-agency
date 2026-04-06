---
name: ios-in-app-messaging-shareplay
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/in-app_messaging/implementation_guide/shareplay
indexed_at: '2026-04-05'
keywords:
  - shareplay
  - groupactivities
  - avplayer
  - facetime
  - video
  - messaging
  - ios
  - modal
  - coordination
  - metadata
triggers:
  - how to integrate shareplay with braze
  - enable video sharing in facetime
  - configure group activities for in-app messages
  - set up group watching experience
  - handle shareplay state changes
---
# SharePlay In-App Messaging

SharePlay (iOS 15+) enables FaceTime users to share media experiences with real-time audio/video sync. Integrate via Apple's `GroupActivities` framework with Braze in-app messages.

**Prerequisites:** Add `GroupActivities` entitlement to Xcode project. The in-app message is a subclassed modal (`ABKInAppMessageModalViewController`).

---

## Step 1: Override NIB Loading

```swift
override var nibName: String {
  return "ModalVideoViewController"
}

override func loadView() {
  Bundle.main.loadNibNamed(nibName, owner: self, options: nil)
}
```

---

## Step 2: Configure AVPlayer

Video URL comes from in-app message key-value pairs (cannot attach to media item directly).

```swift
func configureVideoPlayer() {
  guard let urlString = inAppMessage.extras?["video_url"] as? String,
        let url = URL(string: urlString) else { return }

  let videoTitle = inAppMessage.extras?["video_title"] as? String
  mediaItem = MediaItem(title: videoTitle ?? "Video Content", url: url)

  let asset = AVAsset(url: url)
  let playerItem = AVPlayerItem(asset: asset)
  player.replaceCurrentItem(with: playerItem)
  playerViewController.player = player

  addChild(playerViewController)
  videoPlayerContainer.addSubview(playerViewController.view)
  playerViewController.didMove(toParent: self)
}
```

**Dashboard config:**
- Set `video_url` (and optionally `video_title`) as key-value pairs on the in-app message
- Add URL validation in `beforeInAppMessageDisplayed`
- Enable re-eligibility; set two triggers: default + SharePlay-initiated
- Users not on iOS 15 view messages locally only

---

## Step 3: Create GroupActivity

```swift
struct MediaItem: Hashable, Codable {
  let title: String
  let url: URL
}

@available(iOS 15, *)
struct MediaItemActivity: GroupActivity {
  static let activityIdentifier = "com.book-demo.GroupWatching"
  let mediaItem: MediaItem

  var metadata: GroupActivityMetadata {
    var metadata = GroupActivityMetadata()
    metadata.type = .watchTogether
    metadata.title = mediaItem.title
    metadata.fallbackURL = mediaItem.url
    return metadata
  }
}
```

**`prepareForActivation()` states:**
- `.activationDisabled` — viewing individually
- `.activationPreferred` — viewing together (activate lifecycle here)
- `.cancelled` — handle gracefully

---

## Step 4: Launch In-App Message from SharePlay API

`CoordinationManager` manages SharePlay state changes. Trigger a custom event when a media item is selected and no in-app message is currently visible.

```swift
private var subscriptions = Set<AnyCancellable>()
private var selectedMediaItem: MediaItem? {
  didSet {
    guard let _ = selectedMediaItem else { return }
    if !BrazeManager.shared.inAppMessageCurrentlyVisible {
      BrazeManager.shared.logCustomEvent("SharePlay Event")
    }
  }
}

private func launchVideoPlayerIfNecessary() {
  CoordinationManager.shared.$enqueuedMediaItem
      .receive(on: DispatchQueue.main)
      .compactMap { $0 }
      .assign(to: \.selectedMediaItem, on: self)
      .store(in: &subscriptions)
}
```

---

## Step 5: Leave Session on Dismissal

```swift
override func viewDidDisappear(_ animated: Bool) {
  super.viewDidDisappear(animated)
  groupSession?.leave()
  CoordinationManager.shared.leave()
}

// In CoordinationManager:
@Published var enqueuedMediaItem: MediaItem?
@Published var groupSession: GroupSession<MediaItemActivity>?

func leave() {
  groupSession = nil
  enqueuedMediaItem = nil
}
```

---

## SharePlay Button Visibility

Use `isEligibleForGroupSession` to observe FaceTime call status. Show the SharePlay button only when the user is on a FaceTime call. First activation shows a prompt on the originating device; subsequent prompt appears on participants' devices.

```swift
private var isEligibleForSharePlay: Bool
// Observe isEligibleForGroupSession to toggle button visibility
```

---

## Key Notes

- Synced playback: pause on one device pauses all devices
- Users without the app are redirected to the App Store
- Avoid conflicting in-app messages triggered on session start
