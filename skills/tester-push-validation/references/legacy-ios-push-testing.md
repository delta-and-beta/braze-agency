---
name: legacy-ios-push-testing
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/push_notifications/testing
indexed_at: '2026-04-05'
keywords:
  - push
  - notification
  - ios
  - testing
  - curl
  - api
  - messaging
  - apple
  - payload
  - endpoint
triggers:
  - test push notifications
  - send push with curl
  - ios push testing
  - push notification command line
---
## Push Testing via Command Line

Test push notifications directly from the terminal using CURL and the Braze Messaging API.

### Required Fields

| Field | Where to Find |
|-------|---------------|
| `YOUR-API-KEY-HERE` | **Settings** > **API Keys** — must have `/messages/send` permission |
| `EXTERNAL_USER_ID` | **Search Users** page |
| `REST_API_ENDPOINT_URL` | Braze Instances list — must match your workspace's Braze instance |

### Send a Test Push Notification

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR-API-KEY-HERE" \
  -d '{
    "external_user_ids": ["EXTERNAL_USER_ID"],
    "messages": {
      "apple_push": {
        "alert": "Test push",
        "extra": {
          "YOUR_KEY1": "YOUR_VALUE1"
        }
      }
    }
  }' \
  https://{REST_API_ENDPOINT_URL}/messages/send
```

### Notes

- The `extra` object is optional — use it to pass custom key-value pairs with the notification.
- Replace `apple_push` with the appropriate platform key if targeting Android or other platforms.
- The API key must be explicitly authorized for the `/messages/send` endpoint, not just any key.

`★ Insight ─────────────────────────────────────`
- The original doc used Jekyll liquid tags (`{{site.baseurl}}`, `{% multi_lang_include %}`) which are build-time template directives — these are stripped in the topic file since they resolve to nothing in a static reference context.
- Reformatting the CURL command with line continuations (`\`) significantly improves readability for reference files without changing the command's behavior.
- The `extra` field in `apple_push` maps to APNs custom payload — a common pattern for passing metadata to the app when a push is tapped.
`─────────────────────────────────────────────────`
