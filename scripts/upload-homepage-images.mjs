import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const STORE = 'bhautik-mehta.myshopify.com';
const API_VERSION = '2025-01';
const ASSETS_DIR = path.resolve('assets');

const UPLOADS = [
  { file: 'custom-hero-summer.png', alt: 'Home hero - Summer Starts With Yes' },
  { file: 'custom-ring-nature-inspired-203fb6.png', alt: 'Ring style - Nature Inspired' },
  { file: 'custom-ring-solitaire-203fb6.png', alt: 'Ring style - Solitaire' },
  { file: 'custom-ring-halo-203fb6.png', alt: 'Ring style - Halo' },
  { file: 'custom-ring-three-stone-203fb6.png', alt: 'Ring style - Three Stone' },
  { file: 'custom-ring-pave-203fb6.png', alt: 'Ring style - Pave' },
  { file: 'custom-ring-vintage-203fb6.png', alt: 'Ring style - Vintage' },
  { file: 'custom-product-1-56586a.png', alt: 'Signature collection product 1' },
  { file: 'custom-product-2-56586a.png', alt: 'Signature collection product 2' },
  { file: 'custom-product-3-56586a.png', alt: 'Signature collection product 3' },
  { file: 'custom-product-4-56586a.png', alt: 'Signature collection product 4' },
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
  const account = sessions['accounts.shopify.com'];
  const userId = config.currentSessionId;
  const apps = account?.[userId]?.applications ?? {};
  const storeKey = Object.keys(apps).find((key) => key.startsWith(`${STORE}-`));
  const token = storeKey ? apps[storeKey]?.accessToken : null;
  if (!token) throw new Error(`No Shopify CLI session found for ${STORE}`);
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
    const url = node?.image?.url ?? node?.preview?.image?.url ?? node?.url;
    if (node?.fileStatus === 'READY' && url) return url;
    if (node?.fileStatus === 'FAILED') throw new Error(`File processing failed for ${fileId}`);
    await sleep(1000);
  }

  throw new Error(`Timed out waiting for file ${fileId}`);
}

function toShopifyImageRef(cdnUrl) {
  const basename = path.basename(new URL(cdnUrl).pathname);
  return `shopify://shop_images/${basename}`;
}

async function uploadImage(token, localPath, alt) {
  const filename = path.basename(localPath);
  const mimeType = 'image/png';
  const fileBuffer = fs.readFileSync(localPath);
  const fileSize = fileBuffer.byteLength.toString();

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
          fileSize,
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
      files: [
        {
          alt,
          contentType: 'IMAGE',
          originalSource: target.resourceUrl,
        },
      ],
    }
  );

  const fileId = created.fileCreate.files[0]?.id;
  if (!fileId) throw new Error(`fileCreate failed for ${filename}`);

  const imageUrl = await waitForFile(token, fileId);
  return { filename, shopifyRef: toShopifyImageRef(imageUrl), imageUrl };
}

async function main() {
  const token = getAccessToken();
  const results = {};

  for (const item of UPLOADS) {
    const localPath = path.join(ASSETS_DIR, item.file);
    if (!fs.existsSync(localPath)) {
      console.warn(`Skipping missing file: ${item.file}`);
      continue;
    }
    const uploaded = await uploadImage(token, localPath, item.alt);
    results[item.file] = uploaded.shopifyRef;
    console.log(`${item.file} -> ${uploaded.shopifyRef}`);
  }

  fs.writeFileSync(
    path.resolve('scripts/homepage-image-map.json'),
    JSON.stringify(results, null, 2)
  );
}

main().catch((error) => {
  console.error(error.message ?? error);
  process.exit(1);
});
