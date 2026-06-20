---
description: Create a new Shopify custom page or alternate template and link it in Admin. Use when building about pages, landing pages, FAQ pages, or any alternate product/collection/article template.
---

# /shopify-page-template

$ARGUMENTS

---

## Task

Read and follow the full skill at `.claude/skills/shopify-page-template/SKILL.md`.

### Steps

1. **Search latest Shopify docs first**
   Run: `node .claude/skills/shopify-page-template/scripts/search_docs.mjs "<feature-name>"`
   Search for: `JSON template sections order`, `alternate template`, `page template`, `section schema presets`

2. **Apply the skill patterns**
   Follow every rule in `.claude/skills/shopify-page-template/SKILL.md` — especially:
   - Section file at `sections/custom-[name].liquid` with `{% schema %}`
   - Template JSON at `templates/[type].[name].json`
   - `"type"` values must match section filenames exactly (no `.liquid` suffix)
   - `"order"` array must list all keys in `"sections"` object
   - No Liquid inside JSON template files

3. **Validate before returning**
   Run: `node .claude/skills/shopify-page-template/scripts/validate.mjs --filename <name.liquid> --filetype sections --code '...' --model YOUR_MODEL --client-name cursor --client-version 1.0 --artifact-id <uuid> --revision 1`

4. **Fix and re-validate if needed** (max 3 retries)

5. **Return code only after validation passes**
   Always include the Admin linking steps so the merchant can assign the template.

---

## Usage Examples

```
/shopify-page-template Create an About Us page with image and rich text
/shopify-page-template Build a FAQ page template with accordion blocks
/shopify-page-template Create a landing page template for a sale campaign
/shopify-page-template Make an alternate product template for bundle products
```
