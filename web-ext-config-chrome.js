const { parsed: env } = require('dotenv').config();
const config = require('./web-ext-config');

module.exports = {
  ...config,
  sourceDir: './dist/chromium',
  run: {
    target: ['chromium'],
    chromiumBinary: env.CHROMIUM_BINARY || undefined,
    startUrl: ['chrome://extensions'],
  },
};
