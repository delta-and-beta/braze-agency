---
name: engagement-tools-templates-and-media-faqs
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/templates_and_media/faqs
indexed_at: '2026-04-05'
keywords:
  - storage
  - assets
  - images
  - cropping
  - upload
  - media
  - metadata
  - formats
  - limits
  - retention
triggers:
  - how to crop images
  - upload troubleshooting
  - supported file types
  - image size limits
  - fix metadata errors
---
## Templates and Media FAQs

### Storage & Retention

- **Storage limits:** No storage limits for assets; maximum **5 MB per file**.
- **Expiration:** Assets are retained for the entire duration of your Braze contract — no expiration.

### Supported File Types

| Type | Supported | Notes |
|------|-----------|-------|
| Images (JPG, PNG, etc.) | Yes | Max 5 MB |
| GIF | Yes (no cropping) | Upload only; cropping unsupported |
| Video | No | Host externally (e.g., YouTube) |

### Cropping Images

1. Select the image in the media library.
2. Click **Crop & Save New Image**.
3. Choose a ratio type and edit the new image name.
4. Click **Save** — the cropped image is available for use immediately.

> GIF images cannot be cropped.

### Upload Troubleshooting

**Image times out on upload:**
- Optimize the image first using a tool like [ImageOptim](https://imageoptim.com/mac).
- If built in Photoshop or similar, merge layers to reduce file complexity.

**"Unexpected Error" despite valid format and size under 5 MB:**
1. **Invalid metadata** — Re-export or re-save the image from your editor to strip bad metadata. Some metadata can also push the effective size over 5 MB.
2. **Special characters in filename** — Characters like `&` or `%` cause upload failures. Rename using only letters, numbers, hyphens, or underscores.

**Can't upload an image to push composers:**
- Push composers enforce specific image ratio restrictions. Use an image that matches the required aspect ratio for that composer.
