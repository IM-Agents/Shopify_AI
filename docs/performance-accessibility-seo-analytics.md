# Performance, Accessibility, SEO & Analytics

## Performance Requirements

Targets:
- Lighthouse Performance: ≥85
- First Contentful Paint: <2.5s
- Largest Contentful Paint: <3s
- Critical console errors: 0

Implementation standards:
- Use responsive images with `srcset`/Shopify image filters.
- Prefer WebP-capable delivery through Shopify CDN where possible.
- Lazy-load non-critical images.
- Eager-load only above-the-fold critical hero/product media when justified.
- Use proper image dimensions to reduce layout shift.
- Remove unused styles.
- Keep CSS modular and component-specific.
- Minimize custom JavaScript.
- Defer non-critical scripts.
- Avoid unnecessary third-party libraries.

## Accessibility Requirements

Target:
- Accessibility score: ≥90

Standards:
- Semantic HTML structure.
- Proper heading hierarchy.
- Keyboard navigation for menus, sliders, accordions, tabs, forms, cart drawer.
- Visible focus states.
- Proper form labels and error states.
- ARIA attributes only where native semantics are insufficient.
- Alt text for meaningful images.
- Empty alt text for decorative images.
- Color contrast compliance.
- Touch-friendly controls on mobile/tablet.

## SEO Requirements

Support:
- Semantic page structure.
- Single logical `h1` per page where applicable.
- Proper heading hierarchy.
- Meta titles and descriptions through Shopify admin/theme support.
- Open Graph tags.
- Product schema markup.
- Breadcrumb support where applicable.
- Optimized URLs through Shopify handles.
- Clean content structure for static/landing pages.

## Analytics & Tracking Requirements

Support implementation of:
- Google Analytics
- Google Tag Manager
- Meta Pixel

Events to support:
- Product views
- Add to cart
- Checkout initiation
- Purchases
- Form submissions

Implementation notes:
- Tracking IDs must be merchant/client supplied.
- Prefer Shopify-native pixels/customer events where appropriate.
- If theme snippets are used, isolate tracking code and avoid scattering scripts through templates.
- Ensure privacy/consent requirements are considered before firing marketing tags.
