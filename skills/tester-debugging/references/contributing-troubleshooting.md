---
name: contributing-troubleshooting
source_url: 'https://braze-inc.github.io/braze-docs/_contributing/troubleshooting'
indexed_at: '2026-04-05'
keywords:
  - troubleshooting
  - jekyll
  - liquid
  - deployment
  - permalinks
  - github
  - fork
  - images
  - tags
  - contributing
triggers:
  - preview deployment 404
  - broken image reference
  - liquid tag mismatch
  - cross-reference link broken
  - fork origin incorrect
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's pipeline are atomic knowledge units — they strip Jekyll/Liquid templating noise (like `{% raw %}`, `{% tabs %}`, `{% image_buster %}`) and distill docs into model-consumable reference material. The key transformation is from *presentation format* to *information format*.
`─────────────────────────────────────────────────`

## Contributing Troubleshooting

Common issues when contributing to Braze Docs and how to resolve them.

---

### Preview Deployment Returns 404

A successful GitHub preview build that returns 404 usually indicates a broken image reference or malformed Liquid tag.

**Check image references** — each must use the exact path and filename:
```markdown
![Alt text]({% image_buster /assets/img/contributing/github_homepage.png %})
```

**Check opening/closing tag balance** — `{% tab %}` tags require matching open/close pairs:
```plaintext
{% tabs %}
{% tab Tab One %}
Content for tab one.
{% endtab %}
{% tab Tab Two %}
Content for tab two.
{% endtab %}
{% endtabs %}
```

**Check raw tags** — Liquid code examples must be wrapped in `{% raw %} {% endraw %}`:
```plaintext
{% raw %}
```
{% alert note %}
Looking for sample code? Check out [our apps]({{site.baseurl}}/developer_guide/samples/)!
{% endalert %}
```
{% endraw %}
```

---

### Cross-Reference Link Returns 404

If a link like `[Braze Developer Guide]({{site.baseurl}}/developer_guide/home)` results in a URL containing:
```
%7B%7Bsite.baseurl%7D%7D
```

The cross-reference link is wrapped inside Liquid `{% raw %}` tags. Move `raw`/`endraw` tags to surround only the literal Liquid syntax you want displayed, not the entire sentence.

**Before (broken):**
```
{% raw %} Learn how to use Liquid's {{ page_title }} tag. For more information, see [Liquid tags]({{site.baseurl}}/contributing/liquid/). {% endraw %}
```

**After (fixed):**
```
Learn how to use Liquid's {% raw %}{{ page_title }}{% endraw %} tag. For more information, see [Liquid tags]({{site.baseurl}}/contributing/liquid/).
```

---

### Conflict: Destination Shared by Multiple Files

Jekyll warning during `rake`:
```bash
Conflict: The following destination is shared by multiple files.
          /Users/USERNAME/braze-docs/_site/api_usage/index.html
           - /Users/USERNAME/braze-docs/_docs/_developer_guide/platforms/android.md
           - /Users/USERNAME/braze-docs/_docs/_developer_guide/platforms/firos.md
```

**Cause:** Two or more files share the same `permalink` value in YAML front matter.

**Fix:** Change the `permalink` of one file so they no longer collide:
```yaml
# fireos.md — change from:
permalink: /docs/developer_guide/best_sdk
# to:
permalink: /docs/developer_guide/second_best_sdk
```

---

### Can't Choose `braze-inc/braze-docs` as Base Repository

If `braze-inc/braze-docs` is missing from the base branch list when opening a PR, the fork's origin is incorrect.

**Step 1: Verify fork origin** — confirm the repo shows "forked from braze-inc/braze-docs".

**Step 2: Delete the old fork** — go to **Settings > General > Danger Zone > Delete this repository**.
> Warning: Deleted forks cannot be restored. Back up any work only accessible in the old fork.

**Step 3: Create a new fork** — go to [github.com/braze-inc/braze-docs](https://github.com/braze-inc/braze-docs) and select **Fork**.

---

### Redirect Isn't Working

See the [Braze Docs redirects troubleshooting guide](https://www.braze.com/docs/contributing/troubleshooting/) for redirect-specific issues (content is maintained separately in the contributing guide).

`★ Insight ─────────────────────────────────────`
Notice the deliberate removal of `{% multi_lang_include %}` includes — these are Jekyll SSG directives that embed other files at build time. Since topic files must be self-contained, content from included files either gets inlined or (as with the redirect section here) gets replaced with a pointer, since the include target wasn't provided in the source material.
`─────────────────────────────────────────────────`
