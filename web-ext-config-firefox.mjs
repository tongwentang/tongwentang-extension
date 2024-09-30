import { config, env } from './web-ext-config.mjs';

export default {
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
