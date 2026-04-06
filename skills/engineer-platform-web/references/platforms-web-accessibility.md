---
name: platforms-web-accessibility
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/web/accessibility
indexed_at: '2026-04-05'
keywords:
  - accessibility
  - WCAG
  - keyboard
  - screenreader
  - aria
  - focus
  - alttext
  - contrast
  - semantic
triggers:
  - make web SDK accessible
  - test keyboard navigation
  - ensure WCAG 2.1 compliance
  - add alt text to images
  - improve screen reader support
---
# Web Accessibility

Braze Web SDK supports [WCAG 2.1](https://www.w3.org/TR/WCAG21/) and maintains a 100/100 Lighthouse accessibility score for Content Cards and in-app messages.

## SDK Version Requirements

- **Minimum for WCAG 2.1**: v3.4.0
- **Recommended**: v6.0.0+ (major image tag fixes)

### Key Version Milestones

| Version | Changes |
|---------|---------|
| 6.0.0 | Images as `<img>` tags, `imageAltText`/`language` fields, UI accessibility improvements |
| 3.5.0 | Scrollable text accessibility |
| 3.4.0 | Content Cards `article` role fix |
| 3.2.0 | 45x45px minimum touch targets for buttons |
| 3.1.2 | Default alt text for images |
| 2.4.1 | Semantic HTML (`h1`/`button`), ARIA attributes, keyboard nav, focus management |
| 2.0.5 | Focus management, keyboard navigation, labels |

## Supported Features

- ARIA roles and labels
- Keyboard navigation
- Focus management
- Screen reader announcements
- Image alt text

## Content Cards

### Maximum Height (Prevents Overflow)

```css
.ab-feed {
  max-height: 600px;
  overflow-y: auto;
}

.ab-card {
  max-height: 400px; /* optional */
  overflow: hidden;
}
```

### Mobile Viewport

```css
@media (max-width: 768px) {
  body > .ab-feed {
    max-height: 80vh;
  }
}
```

## In-App Messages

> **Warning**: Do not put important information in slide-up in-app messages — they are not accessible to screen readers.

## Mobile / Responsive

```css
@media (max-width: 768px) {
  .ab-feed {
    font-size: 14px; /* minimum for mobile readability */
  }
  .ab-card {
    padding: 16px; /* adequate touch target padding */
  }
}
```

## Testing Checklist

- [ ] Keyboard-only navigation (Tab, Enter, Space)
- [ ] Screen reader (NVDA, JAWS, VoiceOver)
- [ ] All images have alt text
- [ ] Color contrast ratios (WebAIM Contrast Checker)
- [ ] Touch interaction on mobile
- [ ] Focus indicators visible
- [ ] Modal focus trapping works
- [ ] All interactive elements reachable by keyboard

## Common Pitfalls

| Issue | Guidance |
|-------|---------|
| Focus styles removed | Keep SDK focus indicators — essential for keyboard users |
| `display: none` on interactive elements | Use `visibility: hidden` or `opacity: 0` instead |
| Overriding ARIA attributes | Don't — SDK sets correct roles/labels |
| `overflow: hidden` without scroll | Ensure scrollable content stays reachable |
| Custom keyboard handlers | Don't interfere with SDK's built-in keyboard navigation |
| Ignoring `tabindex` | Use to control keyboard navigation order |
