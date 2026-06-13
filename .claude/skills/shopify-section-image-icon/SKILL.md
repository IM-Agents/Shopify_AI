# Skill: Shopify Section — Image Picker & Icon Picker Patterns

**Trigger:** Use this skill whenever you are creating or editing a Shopify Liquid section or block that includes an image, banner background, card image, feature image, or an icon.

---

## Required Tool Calls (do not skip)

You have a `bash` tool. Every response must use it — in this order:

1. Call `bash` with `scripts/search_docs.mjs "<query>"` — search latest Shopify docs before writing any code
   - For image picker patterns, search: `"image_picker setting"`, `"image_url filter"`, `"placeholder_svg_tag"`
   - For icon patterns, search: `"image_picker icon"`, `"image_tag filter"`
2. Write the code using the search results combined with the patterns in this skill
3. Call `bash` with `scripts/validate.mjs --filename <name.liquid> --filetype <sections|blocks|snippets> --code '...' --model YOUR_MODEL_NAME --client-name YOUR_CLIENT_NAME --client-version YOUR_CLIENT_VERSION --artifact-id YOUR_ARTIFACT_ID --revision REVISION_NUMBER` — validate before returning
4. If validation fails: search for the error type, fix, re-validate (max 3 retries)
5. Return code only after validation passes

**You must run both `search_docs.mjs` and `validate.mjs` in every response. Do not return code without completing step 3.**

> **Note:** If `scripts/` dependencies are not installed, run `npm install` in this skill's directory first.

---

---

## Core Rules (Non-Negotiable)

### Rule 1 — Image Picker: Never Use a Fallback URL
When a section or block has an `image_picker` setting, the fallback for a missing/unset image **must always** be Shopify's built-in placeholder SVG via the `placeholder_svg_tag` filter.

- **NEVER** use a hardcoded fallback URL (`https://...`)
- **NEVER** use `| default: 'some-url'` as an image source
- **ALWAYS** use `{{ 'placeholder-name' | placeholder_svg_tag: 'your-css-class' }}` as the else branch

### Rule 2 — Icon: Always Use `image_picker`, Not a Dropdown
When a section or block needs an icon:

- **NEVER** use a `select` dropdown to choose an icon type/name
- **ALWAYS** use `"type": "image_picker"` so the merchant uploads their own icon
- The fallback for a missing/unset icon **must** be a Shopify skeleton SVG via `placeholder_svg_tag`
- Do **not** ship a pre-baked set of icon options in schema

---

## Shopify Placeholder SVG Names

Use these with the `placeholder_svg_tag` filter. Pick the one that best matches the context:

| Placeholder Name      | Best Used For                        |
|-----------------------|--------------------------------------|
| `image`               | Generic image / fallback             |
| `product-1` … `product-6` | Product cards, product features   |
| `collection-1` … `collection-6` | Collection grids, category cards |
| `lifestyle-1`, `lifestyle-2` | Hero banners, lifestyle imagery  |
| `hero-apparel-1` … `hero-apparel-3` | Hero/banner sections         |
| `blog-apparel-1` … `blog-apparel-3` | Blog/article cards           |

Filter syntax:
```liquid
{{ 'lifestyle-1' | placeholder_svg_tag: 'section__placeholder-image' }}
{{ 'image'       | placeholder_svg_tag: 'icon__placeholder' }}
{{ 'product-1'   | placeholder_svg_tag: 'card__placeholder-image' }}
```

---

## Pattern A — Image Picker in a Section/Block

### Schema (correct)
```json
{
  "type": "image_picker",
  "id": "image",
  "label": "t:settings.image.label"
}
```

### Liquid rendering (correct)
```liquid
<div class="section__media">
  {%- if section.settings.image != blank -%}
    {{- section.settings.image
        | image_url: width: 1500
        | image_tag:
            loading: 'lazy',
            class: 'section__image',
            alt: section.settings.image.alt | escape,
            sizes: '100vw'
    -}}
  {%- else -%}
    {{- 'lifestyle-1' | placeholder_svg_tag: 'section__image section__image--placeholder' -}}
  {%- endif -%}
</div>
```

### Block-level image (correct)
```liquid
<div class="card__media">
  {%- if block.settings.image != blank -%}
    {{- block.settings.image
        | image_url: width: 800
        | image_tag:
            loading: 'lazy',
            class: 'card__image',
            alt: block.settings.image.alt | escape
    -}}
  {%- else -%}
    {{- 'product-1' | placeholder_svg_tag: 'card__image card__image--placeholder' -}}
  {%- endif -%}
</div>
```

### Hero / LCP image (eager load, high priority)
```liquid
<div class="hero__media">
  {%- if section.settings.image != blank -%}
    {{- section.settings.image
        | image_url: width: 2000
        | image_tag:
            loading: 'eager',
            fetchpriority: 'high',
            class: 'hero__image',
            alt: section.settings.image.alt | escape,
            sizes: '100vw'
    -}}
  {%- else -%}
    {{- 'hero-apparel-1' | placeholder_svg_tag: 'hero__image hero__image--placeholder' -}}
  {%- endif -%}
</div>
```

### Desktop + Mobile image (responsive `<picture>`)
```liquid
<div class="banner__media">
  {%- if section.settings.image != blank -%}
    {%- if section.settings.mobile_image != blank -%}
      <picture>
        <source
          media="(max-width: 749px)"
          srcset="{{- section.settings.mobile_image | image_url: width: 800 -}}"
        >
        {{- section.settings.image
            | image_url: width: 2000
            | image_tag:
                loading: 'eager',
                fetchpriority: 'high',
                class: 'banner__image',
                alt: section.settings.image.alt | escape,
                sizes: '100vw'
        -}}
      </picture>
    {%- else -%}
      {{- section.settings.image
          | image_url: width: 2000
          | image_tag:
              loading: 'eager',
              fetchpriority: 'high',
              class: 'banner__image',
              alt: section.settings.image.alt | escape,
              sizes: '100vw'
      -}}
    {%- endif -%}
  {%- else -%}
    {{- 'lifestyle-1' | placeholder_svg_tag: 'banner__image banner__image--placeholder' -}}
  {%- endif -%}
</div>
```

---

## Pattern B — Icon Picker in a Section/Block

### Schema (correct — image_picker, NOT select)
```json
{
  "type": "image_picker",
  "id": "icon",
  "label": "t:settings.icon.label"
}
```

**NEVER do this:**
```json
{
  "type": "select",
  "id": "icon",
  "label": "Icon",
  "options": [
    { "value": "star", "label": "Star" },
    { "value": "heart", "label": "Heart" }
  ]
}
```

### Liquid rendering for icons (correct)
```liquid
<div class="feature__icon">
  {%- if block.settings.icon != blank -%}
    {{- block.settings.icon
        | image_url: width: 80
        | image_tag:
            loading: 'lazy',
            class: 'feature__icon-image',
            alt: block.settings.icon.alt | escape,
            width: 40,
            height: 40
    -}}
  {%- else -%}
    {{- 'image' | placeholder_svg_tag: 'feature__icon-placeholder' -}}
  {%- endif -%}
</div>
```

### Icon with accessible wrapper
```liquid
<span class="icon-wrapper" aria-hidden="{% if block.settings.icon == blank %}true{% else %}false{% endif %}">
  {%- if block.settings.icon != blank -%}
    {{- block.settings.icon
        | image_url: width: 64
        | image_tag:
            class: 'icon-img',
            alt: block.settings.icon.alt | escape,
            loading: 'lazy',
            width: 32,
            height: 32
    -}}
  {%- else -%}
    {{- 'image' | placeholder_svg_tag: 'icon-img icon-img--skeleton' -}}
  {%- endif -%}
</span>
```

---

## Complete Section Example — Feature Cards with Image + Icon

```liquid
<section class="feature-cards">
  <div class="feature-cards__inner page-width">
    {%- for block in section.blocks -%}
      <div class="feature-card" {{ block.shopify_attributes }}>

        {{/* Icon */}}
        <div class="feature-card__icon">
          {%- if block.settings.icon != blank -%}
            {{- block.settings.icon
                | image_url: width: 80
                | image_tag:
                    class: 'feature-card__icon-img',
                    alt: block.settings.icon.alt | escape,
                    loading: 'lazy',
                    width: 40,
                    height: 40
            -}}
          {%- else -%}
            {{- 'image' | placeholder_svg_tag: 'feature-card__icon-img feature-card__icon-img--placeholder' -}}
          {%- endif -%}
        </div>

        {{/* Card image */}}
        <div class="feature-card__media">
          {%- if block.settings.image != blank -%}
            {{- block.settings.image
                | image_url: width: 600
                | image_tag:
                    class: 'feature-card__image',
                    alt: block.settings.image.alt | escape,
                    loading: 'lazy',
                    sizes: '(min-width: 990px) 33vw, 100vw'
            -}}
          {%- else -%}
            {{- 'product-1' | placeholder_svg_tag: 'feature-card__image feature-card__image--placeholder' -}}
          {%- endif -%}
        </div>

        <div class="feature-card__content">
          {%- if block.settings.heading != blank -%}
            <h3 class="feature-card__heading">{{- block.settings.heading | escape -}}</h3>
          {%- endif -%}
          {%- if block.settings.text != blank -%}
            <p class="feature-card__text">{{- block.settings.text | escape -}}</p>
          {%- endif -%}
        </div>

      </div>
    {%- endfor -%}
  </div>
</section>

{% schema %}
{
  "name": "t:sections.feature_cards.name",
  "max_blocks": 6,
  "blocks": [
    {
      "type": "card",
      "name": "t:sections.feature_cards.blocks.card.name",
      "settings": [
        {
          "type": "header",
          "content": "t:settings.headers.icon"
        },
        {
          "type": "image_picker",
          "id": "icon",
          "label": "t:settings.icon.label"
        },
        {
          "type": "header",
          "content": "t:settings.headers.image"
        },
        {
          "type": "image_picker",
          "id": "image",
          "label": "t:settings.image.label"
        },
        {
          "type": "header",
          "content": "t:settings.headers.content"
        },
        {
          "type": "text",
          "id": "heading",
          "label": "t:settings.heading.label",
          "default": "Feature heading"
        },
        {
          "type": "textarea",
          "id": "text",
          "label": "t:settings.text.label",
          "default": "Describe this feature in a sentence or two."
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "t:sections.feature_cards.presets.default",
      "blocks": [
        { "type": "card" },
        { "type": "card" },
        { "type": "card" }
      ]
    }
  ]
}
{% endschema %}
```

---

## CSS Skeleton Styling for Placeholders

Always add skeleton styling so placeholder SVGs look intentional, not broken:

```css
.section__image--placeholder,
.card__image--placeholder,
.hero__image--placeholder,
.banner__image--placeholder,
.feature-card__image--placeholder,
.feature-card__icon-img--placeholder,
.icon-img--skeleton {
  width: 100%;
  height: 100%;
  background-color: var(--color-background-secondary, #f4f4f4);
}

.feature-card__icon-img--placeholder,
.icon-img--skeleton {
  width: 40px;
  height: 40px;
  border-radius: 4px;
}
```

---

## Quick Reference Checklist

When writing any section or block:

- [ ] Image settings use `"type": "image_picker"` — not `"type": "image_url"` or `"type": "text"`
- [ ] Every `image_picker` render has an `{%- else -%}` branch using `placeholder_svg_tag`
- [ ] No fallback image URLs anywhere (`https://...`, `cdn.shopify.com/...`, `asset_url` for images)
- [ ] Icon settings use `"type": "image_picker"` — never `"type": "select"` with icon names
- [ ] Every icon render has an `{%- else -%}` branch using `placeholder_svg_tag: 'image'`
- [ ] Hero/LCP images use `loading: 'eager'` and `fetchpriority: 'high'`
- [ ] All other images use `loading: 'lazy'`
- [ ] `alt` is always passed explicitly via `block.settings.image.alt | escape` or `section.settings.image.alt | escape`
- [ ] Placeholder SVGs get CSS class names that include a `--placeholder` or `--skeleton` modifier for targeted styling
