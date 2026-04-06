---
name: message-personalization-creative-studio-canva
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/message_personalization/creative_studio/canva
indexed_at: '2026-04-05'
keywords:
  - canva
  - integration
  - export
  - media
  - library
  - assets
  - authorization
  - workspace
  - apps
triggers:
  - export canva designs to braze
  - push canva assets to media library
  - connect canva to braze account
  - authorize canva integration
  - upload canva images to braze
---

# Canva

> [Canva](https://www.canva.com/) is a graphic design platform and tool that allows you to create visual content for social media posts, presentations, videos, and more.

## About the integration

The Braze and Canva integration allows you to push assets from Canva directly into the Braze media library.

## Integration

### Step 1: Install the Braze App in Canva

You can find the Braze App in the [Canva Apps Marketplace](https://www.canva.com/your-apps/AAG1cO7kIyc).

After installing the app, it's available within a design, under the **Apps** menu.

![Braze app in the Canva Apps menu.]({% image_buster /assets/img/canva_integration/braze-canva-app.png %})

### Step 2: Authorize your Braze account

Launch the Braze app, and select **Connect** to begin the authorization flow. This grants Canva access to list the Braze workspaces you have access to, as well as permission to create new Media Library assets on your behalf.

![Connect button and authorization flow for linking Canva to Braze.]({% image_buster /assets/img/canva_integration/canva-connect-panel.jpg %})

### Step 3: Export the image to Braze

When you're ready to export your Canva design to Braze, choose your desired destination workspace, optionally provide a filename, and select **Start Export**.

![Canva export screen with destination workspace and Start Export button.]({% image_buster /assets/img/canva_integration/canva-upload-screen.jpg %})

### Step 4: Result

When your export completes, your new asset is available in the Media Library, with a source of "Canva".

![Exported Canva asset in the Braze Media Library.]({% image_buster /assets/img/canva_integration/media-library-source.jpg %})
