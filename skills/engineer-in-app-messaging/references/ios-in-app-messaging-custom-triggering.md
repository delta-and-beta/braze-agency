---
name: ios-in-app-messaging-custom-triggering
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/in-app_messaging/customization/custom_triggering
indexed_at: '2026-04-05'
keywords:
  - silent-push
  - custom-event
  - in-app-message
  - push-token
  - app-delegate
  - campaign
  - foreground
  - key-value-pairs
  - server-event
  - action-based
triggers:
  - how to trigger in-app messages via push
  - send silent push to log custom event
  - handle silent push in app delegate
  - create action-based in-app campaign
  - set up server-sent event triggering
---
# Custom In-App Message Triggering

Trigger in-app messages via server-sent events by using a silent push to log an SDK custom event, which then triggers the in-app message.

> **Requirement:** User must have a push token (i.e., have been shown the OS push prompt). Silent pushes only trigger in-app messages when the app is in the foreground.

## How It Works

```
Server event → Silent push → SDK logs custom event → In-app message triggers
```

## Step 1: Handle Silent Push in App Delegate

In `application(_:didReceiveRemoteNotification:fetchCompletionHandler:)`:

**Swift:**
```swift
func handleExtras(userInfo: [AnyHashable : Any]) {
  if userInfo != nil && (userInfo["IS_SERVER_EVENT"] as? String) != nil && (userInfo["CAMPAIGN_NAME"] as? String) != nil {
    Appboy.sharedInstance()?.logCustomEvent("IAM Trigger", withProperties: ["campaign_name": userInfo["CAMPAIGN_NAME"]])
  }
}
```

**Objective-C:**
```objc
- (void)handleExtrasFromPush:(NSDictionary *)userInfo {
  if (userInfo != nil && userInfo[@"IS_SERVER_EVENT"] != nil && userInfo[@"CAMPAIGN_NAME"] != nil) {
    [[Appboy sharedInstance] logCustomEvent:@"IAM Trigger" withProperties:@{@"campaign_name": userInfo[@"CAMPAIGN_NAME"]}];
  }
}
```

## Step 2: Create Silent Push Campaign in Braze

Create a silent push campaign with these required **key-value pair extras**:

| Key | Value |
|-----|-------|
| `IS_SERVER_EVENT` | `true` |
| `CAMPAIGN_NAME` | `<your in-app message name>` |

- `IS_SERVER_EVENT` gates the SDK event logging
- `CAMPAIGN_NAME` is passed as the `campaign_name` event property
- Both the event name and properties can be customized via push payload KV pairs

## Step 3: Create In-App Message Campaign

In the Braze dashboard, create an **action-based** in-app message campaign triggered by the custom event logged in Step 1.

**Example trigger condition:**
- Custom event: `IAM Trigger`
- Filter: `campaign_name` equals `In-app message name example`

This allows one silent push handler to serve multiple in-app messages, distinguished by `campaign_name`.

## Key Constraints

- Silent push must be received while the **app is in the foreground**
- A valid **push token must exist** for the user before this flow is possible — tokens are only stored after the OS push prompt is accepted

`★ Insight ─────────────────────────────────────`
- The KV pair `IS_SERVER_EVENT` acts as a sentinel guard — the code pattern checks both it AND `CAMPAIGN_NAME` before logging, preventing accidental triggering from unrelated silent pushes
- Passing `CAMPAIGN_NAME` as an event property rather than hardcoding it is a fan-out pattern: one SDK event handler (`IAM Trigger`) can route to N different in-app message campaigns based on the property value
`─────────────────────────────────────────────────`
