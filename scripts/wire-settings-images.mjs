/**
 * Prints Shopify image-picker references for files in store-assets/.
 * Run after upload-store-assets.mjs to verify wired paths.
 */
import { readdirSync } from 'node:fs';
import { extname, join } from 'node:path';

const ASSETS_DIR = join(process.cwd(), 'store-assets');
const MIME = new Set(['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif']);

const files = readdirSync(ASSETS_DIR).filter((f) => MIME.has(extname(f).toLowerCase()));
console.log('Image picker references:\n');
for (const f of files) {
  console.log(`  shopify://shop_images/${f}`);
}
