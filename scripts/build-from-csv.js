#!/usr/bin/env node
/**
 * Build data/site-data.json from CSV exports in imports/.
 *
 * Exporting a table to CSV from the Airtable web UI does NOT use the API, so
 * this works even when the API billing quota is exhausted. Export each table
 * from Airtable (grid view -> ... -> Download CSV), drop the files in imports/
 * using the table name (e.g. imports/Cocktails.csv), then run this.
 *
 * Reuses the live API's transformData so the output is identical in shape to
 * what /api/menu produced. Preserves fields that live only in the snapshot
 * (privateHirePackages, sundayNote, per-tab drinkNote).
 *
 * Usage:  node scripts/build-from-csv.js   (or: npm run build-data)
 */
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');
const { transformData } = require('../api/menu.js');

const IMPORTS = path.join(__dirname, '..', 'imports');
const DATA_PATH = path.join(__dirname, '..', 'data', 'site-data.json');
const BACKUP_PATH = path.join(__dirname, '..', 'data', 'site-data.backup.json');

// Columns that should be treated as booleans / numbers when present
const BOOLEAN_FIELDS = new Set(['happyHour', 'closed']);
const NUMBER_FIELDS = new Set(['sortOrder', 'column', 'rating']);

// Read a CSV into Airtable-style records: [{ fields: { ... } }]
function readTable(name) {
  const file = path.join(IMPORTS, `${name}.csv`);
  if (!fs.existsSync(file)) {
    console.warn(`  ! ${name}.csv not found - treating as empty`);
    return [];
  }
  const rows = parse(fs.readFileSync(file, 'utf8'), {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    bom: true
  });
  const records = rows.map(row => {
    const fields = {};
    for (const [key, raw] of Object.entries(row)) {
      if (raw === '' || raw == null) continue;
      if (BOOLEAN_FIELDS.has(key)) {
        fields[key] = String(raw).trim().toLowerCase() === 'true';
      } else if (NUMBER_FIELDS.has(key)) {
        const n = Number(raw);
        fields[key] = Number.isNaN(n) ? raw : n;
      } else {
        fields[key] = raw;
      }
    }
    return { fields };
  });
  console.log(`  - ${name}: ${records.length} rows`);
  return records;
}

function main() {
  console.log('Building snapshot from imports/*.csv ...');
  const cocktails    = readTable('Cocktails');
  const happyHour    = readTable('HappyHour');
  const openingHours = readTable('OpeningHours');
  const wines        = readTable('Wines');
  const hotBeverages = readTable('HotBeverages');
  const menuTabs     = readTable('MenuTabs');
  const menuSections = readTable('MenuSections');
  const menuItems    = readTable('MenuItems');
  const deliveryOptions = readTable('DeliveryOptions');
  const reviews      = readTable('Reviews');

  if (!cocktails.length && !openingHours.length && !menuTabs.length) {
    console.error('\nNo usable data found in imports/. Aborting without modifying site-data.json.');
    process.exit(2);
  }

  const fresh = transformData(
    cocktails, happyHour, openingHours, wines, hotBeverages,
    menuTabs, menuSections, menuItems, deliveryOptions, reviews
  );

  // Preserve fields that don't exist in Airtable, from the current snapshot.
  const existing = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
  fresh.privateHirePackages = existing.privateHirePackages || [];
  if (existing.sundayNote) fresh.sundayNote = existing.sundayNote;

  const existingTabsById = Object.fromEntries((existing.menuTabs || []).map(t => [t.id, t]));
  fresh.menuTabs = (fresh.menuTabs || []).map(tab => {
    const prev = existingTabsById[tab.id];
    if (prev?.drinkNote && !tab.drinkNote) tab.drinkNote = prev.drinkNote;
    return tab;
  });

  fs.copyFileSync(DATA_PATH, BACKUP_PATH);
  fs.writeFileSync(DATA_PATH, JSON.stringify(fresh, null, 2) + '\n');

  console.log('\nSnapshot regenerated:');
  console.log(`  cocktails: ${fresh.cocktails.length}, wines: ${fresh.wines.length}, hotBeverages: ${fresh.hotBeverages.length}`);
  console.log(`  openingHours: ${fresh.openingHours.length}, menuTabs: ${fresh.menuTabs.length}, reviews: ${fresh.reviews.length}`);
  console.log(`  privateHirePackages (preserved): ${fresh.privateHirePackages.length}`);
  console.log(`\nWrote ${DATA_PATH}  (backup at ${BACKUP_PATH})`);
}

main();
