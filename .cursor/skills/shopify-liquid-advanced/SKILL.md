---
name: shopify-liquid-advanced
description: >-
  Advanced Shopify Liquid patterns — performance, metafield access, forms,
  pagination, and theme editor compatibility. Use when writing complex Liquid
  logic, debugging render issues, or optimizing server-side templates.
---

# Advanced Shopify Liquid

## When to Use

- Complex conditional rendering or data shaping in sections
- Metafield/metaobject access patterns
- Form handling and cart line item properties
- Theme editor re-initialization concerns

## Liquid Syntax Essentials

```liquid
{% liquid
  assign show_badge = false
  if product.compare_at_price > product.price
    assign show_badge = true
  endif
  echo show_badge
%}
```

- No parentheses in conditions — nest `{% if %}` blocks
- No ternary — always `{% if %}`
- `contains` works on strings only, not array objects
- Prefer `!= blank` over `!= nil` or `!= ""`

## Render vs Include

```liquid
{% render 'custom-product-badge', product: product, badge_type: 'sale' %}
```

Snippets rendered with `{% render %}` have **isolated scope** — pass all variables explicitly.

## Metafields

```liquid
{% if product.metafields.custom.care_instructions != blank %}
  {{ product.metafields.custom.care_instructions.value }}
{% endif %}
```

- Access returns the **metafield object** — use `.value` for the actual data
- Metaobject reference: `product.metafields.custom.author.value.title`
- Use `| metafield_tag` only when default rendering is acceptable

## Metaobjects (Web Pages)

Template: `templates/metaobject/[type].json`

```liquid
{{ metaobject.title.value }}
{{ metaobject.field('bio').value }}
```

## Forms

```liquid
{% form 'product', product %}
  {{ form.errors | default_errors }}
  <input type="hidden" name="id" value="{{ product.selected_or_first_available_variant.id }}">
{% endform %}
```

Always pass the product object to `{% form 'product', product %}`.

## Images (Modern Filters)

```liquid
{{ image
  | image_url: width: 800
  | image_tag:
    loading: 'lazy',
    widths: '400, 800, 1200',
    sizes: '(min-width: 990px) 50vw, 100vw',
    alt: image.alt
}}
```

Never use deprecated `img_url` or `img_tag`.

## Performance in Liquid

- Paginate collections/products — default loop cap is 50
- Avoid `| concat` inside `{% for %}` loops (allocates new arrays)
- Minimize section count — prefer blocks over many sections
- Defer large arrays to JSON data islands + client-side filtering

## Colocated Assets

In sections/snippets/blocks only:

```liquid
{% stylesheet %}
  .custom-badge { /* static CSS only — no Liquid */ }
{% endstylesheet %}

{% javascript %}
  // Read dynamic values from data-* attributes
{% endjavascript %}
```

- `{% stylesheet %}` / `{% javascript %}` are deduplicated across renders
- `{% style %}` is per-instance inline — use only for CSS custom properties from settings

## Theme Editor Events (JS)

```javascript
document.addEventListener('shopify:section:load', (event) => {
  initComponent(event.target);
});
```

Events: `shopify:section:load`, `shopify:section:unload`, `shopify:section:select`,
`shopify:block:select`, `shopify:block:deselect`.

## Internationalization

- Storefront strings: `locales/en.default.json` → `{{ 'key' | t }}`
- Schema labels: `locales/en.default.schema.json` → `"label": "t:sections.custom_hero.name"`
- Never hardcode user-facing text in Liquid

## Snippet Documentation

```liquid
{% doc %}
  @param {product} product - The product object
  @param {string} [badge_type] - Optional badge variant
{% enddoc %}
```

## References

- `.cursor/rules/shopify-liquid.mdc`
- `.cursor/skills/shopify-metafields/SKILL.md`
