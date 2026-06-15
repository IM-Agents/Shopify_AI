# Content Mapping Matrix

## Purpose

This matrix maps every Figma section/component/node to a concrete dynamic Shopify implementation source. It must be completed against the live Figma node tree before each section is built and signed off section-by-section.

## Mapping Rules

- Do not invent content values.
- Do not hardcode visible strings.
- Do not hardcode asset paths.
- Preserve supplied hyperlinks exactly.
- Use Shopify objects for products, collections, menus, filtering, and forms.
- Use Theme Editor settings, blocks, metafields, metaobjects, and locale keys for editable UI content.
- Ensure each mapped section is responsive across mobile, tablet, and desktop.

## Initial Mapping Framework

| Figma element / component | Shopify implementation | Data source | Dynamic controls | Acceptance criteria |
|---|---|---|---|---|
| Header / navigation | Header section | Shopify menus/linklists + settings | Menu selection, logo image picker, sticky toggle, announcement visibility, color scheme | All nav items editable through Shopify menus; logo/link/settings editable in Theme Editor. |
| Logo | Header setting | Content > Files via image picker | Image, alt text, logo link | No hardcoded logo asset. |
| Hero section | Dynamic hero section | Section settings + image pickers | Heading, subtext, rich text, CTA label/link, desktop image, mobile image, alignment, overlay, color scheme | All text/images/links editable; responsive crops match Figma. |
| Promo / USP row | Section with repeatable blocks or metaobject list | Blocks or metaobjects | Icon image picker, label, supporting text, link, visibility | Items reorderable/editable; icons sourced dynamically. |
| Featured collection grid | Collection list/grid section | Shopify collection objects | Collection picker/list, product count, layout, card style | Collections chosen in Theme Editor; products render from live store data. |
| Product card | Reusable card snippet | Shopify product object + metafields | Badge rules, swatch source, image ratio, quick action toggle | Title/price/media/availability dynamic; badges and swatches data-driven. |
| Collection page | OS 2.0 collection template | `collection` object | Sections, sorting, pagination/infinite setting, filter placement | Product grid and collection content render from live collection data. |
| Filters sidebar/drawer | Dynamic facets section/snippet | `collection.filters` / `search.filters` | Facet display mode, clear all text via locale/settings, mobile drawer behavior | Facets are generated from Search & Discovery, not static markup. |
| Tabs/accordions | Blocks or metaobject list | Blocks/metaobjects/product metafields | Item heading, rich text/body, default open state, icon | Repeatable and editable without code. |
| Testimonials / reviews | Blocks, review app block, or metaobjects | Metaobjects/app data/settings | Quote, author, rating, avatar image picker, ordering | No static testimonial content; source chosen during audit. |
| Banner / CTA strip | Dynamic section | Section settings | Text, rich text, CTA label/link, background image/color, visibility | All content and link editable. |
| Newsletter | Section with Shopify customer form | Settings + locale keys | Heading, copy, placeholder, button label, success/error copy | Form labels/messages dynamic and accessible. |
| Footer | Footer section | Shopify menus/linklists + settings | Columns, menus, logo, social icons, legal copy, payment icon toggles | Menus and legal/social content editable. |
| Social icons | Footer/header block list or settings | Content > Files via image picker + URL settings | Icon, label, URL, visibility | Icon and destination editable; no hardcoded asset path. |
| Collection/product badges | Product metafields, tags, or configured rules | Product data/metafields | Badge label, color, conditions | Badges render from store data or configured logic only. |
| Color system | Global settings | `settings_schema.json` | Color tokens and schemes | CSS variables populated from Theme Editor settings. |
| Typography | Global settings | Shopify font picker / file reference for custom fonts | Font family, base size, scale, line-height, letter spacing | Figma type scale matched and editable. |
| Buttons | Global settings + section options | Theme settings + section settings | Label, URL, style variant, state tokens | Button content and destinations editable; style variants match Figma. |
| Images and decorative media | Section/block image picker or file-reference metafield | Content > Files | Desktop/mobile images, alt text, crop/layout | Images use responsive Shopify image filters and do not cause layout shift. |

## Figma Node Completion Checklist

For each Figma node, record:

- Figma page/frame name.
- Node/component name.
- Desktop/tablet/mobile state.
- Shopify file/section/snippet/template target.
- Dynamic source.
- Theme Editor controls.
- Required metafields/metaobjects.
- Asset filename/reference.
- Link destination.
- Accessibility note.
- QA status.
- Signoff owner/date.

## Signoff Requirement

A section should not enter development until its mapping row has enough detail for a developer to implement it without inventing content or making hardcoded assumptions.
