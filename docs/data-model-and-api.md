# Data Model, Metafields, and APIs

## Shopify Data Model

### Products

Use Shopify products for all catalogue items.

Recommended required product fields:

- Title.
- Handle.
- SKU / variant SKU.
- Vendor/brand where applicable.
- Product type/category.
- Product images.
- Description.
- Variant options for size/type/spec when applicable.
- Tags for broad grouping only; use metafields for structured specifications.

### Product Metafields

| Namespace/Key | Type | Purpose |
| --- | --- | --- |
| `custom.spec_size` | Single line text or list | Size/filter/comparison value |
| `custom.pressure_rating` | Single line text | Hose pressure filtering/spec display |
| `custom.material` | Single line text | Material filtering/spec display |
| `custom.application` | List text | Common applications |
| `custom.key_specs` | Rich text or JSON | PDP key specification highlights |
| `custom.catalogue_file` | File reference | Product or category catalogue download |
| `custom.quote_only` | Boolean | Hide direct purchase/add-to-cart when true |
| `custom.comparison_specs` | JSON | Ordered comparison rows if not represented as individual metafields |
| `custom.delivery_note` | Single line text | Same-day/Metro Manila notes if product-specific |

### Collections

Required collections/categories:

- Conveyor Components.
- Industrial Hose.
- Power Transmission.
- Other.

Example subcategories:

- Conveyor Belts: Neoprene, Cotton, Brown Conveyor.
- Industrial Hose: Air & Multipurpose, Hydraulic, Steam, Food Grade, Chemical.
- Power Transmission: V-Belts SPB/XPB, Bearings.
- Other: TBD by client.

### Collection Metafields

| Namespace/Key | Type | Purpose |
| --- | --- | --- |
| `custom.hero_headline` | Single line text | Collection hero heading |
| `custom.hero_image` | File reference | Full-width collection hero image |
| `custom.quick_filters` | List text or metaobject refs | Quick pill labels/links |
| `custom.finder_fields` | JSON/metaobject refs | Product Finder configuration |
| `custom.inline_ad_blocks` | Metaobject refs | Inline ad placement content |
| `custom.catalogue_file` | File reference | Category catalogue download |

## Metaobjects

### Brand Partner

Fields:

- Name.
- Logo image.
- Optional link.
- Sort order.
- Active status.

Initial entries:

- Mitsubishi
- Hitachi
- Lovejoy
- Goodyear
- Pulton
- SKF
- THB
- Toyox

### Industry Card

Fields:

- Name.
- Image/icon.
- Short description.
- Link.
- Sort order.

Initial examples:

- Manufacturing.
- Construction.
- Agriculture.
- Additional sectors to be confirmed by client.

### Testimonial

Fields:

- Quote.
- Customer name.
- Company/role.
- Optional image/logo.
- Sort order.

### Feature Card

Fields:

- Icon.
- Heading.
- Body.
- Sort order.

### Inline Ad / Promo Card

Fields:

- Title.
- Body.
- Image.
- CTA label.
- CTA URL.
- Placement rules.

## Quote Request Data

Quote request fields:

- Product name / SKU.
- Quantity needed.
- Preferred specs.
- Company name.
- Contact name.
- Email.
- Phone.
- Delivery address.
- Additional notes.
- Source page/product URL.
- Submission timestamp.

Recommended routing options:

1. Shopify-native contact/form submission for V1.
2. Shopify Forms or quote-request app if workflow tracking is needed.
3. Custom app or webhook integration for CRM/ERP routing if required later.

## API / Integration Notes

### Storefront Interactions

| Need | Recommended Approach |
| --- | --- |
| Search | Shopify search route or predictive search |
| Product filters | Shopify Search & Discovery facets |
| Sort and pagination | Shopify collection query parameters |
| Dynamic filtered sections | Shopify Section Rendering API |
| Wishlist | Customer-account app, local storage V1, or wishlist app |
| Comparison | Client-side JS using rendered product metafield data |
| Quote prefill | URL parameters from PDP to quote page, e.g. `?product=...&sku=...` |
| Blog preview | Shopify blogs/articles |

### Quote Submission Payload

If a custom app/webhook is used later, use this baseline payload:

```json
{
  "product_name": "Hydraulic Hose",
  "sku": "GYH-HOSE-001",
  "quantity": "50",
  "preferred_specs": "Size, material, pressure rating",
  "company_name": "Example Manufacturing Corp",
  "contact_name": "Buyer Name",
  "email": "buyer@example.com",
  "phone": "+63...",
  "delivery_address": "Metro Manila address",
  "notes": "Additional requirements",
  "source_url": "https://store.example/products/hydraulic-hose",
  "submitted_at": "ISO-8601 timestamp"
}
```

## Key Queries / Retrieval Patterns

- Collection products filtered by Shopify facets for category pages.
- Product metafields rendered on PDP and comparison modal.
- Blog articles retrieved from the configured Industrial Knowledge Hub blog.
- Brand/testimonial/industry metaobjects rendered in sorted order.
- Product catalogue file reference pulled from product first, then collection fallback.
