# Skill: Shopify Custom Page Template — Create & Link

**Trigger:** Use this skill whenever the user asks to:
- Create a new custom page (about us, FAQ, landing page, etc.)
- Create an alternate template for a product, collection, article, or page
- Wire up a new section to a specific page type
- Link/assign a template to a Shopify page in Admin

---

## Required Tool Calls (do not skip)

You have a `bash` tool. Every response must use it — in this order:

1. Call `bash` with `scripts/search_docs.mjs "<query>"` — search latest Shopify docs before writing any code
   - For template structure, search: `"JSON template sections order"`, `"alternate template"`, `"page template"`
   - For section files, search: `"section schema presets"`, `"section settings"`
2. Write the code using the search results combined with the patterns in this skill
3. Call `bash` with `scripts/validate.mjs --filename <name.liquid> --filetype <sections|templates> --code '...' --model YOUR_MODEL_NAME --client-name YOUR_CLIENT_NAME --client-version YOUR_CLIENT_VERSION --artifact-id YOUR_ARTIFACT_ID --revision REVISION_NUMBER` — validate each generated file before returning
4. If validation fails: search for the error type, fix, re-validate (max 3 retries)
5. Return code only after validation passes

**You must run both `search_docs.mjs` and `validate.mjs` in every response. Do not return code without completing step 3.**

> **Note:** If `scripts/` dependencies are not installed, run `npm install` in this skill's directory first.

---

## What This Skill Covers (Gap from Shopify Toolkit)

The Shopify AI Toolkit (`shopify-liquid` skill) focuses on generating **sections, blocks, and snippets** and explicitly says "users may create templates using the theme editor." It does **not** explain:
- The JSON structure of a template file
- How to create alternate templates
- How to link a template to a page in Shopify Admin
- The full end-to-end workflow

This skill fills that gap.

---

## Core Concepts

### Template Types Supported
| Template File | Page Type |
|---|---|
| `templates/page.json` | Default page (all pages not assigned a custom template) |
| `templates/page.[name].json` | Alternate page template |
| `templates/product.json` | Default product page |
| `templates/product.[name].json` | Alternate product template |
| `templates/collection.json` | Default collection page |
| `templates/collection.[name].json` | Alternate collection template |
| `templates/article.json` | Default blog article |
| `templates/article.[name].json` | Alternate article template |
| `templates/blog.json` | Default blog page |
| `templates/index.json` | Home page |
| `templates/cart.json` | Cart page |
| `templates/404.json` | 404 page |
| `templates/search.json` | Search results page |

### JSON Template Structure
A JSON template is a **data manifest only** — no Liquid, no logic. It declares which sections appear on the page and in what order.

```json
{
  "sections": {
    "section-id-1": {
      "type": "custom-section-name",
      "settings": {}
    },
    "section-id-2": {
      "type": "another-section",
      "settings": {}
    }
  },
  "order": [
    "section-id-1",
    "section-id-2"
  ]
}
```

Key rules for the JSON template:
- `"sections"` — object where each key is a **unique ID** (any string, typically descriptive)
- `"order"` — array of those same IDs in render order
- `"type"` — must exactly match the section filename without `.liquid` extension
- `"settings"` — default setting values (can be empty `{}`)
- **No Liquid** is allowed inside a JSON template
- **No layout key needed** unless using a non-default layout (default is `theme.liquid`)

### Optional: Custom Layout
To use a different layout file for a template:
```json
{
  "layout": "custom-layout",
  "sections": { ... },
  "order": [ ... ]
}
```
`"layout": false` renders the page with no layout wrapper at all.

---

## Full Workflow — New Custom Page

### Step 1: Create the Section File
Create `sections/custom-[page-name].liquid` with a `{% schema %}` block.

Example — `sections/custom-about.liquid`:
```liquid
<div class="custom-about page-width">
  {%- if section.settings.heading != blank -%}
    <h1 class="custom-about__heading">{{ section.settings.heading | escape }}</h1>
  {%- endif -%}

  {%- if section.settings.image != blank -%}
    {{- section.settings.image
        | image_url: width: 1200
        | image_tag:
            class: 'custom-about__image',
            loading: 'lazy',
            alt: section.settings.image.alt | escape
    -}}
  {%- else -%}
    {{- 'lifestyle-1' | placeholder_svg_tag: 'custom-about__image custom-about__image--placeholder' -}}
  {%- endif -%}

  {%- if section.settings.content != blank -%}
    <div class="custom-about__content rte">{{ section.settings.content }}</div>
  {%- endif -%}
</div>

{% schema %}
{
  "name": "t:sections.custom_about.name",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "t:settings.heading.label",
      "default": "About Us"
    },
    {
      "type": "image_picker",
      "id": "image",
      "label": "t:settings.image.label"
    },
    {
      "type": "richtext",
      "id": "content",
      "label": "t:settings.content.label",
      "default": "<p>Tell your brand story here.</p>"
    }
  ],
  "presets": [
    {
      "name": "t:sections.custom_about.name"
    }
  ]
}
{% endschema %}
```

### Step 2: Create the Template JSON File
Create `templates/page.about.json`:

```json
{
  "sections": {
    "main": {
      "type": "custom-about",
      "settings": {}
    }
  },
  "order": [
    "main"
  ]
}
```

**Naming convention for alternate page templates:**
- `templates/page.about.json` → template name in Admin = **"page.about"**
- `templates/page.faq.json` → template name = **"page.faq"**
- `templates/page.landing-sale.json` → template name = **"page.landing-sale"**

### Step 3: Push to Shopify
```bash
shopify theme push
```
Or use the Shopify CLI watch mode if already running:
```bash
shopify theme dev
```
The new template is available in Admin immediately after the file is uploaded.

### Step 4: Link the Template to a Page in Shopify Admin
1. Go to **Shopify Admin → Online Store → Pages**
2. Open the page you want to use this template for (or create a new one)
3. In the right sidebar, find **"Theme template"**
4. Select your new template from the dropdown (e.g., `page.about`)
5. Click **Save**

The page now renders using your custom template.

---

## Multiple Sections in One Template

A page can include multiple sections. All sections must exist as `.liquid` files:

```json
{
  "sections": {
    "hero": {
      "type": "custom-hero-banner",
      "settings": {
        "height": 600
      }
    },
    "features": {
      "type": "custom-features-grid",
      "settings": {}
    },
    "cta": {
      "type": "custom-cta-banner",
      "settings": {}
    }
  },
  "order": [
    "hero",
    "features",
    "cta"
  ]
}
```

Limits: up to **25 sections** per JSON template. Exceeding this silently drops sections.

---

## Alternate Product Template

`templates/product.custom.json` — assign to specific products:
```json
{
  "sections": {
    "main": {
      "type": "main-product",
      "settings": {}
    },
    "custom-block": {
      "type": "custom-product-story",
      "settings": {}
    }
  },
  "order": ["main", "custom-block"]
}
```

Assign in Admin: **Products → [product] → Theme template → "product.custom"**

---

## Alternate Collection Template

`templates/collection.lookbook.json`:
```json
{
  "sections": {
    "main": {
      "type": "main-collection-banner",
      "settings": {}
    },
    "products": {
      "type": "main-collection-product-grid",
      "settings": {}
    }
  },
  "order": ["main", "products"]
}
```

Assign in Admin: **Products → Collections → [collection] → Theme template → "collection.lookbook"**

---

## Home Page Template

The home page always uses `templates/index.json`. It cannot be an alternate — there is only one home page template. Add sections directly:

```json
{
  "sections": {
    "hero": {
      "type": "custom-hero-banner",
      "settings": {}
    },
    "featured-collection": {
      "type": "featured-collection",
      "settings": {}
    }
  },
  "order": ["hero", "featured-collection"]
}
```

---

## Quick Reference Checklist

When creating a new page template:

- [ ] Section file created at `sections/custom-[name].liquid` with `{% schema %}`
- [ ] Template JSON at `templates/[type].[name].json` (e.g., `page.about.json`)
- [ ] Template `"type"` values match section filenames exactly (without `.liquid`)
- [ ] `"order"` array contains all keys from `"sections"` object
- [ ] No Liquid code inside the JSON template file
- [ ] Section count ≤ 25
- [ ] Theme pushed via `shopify theme push` or `shopify theme dev`
- [ ] Template assigned to the page in **Shopify Admin → [Page/Product/Collection] → Theme template**

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| `"type": "custom-about.liquid"` | Remove `.liquid` → `"type": "custom-about"` |
| Section in `"order"` but not in `"sections"` | Add it to `"sections"` object |
| Liquid tags inside the JSON template | Move all logic into the section file |
| Template not showing in Admin dropdown | Run `shopify theme push` — file must be uploaded first |
| Page shows default template after assigning | Check the template was saved in Admin and the section type name matches |
