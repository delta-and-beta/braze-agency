---
name: architect-personalization
description: >-
  Designs personalization infrastructure spanning location awareness, creative
  tooling, and dynamic content delivery.
metadata:
  role: braze-architect
  topics:
    - message-personalization-dynamic-content
    - message-personalization-creative-studio
    - message-personalization-creative-studio-figma
    - message-personalization-creative-studio-canva
    - message-personalization-referrals
    - message-personalization-location
    - message-personalization-localization
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
The `plugin-dev:skill-development` skill emphasizes **progressive disclosure** — keep `SKILL.md` lean (1,500–2,000 words) and move detail to `references/`. Since this is a synthesized skill body (not the full SKILL.md with frontmatter), I'll write dense but scannable markdown: scope → topics → lens → usage guidance. Imperative/infinitive form throughout per the style requirements.
`─────────────────────────────────────────────────`

---

# Personalization System Architecture

## Scope and Purpose

Personalization System Architecture covers the design and integration of infrastructure that delivers contextually relevant experiences to users — from physical location awareness to multilingual content rendering to creative asset workflows. Apply this skill when designing systems that must adapt message content, timing, and form based on who the user is, where they are, what language they speak, and what creative tools are producing that content.

This skill spans three interconnected layers:

1. **Location and referral awareness** — geographic and behavioral signals that trigger or shape content
2. **Content rendering and localization** — dynamic message construction and translation pipelines
3. **Creative tooling and asset management** — design platform integrations that feed the content pipeline

Use this skill when an architecture question touches any combination of these layers, or when designing the connective tissue between them.

---

## Topics This Skill Synthesizes

### Referrals Overview
Covers viral referral mechanics and partner integrations (e.g., ViralSweep) that generate behavioral signals usable as personalization triggers. When designing referral-linked personalization, treat referral state as a first-class user attribute: track it, segment on it, and feed it into content branching logic.

### Location Personalization Overview
Covers geofencing and location tracking via Radar — the leading platform for location-aware triggers. Radar exposes three primitives: Geofences (region entry/exit), Trip Tracking (journey state), and Nearby Places (contextual POI data). Integrate these as event sources into the Braze event stream to power location-triggered campaigns, proximity-aware content, and real-time message suppression when users leave a target zone.

### Localization Personalization Overview
Covers translation and locale management via Transifex. Localization is not merely string translation — it is a pipeline that must be versioned, reviewed, and deployed independently of feature releases. Design localization as a pull model: Transifex holds the source of truth for translated strings; the delivery system pulls the correct locale variant at render time based on user profile attributes.

### Dynamic Content Personalization
Covers Liquid-based message rendering, including the `abort_message()` tag for conditional send suppression. Dynamic content personalization is fundamentally a rendering pipeline: inputs are user attributes and event context, outputs are personalized message bodies. Design this pipeline to fail safely — `abort_message()` is a control flow primitive that prevents delivery to users who don't meet content conditions, avoiding blank or nonsensical messages.

### Creative Studio Overview
Covers the Creative Studio layer within Braze — the surface where design assets are assembled into sendable message content. Creative Studio is the junction between design tooling and delivery infrastructure. When architecting this layer, treat it as a translation boundary: design intent (from Figma, Canva) must be converted into deliverable formats without manual re-creation.

### Figma Creative Studio Partner
Covers the Figma integration that allows designs created in Figma to be imported directly into Braze message creation. Figma serves as the upstream design source of truth. Design workflows that treat Figma as the canonical asset store: designers work in Figma, Braze pulls from it. This eliminates the export/import hand-off that introduces drift between design and delivery.

### Canva Creative Studio Partner
Covers the Canva integration for creating visual content (social, video, presentations) directly connectable to Braze. Canva targets a different persona than Figma — marketing operators rather than product designers. Architect creative workflows to support both: Figma for brand-controlled, pixel-precise assets; Canva for rapid, operator-driven content creation.

---

## Architectural Lens

Apply this skill through the lens of **content personalization architecture, dynamic rendering pipelines, and creative workflow design**.

### Content Personalization Architecture

Personalization infrastructure is not a single system — it is a composition of signal sources, decision logic, and rendering engines. When designing personalization architecture:

- Treat user attributes, location signals, referral state, and locale as **inputs** to a rendering decision function
- Design that function to be composable: a message should be personalizable along multiple axes simultaneously (location + language + referral state)
- Ensure suppression logic (`abort_message`) is treated as a first-class architectural concern, not an afterthought — unanticipated delivery to unqualified users has compliance and brand implications

### Dynamic Rendering Pipelines

Dynamic content pipelines must handle failure gracefully. Key architectural principles:

- **Default values**: Every Liquid variable reference should have a fallback to prevent empty renders
- **Abort conditions**: Define explicit conditions under which delivery should not occur, and encode them in `abort_message()` guards
- **Locale resolution**: Resolve locale at render time from user profile, not at content creation time — this supports late-binding of translation variants
- **Content versioning**: Treat message templates as versioned artifacts; localized variants must be versioned in sync with their source templates

### Creative Workflow Design

The creative workflow is the path from design intent to deliverable asset. Key design decisions:

- **Tool selection by persona**: Figma for design-system-controlled brand assets; Canva for operator-driven rapid content
- **Integration depth**: Both tools integrate with Braze's Creative Studio, but the integration model differs — understand whether the workflow requires design fidelity (Figma) or content velocity (Canva)
- **Asset lifecycle**: Design assets have a lifecycle independent of campaigns — they must be versioned, retired, and replaced without breaking active campaigns that reference them

---

## When to Apply This Skill

Apply this skill when the task involves:

- Designing or reviewing a Braze personalization architecture that combines location, language, referral, or creative tooling concerns
- Selecting between integration options (Figma vs. Canva, Radar vs. manual geo-targeting, Transifex vs. in-platform localization)
- Designing Liquid rendering logic for dynamic message content, including abort conditions
- Defining creative asset pipelines that connect design tools to campaign delivery
- Auditing an existing personalization system for gaps in signal coverage, rendering safety, or creative workflow efficiency

---

## Key Architectural Decisions

| Decision | Options | Guidance |
|---|---|---|
| Location signal source | Radar vs. manual geo-attributes | Use Radar for real-time geofencing; use manual attributes only for coarse/static segmentation |
| Localization model | Transifex vs. in-platform | Use Transifex when translation volume, review workflows, or external translators are involved |
| Creative tool | Figma vs. Canva | Figma for brand-controlled assets; Canva for operator-driven content at speed |
| Render-time suppression | `abort_message()` vs. audience filter | Prefer audience filters for known static conditions; use `abort_message()` for dynamic, attribute-dependent conditions evaluated at render time |
| Referral personalization | ViralSweep event attributes vs. custom events | Treat referral state as a user attribute for segmentation; use custom events for referral-triggered campaigns |

---

## Integration Dependencies

When designing across these topics, account for these cross-system dependencies:

- **Radar → Braze**: Location events flow into Braze as custom events; geofence entry/exit triggers campaigns
- **Transifex → Braze**: Translated content is pulled into message templates; locale resolution depends on user profile `language` attribute
- **Figma/Canva → Creative Studio**: Design assets are imported into Braze; campaign templates reference Creative Studio assets
- **Referral state → Liquid rendering**: Referral attributes set by ViralSweep are accessible in Liquid for conditional content and `abort_message()` guards

Design the overall architecture so these dependency chains are explicit, observable, and fault-tolerant at each integration boundary.
