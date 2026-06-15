# Backlog and Acceptance Criteria

## Epic 1: Theme Audit and Figma Inventory

### Story 1.1: Audit Existing Shopify Theme

As a developer, I need to understand the current theme architecture so that new work extends the theme without unnecessary rebuilds.

Acceptance criteria:

- Existing templates, sections, snippets, settings, CSS, JavaScript, and metafields are documented.
- Reusable components are identified.
- Theme constraints and risks are added to the RAID log.
- Development happens on a duplicated/unpublished theme.

### Story 1.2: Inventory Figma Nodes and Assets

As a developer, I need a complete Figma inventory so that every visible node can be mapped to a Shopify dynamic source.

Acceptance criteria:

- All frames, sections, components, variants, text nodes, icons, and images are listed.
- Desktop/tablet/mobile variants are identified.
- Exportable assets are named with a consistent convention.
- Mapping matrix is ready for stakeholder review.

## Epic 2: Global Design System

### Story 2.1: Configure Global Theme Tokens

As a merchandiser, I need global controls for fonts, colors, spacing, and buttons so that brand styling can be adjusted without code.

Acceptance criteria:

- Global settings cover color tokens, fonts, type scale, button styles, radius, and spacing.
- CSS custom properties consume theme settings.
- Figma typography and color values are represented without hardcoded visible content.

### Story 2.2: Implement Responsive CSS Foundation

As a shopper, I need the storefront to match the design across devices.

Acceptance criteria:

- Mobile-first CSS is used.
- Breakpoints align with Figma frames.
- Fluid type and spacing use `clamp()` where appropriate.
- Mobile, tablet, and desktop layouts are verified.

## Epic 3: Asset Ingestion and Dynamic Media

### Story 3.1: Upload Figma Assets to Shopify Content Files

As a merchandiser, I need assets in Shopify Content > Files so that they can be selected and replaced in Theme Editor.

Acceptance criteria:

- All Figma-exported assets are uploaded to Content > Files.
- Asset references are documented.
- No content imagery is hardcoded from the theme assets folder.

### Story 3.2: Implement Responsive Image Rendering Pattern

As a shopper, I need fast responsive images with correct alt text and no layout shift.

Acceptance criteria:

- Images use Shopify image filters and responsive widths.
- Alt text is sourced from image metadata or editable settings.
- Desktop/mobile art direction is supported where Figma requires it.

## Epic 4: Dynamic Sections and Blocks

### Story 4.1: Build Header and Footer

Acceptance criteria:

- Navigation uses Shopify menus/linklists.
- Logo and social icons use image picker settings.
- Legal copy and labels are settings or locale keys.
- Mobile navigation matches Figma behavior.

### Story 4.2: Build Hero and CTA Sections

Acceptance criteria:

- Headings, rich text, buttons, images, overlays, and layout settings are editable.
- Links use URL settings and preserve supplied destinations.
- Desktop/tablet/mobile layouts match Figma.

### Story 4.3: Build Repeatable Content Sections

Acceptance criteria:

- Feature cards, USP rows, tabs, accordions, banners, testimonials, and similar repeating items are blocks or metaobjects.
- Items can be reordered and hidden without code.
- Icons/images are selected through image pickers or file-reference metafields.

## Epic 5: Products, Collections, and Filtering

### Story 5.1: Build Dynamic Product Cards

Acceptance criteria:

- Product cards render product media, title, price, compare-at price, availability, and variant data from Shopify objects.
- Badges and swatches come from tags, product/variant metafields, or configured dynamic rules.
- No product data is hardcoded.

### Story 5.2: Build Collection Template

Acceptance criteria:

- Collection title, description, image, products, counts, sort, and pagination render from Shopify data.
- Featured collection sections use collection picker/list controls, not hardcoded handles.

### Story 5.3: Implement Real-Time Filters

Acceptance criteria:

- Facets render from `collection.filters` and `search.filters`.
- Section Rendering API updates product grid, counts, active filters, and facet counts.
- URL state is synced and back-button safe.
- No-JS fallback works with query-string navigation.
- Empty state and clear-all states use dynamic labels/settings/locales.

## Epic 6: QA, Accessibility, Performance, and Handover

### Story 6.1: Dynamic Content Audit

Acceptance criteria:

- No visible hardcoded content remains.
- All text/images/links/colors/fonts are editable or store-data-driven.
- Mapping matrix is fully satisfied.

### Story 6.2: Accessibility and Performance QA

Acceptance criteria:

- Semantic markup is used.
- Focus states are visible.
- Form fields have labels.
- Images have correct alt behavior.
- Responsive images prevent avoidable layout shift.
- Console has no errors.

### Story 6.3: Handover Documentation

Acceptance criteria:

- Merchandiser instructions explain how to edit sections, swap images, manage links, adjust type/color settings, and manage filters.
- QA report includes desktop/tablet/mobile notes.
