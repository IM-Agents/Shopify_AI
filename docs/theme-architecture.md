# Theme Architecture Specification

## Architecture Model

Use Shopify Online Store 2.0 architecture:

- JSON templates for page composition.
- Sections everywhere for merchant-controlled layout.
- Blocks for repeatable content and per-item controls.
- App blocks where apps must integrate into editable layouts.
- Snippets for reusable rendering patterns.
- Locale files for reusable interface strings.
- Theme settings for global visual tokens.
- Metafields/metaobjects for structured content that should be shared across templates or reused by multiple sections.

## Dynamic Content Sources

| Visible content type | Required dynamic source | Notes |
|---|---|---|
| Headings, labels, microcopy | Section/block settings or locale keys | No literal sentences in templates. |
| Long-form formatted copy | Rich text settings, pages, blogs, or metaobjects | Preserve formatting and links. |
| Product data | `product` object and product metafields | Title, media, price, variants, badges. |
| Collection data | `collection` object and collection metafields | Title, description, image, product list. |
| Repeating feature cards | Blocks or metaobjects | Choose blocks for local content; metaobjects for shared reusable content. |
| Testimonials/reviews | Blocks, app blocks, or metaobjects | Source depends on final review system. |
| Images/icons | Image picker or file-reference metafields/metaobjects | Assets uploaded to Content > Files. |
| Navigation | Shopify menus/linklists | Header/footer menu items must not be static. |
| Forms | Shopify forms plus settings/locales | Labels/placeholders dynamic. |
| Colors/fonts/buttons | Theme settings + CSS variables | Global editability. |

## Global Theme Settings

Global theme settings should include:

- Body font picker.
- Heading font picker.
- Accent font picker when required by Figma.
- Optional custom font URL/reference setting if a Figma font is not available in Shopify font picker.
- Base font size.
- Heading scale.
- Body line-height.
- Letter-spacing controls for headings and small labels.
- Primary, secondary, accent, text, muted text, border, and background colors.
- Button primary/secondary/tertiary colors and states.
- Border radius scale.
- Spacing scale.
- Container width.
- Header behavior settings, including sticky behavior where required.

## Section Schema Pattern

Each dynamic section should expose:

- Enable/disable setting.
- Heading/subheading/copy settings.
- CTA label and URL settings where applicable.
- Image picker settings for content imagery.
- Optional mobile-specific image picker when art direction differs.
- Layout style/variant settings.
- Color scheme setting.
- Per-breakpoint controls where design behavior requires merchant control.
- Blocks for repeatable items.

## Image Rendering Rules

- Render all imagery with Shopify `image_url` and `image_tag` filters.
- Provide width candidates and `sizes` values appropriate to layout.
- Use `loading="lazy"` by default except critical above-the-fold imagery where eager loading/preload is justified.
- Always output width and height to reduce layout shift.
- Use image alt text from the selected image or an editable setting.
- Use decorative empty alt text only when the image is purely decorative.
- Use mobile/tablet/desktop image settings where Figma requires different crops.

## Product Card Requirements

Product cards must render from Shopify product data and support:

- Product image/media.
- Product title.
- Price and compare-at price.
- Availability state.
- Variant option display where required.
- Swatches using variant data and/or metafields.
- Badge logic sourced from product tags, metafields, or configurable rules.
- Quick actions only if supported by the current theme or approved implementation scope.

## Collection Filtering Requirements

- Facets render from Shopify Search & Discovery configuration.
- Active filters, result counts, sort state, and empty states are dynamic.
- No static filter lists.
- Real-time updates use Section Rendering API.
- URL state is preserved and shareable.
- No-JS fallback submits filters normally.

## Accessibility Requirements

- Semantic landmarks for header, main, footer, navigation, and sections.
- Keyboard-accessible controls.
- Visible focus states.
- Correct button/link semantics.
- Form labels and accessible error/success messages.
- Alt text strategy for all images.
- ARIA only where native semantics are insufficient.

## Performance Requirements

- Responsive image sizes and lazy loading.
- Avoid layout shift with dimensions and stable containers.
- Minimize JavaScript and keep it progressive.
- Avoid blocking third-party dependencies unless required.
- No console errors.
- Do not over-fetch Section Rendering API responses.
