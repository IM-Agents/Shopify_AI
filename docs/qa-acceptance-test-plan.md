# QA, Acceptance Criteria & Test Plan

## Acceptance Criteria

- Dawn theme used as base theme.
- All Figma screens implemented.
- Fully responsive across mobile, tablet, laptop, and desktop.
- Merchant-editable content through Theme Editor.
- Reusable section architecture.
- Shopify best practices followed.
- Performance optimized.
- SEO-friendly implementation.
- Accessible UI.
- Clean, scalable, maintainable code.
- Production-ready theme delivery.

## Functional QA

### Navigation

- Header links render correctly.
- Mega menu opens/closes on desktop.
- Mobile menu opens/closes and supports nested navigation.
- Keyboard users can navigate menus.
- Announcement bar link works if configured.

### Product

- Variant selection updates price/media/availability.
- Dynamic pricing displays correctly.
- Inventory states display correctly.
- Product media gallery supports images/video/model media if configured.
- Long product titles do not break layout.
- Missing product images use safe fallback behavior.

### Cart

- Add to cart works.
- AJAX cart updates work.
- Cart drawer opens and updates correctly.
- Quantity increases/decreases correctly.
- Empty cart state is clear.
- Error messages are visible and accessible.

### Customer

- Login page works.
- Registration page works.
- Account page layout is usable.
- Form labels and validation are accessible.

## Responsive QA Matrix

Test at minimum:

| Device class | Width |
|---|---:|
| Mobile | 375px |
| Tablet | 768px |
| Laptop | 1024px |
| Desktop | 1440px+ |

Checks:
- No horizontal scrolling.
- Content stacks correctly.
- Buttons and controls are touch-friendly.
- Images crop/focus correctly.
- Header, menus, product grids, cart drawer, sliders, accordions, and forms remain usable.

## Browser QA

Latest versions:
- Chrome
- Safari
- Firefox
- Edge

No major UI breaking issues are allowed.

## Edge Case QA

- Empty collections.
- Missing images.
- Out-of-stock products.
- Long product titles.
- Long content blocks.
- Slow network conditions.
- Large product catalogs.
- Empty search results.
- Product with one variant.
- Product with many variants/options.

## Delivery Evidence

Final submission should include:
- Source code repository.
- Customized Dawn theme.
- Setup process documentation.
- Custom sections documentation.
- Custom functionality documentation.
- Assumptions and limitations.
- Screenshots for desktop, tablet, and mobile.
