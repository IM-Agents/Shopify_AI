# Guan Yiac Hardware — B2B/B2C Industrial E-Commerce Documentation

## Project Overview

This documentation defines the build plan for the **Guan Yiac Hardware** industrial e-commerce storefront. Guan Yiac Hardware is a Philippine industrial hardware supplier established in **1943**, serving B2B and B2C buyers with a catalogue of **20,000+ SKUs** across conveyor components, industrial hoses, power transmission parts, and other industrial hardware.

The storefront must support quote-first procurement, searchable product discovery, brand trust signals, comparison tools, catalogue downloads, and persistent regional shipping messaging for Metro Manila buyers.

## Primary Goals

- Make 20,000+ products discoverable through category navigation, search, filters, and collection pages.
- Prioritize **Request Quote** conversion over direct add-to-cart purchasing.
- Reinforce trust using brand partners, “Established 1943”, customer testimonials, and industry expertise.
- Support repeat buyer workflows with wishlist, account access, product comparison, and catalogue downloads.
- Keep the free-shipping threshold visible on every page: **Free Shipping on orders ₱5,000+ in Metro Manila**.

## Technology / Stack

Recommended implementation stack for this repository:

- **Shopify Online Store 2.0** storefront architecture
- **Liquid** templates, sections, snippets, and JSON templates
- **Shopify Theme Editor** settings and section/block schema
- **Shopify metafields/metaobjects** for structured content, brands, industries, testimonials, blog cards, product specs, and quote metadata
- **Shopify product/collection data** for catalogue, categories, variants, media, SKUs, and filters
- **Shopify Search & Discovery** for product filters/facets where possible
- **JavaScript** for progressive enhancement: mega menu, comparison modal, sticky bars, horizontal scrollers, and form wizard behavior
- **CSS Grid/Flexbox + responsive CSS tokens** for mobile, tablet, and desktop layouts
- Optional: Shopify Forms, customer accounts, or a quote-management app/integration for B2B RFQ workflow

## Documentation Index

- [Project Brief](./project-brief.md)
- [Functional Requirements](./functional-requirements.md)
- [Implementation Plan](./implementation-plan.md)
- [Theme Architecture](./theme-architecture.md)
- [Data Model, Metafields, and APIs](./data-model-and-api.md)
- [Backlog and Acceptance Criteria](./backlog.md)
- [RAID Log](./raid-log.md)
- [QA and Handover Plan](./qa-handover.md)

## Delivery Definition

The build is complete when all required pages match the supplied Figma direction, work responsively across mobile/tablet/desktop, render catalogue data dynamically, support quote-first conversion, and allow non-developers to update key content through Shopify Admin, Theme Editor, metafields, metaobjects, products, collections, and blog content.
