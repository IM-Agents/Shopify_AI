# RAID Log

## Risks

| ID | Risk | Impact | Mitigation |
| --- | --- | --- | --- |
| R1 | 20,000+ SKUs may have inconsistent product specifications | Filters/comparison may be incomplete | Define required metafields and import validation rules before data load |
| R2 | Design is desktop-first and mobile screens may not be fully specified | Mobile UX gaps | Infer responsive behavior, document assumptions, and get design review |
| R3 | Quote workflow routing is not finalized | Leads may not reach sales reliably | Choose V1 routing method before build completion; test notifications/end-to-end submission |
| R4 | Brand logos/testimonials/articles may not be supplied in final form | Placeholder content risk | Track content dependencies and use editable placeholders only where approved |
| R5 | Comparison across heterogeneous industrial products may have mismatched specs | Modal could be confusing | Use category-specific comparison spec schemas and show `—` for unavailable specs |

## Assumptions

| ID | Assumption |
| --- | --- |
| A1 | Shopify is the target storefront platform for this repository. |
| A2 | The final build should remain quote-first; direct add-to-cart is not required by the provided design. |
| A3 | Hero V6 is the approved homepage hero variant. |
| A4 | Free shipping threshold is ₱5,000+ in Metro Manila and must remain visible globally. |
| A5 | Client will provide final catalogue data, product media, brand logos, blog content, testimonial quotes, and catalogue PDFs. |
| A6 | Wishlist can be implemented through an app, customer-account feature, or local-storage V1 depending on business preference. |

## Issues

| ID | Issue | Owner | Status |
| --- | --- | --- | --- |
| I1 | “Other” category subcategories are TBD | Client/content owner | Open |
| I2 | Request quote form fields were inferred from B2B context and need business validation | Client/sales owner | Open |
| I3 | Industries list includes examples only and needs final confirmation | Client/content owner | Open |
| I4 | Animation reference URLs are not included in the PRD text | Design owner | Open |

## Dependencies

| ID | Dependency | Needed For |
| --- | --- | --- |
| D1 | Figma file access with inspect/export permissions | Accurate UI implementation and assets |
| D2 | Product catalogue import file/feed | Catalogue, filters, PDP specs, comparison |
| D3 | Brand partner logo files | Brand marquee and trust sections |
| D4 | Catalogue PDF/files | Download Catalogue CTAs |
| D5 | Quote routing decision | Request quote page and PDP CTA completion |
| D6 | Shopify admin/theme access | Theme build, metafields, metaobjects, menus, products |

## Clarification Questions for Client / Team

These are not blockers for documentation, but should be resolved before final implementation:

1. Confirm final quote request fields and whether the sales team needs CRM/ERP routing.
2. Confirm whether any product categories should allow direct purchase or whether all are quote-first.
3. Confirm final industry verticals for the Industries We Serve section.
4. Confirm the “Other” category subcategories.
5. Confirm source and licensing for hero/truck/industrial imagery.
6. Confirm whether wishlist should require login or work for guest users.
7. Confirm pagination vs infinite scroll preference for large collection pages.
