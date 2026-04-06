---
name: sms-mms-rcs-link-shortening
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/sms_mms_rcs/link_shortening
indexed_at: '2026-04-05'
keywords:
  - shortening
  - links
  - SMS
  - RCS
  - MMS
  - domain
  - unified
  - messaging
  - personalization
triggers:
  - enable link shortening
  - set up custom domain
  - test shortened links
  - configure link shortening
  - personalize shortened links
---

# Link shortening

> This page covers how to turn on link shortening in your SMS and RCS messages, test shortened links, use your custom domain in shortened links, and more.

{% alert important %}
Braze is gradually rolling out [unified link shortening]({{site.baseurl}}/user_guide/message_building_by_channel/sms_mms_rcs/link_shortening/?sdktab=unified), which consolidates all SMS and RCS shortened links into a single personalized link format (for example, `brz.ai/abcdefgh`). 
{% endalert %}

{% sdktabs %}
{% sdktab Legacy %}

{% multi_lang_include link_shortening_temp/legacy_link_shortening.md %}

{% endsdktab %}
{% sdktab Unified %}

{% multi_lang_include link_shortening_temp/unified_link_shortening.md %}

{% endsdktab %}
{% endsdktabs %}
