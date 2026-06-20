# Handover & QA Checklist — Il CashewFicio Storefront

Custom Dawn-based theme. All visible content is merchant-editable; nothing is hardcoded in
templates. This document is the merchant/QA guide for going live.

---

## 1. One-time setup (merchant, in Shopify Admin)

### Theme
- [ ] `shopify theme push` (or upload zip) to the **development/unpublished** theme. Do not
      publish until QA below passes.

### Navigation (Online Store → Navigation)
- [ ] `main-menu` — header nav (SHOP, MISSION, CHE STORIA, CONTATTI).
- [ ] `footer` — footer columns (used by all 3 footer menu blocks; rename/duplicate as needed).

### Pages (Online Store → Pages) — create each, then assign its Theme template
- [ ] **Mission** → template `page.mission`
- [ ] **Che Storia** → template `page.che-storia`
- [ ] **Contatti** → template `page.contatti`

### Custom data (Settings → Custom data → Products) — metafields
- [ ] `custom.tagline` (Single line text) — product card tagline (homepage/collection cards).
- [ ] Product reviews: install a reviews app that writes the standard
      `reviews.rating` / `reviews.rating_count` product metafields (e.g. Shopify Product Reviews,
      Judge.me, Loox). The product page shows the star rating automatically when present, and the
      full review widget is added as an **app block** on the product section (see §3).

### Theme settings (Theme editor → Theme settings)
- [ ] **Custom — Brand foundations**: set primary/secondary/accent colors, type, spacing, radius
      to the Figma values.
- [ ] **Social media**: set Facebook / Instagram / TikTok (etc.) links — the footer renders icons
      only for links that are set.

### Content > Files
- [ ] Upload all Figma-exported assets (logo, hero/banner images, decorative band, product/feature
      icons) so they can be selected in section image pickers.

---

## 2. Section-by-section editable controls

| Area | Section | Key controls |
|---|---|---|
| Header | `custom-header` (header group) | logo, menu, search/account/cart/wishlist/language toggles, sticky, colors |
| Hero | `custom-hero` | main/mobile/background images, decorative band, overlay text + CTAs, alignment |
| Intro | `custom-rich-text` | eyebrow, heading, rich text, alignment, colors |
| Products | `custom-featured-products` | collection, count, columns, ratio, price/tagline toggles |
| Banner | `custom-image-banner` | image (+mobile), link, overlay text/CTA |
| Blog | `custom-blog-posts` | blog, posts, columns |
| Footer | `custom-footer` (footer group) | logo, about/contact text, menu columns (blocks), newsletter, social |
| Collection | `custom-main-collection` | banner toggle, per-page, columns, ratio, filters/sort/count toggles |
| Product | `custom-main-product` | feature badges (blocks), collapsible rows (blocks), wishlist, reviews app block |
| Product extras | `custom-icon-columns`, `custom-product-recommendations` | trust columns; related products |
| Pages | `custom-image-with-text`, `custom-contact`, `custom-map`, `custom-testimonials` | per Mission/Che Storia/Contatti |

---

## 3. Product reviews (app block)
1. Install a reviews app that supports **theme app blocks** + the `reviews.rating` metafields.
2. Theme editor → a product → **custom-product** section → **Add block** → pick the app's block.
3. The star rating near the title appears automatically once products have `reviews.rating` data.

---

## 4. QA checklist (before publish)

### Dynamic content (the core requirement)
- [ ] No visible hardcoded copy — every heading/label/paragraph traces to a setting, metafield,
      menu, locale key, or store object.
- [ ] No hardcoded content image paths — all imagery via image pickers / Content > Files.
- [ ] Product cards, prices, availability, badges render from live product data.
- [ ] Collection filters/sort/counts/empty-state render from `collection.filters` / live data.
- [ ] Supplied hyperlinks preserved (footer legal links, social).

### Responsive (Figma breakpoints: ≤749 mobile · 750–989 tablet · ≥990 desktop)
- [ ] Header: desktop nav row vs mobile drawer; logo centered; icons reachable.
- [ ] Hero/banner art-direction (mobile image where set); no overflow.
- [ ] Product/collection grids reflow (2 → 3 → N columns).
- [ ] Product page: gallery + buy box stack on mobile.

### Functionality
- [ ] Collection: filter/sort updates the grid without full reload (AJAX) **and** works with JS
      disabled (form submit). Back button restores filter state. Price From/To filters correctly.
- [ ] Product: variant `<select>` updates price/availability; Add to cart adds the right variant;
      quantity respected; recommendations load.
- [ ] Footer newsletter submits (creates a customer/marketing contact).
- [ ] Contact form (Contatti) sends; success and error states show.
- [ ] Map embed renders (Contatti) once a Google Maps embed URL is set.

### Accessibility
- [ ] Keyboard: nav, drawer (Esc closes), filters, variant select, forms all operable.
- [ ] Visible focus states; skip-to-content link works.
- [ ] Images have alt text (or empty alt for decorative); form fields have labels.

### Performance / hygiene
- [ ] No console errors on home/collection/product/pages.
- [ ] Above-the-fold images eager; rest lazy; no major layout shift (CLS).
- [ ] Lighthouse pass on home + product (target: green Performance/Accessibility/Best-Practices/SEO).

### Cross-page
- [ ] Custom header + footer appear on every template (set in header/footer section groups).
- [ ] Mission / Che Storia / Contatti templates assigned and populated.

---

## 5. Go-live
- [ ] All QA boxes checked on the unpublished theme.
- [ ] Stakeholder sign-off on Figma fidelity (desktop/tablet/mobile).
- [ ] Publish the theme (Online Store → Themes → Publish).
- [ ] Post-publish smoke test: place a test order, submit the contact + newsletter forms.

---

## 6. Notes / known follow-ups
- Reviews depend on an external app (theme app block + `reviews.*` metafields).
- Variant selection uses a `<select>` (functional); per-option swatches are a future enhancement.
- Cart add uses a standard form POST; an AJAX cart drawer is a future enhancement.
- Map uses a merchant-provided Google Maps embed URL (no API key needed).
