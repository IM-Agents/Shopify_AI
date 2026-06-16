# Content Mapping Matrix

## Purpose

This matrix maps the Guan Yiac Hardware PRD/Figma content to Shopify-managed sources so implementation avoids hardcoded storefront content wherever practical.

## Global / Shared Content

| Content / Component | Required Content | Recommended Shopify Source | Notes |
| --- | --- | --- | --- |
| Top banner | Free shipping ₱5,000+ Metro Manila, phone, Established 1943 | Theme settings / locale keys | Persistent on all pages |
| Logo | Guan Yiac wordmark + vector icon | Theme image picker | Include mobile/desktop sizing controls |
| Navigation | Home, Our Products, About, Contact | Shopify menus | Our Products triggers mega menu |
| Mega menu categories | Conveyor Components, Industrial Hose, Power Transmission, Other | Shopify menu + collections/metaobjects | Right panel changes by active category |
| Breadcrumbs | Home / Category / Subcategory | Generated from routes/collection/product data | Use accessible nav landmark |
| Footer tagline | Supplying Philippine Industry Since 1943 | Theme settings | Shared footer component |
| Footer links | Products / Company / Support | Shopify menus | Editable by admin |
| Legal links | Privacy Policy, Terms, Sitemap | Shopify pages/menus | Bottom bar |

## Homepage Content

| Section | Content | Source | Notes |
| --- | --- | --- | --- |
| Hero V6 | Headline, sub-headline, body, CTAs, background image | Section settings | Implement V6 final |
| Brand marquee | Mitsubishi, Hitachi, Lovejoy, Goodyear, Pulton, SKF, THB, Toyox | Brand Partner metaobjects or section blocks | Logo files client-provided |
| Shop by Category | Heading, subheading, category cards | Section settings + collections | Cards should link to collections |
| Featured Products | Product cards and catalogue CTA | Product list/collection picker + file setting | Sample products from PRD if present in catalogue |
| Why Choose Us | Headline and feature cards | Section blocks/metaobjects | Icons editable |
| Industries We Serve | 5 industry cards | Industry metaobjects | Final sectors to confirm |
| Testimonials | 3 visible testimonials | Testimonial metaobjects | Final quotes client-provided |
| Shipping promo | Truck imagery and CTA copy | Section settings | Reinforces free shipping threshold |
| Knowledge Hub | Blog article cards | Shopify blog/articles | Two-column desktop grid |

## Collection Page Content

| Area | Content | Source | Notes |
| --- | --- | --- | --- |
| Category hero | Headline and banner image | Collection metafields | Example: Reliable Industrial Hose Pipes for Every Application |
| Product Finder | Size, pressure rating, material, etc. | Product metafields/Search & Discovery facets | Two-row desktop filter grid |
| Quick filter pills | All, Air Hose, Hydraulic, Steam, Food Grade, Chemical | Collection metafields/menu/facet links | Horizontally scrollable on mobile |
| Sort/view bar | Featured, Price Low–High, Newest; grid/list | Shopify sorting + JS/CSS state | Maintain filter state |
| Product grid | Product cards | Shopify collection products | Inline ad every ~8–12 cards when configured |
| Inline ads | Promo blocks | Inline Ad metaobjects | Optional and configurable |
| Comparison modal | Image, name, spec rows | Product media/title/metafields | Max 3 products |

## Product Detail Page Content

| Area | Content | Source | Notes |
| --- | --- | --- | --- |
| Product gallery | Primary image + thumbnails | Product media | Responsive images |
| Product info | Name, SKU, specs, selector | Product object, variants, metafields | Quote-focused |
| Key highlights | Spec highlights | Product metafields | Structured content preferred |
| Sticky bottom bar | Thumbnail, product name, Request Quote, Download Catalog | Product data + file metafield | Appears on scroll |
| Related products | Brown Conveyor, V-BELT SPB/XPB, Black Neoprene sample set | Product recommendations or selected product list | Dynamic product source |
| Knowledge Hub | Article cards | Shopify blog/articles | Shared section |

## Request Quote Page Content

| Area | Content | Source | Notes |
| --- | --- | --- | --- |
| Form fields | Product/SKU, quantity, specs, company, contact, email/phone, delivery address, notes | Shopify form/app/custom integration | Fields need final sales-team validation |
| Product prefill | Product name/SKU/specs | URL params from PDP/collection | Improves conversion |
| Live summary | Selected product/spec summary | JavaScript progressive enhancement | Right column desktop, stacked mobile |
| Submission routing | Quote lead details | Shopify form notification/app/webhook | Final routing decision required |

## Content Dependencies

- Final 20,000+ SKU catalogue with product specs.
- Brand partner logo assets.
- Hero/truck/industrial imagery source files.
- Customer testimonials.
- Industrial Knowledge Hub articles.
- Industry vertical list.
- Catalogue PDFs/files for download CTAs.
