# Theme Architecture

## Template Map

| Experience | Shopify Template / Route | Notes |
| --- | --- | --- |
| Homepage | `index.json` | Ordered homepage sections from PRD |
| Collection/category | `collection.json` | Supports category hero, filters, quick pills, comparison |
| Product detail | `product.json` | Quote-first PDP with gallery and sticky bottom bar |
| Request quote | `page.request-quote.json` | Multi-step quote wizard |
| Blog/knowledge hub | `blog.json`, `article.json` | Industrial Knowledge Hub content |
| Static pages | `page.json` | About, Contact, Privacy, Terms, Sitemap |

## Section Plan

| Section | Purpose | Dynamic Source |
| --- | --- | --- |
| `announcement-bar` | Shipping, phone, established copy | Theme settings |
| `main-header` | Logo, nav, search/wishlist/account icons | Theme settings + menus |
| `mega-menu` | Category and subcategory navigation | Menus, collections, metaobjects |
| `hero-industrial` | Homepage Hero V6 | Theme section settings |
| `brand-marquee` | Partner logo strip | Blocks or brand metaobjects |
| `category-grid` | Shop by Category cards | Collections or category metaobjects |
| `featured-products` | Product card strip/grid | Product list/collection picker |
| `why-choose-us` | Feature cards | Blocks/metaobjects |
| `industries-served` | Industry vertical grid | Blocks/metaobjects |
| `testimonials` | Customer quotes | Testimonial metaobjects |
| `shipping-promo` | Truck/free-shipping visual CTA | Section settings |
| `knowledge-hub-preview` | Blog/article cards | Shopify blog articles |
| `collection-product-finder` | Guided filter tool | Product metafields/facets |
| `collection-grid` | Products, sorting, view switch | Shopify collection object |
| `comparison-bar-modal` | Compare up to 3 products | Product metafields + JS state |
| `product-main-quote` | PDP gallery/specs/quote action | Product object/metafields |
| `product-sticky-quote-bar` | Sticky PDP actions | Product object/metafields |
| `quote-form-wizard` | RFQ capture | Shopify form/app/integration |
| `site-footer` | Footer links and legal | Menus + Theme settings |

## Snippet Plan

- `product-card.liquid`
- `breadcrumb.liquid`
- `responsive-image.liquid`
- `icon.liquid`
- `cta-button.liquid`
- `spec-table.liquid`
- `brand-logo-card.liquid`
- `article-card.liquid`
- `comparison-product-cell.liquid`

## JavaScript Modules

Use progressive enhancement; HTML should remain useful if JavaScript fails.

- `mega-menu.js` — hover/click/focus menu behavior.
- `brand-marquee.js` — optional marquee velocity behavior with reduced-motion guard.
- `collection-filters.js` — filter, reset, sort, view toggle behavior; use Section Rendering API if applicable.
- `product-comparison.js` — selected product state, sticky bar, modal, max-3 validation.
- `product-gallery.js` — thumbnail switching and accessible gallery behavior.
- `sticky-product-bar.js` — PDP scroll-triggered bottom bar.
- `quote-wizard.js` — multi-step validation, live summary, URL-prefill support.

## Content Management Rules

- No product, price, SKU, spec, testimonial, logo, or article content should be hardcoded in Liquid templates.
- All visible content must be editable through Shopify Admin, products, collections, metafields, metaobjects, menus, blogs, pages, Theme Editor settings, or locale files.
- Images should use Shopify image pickers, product/collection media, or file-reference metafields.
- UI must be responsive across mobile, tablet, and desktop.

## Accessibility Requirements

- Semantic landmarks for header, main, nav, footer.
- Buttons for interactive controls, links for navigation.
- Focus trap and Escape close for comparison modal.
- Keyboard operation for mega menu.
- Reduced-motion support for marquee and scroll animations.
- Alt text for logos, product images, and promo imagery.
