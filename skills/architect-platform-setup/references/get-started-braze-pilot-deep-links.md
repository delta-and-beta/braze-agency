---
name: get-started-braze-pilot-deep-links
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/get_started/braze_pilot/deep_links
indexed_at: '2026-04-05'
keywords:
  - deeplink
  - navigation
  - braze-pilot
  - URI
  - workout
  - parameters
  - steppington
  - fitness
  - icons
triggers:
  - how to create deep links
  - how to set up navigation
  - how to customize workout screens
  - braze deep link setup
  - query parameter configuration
---
## Braze Pilot Deep Links

Braze Pilot supports deep linking from Braze messaging into specific app screens. Use the `braze-pilot://navigation/` URI scheme to drive users to particular sections or dynamically customize content via query parameters.

---

## General Navigation

| Screen | Deep Link |
|--------|-----------|
| Projects | `braze-pilot://navigation/projects` |
| Log Data | `braze-pilot://navigation/logdata` |
| Setup | `braze-pilot://navigation/setup` |
| Change Language | `braze-pilot://navigation/selectlanguage` |
| Camera | `braze-pilot://navigation/camera` |

---

## Steppington (Fitness Demo App)

### Simple Deep Links (no parameters)

| Screen | Deep Link |
|--------|-----------|
| Splash | `braze-pilot://navigation/steppington/splash` |
| Home | `braze-pilot://navigation/steppington/home` |
| Steppington+ | `braze-pilot://navigation/steppington/plus` |
| Goals | `braze-pilot://navigation/steppington/goals` |
| Change Goals | `braze-pilot://navigation/steppington/changegoals` |

### Parameterized Deep Links

| Screen | Base Deep Link |
|--------|----------------|
| Workout | `braze-pilot://navigation/steppington/workout` |
| Active Workout | `braze-pilot://navigation/steppington/activeworkout` |

**Full example:**
```
braze-pilot://navigation/steppington/workout?title=Running&icon=HEART_DETAILS&image=https://picsum.photos/400&info=This%20workout%20is%20awesome%21&workout=5k%20Run&calories=600&length=25&workout_info_left_text=Road%20Run&workout_info_left_icon=RUNNING_HOME&workout_info_center_text=120%20BPM&workout_info_center_icon=HEART_DETAILS&workout_info_right_text=25%3A00&workout_info_right_icon=TIMER_DETAILS
```

### Workout Parameters

| Parameter | Required | Type | Default | Description |
|-----------|----------|------|---------|-------------|
| `title` | Yes | String | — | Screen title |
| `icon` | No | String | `RUNNING_HOME` | Icon identifier |
| `image` | Yes | String | — | Image URL |
| `info` | Yes | String | — | Text above workout start button |
| `workout` | Yes | String | — | Workout name (sent in `st_completed_class` event) |
| `calories` | No | Number | Random 500–1250 | Calories shown; sent in `st_completed_class` event |
| `length` | No | Number | — | Workout duration; sent in `st_completed_class` event |
| `workout_info_left_text` | No | String | — | Left card text on active workout screen |
| `workout_info_left_icon` | No | String | — | Left card icon |
| `workout_info_center_text` | No | String | — | Center card text |
| `workout_info_center_icon` | No | String | — | Center card icon |
| `workout_info_right_text` | No | String | — | Right card text |
| `workout_info_right_icon` | No | String | — | Right card icon |

### Available Icons

| Icon Value | Represents |
|------------|------------|
| `RUNNING_HOME` | Running shoe |
| `HEART_DETAILS` | Heart |
| `TIMER_DETAILS` | Stopwatch |
| `YOGA_HOME` | Yoga pose |
| `BICYCLE_HOME` | Bicycle |
| `DUMBBELL_HOME` | Dumbbell |

---

## PantsLabyrinth (E-commerce Demo App)

### Simple Deep Links (no parameters)

| Screen | Deep Link |
|--------|-----------|
| Splash | `braze-pilot://navigation/pantslabyrinth/splash` |
| Welcome | `braze-pilot://navigation/pantslabyrinth/welcome` |

### Parameterized Deep Links

**Full example:**
```
braze-pilot://navigation/pantslabyrinth/itemdetails?name=Jeans&price=85&image=https://picsum.photos/400&description=This%20item%20is%20awesome%21&quantity=2&size=Large&colors=%230000FF,%23FF0000&color_strings=White,Blue&selected_color=1
```

> **Note:** Source content was truncated. Full PantsLabyrinth parameter list may be incomplete.

---

## Key Notes

- URL-encode string values (e.g., spaces as `%20`, `!` as `%21`, `:` as `%3A`)
- Workout events (`calories`, `length`, `workout`) feed into the `st_completed_class` Braze custom event
- Deep link parameters allow per-user content personalization via Braze Liquid templating
