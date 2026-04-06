---
name: message-building-by-channel-push-faq
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/push/faq
indexed_at: '2026-04-05'
keywords:
  - push
  - token
  - device
  - payload
  - certificate
  - APNs
  - enrollment
  - testing
triggers:
  - test push all devices
  - push token reassigned
  - invalid push payload error
  - no push token enrolled user
  - ios certificate production development
---
## Push FAQ

### Multiple Users on One Device

When a user logs out, they remain reachable by push until another user logs in — at which point the push token is **reassigned to the new user**. Each device supports only one active push subscription per app.

Track token reassignments via **User Profile → Engagement tab → Push Changelog**.

---

### Test Push Goes to All Devices

Test pushes are sent to **every push-enabled device** associated with the selected user profile.

To target a single device:
- Remove push tokens for other devices from the user profile before testing, **or**
- Use the [`/messages/send`](https://www.braze.com/docs/api/endpoints/messaging/send_messages/post_send_messages/) endpoint with `send_to_most_recent_device_only: true` in the `apple_push` or `android_push` object

---

### "Error sending push because the payload was invalid"

APNs rejected the push due to an invalid payload — common causes: empty payload or payload too large.

See [Common Push Error Messages](https://www.braze.com/docs/user_guide/message_building_by_channel/push/push_error_codes/) for details.

---

### Opted-In User Has No Push Token

The token was likely reassigned to another user who logged in on the same device.

**To diagnose:**
1. Go to **User Profile → Engagement tab → Push Changelog**
2. Look for a message indicating the token moved to another user
3. Copy the token and paste it into the user search bar to find who has it now

**To reassign the token back:**
1. Have the original user log into the device
2. Trigger a push send — the token returns to their account if push is still enabled at the device level

---

### "Open Web URL Inside Mobile App" Always Opens App During Draft Testing

Expected behavior: when a campaign is in **Draft** status, tapping a test push always opens the app first, regardless of the click behavior setting.

The configured on-click behavior only applies when the campaign is **Live**:
- **Open web URL** (no Inside App): opens in the device's default browser
- **Open web URL inside mobile app**: opens in an in-app web view

---

### iOS Push Certificates: Production vs. Development

Determines which APNs gateway Braze uses:

| Option | Use When | Gateway |
|--------|----------|---------|
| **Send to Development** | App built in Xcode dev mode, signed with development provisioning profile | Apple sandbox gateway |
| **Send to Production** | App distributed via TestFlight, App Store, or enterprise distribution | Apple production gateway |

**Mismatch = silent failure.** Push token type must match the gateway. Apps on TestFlight or App Store should use **Send to Production**.
