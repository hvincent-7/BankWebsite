const axios = require('axios');
require('dotenv').config();

const AIRTABLE_API_TOKEN = process.env.AIRTABLE_API_TOKEN;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

const api = axios.create({
  baseURL: `https://api.airtable.com/v0/meta/bases/${AIRTABLE_BASE_ID}`,
  headers: {
    Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
    'Content-Type': 'application/json'
  }
});

async function createFields() {
  try {
    console.log('🔨 Creating table fields...\n');

    // Get all tables first
    const tablesRes = await api.get('/tables');
    const tables = tablesRes.data.tables;

    // Define fields for each table
    const fieldConfigs = {
      'Cocktails': [
        { name: 'name', type: 'singleLineText' },
        { name: 'description', type: 'multilineText' },
        { name: 'price', type: 'singleLineText' },
        { name: 'happyHour', type: 'checkbox' }
      ],
      'HappyHour': [
        { name: 'price', type: 'singleLineText' },
        { name: 'times', type: 'singleLineText' },
        { name: 'note', type: 'multilineText' }
      ],
      'OpeningHours': [
        { name: 'day', type: 'singleLineText' },
        { name: 'time', type: 'singleLineText' },
        { name: 'closed', type: 'checkbox' }
      ]
    };

    // Create fields for each table
    for (const table of tables) {
      const tableName = table.name;
      const fields = fieldConfigs[tableName];

      if (!fields) continue;

      console.log(`📋 Creating fields for ${tableName}...`);

      for (const field of fields) {
        try {
          await api.post(`/tables/${table.id}/fields`, {
            name: field.name,
            type: field.type
          });
          console.log(`  ✓ Created field: ${field.name}`);
        } catch (error) {
          if (error.response?.status === 422) {
            console.log(`  ℹ️  Field already exists: ${field.name}`);
          } else {
            throw error;
          }
        }
      }
    }

    console.log('\n✅ Fields created successfully!\n');
    console.log('Running import...\n');

    // Now run the import
    require('./import-airtable.js');
  } catch (error) {
    console.error('❌ Error creating fields:', error.response?.data || error.message);
    process.exit(1);
  }
}

createFields();
