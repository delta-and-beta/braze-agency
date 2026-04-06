---
name: visual-and-interactive-content-niftyimages
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/message_personalization/dynamic_content/visual_and_interactive_content/niftyimages
indexed_at: '2026-04-05'
keywords:
  - personalization
  - images
  - dynamic
  - charts
  - countdown
  - maps
  - polls
  - merge
  - liquid
  - real-time
triggers:
  - create personalized email images
  - add countdown timers to emails
  - generate dynamic email visuals
  - build interactive polls
  - personalize with merge tags
---
## NiftyImages Visual Content

NiftyImages ([niftyimages.com](https://niftyimages.com)) is a real-time email personalization tool that generates dynamic images using Braze merge tags. No Braze integration required — just a NiftyImages account.

**Key privacy note:** All data stays in Braze; NiftyImages only receives what's embedded in the URL.

---

### Supported Dynamic Image Types

| Type | Use Case |
|------|----------|
| Personalized images | First name, loyalty tier, custom attributes |
| Charts & graphs | Points balance, money spent, customer status |
| Maps | Nearest location based on email open location |
| Countdown timers | Birthdays, trial expirations, overdue bills |
| Real-time content | Product recommendations, price drops, inventory |
| Live polls | Engagement and interest tracking |
| Rule-based images | Conditional display by device, OS, time, behavior |

---

### Implementation: 3-Step Workflow

**Step 1 — Create a merge tag in NiftyImages**
- Select a merge tag type and set default values
- Optionally specify data types
- Save the tag for reuse

**Step 2 — Customize the image**
- Configure font, size, position, color, and layering in NiftyImages editor
- Copy the generated image URL (contains Braze Liquid tags embedded in query params)

**Step 3 — Add URL to Braze**
- Paste the NiftyImages URL into a Braze campaign or Canvas email component
- Use Braze's preview to verify Liquid tags render correctly

---

### URL Pattern

NiftyImages URLs encode personalization via Braze Liquid tags in query parameters. Example pattern:

```
https://niftyimages.com/...?firstname={{${first_name} | default: "Friend"}}
```

The image is rendered server-side at open time, making content truly real-time (weather, inventory, etc. reflect current state, not send-time state).
