---
name: dynamic-content-otherlevels
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/message_personalization/dynamic_content/otherlevels
indexed_at: '2026-04-05'
keywords:
  - otherlevels
  - video
  - generation
  - braze
  - api
  - personalization
  - push
  - talent
  - composition
  - connected-content
triggers:
  - generate personalized videos
  - send video push notifications
  - integrate braze connected content
  - create talking head videos
  - compose video overlay
---
# OtherLevels Dynamic Content

OtherLevels integrates with Braze to generate GenAI personalized videos via API, delivered to users as iOS push videos through Braze Connected Content.

## Prerequisites

| Requirement | Detail |
|---|---|
| OtherLevels account | Required for API access and talent provisioning |
| Braze REST API key | Needs `users.track` permission |
| Braze REST endpoint | Instance-specific URL |

## How It Works

1. Call OtherLevels API to generate a video (can take up to 30 minutes)
2. Use Braze Connected Content to embed the generated video URL in a push message
3. Plan API calls ahead of Braze send schedules to account for generation time

## Video Generation API Call

**Endpoint:** `POST https://exp-platform-api.prod.awsotherlevels.com/v1/app/{OTHERLEVELS_PROJECT_KEY}/media`

```bash
curl --request POST \
  --url 'https://exp-platform-api.prod.awsotherlevels.com/v1/app/OTHERLEVELS_PROJECT_KEY/media?=' \
  --header 'Content-Type: application/json' \
  --data '{
    "task": {
        "type": "tasks",
        "tasks": {
            "image_video_overlay": {
                "width": "= .orientation == '\''portrait'\'' ? '\''1080'\'' : '\''1920'\''",
                "height": "= .orientation == '\''portrait'\'' ? '\''1920'\'' : '\''1080'\''",
                "color": "255,255,255,0",
                "y_pos": "0",
                "x_pos": "0",
                "image_input": "= tasks.resize_image.jpg ?? tasks.resize_image.png",
                "video_input": "= tasks.talking_talent_replace_bg.mp4",
                "type": "compose.ImageVideoOverlay"
            },
            "resize_image": {
                "media_input": "= tasks.bg_image.jpg ?? tasks.bg_image.png",
                "type": "compose.MediaResize",
                "width": "= .orientation == '\''portrait'\'' ? '\''1080'\'' : '\''1920'\''",
                "height": "= .orientation == '\''portrait'\'' ? '\''1920'\'' : '\''1080'\''"
            },
            "bg_image": {
                "type": "load",
                "url": "BACKGROUND_IMAGE_URL",
                "refresh_interval": "12h"
            },
            "talking_head": {
                "test": false,
                "title": "INSERT_TITLE",
                "caption": false,
                "templateId": "TALENT_TEMPLATE",
                "type": "TALENT_MODEL",
                "variables": {
                    "script": {
                        "name": "script",
                        "properties": {
                            "content": "= tasks.translate_text.text"
                        },
                        "type": "text"
                    }
                }
            },
            "translate_text": {
                "type": "translate_text",
                "source": "en",
                "target": "en",
                "text": "INSERT_SCRIPT"
            },
            "talking_talent_speed": {
                "type": "compose.VideoSetSpeed",
                "speed": "1.0",
                "video_input": "= tasks.talking_head.mp4"
            },
            "talking_talent_replace_bg": {
                "type": "compose.VideoReplaceBg",
                "video_background": "= tasks.resize_image.jpg ?? tasks.resize_image.png",
                "video_input": "= tasks.talking_talent_speed.mp4"
            }
        },
        "output": "image_video_overlay"
    }
}'
```

### Placeholder Reference

| Placeholder | Description |
|---|---|
| `OTHERLEVELS_PROJECT_KEY` | Provided at OtherLevels account provisioning |
| `BACKGROUND_IMAGE_URL` | HTTPS URL for video background image |
| `INSERT_TITLE` | Internal reference title (not displayed in video) |
| `TALENT_TEMPLATE` | Talent Template ID (provided at provisioning) |
| `TALENT_MODEL` | Talent Model ID (provided at provisioning) |
| `INSERT_SCRIPT` | Script text for the AI avatar to speak |

## Pipeline Task Structure

The API call chains these task types in sequence:

- `load` — Fetches background image from URL, cached for 12h
- `compose.MediaResize` — Resizes image to match video orientation
- `translate_text` — Handles script text (supports cross-language translation)
- `TALENT_MODEL` (talking_head) — Generates AI avatar video from script
- `compose.VideoSetSpeed` — Adjusts playback speed (default 1.0)
- `compose.VideoReplaceBg` — Composites avatar over background
- `compose.ImageVideoOverlay` — Final output combining image + video layers

Orientation-aware sizing: portrait = 1080×1920, landscape = 1920×1080.

## Notes

- Video generation is asynchronous — poll or schedule ahead of send time
- OtherLevels provisions talent avatars (templates + models) during onboarding
- Recommend using Postman or similar API client over raw cURL for automation
- Integration is maintained by OtherLevels (not Braze)
