const { parsed: env } = require('dotenv').config();
const config = require('./web-ext-config');

module.exports = {
  ...config,
  sourceDir: './dist/firefox',
  run: {
    firefox: env.FIREFOX || 'firefox',
    target: ['firefox-desktop'],
    startUrl: ['about:debugging'],
  },
  sign: {
    apiKey: env.API_KEY,
    apiSecret: env.API_SECRET,
  },
};
