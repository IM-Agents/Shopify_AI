import fs from 'node:fs';
import path from 'node:path';

const MAP_PATH = path.resolve('scripts/theme-icon-map.json');

function loadMap() {
  if (!fs.existsSync(MAP_PATH)) {
    throw new Error('Run scripts/upload-theme-icons.mjs first.');
  }
  return JSON.parse(fs.readFileSync(MAP_PATH, 'utf8'));
}

function saveJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`);
}

function applyIndex(map) {
  const filePath = path.resolve('templates/index.json');
  const template = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const valueIcons = {
    value_1: 'custom-icon-composition.svg',
    value_2: 'custom-icon-price.svg',
    value_3: 'custom-icon-quality.svg',
    value_4: 'custom-icon-ethics.svg',
    value_5: 'custom-icon-sustainability.svg',
  };

  for (const [blockId, iconFile] of Object.entries(valueIcons)) {
    if (map[iconFile]) {
      template.sections.custom_value_props.blocks[blockId].settings.icon = map[iconFile];
    }
  }

  saveJson(filePath, template);
}

function applyCustomDesign(map) {
  const filePath = path.resolve('templates/page.custom-design.json');
  const template = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const trustIcons = {
    trust_1: 'custom-icon-handmade.svg',
    trust_2: 'custom-icon-secure-shipping.svg',
    trust_3: 'custom-icon-trusted.svg',
  };

  for (const [blockId, iconFile] of Object.entries(trustIcons)) {
    if (map[iconFile]) {
      template.sections.trust.blocks[blockId].settings.icon = map[iconFile];
    }
  }

  saveJson(filePath, template);
}

const map = loadMap();
applyIndex(map);
applyCustomDesign(map);
console.log('Applied icon image picker refs to index.json and page.custom-design.json');
