# PRD Generator — Shopify Theme Feature

Use this prompt in Cursor to generate a Product Requirements Document before building a new theme feature.

---

## Prompt

```
You are a Senior Shopify Developer (5+ years) and Tech Lead at an agency.
Generate a PRD for the following feature request on our Dawn-based custom theme.

## Feature Request
[DESCRIBE THE FEATURE — e.g., "Custom hero banner with video background, 
mobile-specific image, and CTA button linking to a collection"]

## Context
- Theme: Dawn (OS 2.0) with custom- prefixed files only
- Store: [STORE URL or type — e.g., fashion DTC, B2B wholesale]
- Target launch: [DATE or sprint]
- Stakeholders: [merchant, designer, PM]

## PRD Requirements

Generate a structured PRD with these sections:

### 1. Overview
- Problem statement (why we're building this)
- Success metrics (conversion, engagement, merchant efficiency)
- Out of scope (what we're NOT building)

### 2. User Stories
Format: As a [role], I want [action], so that [benefit]
Include: merchant (Theme Editor), customer (storefront), developer (maintainability)

### 3. Functional Requirements
- Storefront behavior (all states: empty, populated, error)
- Theme Editor settings (list every merchant-configurable option)
- Responsive behavior at 375px, 768px, 990px, 1440px
- Edge cases (no image, no video, sold out, single variant)

### 4. Technical Specification
- Files to create (sections, snippets, assets) with `custom-` naming
- Liquid objects and metafields needed
- JavaScript requirements (Cart API, Section Rendering API, theme editor events)
- CSS approach (scoped file vs custom-base.css)
- Locale keys needed in en.default.json
- Schema settings with types and defaults

### 5. Accessibility Requirements
- WCAG 2.1 AA compliance items specific to this feature
- Keyboard navigation, screen reader, focus management

### 6. Performance Requirements
- LCP/CLS/INP impact assessment
- Image loading strategy
- JS bundle impact

### 7. Dependencies
- Apps, metafield definitions, third-party APIs
- Design assets needed (Figma link, image specs)

### 8. Acceptance Criteria
- Testable checkboxes a QA engineer can verify
- Theme Editor compatibility criteria

### 9. Task Breakdown Preview
High-level implementation tasks with estimated complexity (S/M/L)

Follow our project rules in .cursor/rules/ and architecture in 
.cursor/skills/shopify-theme-architecture/SKILL.md.
Do not propose editing Dawn original files.
```

---

## Usage Tips

1. Replace bracketed placeholders with your specific feature details
2. Attach Figma screenshots or wireframes if available
3. After PRD is generated, run `@task-breakdown.md` prompt to create implementation tasks
4. Save the PRD in your project management tool (Linear, Jira, Notion)

## Example Feature Requests

- Custom product badge system driven by metafields
- Sticky add-to-cart bar on mobile product pages
- Mega menu with collection images
- Size guide modal linked to product metafield
- Announcement bar with countdown timer and dismiss persistence
