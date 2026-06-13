---
description: Shopify image picker and icon picker patterns. Use when creating or editing any section/block that has an image, banner, card image, or icon. Enforces placeholder_svg_tag fallback and image_picker for icons.
---

# /shopify-image-icon

$ARGUMENTS

---

## Task

Read and follow the full skill at `.claude/skills/shopify-section-image-icon/SKILL.md`.

### Steps

1. **Search latest Shopify docs first**
   Run: `node .claude/skills/shopify-section-image-icon/scripts/search_docs.mjs "<feature-name>"`
   Search for: `image_picker setting`, `image_url filter`, `placeholder_svg_tag`, `image_tag filter`

2. **Apply the skill patterns**
   Follow every rule in `.claude/skills/shopify-section-image-icon/SKILL.md` — especially:
   - All `image_picker` settings must have a `placeholder_svg_tag` fallback (never a URL)
   - Icons always use `image_picker`, never a `select` dropdown
   - Missing icons fall back to `{{ 'image' | placeholder_svg_tag: 'class' }}`

3. **Validate before returning**
   Run: `node .claude/skills/shopify-section-image-icon/scripts/validate.mjs --filename <name.liquid> --filetype sections --code '...' --model YOUR_MODEL --client-name cursor --client-version 1.0 --artifact-id <uuid> --revision 1`

4. **Fix and re-validate if needed** (max 3 retries)

5. **Return code only after validation passes**

---

## Usage Examples

```
/shopify-image-icon Create a testimonials section with image picker for each card
/shopify-image-icon Add an icon block to the features section
/shopify-image-icon Build a hero banner with desktop and mobile image pickers
```
