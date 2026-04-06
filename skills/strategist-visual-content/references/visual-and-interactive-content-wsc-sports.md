---
name: visual-and-interactive-content-wsc-sports
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/message_personalization/dynamic_content/visual_and_interactive_content/wsc_sports
indexed_at: '2026-04-05'
keywords:
  - WSC
  - video
  - Braze
  - push
  - notifications
  - campaign
  - segments
  - sports
  - API
  - scheduling
triggers:
  - How to integrate WSC Sports with Braze
  - Send sports videos via push notifications
  - Configure personalized video campaigns
  - Schedule video delivery to users
  - Set up WSC Sports video delivery
---
## WSC Sports Visual Content

WSC Sports generates personalized sports videos and integrates with Braze to deliver them via push notifications.

**What it does:** WSC Sports handles end-to-end video delivery — from video selection to push notification arrival on the user's device.

## Prerequisites

- WSC Sports account
- Braze REST API key with permissions: **Messages**, **Segments**, **Campaigns**, **Canvas**
  - Create at: **Settings > API Keys**

## Setup

### Step 1: Configure in WSC Sports Platform

1. Build your target campaign and user segments in Braze first
2. In WSC Sports, select the desired video
3. In send settings, choose:
   - Braze user segment
   - Campaign ID
   - Send time

### Step 2: API Behavior

WSC Sports calls one of two Braze endpoints depending on options selected:

| Timing | Endpoint |
|--------|----------|
| Scheduled | `POST /messages/schedule/create` |
| Immediate | `POST /messages/send` |

**Push notification payload (iOS):**

```json
{
  "apple_push": {
    "alert": {
      "body": "Push Message Title"
    },
    "asset_url": "internalURI.mp4",
    "asset_file_type": "mp4"
  }
}
```

### Step 3: Test

Send a test and monitor **Braze error message logs** for any issues.
