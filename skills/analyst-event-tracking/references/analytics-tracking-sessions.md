---
name: analytics-tracking-sessions
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/analytics/tracking_sessions
indexed_at: '2026-04-05'
keywords:
  - session
  - inactivity
  - timeout
  - events
  - tracking
  - subscription
  - visibility
  - foreground
  - background
  - SDK
triggers:
  - how to track user sessions
  - configure session timeout
  - subscribe to session updates
  - track tab visibility
  - session inactivity detection
---
## Tracking Sessions

### Session Inactivity (Web SDK)

A session ends after **30 minutes** without any SDK-tracked events. The timer resets on each tracked event.

**Counts as activity:**
- Opening or refreshing the web app
- Interacting with Braze UI (In-app messages, Content Cards)
- Calling SDK methods that send tracked events (custom events, attribute updates)

**Does NOT count as activity:**
- Switching browser tabs
- Minimizing the browser window
- Browser focus/blur events
- Scrolling or mouse movements

### Changing the Default Session Timeout

Configure via `sessionTimeoutInSeconds` during SDK initialization.

### Tracking Custom Inactivity (Web)

Use the browser's Page Visibility API to track tab switching and manually send events:

```javascript
document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    braze.logCustomEvent('tab_hidden');
  } else {
    // braze.openSession(); // optionally start new session
    braze.logCustomEvent('tab_visible');
  }
});
```

### Subscribing to Session Updates

**Web:** Not supported.

**Android (Java):**
```java
Braze.getInstance(this).subscribeToSessionUpdates(new IEventSubscriber<SessionStateChangedEvent>() {
  @Override
  public void trigger(SessionStateChangedEvent message) {
    if (message.getEventType() == SessionStateChangedEvent.ChangeType.SESSION_STARTED) {
      // Session started
    }
  }
});
```

**Android (Kotlin):**
```kotlin
Braze.getInstance(this).subscribeToSessionUpdates { message ->
  if (message.eventType == SessionStateChangedEvent.ChangeType.SESSION_STARTED) {
    // Session started
  }
}
```

**Swift (async stream):**
```swift
for await event in braze.sessionUpdatesStream {
  switch event {
  case .started(let id): print("Session \(id) has started")
  case .ended(let id):   print("Session \(id) has ended")
  }
}
```

**Swift (cancellable subscription):**
```swift
// Must keep strong reference to cancellable or subscription cancels
let cancellable = AppDelegate.braze?.subscribeToSessionUpdates { event in
  switch event {
  case .started(let id): print("Session \(id) has started")
  case .ended(let id):   print("Session \(id) has ended")
  }
}
```

**Objective-C:**
```objc
BRZCancellable *cancellable = [AppDelegate.braze subscribeToSessionUpdates:^(BRZSessionEvent * _Nonnull event) {
  switch (event.state) {
    case BRZSessionStateStarted:
      NSLog(@"Session %@ has started", event.sessionId); break;
    case BRZSessionStateEnded:
      NSLog(@"Session %@ has ended", event.sessionId); break;
    default: break;
  }
}];
```

**React Native:** No direct method — use the native Android or Swift approach above.

### Swift-Specific Notes

- Session end callback fires when the app **returns to foreground**
- Session duration = time from open/foreground to close/background
- `BRZCancellable` must be held with a strong reference; subscription cancels on deinitialization or `.cancel()`

### Testing Session Tracking

Start a session on device → open Braze dashboard → search for the user → check their **Session** history in the user profile.
