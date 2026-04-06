---
name: data-warehouses-snowflake-entity-relationships
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/data_and_analytics/data_warehouses/snowflake/entity_relationships
indexed_at: '2026-04-05'
keywords:
  - relationships
  - entities
  - Snowflake
  - Braze
  - channels
  - schema
  - tables
  - integration
  - messaging
  - fields
triggers:
  - entity relationships between Snowflake and Braze
  - table relationships messaging channels
  - shared fields data integration
  - Braze Snowflake entity mapping
  - database schema reference
---

# Entity relationships for Snowflake and Braze

> These are the list of entity relationships between Snowflake and Braze for each messaging channel.

{% alert important %}
The entity relationship diagrams highlight shared fields and relationships across tables and are not full table schemas. For a complete list of fields, refer to the [individual table schemas]({{site.baseurl}}/assets/download_file/data-sharing-raw-table-schemas.txt).
{% endalert %}

{% sdktabs %}
{% sdktab Content Cards %}
{% multi_lang_include snowflake_users_messages/contentcard.md %}
{% endsdktab %}

{% sdktab Email %}
{% multi_lang_include snowflake_users_messages/email.md %}
{% endsdktab %}

{% sdktab Feature Flags %}
{% multi_lang_include snowflake_users_messages/featureflag.md %}
{% endsdktab %}

{% sdktab In-App Messages %}
{% multi_lang_include snowflake_users_messages/inappmessage.md %}
{% endsdktab %}

{% sdktab Push Notifications %}
{% multi_lang_include snowflake_users_messages/pushnotification.md %}
{% endsdktab %}

{% sdktab SMS %}
{% multi_lang_include snowflake_users_messages/sms.md %}
{% endsdktab %}

{% sdktab Webhook %}
{% multi_lang_include snowflake_users_messages/webhook.md %}
{% endsdktab %}

{% sdktab WhatsApp %}
{% multi_lang_include snowflake_users_messages/whatsapp.md %}
{% endsdktab %}
{% endsdktabs %}
