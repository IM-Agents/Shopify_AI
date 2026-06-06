# Shopify Dawn Theme Customization — Documentation Index

## Project Summary

Build a production-ready Shopify storefront using the latest stable Shopify Dawn theme as the base. The implementation must convert the provided Figma designs into a merchant-friendly, responsive, accessible, performant Online Store 2.0 theme with reusable sections and maintainable Liquid architecture.

## Technology / Stack

- **Platform:** Shopify Online Store 2.0
- **Base Theme:** Shopify Dawn theme, latest stable version
- **Templating:** Shopify Liquid
- **Templates:** JSON templates where applicable
- **Styling:** Modular CSS using Dawn conventions plus project-specific component CSS
- **JavaScript:** Minimal vanilla JavaScript, deferred where possible
- **Data:** Shopify objects, metafields, metaobjects, dynamic sources
- **Analytics Support:** Google Analytics, Google Tag Manager, Meta Pixel event readiness
- **Target Browsers:** Latest Chrome, Safari, Firefox, Edge
- **Responsive Targets:** Mobile 375px+, tablet 768px+, laptop 1024px+, desktop 1440px+

## Documentation Files

1. [Project Brief](./project-brief.md)
2. [Requirements & Scope](./requirements-and-scope.md)
3. [Theme Architecture](./theme-architecture.md)
4. [Sections & Components Plan](./sections-and-components.md)
5. [Implementation Plan](./implementation-plan.md)
6. [Performance, Accessibility, SEO & Analytics](./performance-accessibility-seo-analytics.md)
7. [QA, Acceptance Criteria & Test Plan](./qa-acceptance-test-plan.md)
8. [Backlog, Milestones & RAID Log](./backlog-milestones-raid.md)

## Primary Acceptance Criteria

- Dawn theme is used as the foundation.
- All provided Figma screens are implemented with ≥95% design accuracy.
- UI is fully responsive across mobile, tablet, laptop, and desktop.
- All configurable content is merchant-editable in the Shopify Theme Editor.
- Reusable Online Store 2.0 sections are used wherever possible.
- Shopify Liquid and theme best practices are followed.
- Lighthouse Performance target is ≥85.
- Accessibility target is ≥90.
- SEO structure and schema support are included.
- Theme is production-ready, maintainable, and scalable.

## Key Assumptions

- Final Figma files, brand assets, fonts, imagery, and content will be supplied before development starts.
- Checkout customization, Shopify Functions, headless commerce, ERP integrations, and custom app development are out of scope unless separately approved.
- Third-party analytics scripts will use merchant-provided account IDs and should be configured through Shopify settings, theme settings, or approved snippets.
