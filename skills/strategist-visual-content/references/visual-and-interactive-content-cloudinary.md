---
name: visual-and-interactive-content-cloudinary
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/message_personalization/dynamic_content/visual_and_interactive_content/cloudinary
indexed_at: '2026-04-05'
keywords:
  - cloudinary
  - transformation
  - personalization
  - video
  - animation
  - metadata
  - optimization
  - assets
  - integration
  - gif
triggers:
  - integrate cloudinary assets
  - convert video to gif
  - personalize images dynamically
  - optimize image delivery
  - use liquid with cloudinary
---
## Cloudinary Visual Content Integration

Cloudinary integrates with Braze to deliver dynamic, personalized images and videos in campaigns and Canvases. Assets from Cloudinary's Media Library (DAM) are referenced via URLs that can be enriched with transformation parameters.

**Key transformation parameters:**
- `f_auto` — auto-selects optimal file format
- `q_auto` — auto-selects optimal quality
- `f_auto:animated,fl_lossy` — converts video to optimized animated GIF
- `c_scale,w_NNN` — sets output width in pixels
- `e_loop` — loops animation

---

### Integration Method 1: Direct DAM URL

Copy asset URL from Cloudinary: **Assets > Media Library > Assets > Copy URL**

**Image/GIF:**
```html
<img src="https://res.cloudinary.com/demo/image/upload/v1678993440/f_auto,q_auto/cld-sample.jpg" alt="Campaign">
```

**Video:**
```html
<video class="video" autoplay muted playsinline controls>
  <source src="https://res.cloudinary.com/demo/video/upload/v1651840278/f_auto,q_auto/samples/cld-sample-video.mp4">
</video>
```

> Note: For video in in-app messages, consult Android/iOS platform-specific considerations.

---

### Integration Method 2: Convert Video to GIF (for Email)

GIFs reduce email payload size and avoid deliverability issues. Use `f_auto:animated` transformation on a video URL.

```
https://res.cloudinary.com/demo/video/upload/c_scale,w_500,e_loop/f_auto:animated,fl_lossy/samples/cld-sample-video.gif
```

**Transformation chain breakdown:**
| Parameter | Purpose |
|---|---|
| `c_scale,w_500` | Set GIF width to 500px |
| `e_loop` | Loop the animation |
| `f_auto:animated` | Convert to best animated format |
| `fl_lossy` | Reduce file size |

---

### Integration Method 3: Dynamic Asset Selection via Liquid Tags

Embed Liquid tags as Cloudinary URL parameters. At send time, Braze replaces Liquid with user attribute values; Cloudinary's Custom Function then selects the matching asset using tags and Structured Metadata (SMD).

**How it works:**
1. Assets are tagged (e.g., `spring_launch`) and enriched with SMD fields (e.g., `language=en`, `tier=gold`)
2. Braze injects Liquid-resolved attributes into the Cloudinary URL
3. A Cloudinary Custom Function searches for assets matching the tags/metadata
4. If no exact match, a fallback asset is returned automatically
5. `f_auto`/`q_auto` optimize the returned asset for delivery

**Setup steps:**
1. Tag and add SMD to assets in Cloudinary
2. Upload custom function to Cloudinary DAM
3. Build base URL from the campaign tag
4. Append Liquid tags as dynamic parameters in the Braze message

**Required prerequisite:** In Cloudinary Console > Security Settings, clear **Resource list** from *Restricted image types* so Cloudinary can return dynamic asset lists.

> Reference implementation: [`cloudinary-devs/braze-personalization`](https://github.com/cloudinary-devs/braze-personalization) — includes example custom functions with asset selection and fallback logic.

---

### Advanced: Connected Content + Admin API

Cloudinary's Admin API can be called via Braze Connected Content for more complex integrations. This approach varies per customer — contact Cloudinary and Braze CSMs for guidance.

---

### Prerequisites

| Requirement | Details |
|---|---|
| Cloudinary account | Required; free registration available |
| Asset URLs | Manually copied from Cloudinary Media Library |
| Dynamic selection | Unrestrict "Resource list" in Cloudinary Security Settings |

`★ Insight ─────────────────────────────────────`
- **URL-as-API pattern**: Cloudinary's transformation parameters are embedded directly in the asset URL (`f_auto,q_auto`), making the URL itself a declarative transformation pipeline — no separate API call needed for common operations.
- **GIF-for-email is a genuine deliverability concern**: Many email clients reject or clip messages over ~100KB; converting video to lossy GIF at a constrained width is the standard workaround, and Cloudinary's `f_auto:animated,fl_lossy` handles format negotiation automatically.
- **The Liquid → Cloudinary Custom Function pattern** is a form of late-binding personalization: Braze resolves user context at send time, Cloudinary resolves asset selection at render time — two separate systems cooperating without tight coupling.
`─────────────────────────────────────────────────`
