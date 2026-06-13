import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const STORE = 'bhautik-mehta.myshopify.com';
const API_VERSION = '2025-01';
const ASSETS_DIR = path.resolve('assets');
const MAP_PATH = path.resolve('scripts/theme-image-map.json');

const UPLOADS = [
  { file: 'custom-hero-summer.png', alt: 'Home hero - Summer Starts With Yes' },
  { file: 'custom-ring-nature-inspired-203fb6.png', alt: 'Ring style - Nature Inspired' },
  { file: 'custom-ring-solitaire-203fb6.png', alt: 'Ring style - Solitaire' },
  { file: 'custom-ring-halo-203fb6.png', alt: 'Ring style - Halo' },
  { file: 'custom-ring-three-stone-203fb6.png', alt: 'Ring style - Three Stone' },
  { file: 'custom-ring-pave-203fb6.png', alt: 'Ring style - Pave' },
  { file: 'custom-ring-vintage-203fb6.png', alt: 'Ring style - Vintage' },
  { file: 'custom-product-1-56586a.png', alt: 'Product 1 - Nature Inspired Dutch Marquise' },
  { file: 'custom-product-2-56586a.png', alt: 'Product 2 - Vintage Marquise Cut Diamond' },
  { file: 'custom-product-3-56586a.png', alt: 'Product 3 - Three Stone Marquise Ring' },
  { file: 'custom-product-4-56586a.png', alt: 'Product 4 - Oval Hidden Halo Engagement Ring' },
  { file: 'custom-product-5-56586a.png', alt: 'Product 5 - Dutch Marquise Solitaire' },
  { file: 'custom-product-6-56586a.png', alt: 'Product 6 - Oval Halo Engagement Ring' },
  { file: 'custom-product-7-56586a.png', alt: 'Product 7 - 2.25 TW Pear Cut Ring' },
  { file: 'custom-product-8-56586a.png', alt: 'Product 8 - Fancy Blue Pear Cut Ring' },
  { file: 'custom-design-hero-4196a4.png', alt: 'Custom design hero background' },
  { file: 'custom-design-process-1-1c3792.png', alt: 'Design process step 1 - Consult' },
  { file: 'custom-design-process-2-1c3792.png', alt: 'Design process step 2 - Design' },
  { file: 'custom-design-process-3-1c3792.png', alt: 'Design process step 3 - Craft' },
  { file: 'custom-design-process-4-1c3792.png', alt: 'Design process step 4 - Deliver' },
];

function getAccessToken() {
  const configPath = path.join(
    os.homedir(),
    'AppData',
    'Roaming',
    'shopify-cli-kit-nodejs',
    'Config',
    'config.json'
  );
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  const sessions = JSON.parse(config.sessionStore);
  const apps = sessions['accounts.shopify.com'][config.currentSessionId]?.applications ?? {};
  const storeKey = Object.keys(apps).find((key) => key.startsWith(`${STORE}-`));
  const token = storeKey ? apps[storeKey]?.accessToken : null;
  if (!token) throw new Error(`No Shopify CLI session found for ${STORE}. Run shopify theme dev once to authenticate.`);
  return token;
}

async function adminGraphql(token, query, variables = {}) {
  const response = await fetch(`https://${STORE}/admin/api/${API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  const payload = await response.json();
  if (!response.ok || payload.errors?.length) {
    throw new Error(JSON.stringify(payload.errors ?? payload, null, 2));
  }
  return payload.data;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function toShopifyImageRef(cdnUrl) {
  const basename = path.basename(new URL(cdnUrl).pathname);
  return `shopify://shop_images/${basename}`;
}

function fileStem(filename) {
  return path.basename(filename, path.extname(filename)).replace(/\.(jpg|jpeg|png|webp)$/i, '');
}

async function loadExistingFileRefs(token) {
  const refsByStem = {};
  let cursor = null;
  let hasNext = true;

  while (hasNext) {
    const data = await adminGraphql(
      token,
      `query files($cursor: String) {
        files(first: 100, query: "media_type:IMAGE", sortKey: CREATED_AT, reverse: true, after: $cursor) {
          pageInfo { hasNextPage endCursor }
          nodes {
            ... on MediaImage {
              alt
              image { url }
            }
          }
        }
      }`,
      { cursor }
    );

    for (const node of data.files.nodes) {
      const url = node?.image?.url;
      if (!url) continue;
      const basename = path.basename(new URL(url).pathname);
      if (!basename.includes('custom-')) continue;
      const stem = basename.replace(/\.(jpg|jpeg|png|webp)$/i, '');
      refsByStem[stem] = toShopifyImageRef(url);
    }

    hasNext = data.files.pageInfo.hasNextPage;
    cursor = data.files.pageInfo.endCursor;
  }

  return refsByStem;
}

async function waitForFile(token, fileId) {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const data = await adminGraphql(
      token,
      `query file($id: ID!) {
        node(id: $id) {
          ... on MediaImage {
            fileStatus
            image { url }
            preview { image { url } }
          }
        }
      }`,
      { id: fileId }
    );

    const node = data.node;
    const url = node?.image?.url ?? node?.preview?.image?.url;
    if (node?.fileStatus === 'READY' && url) return url;
    if (node?.fileStatus === 'FAILED') throw new Error(`File processing failed for ${fileId}`);
    await sleep(1000);
  }

  throw new Error(`Timed out waiting for file ${fileId}`);
}

async function uploadImage(token, localPath, alt) {
  const filename = path.basename(localPath);
  const mimeType = filename.endsWith('.png') ? 'image/png' : 'image/jpeg';
  const fileBuffer = fs.readFileSync(localPath);

  const staged = await adminGraphql(
    token,
    `mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
      stagedUploadsCreate(input: $input) {
        stagedTargets {
          url
          resourceUrl
          parameters { name value }
        }
        userErrors { field message }
      }
    }`,
    {
      input: [
        {
          filename,
          mimeType,
          resource: 'FILE',
          fileSize: fileBuffer.byteLength.toString(),
          httpMethod: 'POST',
        },
      ],
    }
  );

  const target = staged.stagedUploadsCreate.stagedTargets[0];
  if (!target) throw new Error(`Failed staged upload for ${filename}`);

  const form = new FormData();
  for (const param of target.parameters) {
    form.append(param.name, param.value);
  }
  form.append('file', new Blob([fileBuffer], { type: mimeType }), filename);

  const uploadResponse = await fetch(target.url, { method: 'POST', body: form });
  if (!uploadResponse.ok) {
    throw new Error(`Upload failed for ${filename}: ${uploadResponse.status}`);
  }

  const created = await adminGraphql(
    token,
    `mutation fileCreate($files: [FileCreateInput!]!) {
      fileCreate(files: $files) {
        files { id }
        userErrors { field message }
      }
    }`,
    {
      files: [{ alt, contentType: 'IMAGE', originalSource: target.resourceUrl }],
    }
  );

  const fileId = created.fileCreate.files[0]?.id;
  if (!fileId) throw new Error(`fileCreate failed for ${filename}`);

  const imageUrl = await waitForFile(token, fileId);
  return toShopifyImageRef(imageUrl);
}

async function main() {
  const token = getAccessToken();
  const existing = await loadExistingFileRefs(token);
  const results = {};

  for (const item of UPLOADS) {
    const stem = fileStem(item.file);
    if (existing[stem]) {
      results[item.file] = existing[stem];
      console.log(`reuse ${item.file} -> ${existing[stem]}`);
      continue;
    }

    const localPath = path.join(ASSETS_DIR, item.file);
    if (!fs.existsSync(localPath)) {
      console.warn(`missing local file: ${item.file}`);
      continue;
    }

    const shopifyRef = await uploadImage(token, localPath, item.alt);
    results[item.file] = shopifyRef;
    existing[stem] = shopifyRef;
    console.log(`upload ${item.file} -> ${shopifyRef}`);
  }

  fs.mkdirSync(path.dirname(MAP_PATH), { recursive: true });
  fs.writeFileSync(MAP_PATH, JSON.stringify(results, null, 2));
  console.log(`\nSaved ${Object.keys(results).length} refs to scripts/theme-image-map.json`);
}

main().catch((error) => {
  console.error(error.message ?? error);
  process.exit(1);
});
