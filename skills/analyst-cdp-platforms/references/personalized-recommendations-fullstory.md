---
name: personalized-recommendations-fullstory
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/message_personalization/dynamic_content/personalized_recommendations/fullstory
indexed_at: '2026-04-05'
keywords:
  - FullStory
  - Braze
  - Canvas
  - session
  - personalization
  - behavioral
  - Connected Content
  - API
  - messaging
  - context
triggers:
  - integrate FullStory with Braze
  - fetch session data in Canvas
  - personalize campaigns with behavioral data
  - use FullStory session summary API
  - send contextual messages from user sessions
---
`★ Insight ─────────────────────────────────────`
- Topic files in this codebase are atomic knowledge units nested in `skills/{name}/references/*.md` — they're designed for quick lookup during agent routing, so brevity and density matter more than exhaustive coverage
- The "self-contained" requirement is especially important here: agents may fetch a single topic file without surrounding context, so every reference needs enough scaffolding to be actionable standalone
`─────────────────────────────────────────────────`

## FullStory + Braze Integration

FullStory's behavioral data platform captures detailed session metadata. The Braze integration uses FullStory's **Session Summary API** via **Connected Content** to deliver hyper-contextual messaging — particularly in multi-step Canvas journeys.

**Key architectural choice**: Store session data in a Canvas Context step (not as Braze custom events/attributes) to keep it ephemeral and avoid profile bloat.

---

## Prerequisites

| Requirement | Notes |
|---|---|
| FullStory Session API Token | Created in FullStory Settings > API Keys |
| Braze Connected Content Auth Token | Early Access — contact Braze CSM |
| Braze Canvas Context step | Early Access |
| Braze AI Agent step | Early Access (optional, for AI-generated messaging) |

---

## Setup

### 1. FullStory API Key

1. In FullStory: **Settings > API Keys**
2. Select **Standard** permission level
3. Copy key immediately (shown once only)

### 2. FullStory Session Summary Profile

Create a session summary profile via [FullStory's API](https://developer.fullstory.com/anywhere/activation/ai-session-summary-api/#step-1-creating-and-managing-summary-profiles). The response returns a `profile_id` used in Connected Content calls.

### 3. Braze Connected Content Credential

1. In Braze: **Settings > Workspace Settings > Connected Content > Add Credential > Token Authentication**
2. Name: `fullstory`
3. Header key: `Authorization` — value: FullStory API token from Step 1
4. Allowed Domain: `api.fullstory.com`

---

## Canvas Implementation

### Trigger

Use FullStory [Activation Streams](https://help.fullstory.com/hc/en-us/articles/360045134554-Streams) to trigger a Braze Canvas immediately after key user interactions. FullStory automatically passes `client_session_id` as a Canvas entry property.

### Canvas Context Step — Fetch Session Data

In a Canvas Context step, create a variable `summary_result` using this Connected Content call:

```liquid
{% connected_content https://api.fullstory.com/v2/sessions/{{canvas_entry_properties.${client_session_id} | url_encode}}/summary?config_profile=[YOUR-FULLSTORY-PROFILE-ID] :auth_credentials fullstory :save summary_result %}
{{summary_result | as_json_string }}
```

Access the response in subsequent Canvas steps via:
```liquid
{{context.${summary_result}.response}}
```

### Example Session Summary API Response

```json
{
  "response": {
    "primary_goal": "User attempted to update payment method.",
    "issues_encountered": [
      "Received 'invalid card number' error twice.",
      "Clicked 'Submit' button multiple times with apparent frustration."
    ],
    "final_action": "Navigated away from payment page to dashboard.",
    "reason_for_termination_suggestion": "Could not update payment method successfully.",
    "help_pages_visited": ["/help/payment-errors"]
  }
}
```

### Using Session Data Downstream

Access individual fields in later Canvas steps:

```liquid
{{context.${summary_result}.response.primary_goal}}
{{context.${summary_result}.response.issues_encountered}}
{{context.${summary_result}.response.final_action}}
```

Use cases for the retrieved data:
- **AI Agent step**: Pass full session context to generate a personalized recovery message (e.g., abandoned cart)
- **Audience Paths**: Branch users based on `issues_encountered` or `final_action`
- **Direct personalization**: Reference `primary_goal` or `help_pages_visited` inline in message copy

`★ Insight ─────────────────────────────────────`
- The `client_session_id` is the integration's linchpin — it flows automatically from FullStory through Canvas entry properties and is used as the lookup key for the Session Summary API
- Using `url_encode` on the session ID in the Connected Content URL is a subtle but critical detail to preserve: session IDs may contain characters that break URL parsing
- The Canvas Context approach (vs. writing to user profiles) reflects a broader Braze pattern: ephemeral per-journey state belongs in Context, persistent cross-journey state belongs in user profiles
`─────────────────────────────────────────────────`
