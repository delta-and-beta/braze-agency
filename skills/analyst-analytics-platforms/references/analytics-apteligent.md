---
name: analytics-apteligent
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/data_and_analytics/analytics/apteligent
indexed_at: '2026-04-05'
keywords:
  - crash
  - reporting
  - iOS
  - integration
  - observer
  - notification
  - analytics
  - segmentation
  - mobile
  - event
triggers:
  - log crash events
  - set up crash reporting
  - integrate Apteligent
  - iOS crash integration
  - register crash observer
---

# Apteligent

> [Apteligent](https://www.vmware.com/products/workspace-one/intelligence-consumer-apps.html) is a mobile application performance platform providing tools and insights for developers and product managers. 

_This integration is maintained by Apteligent._

## About the integration

The Braze and Apteligent integration provides detailed iOS crash reporting, allowing you to log critical data into your existing Braze solution as well as  segment, understand, and engage with users who have experienced application crashes.

## Prerequisites 

| Requirement | Description |
|---|---|
| TestDrive account | A TestDrive account is required to take advantage of this partnership. |
{: .reset-td-br-1 .reset-td-br-2 role="presentation" }

{% alert warning %}
This integration is currently only supported on iOS.
{% endalert %}

## Integration {#apteligent-ios-integration}

### Step 1: Register an observer

First, you must register an observer. Ensure that this is done before you initialize Apteligent.

```objc
[[NSNotificationCenter defaultCenter] addObserver:self
                                         selector:@selector(crashDidOccur:)
                                             name:@"CRCrashNotification"
                                           object:nil];
```

### Step 2: Log custom crash analytics

The Apteligent SDK will fire a notification when the user loads the application after a crash occurs. The notification will contain the crash name, reason, and date of occurrence.

Upon receiving the notification, log a custom crash event and update user attributes with Apteligent's crash reporting analytics:

```objc
- (void)crashDidOccur:(NSNotification*)notification {
  NSDictionary *crashInfo = notification.userInfo;
  [[Appboy sharedInstance] logCustomEvent:@"ApteligentCrashEvent" withProperties:crashInfo];
  [[Appboy sharedInstance].user setCustomAttributeWithKey:@"lastCrashName" andStringValue:crashInfo[@"crashName"]];
  [[Appboy sharedInstance].user setCustomAttributeWithKey:@"lastCrashReason" andStringValue:crashInfo[@"crashReason"]];
  [[Appboy sharedInstance].user setCustomAttributeWithKey:@"lastCrashDate" andDateValue:crashInfo[@"crashDate"]];
}
```

Once completed, you'll be able to harness the power of Braze segmentation and engagement analytics using the crash information found in the Apteligent platform.

