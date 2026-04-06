---
name: get-started-braze-pilot-data-dictionary
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/get_started/braze_pilot/data_dictionary
indexed_at: '2026-04-05'
keywords:
  - braze
  - events
  - attributes
  - apps
  - tracking
  - analytics
  - purchase
  - properties
  - workflow
  - simulation
triggers:
  - what events are tracked
  - view event properties
  - braze pilot data dictionary
  - set up event tracking
  - custom event guide
---
# Braze Pilot Data Dictionary

Each Braze Pilot app simulation logs custom events and attributes prefixed by a short app code:

| Prefix | App |
|--------|-----|
| `mc_` | MovieCanon (streaming) |
| `pl_` | PantsLabyrinth (e-commerce) |
| `st_` | Steppington (fitness) |

---

## MovieCanon Events (`mc_`)

| Name | Properties | Trigger |
|------|-----------|---------|
| `mc_entered_app` | — | User opens the app |
| `mc_watched_movie` | `title: string` | User finishes watching a video |
| `mc_viewed_movie_page` | `title: string` | User views a movie detail page |

---

## PantsLabyrinth Events (`pl_`)

| Name | Properties | Trigger |
|------|-----------|---------|
| `pl_entered_app` | — | User opens the app |
| `pl_viewed_item` | `item_name: string` | User views a product page |
| `pl_added_item_to_wishlist` | `item_name: string` | User adds item to wish list |
| `pl_added_item_to_cart` | `item_name: string` | User adds item to cart |
| `<purchase_event>` | `name: string`, `price: number` | User completes a purchase (Braze purchase event) |

---

## Steppington Events & Attributes (`st_`)

| Name | Type | Properties | Trigger |
|------|------|-----------|---------|
| `st_entered_app` | Event | — | User opens the app |
| `st_viewed_class` | Event | `class_type: string` | User visits a workout page |
| `st_completed_class` | Event | `class_type: string`, `calories_burned: number`, `workout_length: number` | User completes a workout |
| `st_most_recent_completed_class` | Attribute | `string` | Updated when user completes a workout |
| `st_favorited_class` | Event | `class_type: string` | User favorites a class |
| `st_unfavorited_class` | Event | `class_type: string` | User unfavorites a class |
| `st_viewed_premium_benefit` | Event | `benefit_type: string` | User visits Steppington+ tab (requires feature flag enabled) |
| `st_started_free_trial` | Event | — | User taps **Start Free Trial** |
| `st_set_goal` | Event | `goal_name: string`, `goal: number`, `units: string` | User taps **Start Free Trial** (also fires goal data) |

---

## Notes

- `st_completed_class` appears twice in the source — this is likely a documentation duplicate, not two separate events.
- `st_set_goal` fires on the same trigger as `st_started_free_trial` (the **Start Free Trial** button).
- `<purchase_event>` uses Braze's standard purchase event schema, not a custom event name.
- `st_viewed_premium_benefit` only fires when the Steppington+ feature flag is active.
