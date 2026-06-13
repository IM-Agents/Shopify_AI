import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const STORE = 'bhautik-mehta.myshopify.com';
const API_VERSION = '2025-01';
const ASSETS_DIR = path.resolve('assets');
const MAP_PATH = path.resolve('scripts/theme-icon-map.json');

const ICONS = [
  { file: 'custom-icon-composition.svg', alt: 'Icon - Same composition' },
  { file: 'custom-icon-price.svg', alt: 'Icon - Better price' },
  { file: 'custom-icon-quality.svg', alt: 'Icon - Better quality' },
  { file: 'custom-icon-ethics.svg', alt: 'Icon - Better ethics' },
  { file: 'custom-icon-sustainability.svg', alt: 'Icon - Better sustainability' },
  { file: 'custom-icon-handmade.svg', alt: 'Icon - Handmade with love' },
  { file: 'custom-icon-secure-shipping.svg', alt: 'Icon - Secure shipping' },
  { file: 'custom-icon-trusted.svg', alt: 'Icon - Trusted by customers' },
  { file: 'custom-icon-engagement-ring.svg', alt: 'Icon - Engagement ring' },
  { file: 'custom-icon-wedding-band.svg', alt: 'Icon - Wedding band' },
  { file: 'custom-icon-fine-jewelry.svg', alt: 'Icon - Fine jewelry' },
  { file: 'custom-icon-not-sure.svg', alt: 'Icon - Not sure yet' },
  { file: 'custom-icon-upload.svg', alt: 'Icon - Upload reference' },
  { file: 'custom-icon-chevron-down.svg', alt: 'Icon - Chevron down' },
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

function toShopifyFileRef(cdnUrl) {
  const basename = path.basename(new URL(cdnUrl).pathname);
  return `shopify://shop_images/${basename}`;
}

function fileStem(filename) {
  return path.basename(filename, path.extname(filename));
}

function mimeTypeFor(filename) {
  if (filename.endsWith('.svg')) return 'image/svg+xml';
  if (filename.endsWith('.png')) return 'image/png';
  return 'image/jpeg';
}

async function loadExistingFileRefs(token) {
  const refsByStem = {};
  let cursor = null;
  let hasNext = true;

  while (hasNext) {
    const data = await adminGraphql(
      token,
      `query files($cursor: String) {
        files(first: 100, query: "filename:custom-icon", sortKey: CREATED_AT, reverse: true, after: $cursor) {
          pageInfo { hasNextPage endCursor }
          nodes {
            ... on MediaImage {
              alt
              image { url }
            }
            ... on GenericFile {
              alt
              url
            }
          }
        }
      }`,
      { cursor }
    );

    for (const node of data.files.nodes) {
      const url = node?.image?.url ?? node?.url;
      if (!url) continue;
      const basename = path.basename(new URL(url).pathname);
      refsByStem[fileStem(basename)] = toShopifyFileRef(url);
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
          ... on GenericFile {
            fileStatus
            url
          }
        }
      }`,
      { id: fileId }
    );

    const node = data.node;
    const url = node?.image?.url ?? node?.url ?? node?.preview?.image?.url;
    if (node?.fileStatus === 'READY' && url) return url;
    if (node?.fileStatus === 'FAILED') throw new Error(`File processing failed for ${fileId}`);
    await sleep(1000);
  }

  throw new Error(`Timed out waiting for file ${fileId}`);
}

async function uploadIcon(token, localPath, alt) {
  const filename = path.basename(localPath);
  const mimeType = mimeTypeFor(filename);
  const fileBuffer = fs.readFileSync(localPath);
  const contentType = filename.endsWith('.svg') ? 'FILE' : 'IMAGE';

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
      files: [{ alt, contentType, originalSource: target.resourceUrl }],
    }
  );

  const fileId = created.fileCreate.files[0]?.id;
  if (!fileId) throw new Error(`fileCreate failed for ${filename}`);

  const fileUrl = await waitForFile(token, fileId);
  return toShopifyFileRef(fileUrl);
}

async function main() {
  const token = getAccessToken();
  const existing = await loadExistingFileRefs(token);
  const results = {};

  for (const item of ICONS) {
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

    const shopifyRef = await uploadIcon(token, localPath, item.alt);
    results[item.file] = shopifyRef;
    existing[stem] = shopifyRef;
    console.log(`upload ${item.file} -> ${shopifyRef}`);
  }

  fs.mkdirSync(path.dirname(MAP_PATH), { recursive: true });
  fs.writeFileSync(MAP_PATH, JSON.stringify(results, null, 2));
  console.log(`\nSaved ${Object.keys(results).length} icon refs to scripts/theme-icon-map.json`);
}

main().catch((error) => {
  console.error(error.message ?? error);
  process.exit(1);
});
