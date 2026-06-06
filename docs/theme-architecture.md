# Theme Architecture

## Base Theme Strategy

Use the latest stable Shopify Dawn theme as the foundation. Keep Dawn's core architecture intact unless there is a clear reason to extend it. This preserves Shopify update compatibility, maintainability, and Theme Editor behavior.

## Recommended Folder Usage

- `layout/` — base theme layout files such as `theme.liquid`.
- `templates/` — JSON templates for Online Store 2.0 page composition.
- `sections/` — reusable configurable sections for page building.
- `snippets/` — reusable Liquid fragments for cards, icons, media, swatches, badges, tracking helpers.
- `assets/` — modular CSS, minimal JavaScript, icons, and static assets.
- `config/` — theme settings schema and merchant-facing presets.
- `locales/` — translation strings and merchant-facing labels.

## Architecture Principles

1. **Section-first:** Build reusable sections rather than one-off page code.
2. **Snippet reuse:** Product cards, collection cards, buttons, media, badges, and form elements should be shared.
3. **Theme Editor friendly:** Expose settings for headings, media, text, buttons, colors, spacing, product/collection references, and layout options.
4. **Dynamic sources:** Support metafields/metaobjects where content is structured or reusable.
5. **No hardcoded merchant content:** Content should be editable through sections, theme settings, product/collection data, metafields, or metaobjects.
6. **Performance by default:** Avoid unnecessary libraries, duplicate CSS, heavy scripts, and blocking resources.
7. **Accessibility by default:** Use semantic HTML, keyboard support, focus states, ARIA only when needed, and readable contrast.

## Naming Conventions

- Sections: `custom-hero-banner.liquid`, `custom-featured-products.liquid`, `custom-testimonials.liquid`
- Snippets: `custom-product-card.liquid`, `custom-button.liquid`, `custom-responsive-image.liquid`
- CSS: `section-custom-hero-banner.css`, `component-custom-card.css`
- JavaScript: `custom-cart-drawer.js`, `custom-slider.js` only when native/CSS behavior is insufficient

## Template Strategy

Use JSON templates for page composition:

- `index.json` for home page
- `collection.json` and specialized collection templates if Figma requires variants
- `product.json` and specialized product templates if product types require unique layout
- `page.contact.json`
- `page.landing.json`
- `search.json`
- `cart.json` where cart page is used in addition to cart drawer

## Data Strategy

- Use Shopify product/collection/customer/cart objects for native commerce data.
- Use product metafields for structured product details, badges, care instructions, ingredients/specs, comparison values, and custom tabs.
- Use metaobjects for testimonials, FAQ libraries, press logos, store benefits, reusable landing content, or structured brand content.
- Use dynamic sources in section settings so merchants can connect data without code changes.
