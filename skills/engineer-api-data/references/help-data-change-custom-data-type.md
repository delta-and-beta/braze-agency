---
name: help-data-change-custom-data-type
source_url: >-
  https://braze-inc.github.io/braze-docs/_help/help_articles/data/change_custom_data_type
indexed_at: '2026-04-05'
keywords:
  - attributes
  - events
  - datatype
  - segments
  - campaigns
  - schema
  - migration
  - filters
  - retroactive
  - dashboard
triggers:
  - change custom attribute data type
  - change custom event data type
  - modify attribute type
  - update event schema
  - handle retroactive data changes
---

# Change custom attribute or event data type

To change the data type of a custom attribute or event, from the Braze dashboard, navigate to **Data Settings** and select either **Custom Attributes** or **Custom Events**.

![Custom Attributes tab to edit attribute or data type]({% image_buster /assets/img/change_custom_attribute.png %})

If you must change the data type of a custom attribute or event (for example, changing `time` to `string`), consider the following:

- Relevant filters in segments, campaigns, Canvases, or other locations using the changed attribute or event are not automatically updated. Before you can modify attributes, you must stop any campaigns or Canvases using the attributes in segments or filters, and remove the attributes from filters that reference them.
- User data will not be retroactively updated. If the changed attribute was on a user profile prior to the data type change, then that value will still be the old data type. This can cause users to fall out of the segments that contain the changed attribute. The filter will actively look for the new data type, but if a profile still has the previous data type, that user will now be excluded from the segment. These users must be updated to fall back into the proper segments. You can do this with the [`users/track` endpoint]({{site.baseurl}}/api/endpoints/user_data/post_user_track/).
- New data will not be accepted if it's not the new data type. For example, an API call to the `users/track` endpoint that contains the previous data type for a changed attribute will not be accepted. You must call the new data type.

_Last updated on March 10, 2026_
