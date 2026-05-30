---
name: shopify-metafields
description: >-
  Shopify metafields and metaobjects — definitions, Liquid access, theme settings
  integration, and Dawn-safe patterns. Use when adding custom product data,
  building CMS-like content, or connecting Admin fields to theme templates.
---

# Shopify Metafields & Metaobjects

## When to Use

- Product/collection/page custom fields beyond native attributes
- Structured content ( FAQs, specs, size guides, author profiles)
- Merchant-managed content blocks without hardcoding
- Connecting theme section settings to store data

## Definition Sources

| Method | Location | Best For |
|--------|----------|----------|
| Theme metafield defs | `.shopify/metafields.json` | Version-controlled, team-shared |
| Admin UI | Settings → Custom data | Quick merchant setup |
| GraphQL Admin API | Apps / scripts | Bulk or automated setup |

This project keeps definitions in `.shopify/metafields.json`.

## Common Metafield Types

| Type | Liquid Access | Notes |
|------|---------------|-------|
| `single_line_text_field` | `.value` | Simple strings |
| `rich_text_field` | `.value` or `\| metafield_tag` | HTML content |
| `file_reference` | `.value \| image_url` | Images, PDFs |
| `list.product_reference` | Loop `.value` | Related products |
| `metaobject_reference` | `.value.field('key').value` | Structured refs |
| `json` | `.value` | Parsed object |
| `color` | `.value` | Hex color string |
| `url` | `.value` | URL string |

## Liquid Patterns

### Single value
```liquid
{% if product.metafields.custom.subtitle != blank %}
  <p class="product-subtitle">{{ product.metafields.custom.subtitle.value }}</p>
{% endif %}
```

### Metaobject reference
```liquid
{% assign author = product.metafields.custom.author.value %}
{% if author != blank %}
  <span>{{ author.name.value }}</span>
  {{ author.photo.value | image_url: width: 200 | image_tag: alt: author.name.value }}
{% endif %}
```

### List metafield
```liquid
{% for item in product.metafields.custom.highlights.value %}
  <li>{{ item }}</li>
{% endfor %}
```

## Metaobjects as CMS

1. Define metaobject type in Admin (or via API)
2. Enable **Storefront access** and optionally **Web pages**
3. Create template: `templates/metaobject/[type-handle].json`
4. Reference entries via metafield on products/collections/pages

## Section Settings vs Metafields

| Use section settings when | Use metafields when |
|---------------------------|---------------------|
| Layout/styling per section instance | Data belongs to a resource (product, page) |
| Merchant configures in Theme Editor | Data managed in Admin resource screens |
| Same section, different copy per page | Data follows the product/collection everywhere |

## Theme Editor Integration

Metafield values update in Admin — theme sections should read them at render time.
No special JS needed unless building dynamic Admin UI.

For preview in Theme Editor, ensure sections handle blank metafields gracefully:

```liquid
{% unless product.metafields.custom.size_chart != blank %}
  {% comment %} Hide size chart tab when empty {% endcomment %}
{% endunless %}
```

## Performance

- Check `!= blank` before rendering — avoid empty wrapper DOM
- Don't loop large metafield lists without pagination
- Prefer metaobject references over duplicating JSON in multiple metafields

## Anti-Patterns

- Hardcoding metafield namespace/key without documenting in `.shopify/metafields.json`
- Using REST Admin `.fields.key` syntax in Liquid (use `.field('key').value`)
- Casting metafield types manually — define types in Admin
- Storing large HTML blobs in section settings instead of page metafields

## References

- `.shopify/metafields.json`
- `.cursor/rules/shopify-liquid.mdc` (Metafields section)
