---
name: push-notifications-soft-push-prompts
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/push_notifications/soft_push_prompts
indexed_at: '2026-04-05'
keywords:
  - notifications
  - prompts
  - permission
  - push
  - browser
  - modal
  - opt-in
  - dialog
  - initialization
triggers:
  - implement soft push prompts
  - improve push notification opt-in rates
  - customize push permission request
  - show notification prompt before native dialog
---
# Soft Push Prompts (Web)

Soft push prompts are custom in-app UI elements that appear **before** the native browser permission dialog. They improve opt-in rates by letting users express intent first — only confirmed users trigger the browser's native prompt.

## Why Use Soft Push Prompts

- Browser permission dialogs are permanent: if a user dismisses them, re-prompting requires clearing site data
- A soft prompt lets you contextualize the ask and filter for interested users
- Users who decline the soft prompt never see the native dialog (permission state remains `default`, not `denied`)

## Implementation Pattern

### 1. Disable Automatic Push Prompting

In your Braze SDK initialization, set `manuallyShowInAppMessages` or suppress the default push prompt behavior so Braze doesn't immediately request permissions.

```javascript
braze.initialize('YOUR-API-KEY', {
  // Do not automatically request push permission
  allowUserSuppliedJavascript: true,
});
```

### 2. Build a Custom Prompt UI

Create your own UI element (modal, banner, etc.) with "Allow" and "Decline" actions.

```html
<div id="soft-push-prompt" style="display:none">
  <p>Get notified about new updates!</p>
  <button id="push-allow">Allow Notifications</button>
  <button id="push-decline">No thanks</button>
</div>
```

### 3. Request Permission Only on User Confirmation

```javascript
document.getElementById('push-allow').addEventListener('click', () => {
  braze.requestPushPermission(
    () => { console.log('Push permission granted'); },
    () => { console.log('Push permission denied'); }
  );
  document.getElementById('soft-push-prompt').style.display = 'none';
});

document.getElementById('push-decline').addEventListener('click', () => {
  // User declined soft prompt — native dialog never shown
  document.getElementById('soft-push-prompt').style.display = 'none';
});
```

### 4. Show the Soft Prompt at the Right Time

Trigger the soft prompt after a meaningful user action (e.g., completing onboarding, viewing key content) rather than on page load.

```javascript
// Example: show after user completes a significant action
function onUserCompletedSignup() {
  document.getElementById('soft-push-prompt').style.display = 'block';
}
```

## Key API Method

| Method | Description |
|--------|-------------|
| `braze.requestPushPermission(successCb, deniedCb)` | Triggers native browser push permission dialog |

## Notes

- Call `requestPushPermission()` only once per session from a user gesture (click) to comply with browser requirements
- Check `braze.isPushSupported()` before showing the soft prompt to avoid showing it on unsupported browsers/devices
- Safari requires a user gesture to call `requestPushPermission()` — ensure the click handler is synchronous
