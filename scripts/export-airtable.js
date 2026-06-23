#!/usr/bin/env node
/**
 * One-shot exporter: pull every table from Airtable and regenerate
 * data/site-data.json so the site can run entirely from the local snapshot.
 *
 * Safe by design:
 *   - If Airtable returns no usable data (e.g. the monthly API quota is
 *     exhausted and every table 429s), it ABORTS without touching the file.
 *   - Fields that don't exist in Airtable (privateHirePackages, sundayNote,
 *     and per-tab drinkNote) are preserved from the current snapshot.
 *   - The previous snapshot is backed up to data/site-data.backup.json first.
 *
 * Usage:  node scripts/export-airtable.js
 */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { fetchAllRecords, transformData } = require('../api/menu.js');

const DATA_PATH = path.join(__dirname, '..', 'data', 'site-data.json');
const BACKUP_PATH = path.join(__dirname, '..', 'data', 'site-data.backup.json');

const TABLES = [
  'Cocktails', 'HappyHour', 'OpeningHours', 'Wines', 'HotBeverages',
  'MenuTabs', 'MenuSections', 'MenuItems', 'DeliveryOptions', 'Reviews'
];

async function main() {
  const apiToken = process.env.AIRTABLE_API_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  if (!apiToken || !baseId) {
    console.error('Missing AIRTABLE_API_TOKEN or AIRTABLE_BASE_ID in .env');
    process.exit(1);
  }

  console.log('Fetching all tables from Airtable...');
  const results = await Promise.allSettled(
    TABLES.map(t => fetchAllRecords(baseId, t, apiToken))
  );

  const get = i => (results[i].status === 'fulfilled' ? results[i].value : []);
  results.forEach((r, i) => {
    if (r.status === 'rejected') {
      console.warn(`  ! ${TABLES[i]}: ${r.reason?.response?.data?.errors?.[0]?.error || r.reason?.message}`);
    } else {
      console.log(`  - ${TABLES[i]}: ${r.value.length} records`);
    }
  });

  const [cocktails, happyHour, openingHours, wines, hotBeverages,
         menuTabs, menuSections, menuItems, deliveryOptions, reviews] =
    TABLES.map((_, i) => get(i));

  // Refuse to overwrite with an empty/degraded pull (quota exhausted, etc.)
  if (!cocktails.length && !openingHours.length && !menuTabs.length) {
    console.error('\nAirtable returned no usable data (likely rate-limited / quota exhausted).');
    console.error('Aborting WITHOUT modifying data/site-data.json. Try again after the quota resets.');
    process.exit(2);
  }

  const fresh = transformData(
    cocktails, happyHour, openingHours, wines, hotBeverages,
    menuTabs, menuSections, menuItems, deliveryOptions, reviews
  );

  // Merge in fields that are NOT stored in Airtable, from the existing snapshot.
  const existing = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));

  // Top-level manual fields
  fresh.privateHirePackages = existing.privateHirePackages || [];
  if (existing.sundayNote) fresh.sundayNote = existing.sundayNote;

  // Per-tab manual fields (drinkNote isn't in Airtable) — carry over by tab id
  const existingTabsById = Object.fromEntries((existing.menuTabs || []).map(t => [t.id, t]));
  fresh.menuTabs = (fresh.menuTabs || []).map(tab => {
    const prev = existingTabsById[tab.id];
    if (prev?.drinkNote && !tab.drinkNote) tab.drinkNote = prev.drinkNote;
    return tab;
  });

  // Back up, then write
  fs.copyFileSync(DATA_PATH, BACKUP_PATH);
  fs.writeFileSync(DATA_PATH, JSON.stringify(fresh, null, 2) + '\n');

  console.log('\nSnapshot regenerated:');
  console.log(`  cocktails: ${fresh.cocktails.length}, wines: ${fresh.wines.length}, hotBeverages: ${fresh.hotBeverages.length}`);
  console.log(`  openingHours: ${fresh.openingHours.length}, menuTabs: ${fresh.menuTabs.length}, reviews: ${fresh.reviews.length}`);
  console.log(`  privateHirePackages (preserved): ${fresh.privateHirePackages.length}`);
  console.log(`\nWrote ${DATA_PATH}`);
  console.log(`Backup at ${BACKUP_PATH}`);
}

main().catch(err => {
  console.error('Export failed:', err.message);
  process.exit(1);
});
