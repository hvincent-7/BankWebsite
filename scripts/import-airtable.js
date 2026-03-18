const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const AIRTABLE_API_TOKEN = process.env.AIRTABLE_API_TOKEN;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

if (!AIRTABLE_API_TOKEN || !AIRTABLE_BASE_ID) {
  console.error('Error: AIRTABLE_API_TOKEN and AIRTABLE_BASE_ID must be set in .env file');
  process.exit(1);
}

const api = axios.create({
  baseURL: `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`,
  headers: {
    Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
    'Content-Type': 'application/json'
  }
});

// CSV parsing helper
function parseCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());

  return lines.slice(1).map(line => {
    // Better CSV parsing that handles quoted values
    const values = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') inQuotes = !inQuotes;
      else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());

    const row = {};
    headers.forEach((header, i) => {
      let value = values[i] || '';
      // Remove quotes if present
      value = value.replace(/^"|"$/g, '');

      // Convert TRUE/FALSE strings to booleans for checkbox fields
      if (header === 'happyHour' || header === 'closed') {
        row[header] = value.toUpperCase() === 'TRUE';
      } else {
        row[header] = value;
      }
    });
    return row;
  });
}

async function uploadToAirtable(tableName, filePath) {
  try {
    console.log(`📤 Uploading ${tableName}...`);
    const records = parseCSV(filePath);

    // Airtable API has a batch limit of 10 records per request
    for (let i = 0; i < records.length; i += 10) {
      const batch = records.slice(i, i + 10);
      const fieldsArray = batch.map(fields => ({ fields }));

      const response = await api.post(`/${tableName}`, { records: fieldsArray });
      console.log(`  ✓ Uploaded ${response.data.records.length} records`);
    }

    console.log(`✅ ${tableName} complete!\n`);
  } catch (error) {
    if (error.response) {
      console.error(`❌ Error uploading ${tableName}:`);
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error(`❌ Error uploading ${tableName}:`, error.message);
    }
    process.exit(1);
  }
}

async function main() {
  console.log('🚀 Starting Airtable data import...\n');

  try {
    await uploadToAirtable('Cocktails', path.join(__dirname, '../imports/Cocktails.csv'));
    await uploadToAirtable('HappyHour', path.join(__dirname, '../imports/HappyHour.csv'));
    await uploadToAirtable('OpeningHours', path.join(__dirname, '../imports/OpeningHours.csv'));

    console.log('🎉 All data imported successfully!');
    console.log('\nNext steps:');
    console.log('1. Get your Airtable API token from: https://airtable.com/account/tokens');
    console.log('2. Deploy your backend API to Vercel/Netlify');
    console.log('3. Your website will start pulling live data from Airtable!');
  } catch (error) {
    console.error('Import failed:', error.message);
    process.exit(1);
  }
}

main();
