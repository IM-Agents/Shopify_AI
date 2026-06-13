import fs from 'node:fs';
import path from 'node:path';

const MAP_PATH = path.resolve('scripts/theme-image-map.json');

function loadMap() {
  if (!fs.existsSync(MAP_PATH)) {
    throw new Error('Run scripts/upload-theme-images.mjs first.');
  }
  return JSON.parse(fs.readFileSync(MAP_PATH, 'utf8'));
}

function saveJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`);
}

function applyIndex(map) {
  const filePath = path.resolve('templates/index.json');
  const template = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  template.sections.custom_hero.settings.image = map['custom-hero-summer.png'];

  const ringBlocks = {
    style_nature: 'custom-ring-nature-inspired-203fb6.png',
    style_solitaire: 'custom-ring-solitaire-203fb6.png',
    style_halo: 'custom-ring-halo-203fb6.png',
    style_three_stone: 'custom-ring-three-stone-203fb6.png',
    style_pave: 'custom-ring-pave-203fb6.png',
    style_vintage: 'custom-ring-vintage-203fb6.png',
  };

  for (const [blockId, assetFile] of Object.entries(ringBlocks)) {
    if (map[assetFile]) {
      template.sections.custom_ring_styles.blocks[blockId].settings.image = map[assetFile];
    }
  }

  for (let i = 1; i <= 4; i += 1) {
    const assetFile = `custom-product-${i}-56586a.png`;
    const blockId = `demo_product_${i}`;
    if (map[assetFile]) {
      template.sections.custom_signature_collections.blocks[blockId].settings.image = map[assetFile];
    }
  }

  saveJson(filePath, template);
}

function applyCollection(map) {
  const filePath = path.resolve('templates/collection.json');
  const template = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  for (let i = 1; i <= 8; i += 1) {
    const assetFile = `custom-product-${i}-56586a.png`;
    const blockId = `demo_${i}`;
    if (map[assetFile] && template.sections.main.blocks[blockId]) {
      template.sections.main.blocks[blockId].settings.image = map[assetFile];
    }
  }

  saveJson(filePath, template);
}

function applyCustomDesign(map) {
  const filePath = path.resolve('templates/page.custom-design.json');
  const template = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (map['custom-design-hero-4196a4.png']) {
    template.sections.hero.settings.image = map['custom-design-hero-4196a4.png'];
  }

  const steps = ['step_1', 'step_2', 'step_3', 'step_4'];
  steps.forEach((stepId, index) => {
    const assetFile = `custom-design-process-${index + 1}-1c3792.png`;
    if (map[assetFile]) {
      template.sections.process.blocks[stepId].settings.image = map[assetFile];
    }
  });

  saveJson(filePath, template);
}

const map = loadMap();
applyIndex(map);
applyCollection(map);
applyCustomDesign(map);
console.log('Applied image picker refs to index.json, collection.json, and page.custom-design.json');
