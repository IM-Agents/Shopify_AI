# Implementation Plan

## Guiding Principle

The Shopify Theme Editor and Shopify store data are the source of truth. If a user can see it on the storefront, it must be editable or data-driven.

## Phase 0: Theme Audit and Figma Inventory

### Activities

- Duplicate the current theme and work only on the unpublished duplicate.
- Audit current theme architecture:
  - templates
  - sections
  - snippets
  - assets
  - config/settings schema
  - existing CSS token system
  - JavaScript organization
  - existing metafields/metaobjects
  - app blocks and installed apps
- Inventory the Figma file:
  - pages
  - frames
  - sections
  - components
  - variants
  - text nodes
  - images
  - icons
  - interactive states
  - desktop/tablet/mobile frames
- Build the Figma-to-Shopify mapping matrix.

### Exit Criteria

- Current theme extension strategy is documented.
- Every relevant Figma node has an initial mapped implementation target.
- Any reusable existing theme components are identified before new components are planned.

## Phase 1: Global Foundations

### Global Settings

Define global settings in `settings_schema.json` for:

- Brand color tokens.
- Background and text color tokens.
- Button colors, radius, borders, shadows, and state styles.
- Font picker settings for heading, body, accent, and optional custom brand font handling.
- Base font size.
- Heading scale ratio.
- Spacing scale.
- Breakpoint-aligned layout settings where useful.

### CSS System

- Use CSS custom properties for tokens.
- Use mobile-first CSS with min-width queries.
- Use fluid typography and spacing via `clamp()`.
- Match Figma auto-layout with Grid/Flex primitives.
- Support hover, focus, active, disabled, loading, and empty states.

### Exit Criteria

- Global visual system is tunable through Theme Editor.
- Core tokens can be adjusted without code changes.

## Phase 2: Asset Ingestion

### Activities

- Export all required assets from Figma.
- Use SVG for icons/line art where appropriate.
- Use WEBP/PNG/JPG for raster imagery based on quality and transparency needs.
- Upload exported assets to Shopify Admin > Content > Files.
- Name assets using a consistent pattern: `section-element-variant`.
- Configure all section/block schemas to use `image_picker` or file-reference metafields/metaobjects.

### Exit Criteria

- No content image depends on a theme asset hardcoded in Liquid.
- Every image visible in Figma can be selected, replaced, and managed by a non-developer.

## Phase 3: Dynamic Section and Block Build

### Section Requirements

Each section must expose all relevant controls through schema, including:

- Heading/subheading/copy.
- Rich text where formatting is needed.
- CTA label and URL.
- Image picker controls for desktop/mobile/tablet assets when art direction differs.
- Visibility toggles.
- Layout options.
- Color/style overrides where the design requires variants.
- Repeatable blocks for lists, slides, cards, icons, testimonials, or accordions.

### Content Rules

- Text nodes map to settings, locale keys, store objects, metafields, metaobjects, or page/blog content.
- Links use URL settings and must preserve supplied destinations.
- Repeating structured content uses blocks or metaobjects.
- Product/collection content renders from Shopify product and collection objects.

### Exit Criteria

- Each Figma section is represented by a dynamic Shopify section or an extension of an existing section.
- Merchandisers can edit, reorder, hide, or replace content without code.

## Phase 4: Products, Collections, and Real-Time Filtering

### Collection Pages

- Render products from `collection.products`.
- Render collection data from Shopify collection objects and metafields.
- Product cards must use Shopify product data:
  - title
  - featured image/media
  - price
  - compare-at price
  - availability
  - vendor/product type where used
  - variant options/swatches
  - product/variant metafields for badges or structured display data

### Filtering

- Configure Shopify Search & Discovery facets.
- Render filters from `collection.filters` and `search.filters`.
- Support availability, price, product type, vendor, and required metafield facets.
- Use Section Rendering API to update product grid, result counts, active filters, and facet counts without full reload.
- Sync URL query parameters with `history.pushState`.
- Provide no-JS fallback using standard query-string form submissions.

### Exit Criteria

- Filter state is real-time, shareable, and back-button safe.
- Empty states, clear all, sorting, and result counts are dynamic.

## Phase 5: Responsive Fidelity

### Working Breakpoints

| Tier | Target range | Notes |
|---|---:|---|
| Mobile | <= 749px | Align to Figma mobile frame. |
| Tablet | 750px - 989px | Align to Figma tablet frame if provided. |
| Desktop | >= 990px | Align to Figma desktop frame. |

Exact breakpoint values must be reconciled with Figma frame widths during build.

### Activities

- Validate each section at mobile, tablet, and desktop widths.
- Verify responsive images and art direction.
- Verify sticky, drawer, carousel, tab, accordion, and filter interactions.
- Confirm touch target sizing and keyboard focus states.
- Compare against Figma spacing, typography, alignment, and component states.

### Exit Criteria

- Layout matches Figma across breakpoints with no avoidable layout shift.
- Mobile/tablet/desktop behavior is confirmed and documented.

## Phase 6: QA and Handover

### Activities

- Run dynamic-content audit: no visible hardcoded content.
- Run accessibility checks.
- Run performance checks.
- Validate console is error-free.
- Validate Theme Editor editability for every section.
- Prepare handover documentation for merchandisers.

### Exit Criteria

- QA report is complete.
- Handover instructions explain how to edit content, assets, links, filters, and global style tokens.
