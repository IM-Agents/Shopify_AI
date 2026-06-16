# Functional Requirements

## Shared Components

### Top Announcement Banner

Must be persistent and full-width on every storefront page.

Required content:

- `🚚 Free Shipping on orders ₱5,000+ in Metro Manila`
- `📞 (02) 8245-7022`
- `Established 1943`
- Pipe separators between items.

Acceptance criteria:

- Content is editable from Theme Editor/global settings.
- Banner remains legible on mobile, tablet, and desktop.
- Banner does not block critical navigation or sticky bars.

### Main Navigation Header

Required elements:

- Guan Yiac wordmark + vector icon.
- Navigation links: Home, Our Products, About, Contact.
- Icon actions: Search, Wishlist, User account.
- “Our Products” opens mega menu.

Acceptance criteria:

- Desktop shows full nav and icons.
- Mobile uses responsive menu behavior.
- Logo and nav links are admin-editable.
- Search, wishlist, and account links have accessible labels.

### Mega Menu

Required categories:

- Conveyor Components
- Industrial Hose
- Power Transmission
- Other

Behavior:

- Left panel shows category list.
- Right panel shows sub-category preview grid based on active category.
- Includes `Browse All` CTA.

Acceptance criteria:

- Keyboard-accessible open/close and focus behavior.
- Mobile fallback works as accordion or drill-down menu.
- Category and subcategory links are configurable through Shopify menus/metaobjects.

### Product Card

Required elements:

- Product image.
- Wishlist icon.
- Product name.
- Price, quote CTA, or CTA area based on product configuration.
- Optional comparison checkbox on collection pages.

Acceptance criteria:

- Product data comes from Shopify product objects/metafields.
- No hardcoded product details in templates.
- Responsive card grid/list behavior is supported.

### Footer

Required content:

- Logo + tagline: `Supplying Philippine Industry Since 1943`.
- Description: `Your trusted partner for industrial hoses, bearings, conveyor components, and power transmission products.`
- Three-column link lists: Products, Company, Support.
- Bottom bar: `© 2026 Guan Yiac Hardware. All Rights Reserved.` plus Privacy Policy, Terms, Sitemap.

Acceptance criteria:

- Footer links are editable through menus or Theme Editor blocks.
- Copyright year uses the supplied 2026 copy unless client approves dynamic year behavior.

## Homepage Requirements

Sections in order:

1. Top Announcement Banner.
2. Main Navigation Header.
3. Mega Menu.
4. Hero Section — implement V6 final.
5. Brand Partners Marquee.
6. Shop by Category.
7. Featured Products.
8. Why Choose Us.
9. Industries We Serve.
10. Customer Testimonials.
11. Free Shipping Promotion Banner.
12. Industrial Knowledge Hub.
13. Footer.

### Hero Section

Required copy:

- Headline: `Trusted Industrial Hardware Supplier of Philippines`
- Sub-headline: `Where Quality Meets Precision in Every Industrial Component`
- Body: `From precision bearings to heavy-duty hoses — 20,000+ industrial products with same-day delivery in Metro Manila.`
- Primary CTA: `Explore Our Collection`
- Secondary CTA: `Request Quote` or `Contact`

Acceptance criteria:

- Full-width imagery is configurable.
- CTAs use configurable links.
- Mobile layout preserves headline, CTA hierarchy, and image clarity.

### Brand Partners Marquee

Brands:

- Mitsubishi
- Hitachi
- Lovejoy
- Goodyear
- Pulton
- SKF
- THB
- Toyox

Acceptance criteria:

- Logo strip can scroll continuously or progressively based on design.
- Animation respects reduced-motion preferences.
- Logos are editable via blocks or metaobjects.

### Featured Products

Sample products to configure in Shopify/admin:

- Black Neoprene 1-ply Cotton
- V-BELT SPB/XPB
- Brown Conveyor Belt

Acceptance criteria:

- Product cards come from selected collection/product list.
- Includes Download Catalogue CTA with icon.

## Collection / Category Page Requirements

URL pattern: `/collections/:category-slug`

Required sections:

1. Shared banner/header/mega menu.
2. Breadcrumb: `Home / Category`.
3. Category hero with headline and full-width image.
4. Product Finder guided filters.
5. Quick filter pills.
6. Sorting and view options bar.
7. Product grid with inline ad placements.
8. Product comparison feature.
9. Footer.

### Product Finder

Example filters:

- Size.
- Pressure rating.
- Material.
- Product type/specification.

Acceptance criteria:

- Uses Shopify filters where possible.
- Filter labels and values come from product options/metafields or Search & Discovery facets.
- Includes Find Products and Reset actions.

### Product Comparison

Behavior:

- Product cards include comparison checkbox.
- Sticky bottom bar appears after 1+ products selected.
- Up to 3 products can be compared.
- Selected thumbnails appear with dismiss action.
- Compare CTA opens full-screen comparison modal.

Acceptance criteria:

- Compare button displays `Compare (N/3)`.
- Comparison modal has sticky product identity header row.
- Spec rows are scrollable and sourced from product metafields/spec data.
- Clear All resets selection.

## Product Detail Page Requirements

URL pattern: `/products/:product-slug`

Required sections:

1. Shared banner/header/mega menu.
2. Breadcrumb: `Home / Category / Subcategory`.
3. Two-column product detail layout.
4. Sticky bottom quote/download bar on scroll.
5. Related products.
6. Industrial Knowledge Hub.
7. Footer.

Product detail layout:

- Left: primary image + thumbnail strip.
- Right: product name, SKU, specifications, selector dropdown, key spec highlights, quote/inquiry action area.

Acceptance criteria:

- Quote action is primary; no direct buy is required unless client later approves cart flow.
- Sticky bottom bar shows product thumbnail/name plus Request Quote and Download Catalog buttons.
- Product specs are rendered from metafields or product data.

## Request Quote Page Requirements

URL pattern: `/pages/request-quote`

Required sections:

1. Shared banner/header.
2. Breadcrumb: `Home / Request a Quote`.
3. Two-column quote form layout.
4. Footer.

Left column: multi-step form wizard fields:

- Product name / SKU.
- Quantity needed.
- Preferred specs.
- Company name.
- Contact name.
- Email / Phone.
- Delivery address.
- Additional notes.

Right column:

- Live summary of selected product and specifications.
- Order/request preview panel.

Acceptance criteria:

- Required fields validate clearly.
- Product/SKU can be prefilled from PDP quote CTA.
- Submission creates a trackable quote lead via Shopify-native form, app, email notification, or integration.
- Form works responsively on mobile/tablet/desktop.
