---
name: visual-and-interactive-content-judo
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/message_personalization/dynamic_content/visual_and_interactive_content/judo
indexed_at: '2026-04-05'
keywords:
  - judo
  - interactive
  - in-app
  - messaging
  - campaign
  - experience
  - personalization
  - onboarding
  - conversion
  - sdk
triggers:
  - integrate Judo with Braze
  - create interactive in-app messages
  - deliver personalized mobile experiences
  - build rich media campaigns
  - set up native in-app content
---
`★ Insight ─────────────────────────────────────`
- Topic files in Nick's architecture are "atomic knowledge units" — they live in `skills/{skill-name}/references/` and should be self-contained so agents can retrieve them independently without needing surrounding context
- Stripping Jekyll template syntax (`{% image_buster %}`, `{: .reset-td-br-1 }`) and internal doc links (`{{site.baseurl}}`) is essential — these are server-side templating artifacts that won't render in a Claude context window
`─────────────────────────────────────────────────`

## Judo Interactive Content

Judo is a server-driven UI platform for delivering rich, native in-app experiences without app updates. The Braze-Judo integration allows campaigns and Canvases to trigger multi-screen, media-rich experiences built in Judo — including video, custom fonts, dark mode, and accessibility support — personalized using Braze data.

### Prerequisites

- **Judo Account**: Required at [judo.app](https://www.judo.app/)
- **Judo SDK**: Integrated into your [iOS](https://github.com/judoapp/judo-ios/) and/or [Android](https://github.com/judoapp/judo-android) apps

### Key Use Cases

- **Onboarding**: Rich native onboarding flows as part of a cross-channel journey; update without app releases
- **Conversion**: Personalized in-app purchase / subscription experiences triggered by Braze campaigns
- **Event-Driven Content**: Previews, promotions, recaps for sports/entertainment or seasonal content

---

### SDK Integration (Side-by-Side)

#### Step 1: Install the Judo-Braze Integration Library

Use the dedicated integration library to automate SDK wiring and enable automatic event tracking.

- [iOS installation](https://github.com/judoapp/judo-braze-ios/wiki#installation)
- [Android installation](https://github.com/judoapp/judo-braze-android/wiki#installation)

#### Step 2: Configure In-App Messaging

Implement custom delegate/listener classes for each platform:

- **iOS**: `ABKInAppMessageControllerDelegate` — [iOS setup](https://github.com/judoapp/judo-braze-ios/wiki#in-app-messaging-setup)
- **Android**: `IInAppMessageManagerListener` — [Android setup](https://github.com/judoapp/judo-braze-android/wiki#in-app-messaging-setup)

---

### Triggering a Judo Experience from a Braze Campaign

#### Step 1: Create a Custom Code In-App Message Campaign

In Braze, create an in-app message campaign with message type **Custom Code**, then select **HTML Upload**. Populate the HTML body with this minimal boilerplate to pass form validation (Judo replaces it at runtime):

```html
<a href="appboy://close">X</a>
```

#### Step 2: Set the Judo Key-Value Pair

Add a custom key-value pair to the campaign extras:

| Key | Value |
|-----|-------|
| `judo-experience` | `<your Judo Experience URL>` |

The Judo-Braze integration library detects this key and injects the Judo Experience in place of the standard Braze in-app message UI.

#### Step 3: Complete the Campaign

Configure delivery trigger, target segments, and any remaining campaign settings as normal. The Judo experience fires whenever the in-app message is triggered.

---

### Data Flow

- **Braze → Judo**: Campaign data and Braze user attributes can personalize Experience content
- **Judo → Braze**: User events and interaction data from the Experience feed back into Braze for attribution and targeting
