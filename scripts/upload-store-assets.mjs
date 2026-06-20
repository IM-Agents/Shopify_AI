/**
 * Upload store-assets/ images to Shopify Admin → Content → Files.
 * Uses stagedUploadsCreate + fileCreate GraphQL mutations.
 *
 * Usage:
 *   $env:SHOPIFY_ADMIN_TOKEN="shpat_..."; node scripts/upload-store-assets.mjs
 */

import { readFileSync, readdirSync } from 'node:fs';
import { join, extname } from 'node:path';

const STORE = process.env.SHOPIFY_STORE_DOMAIN || 'bhautik-mehta.myshopify.com';
const TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;
const ASSETS_DIR = join(process.cwd(), 'store-assets');
const API = `https://${STORE}/admin/api/2025-04/graphql.json`;

const MIME = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.gif': 'image/gif',
};

async function gql(query, variables = {}) {
  const res = await fetch(API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors?.length) throw new Error(JSON.stringify(json.errors, null, 2));
  return json.data;
}

async function uploadFile(filePath) {
  const name = filePath.split(/[\\/]/).pop();
  const ext = extname(name).toLowerCase();
  const mimeType = MIME[ext] || 'application/octet-stream';
  const buffer = readFileSync(filePath);

  const staged = await gql(
    `mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
      stagedUploadsCreate(input: $input) {
        stagedTargets { url resourceUrl parameters { name value } }
        userErrors { field message }
      }
    }`,
    {
      input: [{
        filename: name,
        mimeType,
        resource: 'FILE',
        httpMethod: 'POST',
        fileSize: String(buffer.length),
      }],
    }
  );

  const target = staged.stagedUploadsCreate.stagedTargets[0];
  const form = new FormData();
  for (const p of target.parameters) form.append(p.name, p.value);
  form.append('file', new Blob([buffer], { type: mimeType }), name);

  const up = await fetch(target.url, { method: 'POST', body: form });
  if (!up.ok) throw new Error(`Upload failed for ${name}: ${up.status}`);

  const created = await gql(
    `mutation fileCreate($files: [FileCreateInput!]!) {
      fileCreate(files: $files) {
        files { id alt createdAt ... on MediaImage { image { url } } }
        userErrors { field message }
      }
    }`,
    { files: [{ alt: name, contentType: 'IMAGE', originalSource: target.resourceUrl }] }
  );

  const file = created.fileCreate.files[0];
  const url = file?.image?.url || target.resourceUrl;
  console.log(`✓ ${name} → ${url}`);
  return { name, shopifyRef: `shopify://shop_images/${name}` };
}

async function main() {
  if (!TOKEN) {
    console.error('Set SHOPIFY_ADMIN_TOKEN (Admin API access token with write_files scope).');
    process.exit(1);
  }

  const files = readdirSync(ASSETS_DIR).filter((f) => MIME[extname(f).toLowerCase()]);
  console.log(`Uploading ${files.length} files to ${STORE}...\n`);

  const refs = [];
  for (const f of files) {
    refs.push(await uploadFile(join(ASSETS_DIR, f)));
  }

  console.log('\n--- Shopify image picker references ---');
  for (const r of refs) console.log(r.shopifyRef);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
