# Figma-Driven Dynamic Shopify Storefront Documentation

## Project Overview

This documentation defines the implementation approach for converting the provided Figma design into a fully dynamic, data-driven Shopify storefront for the supplied Shopify store.

- Store URL: https://bhautik-mehta.myshopify.com/
- Figma design: https://www.figma.com/design/in1jO50FOrn9q7LeQ3O68u/il-Cashewficio--x-developer---Copy-?node-id=0-1&t=IcslBjVM13M8jH4u-1
- Role expectation: Senior Shopify Developer Consultant
- Core objective: every visible storefront element must be editable through Shopify Theme Editor, Shopify store objects, metafields, metaobjects, locale files, or store data.

## Technology / Stack

- Shopify Online Store 2.0 theme architecture
- Liquid templates and snippets
- JSON templates
- Shopify Theme Editor section and block schema
- `settings_schema.json` global theme settings
- Shopify metafields and metaobjects
- Shopify Content > Files for Figma-exported assets
- Shopify Search & Discovery app filtering facets
- Shopify Section Rendering API for real-time collection filtering
- JavaScript for progressive enhancement only
- Mobile-first CSS using CSS custom properties, CSS Grid/Flexbox, and fluid `clamp()` tokens

## Mandatory Development Rules

1. No hardcoded visible storefront content.
2. No static image `src` values in Liquid templates.
3. All images/icons must be selected through image picker settings or file-reference metafields/metaobjects.
4. Product, collection, filter, price, availability, badge, and swatch data must come from Shopify store data.
5. All visible UI labels must come from section/block settings, store objects, metafields/metaobjects, or locale translation keys.
6. The UI must be responsive across mobile, tablet, and desktop.
7. Existing hyperlinks and destinations must be preserved exactly as supplied.
8. The current theme must be audited and extended before creating new structure.
9. Build non-destructively on a duplicated/unpublished theme.
10. Do not invent product names, copy, prices, or domain facts.

## Documentation Index

- [Project Brief](./project-brief.md)
- [Implementation Plan](./implementation-plan.md)
- [Theme Architecture](./theme-architecture.md)
- [Content Mapping Matrix](./content-mapping-matrix.md)
- [Backlog and Acceptance Criteria](./backlog.md)
- [RAID Log](./raid-log.md)
- [QA and Handover Plan](./qa-handover.md)

## Delivery Definition

The build is complete only when the storefront matches the Figma design across desktop, tablet, and mobile, and a merchandiser can update all visible content, assets, links, layout blocks, colors, fonts, and key component controls without editing code.
