---
name: ios-sample-apps
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/sample_apps
indexed_at: '2026-04-05'
keywords:
  - iOS
  - SDK
  - samples
  - testing
  - push
  - notifications
  - integration
  - debugging
  - configuration
  - workspace
triggers:
  - how to run sample apps
  - set up push notifications
  - configure API key
  - debug iOS integration
  - test Braze features
---
# iOS Sample Apps

Braze iOS SDK ships with sample applications in the repository for testing features before or alongside implementing them in your own app.

## Repository

Sample apps are in the [iOS SDK GitHub repository](https://github.com/appboy/appboy-ios-sdk).

## Building a Test Application

1. Create a new workspace in the Braze dashboard and copy the **app identifier API key**.
2. Open the `AppDelegate.m` file in the sample app and paste the API key into the appropriate field.

## Push Notifications

Push notifications require additional setup beyond the basic API key configuration. Refer to the iOS Push Notifications Integration guide for the full setup steps.

## Why Use Sample Apps

Running the same scenario in a sample app vs. your own app is an effective debugging technique — it isolates whether unexpected behavior is in Braze's code or your integration.
