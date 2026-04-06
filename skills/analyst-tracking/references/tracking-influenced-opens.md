---
name: tracking-influenced-opens
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/analytics/tracking/influenced_opens
indexed_at: '2026-04-05'
keywords:
  - influenced
  - attribution
  - notification
  - session
  - conversion
  - analytics
  - campaign
  - push
  - opens
  - behavioral
triggers:
  - track influenced opens
  - understand push attribution
  - measure app opens
  - view push analytics
  - track push impact
---
## Influenced Opens

Braze distinguishes two types of push-driven app opens:

- **Direct open** — user taps the notification to open the app
- **Influenced open** — user opens the app after receiving a notification *without* tapping it

### Attribution Logic

An influenced open is logged when the user opens the app within:

- **30 minutes** of receiving the push notification, **OR**
- **Less than half the user's average time between sessions** (whichever is shorter)

This makes attribution relative to individual behavior:

| User pattern | Opens app 6h after push | Counted as influenced? |
|---|---|---|
| Opens app 30×/day | 6h is normal behavior | No (or minimal credit) |
| Opens app 1×/month | 6h is unusually soon | Yes |

### Influenced Opens vs. Conversion Events

| | Influenced Opens | Conversion Events |
|---|---|---|
| Window | Dynamic, based on user's session history | Fixed conversion window |
| Attribution | Per-user behavioral baseline | All opens within window credited |
| Granularity | Individual behavior | Campaign-level |

### Viewing in Analytics

On the **Campaign Analytics** page:

- **Total opens** = direct opens + influenced opens
- Shown in both the message performance table and **Historical Performance** section
- **Influenced opens** = Total opens − Direct opens (not shown as a standalone column)
