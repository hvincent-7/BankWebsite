const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV !== 'production';

// Import the menu API handler
const menuHandler = require('./api/menu.js');

// Security headers (relaxed for local dev)
app.use(helmet({
  contentSecurityPolicy: isDev ? false : {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'fonts.googleapis.com'],
      fontSrc: ["'self'", 'fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:', 'https:'],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'", 'api.airtable.com']
    }
  },
  crossOriginEmbedderPolicy: false
}));

// Gzip compression
app.use(compression());

// Request logging in dev mode
if (isDev) {
  app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      console.log(`${req.method} ${req.url} ${res.statusCode} - ${Date.now() - start}ms`);
    });
    next();
  });
}

// Serve static files with caching
app.use(express.static(path.join(__dirname), {
  maxAge: isDev ? 0 : '1d',
  etag: true
}));

// API endpoints
app.get('/api/menu', async (req, res) => {
  await menuHandler(req, res);
});

app.get('/api/health', (req, res) => {
  const { getCacheState } = require('./api/menu.js');
  res.json({
    status: 'ok',
    cache: getCacheState(),
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Routes for HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`
🏦 The Bank Website — Local Development Server

📍 Website:    http://localhost:${PORT}
📡 API:        http://localhost:${PORT}/api/menu
💚 Health:     http://localhost:${PORT}/api/health

Press Ctrl+C to stop
  `);
});
