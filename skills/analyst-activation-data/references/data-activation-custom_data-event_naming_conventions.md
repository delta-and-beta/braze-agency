---
name: data-activation-custom_data-event_naming_conventions
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/data/activation/custom_data/event_naming_conventions
indexed_at: '2026-04-05'
keywords:
  - events
  - naming
  - properties
  - attributes
  - taxonomy
  - instrumentation
  - targeting
  - channels
  - casing
  - groups
triggers:
  - how to name events
  - event naming best practices
  - naming conventions for events
  - when to use properties vs events
  - organizing event taxonomy
---
## Event Naming Conventions

Consistent event and attribute naming keeps data clean and prevents issues like targeting the wrong audience or generating incorrect results.

### Naming Structure

Use the pattern: **`group_noun_action`**

- All lowercase (avoids casing instrumentation errors)
- Use groups to categorize product areas (makes events self-documenting)
- Avoid similar names between events
- Keep names concise — long strings are truncated in the Braze dashboard

### Properties vs. Separate Events

When events are inherently the same but differ slightly (e.g., different channels), use **one event + properties** rather than multiple events. This keeps the taxonomy clean and makes user flow analysis easier.

### Best Practices

| Rule | Example |
|------|---------|
| Use group prefix | `user_signup`, `newsletter_subscribed` |
| Avoid vague suffixes | `user_signup` not `signup_event_1` |
| Consistent casing | `cart_item_added` not `Cart_Item_Added` |
| Avoid similar names | Don't have both `item_add` and `item_added` |

### Examples

```
user_signup              ✓ clear group + action
newsletter_subscribed    ✓ clear group + action
signup_event_1           ✗ vague, no group context
```

**Reference:** [Event Properties Object](https://www.braze.com/docs/api/objects_filters/event_object/#event-properties-object) for using properties to differentiate similar events.
