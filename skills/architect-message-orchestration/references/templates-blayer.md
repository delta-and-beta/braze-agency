---
name: templates-blayer
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/message_orchestration/templates/blayer
indexed_at: '2026-04-05'
keywords:
  - messaging
  - in-app
  - builder
  - Braze
  - branding
  - tracking
  - surveys
  - CRM
  - mobile
  - custom
triggers:
  - how to build in-app messages
  - how to export to Braze
  - how to track button interactions
  - how to design surveys
  - how to set up B.Layer
---

# B.Layer

> [B.Layer](https://blayer.phiture.com) is Phiture's in-app message builder that helps mobile apps' CRM teams to create custom-designed in-app messages simply, rapidly, and without coding. 

_This integration is maintained by B.Layer._

## About the integration

The Braze and B.Layer integration allows you to use the B.Layer in-app message builder to help you build on-brand in-app messages that can be exported as a zip file or inline HTML to Braze. This integration does not require additional developer resources, saving you time and budget.

![]({% image_buster /assets/img/blayer/blayer2.png %})

## Prerequisites

| Requirement | Description |
| ----------- | ----------- |
| B.Layer account | A [B.Layer](https://blayer.phiture.com) account is required to take advantage of this partnership. |
{: .reset-td-br-1 .reset-td-br-2 role="presentation" }

## Use cases

With B.Layer there are endless opportunities to build and experiment with, including product recommendation sliders, multi-screen onboarding or surveys, NPS, email capture, special offers, and more.

They are working with brands like Lifesum, Blinkist, OnX Hunt, and many more to help improve their user experience without extra resources. We are also among the finalist of the APS Awards 2022 in the app innovation category.

## Integration

### Step 1: Create your in-app message

#### Set brand colors and fonts

In B.Layer, on the hamburger menu at the top of the page, click **Brand assets > add your brand assets**. Here, you can assign your brand color and fonts. 
You are all set. Now you can start designing your in-app message.

![]({% image_buster /assets/img/blayer/blayer4.png %})

#### Design your in-app message

To design your in-app message, select a single in-app message. Next, style your message and add the components you need. Each component can be adjusted.

![]({% image_buster /assets/img/blayer/blayer5.png %})

### Download your in-app message

Once you are done, download your message. Your message can be downloaded as a ZIP or inline HTML. 

### Step 2: Add B.Layer custom code

In Braze, create a custom code in-app message. If you have a ZIP file, drag and drop it into the box above the code section. If you have an inline HTML file, paste the inline HTML into the HTML section.

![]({% image_buster /assets/img/blayer/blayer6.png %})

## Button tracking

With B.Layer, you can log button interactions or text input as a Braze attribute. That can be done within the editor. A popular example is an NPS survey.

B.Layer uses Braze button tracking added to the links you enter (for example, `?button=0`). This way, you can see the button clicks in the analytics part of your campaign.


