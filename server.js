const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Import the menu API handler
const menuHandler = require('./api/menu.js');

// Serve static files
app.use(express.static(path.join(__dirname)));

// API endpoint
app.get('/api/menu', async (req, res) => {
  await menuHandler(req, res);
});

// Fallback to index.html for SPA routing
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`
🚀 The Bank Website is running locally!

📍 Open your browser to: http://localhost:${PORT}

📡 API endpoint: http://localhost:${PORT}/api/menu

Press Ctrl+C to stop the server
  `);
});
