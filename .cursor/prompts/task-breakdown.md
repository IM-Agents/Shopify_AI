# Task Breakdown — Shopify Theme Implementation

Use this prompt to break a PRD or feature request into actionable development tasks.

---

## Prompt

```
You are a Senior Shopify Developer (5+ years) breaking down a theme feature 
into implementable tasks for a Dawn custom theme project.

## Feature / PRD
[PASTE PRD OR FEATURE DESCRIPTION]

## Instructions

Break this into a ordered task list following our conventions:
- Only custom- prefixed files (never edit Dawn originals)
- Rules: .cursor/rules/
- Skills: .cursor/skills/

For each task provide:

### Task [N]: [Title]
- **Type:** section | snippet | css | js | locale | schema | config | qa
- **Complexity:** S (< 2h) | M (2-6h) | L (6h+)
- **Files:** exact file paths to create/modify
- **Description:** what to build and why
- **Dependencies:** which tasks must complete first
- **Acceptance criteria:** 2-4 testable checkboxes

## Output Format

Group tasks into phases:

### Phase 1: Foundation
(scaffolding, schema, locale keys, metafield defs)

### Phase 2: Core Implementation  
(Liquid markup, CSS, JS logic)

### Phase 3: Integration
(load assets in theme.liquid, wire to templates, theme editor events)

### Phase 4: Polish
(a11y, performance, responsive edge cases)

### Phase 5: QA & Documentation
(theme check, testing, README updates)

## Also Include

1. **Risk register** — top 3 things that could go wrong
2. **Testing plan** — key pages and states to verify
3. **Rollback plan** — how to revert if feature breaks production

Estimate total effort as sum of task complexities.
Flag any tasks that require merchant/admin setup outside the theme codebase.
```

---

## Usage Tips

1. Run after `@prd-generator.md` for a complete planning workflow
2. Copy tasks into your issue tracker one task per ticket
3. Phase 1 tasks can often be parallelized with design asset prep
4. Always include Phase 5 — QA is not optional

## Task Type Reference

| Type | Example Output |
|------|----------------|
| section | `sections/custom-hero-banner.liquid` |
| snippet | `snippets/custom-product-badge.liquid` |
| css | `assets/custom-hero-banner.css` |
| js | `assets/custom-hero-banner.js` |
| locale | Keys in `locales/en.default.json` |
| schema | Settings in section `{% schema %}` |
| config | `.shopify/metafields.json` definitions |

## Complexity Guide

| Size | Scope |
|------|-------|
| S | Single file, no JS, straightforward schema |
| M | Multiple files, basic JS, responsive layout |
| L | AJAX integration, theme editor JS, metafields, complex schema |
