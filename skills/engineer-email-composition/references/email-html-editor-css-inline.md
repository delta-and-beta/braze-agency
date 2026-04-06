---
name: email-html-editor-css-inline
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/email/html_editor/css_inline
indexed_at: '2026-04-05'
keywords:
  - inlining
  - CSS
  - email
  - HTML
  - rendering
  - styles
  - editor
  - preferences
  - compatibility
  - elements
triggers:
  - how to inline CSS in emails
  - enable inline CSS in email composer
  - set default CSS inlining
  - configure email style preferences
  - improve email client rendering
---

# CSS inlining

> CSS inlining is a form of email preprocessing that moves styles in a CSS style sheet into the body of an HTML email. The term "inlining" refers to the fact that styles are applied "inline" to individual HTML elements.

For some email clients, CSS inlining can improve the way that emails render and help confirm that your emails look the way you expect. If you already have a majority of the CSS inlined or are confident that your HTML and CSS are compatible with the requirements of most mail clients, it may not be necessary to turn on this feature. It may cause dynamically embedded styles to conflict with your existing inline styles and may alter your expected preview and email rendering.

## Using CSS inlining

You can control whether CSS inlining is turned on or off for any email message using the **Enable inline CSS** toggle in the **Sending Info** tab of the HTML editor.

![Checkbox to manage CSS inlining in HTML composer.]({% image_buster /assets/img_archive/css-inline2.png %}){: style="max-width:40%;"}

### Default inlining state

You can set a default on or off state globally from **Settings** > **Email Preferences**. Locate the setting for **CSS Inlining**. This setting determines the desired default value that all new email messages start with. Note that changing this setting will not affect any of your existing email messages. You can also override this default at any time while composing email messages.

![Inline CSS on new emails by default option located in email settings.]({% image_buster /assets/img_archive/css-inline1.png %})

