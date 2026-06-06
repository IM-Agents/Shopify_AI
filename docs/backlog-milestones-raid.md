# Backlog, Milestones & RAID Log

## Milestone Plan

### Milestone 1 — Discovery & Foundation

Deliverables:
- Confirm Figma scope and asset inventory.
- Confirm latest stable Dawn baseline.
- Define final template/section list.
- Create global theme settings and base style tokens.

Acceptance criteria:
- All required pages and design frames are mapped.
- Base Dawn theme is ready for customization.
- Global responsive and brand foundations are established.

### Milestone 2 — Core Layout & Navigation

Deliverables:
- Announcement bar.
- Header.
- Mega menu.
- Mobile menu.
- Footer.

Acceptance criteria:
- Navigation is responsive and accessible.
- Merchant can configure core content through Theme Editor.

### Milestone 3 — Commerce Pages

Deliverables:
- Product page.
- Collection page.
- Search page.
- Cart drawer/cart page.

Acceptance criteria:
- Product, collection, search, and cart flows work.
- Variant, pricing, inventory, media, cart update, and quantity behavior is validated.

### Milestone 4 — Marketing & Content Pages

Deliverables:
- Home page.
- Landing pages.
- Contact page.
- Static content pages.
- Testimonials, FAQ, newsletter, image/text, hero, and card sections.

Acceptance criteria:
- All Figma marketing/content screens are implemented.
- Content is merchant-editable.

### Milestone 5 — Optimization, QA & Handoff

Deliverables:
- Performance pass.
- Accessibility pass.
- SEO/schema pass.
- Analytics readiness.
- Cross-browser and responsive QA.
- Documentation and screenshots.

Acceptance criteria:
- Lighthouse and accessibility targets are met.
- Acceptance checklist passes.
- Theme is ready for production handoff.

## Backlog

### Epic 1 — Theme Foundation

Stories:
- As a merchant, I can manage global brand colors and typography-related settings where feasible.
- As a developer, I can reuse shared snippets for buttons, cards, images, and badges.
- As QA, I can validate consistent responsive behavior across breakpoints.

### Epic 2 — Navigation & Layout

Stories:
- As a shopper, I can navigate desktop menus and mega menus easily.
- As a mobile shopper, I can browse navigation through a touch-friendly drawer.
- As a merchant, I can update header, announcement, and footer content without code changes.

### Epic 3 — Product Experience

Stories:
- As a shopper, I can view product media, select variants, see pricing, and understand inventory state.
- As a merchant, I can populate product-specific details using metafields.
- As a shopper, I can add products to cart without page-breaking behavior.

### Epic 4 — Collection/Search Experience

Stories:
- As a shopper, I can browse product cards in responsive grids.
- As a shopper, I can use Shopify collection/search behavior without layout issues.
- As a merchant, I can handle empty collection and empty search states gracefully.

### Epic 5 — Content & Conversion Sections

Stories:
- As a merchant, I can configure hero, image-with-text, featured collection/products, testimonials, FAQs, tabs, and newsletter sections.
- As a shopper, I can read content comfortably across devices.
- As a merchant, I can create landing pages from reusable sections.

### Epic 6 — Quality, SEO, Analytics

Stories:
- As a shopper using keyboard navigation, I can access all interactive elements.
- As a business owner, I can support SEO metadata and schema expectations.
- As a marketing team, I can configure analytics/tracking events with approved IDs.

## RAID Log

### Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Figma designs are unavailable/incomplete | Pixel-perfect implementation may be delayed | Request final Figma access before development starts |
| Custom design conflicts with Dawn defaults | Higher CSS/section complexity | Extend Dawn carefully and document overrides |
| Heavy imagery reduces performance | Lighthouse target may be missed | Use responsive images, compression, lazy loading, Shopify CDN |
| Analytics scripts affect performance/privacy | Slower pages or compliance issues | Use approved scripts, defer where possible, consider consent requirements |

### Assumptions

- Dawn is mandatory and remains the base theme.
- Client supplies Figma, assets, fonts, and final content.
- Third-party integrations are out of scope unless separately specified.
- Merchant-editable settings are preferred over hardcoded content.

### Issues

- No implementation issue identified at documentation stage.

### Dependencies

- Figma access and design assets.
- Shopify store access and permissions.
- Product/collection/catalog data.
- Analytics IDs and tracking requirements.
- Final content for pages, FAQs, testimonials, and static content.
