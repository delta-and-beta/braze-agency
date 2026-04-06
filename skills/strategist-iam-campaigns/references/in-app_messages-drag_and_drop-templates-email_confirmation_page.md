---
name: in-app_messages-drag_and_drop-templates-email_confirmation_page
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/in-app_messages/drag_and_drop/templates/email_confirmation_page
indexed_at: '2026-04-05'
keywords:
  - email
  - signup
  - confirmation
  - template
  - capture
  - subscription
  - validation
  - in-app
  - form
triggers:
  - create email sign-up with confirmation page
  - build email capture form
  - set up email subscription
  - customize email sign-up form
---

# Email sign-up with confirmation page

> Use the in-app message drag-and-drop editor to create an email sign-up form with a confirmation page.

{% multi_lang_include drag_and_drop/templates.md section='SDK requirements' %}

## Creating an email sign-up form with a confirmation page

### Step 1: Choose your template

When creating a drag-and-drop in-app message, select **Email sign-up with confirmation page** for your template, then select **Build message**. This template is supported for both mobile apps and web browsers.

![The in-app message editor with the template for an email sign-up form with confirmation page.]({% image_buster /assets/img/drag_and_drop/templates/email_capture_confirmation.png %})

### Step 2: Set up your message styles

{% multi_lang_include drag_and_drop/templates.md section='message style' %}

### Step 3: Customize your email sign-up component

To get started building your email sign-up form, select the email capture element in the editor. By default, collected email addresses will have the global subscription group **Subscribed**. To opt in users to specific subscription groups, refer to [Updating email subscription states]({{site.baseurl}}/user_guide/message_building_by_channel/email/managing_user_subscriptions#updating-email-subscription-states).

You can customize the placeholder text and label text of the email capture element.

![The in-app message editor with a side menu for customizing the email capture element.]({% image_buster /assets/img/drag_and_drop/templates/email_capture_field_confirmation.png %})

#### Email validation

{% multi_lang_include drag_and_drop/templates.md section='email validation' %}

### Step 4: Add disclaimer language (optional)

{% multi_lang_include drag_and_drop/templates.md section='email disclaimer' %}

### Step 5: Style your message

Customize the look and feel of your email sign-up form and confirmation page using the drag-and-drop [in-app message components]({{site.baseurl}}/user_guide/message_building_by_channel/in-app_messages/drag_and_drop/style_settings/#message-components).

## Analyzing the results

{% multi_lang_include drag_and_drop/templates.md section='reporting' %}

## Best practices

{% multi_lang_include drag_and_drop/templates.md section='email double opt-in' %}


