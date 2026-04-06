---
name: get-started-braze-pilot
source_url: 'https://braze-inc.github.io/braze-docs/_user_guide/get_started/braze_pilot'
indexed_at: '2026-04-05'
keywords:
  - sdk
  - pilot
  - dashboard
  - campaigns
  - canvases
  - messaging
  - profiles
  - events
  - integration
  - in-app
triggers:
  - how to use braze pilot
  - test campaigns and canvases
  - create user profiles in pilot
  - connect pilot to dashboard
  - log custom events in pilot
---
# Braze Pilot Program

Braze Pilot is a sandbox environment with realistic app simulations for testing and demonstrating Braze features before integrating with a real app.

## App Simulations

| App | Industry | Key Features |
|-----|----------|--------------|
| **Steppington** | Fitness | Workouts, exercise goals, premium service (Steppington+). Demonstrates Content Cards, feature flags, and rich custom event logging. |
| **PantsLabyrinth** | eCommerce | Full shopping cart/checkout, wishlist via feature flag. |
| **MovieCanon** | Streaming | Content engagement use cases. |

## SDK Connection

Connecting Pilot to your Braze dashboard initializes the Braze SDK using your **API key**. Once connected, Pilot behaves identically to a real SDK integration:

- Stores user activity data (including custom events for each fictional brand)
- Auto-collects session data, device info, and push tokens
- Powers push notifications, in-app messages, and Content Cards

## User Profiles

All data sent through Pilot is stored in a Braze user profile. Two profile types can be created:

### Anonymous
- Created when Pilot is initialized without login
- Braze logs activity to an anonymous user profile
- Can be targeted by campaigns, but not directly searchable in the dashboard

### Identified
- Recognized via a unique **external identifier**
- User profile is searchable in the **User Search** page of the dashboard
- Stores all attributes and events logged from Pilot activity

### Connection Status (top-right indicator)
- **Not connected** — SDK connection not yet initialized
- **Anonymous** — logging as anonymous user
- **[user icon + external ID]** — logging as identified user

## Campaigns vs. Canvases

| | Campaigns | Canvases |
|--|-----------|----------|
| **Best for** | Single messages to a specific audience segment | Multi-step, automated customer journeys |
| **Supports** | Multiple channels in one send | Branching logic, delays, decision points, conversion events |

## Supported Messaging Channels

Pilot currently supports **in-app messages** — messages that appear while the user is actively in the app.
