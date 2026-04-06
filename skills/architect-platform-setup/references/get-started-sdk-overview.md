---
name: get-started-sdk-overview
source_url: 'https://braze-inc.github.io/braze-docs/_user_guide/get_started/sdk_overview'
indexed_at: '2026-04-05'
keywords:
  - sdk
  - integration
  - segmentation
  - notification
  - messaging
  - events
  - attributes
  - workspace
  - channels
  - profile
triggers:
  - how to integrate the sdk
  - set up push notifications
  - send in-app messages
  - target users with messaging
  - segment for campaigns
---
# Braze SDK Overview

The Braze SDK collects session data, identifies users, and records purchases and custom events through your website or app. It powers in-app messages and push notifications sent from the Braze dashboard.

## Core Functions

- Collects and syncs user data into a consolidated user profile
- Captures marketing engagement data and custom business data
- Powers push notifications, in-app messages, and Content Card channels

## Implementation

Integration requires your Engineering team to add the SDK code to your app/site codebase. The SDK is designed to be lightweight and straightforward to integrate (typically ~1 hour).

**Best practice:** Set up custom events, custom attributes, and the SDK simultaneously to save time and ensure smooth integration.

## Data Aggregation

The SDK automatically captures user-level data. Group similar apps (e.g., iOS and Android) into a single workspace to view collected data across platforms.

## Messaging Channels

### In-App Messages
Compose and send directly via SDK. Message types: slideup, modal, or fullscreen.

### Push Notifications
- **Mobile push**: appears on users' devices
- **Web push**: appears even when the site is not open
- Users must opt-in; use push priming to request permission

## Segmentation for SDK-Delivered Messages

By default, in-app message campaigns send to all app versions in a workspace. To target only web or only mobile:

1. Go to segment settings → **Apps and websites targeted**
2. Select **Users from specific apps**
3. Choose only the desired platform (web or mobile)

This enables use cases like targeting web users to encourage mobile app downloads, or sending mobile-only in-app messages by excluding the web app from the segment.

## Supported Platforms

Web, Android, Swift, and others. See the [Braze Developer Guide](https://www.braze.com/docs/developer_guide/home) for the complete list.
