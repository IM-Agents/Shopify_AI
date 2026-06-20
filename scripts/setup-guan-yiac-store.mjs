/**
 * Guan Yiac store setup — creates menus, pages, and collections via Admin GraphQL.
 *
 * Prerequisites:
 *   1. Shopify CLI 4.x with `shopify store auth` OR a custom app Admin API token
 *   2. Scopes: write_content, write_online_store_navigation, write_products
 *
 * Usage (CLI 4+):
 *   shopify store auth --store bhautik-mehta.myshopify.com --scopes write_content,write_online_store_navigation,write_products
 *   node scripts/setup-guan-yiac-store.mjs
 *
 * Or set SHOPIFY_ADMIN_TOKEN and SHOPIFY_STORE_DOMAIN env vars.
 */

const STORE = process.env.SHOPIFY_STORE_DOMAIN || 'bhautik-mehta.myshopify.com';
const TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;
const API_VERSION = '2025-04';

async function graphql(query, variables = {}) {
  if (!TOKEN) {
    console.error('Set SHOPIFY_ADMIN_TOKEN env var or authenticate via Shopify CLI.');
    process.exit(1);
  }
  const res = await fetch(`https://${STORE}/admin/api/${API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors, null, 2));
  return json.data;
}

const PAGES = [
  { title: 'About Us', handle: 'about-us', templateSuffix: 'about' },
  { title: 'Contact Us', handle: 'contact-us', templateSuffix: 'contact' },
  { title: 'Request a Quote', handle: 'request-quote', templateSuffix: 'request-quote' },
  { title: 'Privacy Policy', handle: 'privacy-policy' },
  { title: 'Terms of Service', handle: 'terms' },
  { title: 'Sitemap', handle: 'sitemap' },
];

const COLLECTIONS = [
  { title: 'Conveyor Components', handle: 'conveyor-components' },
  { title: 'Industrial Hose', handle: 'industrial-hose' },
  { title: 'Power Transmission', handle: 'power-transmission' },
  { title: 'Other', handle: 'other' },
];

const HOSE_SUBCATEGORIES = [
  'Air & Multipurpose',
  'Hydraulic Hose',
  'Chemical Transfer',
  'Food Liquid Transfer',
  'Steam',
  'Petroleum Transfer',
];

async function createPage(page) {
  const mutation = `
    mutation pageCreate($page: PageCreateInput!) {
      pageCreate(page: $page) {
        page { id handle }
        userErrors { field message }
      }
    }`;
  const input = {
    title: page.title,
    handle: page.handle,
    body: `<p>${page.title} — content managed in Theme Editor.</p>`,
    isPublished: true,
    ...(page.templateSuffix ? { templateSuffix: page.templateSuffix } : {}),
  };
  const data = await graphql(mutation, { page: input });
  const errs = data.pageCreate.userErrors;
  if (errs?.length) console.warn(`Page ${page.handle}:`, errs);
  else console.log(`✓ Page: ${page.handle}`);
}

async function createCollection(coll) {
  const mutation = `
    mutation collectionCreate($input: CollectionInput!) {
      collectionCreate(input: $input) {
        collection { id handle }
        userErrors { field message }
      }
    }`;
  const data = await graphql(mutation, {
    input: { title: coll.title, handle: coll.handle },
  });
  const errs = data.collectionCreate.userErrors;
  if (errs?.length) console.warn(`Collection ${coll.handle}:`, errs);
  else console.log(`✓ Collection: ${coll.handle}`);
}

async function createMenu(handle, title, items) {
  const mutation = `
    mutation menuCreate($title: String!, $handle: String!, $items: [MenuItemCreateInput!]!) {
      menuCreate(title: $title, handle: $handle, items: $items) {
        menu { id handle }
        userErrors { field message }
      }
    }`;
  const data = await graphql(mutation, { title, handle, items });
  const errs = data.menuCreate?.userErrors;
  if (errs?.length) console.warn(`Menu ${handle}:`, errs);
  else console.log(`✓ Menu: ${handle}`);
}

async function main() {
  console.log(`Setting up Guan Yiac store content on ${STORE}...\n`);

  for (const page of PAGES) await createPage(page);
  for (const coll of COLLECTIONS) await createCollection(coll);

  await createMenu('main-menu', 'Main menu', [
    { title: 'Home', type: 'HTTP', url: '/' },
    {
      title: 'Our Products',
      type: 'HTTP',
      url: '/collections/all',
      items: [
        { title: 'Conveyor Components', type: 'COLLECTION', resourceId: null, url: '/collections/conveyor-components' },
        {
          title: 'Industrial Hose',
          type: 'HTTP',
          url: '/collections/industrial-hose',
          items: HOSE_SUBCATEGORIES.map((t) => ({
            title: t,
            type: 'HTTP',
            url: `/collections/industrial-hose`,
          })),
        },
        { title: 'Power Transmission', type: 'HTTP', url: '/collections/power-transmission' },
        { title: 'Other', type: 'HTTP', url: '/collections/other' },
      ],
    },
    { title: 'About', type: 'HTTP', url: '/pages/about-us' },
    { title: 'Contact', type: 'HTTP', url: '/pages/contact-us' },
  ]);

  await createMenu('footer-products', 'Footer Products', [
    { title: 'Industrial Hose', type: 'HTTP', url: '/collections/industrial-hose' },
    { title: 'Power Transmission', type: 'HTTP', url: '/collections/power-transmission' },
    { title: 'Conveyor Components', type: 'HTTP', url: '/collections/conveyor-components' },
    { title: 'All Products', type: 'HTTP', url: '/collections/all' },
  ]);

  await createMenu('footer-company', 'Footer Company', [
    { title: 'About Us', type: 'HTTP', url: '/pages/about-us' },
    { title: 'Blog', type: 'HTTP', url: '/blogs/news' },
    { title: 'Contact Us', type: 'HTTP', url: '/pages/contact-us' },
  ]);

  await createMenu('footer-support', 'Footer Support', [
    { title: 'Privacy Policy', type: 'HTTP', url: '/pages/privacy-policy' },
    { title: 'Terms', type: 'HTTP', url: '/pages/terms' },
    { title: 'Sitemap', type: 'HTTP', url: '/pages/sitemap' },
  ]);

  console.log('\nDone. Assign images in Theme Editor (Content > Files).');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
