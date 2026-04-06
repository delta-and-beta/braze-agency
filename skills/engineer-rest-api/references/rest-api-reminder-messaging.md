---
name: rest-api-reminder-messaging
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/rest_api/reminder_messaging
indexed_at: '2026-04-05'
keywords:
  - reminders
  - landing-pages
  - preferences
  - campaigns
  - attributes
  - personalization
  - lpBridge
  - messaging
triggers:
  - Set up reminder messaging via landing page
  - Capture user reminder preferences
  - Send event-based reminders with custom attributes
  - Create personalized reminder campaigns
---
# Reminder Messaging via API

Allow users to self-select reminder dates for upcoming events using Braze landing pages, custom attributes, and campaigns. No extra backend required.

## Key Capabilities
- Users choose their reminder date relative to an event
- Preferences captured via landing page, written directly to user profiles
- Supports shared event dates (boolean attributes) and personal dates (nested objects)
- Composable with delays, retargeting, and A/B testing

## Prerequisites
- Landing page access in Braze
- Basic Liquid knowledge (for `{% landing_page_url %}` tag)
- HTML/JavaScript (Option B only)

---

## Step 1: Create Landing Page & Link

Create a landing page, then link to it from a campaign message using the `{% landing_page_url %}` Liquid tag:

```html
<a href="{% landing_page_url your-page-url-handle %}">Sign up for reminders</a>
```

This tag automatically identifies the user — no manual URL parameters needed. Submitted preferences write to the existing user profile.

---

## Step 2: Capture Preferences

### Option A: Shared Dates (Drag-and-Drop Checkboxes)

Use built-in **Checkbox** form blocks for events where many users share the same date (holidays, sporting events).

Each checkbox natively sets a **boolean custom attribute** on submit — no code required.

Example: Checkbox labeled "Super Bowl 2026 reminder" maps to `super_bowl_2026_reminder`. On submit:
```
super_bowl_2026_reminder = true
```

Use this attribute directly in segment filters to build your audience.

### Option B: Personal Dates (Custom Code Block)

For user-specific dates (birthdays, anniversaries), use a **Custom Code** block with the `lpBridge` API. Store preferences as a **nested custom attribute array of objects** — supports multiple reminders per user and derived fields like `next_reminder_name`.

#### Script Pattern

```html
<script async="true">
  const registerButtonId = "YOUR_BUTTON_ID";
  const messageDivId = "YOUR_MESSAGE_DIV_ID";
  const successMessage = "You're all set! We'll send your reminder.";

  document.addEventListener("DOMContentLoaded", () => {
    // Remove default redirect behavior
    props[registerButtonId].onclickContract[0].brazeEvents =
      props[registerButtonId].onclickContract[0].brazeEvents.filter(
        (event) => event.eventType !== "REDIRECT"
      );

    const registerButton = document.getElementById(registerButtonId);
    if (registerButton) {
      registerButton.addEventListener("click", async (event) => {
        event.preventDefault();

        // Write custom attribute
        await window.lpBridge.setCustomUserAttribute("key", "value");

        // Flush to Braze
        await window.lpBridge.requestImmediateDataFlush();

        // Update UI
        registerButton.remove();
        document.getElementById(messageDivId).innerHTML = successMessage;
      });
    }
  });
</script>
```

**Finding element IDs:** Preview page → right-click → Inspect → locate button/message IDs in HTML.

---

## Step 3: Set Up Campaigns

### Option A: Shared Dates
- Use the boolean attribute as a **segment filter**
- Create a one-time scheduled campaign before the event date

### Option B: Personal Dates
- Use **Nested Custom Attribute** audience filter: "reminder date within X days"
- Create a **daily recurring campaign** — each day targets users whose reminder window matches

---

## Step 4: Verify Integration

1. Send yourself a landing page link and submit the form
2. Confirm the custom attribute appears on your user profile in the dashboard
3. Send a test reminder message and verify personalization renders correctly
4. Monitor results after launch

---

## Architecture Summary

| Scenario | Attribute Type | Capture Method | Campaign Type |
|---|---|---|---|
| Shared dates (holidays, events) | Boolean custom attribute | DnD Checkbox block | Scheduled one-time |
| Personal dates (birthdays, etc.) | Nested custom attribute array | Custom Code + `lpBridge` | Daily recurring |

`★ Insight ─────────────────────────────────────`
- The `lpBridge` API is Braze's bridge between landing page DOM events and the user profile — `setCustomUserAttribute` + `requestImmediateDataFlush` is the minimal two-step write pattern
- Using an array of objects for personal reminders (vs. flat attributes) preserves extensibility: future derived fields like `next_reminder_name` don't require schema changes
- The `{% landing_page_url %}` Liquid tag is doing implicit session binding — it embeds a user token in the URL so no `external_id` query param is needed on the frontend
`─────────────────────────────────────────────────`
