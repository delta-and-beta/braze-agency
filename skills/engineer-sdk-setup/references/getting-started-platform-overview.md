---
name: getting-started-platform-overview
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/getting_started/platform_overview
indexed_at: '2026-04-05'
keywords:
  - SDK
  - Dashboard
  - API
  - segmentation
  - campaigns
  - events
  - messaging
  - profiles
  - webhooks
  - authentication
triggers:
  - getting started with Braze
  - how to integrate the SDK
  - how to create segments
  - understanding the platform overview
  - managing user data
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's architecture are atomic knowledge units — they live in `skills/{skill-name}/references/*.md` and are loaded selectively based on query depth. Stripping Jekyll template syntax (`{% %}`, `{{site.baseurl}}`), image references, and navigation links is essential because these files are consumed by LLMs, not browsers.
`─────────────────────────────────────────────────`

## Braze Platform Overview

Braze is a customer engagement platform that ingests user data, surfaces user actions and behaviors, and enables targeted responses. It has three primary components: the SDK, the Dashboard, and the REST API.

---

## Core Components

### SDK

Integrated into mobile and web applications. When fully integrated, the SDK:

- Collects and syncs user data into a consolidated user profile
- Automatically collects session data, device info, and push tokens
- Captures marketing engagement data and custom business data
- Has **write-only** access (cannot retrieve user data from your systems)
- Supports server-side JWT signatures for added security
- Is optimized for low-battery or slow-network devices
- Penetration tested by third parties
- Powers push notifications, in-app messages, and Content Cards

### Dashboard

The UI controlling all data and interactions. Two primary audiences:

- **Marketers**: Create content, manage campaigns, build segments
- **Developers**: Manage API keys, push credentials, app settings

Team administrators must add users to the dashboard before they can access Braze.

### REST API

Enables moving data in and out of Braze at scale. Key use cases:

- Sync updates from backend systems, data warehouses, and third-party sources
- Add custom events for segmentation from web-based applications
- Trigger and send messages with complex JSON metadata
- Record user actions directly via HTTP (alternative to SDK)
- Combined with webhooks: track actions and trigger activities inside and outside the app

---

## Data Model

### Retention

Data stored in Braze is retained indefinitely (for the duration of the customer relationship) and is always available for segmentation, personalization, and targeting. Historical data (e.g., purchases from years ago) can power current messaging campaigns.

### App Analytics

- Real-time graphs updated based on analytics metrics and custom events
- A/B testing, custom reporting, and automated intelligence built in

### User Segmentation

Segments are dynamic groups of users based on:

- In-app behavior filters
- Demographic data
- Custom events (any in-app action you define)
- Custom attributes (any user characteristic you define)

Users move in and out of segments automatically as they meet or fail to meet criteria. Example: "Users who spent money in-app and haven't opened the app in 2+ weeks."

---

## Messaging Channels

Braze uses a **channel-agnostic, user-centric data model**. Messages can be sent inside or outside the app experience.

| Channel | Description |
|---|---|
| **Content Cards** | Highly targeted in-app notifications (non-interrupting); carousels, banners |
| **Email** | Rich HTML via drag-and-drop editor, rich-text editor, or custom HTML templates |
| **In-app Messages** | Native UI notifications shown while user is in the app |
| **Push (iOS/Android)** | Triggered via APNs (iOS) or FCM (Android) |
| **SMS / MMS / RCS** | Transactional notifications, promotions, reminders |
| **Web Push** | Push notifications delivered to web browsers |

*Content Cards and SMS/MMS/RCS may require additional contract features.

---

## Architecture Layers (Summary)

The full Braze stack consists of layered capabilities:

1. **Data Ingestion** — SDK, API, partner integrations
2. **Classification** — Segmentation and user profiling
3. **Orchestration** — Campaign and Canvas workflow logic
4. **Personalization** — Dynamic content, Liquid templating
5. **Action** — Delivery across all messaging channels
