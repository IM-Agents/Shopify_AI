# Product Reviews — Setup (store-admin actions)

The theme already supports reviews:
- Star rating renders on the product page from `product.metafields.reviews.rating` /
  `reviews.rating_count` (`sections/custom-main-product.liquid`).
- A theme **app block** slot (`@app`) is available on the `custom-product` section for a review
  widget.

These two steps require **Shopify store/admin access** and therefore cannot be performed from the
theme codebase (no authenticated store/CLI in this environment). Do them in Admin:

---

## Option A (recommended) — Install a reviews app
Most review apps create the standard `reviews.rating` / `reviews.rating_count` product metafields
automatically and ship a theme app block.

1. Admin → **Apps** → Shopify App Store → install one of:
   - **Shopify Product Reviews** (free), **Judge.me**, **Loox**, or **Okendo**.
2. Follow the app's onboarding (it provisions the `reviews.*` metafields).
3. Theme editor → open a **product** → `custom-product` section → **Add block** → choose the app's
   review-widget block → Save. (The star rating near the title appears automatically once products
   have rating data.)

---

## Option B — Create the metafield definitions manually
If you collect ratings without an app (e.g. via metaobjects/import), create the definitions so the
theme's star display works.

### B1. Admin UI
Settings → **Custom data** → **Products** → **Add definition**:
- Name: `Rating` · Namespace and key: `reviews.rating` · Type: **Rating** (min 1, max 5)
- Name: `Rating count` · Namespace and key: `reviews.rating_count` · Type: **Integer**

### B2. Admin GraphQL API (equivalent, scriptable)
Run against `https://bhautik-mehta.myshopify.com/admin/api/2024-10/graphql.json` with an admin
token that has `write_metafield_definitions`:

```graphql
mutation CreateRating {
  metafieldDefinitionCreate(definition: {
    name: "Rating",
    namespace: "reviews",
    key: "rating",
    ownerType: PRODUCT,
    type: "rating",
    validations: [{ name: "scale_min", value: "1" }, { name: "scale_max", value: "5" }]
  }) { createdDefinition { id } userErrors { field message } }
}

mutation CreateRatingCount {
  metafieldDefinitionCreate(definition: {
    name: "Rating count",
    namespace: "reviews",
    key: "rating_count",
    ownerType: PRODUCT,
    type: "number_integer"
  }) { createdDefinition { id } userErrors { field message } }
}
```

> Note: a review app is still needed to **collect and store** customer reviews. The definitions
> above only make the rating values displayable by the theme.

---

## Verify
After setup: open a product with rating data → the star rating shows under the title, and the
review widget (app block) renders in the `custom-product` section.
