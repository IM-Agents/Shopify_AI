# Guan Yiac — Detailed Execution Plan

**Store:** https://bhautik-mehta.myshopify.com/  
**Figma:** [Guan yiac Design V2](https://www.figma.com/design/XnDeOu7VHDIypno8i45oQ9/Guan-yiac?node-id=2-2)  
**Date:** 2026-06-16  
**Branch:** `dev_cursor` (theme from `dev_claude`)

---

## 1. Current State Audit

| Area | Status | Gap |
|------|--------|-----|
| Dawn 15.4.1 base | ✅ Restored from `dev_claude` | — |
| Custom sections (20) | ✅ Built | Brand marquee, category grid, industries, mega menu added |
| Homepage template | ✅ Complete | 9 sections wired per Figma order |
| Collection filters | ✅ AJAX facets | UI has Product Finder styling |
| Cart drawer | ✅ Fixed | Custom drawer only; Dawn drawer removed |
| Design tokens | ✅ Applied | Teal palette in settings + CSS |
| Store Files (images) | ⚠️ Exported locally | Upload to Files pending Admin token |
| Menus / pages | ⚠️ Script ready | Run `setup-guan-yiac-store.mjs` after auth |
| Mega menu | ✅ Built | 2-column category panel |

---

## 2. Figma → Shopify Mapping

### Homepage section order (`templates/index.json`)

| # | Figma section | Shopify section | Image picker fields |
|---|---------------|-----------------|---------------------|
| 1 | Announcement bar | `announcement-bar` (header-group) | — |
| 2 | Hero V6 | `custom-hero` | `image`, `image_mobile`, `background_image` |
| 3 | Brand partners marquee | `custom-brand-marquee` | Block logos (optional) |
| 4 | Shop by Category | `custom-category-grid` | Block `image` per category |
| 5 | Featured catalogue + products | `custom-featured-products` | Via product media |
| 6 | Why Choose Us | `custom-icon-columns` | Block `icon` images |
| 7 | Industries We Serve | `custom-industries` | Block `image` per industry |
| 8 | Testimonials | `custom-testimonials` | Block `avatar` |
| 9 | Free shipping promo | `custom-image-banner` | `image`, `image_mobile` |
| 10 | Knowledge Hub | `custom-blog-posts` | Article featured images |
| 11 | Newsletter | `custom-footer` (newsletter block) | — |
| 12 | Footer | `custom-footer` (footer-group) | `logo` |

### Templates

| Page | Template | Section |
|------|----------|---------|
| Collection | `collection.json` | `custom-main-collection` |
| Product | `product.json` | `custom-main-product` + icon columns + recommendations |
| Request Quote | `page.request-quote.json` | `custom-contact` (future wizard) |
| About | `page.about.json` | `custom-rich-text` + `custom-image-with-text` |
| Contact | `page.contact.json` | `custom-contact` + `custom-map` |

---

## 3. Design Tokens (Figma → Theme Settings)

| Token | Figma hex | Setting ID |
|-------|-----------|------------|
| Primary dark teal | `#0D403C` | `custom_color_primary` |
| Primary teal | `#2E605C` | `custom_color_secondary` |
| Accent / links | `#007B72` | `custom_color_accent` |
| On primary | `#FFFFFF` | `custom_color_on_primary` |
| Button radius | 24px | `custom_radius_lg` |
| Card radius | 12px | `custom_radius_md` |
| Container | 1280px | `page_width` → 1280 |

**Fonts:** IBM Plex Sans (body/headings via Theme Editor), Inter (announcement bar).

---

## 4. Image Asset Upload Plan

All images uploaded to **Admin → Content → Files**, then referenced in `config/settings_data.json` via `shopify://shop_images/<filename>`.

| File name | Usage | Figma source |
|-----------|-------|--------------|
| `guan-yiac-logo.svg` | Header + footer logo | Logo component |
| `hero-background.jpg` | Hero background | Hero V6 |
| `category-conveyor.jpg` | Category tile | Shop by Category |
| `category-power-transmission.jpg` | Category tile | Shop by Category |
| `category-industrial-hose.jpg` | Category tile | Shop by Category |
| `category-mechanical.jpg` | Category tile | Shop by Category |
| `industry-automotive.jpg` | Industries card | Industries section |
| `industry-electronics.jpg` | Industries card | Industries section |
| `industry-construction.jpg` | Industries card | Industries section |
| `industry-manufacturing.jpg` | Industries card | Industries section |
| `industry-aerospace.jpg` | Industries card | Industries section |
| `promo-truck.png` | Shipping promo | Free shipping section |
| `collection-hero-hose.jpg` | Collection banner | Collection page |

**Upload method:** `scripts/upload-figma-assets.mjs` (Admin GraphQL `fileCreate`) or manual upload + run `scripts/wire-settings-images.mjs`.

---

## 5. Store Navigation & Pages

### Main menu (`main-menu`)

```
Home → /
Our Products → (mega menu parent)
  ├── Conveyor Components → /collections/conveyor-components
  ├── Industrial Hose → /collections/industrial-hose
  ├── Power Transmission → /collections/power-transmission
  └── Other → /collections/other
About → /pages/about-us
Contact → /pages/contact-us
```

### Footer menus

- **footer-products:** Industrial Hose, Power Transmission, Conveyor Components, All Products
- **footer-company:** About Us, Brand Partners, Blog, Contact Us
- **footer-support:** Privacy Policy, Terms, Sitemap

### Pages to create

| Handle | Title |
|--------|-------|
| `about-us` | About Us |
| `contact-us` | Contact Us |
| `request-quote` | Request a Quote |
| `privacy-policy` | Privacy Policy |
| `terms` | Terms of Service |
| `sitemap` | Sitemap |

### Collections to create

`conveyor-components`, `industrial-hose`, `power-transmission`, `other`

---

## 6. Implementation Phases

### Phase A — Foundation (this session)
- [x] Restore theme from `dev_claude`
- [x] Fix cart drawer conflict in `theme.liquid`
- [x] Apply Figma color tokens
- [x] Update announcement bar copy
- [x] Build `custom-brand-marquee`, `custom-category-grid`, `custom-industries`
- [x] Enhance mega menu in header
- [x] Wire full `index.json` homepage

### Phase B — Store content
- [x] Export Figma images to `store-assets/`
- [x] Wire `templates/index.json` + header/footer image picker references
- [ ] Upload Figma images to Shopify Files (`node scripts/upload-store-assets.mjs`)
- [ ] Create menus, pages, collections via Admin API script
- [x] `shopify theme push` to dev theme

### Phase C — Polish
- [ ] Collection Product Finder UI (Figma filter panel)
- [ ] Product comparison modal (max 3)
- [ ] Request quote page wizard
- [ ] Responsive QA mobile/tablet/desktop
- [ ] `shopify theme check` — 0 offenses

---

## 7. Acceptance Criteria

1. Homepage matches Figma section order and teal brand palette.
2. All section images use Theme Editor image pickers (sourced from Files).
3. Collection filters work via Shopify Search & Discovery facets with AJAX.
4. Custom cart drawer opens from header, updates qty, no Dawn drawer conflict.
5. Main menu matches Figma: Home, Our Products (mega), About, Contact.
6. Footer shows Products / Company / Contact columns per Figma.
7. Merchandiser can edit all visible content without code changes.
