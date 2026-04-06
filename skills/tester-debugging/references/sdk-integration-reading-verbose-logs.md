---
name: sdk-integration-reading-verbose-logs
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/sdk_integration/reading_verbose_logs
indexed_at: '2026-04-05'
keywords:
  - verbose logs
  - session
  - push notification
  - token registration
  - deep link
  - FCM
  - APNs
  - push token
  - campaign
triggers:
  - how to read verbose logs
  - troubleshoot push notifications
  - debug session issues
  - push token not registered
  - how to enable verbose logging
---
# Reading Verbose Logs

Reference for interpreting Braze SDK verbose log output across messaging channels.

**Prerequisites:** [Enable verbose logging]({{site.baseurl}}/developer_guide/sdk_integration/verbose_logging) before collecting logs.

---

## Sessions

Sessions are the foundation of Braze analytics. In-app messages and Content Cards require a valid session start before functioning. Investigate sessions first if anything else isn't working.

### Key Log Entries

**Swift — Session start:**
```
Started user session (id: <SESSION_ID>)
```

**Swift — Session end:**
```
Ended user session (id: <SESSION_ID>, duration: <DURATION>s)
Logged event:
- userId: <USER_ID>
- sessionId: <SESSION_ID>
- data: sessionEnd(duration: <DURATION>)
```

**Android — Session start:**
```
New session created with ID: <SESSION_ID>
Session start event for new session received
Completed the openSession call
Opened session with activity: <ACTIVITY_NAME>
```
Filter network requests for your Braze endpoint (e.g., `sdk.iad-01.braze.com`) to see the `ss` (session start) event.

**Android — Session end:**
```
Closed session with activity: <ACTIVITY_NAME>
Closed session with session ID: <SESSION_ID>
Requesting data flush on internal session close flush timer.
```

### Troubleshooting

- No session start log → SDK not initialized or `openSession` (Android) not called
- Android: no network request to Braze endpoint → verify API key and endpoint config

---

## Push Notifications

### Token Registration

Token is registered with Braze on session start.

**Swift:**
```
Updated push notification authorization:
- authorization: authorized

Received remote notifications device token: <PUSH_TOKEN>
```

Confirm the request body to your Braze endpoint contains:
```json
"attributes": [
  {
    "push_token": "<PUSH_TOKEN>",
    "user_id": "<USER_ID>"
  }
]
```
And device info includes:
```json
"device": {
  "ios_push_auth": "authorized",
  "remote_notification_enabled": 1
}
```

**Android:**
```
Registering for Firebase Cloud Messaging token using sender id: <SENDER_ID>
```
- Verify `com_braze_firebase_cloud_messaging_registration_enabled` is `true`
- FCM sender ID must match your Firebase project

### Troubleshooting Token Registration

| Symptom | Cause |
|---|---|
| `push_token` missing from request body | Token not captured; verify push setup |
| `ios_push_auth: denied` or `provisional` | User hasn't granted full push permission |
| `SENDER_ID_MISMATCH` (Android) | FCM sender ID doesn't match Firebase project |

### Push Delivery and Click

**Swift — Processing:**
```
Processing push notification:
- date: <TIMESTAMP>
- silent: false
- userInfo: {
  "ab": { ... },
  "ab_uri": "<DEEP_LINK_OR_URL>",
  "aps": {
    "alert": {
      "body": "<MESSAGE_BODY>",
      "title": "<MESSAGE_TITLE>"
    }
  }
}
```

**Swift — Click event:**
```
Logged event:
- userId: <USER_ID>
- sessionId: <SESSION_ID>
- data: pushClick(campaignId: ...)
```

**Swift — Deep link (if present):**
```
Opening '<URL>':
- channel: notification
- useWebView: false
- isUniversalLink: false
```

**Android:**
```
BrazeFirebaseMessagingService: Got Remote Message from FCM
```
Followed by push payload and display logs. Deep links appear as Deep Link Delegate or `UriAction` entries.

### Troubleshooting Push Click

- No `pushClick` event → app delegate or notification handler not forwarding push events to Braze SDK

---

## In-App Messages

### Message Delivery

In-app message payload is received from the server when a session starts and the user is eligible.

**Swift:** Filter for responses from your Braze endpoint containing:
```json
"templated_message": {
  "data": {
    "message": "...",
    "type": "HTML",
    "message_close": "SWIPE",
    "trigger_id": "<TRIGGER_ID>"
  },
  "type": "inapp"
}
```

**Android:**
```
Triggering action: <CAMPAIGN_BSON_ID>
```

### Message Display and Impression

**Swift:**
```
In-app message ready for display:
- triggerId: (campaignId: <CAMPAIGN_ID>, ...)
- extras: { ... }
```

Impression event:
```
Logged event:
- userId: <USER_ID>
- sessionId: <SESSION_ID>
- data: inAppMessageImpression(triggerIds: [...])
```

**Android:**
```
handleExistingInAppMessagesInStackWithDelegate:: Displaying in-app message
```

### Click and Button Events

**Swift:**
```
Logged event:
- userId: <USER_ID>
- sessionId: <SESSION_ID>
- data: inAppMessageButtonClick(triggerIds: [...], buttonId: "<BUTTON_ID>")
```

If no further triggered messages match:
```
No matching trigger for event.
```
This is **expected** — it means no additional in-app messages are configured for the event.

**Android:** Filter Braze endpoint requests for event names:
- `sbc` — button click
- `si` — impression

### Troubleshooting In-App Messages

| Symptom | Action |
|---|---|
| Message not displaying | Confirm session start is logged first |
| Payload not received | Filter endpoint responses for message payload |
| Impressions not logging | Check for custom `inAppMessageDisplay` delegate suppressing logging |
| "No matching trigger" | Normal; no additional messages configured for that event |

---

## Content Cards

Content Cards sync on session start and on manual refresh. **No session = no Content Cards displayed.**

### Card Sync

**Swift:** Filter for responses from your Braze endpoint containing Content Card data.
