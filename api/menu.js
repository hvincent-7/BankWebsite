const axios = require('axios');

// Simple in-memory cache with TTL
const cache = {
  data: null,
  timestamp: 0,
  ttl: 60000 // 60 seconds
};

function isCacheValid() {
  return cache.data && (Date.now() - cache.timestamp) < cache.ttl;
}

async function fetchAirtableData() {
  if (isCacheValid()) {
    return cache.data;
  }

  const apiToken = process.env.AIRTABLE_API_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!apiToken || !baseId) {
    throw new Error('Missing AIRTABLE_API_TOKEN or AIRTABLE_BASE_ID environment variables');
  }

  try {
    // Fetch all tables from Airtable
    const [cocktailsRes, happyHourRes, openingHoursRes] = await Promise.all([
      axios.get(`https://api.airtable.com/v0/${baseId}/Cocktails`, {
        headers: { Authorization: `Bearer ${apiToken}` }
      }),
      axios.get(`https://api.airtable.com/v0/${baseId}/HappyHour`, {
        headers: { Authorization: `Bearer ${apiToken}` }
      }),
      axios.get(`https://api.airtable.com/v0/${baseId}/OpeningHours`, {
        headers: { Authorization: `Bearer ${apiToken}` }
      })
    ]);

    // Transform Airtable data to match site-data.json format
    const transformedData = {
      cocktails: cocktailsRes.data.records.map(record => ({
        name: record.fields.name,
        desc: record.fields.description || '',
        price: record.fields.price || '£9',
        happyHour: Boolean(record.fields.happyHour)
      })),

      happyHour: happyHourRes.data.records.length > 0 ? {
        price: happyHourRes.data.records[0].fields.price || '2 cocktails for £14',
        times: happyHourRes.data.records[0].fields.times || '',
        note: happyHourRes.data.records[0].fields.note || 'Mix & Match Happy Hour'
      } : {
        price: '2 cocktails for £14',
        times: 'Fri-Sat 6-9pm & 9-9:30pm',
        note: 'Mix & Match Happy Hour'
      },

      openingHours: openingHoursRes.data.records.map(record => ({
        day: record.fields.day,
        time: record.fields.time,
        closed: Boolean(record.fields.closed)
      }))
    };

    // Cache the results
    cache.data = transformedData;
    cache.timestamp = Date.now();

    return transformedData;
  } catch (error) {
    console.error('Error fetching from Airtable:', error.message);
    throw error;
  }
}

// Vercel serverless function
module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const data = await fetchAirtableData();
    return res.status(200).json(data);
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      error: 'Failed to fetch menu data',
      message: error.message
    });
  }
};
