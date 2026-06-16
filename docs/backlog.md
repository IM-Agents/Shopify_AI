# Backlog and Acceptance Criteria

## Epic 1: Discovery, Audit, and Setup

### Story 1.1: Audit Current Shopify Theme

As a developer, I need to understand the current theme architecture so the Guan Yiac build extends the theme safely.

Acceptance criteria:

- Existing templates, sections, snippets, CSS, JavaScript, settings, and dependencies are documented.
- Reusable theme components are identified.
- Development occurs on an unpublished duplicate theme or safe branch.
- Risks are added to the RAID log.

### Story 1.2: Inventory Figma Design

As a developer, I need a complete Figma inventory so all sections and components are accounted for.

Acceptance criteria:

- Homepage Hero V6 is confirmed as final.
- Shared components and master components are listed.
- Required assets are exported/named.
- Desktop-first layouts are translated into responsive mobile/tablet/desktop requirements.

### Story 1.3: Confirm Product Taxonomy

As a merchandiser, I need the catalogue taxonomy confirmed so products can be organized and filtered correctly.

Acceptance criteria:

- Main categories match the PRD.
- Subcategories are mapped to collections or filters.
- “Other” category content is confirmed or marked as placeholder.
- Product filter requirements are mapped to options/metafields/facets.

## Epic 2: Global Components

### Story 2.1: Build Announcement Banner

Acceptance criteria:

- Shows free shipping, phone, and Established 1943 copy.
- Appears on every required page.
- Is responsive and editable.

### Story 2.2: Build Header and Mega Menu

Acceptance criteria:

- Logo, nav links, search, wishlist, and account icons render correctly.
- Our Products opens category-driven mega menu.
- Mega menu works by mouse, touch, and keyboard.
- Mobile navigation is usable and responsive.

### Story 2.3: Build Product Card

Acceptance criteria:

- Renders product image, title, CTA/price area, wishlist icon, and optional comparison checkbox.
- Data comes from Shopify product objects/metafields.
- Layout works in grid, carousel, and related-product contexts.

### Story 2.4: Build Footer

Acceptance criteria:

- Includes logo, tagline, description, three link columns, and legal bottom bar.
- Links are editable through menus/settings.
- Footer is responsive across mobile/tablet/desktop.

## Epic 3: Homepage

### Story 3.1: Build Hero V6

Acceptance criteria:

- Uses required headline, sub-headline, body copy, imagery, and CTAs.
- Primary CTA routes to collection/product browsing.
- Secondary CTA routes to quote/contact flow.
- Mobile layout preserves content hierarchy.

### Story 3.2: Build Brand Partner Marquee

Acceptance criteria:

- Displays Mitsubishi, Hitachi, Lovejoy, Goodyear, Pulton, SKF, THB, Toyox.
- Animation is smooth and reduced-motion safe.
- Logos are manageable through blocks/metaobjects.

### Story 3.3: Build Category, Featured Product, and Catalogue Sections

Acceptance criteria:

- Category cards are dynamic from collections/metaobjects.
- Featured products include sample products when available.
- Download Catalogue CTA is visible and configurable.

### Story 3.4: Build Trust and Content Sections

Acceptance criteria:

- Why Choose Us, Industries We Serve, Testimonials, Shipping Promo, and Knowledge Hub sections are implemented.
- Cards/articles/testimonials are editable without code.
- Sections are responsive.

## Epic 4: Collection Page

### Story 4.1: Build Category Hero and Breadcrumb

Acceptance criteria:

- Breadcrumb follows `Home / Category` pattern.
- Hero headline and image are collection-managed.

### Story 4.2: Build Product Finder and Quick Filters

Acceptance criteria:

- Finder includes spec-based filters such as size, pressure rating, and material.
- Quick filter pills are horizontally scrollable on small screens.
- Find Products and Reset actions work.

### Story 4.3: Build Sort, View Toggle, Grid, and Pagination

Acceptance criteria:

- Sorting includes Featured, Price Low–High, and Newest where platform data supports it.
- Grid/list view toggle works without breaking filters.
- Product grid supports pagination or infinite-scroll decision.
- Inline ad placements appear every ~8–12 cards if configured.

### Story 4.4: Build Product Comparison

Acceptance criteria:

- Users can select up to 3 products.
- Sticky compare bar appears when at least 1 product is selected.
- Clear All and individual remove actions work.
- Full-screen modal compares product identity and spec rows.

## Epic 5: Product Detail Page

### Story 5.1: Build Product Gallery and Info Layout

Acceptance criteria:

- Two-column desktop layout and stacked mobile layout.
- Gallery supports primary image and thumbnails.
- Product name, SKU, specs, selector, and highlights are dynamic.

### Story 5.2: Build Quote-First Actions

Acceptance criteria:

- Request Quote is the primary action.
- Download Catalog is secondary.
- PDP quote action pre-fills quote page where possible.

### Story 5.3: Build Sticky Bottom Product Bar

Acceptance criteria:

- Appears on scroll.
- Shows thumbnail, product name, Request Quote, and Download Catalog.
- Does not conflict with mobile browser safe areas.

### Story 5.4: Build Related Products and Knowledge Hub

Acceptance criteria:

- Related products show selected/recommended products.
- Knowledge Hub preview uses Shopify blog articles.

## Epic 6: Request Quote Flow

### Story 6.1: Build Multi-Step Quote Wizard

Acceptance criteria:

- Includes product/SKU, quantity, specs, company, contact, email/phone, delivery address, and notes fields.
- Validates required fields.
- Supports URL prefill from PDP.

### Story 6.2: Build Live Summary Panel

Acceptance criteria:

- Summary updates as the user enters product/spec/contact details.
- Layout is two-column on desktop and stacked on mobile.

### Story 6.3: Route Quote Submission

Acceptance criteria:

- Submission is trackable and not lost.
- Confirmation message appears after submission.
- Business owner receives quote request through agreed routing method.

## Epic 7: QA and Launch Readiness

### Story 7.1: Responsive QA

Acceptance criteria:

- Homepage, collection, PDP, and quote page pass mobile/tablet/desktop checks.
- No horizontal overflow or clipped sticky elements.

### Story 7.2: Accessibility and Performance QA

Acceptance criteria:

- Keyboard nav works for menu, filters, modal, and form.
- Images are lazy-loaded where appropriate.
- Marquee/animation respects reduced motion.
- No critical console errors.

### Story 7.3: Content Handover

Acceptance criteria:

- Admin-editable areas are documented.
- Catalogue, brand logos, testimonials, industries, blog articles, and catalogue downloads have update instructions.
