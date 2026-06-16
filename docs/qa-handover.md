# QA and Handover Plan

## QA Scope

Validate the following page types:

- Homepage.
- Collection/category page.
- Product detail page.
- Request quote page.
- Blog/Industrial Knowledge Hub preview and article routes where included.
- Shared header, mega menu, footer, banner, product cards, breadcrumbs, and sticky bars.

## Responsive QA

Test mobile, tablet, and desktop layouts.

Checklist:

- Top banner remains readable and does not overflow.
- Header icons and mobile menu are touch-friendly.
- Mega menu has mobile fallback behavior.
- Hero V6 preserves CTA hierarchy.
- Category and product grids stack cleanly.
- Horizontal scrollers have accessible overflow behavior.
- PDP gallery and sticky bottom bar work on small screens.
- Quote wizard becomes single-column on mobile.
- No unwanted horizontal scrolling.

## Functional QA

Checklist:

- Search opens and returns relevant products.
- Wishlist icon behavior works according to selected implementation.
- Mega menu category hover/click/focus updates subcategory preview.
- Collection filters apply and reset correctly.
- Sort order changes product order correctly.
- Grid/list view toggle works.
- Product comparison maxes at 3 products.
- Comparison modal opens, scrolls, and closes correctly.
- PDP gallery thumbnails update the primary image.
- Request Quote CTA pre-fills product/SKU context.
- Download Catalogue buttons link to configured files.
- Quote form validates required fields and submits successfully.

## Accessibility QA

Checklist:

- Header, nav, main, and footer landmarks are present.
- Interactive elements have accessible names.
- Keyboard navigation works for menus, filters, forms, sticky bars, and comparison modal.
- Escape closes modals/menus where expected.
- Focus states are visible.
- Color contrast meets WCAG AA where possible.
- Images have meaningful alt text or empty alt for decorative images.
- Marquee and scroll animations respect `prefers-reduced-motion`.

## Performance QA

Checklist:

- Product images use responsive image sizes.
- Below-the-fold images lazy-load.
- Logo/image assets are optimized.
- JavaScript is scoped and does not block initial render unnecessarily.
- Large collection pages remain responsive.
- No critical console errors.

## Content Handover

Document for the content/admin team:

- How to update top banner copy and phone number.
- How to manage navigation and mega menu links.
- How to upload/update brand partner logos.
- How to update category cards and collection heroes.
- How to assign product specification metafields.
- How to configure catalogue download files.
- How to add testimonials and industry cards.
- How to publish Industrial Knowledge Hub articles.
- How to review quote submissions.

## Launch Checklist

- Figma fidelity approved.
- Responsive QA passed.
- Quote submissions tested with real recipient/routing.
- Search/filter behaviour tested with representative catalogue data.
- Legal links present: Privacy Policy, Terms, Sitemap.
- Free shipping threshold copy confirmed.
- Phone number confirmed: `(02) 8245-7022`.
- Analytics/conversion tracking requirements confirmed if in scope.
