# Project Brief: Figma-Driven Dynamic Shopify Storefront

## Objective

Translate the supplied Figma design into a fully dynamic Shopify Online Store 2.0 storefront where every visible element is sourced from Shopify store data, theme settings, metafields, metaobjects, locale files, or Theme Editor-controlled section/block settings.

## Reference Materials

- Store URL: https://bhautik-mehta.myshopify.com/
- Figma design: https://www.figma.com/design/in1jO50FOrn9q7LeQ3O68u/il-Cashewficio--x-developer---Copy-?node-id=0-1&t=IcslBjVM13M8jH4u-1

## Scope

### In Scope

- Existing Shopify theme audit.
- Figma node and component inventory.
- Dynamic content mapping matrix.
- Global theme settings for colors, fonts, type scale, spacing, and button styles.
- Dynamic Shopify sections and blocks for all Figma sections.
- Responsive storefront implementation for mobile, tablet, and desktop.
- Dynamic product cards and collection templates.
- Real-time collection filtering using Shopify Search & Discovery facets and Section Rendering API.
- Asset ingestion workflow through Shopify Content > Files.
- Metaobject and metafield planning for structured/repeating content.
- Theme Editor configuration for merchandiser control.
- QA report and handover documentation.

### Out of Scope

- Inventing product names, product copy, prices, collection names, domain-specific claims, or new brand facts.
- Changing supplied hyperlink destinations.
- Publishing the final theme without review/signoff.
- Rebuilding the whole theme blindly when existing components can be extended.

## Stakeholders

- Business/design approver: client-side stakeholder to sign off Figma fidelity and content mapping.
- Development DRI: Senior Shopify Developer.
- Merchandising/content owner: Shopify admin user responsible for store data, product content, images, and settings.
- QA DRI: developer or QA owner validating responsiveness, accessibility, performance, and dynamic editability.

## Success Criteria

1. Zero visible hardcoded storefront content.
2. Every Figma node has a mapped Shopify dynamic source.
3. All assets are uploaded to Shopify Content > Files and selected through image picker or file-reference metafields/metaobjects.
4. Collections, products, filters, counts, sorting, and empty states render from live Shopify data.
5. Filter/sort interactions update through the Section Rendering API with no-JS fallback.
6. Desktop, tablet, and mobile match the Figma design and responsive behavior.
7. All editable controls are available to non-developers through Theme Editor, store objects, metafields, metaobjects, or locale files.
8. Accessibility and performance baselines pass with semantic markup, alt text, focus states, lazy loading, no avoidable layout shift, and no console errors.

## Assumptions

- The Figma source is available to the implementation team with inspection/export permissions.
- Shopify admin/theme access is available to audit the current theme and upload files.
- A duplicated/unpublished theme will be used for development.
- Shopify Search & Discovery can be configured for required facets.
- Final copy, products, prices, collection imagery, and domain facts will come from Shopify data or client-provided Theme Editor entries.

## Key Constraints

- No hardcoded visible strings in `.liquid` templates.
- No hardcoded image paths for content assets.
- Existing hyperlinks must remain unchanged unless an authorized stakeholder changes them in Theme Editor.
- All layouts must remain responsive across mobile, tablet, and desktop.
