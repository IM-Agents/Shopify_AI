# QA and Handover Plan

## QA Strategy

QA must verify three things together:

1. Figma fidelity.
2. Dynamic editability.
3. Responsive, accessible, performant behavior.

## Dynamic Content Audit

For every visible storefront element, verify the source:

- Text: setting, locale key, store object, page/blog content, metafield, or metaobject.
- Image/icon: image picker or file-reference metafield/metaobject from Content > Files.
- Link: URL setting, menu/linklist, or store object URL.
- Product data: product object and metafields.
- Collection data: collection object and metafields.
- Filters: Shopify Search & Discovery facets rendered from Liquid filter objects.
- Colors/fonts/buttons: global theme settings and CSS variables.

Pass criteria:

- No visible string is hardcoded in Liquid.
- No content asset uses a hardcoded static `src`.
- Theme Editor can update visible section content without code.

## Responsive QA

Validate at minimum:

- Mobile: <= 749px.
- Tablet: 750px - 989px.
- Desktop: >= 990px.

For each section:

- Compare spacing, alignment, type scale, image crop, and layout against Figma.
- Verify responsive image behavior and no avoidable layout shift.
- Verify mobile navigation, drawers, filters, sliders, accordions, tabs, and sticky behavior.
- Verify touch target sizes on mobile and tablet.

## State QA

Verify all applicable states:

- Default.
- Hover.
- Active.
- Focus.
- Disabled.
- Loading.
- Empty state.
- Error/success state for forms.
- Active filter and clear-all states.

## Collection Filtering QA

Validate:

- Facets render from live Shopify filter objects.
- Product grid updates using Section Rendering API.
- Result count updates correctly.
- Active filters update correctly.
- Facet counts update correctly.
- Sort changes update correctly.
- URL query parameters remain shareable.
- Browser back/forward navigation works.
- No-JS fallback works through normal page navigation.
- Empty collection/filter result state is clear and dynamic.

## Accessibility QA

Validate:

- Semantic landmarks and heading order.
- Keyboard navigation for menus, drawers, filters, tabs, accordions, carousels, and forms.
- Visible focus indicators.
- Form labels and error messages.
- Alt text for content images.
- Empty alt text for decorative images.
- Color contrast for text/buttons/states.
- ARIA attributes only where needed and correctly updated.

## Performance QA

Validate:

- Responsive image `srcset`/`sizes` output.
- Width and height attributes to reduce layout shift.
- Lazy loading for below-the-fold imagery.
- Avoid excessive JavaScript.
- No console errors.
- No unnecessary Section Rendering API requests.

## Handover Guide for Merchandisers

The final handover should explain:

- How to edit global colors, fonts, button styles, and spacing tokens.
- How to edit each section in Theme Editor.
- How to add, remove, reorder, and hide blocks.
- How to swap images/icons through image pickers.
- How to manage images in Shopify Content > Files.
- How to preserve or update CTA links through URL settings.
- How to manage Shopify menus for header/footer navigation.
- How to manage products, collections, collection imagery, and descriptions.
- How to manage metafields/metaobjects used by badges, swatches, testimonials, or structured content.
- How to configure Search & Discovery filters.
- How to verify mobile/tablet/desktop behavior after edits.

## Final Signoff Checklist

- [ ] Mapping matrix completed for every Figma node.
- [ ] Assets uploaded to Content > Files.
- [ ] Theme settings configured for global tokens.
- [ ] Sections and blocks editable in Theme Editor.
- [ ] Product and collection templates render live Shopify data.
- [ ] Real-time filters work with Section Rendering API.
- [ ] No-JS filtering fallback works.
- [ ] Responsive QA passed on mobile, tablet, and desktop.
- [ ] Accessibility baseline passed.
- [ ] Performance baseline passed.
- [ ] No console errors.
- [ ] Handover documentation delivered.
