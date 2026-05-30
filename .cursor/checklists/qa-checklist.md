# QA Checklist — Shopify Theme

Complete before merging to `staging` or promoting to production.
Test on real devices where possible — not only browser DevTools.

---

## Environment Setup

- [ ] Testing against correct theme (staging/dev — not live unless approved)
- [ ] Latest branch deployed via `shopify theme push`
- [ ] Test with representative products (in stock, out of stock, variants, sale)
- [ ] Test with empty cart and populated cart states
- [ ] Clear browser cache or use incognito for fresh load testing

## Global / Cross-Page

- [ ] Header: logo, nav links, search, cart icon, account link all functional
- [ ] Mobile menu opens, closes, traps focus appropriately
- [ ] Footer links and newsletter form work
- [ ] Announcement bar dismisses and persists (if applicable)
- [ ] Skip-to-content link visible on keyboard focus
- [ ] Favicon and page titles correct
- [ ] 404 page renders without broken layout
- [ ] Password page works (if store is password-protected)

## Homepage

- [ ] All sections render with and without configured content
- [ ] Hero/banner images load without layout shift
- [ ] Video backgrounds play/pause correctly (if applicable)
- [ ] Section reordering in Theme Editor reflects on storefront
- [ ] Empty section states handled gracefully (no broken markup)

## Collection Pages

- [ ] Product grid displays correctly at all breakpoints
- [ ] Filtering and sorting work (if enabled)
- [ ] Pagination or infinite scroll functions
- [ ] Collection images and titles display
- [ ] Empty collection state handled

## Product Pages

- [ ] Product title, price, compare-at price, badges correct
- [ ] Variant selection updates price, SKU, availability, images
- [ ] Sold-out variants disabled or show appropriate messaging
- [ ] Add to cart works (drawer, notification, or redirect as designed)
- [ ] Quantity selector respects min/max/inventory
- [ ] Product media gallery: zoom, thumbnails, video (if applicable)
- [ ] Product description and metafield content renders
- [ ] Related/complementary products section works
- [ ] Structured data / SEO meta present (view page source)

## Cart & Checkout

- [ ] Cart drawer/page opens and closes correctly
- [ ] Line items display with correct variant, price, quantity
- [ ] Quantity update and remove item work without full page reload
- [ ] Cart count badge updates in header
- [ ] Discount codes apply (if tested on staging)
- [ ] Proceed to checkout loads Shopify checkout
- [ ] Cart persists across page navigation
- [ ] Line item properties display correctly (if used)

## Search

- [ ] Predictive search returns results
- [ ] Search results page renders products
- [ ] Empty search state handled
- [ ] Keyboard navigation in search dropdown works

## Theme Editor Compatibility

- [ ] New custom sections appear in "Add section" picker
- [ ] Section settings update live in editor preview
- [ ] Blocks can be added, removed, reordered via drag-and-drop
- [ ] Section select/deselect doesn't break JS components
- [ ] No console errors in Theme Editor preview

## Responsive Breakpoints

Test at minimum: **375px**, **768px**, **990px**, **1440px**

- [ ] No horizontal scroll at any breakpoint
- [ ] Touch targets minimum 44×44px on mobile
- [ ] Text readable without zooming
- [ ] Images don't overflow containers
- [ ] Sticky header doesn't obscure content

## Browser Matrix

- [ ] Chrome (latest)
- [ ] Safari (latest — iOS if possible)
- [ ] Firefox (latest)
- [ ] Edge (latest)

## Accessibility Spot Check

- [ ] Tab through page — logical focus order
- [ ] Screen reader announces cart updates
- [ ] Form errors announced and linked to inputs
- [ ] No information conveyed by color alone

## Internationalization (if multi-language)

- [ ] All new strings translated in locale files
- [ ] RTL layout correct (if applicable)
- [ ] Currency and date formats correct per market

## Regression

- [ ] Existing Dawn functionality not broken (quick add, cart, search)
- [ ] App embed blocks still render (if apps installed)
- [ ] No new console errors on key pages

---

**QA Engineer:** _______________ **Date:** _______________ **Theme URL:** _______________

**Result:** ☐ Pass &nbsp; ☐ Pass with notes &nbsp; ☐ Fail — block merge

**Notes:**
