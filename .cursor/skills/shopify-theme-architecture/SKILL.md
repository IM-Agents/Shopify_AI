---
name: shopify-theme-architecture
description: >-
  Online Store 2.0 theme architecture — JSON templates, section groups, blocks,
  layouts, and Dawn extension patterns. Use when designing new pages, sections,
  templates, or refactoring theme structure.
---

# Shopify Theme Architecture (OS 2.0)

## When to Use

- Adding or restructuring pages, sections, or templates
- Deciding between section vs snippet vs block
- Setting up header/footer section groups
- Choosing alternate templates (`product.[name].json`)

## Core Architecture

```
layout/theme.liquid
  └── JSON template (e.g. product.json)
        └── sections (max 25 per template)
              └── blocks (max 50 per section)
```

## Decision Matrix

| Need | Use |
|------|-----|
| Merchant-configurable page area | Section with `{% schema %}` |
| Reusable markup, no settings | Snippet (`custom-[name].liquid`) |
| Nestable, reusable within sections | Theme block (`/blocks/*.liquid`) |
| Global layout area (header/footer) | Section group (`sections/header.json`) |
| Page-specific layout | Alternate JSON template |

## Dawn Extension Rules (This Project)

- **Never edit Dawn originals** — create `custom-` prefixed files
- Override CSS in `assets/custom-base.css`, JS in `assets/custom-main.js`
- Load scoped assets conditionally by `template` in `layout/theme.liquid`
- JSON templates contain **no Liquid** — all logic lives in sections

## Section Groups

Render in `layout/theme.liquid` with the **plural** tag:

```liquid
{% sections 'header-group' %}
{% sections 'footer-group' %}
```

Using `{% section %}` on a group file is a silent failure.

## Theme Blocks (Modern OS 2.0)

- Live in `/blocks/` with their own `{% schema %}`
- Dynamic blocks: `{% content_for 'blocks' %}`
- Static blocks: `{% content_for 'block', type: 'name', id: 'unique-id' %}`
- No `"presets"` in block schemas (presets are section-only)

## Section Rendering API

Fetch sections via AJAX without full page reload:

```
GET /products/handle?sections=cart-drawer,cart-icon-bubble
```

Use for cart updates, variant swaps, and inline refreshes — not full DOM replacement.

## Hard Limits

| Limit | Value |
|-------|-------|
| Sections per template/group | 25 |
| Blocks per section | 50 |
| JSON templates per theme | 1000 |
| Liquid loop default | 50 items |

## Schema Best Practices

- `"limit": 1` for singleton sections (announcement bar, etc.)
- `"enabled_on"` / `"disabled_on"` to restrict placement
- `"class"` on schema appends to `.shopify-section` wrapper
- `{{ block.shopify_attributes }}` on the **outermost** block wrapper
- Schema `"name"` under 25 characters

## Alternate Templates

```
templates/product.gift-card.json   → product template variant
templates/page.contact.json        → page template variant
templates/metaobject/author.json   → metaobject web page
```

Assign via Admin or section `enabled_on` restrictions.

## Anti-Patterns

- Business logic in JSON templates
- `{% include %}` (deprecated — use `{% render %}`)
- Static `{% section %}` for merchant-configurable content
- Editing `config/settings_data.json` in version control

## References

- Project rules: `.cursor/rules/theme-structure.mdc`, `.cursor/rules/shopify-liquid.mdc`
- Checklist: `.cursor/checklists/launch-checklist.md`
