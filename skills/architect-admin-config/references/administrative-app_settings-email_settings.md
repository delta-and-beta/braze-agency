---
name: administrative-app_settings-email_settings
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/administrative/app_settings/email_settings
indexed_at: '2026-04-05'
keywords:
  - email
  - outbound
  - sender
  - domain
  - reply-to
  - BCC
  - tracking
  - pixel
  - liquid
  - personalization
triggers:
  - configure outbound email settings
  - set up reply-to address
  - enable BCC for compliance
  - move tracking pixel placement
  - customize sender name and address
---
## Email Settings

Found in **Settings > Email Preferences** in the Braze dashboard.

---

## Outbound Email Settings

Configure the sender name and email addresses used when Braze sends emails. Changes do **not** apply retroactively to existing sends.

### Display Name & Address

Add names and email addresses available in campaign **Sending Info**. Supports three fields:
- **From Display Name**
- **Local Part** (the part before `@`)
- **Domain**

**Liquid personalization** is supported in all three fields. To use Liquid in the Domain field, enable **Customize from display name + address** in campaign Sending Info.

```liquid
{% if ${language} == 'en' %}
English Display Name
{% elsif ${language} == 'de' %}
German Display Name
{% else %}
Default to English Display Name
{% endif %}
```

### Reply-To Address

Add one or more reply-to addresses selectable per campaign. Set a default with **Make Default**. Supports Liquid for dynamic routing:

```liquid
{% if {{custom_attribute.${region}}} == 'US' %}
{% assign address = "us-support@company.com" %}
{% elsif {{custom_attribute.${region}}} == 'EU' %}
{% assign address = "eu-support@company.com" %}
{% else %}
{% assign address = "global-support@company.com" %}
{% endif %}
{{address}}
```

### BCC Address

**Supported ESPs:** SendGrid and SparkPost only (use [message archiving](https://www.braze.com/docs/user_guide/data/export_braze_data/message_archiving/) as an alternative).

- Sends an identical copy of outbound emails to a BCC inbox
- Useful for compliance and customer support retention
- BCC emails are **excluded from reporting and analytics**
- Select **Make Default** to auto-apply to new campaigns
- Override per message by selecting **No BCC**
- Enable **Require a BCC address for all your email campaigns** to enforce globally — also auto-applies to REST API-triggered sends

**Dynamic BCC** (Liquid supported, set in Email Preferences only — not per campaign):

```liquid
{{custom_attribute.${support_agent}}}
```

Only one BCC address per email recipient is allowed.

---

## Open Tracking Pixel

An invisible 1×1 px image automatically inserted into email HTML. Tracks opens by capturing IP address, user agent, and timestamp when the email client loads the pixel.

### Default Placement

Appended to the bottom of the `<body>` tag (consistent with SendGrid and SparkPost defaults).

**Best practice:** Keep Liquid inside `<html>` tags to avoid unexpected pixel placement from malformed document structure.

### Changing Placement

Override the default to move the pixel to the **first tag** in `<body>`:

1. Go to **Settings > Email Preferences**
2. Select: **Move for SendGrid**, **Move for SparkPost**, or **Move for Amazon SES**
3. Click **Save**
