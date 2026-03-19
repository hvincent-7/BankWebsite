const axios = require('axios');

// Enhanced cache with stale-while-revalidate pattern
const cache = {
  data: null,
  timestamp: 0,
  ttl: 60000,        // 60 seconds fresh
  staleTtl: 300000,  // 5 minutes stale (serve while refreshing)
  refreshing: false
};

function getCacheState() {
  if (!cache.data) return 'empty';
  const age = Date.now() - cache.timestamp;
  if (age < cache.ttl) return 'fresh';
  if (age < cache.staleTtl) return 'stale';
  return 'expired';
}

// Fetch all records from a table with pagination support
async function fetchAllRecords(baseId, tableName, apiToken) {
  const records = [];
  let offset = null;

  do {
    const url = new URL(`https://api.airtable.com/v0/${baseId}/${tableName}`);
    if (offset) url.searchParams.set('offset', offset);

    const response = await axios.get(url.toString(), {
      headers: { Authorization: `Bearer ${apiToken}` },
      timeout: 10000 // 10 second timeout
    });

    records.push(...response.data.records);
    offset = response.data.offset;
  } while (offset);

  return records;
}

// Transform raw Airtable records to site format
function transformData(cocktails, happyHour, openingHours, wines, hotBeverages) {
  return {
    cocktails: cocktails.map(record => ({
      name: record.fields.Name || record.fields.name || 'Unknown',
      desc: record.fields.description || '',
      price: record.fields.price || '£9',
      happyHour: Boolean(record.fields.happyHour)
    })).filter(c => c.name !== 'Unknown'),

    wines: wines.map(record => ({
      name: record.fields.Name || record.fields.name || 'Unknown',
      origin: record.fields.origin || '',
      type: record.fields.type || 'White',
      glass125ml: record.fields.glass125ml || '',
      glass175ml: record.fields.glass175ml || '',
      glass250ml: record.fields.glass250ml || '',
      bottle: record.fields.bottle || ''
    })).filter(w => w.name !== 'Unknown'),

    hotBeverages: hotBeverages.map(record => ({
      name: record.fields.Name || record.fields.name || 'Unknown',
      description: record.fields.description || '',
      price: record.fields.price || ''
    })).filter(h => h.name !== 'Unknown'),

    happyHour: happyHour.length > 0 ? {
      price: happyHour[0].fields.price || '2 cocktails for £14',
      times: happyHour[0].fields.times || 'Fri/Sat 12-5pm & 9-10pm',
      note: happyHour[0].fields.note || 'Mix & Match Happy Hour'
    } : {
      price: '2 cocktails for £14',
      times: 'Fri/Sat 12-5pm & 9-10pm',
      note: 'Mix & Match Happy Hour'
    },

    openingHours: openingHours.map(record => ({
      day: record.fields.day || '',
      time: record.fields.time || '',
      closed: Boolean(record.fields.closed)
    })).filter(h => h.day),

    _meta: {
      cached: new Date().toISOString(),
      source: 'airtable'
    }
  };
}

async function fetchAirtableData(forceRefresh = false) {
  const cacheState = getCacheState();

  // Return fresh cache immediately
  if (cacheState === 'fresh' && !forceRefresh) {
    return cache.data;
  }

  // Return stale cache while refreshing in background
  if (cacheState === 'stale' && !forceRefresh && !cache.refreshing) {
    cache.refreshing = true;
    fetchAirtableData(true).finally(() => { cache.refreshing = false; });
    return cache.data;
  }

  const apiToken = process.env.AIRTABLE_API_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!apiToken || !baseId) {
    throw new Error('Missing AIRTABLE_API_TOKEN or AIRTABLE_BASE_ID environment variables');
  }

  try {
    // Fetch all tables in parallel with individual error handling
    const results = await Promise.allSettled([
      fetchAllRecords(baseId, 'Cocktails', apiToken),
      fetchAllRecords(baseId, 'HappyHour', apiToken),
      fetchAllRecords(baseId, 'OpeningHours', apiToken),
      fetchAllRecords(baseId, 'Wines', apiToken),
      fetchAllRecords(baseId, 'HotBeverages', apiToken)
    ]);

    // Extract results, using empty arrays for failures
    const cocktails = results[0].status === 'fulfilled' ? results[0].value : [];
    const happyHour = results[1].status === 'fulfilled' ? results[1].value : [];
    const openingHours = results[2].status === 'fulfilled' ? results[2].value : [];
    const wines = results[3].status === 'fulfilled' ? results[3].value : [];
    const hotBeverages = results[4].status === 'fulfilled' ? results[4].value : [];

    // Log any partial failures
    results.forEach((r, i) => {
      if (r.status === 'rejected') {
        const tables = ['Cocktails', 'HappyHour', 'OpeningHours', 'Wines', 'HotBeverages'];
        console.warn(`Failed to fetch ${tables[i]}:`, r.reason?.message);
      }
    });

    const transformedData = transformData(cocktails, happyHour, openingHours, wines, hotBeverages);

    // Only cache if we got at least some data
    if (cocktails.length > 0 || happyHour.length > 0 || openingHours.length > 0) {
      cache.data = transformedData;
      cache.timestamp = Date.now();
    }

    return transformedData;
  } catch (error) {
    console.error('Error fetching from Airtable:', error.message);
    // Return stale cache if available
    if (cache.data) {
      console.warn('Returning stale cache due to error');
      return { ...cache.data, _meta: { ...cache.data._meta, stale: true } };
    }
    throw error;
  }
}

// Vercel serverless function handler
module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Health check endpoint
  if (req.url?.includes('health')) {
    return res.status(200).json({
      status: 'ok',
      cache: getCacheState(),
      timestamp: new Date().toISOString()
    });
  }

  try {
    const data = await fetchAirtableData();
    return res.status(200).json(data);
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      error: 'Failed to fetch menu data',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      fallback: true
    });
  }
};

// Export for testing
module.exports.fetchAirtableData = fetchAirtableData;
module.exports.getCacheState = getCacheState;
